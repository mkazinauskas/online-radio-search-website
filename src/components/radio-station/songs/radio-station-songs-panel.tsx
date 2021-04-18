import { RadioStationSong } from "../../../api/radio-station/radio-station-songs";

function RadioStationSongsPanel(params: { songs: RadioStationSong[] | undefined | null }) {

    const { songs } = params;

    if (!songs || songs.length === 0) {
        return (
            <></>
        );
    }

    const songsTable = songs.map(song => (
        <li className="flex items-center space-x-3 py-2 pl-3 hover:bg-gray-100" key={song.id}>
            <div className="flex-1 break-all">{song.title}</div>
            <div className="flex-1">{new Date(song.playedTime).toLocaleString()}</div>
        </li>
    )
    );

    return (
        <div className="col-span-5 px-5">
            <h2 className="text-gray-800 capitalize text-xl font-bold mb-5 text-center pt-10">Played songs</h2>
            <li className="items-center space-x-3 pb-3 pl-3 hidden md:flex" key="info">
                <div className="flex-1 font-bold">Title</div>
                <div className="flex-1 font-bold">Played Time</div>
            </li>
            <ul className="text-xs sm:text-base divide-y cursor-default">
                {songsTable}
            </ul>
        </div>
    )
}

export default RadioStationSongsPanel;