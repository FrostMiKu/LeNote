import axios from "axios";
import { TagType, NoteType } from "../data/note";

const baseUrl = "http://127.0.0.1:8000";

enum Order {
  ASC = "asc",
  DESC = "desc",
}

export const getHeatMap = async () => {
  const { data } = await axios.get(baseUrl+"/heatmap");
  return data;
}

export const getNotes = async (offset=0,limit=10,order=Order.DESC) => {
  const { data } = await axios.get(baseUrl+"/note",{params:{offset,limit,order}});
  return data;
}

export const addNote = async (note:NoteType) => {
  const { data } = await axios.post(baseUrl+"/note",{...note});
  return data;
}

export const delNote = async (id:number) => {
  const { data } = await axios.delete(baseUrl+"/note/"+id);
  return data;
}

export const updateNote = async (note:NoteType) => {
  const { data } = await axios.put(baseUrl+"/note/",{...note});
  return data;
}

export const getTags = async () => {
  const { data } = await axios.get(baseUrl+"/tag");
  return data;
}
