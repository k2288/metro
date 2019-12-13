import * as actionTypes from "./actionTypes"
import axios from '../../Axios-Hami';


export const authOk=()=>{
    return {
        type:actionTypes.AUTH_IS_OK
    }
};

export const authIsNotValid=()=>{
    return {
        type:actionTypes.AUTH_NOT_VALID
    }
};


export const checkAuth=()=>{
    return dispatch=>{
        axios.get("api/users/principle")
        .then(response=>{
            dispatch(authOk());
        })
        .catch(error=>{
            dispatch(authIsNotValid())
        })
    }
}