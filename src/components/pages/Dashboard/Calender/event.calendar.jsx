import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Box from "@mui/material/Box";
import styled from "styled-components";
import "./Calendar.less";

const EventCalendar = ({ events = [] }) => {
  const [mapped, setMapped] = React.useState([]);
  React.useEffect(() => {
    if (events) {
      let temp = events.map((event) => {
        return {
          id: event.id,
          title: event.name,
          start: event.start_date + " 00:00",
          end: event.end_date + " 23:59:59",
          color:
            event.program && event.program.color
              ? event.program.color
              : "black",
        };
      });
      setMapped(temp);
    }
  }, [events]);
  return (
    <Container sx={{ background: "white" }} className={"event-calendar"}>
      {events && mapped && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          timeHint={false}
          selectMirror={true}
          eventTimeFormat={false}
          dayMaxEvents={true}
          events={mapped}
        />
      )}
    </Container>
  );
};

const Container = styled(Box)`
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.24));
  border-radius: 30px;
  padding: 10px;
`;

export default EventCalendar;
