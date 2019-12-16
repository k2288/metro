import * as actionTypes from "../actions/actionTypes"
import UniqueId from "../../utils/GenerateId"
import { stat } from "fs"
const initialState={
    windows:[],
    lastZIndex:0,
    contextMenuVisible:false,
    contextMenuItems:[],
    activeWindowId:"",
    rootFolders:[],
    desktopFolders:{
        contents:[]
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_NEW_WINDOW:
            let newWindows=[...state.windows]
            action.win.uniqueId=UniqueId();
            action.win.zIndex=state.lastZIndex+1;
            action.win.minimize=false;
            action.win.maximize=false;
            newWindows.push(action.win)
            return {
                ...state,
                windows:newWindows,
                lastZIndex:state.lastZIndex+1,
                activeWindowId:action.win.uniqueId
            }
        case actionTypes.REMOVE_WINDOW:
            newWindows=state.windows.filter(win=>{
                return win.uniqueId!==action.uniqueId
            });
            return {
                ...state,
                windows:newWindows
            }
        case actionTypes.SET_WINDOW_POSITION:
            let windowIndex=state.windows.findIndex(win=>{
                return win.uniqueId===action.uniqueId
            });
            newWindows=[...state.windows]
            
            newWindows[windowIndex].x=action.data.x
            newWindows[windowIndex].y=action.data.y
            newWindows[windowIndex].height=action.data.height
            newWindows[windowIndex].width=action.data.width

            return {
                ...state,
                windows:newWindows
            }
        case actionTypes.SET_ACTIVE:
            windowIndex=state.windows.findIndex(win=>{
                return win.uniqueId===action.uniqueId
            });
            newWindows=[...state.windows]
            
            newWindows[windowIndex].zIndex=state.lastZIndex+1

            return {
                ...state,
                windows:newWindows,
                lastZIndex:state.lastZIndex+1,
                activeWindowId:newWindows[windowIndex].uniqueId
            }
        case actionTypes.MINIMIZE:
            windowIndex=state.windows.findIndex(win=>{
                return win.uniqueId===action.uniqueId
            });
            newWindows=[...state.windows]
            
            newWindows[windowIndex].minimize=!newWindows[windowIndex].minimize
            newWindows[windowIndex].zIndex=state.lastZIndex+1
            let lastActiveWindow=state.lastActiveWindow;
            return {
                ...state,
                windows:newWindows,
                lastZIndex:state.lastZIndex+1,
                lastActiveWindow:newWindows[windowIndex].minimize?newWindows[windowIndex].uniqueId:lastActiveWindow
            }
        case actionTypes.MAXIMIZE:
            windowIndex=state.windows.findIndex(win=>{
                return win.uniqueId===action.uniqueId
            });
            newWindows=[...state.windows]
            
            newWindows[windowIndex].maximize=!newWindows[windowIndex].maximize
            return {
                ...state,
                windows:newWindows,
                lastActiveWindow:newWindows[windowIndex].maximize?newWindows[windowIndex].uniqueId:lastActiveWindow
            }
        case actionTypes.OPEN_CONTEXT_MENU:
            return {
                ...state,
                contextMenuVisible:true,
                contextMenuItems:action.items
            }
        case actionTypes.CLOSE_CONTEXT_MENU:
            return {
                ...state,
                contextMenuVisible:false,
                contextMenuItems:[]
            }
        case actionTypes.GET_ROOT_FOLDERS_SUCCESS:
            return {
                ...state,
                rootFolders:action.rootFolders
            }
        case actionTypes.GET_DESKTOP_FOLDERS_SUCCESS:
            return {
                ...state,
                desktopFolders:action.folders
            }
        default :
            return state;
    }
}

export default reducer;