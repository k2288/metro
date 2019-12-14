import * as actionTypes from "../actions/actionTypes"
import UniqueId from "../../utils/GenerateId"
import { stat } from "fs"
const initialState={
    windows:[],
    lastZIndex:0
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_NEW_WINDOW:
            let newWindows=[...state.windows]
            action.win.uniqueId=UniqueId();
            action.win.zIndex=state.lastZIndex+1;
            newWindows.push(action.win)
            return {
                ...state,
                windows:newWindows,
                lastZIndex:state.lastZIndex+1
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
                lastZIndex:state.lastZIndex+1
            }
            
        default :
            return state;
    }
}

export default reducer;