export const toDateString = (str) => {
  var date = new Date(str).toDateString()
  date = date.split(' ')
  return date[1] + ' ' + date[2] + ', ' + date[3]
}