//Accedemos a los divs del menu tab
const myTab = document.querySelector("my-tab");
let containerView = myTab.shadowRoot.getElementById('containerView');
let emptyContainer = myTab.shadowRoot.getElementById('empty');

//Push
let valuePushInput = myTab.shadowRoot.getElementById('valuePush');
valuePushInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      emptyContainer.setAttribute("style", "display: none;");
      if(event.target.value != null){
          pushElement(event.target.value);
      }
    }
});

function pushElement(valuePush){
    containerView.innerHTML += `<div>${valuePush}</div>`;
}

//Pop
let valuePopInput = myTab.shadowRoot.getElementById('valuePop');
valuePopInput.addEventListener('click', () => {
    let hijosArray = containerView.children;
    hijosArray = [...hijosArray];
    hijosArray.pop();

    let sumaElementos = [];
    hijosArray.forEach((e) => {
        sumaElementos.push(e.outerHTML);
    });

    let sumaFinal;
    if(sumaElementos.length > 0){
        sumaFinal = sumaElementos.reduce((prev, next) => {
            return prev + next;
        })
        containerView.innerHTML = sumaFinal;
    }else if(sumaElementos.length == 0){
        containerView.innerHTML = `<div id="empty" style="border-radius: 10px; display: flex;">Empty</div>`;
    }
    
})