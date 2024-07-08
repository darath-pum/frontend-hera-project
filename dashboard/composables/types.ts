interface IAPIResponse {
    status?: number;
    code?:number;
    error?: string;
    data?: any;
    message?:string;
}

interface IUser{
    id:number;
    first_name:string;
    last_name:string;
    email:string;
    role:string;
    pf_img_url:string;
    is_locked:boolean;
}

interface IGame {
    id:number;
    title: string;
    description:string;
    categories: string[];
    img: any;
    game:any;
    gameId:number;
    img_url:string;
    created_at:string;
    is_enabled:boolean;
}

interface ICampaign{
    id:number;
    title:string;
    img_url:string;
    start_date:string;
    end_date:string;

}

interface IPrizePool{
    id:number;
    prize_img_url:any;
    prize_name_kh:string;
    prize_name_en:string;
    used_qty:number;
    qty:number;
}
interface IPrize{
    id:number;
    name_kh:string;
    name_en:string;
    image:string;
}

interface UserWon {
    id:number,
    img_url:string,
    name_kh:string,
    name_en:string,
    phone_number:number;
    created_at:any;
}

