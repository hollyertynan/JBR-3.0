var Result = {

}

var searchList = []



var tempText
var tempTitle
// this is me going ultra god mode
function load() {
    document.getElementById("searchResults").innerHTML = ""
    // search term
    var resources = ["accounting.json", "IT.json", "product.json", "marketing.json"]
    var search = document.getElementById("searchBar").value;

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
                        if (tag.toLowerCase() != search.toLowerCase()) {
                            return;
                        } else if (tag.toLowerCase() == search.toLowerCase() && tempTitle != tag.toLowerCase()) {
                            tempTitle = this.answer[i].title
                            tempText = this.answer[i].source
                            populateSearch();
                        } else {
                            return;
                        }
                    })

                }
            })
    }
    console.log(Result)
    
    
}

function populateSearch() {
    Result.title = tempTitle
    Result.source = tempText
    if(Result.title == undefined) {
        return;
    }
    document.getElementById("searchResults").innerHTML += "<button class=\"list-group-item py-3\" onclick=\"window.location='" + Result.source + "';\">" + Result.title + "</button>"
    Result = {}
    $("#searchResults").fadeIn(250)
    $("button").on({
        mouseenter: function(){
            $(this).css("background-color", "#f5f5f5");
        },

        mouseleave: function(){
            $(this).css("background-color", "#FFFFFF");
        }
        
    })
}