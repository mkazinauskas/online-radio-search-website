import ApiResponseHolder from "../api/api-response-holder";
import { LastSearchesResponse } from "../api/last-searches/last-searhes";

function LastSearchesComponent(params: { lastSearhesResponseHolder: ApiResponseHolder<LastSearchesResponse> }) {
    const { lastSearhesResponseHolder } = params;

    if (lastSearhesResponseHolder === undefined) {
        throw Error('Last searches do not exist!')
    }

    if(lastSearhesResponseHolder.error){
        return '';
    }

    const { searches } = lastSearhesResponseHolder?.response;

    return (
        <div>
            {searches.length}
        </div>

    );
}


export default LastSearchesComponent;
