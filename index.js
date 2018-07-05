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

app.get('/test', async function(req, res) {
    const helper = new linebotHelper();
    const test =  await helper.sendQiita("test");
    console.log('test ->', test);
    res.json(test);
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

async function messageEvent() {
    try {
        const helper = new linebotHelper();
        const {
            type,
            text,
        } = this.line.message;

        if (type !== 'text') {
            return Promise.resolve(null);
        }

        if (text.includes('疲れた') || text.includes('つかれた') || text.includes('ツカレタ')) {
            return client.replyMessage(this.line.replyToken, helper.sendImage("https://qiita-image-store.s3.amazonaws.com/0/203817/profile-images/1510250083"));
        }
        if (text.includes('バブル') || text.includes('ばぶる')) {
            return client.replyMessage(this.line.replyToken, helper.sendBubble());
        }
        if (text.includes('Qiita')) {
            return client.replyMessage(this.line.replyToken, helper.sendQiita(text));
        }
        if (text.includes('アイコン')) {
            const test = await helper.sendIcons(text);
            return client.replyMessage(this.line.replyToken, test);
        }
        if (text.includes('セパレータ')) {
            const space = await helper.sendSeparator(text);
            return client.replyMessage(this.line.replyToken, space);
        }
        if (text.includes('イメージ')) {
            const space = await helper.sendImage(text);
            return client.replyMessage(this.line.replyToken, space);
        }
        if (text.includes('ボタン')) {
            const space = await helper.sendButton(text);
            return client.replyMessage(this.line.replyToken, space);
        }
        if (text.includes('スペーサー')) {
            const space = await helper.sendSpacer(text);
            return client.replyMessage(this.line.replyToken, space);
        }
        return client.replyMessage(this.line.replyToken, helper.sendText(text));

    } catch(err) {
        console.log(err);
    }
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
