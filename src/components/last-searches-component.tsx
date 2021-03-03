import ApiResponseHolder from "../api/api-response-holder";
import { LastSearch, LastSearchesResponse } from "../api/last-searches/last-searhes";
import { toSeoText } from "../utils/seo-tools";

interface ConfigType {
    textTitle: string,
    linkPrefix: string
}

interface TypeToConfigMapType {
    [name: string]: ConfigType
}

const configFromType: TypeToConfigMapType = {
    'song': { textTitle: 'song', linkPrefix: '/search/by-song/' },
    'radiostation': { textTitle: 'radio station', linkPrefix: '/search/by-radio-station/' },
    'genre': { textTitle: 'genre', linkPrefix: '/search/by-genre/'}
}

function LastSearchesComponent(params: { lastSearhesResponseHolder: ApiResponseHolder<LastSearchesResponse> }): JSX.Element {
    const { lastSearhesResponseHolder } = params;

    if (lastSearhesResponseHolder === undefined) {
        throw Error('Last searches do not exist!')
    }

    if (lastSearhesResponseHolder.error) {
        return (<></>);
    }

    const { searches } = lastSearhesResponseHolder.response;

    const searchLinks = searches
        .map((search: LastSearch) => createLink(search))
        .reduce((prev: any, curr: any) => [prev, ' - ', curr]);

    return (
        <div className="container mx-auto mt-1 md:mt-10">
            <div className="text-center relative px-4 py-6 overflow-hidden sm:px-6 sm:py-8 lg:p-12 xl:p-16">
                <h2 className="text-xl font-semibold font-display text-gray-900 sm:text-3xl">Last {searches.length} searches</h2>
                <p className="mt-4 text-base text-gray-500">
                    {searchLinks}
                </p>
            </div>
        </div>

    );
}

function createLink(search: LastSearch) {
    const data = configFromType[search.type]
    const linkText = `${search.query} ${data.textTitle}`;
    const link = `${data.linkPrefix}${toSeoText(search.query)}`;
    return (<a key={search.id} href={link} className="hover:text-gray-900 no-underline hover:underline">{linkText}</a>)
}


export default LastSearchesComponent;
