import { Box, useTheme } from "@mui/material";


const ProgressCircle = ({ progress, size = "40" }) => {
  const theme = useTheme();

  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(#cccccc 55%, transparent 56%),conic-gradient(transparent 0deg ${angle}deg, #84A7A1 ${angle}deg 360deg),#0E2954`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;