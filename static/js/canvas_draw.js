// Get the canvas element
const canvas = document.getElementById('visual');
const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

// Delay
let delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Set up variables for the visualization
let values = [];
let numberOfElements = 125;

let stopSorting = false;

function stopSort() {
    stopSorting = true;
    const sortitButton = document.getElementById("sortit-button");
    sortitButton.innerText = "SortIT";
}

function checkIfSorted() {
  for (let i = 0; i < values.length - 1; i++) {
      if (values[i] > values[i+1]) {
          return;
      }
  }
  
  stopSort();
}

document.getElementById("numberOfElements").addEventListener("change", changeNumberElements);

export function changeNumberElements() {
    stopSort();
    values.length = 0; 
    numberOfElements = document.getElementById('numberOfElements').value;
    loadValues();
}

window.addEventListener("load", loadValues);

document.getElementById("algo-select").addEventListener("change", loadValues);


// Function to load values for the visualization
function loadValues() {
    stopSort();
    values.length = 0; 
    for (let i = 0; i < numberOfElements; i++) {
        values.push(Math.floor(Math.random() * 390));
    }
    draw();
}

document.getElementById("randomize-button").addEventListener("click", randomize);


// Function to randomize the values
function randomize() {
    stopSort();
    for (let i = 0; i < numberOfElements; i++) {
        values[i] = Math.floor(Math.random() * 390);
    }
    draw();
}

const sortitClick = document.getElementById("sortit-button");
sortitClick.addEventListener("click", sortIT);



// Function to perform chosen sorting visualization

async function sortIT() {
  const sortitButton = document.getElementById("sortit-button");
    if(sortitButton.innerText === "STOP") {
      stopSort();
      return;
    }
    sortitButton.innerText = "STOP";
    stopSorting = false;
    
    let algo = document.getElementById("algo-select").value;
    
    switch (algo) {
        case 'bubble':
            bubbleSort(values.length);
            break;
        case 'insertion':
            insertionSort(values.length);
            break;
        case 'merge':
            mergeSort(0, values.length - 1);
            break;
        case 'quick':
            quickSort(0, values.length - 1);    
            break;
        case 'selection':
            selectionSort(values.length);
            break;
        default:
            console.log("No such algorithm");
    }
}

// bubblesort

async function bubbleSort(n) {
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if(stopSorting) return;
      draw();
      
      if (values[j] > values[j + 1]) {
        await swap(j, j + 1);
        draw();
      }
    }
  }
  checkIfSorted();
}

// insertionsort

async function insertionSort(n) {
  for (let i = 1; i < n; i++) {
    let key = values[i];
    let j = i - 1;
    if(stopSorting) return;
  
    while (j >= 0 && values[j] > key) {
      draw();
      values[j + 1] = values[j];
      j = j - 1;
      draw();
    }
  
    values[j + 1] = key;
    draw();
    await delay(25);
  }
  checkIfSorted();
}

// mergesort

async function mergeSort(l, r) {
  if(l >= r){
    if(stopSorting) return;
    return;
  }
  if(stopSorting) return;
  var m = l + parseInt((r - l) / 2);
  await Promise.all(
    [mergeSort(l, m),
    mergeSort(m + 1, r) ]);
  await merge(l, m, r);
}

async function merge(l, m, r) {
  var n1 = m - l + 1;
  var n2 = r - m;
  var L = new Array(n1);
  var R = new Array(n2);
  
  for (var i = 0; i < n1; i++)
    L[i] = values[l + i];
  for (var j = 0; j < n2; j++)
    R[j] = values[m + 1 + j];
  
  var i = 0;
  var j = 0;
  var k = l;
  
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      if(stopSorting) return;
      draw();
      await delay(15);
      values[k] = L[i];
      draw();
      i++;
    }
    else {
      if(stopSorting) return;
      draw();
      await delay(15);
      values[k] = R[j];
      draw();
      j++;
    }
    k++;
  }
  
  while (i < n1) {
    if(stopSorting) return;
    draw();
    await delay(15);
    values[k] = L[i];
    draw();
    i++;
    k++;
  }
  
  while (j < n2) {
    if(stopSorting) return;
    draw();
    await delay(15);
    values[k] = R[j];
    draw();
    j++;
    k++;
  }
  
  if (l === 0 && r === values.length - 1) {
    checkIfSorted();
  }
}

// quicksort

async function quickSort(start, end) {
  if (start > end) {
    checkIfSorted();  
    return;
  }
  if(stopSorting) return;
  let index = await partition(start, end);
  draw();
  await Promise.all(
    [quickSort(start, index - 1), 
      quickSort(index + 1, end)
    ]);
    
}

// selectionsort

async function selectionSort(n) {
  var min_idx;
  
  for (let i = 0; i < n-1; i++) {
      min_idx = i;
      for (let j = i + 1; j < n; j++) {
        if(stopSorting) return;
        if (values[j] < values[min_idx])
          min_idx = j;
      }
      draw();
      await swap(min_idx, i);
      draw();
  }
  checkIfSorted();  
}
  
// subfunctions (partition, swap)

async function partition(start, end) {
  let pivotIndex = start;
  let pivotElement = values[end];
  for (let i = start; i < end; i++) {
    if(stopSorting) return;
    
    if (values[i] < pivotElement) {
      draw();
      await swap(i, pivotIndex);
      draw();
      pivotIndex++;
    }
  }
  await swap(end, pivotIndex);
  return pivotIndex;
}
  
async function swap(i, j) {
    await delay(15);
    if(stopSorting) return;
    let temp = values[i];
    values[i] = values[j];
    values[j] = temp;
}
  
// Draw

function draw() {
  ctx.clearRect(0, 0, width, height);
  
  for (let i = width / (values.length); i < width; i += width / (values.length)) {
      ctx.beginPath();

      ctx.strokeStyle =  "blue";
      ctx.lineWidth = 4;

      ctx.moveTo(i, height);
      ctx.lineTo(i, height - (values[Math.floor(i / (width / (values.length)))]))
      ctx.stroke();
  }
  
  if(stopSorting) return;
  
}