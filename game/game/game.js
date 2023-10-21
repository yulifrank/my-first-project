let ball, paddle, bricks = [], score = 0, num = 0;
let playerData = JSON.parse(localStorage.getItem("player"));

ball = document.getElementById("ball");
paddle = document.getElementById("paddle");
let ballX = 290;
let ballY = 275;
let dx = 1.5;
let dy = -1.5;
let interval
let move
let brickCount = bricks.length;
var levels = document.querySelectorAll(".levels");
for (let i = 0; i < levels.length; i++) {
    levels[i].addEventListener("click", function () {
        startgame(i + 1);
    });
}

function startgame(level) {
    var gameAudio = document.getElementById("gameAudio");
    gameAudio.play();
    document.querySelector("#ball").style.display = "block";
    document.querySelector("#paddle").style.display = "block";
    document.getElementById("paddle").style.width = 130 * (4 - level) + "px";
    dx *= level + 1
    dy *= level + 1
    document.getElementById("ch").style.display = "none";
    document.getElementById("choose").style.display = "none";
    move = document.addEventListener("mousemove", movePaddle);
    interval = setInterval(moveBall, 10);
    drawTheBreaks();
}
function gameover() {
    num++;
    if (num % 2 == 1)
        document.getElementById("gamerisult").style.display = "none";
    else
        document.getElementById("gamerisult").style.display = "block";
    if (num > 7) {
        clearInterval(interval);
        window.location.href = "game.html";
    }

}
function drawTheBreaks() {
    let row, col;
    for (let i = 0; i < 4; i++) {
        row = document.createElement("div");
        row.setAttribute("id", "row" + i);
        for (let j = 0; j < 6; j++) {
            col = document.createElement("div");
            col.setAttribute("id", "brick_number" + j + 5 * i);
            col.setAttribute("class", "brick");
            col.classList.add("brick_row" + i);
            row.appendChild(col);
            bricks.push(col);
        }
        document.getElementById("allbricks").appendChild(row);
    }
}
function moveBall() {
    ballX += dx;
    ballY += dy;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    //בדיקה אם נתקע בצד
    if (ballX <= 0 || ballX + 20 >= 750) {
        dx = -dx;
    }
    //בדיקה אם נתקע בצד

    if (ballY <= 0) {
        dy = -dy;
    }
//"בדיקה אם נתקע ב"פדל,
    if (
        ballY + 20 >= 530 &&
        ballX + 20 >= paddle.offsetLeft &&
        ballX <= paddle.offsetLeft + paddle.offsetWidth
    ) {
        dy = -dy;
        let udio = document.getElementById("good");
        udio.play();

    }
    // בדיקות אם נתקע בלבנים
    for (var i = 0; i < bricks.length; i++) {
        let brick = bricks[i];
        if (
            brick.style.background !== "rgba(255, 99, 71, 0)" &&
            ballY <= brick.offsetTop + brick.offsetHeight &&
            ballY + 20 >= brick.offsetTop &&
            ballX + 20 >= brick.offsetLeft &&
            ballX <= brick.offsetLeft + brick.offsetWidth
        ) {
            dy = -dy;
            brick.style.background = "rgba(255, 99, 71, 0)"
            score++;
            let udio = document.getElementById("good");
            udio.play();
            document.querySelector("#score").innerHTML = "your <br> score<br> is: " + score
            //בדיקה אם ניצח
            if (score == 24) {
                let gameAudio = document.getElementById("gameAudio");
                gameAudio.remove();
                gameAudio = document.getElementById("close");
                gameAudio.play();
                clearInterval(interval);
                clearInterval(move);
                updateScore();
                document.querySelector("#gameContainer").style.display = "none";
                document.querySelector("#gamerisult").innerHTML = "your top is " + playerData.score + "<br>winner!!!!"
                document.getElementById("gamerisult").style.display = "block";
                interval = setInterval(gameover, 500);
            }
        }
    }
    //בדיקה אם נפל הכדור-game over
    if (ballY >= 540) {
        clearInterval(interval);
        clearInterval(move);
        updateScore()
        let gameAudio = document.getElementById("gameAudio");
        gameAudio.remove();
        gameAudio = document.getElementById("over");
        gameAudio.play();
        document.querySelector("#gameContainer").style.display = "none";
        document.getElementById("gamerisult").innerHTML = "game over <br>" + "your top is " + playerData.score;
        document.getElementById("gamerisult").style.display = "block";
        interval = setInterval(gameover, 400);
    }
}
function movePaddle(event) {
    var containerX = gameContainer.offsetLeft;
    var mouseX = event.clientX - containerX;
    if (mouseX > 0 && mouseX < 550) {
        paddle.style.left = mouseX - 50 + "px";
    }
}

function updateScore() {
    if (score > playerData.score)
        playerData.score = score;
    localStorage.setItem("player", JSON.stringify(playerData));
}

function getPlayerData() {
    if (playerData) {
        // עושה משהו עם נתוני המשתמש, לדוגמה, מציג את השיא שלו
        console.log("שם: " + playerData.name);
        console.log("משפחה: " + playerData.family);
        console.log("שיא: " + playerData.score);
    }
}