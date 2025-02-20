import React from 'react';
import {cookies} from "next/headers";
import Image from "next/image";
import '../menu-navigate-css/menuNavigate.css';


const ImageAuthUser = async () => {
    const image = (await cookies()).get('image')?.value || '';

    return (
        <div>
            <div>
                <Image className='logo' src={image} alt={`logo authorized user`} width={100} height={100}/>
            </div>
        </div>
    );
};

export default ImageAuthUser;