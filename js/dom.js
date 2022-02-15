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
const handlegeneralinformation = (data) =>{
    const newDate = new Date()
    const importantSection=getElement('.important-sec')
    deleteChild( importantSection)
    const date=document.createElement('span')
    date.className='data'
    date.textContent=newDate.toLocaleDateString()
    importantSection.appendChild(date)

    const time=document.createElement('span')
    time.className='time'
    time.textContent=newDate.toLocaleTimeString()
    importantSection.appendChild(time)

    const nameCountry=document.createElement('span')
    nameCountry.className='name-country'
    nameCountry.textContent=data.name
    importantSection.appendChild(nameCountry)

    const degreeCountry=document.createElement('span')
    degreeCountry.className='degree-country'
    degreeCountry.textContent=`${(data.main.temp-273).toFixed(2)}° C`
    importantSection.appendChild(degreeCountry)
    
    const moreInfo=document.createElement('ul')
    importantSection.appendChild(moreInfo)

    const wind=document.createElement('li')
    wind.className="wind"
    wind.textContent=`Wind:  ${data.wind.speed}-${data.wind.deg}`

    const pressure=document.createElement('li')
    pressure.className="pressure"
    pressure.textContent=`Pressure: ${data.main.pressure}`

    const humidity=document.createElement('li')
    humidity.className="humidity"
    humidity.textContent=`Humidity: ${data.main.humidity}`

    const visibility=document.createElement('li')
    visibility.className="visibility"
    visibility.textContent=`Visibility: ${data.visibility/1000} Km`

    moreInfo.append(wind,pressure,humidity,visibility)

    
}
fetch ("GET","https://pixabay.com/api/?key=25715508-30ede2cb1753fb52763f43dcd&q=gaza&image_type=photo",handlePicture)


const weatherApiKey= '6ee2f171995fb8fff1fa087c6724cc4e'
const urlWeather=`https://api.openweathermap.org/data/2.5/weather?units=metri&lang=e&q=gaza&appid=${weatherApiKey}`

fetch("GET",urlWeather,handlegeneralinformation)


getElement('.form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const inputValue=getElement('.input').value
    const urlPicture=`https://pixabay.com/api/?key=25715508-30ede2cb1753fb52763f43dcd&q=${inputValue}&image_type=photo`
    const urlWeather=`https://api.openweathermap.org/data/2.5/weather?units=metri&lang=e&q=${inputValue}&appid=${weatherApiKey}`
    fetch("GET",urlPicture,handlePicture)
    fetch("GET",urlWeather,handlegeneralinformation)



})

