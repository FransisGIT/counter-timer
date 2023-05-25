var countdown;
var timerDisplay = document.getElementById("timer-display");
var hoursDisplay = document.getElementById("hours");
var minutesDisplay = document.getElementById("minutes");
var secondsDisplay = document.getElementById("seconds");

function startTimer() {
  var inputHours = document.getElementById("input-hours").value;
  var inputMinutes = document.getElementById("input-minutes").value;
  var inputSeconds = document.getElementById("input-seconds").value;

  if (inputHours === "" || inputMinutes === "" || inputSeconds === "") {
    alert("Mohon masukkan waktu yang valid");
    return;
  }

  var totalSeconds =
    parseInt(inputHours) * 3600 +
    parseInt(inputMinutes) * 60 +
    parseInt(inputSeconds);

  if (countdown) {
    clearInterval(countdown);
  }

  countdown = setInterval(function () {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerDisplay.innerHTML = hours + " : " + minutes + " : " + seconds;

    hoursDisplay.innerHTML = hours;
    minutesDisplay.innerHTML = minutes;
    secondsDisplay.innerHTML = seconds;

    if (totalSeconds <= 0) {
      clearInterval(countdown);
      timerDisplay.innerHTML = "Waktu habis";

      showNotification("Waktu telah habis");
    } else {
      totalSeconds--;
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  timerDisplay.innerHTML = "";
  document.getElementById("timer-display").value = "0";
  document.getElementById("input-hours").value = "0";
  document.getElementById("input-minutes").value = "0";
  document.getElementById("input-seconds").value = "0";

  hoursDisplay.innerHTML = "00";
  minutesDisplay.innerHTML = "00";
  secondsDisplay.innerHTML = "00";
}

function showNotification(message) {
  if (!("Notification" in window)) {
    alert("Browser tidak mendukung notifikasi");
    return;
  }

  if (Notification.permission === "granted") {
    var notification = new Notification("Countdown Timer", {
      body: message,
    });
  } else {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("Countdown Timer", {
          body: message,
        });
      }
    });
  }
}
