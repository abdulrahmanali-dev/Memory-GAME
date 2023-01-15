// select
let startButton = document.querySelector(".start-button button");
let startButtonDiv = document.querySelector(".start-button");
let userNameSpan = document.querySelector(".username span");
let blocksContainer = document.querySelector(".memory-game-blocks");
let triesSpan = document.querySelector(".tries span");

startButton.onclick = function () {
  let yourName = prompt("what is your name");
  console.log(yourName);

  // if the name is null or empty

  if (yourName === "" || yourName === null) {
    // write Unknown if the name is fucked

    userNameSpan.innerHTML = "Unknown";

    // if name is not empty
  } else {
    userNameSpan.innerHTML = yourName;
  }

  startButtonDiv.remove();
};

// set duration

let duration = 1000;

// create an array of all the blockes
let blocks = Array.from(blocksContainer.children);

//create an array of the blockes indexes
let orderRange = [...Array(blocks.length).keys()];

// shuffel the array
shuffel(orderRange);

// loop on all blockes to put order property

blocks.forEach((block, index) => {
  // put order css property on all boxes

  block.style.order = orderRange[index];

  // when clicking on on of the game block
  block.addEventListener("click", () => {
    // trigger flipBlock function
    flipBlock(block);
  });
});
function shuffel(array) {
  // set variables
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // create a random number
    random = Math.floor(Math.random() * current);

    // decrease the current number
    current--;

    //  [1] Save current number in a box
    temp = array[current];

    // remplace the current number with a random number
    array[current] = array[random];

    // now we get the current number that we saved inside of the temp variable
    array[random] = temp;
  }
  return array;
}

// Flip Block Function
function flipBlock(selected) {
  // add a class name to the clicked block
  selected.classList.add("is-flipped");

  // collect all flipped blocks
  allflpdBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allflpdBlocks.length === 2) {
    // we must do two things here

    // [1] stop clicking function
    stopClicking();
    // [2] check tow flipped blockes are idetical
    matchedBlocks(allflpdBlocks[0], allflpdBlocks[1]);
  }
}

// check Matched blockes
function matchedBlocks(blockOne, blockTwo) {
  if (blockOne.dataset.animal === blockTwo.dataset.animal) {
    blockOne.classList.remove("is-flipped");
    blockTwo.classList.remove("is-flipped");
    
    blockOne.classList.add("is-matched");
    blockTwo.classList.add("is-matched");
  } else {
    // encrees wrong tries
    triesSpan.innerHTML++;  
    setTimeout(() => {
      blockOne.classList.remove("is-flipped");
      blockTwo.classList.remove("is-flipped");
      
    }, duration);
  }
}

function stopClicking() {
  // add no clicking className to the main continer
  blocksContainer.classList.add("no-clicking");
  
  // and remove the class name after one seconds
  
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
