var desc = `Sortowanie przez scalanie (ang. merge sort) to rekurencyjny algorytm sortowania danych, stosujący metodę dziel i zwyciężaj. Złożoność czasowa jest równa O(n*log(n)), natomiast pamięciowa O(n).

Wyróżnić można trzy podstawowe kroki: podział zestawu danych na dwie równe części, zastosowanie sortowania przez scalanie dla każdej z nich oddzielnie, chyba że pozostał już tylko jeden element, połączenie posortowanych podciągów w jeden posortowany ciąg.`


var code = {
    "cpp": `
void Merge(int array[], int const left, int const mid, int const right)
{
    auto const subArrayOne = mid - left + 1;
    auto const subArrayTwo = right - mid;
 
    auto *leftArray = new int[subArrayOne],
         *rightArray = new int[subArrayTwo];
 
    for (auto i = 0; i < subArrayOne; i++)
        leftArray[i] = array[left + i];
    for (auto j = 0; j < subArrayTwo; j++)
        rightArray[j] = array[mid + 1 + j];
 
    auto indexOfSubArrayOne = 0, 
        indexOfSubArrayTwo = 0;
    int indexOfMergedArray = left;
 
    while (indexOfSubArrayOne < subArrayOne
           && indexOfSubArrayTwo < subArrayTwo) {
        if (leftArray[indexOfSubArrayOne]
            <= rightArray[indexOfSubArrayTwo]) {
            array[indexOfMergedArray]
                = leftArray[indexOfSubArrayOne];
            indexOfSubArrayOne++;
        }
        else {
            array[indexOfMergedArray]
                = rightArray[indexOfSubArrayTwo];
            indexOfSubArrayTwo++;
        }
        indexOfMergedArray++;
    }
    while (indexOfSubArrayOne < subArrayOne) {
        array[indexOfMergedArray]
            = leftArray[indexOfSubArrayOne];
        indexOfSubArrayOne++;
        indexOfMergedArray++;
    }
    while (indexOfSubArrayTwo < subArrayTwo) {
        array[indexOfMergedArray]
            = rightArray[indexOfSubArrayTwo];
        indexOfSubArrayTwo++;
        indexOfMergedArray++;
    }
    delete[] leftArray;
    delete[] rightArray;
}
 
void MergeSort(int array[], int const begin, int const end) {
    if (begin >= end)
        return;
 
    auto mid = begin + (end - begin) / 2;
    MergeSort(array, begin, mid);
    MergeSort(array, mid + 1, end);
    Merge(array, begin, mid, end);
}`, 
    
    "python" : `
def MergeSort(array):
    if len(array) > 1:
        mid = len(array)//2
        L = array[:mid]
        R = array[mid:]
        MergeSort(L)
        MergeSort(R)
        i = j = k = 0
 
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                array[k] = L[i]
                i += 1
            else:
                array[k] = R[j]
                j += 1
            k += 1
 
        while i < len(L):
            array[k] = L[i]
            i += 1
            k += 1
 
        while j < len(R):
            array[k] = R[j]
            j += 1
            k += 1`,
    
    "javascript" : `
function Merge(array, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;
    var L = new Array(n1);
    var R = new Array(n2);
    
    for (var i = 0; i < n1; i++)
        L[i] = array[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = array[m + 1 + j];
    
    var i = 0;
    var j = 0;
    var k = l;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        }
        else {
            array[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        array[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        array[k] = R[j];
        j++;
        k++;
    }
}
    
function MergeSort(array,l, r) {
    if(l>=r){
        return;
    }
    var m = l + parseInt((r-l)/2);
    MergeSort(array,l,m);
    MergeSort(array,m+1,r);
    Merge(array,l,m,r);
}`
}

export {
    desc,
    code,
};