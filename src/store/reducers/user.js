import * as actionTypes from "../actions/actionTypes"

const initialState={
    user:null,
    saveUserLoading:false,
    saveUserFailed:null,
    getUserLoading:false,
    getUserFailed:null,
    users:{
        contents:[]
    },
    searchedRole:{
        contents:[]
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SAVE_USER_START:
            return {
                ...state,
                saveUserLoading:true,
                saveUserFailed:null
            }
        case actionTypes.SAVE_USER_FAILED:
            return {
                ...state,
                saveUserLoading:false,
                saveUserFailed:action.error
            }
        case actionTypes.SAVE_USER_SUCCESS:
            return {
                ...state,
                saveUserLoading:false,
                saveUserFailed:null
            }
        case actionTypes.GET_USERS_FAILED:
            return {
                ...state,
                getUserFailed:action.error,
                getUserLoading:false

            }
        case actionTypes.GET_USERS_START:
                return {
                    ...state,
                    getUserFailed:null,
                    getUserLoading:true
    
                }
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                getUserFailed:null,
                getUserLoading:false,
                users:action.users
            }
        case actionTypes.SEARCH_ROLE_SUCCESS:
            console.log(action.roles)
            return {
                ...state,
                searchedRole:action.roles
            }

        default:
            return state;
    }
}

export default reducer;