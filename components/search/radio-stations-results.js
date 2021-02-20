import NoSearchResultsComponent from "./no-search-results-component";

function RadioStationsResults({ searchResults }) {
    console.log(searchResults);

    if (searchResults === undefined) {
        throw Error('Search results are not defined!')
    }

    let radioStationResults = <NoSearchResultsComponent title='someTitle' />;

    if (searchResults.success) {
        radioStationResults = searchResults.data._embedded.searchRadioStationResultResponseList
            .map(item => stationResult(item))
    }

    return (
        <section className="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
            <h1>Search results</h1>
            {radioStationResults}
        </section>
    )

}

function stationResult({ id, title, website }) {
    if (id === undefined) {
        throw Error('Id is not defined!')
    }

    if (title === undefined) {
        throw Error('Title is not defined!')
    }
    return (
        <div>
            <h2>{title}</h2>
            <p>{website}</p>
            <p>{id}</p>
        </div>
    )
}

export default RadioStationsResults;