class tabs extends HTMLElement {

    //(1)Esto es el inicio del ciclo de vida y guardamos en memoria el contenido a guardar
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }
    
    //Este observador es para dar de alta los atributos que se espera tenga la etiqueta
    static get observedAttributes(){
        return ['section1','section2','section3','section4','section5','section6','section7'];
    }

    //Verifica que los atributos esten dentro de la etiqueta
    attributeChangedCallback(attr, oldVal, newVal){
        if (oldVal !== newVal) {
            this[attr] = newVal;
        }
    }   

    //(2) Sirve para definir el template que sera clonado
    getTemplate(){
        const template = document.createElement('template');
        template.innerHTML = `
            <!--llamamos a los estilos-->
            ${this.getStyles()}
            <section class="tabs" id="componentTab">
                <div class="activeTab">${this.section1}</div>
                <div>${this.section2}</div>
                <div>${this.section3}</div>
                <div>${this.section4}</div>
                <div>${this.section5}</div>
                <div>${this.section6}</div>
                <div>${this.section7}</div>
            </section>
            <section class="containerContent" id="containerContent">
                ${contenido.Arrays}
            </section>
        `;
        return template;
    }

    //(3) Ayuda a definir los estiloss
    getStyles(){
        return `
            <style>
                :host *{
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                :host .tabs{
                    display: grid;
                    grid-template-columns: repeat(7,1fr);
                    grid-template-rows: auto;
                    align-items: flex-end;
                    justify-content: center;
                    height: 64px;
                    color: #fff;
                    background-color: #041d2c;
                }

                :host .tabs div{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    width: 100%;
                    cursor: pointer;
                }

                :host .tabs .activeTab{
                    border-bottom: solid #fff 3px;
                    font-weight: 700;
                    font-size: 1.1rem;
                    transition: all .1s ease-out;
                }

                :host .containerContent{
                    display: flex;
                    flex-direction: column;
                    min-height: calc(100vh - 64px);
                    max-height: auto;

                    background-color: #0e2e42;
                    color: #fff;

                    padding: 20px;
                }

                /*Contenidos de las operaciones*/

                .titleSection{
                    font-size: 2rem;
                    margin-bottom: 20px;
                }

                .optTitleSection{
                    font-size: 1.5rem;
                    margin: 0 0 10px 0;
                    height: 40px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }

                .containerOpt{
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-template-rows: auto;
                    gap: 20px;

                    width: 100%;
                    height: auto;
                }

                .containerOpt_card{
                    width: 100%;
                    height: auto;
                    padding: 8px 20px 15px 20px;
                    border-radius: 20px;

                    background-color: #fff;
                    color: #0e2e42;
                }

                .containerOpt_card:last-child {
                    grid-column: span 2;
                }

                .valueOptContainer{
                    display: grid;
                    grid-template-columns: 1fr 9fr;
                    grid-template-rows: auto;
                    justify-content: center; align-items: center;
                    width: 100%;
                }

                .valueOptContainerButton{
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-template-rows: auto;
                    width: 100%;
                }

                label{
                    font-size: 1.1rem;
                }

                input[type="text"]{
                    padding: 8px 12px;
                    border-radius: 20px;
                    width: 100%;
                    border: none;
                    background-color: rgb(202, 202, 202);
                    font-size: 1rem;
                }

                .buttonOpt{
                    background-color: #06283D;
                    color: #fff;
                    border-radius: 20px;
                    padding: 10px 20px;
                    border: none;
                    font-size: 1.1rem;
                    width: 100%;
                    transition: all .1s ease-in-out;
                    cursor: pointer;
                }

                .buttonOpt:hover{
                    background-color: #1d5f88;
                }

                /*Container array*/
                .containerView{
                    display: grid;
                    grid-auto-flow: column;
                    grid-template-columns: repeat(auto-fill, 1fr);
                    grid-template-rows: auto;
                    margin-bottom: 20px;
                    align-items: center;
                    height: 100px;
                }

                .containerView div{
                    background-color: #1d5f88;
                    height: 70px;
                    padding: 0 0 8px 0;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font-size: 1.5rem;
                    font-weight: 800;
                    transition: all .4s ease-in-out;
                }
            </style>
        `;
    }

    //(4) Método para renderizar el contenido
    render(){
        //El true es para que clone los elementos anidados tambien
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    }

    //(5) Sirve para renderizar el nodo en el DOM
    connectedCallback(){
        this.render();
    }
}

customElements.define("my-tab", tabs);


//Logica del componente
///////////////////////////////
/*
 * Lo primero es que accedemos al elemento del tab menu
 */
function tabsActivate(){

    //Accedemos a los divs del menu tab
    const myTab = document.querySelector("my-tab");
    const componentTab = myTab.shadowRoot.getElementById("componentTab");
    const divsTab = componentTab.querySelectorAll('div');

    //Accedemos al contenido en cada una de las tabSize: 
    let containerContent = myTab.shadowRoot.getElementById('containerContent');

    //Llamamos a la función para cuando damos click en un tab actualizar el contenido
    componentTab.addEventListener('click', (event) =>{
        clickTabActive(divsTab);
        event.target.classList.add('activeTab');
        actualizarContenido(containerContent, event.target);
    });
}

/*
 * Funcion para hacer el cambio de tab cada que damos click
 */
function clickTabActive(divs){
    divs.forEach(element => {
        element.classList.remove('activeTab');
    });
}

/**
 * Actualizamos el contenido
 */

function actualizarContenido(container, divClicked){
    let nombreTab = divClicked.outerText.replace(' ', '_');
    let contenidoObjt = contenido[nombreTab];
    container.innerHTML = contenidoObjt;

}

//Para que pueda acceder a los elementos una vez que ha cargado la pagina
document.addEventListener("DOMContentLoaded", function() {
    tabsActivate();
});

/**
 * Contenidos de las tabs
 * Aqui lo que haremos será inyectar los componentes dentro del contenedor
 * Dichos componentes estan dentro de un objeto
 */

const contenido = {
    Arrays:`
        <h1 class="titleSection">Array view</h1>
        <section class="containerView" id="containerView">
        </section>

        <h1 class="titleSection">Options</h1>
        <section class="containerOpt">
            <!--Push-->
            <div class="containerOpt_card">
                <h2 class="optTitleSection">Push</h2>
                <div class="valueOptContainer">
                    <label for="valuePush">Value</label>
                    <input type="text" placeholder="Type the value to push" name="valuePush" id="valuePush">
                </div>
            </div>
            <!--Pop-->
            <div class="containerOpt_card">
                <h2 class="optTitleSection">Pop</h2>
                <div class="valueOptContainerButton">
                    <button class="buttonOpt" id="valuePop">Execute</button>
                </div>
            </div>
            <!--Shift-->
            <div class="containerOpt_card">
                <h2 class="optTitleSection">Unshift</h2>
                <div class="valueOptContainer">
                    <label for="valueShift">Value</label>
                    <input type="text" placeholder="Type the value to shift" name="valueShift" id="valueShift">
                </div>
            </div>
            <div class="containerOpt_card">
                <h2 class="optTitleSection">Shift</h2>
                <div class="valueOptContainerButton">
                    <button class="buttonOpt">Execute</button>
                </div>
            </div>
            <div class="containerOpt_card">
                <h2 class="optTitleSection">Concat</h2>
                <div class="valueOptContainer">
                    <label for="valueConcat">New Array</label>
                    <input type="text" placeholder="Type the array like this... 1,2,3,4" name="valueConcat" id="valueConcat">
                </div>
            </div>
            <div class="containerOpt_card">
                <h2 class="optTitleSection">Reverse</h2>
                <div class="valueOptContainerButton">
                    <button class="buttonOpt">Execute</button>
                </div>
            </div>
            <div class="containerOpt_card">
                <h2 class="optTitleSection">Filter</h2>
                <div class="valueOptContainer">
                    <label for="valueFilter">Value to filter</label>
                    <input type="text" placeholder="Type the value to filter" name="valueFilter" id="valueFilter">
                </div>
            </div>
        </section>
    `,
    Hash_tables:`
        <p>Segunda parte</p>
    `,
    Linked_list:`
        <p>Segunda parte</p>
    `,
    Stacks:`
        <p>Segunda parte</p>
    `,
    Queues:`
        <p>Segunda parte</p>
    `,
    Trees:`
        <p>Segunda parte</p>
    `,
    Graphs:`
        <p>Segunda parte</p>
    `,
}
  
