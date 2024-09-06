"use client";
import { TCourse } from "@/lib/types";
import React, { useEffect, useState } from "react";
import Course from "@/app/components/course/Course";
import NoData from "@/app/components/noData/NoData";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import { useGetAllCoursesQuery } from "@/redux/services/coursesApi";
import { addCourses, clearCourses } from "@/redux/features/courseSlice";

type Props = {};

const Courses = (props: Props) => {
  const [isClient, setIsClient] = useState(false);
  const courseList = useAppSelector((state : any) => state.coursesReducer.courseList);

  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state : any) => state.headerReducer.searchBar);
  const { data, error, isSuccess, isLoading , refetch} = useGetAllCoursesQuery({
    q: searchQuery,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {

    if (data && isSuccess) {
      refetch();
      dispatch(clearCourses());
      dispatch(addCourses(data));
    }
  }, [isSuccess, data, dispatch, isClient]);

  if(error){
    console.error(error);
  }

  return (
    <Container className="sd:grid-cols-1 mb-3 grid auto-cols-auto gap-3 md:grid-cols-3 xl:grid-cols-3">
      {isSuccess && courseList && courseList.length > 0 ? (
        <>
          {courseList.map((course : TCourse) => (
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
    </Container>
  );
};

export default Courses;
