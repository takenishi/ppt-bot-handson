const request = require('request');

class responseMessages {
    sendText(text) {
        return {
            type: 'text',
            text: text
        }
    }
    sendImage(imageUrl) {
        return {
            "type": "image",
            "originalContentUrl": imageUrl,
            "previewImageUrl": imageUrl
        }
    };
    sendBubble() {
        return {
            "type": "flex",
            "altText": "this is a flex message",
            "contents": {
                "type": "bubble",
                "styles": {
                    "header": {
                        "backgroundColor": "#ff62ae"
                    },
                    "body": {
                        "backgroundColor": "#5bff54"
                    },
                    "footer": {
                        "backgroundColor": "#7b78ff"
                    }
                },
                "header": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "header"
                        }
                    ]
                },
                "hero": {
                    "type": "image",
                    "url": "https://chikyu-jack.com/wp-content/uploads/2015/06/saddest_cat_13.jpg",
                    "size": "full",
                    "aspectRatio": "1:1"
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "body"
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "footer"
                        }
                    ]
                }
            }
        }
    }
    async sendQiita(text) {

            const Qiita_options = {
                url: 'https://qiita.com/api/v2/items',
                headers: {'Content-Type': 'application/json; charset=UTF-8'},

                json: true
            };
            const result = await request.get(Qiita_options);
            console.log("result ->", result);
            return {
                type: 'text',
                text: text
            }
            // request.get(Qiita_options, (err, res, items) => {
            //     if (!err && res.statusCode === 200) {
            //         // if ('error' in body) {
            //         //     // var error = "すみません、見つかりませんでした。違うワードで検索をお願いします。";
            //         //     // console.log(error);
            //         //     // errors = {error: error};
            //         //     // resolve(errors);
            //         // } else {
            //         // }
            //
            //     }
            //     items.forEach((item) => {
            //         console.log('item ->', item.title);
            //     });
            //     return {
            //         type: 'text',
            //         text: text
            //     }
            // });
    }
}

module.exports = responseMessages;