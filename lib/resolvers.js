/**
 * クエリ処理用のリゾルバ
 */

const {Users, Books} = require('./data')
const userService = require('./service').user

const resolvers = {
    users: async (_) => {
      console.log("users was called.")
      return Users  
    },
    user: async({ id }, context) => {
        console.log(`user was called. id :${id}`)
        return Users.find((user) => user.id == id)
    },

    /**
     * 指定したidのuserの名前をランダムに変更して返します。
     * @param {}} param0 
     * @param {*} context 
     */
    setUserNameRandomly: async({id}, context) => {
        console.log(`setUserNameRandomly is called. id: ${id}`)
        let name = 'tset'
        try {
            name = await userService.getRandomName()
            console.log("got name1", name)
        } catch (err) {
            console.error("aaaaa", err)
            name = 'test_error'
        }
        const user = Users.find((user) => user.id == id)
        user.name = name
        return user
    },

    books: async(_) => {
        console.log(`books was called.`)
        return Books
    },

    book: async({id}, context) => {
        console.log(`book was called. id : ${id}`)
        return Books.find((book) => book.id == id)
    },

    updateBooks: async({id, name}, context) => {
        let book
        for (let i = 0; i < Books.length; i++) {
            if (Books[i].id === id) {
                book = Books[i]
            }
        }
        book.name = name;
        return book
    }
};

module.exports = resolvers;