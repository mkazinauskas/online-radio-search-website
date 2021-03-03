import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../src/components/navbar';
import React, { Component } from 'react';
import Footer from '../../../src/components/footer';
import RadioStationsResults from '../../../src/components/search/radio-stations-results';
import { RadioStationsSearch } from '../../../src/api/search/radio-stations-search';
import { withRouter } from 'next/router'
import { LastSearches } from '../../../src/api/last-searches/last-searhes';

class SearchByRadioStation extends Component {

  render() {
    const { contactUsLink, radioStationsSearchResponseHolder, lastSearhesResponseHolder, query} = this.props;

    return (
      <div>
        <Head>
          <title>{query} Internet Radio Search Results, Listen to Free Music | OnlineRadioSearch.com</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar contactUsLink={contactUsLink} />

        <RadioStationsResults radioStationsSearchResponseHolder={radioStationsSearchResponseHolder} />

        <Footer contactUsLink={contactUsLink} lastSearhesResponseHolder={lastSearhesResponseHolder} />

      </div>
    )
  }

}

SearchByRadioStation.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { query, page, size } = router.query


  const cleanQuery =  query.replaceAll('-', ' ');

  const radioStationsSearchApi = await new RadioStationsSearch(
    publicRuntimeConfig.API_URL,
    cleanQuery,
    page,
    size
  );

  const lastSearhesApi = new LastSearches(
    publicRuntimeConfig.API_URL,
    //todo
    50
  )

  const [
    radioStationsSearchResponseHolder,
    lastSearhesResponseHolder
  ] = await Promise.all([
    radioStationsSearchApi.execute(),
    lastSearhesApi.execute()
  ]);

  return {
    contactUsLink: publicRuntimeConfig.CONTACT_US_LINK,
    radioStationsSearchResponseHolder,
    lastSearhesResponseHolder,
    query: cleanQuery
  }
}

export default withRouter(SearchByRadioStation);