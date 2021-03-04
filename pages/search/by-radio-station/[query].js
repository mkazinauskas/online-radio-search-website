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
import extract from '../../../src/utils/website-config';

class SearchByRadioStation extends Component {

  render() {
    const { websiteConfig, radioStationsSearchResponseHolder, lastSearhesResponseHolder, query } = this.props;

    if(!websiteConfig){
      throw new Error('Website config is undefined.');
    }

    const { websiteName } = websiteConfig;
    return (
      <div>
        <Head>
          <title>{query} Internet Radio Search Results, Listen to Free Music | {websiteName}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar websiteConfig={websiteConfig} />

        <RadioStationsResults radioStationsSearchResponseHolder={radioStationsSearchResponseHolder} />

        <Footer websiteConfig={websiteConfig} lastSearhesResponseHolder={lastSearhesResponseHolder} />

      </div>
    )
  }

}

SearchByRadioStation.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { query, page, size } = router.query


  const cleanQuery = query.replaceAll('-', ' ');

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
    ...extract(publicRuntimeConfig),
    radioStationsSearchResponseHolder,
    lastSearhesResponseHolder,
    query: cleanQuery
  }
}

export default withRouter(SearchByRadioStation);