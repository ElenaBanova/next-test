import {IRecipe} from "@/models/IRecipe";
import {IRecipesResponse} from "@/models/IRecipesResponse";
import {axiosInstance} from "@/api-services/api.services";
import {IUser} from "@/models/IUser";

export const loadAuthRecipes = async (page: string): Promise<IRecipe[]> => {
    const limit = 12;
    const skip = limit * (+page) - limit;
    const {data: {recipes}} = await axiosInstance.get<IRecipesResponse>('/recipes' + '?limit=' + limit + '&skip=' + skip.toString());
    return recipes;
};

export const loadRecipesIdUser = async (idUser: string): Promise<IRecipe[]> => {
    const {data: {id}} = await axiosInstance.get<IUser>('/users/' + idUser);
    const k = id;
    const {data: {recipes}} = await axiosInstance.get<IRecipesResponse>('/recipes');
    return recipes.filter((recipe: IRecipe) => {
        if (recipe.userId === k) return recipes;
    });
};

export const loadTagRecipes = async (tag: string): Promise<IRecipe[]> => {
    const {data: {recipes}} = await axiosInstance.get<IRecipesResponse>('/recipes/tag/' + tag);
    return recipes;
};