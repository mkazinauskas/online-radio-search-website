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
    const { contactUsLink, searchResults } = this.props;

    return (
      <div>
        <Head>
          <title>{searchResults.query} search results of Internet Radio, Free Music | OnlineRadioSearch.com</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar contactUsLink={contactUsLink} />

        <RadioStationsResults searchResults={searchResults} />

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
    title.replaceAll('-', ' '),
    page,
    size
  ).execute();

  return {
    contactUsLink: publicRuntimeConfig.CONTACT_US_LINK,
    searchResults,
  }
}

export default withRouter(SearchByRadioStation);