/**
 * 유저는 어떤 정보를 담아야하는가.
 */

export type User = {
	id:number
}
export type Group ={
    users:User[]
    chattings:ChatMessage[]// order by time?

}
export type ChatMessage = {
    message:string
    sender :string
    time:Date
}