import React from "react";
import { Button, Col, Layout, Row } from "antd";
import "./Calendar.less";
import { InputSearch } from "../../../atoms/InputSearch/InputSearch";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { paths } from "../../../../routing/paths";
import { CalendarSider } from "../../../organism/Dashboard/Sider/CalendarSider/CalendarSider";
import { useAuthToken } from "../../../../globals/useAuthToken";
import styled from "styled-components";
import EventItem from "./event.item";
import EventCalendar from "./event.calendar";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import FormCalendar from "./calendar.form";
import {
  fetchApiGet,
  fetchApiDelete,
  fetchApiPut,
} from "../../../../globals/fetchApi";
import { ToastContainer, toast } from "react-toastify";
import EventLoader from "./Loader/event.shimmer";
import Navigation from "../../../organism/Dashboard/Breadcrumb";

const { Content } = Layout;

export const Calender = () => {
  const [filterPayload, setFilterPayload] = React.useState({
    year: undefined,
    month: undefined,
    program_id: undefined,
  });
  const { getAccessToken } = useAuthToken();
  const accessToken = getAccessToken();
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventsPaginated, setEventsPaginated] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationProps, setPaginationProps] = useState({
    count: 1,
    activePage: 1,
    total: 0,
    from: 0,
    to: 0,
  });

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
  const getPaginatedEvents = () => {
    setLoading(true);
    fetchApiGet("/event", {
      ...filterPayload,
      page: page,
      per_page: 10,
      search: search,
    }).then((res) => {
      if (res && res.success) {
        setPaginationProps({
          activePage: res.data.current_page,
          count: Math.ceil(res.data.total / res.data.per_page),
          total: res.data.total,
          from: res.data.from,
          to: res.data.to,
        });
        setLoading(false);
        setEventsPaginated(res.data.data);
      }
    });
  };

  const handlePageChange = (e, p) => {
    setPage(p);
  };

  React.useEffect(() => {
    getEvents();
  }, [filterPayload, search]); //eslint-disable-line

  React.useEffect(() => {
    getPaginatedEvents();
  }, [filterPayload, search, page]); //eslint-disable-line

  return (
    <Layout>
      <ToastContainer />
      <CalendarSider onFilter={(filter) => setFilterPayload(filter)} />
      <Content className="main-content calendar">
        <Navigation
          items={[
            {
              path: "/dashboard/" + paths.CALENDER,
              label: "Kalender",
            },
          ]}
        />
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
        ) : eventsPaginated && eventsPaginated.length > 0 ? (
          <>
            <ContentContainter>
              {eventsPaginated.map((item, index) => (
                <EventItem
                  key={index}
                  title={item.name}
                  desc={item.description}
                  programs={item.related_program}
                  user={item.user}
                  start={item.start_date}
                  end={item.end_date}
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
            <Grid container alignItems={"center"} marginTop={"20px"}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography style={{ color: "rgb(168 168 168 / 85%)" }}>
                  Menampilkan {paginationProps.from} - {paginationProps.to} dari{" "}
                  {paginationProps.total}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Box width={"100%"} display={"flex"} justifyContent={"end"}>
                  <Pagination
                    sx={{ marginTop: "20px" }}
                    count={paginationProps.count}
                    color="standard"
                    page={paginationProps.activePage}
                    onChange={handlePageChange}
                  />
                </Box>
              </Grid>
            </Grid>
          </>
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
