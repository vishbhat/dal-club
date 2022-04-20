// @Author: Kishan Thakkar
import { Typography, Box } from "@mui/material"
import {styled} from '@mui/system'

const ContentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginTop: 0,
  "&>.image-container": {
    width: "50%",
    marginTop: 0,
  },
  [theme.breakpoints.down('sm')]: {
    display: "block",
    marginTop: "40px",
    "&>.image-container": {
      width: "100%",
      marginTop: "10px",
    }
  },
  [theme.breakpoints.up('sm')]: {
    display: "flex",
    "&>.image-container": {
      width: "100%",
    },
  }
}))

const InfoSection = ({ isReverse = false, image, title, description }) => {
  return (
    <ContentContainer flexDirection={isReverse ? "row-reverse" : "row"}>
      <Box height="350px" className="image-container">
      <Box
        component={"img"}
        sx={{ objectFit: "cover" }}
        src={image || `https://via.placeholder.com/600x400?text=Info+Section`}
        width="100%"
        alt="para info"
        height="100%"
      />
      </Box>
      <Box display="flex" justifyContent={"center"} alignContent="center" className="image-container">
        <Box maxWidth={"75%"}>
          <Typography variant="h5" fontWeight={"bold"} color="primary.main" mb={1}>{title}</Typography>
          <Typography>{description}</Typography>
        </Box>
      </Box>
    </ContentContainer>
  )
}

export default InfoSection