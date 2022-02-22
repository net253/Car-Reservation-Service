import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import th from "date-fns/locale/th";
import { format, parse, startOfWeek, getDay } from "date-fns";

const locales = {
  th: th,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function MyCalendar({ information }) {
  const eventList = [];
  information.map((data, i) => {
    const user = data.name;
    const car = data.cars;
    const start = data.datetimeUse.slice(0, 19).split(" ");
    const end = data.datetimeReturn.slice(0, 19).split(" ");
    const arrStart = start[0].split("-").concat(start[1].split(":"));
    const arrEnd = end[0].split("-").concat(end[1].split(":"));
    eventList.push({
      title: user + " " + car,
      start: new Date(
        arrStart[0],
        arrStart[1] - 1,
        arrStart[2],
        arrStart[3],
        arrStart[4],
        arrStart[5]
      ),
      end: new Date(
        arrEnd[0],
        arrEnd[1] - 1,
        arrEnd[2],
        arrEnd[3],
        arrEnd[4],
        arrEnd[5]
      ),
      desc: car,
    });
  });

  // console.log(eventList);

  return (
    <>
      <div>
        <Calendar
          popup
          localizer={localizer}
          events={eventList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "65vh" }}
          eventPropGetter={(event) => {
            const backgroundColor =
              event.desc == "6298 (รถกระบะ)" ? "#6be585" : "#fdbb2d";
            return { style: { backgroundColor } };
          }}
          views={["month", "week", "day"]}
          defaultView={"week"}
        />
      </div>
    </>
  );
}
