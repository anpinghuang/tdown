  // `pages/_app.js`
import '../styles/global.css';


/// must have this to use fontawesome in project
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}