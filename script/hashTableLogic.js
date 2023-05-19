let valoresTable =  myTab.shadowRoot.getElementById('valoresTableContentHead');
let consoleContent = myTab.shadowRoot.getElementById('consoleText');

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
let valueHashGet = myTab.shadowRoot.getElementById('valueHashGet');
valueHashGet.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();

        if(event.target.value != null && hashTable.size > 0){
            getElement(event.target.value);
        }
    }
});

function getElement(value){
    consoleContent.innerText += `
        *Gotten value = ${hashTable.get(value)}
    `;
}

//has

//delete

//clear

//size

//keys

//values

//entries
let valueHashEntries = myTab.shadowRoot.getElementById('valueHashEntries');
valueHashEntries.addEventListener('click', () => {
    if(hashTable.size > 0){
        entriesPrint();
    }
});

function entriesPrint(){
    for(let [clave, valor] of hashTable){
        consoleContent.innerText += `
            Entries:
            *Key = ${clave}
            *Value = ${valor}

        `;
    }
};

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