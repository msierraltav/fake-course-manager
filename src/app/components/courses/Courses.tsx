"use client";
import { TCourse } from "@/lib/types";
import React from "react";
import { useGetAllCoursesQuery } from "@/redux/services/coursesApi";
import Course from "@/app/components/course/Course";
import NoData from "@/app/components/noData/NoData";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

let courseList: TCourse[] = [];

type Props = {};

const Courses = (props: Props) => {
  const { data, error, isSuccess, isLoading } = useGetAllCoursesQuery();

  courseList = data || [];

  if (error) {
    console.error(error);
  }

  return (
    <>
      {isSuccess && courseList.length > 0 ? (
        <>
          {courseList.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </>
      ) : (
        <NoData />
      )}
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Courses;
