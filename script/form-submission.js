const delay = ms => new Promise(res => setTimeout(res, ms));

function SubForm() {
    document.forms['submitMyForm'].elements['Start Time'].value = saveStartTime;

    var saveEndTime = new Date().toLocaleString();
    document.forms['submitMyForm'].elements['Submitted'].value = saveEndTime;

    document.forms['submitMyForm'].elements['Person'].value = getName;
    document.forms['submitMyForm'].elements['Department'].value = dept_name;
    document.forms['submitMyForm'].elements['Task Name'].value = task_name;
    document.forms['submitMyForm'].elements['Comments'].value = "";

    document.getElementById("submittext").innerHTML = "";
    $("#submittext").addClass("spinner-border text-light");
    $("#submitcheck").removeClass("bi bi-check-circle");
    document.getElementById("submissionButton").disabled = true;

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbyWoBqrGjDVT2rSvEEg0BpPlvTZ_1PGUGbVTe-8B03cv4B2Ka1KFFzA89--G8daGSwDtw/exec",
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