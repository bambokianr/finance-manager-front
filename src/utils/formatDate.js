export function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
		month = '0' + month;
  if (day.length < 2) 
		day = '0' + day;

  return [year, month, day].join('-');
}

export function formatDateToChart(date) {
	const d = date.split('T')[0];
	const year = d.split('-')[0];
	const month = d.split('-')[1];
	const day = d.split('-')[2];
	
	return [day, month, year].join('/');
}