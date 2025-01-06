// START Configuration Data and Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getDatabase,
        ref,
        push,
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js"
        
const firebaseConfig = {
    databaseURL: "https://convert-app-f2250-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "conversion")

const feet = 3.281
const gallon = 0.264
const kilogram = 2.204

// END Configuration Data and Firebase

// START Frontend data update
let inputValue = document.getElementById("input-number")
let convertStart = document.getElementById("convert-btn")
let clearAll = document.getElementById("clear-btn")

let valueToConvertOneEl = document.getElementById("valueToConvertOne-el")
let valueToConvertTwoEl = document.getElementById("valueToConvertTwo-el")
let valueToConvertThreeEl = document.getElementById("valueToConvertThree-el")

let valueToConvertedOneEl = document.getElementById("valueToConvertedOne-el")
let valueToConvertedTwoEl = document.getElementById("valueToConvertedTwo-el")
let valueToConvertedThreeEl = document.getElementById("valueToConvertedThree-el")

let valueConvertedIndexOne = document.getElementById("valueConvertedIndexOne-el")
let valueConvertedIndexTwo = document.getElementById("valueConvertedIndexTwo-el")
let valueConvertedIndexThree = document.getElementById("valueConvertedIndexThree-el")

let valueIndexOne = document.getElementById("valueIndexOne-el")
let valueIndexTwo = document.getElementById("valueIndexTwo-el")
let valueIndexThree = document.getElementById("valueIndexThree-el")

let pastConversionLocal = document.getElementById("pastConversionLocal-el")
let pastConversionFirebase = document.getElementById("pastConversionFirebase-el")

// END Frontend data update

// START Functions & Workflow

onValue(referenceInDB, function (snapshot){
    const snapShotDoesExist = snapshot.exists()
    if (snapShotDoesExist){
        const snapshotValues = snapshot.val()
        let oldConversionFirebase = Object.values(snapshotValues)
        let mainValue = inputValue.value;
        pastConversionFirebase.innerHTML += `${mainValue} -  ` //Firebase
    }

})
convertStart.addEventListener("click", function() {
    let mainValue = inputValue.value;
    localStorage.setItem("pastConversion",inputValue.value) //Local Storage
    push(referenceInDB, Number(mainValue)) // Push to firebase

    valueToConvertOneEl.innerText = mainValue; // meters vanilla index
    valueToConvertTwoEl.innerText = mainValue; // liters vanilla index
    valueToConvertThreeEl.innerText = mainValue; // kilos vanilla index

    valueToConvertedOneEl.innerText = (mainValue * feet).toFixed(1); // convert to feet
    valueToConvertedTwoEl.innerText = (mainValue * gallon).toFixed(1); // convert to gallons
    valueToConvertedThreeEl.innerText = (mainValue * kilogram).toFixed(1); // convert to pounds

    valueConvertedIndexOne.innerText = (mainValue * feet).toFixed(1); // feet to meters
    valueConvertedIndexTwo.innerText = (mainValue * gallon).toFixed(1); // gallon to liters
    valueConvertedIndexThree.innerText = (mainValue * kilogram).toFixed(1); // pounds to kilos

    valueIndexOne.innerText = mainValue; // meters vanilla final
    valueIndexTwo.innerText = mainValue; // liters vanilla final
    valueIndexThree.innerText = mainValue; // kilos vanilla final

    pastConversionLocal.innerHTML += localStorage.getItem("pastConversion","value")+" " + "-"+" " //Local Storage
})
clearAll.addEventListener("click", function(){
    let mainValue = ""
    let oldConversionFirebase = ""

    valueToConvertOneEl.innerText = mainValue; // meters vanilla index
    valueToConvertTwoEl.innerText = mainValue; // liters vanilla index
    valueToConvertThreeEl.innerText = mainValue; // kilos vanilla index

    valueToConvertedOneEl.innerText = (mainValue * feet).toFixed(1); // convert to feet
    valueToConvertedTwoEl.innerText = (mainValue * gallon).toFixed(1); // convert to gallons
    valueToConvertedThreeEl.innerText = (mainValue * kilogram).toFixed(1); // convert to pounds

    valueConvertedIndexOne.innerText = (mainValue * feet).toFixed(1); // feet to meters
    valueConvertedIndexTwo.innerText = (mainValue * gallon).toFixed(1); // gallon to liters
    valueConvertedIndexThree.innerText = (mainValue * kilogram).toFixed(1); // pounds to kilos

    valueIndexOne.innerText = mainValue; // meters vanilla final
    valueIndexTwo.innerText = mainValue; // liters vanilla final
    valueIndexThree.innerText = mainValue; // kilos vanilla final

    localStorage.clear()
    remove(referenceInDB)

    pastConversionLocal.innerHTML = mainValue
    pastConversionFirebase.innerHTML = oldConversionFirebase //Firebase
})
// END Functions & Workflow