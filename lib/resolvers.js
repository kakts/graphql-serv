/**
 * クエリ処理用のリゾルバ
 */

const {Users, Books} = require('./data')

const resolvers = {
    users: async (_) => {
      console.log("users was called.")
      return Users  
    },
    user: async({ id }, context) => {
        console.log(`user was called. id :${id}`)
        return Users.find((user) => user.id == id)
    },

    books: async(_) => {
        console.log(`books was called. id :${id}`)
        return Books
    },

    book: async({id}, context) => {
        console.log(`book was called. id : ${id}`)
        return Books.find((book) => book.id == id)
    },

    updateBooks: async({id, name}, context) => {
        let book
        for (let i = 0; i < Books.length; i++) {
            if (Books[i].id === i) {
                book = Books[i]
            }
        }
        book.name = name;
        return book
    }
};

module.exports = resolvers;