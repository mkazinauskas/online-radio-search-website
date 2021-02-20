import NoSearchResultsComponent from "./no-search-results-component";
import { Response, Data } from '../../api/search/radio-stations-search';

function RadioStationsResults(params: { searchResults: Response}) {
    const { searchResults } = params;
    console.log(searchResults);

    let radioStationResults: any = <NoSearchResultsComponent title={searchResults.query} />;

    if (searchResults.success) {
        radioStationResults = searchResults.data.map(item => stationResult(item))
    }

    return (
        <section className="">
            <h1>Search results for "{searchResults.query}"</h1>
            {radioStationResults}
        </section>
    )

}

function stationResult(item?: Data) {
    if (item === undefined) {
        throw Error('Item is not defined!')
    }

    return (
        <div className="block" key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.website}</p>
        </div>
    );
}

export default RadioStationsResults;