// function InsertionSort(array) { 
//     let i, key, j; 
    
//     for (i = 1; i < array.length; i++) { 
//         key = array[i]; 
//         j = i - 1; 

//         while (j >= 0 && array[j] > key) { 
//             array[j + 1] = array[j]; 
//             j--; 
//         } 
//         array[j + 1] = key; 
//     } 
// }

var desc = `Sortowanie przez wstawianie (ang. Insert Sort, Insertion Sort) to jeden z najprostszych algorytmów sortowania, kolejne elementy wejściowe są ustawiane na odpowiednie miejsca docelowe. Jest efektywny dla niewielkiej liczby elementów, jego złożoność czasowa wynosi O(n^2), a pamięciowa O(1). Pomimo tego, że jest znacznie mniej wydajny od algorytmów takich jak quicksort czy heapsort, posiada pewne zalety, a mianowicie liczba wykonanych porównań jest zależna od liczby inwersji w permutacji, dlatego algorytm jest wydajny dla danych wstępnie posortowanych, jest wydajny dla zbiorów o niewielkiej liczebności, jest stabilny.`

var code = {
    "cpp": `
std::vector<int> InsertionSort(std::vector<int> array)
{
    for (int i = 1; i < array.size(); i++) {
        for (int j = 0; j < i; j++) {
            if (array[i] < array[j]) {
                std::swap(array[i], array[j]);
            }
        }
    }
}`, 
    
    "python" : `
def InsertionSort(array):
    for i in range(1, len(array)):
        key = array[i]
        j = i - 1
        while j >= 0 and key < array[j] :
                array[j + 1] = array[j]
                j -= 1
        array[j + 1] = key`,
    
    "javascript" : `
function InsertionSort(array) { 
    let i, key, j; 
    for (i = 1; i < array.length; i++) { 
        key = array[i]; 
        j = i - 1; 

        while (j >= 0 && array[j] > key) { 
            array[j + 1] = array[j]; 
            j--; 
        } 
        array[j + 1] = key; 
    } 
}`
}

export {
    desc,
    code,
};