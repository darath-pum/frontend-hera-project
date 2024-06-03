interface IAPIResponse {
    status?: number;
    code?:number;
    error?: string;
    data?: any;
    message?:string;
}

interface Game {
    id:number;
    title: string;
}