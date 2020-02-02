class Speed {
  constructor(hours, mins, secs, kilometers) {
    this.hours = parseInt(hours);
    this.mins = parseInt(mins);
    this.secs = parseInt(secs);
    this.kilometers = parseInt(kilometers);
  }

  calcKmhPace() {
    let totalHours = this.hours + (this.mins * 60 + this.secs) / 3600;
    let kilometersPerHours = this.kilometers / totalHours;
    return `${kilometersPerHours.toFixed(2)} km/h`;
  }

  calcMinkmPace() {
    let totalSeconds = this.hours * 60 * 60 + this.mins * 60 + this.secs;
    let secondsPerKm = totalSeconds / this.kilometers;
    let minutes = 0;

    while (secondsPerKm >= 60){
      minutes++;
      secondsPerKm = secondsPerKm - 60;
    }
    secondsPerKm = Math.round(secondsPerKm);
    secondsPerKm = String('0'+ secondsPerKm).slice(-2);
    return `${minutes}:${secondsPerKm}/km`;
  }

  get kmhpace() {
    return this.calcKmhPace();
  }

  get minkmpace() {
    return this.calcMinkmPace();
  }
}

const form = document.querySelector('.speedCounter');
const hours = document.getElementById("hours");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const kilometers = document.getElementById("kilometers");



form.addEventListener('submit', function (e){
  e.preventDefault();
  const speed = new Speed(hours.value, mins.value, secs.value, kilometers.value);
  document.getElementById("result").innerHTML = `${speed.kmhpace} <br> ${speed.minkmpace}`;
});
