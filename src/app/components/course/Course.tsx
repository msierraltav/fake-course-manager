"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { TCourse } from "@/lib/types";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import circleStudent from "../../../../public/circle_studentsuccess.png";
import { useDeleteCourseMutation } from "@/redux/services/coursesApi";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useAppDispatch } from "@/redux/useReduxHooks";
import { removeCourse } from "@/redux/features/courseSlice";
import { UUID } from "crypto";

type Props = {
  course: TCourse;
  isCourseDetail?: boolean;
};

const Course = ({ course, isCourseDetail = false }: Props) => {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const deleteMutation = useDeleteCourseMutation();
  const deleteCourse = deleteMutation[0];
  const dispatch = useAppDispatch();

  const handleDelete = async (id: UUID | undefined) => {
    try {
      if (id) {
        const { error, data } = await deleteCourse({ id });

        if (error) {
          setAlertMessage(`Error: ${error}`);
          setOpen(true);
        } else {
          setAlertMessage("Course Deleted Successfully");
          setOpen(true);
          dispatch(removeCourse(course));
        }
      }
    } catch (error) {
      setAlertMessage(`Error: ${error}`);
      setOpen(true);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={course.courseNumber}
          height="140"
          image={circleStudent.src}
        />
        <CardContent>
          <h1 className="text-lg text-gray-600 font-semibold">
            {course.subject} - {course.courseNumber}
          </h1>
          <h2 className="text-base text-gray-600">{course.description}</h2>
        </CardContent>
        <CardActions>
          {!isCourseDetail && (
            <Link
              href={`/course/${course.id}`}
              color="secondary"
              component={NextLink}
            >
              <Button size="small">Details</Button>
            </Link>
          )}
          <ListItemButton onClick={() => handleDelete(course.id)}>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
          </ListItemButton>
        </CardActions>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={alertMessage}
        action={action}
      />
    </>
  );
};

export default Course;
