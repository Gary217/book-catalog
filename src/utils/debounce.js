// Creates a timer that is reset every time a new call comes in.
export function debounce(callback, delay = 500) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
