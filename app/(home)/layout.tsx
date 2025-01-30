import Script from "next/script";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5XRHMQ22');`}
      </Script>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-QMPK2W9W6E"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QMPK2W9W6E');
        `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5XRHMQ22"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <div className="min-h-screen min-w-full font-montserratSans">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
