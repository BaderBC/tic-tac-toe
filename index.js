let turn = "x", numberturn = true, field=[];

function mainfunction(id){
    let sid = document.getElementById(id);
    sid.onclick = '#';
    field[parseInt(id) - 1] = numberturn? 1:0;
    sid.innerHTML = turn;
    numberturn = numberturn? false:true;
    turn = numberturn? 'x':'o';
    document.getElementById("now").innerHTML = "Now: " + turn;
    tester()
}


function tester(){
    if(1 == comparation(0, 1, 2, 3) || 1 == comparation(0, 3, 6, 3) || 1 == comparation(0, 4, 8, 1) || 1 == comparation(2, 4, 6, 1)){
        console.log("x wygrał")
        document.getElementById("now").innerHTML = "Wygrał x"
    }else if(0 == comparation(0, 1, 2, 3) || 0 == comparation(0, 3, 6, 3) || 0 == comparation(0, 4, 8, 1) || 0 == comparation(2, 4, 6, 1)){
        console.log("o wygrał")
        document.getElementById("now").innerHTML = "Wygrał o"
    }
}


function comparation(id1, id2, id3, times){
    for(let i = 0; i < times; i++){
        if(field[id1 + i] == 1 && field[id2 + i] == 1 && field[id3 + i] == 1){
            return "1";
        }else if(field[id1 + i] == 0 && field[id2 + i] == 0 && field[id3 + i] == 0){
            return "0";
        }
    }
}