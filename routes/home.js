const express = require('express');
const router = express.Router();
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
const request = require('request');

router.get('', (req, res) => {
    res.json({res: 'Hello, world'});
});

router.get('/bot', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    var mensagem = req.query.mensagem || 'ola';
    const conversation = new ConversationV1({
        username: '6ba9a931-b8f8-4275-bc0f-efdbbaafa5d7',
        password: 'zkh7tPCg62EJ',
        version_date: ConversationV1.VERSION_DATE_2016_09_20
    });
    conversation.message({
        input: {
            text: mensagem,
        },
        workspace_id: '0ba5d60d-f5c2-4a33-8365-2b541b57ebac'
    }, function (err, response) {
        if (err) {
            res.send(err);
        } else {
            res.json(response.output.text[0]);
        }
    });
});

router.get('/verifica', function (req, res) {

        res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    if(!req.query.link){
        return res.send('erro');
    }

    url = req.query.link;
    //url = "https://www.indeed.com.br/viewjob?jk=8d38097e6f54685c&from=recjobs&vjtk=1cpcb8ih6d4gv800";

    request.get(url, (error, response, body) => {
        if (error) return reject(error);
        var jsonData = body;
        var salario = jsonData.substr(jsonData.indexOf('jobsearch-JobMetadataHeader-item') + 'jobsearch-JobMetadataHeader-item'.length + 5, 6);
        var tipo = jsonData.substr(jsonData.indexOf('jobsearch-JobInfoHeader-title') + 'jobsearch-JobInfoHeader-title'.length + 2, 8);
        var descricao = jsonData.substr(jsonData.indexOf('jobsearch-JobComponent-description') + 'jobsearch-JobComponent-description'.length + 18, jsonData.substr(jsonData.indexOf('jobsearch-JobComponent-description') + 'jobsearch-JobComponent-description'.length + 2, 1000).indexOf('</div>'));
        return res.json({
            salario,
            tipo,
            descricao,
        });
    });
 });


module.exports = router;