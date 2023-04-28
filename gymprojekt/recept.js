"use strict";

var myInit = {method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'   };
let tablebody= document.getElementById("tablebody")
let clean_json;
let myRequest =new Request("./converted.json", myInit);
let receptdata = ""

clickRecept()
listrecept()


let receptdropdown=document.getElementById("receptall")
function clickRecept(){
    console.log("clickRecept")
    fetch("converted.json")
        .then((response) => response.json())
        .then((json) => {
            console.log(json + " : " + JSON.parse(json).length)
            receptdata = json


        });
}

function listrecept(){

    let arrayrecepts =receptdata
    let tr_string = "";
    console.log("data= " + receptdata.length)
}