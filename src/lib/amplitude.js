import { noop } from "lodash";

export const trackEvent = (eventName, opts = {}, callback = noop) => {
  if (typeof window.amplitude !== "object") {
    return callback();
  }

  // track event
  const amplitude = window.amplitude.getInstance();
  amplitude.logEvent(eventName, opts, callback);
};
