class ViewMainPage {
private myf:MyFramework;

constructor(myf:MyFramework){
    this.myf = myf;
}

    showDevices (list: DeviceInt[]):void {

    let e:HTMLElement = this.myf.getElementById ("deviceList");
    console.log(e);
    let i:string;
    let state:string;
    for (let dev of list){
        if (dev.type == 0){
             i = "lightbulb.png";
        }
            else {
                i = "window.png";
            }
        if (dev.state == 0) {
            state = "";
        }
        else {
            state = "checked";
        }
                
        e.innerHTML += `<li class="collection-item avatar">
          <img src="/static/images/${i}" alt="" class="circle">
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

    getSwitchStateById(id:string):boolean
    {
        let e:HTMLElement = this.myf.getElementById(id);
        let i:HTMLInputElement = <HTMLInputElement> e;
        return i.checked;
    }
}