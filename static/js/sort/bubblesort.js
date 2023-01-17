var desc = `Sortowanie bąbelkowe (ang. bubble sort) prosta metoda sortowania o złożoności czasowej O(n^2) i pamięciowej O(1). 

Polega na porównywaniu dwóch kolejnych elementów i zamianie ich kolejności, jeżeli zaburza ona porządek, w jakim się sortuje tablicę. Sortowanie kończy się, gdy podczas kolejnego przejścia nie dokonano żadnej zmiany.`

var code = {
    'cpp': `
std::vector<int> BubbleSort(std::vector<int> array) {
    bool change = true;

    while (change == true) {
        change = false;

        for (int i = 1; i < array.size(); i++) {
            if (array[i] < array[i - 1]) {
                std::swap(array[i - 1], array[i]);
                change = true;
            }
        }
    }
}`, 
    
'python' : `
def BubbleSort(array):
    for i in range(len(n)):
        for j in range(0, n - i- 1):
            if array[j] > array[j + 1]:
                array[j], array[j + 1] = array[j + 1], array[j]
`,
    
'javascript' : `
function BubbleSort(array) {
    for(let i = 0; i < array.lenght; i++) {
        for(let j = 0; j < (array.lenght - i - 1); j++) {
            if(array[j] > array[j + 1]) {
                var tmp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = tmp
            }
        }
    }
}`
}

export {
    desc,
    code,
};