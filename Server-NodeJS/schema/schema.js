const graphql = require('graphql');
const Book = require('../database/models/book');
const Author = require('../database/models/author');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;



// Define the Book type
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields:() => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      }
    }
  })
});


// Define the Author type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields:() => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      }
    }
  })
});


// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // return data for a specific book
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },

    // return data for a specific author
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },

    // Return a list of books
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },

    // return a list of authors
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});


// define all mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

    // Add a new Author
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },

    // Add a new book
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
