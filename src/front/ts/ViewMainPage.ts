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
    *   Muestra los dispositivos en la pagina.
    */
    showDevices(list: DeviceInterface[]): void {
        let element: HTMLElement = this.myf.getElementById("deviceList");
        //console.log(element);
        let image: string;
        let state: string;
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

            element.innerHTML += `<li class="collection-item avatar">
          <img src="/static/images/${image}" alt="" class="circle">
          <span class="title">${dev.name}</span>
          <p>${dev.description}</p>
          <a href="#!" class="secondary-content">  <!-- Switch -->
            <div class="switch">
              <label>
                Off
                <input id="${dev.id}" type="checkbox" ${state}>
                <span class="lever"></span>
                On
              </label>
            </div></a>
        </li>`;
        }
    }
    //  <input id="dev_${dev.id}" type="checkbox" ${state}>

    getSwitchStateById(id: string): boolean {
        let element: HTMLElement = this.myf.getElementById(id);
        let input: HTMLInputElement = <HTMLInputElement>element;
        return input.checked;
    }
}