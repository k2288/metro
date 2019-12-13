import * as actionTypes from "../actions/actionTypes"
const initialState={
    windows:[]
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.ADD_NEW_WINDOW:
            return {
                ...state,
                windows:state.windows.concat({
                    id:new Date(),
                    name:"new window"
                })
            }
        case actionTypes.REMOVE_WINDOW:
            let newWindows=state.windows.filter(win=>{
                return win.id!==action.id
            });
            return {
                ...state,
                windows:newWindows
            }
        default :
            return state;
    }
}

export default reducer;