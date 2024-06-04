// components/SearchBox.js
import { useState, useEffect} from 'react';
import axios from 'axios';

import { useRouter } from 'next/router';

import styles from '../styles/searchbar.module.css'; // Adjust the path based on your project structure

// use fontawesome stuff like so
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSearch, faTrophy, faBalanceScale, faChartLine } from '@fortawesome/free-solid-svg-icons';

import LoadingSpinner from './LoadingSpinner';

const SearchBox = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [formats, setFormats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();


  const [thumbnail, setThumbnail] = useState('');

  const handleDownload = (e) => {
    e.preventDefault();
    const formatIndex = document.getElementById('formats').value;
    router.push(`/api/download?url=${encodeURIComponent(videoUrl)}&formatIndex=${formatIndex}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get('/api/formats', {
        params: {
          videoUrl: videoUrl
        }
      });
      
      const data = response.data;
      
      if (data.error) {
        setError("Video is Unavailable at this URL because it's private or restricted");
        setLoading(false);
      } else {
        const { formats, thumbnail } = data;
        setFormats(formats);
        setThumbnail(thumbnail);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("FORMATS state updated to", formats);
  }, [formats]);



  function formatFileSize(bytes) {
    if (bytes) {
        if (bytes < 1024) {
    return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + ' KB';
    } else if (bytes < 1024 * 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
        return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
    } else {
        return '';
    }
}


  return (
    <div style={{ padding: '20px', maxWidth: "100%", margin: '0 auto', textAlign: 'center' }}>
    <form onSubmit={handleSubmit} style={{ minWidth: "400px", width: "60vw", marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

  <input
    type="text"
    value={videoUrl}
    placeholder='Paste video link here'
    onChange={(e) => setVideoUrl(e.target.value)}
    style={{ display: 'block', width: '100%', padding: '15px', fontSize: '1.2em', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', borderRight: 'none', border: '1px solid #ccc' }}
  />
  <button type="submit" disabled={loading} style={{ padding: '15px 20px', fontSize: '1.2em', borderTopRightRadius: '4px', borderBottomRightRadius: '4px', backgroundColor: loading ? '#ccc' : '#ed093b', color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', border: '1px solid #f77c96', borderLeft: 'none' }}>
    {loading ? 'Loading...' : <span style={{padding: '10px'}}><FontAwesomeIcon icon={faSearch} size="lg" /></span>}
  </button>
</form>

      {error && <p id="error-message" style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <>
        <div style={{display: formats.length ? '' : 'none', backgroundColor: 'white', color: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '10px'}}>
          {thumbnail && (
            <img
            src={thumbnail}
            alt="Thumbnail"
            style={{ margin: '10px auto', width: '300px', height: 'auto', borderRadius: '8px' }}
            className="thumbnail"
            />
          )}
          <form id="downloadForm" onSubmit={handleDownload}  style={{ marginTop: '20px' }}>
          <select id="formats" style={{ display: formats.length ? '' : 'none', width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '5px solid #4dbbff' }}>
            {formats.map((format, index) => (
              <option key={index} value={format.itag}>
                🎬 {format.container.toUpperCase()} {format.qualityLabel} {formatFileSize(format.contentLength)}
              </option>
            ))}
            <option value="mp3">🎵 MP3 Audio</option>
          </select>
          <button type="submit" style={{ display: formats.length ? '' : 'none', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#0070f3', color: '#fff', cursor: 'pointer', border: 'none'}}>Download</button>
          </form>
          </div>
        </>
      )}

    </div>
  );
};

export default SearchBox;
