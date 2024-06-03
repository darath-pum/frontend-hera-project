interface IAPIResponse {
    status?: number;
    code?:number;
    error?: string;
    data?: any;
    message?:string;
}

interface IGame {
    id:number;
    title: string;
    description:string;
    categories: string[];
    img: any;
    game:any;
    gameId:number;
}