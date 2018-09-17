import React, { Component } from 'react';
import AppoloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import BookList from './components/bookList/BookList';
import AddBook from './components/addBook/AddBook';

// Apollo client setup
const client = new AppoloClient({
  uri: 'http://127.0.0.1:4000/graphql'
});

// App component
export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <h1 className="title">Books: Data from GraphQL</h1>
          <BookList />

          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}
