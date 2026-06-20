import API from "./api";
import { StudentFormData } from "@/types/student";

export const getStudents = async () => {
  const response = await API.get("/students");
  return response.data;
};

export const createStudent = async (data: StudentFormData) => {
  const response = await API.post("/students", data);

  return response.data;
};

export const updateStudent = async (id: number, data: StudentFormData) => {
  const response = await API.put(`/students/${id}`, data);

  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await API.delete(`/students/${id}`);

  return response.data;
};
