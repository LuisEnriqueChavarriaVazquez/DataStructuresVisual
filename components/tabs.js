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
            <section class="tabs" id="componentTab">
                <div class="activeTab">${this.section1}</div>
                <div>${this.section2}</div>
                <div>${this.section3}</div>
                <div>${this.section4}</div>
                <div>${this.section5}</div>
                <div>${this.section6}</div>
                <div>${this.section7}</div>
            </section>
            <section class="containerContent">
                ddssdds
            </section>
            <!--llamamos a los estilos-->
            ${this.getStyles()}
        `;
        return template;
    }

    //(3) Ayuda a definir los estiloss
    getStyles(){
        return `
            <style>
                :host .tabs{
                    display: grid;
                    grid-template-columns: repeat(7,1fr);
                    grid-template-rows: auto;
                    align-items: flex-end;
                    justify-content: center;
                    height: 64px;
                    color: #fff;
                    background-color: hsl(0, 0%, 21%);
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
                    border-bottom: solid #3b96ff 5px;
                }

                :host .containerContent{
                    display: flex;
                    min-height: calc(100vh - 64px);
                    background-color: hsl(0, 0%, 29%);
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
    const myTab = document.querySelector("my-tab");
    const componentTab = myTab.shadowRoot.getElementById("componentTab");
    const divsTab = componentTab.querySelectorAll('div');
    //Llamamos a la función para cuando damos click en un tab actualizar el contenido
    componentTab.addEventListener('click', (event) =>{
        clickTabActive(divsTab);
        event.target.classList.add('activeTab');
    })
}

/*
 * Funcion para hacer el cambio de tab cada que damos click
 */
function clickTabActive(divs){
    divs.forEach(element => {
        element.classList.remove('activeTab');
    });
}

//Para que pueda acceder a los elementos una vez que ha cargado la pagina
document.addEventListener("DOMContentLoaded", function() {
    tabsActivate();
});
  
