function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
 
   return JSON.parse(jsonPayload);
};

function handleCredentialResponse(response) {
    const responsePayLoad = parseJwt(response.credential);

    $("#signIn").attr("hidden",true);
    $("#g_id_onload").attr("hidden",true);

    $("#name").attr("hidden",false);
    $("#image").attr("hidden",false);
    $("#name").html("Welcome, " + responsePayLoad.name);
    $("#image").attr("src", responsePayLoad.picture);
    /*
    console.log("ID: " + responsePayLoad.sub);
    console.log('Full Name: ' + responsePayLoad.name);
    console.log('Given Name: ' + responsePayLoad.given_name);
    console.log('Family Name: ' + responsePayLoad.family_name);
    console.log("Image URL: " + responsePayLoad.picture);
    console.log("Email: " + responsePayLoad.email); 
    alert(responsePayLoad.email);
    */

    enableFormBuilder(responsePayLoad.name)
}

function enableFormBuilder(nameCheck) {
    if (nameCheck == "Tynan Hollyer" || "Suzanne Fleury" || "Damian Oakes" || "Connor Caissie") {
      $("#formbuilder").css("display", "block")
    }
}