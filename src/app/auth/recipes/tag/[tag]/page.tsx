import {SearchParams} from "next/dist/server/request/search-params";
import {FC} from "react";
import {IRecipe} from "@/models/IRecipe";
import {loadTagRecipes} from "@/api-services/recipe.api";
import '../tag-css/tags-seatch-css.css';
import Link from "next/link";

type Props = {
    searchParams: Promise<SearchParams>;
}

const RecipesTagPage: FC<Props> = async ({searchParams}) => {
    const {tag} = await searchParams;
    const recipesTag = await loadTagRecipes(`${tag}`) as IRecipe[];

    return (
        <div>
            <h1>All recipes by the requested tag are displayed:</h1>
            {recipesTag && recipesTag.map(recipe => <div className='recipes-tag-list' key={recipe.id}>
                <Link href={{
                    pathname: '/auth/recipes/' + recipe.id.toString(),
                    query: {data: JSON.stringify(recipe)}
                }}>{recipe.name} </Link> Tags: {recipe.tags.map(((tag, index) => <div
                key={index}><Link href={{pathname: '/auth/recipes/tag/' + tag, query: {tag: tag}}}>{tag}</Link>/
            </div>))}
            </div>)}
        </div>
    )
};

export default RecipesTagPage;