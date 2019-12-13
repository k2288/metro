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

export const backToSignIn=()=>{
    return {
        type:actionTypes.BACK_TO_SIGN_IN,
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
            console.log(err);
            dispatch(authFail(err.response.data));
        })
    }
}