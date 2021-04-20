import Link from "next/link";

function SearchTypeTabsComponent(params: { query: string, activeTab: ActiveTabType }) {

    const { query, activeTab } = params;

    return (
        <div className="divide-y-2 divide-grey-600 md:divide-solid divide-none">
            <div className='sm:flex cursor-pointer justify-center mx-2 md:mx-auto'>
                {createTabItem('Songs', (activeTab === ActiveTabType.SONGS), '/search/by-song', query)}
                {createTabItem('Radio stations', (activeTab === ActiveTabType.RADIO_STATIONS), '/search/by-radio-station', query)}
                {createTabItem('Genres', (activeTab === ActiveTabType.GENRES), '/search/by-genre', query)}
            </div>
            <div></div>
        </div>
    )
}

function createTabItem(title: string, isActive: boolean, linkBase: string, query: string) {
    const fullLink = `${linkBase}/${query.replaceAll(' ', '-').toLocaleLowerCase()}`;

    if (isActive) {
        return (
            <span className="block py-2 px-6 md:rounded-t-lg bg-gray-100 cursor-not-allowed">
                {title}
            </span>
        );
    } else {
        return (
            <Link href={fullLink}>
                <span className="block py-2 px-6 md:rounded-t-lg text-gray-500 bg-gray-200 hover:bg-blue-500 hover:text-white">
                    {title}
                </span>
            </Link>
        )
    }
}

export enum ActiveTabType {
    SONGS,
    RADIO_STATIONS,
    GENRES
}

export default SearchTypeTabsComponent;