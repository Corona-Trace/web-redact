function getItem(key) {
  const value = localStorage.getItem(`corona-trace.${key}`);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}
function setItem(key, value) {
  localStorage.setItem(`corona-trace.${key}`, JSON.stringify(value));
}

export default { getItem, setItem };
