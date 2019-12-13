import * as actionType from "../actions/actionTypes";
const initialState={
    authenticationIsChecked:false,
    isAuthenticated:false
};

const reducer =(state=initialState ,action)=>{
    switch (action.type){
        case actionType.AUTH_IS_OK:
            return {
                ...state,
                authenticationIsChecked:true,
                isAuthenticated:true
            };
        case actionType.AUTH_NOT_VALID:
            return {
                ...state,
                authenticationIsChecked:true,
                isAuthenticated:false
            }
        default:
            return state;

    }
};

export default reducer;