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

    getFlexTemplate(contents) {
        return {
            "type": "flex",
            "altText": "this is a flex message",
            "contents": {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": contents
                }
            }
        }
    }

    async sendIcons(text) {
        const items = await qiitaHelper.getItem(text);
        let contents = [];
        for (let i = 0; i < 5; i++) {
            contents.push({
                "type": "box",
                "layout": "baseline",
                "contents": [
                    {
                        "type": "icon",
                        "url": items[i].user.profile_image_url,
                        "size": "xl"
                    },
                    {
                        "type": "text",
                        "text": items[i].title,
                        "size": "lg"
                    }
                ]
            });
        }
        return this.getFlexTemplate(contents);
    }
    async sendSpacer(text) {
        const items = await qiitaHelper.getItem(text);
        let contents = [];
        for (let i = 0; i < 5; i++) {
            contents.push({
                "type": "box",
                "layout": "baseline",
                "contents": [
                    {
                        "type": "icon",
                        "url": items[i].user.profile_image_url,
                        "size": "xl"
                    },
                    {
                        "type": "spacer",
                        "size": "md"
                    },
                    {
                        "type": "text",
                        "text": items[i].title,
                        "size": "lg"
                    }
                ]
            });
        }
        return this.getFlexTemplate(contents);
    }
}

module.exports = responseMessages;