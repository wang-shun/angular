export class Admin {
    id:string;
    userName: string;
    contactPhone: string;
    email: string;
    description: string;
    loginName: string ;
    password:string;
    enterpriseId: string;
    enterpriseName: string;
    status: number;
    isSelect?: boolean = false;
    authMode:string;
    constructor() {
    }
}