'use client'

import {useEffect, useState} from "react";
import '../search-css/search.css';
import {IRecipe} from "@/models/IRecipe";
import {searchAPI} from "@/api-services/search.api";
import {IUser} from "@/models/IUser";
import Link from "next/link";


const Search = () => {
    const [search, setSearch] = useState<string>('')
    const [recipe, setRecipe] = useState<IRecipe[]>([])
    const [user, setUser] = useState<IUser[]>([])

    useEffect(() => {
        if (!search) {
            setRecipe([])
            setUser([])
        } else {
            searchAPI(search)
                .then(({recipes, users}) => {
                    setRecipe(recipes);
                    setUser(users)
                })
        }

    }, [search]);

    const handleClick = () => {
        setSearch('');
        setRecipe([]);
        setUser([]);
    }


    return (
        <div>
            <label className='label'>
                <h4 className='search-name'>Search</h4>
                <input className='menu-input' type='text' name='searchPage'
                       value={search} onChange={x => setSearch(x.target.value)}/>
                <div className='search'>
                    {recipe && recipe.map(recipe => <div key={recipe.id}>
                        <Link className='search-window' onClick={() => handleClick()} href={{
                            pathname: '/auth/recipes/' + recipe.id.toString(),
                            query: {data: JSON.stringify(recipe)}
                        }}>Recipe: {recipe.name}</Link>
                    </div>)}
                    {user && user.map((user => <div key={user.id}>
                        <Link className='search-window' onClick={() => handleClick()}
                              href={{
                                  pathname: '/auth/users/' + user.id.toString,
                                  query: {data: JSON.stringify(user)}
                              }}>User: {user.firstName}</Link>
                    </div>))}</div>
            </label>
        </div>
    );
};

export default Search;