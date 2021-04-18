import Link from "next/link";
import { RadioStationStream } from "../../../api/radio-station/radio-station-streams";
import StreamPlayButton from "./stream-play-button";

function RadioStationStreamsPanel(params: { streams: RadioStationStream[] | undefined }) {
    const { streams } = params;
    if(streams === undefined || streams === []){
        return (
            <></>
        );
    }

    const streamsTable = streams.map(stream => (
        <li className="flex items-center space-x-3 hover:bg-gray-100" key={stream.id}>
            <StreamPlayButton key={stream.id} streamUrl={stream.url} />
            <div className="hidden break-all lg:block lg:flex-1"><Link href={stream.url}><a target="_blank">{stream.url}</a></Link></div>
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
        <div className="col-span-5 px-5 py-5">
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

export default RadioStationStreamsPanel;