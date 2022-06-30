function SubForm() {
    document.forms['submitMyForm'].elements['Submitted'].value = "Test";
    document.forms['submitMyForm'].elements['Person'].value = "Test";
    document.forms['submitMyForm'].elements['T/P/M'].value = "Test";
    document.forms['submitMyForm'].elements['Ticket# / Caller'] = "Test";
    document.forms['submitMyForm'].elements['Store'].value = "Test";
    document.forms['submitMyForm'].elements['Department'].value = "Test";
    document.forms['submitMyForm'].elements['First Task'].value = "Test";
    document.forms['submitMyForm'].elements['Second Task'].value = "Test";
    document.forms['submitMyForm'].elements['Third Task'].value = "Test";
    document.forms['submitMyForm'].elements['Fourth Task'].value = "Test";
    document.forms['submitMyForm'].elements['Fifth Task'].value = "Test";
    document.forms['submitMyForm'].elements['Comments'].value = "Test";

    document.getElementById("submittext").innerHTML = "";
    $("#submittext").addClass("spinner-border text-light");
    $("#submitcheck").removeClass("bi bi-check-circle");
    document.getElementById("submissionButton").disabled = true;

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxof1Xv9qG7KFc5t0kHbo5WFCP_D8wUiviJupU04WQYpIu1fdrKRcwG2IUUJxSqK3eS/exec",
        type: "post",
        data:$("#submitMyForm").serializeArray(),
        
        success: async function() {
            await delay(1000);
            location.reload();
            
        },
        error: async function() {
            await delay(1000);
            location.reload();
        }
    });
}