/**
 * test for setUserNameRandomly mutation
 */

const {setup} = require('../index')
const nock = require('nock')
const assert = require('power-assert')
const {client} = require('../apollo-client') 
const gql = require("graphql-tag")
const {Users} = require('../../lib/data')

const testCore = require('../index')

describe("Mutation.setUsreNameRandomly", () => {
    const resultName = 'testName'
    before(() => {
        // mock api
        nock('http://names.drycodes.com')
            .get('/1')
            .reply(200, [resultName])
    })

    after(() => {
        testCore.teardown()
    })


    it("test idが1のユーザーのid, nameが取得できる", async () => {
        const userId = 1
        const beforeUser = Users.find((data) => {
            if (data.id === userId) {
                return data
            }
        });
        let getUserResult, afterUserResult, err
        try {

            // 更新前のid: 1のユーザ情報を取得する
            getUserResult = await client
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
            console.log(111)
            assert.ok(getUserResult)
            let beforeResultUser = getUserResult.data.user
            assert.ok(beforeResultUser)
            assert.equal(beforeResultUser.id, userId)
            // 変更前の名前であることを確認
            assert.equal(beforeResultUser.name, beforeUser.name)
            console.log(222)
            // mutation: setUserNameRandomlyでid: 1のユーザの名前を変更する
            afterUserResult = await client
                .mutate({
                    mutation: gql`
                        mutation setUserNameRandomly {
                            setUserNameRandomly(id: ${userId}) {
                                id,
                                name
                            }
                        }
                    `
                })
            console.log("after: ", afterUserResult)
            assert.ok(afterUserResult)

        } catch (e) {
            err = e
            console.error(e)
        } finally {
            assert.equal(err, null)
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