import React, { Component, FormEvent, useEffect } from 'react';
import { Router, withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import { toSeoText, unSeoText } from '../../utils/seo-tools';
import Paths from '../../paths';

class SearchBar extends Component<WithRouterProps>{

    state = {
        query: ''
    }

    router: Router;

    constructor(props: any) {
        super(props)
        this.router = props.router;
        this.state.query = unSeoText(this.router.query.query as string)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        placeholder="Search"
                        value={this.state.query}
                        onChange={(element) => this.setState({ ...this.state, query: element.target.value })}
                    />
                </form>
            </div>
        );
    }

    onSubmit = (event: FormEvent): void => {
        event.preventDefault();

        let pathForSearch = Paths.SEARCH_BY_RADIO_STATION;
        if(this.router.pathname.startsWith(Paths.SEARCH_BY_SONG)){
            pathForSearch = Paths.SEARCH_BY_SONG
        }
        if(this.router.pathname.startsWith(Paths.SEARCH_BY_GENRE)){
            pathForSearch = Paths.SEARCH_BY_GENRE
        }

        const safeQuery = toSeoText(this.state.query);
        this.router.push(`${pathForSearch}/${safeQuery}`);
    }

}

export default withRouter(SearchBar);