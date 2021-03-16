import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../../src/components/navbar/navbar';
import React, { Component } from 'react';
import Footer from '../../../../src/components/footer';
import RadioStationsByPlayedSongResults from '../../../../src/components/search/radio-stations-by-played-song-results';
import { withRouter } from 'next/router'
import { LastSearches } from '../../../../src/api/last-searches/last-searhes';
import extract from '../../../../src/utils/website-config';
import { RadioStationsByPlayedSong } from '../../../../src/api/radio-station/radio-stations-by-played-song'

class RadioStationsByPlayedSongsPage extends Component {

  render() {
    const { websiteConfig, radioStationsByPlayedSongResponseHolder, lastSearhesResponseHolder, title } = this.props;

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

        <RadioStationsByPlayedSongResults radioStationsByPlayedSongResponseHolder={radioStationsByPlayedSongResponseHolder} />

        <Footer websiteConfig={websiteConfig} lastSearhesResponseHolder={lastSearhesResponseHolder} />

      </div>
    )
  }

}

RadioStationsByPlayedSongsPage.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { title, page, size, songId } = router.query

  const cleanTitle = title.replaceAll('-', ' ');

  const radioStationsByPlayedSongApi = await new RadioStationsByPlayedSong(
    publicRuntimeConfig.API_URL,
    cleanTitle,
    songId,
    page,
    size
  );

  const lastSearhesApi = new LastSearches(
    publicRuntimeConfig.API_URL,
    //todo
    50
  )

  const [
    radioStationsByPlayedSongResponseHolder,
    lastSearhesResponseHolder
  ] = await Promise.all([
    radioStationsByPlayedSongApi.execute(),
    lastSearhesApi.execute()
  ]);

  return {
    ...extract(publicRuntimeConfig),
    radioStationsByPlayedSongResponseHolder,
    lastSearhesResponseHolder,
    title: cleanTitle
  }
}

export default withRouter(RadioStationsByPlayedSongsPage);