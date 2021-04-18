import axios from 'axios';
import ApiErrorResponse from '../api-error-response';
import ApiResponseHolder from '../api-response-holder';

export class LastSearches {

    _apiUrl: string;

    _size: number;

    constructor(
        apiUrl: string,
        size: number,
    ) {
        this._apiUrl = apiUrl;
        this._size = size;
    }

    execute = async (): Promise<ApiResponseHolder<LastSearchesResponse>> => {
        try {
            const resp = await axios.get(`${this._apiUrl}/last-searches`,
                {
                    params: {
                        size: this._size,
                    }
                }
            );

            return new ApiResponseHolder<LastSearchesResponse>(
                undefined, new LastSearchesResponse(
                    resp.data
                )
            )
        } catch (err) {
            console.error(err);
            return new ApiResponseHolder<LastSearchesResponse>(new ApiErrorResponse(err), undefined);
        }
    }
}

export class LastSearchesResponse {

    searches: LastSearch[];

    constructor(data: any) {
        this.searches = data._embedded.lastSearchResponseList.map((songData: any) => new LastSearch(songData));
    }

}

export class LastSearch {
    id: number;
    query: string;
    type: string;
    created: Date;

    constructor(data: any) {
        this.id = data.id;
        this.query = data.query;
        this.type = data.type;
        this.created = data.created;
    }

}