import * as bubbleSort from './sort/bubblesort.js';
import * as insertionSort from './sort/insertionsort.js';
import * as mergeSort from './sort/mergesort.js';
import * as quickSort from './sort/quicksort.js';
import * as selectionSort from './sort/selectionsort.js';

const algoSelect = document.getElementById("algo-select");
algoSelect.addEventListener("change", onChange);

function onChange() {
    const newTab = document.getElementById("algo-select");
    const openedTab1 = document.getElementById("intro");
    const openedTab2 = document.getElementById("profile");
    const algo = document.getElementById("algorithm");
    
    if (newTab && openedTab1 && newTab !== openedTab1) {
        openedTab1.hidden = true;
        algo.hidden = false;
    }
    
    if( newTab && openedTab2 && newTab !== openedTab2) {
        openedTab2.hidden = true;
        algo.hidden = false;
    }
    
    document.getElementById("algo-name").innerHTML = newTab.options[newTab.selectedIndex].text;
    
    var name = newTab.options[newTab.selectedIndex].value;
    
    showDescription(name); 
    showCode('default');
}

function showDescription(algo) {
    let desc;
    switch (algo) {
        case 'bubble':
            desc = bubbleSort.desc;
            break;
        case 'insertion':
            desc = insertionSort.desc;
            break;
        case 'merge':
            desc = mergeSort.desc;
            break;
        case 'quick':
            desc = quickSort.desc;
            break;
        case 'selection':
            desc = selectionSort.desc;
            break;
        default:
            desc = 'No description for this algorithm.'
    }
    
    document.getElementById("algo-desc").textContent = desc
}

const buttons = document.querySelectorAll('.buttons-container-languages button');
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        showCode(this.id);
    });
});

function showCode(lang) {
    let algo = document.getElementById("algo-select").value;
    let code;
    let selectedAlgo;
    switch (algo) {
        case 'bubble':
            selectedAlgo = bubbleSort.code;
            break;
        case 'insertion':
            selectedAlgo = insertionSort.code;
            break;
        case 'merge':
            selectedAlgo = mergeSort.code;
            break;
        case 'quick':
            selectedAlgo = quickSort.code;
            break;
        case 'selection':
            selectedAlgo = selectionSort.code;
            break;
        default:
          code = 'No such algorithm.'
    }
    
    switch(lang) {
        case 'javascript':
            code = selectedAlgo['javascript'];
            break;
        case 'python':
            code = selectedAlgo['python'];
            break;
        case 'cpp':
            code = selectedAlgo['cpp'];
            break;
        default:
            code = `
WYBIERZ JĘZYK PROGRAMOWANIA`
    }
    
    
    document.getElementById("algo-code").textContent = code
}