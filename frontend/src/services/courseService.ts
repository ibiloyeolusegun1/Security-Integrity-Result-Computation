import API from "./api";
import { CourseFormData } from "@/types/course";

export const getCourses = async () => {
  const response = await API.get("/courses");

  return response.data;
};

export const createCourse = async (data: CourseFormData) => {
  const response = await API.post("/courses", data);

  return response.data;
};

export const updateCourse = async (id: number, data: CourseFormData) => {
  const response = await API.put(`/courses/${id}`, data);

  return response.data;
};

export const deleteCourse = async (id: number) => {
  const response = await API.delete(`/courses/${id}`);

  return response.data;
};
