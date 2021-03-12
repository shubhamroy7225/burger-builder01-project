import * as actionsTypes from "../../actions/actionsTypes"
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error:false,
  };
  const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
  };
  const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionsTypes.SET_INGREDIENTS:
        return{
          ...state,
          ingredients:action.ingredients,
          error:false
        }
        case actionsTypes.FETCH_INGREDIENTS_FAILED:
          return{
            ...state,
            ingredients:null
          }
      case actionsTypes.ADDINGREDIENT:
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.payload]: state.ingredients[action.payload] + 1,
          },
          totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
        };
        case actionsTypes.REMOVEINGREDIENT:
            return {
              ...state,
              ingredients: {
                ...state.ingredients,
                [action.payload]: state.ingredients[action.payload] - 1,
              },
              totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
            };
     
      default:
        return state;
    }
  };
  export default burgerBuilderReducer;