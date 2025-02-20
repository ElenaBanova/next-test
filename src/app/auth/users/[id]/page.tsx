import React, {FC} from 'react';
import {SearchParams} from "next/dist/server/request/search-params";
import {IUser} from "@/models/IUser";
import {loadRecipesIdUser} from "@/api-services/recipe.api";
import Link from "next/link";
import {IRecipe} from "@/models/IRecipe";
import '../users-css/user-info-page.css';
import Image from "next/image";

type Props = {
    searchParams: Promise<SearchParams>;
}
const UserPage: FC<Props> = async ({searchParams}) => {
    const {data} = await searchParams;
    let user = null;
    let recipesId = null;
    if (typeof data === 'string') {
        user = JSON.parse(data) as IUser;
        recipesId = await loadRecipesIdUser(`${user.id}`) as IRecipe[];
    }


    return (
        <div className='user-info'>
            {user && <div className='user-div'>
                <div>
                    <Image className='user-image' src={user.image} alt={`logo authorized user`} width={200} height={200}/>
                    <h2>{user.firstName} {user.lastName}</h2>
                    <div>{user.email}</div>
                    <div>{user.phone}</div>
                    <div>Age {user.age}, {user.birthDate}</div>
                    <div>{user.university}</div>
                </div>
                {recipesId && <div className='user-recipes'>
                    <h2 className='user-recipes-name'>List of user recipes:</h2>
                    {recipesId.map(recipe => <Link className='recipesId-link' key={recipe.id}
                                                   href={{
                                                       pathname: '/auth/recipes/' + recipe.id.toString(),
                                                       query: {data: JSON.stringify(recipe)}
                                                   }}>
                        <div key={recipe.id}>{recipe.name}</div>
                    </Link>)}
                </div>}
            </div>}
        </div>
    );
};

export default UserPage;