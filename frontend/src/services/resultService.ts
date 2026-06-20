import API from "./api";

import { ResultFormData } from "@/types/result";

export const computeResult = async (data: ResultFormData) => {
  const response = await API.post("/results/compute", data);

  return response.data;
};
