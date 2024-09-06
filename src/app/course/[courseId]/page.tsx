"use client"
import React from "react";
import Course from "@/app/components/course/Course";
import { useGetCourseByIdQuery } from "@/redux/services/coursesApi";
import { TCourse } from "@/lib/types";
import { useAppDispatch } from '@/redux/useReduxHooks';
import { setSubTitle } from "@/redux/features/headerSlice";
import { UUID } from "crypto";

type Props = {
  params: {
    courseId: UUID;
  };
};

let course : TCourse;

const CourseDetails = ({ params }: Props) => {

  const dispatch = useAppDispatch();
  const {
    data,
    error,
    isSuccess,
    isLoading,
  } = useGetCourseByIdQuery({ id: params.courseId });

  if(isSuccess){
    course = data;
    dispatch(setSubTitle(`Course : [ ${course.subject} ] ${course.courseNumber}`));
  }

  return <div className="flex flex-col justify-center items-center">
    {isSuccess && (
        <Course course={course} isCourseDetail={true}/>
    )}
  </div>;
};

export default CourseDetails;
