import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Box from "@mui/material/Box";
import styled from "styled-components";
import "./Calendar.less";
import { Dialog } from "@mui/material";
import EventItem from "./event.item";
import { fetchApiGet } from "../../../../globals/fetchApi";

const EventCalendar = ({
  events = [],
  handleRealize,
  handleEdit,
  handleRemove,
}) => {
  const [mapped, setMapped] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = React.useState({});

  const onEventClick = (event) => {
    fetchApiGet("/event/" + event.publicId, {}).then((res) => {
      setOpen(true);
      setDetail(res.data);
    });
  };

  const extractDate = (start, end = "") => {
    if (start !== end) {
      let endDate = end.split("-");
      let day = parseInt(endDate[2]) + 1;
      return `${endDate[0]}-${endDate[1]}-${day}`;
    }

    return end;
  };

  React.useEffect(() => {
    if (events) {
      let temp = events.map((event) => {
        return {
          id: event.id,
          title: event.name,
          start: event.start_date,
          end: extractDate(event.start_date, event.end_date),
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
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div style={{ padding: "10px" }}>
          <EventItem
            title={detail.name}
            date={detail.created_at}
            desc={detail.description}
            programs={detail.related_program}
            user={detail.user}
            start={detail.start_date}
            end={detail.end_date}
            realized={detail.is_realized}
            files={detail.related_file}
            programOwner={
              detail.program && detail.program.name ? detail.program.name : ""
            }
            programOwnerColor={
              detail.program && detail.program.color
                ? detail.program.color
                : "transparent"
            }
            otherFiles={detail.other_files}
            onRealized={() => handleRealize(detail.id)}
            onEdit={() => handleEdit(detail.id)}
            onDelete={() => handleRemove(detail.id)}
          />
        </div>
      </Dialog>
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
            eventClick={(e) => onEventClick(e.event._def)}
            eventTimeFormat={false}
            dayMaxEvents={true}
            events={mapped}
          />
        )}
      </Container>
    </>
  );
};

const Container = styled(Box)`
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.24));
  border-radius: 30px;
  padding: 10px;
`;

export default EventCalendar;
