// const request = require('request');
const request = require('request-promise');
const QIITA_API_BASE = 'https://qiita.com/api/v2/';

class QiitaApiHelper {
    async getItem() {
        try {
            const options = {
                uri: `${QIITA_API_BASE}/items`,
                json: true
            };
            return await request(options);

        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = QiitaApiHelper;