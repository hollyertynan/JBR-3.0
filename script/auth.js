function handleCredentialResponse(response) {
    const responsePayLoad = jwtDecode(response.credential);
    console.log("ID: " + responsePayLoad.sub);
    console.log('Full Name: ' + responsePayLoad.name);
    console.log('Given Name: ' + responsePayLoad.given_name);
    console.log('Family Name: ' + responsePayLoad.family_name);
    console.log("Image URL: " + responsePayLoad.picture);
    console.log("Email: " + responsePayLoad.email); 
    alert(responsePayLoad.email);
}