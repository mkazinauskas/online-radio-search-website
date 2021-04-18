import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../src/components/navbar/navbar';
import React, { Component } from 'react';
import Footer from '../../../src/components/footer';
import { RadioStationInfo } from '../../../src/api/radio-station/radio-station-info';
import { withRouter } from 'next/router'
import RadioStationContainer from '../../../src/components/radio-station/radio-station-container';
import { RadioStationStreams } from '../../../src/api/radio-station/radio-station-streams';
import { RadioStationSongs } from '../../../src/api/radio-station/radio-station-songs';
import { LastSearches } from '../../../src/api/last-searches/last-searhes';
import extract from '../../../src/utils/website-config';

class RadioStationPage extends Component {

  render() {

    const {
      websiteConfig,
      radioStationResponseHolder,
      radioStationStreamsResponseHolder,
      radioStationSongsResponseHolder,
      lastSearhesResponseHolder,
      requestTitle
    } = this.props;

    if (!websiteConfig) {
      throw new Error('Website config is undefined.');
    }

    const {
      websiteName
    } = websiteConfig;

    return (
      <div>
        <Head>
          <title>{requestTitle} search results of Internet Radio, Free Music | {websiteName}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar websiteConfig={websiteConfig} />

        <RadioStationContainer
          radioStationResponseHolder={radioStationResponseHolder}
          radioStationStreamsResponseHolder={radioStationStreamsResponseHolder}
          radioStationSongsResponseHolder={radioStationSongsResponseHolder}
        />

        <Footer
          websiteConfig={websiteConfig}
          lastSearhesResponseHolder={lastSearhesResponseHolder}
        />

      </div>
    )
  }

}

RadioStationPage.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { id, title, page: songsPage } = router.query

  console.log(songsPage);

  const radioStationApi = new RadioStationInfo(
    publicRuntimeConfig.API_URL,
    id
  );

  const radioStationStreamsApi = new RadioStationStreams(
    publicRuntimeConfig.API_URL,
    id
  );

  const radioStationSongsApi = new RadioStationSongs(
    publicRuntimeConfig.API_URL,
    id,
    songsPage
  )

  const lastSearhesApi = new LastSearches(
    publicRuntimeConfig.API_URL,
    //todo
    50
  )

  const [
    radioStationResponseHolder,
    radioStationStreamsResponseHolder,
    radioStationSongsResponseHolder,
    lastSearhesResponseHolder
  ] = await Promise.all([
    radioStationApi.execute(),
    radioStationStreamsApi.execute(),
    radioStationSongsApi.execute(),
    lastSearhesApi.execute()
  ]);

  return {
    ...extract(publicRuntimeConfig),
    radioStationResponseHolder,
    radioStationStreamsResponseHolder,
    radioStationSongsResponseHolder,
    lastSearhesResponseHolder,
    requestTitle: title
  }
}

export default withRouter(RadioStationPage);