import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../src/components/navbar';
import React, { Component } from 'react';
import Footer from '../../../src/components/footer';
import { RadioStationInfo } from '../../../src/api/radio-station/radio-station-info';
import { withRouter } from 'next/router'
import RadioStationInfoPanel from '../../../src/components/radio-station/radio-station-info-panel';

class RadioStationPage extends Component {

  render() {

    const { contactUsLink, radioStationResponseHolder, requestTitle } = this.props;

    return (
      <div>
        <Head>
          <title>{requestTitle} search results of Internet Radio, Free Music | OnlineRadioSearch.com</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar contactUsLink={contactUsLink} />

        <RadioStationInfoPanel radioStationResponseHolder={radioStationResponseHolder} />

        <Footer contactUsLink={contactUsLink} />

      </div>
    )
  }

}

RadioStationPage.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { id, title } = router.query

  const radioStationResponseHolder = await new RadioStationInfo(
    publicRuntimeConfig.API_URL,
    id
  ).execute();

  return {
    contactUsLink: publicRuntimeConfig.CONTACT_US_LINK,
    radioStationResponseHolder,
    requestTitle: title
  }
}

export default withRouter(RadioStationPage);