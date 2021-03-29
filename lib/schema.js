/* schema.js */

const { buildSchema } = require("graphql");

/**
 * GQ用のスキーマをセットアップする
 * User,Postという2つのカスタム型を作成し、クエリ定義内でusersとuserの照会ポイントをエクスポーズする
 * 
 * String! はnon-nullableな文字列型ということ
 * ID: ユニークな識別子を表すスカラー型
 * 
 */
const schema = buildSchema(`
    type Query {
        users: [User!]!,
        user(id: Int!): User!,
        books: [Book!]!,
        book(id: Int!): Book!
    }

    type Mutation {
        updateBooks(id: Int!, name: String!): Book!
        setUserNameRandomly(id: Int!): User!
    }


    type User {
        id: ID!
        name: String!
        email: String
        posts: [Post!]
    }

    type Book {
        id: ID!
        name: String!
        publish: String!
    }

    type Post {
        id: ID!
        title: String!
        published: Boolean!
        link: String
        author: User!
    }
`);

module.exports = schema;