import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import Footer from '../src/components/footer';
import SectionAboutUs from '../src/components/main/section-about-us';
import SectionWhyUs from '../src/components/main/section-why-us';
import HeaderLeader from '../src/components/main/header-leader';
import { LastSearches } from '../src/api/last-searches/last-searhes';
import extract from '../src/utils/website-config';

function Home({ websiteConfig, lastSearhesResponseHolder }) {
  return (
    <div>
      <Head>
        <title>Online Radio Stations, Internet Radio, Free Music | OnlineRadioSearch.com</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderLeader websiteConfig={websiteConfig} />

      <SectionWhyUs />

      <SectionAboutUs />

      <Footer websiteConfig={websiteConfig} lastSearhesResponseHolder={lastSearhesResponseHolder} />

    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const { publicRuntimeConfig } = getConfig()

  const lastSearhesApi = new LastSearches(
    publicRuntimeConfig.API_URL,
    //todo
    50
  )

  const [
    lastSearhesResponseHolder
  ] = await Promise.all([
    lastSearhesApi.execute()
  ]);

  return {
    ...extract(publicRuntimeConfig),
    lastSearhesResponseHolder
  }
}

export default Home;