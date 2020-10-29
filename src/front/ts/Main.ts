/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

// Definicion de tipos de datos validos para info de dispositivos.
interface DeviceInterface {
    id: number;
    name: string;
    description: string;
    state: number;
    type: number;
}

//=======[ Main module code ]==================================================

/*
Clase Main

Implements: 
EventListenerObject: 
GETResponseListener: 
POSTResponseListener: 
*/

class Main implements EventListenerObject, GETResponseListener, POSTResponseListener {

    myf: MyFramework = new MyFramework();
    counter: number = 0;
    view: ViewMainPage;

    main(): void {
        console.log("Inicia Main.ts");

        /* let usuarios: Array<User>;
        usuarios = new Array<User>();
        usuarios.push(new User(1, "Agustin", "agus@gmail.com"));
        usuarios.push(new User(2, "Gustavo", "gustavo@gmail.com"));
        usuarios.push(new User(3, "Fede", "Fede@gmail.com"));

        for (let i in usuarios) {
            usuarios[i].printInfo();
        } */

        this.myf = new MyFramework();
        this.view = new ViewMainPage(this.myf);
        // Hace un GET contra el Backend para obtener lista devices.
        this.myf.requestGET("http://localhost:8000/devices", this);
        let boton: HTMLElement = document.getElementById("botonOk");
        this.myf.configEventLister("click", "botonOkAdd", this);
        this.myf.configEventLister("click", "botonCloseAdd", this);

        if (document.readyState !== 'loading') {
            console.log('Document is already ready, Init Materialize');
            matInit();
        }
        else {
            document.addEventListener('DOMContentLoaded', function () {
                console.log('Document was not ready, Init Materialize');
                matInit();
            });
        }

        function matInit() {
            //M.AutoInit();
            var options;
            var elems = document.querySelectorAll('.collapsible.no-autoinit');
            var instances = M.Collapsible.init(elems, options);
            console.log('Elementos de Materialize inicializados.');
        }
    }

    /* 
    * Metodo mostrarUsers
    * Muestra en consola informacion de usuarios
    * Requiere Clase Users
    */
    mostrarUsers(users: Array<User>): void {
        for (let o of users) {
            o.printInfo();
        }
    }

    /*
    *   Metodo destinado a manejar los eventos de click.
    *   Emplea URI de backend para reaccionar ante eventos con POST.
    */
    handleEvent(evt: Event): void {
        let element: HTMLElement = this.myf.getElementByEvent(evt);
        /*
        TODO: Mejorar reemplazando todos los if else anidados por un switch case.
        */
        if (element.id == "botonOkAdd") {
            // Reacciono ante el evento del boton de Ok de Agregar dispositivo.
            let nameIdC: HTMLElement = this.myf.getElementById("nameIdC");
            let nameText: string = nameIdC.value;
            let descriptionIdC: HTMLElement = this.myf.getElementById("descriptionIdC");
            let descriptionText: string = descriptionIdC.value;
            let devTypeIdC: HTMLElement = this.myf.getElementById("deviceSelectC");
            let devType: number = devTypeIdC.value;
            let deviceData = { "name": nameText, "description": descriptionText, "state": "0", "type": devType };
            // Creo el device con metodo de backend post.
            this.myf.requestPOST("http://localhost:8000/devices/create", deviceData, this);
            // Cierro el colapsable al guardar.
            var elems = document.querySelectorAll('.collapsible.no-autoinit');
            var options;
            var instances = M.Collapsible.init(elems, options);
            instances[0].close();
            // Limpio los valores ingresados para que no figuren si abro nuevamente el colapsible.
            nameIdC.value = '';
            descriptionIdC.value = '';
            devTypeIdC.value = '';
            // Reload de la pagina para que muestre los valores actualizados.
            window.location.reload();
            /*
            TODO: Definir que campos son obligatorios y marcarlos. Verificar que los campos
            obligatorios no esten vacios. Sanitizar campos.
            */
        }
        else
            if (element.id == 'botonCloseAdd') {
                // Cierra el colapsible al presionar boton close.
                var elems = document.querySelectorAll('.collapsible.no-autoinit');
                var options;
                var instances = M.Collapsible.init(elems, options);
                instances[0].close();
            }
            else
                // Me fijo el tipo de interaccion sin el numero de id.
                if (element.id.split("_")[0] == 'save') {
                    //console.log(element.id.split("_")[1]);
                    // Obtengo el numero de device sin el prefix.
                    let devId: string = element.id.split("_")[1];
                    let nameIdM: HTMLElement = this.myf.getElementById(`nameId_${devId}`);
                    let nameText: string = nameIdM.value;
                    let descriptionIdM: HTMLElement = this.myf.getElementById(`descriptionId_${devId}`);
                    let descriptionText: string = descriptionIdM.value;
                    let devTypeIdM: HTMLElement = this.myf.getElementById(`deviceSelect_${devId}`);
                    let devType: number = devTypeIdM.value;
                    let deviceData = { "name": nameText, "description": descriptionText, "type": devType, "id": `${devId}` };
                    // Modifico el device con metodo de backend post.
                    this.myf.requestPOST("http://localhost:8000/devices/update", deviceData, this);
                    // Reload de la pagina para que muestre los nuevos valores actualizados.
                    window.location.reload();
                    /*
                    TODO: Releer los valores al cargar el Modal, para que se muestren los
                    valores anteriores al cambio de Name, Desc, etc.
                    */
                }
                else
                    if (element.id.split("_")[0] == 'delete') {
                        let devId: string = element.id.split("_")[1];
                        let deviceData = { "id": `${devId}` };
                        // Elimino dispositivo con metodo delete del backend por POST.
                        this.myf.requestPOST("http://localhost:8000/devices/delete", deviceData, this);
                        // Reload de la pagina para que muestre los valores actualizados.
                        window.location.reload();
                    }
                    else {
                        // Reacciono por click en un elemento tipo switch.
                        let state: boolean = this.view.getSwitchStateById(element.id);
                        // Quito el prefijo del id html para que concuerde con el id de la DB que usa la API.
                        let switchData = { "id": `${element.id.replace('dev_', '')}`, "state": state };
                        //console.log(data);
                        this.myf.requestPOST("http://localhost:8000/devices", switchData, this);
                    }
    }

    handleGETResponse(status: number, response: string): void {
        let deviceList: Array<DeviceInterface> = JSON.parse(response);
        this.view.showDevices(deviceList);
        for (let device of deviceList) {
            let deviceElement: HTMLElement = this.myf.getElementById(`dev_${device.id}`);
            this.myf.configEventLister("click", deviceElement.id, this);
            this.myf.configEventLister("click", `save_${device.id}`, this);
            this.myf.configEventLister("click", `delete_${device.id}`, this);
        }
    }

    handlePOSTResponse(status: number, response: string): void {
        console.log(status);
        console.log(response);
    }
}

// Metodo onload del DOM: indica que el HTML ya se termino de cargar.
window.onload = () => {
    let m: Main = new Main();
    m.main();
}

//=======[ End of file ]=======================================================
