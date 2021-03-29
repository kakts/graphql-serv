const axios = require('axios')

const namesClient = axios.create({
    baseURL: 'http://names.drycodes.com',
    responseType: 'json'
});

/**
 * names apiから名前を1件取得して返します。
 * @return {String} random anme
 */
async function getRandomName() {

    // Promiseを返すようにしないと、呼び出し元で.thenで値を取得できなかった
    return new Promise((resolve, reject) => {
        namesClient
            .get('/1')
            .then((response) => {
                const name = response.data[0];
                console.log(`got name! ${name}`);
                resolve(name);
            })
            .catch((error) => {
                console.error('[getRandomName] error has occured. error.', error)
                reject(error)
            })
    })
}

module.exports = {
    getRandomName
}
