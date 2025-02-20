import {IUsersResponse} from "@/models/IUserResponse";
import {axiosInstance} from "@/api-services/api.services";
import {IUser} from "@/models/IUser";
import {redirect} from "next/navigation";


export const loadAuthUsers = async (page: string): Promise<IUser[]> => {
    const limit = 12;
    const skip = limit * (+page) - limit;
    const {data: {users}} = await axiosInstance.get<IUsersResponse>('/users' + '?limit=' + limit + '&skip=' + skip.toString())
        .catch(() => redirect('/login'));
    return users
};

export const loadUserIdRecipe = async (id: string): Promise<IUser> => {
    const {data} = await axiosInstance.get('/users/' + id);
    return data;
};