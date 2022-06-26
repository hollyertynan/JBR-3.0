var Result = {

}

var globalSearch = []
var searchBuffer = []
var wordExclusionFromSearch = ['the', 'to', 'and', 'or', 'where', 'what', 'a', 'an', 'it', 'how']

function splitAndRefineSearchList(searchToSplit) {
    var searchList = []
    searchList = searchToSplit.split(" ")
    let fuck
    for (i in searchList) {
        for (c in wordExclusionFromSearch) {
            if (searchList[i] == wordExclusionFromSearch[c])  {
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


var tempText
var tempTitle
// this is me going ultra god mode
function load() {
    document.getElementById("searchResults").innerHTML = ""
    // search term
    var resources = ["accounting.json", "IT.json", "product.json", "marketing.json"]
    var search = document.getElementById("searchBar").value;
    splitAndRefineSearchList(search);
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
                        //find tag in json object
                        if (globalSearch.includes(tag.toLowerCase()) && !searchBuffer.includes(this.answer[i].title)) {
                            searchBuffer.push(this.answer[i].title)
                            console.log(tag)
                            tempTitle = this.answer[i].title
                            tempText = this.answer[i].source
                            populateSearch();
                        } else {
                            return;
                        }
                        /* if (tag.toLowerCase() != globalSearch[i].toLowerCase()) {
                            return;
                        } else if (tag.toLowerCase() == globalSearch[i].toLowerCase() && tempTitle != tag.toLowerCase()) {
                            
                        } else {
                            return;
                        } */
                    })

                }
            })
    }
    console.log(Result)
}

function fillIframe(iframeValue) {
    document.getElementById("resolutionframe").src = iframeValue;
    $("#resolutionframe").show(100)
}

function populateSearch() {
    Result.title = tempTitle
    Result.source = tempText
    if (Result.title == undefined) {
        return;
    }
    document.getElementById("searchResults").innerHTML += "<button class=\"list-group-item py-3\" value=\"" + Result.source + "\" onclick=\"fillIframe(this.value)\">" + Result.title + "</button>"
    Result = {}
    $("#searchResults").fadeIn(250)
    $("button").on({
        mouseenter: function () {
            $(this).css("background-color", "#f5f5f5");
        },

        mouseleave: function () {
            $(this).css("background-color", "#FFFFFF");
        }

    })
    $("#logoAubuchon").hide(200)
    $("#searchWrapper").animate({top: "2%"}, 200)
    $(".list-group-item").click(function() {
        $("#searchResults").hide(300)
    })
}