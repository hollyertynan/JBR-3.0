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
    document.forms['submitMyForm'].elements['unresolvedSearch'].value = unresolvedSearchTerms;
    
    document.getElementById("submittext").innerHTML = "";
    $("#submittext").addClass("spinner-border text-light");
    $("#submitcheck").removeClass("bi bi-check-circle");
    document.getElementById("submissionButton").disabled = true;

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbzAxd1f8lMFz9BZ8TCxtTDY6MZXOgE7_kGaOVLb1lXWzAD6q2BgbMVsVRp3r-3XIdz-Wg/exec",
        type: "post",
        data:$("#submitMyForm").serializeArray(),
        
        
        
        success: async function() {
            console.log(JSON.stringify($("#submitMyForm").serializeArray()))
            console.log("hello")
            await delay(100);
            location.reload();
            
        },
        error: async function() {
            await delay(100);
            location.reload();
        }
    });
}