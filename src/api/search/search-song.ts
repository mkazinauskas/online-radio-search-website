import axios from 'axios';
import ApiErrorResponse from '../api-error-response';
import ApiResponseHolder from '../api-response-holder';

export class SearchSong {
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
      const resp = await axios.get(`${this._apiUrl}/search/song`, {
        params: {
          title: this._title,
          page: this._page,
          size: this._size
        }
      });
      return new ApiResponseHolder<SearchSongResponse>(
        undefined, new SearchSongResponse(
          this._title,
          resp.data
        )
      )
    } catch (err) {
      console.error(err);
      return new ApiResponseHolder<SearchSongResponse>(new ApiErrorResponse(err), undefined);
    }
  }
}

export class SearchSongResponse {
  query: string;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  data: SingleSongResult[];

  constructor(query: string, data: any,) {
    this.query = query;
    this.size = data.page.size;
    this.totalElements = data.page.totalElements;
    this.totalPages = data.page.totalPages;
    this.number = data.page.number;
    if (!data._embedded) {
      this.data = [] as SingleSongResult[];
      return;
    }
    this.data = data._embedded?.searchSongResultResponseList?.map((item: any) => new SingleSongResult(item));
  }

}

export class SingleSongResult {
  id: number;
  title: string;
  description: string;
  logoUrl: string;

  constructor(item: any) {
    this.id = item.id;
    this.title = item.title;
    this.description = this._createDescription(this.title);
    this.logoUrl = this._noLogo();
  }

  _noLogo = () => {
    return '/img/main/no-logo-song.jpg';
  }

  _createDescription = (title: String) => {
    return `${title} delivers an emotionally driven journey that showcases a wild terrain filled with great music sounds on ${title}.`
  }
}