const form = document.getElementById("generatorForm");
const prefix = document.getElementById("prefix");
const number1 = document.getElementById("number1");
const letter = document.getElementById("letter");
const number2 = document.getElementById("number2");
const result = document.getElementById("result");
const codeValue = document.getElementById("codeValue");
const canvas = document.getElementById("matrix");
const error = document.getElementById("error");

letter.addEventListener("input", () => {
  letter.value = letter.value
    .replace(/[^a-z]/gi, "")
    .slice(0, 1)
    .toUpperCase();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  error.hidden = true;

  const value =
    prefix.value +
    number1.value +
    letter.value +
    number2.value;

  if (!number1.value || !letter.value || !number2.value) {
    error.textContent = "Заполните все четыре строки.";
    error.hidden = false;
    result.hidden = true;
    return;
  }

  try {
    bwipjs.toCanvas(canvas, {
      bcid: "datamatrix",
      text: value,
      scale: 8,
      padding: 0,
    });

    codeValue.textContent = value;
    result.hidden = false;
  } catch (err) {
    error.textContent = "Не удалось создать Data Matrix: " + err;
    error.hidden = false;
    result.hidden = true;
  }
});
