console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;


music.loop = true; // Make the music loop continuously
const musicToggleButton = document.getElementById('musicToggle');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

const toggleMusic = () => {
    if (music.paused) {
        music.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        music.pause();
        pauseIcon.classList.add('hidden');
        playIcon.classList.remove('hidden');
    }
}

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}

// Function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            isgameover = true
            gameover.play();
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    })
}

// Function to update the turn info text and style
const updateTurnInfo = () => {
    const info = document.getElementsByClassName("info")[0];
    info.innerText = "Turn for " + turn;
    if (turn === "X") {
        info.classList.remove('text-pink-500', 'shadow-pink-500/50');
        info.classList.add('text-cyan-400', 'shadow-cyan-400/50', 'text-glow');
    } else {
        info.classList.remove('text-cyan-400', 'shadow-cyan-400/50');
        info.classList.add('text-pink-500', 'shadow-pink-500/50', 'text-glow');
    }
}

// Game Logic
// --- NEW: Add event listener for the music button ---
musicToggleButton.addEventListener('click', toggleMusic);
// --- END NEW ---

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === '' && !isgameover){
            boxtext.innerText = turn;
            if (turn === 'X') {
                boxtext.classList.add('text-cyan-400', 'shadow-cyan-400', 'text-glow');
            } else {
                boxtext.classList.add('text-pink-500', 'shadow-pink-500', 'text-glow');
            }
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover){
                updateTurnInfo();
            }
        }
    })
})

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
        element.classList.remove('text-cyan-400', 'shadow-cyan-400', 'text-pink-500', 'shadow-pink-500', 'text-glow');
    });
    turn = "X";
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
    updateTurnInfo();
})

// Initialize the turn info on page load
window.onload = updateTurnInfo;