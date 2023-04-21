import axios from "axios";
import { TagType, NoteType } from "../data/note";

const baseUrl = "http://192.168.192.1:8000";

enum Order {
  ASC = "asc",
  DESC = "desc",
}

export const getNotes = async (offset=0,limit=10,order=Order.DESC) => {
  const { data } = await axios.get(baseUrl+"/notes",{params:{offset,limit,order}});
  return data;
}

export const addNote = async (note:NoteType) => {
  const { data } = await axios.post(baseUrl+"/notes",{...note});
  return data;
}

export const delNote = async (id:number) => {
  const { data } = await axios.delete(baseUrl+"/notes/"+id);
  return data;
}
