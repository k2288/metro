import * as actionTypes from "./actionTypes"

export const addWindow=(win)=>{
    return {
        type:actionTypes.ADD_NEW_WINDOW,
        win:win
    }
}

export const closeWindow=(uniqueId)=>{
    return {
        type:actionTypes.REMOVE_WINDOW,
        uniqueId:uniqueId
    }
}

export const setPosition=(uniqueId,data)=>{
    return {
        type:actionTypes.SET_WINDOW_POSITION,
        uniqueId:uniqueId,
        data:data
    }
}

export const setActive=(uniqueId)=>{
    return {
        type:actionTypes.SET_ACTIVE,
        uniqueId:uniqueId
    }
}

export const minimize=(uniqueId)=>{
    return {
        type:actionTypes.MINIMIZE,
        uniqueId:uniqueId
    }
}

export const maximize=(uniqueId)=>{
    return {
        type:actionTypes.MAXIMIZE,
        uniqueId:uniqueId
    }
}

export const openContextMenu=(items)=>{
    return {
        type:actionTypes.OPEN_CONTEXT_MENU,
        items:items
    }
}

export const closeContextMenu=(items)=>{
    return {
        type:actionTypes.CLOSE_CONTEXT_MENU
    }
}
