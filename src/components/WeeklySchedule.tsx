import React from "react";

interface Event {
  day: string; // e.g., "Monday"
  startTime: string; // e.g., "11:00"
  endTime: string; // e.g., "12:10"
  title: string; // e.g., "Meeting"
}

interface WeeklyScheduleProps {
  events: Event[];
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ events }) => {
  const colors = [
    "#660033",
    "#003366",
    "#006633",
    "#330066",
    "#660000",
    "#000066",
    "#006600",
    "#333366",
    "#333300",
    "#330033",
    "#003333",
    "#333333",
    "#330000",
    "#000033",
    "#003300",
    "#000000",
  ];

  const eventData = events.map((event, index) => {
    const [startHours, startMinutes] = event.startTime.split(":").map(Number);
    const [endHours, endMinutes] = event.endTime.split(":").map(Number);

    // Calculate start position based on minutes
    const startPosition = (startMinutes / 60) * 100;

    // Calculate end position as percentage of total minutes: 30 minutes = 50%
    const endPosition =
      (((endHours - startHours) * 60 + (endMinutes - startMinutes)) / 60) * 100;

    return {
      ...event,
      startHours,
      startMinutes,
      endHours,
      endMinutes,
      startPosition,
      endPosition,
      color: colors[index % colors.length],
    };
  });

  const minStartTime = Math.min(...eventData.map((e) => e.startHours));
  const maxEndTime = Math.max(...eventData.map((e) => e.endHours));

  const timeOffset = 2; // Offset to start time

  const timeSlots = Array.from(
    { length: maxEndTime - minStartTime + timeOffset * 2 },
    (_, i) => `${minStartTime - timeOffset + i}:00`
  );

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] border-gray-300">
      <div className="size-10"></div>

      {weekDays.map((day) => (
        <div
          key={day}
          className="border-dashed border-inherit text-center content-center font-semibold text-[.8rem] md:text-lg"
        >
          {day}
        </div>
      ))}

      {timeSlots.map((time, rowIndex) => (
        <React.Fragment key={time}>
          <div className="border-dashed border-inherit text-center">{time}</div>

          {weekDays.map((day) => (
            <div
              key={`${day}-${time}`}
              className="relative border-dashed border-inherit h-20"
            >
              {eventData
                .filter(
                  (event) =>
                    event.day === day &&
                    event.startHours === minStartTime + rowIndex - timeOffset
                )
                .map((event) => (
                  <div
                    key={event.title}
                    className="absolute inset-0 z-10 text-white text-xs p-1 rounded"
                    style={{
                      top: `${event.startPosition}%`,
                      height: `${event.endPosition}%`,
                      backgroundColor: event.color,
                    }}
                  >
                    {event.title}
                    <div>
                      {event.startTime}-{event.endTime}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};
export default WeeklySchedule;
