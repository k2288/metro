import * as actionTypes from "./actionTypes"

export const addWindow=(win)=>{
    return {
        type:actionTypes.ADD_NEW_WINDOW,
        win:win
    }
}

export const closeWindow=(id)=>{
    return {
        type:actionTypes.REMOVE_WINDOW,
        id:id
    }
}