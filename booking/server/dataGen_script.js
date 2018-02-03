// //Data GENERATION ONLY
// var faker = require('faker');
// var fs = require('fs');
// //const uuid = require('uuid');

// let writeStream = fs.createWriteStream('./database/testdata1.txt');

// //generate 500k listings
// for (var i = 200000; i > 0; i--) {
//   //host and listing tied together
//   var host = uuid.v1();
//   var listing = uuid.v1();

//   var monthsArr = ['11', '12', '01'];
//   var monthObj = {};
//   var selectedDays = [];
//   var month2 = [];
//   var month3 = [];
//   var bookYear = 2017;

//   monthObj[2] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
//   monthObj[3] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',  '30'];
//   monthObj[4] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];

//   const addData = (selectedDays, daysArr, month, bookings) => {
//     var randomIndex = Math.floor(Math.random() * 3);
//     var day = Math.floor(Math.random() * daysArr.length);

//     if (selectedDays.length === bookings) {
//       return;
//     }

//     if (selectedDays.includes(daysArr[day])) {
//       addData(selectedDays, daysArr, month, bookings);
//     } else {
//       if (monthsArr[randomIndex] === '01') {
//         bookYear = 2018;
//       }
//       var data = `${listing},2018-${month}-${daysArr[day]},${bookYear}-${monthsArr[randomIndex]}-${daysArr[day]},${uuid.v4()},${host},${uuid.v4()}`;
//       writeStream.write(data + '\n', 'utf8');
//       selectedDays.push(daysArr[day]);
//       addData(selectedDays, daysArr, month, bookings);
//     }
//   }
//   // 6 bookings first month
//   addData(selectedDays, monthObj[2], '02', 6);
//   // 7 bookings second month
//   addData(month2, monthObj[3], '03', 7);
//   // 7 bookings third month
//   addData(month3, monthObj[4], '04', 7);
// }

// writeStream.on('finish', () => {  
//   console.log('wrote all data to file');
// });

// writeStream.end();