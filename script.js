let bill = document.getElementById("bill");
let nPeople = document.getElementById("n-people");
let warningBill = document.getElementById("warning-bill")
let warningOne = document.getElementById("warning-one");
let warningTwo = document.getElementById("warning-two");
let tipInput = document.getElementById("tip-input");
let tipWarning = document.getElementById("tip-warning");
let totalPerson = document.getElementById("total-per-person");
let tipPerson = document.getElementById("tip-per-person");

let oldElement = ""
let element = "";
let billValue = 0;
let nPeopleValue = 0;
let tipValue = 0;
let tipPercent = 0;

bill.addEventListener("input", () => {
  if(!isNaN(bill.value) && +bill.value > 0) {
    // bill.value = parseFloat(bill.value).toFixed(2);
    billValue = +bill.value;
    warningBill.style.visibility = "hidden";
  } else {
    warningBill.style.visibility = "visible";
    bill.value = "";
  }
})

document.addEventListener("click", (e) => {
  element = e.target;
  if(element.tagName == "BUTTON" && element.className == "tip__amount") {
    if(oldElement.id != element.id & oldElement != "") {
      document.getElementById(oldElement.id).style.background = "var(--clr-neutral-600)";
    }
    document.getElementById(element.id).style.backgroundColor = "var(--clr-primary-100)";
    oldElement = element;
    tipInput.value = "";
    tipWarning.style.visibility = "hidden";
    tipPercent = parseInt(element.innerText);
    tipValue = 0;
  }
})

tipInput.addEventListener("input", () => {
  if(tipInput.value != "") {
    if(!isNaN(tipInput.value) && +tipInput.value >= 0) {
      tipInput.value = parseFloat(tipInput.value).toFixed(0);
      tipValue = +tipInput.value;
      tipPercent = 0;
      if(oldElement != "") {
        document.getElementById(oldElement.id).style.background = "var(--clr-neutral-600)";
      }
      tipWarning.style.visibility = "hidden";
    } else {
      tipWarning.style.visibility = "visible";
      tipInput.value = "";
    }
  }
})

nPeople.addEventListener("input", () => {
  if(!isNaN(nPeople.value) && Number.isInteger(+nPeople.value) && +nPeople.value > 0) {
    nPeopleValue = +nPeople.value;
    warningOne.style.visibility = "hidden";
    warningTwo.style.visibility = "hidden";
  } else {
    if(+nPeople.value == 0) {
      warningOne.style.visibility = "visible";
      warningTwo.style.visibility = "hidden";
      nPeople.value = "";
    } else {
      warningOne.style.visibility = "hidden";
      warningTwo.style.visibility = "visible";
      nPeople.value = "";
    }
  }
})

document.addEventListener("input", () => {
  totalPerPerson();
  tipPerPerson();
});

document.addEventListener("click", () => {
  totalPerPerson();
  tipPerPerson();
});

function totalPerPerson() {
  if(billValue != 0 && nPeopleValue != 0) {
    totalPerson.innerText = "$" + ((billValue + (billValue * (tipPercent / 100)) + tipValue) / nPeopleValue).toFixed(2);
  }
}

function tipPerPerson() {
  if(nPeopleValue != 0) {
    tipPerson.innerText = "$" + ((billValue * (tipPercent / 100) + tipValue) / nPeopleValue).toFixed(2);
  }
}

function reset() {
  let tipReset = document.querySelectorAll(".tip__amount");

  billValue = 0;
  nPeopleValue = 0;
  tipValue = 0;
  bill.value = "";
  nPeople.value = "";
  tipInput.value = "";
  tipPerson.innerText = "$0.00";
  totalPerson.innerText = "$0.00";
  warningBill.style.visibility = "hidden";
  warningOne.style.visibility = "hidden";
  warningTwo.style.visibility = "hidden";
  tipWarning.style.visibility = "hidden";
  
  for (let i = 0; i < tipReset.length - 1; i++) {
    tipReset[i].style.backgroundColor = "var(--clr-neutral-600)";
  }
}

