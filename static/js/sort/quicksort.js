var desc = `Sortowanie szybkie (ang. QuickSort) to jeden z popularnych algorytmów sortowania działających na zasadzie „dziel i zwyciężaj”.

Algorytm sortowania szybkiego jest wydajny: jego średnia złożoność obliczeniowa jest rzędu O(n*log(n)). Ze względu na szybkość i prostotę implementacji jest powszechnie używany. Jego implementacje znajdują się w bibliotekach standardowych wielu środowisk programowania. Z tablicy wybiera się element rozdzielający, po czym tablica jest dzielona na dwa fragmenty: do początkowego przenoszone są wszystkie elementy nie większe od rozdzielającego, do końcowego wszystkie większe. Potem sortuje się osobno początkową i końcową część tablicy. Rekursja kończy się, gdy kolejny fragment uzyskany z podziału zawiera pojedynczy element, jako że jednoelementowa tablica nie wymaga sortowania.`


var code = {
    "cpp": `
int partition(int array[], int low, int high) { 
    // low = 0, high = sizeof(arr) / sizeof(arr[0])
    int pivot = array[high];
    int i = (low - 1);
  
    for (int j = low; j <= high - 1; j++) {
        if (array[j] < pivot) {
            i++;
            std::swap(&array[i], &array[j]);
        }
    }
    swap(&array[i + 1], &array[high]);
    return (i + 1);
}
  
void QuickSort(int array[], int low, int high) {
    if (low < high) {
        int pi = partition(array, low, high);
        QuickSort(array, low, pi - 1);
        QuickSort(array, pi + 1, high);
    }
}`, 
    
    "python" : `
def partition(array, low, high):
    pivot = array[high]
    i = low - 1
  
    for j in range(low, high):
        if array[j] <= pivot:
            i = i + 1
            (array[i], array[j]) = (array[j], array[i])
  
    (array[i + 1], array[high]) = (array[high], array[i + 1])
  
    return i + 1
  
def QuickSort(array, low, high): 
    # low = 0, high = len(array) - 1
    if low < high:
        pi = partition(array, low, high)
        QuickSort(array, low, pi - 1)
        QuickSort(array, pi + 1, high)`,
    
    "javascript" : `
function swap(array,xp, yp) {
    var temp = array[xp];
    array[xp] = array[yp];
    array[yp] = temp;
}

function partition(array, low, high) {
    let pivot = array[high];
    let i = (low - 1);
  
    for (let j = low; j <= high - 1; j++) {
        if (array[j] < pivot) {
            i++;
            swap(array, i, j);
        }
    }
    swap(array, i + 1, high);
    return (i + 1);
}
  
function QuickSort(array, low, high) { 
    // low = 0, high = array.length - 1
    if (low < high) {
        let pi = partition(array, low, high);
        QuickSort(array, low, pi - 1);
        QuickSort(array, pi + 1, high);
    }
}
    `
}

export {
    desc,
    code,
};