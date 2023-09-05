export interface i_chatReceiver{
    room_id:string,
    receiver:string,
    time?:Date
}

export interface i_messages{
    user:string,
    message:string,
    time ?: number | Date,
    readReciept?:boolean
}