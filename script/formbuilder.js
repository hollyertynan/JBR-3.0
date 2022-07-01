let formResult = {}

let title = ""
let link = ""
let finalTags = []

let nameGenArray = []
var wordExcludes = ['the', 'to', 'and', 'or', 'where', 'what', 'a', 'an', 'it', 'how', 'with', 'when', 'there', 'is', 'are', 'on', "of"]

function getTitle(thisTitle) {
    title = thisTitle;
    let theseTitles = thisTitle.split(" ");
    
        for (let c in wordExcludes) {
            if (!theseTitles.includes(wordExcludes[c])) {
                continue;
            } else {
                theseTitles.splice(theseTitles.indexOf(wordExcludes[c]), 1)
            };
    };

    
    nameGenArray = theseTitles.map(element => {
        if (element == "") {
            return;
        } else {
            return element.toLowerCase()
        }
    });

    console.log(nameGenArray)
}

function getLink(thisLink) {
    link = thisLink;
}





function getTags(thisTags) {
    let theseTags
    theseTags = thisTags.split(" ");
    for(let i in theseTags) {
        theseTags[i] = theseTags[i].toLowerCase()
    }
    finalTags = theseTags
}



function pushNameGentoTags() {
    nameGenArray.forEach((nameTag) => {
        finalTags.push(nameTag)
    })

    generateJson();
}


function autoGenTags() {
    var resources = ["accounting.json", "IT.json", "product.json", "marketing.json"]

    for (let h = 0; h < resources.length; h++) {
        fetch("script/json/" + resources[h])
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(json => {
                let titleSearch
                this.answer = json
                for (i = 0; i < this.answer.length; i++) {
                    titleSearch = this.answer[i].title.split(" ")
                    for (let j in nameGenArray) {               
                        for (let c in titleSearch) {
                            if (finalTags.join().toLowerCase() == this.answer[i].tags.join().toLowerCase()) {
                                continue;
                            } else if (nameGenArray[j].toLowerCase() == titleSearch[c].toLowerCase()) {
                                for (let y in this.answer[i].tags) {
                                    finalTags.push(this.answer[i].tags[y])
                                }
                            } else {
                                continue;
                            }
                        }
                    }
                }
                
            })
        
    }
    
}

function generateJson() {
    
    const jayson = {
        title: title,
        tags: finalTags,
        source: link
    }

    var finalJSON = JSON.stringify(jayson)
    saveFile(finalJSON)
    
}



let saveFile = (save) => {
    const sFileName = title;


    data = save;

    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}