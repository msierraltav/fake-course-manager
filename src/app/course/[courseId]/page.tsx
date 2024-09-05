"use client"
import React from "react";
import Course from "@/app/components/course/Course";
import { useGetCourseByIdQuery } from "@/redux/services/coursesApi";
import { TCourse } from "@/lib/types";

type Props = {
  params: {
    courseId: number;
  };
};

let course : TCourse;

const CourseDetails = ({ params }: Props) => {
  const {
    data,
    error,
    isSuccess,
    isLoading,
  } = useGetCourseByIdQuery({ id: params.courseId });

  if(isSuccess){
    course = data;
  }

  console.log(course);
  return <div className="flex flex-col justify-center items-center">
    {isSuccess && (
        <Course course={course} />
    )}
  </div>;
};

export default CourseDetails;
