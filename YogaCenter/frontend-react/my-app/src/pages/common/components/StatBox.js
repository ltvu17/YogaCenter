import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({title, subtitle, icon , progress, increase}) => {
    const theme = useTheme()

    return(
        <Box width="100%" m="0 30px" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Box>
            {icon}
            <Typography variant="h4" fontSize="1.125rem" fontWeight="bold" sx={{ color: 'black' }}>
              {title}
            </Typography>
          </Box>
          <Box>
            <ProgressCircle progress={progress} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2px">
          <Typography variant="h5" sx={{color:'black'}} fontSize="0.9rem">{subtitle}</Typography>
          <Typography variant="h5" sx={{color: '#0E2954'}} fontSize="1rem" fontStyle="italic">
            {increase}
          </Typography>
        </Box>
      </Box>
      
    )
}
export default StatBox