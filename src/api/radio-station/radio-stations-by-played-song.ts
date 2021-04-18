import axios from 'axios';
import { log } from 'node:console';
import ApiErrorResponse from '../api-error-response';
import ApiResponseHolder from '../api-response-holder';

export class RadioStationsByPlayedSong {
  _title: string;
  _apiUrl: string;
  _songId: number;
  _page: number;
  _size: number;

  constructor(
    apiUrl: string,
    title: string,
    songId: number,
    page: number,
    size: number
  ) {
    this._apiUrl = apiUrl;
    this._title = title;
    this._songId = songId;
    this._page = page;
    this._size = size;
  }

  execute = async () => {
    try {

      const resp = await axios.get(`${this._apiUrl}/radio-stations`, {
        params: {
          enabled: true,
          songId: this._songId,
          page: this._page,
          size: this._size
        }
      });
      return new ApiResponseHolder<RadioStationsByPlayedSongResponse>(
        undefined, new RadioStationsByPlayedSongResponse(
          this._title,
          this._songId,
          resp.data
        )
      )
    } catch (err) {
      console.error(err);
      return new ApiResponseHolder<RadioStationsByPlayedSongResponse>(new ApiErrorResponse(err), undefined);
    }
  }
}

export class RadioStationsByPlayedSongResponse {
  title: string;
  songId: number;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  data: SingleRadioStationByPlayedSongResult[];

  constructor(title: string, songId: number, data: any) {
    this.title = title;
    this.songId = songId;
    this.size = data.page.size;
    this.totalElements = data.page.totalElements;
    this.totalPages = data.page.totalPages;
    this.number = data.page.number;
    if (!data._embedded) {
      this.data = [] as SingleRadioStationByPlayedSongResult[];
      return;
    }
    this.data = data._embedded?.radioStationResponseList?.map((item: any) => new SingleRadioStationByPlayedSongResult(item))
      .reduce((uniques: SingleRadioStationByPlayedSongResult[], current: SingleRadioStationByPlayedSongResult) => {
        //TODO: remove when api will be fixed
        const existingIds = uniques.map(item => item.id);
        return existingIds.includes(current.id) ? uniques : [...uniques, current];
      }, []);
  }

}

export class SingleRadioStationByPlayedSongResult {
  id: number;
  title: string;
  website: string;
  description: string;
  logoUrl: string;

  constructor(item: any) {
    this.id = item.id;
    this.title = item.title;
    this.website = item.website;
    this.description = this._createDescription(item.title);
    this.logoUrl = this._noLogo();
  }

  _noLogo = () => {
    return '/img/main/no-logo.jpg';
  }

  _createDescription = (title: String) => {
    return `Streaming live around the world 24/7. ${title} is number one internet radio station, Bringing you the very best in uplifting Funky, Soulful & Electro House music, 4x4, 2Step, Underground and UK Garage, Dubstep, Drum & Bass & Old Skool Club Classics.`
  }
}