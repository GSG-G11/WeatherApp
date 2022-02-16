
const  deleteChild =(element)  => {
    var child = element.lastElementChild; 
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}
const addEventListener = (element,event,cb) => {
    return element.addEventListener(event,cb)
}

const handlePicture = (data) => {
    const figure=getElement('.figure')
    figure.style.visibility="visible"
    deleteChild(figure)
    if(data.total != 0) {
        const image=document.createElement('img')
        image.className='img'
        image.alt=data.hits[0].tags
        image.src=data.hits[0].largeImageURL
        figure.appendChild(image)
    }
}
const handlegeneralinformation = (data) =>{
    const importantSection=getElement('.important-sec')
    importantSection.style.visibility="visible"
    const newDate = new Date()
    deleteChild( importantSection)
    if (data.cod ==200){
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
}
const handeldailyWeather = (data) => {
    getElement('.daily-sec').style.visibility="visible"
    if (data.cod ==200){
        const days =getElement('.days')
        deleteChild( days)
        let list = [];
        let last_date = null;
        for (let i = 0; i < data.list.length; i++) {
            let item = data.list[i];
            let date = (new Date(1000 * data.list[i].dt)).toLocaleDateString();
            if (last_date !== date) {
                list.push(item);
                last_date = date;
            }
        }
            
        list.forEach(weather => {
            const day=document.createElement('div')
            day.className="day"
            days.appendChild(day)
        
            const dateDaily=document.createElement('span')
            dateDaily.className="date-daily"
            dateDaily.textContent=`${(new Date(1000 * weather.dt)).toDateString()}`
        
            const degreeDaily=document.createElement('span')
            degreeDaily.className="degree-daily"
            degreeDaily.textContent=`${(weather.main.temp-273).toFixed(2)}° C`
            day.append(dateDaily,degreeDaily)
        });
    }  
}
const imgApiKey='25715508-30ede2cb1753fb52763f43dcd'
const urlImg=`https://pixabay.com/api/?key=${imgApiKey}&q=gaza&image_type=photo`
const weatherApiKey= '6ee2f171995fb8fff1fa087c6724cc4e'
const urlWeather=`https://api.openweathermap.org/data/2.5/weather?units=metri&lang=e&q=gaza&appid=${weatherApiKey}`
const urlDaily=`https://api.openweathermap.org/data/2.5/forecast?q=gaza&appid=${weatherApiKey}`
fetch ("GET",urlImg,handlePicture)
fetch("GET",urlWeather,handlegeneralinformation)
fetch("GET",urlDaily,handeldailyWeather)


addEventListener(getElement('.form'),'submit',(e)=>{
    e.preventDefault()
    const inputValue=getElement('.input').value
    const urlPicture=`https://pixabay.com/api/?key=${imgApiKey}&q=${inputValue}&image_type=photo`
    const urlWeather=`https://api.openweathermap.org/data/2.5/weather?units=metri&lang=e&q=${inputValue}&appid=${weatherApiKey}`
    const urlDaily=`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${weatherApiKey}`
    fetch("GET",urlPicture,handlePicture)
    fetch("GET",urlWeather,handlegeneralinformation)
    fetch("GET",urlDaily,handeldailyWeather)
})

addEventListener(getElement('.fa-times'),'click',()=> {
    getElement('.error-sec').style. visibility="hidden";
})
