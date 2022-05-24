/*
Made by Bartłomiej Strama

https://bstrama.com
*/

const express = require('express'),
    app = express(),
    http = require('http'),
    httpServer = http.createServer(app),
    socketIO = require('socket.io'),
    io = new socketIO.Server(httpServer),
    PORT = 8080,
    EventEmitter = require('events'),
    emitSocket = new EventEmitter;


app.use(express.static('game-front-end'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/game-front-end/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('functionToEmit-server', (fName) => {
        switch (fName){
            case 'reset': reset();
        }
    })

    emitSocket.on('objectReturn', (obj) => {
        socket.emit('objectReturn', obj)
    })

    emitSocket.on('emit', (fName, data1, data2) => {
        socket.emit('functionToEmit', fName, data1, data2)
    })

    socket.on('move', (moveObject) => {
        mainFunction(moveObject.f0, moveObject.f1)
    })
})

httpServer.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});




// tic-tac-toe code:


let turn = "x",
    numberTurn = true,
    field = [],
    filledFieldsNumber = 0,
    objectToReturn = {};

function mainFunction(field0, field1) {
    field[[field0, field1]] = numberTurn;
     objectToReturn.f0 = field0;
     objectToReturn.f1 = field1;
    numberTurn = !numberTurn;
    turn = numberTurn ? "x" : "o";
     objectToReturn.turn = turn;
    filledFieldsNumber += 1;
    winValidation(field0, field1);
     objectToReturn.filledFielsNumber = filledFieldsNumber;
    emitSocket.emit('objectReturn', objectToReturn)
}

function winValidation(field0, field1) {
    let set = [
            rowAndColumnValidation(field0, field1),
            crossValidation(field0, field1),
        ];

    if (set.indexOf(true) + 1) {
        objectToReturn.parseXinnerTextPlus = 1;
    } else if (set.indexOf(false) + 1) {
        objectToReturn.parseOinnerTextPlus = 1;
    }

}

function rowAndColumnValidation(field0, field1) {
    let fieldSet = [],
        j = 0,
        i,
        l = 0,
        leftSide = Array(3),
        rightSide = Array(3);

    for (; j < 2; j++) {
        for (i of [0, 1, 2]) {
            j
                ? (leftSide = Array(3)
                    .fill()
                    .map((_, index) => i - index))
                : (rightSide = Array(3)
                    .fill()
                    .map((_, index) => i - index));

            j ? rightSide.fill(0) : leftSide.fill(0);

            fieldSet = [
                field[[field0 + leftSide[2], field1 + rightSide[2]]],
                field[[field0 + leftSide[1], field1 + rightSide[1]]],
                field[[field0 + leftSide[0], field1 + rightSide[0]]],
            ];
            if (
                fieldSet.every((x) => x === true) ||
                fieldSet.every((x) => x === false)
            ) {
                field[[field0 + leftSide[0], field1 + rightSide[0]]] =
                    field[[field0 + leftSide[1], field1 + rightSide[1]]] =
                        field[[field0 + leftSide[2], field1 + rightSide[2]]] =
                            null;
                for (l of [0, 1, 2]) {
                    emitSocket.emit('emit', 'fieldWinParameters', `${(field0 + leftSide[l]).toString() + (field1 + rightSide[l])}`, fieldSet[0])
                }
                return fieldSet[2];
            }
        }
    }
}

function crossValidation(field0, field1) {
    let fieldSet = [],
        i,
        c,
        l,
        i2;

    for (c of [-1, 0, 1]) {
        for (i of [-1, 1]) {
            l = i === 1 ? -1 * c : c;
            fieldSet = [
                field[[field0 - 1 + l, field1 + i + c]],
                field[[field0 + l, field1 + c]],
                field[[field0 + 1 + l, field1 - i + c]],
            ];
            if (
                fieldSet.every((x) => x === true) ||
                fieldSet.every((x) => x === false)
            ) {
                field[[field0 - 1 + l, field1 + i + c]] =
                    field[[field0 + l, field1 + c]] =
                        field[[field0 + 1 + l, field1 - i + c]] =
                            null;

                for (i2 of [
                    `${(field0 - 1 + l).toString() + (field1 + i + c)}`,
                    `${(field0 + l).toString() + (field1 + c)}`,
                    `${(field0 + 1 + l).toString() + (field1 - i + c)}`,
                ]) {
                    emitSocket.emit('emit', 'fieldWinParameters' , i2, fieldSet[0]);
                }

                return fieldSet[1];
            }
        }
    }
}


function reset() {
    field = [];
    turn = "x";
    numberTurn = true;
    filledFieldsNumber = 0;
}
