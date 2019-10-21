import { noop } from "lodash";

export const trackEvent = (eventName, opts = {}, callback = noop) => {
  if (typeof window.amplitude !== "object") {
    return callback();
  }

  // track event
  const amplitude = window.amplitude.getInstance();
  amplitude.logEvent(eventName, opts, callback);
};

export const trackOutboundLink = event => {
  if (typeof window.amplitude !== "object") {
    return;
  }

  event.preventDefault();

  const eventName = "outbound link click";
  const href = event.target.href;
  const target = event.target.target;
  const opts = {
    href,
  };
  const callback = () => {
    window.open(href, target);
  };

  // track event
  const amplitude = window.amplitude.getInstance();
  amplitude.logEvent(eventName, opts, callback);
};
