// Echo reply

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {/dKstYr0OZAAmCYuK9y6U9cr8h/cELILHO1wNPAGhD1N8W1ZqPeGfRsXwa/bbVbeOFrClk856+5tAbzpMPVj3MXSqRAuOtSkw0giHTXKGUiSCWoIwiFS0QjoKrzA8Sx4eKUImXKSucN5+LqX0tDqKwdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}
