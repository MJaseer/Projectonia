import { Task } from "src/app/global/store/space-store";

export interface Project {
    _id?:string,
    title:string,
    createAt?:string,
    tasks?:Task[]
}
