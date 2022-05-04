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
    ],
    o = document.getElementById("points-o"),
    x = document.getElementById("points-x");

  if (set.indexOf(true) + 1) {
    x.innerText = parseInt(x.innerText) + 1;
  } else if (set.indexOf(false) + 1) {
    o.innerText = parseInt(o.innerText) + 1;
  }

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
      now.innerText = `Wygrał: x`;
    } else if (o.innerText > x.innerText) {
      now.innerText = "Wygrało: o";
    } else {
      now.innerText = "Remis";
    }
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
            fieldWinParameters(`${(field0 + leftSide[l]).toString() 
            + (field1 + rightSide[l])}`, fieldSet[0])
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
          `${(field0 + 1 + l).toString() + (field1 - i + c)}`]) {
          fieldWinParameters(i2, fieldSet[0])
        }

        return fieldSet[1];
      }
    }
  }
}


function fieldWinParameters(id, isXorO){
  let element = document.getElementById(id)
  element.style.backgroundColor = isXorO? "rgba(181, 143, 143, 0.15)" : "rgba(143, 181, 178, 0.15)";
  element.style.borderRadius = "15px"
  element.style.color = "#5b8c59"
}


function reset() {
  document.querySelectorAll(".box").forEach(function (element) {
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
    element.style.backgroundColor = "white"
  });

  document.querySelectorAll(".last, .lastn, .bigger").forEach(function (element){
    element.style.display = "none";
  });

  document.getElementById("now").innerText = "Tura x";
  field = [];
  turn = "x";
  document.documentElement.style.setProperty("--content-box", '"x"');
  numberTurn = true;
  filledFieldsNumber = 0;
  document.getElementById("points-x").innerText = "0";
  document.getElementById("points-o").innerText = "0";
}
