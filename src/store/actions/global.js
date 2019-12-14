import * as actionTypes from "./actionTypes"
import axios from '../../Axios-Hami';


export const authOk=(user)=>{
    return {
        type:actionTypes.AUTH_IS_OK,
        user:user
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
            dispatch(authOk(response.data));

        })
        .catch(error=>{
            dispatch(authIsNotValid())
        })
    }
}

export const logout=()=>{
    return dispatch=>{
        axios.get("/logout")
            .then(resp=>{
                dispatch(authIsNotValid());
            })
            .catch(err=>{
                
            })
    }
}