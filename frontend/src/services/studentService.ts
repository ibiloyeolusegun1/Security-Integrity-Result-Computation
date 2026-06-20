import API from "./api";

export const getStudents = async () => {
  const response = await API.get("/students");
  return response.data;
};

export const createStudent = async (data: any) => {
  const response = await API.post("/students", data);

  return response.data;
};

export const updateStudent = async (id: number, data: any) => {
  const response = await API.put(`/students/${id}`, data);

  return response.data;
};

export const deleteStudent = async (id: number) => {
  const response = await API.delete(`/students/${id}`);

  return response.data;
};
