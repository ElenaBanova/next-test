import {NextRequest, NextResponse} from "next/server";
import {axiosInstance} from "@/api-services/api.services";
import {ITokenPair} from "@/models/ITokenPair";
import {cookies} from "next/headers";


const middleware = async (req: NextRequest) => {
    const token = req.cookies.get('refreshToken')?.value || '';
    const access = req.cookies.get('accessToken')?.value || '';
    if (!access) {
        const {data: {accessToken, refreshToken}} = await axiosInstance.post<ITokenPair>('/refresh',
            {
                refreshToken: token,
                expiresInMin: 1,
            });
        const res = NextResponse.next();
        res.headers.set('accessTokenNew', accessToken);
        res.headers.set('refreshTokenNew', refreshToken);
        (await cookies()).set('accessToken', accessToken, {
            httpOnly: true,
            path: '/', maxAge: 60
        });
        (await cookies()).set('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/'
        });
        return res && NextResponse.redirect(req.nextUrl);
    }
};

export default middleware;

export const config = {
    method: 'GET',
    matcher: '/auth/:path*'
}