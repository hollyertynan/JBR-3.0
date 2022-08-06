const delay = ms => new Promise(res => setTimeout(res, ms));

function SubForm() {
    let ticketNumber = document.getElementById("ticketCaller").value
    let storeNumber = document.getElementById("storeNumber").value
    console.log(ticketNumber)
    console.log(storeNumber)
    
    if (authLevel >= 2) {
        if (document.getElementById("ticketCaller").value.length == 0 || document.getElementById("storeNumber").value.length != 3) {
            showPrompts("ticketNumberAndStoreNotFilledIn");
            document.getElementById("submitModal").disabled = false;
            return;
        } else {
            document.forms['submitMyForm'].elements['Ticket/Caller'].value = ticketNumber;
            document.forms['submitMyForm'].elements['Store Number'].value = storeNumber;
        }
    }

    document.forms['submitMyForm'].elements['Start Time'].value = saveStartTime;
    var saveEndTime = new Date().toLocaleString();
    document.forms['submitMyForm'].elements['Submitted'].value = saveEndTime;

    document.forms['submitMyForm'].elements['Person'].value = getName;
    document.forms['submitMyForm'].elements['Department'].value = dept_name;
    document.forms['submitMyForm'].elements['Task Name'].value = task_name;
    document.forms['submitMyForm'].elements['Comments'].value = comments.value;
    document.forms['submitMyForm'].elements['LocationFrom'].value = authLevel;
    document.forms['submitMyForm'].elements['Register Number'].value = registerNumber;
    
    document.getElementById("submittext").innerHTML = "";
    $("#submittext").addClass("spinner-border text-light");
    $("#submitcheck").removeClass("bi bi-check-circle");
    document.getElementById("submissionButton").disabled = true;

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwW4J9Znq9yLZc9rU8OD8V4EzJ6ueRajiHWH5iLGynqY7awlG9VRF08brM5r_jzbRU/exec",
        type: "post",
        data:$("#submitMyForm").serializeArray(),
        
        
        success: async function() {
            await delay(1000);
            location.reload();
            //console.log(JSON.stringify($("#submitMyForm").serializeArray()));
            
        },
        error: async function() {
            await delay(1000);
            location.reload();
        }
    });
}