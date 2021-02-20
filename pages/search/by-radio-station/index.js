import Head from 'next/head'
import getConfig from 'next/config'
import "tailwindcss/tailwind.css";
import NavBar from '../../../components/navbar';
import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../../../components/footer';
import RadioStationsResults from '../../../components/search/radio-stations-results';

class SearchByRadioStation extends Component {

  render() {
    const contactUsLink = this.props.contactUsLink;

    const results = this.props.searchResults;
    console.log(results);
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

SearchByRadioStation.searchResults = async (apiUrl) => {
  try {
    const resp = await axios.get(`${apiUrl}/search/radio-station`, {
      params: {
        title: 'test',
        page: 0,
        size: 10
      }
    });
    console.log(resp.data)
    return {
      data: resp.data,
      success: true
    };
  } catch (err) {
    console.error(err);
    return {
      success: false
    };
  }
}

SearchByRadioStation.getInitialProps = async (ctx) => {
  const { publicRuntimeConfig } = getConfig()
  const searchResults = await SearchByRadioStation.searchResults(publicRuntimeConfig.API_URL);
  return {
    contactUsLink: publicRuntimeConfig.CONTACT_US_LINK,
    searchResults
  }
}

export default SearchByRadioStation;