import { RRule } from 'rrule';

class ScheduleUtils {
  static occursNow(rruleString, durationSeconds) {
    const rrule = RRule.fromString(rruleString.replace("\\n", "\n"));
    const duration = durationSeconds * 1000;

    const now = new Date();

    // For evaluation with the RRule library we pretend that "now" is in UTC instead of the local timezone.
    // That is 9:00 in Europe/Copenhagen time will be evaluated as if it was 9:00 in UTC.
    // @see https://github.com/jkbrzt/rrule#important-use-utc-dates
    const nowWithoutTimezone = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()));

    // Subtract duration from now to make sure all relevant occurrences are considered.
    const from = new Date(nowWithoutTimezone.getTime() - duration);

    let occurs = false;

    rrule.between(
      from,
      nowWithoutTimezone,
      true,
      function iterator(occurrenceDate) {
        const end = new Date(occurrenceDate.getTime() + duration);

        if (nowWithoutTimezone >= occurrenceDate && nowWithoutTimezone <= end) {
          occurs = true;
          // break iteration.
          return false;
        }

        // continue iteration.
        return true;
      }
    );

    return occurs;
  }
}

export default ScheduleUtils;
