import { createContext, useContext, useReducer } from "react";

const NotificationReducer =(state,action)=>{
   switch(action.type){
    case 'SET_NOTIFICATION':
        return action.payload
    case 'CLEAR_NOTIFICATION':
        return '';
    default:
        return state        
   }
}

const NotificationContext =createContext()

export const NotificationContextProvider=(props)=>{
    const [state, dispatch] = useReducer(NotificationReducer, '');
    return (
        <NotificationContext.Provider value={{state, dispatch}}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => useContext(NotificationContext);
