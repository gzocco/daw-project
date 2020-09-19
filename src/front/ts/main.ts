/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/

class User{
    private _id:number;
    private _name:string;
    private _email:string;
    private _isLogged:boolean;
    
    constructor (id:number, name:string, email:string) {
        this._id = id;
        this._name = name;
        this._email = email;
    }

    set id(id:number){
        this._id = id;
    }

    get id():number {
        return this._id;
    }

    // Terminar de crear las funciones set y get para name, email, etc.

    printInfo():void{
        console.log("id= " + this._id + ", name = " + this._name + ", email = " + this._email);
    }
}

class Main {
    main():void {
        console.log("Soy un mensaje");

        let usuarios:Array<User>;
        usuarios = new Array<User>();
        usuarios.push (new User(1, "Agustin", "agus@gmail.com"));
        usuarios.push (new User(2, "Gustavo", "gustavo@gmail.com"));
        usuarios.push (new User(3, "Fede", "Fede@gmail.com"));

        for (let i in usuarios){
            usuarios[i].printInfo ();
        }
    }
}


//Metodo onload del DOM: indica que el HTML ya se termino de cargar.
window.onload = function (){
    let m:Main = new Main ();
    m.main ();
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
