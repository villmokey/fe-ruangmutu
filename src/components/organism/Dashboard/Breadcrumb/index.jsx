import React from "react";
import { Breadcrumb, Space } from "antd";
import { Stack } from "@mui/material";
import { HomeFilledIcon } from "../../../../assets/icons";
import { Link } from "react-router-dom";
import { paths } from "../../../../routing/paths";

const Navigation = ({ items }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={paths.HOME}>
          <div>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <img src={HomeFilledIcon} alt={"home"} />
              <span>Home</span>
            </Stack>
          </div>
        </Link>
      </Breadcrumb.Item>
      {items &&
        items.length > 0 &&
        items.map((item, index) => (
          <Breadcrumb.Item key={"breadcrumb-" + index}>
            <Link to={item.path}>{item.label}</Link>
          </Breadcrumb.Item>
        ))}
    </Breadcrumb>
  );
};

export default Navigation;
