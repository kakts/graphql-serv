const {setup, teardown, testApiClient} = require('../index')
const assert = require('power-assert')
const {client} = require('../apollo-client') 
const gql = require("graphql-tag")
const {Users} = require('../../lib/data')

describe("Query.user", () => {

    before(() => {
        setup()
    })

    it("test idが1のユーザーのid, nameが取得できる", async () => {
        const userId = 1
        const user = Users.find((data) => {
            if (data.id === userId) {
                return data
            }
        });
        let result, err
        try {
            result = await client
                .query({
                    query: gql`
                        query getUser {
                            user(id: ${userId}) {
                            id,
                            name
                            }
                        }
                    `
                });
        } catch (e) {
            err = e
        } finally {
            console.log("---------2", result, err)
            assert.ok(!err)
            assert(result)
            assert(result.data)
            const resultData = result.data
            assert.equal(resultData.user.id, user.id)
            assert(resultData.user.name, user.name)
            assert.equal(resultData.user.__typename, "User")
        }
    })

    it("test idが1のユーザーのid, name, email, postsが取得できる", async () => {
        const userId = 1
        const user = Users.find((data) => {
            if (data.id === userId) {
                return data
            }
        });
        let result, err
        try {
            result = await client
                .query({
                    query: gql`
                        query getUser {
                            user(id: ${userId}) {
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
            assert.equal(resultData.user.id, user.id)
            assert.equal(resultData.user.name, user.name)
            assert.equal(resultData.user.email, user.email)
            for (let i = 0; i < resultData.user.posts.length; i++) {
                assert.equal(resultData.user.posts[i].id, user.posts[i].id)
                assert.equal(resultData.user.posts[i].__typename, 'Post')
            }

            assert.equal(resultData.user.__typename, "User")
        }
    })
})