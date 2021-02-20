function NoSearchResultsComponent({ title }) {
    if (title === undefined) {
        throw Error('Title is not defined!')
    }
    return (
        <div>No results of {title}</div>
    )

}

export default NoSearchResultsComponent;