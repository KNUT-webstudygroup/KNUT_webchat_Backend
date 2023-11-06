
declare global{
    namespace Express{
        interface User{
            id:number
        }
        interface Group{
            users:User[]
            chattings:ChatMessage[]// order by time?
        
        }
        interface ChatMessage{
            message:string
            sender :string
            time:Date
        }
    }
}