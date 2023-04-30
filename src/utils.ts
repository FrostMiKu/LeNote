import dayjs from "dayjs";
import { NoteType } from "./data/note";
import { HeatMapValue } from "@uiw/react-heat-map";

const timestamp2HeatmapFormat = (timestamp:number|Date) => {
    return dayjs(timestamp).format("YYYY/MM/DD");
};

export const notes2HeatmapData = (notes:NoteType[]) => {
    const data:HeatMapValue[]=[];
    notes.forEach(note=>{
        const date = timestamp2HeatmapFormat(note.create_date);
        const index = data.findIndex(item=>item.date===date);
        if(index===-1){
            data.push({date,count:1,content:''});
        }else{
            data[index].count++;
        }
    });
    return data;
}

export const randomColor = () => {
    const colors = [
        "magenta",
        "red",
        "volcano",
        "orange",
        "gold",
        "lime",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "purple"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}