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
        <section className="bg-gray-100 p-10">
            <h1 className="text-2xl text-secondary font-bold flex-1 p-10 text-center">Radio stations by name: "{searchResults.query}"</h1>
            {radioStationResults}
        </section>
    )

}

function stationResult(item?: Data) {
    if (item === undefined) {
        throw Error('Item is not defined!')
    }

    return (
        <div className="m-12 ">
            <div className="px-10 py-6 bg-white rounded-lg shadow-md" key={item.id}>
            <div className="mt-2"><a href="#" className="text-2xl text-gray-700 font-bold hover:underline">Build
                                Your New Idea with Laravel Freamwork.</a>
                            <p className="mt-2 text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim
                                reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                        </div>
                <h2>{item.title}</h2>
                <p>{item.website}</p>
            </div>
        </div>
    );
}



export default RadioStationsResults;