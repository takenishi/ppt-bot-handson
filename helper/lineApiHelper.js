class lineApiHelper {
    constructor(event) {
        this.line = event
    }
    getReplyToken() {
        return this.line.replyToken;
    }
    getText() {
        return this.line.message.text;
    }
    getType() {
        return this.line.message.type;
    }
    getUserId() {
        return this.line.source.userId;
    }
}

module.exports = lineApiHelper;