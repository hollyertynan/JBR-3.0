/*
File: auth.js

Authors: Tynan Hollyer, Damian Oakes

tynan_hollyer@student.uml.edu

Description: JBR3 JS file to check authentication 
and allow access to the formbuilder button. 

Credit:
Proper Documentation copied from
HW 1, Part 2, Author: Wenjin Zhou
*/

var authLevel = 1

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
 
   return JSON.parse(jsonPayload);
};

// for submission
var getName = "";

function handleCredentialResponse(response) {
    const responsePayLoad = parseJwt(response.credential);

    $("#signIn").attr("hidden",true);
    $("#g_id_onload").attr("hidden",true);

    whitelistedNames = [
      "Tynan Hollyer",
      "Suzanne Fleury",
      "Damian Oakes",
      "Connor Caissie",
      "Brady Bernard",
      "Elizabeth Eaton",
      "Carolyn Bell"
    ]

    getName = responsePayLoad.name;
    if (whitelistedNames.includes(String(getName))) {
      $("#name").html("Welcome, " + responsePayLoad.given_name);
    } else {
      $("#name").html("Welcome, " + responsePayLoad.name.substr(getName.length - 3));
      getName = responsePayLoad.name.substr(getName.length - 3);
    }
  
    $("#name").attr("hidden",false);
    $("#image").attr("hidden",false);
    $("#image").attr("src", responsePayLoad.picture);

    /* leaving for reference
    console.log("ID: " + responsePayLoad.sub);
    console.log('Full Name: ' + responsePayLoad.name);
    console.log('Given Name: ' + responsePayLoad.given_name);
    console.log('Family Name: ' + responsePayLoad.family_name);
    console.log("Image URL: " + responsePayLoad.picture);
    console.log("Email: " + responsePayLoad.email); 
    alert(responsePayLoad.email);
    */

    enableFormBuilder(responsePayLoad.name)
    createAuthLevel(responsePayLoad.name)
}

function createAuthLevel(nameCheck) {
  const RSC_MEMBERS = [
    "Brady Bernard",
    "Carolyn Bell",
    "Liz Eaton"
  ]

  const POS_MEMBERS = [
    "Suzanne Fleury",
    "Connor Caissie",
    "Tynan Hollyer",
    "Damian Oakes"
  ]

  if (RSC_MEMBERS.includes(String(nameCheck))) {
    authLevel = 2
    initializeExtraFields()
  } else if (POS_MEMBERS.includes(String(nameCheck))) {
    authLevel = 3
    initializeExtraFields()
  } else {
    authLevel = 1
  }
} 


function enableFormBuilder(nameCheck) {

    whitelist = [
      "Tynan Hollyer",
      "Suzanne Fleury",
      "Damian Oakes",
      "Connor Caissie"
    ]

    if (whitelist.includes(String(nameCheck))) {
      $("#formbuilder").css({display: "block"});
    }

    $("#searchBar").attr("placeholder", "Search");
    $("#inputText").prop("value", "Search");

    $("#fieldsetForForm").attr("disabled",false);

    $("#inputText").addClass("btn-outline-light")
    $("#inputText").html("Submit")
}

function initializeExtraFields() {
  if(authLevel == 2 || 3) {
    document.getElementById("storeNumber").hidden = false
    document.getElementById("ticketCaller").hidden = false
  } else {
    document.getElementById("storeNumber").hidden = true
    document.getElementById("ticketCaller").hidden = true
  }
  
}