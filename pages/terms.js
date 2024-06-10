import Head from 'next/head';
import Navbar from '../components/navbar';
import styles from '../styles/Home.module.css';

import Link from 'next/link';

export default function Terms() {
  return (
    <div>
    <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}> 
      <Head>
        <title>SwiftDownloader - Terms of Service</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content='Terms of Service for SwiftDownloader' />

        {/* open graph stuff */}
        <meta property="og:title" content="SwiftDownloader - Terms of Service" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swiftdownloader.com/terms" />

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
        Terms of Service</h1>
        
        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Welcome to swiftdownloader</h2>
            <p>These terms of service outline the rules and regulations for the use of swiftdownloader's Website. By accessing this website we assume you accept these terms of service in full. Do not continue to use swiftdownloader's website if you do not get all of the terms of service stated on this page.</p>
            <p>The following terminology applies to these Terms of Service, Privacy Statement and Disclaimer Notice and any or all Agreements: "Client," "You" and "Your" refers to you, the person accessing this website and accepting the Company's terms of service. "The Company," "Ourselves," "We," "Our," and "Us" refers to our Company. "Party," "Parties," or "Us" refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration or any other means, for the express purpose of meeting the Client's needs in respect of the provision of the Company's stated services/products, under and subject to, prevailing law of. Any use of the above terminology or other words in the singular, plural, capitalization, and he/she or they, are taken as interchangeable and, therefore, referring to the same.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Cookies</h2>
            <p>We employ the use of cookies. Using swiftdownloader's website you consent to the use of cookies following swiftdownloader's privacy policy.</p>
            <p>Most of the modern-day interactive web sites use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site to allow this area's functionality and ease of use for those people visiting. Some of our affiliate/advertising partners may also use cookies.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>License</h2>
            <p>Unless otherwise stated, swiftdownloader and it's licensors own the intellectual property rights for all material on swiftdownloader. All intellectual property rights are reserved. You may view and print pages from swiftdownloader.com/ for your personal use subject to restrictions set in these terms of service.</p>
            <p>You must not:</p>
            <ul>
                <li>Republish material from swiftdownloader.com/</li>
                <li>Sell, rent, or sub-license material from swiftdownloader.com/</li>
                <li>Reproduce, duplicate or copy material from swiftdownloader.com/</li>
                <li>Redistribute content from swiftdownloader (unless content is specifically made for redistribution).</li>
            </ul>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>User comments</h2>
            <p>This Agreement shall begin on the date hereof.</p>
            <p>Certain parts of this website offer users the opportunity to post and exchange opinions, information, material, and data ('Comments') in areas of the website. swiftdownloader does not screen, edit, publish or review Comments before their appearance on the website, and Comments do not reflect the views or opinions of swiftdownloader, its agents, or affiliates. Comments reflect the view and opinion of the person who posts such views or opinions. To the extent permitted by applicable laws, swiftdownloader shall not be responsible or liable for the Comments or any loss cost, liability, damages or expenses caused and or suffered due to any use of and posting of and appearance of the Comments on this website.</p>
            <p>swiftdownloader reserves the right to monitor all comments and to remove any Comments which it considers in its absolute discretion to be inappropriate, offensive, or otherwise in breach of these Terms of Service.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>You warrant and represent that:</h2>
            <ul>
                <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                <li>The Comments do not infringe any intellectual property right, including without limitation copyright, patent or trademark, or other proprietary rights of any third party;</li>
                <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material or material invasion of privacy;</li>
                <li>Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity;</li>
                <li>You, with this grant to swiftdownloader, a non-exclusive royalty-free license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in all forms, formats, or media.</li>
            </ul>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Hyperlinking to our Content</h2>
            <p>The following organizations may link to our Website without prior written approval:</p>
            <ul>
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
            </ul>
            <p>These organizations may link to our home page, publications, or other Web site information so long as the link:</p>
            <ul>
                <li>Is not in any way deceptive;</li>
                <li>Does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services;</li>
                <li>Fits within the context of the linking party's site;</li>
            </ul>

            <p>We may consider and approve in our sole discretion other link requests from the following types of organizations:</p>
            <ul>
                <li>commonly-known consumer and/or business information sources;</li>
                <li>dot.com community sites;</li>
                <li>associations or other groups representing charities;</li>
            </ul>

            <p>We will approve link requests from these organizations if we determine that:</p>
            <ul>
                <li>the link would not reflect unfavorably on us or our accredited businesses (for example, trade associations or other organizations representing inherently suspect types of business, such as work-at-home opportunities, shall not be allowed to link)</li>
                <li>the organization does not have an unsatisfactory record with us; or</li>
                <li>the benefit to us from the visibility of the hyperlink compensates the absence of swiftdownloader.</li>
            <li>We will approve a link request from these organizations if we determine that the link would not reflect unfavorably on us or our accredited businesses, or if the name of the organization does not reflect the organization's primary brand. </li>
            </ul>

            <p>These organizations may link to our home page, publications, or other Web site information so long as the link:</p>
            <ul>
                <li>Is not in any way deceptive;</li>
                <li>Does not falsely imply sponsorship, endorsement or approval of the linking party and it products or services;</li>
                <li>Fits within the context of the linking party's site;</li>
                <li>Is not framed on any other site, including without limitation, another site, or any framing of our site.</li>
                <li>Does not contain malicious code, such as URLs or other code that may be used in a commitment to compromise our information;</li>
                <li>Does not automatically redirect to another Web site.</li>
                <li>Does not take advantage of our commitment to complying with the legal requirements that this agreement places on us in these areas.</li>
            </ul>

            <p>Approved organizations may hyperlink to our Web site as follows:</p>
            <ul>
                <li>By use of our corporate name; or</li>
                <li>By use of the uniform resource locator (Web address) being linked to; or</li>
                <li>By use of any other description of our Web site or material being linked to that makes sense within the context and format of content on the linking party's site.</li>
            </ul>
            <p>No use of swiftdownloader's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Iframes</h2>
            <p>Without prior approval and express written permission, you may not create frames around our Web pages or use other techniques that alter in any way the visual presentation or appearance of our Web site.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Content Liability</h2>
            <p>We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your website. No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement other violation of any third party rights.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Reservation of Rights</h2>
            <p>We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also reserve the right to amend these terms of service and its linking policy at any time. By continuing to link to our Web site, you agree to be bound to and abide by these linking terms of service.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Removal of links from our website</h2>
            <p>If you find any link on our Web site or any linked web site objectionable, you may contact us about this. We will consider requests to remove links but will have no obligation to do so or to respond directly to you.

While we endeavor to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the web site's material is kept up to date.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Disclaimer</h2>
            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose, and the use of reasonable care and skill). Nothing in this disclaimer will:</p>
            <ul>
                <li>limit or exclude our or your liability for death or personal injury resulting from negligence;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p>The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer:

are subject to the preceding paragraph; and
govern all liabilities arising under the disclaimer or concerning the subject matter of this disclaimer, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty.
To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage.</p>
        </section>

        <section style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", width: "80%", margin: "0 auto" }}>
            <h2>Contact Information</h2>
            <p>If you have any queries regarding any of our terms, please contact us at admin@swiftdownloader.com.</p>
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