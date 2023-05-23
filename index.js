let text =
  "Most of the birds of the parrot family are known for their colorful feathers, noisy calls, and curved beaks. They are among the world's most popular pet birds. They are smart and very social, and they tend to live a long time. Some types, such as the African gray parrot, are excellent at imitating human speech. This scientific family includes many birds besides parrots. Among them are macaws, lovebirds, lories, lorikeets, keas, and parakeets, including the budgerigar, or budgie. Cockatoos and cockatiels belong to a closely related family. People often call the birds of both these families parrots. Parrots and their relatives are found mainly in the southern half of the world. Most of these birds live in warm or hot rain forests. The birds of the parrot family vary greatly in size—from 3 to 40 inches (8 to 100 centimeters) in length. Several types of parrot are mostly bright green. Red, yellow, and blue feathers are also common. However, cockatoos are mainly white, black, pink, or gray. They often have tufts of feathers, called crests, on their heads. Parrots and their relatives have sturdy bodies and short necks. Two of the toes on each foot point forward, and the other two point backward. Their feet are useful for both climbing and grasping. These birds also use their thick, hooked bills to help them climb trees. Their strong bills can crack open hard nutshells, too. They eat mainly seeds, nuts, and fruits. Many types of these birds are in danger of dying out completely. People have cut down the trees in many forests where parrots live in order to use the land for farms, houses, or businesses. In addition, people catch many of these endangered birds to sell as pets—even though this is against the law.";

const p = document.querySelector(".text");
//
const untyped = p.querySelector(".untyped");
untyped.textContent = text;
//
const typed = document.querySelector(".typed");
//
const correct = document.getElementById("correct");
const errors = document.getElementById("errors");
const time = document.getElementById("time");
const button = document.querySelector("button");

function onTimerChanged(sec) {
  time.textContent = sec;
}

const timer = createTimer(onTimerChanged);

const crntSpan = {
  span: undefined,
  isCorrect: undefined,
  //
  reset: function () {
    this.span = undefined;
    this.isCorrect = undefined;
  },
};

const statistics = {
  correct: 0,
  errors: 0,
  //
  reset: function () {
    this.correct = 0;
    this.errors = 0;
  },
};

function showStatistics() {
  correct.textContent = statistics.correct;
  errors.textContent = statistics.errors;
}

// START
button.onclick = function () {
  while (p.childElementCount > 1) p.removeChild(p.firstElementChild);

  untyped.textContent = text;

  crntSpan.reset();

  statistics.reset();
  showStatistics();

  typed.setAttribute("contenteditable", true);
  typed.onkeydown = onKeyDown;
  typed.focus();
  scrollToUntyped();

  timer.stop();
  timer.start();
};

// keydown
function onKeyDown(e) {
  e.preventDefault();

  const key = correctChar(e.key);
  if (!isChar(key)) return;

  const src = untyped.textContent;
  if (src.length > 0) {
    untyped.textContent = src.substring(1);

    const charToMove = src[0];
    const isCorrectChar = charToMove === key;
    moveChar(charToMove, isCorrectChar);

    if (isCorrectChar) ++statistics.correct;
    else ++statistics.errors;
    showStatistics();

    scrollToUntyped();
  }

  if (untyped.textContent.length < 1) {
    timer.stop();
    typed.onkeydown = undefined;
    typed.removeAttribute("contenteditable");
    document.documentElement.scrollTop = 0;
  }
}

function scrollToUntyped() {
  const untypedY = untyped.getBoundingClientRect().y + 52;
  const viewHeight = document.documentElement.clientHeight;

  const delta = (untypedY - viewHeight) | 0;
  document.documentElement.scrollTop += delta;
}

function correctChar(key) {
  if (key == "Spacebar") return " "; // IE

  return key;
}

function isChar(key) {
  if (key.length > 1) return false;
  return true;
}

function moveChar(key, isCorrect) {
  const span = getDestSpan(isCorrect);
  span.textContent += key;
}

function getDestSpan(isCorrect) {
  if (crntSpan.span && crntSpan.isCorrect === isCorrect) {
    return crntSpan.span;
  }

  crntSpan.span = document.createElement("span");
  crntSpan.span.className = isCorrect ? "correct" : "wrong";
  crntSpan.isCorrect = isCorrect;
  p.insertBefore(crntSpan.span, untyped);
  return crntSpan.span;
}
