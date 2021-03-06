import Link from 'next/link';
import React, { Component } from 'react';
import SearchBar from './search-bar';

class NavBar extends Component {

    state = {
        showMenu: false
    }

    render() {
        const { websiteConfig } = this.props;

        if (!websiteConfig) {
            throw Error('Website config does not exist');
        }

        const { contactUsLink, websiteName } = websiteConfig;

        return (
            <nav className="bg-white shadow dark:bg-gray-800">
                <div className="container px-6 py-3 mx-auto">
                    <div className="flex flex-col lg:flex-row md:justify-between lg:items-center">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/">
                                    <a className="text-sm font-bold text-gray-800 dark:text-white lg:text-2xl hover:text-gray-600 hover:no-underline" >{websiteName}</a>
                                </Link>
                                <div className="hidden mx-5 xl:mx-10 lg:block">
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </span>

                                        <SearchBar />

                                    </div>
                                </div>
                            </div>

                            <div className="flex lg:hidden items-center">
                                <button onClick={() => this.setState({ ...this.state, showMenu: !this.state.showMenu })} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                        <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={`items-center lg:flex ${this.state.showMenu ? '' : 'hidden'}`}>
                            <div className="flex flex-col mt-2 lg:flex-row lg:mt-0 lg:mx-1">
                                <Link href="/">
                                    <a className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 lg:mx-4 lg:my-0">Home</a>
                                </Link>
                                {/* <a className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 lg:mx-4 lg:my-0" href="#">Blog</a> */}
                                {/* <a className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 lg:mx-4 lg:my-0" href="#">Components</a> */}
                                <Link href={contactUsLink}>
                                    <a className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 lg:mx-4 lg:my-0" target="_blank">Contact</a>
                                </Link>
                            </div>

                            {/* <div className="flex items-center py-2 -mx-1 lg:mx-0">
                                <a className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded hover:bg-blue-600 lg:mx-2 lg:w-auto" href="#">Login</a>
                                <a className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-600 lg:mx-0 lg:w-auto" href="#">Join free</a>
                            </div> */}

                        </div>
                        <div className="mt-3 lg:hidden">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>

                                <SearchBar />
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        );
    }
}

export default NavBar;
