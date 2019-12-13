import * as actionType from "../actions/actionTypes";
const initialState={
    loading:false,
    error:null
};

const reducer =(state=initialState ,action)=>{
    switch (action.type){
        case actionType.AUTH_START:
            return {
                ...state,
                loading:true,
                error:null
            };

        case actionType.AUTH_FAIL:
            return{
                ...state,
                loading:false,
                error:action.error
            };
        case actionType.BACK_TO_SIGN_IN:
            return{
                ...state,
                loading:false,
                error:null
            };

        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                loading:false
            };

        default :
            return state;
    }
};

export default reducer;