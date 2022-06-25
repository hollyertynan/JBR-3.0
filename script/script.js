var Result = {

}

var searchList = []



var tempText
var tempTitle
// this is me not going god mode
function load() {
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
                        populateSearch();
                        //find tag in json object
                        if (tag.toLowerCase() == search.toLowerCase()) {
                            tempTitle = this.answer[i].title
                            tempText = this.answer[i].source 
                        } else if(tag.toLowerCase() != search.toLowerCase()) {
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
    Result.text = tempText
    document.getElementById("searchResults").innerHTML += "<button class=\"list-group-item\">" + Result.title + "</button>"
    Result = {}
}