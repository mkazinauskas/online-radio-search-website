import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import Footer from '../src/components/footer';
import SectionAboutUs from '../src/components/main/section-about-us';
import SectionWhyUs from '../src/components/main/section-why-us';
import HeaderLeader from '../src/components/main/header-leader';

function Home({ contactUsLink }) {
  return (
    <div>
      <Head>
        <title>Online Radio Stations, Internet Radio, Free Music | OnlineRadioSearch.com</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderLeader contactUsLink={contactUsLink} />

      <SectionAboutUs />

      <SectionWhyUs />

      <Footer contactUsLink={contactUsLink} />

    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const { publicRuntimeConfig } = getConfig()
  return { contactUsLink: publicRuntimeConfig.CONTACT_US_LINK }
}

export default Home;