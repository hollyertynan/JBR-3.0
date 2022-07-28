/*
File: script.js

Authors: Tynan Hollyer, Damian Oakes

tynan_hollyer@student.uml.edu

Description: JBR3 JS file with extraneous
JS functions that don't require their
own file. 

Credit:
Proper Documentation copied from
HW 1, Part 2, Author: Wenjin Zhou
*/

var Result = {

}

var globalSearch = []
var searchBuffer = []
var wordExclusionFromSearch = ['the', 'to', 'and', 'or', 'where', 'what', 'a', 'an', 'it', 'how', 'when', 'not']

function splitAndRefineSearchList(searchToSplit) {
    var searchList = []
    searchList = searchToSplit.split(" ")
    let testList = ""
    for (i in searchList) {
        for (c in wordExclusionFromSearch) {
            if (searchList[i] == wordExclusionFromSearch[c]) {
                searchList = String(searchList)
                searchList = searchList.split(wordExclusionFromSearch[c] + ",")
                testList = searchList[0] + searchList[1]
                searchList = testList.split(",")
            } else {
                continue;
            }
        }
    }
    globalSearch = searchList.map(element => {
        
        return element.toLowerCase()
        
    })
    console.log(globalSearch)
}


// used to globally store name and iframe source from JSON tag
var tempText
var tempTitle
var tempDept
var tempSub

function autocorrect(tag) {
    let parseSearch

    for (let i in globalSearch) {
        let correctionCount = 0
        parseSearch = globalSearch[i]

        for (c = 0; c < parseSearch.length; c++) {

            if (parseSearch.length / tag.length > 1) {
                return;
            }

            // if the character is the same at the same position, add a point to the correction
            if (parseSearch.charAt(c) && parseSearch.charAt(c + 1) === tag.charAt(c) && tag.charAt(c + 1)) {
                correctionCount += 1.5
                //if the character is the same before or after the current position, add a point
            } else if (parseSearch.charAt(c) == tag.charAt(c)) {
                correctionCount += 1
            } else if (parseSearch.charAt(c) == tag.charAt(c - 1)) {
                correctionCount += .1
            } else if (parseSearch.charAt(c) == tag.charAt(c + 1)) {
                correctionCount += .1
            } else {
                correctionCount -= .2
            }

        }
        // check if too many corrrections have to be made to consider the words similar
        if (correctionCount >= tag.length / 1.4) {
            console.log(parseSearch)
            globalSearch.push(tag.toLowerCase())
            break;
        }
    }
}

function sortList() {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById("searchResults");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      b = list.getElementsByTagName("BUTTON");
      // Loop through all list items:
      for (i = 0; i < (b.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Check if the next item should
        switch place with the current item: */
        if (b[i].dataset.priority > b[i + 1].dataset.priority) {
          /* If next item is alphabetically lower than current item,
          mark as a switch and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }




// this is me going ultra god mode
function load() {
    document.getElementById("searchResults").innerHTML = ""
    
    
    // search term
    var resources = ["accounting.json", "IT.json", "product.json", "marketing.json"]
    var search = document.getElementById("searchBar").value;
    if (searchBuffer.length == 0) {
        splitAndRefineSearchList(search);
    } else {
        searchBuffer = []
        splitAndRefineSearchList(search);
    }

    //$("#searchResults").toggle(100)

    // processes for each file from resources[]
    for (let i = 0; i < resources.length; i++) {
        fetch("script/json/" + resources[i])
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(json => {
                this.answer = json
                //  length of json file loop
                for (i = 0; i < this.answer.length; i++) {
                    priorityCheck = 0
                    
                    
                    this.answer[i].tags.forEach((tag) => {
                        //console.log(priorityCheck)

                        autocorrect(tag);
                        //find tag in json object
                        if (globalSearch.includes(tag.toLowerCase()) && !searchBuffer.includes(this.answer[i].title) && authLevel >= this.answer[i].authLevel) {
                            
                            
                            priorityCheck = 0
                            searchBuffer.push(this.answer[i].title)
                            tempTitle = this.answer[i].title
                            tempText = this.answer[i].source
                            tempDept = this.answer[i].dept
                            tempSub = this.answer[i].sub

                            calculatePriority(tag, this.answer[i].title);
                            if (this.answer[i].optionalPrompts != [] || this.answer[i].optionalPrompts != undefined) {
                                optionalPromptsCheck(this.answer[i].optionalPrompts)
                            }
                            populateSearch();
                            
                        } else {
                            return;
                        }
                    })

                }
            })
    }
}

function fillIframe(iframeValue) {
    document.getElementById("resolutionframe").src = iframeValue;
    $("#resolutionframe").attr("hidden",false)
    //$("#instructionTable").attr("hidden",false);
    $("#showButtons").attr("hidden",false);
    $("#commentSpace").attr("hidden",false);
}

function searchResultsToggling() {
    $("#searchResults").fadeIn(150)
}

var dept_name = ""

    var input = document.getElementById("searchBar");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keyup", function(event) {

    
  // If the user presses the "Enter" key on the keyboard
  //if (event.key === "Backspace") {
    //barBuffer = []
    document.getElementById("searchResults").innerHTML = ""
    //globalSearch = []
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    load()
    $(".searchResultsButtons").fadeIn(250)
  //}
});


//enable auth level change TESTING PURPOSES ONLY
function authLevelTest(level) {
    authLevel = level
    alert(authLevel)
}



//function that calculates at which spot the result should pop in to
let priorityCheck = 0
let sortBuffer = []
function calculatePriority(tag, titlePass) {
    sortBuffer = []
    let titleCheck = titlePass.split(" ")
    let finCheck = []
    titleCheck.forEach(title => {
        finCheck.push(title.toLowerCase())
    })
    console.log(finCheck)
    globalSearch.forEach(word => {
        console.log(word + " " + tag)
        if (word.toLowerCase() == tag.toLowerCase() && !sortBuffer.includes(word)) {
            console.log("1")
            priorityCheck += 5
            sortBuffer.push(word)
            sortList();
        } else if (finCheck.includes(word.toLowerCase()) && !sortBuffer.includes(word)) {
            console.log("2")
            priorityCheck += 10
            sortBuffer.push(word)
            sortList();
        } else if (word.toLowerCase() == tag.toLowerCase() && sortBuffer.includes(word)) {
            console.log("3")
            priorityCheck -= .1
            sortList();
        } else if (finCheck.includes(word.toLowerCase()) && sortBuffer.includes(word)) {
            console.log("4")
            priorityCheck -= .1
            sortList();
        } else {
            priorityCheck -= 1
            sortList();
        }
    })
}


//populates the searchResults field with the info pass in through load()
//also properly hides logo and animates the search results to appear to the top of the page
function populateSearch() {
    
    Result.title = tempTitle
    Result.source = tempText
    Result.dept = tempDept
    Result.sub = tempSub

    dept_name = Result.dept
    if (Result.title == undefined) {
        return;
    }
    document.getElementById("searchResults").innerHTML += "<button data-optionalprompts=\"" + optionalPrompts + "\"  data-priority=\"" + priorityCheck + "\" class=\"list-group-item py-3 searchResultsButtons\" value=\"" + Result.source + "\" onclick=\"showPrompts(this.dataset.optionalprompts);fillIframe(this.value);getTitle(this.innerText, '"+ Result.dept +"', '" + Result.sub + "');\">" + Result.title + "</button>"
    
    Result = {}
    $(".searchResultsButtons").on({
        mouseenter: function () {
            $(this).css("background-color", "#f5f5f5");
        },
        mouseleave: function () {
            $(this).css("background-color", "#FFFFFF");
        }
    }) 
    $(".img-fluid").hide(200)
    $("#searchWrapper").animate({ top: "2%" }, 200)
    $("#searchResults").fadeIn(250)
    $(".list-group-item").click(function () {
        $("#searchResults").hide(300)
    })
}

var task_name = ""
function getTitle(title, dept, sub) {
    task_name = title;

    // create link since we're getting the title now
    const a = document.querySelector("#createTicketButton");

    if (dept == 'IT') {
        a.href = "https://aubuchonmilitia.tyndaleadvisors.com/HelpDeskRequest/Create/?computername=" + "JBR3" + "\&title=" + title + "\&category=IT%20Help%20Desk\&subcategory=" + sub + "\&description=Type here what you already tried and we'll get back to you ASAP. Thank you!"
    } else if (dept == 'Product') {
        a.href = "https://aubuchonmilitia.tyndaleadvisors.com/HelpDeskRequest/Create/?computername=" + "JBR3" + "\&title=" + title + "\&category=Product%20Team\&subcategory=" + sub + "\&description=Type here what you already tried and we'll get back to you ASAP. Thank you!"
    } else if (dept == 'Accounting') {
        a.href = "https://aubuchonmilitia.tyndaleadvisors.com/HelpDeskRequest/Create/?computername=" + "JBR3" + "\&title=" + title + "\&category=Accounting\&subcategory=" + sub + "\&description=Type here what you already tried and we'll get back to you ASAP. Thank you!"
    } else if (dept == 'Marketing') {
        a.href = "https://aubuchonmilitia.tyndaleadvisors.com/HelpDeskRequest/Create/?computername=" + "JBR3" + "\&title=" + title + "\&category=Marketing\&subcategory=" + sub + "\&description=Type here what you already tried and we'll get back to you ASAP. Thank you!"
    } else if (dept == 'Human Resources') {
        a.href = "https://aubuchonmilitia.tyndaleadvisors.com/HelpDeskRequest/Create/?computername=" + "JBR3" + "\&title=" + title + "\&category=Human%20Resources\&subcategory=" + sub + "\&description=Type here what you already tried and we'll get back to you ASAP. Thank you!"
    }
}



/*

HERE BEGINS OPTIONAL FUNCTIONS FOR THINGS
SUCH AS REGISTER NUMBER, AND OTHERS FOR FUTURE USE

*/


let promptsModaltoJS = document.getElementById("modalInput")




var optionalPrompts = []
function optionalPromptsCheck(currentSelection) {
    optionalPrompts = []
    currentSelection.forEach(selection => {
        if (!optionalPrompts.includes(selection)) {
            optionalPrompts.push(selection)
        }
    })
}

let amountToBeCompleted = 0
let promptCountAmount = 0


function countTasks() {
    promptCountAmount += 1
    if (amountToBeCompleted == promptCountAmount) {
        document.getElementById("submitModal").disabled = false
    }
}

let registerNumber = ""
function getRegisterNumber(thisRegister) {
    registerNumber = "Register " + thisRegister
}


function showPrompts(currentSelection) {
    let requiredInfo = document.getElementById("listOfRequiredInfo")
    amountToBeCompleted = 0
    promptCountAmount = 0
    currentSelection = Array(currentSelection)
    requiredInfo.innerHTML = ""
    if (currentSelection != "") {
        currentSelection.forEach(selection => {
            amountToBeCompleted += 1
            if (selection == "registerShow") {
                requiredInfo.innerHTML += `
                <div class="btn-group mb-3">
                <li class="list-group-item py-3">• Register number.</li>
                  <button type="button" class="btn btn-outline-dark dropdown-toggle" data-bs-toggle="dropdown" id="registerDropdown" aria-expanded="false">
                    Select one
                  </button>
                  <ul class="dropdown-menu dropdown-menu-right">
                    <li><a class="dropdown-item" onclick="document.getElementById('registerDropdown').innerHTML='Select one'" href="#">Select one</a></li>
                    <li><a class="dropdown-item" onclick="document.getElementById('registerDropdown').innerHTML='Register 1';countTasks();getRegisterNumber('1');" href="#">1</a></li>
                    <li><a class="dropdown-item" onclick="document.getElementById('registerDropdown').innerHTML='Register 2';countTasks();getRegisterNumber('2');" href="#">2</a></li>
                    <li><a class="dropdown-item" onclick="document.getElementById('registerDropdown').innerHTML='Register 3';countTasks();getRegisterNumber('3');" href="#">3</a></li>
                    <li><a class="dropdown-item" onclick="document.getElementById('registerDropdown').innerHTML='Register 4';countTasks();getRegisterNumber('4');" href="#">4</a></li>
                    <li><a class="dropdown-item" onclick="document.getElementById('registerDropdown').innerHTML='Register 5';countTasks();getRegisterNumber('5'');" href="#">5</a></li>
                    <li><a class="dropdown-item" onclick="document.getElementById('registerDropdown').innerHTML='Register 6';countTasks();getRegisterNumber('6');" href="#">6</a></li>
                    <li><a class="dropdown-item" onclick="document.getElementById('registerDropdown').innerHTML='Register 7';countTasks();getRegisterNumber('7');" href="#">7</a></li>
                  </ul>
                </div>`
            }
            $('#promptsModal').modal({backdrop: 'static', keyboard: false})  
            $("#promptsModal").modal("show")
        })
    } else if (currentSelection == " " || currentSelection == "") {
        $("#promptsModal").modal("hide")
    }
    
    
    

    
}