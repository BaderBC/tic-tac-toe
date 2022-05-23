const express = require('express'),
    app = express(),
    http = require('http'),
    httpServer = http.createServer(app),
    {Server} = require('socket.io'),
    io = new Server(httpServer);


app.use(express.static('tic-tac-toe'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'tic-tac-toe/index.html')
})

app.listen(443)

httpServer.listen(443 , () => {
    console.log('server is working')
})