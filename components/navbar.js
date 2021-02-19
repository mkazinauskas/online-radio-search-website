import React, { Component } from 'react';

class NavBar extends Component {

    state = {
        showMenu: false
    }


    render() {
        const contactUsLink = this.props.contactUsLink;
        if (contactUsLink === undefined) {
            throw Error('Contact us link does not exist!')
        }

        return (
            <nav className="bg-white shadow dark:bg-gray-800">
                <div className="container px-6 py-3 mx-auto">
                    <div className="flex flex-col lg:flex-row md:justify-between lg:items-center">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <a className="text-sm font-bold text-gray-800 dark:text-white lg:text-2xl hover:text-gray-700 dark:hover:text-gray-300" href="/">OnlineRadioSearch.com</a>

                                <div className="hidden mx-5 xl:mx-10 lg:block">
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </span>

                                        <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex lg:hidden items-center">
                                <button onClick={()=>this.setState({ ...this.state, showMenu: !this.state.showMenu })} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                        <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={`items-center lg:flex ${this.state.showMenu ? '' : 'hidden'}`}>
                            <div className="flex flex-col mt-2 lg:flex-row lg:mt-0 lg:mx-1">
                                <a className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline lg:mx-4 lg:my-0" href="#">Home</a>
                                <a className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline lg:mx-4 lg:my-0" href="#">Blog</a>
                                <a className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline lg:mx-4 lg:my-0" href="#">Compoents</a>
                                <a className="my-1 text-sm leading-5 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-indigo-400 hover:underline lg:mx-4 lg:my-0" href={contactUsLink} target="_blank">Contact</a>
                            </div>

                            <div className="flex items-center py-2 -mx-1 lg:mx-0">
                                <a className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded hover:bg-blue-600 lg:mx-2 lg:w-auto" href="#">Login</a>
                                <a className="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-blue-600 lg:mx-0 lg:w-auto" href="#">Join free</a>
                            </div>

                           
                        </div>
                        <div className="mt-3 lg:hidden">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </span>

                                    <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder="Search" />
                                </div>
                            </div>
                    </div>

                </div>
            </nav>
        );
    }
}

export default NavBar;
