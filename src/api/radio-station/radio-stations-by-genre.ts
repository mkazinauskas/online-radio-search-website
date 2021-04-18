import axios from 'axios';
import ApiErrorResponse from '../api-error-response';
import ApiResponseHolder from '../api-response-holder';

export class RadioStationsByGenre {
  _title: string;
  _apiUrl: string;
  _genreId: number;
  _page: number;
  _size: number;

  constructor(
    apiUrl: string,
    title: string,
    genreId: number,
    page: number,
    size: number
  ) {
    this._apiUrl = apiUrl;
    this._title = title;
    this._genreId = genreId;
    this._page = page;
    this._size = size;
  }

  execute = async () => {
    try {

      const resp = await axios.get(`${this._apiUrl}/radio-stations`, {
        params: {
          enabled: true,
          genreId: this._genreId,
          page: this._page,
          size: this._size
        }
      });
      return new ApiResponseHolder<RadioStationsByGenreResponse>(
        undefined, new RadioStationsByGenreResponse(
          this._title,
          this._genreId,
          resp.data
        )
      )
    } catch (err) {
      console.error(err);
      return new ApiResponseHolder<RadioStationsByGenreResponse>(new ApiErrorResponse(err), undefined);
    }
  }
}

export class RadioStationsByGenreResponse {
  title: string;
  genreId: number;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  data: SingleRadioStationByGenreResult[];

  constructor(title: string, genreId: number, data: any) {
    this.title = title;
    this.genreId = genreId;
    this.size = data.page.size;
    this.totalElements = data.page.totalElements;
    this.totalPages = data.page.totalPages;
    this.number = data.page.number;
    if (!data._embedded) {
      this.data = [] as SingleRadioStationByGenreResult[];
      return;
    }
    this.data = data._embedded?.radioStationResponseList?.map((item: any) => new SingleRadioStationByGenreResult(item));
  }

}

export class SingleRadioStationByGenreResult {
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