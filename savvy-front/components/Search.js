import React from 'react';
import Downshift, {resetIdCounter} from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/Search';

const SEARCH_COURSEPAGES_QUERY = gql`
  query SEARCH_COURSEPAGES_QUERY($searchTerm: String!) {
    coursePages(where: 
        { OR: 
            [
                { title_contains: $searchTerm }, 
                { description_contains: $searchTerm }
            ] 
        }) {
      id
      title
    }
  }
`;

function routeToCoursePage(coursePage) {
  Router.push({
    pathname: '/coursePage',
    query: {
      id: coursePage.id,
    },
  });
}

class AutoComplete extends React.Component {
    state = {
        coursePages: [],
        loading: false,
      };
    onChange =  debounce(async (e, client) => {
      // turn loading on
      this.setState({ loading: true });
      // Manually query apollo client
      const res = await client.query({
        query: SEARCH_COURSEPAGES_QUERY,
        variables: { searchTerm: e.target.value },
      })
      this.setState({
          coursePages: res.data.coursePages,
          loading: false,
      });
    }, 350)

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
          <Downshift onChange={routeToCoursePage} itemToString={item => (item === null ? ''
           : item.title)}>
            {({ getInputProps, getItemProps, isOpen, inputValue, 
                highlightedIndex}) => ( 
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                    type: 'search',
                    placeholder: 'Поиск курсов...',
                    id: 'search',
                    className: this.state.loading ? 'loading' : '',
                    onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
              <DropDown>
              {this.state.coursePages.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      {item.title}
                    </DropDownItem>
                  ))}
                  {!this.state.coursePages.length &&
                  !this.state.loading && <DropDownItem>
                      Такого курса пока нет. Создайте песочницу и изучите этот вопрос с другими участниками!</DropDownItem>}
              </DropDown>
              )}
          </div>
          )}
        </Downshift> 
      </SearchStyles>
    );
  }
}

export default AutoComplete;