const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  return typeof email === 'string' && emailRegex.test(email);
}

function validatePhone(phone) {
  if (!phone) return false;
  const cleaned = String(phone).replace(/[^0-9]/g, '');
  return /^\d{10}$/.test(cleaned);
}

function validateName(name) {
  return typeof name === 'string' && name.trim().length > 0;
}

module.exports = { validateEmail, validatePhone, validateName };
