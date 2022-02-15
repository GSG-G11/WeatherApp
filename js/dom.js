const getElement = (element) => {
    return document.querySelector(element)
}

const handlePicture = (data) => {
    console.log(data)
    const image=document.createElement('img')
    image.className='img'
    image.alt=data.hits[0].tags
    image.src=data.hits[0].largeImageURL
    getElement('.figure').appendChild(image)
}
fetch ("GET","https://pixabay.com/api/?key=25715508-30ede2cb1753fb52763f43dcd&q=gaza&image_type=photo",handlePicture)