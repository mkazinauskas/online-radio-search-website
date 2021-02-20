import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../src/components/navbar';
import React, { Component } from 'react';
import Footer from '../../../src/components/footer';
import RadioStationsResults from '../../../src/components/search/radio-stations-results';
import { RadioStationsSearch } from '../../../src/api/search/radio-stations-search';
import { withRouter } from 'next/router'

class SearchByRadioStation extends Component {

  render() {
    const contactUsLink = this.props.contactUsLink;
    const results = this.props.searchResults;

    return (
      <div>
        <Head>
          <title>Online Radio Stations, Internet Radio, Free Music | OnlineRadioSearch.com</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar contactUsLink={contactUsLink} />

        <RadioStationsResults searchResults={results} />

        <Footer contactUsLink={contactUsLink} />

      </div>
    )
  }

}

SearchByRadioStation.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { title, page, size } = router.query

  const searchResults = await new RadioStationsSearch(
    publicRuntimeConfig.API_URL,
    title,
    page,
    size
  ).execute();

  return {
    contactUsLink: publicRuntimeConfig.CONTACT_US_LINK,
    searchResults
  }
}

export default withRouter(SearchByRadioStation);