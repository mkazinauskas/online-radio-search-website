import React, { Component, FormEvent } from 'react';
import { Router, withRouter, NextRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { toSeoText } from '../../utils/seo-tools';
import SearchByRadioStation, { URL_PATH } from '../../../pages/search/by-radio-station/[query]'

class SearchBar extends Component<WithRouterProps>{

    state = {
        query: ''
    }

    router: Router;

    constructor(props: any) {
        super(props)
        this.router = props.router;
    }

    render() {
        return (
            <div className="flex flex-col items-center lg:pb-32 lg:pt-15 py-10 md:h-128">
                <form onSubmit={this.onSubmit}
                    className="w-full md:max-w-lg h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
                    <input
                        type="search"
                        name="search"
                        onChange={(element) => this.setState({ ...this.state, query: element.target.value })}
                        id="search"
                        placeholder="Search for radio station, podcast, news..."
                        className="appearance-none outline-none w-full focus:outline-none active:outline-none" />
                    <button type="submit" className="ml-1 outline-none focus:outline-none active:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
                {/* {this.dropdown()} */}

            </div>
        );
    }

    dropdown = (): JSX.Element => {
        return (
            <div className="rounded shadow-md relative pin-t pin-l bg-white w-full md:max-w-lg">
                <ul className="list-reset">
                    <li><p className="p-2 border-t-2 text-black hover:bg-gray-100 cursor-pointer">USA</p></li>
                    <li><p className="p-2 border-t-2 text-black hover:bg-gray-100 cursor-pointer">Montenegro jkjhjkhjk</p></li>
                </ul>
            </div>
        );
    }

    onSubmit = (event: FormEvent): void => {
        event.preventDefault();
        const safeQuery = toSeoText(this.state.query);
        this.router.push(`${URL_PATH}/${safeQuery}`);
    }

}

export default withRouter(SearchBar);