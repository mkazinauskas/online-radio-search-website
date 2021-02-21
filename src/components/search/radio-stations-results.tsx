import NoSearchResultsComponent from "./no-search-results-component";
import { Response, Data } from '../../api/search/radio-stations-search';

function RadioStationsResults(params: { searchResults: Response }) {
    const { searchResults } = params;
    console.log(searchResults);

    let radioStationResults: any = <NoSearchResultsComponent title={searchResults.query} />;

    if (searchResults.success) {
        radioStationResults = searchResults.data!.map(item => stationResult(item))
    }

    return (
        <section className="bg-gray-50 p-10">
            <h1 className="text-2xl text-secondary font-bold flex-1 p-10 text-center">Radio stations by name: "{searchResults.query}"</h1>
            {radioStationResults}
            {getPagination()}
        </section>
    )

}

function getPagination() {
    return (
        <div className="flex m-12">
            <a href="#" className="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md cursor-not-allowed">
                previous
                        </a>

            <a href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                1
                        </a>

            <a href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                2
                        </a>

            <a href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                3
                        </a>

            <a href="#" className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md">
                Next
                        </a>
        </div>
    )
}

function stationResult(item?: Data) {
    if (item === undefined) {
        throw Error('Item is not defined!')
    }

    return (
        <div className="m-12">
            <div className="px-10 py-6 bg-white rounded-lg shadow-md" key={item.id}>
                <div className="mt-2"><a href="#" className="text-2xl text-gray-700 font-bold hover:underline">{item.title}</a>
                    <p className="mt-2 text-gray-600">
                        Streaming live around the world 24/7. {item.title} is number one internet radio station, Bringing you the very best in uplifting Funky, Soulful {'&'} Electro House music, 4x4, 2Step, Underground and UK Garage, Dubstep, Drum {'&'} Bass {'&'} Old Skool Club Classics.
                    </p>
                    {item.website ? (<p><a href={item.website}>{item.website}</a></p>) : ''}
                </div>
            </div>
        </div>
    );
}



export default RadioStationsResults;