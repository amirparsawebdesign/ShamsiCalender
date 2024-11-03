let date = new Date();
let shamsi_date = new Intl.DateTimeFormat("fa-IR").format(date);
let start_date = new Date(date);
let end_date = new Date(date);
let startDateFa = "";
let endDateFa = "";
let endDatePrevFa = "";
let current_day = document.querySelector(".calender .header .current_day");


let calenderContainer = document.querySelector(".calender");

function getDateFormat(uDate, option) {
      let date = new Intl.DateTimeFormat("fa-IR", option).format(uDate);
      return date;
}

const shamsiDateGenerator = (date) => {
      return {
            day: getDateFormat(date, {
                  day: "2-digit"
            }),
            month: getDateFormat(date, {
                  month: "numeric"
            }),
            monthTitle: getDateFormat(date, {
                  month: "long"
            }),
            year: getDateFormat(date, {
                  year: "numeric"
            }),
            dayWeek: getDateFormat(date, {
                  weekday: "long"
            })
      };
};

const startDateOfCurrentMonth = () => {
      for (let i = 1; i < 31; i++) {
            let previousDay = shamsiDateGenerator(
                  new Date(start_date).setDate(new Date(start_date).getDate() - i)
            );

            if (previousDay.monthTitle != todayFa.monthTitle) {
                  start_date = new Date(date).setDate(new Date(date).getDate() - i + 1);
                  break;
            };
      };
};

const endDateOfCurrentMonth = () => {
      for (let i = 1; i < 100; i++) {
            let nextDay = shamsiDateGenerator(
                  new Date(end_date).setDate(end_date.getDate() + i)
            );

            if (nextDay.monthTitle != todayFa.monthTitle) {
                  end_date = new Date(date).setDate(new Date(date).getDate() + i - 1);
                  break;
            };
      };
};

const weekdays = (date) => {
      if (new Date(date).getDay() <= 5) {
            return new Date(date).getDay() + 2;
      } else return new Date(date).getDay() - 5;
};

function exchangeFaDateToEn(label) {
      const faDigits = [/\۰/g, /\۱/g, /\۲/g, /\۳/g, /\۴/g, /\۵/g, /\۶/g, /\۷/g, /\۸/g, /\۹/g];
      for (let i = 0; i < 10; i++){
            label.day = label.day.replace(faDigits[i], i)
            label.month = label.month.replace(faDigits[i], i)
            label.year = label.year.replace(faDigits[i], i)
      };
      return label
};

let todayFa = exchangeFaDateToEn(shamsiDateGenerator(new Date()));
let year = todayFa.year;
let month = todayFa.month;
let todayFaForEVER = todayFa;

const calcCalender = () => {
      
      startDateFa = exchangeFaDateToEn(shamsiDateGenerator(start_date));
      endDateFa = exchangeFaDateToEn(shamsiDateGenerator(end_date));
      endDatePrevFa =
            exchangeFaDateToEn(shamsiDateGenerator(
                  new Date(start_date).setDate(new Date(start_date).getDate() - 1)
            ));
      const monthOfYear = document.querySelector(".calender .header .current_month");
      const start = weekdays(start_date);
      const endDate = endDateFa.day;
      const end = weekdays(end_date);
      let previousEndDate = endDatePrevFa.day;
      let dateHTML = "";

      for (let i = start - 1; i > 0; i--) {
            dateHTML += `<li class="inactive"> ${previousEndDate - i + 1} </li>`;
      };
      for (let i = 1; i <= endDate; i++) {
            if (i === Number(todayFaForEVER.day)
                  && month === todayFaForEVER.month
                  && year === todayFaForEVER.year) {
                  dateHTML += `<li> ${i} </li>`
            } else {
                  dateHTML += `<li> ${i} </li>`;
            }
      }
      for (let i = end; i < 7; i++) {
            dateHTML += `<li class="inactive"> ${i - end + 1} </li>`;
      };
      
      document.querySelector(".calender .days").innerHTML = dateHTML;
      monthOfYear.innerHTML = `${startDateFa.monthTitle} ${startDateFa.year}`;
      return true;
};

startDateOfCurrentMonth();
endDateOfCurrentMonth();
calcCalender();

document.querySelector(".calender .header .buttons .next_month").onclick = () => {
      date = new Date(date).setDate(
            new Date(date).getDate() + Number(endDatePrevFa.day)
      );

      start_date = new Date(date);
      end_date = new Date(date);
      todayFa = exchangeFaDateToEn(shamsiDateGenerator(date));
      year = todayFa.year;
      month = todayFa.year;

      startDateOfCurrentMonth();
      endDateOfCurrentMonth();
      calcCalender();
};

document.querySelector(".calender .header .buttons .previous_month").onclick = () => {
      date = new Date(date).setDate(
            new Date(date).getDate() - Number(endDatePrevFa.day)
      );

      start_date = new Date(date);
      end_date = new Date(date);
      todayFa = exchangeFaDateToEn(shamsiDateGenerator(date));
      year = todayFa.year;
      month = todayFa.year;

      startDateOfCurrentMonth();
      endDateOfCurrentMonth();
      calcCalender();
};


const PersianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
];
current_day.innerHTML = `تاریخ امروز : ${shamsi_date.split("/")[2]} ${PersianMonths[month - 1]}`;