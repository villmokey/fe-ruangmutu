import React from "react";
import { Stack, Skeleton, Box } from "@mui/material";

const EventLoader = () => {
  return (
    <Box width={"100%"}>
      <Box width={"100%"}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Skeleton variant="circular" sx={{ width: 70, height: 70 }} />
          <Stack direction={"column"}>
            <Skeleton sx={{ width: 200 }} />
            <Skeleton sx={{ width: 70 }} />
          </Stack>
        </Stack>
        <Skeleton sx={{ width: "100%", margin: "20px 0 0 0" }} />
        <Skeleton sx={{ width: "50%", margin: "20px 0 0 0" }} />
        <Skeleton sx={{ width: "50%", margin: "20px 0 0 0" }} />
        <Skeleton sx={{ width: "50%", margin: "20px 0 0 0" }} />
        <Skeleton sx={{ width: "100%", margin: "20px 0 0 0" }} />
      </Box>
      <Box width={"100%"} margin={'20px 0 0 0'}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Skeleton variant="circular" sx={{ width: 70, height: 70 }} />
          <Stack direction={"column"}>
            <Skeleton sx={{ width: 200 }} />
            <Skeleton sx={{ width: 70 }} />
          </Stack>
        </Stack>
        <Skeleton sx={{ width: "100%", margin: "20px 0 0 0" }} />
        <Skeleton sx={{ width: "50%", margin: "20px 0 0 0" }} />
        <Skeleton sx={{ width: "50%", margin: "20px 0 0 0" }} />
        <Skeleton sx={{ width: "50%", margin: "20px 0 0 0" }} />
        <Skeleton sx={{ width: "100%", margin: "20px 0 0 0" }} />
      </Box>
    </Box>
  );
};

export default EventLoader;
