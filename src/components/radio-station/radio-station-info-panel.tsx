import ApiErrorResponse from '../../api/api-error-response';
import ApiResponseHolder from '../../api/api-response-holder';
import { Response, Genre } from '../../api/radio-station/radio-station-info';
import { toSeoText } from "../../utils/seo-tools";
import NoRadioStationFoundComponent from './no-radio-station-found-component'

function RadioStationInfoPanel(params: { radioStationResponseHolder: ApiResponseHolder<Response> }) {
    const { radioStationResponseHolder } = params;

    if (!radioStationResponseHolder) {
        throw new Error('Radio station response holder is undefined');
    }
    if (radioStationResponseHolder.error) {
        return (
            <section className="bg-gray-50">
                <NoRadioStationFoundComponent />
            </section>
        );
    }

    const radioStation = radioStationResponseHolder.response;

    // const radioStationResults = searchResults.data!.map(item => stationResult(item))

    return (
        <section className="bg-gray-50">
            <div className="container mx-auto py-10">
                <div
                    className="block mx-2 md:mx-auto sm:grid grid-cols-5 bg-white shadow-sm p-5 relative sm:p-2 rounded-lg lg:col-span-2 my-2 md:mb-10">
                    <img src={radioStation?.logoUrl} alt={`Logo of ${radioStation?.title} radio station`} className="max-h-64 rounded-lg m-auto" />
                    <div className="py-5 self-center sm:pt-0 sm:px-5 col-span-4">
                        <h2 className="text-gray-800 capitalize text-xl font-bold mb-5 text-center md:text-left">{radioStation?.title}</h2>
                        {radioStation?.website ? (<a href={radioStation?.website} target="_blank" className="capitalize underline inline-block pt-2">{radioStation?.website}</a>) : ''}
                        <p className="text-center md:text-left">{radioStation?.description}</p>
                    </div>
                </div>
            </div>
        </section>
    )

}

function stationResult(item?: Data) {
    if (item === undefined) {
        throw Error('Item is not defined!')
    }

    return (
        <div key={item.id}>
            <a href={`/radio-stations/${toSeoText(item.title)}/${item.id}`}
                className="block mx-2 md:mx-auto sm:grid grid-cols-5 bg-white shadow-sm p-5 relative sm:p-2 rounded-lg lg:col-span-2 my-2 md:mb-10">
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


export default RadioStationInfoPanel;