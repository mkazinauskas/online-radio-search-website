import NoSearchResultsComponent from "./no-search-results-component";
import { SingleRadioStationResult } from '../../api/search/radio-stations-search-by-title';
import PaginationComponent from "./pagination-component";
import { toSeoText } from "../../utils/seo-tools";
import ApiResponseHolder from "../../api/api-response-holder";
import Link from "next/link";
import { RadioStationsByPlayedSongResponse, SingleRadioStationByPlayedSongResult } from "../../api/radio-station/radio-stations-by-played-song";

function RadioStationsByPlayedSongResults(params: { radioStationsByPlayedSongResponseHolder: ApiResponseHolder<RadioStationsByPlayedSongResponse> }) {
    const { radioStationsByPlayedSongResponseHolder } = params;

    if (radioStationsByPlayedSongResponseHolder.error) {
        return (
            <section className="bg-gray-50">
                <NoSearchResultsComponent />
            </section>
        );
    }

    const searchResults = radioStationsByPlayedSongResponseHolder.response;

    if (!searchResults) {
        throw new Error('No Radio Station search results');
    }

    const noResults = (<h2 className="text-xl text-center mt-8 font-bold">Sorry, no results...</h2>);
    const radioStationResults = searchResults?.data.map((item: SingleRadioStationByPlayedSongResult) => stationResult(item));

    return (
        <section className="bg-gray-50">
            <div className="container mx-auto">
                <h1 className="text-2xl mx-2 md:mx-auto text-secondary font-bold flex-1 md:py-16 py-5 text-center">Radio station by song title: "{searchResults.title}"</h1>
                {/* <SearchTypeTabsComponent query={' '} activeTab={ActiveTabType.SONGS} /> */}
                {radioStationResults.length ? radioStationResults : noResults}
                <PaginationComponent baseUrl={`/radio-stations/by-played-song/${toSeoText(searchResults.title)}`} query={searchResults.songId.toString(0)} currentPage={searchResults.number} lastPage={searchResults.totalPages} />
            </div>
        </section>
    )

}

function stationResult(item?: SingleRadioStationResult): JSX.Element {
    if (!item) {
        throw Error('Item is not defined!')
    }

    return (
        <Link href={`/radio-stations/${toSeoText(item.title)}/${item.id}`} key={item.id}>
            <span className="block mx-2 md:mx-auto sm:grid grid-cols-5 bg-white shadow-sm p-5 relative sm:p-2 rounded-lg lg:col-span-2 my-2 md:mb-10 hover:bg-gray-100 cursor-pointer">
                <img src={item.logoUrl} alt={`Logo of ${item.title} radio station`} className="max-h-64 rounded-lg m-auto" />
                <div className="py-5 self-center sm:pt-0 sm:px-5 col-span-4 text-center md:text-left">
                    <h2 className="text-gray-800 capitalize text-xl font-bold mb-5">{item.title}</h2>
                    {item.website ? (<a href={item.website} target="_blank" className="capitalize underline inline-block pt-2">{item.website}</a>) : ''}
                    <p>{item.description}</p>
                </div>
            </span>
        </Link>
    );
}


export default RadioStationsByPlayedSongResults;