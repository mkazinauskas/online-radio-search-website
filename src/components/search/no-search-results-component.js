function NoSearchResultsComponent({ title }) {
    if (title === undefined) {
        throw Error('Title is not defined!')
    }
    return (
        <div className="text-2xl text-secondary font-bold flex-1 px-10 md:pt-16 py-10 text-center">Sorry, no results of "{title}"</div>
    )

}

export default NoSearchResultsComponent;