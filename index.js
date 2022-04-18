/*
Made by Bartłomiej Strama

https://bstrama.com
*/
let turn = "x",
    numberturn = true,
    field = [];

function mainfunction(id) {
  let sid = document.getElementById(id);
  sid.onclick = '#';
  field[parseInt(id)] = numberturn;
  sid.innerHTML = turn;
  numberturn = !numberturn;
  turn = numberturn ? "x" : "o";
  document.getElementById("now").innerHTML = "Tura " + turn;
  tester();
}

function tester() {
  let set1 = new Set([
    rowAndColumnValidation(0,1,2,9, 3),
    rowAndColumnValidation(0,3,6,3, 1),
    rowAndColumnValidation(0,4,8,1,1),
    rowAndColumnValidation(2,4,6,1,1)])

  if (set1.has("1")) {
    console.log("x wygrał");
    document.getElementById("now").innerHTML = "Wygrał x";
  } else if (set1.has("0")) {
    console.log("o wygrał");
    document.getElementById("now").innerHTML = "Wygrał o";
  }
}

function rowAndColumnValidation(id1, id2, id3, times, increment) {
  for (let i = 0; i < times; i+= increment) {
    if ([
        field[id1 + i],
        field[id2 + i],
        field[id3 + i]].every(n => n === true)) {
      return "1";
    } else if ([
        field[id1 + i],
        field[id2 + i],
        field[id3 + i]].every(n => n === false)) {
      return "0";
    }
  }
}

function mode() {
  let value = document.getElementById("mode").value
  console.log(value);
}