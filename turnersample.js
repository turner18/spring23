var https = require('https');
var fs = require('fs');
var quotes = [];
quotes.push("Gary is God");
quotes.push("Noah needs a punishment");
quotes.push("Matt is bumble");
quotes.push("Four hundred and twenty");
quotes.push("Turner is the king long live the king");
quotes.push("Amazon ... what time is it");
quotes.push("Amazon, what time is it");
quotes.push("Amazon                                   what time is it");

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
                title: 'Garys Number One Fan',
                subtitle: 'Wooooooooo......oo',
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
}).listen(3017); //Put number in the 3000 range for testing and 443 for production
