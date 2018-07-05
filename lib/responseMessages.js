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
                        "type": "text",
                        "text": items[i].title,
                        "size": "lg"
                    },
                    {
                        "type": "spacer",
                        "size": "md"
                    }
                ]
            });
        }
        return this.getFlexTemplate(contents);
    }

    async sendSeparator(text) {
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
            contents.push({
                "type": "separator"
            });
        }
        return this.getFlexTemplate(contents);
    }

    async sendButton(text) {
        const items = await qiitaHelper.getItem(text);
        let contents = [];
        for (let i = 0; i < 5; i++) {
            const title = items[i].title.length > 19 ?  items[i].title.slice(0,19) + "…" : items[i].title;
            contents.push({
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "image",
                        "url": items[i].user.profile_image_url,
                        "size": "xxs",
                        "aspectMode": "cover",
                        "backgroundColor": "#DDDDDD",
                        "gravity": "center",
                        "flex": 1
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm",
                        "action": {
                            "type": "uri",
                            "label": title,
                            "uri": "https://qiita.com/"
                        },
                        "flex": 7
                    }
                ]
            });
            contents.push({
                "type": "separator"
            });
        }
        const flexMessage = this.getFlexTemplate(contents);
        flexMessage.contents.footer = {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "button",
                    "style": "primary",
                    "action": {
                        "type": "uri",
                        "label": "Qiita",
                        "uri": "https://qiita.com/"
                    }
                }
            ]
        };
        console.log("flex ->", flexMessage);
        return flexMessage;
    }
    async sendFinish(text) {
        const items = await qiitaHelper.getItem(text);
        let contents = [];
        for (let i = 0; i < 5; i++) {
            const title = items[i].title.length > 19 ?  items[i].title.slice(0,19) + "…" : items[i].title;
            contents.push({
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "image",
                        "url": items[i].user.profile_image_url,
                        "size": "xxs",
                        "aspectMode": "cover",
                        "backgroundColor": "#DDDDDD",
                        "gravity": "center",
                        "flex": 1
                    },
                    {
                        "type": "button",
                        "style": "link",
                        "height": "sm",
                        "action": {
                            "type": "uri",
                            "label": title,
                            "uri": "https://qiita.com/"
                        },
                        "flex": 7
                    }
                ]
            });
            contents.push({
                "type": "separator"
            });
        }
        contents.push({
            "type": "spacer",
            "size": "sm"
        });
        contents.push({
            "type": "button",
            "style": "primary",
            "action": {
                "type": "uri",
                "label": "Qiita",
                "uri": "https://qiita.com/"
            }
        });
        return this.getFlexTemplate(contents);
    }
}

module.exports = responseMessages;