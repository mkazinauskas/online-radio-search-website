import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../src/components/navbar/navbar';
import React, { Component } from 'react';
import Footer from '../../../src/components/footer';
import { SearchGenre } from '../../../src/api/search/search-genre';
import { withRouter } from 'next/router'
import { LastSearches } from '../../../src/api/last-searches/last-searhes';
import extract from '../../../src/utils/website-config';
import GenreResults from '../../../src/components/search/genre-results'

class SearchByGenre extends Component {

  render() {
    const { websiteConfig, searchGenreResponseHolder, lastSearhesResponseHolder, query } = this.props;

    if(!websiteConfig){
      throw new Error('Website config is undefined.');
    }

    const { websiteName } = websiteConfig;
    return (
      <div>
        <Head>
          <title>{query} genres for radio stations, Listen to Free Music | {websiteName}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <NavBar websiteConfig={websiteConfig} />

        <GenreResults searchGenreResponseHolder={searchGenreResponseHolder} />

        <Footer websiteConfig={websiteConfig} lastSearhesResponseHolder={lastSearhesResponseHolder} />

      </div>
    )
  }

}

SearchByGenre.getInitialProps = async (router) => {
  const { publicRuntimeConfig } = getConfig()

  const { query, page, size } = router.query


  const cleanQuery = query.replaceAll('-', ' ');

  const searchGenreApi = await new SearchGenre(
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
    searchGenreResponseHolder,
    lastSearhesResponseHolder
  ] = await Promise.all([
    searchGenreApi.execute(),
    lastSearhesApi.execute()
  ]);

  return {
    ...extract(publicRuntimeConfig),
    searchGenreResponseHolder,
    lastSearhesResponseHolder,
    query: cleanQuery
  }
}

export default withRouter(SearchByGenre);