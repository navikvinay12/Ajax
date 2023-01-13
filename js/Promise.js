let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + " Hrs :" + date.getMinutes() + " Mins :" + date.getSeconds() + " Secs";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log(methodType + " State Changed called at: " + showTime() + " Ready State: " + xhr.readyState + " Status: " + xhr.status);
                if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                    resolve(xhr.responseText);
                } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("XHR Failed");
                }
            }
            xhr.open(methodType, url, async);
            if (data) {
                console.log(JSON.stringify(data));
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.send(JSON.stringify(data));
            } else xhr.send();
            console.log(methodType + " Request sent to the server at" + showTime());
        });
}

const getURL = "http://localhost:3000/employees/";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: " + responseText);
    }).catch(error => console.log("Get Error Status " + JSON.stringify(error)));
// console.log("Made GET AJAX call to server at " + showTime());

const deleteURL = "http://localhost:3000/employees/2";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText =>{
        console.log("Delete User Data: " + responseText);
    }).catch(error => console.log("Get Error Status " + JSON.stringify(error)));
// console.log("Made DELETE AJAX call to server at " + showTime());

const postURL = "http://localhost:3000/employees";
const employeeData = {"name":"Harry", "salary":"5000"}
makePromiseCall("POST", postURL, true, employeeData)
    .then(responseText =>{
        console.log("User Added " + responseText);
    }).catch(error => console.log("POST Error Status " + JSON.stringify(error)));
// console.log("Made POST AJAX call to server at " + showTime());

//------Theories
//json-server --watch EmpDB.json to live server .
//  *PROMISE* (Its an object which is returned by the async fn like ajax.)
// A JavaScript Promise object can be:
// Pending
// Fulfilled
// Rejected

// The Promise object supports two properties: state and result.
// While a Promise object is "pending" (working), the result is undefined.
// When a Promise object is "fulfilled", the result is a value.
// When a Promise object is "rejected", the result is an error object.

//Part1-Inside Async Function
//Promise object is created.Async function returns the promise object.
//If async  is done successfully, promise object is resolved by calling its resolve method.
//If async is done with error, promise object is rejected by calling its rejected method.

//Part2-Outside Async Function.
//Call the function and get the promise object.
//Attached success handler, error handler on the promise object using then method

//Promise is used to overcome issues with the multiple callbacks and provide better way to
//magae success and error conditions.