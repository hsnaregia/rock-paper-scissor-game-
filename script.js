const first = document.querySelector(".container1");
const play_btn = document.getElementById("play");
const second = document.querySelector(".container2");
const rem = document.getElementById("rematch");
const third = document.querySelector(".container3");
const time = document.getElementById("timing");
const enemy = document.getElementById("op_choice");

const rock = document.getElementById("rck");
const paper = document.getElementById("ppr");
const scis = document.getElementById("scss");

const uScore = document.getElementById("u_score");
const oScore = document.getElementById("o_score");

const us = document.querySelector(".choice-bck");
const us_aftr = document.querySelector(".left-bck");

const ch_img = document.getElementById("ch-img");

const enemy_ch = document.getElementById("op_img");

const end1 = document.getElementById("w-l");
const end2 = document.getElementById("s_show");
let us_score = 0;
let gameInterval;
let userChoice = null;
let op_score = 0;

start();

function start() {
  play_btn.addEventListener("click", function () {
    first.classList.remove("show");
    first.classList.add("hide");
    second.classList.remove("hide");
    second.classList.add("show");
    play();
  });
}
//  play section done

function play() {
  let round = 0;
  const total = 5;

  function playRnd() {
    if (round >= total) {
      showEnd();
      return;
    }

    let timer = 5;
    const bot = bot_ch();

    console.log(userChoice);
    console.log(bot);

    const timerInterval = setInterval(() => {
      timer--;
      time.innerText = timer;

      if (timer <= 0) {
        clearInterval(timerInterval);
        if (userChoice !== null) {
          display(userChoice, bot);
          userChoice = null;
          round++;

          setTimeout(playRnd, 2000);
        } else {
          userChoice = -1;
          display(userChoice, bot);
          userChoice = null;
          round++;

          setTimeout(playRnd, 2000);
        }
      }
    }, 1000);

    rock.onclick = () => handleUserChoice(0);
    paper.onclick = () => handleUserChoice(1);
    scis.onclick = () => handleUserChoice(2);

    us.classList.remove("hide");
    us.classList.add("show");
    us_aftr.classList.remove("show");
    us_aftr.classList.add("hide");
    ch_img.classList.add("hide");
    ch_img.classList.remove("show");
  }

  playRnd();
}

function handleUserChoice(choice) {
  userChoice = choice;
  // Remove event listeners
  rock.onclick = null;
  paper.onclick = null;
  scis.onclick = null;
}



// game display section
// getting the pictures from assets folder
function displayImage(imageName1, imageName2) {
  // Select the img element
  const imgElement = document.getElementById("op_img");
  const img_op = document.getElementById("ch-img");

  console.log(imageName1, imageName2);
  if (imageName2 == 0) {
    imgElement.src = `/assets/icons8-rock-96.png`;
  } else if (imageName2 == 1) {
    imgElement.src = "/assets/icons8-paper-100.png";
  } else if (imageName2 == 2) {
    imgElement.src = `/assets/icons8-scissor-100.png`;
  }
  if (imageName1 == 0) {
    img_op.src = `/assets/icons8-rock-96.png`;
  } else if (imageName1 == 1) {
    img_op.src = "/assets/icons8-paper-100.png";
  } else if (imageName1 == 2) {
    img_op.src = `/assets/icons8-scissor-100.png`;
  }else if(imageName1 == -1){
    img_op.src = "/assets/icons8-no-entry-96.png"
  }
  ch_img.classList.remove("hide");
  ch_img.classList.add("show");
  console.log(imgElement.src);
}

function display(user, bot) {
  const rock = 0;
  const paper = 1;
  const scissor = 2;

  if (user == rock) {
    if (bot == rock) {
    } else if (bot == paper) {
      op_score += 100;
    } else if (bot == scissor) {
      us_score += 100;
    }
  } else if (user == paper) {
    if (bot == rock) {
      us_score += 100;
    } else if (bot == paper) {
    } else if (bot == scissor) {
      op_score += 100;
    }
  } else if (user == scissor) {
    if (bot == rock) {
      op_score += 100;
    } else if (bot == paper) {
      us_score += 100;
    } else if (bot == scissor) {
    }
  } else if (user == -1) {
    op_score += 100;
  }
  us.classList.remove("show");
  us.classList.add("hide");
  us_aftr.classList.remove("hide");
  us_aftr.classList.add("show");
  enemy_ch.classList.add("show");
  enemy_ch.classList.remove("hide");
  displayImage(user, bot);
  oScore.innerText = op_score;
  uScore.innerText = us_score;
}
// game display end

function bot_ch() {
  const x = Math.floor(Math.random() * 3);
  return x;
}

function showEnd() {
  second.classList.add("hide");
  second.classList.remove("show");
  third.classList.add("show");
  third.classList.remove("hide");
  if (us_score > op_score) {
    end1.innerHTML = `<p>You Won</p>`;
  } else if (op_score > us_score) {
    end1.innerHTML = `<p>You lost</p>`;
    end1.style.backgroundColor = "red";
  } else {
    end1.innerHTML = `<p>Its a Draw</p>`;
    end1.style.backgroundColor = "yellow";
  }
  end2.innerHTML = `<p>${us_score}-${op_score}</p>`;
  restart();
}

function restart() {
  rem.addEventListener("click", function () {
    third.classList.add("hide");
    third.classList.remove("show");
    first.classList.remove("hide");
    first.classList.add("show");
    us_score = 0;
    op_score = 0;
  });
}
