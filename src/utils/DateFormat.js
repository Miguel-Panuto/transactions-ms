module.exports = (ts) => {
  const date = new Date(ts);
  const ye = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);
  const mo = new Intl.DateTimeFormat('en-US', { month: '2-digit' }).format(
    date
  );
  const da = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date);
  return `${ye}-${mo}-${da}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
};
