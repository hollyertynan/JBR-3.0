let Result = {

}

let resources = ["accounting.json", "IT.json", "product.json", "marketing.json"]

// this is me going god mode
function load() {
    // search term
    let search = "3"

    // processes for each file from resources[]
    for (let i in resources) {
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
                        if (tag == search) {
                            Result.title = this.answer[i].title
                            Result.text = this.answer[i].text
                            alert(Result.title + "\n"  + Result.text)
                        }
                    })
                    
                }
            })

    }


}