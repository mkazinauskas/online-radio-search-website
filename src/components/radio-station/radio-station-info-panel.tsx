import ApiErrorResponse from '../../api/api-error-response';
import ApiResponseHolder from '../../api/api-response-holder';
import { RadioStationResponse, Genre } from '../../api/radio-station/radio-station-info';
import { RadioStationSong, RadioStationSongsResponse } from '../../api/radio-station/radio-station-songs';
import { RadioStationStream, RadioStationStreams, RadioStationStreamsResponse } from '../../api/radio-station/radio-station-streams';
import NoRadioStationFoundComponent from './no-radio-station-found-component'

function RadioStationInfoPanel(params: {
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
                        {radioStation?.website ? (<a href={radioStation?.website} target="_blank" className="capitalize underline inline-block pb-2">{radioStation?.website}</a>) : ''}
                        <p>{radioStation?.description}</p>
                    </div>

                    {_streams(streams ? streams : [])}

                    {_songs(songs ? songs : [])}

                </div>
            </div>
        </section>
    )

}

function _streams(streams: RadioStationStream[]) {
    const streamsTable = streams.map(stream => (
        <li className="flex items-center space-x-3 hover:bg-gray-100" key={stream.id}>
            <button className="p-3 hover:bg-green-500 group focus:outline-none">
                <svg className="w-4 h-4 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </button>
            <div className="hidden break-all lg:block lg:flex-1">{stream.url}</div>
            <div className="flex-1">{stream.bitrate ? stream.bitrate : 'unknown'}</div>
            <div className="flex-1">{stream.type}</div>
            <a href="#" className="focus:outline-none group p-3 md:pl-14">
                <svg className="w-4 h-4 group-hover:text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                </svg>
            </a>
        </li>
    )
    );

    return (
        <div className="col-span-5 px-5">
            <h2 className="text-gray-800 capitalize text-xl font-bold mb-5 text-center">Available streams</h2>
            <li className="items-center space-x-3 hidden md:flex" key="info">
                <div className="p-3 group focus:outline-none">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></svg>
                </div>
                <div className="font-bold hidden lg:block lg:flex-1">URL</div>
                <div className="flex-1 font-bold">Bit Rate</div>
                <div className="flex-1 font-bold">Type</div>
                <div className="focus:outline-none group p-3 font-bold">
                    Playlist
                </div>
            </li>
            <ul className="text-xs sm:text-base divide-y cursor-default">
                {streamsTable}
            </ul>
        </div>
    )
}


function _songs(songs: RadioStationSong[]) {
    console.log(songs);
    const songsTable = songs.map(song => (
        <li className="flex items-center space-x-3 my-2 pl-3 hover:bg-gray-100" key={song.id}>
            <div className="flex-1 break-all">{song.title}</div>
            <div className="flex-1">{new Date(song.playedTime).toLocaleString()}</div>
        </li>
    )
    );

    return (
        <div className="col-span-5 px-5">
            <h2 className="text-gray-800 capitalize text-xl font-bold mb-5 text-center pt-10">Played songs</h2>
            <li className="items-center space-x-3 mb-3 pl-3 hidden md:flex" key="info">
                <div className="flex-1 font-bold">Title</div>
                <div className="flex-1 font-bold">Played Time</div>
            </li>
            <ul className="text-xs sm:text-base divide-y cursor-default">
                {songsTable}
            </ul>
        </div>
    )
}

export default RadioStationInfoPanel;