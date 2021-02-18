import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import Footer from '../components/footer';
import NavBar from '../components/navbar';
import SectionAboutUs from '../components/main/section-about-us';
import SectionWhyUs from '../components/main/section-why-us';

function Home({ contactUsLink }) {
  return (
    <div>
      <Head>
        <title>Online Radio Stations, Internet Radio, Free Music | OnlineRadioSearch.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header class="pattern" style={{backgroundImage: 'url("/img/main/main-background.jpg")'}}>
        <div class="container px-6 md:pb-10 mx-auto">

          <nav class="flex flex-col md:py-10 py-5 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <a href="#" class="text-xl md:text-2xl font-semibold text-white hover:text-gray-300">Online Radio Search</a>
            </div>

            <div class="flex items-center mt-2">
              <a href="#" class="px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 transform border-2 rounded hover:bg-gray-700">Downlaod App</a>
            </div>
          </nav>

          <div class="flex flex-col items-center md:py-15 pt-10 md:h-128 text-center">
            <h1 class="text-white mt-4 text-xl font-semibold dark:text-white">We gather all the stations of the world in one place</h1>
            <p class="text-white mt-3">Search for thousands of radio stations wordwide. We share music, news, podcasts and everything what you need to have a good day!</p>
          </div>

          <div class="flex flex-col items-center lg:pb-32 lg:pt-15 py-10 md:h-128">
            <div class="w-full md:max-w-lg h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
              <input type="search" name="search" id="search" placeholder="Search for radio station, podcast, news..."
                class="appearance-none outline-none w-full focus:outline-none active:outline-none" />

              <button type="submit" class="ml-1 outline-none focus:outline-none active:outline-none">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

            </div>
          </div>

        </div>
      </header>

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