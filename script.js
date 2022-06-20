const wrapper = document.querySelector('.wrapper')
const inputSearch = wrapper.querySelector('input');
const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/`

const loadingMeaning = document.querySelector('.loading-meaning')

const loadData = (word, response) => {
    if (response.title)
        loadingMeaning.innerHTML = `Cannot find the meaning of ${word}`;
    else {
        loadingMeaning.innerHTML = ``;
        console.log(response);
        wrapper.classList.add("active");
        document.querySelector(".word p").innerText = response[0].word;
        let definitions = response[0].meanings[0].definitions[0];
        let synonyms = response[0].meanings[0].synonyms;
        
        let content = document.querySelector('.content');
        content.querySelector('.meaning span').innerText = definitions.definition;
        content.querySelector('.example span').innerText = definitions.example != undefined ? definitions.example : "";

        if(synonyms.length > 0)
        {
            content.querySelector('.synonym .synonym-list span').remove();
            for(var i = 0; i < 3; i++)
            {
                let tag = `<span>${synonyms[i]}, </span>`;
                content.querySelector('.synonym .synonym-list').insertAdjacentHTML("beforeend", tag);
            }
        }
        
    }
}
const fetchData = (word) => {

    loadingMeaning.innerHTML = `Searching for meaning of ${word}`;

    fetch(URL + `${word}`)
        .then(res => res.json())
        .then(response => loadData(word, response))

}
inputSearch.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value.length > 0)
        fetchData(e.target.value)
})
