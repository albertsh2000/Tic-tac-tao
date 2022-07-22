const boxes = document.querySelectorAll(".box")
const statusText = document.getElementById("status_text")
const modal = document.getElementById("modal_container")
const winnerName = document.querySelector(".winner_name")
const restartBtn = document.querySelector(".restart_btn")
const winConditions = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
]

let options = ["", "", "", "", "", "", "", "", ""]

let currentPlayer = "X"
let running = false

startGame()

function startGame() {
   boxes.forEach((box) => box.addEventListener("click", boxClicked))
   restartBtn.addEventListener("click", restartGame)
   statusText.textContent = `${currentPlayer}'s turn`
   running = true
}

function boxClicked() {
   const boxIndex = this.getAttribute("boxIndex")
   if (options[boxIndex] != "" || !running) return

   if (currentPlayer == "X") {
      this.style.color = " rgb(243 0 0)"
   } else if (currentPlayer == "O") {
      this.style.color = "#ffd60a"
   }
   updateBox(this, boxIndex)
   checkWinner()
}

function updateBox(box, index) {
   options[index] = currentPlayer
   box.textContent = currentPlayer
}

function changePlayer() {
   currentPlayer = currentPlayer == "X" ? "O" : "X"
   statusText.textContent = `${currentPlayer}'s turn`
}

function checkWinner() {
   let roundWon = false

   for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i]
      boxA = options[condition[0]]
      boxB = options[condition[1]]
      boxC = options[condition[2]]

      if (boxA == "" || boxB == "" || boxC == "") {
         continue
      }
      if (boxA == boxB && boxB == boxC) {
         roundWon = true
         break
      }
   }
   if (roundWon) {
      drawWinnerData()

      restartBtn.classList.add("disabled")
      running = false
   } else if (!options.includes("")) {
      drawGame()

      restartBtn.classList.add("disabled")
      running = false
   } else {
      changePlayer()
   }
}

function drawWinnerData() {
   modal.innerHTML = `
      <div class="modal_header">
           <div>🥳</div>
            <div>🥳</div>
      </div>       
      <h2 class="winner_name">Congurlations player ${currentPlayer} wins</h2>
       <div>🏆</div>
      <button class="play_again">Play again</button>
      `
   modal.classList.add("active")
   const playAgainBtn = modal.querySelector(".play_again")
   playAgainBtn.addEventListener("click", playAgain)
}

function drawGame() {
   modal.innerHTML = `
   <h2 class="winner_name">Draw</h2>
   <div>🤝</div>
   <button class="play_again">Play again</button>
   `
   modal.classList.add("active")

   const playAgainBtn = modal.querySelector(".play_again")
   playAgainBtn.addEventListener("click", playAgain)
}

function playAgain() {
   modal.classList.remove("active")
   restartGame()
}

function restartGame() {
   restartBtn.classList.remove("disabled")
   currentPlayer = "X"
   options = ["", "", "", "", "", "", "", "", ""]
   statusText.textContent = `${currentPlayer}'s turn`
   boxes.forEach((box) => (box.textContent = ""))
   running = true
}
