
    let playerScore = 0
    let computerScore = 0
    const max_rounds = 5
    let finishedRound = 0
    let draw = 0
    let realRounds = 0

    const reset = document.querySelector("#reset")
    reset.style.display = "none";

    /**
     * Tis function randomly generates either Rock Paper or Scissors
     */
    function computerPlay() {
        let num = Math.floor(Math.random() * 3)
        if (num == 0) {
            return "Rock"
        }
        else if (num == 1) {
            return "Paper"
        }
        else {
            return "Scissors"
        }
    }

    /**
     *  Takes a string input and converts its first character to uppercase and the other ones to lower.
     */
    function fistUpper(str) {
        return (str.charAt(0).toUpperCase() + str.substr(1).toLowerCase())
    }

    /**
     *  Creates the string for the final result, and displays it.
     *  It disables all the buttons in the game and enadles a "reset" button.
     */
    function finalResult() {
        //The latter part of the final message
        let finalScore;
        let final = document.querySelector("#final-result");

        if (playerScore > computerScore) {
            finalScore = "You Win!"
        }
        else if (playerScore < computerScore) {
            finalScore = "You Lost!"
        }
        else {
            finalScore = "It's a Draw!"
        }
        final.textContent = finalScore;
        const buttons = document.querySelectorAll(".button");
        buttons.forEach(btn => {
            btn.disabled = true;
        });
        reset.style.display = "block";
    }

    /**
     *  Resets the game including scores and rounds, reenables the game buttons,
     *  and calls the displayResult to delete the previous score from the scren.
     */
    function resetGame() {
        const buttons = document.querySelectorAll(".button");
        buttons.forEach(btn => {
            btn.disabled = false;
        });
        const text = document.querySelector("#result");
        reset.style.display = "none";
        playerScore = 0;
        computerScore = 0;
        finishedRound = 0;
        draw = 0;
        realRounds = 0;
        displayResult();
        text.textContent = "It's your turn!";
    }

    /**
     *  Plays a round, takes two inputs the players and the computers choice.
     *  It returns the result in string which -> includes "You Win" if you win,
     *  and includes "You Lose" if you lose.
     */
    function playRound(playerSelection, computerSelection) {
        player = fistUpper(playerSelection)
        if (player == computerSelection) {
            return "It's a draw! You both chose" + " " + player
        }
        else if (player == "Rock" && computerSelection == "Scissors") {
            return "You Win! Rock beats Scissors"
        }
        else if (player == "Rock" && computerSelection == "Paper") {
            return "You Lose! Paper beats Rock"
        }
        else if (player == "Paper" && computerSelection == "Scissors") {
            return "You Lose! Scissors beats Paper"
        }
        else if (player == "Paper" && computerSelection == "Rock") {
            return "You Win! Paper beats Rock"
        }
        else if (player == "Scissors" && computerSelection == "Rock") {
            return "You Lose! Rock beats Scissors"
        }
        else if (player == "Scissors" && computerSelection == "Paper") {
            return "You Win! Scissors beats Paper"
        }
        else {
            return "Your input is not correct.. Try \"Rock\" \"Paper\" or \"Scissors\""
        }
    }

    /**
     *  This displays the final score if the game has finished (finishedRounds >= max rounds),
     *  Else, this displays nothing in the final-results row.
     */
    function displayResult() {
        const res = document.querySelector("#result");
        const description = document.querySelector("#description");
        const pSocre = document.querySelector("#pScore");
        const cScore = document.querySelector("#cScore");
        const final = document.querySelector("#final-result")

        resultArray = result.split("!");
        console.log(resultArray);
        res.textContent = resultArray[0] + "!";
        description.textContent = resultArray[1];
        pScore.textContent = `You : ${playerScore}`;
        cScore.textContent = `Computer : ${computerScore}`;

        if (finishedRound >= max_rounds) {
            finalResult();
        }
        else {
            final.textContent = "";
        }
    }

    /**
     *  Plays a game, and displays the result
     */
    function game(playerSelection, computerSelection) {
        //playerSelection = prompt("It's your turn! Rock Paper or Scissors?")
        result = playRound(playerSelection, computerSelection)
        if (result.includes("You Win")) {
            playerScore++
            finishedRound++
        }
        else if (result.includes("You Lose")) {
            computerScore++
            finishedRound++
        }
        else {
            draw++
        }
        displayResult();
    }

    const buttons = document.querySelectorAll(".button");
    buttons.forEach(element => {
        element.addEventListener("click", () =>
            game(element.id, computerPlay())
        );
    });

    reset.addEventListener("click", () => resetGame());