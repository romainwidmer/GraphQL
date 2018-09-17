import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../queries/queries';

// Components
import BookDetails from '../bookDetails/BookDetails';

// Style
import './bookList.css';


class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null
    }
  }

  displayBooks(){
    var data = this.props.data;
    if(data.loading){
      return( <div>Loading books...</div> );
    } else {
      return data.books.map(book => {
        return (
          <li key={ book.id } onClick={ (e) => this.setState({selected: book.id}) }>{ book.name }</li>
        );
      })
    }
  }


  render(){
    return (
      <div className="books-container">

        <div className="book-list">
          <ul>
            { this.displayBooks() }
          </ul>
        </div>

        <BookDetails bookId={ this.state.selected } />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);