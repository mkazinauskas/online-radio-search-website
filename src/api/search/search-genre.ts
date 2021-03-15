import axios from 'axios';
import ApiErrorResponse from '../api-error-response';
import ApiResponseHolder from '../api-response-holder';

export class SearchGenre {
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
      const resp = await axios.get(`${this._apiUrl}/search/genre`, {
        params: {
          title: this._title,
          page: this._page,
          size: this._size
        }
      });
      return new ApiResponseHolder<SearchGenreResponse>(
        undefined, new SearchGenreResponse(
          this._title,
          resp.data
        )
      )
    } catch (err) {
      console.error(err);
      return new ApiResponseHolder<SearchGenreResponse>(new ApiErrorResponse(err), undefined);
    }
  }
}

export class SearchGenreResponse {
  query: string;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  data: SingleGenreResult[];

  constructor(query: string, data: any,) {
    this.query = query;
    this.size = data.page.size;
    this.totalElements = data.page.totalElements;
    this.totalPages = data.page.totalPages;
    this.number = data.page.number;
    if (!data._embedded) {
      this.data = [] as SingleGenreResult[];
      return;
    }
    this.data = data._embedded?.searchGenreResultResponseList?.map((item: any) => new SingleGenreResult(item));
  }

}

export class SingleGenreResult {
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
    return '/img/main/no-logo-genre.jpg';
  }

  _createDescription = (title: String) => {
    return `${title} delivers an emotionally driven journey that showcases a wild terrain filled with great music sounds on ${title}.`
  }
}