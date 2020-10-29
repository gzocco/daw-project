//=======[ Settings, Imports & Data ]==========================================




//=======[ Main module code ]==================================================
/*
* Clase ViewMainPage
* Se encarga de lo referido a la visualizacion de la pagina.
*/
class ViewMainPage {
    private myf: MyFramework;

    constructor(myf: MyFramework) {
        this.myf = myf;
    }

    /*
    *   Muestra los dispositivos en la pagina. Crea listado dinamicamente.
    */
    showDevices(list: DeviceInterface[]): void {
        let element: HTMLElement = this.myf.getElementById("deviceList");
        let image: string;
        let state: string;
        // Selecciono imagen segun el dispositivo del que se trate.
        for (let dev of list) {
            if (dev.type == 0) {
                image = "lightbulb.png";
            }
            else {
                image = "window.png";
            }
            if (dev.state == 0) {
                state = "";
            }
            else {
                state = "checked";
            }

            element.innerHTML +=
                `<li class="collection-item avatar">
    <img src="/static/images/${image}" alt="" class="circle">
    <span class="title">${dev.name}</span>
    <p>${dev.description}</p>
    <a href="#!" class="secondary-content">
        <!-- Switch -->
        <div class="switch">
            <label>
                Off
                <input id="dev_${dev.id}" type="checkbox" ${state}>
                <span class="lever"></span>
                On
            </label>
        </div>
    </a>
    <!-- Modal Trigger para Editar un device -->
    <a class="waves-effect waves-light btn modal-trigger" href="#modal_${dev.id}">Editar</a>
    <!-- Modal Structure -->
    <div id="modal_${dev.id}" class="modal">
        <div class="modal-content">
            <h4>Dispositivo</h4>
            <div class="row">
            <div class="input-field col s6">
                <input placeholder="Nombre del dispositivo" id="nameId_${dev.id}" type="text" class="validate">
                <label class="active" for="nameId_${dev.id}">Device Name</label>
            </div>
            <div class="input-field col s6">
                <input placeholder="Descripción del dispositivo" id="descriptionId_${dev.id}" type="text" class="validate">
                <label class="active" for="descriptionId_${dev.id}">Device Description</label>
            </div>
            <div class="input-field col s12 m6">
                <select id="deviceSelect_${dev.id}" class="icons">
                    <option value="0" data-icon="/static/images/lightbulb.png" class="left circle">Lampara
                    </option>
                    <option value="1" data-icon="/static/images/window.png" class="left circle">Persiana
                    </option>
                </select>
                <label>Device type</label>
            </div>
        </div>
        </div>
        <div class="modal-footer">
            <a id= save_${dev.id} href="#!" class="modal-close waves-effect waves-green btn-flat">OK</a>
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
    </div>
    <!-- Modal Trigger para Eliminar un device -->
    <a class="waves-effect waves-light btn modal-trigger" href="#modalE_${dev.id}">Eliminar</a>
    <!-- Modal Structure -->
    <div id="modalE_${dev.id}" class="modal">
        <div class="modal-content">
            <h4>Desea eliminar el dispositivo?</h4>                   
        </div>
        <div class="modal-footer">
            <a id= delete_${dev.id} href="#!" class="modal-close waves-effect waves-green btn-flat">Eliminar</a>
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
    </div>
</li>`;
        }
        // Reinicializo los componentes de Materialize en forma general!
        M.AutoInit();
    }

    /*
    * Obtengo el estado del dispositivo. Si esta checked o no.
    */
    getSwitchStateById(id: string): boolean {
        let element: HTMLElement = this.myf.getElementById(id);
        let input: HTMLInputElement = <HTMLInputElement>element;
        return input.checked;
    }
}