import React from 'react';
import Link from "next/link";

const StartMenu = () => {
    return (
        <div>
            <div className='menu start'><Link className='click' href={'/login'}>Log in</Link></div>
        </div>
    );
};

export default StartMenu;