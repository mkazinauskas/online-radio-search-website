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
      return {
        data: resp.data,
        success: true
      };
    } catch (err) {
      console.error(err);
      return {
        success: false
      };
    }
  }
}