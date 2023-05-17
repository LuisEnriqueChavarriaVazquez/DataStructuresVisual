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