// getting the references of the html elements
let form = document.querySelector(".form");
let wordinput = document.querySelector(".wordinput");
let displaymeaning = document.querySelector('.displaymeaning');

async function getMeaning(word){
  try{
     // make an api call to get the response with the word, meanings, definitions,etc.
     let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
       
                                         
       let data = await response.json();  // parse the response data to javascript object
       console.log(data);
       
       let meanings = data[0].meanings;   // get the meanings from the data object and store it in a variable
        console.log(meanings);

      let div = document.createElement('div');

      let list = document.createElement('ul');

      list.style.listStyleType ="none";

      for (let partofspeech of meanings){
        let listitems = document.createElement('li');
        listitems.innerHTML =`part Of SPeech: <b>${partofspeech.partOfSpeech}</b>`;

        let orderlist = document.createElement('ol');

             // loop through the definitions of every part of speech
            // create a list item and append it to the ordered list
            for (let definition of partofspeech.definitions) {
              let listitems = document.createElement('li');
              listitems.innerHTML = `${definition.definition}`;
              orderlist.appendChild(listitems);
          }
          listitems.appendChild(orderlist);

          list.appendChild(listitems);

      }
        displaymeaning.innerHTML='';

        displaymeaning.appendChild(div);
        displaymeaning.appendChild(list);


  }catch(error){
    console.log('error fetching the meaning', error);

  }
}
            

// attach a submit event to the form element
form.addEventListener('submit', (event) => {
  // prevents the default submit behaviour of the form
  event.preventDefault();

  // get the word the user typed in the search box
  let word = wordinput.value;
  console.log(word);

 getMeaning(word);

});

// get the reference of the button
let buttonSearch = document.querySelector('.buttonsearch');

// attach the click event to the search button
buttonSearch.addEventListener('click', (event) => {
    event.preventDefault();

    // get the word the user typed in the search box
    let word = wordinput.value;
    // calling the function with argument 
    getMeaning(word);
});


