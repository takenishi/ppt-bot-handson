// process.env.API_BASE_URL = "http://localhost:8080/bot";
require('./models/mongoLoader');
const express = require('express');
const linebot = require('@line/bot-sdk');
const Constants = require('./lib/Constants');
const Users = require('./models/userModel');
const TrashDays = require('./models/trashDayModel');
const lineApiHelper = require('./helper/lineApiHelper');
const messageHelper = require('./helper/messageHelper');
const config = require("config");
const settings = {
    channelAccessToken: process.env.YOUR_CHANNEL_ACCESS_TOKEN || config.YOUR_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.YOUR_CHANNEL_SECRET || config.YOUR_CHANNEL_SECRET
};
const app = express();

app.set('port', (process.env.PORT || 3030));
app.use('/public', express.static('./public'));

app.post('/', linebot.middleware(settings), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then(result => res.json(result));
});

const client = new linebot.Client(settings);
function handleEvent(event) {
    this.event = event;

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
        const line = new lineApiHelper(this.event);
        const user = await Users.findOne({midSha256: line.getUserId()});
        let returnMessage = messageHelper.textMessage('こんにちは');

        if (line.getType() !== 'text') {
            return Promise.resolve(null);
        }

        console.log("hello");

        if(!user || !user.area) {
            console.log("no user");
            returnMessage =  messageHelper.textMessage(Constants.AREA_UNSET_MESSAGE);
        }

        if(line.getText() === "> ゴミ出しの日は?") {
            const trashDays = await TrashDays.find({area: user.area}).exec();
            returnMessage = messageHelper.flexMessage(trashDays);
        }

        if(line.getText() === "> 地域設定") {
            const trashDays = await TrashDays.find({area: user.area}).exec();
            returnMessage = messageHelper.buttonMessage(trashDays);
        }

        return client.replyMessage(line.getReplyToken(), returnMessage);

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
