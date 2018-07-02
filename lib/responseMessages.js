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
        try {
            const gnavi_query = {
                // "keyid": config.gnavi.key,
                // "format": "json",
                // "address": station,
                // "hit_per_page": 5,
                // "freeword": keyword,
                // "freeword_condition": 2
            };
            const Qiita_options = {
                url: 'https://qiita.com/api/v2/items',
                headers: {'Content-Type': 'application/json; charset=UTF-8'},

                json: true
            };
            const result = await request.get(Qiita_options);
            result.forEach((item) => {
                console.log('item ->', item.title);
            });
            return {
                type: 'text',
                text: text
            }
        }catch(err) {
            console.error(err);
        }
    }
}

module.exports = responseMessages;