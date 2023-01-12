let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + " Hrs :" + date.getMinutes() + " Mins :" + date.getSeconds() + " Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) 
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {    //calling event handler when response received from the server.
        console.log(methodType+" State Changed called at: "+showTime()+" Ready State: "+xhr.readyState+" Status: "+xhr.status);
        if(xhr.readyState===4) {
            //Matching all 200 Series Responses
            if(xhr.status===200 || xhr.status===201){
                callback(xhr.responseText);
            }else if (xhr.status>=400) {
                console.log("Handle 400 Client Error or 500 Server Error");
            }
        }
    }
    xhr.open(methodType, url, async);
    if(data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType + " request sent to the server at" + showTime());
}

const getURL = "http://localhost:3000/employees/";
function getUserDetails(data) {
    console.log("Get User Data : " + data)
}
makeAJAXCall("Get", getURL, getUserDetails, true);//retrieving data from the server.

const deleteURL= "http://localhost:3000/employees/5";
function userDeleted(data){
    console.log("User Deleted "+data);
}
makeAJAXCall("DELETE",deleteURL,userDeleted,false);

const postURL="http://localhost:3000/employees";
const emplData ={"name":"Harry","salary":"5000"};
function userAdded(data){
    console.log("User Added: "+data)
}
makeAJAXCall("POST",postURL,userAdded,true,emplData);

//---Theories --
//json-server --watch EmpDB.json to live server .

//The readyState property holds the status of the XMLHttpRequest.//The status property and the statusText property holds the status of the XMLHttpRequest object.
//HTTP status code 200 or 201 --> indicates that the request has succeeded
//responseText =returns the text received from a server following a request being sent.
//HTTP status codes >400 -->bad response or failed or server error .
//setRequestHeader(header, value) Adds HTTP headers to the request. header: specifies the header name. value: specifies the header value
//send =send() Sends the request to the server (used for GET) send(string) Sends the request to the server (used for POST)
// .readyState
// 0   UNSENT              CLient has been created open() not called yet.
// 1   OPENED              open() has been called.
// 2   HEADERS_RECEIVED    send() has been called,and headers and status are available.    
// 3   LOADING             Downloading; responseText holds partial data
// 4   DONE                The operation is complete .