//Accedemos a los divs del menu tab
const myTab = document.querySelector("my-tab");
let containerView = myTab.shadowRoot.getElementById('containerView');

//Push
let valuePushInput = myTab.shadowRoot.getElementById('valuePush');
valuePushInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        if(event.target.value != null){
            pushElement(event.target.value);
        }
    }
});

function pushElement(valuePush){
    containerView.innerHTML += `<div>${valuePush}</div>`;
}

//Pop
let valuePopButton = myTab.shadowRoot.getElementById('valuePop');
valuePopButton.addEventListener('click', () => {
    let hijosArray = containerView.children;
    hijosArray = [...hijosArray];
    hijosArray.pop();

    let sumaElementos = [];
    hijosArray.forEach((e) => {
        sumaElementos.push(e.outerHTML);
    });

    let sumaFinal;
    if(sumaElementos.length >= 0){
        sumaFinal = sumaElementos.reduce((prev, next) => {
            return prev + next;
        })
        containerView.innerHTML = sumaFinal;
    }
    
});

//Unshift
let valueUnshiftInput = myTab.shadowRoot.getElementById('valueUnshift');
valueUnshiftInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        if(event.target.value != null){
            let hijosArray = containerView.children;
            shiftElement(event.target.value, hijosArray);
        }
    }
});

function shiftElement(valuePush, hijosArray){
    hijosArray = [...hijosArray];

    let sumaElementos = [];
    hijosArray.forEach((e) => {
        sumaElementos.push(e.outerHTML);
    });
    sumaElementos.unshift("<div>" + valuePush + "</div>");

    let sumaFinal;
    if(sumaElementos.length > 0){
        sumaFinal = sumaElementos.reduce((prev, next) => {
            return prev + next;
        })
        containerView.innerHTML = sumaFinal;
    }
}

//shift
let valueShiftButton = myTab.shadowRoot.getElementById('valueShift');
valueShiftButton.addEventListener('click', () => {
    let hijosArray = containerView.children;
    hijosArray = [...hijosArray];
    hijosArray.shift();

    let sumaElementos = [];
    hijosArray.forEach((e) => {
        sumaElementos.push(e.outerHTML);
    });

    let sumaFinal;
    if(sumaElementos.length >= 0){
        sumaFinal = sumaElementos.reduce((prev, next) => {
            return prev + next;
        })
        containerView.innerHTML = sumaFinal;
    }
});

//concat
let valueConcatInput = myTab.shadowRoot.getElementById('valueConcat');
valueConcatInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        if(event.target.value != null){
            let hijosArray = containerView.children;
            concatElement(event.target.value, hijosArray);
        }
    }
});

function concatElement(inputValueArray, hijosArray){
    //Obtenemos los elementos del usuarios
    let newArray = inputValueArray.split(',');
    //Modifcamos el array para meterle divs a lo que nos paso el usuario
    let modifiedArray = newArray.map((element) => {
        return "<div>" + element + "</div>"
    });

    //Convertirmos en array los elementos que ya tenemos
    let hijosArrayAntiguos = [...hijosArray];
    let hijosArrayAntiguosOuter = hijosArrayAntiguos.map((element) => {
        return element.outerHTML;
    });

    //Concatenamos los elementos
    let concatenacionFinal = hijosArrayAntiguosOuter.concat(modifiedArray);

    //Juntamos todos los elementos en un string
    let sumaFinal = concatenacionFinal.reduce((prev, next) => {
        return prev + next;
    });

    //Metemos los elementos
    containerView.innerHTML = sumaFinal;
}

//reverse
let valueReverseButton = myTab.shadowRoot.getElementById('valueReverse');
valueReverseButton.addEventListener('click', () => {

    //Obtenemos los elemntos hijos
    let hijosArray = containerView.children;
    hijosArray = [...hijosArray];
    
    //Sumamos el contenido de los arrays
    let sumaElementos = [];
    hijosArray.forEach((e) => {
        sumaElementos.push(e.outerHTML);
    });

    //Invertimos el array
    let arrayInvertido = sumaElementos.reverse();

    //Sumamos el nuevo contenido de los arrays
    let sumaFinal = arrayInvertido.reduce((prev, next) => {
        return prev + next;
    });
    
    //Agregamos el contenido
    containerView.innerHTML = sumaFinal;
    
});

//filter
let valueFilterInput = myTab.shadowRoot.getElementById('valueFilter');
valueFilterInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        if(event.target.value != null){
            let hijosArray = containerView.children;
            filterElement(event.target.value, hijosArray);
        }
    }
});

function filterElement(valueToFilter, hijosArray){

    //Convetimos los valores en array
    let hijosArray_arr = [...hijosArray];
    
    //Regresamos solamente el numero de los divs
    let valoresInternos = hijosArray_arr.map((e) => {
        return e.innerHTML;
    })

    //Filtramos el valor
    let arrayFiltrado = valoresInternos.filter((e) => {
        if(e != valueToFilter){
            return e;
        }
    });

    //Agregamos el div a los elementos
    let arrayConDivs = arrayFiltrado.map((e) => {
        return "<div>" + e + "</div>";
    });

    //Sumamos los elementos en uan cadena de texto
    let sumaFinal = arrayConDivs.reduce((prev, next) => {
        return prev + next;
    })

    //Metemos los elementos
    containerView.innerHTML = sumaFinal;
}