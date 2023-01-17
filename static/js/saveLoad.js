import { changeNumberElements } from './canvas_draw.js';

const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", function(){
    var newValue = parseInt(document.getElementById("numberOfElements").value);
    document.getElementById("numberofelements").value = newValue;
    
    var newName = document.getElementById("algo-name").innerText;
    document.getElementById("algorithm-name").value = newName;
});

const loadButton = document.getElementById("load-button");
loadButton.addEventListener("click", () => {
    fetch("/load")
        .then((response) => response.json())
        .then((data) => {
            const numberOfElements = document.getElementById("numberOfElements");
            numberOfElements.value = data.elements;
            const inputElements = document.getElementById("inputElements");
            inputElements.value = data.elements;
            changeNumberElements();
        })
        .catch((error) => console.error("Error:", error));
});