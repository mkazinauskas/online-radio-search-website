import axios from 'axios';

export class RadioStationsSearch {
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
      console.log(resp.data)
      return new Response(
        true,
        this._title,
        resp.data
      )
    } catch (err) {
      console.error(err);
      return new Response(
        false,
        this._title,
        undefined
      )
    }
  }
}

export class Response {
  query: string;
  success: boolean;
  size: number | null | undefined;
  totalElements: number | null | undefined;
  totalPages: number | null | undefined;
  number: number | null | undefined;
  data: [Data] | null | undefined;

  constructor(success: boolean, query: string, data: any,) {
    this.success = success;
    this.query = query;
    if (success && data) {
      this.size = data.page.size;
      this.totalElements = data.page.totalElements;
      this.totalPages = data.page.totalPages;
      this.number = data.page.number;
      this.data = data._embedded.searchRadioStationResultResponseList.map((item: any) => new Data(item));
    }
  }

}

export class Data {
  id: number;
  title: string;
  website: string;

  constructor(item: any) {
    this.id = item.id;
    this.title = item.title;
    this.website = item.website;
  }
}