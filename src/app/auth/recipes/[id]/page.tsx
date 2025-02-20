import {SearchParams} from "next/dist/server/request/search-params";
import {FC} from "react";
import {IUser} from "@/models/IUser";
import {IRecipe} from "@/models/IRecipe";
import '../recipes-css/recipeInfo.css';
import {loadUserIdRecipe} from "@/api-services/user.api";
import Link from "next/link";

type Props = {
    searchParams: Promise<SearchParams>;
}

const RecipePage: FC<Props> = async ({searchParams}) => {
    const {data} = await searchParams;
    let recipe = null;
    let userId = null;
    if (typeof data === 'string') {
        recipe = JSON.parse(data) as IRecipe;
        userId = await loadUserIdRecipe(`${recipe.userId}`) as IUser;
    }
    return (
        <div>
            {recipe && <div className={'recipe-info-list'}>
                <h1>{recipe.name}</h1>
                <div className='tag'>Tags:{recipe.tags.map(((tag, index) => <div key={index}>{tag}/</div>))}</div>
                <div>Ingredients: {recipe.ingredients.map(((ingredient, index) => <div
                    key={index}>{index + 1}. {ingredient}</div>))}</div>
                <div>Instructions: {recipe.instructions.map(((action, index) => <div
                    key={index}>{action}</div>))}</div>
                <div className='meal'>Prep time: {recipe.prepTimeMinutes}min. Cook time: {recipe.cookTimeMinutes}min.
                    Meal
                    type: {recipe.mealType.map(((type, index) => <div key={index}>{type}</div>))}</div>
                <div>Servings: {recipe.servings}. Calories per serving: {recipe.caloriesPerServing}.
                    Cuisine {recipe.cuisine}</div>
                {userId && <div>Автор: <Link href={{
                    pathname: '/auth/users/' + userId?.id.toString(),
                    query: {data: JSON.stringify(userId)}
                }}>{userId?.firstName} {userId?.lastName}</Link></div>}
            </div>}
        </div>
    )
}

export default RecipePage;