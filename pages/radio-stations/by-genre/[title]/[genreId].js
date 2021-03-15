import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../../src/components/navbar/navbar';
import React, { Component } from 'react';
import Footer from '../../../../src/components/footer';
import RadioStationsByGenreResults from '../../../../src/components/search/radio-stations-by-genre-results';
import { withRouter } from 'next/router'
import { LastSearches } from '../../../../src/api/last-searches/last-searhes';
import extract from '../../../../src/utils/website-config';
import { RadioStationsByGenre } from '../../../../src/api/radio-station/radio-stations-by-genre'

class RadioStationsByGenrePage extends Component {

  render() {
    const { websiteConfig, radioStationsByGenreResponseHolder, lastSearhesResponseHolder, title } = this.props;

    if(!websiteConfig){
      throw new Error('Website config is undefined.');
    }

    const { websiteName } = websiteConfig;
    return (
      <div>
        <Head>
          <title>{title} Internet Radio Search Results, Listen to Free Music | {websiteName}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar websiteConfig={websiteConfig} />

        <RadioStationsByGenreResults radioStationsByGenreResponseHolder={radioStationsByGenreResponseHolder} />

        <Footer websiteConfig={websiteConfig} lastSearhesResponseHolder={lastSearhesResponseHolder} />

      </div>
    )
  }

}

RadioStationsByGenrePage.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { title, page, size, genreId } = router.query

  const cleanTitle = title.replaceAll('-', ' ');

  const radioStationsByGenreApi = await new RadioStationsByGenre(
    publicRuntimeConfig.API_URL,
    cleanTitle,
    genreId,
    page,
    size
  );

  const lastSearhesApi = new LastSearches(
    publicRuntimeConfig.API_URL,
    //todo
    50
  )

  const [
    radioStationsByGenreResponseHolder,
    lastSearhesResponseHolder
  ] = await Promise.all([
    radioStationsByGenreApi.execute(),
    lastSearhesApi.execute()
  ]);

  return {
    ...extract(publicRuntimeConfig),
    radioStationsByGenreResponseHolder,
    lastSearhesResponseHolder,
    title: cleanTitle
  }
}

export const URL_PATH = '/search/by-radio-station';

export default withRouter(RadioStationsByGenrePage);