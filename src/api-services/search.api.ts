import {redirect} from "next/navigation";
import {axiosInstance} from "@/api-services/api.services";


export const searchAPI = async (x: string) => {
    const {data: {recipes}} = await axiosInstance.get('recipes/search?q=' + x)
        .catch(() => redirect('/login'));
    const {data: {users}} = await axiosInstance.get('/users/search?q=' + x)
        .catch(() => redirect('/login'));
    return {recipes, users}
};
