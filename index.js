const express = require('express');
const linebot = require('@line/bot-sdk');
const linebotHelper = require('./lib/responseMessages');
const config = {
    channelAccessToken: process.env.YOUR_CHANNEL_ACCESS_TOKEN || "",
    channelSecret: process.env.YOUR_CHANNEL_SECRET || ""
};
const app = express();

app.set('port', (process.env.PORT || 3030));

app.post('/', linebot.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(result => res.json(result));
});

app.get('/test', function(req, res) {
    const helper = new linebotHelper();
    console.log('test ->', helper.getBubble());
    res.json({result: true});
});

const client = new linebot.Client(config);
function handleEvent(event) {
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
    const helper = new linebotHelper();
    const {
        type,
        text,
    } = this.line.message;

    if (type !== 'text') {
        return Promise.resolve(null);
    }

    if (text.includes('疲れた') || text.includes('つかれた') || text.includes('ツカレタ')) {
        return client.replyMessage(this.line.replyToken, helper.sendImage("https://chikyu-jack.com/wp-content/uploads/2015/06/saddest_cat_13.jpg"));
    }
    return client.replyMessage(this.line.replyToken, helper.sendText(text));
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
