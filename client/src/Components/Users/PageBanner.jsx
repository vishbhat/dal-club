// @Author: Kishan Thakkar
import { Box, Typography } from "@mui/material";

const PageBanner = ({ title = "Banner", bannerImage }) => {
  return (
    <Box height={"35vh"} position={"relative"}>
      <Box
        component={"img"}
        height={"35vh"}
        width={"100%"}
        sx={{ objectFit: "cover" }}
        src={bannerImage || `https://via.placeholder.com/1800x200?text=${title.replace(" ", "+")}`}
        alt={title}
      />
      <Box position={"absolute"} top={0} left={0} width="100%" height="100%" bgcolor={"rgba(0,0,0,0.2)"} />
      <Typography
        position={"absolute"}
        top="50%"
        left={"50%"}
        variant="h4"
        color={"white"}
        fontWeight={"bold"}
        sx={{ transform: "translate(-50%, -50%)" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageBanner;
