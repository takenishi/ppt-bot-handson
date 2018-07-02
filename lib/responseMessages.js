// const request = require('request-promise');
const qiitaApi = require('./qiitaApiHelper');
const qiitaHelper = new qiitaApi;

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

    async sendItems(text) {
        const items = await qiitaHelper.getItem(text);
        let returnText = [];
        for (let i = 0; i < items.length; i++) {
            returnText.push({
                title: `${items[i].title}`,
                profileImg: items[i].user.profile_image_url
            });
        }

        return {
            "type": "bubble",
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                            {
                                "type": "icon",
                                "url": items[0].user.profile_image_url,
                                "size": "xxl"
                            },
                            {
                                "type": "text",
                                "text": items[0].title,
                                "size": "xxl"
                            }
                        ]
                    },
                    {
                        "type": "box",
                        "layout": "baseline",
                        "contents": [
                            {
                                "type": "icon",
                                "url": items[1].user.profile_image_url,
                                "size": "xxl"
                            },
                            {
                                "type": "text",
                                "text": items[1].title,
                                "size": "xxl"
                            }
                        ]
                    }
                ]
            }
        }
    }
    async sendQiita(text) {
        const items = await qiitaHelper.getItem('test');
        let returnText = [];
        for (let i = 0; i < items.length; i++) {
            returnText.push({
                title: `${items[i].title}`,
                profileImg: items[i].user.profile_image_url
        });
        }
        console.log("return ->", returnText);

        return {
            type: 'text',
            text: returnText
        };
    }
}

module.exports = responseMessages;