export const saveState = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadState = (key, fallback) => {
  const val = localStorage.getItem(key);
  return val ? JSON.parse(val) : fallback;
};