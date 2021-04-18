import NoSearchResultsComponent from "./no-search-results-component";
import { SingleSongResult } from '../../api/search/search-song';
import PaginationComponent from "./pagination-component";
import SearchTypeTabsComponent, { ActiveTabType } from "./search-type-tabs-component";
import { toSeoText } from "../../utils/seo-tools";
import ApiResponseHolder from "../../api/api-response-holder";
import Link from "next/link";
import { SearchSongResponse } from "../../api/search/search-song";

function SongsResults(params: { searchSongResponseHolder: ApiResponseHolder<SearchSongResponse> }) {
    const { searchSongResponseHolder } = params;

    if (searchSongResponseHolder.error) {
        return (
            <section className="bg-gray-50">
                <NoSearchResultsComponent />
            </section>
        );
    }

    const searchResults = searchSongResponseHolder.response;

    if (!searchResults) {
        throw new Error('No song search results');
    }

    const noResults = (<h2 className="text-xl text-center mt-8 font-bold">Sorry, no results for such song...</h2>);
    const results = searchResults.data?.map(item => singleResult(item));

    return (
        <section className="bg-gray-50">
            <div className="container mx-auto">
                <h1 className="text-2xl mx-2 md:mx-auto text-secondary font-bold flex-1 md:py-16 py-5 text-center">Songs with title: "{searchResults.query}"</h1>
                <SearchTypeTabsComponent query={searchResults.query} activeTab={ActiveTabType.SONGS} />
                {results && results.length ? results : noResults}
                <PaginationComponent baseUrl='/search/by-song' query={searchResults.query} currentPage={searchResults.number} lastPage={searchResults.totalPages} />
            </div>
        </section>
    )

}

function singleResult(item?: SingleSongResult): JSX.Element {
    if (!item) {
        throw Error('Item is not defined!')
    }

    return (
        <div key={item.id}>
            <Link href={`/radio-stations/by-played-song/${toSeoText(item.title)}/${item.id}`}>
                <a className="block mx-2 md:mx-auto sm:grid grid-cols-5 bg-white shadow-sm p-5 relative sm:p-2 rounded-lg lg:col-span-2 my-2 md:mb-10 hover:bg-gray-100">
                    <img src={item.logoUrl} alt={`Logo of ${item.title} radio station`} className="max-h-64 rounded-lg m-auto" />
                    <div className="py-5 self-center sm:pt-0 sm:px-5 col-span-4">
                        <h2 className="text-gray-800 capitalize text-xl font-bold mb-5 text-center md:text-left">{item.title}</h2>
                        <p className="text-center md:text-left">{item.description}</p>
                    </div>
                </a>
            </Link>
        </div>
    );
}


export default SongsResults;