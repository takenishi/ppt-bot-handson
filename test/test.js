require('../models/mongoLoader');
const chai = require('chai');
const assert = chai.assert;
const Constants = require('../lib/Constants');
const messageHelper = require('../helper/messageHelper');
const lineHelper = require('../helper/lineApiHelper');
const Users = require('../models/userModel');
const TrashDays = require('../models/trashDayModel');

describe("lineHelper", function(){

    it("地域未設定でメッセージを送信すると、設定を促すメッセージが返る", async () => {
        let testEvent = {
            replyToken: "dummyToken",
            type: "message",
            timestamp: 1462629479859,
            source: {
                "type": "user",
                "userId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            },
            message: {
                "id": "325708",
                "type": "text",
                "text": "おはようございます"
            }
        };
        const returnMessage = await testIndex(testEvent);
        assert.equal(returnMessage.type, 'text');
        assert.equal(returnMessage.text, Constants.AREA_UNSET_MESSAGE);
    });

    it("地域設定済でメッセージを送信すると、あいさつを返す。", async () => {
        let testEvent = {
            replyToken: "dummyToken",
            type: "message",
            timestamp: 1462629479859,
            source: {
                "type": "user",
                "userId": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            },
            message: {
                "id": "325708",
                "type": "text",
                "text": "おはようございます"
            }
        };
        const returnMessage = await testIndex(testEvent);
        assert.equal(returnMessage.type, 'text');
        assert.equal(returnMessage.text, "こんにちは");
    });

    it("「> ゴミ出しの日は?」が送られると、地域未設定の場合、設定を促すメッセージが返る", async () => {
        let testEvent = {
            replyToken: "dummyToken",
            type: "message",
            timestamp: 1462629479859,
            source: {
                "type": "user",
                "userId": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            },
            message: {
                "id": "325708",
                "type": "text",
                "text": "> ゴミ出しの日は?"
            }
        };
        const returnMessage = await testIndex(testEvent);
        assert.equal(returnMessage.type, 'text');
        assert.equal(returnMessage.text, Constants.AREA_UNSET_MESSAGE);
    });

    it("「> ゴミ出しの日は?」が送られると、地域設定済みの場合、Flexメッセージが返る", async () => {
        let testEvent = {
            replyToken: "dummyToken",
            type: "message",
            timestamp: 1462629479859,
            source: {
                "type": "user",
                "userId": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            },
            message: {
                "id": "325708",
                "type": "text",
                "text": "> ゴミ出しの日は?"
            }
        };
        const returnMessage = await testIndex(testEvent);
        assert.equal(returnMessage.type, 'flex');
        assert.isArray(returnMessage.contents.body.contents);
    });

    it("「> 地域設定」で「 住所で検索」、「一覧から検索」のButtonが返る", async () => {
        let testEvent = {
            replyToken: "dummyToken",
            type: "message",
            timestamp: 1462629479859,
            source: {
                "type": "user",
                "userId": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            },
            message: {
                "id": "325708",
                "type": "text",
                "text": "> 地域設定"
            }
        };
        const returnMessage = await testIndex(testEvent);
        assert.equal(returnMessage.type, 'template');
        assert.equal(returnMessage.template.type, 'buttons');
        assert.isArray(returnMessage.template.actions);
    });

    // it("Buttonの「住所で検索」を押すと、フリー検索のLIFFが開く", () => {
    //     const line = new lineHelper(testEvent);
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).type, 'text');
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).text, constraints.AREA_UNSET_MESSAGE);
    // });
    //
    // it("フリー検索のLIFFでDBに存在する地域を入力すると、「〇〇」でよろしいですか？というConfirmが返る", () => {
    //     const line = new lineHelper(testEvent);
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).type, 'text');
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).text, constraints.AREA_UNSET_MESSAGE);
    // });
    //
    // it("フリー検索のLIFFでDBに存在しない地域を入力すると、「ごめんなさい」メッセージが返る", () => {
    //     const line = new lineHelper(testEvent);
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).type, 'text');
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).text, constraints.AREA_UNSET_MESSAGE);
    // });
    //
    // it("Confirmで「はい」を押すと、「登録されました」と返り、DB上で登録されている。", () => {
    //     const line = new lineHelper(testEvent);
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).type, 'text');
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).text, constraints.AREA_UNSET_MESSAGE);
    // });
    //
    // it("Confirmで「いいえ」を押すと、「ごめんなさい」と返り、DB上で登録されていない。", () => {
    //     const line = new lineHelper(testEvent);
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).type, 'text');
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).text, constraints.AREA_UNSET_MESSAGE);
    // });
    //
    // it("Buttonの「一覧から検索」を押すと、セレクトボックスのLIFFが開く", () => {
    //     const line = new lineHelper(testEvent);
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).type, 'text');
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).text, constraints.AREA_UNSET_MESSAGE);
    // });
    //
    // it("セレクトボックスのLIFFでセレクトを押すまで、disabledとなり送信できない", () => {
    //     const line = new lineHelper(testEvent);
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).type, 'text');
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).text, constraints.AREA_UNSET_MESSAGE);
    // });
    //
    // it("セレクトボックスのLIFFで地域を選択し、送信すると、LINE上にメッセージが送信され、住所が登録される", () => {
    //     const line = new lineHelper(testEvent);
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).type, 'text');
    //     assert.equal(line.getReturnText(constraints.AREA_UNSET_MESSAGE).text, constraints.AREA_UNSET_MESSAGE);
    // });
});


async function testIndex(testEvent) {
    try {
        const line = new lineHelper(testEvent);
        const user = await Users.findOne({midSha256: line.getUserId()});
        console.log("userResult ->", user);
        if(!user || !user.area) {
            return messageHelper.textMessage(Constants.AREA_UNSET_MESSAGE);
        }

        if(line.getText() === "> ゴミ出しの日は?") {
            const trashDays = await TrashDays.find({area: user.area}).exec();
            return messageHelper.flexMessage(trashDays);
        }

        if(line.getText() === "> 地域設定") {
            const trashDays = await TrashDays.find({area: user.area}).exec();
            return messageHelper.buttonMessage(trashDays);
        }

        return messageHelper.textMessage('こんにちは');

    } catch(err) {
        return new Error(err);
    }
}