export const toDateString = (str) => {
  var date = new Date(str).toDateString()
  date = date.split(' ')
  return date[1] + ' ' + date[2] + ', ' + date[3]
}

export const dateStr2time = str => new Date(str).getTime()