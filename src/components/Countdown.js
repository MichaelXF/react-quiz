import { useEffect, useRef } from "react";

function padStart(subject, length, char) {
  subject = subject.toString();

  while (subject.length < length) {
    subject = char + subject;
  }

  return subject;
}

export default function Countdown(props) {
  var ref = useRef();

  useEffect(() => {
    var needsInterval = true;

    function update() {
      var now = Date.now();
      var ms = Math.max(0, props.endAt - now);

      var seconds = Math.floor(ms / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = hours < 24 ? 0 : Math.floor(hours / 24);

      hours -= days * 24;
      minutes -= hours * 60;
      seconds -= minutes * 60;

      // MM:SSs
      var string = padStart(seconds, 2, "0") + "s";

      if (minutes > 0) {
        string = padStart(minutes, 2, "0") + ":" + string;
      }

      if (seconds <= 0 && minutes <= 0) {
        clearInterval(timer);
        if (props.onEnd) {
          props.onEnd();
        }
        timer = null;

        string = props.endText || "0:00s";
      }

      if (hours > 0) {
        string = hours + " hour" + (hours != 1 ? "s" : "");
      }

      if (days > 0) {
        string = days + " day" + (days != 1 ? "s" : "");
        needsInterval = false;
      }

      if (ref.current) {
        ref.current.innerText = string;
      }
    }

    update();

    var timer;

    if (needsInterval || props.alwaysCreateTimer) {
      timer = setInterval(update, 1000);
    }

    return () => {
      timer && clearInterval(timer);
    };
  }, [props]);

  return (
    <span className={"number " + props.className} ref={ref}>
      --
    </span>
  );
}
