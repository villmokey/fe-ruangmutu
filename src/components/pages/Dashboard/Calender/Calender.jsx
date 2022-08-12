import React from "react";
import { Button, Col, Layout, Row } from "antd";
import "./Calendar.less";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../../../routing/paths";
import { CalendarSider } from "../../../organism/Dashboard/Sider/CalendarSider/CalendarSider";
import { useDispatch, useSelector } from "react-redux";
import { useAuthToken } from "../../../../globals/useAuthToken";
import styled from "styled-components";
import EventItem from "./event.item";
import EventCalendar from "./event.calendar";
import { Typography, Stack } from "@mui/material";
import { HomeFilledIcon } from "../../../../assets/icons";
import FormCalendar from "./calendar.form";
import {
  fetchApiGet,
  fetchApiDelete,
  fetchApiPut,
} from "../../../../globals/fetchApi";
import { ToastContainer, toast } from "react-toastify";
import EventLoader from "./Loader/event.shimmer";
import { uploadFileAPI } from "../../../../redux/modules/file/action";

const { Content } = Layout;

export const Calender = () => {
  const [filterPayload, setFilterPayload] = React.useState({
    year: "",
    month: "",
    program_id: "",
  });
  const dispatch = useDispatch();
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const handleRealize = (id) => {
    fetchApiPut(`/event/realize/${id}`, accessToken).then((res) => {
      if (res) {
        toast.success("Berhasil mengubah status kegiatan menjadi terealisasi");
        getEvents();
      }
    });
  };

  const handleRemove = (id) => {
    fetchApiDelete(`/event/${id}`, accessToken).then((res) => {
      if (res && res) {
        toast.success("Berhasil menghapus kegiatan");
        getEvents();
      }
    });
  };

  const handleEdit = (id) => {
    alert("Act " + id);
  };

  const getEvents = () => {
    setLoading(true);
    fetchApiGet("/event", {
      paginate: false,
      ...filterPayload,
      search: search,
    }).then((res) => {
      setLoading(false);
      setEvents(res.data);
    });
  };

  React.useEffect(
    () => {
      getEvents();
    },
    [filterPayload],
    search
  );

  return (
    <Layout>
      <ToastContainer />
      <CalendarSider onFilter={(filter) => setFilterPayload(filter)} />
      <Content className="main-content calendar">
        <Stack
          direction={"row"}
          spacing={1}
          alignItems={"center"}
          margin={"0 0 20px 0"}
        >
          <img
            onClick={() => navigate("/")}
            src={HomeFilledIcon}
            alt={"ic_home"}
            style={{ cursor: "pointer" }}
          />
          <Typography fontSize={"14px"}>Home</Typography>
          <Typography fontSize={"14px"}>/</Typography>
          <Typography fontSize={"14px"} color={"#5DC8BD"} fontWeight={"bold"}>
            Kalender
          </Typography>
        </Stack>
        <FormCalendar
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSuccessSubmit={() => {
            setFormOpen(false);
            window.scrollTo({ behavior: "smooth", top: 1200 });
            getEvents();
          }}
        />
        <EventCalendar events={events} loading={loading} />
        <Row justify="end" style={{ marginTop: 40 }} gutter={[8]}>
          <Col>
            <InputSearch size="large" onSearch={(e) => setSearch(e)} />
          </Col>
          <Col>
            <Button
              onClick={() => {
                setFormOpen(true);
                window.scrollTo({ behavior: "smooth", top: 0 });
              }}
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>
        {loading ? (
          <EventLoader />
        ) : events && events.length > 0 ? (
          <ContentContainter>
            {events.map((item, index) => (
              <EventItem
                key={index}
                title={item.name}
                date={item.created_at}
                desc={item.description}
                programs={item.related_program}
                user={item.user}
                realized={item.is_realized}
                files={item.related_file}
                programOwner={
                  item.program && item.program.name ? item.program.name : ""
                }
                programOwnerColor={
                  item.program && item.program.color
                    ? item.program.color
                    : "transparent"
                }
                otherFiles={item.other_files}
                onRealized={() => handleRealize(item.id)}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleRemove(item.id)}
              />
            ))}
          </ContentContainter>
        ) : (
          <Typography
            fontSize={"15px"}
            textAlign={"center"}
            margin={"100px 0"}
            color={"grey"}
          >
            Belum Ada Kegiatan
          </Typography>
        )}
      </Content>
    </Layout>
  );
};

const ContentContainter = styled.div`
  background: rgba(93, 200, 189, 0.88);
  padding: 16px;
  min-height: 100px;
  margin: 10px 0;
`;
