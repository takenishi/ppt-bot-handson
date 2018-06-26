const express = require('express');
const linebot = require('@line/bot-sdk');

const config = {
    channelAccessToken: process.env.YOUR_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.YOUR_CHANNEL_SECRET
};

const app = express();

app.set('port', (process.env.PORT || 3030));

app.post('/', linebot.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(result => res.json(result));
});

const client = new linebot.Client(config);
function handleEvent(event) {
    console.log('event ->', event);
    this.line = event;

    switch(event.type) {
        case 'message':
            messageEvent();
            break;
        case 'follow':
            followEvent();
            break;
        case 'unfollow':
            unfollowEvent();
            break;
        default:
            return Promise.resolve(null);
    }
}



function messageEvent() {
    const {
        type,
        id,
        text,
    } = this.line.message;

    console.log('is message');
    if(type !== 'text') {
        return Promise.resolve(null);
    }

    if(text.includes('疲れた') || text.includes('つかれた') || text.includes('ツカレタ')) {
        return client.replyMessage(this.line.replyToken, {
            "type": "image",
            "originalContentUrl": "https://chikyu-jack.com/wp-content/uploads/2015/06/saddest_cat_13.jpg",
            "previewImageUrl": "https://chikyu-jack.com/wp-content/uploads/2015/06/saddest_cat_13.jpg"
        });
    }

    client.replyMessage({
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
            "type": "bubble",
            "styles": {
                "header": {
                    "backgroundColor": "#ffaaaa"
                },
                "body": {
                    "backgroundColor": "#aaffaa"
                },
                "footer": {
                    "backgroundColor": "#aaaaff"
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
                "url": "https://example.com/flex/images/image.jpg",
                "size": "full",
                "aspectRatio": "2:1"
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
    })


}

function followEvent() {
    console.log('follow success!');
}

function unfollowEvent() {
    console.log('unfollow success!');
}

app.listen(app.get('port'), function() {
    console.log('Node app is running -> port:', app.get('port'));
});
