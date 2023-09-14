export const Duration = {
  seconds(s = 1) {
    return s * 1000;
  },
  minutes(m = 1) {
    return this.seconds(60) * m;
  },
  hours(h = 1) {
    return this.minutes(60) * h;
  },
  days(d = 1) {
    return this.hours(24) * d;
  },
  weeks(w = 1) {
    return this.days(7) * w;
  },
};
