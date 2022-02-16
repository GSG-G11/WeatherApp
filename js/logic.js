const fetch = (method,url,cb) =>{
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200){
                cb(JSON.parse(xhr.responseText))
            } 
            if (xhr.status == 404) {
                handleError()
            }
        }
    };
    xhr.open(method, url);
    xhr.send();
}

const handleError =()=> {
    getElement('.error-sec').style.visibility="visible"; 
    getElement('.figure').style.visibility="hidden"
    getElement('.current-weather-sec').style.visibility="hidden"
    getElement('.daily-sec').style.visibility="hidden"
}