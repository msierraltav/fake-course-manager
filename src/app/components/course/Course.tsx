import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TCourse } from "@/lib/types";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import circleStudeny from "../../../../public/circle_studentsuccess.png";

type Props = {
  course: TCourse;
};

const Course = ({ course }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={course.courseNumber}
        height="140"
        image={circleStudeny.src}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.subject} - {course.courseNumber}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {course.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/course/${course.id}`} color="secondary" component={NextLink}>
          <Button size="small">Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Course;
