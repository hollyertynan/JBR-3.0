function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    //const responsePayload = decodeJwtResponse(response.credential);
    console.log(jwtDecode(response));
    //console.log("ID: " + responsePayload.sub);
    //console.log('Full Name: ' + responsePayload.name);
    //console.log('Given Name: ' + responsePayload.given_name);
    //console.log('Family Name: ' + responsePayload.family_name);
    //console.log("Image URL: " + responsePayload.picture);
    //console.log("Email: " + responsePayload.email);
}

// data-callback="https://hollyertynan.github.io/JBR-3.0/"