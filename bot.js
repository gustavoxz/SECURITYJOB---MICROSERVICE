// JavaScript source code
//const dotenv = require('dotenv');
//dotenv.config()
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
const conversation = new ConversationV1({
    username: '6ba9a931-b8f8-4275-bc0f-efdbbaafa5d7',
    password: 'zkh7tPCg62EJ',
    version_date: ConversationV1.VERSION_DATE_2016_09_20
});
conversation.message({
    input: {
        text: 'O que é security jobs'
    },
    workspace_id: '0ba5d60d-f5c2-4a33-8365-2b541b57ebac'
}, function (err, response) {
    if (err) {
        console.error(err);
    } else {
        console.log(JSON.stringify(response, null, 2));
    }
});