import NoSearchResultsComponent from "./no-search-results-component";
import { RadioStationsSearch, RadioStationsSearchResponse, SingleRadioStationResult } from '../../api/search/radio-stations-search';
import PaginationComponent from "./pagination-component";
import SearchTypeTabsComponent, { ActiveTabType } from "./search-type-tabs-component";
import { toSeoText } from "../../utils/seo-tools";
import ApiResponseHolder from "../../api/api-response-holder";

function RadioStationsResults(params: { radioStationsSearchResponseHolder: ApiResponseHolder<RadioStationsSearchResponse> }) {
    const { radioStationsSearchResponseHolder } = params;

    if (radioStationsSearchResponseHolder.error) {
        return (
            <section className="bg-gray-50">
                <NoSearchResultsComponent />
            </section>
        );
    }

    const searchResults = radioStationsSearchResponseHolder.response;

    if (!searchResults) {
        throw new Error('No Radio Station search results');
    }

    const radioStationResults = searchResults?.data!.map(item => stationResult(item));

    return (
        <section className="bg-gray-50">
            <div className="container mx-auto">
                <h1 className="text-2xl mx-2 md:mx-auto text-secondary font-bold flex-1 md:py-16 py-5 text-center">Radio stations with name: "{searchResults.query}"</h1>
                <SearchTypeTabsComponent query={searchResults.query} activeTab={ActiveTabType.RADIO_STATIONS} />
                {radioStationResults}
                <PaginationComponent baseUrl='/search/by-radio-station' query={searchResults.query} currentPage={searchResults.number} lastPage={searchResults.totalPages} />
            </div>
        </section>
    )

}

function stationResult(item?: SingleRadioStationResult) {
    if (item === undefined) {
        throw Error('Item is not defined!')
    }

    return (
        <div key={item.id}>
            <a href={`/radio-stations/${toSeoText(item.title)}/${item.id}`}
                className="block mx-2 md:mx-auto sm:grid grid-cols-5 bg-white shadow-sm p-5 relative sm:p-2 rounded-lg lg:col-span-2 my-2 md:mb-10 hover:bg-gray-100">
                <img src={item.logoUrl} alt={`Logo of ${item.title} radio station`} className="max-h-64 rounded-lg m-auto" />
                <div className="py-5 self-center sm:pt-0 sm:px-5 col-span-4">
                    <h2 className="text-gray-800 capitalize text-xl font-bold mb-5 text-center md:text-left">{item.title}</h2>
                    {item.website ? (<a href={item.website} target="_blank" className="capitalize underline inline-block pt-2">{item.website}</a>) : ''}
                    <p className="text-center md:text-left">{item.description}</p>
                </div>
            </a>
        </div>
    );
}


export default RadioStationsResults;