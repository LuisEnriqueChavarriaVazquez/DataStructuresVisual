let valoresTable =  myTab.shadowRoot.getElementById('valoresTableContentHead');

//Definimos nuestro hash
let hashTable = new Map();

//set
let valueHashSet = myTab.shadowRoot.getElementById('valueHashSet');
let keyHashSet = myTab.shadowRoot.getElementById('keyHashSet');
let setHashButton = myTab.shadowRoot.getElementById('setHashButton');
setHashButton.addEventListener('click', function(event) {
    event.preventDefault();

    if(keyHashSet.value != null && valueHashSet.value != null){
        setElement(keyHashSet.value,valueHashSet.value);
        printTable();
    }
});

function setElement(key,value){
    hashTable.set(key,value);
}


//get

//has

//delete

//clear

//size

//keys

//values

//entries

//Impresión de la tabla
function printTable(){
    valoresTable.innerHTML = "";
    for( let [clave, valor] of hashTable){
        valoresTable.innerHTML += `
            <div class="clave">${clave}</div>
            <div class="valor">${valor}</div>
        `
    }
}