//handle function for crete image
const handleImage = (data) => {
    const figure=getElement('.figure')
    figure.style.visibility="visible"
    deleteChild(figure)
    if(data.total != 0) {
        const image=createImage('img','img',data.hits[0].tags,data.hits[0].largeImageURL)
        figure.appendChild(image)
    }
}
//handle function for current weather
const handlegeneralinformation = (data) =>{
    const newDate = new Date()
    const currentWeather=getElement('.current-weather-sec')
    const current=getElement('.current')
    currentWeather.style.visibility="visible"
    deleteChild( current)
    if (data.cod ==200){
        const date=createElement('span','data',newDate.toLocaleDateString())
        const time=createElement ('span','time',newDate.toLocaleTimeString())
        const nameCountry=createElement ('span','name-country',data.name)
        const icon=createImage('img','img','icon',`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        const degreeCountry=createElement ('span','degree-country',`${(data.main.temp-273).toFixed(2)}° C`)
        
        const moreInfo=createElement ('ul')
        const wind=createElement ('li','wind',`Wind:  ${data.wind.speed}-${data.wind.deg}`)
        const pressure=createElement ('li','pressure',`Pressure: ${data.main.pressure}`)
        const humidity=createElement ('li','humidity',`Humidity: ${data.main.humidity}`)
        const visibility=createElement ('li','visibility',`Visibility: ${data.visibility/1000} Km`)

        current.append(date,time,nameCountry,degreeCountry,icon,moreInfo)
        moreInfo.append(wind,pressure,humidity,visibility)
    }  
}
//handle function for return array with unique day
const uniqueDay =(array) => {
    let uniqueDays = [];
    let last_date = null;
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        let date = (new Date(1000 * array[i].dt)).toLocaleDateString();
        if (last_date !== date) {
            uniqueDays.push(item);
            last_date = date;
        }
    }
    return uniqueDays
}
//handle function for daily weather
const handeldailyWeather = (data) => {
    getElement('.daily-sec').style.visibility="visible"
    if (data.cod ==200){
        const days =getElement('.days')
        deleteChild( days)
        const uniqueDays=uniqueDay(data.list)
        uniqueDays.forEach(weather => {
            const day=createElement('div','day')
            days.appendChild(day)
            const dateDaily=createElement ('span','date-daily',`${(new Date(1000 * weather.dt)).toDateString()}`)
            const degreeDaily=createElement ('span','degree-daily',`${(weather.main.temp-273).toFixed(2)}° C`)
            const icon=createImage('img','icon','icon',`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`)
            day.append(dateDaily,icon,degreeDaily)
            });
    }   
}
const imgApiKey='25715508-30ede2cb1753fb52763f43dcd'
const urlImg=`https://pixabay.com/api/?key=${imgApiKey}&q=gaza&image_type=photo`
const weatherApiKey= '6ee2f171995fb8fff1fa087c6724cc4e'
const urlWeather=`https://api.openweathermap.org/data/2.5/weather?units=metri&lang=e&q=gaza&appid=${weatherApiKey}`
const urlDaily=`https://api.openweathermap.org/data/2.5/forecast?q=gaza&appid=${weatherApiKey}`
fetch ("GET",urlImg,handleImage)
fetch("GET",urlWeather,handlegeneralinformation)
fetch("GET",urlDaily,handeldailyWeather)


addEventListener(getElement('.form'),'submit',(e)=>{
    e.preventDefault()
    const inputValue=getElement('.input').value
    const urlPicture=`https://pixabay.com/api/?key=${imgApiKey}&q=${inputValue}&image_type=photo`
    const urlWeather=`https://api.openweathermap.org/data/2.5/weather?units=metri&lang=e&q=${inputValue}&appid=${weatherApiKey}`
    const urlDaily=`https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${weatherApiKey}`
    fetch("GET",urlPicture,handleImage)
    fetch("GET",urlWeather,handlegeneralinformation)
    fetch("GET",urlDaily,handeldailyWeather)

})

addEventListener(getElement('.fa-times'),'click',()=> {
    getElement('.error-sec').style. visibility="hidden";
})

