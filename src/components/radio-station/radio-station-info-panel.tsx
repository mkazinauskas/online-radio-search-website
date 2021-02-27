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
            <div className="container mx-auto py-5">
                <div className="block mx-2 md:mx-auto sm:grid grid-cols-5 bg-white shadow-sm p-5 relative sm:p-2 rounded-lg lg:col-span-2 my-2 md:mb-10">
                    <img src={radioStation?.logoUrl} alt={`Logo of ${radioStation?.title} radio station`} className="max-h-64 rounded-lg m-auto" />
                    <div className="py-5 self-center sm:pt-0 sm:px-5 col-span-4">
                        <h2 className="text-gray-800 capitalize text-xl font-bold mb-5 text-center md:text-left">{radioStation?.title}</h2>
                        {radioStation?.website ? (<a href={radioStation?.website} target="_blank" className="capitalize underline inline-block pt-2">{radioStation?.website}</a>) : ''}
                        <p className="text-center md:text-left">{radioStation?.description}</p>
                    </div>

                    {_streams()}

                </div>
            </div>
        </section>
    )

}

function _streams() {
    return (
        <ul className="text-xs sm:text-base divide-y cursor-default col-span-5 px-5">
            <li className="flex items-center space-x-3 hover:bg-gray-100">
                <button className="p-3 hover:bg-green-500 group focus:outline-none">
                    <svg className="w-4 h-4 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
                <div className="flex-1">Title</div>
                <div className="flex-1">Url</div>
                <div className="flex-1">Bit rate</div>
                <div className="text-xs text-gray-400">2:58</div>
                <button className="focus:outline-none pr-4 group">
                    <svg className="w-4 h-4 group-hover:text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg>
                </button>
            </li>
            <li className="flex items-center space-x-3 hover:bg-gray-100">
                <button className="p-3 hover:bg-green-500 group focus:outline-none">
                    <svg className="w-4 h-4 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
                <div className="flex-1">
                    Artist - Title
</div>
                <div className="text-xs text-gray-400">
                    2:58
</div>
                <button className="focus:outline-none pr-4 group">
                    <svg className="w-4 h-4 group-hover:text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg>
                </button>
            </li>
        </ul>
    )
}

export default RadioStationInfoPanel;