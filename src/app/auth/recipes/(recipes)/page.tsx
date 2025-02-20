import React from 'react';
import {SearchParams} from "next/dist/server/request/search-params";
import {loadAuthRecipes} from "@/api-services/recipe.api";
import Link from "next/link";
import '@/app/auth/recipes/recipes-css/recipesList.css';
import PaginationRecipes from "@/components/pagination/pagination/PaginationRecipes";


const RecipesPage = async ({searchParams}: { searchParams: Promise<SearchParams> }) => {
    const params = await searchParams;
    const page = params.page || '1';
    const recipes = await loadAuthRecipes(`${page}`);

    return (
        <div>
            <h1 className='recipes-list-name'>The page of all recipes.</h1>
            <h3>Clicking on the tag of interest will take you to a page with recipes filtered by the selected
                value.</h3>
            <h3>Also by selecting a recipe you will go to its detailed description.</h3>
            <div className='recipes-list'>
                {recipes.map((recipe) => <div className='recipe' key={recipe.id}>
                    <div className='recipes-list-link'><Link
                        key={recipe.id}
                        href={{
                            pathname: '/auth/recipes/' + recipe.id.toString(),
                            query: {data: JSON.stringify(recipe)}
                        }}>
                        {recipe.name}
                    </Link></div>
                    <div className='recipe-tags'>Tags:{recipe.tags.map(((tag, index) => <div key={index}>
                        <Link href={{pathname: '/auth/recipes/tag/' + tag, query: {tag: tag}}}>{tag}</Link>/
                    </div>))}
                    </div>
                </div>)}
            </div>
            <PaginationRecipes/>
        </div>);
};

export default RecipesPage;