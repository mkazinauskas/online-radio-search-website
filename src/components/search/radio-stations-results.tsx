import NoSearchResultsComponent from "./no-search-results-component";
import { Response, Data } from '../../api/search/radio-stations-search';

function RadioStationsResults(params: { searchResults: Response}) {
    const { searchResults } = params;
    console.log(searchResults);

    if (searchResults.success = false) {
        return (
            <section className="bg-gray-50" key="no-results">
                <NoSearchResultsComponent title={searchResults.query} />
            </section>
        );
    }

    const radioStationResults = searchResults.data!.map(item => stationResult(item))

    return (
        <section className="bg-gray-50">
            <h1 className="text-2xl text-secondary font-bold flex-1 px-10 md:pt-16 py-5 text-center">Radio stations with name: "{searchResults.query}"</h1>
            {radioStationResults}
            {getPagination(searchResults.query, searchResults.number, searchResults.totalPages)}
        </section>
    )

}

function getPagination(searchTitle: string, number: number, totalPages: number) {
    console.log(number);
    console.log(totalPages);
    const safeSearchTitle = searchTitle.replaceAll(' ', '-').toLocaleLowerCase();

    const baseLink = `/search/by-radio-station/${safeSearchTitle}/`;

    let buttons = [];

    if (number <= 0) {
        buttons.push((
            <a key="prev-disabled" className="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md cursor-not-allowed">
                Previous
            </a>
        ));
    } else {
        buttons.push((
            <a key="prev" href={baseLink + '?number=' + (number - 1)} className="mx-1 px-3 py-2 bg-white text-gray-700 hover:bg-blue-500 hover:text-white font-medium rounded-md">
                Previous
            </a>
        ));
    }

    if (number >= totalPages) {
        buttons.push((
            <a key="next-disabled" className="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md cursor-not-allowed">
                Next
            </a>
        ));
    } else {
        buttons.push((
            <a key="next" href={baseLink + '?number=' + (number + 1)} className="mx-1 px-3 py-2 bg-white text-gray-700 hover:bg-blue-500 hover:text-white font-medium rounded-md">
                Next
            </a>
        ));
    }

    return (
        <div className="pb-12 pt-6 mx-auto text-center">
            {buttons}
        </div>
    )
}

function stationResult(item?: Data) {
    if (item === undefined) {
        throw Error('Item is not defined!')
    }

    return (<div key={item.id}>
        <article className="sm:grid grid-cols-5 bg-white shadow-sm p-5 relative sm:p-2 rounded-lg lg:col-span-2 my-5 mx-5 md:mx-20 md:my-10">
            <img src={item.logoUrl} alt={`Logo of ${item.title} radio station`} className="max-h-64 rounded-lg m-auto" />
            <div className="py-5 self-center sm:pt-0 sm:px-5 col-span-4">
                <h2 className="text-gray-800 capitalize text-xl font-bold mb-5 text-center md:text-left">{item.title}</h2>
                {item.website ? (<a href={item.website} target="_blank" className="capitalize underline inline-block pt-2">{item.website}</a>) : ''}
                <p className="text-center md:text-left">{item.description}</p>
            </div>
        </article>
    </div>
    );
}


export default RadioStationsResults;