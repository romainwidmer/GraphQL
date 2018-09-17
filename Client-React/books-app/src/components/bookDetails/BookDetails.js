import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../../queries/queries';

import './bookDetails.css';


class BookDetails extends Component {
  displayBookDetails(){
    const { book } = this.props.data;
    if(book){
      return(
        <div>
          <h2>{ book.name }</h2>
          <p>{ book.genre }</p>
          <p>{ book.author.name }</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            { book.author.books.map(item => {
              return <li key={item.id}>{ item.name }</li>
            })}
          </ul>
        </div>
      );
    } else {
        return( <h2 className="title">Select a book to see all details...</h2> );
    }
  }

  render(){
    return(
      <div className="book-details">
        { this.displayBookDetails() }
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails);
