export default class {
  static getDay(date) {
    const days = ['Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday'];

    return days[date.getDay()];
  }

  static getMonth(date) {
    const months = ['January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'];

    return months[date.getMonth()];
  }

  static getTime(date) {
    const hours = date.getHours();

    let minutes = date.getMinutes(),
        period = 'AM',
        hour = hours;

    //convert to 12 hour clock
    if(hour >= 12) {
      hour = hours - 12;
      period = 'PM';
    }

    if(hour === 0) hour = 12;

    minutes = minutes < 10 ? ('0' + minutes) : minutes;

    return hour + ':' + minutes + period;
  }

  static compareDates(date1, date2) {
    const d1 = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()),
          d2 = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate());

    if(d1 > d2){
      return true;
    }else{
      return false;
    }
  }
}
