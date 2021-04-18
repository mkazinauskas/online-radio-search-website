import React, { Component } from 'react';
import SearchBar from './search-bar';
import Link from 'next/link';

class HeaderLeader extends Component {

    state = {
        showMenu: false
    }

    render() {
        const { websiteConfig } = this.props;
        if (!websiteConfig) {
            throw Error('Website config does not exist!')
        }
        const { websiteName, contactUsLink } = websiteConfig;
        return (
            <header className="pattern" style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8)), url("/img/main/main-background.jpg")', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div className="container px-6 md:pb-10 mx-auto">

                    <nav className="relative z-50 h-24">
                        <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto font-medium lg:justify-center sm:px-4 md:px-2">
                            <Link href="/">
                                <a className="w-1/4 py-4 pr-4 text-white md:py-0 hover:text-gray-400 hover:no-underline">
                                    <span className="text-xl logo break-normal">{websiteName}</span>
                                </a>
                            </Link>
                            <div className={`top-0 left-0 items-start w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:w-3/4 lg:text-base md:h-auto md:bg-transparent md:p-0 md:relative md:flex ${this.state.showMenu ? 'flext fixed' : 'hidden'}`} >
                                <div className="flex-col bg-gray-700 w-full h-auto overflow-hidden rounded-lg select-none md:bg-transparent md:rounded-none md:relative md:flex md:flex-row md:overflow-auto">
                                    <Link href="/">
                                        <a className="items-center block w-auto h-16 px-6 text-xl font-black leading-none text-white hover:text-gray-400 select-none md:hidden">{websiteName}</a>
                                    </Link>
                                    <div className="flex flex-col items-start justify-center w-full text-center md:w-2/3 md:mt-0 md:flex-row md:items-center">
                                        <Link href="/">
                                            <a className="inline-block w-full px-6 py-2 mx-0 font-medium text-left text-white hover:text-gray-400 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center hover:no-underline">Home</a>
                                        </Link>
                                        {/* <a href="#" className="inline-block w-full px-6 py-2 mx-0 font-medium text-left text-gray-400 md:w-auto md:px-0 md:mx-2 hover:text-white lg:mx-3 md:text-center hover:no-underline">Features</a> */}
                                        {/* <a href="#" className="inline-block w-full px-6 py-2 mx-0 font-medium text-left text-gray-400 md:w-auto md:px-0 md:mx-2 hover:text-white lg:mx-3 md:text-center hover:no-underline">Blog</a> */}
                                        <Link href={contactUsLink}>
                                            <a target="_blank" className="inline-block w-full px-6 py-2 mx-0 font-medium text-left text-gray-400 md:w-auto md:px-0 md:mx-2 hover:text-white lg:mx-3 md:text-center hover:no-underline">Contact</a>
                                        </Link>
                                    </div>
                                    <div className="flex flex-col justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0 items-center">
                                        <div className="flex items-center m-2">
                                            <a href={websiteConfig.androidAppDownloadUrl} target="_blank" className="px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 transform border-2 rounded hover:bg-gray-700">Download App</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => this.setState({ ...this.state, showMenu: !this.state.showMenu })} className="absolute right-0 flex flex-col items-end justify-center w-10 h-10 rounded-full cursor-pointer md:hidden hover:bg-gray-100">
                                <svg className={`w-6 h-6 text-gray-300 ${this.state.showMenu ? 'hidden' : ''}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                <svg className={`w-6 h-6 text-gray-300 ${!this.state.showMenu ? 'hidden' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </div>
                        </div>

                    </nav>


                    <div className="flex flex-col items-center md:py-15 pt-10 md:h-128 text-center">
                        <h1 className="text-white mt-4 text-xl font-semibold dark:text-white">We gather all the stations of the world in one place</h1>
                        <p className="text-white mt-3">Search for thousands of radio stations wordwide. We share music, news, podcasts and everything what you need to have a good day!</p>
                    </div>

                    <SearchBar />

                </div>
            </header>
        );
    }
}

export default HeaderLeader;
