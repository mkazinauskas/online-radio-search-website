import axios from 'axios';
import ApiErrorResponse from '../api-error-response';
import ApiResponseHolder from '../api-response-holder';

export class RadioStationSongs {

  _apiUrl: string;

  _radioStationId: number;

  _page: number = 0;

  _size: number = 10;

  _sort: string = 'id,desc'

  constructor(
    apiUrl: string,
    radioStationId: number,
  ) {
    this._apiUrl = apiUrl;
    this._radioStationId = radioStationId;
  }

  execute = async (): Promise<ApiResponseHolder<RadioStationSongsResponse>> => {
    try {
      const resp = await axios.get(`${this._apiUrl}/radio-stations/${this._radioStationId}/songs`,
        {
          params: {
            page: this._page,
            size: this._size,
            sort: this._sort
          }
        }
      );

      return new ApiResponseHolder<RadioStationSongsResponse>(
        undefined, new RadioStationSongsResponse(
          resp.data
        )
      )
    } catch (err) {
      console.error(err);
      return new ApiResponseHolder<RadioStationSongsResponse>(new ApiErrorResponse(err), undefined);
    }
  }
}

export class RadioStationSongsResponse {

  songs: RadioStationSong[];

  constructor(data: any) {
    this.songs = data._embedded.radioStationSongResponseList.map((songData: any) => new RadioStationSong(songData));
  }

}

export class RadioStationSong {
  id: number;
  uniqueId: string;
  songId: number;
  title: string;
  playedTime: Date;

  constructor(data: any) {
    this.id = data.id;
    this.uniqueId = data.uniqueId;
    this.songId = data.songId;
    this.title = data.title;
    this.playedTime = new Date(Date.parse(data.playedTime));
  }

}