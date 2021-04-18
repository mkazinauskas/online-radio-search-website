import ApiResponseHolder from '../../api/api-response-holder';
import { RadioStationResponse } from '../../api/radio-station/radio-station-info';
import { RadioStationSongsResponse } from '../../api/radio-station/radio-station-songs';
import { RadioStationStreamsResponse } from '../../api/radio-station/radio-station-streams';
import { toSeoText } from '../../utils/seo-tools';
import NoRadioStationFoundComponent from './no-radio-station-found-component';
import RadioStationSongsPanel from './songs/radio-station-songs-panel';
import SongsPaginationComponent from './songs/songs-pagination-component';
import RadioStationStreamsPanel from './streams/radio-station-streams-panel';

function RadioStationContainer(params: {
    radioStationResponseHolder: ApiResponseHolder<RadioStationResponse>,
    radioStationStreamsResponseHolder: ApiResponseHolder<RadioStationStreamsResponse>,
    radioStationSongsResponseHolder: ApiResponseHolder<RadioStationSongsResponse>
}) {
    const { radioStationResponseHolder, radioStationStreamsResponseHolder, radioStationSongsResponseHolder } = params;

    if (!radioStationResponseHolder) {
        throw new Error('Radio station response holder is undefined');
    }

    if (!radioStationStreamsResponseHolder) {
        throw new Error('Radio station streams response holder is undefined');
    }

    if (!radioStationSongsResponseHolder) {
        throw new Error('Radio station songs response holder is undefined');
    }

    if (radioStationResponseHolder.error || radioStationStreamsResponseHolder.error || radioStationSongsResponseHolder.error) {
        return (
            <section className="bg-gray-50">
                <NoRadioStationFoundComponent />
            </section>
        );
    }

    const radioStation = radioStationResponseHolder.response;

    const streams = radioStationStreamsResponseHolder.response?.streams;

    const songs = radioStationSongsResponseHolder.response?.songs;

    return (
        <section className="bg-gray-50">
            <div className="container mx-auto py-5">
                <div className="block mx-2 md:mx-auto sm:grid grid-cols-5 bg-white shadow-sm p-5 relative sm:p-2 rounded-lg lg:col-span-2 my-2 md:mb-10">
                    <img src={radioStation?.logoUrl} alt={`Logo of ${radioStation?.title} radio station`} className="max-h-64 rounded-lg m-auto" />
                    <div className="py-5 self-center sm:pt-0 sm:px-5 col-span-4 text-center md:text-left">
                        <h1 className="text-gray-800 capitalize text-xl font-bold mb-5 ">{radioStation?.title}</h1>
                        {radioStation?.website ? (<a href={websiteUrlFix(radioStation?.website)} target="_blank" className="underline inline-block pb-2 hover:text-green-600">{radioStation?.website}</a>) : ''}
                        <p>{radioStation?.description}</p>
                    </div>

                    <RadioStationStreamsPanel streams={streams}/>

                    <RadioStationSongsPanel songs={songs} />

                    <SongsPaginationComponent
                        baseUrl={`/radio-stations/${toSeoText(radioStation?.title)}/${radioStation?.id}`}
                        currentPage={0}
                        lastPage={10}
                    />

                </div>
            </div>
        </section>
    )
}

function websiteUrlFix(url: string) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return 'http://' + url;
}

export default RadioStationContainer;