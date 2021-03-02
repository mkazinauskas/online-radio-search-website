import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../src/components/navbar';
import React, { Component } from 'react';
import Footer from '../../../src/components/footer';
import { RadioStationInfo } from '../../../src/api/radio-station/radio-station-info';
import { withRouter } from 'next/router'
import RadioStationInfoPanel from '../../../src/components/radio-station/radio-station-info-panel';
import { RadioStationStreams } from '../../../src/api/radio-station/radio-station-streams';
import { RadioStationSongs } from '../../../src/api/radio-station/radio-station-songs';

class RadioStationPage extends Component {

  render() {

    const { contactUsLink, radioStationResponseHolder, radioStationStreamsResponseHolder, radioStationSongsResponseHolder, requestTitle } = this.props;

    return (
      <div>
        <Head>
          <title>{requestTitle} search results of Internet Radio, Free Music | OnlineRadioSearch.com</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar contactUsLink={contactUsLink} />

        <RadioStationInfoPanel
          radioStationResponseHolder={radioStationResponseHolder}
          radioStationStreamsResponseHolder={radioStationStreamsResponseHolder}
          radioStationSongsResponseHolder={radioStationSongsResponseHolder}
        />

        <Footer contactUsLink={contactUsLink} />

      </div>
    )
  }

}

RadioStationPage.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { id, title } = router.query

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
    id
  )

  const [
    radioStationResponseHolder,
    radioStationStreamsResponseHolder,
    radioStationSongsResponseHolder
  ] = await Promise.all([
    radioStationApi.execute(),
    radioStationStreamsApi.execute(),
    radioStationSongsApi.execute()
  ]);

  return {
    contactUsLink: publicRuntimeConfig.CONTACT_US_LINK,
    radioStationResponseHolder,
    radioStationStreamsResponseHolder,
    radioStationSongsResponseHolder,
    requestTitle: title
  }
}

export default withRouter(RadioStationPage);