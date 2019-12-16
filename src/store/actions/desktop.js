import * as actionTypes from "./actionTypes"
import axios from "../../Axios-Hami"

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

const getRootSucces=(rootFolders)=>{
    return {
        type:actionTypes.GET_ROOT_FOLDERS_SUCCESS,
        rootFolders:rootFolders
    }
}

const getDesktopSuccess=(folders)=>{
    return {
        type:actionTypes.GET_DESKTOP_FOLDERS_SUCCESS,
        folders:folders
    }
}


export const getRoot=()=>{
    return dispatch=>{
        axios.get("/api/folder/rootFolders")
        .then(resp=>{
            dispatch(getRootSucces(resp.data))
            if(resp.data){
                let desktopFolder= resp.data.filter(folder=>{
                    return folder.title=="Desktop"
                });
                console.log(resp.data)
                console.log(desktopFolder)

                axios.get("/api/folder/children/"+desktopFolder[0].uuid+"/0/10")
                .then(resp=>{
                    dispatch(getDesktopSuccess(resp.data))
                })
                .catch(err=>{

                })
            }

        }).catch(err=>{

        })
    }
}
