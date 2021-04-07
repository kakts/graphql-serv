/**
 * test for setUserNameRandomly mutation
 */
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
            assert.ok(getUserResult)
            let beforeResultUser = getUserResult.data.user
            assert.ok(beforeResultUser)
            assert.equal(beforeResultUser.id, userId)
            // 変更前の名前であることを確認
            assert.equal(beforeResultUser.name, beforeUser.name)
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
            assert.ok(afterUserResult)
            assert.ok(afterUserResult.data)
            assert.ok(afterUserResult.data.setUserNameRandomly)
            const mutationResult = afterUserResult.data.setUserNameRandomly
            assert.equal(mutationResult.id, userId)
            assert.equal(mutationResult.name, resultName)
            assert.equal(mutationResult.__typename, 'User')
        } catch (e) {
            err = e
            console.error(e)
        } finally {
            assert.equal(err, null)
        }
    })
})