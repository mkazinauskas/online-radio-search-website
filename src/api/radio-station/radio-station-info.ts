import axios from 'axios';
import ApiErrorResponse from '../api-error-response';
import ApiResponseHolder from '../api-response-holder';

export class RadioStationInfo {
  _apiUrl: string;
  _id: number;

  constructor(
    apiUrl: string,
    id: number,
  ) {
    this._apiUrl = apiUrl;
    this._id = id;
  }

  execute = async (): Promise<ApiResponseHolder<RadioStationResponse>> => {
    try {
      const resp = await axios.get(`${this._apiUrl}/radio-stations/${this._id}`);
      return new ApiResponseHolder<RadioStationResponse>(undefined, new RadioStationResponse(
        resp.data
      )
      )
    } catch (err) {
      console.error(err);
      return new ApiResponseHolder<RadioStationResponse>(new ApiErrorResponse(err), undefined);
    }
  }
}

export class RadioStationResponse {
  id: number;
  uniqueId: string;
  title: string;
  description: string;
  website: string;
  logoUrl: string;
  genres: [Genre] | null;

  constructor(data: any) {
    this.id = data.id;
    this.uniqueId = data.uniqueId;
    this.title = data.title;
    this.description = this._createDescription(data.title);
    this.website = data.website;
    this.logoUrl = this._noLogo();
    this.genres = data.genres.map((genre: any) => new Genre(genre));
  }

  _noLogo = () => {
    return '/img/main/no-logo.jpg';
  }

  _createDescription = (title: String) => {
    return `Streaming live around the world 24/7. ${title} is number one internet radio station, Bringing you the very best in uplifting Funky, Soulful & Electro House music, 4x4, 2Step, Underground and UK Garage, Dubstep, Drum & Bass & Old Skool Club Classics.`
  }

}

export class Genre {
  id: number;
  uniqueId: string;
  title: string;

  constructor(item: any) {
    this.id = item.id;
    this.uniqueId = item.uniqueId;
    this.title = item.title;
  }
}