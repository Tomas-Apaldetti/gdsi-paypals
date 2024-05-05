export function formattedDate(date){
  return date.toISOString().slice(0, "YYYY-MM-DD".length);
}
