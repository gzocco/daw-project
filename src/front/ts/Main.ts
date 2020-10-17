/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/
interface DeviceInt {
    id: number; //string;
    name: string;
    description: string;
    state: number;   //string;
    type: number;    //string;    // Salvo la descripcion, hay que cambiar todos de string a number.
}

class Main implements EventListenerObject, GETResponseListener, POSTResponseListener {

    myf: MyFramework = new MyFramework();
    counter: number = 0;
    view: ViewMainPage;

    main(): void {
        console.log("Soy un mensaje");

        let usuarios: Array<User>;
        usuarios = new Array<User>();
        usuarios.push(new User(1, "Agustin", "agus@gmail.com"));
        usuarios.push(new User(2, "Gustavo", "gustavo@gmail.com"));
        usuarios.push(new User(3, "Fede", "Fede@gmail.com"));

        for (let i in usuarios) {
            usuarios[i].printInfo();
        }
        // let myf:MyFramework = new MyFramework();
        this.myf = new MyFramework();
        this.view = new ViewMainPage(this.myf);

        //myf.configClick ("boton", ()=>(this.evento));

        let b: HTMLElement = document.getElementById("boton");
        b.addEventListener("click", this);

        //this.myf.requestGET("Devices.txt", this); // Primera iteracion, obtengo info devices desde archivo.
        // Para usar el backend
        this.myf.requestGET("http://localhost:8000/devices", this); // Obtiene info de devices desde backend.

        this.myf.configEventLister("click", "boton", this);

        b.textContent = "Boton cambiado!!";

    }

    mostrarUsers(users: Array<User>): void {
        //  for (let i in users) {
        //      users[i].printInfo();
        //  }
        for (let o of users) {
            o.printInfo();
        }
    }

    handleEvent(evt: Event): void {
        console.log(`se hizo "${evt.type}"`);

        let b: HTMLElement = this.myf.getElementByEvent(evt);
        //console.log (b);

        if (b.id == "boton") {
            this.counter++;
            b.textContent = `Click ${this.counter}`;
        }
        else {
            //console.log (`se hizo "${evt.type}"`);
            let state: boolean = this.view.getSwitchStateById(b.id);
            //console.log(b);

            let data = { "id": `${b.id}`, "state": state };
            console.log(data);
            this.myf.requestPOST("http://localhost:8000/devices", data, this);
            //this.myf.requestPOST ("https://cors-anywhere.herokuapp.com/https://postman-echo.com/post", data, this);
        }
    }

    /*handleEvent(evt: Event): void
    {
        console.log("se hizo click");
        console.log(this);
        let b:HTMLElement = this.myf.getElementByEvent (evt);
        this.counter++;
        b.textContent = `Click ${this.counter}`;
    }*/

    handleGETResponse(status: number, response: string): void {
        //throw new Error("Method not implemented.");
        //console.log("Respuesta del server: " + response);
        let data: Array<DeviceInt> = JSON.parse(response);
        //console.log(data);
        this.view.showDevices(data);
        for (let d of data) {
            let b: HTMLElement = this.myf.getElementById(`${d.id}`);    //dev_
            //let i:HTMLInputElement = <HTMLInputElement> b;
            //console.log(i);
            this.myf.configEventLister("click", b.id, this);
            /* if (d.state == "1"){
                 i.checked=true;
             }
             else {
                 i.checked=false;
             }*/
            //b.addEventListener ("click", this);
        }
    }

    handlePOSTResponse(status: number, response: string): void {
        console.log(status);
        console.log(response);
    }
}

/*   evento(ev:Event):void{
       console.log("se hizo click");
       //console.log(this);
   }*/



//Metodo onload del DOM: indica que el HTML ya se termino de cargar.
//window.onload = function (){
window.onload = () => {
    let m: Main = new Main();
    m.main();
}


//=======[ Settings, Imports & Data ]==========================================

let user = "TypesScript Users!";

//=======[ Main module code ]==================================================

function greeter(person) {
    return "Hello, " + person;
}

//document.body.innerHTML = greeter(user);

console.log("Hola mundo");


//=======[ End of file ]=======================================================
