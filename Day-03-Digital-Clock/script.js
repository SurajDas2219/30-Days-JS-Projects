function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let second = now.getSeconds();

  let amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  second = second < 10 ? "0" + second : second;

  let timeString = `${hours} : ${minutes} :${second} ${amPm}`;
  document.getElementById("clock").innerHTML = timeString;
}

setInterval(updateClock, 1000);

updateClock();
