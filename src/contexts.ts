import { createContext } from "react";
import { TagType } from "./data/note";

const baseUrl = createContext<string>("http://localhost:8000")
const tags = createContext<TagType[]>([])