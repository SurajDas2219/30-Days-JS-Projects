let count = 0;

function updateDisplay() {
  document.getElementById("count").innerText = count;
}
function increment() {
  count++;
  updateDisplay();
}

function decrement() {
  if (count > 0) {
    count--;
    updateDisplay();
  }
}

function reset() {
  count = 0;
  updateDisplay();
}
