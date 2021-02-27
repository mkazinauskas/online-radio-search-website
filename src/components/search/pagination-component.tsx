function PaginationComponent(params: { baseUrl: string, query: string, currentPage: number, lastPage: number }) {
    const { baseUrl, query, currentPage, lastPage } = params;

    if (baseUrl === undefined) {
        throw Error('Base is not defined!')
    }


    if (query === undefined) {
        throw Error('Query is not defined!')
    }

    if (currentPage === undefined) {
        throw Error('Current page is not defined!')
    }

    if (lastPage === undefined) {
        throw Error('Last page is not defined!')
    }

    const seoQuery = query.replaceAll(' ', '-').toLocaleLowerCase();

    const baseLink = `${baseUrl}/${seoQuery}`;

    let buttons = [];

    if (currentPage <= 0) {
        buttons.push(buttonDisabled('Previous'));
    } else if (currentPage === 1) {
        buttons.push(button('Previous', baseLink));
    } else {
        buttons.push(button('Previous', baseLink + '?page=' + (currentPage - 1)));
    }

    if (currentPage >= lastPage) {
        buttons.push(buttonDisabled('Next'));
    } else {
        buttons.push(button('Next', baseLink + '?page=' + (currentPage + 1)));
    }

    return (
        <div className="pb-12 pt-6 mx-auto text-center">
            {buttons}
        </div>
    )
}

function buttonDisabled(title: string) {
    return (
        <a key={`${title.toLocaleLowerCase()}-disabled`} className="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md cursor-not-allowed">
            {title}
        </a>
    );
}

function button(title: string, href: string) {
    return (
        <a href={href} key={title.toLocaleLowerCase()} className="mx-1 px-3 py-2 bg-white text-gray-700 hover:bg-blue-500 hover:text-white font-medium rounded-md">
            {title}
        </a>
    );
}

export default PaginationComponent;