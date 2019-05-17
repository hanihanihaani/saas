//获取当前的日期 YYYY_MM_DD形式
let getFormatDate = function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
  month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
  strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
//获取当前日期的前一个月
let getFormatDates = function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth();
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
  month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
  strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

module.exports = { getFormatDate, getFormatDates }