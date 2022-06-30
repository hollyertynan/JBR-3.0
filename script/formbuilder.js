/*
File: auth.js

Authors: Tynan Hollyer, Damian Oakes

tynan_hollyer@student.uml.edu

Description: JBR3 JS file to build the
form used by Level 2.

Credit:
Proper Documentation copied from
HW 1, Part 2, Author: Wenjin Zhou
*/

let formResult = {}

let title = ""
let link = ""


let nameGenArray = []
var wordExcludes = ['the', 'to', 'and', 'or', 'where', 'what', 'a', 'an', 'it', 'how', 'with', 'when', 'there', 'is', 'are']

function getTitle(thisTitle) {
    title = thisTitle;
    let theseTitles = thisTitle.split(" ");
    
    for (let i in theseTitles) {
        for (let c in wordExcludes) {
            if (theseTitles[i] == wordExcludes[c]) {
                theseTitles.splice(wordExcludes[c], 1);    
            } else {
                continue;
            };
        };
    };

    nameGenArray = theseTitles.map(element => {
        return element.toLowerCase()
    });
}

function getLink(thisLink) {
    link = thisLink;
}



let finalTags = []

function getTags(thisTags) {
    let theseTags
    theseTags = thisTags.split(" ");
    for(let i in theseTags) {
        theseTags[i] = theseTags[i].toLowerCase()
    }
    finalTags = theseTags
}






function autoGenTags() {
    var resources = ["accounting.json", "IT.json", "product.json", "marketing.json"]

    for (let i = 0; i < resources.length; i++) {
        fetch("script/json/" + resources[i])
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
                                return;
                            } else if (nameGenArray[j].toLowerCase() == titleSearch[c].toLowerCase()) {
                                finalTags.push(this.answer[i].tags)
                                generateJson();
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