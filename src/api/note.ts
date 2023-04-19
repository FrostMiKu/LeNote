import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";

export const getNotes = async () => {
  const { data } = await axios.get(baseUrl+"/notes");
  return data.data;
}