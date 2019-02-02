

<Query
    query={LESSONS_QUERY} 
    fetchPolicy="cache-first"
    variables={{
            id: this.props.id,
        }}

    >
    {({ data: lessonData}) => {
        return (
            <Query
                query={PROBLEMS_QUERY} 
                fetchPolicy="cache-first"
                variables={{
                        id: lessonData.id,
                    }}

                >
                {({ data: data1, error: error1, loading: loading1, fetchMore}) => {
                    if (loading1) return <p>Загрузка...</p>
                    if (error1) return <p>Error: {error1.message}</p>;
                    if(data1.problems == 0) return <p>По этому курсу, к сожалению, задачи пока еще не были созданы.</p>
                    return (
                      <>
                        <Query
                                query={AGGREGATE_PAGE_PROBLEMS_QUERY} 
                                fetchPolicy="cache-first"
                                variables={{
                                    id: this.props.id,
                                }}
                        >
                        {({ data: data2, error: error2, loading: loading2 }) => {
                            if (loading2) return <p>Loading...</p>;
                            if (error2) return <p>Error: {error2.message}</p>;
                            return (
                                <div>
                                    <h4>Всего задач: {data2.problemsConnection.aggregate.count}</h4>
                                    {data1.problems.map(problem => <SingleProblem key={problem.id} problem={problem} coursePageId={this.props.id}/>)}
                                        <>
                                        {data2.problemsConnection.aggregate.count > data1.problems.length ?
                                        <FetchMore
                                            onLoadMore={() =>
                                                fetchMore({
                                                variables: {
                                                    skip: data1.problems.length  
                                                },
                                                updateQuery: (prev, { fetchMoreResult }) => {
                                                    if (!fetchMoreResult) return prev;
                                                    return Object.assign({}, prev, {
                                                        problems: [...prev.problems, ...fetchMoreResult.problems]
                                                    });
                                                }
                                                })
                                            }
                                            />
                                        :
                                        null}
                                    </> 
                            </div>
                            )
                        }}
                        </Query> 
                    </>
                    )
                }}
            </Query>
        )
      }}
    </Query>