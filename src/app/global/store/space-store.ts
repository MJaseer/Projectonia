export interface Assignee {
    _id: string | null | undefined,
    fname: string | null | undefined,
    lname: string | null | undefined,
    email: string | null | undefined,
    password: string | null | undefined,
    phone: number | null | undefined,
    place: string | null | undefined,
    post: string | null | undefined,
    skill: string | null | undefined,
    managerId?: string,
    tasks?: [],
    timeStamp: string | null | undefined,
    __v: number | null | undefined
}

export interface Project {
    _id?: string,
    title: string,
    managerId?: string,
    createAt?: string,
    tasks?: Task[],
    __v?: number,
}

export interface Task {
    _id?: string,
    title?: string,
    assigneeId?: string,
    dueDate?: string,
    priority?: string,
    subtask?: [{ title?: string }],
    projectId?: string,
    description?: string,
    managerId?: string,
    status?: string,
    attachments?: [{ path?: string }],
    createdAt?: string,
    modifiedAt?: string,
    __v?: number,
    modifier?: string,
    updatedAt?:string
}

export interface Manager {
    _id?: string,
    name: string,
    email: string,
    password: string,
    assignees?: any[],
    projects?: Project[],
    loginedAt?: string,
    status: string,
    __v?: number,
}

export interface ids {
    managerId?: string ;
    assigneeId?: string ;
    id: string;
}