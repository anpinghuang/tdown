import Layout, {siteTitle} from '../../components/layout';

import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Script from 'next/script';



export default function FirstPage() {
  return (
    <>
    <Layout>
    <Head>
        <title>{siteTitle}</title>
    </Head>
    <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
    <div>
      <h1>First Page</h1>
      <h2><Link href='/'>Go back to  home</Link></h2>
      <Image src="/vercel.svg" alt="firstpage" width={500} height={500} />
    </div>
    </Layout>
    </>
  )
}