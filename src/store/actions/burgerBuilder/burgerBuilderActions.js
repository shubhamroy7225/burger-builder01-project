
import axios from "../../../axios-orders"
import * as actionsTypes from "../actionsTypes";
export const addIngredients = (ingname) => {
  return {
    type: actionsTypes.ADDINGREDIENT,
    payload: ingname,
  };
};
export const removeIngredients = (ingname) => {
  return {
    type: actionsTypes.REMOVEINGREDIENT,
    payload: ingname,
  };
};
export const setIngredients = (ingredients)=>{
  return{
    type:actionsTypes.SET_INGREDIENTS,
    ingredients:ingredients
  }
}
export const fetchIngredientsFailed=()=>{
  return{
    type:actionsTypes.FETCH_INGREDIENTS_FAILED
  }
}
export const initIngredients=()=>{
  return dispatch=>{
      axios.get('/ingredients.json')
      .then(res=>{
        dispatch(setIngredients(res.data))
      })
      .catch(err=>{
        dispatch(fetchIngredientsFailed())
      })
  }
}