var https = require('https');
var fs = require('fs');
var quotes = [];
quotes.push("first quote");
quotes.push("second quote");
quotes.push("third quote");
quotes.push("fourth quote");
quotes.push("fifth quote");

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt')
};

function respond(theText) {

    theResponse = {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: theText
            },
            card: {
                type: 'Simple',
                title: 'Sample',
                subtitle: 'Spring 23',
                content: theText
            },
            shouldEndSession: 'false'
        }
    }
    return (theResponse);
}


https.createServer(options, function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            if (jsonString.length > 0)
                console.log(JSON.parse(jsonString));
        });
    }
    myResponse = JSON.stringify(respond(getRandomQuote()));
    res.setHeader('Content-Length', myResponse.length);
    res.writeHead(200);
    res.end(myResponse);
    console.log(myResponse);
}).listen(443); //Put number in the 3000 range for testing and 443 for production
