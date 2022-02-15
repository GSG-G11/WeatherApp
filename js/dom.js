const getElement = (element) => {
    return document.querySelector(element)
}
const  deleteChild =(element)  => {
    var child = element.lastElementChild; 
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

const handlePicture = (data) => {
    deleteChild(getElement('.figure'))
    const image=document.createElement('img')
    image.className='img'
    image.alt=data.hits[0].tags
    image.src=data.hits[0].largeImageURL
    getElement('.figure').appendChild(image)
}
fetch ("GET","https://pixabay.com/api/?key=25715508-30ede2cb1753fb52763f43dcd&q=gaza&image_type=photo",handlePicture)

getElement('.form').addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(getElement('.input').value)
    const inputValue=getElement('.input').value
    const urlPicture=`https://pixabay.com/api/?key=25715508-30ede2cb1753fb52763f43dcd&q=${inputValue}&image_type=photo`
    fetch("GET",urlPicture,handlePicture)

})

