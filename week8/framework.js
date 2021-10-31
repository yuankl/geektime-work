export function createElement(type,attributes,...children){
    
    let element ;
    if(typeof type === "string"){
        element = new ElementWrapper(type);
    }else{
        element = new type;
    }
    for(let name in attributes){
        element.setAttribute(name, attributes[name]);
    }
    for(let child of children){
        if(typeof child === "string"){
            child = document.createTextNode(child);
        }
        element.appendChild(child);
    }
    return element;
}
export class Component{

    constructor(content){
        // this.root = this.render();
    }
    render(){
        return document.createElement("div");
    }
    setAttribute(name,value){
        this.root.setAttribute(name, value);
    }
    appendChild(child){
        child.mountTo(this.root);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }

}
class ElementWrapper extends Component{
    constructor(content){
        this.root = document.createElement(type);
    }
}
class TextWrapper extends Component{
    constructor(content){
        this.root = document.createTextNode(content);
    }
}