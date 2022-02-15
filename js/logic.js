const fetch = (method,url,cb) =>{
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200){
                cb(JSON.parse(xhr.responseText))
            }else if (xhr.status == 404) {
                console.log('error not found')
            }else if (xhr.status == 500) {
                console.log("error 500")
            }
        }
    };
    xhr.open(method, url);
    xhr.send();
}
