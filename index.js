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
        message,
        text
    } = this.line.message;

    console.log('is message');
    if(message.type !== 'text') {
        return Promise.resolve(null);
    }

    if(text.contains('疲れた') || text.contains('つかれた') || text.contains('ツカレタ')) {
        return client.replyMessage(this.line.replyToken, {
            "type": "image",
            "originalContentUrl": "https://chikyu-jack.com/wp-content/uploads/2015/06/saddest_cat_13.jpg",
            "previewImageUrl": "https://chikyu-jack.com/wp-content/uploads/2015/06/saddest_cat_13.jpg"
        });
    }

    client.replyMessage({
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
                {
                    "type": "text",
                    "text": "こちらはFlex Messageのてすとです。",
                    "wrap": true
                }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
                {
                    "type": "button",
                    "style": "primary",
                    "action": {
                        "type": "uri",
                        "label": "Go",
                        "uri": "https://example.com"
                    }
                }
            ]
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
