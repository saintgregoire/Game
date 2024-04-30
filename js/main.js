function chooseWeapon() {
  const startButton = document.querySelector(".yes");
  const sword = document.querySelector(".sword");
  const spear = document.querySelector(".spear");
  const pistol = document.querySelector(".pistol");
  const gun = document.querySelector(".gun");
  const orksEye = document.querySelectorAll(".eye");
  const tableText = document.querySelector(".table_text");
  let vieportWidth = window.innerWidth || document.documentElement.clientWidth;

  const weapons = [sword, spear, pistol, gun];

  startButton.classList.add("hidden");
  tableText.innerText = "Choose your weapon";
  tableText.classList.add("appearance");

  weapons.forEach((item) => {
    item.classList.remove("hidden");
    item.classList.add("appearance");
  });

  weapons.forEach((item) => {
    item.Listener("click", (event) => {
      let choosedWeapon = event.target;
      item.style.cursor = "url(../img/cursor.png), auto";
      // ????????????????????????????????????????????? REMOVE EYE ANIMATION
      orksEye.forEach((item) => {
        item.style.animation = "none";
      });
      //????????????????????????????????????????????? CHOOSED WEAPON
      weapons.forEach((item) => {
        item.classList.remove('appearance')
        if (item !== chooseWeapon && !item.contains(choosedWeapon)) {
          item.classList.add("hidden");
        } else if (item === pistol) {
          item.classList.add('pistol_ready');
        } else if (item === gun) {
          item.classList.add('gun_ready')
        } else if (item === spear) {
          item.classList.add('spear_ready');
        }
        else {
          item.classList.add('sword_ready');
        }
      });
      tableText.classList.remove("appearance");
      cardAndHealthShowing();
    });
  });
}

//!!!!!!!!!!!!!!!!!!!!!!!!!! MATH RANDOM

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CARDS AND HEALTH SHOWING

function cardAndHealthShowing(
  tableText = document.querySelector(".table_text")
) {
  const cards = document.querySelectorAll(".card");
  const healthFields = document.querySelectorAll(".field");
  const orkHealthInput = document.querySelector("#orks_health");
  const userHealthInput = document.querySelector("#user_health");
  const orkHealthSPan = document.querySelector(".ork_label > span");
  const userHealthSPan = document.querySelector(".user_label > span");

  let orkHealthPoints = Number(orkHealthInput.value);
  let userHealthPoints = Number(userHealthInput.value);

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList.contains("clone")) {
      cards[i].remove();
    }
  }

  tableText.innerText = "Choose your card";
  tableText.style.color = "white";
  cards.forEach((card) => {
    card.classList.remove("hidden");
    card.classList.add("appearance");
  });

  orkHealthSPan.innerText = `${orkHealthPoints}`;
  if (orkHealthPoints > 50) {
    orkHealthSPan.style.color = "greenyellow";
  } else if (orkHealthPoints <= 50) {
    orkHealthSPan.style.color = "red";
  }
  userHealthSPan.innerText = `${userHealthPoints}`;
  if (userHealthPoints > 50) {
    userHealthSPan.style.color = "greenyellow";
  } else if (userHealthPoints <= 50) {
    userHealthSPan.style.color = "red";
  }

  healthFields.forEach((field) => {
    if (field.classList.contains("hidden")) {
      field.classList.remove("hidden");
    }
  });
  cardClick();
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! HIDE CARDS

function hideOtherCards(
  event,
  tableText = document.querySelector(".table_text")
) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card !== event.currentTarget && !card.contains(event.currentTarget)) {
      card.classList.add("hidden");
      card.classList.remove("appearance");
    } else if (
      card === event.currentTarget ||
      card.contains(event.currentTarget)
    ) {
      let userCard = card;
      roundProcess(userCard);
    }
  });

  tableText.innerText = "";

  cards.forEach((card) => {
    card.removeEventListener("click", hideOtherCards);
  });
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CARD CLICK

function cardClick(cards = document.querySelectorAll(".card")) {
  cards.forEach((card) => {
    card.addEventListener("click", hideOtherCards);
  });
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ROUND PROCESS

function roundProcess(
  userCard,
  cards = document.querySelectorAll(".card"),
  tableText = document.querySelector(".table_text")
) {
  const cardsContainer = document.querySelector(".card_box");
  let orkCard = cards[getRandomInt(0, 3)];

  setTimeout(() => {
    if (orkCard !== userCard) {
      orkCard.classList.remove("hidden");
      orkCard.classList.add("appearance");
    } else if (orkCard.id === userCard.id) {
      const dublicatedCard = userCard.cloneNode(true);
      cardsContainer.appendChild(dublicatedCard);
      dublicatedCard.classList.add("clone");
      tableText.innerText = "DRAW";
      tableText.style.color = "orange";
    }
    progressChecking(userCard, orkCard);
  }, 1500);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! CHECK PROGRESS

function progressChecking(
  userCard,
  orkCard,
  orkHealthSPan = document.querySelector(".ork_label > span"),
  userHealthSPan = document.querySelector(".user_label > span"),
  tableText = document.querySelector(".table_text"),
  orkHealthInput = document.querySelector("#orks_health"),
  userHealthInput = document.querySelector("#user_health"),
  cards = document.querySelectorAll(".card"),
  orkFist = document.querySelector(".right_fist"),
  orkHand = document.querySelector(".hand_right"),
  glassEffect = document.querySelector(".crash_glass"),
  orkEyes = document.querySelectorAll(".eye"),
  orkEyesDie = document.querySelectorAll(".eye_x"),
  ork = document.querySelector(".ork")
) {
  if (
    (userCard.id === "scissors_card" && orkCard.id === "paper_card") ||
    (userCard.id === "paper_card" && orkCard.id === "stone_card") ||
    (userCard.id === "stone_card" && orkCard.id === "scissors_card")
  ) {
    tableText.innerText = "YOU WIN";
    tableText.style.color = "greenyellow";
    orkHealthInput.value = Number(orkHealthInput.value) - 10;
    orkHealthSPan.innerText = `${orkHealthInput.value}`;
    userStrike();
  } else if (
    (orkCard.id === "scissors_card" && userCard.id === "paper_card") ||
    (orkCard.id === "paper_card" && userCard.id === "stone_card") ||
    (orkCard.id === "stone_card" && userCard.id === "scissors_card")
  ) {
    tableText.innerText = "YOU LOSE";
    tableText.style.color = "red";
    userHealthInput.value = Number(userHealthInput.value) - 10;
    userHealthSPan.innerText = `${userHealthInput.value}`;
    orkFist.style.transform = "rotate(52deg)";
    orkHand.classList.add("ork_punch");
    setTimeout(() => {
      glassEffect.classList.remove("hidden");
      orkPlay();
    }, 300);
    setTimeout(() => {
      orkFist.style.transform = "rotate(0deg)";
      orkHand.classList.remove("ork_punch");
      glassEffect.classList.add("hidden");
    }, 1000);
  }
  setTimeout(() => {
    if (Number(userHealthInput.value) <= 0) {
      cards.forEach((card) => {
        if (!card.classList.contains("hidden")) {
          card.classList.add("hidden");
        }
      });
      tableText.innerText = "YOU LOSE";
      tableText.style.color = "red";
      tableText.style.fontSize = "35px";
      orkLaughter();
      newGame();
    } else if (Number(orkHealthInput.value) <= 0) {
      cards.forEach((card) => {
        if (!card.classList.contains("hidden")) {
          card.classList.add("hidden");
        }
      });
      tableText.innerText = "YOU WIN";
      tableText.style.color = "greenyellow";
      tableText.style.fontSize = "35px";
      bravo();
      orkEyes.forEach((eye) => {
        eye.classList.add("hidden");
      });
      orkEyesDie.forEach((eye) => {
        eye.classList.remove("hidden");
      });
      ork.classList.add("ork_disappear");
      newGame();
    } else {
      cardAndHealthShowing();
    }
  }, 1500);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! USER WEAPON ANIMATION

function userStrike() {
  const sword = document.querySelector(".sword");
  const spear = document.querySelector(".spear");
  const pistol = document.querySelector(".pistol");
  const gun = document.querySelector(".gun");
  const pistolBullet = document.querySelector(".pistol_bullet");
  const gunBullet = document.querySelector(".gun_bullet");
  const orkHead = document.querySelector(".head");
  const orkEyes = document.querySelectorAll(".eye");
  const weapons = [sword, spear, pistol, gun];

  for (let i = 0; i < weapons.length; i++) {
    if (!weapons[i].classList.contains("hidden")) {
      const animatedWeapon = weapons[i];
      animatedWeapon.classList.remove("appearance");
      orkHead.classList.add("head_move");
      orkEyes.forEach((eye) => {
        eye.style.animation = "eye_animation .4s ease .5s 2 alternate";
      });
      setTimeout(() => {
        orkHead.classList.remove("head_move");
        orkEyes.forEach((eye) => {
          eye.style.animation = "none";
        });
      }, 2000);
      if (animatedWeapon.classList.contains("spear")) {
        animatedWeapon.classList.remove('spear_ready')
        animatedWeapon.classList.add('spear_hold')
        strikePlay();
        animatedWeapon.classList.add("spear_strike");
        setTimeout(() => {
          animatedWeapon.classList.remove("spear_strike");
        }, 3000);
      } else if (animatedWeapon.classList.contains("sword")) {
        animatedWeapon.classList.remove('sword_ready')
        animatedWeapon.classList.add('sword_hold')
        strikePlay();
        animatedWeapon.classList.add("sword_strike");
        setTimeout(() => {
          animatedWeapon.classList.remove("sword_strike");
        }, 3000);
      } else if (animatedWeapon.classList.contains("pistol")) {
        animatedWeapon.classList.remove('pistol_ready')
        animatedWeapon.classList.add('pistol_hold')
        shotPlay();
        pistolBullet.classList.add("bullet_shot");
        animatedWeapon.classList.add("pistol_shot");
        setTimeout(() => {
          pistolBullet.classList.remove("bullet_shot");
          animatedWeapon.classList.remove("pistol_shot");
        }, 2000);
      } else if (animatedWeapon.classList.contains("gun")) {
        shotPlay();
        gunBullet.classList.add("gun_bullet_shot");
        setTimeout(() => {
          gunBullet.classList.remove("gun_bullet_shot");
        }, 2000);
      }
    }
  }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NEW GAME

function newGame() {
  const agree = document.querySelector(".yes_second");
  const disagree = document.querySelector(".no");
  const newGameWindow = document.querySelector(".game_over_covering");
  const questionParagraph = document.querySelector(".question");

  newGameWindow.style.animation = "new_game 2s ease 2.5s forwards";
  newGameWindow.classList.remove("hidden");

  agree.addEventListener("click", reloadPage);

  disagree.addEventListener("click", () => {
    disagree.classList.add("hidden");
    agree.classList.add("hidden");
    questionParagraph.innerText = "SEE YOU NEXT TIME";
  });
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! AUDIO

function shotPlay() {
  const shotAudio = new Audio();
  shotAudio.src = "../audio/shot_gun.mp3";
  shotAudio.play();
}

function strikePlay() {
  const shotAudio = new Audio();
  shotAudio.src = "../audio/strike.mp3";
  shotAudio.play();
}

function orkPlay() {
  const shotAudio = new Audio();
  shotAudio.src = "../audio/glass_one.mp3";
  shotAudio.play();
}

function orkLaughter() {
  const shotAudio = new Audio();
  shotAudio.src = "../audio/laughter.mp3";
  shotAudio.play();
}

function bravo() {
  const shotAudio = new Audio();
  shotAudio.src = "../audio/bravo.mp3";
  shotAudio.play();
}

//!!!!!!!!!!!!!!!!!!!!!!! RELOAD PAGE

function reloadPage() {
  location.reload();
}

//**************************************** MAIN CODE

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector(".yes");

  startButton.addEventListener("click", chooseWeapon);
});
