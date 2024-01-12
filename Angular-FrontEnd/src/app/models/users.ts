export class Users
{
    constructor
    (
        public email: string,
        public password: string,
        public identifier: string,
        public session: boolean
    )
    {
         
    }
}