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
var wordExclusionFromSearch = ['the', 'to', 'and', 'or', 'where', 'what', 'a', 'an', 'it', 'how']

function splitAndRefineSearchList(searchToSplit) {
    var searchList = []
    searchList = searchToSplit.split(" ")
    for (i in searchList) {
        for (c in wordExclusionFromSearch) {
            if (searchList[i] == wordExclusionFromSearch[c]) {
                searchList.splice(wordExclusionFromSearch[c], 1)
            } else {
                continue;
            }
        }
    }
    globalSearch = searchList.map(element => {
        return element.toLowerCase()
    })
}


// used to globally store name and iframe source from JSON tag
var tempText
var tempTitle
var tempDept


function autocorrect(tag) {
    let parseSearch
    
    for (let i in globalSearch) {
        let correctionCount = 0
        parseSearch = globalSearch[i]

        for (c = 0; c < parseSearch.length; c++) {

            // if the character is the same at the same position, add a point to the correction
            if (parseSearch.charAt(c) == tag.charAt(c)) {
                correctionCount += 1.25
            //if the character is the same before or after the current position, add a point
            } else if (parseSearch.charAt(c) == tag.charAt(c - 1)) {
                correctionCount += 1
            } else if (parseSearch.charAt(c) == tag.charAt(c + 1)) {
                correctionCount += 1
            }

        }
        // check if too many corrrections have to be made to consider the words similar
        if (correctionCount >= Math.round(tag.length / 1.25)) {
            console.log(parseSearch)
            globalSearch[i] = tag.toLowerCase()
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

    $("#searchResults").toggle(100)

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
                    this.answer[i].tags.forEach((tag) => {
                        autocorrect(tag);
                        //find tag in json object
                        if (globalSearch.includes(tag.toLowerCase()) && !searchBuffer.includes(this.answer[i].title)) {
                            searchBuffer.push(this.answer[i].title)
                            tempTitle = this.answer[i].title
                            tempText = this.answer[i].source
                            tempDept = this.answer[i].dept
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

function populateSearch() {
    Result.title = tempTitle
    Result.source = tempText
    Result.dept = tempDept

    dept_name = Result.dept
    if (Result.title == undefined) {
        return;
    }
    document.getElementById("searchResults").innerHTML += "<button class=\"list-group-item py-3\" value=\"" + Result.source + "\" onclick=\"fillIframe(this.value);getTitle(this.innerText);\">" + Result.title + "</button>"
    Result = {}
    $("list-group-item").on({
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
function getTitle(title) {
    task_name = title;

    const a = document.querySelector("#createTicketButton");
    a.href = "https://aubuchonmilitia.tyndaleadvisors.com/HelpDeskRequest/Create/?computername=" + "JBR3" + "\&title=" + title + "\&category=IT%20Help%20Desk\&subcategory=Other\&description=Type here what you already tried and we'll get back to you ASAP. Thank you!"

}