const msg = document.querySelector(".msg");
const btn = document.querySelector("#submit");
let guess;
const form = document.querySelector("#form");

// initialize
let guessCount = 3;
let number;
number = Math.round(Math.random() * 10 + 0.5);
console.log(`the number is ${number}`);

form.addEventListener("submit", submitAction);

function submitAction(e) {
  e.preventDefault();

  guess = parseInt(document.querySelector("#guess").value);
  // empty string case
  if (guess === "" || guess < 1 || guess > 10) {
    msg.innerText = "guess between 1 and 10";
    return;
  }

  if (guess === number) {
    // correct action
    msg.style.color = "green";
    msg.innerText = `${guess} is correct! Congratulations!!!`;

    // change input glow color
    document.querySelector("#guess").classList.remove("is-invalid");
    document.querySelector("#guess").classList.add("is-valid");

    // change button text
    btn.setAttribute("value", "Play Again!");
    // change event listeners
    form.removeEventListener("submit", submitAction);
    form.addEventListener("submit", reset);
  } else {
    // incorrect action
    guessCount -= 1;
    msg.style.color = "red";

    // change input glow color
    document.querySelector("#guess").classList.remove("is-valid");
    document.querySelector("#guess").classList.add("is-invalid");
    if (guessCount != 0) {
      msg.innerText = `${guess} is not correct, you have ${guessCount} guesses left`;
    } else {
      // set msg
      msg.innerText = `Sorry, game over, the correct answer was ${number}`;

      // set disabled attribute to btn
      document.querySelector("#guess").setAttribute("disabled", true);

      // change button text
      btn.setAttribute("value", "Play Again?");
      // change event listeners
      form.removeEventListener("submit", submitAction);
      form.addEventListener("submit", reset);
    }
  }
}

function reset(e) {
  msg.innerText = "";
  msg.style.color = "black";
  btn.setAttribute("value", "Guess!");
  guessCount = 3;
  number = Math.round(Math.random() * 10 + 0.5);
  // console.log(`the number is ${number}`);
  form.removeEventListener("submit", reset);
  form.addEventListener("submit", submitAction);
  document.getElementById("guess").value = "";

  // remove input glow color
  document.querySelector("#guess").classList.remove("is-valid");
  document.querySelector("#guess").classList.remove("is-invalid");

  // remove disabled attribute from input
  document.querySelector("#guess").removeAttribute("disabled");
  e.preventDefault();
}
