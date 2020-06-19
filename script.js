var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
var tableInfo = document.getElementById("table-body")
var infoContent = document.getElementById("info-content")

//To make request we use XMLHTTP request object
var xhttp = new XMLHttpRequest();
//confiqure  the request
xhttp.open("GET", url, true);


//handle response
xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4) {
        resp = JSON.parse(xhttp.responseText)
        console.log(resp)
        for (i = 0; i < resp.length; i++) {
            id = resp[i]["id"]
            first = resp[i]["firstName"]
            last = resp[i]["lastName"]
            mail = resp[i]["email"]
            phone = resp[i]["phone"]
            address = resp[i]["address"]

            description = resp[i]["description"]
            createEntry(id, first, last, mail, phone, address, description)

        }
    }
};
//response sent
xhttp.send();

function createEntry(id, first, last, mail, phone, address, description) {
    tableRow = document.createElement("tr")
    tableRow.classList.add("data-row")
    //adding id to row
    tableRow.id = id;

    //creating details on side on click
    tableRow.addEventListener("click", function () {
        allElement = document.getElementsByClassName("data-row")
        for (i = 0; i < allElement.length; i++) {
            allElement[i].style.backgroundColor = "white";
        }
        document.getElementById(id).style.backgroundColor = "#20B2AA"
        var innerName = "<div><b>User selected:</b>" + first + " " + last + "</div>"
        var innerDescription = "<div><b> Description: </b><textarea cols='50' rows='5' readonly>" + description + "</textarea></div >"
       

        
        var street = "<div><b>Address:</b>" + address["streetAddress"] + "</div>"
        var city = "<div><b>City:</b>" + address["city"] + "</div>"
        var state = "<div><b>State:</b>" + address["state"] + "</div>"
        var zip = "<div><b>Zip:</b>" + address["zip"] + "</div>"
        var innerTotal = innerName + innerDescription + street + city + state + zip
        infoContent.innerHTML = innerTotal
        infoContent.style.display = "block"



    })
    //creating row for all details
    columnOne = document.createElement("td")
    columnOne.classList.add("column1")
    columnOne.innerText = id;

    columnTwo = document.createElement("td")
    columnTwo.classList.add("column2")
    columnTwo.innerText = first;

    columnThree = document.createElement("td")
    columnThree.classList.add("column3")
    columnThree.innerText = last;

    columnFour = document.createElement("td")
    columnFour.classList.add("column4")
    columnFour.innerText = mail;

    columnFive = document.createElement("td")
    columnFive.classList.add("column5")
    columnFive.innerText = phone;

        //appending columns to the row
    tableRow.appendChild(columnOne);
    tableRow.appendChild(columnTwo);
    tableRow.appendChild(columnThree);
    tableRow.appendChild(columnFour);
    tableRow.appendChild(columnFive);
    //row to the info
    tableInfo.appendChild(tableRow);

}





// for searching

var searchBox = document.getElementById("search-box")
var searchElement = document.getElementsByClassName("data-row")



searchBox.addEventListener("input", function () {
    content = searchBox.value
    for (i = 0; i < searchElement.length; i++) {
        //for searching in each row
        selectedOne= searchElement[i].getElementsByClassName("column2")[0].innerText;
        
        selectedOne = selectedOne.toLowerCase();

        if (!(selectedOne.includes(content))) {
            searchElement[i].style.display = "none"
        }
        else {
            searchElement[i].style.display = ""
        }
    }

})
