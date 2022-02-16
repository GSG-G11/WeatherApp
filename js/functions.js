//function for seclect element
const getElement = (element) => {
    return document.querySelector(element)
}
//delete child element for parent element
const  deleteChild =(element)  => {
    var child = element.lastElementChild;

    while (child) {
        console.log(child) 
        element.removeChild(child);
        child = element.lastElementChild;
    }
}
//addEventListener for element
const addEventListener = (element,event,cb) => {
    return element.addEventListener(event,cb)
}

//function for create element
const createElement =(tag,nameClass="",text="") => {
    const element=document.createElement(tag)
    element.className=nameClass
    element.textContent=text
    return element
}
//function for create image
const createImage =(tag,nameClass="",alt="image",src="#") => {
    const element=document.createElement(tag)
    element.className=nameClass
    element.alt=alt
    element.src=src
    return element
}