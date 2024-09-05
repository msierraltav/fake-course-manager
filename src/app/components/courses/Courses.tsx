"use client";
import { TCourse } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "@/redux/services/coursesApi";
import { useAppDispatch, useAppSelector } from "@/redux/useReduxHooks";
import Course from "@/app/components/course/Course";
import NoData from "@/app/components/noData/NoData";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import { clearLastAdded, clearRemoved } from "@/redux/features/headerSlice";

type Props = {};

const Courses = (props: Props) => {
  const lastAdded = useAppSelector((state) => state.headerReducer.lastAdded);
  const lastRemoved = useAppSelector((state) => state.headerReducer.lastRemoved);
  const searchQuery = useAppSelector((state) => state.headerReducer.searchBar);
  const dispatch = useAppDispatch();
  const { data, error, isSuccess, isLoading } = useGetAllCoursesQuery({q: searchQuery});
  const [courseList, setCourseList] = useState<TCourse[]>(data || []);

  if (error) {
    console.error(error);
  }

  // positive feedback add a new elent to the UI inmediatly if was suceessfull added to the db
  useEffect(() => {
    if (lastAdded.length > 0) {
      setCourseList([...courseList, ...lastAdded]);
      dispatch(clearLastAdded());
    }
  }, [lastAdded]);

  useEffect(() => {
    if (data && data?.length > 0) setCourseList(data);
  }, [data]);

  useEffect(() => {
    if(lastRemoved.length >0){
      
      // create a new list of courseList witout the elements from lastRemoved
      const newList = courseList.filter(course => {
        return !lastRemoved.includes(course)
      });
      setCourseList([...newList]);
      dispatch(clearRemoved());
    }
    
  }, [lastRemoved]);

  return (
    <Container className="sd:grid-cols-1 mb-3 grid auto-cols-auto gap-3 md:grid-cols-3 xl:grid-cols-3">
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
    </Container>
  );
};

export default Courses;
