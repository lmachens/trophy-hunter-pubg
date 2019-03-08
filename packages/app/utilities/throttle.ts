const throttle = <T = any, R = void>(
  callback: (...args: T[]) => R,
  wait: number,
  immediate: boolean = false
) => {
  let timeout: any = null;
  let initialCall = true;

  return (...args: any) => {
    const callNow = immediate && initialCall;
    const next = () => {
      callback(args);
      timeout = null;
    };

    if (callNow) {
      initialCall = false;
      next();
    }

    if (!timeout) {
      timeout = setTimeout(next, wait);
    }
  };
};

export default throttle;
