import axios from "axios";
import {useEffect} from "react";
import
{
    createContext,
    useReducer
}
from "react";
import Reducer from "./Reducer";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
};
export const Context = createContext(initialState);
export const ContextProvider = ({children}) => {
    const [state,
        dispatch] = useReducer(Reducer, initialState);
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
        console.log(state);
    }, [state.user]);
    return (
        <Context.Provider
            value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </Context.Provider>
    )
}
