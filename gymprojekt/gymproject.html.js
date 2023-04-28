"use strict";

var myInit = {method: 'GET',
    headers: {
    'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'   };

let clean_json;
let myRequest =new Request("./converted.json", myInit);

fetch(myRequest)
    .then(function (resp) {
            return resp.json();
    })
    .then(function (json_data)  {
        clean_json = json2recept(json_data);
        let i = 1;
        let item = "dummy";
        let receptElement = document.getElementById("recept");
        while (true) {
            item = clean_json[i];
            if (item === undefined) {
                break;
            }
            let individualRecept = document.createElement("div");
            console.log(item)
            individualRecept.id = item.name;
            individualRecept.hidden = true;
            let ingredientsHTML = "";
            item.stuff.forEach(ingredient => {
                ingredientsHTML += '<span class="name" data-parent="' + item.name + '">'  + ingredient.Ingredients + '</span>';
                if (ingredient.Quantity !== "") {
                    if (ingredient.Unit !== "") {
                        ingredientsHTML += '<span class="mängd">' + ingredient.Quantity + ' ' + ingredient.Unit + '</span>';
                    } else {
                        ingredientsHTML += '<span class="mängd">' + ingredient.Quantity + '</span>';
                    }
                }
            })
            individualRecept.innerHTML = `
                <div class="menu" data-parent="` + item.name + `">` + item.name + `</div>
                <div class="ingrediens">` + ingredientsHTML + `</div>
            `;
            receptElement.append(individualRecept);
            i++;
        }
    })



function json2recept(raw_json) {
    let arrayList = raw_json.list;
    let new_json = {};
    arrayList.forEach(item => {
        if (new_json[item.id] === undefined) {
            new_json[item.id] = {
                "name": item.Name,
                "stuff": []
            }
        }
        new_json[item.id].stuff.push(item);
    })
    return new_json;
}

function searchThroughRecept() {
    let searchInput = document.getElementById("search").value;
    let allRecept = document.getElementById("recept");
    allRecept.childNodes.forEach(element => {
        if (element.innerText.match(searchInput) && searchInput.length > 2) {
            element.hidden = false;
        } else {
            element.hidden = true;
        }
    })
}


