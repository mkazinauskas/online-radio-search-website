import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../components/navbar';

function Home({ contactUsLink }) {
  return (
    <div>
      <Head>
        <title>Online Radio Stations, Internet Radio, Free Music | OnlineRadioSearch.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <NavBar contactUsLink={contactUsLink} />
     

    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const { publicRuntimeConfig } = getConfig()
  return { contactUsLink: publicRuntimeConfig.CONTACT_US_LINK }
}

export default Home;