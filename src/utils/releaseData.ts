class Releasedbj {
  constructor(released) {
    this.released = Array.from(released);
    this.releasedObj;
  }
  getYear() {
    const released = this.released;
    let year = "";
    for (let i = 0; i < released.length - released.length + 4; i++) {
      year += released[i];
    }
    return year;
  }
  getMonth() {
    const released = this.released;
    let month = "";
    for (
      let i = released.length - released.length + 5;
      i < released.length - released.length + 4 + 3;
      i++
    ) {
      month += released[i];
    }
    return month;
  }
  getDate() {
    const released = this.released;
    let date = "";
    for (let i = released.length - 2; i < released.length; i++) {
      date += released[i];
    }
    return date;
  }
  result() {
    return (this.releasedObj = {
      date: this.getDate(),
      month: this.getMonth(),
      year: this.getYear(),
    });
  }
}

export default Releasedbj;
