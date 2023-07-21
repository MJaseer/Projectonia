export interface Assignee {
    _id:string | null | undefined,
    fname:string|null| undefined,
    lname:string|null| undefined,
    email:string|null| undefined,
    password:string|null| undefined,
    phone:number|null| undefined,
    place:string|null| undefined,
    post:string|null| undefined,
    skill:string|null| undefined,
    timeStamp:string|null| undefined,
    __v:number|null| undefined
}

export interface Project {
    _id?:string,
    title:string,
    createAt?:string,
    tasks?:[],
    __v?:number,
}

export interface Task{
    _id?:string,
    title:string,
    assignee?:string,
    dueDate?:string,
    priority?:string,
    subtask?:[]
}
