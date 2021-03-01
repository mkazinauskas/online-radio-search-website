import axios from 'axios';
import ApiErrorResponse from '../api-error-response';
import ApiResponseHolder from '../api-response-holder';

export class RadioStationStreams {

  _apiUrl: string;

  _radioStationId: number;

  _page: number = 0;

  _size: number = 100;

  constructor(
    apiUrl: string,
    radioStationId: number,
  ) {
    this._apiUrl = apiUrl;
    this._radioStationId = radioStationId;
  }

  execute = async (): Promise<ApiResponseHolder<RadioStationStreamsResponse>> => {
    try {
      const resp = await axios.get(`${this._apiUrl}/radio-stations/${this._radioStationId}/streams`,
        {
          params: {
            page: this._page,
            size: this._size
          }
        }
      );

      return new ApiResponseHolder<RadioStationStreamsResponse>(
        undefined, new RadioStationStreamsResponse(
          resp.data
        )
      )
    } catch (err) {
      console.error(err);
      return new ApiResponseHolder<RadioStationStreamsResponse>(new ApiErrorResponse(err), undefined);
    }
  }
}

export class RadioStationStreamsResponse {

  streams: RadioStationStream[];

  constructor(data: any) {
    this.streams = data._embedded.radioStationStreamResponseList.map((streamData: any) => new RadioStationStream(streamData));
  }

}

export class RadioStationStream {
  id: number;
  uniqueId: string;
  url: string;
  bitrate: number;
  type: string;

  constructor(data: any) {
    this.id = data.id;
    this.uniqueId = data.uniqueId;
    this.url = data.url;
    this.bitrate = data.bitRate;
    this.type = data.type;
  }

}