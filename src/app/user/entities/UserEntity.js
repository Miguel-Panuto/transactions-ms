module.exports = (user) => ({
  id: user._id || null,
  name: user.name || null,
  document: user.document || null,
  email: user.email || null,
  phone: user.phone || null,
});
