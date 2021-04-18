import axios from 'axios';
import ApiErrorResponse from '../api-error-response';
import ApiResponseHolder from '../api-response-holder';

export class RadioStationsSearchByTitle {
  _apiUrl: string;
  _title: string;
  _page: number;
  _size: number;

  constructor(
    apiUrl: string,
    title: string,
    page: number,
    size: number
  ) {
    this._apiUrl = apiUrl;
    this._title = title;
    this._page = page;
    this._size = size;
  }

  execute = async () => {
    try {
      const resp = await axios.get(`${this._apiUrl}/search/radio-station`, {
        params: {
          title: this._title,
          page: this._page,
          size: this._size
        }
      });
      return new ApiResponseHolder<RadioStationsSearchResponse>(
        undefined, new RadioStationsSearchResponse(
          this._title,
          resp.data
        )
      )
    } catch (err) {
      console.error(err);
      return new ApiResponseHolder<RadioStationsSearchResponse>(new ApiErrorResponse(err), undefined);
    }
  }
}

export class RadioStationsSearchResponse {
  query: string;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  data: SingleRadioStationResult[];

  constructor(query: string, data: any,) {
    this.query = query;
    this.size = data.page.size;
    this.totalElements = data.page.totalElements;
    this.totalPages = data.page.totalPages;
    this.number = data.page.number;
    if (!data._embedded) {
      this.data = [] as SingleRadioStationResult[];
      return;
    }
    this.data = data._embedded?.searchRadioStationResultResponseList?.map((item: any) => new SingleRadioStationResult(item));
  }

}

export class SingleRadioStationResult {
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