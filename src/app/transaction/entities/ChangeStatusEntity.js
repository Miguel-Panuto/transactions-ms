module.exports = (status) => {
  const obj = {
    status_id: status || null,
  };
  if (status === 4 || status === 3) obj.status_changed_at = new Date();
  return obj;
};
