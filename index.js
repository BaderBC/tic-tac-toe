/*
Made by Bartłomiej Strama

https://bstrama.com
*/
let turn = "x",
  numberTurn = true,
  field = [],
  filledFieldsNumber = 0;

function onLoad() {
  mode();
  let papiez = Math.floor(Math.random() * 2137 + 1);
  console.log(papiez);
}

function mainFunction(field0, field1) {
  let sid = document.getElementById(`${field0}${field1}`);
  sid.removeAttribute("onclick");
  field[[field0, field1]] = numberTurn;
  sid.innerHTML = `<p>${turn}</p>`;
  sid.classList.add("checked");
  sid.classList.remove("unchecked");
  numberTurn = !numberTurn;
  turn = numberTurn ? "x" : "o";
  document.getElementById("now").innerHTML = "Tura " + turn;
  document.documentElement.style.setProperty("--content-box", `"${turn}"`);
  filledFieldsNumber += 1;
  winValidation(field0, field1);
}

function winValidation(field0, field1) {
  let set = [
    rowAndColumnValidation(field0, field1),
    crossValidation(field0, field1),
  ];
  if (set.indexOf(true) + 1) {
    //endAndStart(true)
    document.getElementById("now").innerHTML = "Wygrał x";
  } else if (set.indexOf(false) + 1) {
    //endAndStart(true)
    document.getElementById("now").innerHTML = "Wygrał o";
  }

  if (filledFieldsNumber === 9) {
    document.querySelectorAll(".last, .lastn").
    forEach((element) => element.style.display = "flex")
    console.log(9)
  }else if(filledFieldsNumber === 15) {
    document.querySelectorAll(".bigger").
    forEach((element) => element.style.display = "flex")
    console.log(15)
  }
}


function rowAndColumnValidation(field0, field1) {
  let fieldSet = [],
    j = 0,
    i,
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
        return fieldSet[2];
      }
    }
  }
}

function crossValidation(field0, field1) {
  let fieldSet = [],
    i,
    c,
    l;

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
        field[[field0 + 1 - c, field1 + i + c]] =
          field[[field0 - c, field1 + c]] =
          field[[field0 - 1 - c, field1 - i + c]] =
            null;
        return fieldSet[1];
      }
    }
  }
}


function reset(){
  document.querySelectorAll(".box").forEach( function(element){
    element.setAttribute("onclick",
    `mainFunction(${element.id.toString()[0]}, 
          ${element.id.toString()[1]})`);
    element.innerHTML = "";
    element.classList.remove("checked");
    element.classList.add("unchecked");
  })

  document.getElementById("now").innerText = 'Tura x'
  field = [];
  turn = 'x';
  document.documentElement.style.setProperty("--content-box", '"x"')
  numberTurn = true;
  filledFieldsNumber = 0;
}