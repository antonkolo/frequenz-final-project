export function timestampToDate(timestamp: string) {
  const date = new Date(parseInt(timestamp));

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate;
}
