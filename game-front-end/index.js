/*
Made by Bartłomiej Strama

https://bstrama.com
*/

const socket = io();

let now = document.getElementById('now'),
    x = document.getElementById('points-x'),
    o = document.getElementById('points-o'),
    turn = 'x';

function onLoad(){
    mode();
    let papiez = Math.floor(Math.random() * 2137 + 1);
    console.log(papiez);
}

function mainFunction(field0, field1){
    socket.emit('functionToEmit-server', 'move', [
        field0,
        field1
    ])
}

socket.on('objectReturn', (toChangeObject) => {
    let sid = document.getElementById(`${toChangeObject.f0}${toChangeObject.f1}`),
        filledFieldsNumber = toChangeObject.filledFielsNumber;


    sid.removeAttribute('onclick');
    sid.innerHTML = `<p>${turn}</p>`
    sid.classList.add('checked')
    sid.classList.remove('unchecked')
    turn = toChangeObject.turn;
    document.documentElement.style.setProperty('--content-box', `"${turn}"`)
    now.innerText = `Tura: ${turn}`

    if (filledFieldsNumber === 9) {
        document
            .querySelectorAll(".last, .lastn")
            .forEach((element) => (element.style.display = "flex"));
    } else if (filledFieldsNumber === 15) {
        document
            .querySelectorAll(".bigger")
            .forEach((element) => (element.style.display = "flex"));
    } else if (filledFieldsNumber === 25) {
        let now = document.getElementById("now");
        if (x.innerText > o.innerText) {
            now.innerText = `!X WIN!`;
        } else if (o.innerText > x.innerText) {
            now.innerText = "!O WIN!";
        } else {
            now.innerText = "DRAW";
        }
    }
})

socket.on('functionToEmit', (fName, data) => {
    switch (fName) {
        case 'fieldWinParameters':
            fieldWinParameters(data[0], data[1]);
            break;
        case 'add-points':
            data[0]?
                x.innerText++:
                o.innerText++;
            break;
        case 'playAs':
            document.getElementById('playAs').innerText = `Grasz jako: ${data[0]}`;
            break;
        case 'reset':
            frontEndReset()
            break;
    }
})


function fieldWinParameters(id, isXorO) {
    let element = document.getElementById(parseInt(id));
    element.style.backgroundColor = isXorO
        ? "rgba(181, 143, 143, 0.15)"
        : "rgba(143, 181, 178, 0.15)";
    element.style.borderRadius = "15px";
    element.style.color = "#5b8c59";

}

function reset(){
    socket.emit('functionToEmit-server', 'reset');
}

function frontEndReset(){
    //document.getElementById('playAs').innerText = 'Waiting for opponent';
    turn = 'x';
    document.querySelectorAll(".box").forEach((element) => {
        element.setAttribute(
            "onclick",
            `mainFunction(${element.id.toString()[0]}, 
          ${element.id.toString()[1]})`
        );
        element.innerHTML = "";
        element.classList.remove("checked");
        element.classList.add("unchecked");
        element.style.color = "black";
        element.style.borderRadius = "0px";
        element.style.backgroundColor = "var(--box-color)";
    });

    document
        .querySelectorAll(".last, .lastn, .bigger")
        .forEach((element) => {
            element.style.display = "none";
        });

    document.getElementById("now").innerText = "Tura x";
    document.documentElement.style.setProperty("--content-box", '"x"');
    document.getElementById("points-x").innerText = "0";
    document.getElementById("points-o").innerText = "0";
}