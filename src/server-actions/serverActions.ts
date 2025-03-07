'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {axiosInstance} from "@/api-services/api.services";
import {IUserWithTokens} from "@/models/IUserWithTokens";


const loginUser = async (formData: FormData) => {

    const {data: isAuthUser} = await axiosInstance.post<IUserWithTokens>('/login', {
        username: formData.get('username'),
        password: formData.get('password'),
        expiresInMins: 1,
    }).catch(() => {
        redirect('/')
    });
    (await cookies()).set('accessToken', isAuthUser.accessToken, {
        httpOnly: true,
        path: '/', maxAge: 60
    });
    (await cookies()).set('refreshToken', isAuthUser.refreshToken, {
        httpOnly: true,
        path: '/'
    });
    (await cookies()).set('image', isAuthUser.image);
    if (isAuthUser) {
        redirect('/auth');
    }
};

export default loginUser;
