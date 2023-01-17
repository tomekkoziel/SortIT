var desc = `Sortowanie przez wybieranie (ang. Selection Sort) to jedna z prostszych metod sortowania o złożoności czasowej O(n^2). Polega na wyszukaniu elementu mającego się znaleźć na żądanej pozycji i zamianie miejscami z tym, który jest tam obecnie. Operacja jest wykonywana dla wszystkich indeksów sortowanej tablicy.

Algorytm przedstawia się następująco, najpierw następuje wyszukanie minimalnej wartości z tablicy spośród elementów od i do końca tablicy, a nastepnie zamiana wartości minimalnej, z elementem na pozycji i.`


var code = {
    "cpp" : `
std::vector<int> SelectionSort(std::vector<int> array) {
    int min, min_indx;

    for (int i = 0; i < array.size(); i++) {
        min = array[i];

        for (int j = i + 1; j < array.size(); j++) {
            if (min > array[j]) {
                min = array[j];
                min_indx = j;
            }
        }

        if (array[i] != min) {
            std::swap(array[i], array[min_indx]);
        }
    }
}`,
    
    "python" : `
def SelectionSort(array):
    for i in range(len(array)):
        min_idx = i
        for j in range(i+1, len(array)):
            if array[min_idx] > array[j]:
                min_idx = j
                
        array[i], array[min_idx] = array[min_idx], array[i]`,
    
    "javascript" : `
function SelectionSort(array) {
    var i, j, min_idx;
    
    for (i = 0; i < array.lenght-1; i++) {
        min_idx = i;
        for (j = i + 1; j < array.lenght; j++)
        if (array[j] < arr[min_idx])
            min_idx = j;

        var temp = array[min_idx];
        array[min_idx] = array[i];
        array[i] = temp;
    }
}`
}

export {
    desc,
    code,
};