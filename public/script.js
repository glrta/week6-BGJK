
const form = document.getElementById("userDetailForm");
const inputs = form.querySelectorAll("input");

form.setAttribute("novalidate", ""); //disables html5 validation procedures.

form.addEventListener("submit", (event) => {
  const allInputsValid = event.target.checkValidity(); //listens if any input is invalid. (if any are invalid return false)
  if (!allInputsValid) {
    event.preventDefault();
  }
});

inputs.forEach((input)=>{
    input.setAttribute("aria-invalid", false);  //screen reader now thinks all form elements are valid (at the beginning).
    input.addEventListener("invalid", handleInvalidInput);
    input.addEventListener("input", clearValidity);
})

const messages = {
  username: {
    missing: "Please enter a username"
  },
  password: {
    missing: "Please enter a password",
    tooShort: "Please enter at least 8 characteres",
    pattern: "Please enter at least one capital letter, one lower-case letter and one number"
    }
}

function handleInvalidInput(event){
    //console.log(event.target.validity);
  const input = event.target;
  input.setAttribute("aria-invalid", true); //screen-reader knows this input is invalid.
  const validity = input.validity; //{valueMissing: true, typeMismatch: false, ....}
  const inputMessages = messages[input.id]; //gives back object of all messages related to username or password
  let errorMessage = "";
  console.log(validity);
  if(validity.valueMissing) {
    errorMessage = inputMessages.missing;
  } else if (validity.tooShort){
    errorMessage = inputMessages.tooShort;
  } 
//   else if (validity.patternMismatch) {
//     errorMessage = inputMessages.pattern;
//   }
// Causing wierd errors.....Review later! 

  const errorContainer = input.nextElementSibling;
  errorContainer.textContent = errorMessage; //adds errorMessage to the div element, sibling of input
}

function clearValidity(event){
    const input = event.target;
    input.setAttribute("aria-invalid", false);
    input.nextElementSibling.textContent = ""; 
}
