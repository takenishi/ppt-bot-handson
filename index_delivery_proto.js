// process.env.API_BASE_URL = "http://localhost:8080/bot";
const express = require('express');
const line = require('@line/bot-sdk');
const dialogflow = require('dialogflow');

const config = {
    channelAccessToken: process.env.YOUR_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.YOUR_CHANNEL_SECRET
};


const session_client = new dialogflow.SessionsClient({
    project_id: process.env.DIALOGFLOW_PROJECT_ID,
    credentials: {
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY.replace(/\\n/g, "\n")
    }
});


const app = express();

app.set('port', (process.env.PORT || 3030));

app.post('/', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

// すべてのイベント処理のプロミスを格納する配列。
let events_processed = [];

const client = new line.Client(config);

function handleEvent(event) {
    console.log('event ->', event);
    process.on('unhandledRejection', function(reason, p) {
        console.error(reason);
    });

    if (event.type !== 'message' || event.message.type !== 'text') {
        //return Promise.resolve(null);
        return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'textでしか今は返せません'
        })
    }

    //特定文字判定
    if (event.message.text == 'あほ') {
        console.log('あほゾーン');
        return client.replyMessage(event.replyToken, {
        type: 'text',
        text: 'あほゆうなぼけ'
        });
    }

    //オウム返し
    /*
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
    */
    

events_processed.push(
                session_client.detectIntent({
                    session: session_client.sessionPath(process.env.DIALOGFLOW_PROJECT_ID, event.source.userId),
                    queryInput: {
                        text: {
                            text: event.message.text,
                            languageCode: "ja",
                        }
                    }
                }).then((responses) => {
                    if (responses[0].queryResult && responses[0].queryResult.action == "handle-delivery-order"){
                        let message_text
                        if (responses[0].queryResult.parameters.fields.menu.stringValue){
                            message_text = `毎度！${responses[0].queryResult.parameters.fields.menu.stringValue}ね。どちらにお届けしましょ？`;
                        } else {
                            message_text = `毎度！ご注文は？`;
                        }
                        return client.replyMessage(event.replyToken, {
                            type: "text",
                            text: message_text
                        });
                    }
                })
            );

}

app.listen(app.get('port'), function() {
    console.log('Node app is running -> port:', app.get('port'));
});
