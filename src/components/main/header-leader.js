import React, { Component } from 'react';

class HeaderLeader extends Component {

    state = {
        showMenu: false
    }

    render() {
        if (this.props.contactUsLink === undefined) {
            throw Error('Contact us link does not exist!')
        }
        return (
            <header className="pattern" style={{ backgroundImage: 'url("/img/main/main-background.jpg")' }}>
                <div className="container px-6 md:pb-10 mx-auto">

                    <nav className="relative z-50 h-24">
                        <div className="container relative flex flex-wrap items-center justify-between h-24 mx-auto font-medium lg:justify-center sm:px-4 md:px-2">
                            <a href="/" className="w-1/4 py-4 pr-4 md:py-0">
                                <span className="text-xl font-black leading-none text-white select-none logo">OnlineRadioSearch.com</span>
                            </a> 
                            <div className={`top-0 left-0 items-start w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:w-3/4 md:absolute lg:text-base md:h-auto md:bg-transparent md:p-0 md:relative md:flex ${this.state.showMenu ? 'flext fixed' : 'hidden'}`} >
                                <div className="flex-col bg-gray-700 w-full h-auto overflow-hidden rounded-lg select-none md:bg-transparent md:rounded-none md:relative md:flex md:flex-row md:overflow-auto">
                                    <a href="/" className="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-white select-none md:hidden">OnlineRadioSearch.com</a>
                                    <div className="flex flex-col items-start justify-center w-full text-center md:w-2/3 md:mt-0 md:flex-row md:items-center">
                                        <a href="/" className="inline-block w-full px-6 py-2 mx-0 font-medium text-left text-white md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center">Home</a>
                                        <a href="#" className="inline-block w-full px-6 py-2 mx-0 font-medium text-left text-gray-400 md:w-auto md:px-0 md:mx-2 hover:text-white lg:mx-3 md:text-center">Features</a>
                                        <a href="#" className="inline-block w-full px-6 py-2 mx-0 font-medium text-left text-gray-400 md:w-auto md:px-0 md:mx-2 hover:text-white lg:mx-3 md:text-center">Blog</a>
                                        <a href={this.props.contactUsLink} target="_blank" className="inline-block w-full px-6 py-2 mx-0 font-medium text-left text-gray-400 md:w-auto md:px-0 md:mx-2 hover:text-white lg:mx-3 md:text-center">Contact</a>
                                    </div>
                                    <div className="flex flex-col justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0 items-center">
                                        <div className="flex items-center m-2">
                                            <a href="#" className="px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 transform border-2 rounded hover:bg-gray-700">Download App</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div onClick={()=>this.setState({ ...this.state, showMenu: !this.state.showMenu })} className="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 rounded-full cursor-pointer md:hidden hover:bg-gray-100">
                                <svg className={`w-6 h-6 text-gray-300 ${this.state.showMenu?'hidden':''}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                                <svg className={`w-6 h-6 text-gray-300 ${!this.state.showMenu?'hidden':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </div>
                        </div>

                    </nav>


                    <div className="flex flex-col items-center md:py-15 pt-10 md:h-128 text-center">
                        <h1 className="text-white mt-4 text-xl font-semibold dark:text-white">We gather all the stations of the world in one place</h1>
                        <p className="text-white mt-3">Search for thousands of radio stations wordwide. We share music, news, podcasts and everything what you need to have a good day!</p>
                    </div>

                    <div className="flex flex-col items-center lg:pb-32 lg:pt-15 py-10 md:h-128">
                        <div className="w-full md:max-w-lg h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
                            <input type="search" name="search" id="search" placeholder="Search for radio station, podcast, news..."
                                className="appearance-none outline-none w-full focus:outline-none active:outline-none" />

                            <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>

                        </div>
                    </div>

                </div>
            </header>
        );
    }
}

export default HeaderLeader;
