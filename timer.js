function createTimer(onchange) {
  let seconds = 0;
  let handler = 0;
  if (onchange) onchange(seconds);

  function tick() {
    ++seconds;
    if (onchange) onchange(seconds);
    handler = setTimeout(tick, 1000);
  }

  // timer object
  return {
    start: function () {
      if (handler) return;
      seconds = -1;
      tick();
    },
    stop: function () {
      clearTimeout(handler);
      handler = 0;
    },
  };
}
