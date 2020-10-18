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
        let boton: HTMLElement = document.getElementById("boton");
        // boton.addEventListener("click", this);
        this.myf.configEventLister("click", "boton", this);
        boton.textContent = "Boton cambiado!!"; // Cambia el texto contenido en el boton, solo para ejemplo.

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
        //console.log(`se hizo "${evt.type}"`);

        let element: HTMLElement = this.myf.getElementByEvent(evt);

        if (element.id == "boton") {
            this.counter++;
            element.textContent = `Click ${this.counter}`;
        }
        else {
            // El elemento es un switch.
            //console.log (`se hizo "${evt.type}"`);
            let state: boolean = this.view.getSwitchStateById(element.id);
            let switchData = { "id": `${element.id}`, "state": state };
            //console.log(data);
            this.myf.requestPOST("http://localhost:8000/devices", switchData, this);
        }
    }

    handleGETResponse(status: number, response: string): void {
        let deviceList: Array<DeviceInterface> = JSON.parse(response);
        this.view.showDevices(deviceList);
        for (let device of deviceList) {
            let deviceElement: HTMLElement = this.myf.getElementById(`${device.id}`);    //dev_
            this.myf.configEventLister("click", deviceElement.id, this);
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