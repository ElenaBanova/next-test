import Link from "next/link";
import React from "react";
import ImageAuthUser from "@/components/menu/menu-navigation/menu-navigation/ImageAuthUser";
import '../menu-navigate-css/menuNavigate.css'
import Search from "@/components/menu/menu-navigation/search/search/Search";


const MenuNavigation = () => {

    return (
        <div className='menu nav'>
            <ImageAuthUser/>
            <div className='click' id='click-menu'><Link className='cl' href={'/auth/recipes'}>All recipes</Link></div>
            <div className='click' id='click-menu'><Link className='cl' href={'/auth/users'}>All users</Link></div>
            <div>
                <Search/>
            </div>
        </div>
    );
};

export default MenuNavigation;