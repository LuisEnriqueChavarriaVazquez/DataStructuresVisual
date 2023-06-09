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
let valueHashHas = myTab.shadowRoot.getElementById('valueHashHas');
valueHashHas.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();

        if(event.target.value != null && hashTable.size > 0){
            hasElement(event.target.value);
        }
    }
});

function hasElement(value){
    consoleContent.innerText += `
        *Value exist = ${hashTable.has(value)}
    `;
}

//delete
let valueHashDelete = myTab.shadowRoot.getElementById('valueHashDelete');
valueHashDelete.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault();

        if(event.target.value != null && hashTable.size > 0){
            deleteElement(event.target.value);
            printTable();
        }
    }
});

function deleteElement(value){
    if(hashTable.has(value)){
        hashTable.delete(value);
        consoleContent.innerText += `
            ---Value deleted succesfully
            *New size = ${hashTable.size} 
        `;
    }else{
        consoleContent.innerText += `
            ---Value deleted failed
            The key does'nt exist
        `;
    }
    
}

//clear
let valueHashClear = myTab.shadowRoot.getElementById('valueHashClear');
valueHashClear.addEventListener('click', () => {
    if(hashTable.size > 0){
        clearHash();
        printTable();
    }else if(hashTable.size == 0){
        consoleContent.innerText += `
        Nothing to clear
        `;
    }
});

function clearHash(){
    hashTable.clear();
    consoleContent.innerText += `
        *Cleared succesfully :)
        Current size = ${hashTable.size}
    `;
}

//size
let valueHashSize = myTab.shadowRoot.getElementById('valueHashSize');
valueHashSize.addEventListener('click', () => {
    sizePrint();
});

function sizePrint(){
    consoleContent.innerText += `
        Current size = ${hashTable.size}
    `;
}

//keys
let valueHashKeys = myTab.shadowRoot.getElementById('valueHashKeys');
valueHashKeys.addEventListener('click', () => {
    if(hashTable.size > 0){
        keysPrint();
    }
});

function keysPrint(){
    for(let key of hashTable.keys()){
        consoleContent.innerText += `
            Keys:
            *Key = ${key}
        `;
    }
}

//values
let valueHashValues = myTab.shadowRoot.getElementById('valueHashValues');
valueHashValues.addEventListener('click', () => {
    if(hashTable.size > 0){
        valuesPrint();
    }
});

function valuesPrint(){
    for(let valor of hashTable.values()){
        consoleContent.innerText += `
            Values:
            *Value = ${valor}
        `;
    }
}

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