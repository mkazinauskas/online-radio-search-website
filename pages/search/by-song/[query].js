import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../src/components/navbar/navbar';
import React, { Component } from 'react';
import Footer from '../../../src/components/footer';
import { SearchSong } from '../../../src/api/search/search-song';
import { withRouter } from 'next/router'
import { LastSearches } from '../../../src/api/last-searches/last-searhes';
import extract from '../../../src/utils/website-config';
import SongsResult from '../../../src/components/search/songs-results'

class SearchByRadioStation extends Component {

  render() {
    const { websiteConfig, searchSongResponseHolder, lastSearhesResponseHolder, query } = this.props;

    if(!websiteConfig){
      throw new Error('Website config is undefined.');
    }

    const { websiteName } = websiteConfig;
    return (
      <div>
        <Head>
          <title>{query} Songs Played Results, Listen to Free Music | {websiteName}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar websiteConfig={websiteConfig} />

        <SongsResult searchSongResponseHolder={searchSongResponseHolder} />

        <Footer websiteConfig={websiteConfig} lastSearhesResponseHolder={lastSearhesResponseHolder} />

      </div>
    )
  }

}

SearchByRadioStation.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { query, page, size } = router.query


  const cleanQuery = query.replaceAll('-', ' ');

  const searchSongApi = await new SearchSong(
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
    searchSongResponseHolder,
    lastSearhesResponseHolder
  ] = await Promise.all([
    searchSongApi.execute(),
    lastSearhesApi.execute()
  ]);

  return {
    ...extract(publicRuntimeConfig),
    searchSongResponseHolder,
    lastSearhesResponseHolder,
    query: cleanQuery
  }
}

export const URL_PATH = '/search/by-song';

export default withRouter(SearchByRadioStation);