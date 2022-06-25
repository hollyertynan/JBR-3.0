function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function handleCredentialResponse(response) {
    //console.log(response)

    console.log(JSON.stringify(parseJwt(response.credential)));
}

function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
}

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "176962672918-072st1hpbfv8pfhrtue6g5v6tjeb9mge.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}