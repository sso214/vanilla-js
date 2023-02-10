function debounce(callback, limit) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback.apply(this, args);
    }, limit);
  }
}


function throttle(callback, limit = 100) {
  let waiting = false;
  return function(...args) {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => waiting = false, limit);
    }
  }
}

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('keyup', debounce(function(e) {
  console.log(e.target.value);
}, 500));


searchInput.addEventListener('keyup', throttle(function(e) {
  console.log(e.target.value);
}, 500));

