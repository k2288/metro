import axios from '../../Axios-Hami';
import * as actionTypes from "./actionTypes"
import * as actions from "./global";


export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    };
};
export const authSuccess=()=>{
    return{
        type:actionTypes.AUTH_SUCCESS
    };
};

export const authFail=(err)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:err
    }
};

export const auth=(data)=>{
    return dispatch=>{
        dispatch(authStart());
        axios.post("/login",data)
        .then(resp=>{
            dispatch(authSuccess());
            dispatch(actions.authOk());
        })
        .catch(err=>{
            dispatch(authFail(err));
        })
    }
}