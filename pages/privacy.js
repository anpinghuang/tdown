import Head from 'next/head';
import Navbar from '../components/navbar';
import styles from '../styles/Home.module.css';

import Link from 'next/link';

export default function Terms() {
  return (

    <div>
    <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}> 
      <Head>
        <title>SwiftDownloader - Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content='Privacy policy for SwiftDownloader' />

        {/* open graph stuff */}
        <meta property="og:title" content="SwiftDownloader - Terms of Service" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swiftdownloader.com/privacy" />

        <meta property="og:image" content="https://swiftdownloader.com/bannerforgraphql.png" />
        <meta property="og:image:secure_url" content="https://swiftdownloader.com/bannerforgraphql.png" />
        <meta property="og:image:width" content="1350" />
        <meta property="og:image:height" content="749" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="https://swiftdownloader.com/bannerforgraphql.png" />
      </Head>
      <Navbar></Navbar>

      <main className={styles.termscontainer}> 
        <h1 className={styles.termstitle}>
        Privacy policy</h1>
        
        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Your privacy is important to us</h2>
            <p>swiftdownloader's policy is to respect your privacy regarding any information we may collect while operating our website. This Privacy Policy applies to swiftdownloader.com/ (hereinafter, "us", "we", or "swiftdownloader.com/"). We respect your privacy and are committed to protecting personally identifiable information you may provide us through the website. We have adopted this privacy policy to explain what information may be collected on our website, how we use this information, and under what circumstances we may disclose the information to third parties. This Privacy Policy applies only to information we collect through the website and does not apply to our collection of information from other sources.</p>
            <p>This Privacy Policy, together with the Terms of service posted on our website, set forth the general rules and policies governing your use of our website. Depending on your activities when visiting our website, you may be required to agree to additional service terms.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Website Visitors</h2>
            <p>Like most website operators, swiftdownloader collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. swiftdownloader's purpose in collecting non personally identifying information is to understand better how swiftdownloader's visitors use its website. From time to time, swiftdownloader may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Log Files</h2>
            <p>swiftdownloader.com follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any personally identifiable information. The data aims to analyze trends, administer the site, track users' movement on the website, and gather demographic information.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Gathering of Personally-Identifying Information</h2>
            <p>Individual visitors to swiftdownloader's websites choose to interact with swiftdownloader in ways that require swiftdownloader to gather personally-identifying information. The amount and type of information that swiftdownloader gathers depend on the nature of the interaction. For example, we ask visitors who sign up for a blog at https://swiftdownloader.com/ to provide a username and email address.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Security</h2>
            <p>The security of your Personal Information is important to us, but remember that no transmission method over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Google DoubleClick DART Cookie</h2>
            <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other internet sites. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Other Third-Party Advertisers</h2>
            <p>Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by swiftdownloader and does not cover cookies by any advertisers.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Links To External Sites</h2>
            <p>Our service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and Terms of service of every site you visit.
            We have no control over and assume no responsibility for the content, privacy policies, or practices of any third party sites, products, or services.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Aggregated Statistics</h2>
            <p>swiftdownloader may collect statistics about the behavior of visitors to its website. swiftdownloader may display this information publicly or provide it to others. However, swiftdownloader does not disclose your personally-identifying information.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Cookies</h2>
            <p>To enrich and perfect your online experience, swiftdownloader uses "Cookies" similar technologies and services provided by others to display personalized content, appropriate advertising, and store your computer preferences.
            A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. swiftdownloader uses cookies to help swiftdownloader identify and track visitors, their usage of https://swiftdownloader.com/, and their website access preferences. swiftdownloader visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using swiftdownloader's websites. The drawback is that certain features of swiftdownloader's websites may not function properly without the aid of cookies. By navigating our website without changing your cookie settings, you, at this moment, acknowledge and agree to swiftdownloader's use of cookies. You can choose to disable cookies through your browser options. It can be found at the browser's cookie setting to know more detailed information about cookie management with specific web browsers.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Children's Information</h2>
            <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and monitor and guide their online activity.</p>
           
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Online Privacy Policy Only</h2>
            <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website regarding the information they shared and collected in swiftdownloader.com. This policy does not apply to any information collected offline or via channels other than this website.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
          <h2>Privacy Policy Changes</h2>
          <p>Although most changes are likely to be minor, swiftdownloader may change its Privacy Policy from time to time, and in swiftdownloader's sole discretion. swiftdownloader encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.</p>
        </section>
      </main>

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