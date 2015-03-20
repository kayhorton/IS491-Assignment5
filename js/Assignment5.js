 function MenuChoice() {
    if (document.getElementById("menu").value == "Customer List") {
        
        document.getElementById("area1").style.visibility = "visible";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "hidden";
        GetAllCustomers();
    }
    else  if (document.getElementById("menu").value == "Customer Order List"){
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "visible";
        document.getElementById("area3").style.visibility = "hidden";
         
    }
    else  if (document.getElementById("menu").value == "Customer Order History"){
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "visible";
    }
    
    else {
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "hidden";
    }
}


function GetAllCustomers() {
    
    var objRequest = new XMLHttpRequest(); //create AJAX request object
    
    //create URL and JQuery string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebService/service1.svc/getAllCustomers";
 
    
    //checks that the object has returned data
    objRequest.onreadystatechange = function() {
         
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output1=JSON.parse(objRequest.responseText);
            GenerateAllCustomers(output1);
        }
    }
    
    //initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
    
}


function GenerateAllCustomers(result) {
    var count = 0;
    var displayAllCustomers = "";
    //loop to extract data from the response object
    for (count=0; count < result.GetAllCustomersResult.length; count++) {
        
        displayAllCustomers += "<tr><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>"
                        + result.GetAllCustomersResult[count].CompanyName + "</td><td>"
                        + result.GetAllCustomersResult[count].City + "</td></tr>";
    }
    
    document.getElementById("displayschedule").innerHTML = displayAllCustomers;
}


function GetCustomerOrders() {
    
    var objRequest = new XMLHttpRequest(); //create AJAX request object
    
    //create URL and JQuery string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebService/service1.svc/getOrdersForCustomer/";
        url += document.getElementById("customerID").value;
    
    //checks that the object has returned data
    objRequest.onreadystatechange = function() {
         
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output2=JSON.parse(objRequest.responseText);
            GenerateCustomerOrders(output2);
        }
    }
    
    //initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
    
}

function GenerateCustomerOrders(result2) {
    var count2 = 0;
    var displayCustomerOrders = "";
    //loop to extract data from the response object
    
    displayTblHdr = "<br /><h2> Orders for Customer ID: " + document.getElementById("customerID").value +"</h2>";
    document.getElementById("tblhdr").innerHTML = displayTblHdr;
    
    
    for (count2=0; count2 < result2.GetOrdersForCustomerResult.length; count2++) {
        
        displayCustomerOrders += "<tr><td>" + result2.GetOrdersForCustomerResult[count2].OrderDate + "</td><td>"
                        + result2.GetOrdersForCustomerResult[count2].OrderID + "</td><td>"
                        + result2.GetOrdersForCustomerResult[count2].ShipAddress + "</td><td>"
                        + result2.GetOrdersForCustomerResult[count2].ShipCity + "</td><td>"
                        + result2.GetOrdersForCustomerResult[count2].ShipName + "</td><td>"
                        + result2.GetOrdersForCustomerResult[count2].ShipPostcode + "</td><td>"
                        + result2.GetOrdersForCustomerResult[count2].ShippedDate + "</td></tr>";
    }
    
    document.getElementById("displaycustorder").innerHTML = displayCustomerOrders;
}


function GetCustomerOrdersHistory() {
    
    var objRequest = new XMLHttpRequest(); //create AJAX request object
    
    //create URL and JQuery string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebService/service1.svc/getCustomerOrderHistory/";
        url += document.getElementById("customerID3").value;
    
    //checks that the object has returned data
    objRequest.onreadystatechange = function() {
         
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output=JSON.parse(objRequest.responseText);
            GenerateCustomerOrdersHistory(output);
        }
    }
    
    //initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
    
}

function GenerateCustomerOrdersHistory(result3) {
    var row = 0;
    var displayCustomerOrderHistory = "";
    //loop to extract data from the response object
    
    displayTblHdr3 = "<br /><h2> Orders History for Customer ID: " + document.getElementById("customerID3").value +"</h2>";
    document.getElementById("tblhdr3").innerHTML = displayTblHdr3;
    
    
    for (row=0; row < result3.length; row++) {
        
        displayCustomerOrderHistory += "<tr><td>" + result3[row].ProductName + "</td><td>"
                              + result3[row].Total + "</td></tr>";
    }
    
    document.getElementById("displaycusthist").innerHTML = displayCustomerOrderHistory;
}


