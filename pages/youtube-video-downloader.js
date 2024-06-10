import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

import SearchBox from '../components/searchbox';
import Navbar from '../components/navbar';

import Image from 'next/image';

import banner1 from '../public/banner1.png';
import banner2 from '../public/banner2.png';
import banner3 from '../public/banner3.png';
import example from '../public/example.png';



// font 
import { Manrope } from 'next/font/google'
 
const manrope = Manrope({
  weight: '400',
  subsets: ['latin'],
})



// use fontawesome stuff like so
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faYoutube } from "@fortawesome/free-solid-svg-icons";



export default function Home() {
  return (
    <div>
            
      <div style={{justifyContent: 'center', alignItems: 'center',display: 'flex', flexDirection: 'column'}}> 
      <Head>
        <title>Free YouTube Video Downloader Online - SwiftDownloader.com</title> 
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content='Explore SwiftDownloader&#039;s YouTube video downloader - a secure, fast, and free solution for unlimited YouTube video downloads. Offering high-quality MP4, MP3 downloads, and more with ease!' />

        {/* open graph stuff */}
        <meta property="og:title" content="Free YouTube Video Downloader Online - SwiftDownloader.com" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swiftdownloader.com/youtube-video-downloader" />

        <meta property="og:image" content="https://swiftdownloader.com/bannerforgraphql.png" />
        <meta property="og:image:secure_url" content="https://swiftdownloader.com/bannerforgraphql.png" />
        <meta property="og:image:width" content="1350" />
        <meta property="og:image:height" content="749" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://swiftdownloader.com/bannerforgraphql.png" />
      </Head>
      <Navbar></Navbar>

      <main className={styles.container}> 
        <h1 className={styles.title}>
        YouTube Video Downloader</h1>
        <h2 className={styles.description}>YouTube Video Downloader</h2>
        <SearchBox></SearchBox>
        
      </main>
      <div className={styles.threedivflex}>  
    <div className={styles.threediv}>
        <p style={{fontWeight: "bold", color: 'blue'}}>1. Find Your Video</p>
        <p>Type in the URL of the YouTube video you want to download.</p>
        <p>Example: Enter "https://www.youtube.com/watch?v=dQw4w9WgXcQ" to download the video directly.</p>
    </div>
    <div className={styles.threediv}>
        <p style={{fontWeight: "bold", color: 'blue'}}>2. Choose Your Format</p>
        <p>Select from multiple formats and resolutions like MP4, MP3, and more. Our tool supports high-quality downloads.</p>
        <p>Example: Download in 1080p MP4 format for the best video quality.</p>
    </div>
    <div className={styles.threediv}>
        <p style={{fontWeight: "bold", color: 'blue'}}>3. Download Your Video</p>
        <p>Click the download button to save the video to your device. Enjoy offline access to your favorite videos.</p>
        <p>Example: Convert your favorite music video to MP3 for easy listening on the go.</p>
    </div>
</div>

{/* No need to register or install software. Download YouTube videos and audio directly from your browser */}
{/* the div that encompasses all of the sections */}
<div className={manrope.className} style={{fontSize: '20px', display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center"}}>
    <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
        <h2>Download YouTube Videos and Audio for Free</h2>
        <p>Explore Swiftdownloader's YouTube video downloader - a secure, fast, and free solution for unlimited YouTube video downloads.</p>
        <p>Our free tool allows you to download YouTube videos and playlists effortlessly. Simply paste the URL, choose your format, and download.</p>
        <p>Whether you're looking to save videos for offline viewing or convert YouTube videos to MP3, our tool is here to help. Enjoy fast and high-quality downloads without any software installation.</p>
        {/* <div className={styles.dataImagesDiv}>
            <Image className={styles.dataImages} src={banner1} alt="Download" sizes="10vw"/>
            <Image className={styles.dataImages} src={banner2} alt="Download" sizes="10vw"/>
            <Image className={styles.dataImages} src={banner3} alt="Download" sizes="10vw"/>
        </div> */}
    </section>

    <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
        <h2>Why Choose Our YouTube Downloader?</h2>
        <p>Our tool is designed to provide a seamless and efficient downloading experience. No ads, no registration, just pure functionality.</p>
        <p>Download videos in various formats including MP4, MP3, and more. Our tool supports high-speed downloads and ensures the best quality available.</p>
        <p>Experience the convenience of offline access to your favorite YouTube content, anytime and anywhere.</p>
    </section>

    <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
        <h2>Easy and Fast YouTube to MP3 and MP4 Downloads</h2>
        <p>Just enter a YouTube URL, choose your desired format, and click the download button. Our tool will handle the rest.</p>
        <p>Perfect for downloading videos for offline viewing or converting them to MP3 for audio enjoyment. No more buffering, just smooth playback.</p>
        <p>Use our YouTube downloader to create a library of your favorite content, accessible without an internet connection.</p>
    </section>

    <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
        <h2>Download YouTube Videos in High Quality</h2>
        <p>SwiftDownloader is a free online tool that enables you to download YouTube videos in various formats and resolutions.</p>
        <p>Whether it's 1080p video or high-fidelity audio, our tool delivers.</p>
        <Image style={{width: '70%', height: 'auto', margin: '40px'}} src={example} alt="Example" sizes="100%"/>
        <p>Enjoy your downloaded content on any device, be it your phone, tablet, or computer. Our tool is designed to work seamlessly across all platforms.</p>
    </section>

    <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
        <h2>Your Go-To YouTube Downloader Online</h2>
        <p>Our free YouTube downloader is the perfect alternative to other tools. With no hidden fees or subscriptions, you can enjoy unlimited downloads at no cost.</p>
        <p>Start building your offline library today with our easy-to-use, high-quality YouTube downloader. Experience the best in video and audio downloading.</p>
    </section>

    <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
        <h2>Get Started with Our YouTube Converter to MP3</h2>
        <p>Simply enter a YouTube URL in the search bar above, choose your preferred format, and hit download. It's that easy!</p>
        <p>Explore the features of our YouTube downloader and start enjoying your favorite content offline today.</p>
        <p>For more advanced options and features, check out other popular tools and articles on the best YouTube downloaders available.</p>
        <a href='https://ssyoutube.com/'>Download YouTube to MP4 with SSYouTube: Online Video Downloader</a>
        <a href='https://ytmp3s.nu/'>Download YouTube to MP3 with ytmp3s</a>
        <a href='https://onlinevideoconverter.pro/'>OnlineVideoConverter</a>
    </section>
</div>

      
          

    <style jsx>{`
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Manrope,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>

    <footer className={styles.footer}>
  <div className={styles.footerContent}>
    <p>© 2024 SwiftDownloader, Made with ❤️</p>
    <img src="/swiftdownloader.png" alt="swiftdownloader" className={styles.footerLogo} />
  </div>
  <ul className={styles.footerLinks}>
    <li><Link href='/terms' className={styles.footerLink}>Terms and Conditions</Link></li>
    <li><Link href='/privacy' className={styles.footerLink}>Privacy Policy</Link></li>
  </ul>
</footer>


    </div>
  );
}
