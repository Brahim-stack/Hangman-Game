const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

lettersArray.forEach(letter =>{

    let span = document.createElement("span");
    span.appendChild(document.createTextNode(letter));
    span.className = "letter-box"
    lettersContainer.appendChild(span)
})
const words = {
    programming : ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies : ["prestige", "inception", "parasite", "intersteller", "whiplash", "memento", "coco", "up"],
    people : ["albert einstein", "hitchcock", "alexander", "cleopatra", "mahatma ghamdi"],
    countries : ["morocco", "spain", "palestine", "greece", "italy", "france", "irland"],
}
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randonPropName = allKeys[randomPropNumber];

let randomPropValue = words[randonPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumber];

document.querySelector(".game-info .game-category span").innerHTML = randonPropName;

let lettersGuessCountainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueName); 

lettersAndSpace.forEach(letter =>{
    let emptySpan = document.createElement("span");
    if(letter === " "){
        emptySpan.className = "with-space";
    }
    lettersGuessCountainer.appendChild(emptySpan);
});

let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {

    let theStatus = false;

    if(e.target.className === "letter-box"){

        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();

        let theChosenWord = Array.from(randomValueName.toLowerCase());

        // console.log(lettersAndSpace)

        lettersAndSpace.forEach((wordLetter, wordIndex) => {

            if(theClickedLetter == wordLetter){

                theStatus = true;

                guessSpans.forEach((span, spanIndex) =>{

                    if(wordIndex === spanIndex){
                        span.innerHTML = theClickedLetter;
                    }
                });
            }
        });
        if(theStatus !== true){

            wrongAttempts++;

            theDraw.classList.add(`wrong-${wrongAttempts}`);

            document.getElementById("fail").play();

            if(wrongAttempts === 8){
                endGame();
                lettersContainer.classList.add("finished"); 
            }
        } else {

            document.getElementById("success").play();
        }
    }
});
function endGame() {

    let div = document.createElement("div");
    div.appendChild(document.createTextNode(`Game Over! The Word Is ${randomValueName.toUpperCase()}`));
    div.className = "popup";

    document.body.appendChild(div);
}