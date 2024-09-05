
import Box from "@mui/material/Box";
import Courses from "@/app/components/courses/Courses";

export default function Home() {
  return (
    <Box
    sx={{
      my: 4,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: 2
    }}
  >
    <Courses/>
  </Box>
  );
}
