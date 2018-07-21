module.exports = {
    textMessage(text) {
        return {
            type: 'text',
            text: text
        }
    },
    imageMessage(imageUrl) {
        return {
            "type": "image",
            "originalContentUrl": imageUrl,
            "previewImageUrl": imageUrl
        }
    },
    buttonMessage() {
        return {
            "type": "template",
            "altText": "This is a buttons template",
            "template": {
                "type": "buttons",
                "text": "検索方法を選択してください",
                "actions": [
                    {
                        "type": "uri",
                        "label": "住所で検索",
                        "uri": "http://example.com/page/123"
                    },
                    {
                        "type": "uri",
                        "label": "一覧から検索",
                        "uri": "http://example.com/page/123"
                    }
                ]
            }
        }
    },
    flexMessage(trashDays) {
        function getContents(text, imageUrl) {
            return {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "image",
                        "url": imageUrl,
                        "size": "xxs",
                        "aspectMode": "cover",
                        "backgroundColor": "#DDDDDD",
                        "gravity": "center",
                        "flex": 1
                    },
                    {
                        "type": "text",
                        "text": text,
                        "gravity": "center",
                        "size": "xs",
                        "flex": 7
                    }
                ]
            }
        }

        const contents = [];
        trashDays.forEach((trashDay) => {
            const content = getContents(trashDay.trashDay, trashDay.type);
            contents.push(content);
        });

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
};

