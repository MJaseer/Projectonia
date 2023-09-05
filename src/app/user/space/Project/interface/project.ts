import { Task } from "src/app/global/store/space-store";

export interface Project {
    id?:string,
    title:string,
    createAt?:string,
    tasks?:Task[]
}
