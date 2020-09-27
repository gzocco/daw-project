interface GETResponseListener{
    handleGETResponse(status:number, response:string):void;
    }

class MyFramework{
    getElementById(id:string):HTMLElement {
        let e:HTMLElement;
        e = document.getElementById(id);
        return e;
    }

    getElementByEvent (evt:Event):HTMLElement{
        return <HTMLElement>evt.target;
    }

    configClick(id:string,callback:any):void {
        let b:HTMLElement = document.getElementById(id);
        b.addEventListener("click",()=>{callback();});
    }
    requestGET(url:string, listener: GETResponseListener):void{
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
            {
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200)
                {
                    listener.handleGETResponse(xhr.status,xhr.responseText);
                    }
                else
                    {
                    listener.handleGETResponse(xhr.status,null);
                    }
            }
        };
    xhr.open('GET', url, true);
    xhr.send(null);
    }

    configEventLister (event:string, id:string, listener:EventListenerObject):void {
        let b:HTMLElement = document.getElementById (id);
        b.addEventListener (event,listener);
    }
}