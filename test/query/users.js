/**
 * test for users query
 */
const {setup} = require('../index')
const assert = require('power-assert')
const {client} = require('../apollo-client') 
const gql = require("graphql-tag")
const {Users} = require('../../lib/data')

describe("Query.users", () => {

    before(() => {
        setup()
    })

    it("test idが1のユーザーのid, name, email, postsが取得できる", async () => {
        const userId = 1
        let result, err
        try {
            result = await client
                .query({
                    query: gql`
                        query getUsers {
                            users {
                                id,
                                name,
                                email,
                                posts {
                                    id
                                }
                            }
                        }
                    `
                })

        } catch (e) {
            err = e
        } finally {
            assert.ok(!err)
            assert(result)
            assert(result.data)
            const resultData = result.data
            const resultUsers = result.data.users
            assert.equal(resultUsers.length, 2)
            for (let i = 0; i < resultUsers.length; i++) {
                const resultUser = resultUsers[i]
                assert(resultUser.id)
                assert.equal(resultUser.id, Users[i].id)
                assert.equal(resultUser.name, Users[i].name)
                assert.equal(resultUser.email, Users[i].email)
                assert(resultUser.posts)
                // postsを持っている場合はpostsの各データの比較
                if (resultUsers.posts) {
                    assert.equal(resultUsers.posts.length, Users[i].posts.length)
                    for (let j = 0; j <resultUsers.posts.length; j++) {
                        const posts = resultUsers.posts[j]
                        assert.equal(posts.id, Users[i].posts[j].id)
                        assert.equal(posts.published)
                    }
                }
            }
        }
    })
})