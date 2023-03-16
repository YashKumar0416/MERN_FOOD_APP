import { createContext, useContext, useReducer } from "react";

const ItemsStateContext = createContext();
const ItemsDispatchContext = createContext();

const initialState = {
    isLoading: false,
    isError: false,
    allItems: [],
    filterItems: []
}

const ItemsReducer = (state, action)=> {

    const itemsData = [...action.payload]
    
    if(action.type === "SET_API_DATA") {
        return {...state, allItems: itemsData}
    }

    if(action.type === "SORT_ASCENDING") {
        let newArr = itemsData.sort((a,b)=> {
            return a.name.localeCompare(b.name)
        })
        return {...state, allItems: newArr}
    }

    if(action.type === "SORT_LOW_PRICE") {
        let newArr = itemsData.sort((a,b)=> {
            return Object.values(a.options[0])[0] - Object.values(b.options[0])[0]
        })
        return {...state, allItems: newArr}
    }

    if(action.type === "SORT_HIGH_PRICE") {
        let newArr = itemsData.sort((a,b)=> {
            return Object.values(b.options[0])[0] - Object.values(a.options[0])[0]
        })
        return {...state, allItems: newArr}
    }

    if(action.type === "FILTER_CATEGORY") {
        let newArr = action.payload[0]
        let category = action.payload[1]
        let filteredData = newArr.filter((item)=> {
            return item.category === category
        })
        
        return {...state, allItems: filteredData}
    }

    return state
}

const ItemsProvider = ({children})=> {

    const [state, dispatch] = useReducer(ItemsReducer, initialState);

    return (
            <ItemsDispatchContext.Provider value={dispatch}>
                <ItemsStateContext.Provider value={state}>
                    {children}
                </ItemsStateContext.Provider>
            </ItemsDispatchContext.Provider>
    )
}

const useItems = ()=> useContext(ItemsStateContext);
const useDispatchItems = ()=> useContext(ItemsDispatchContext);

export { ItemsStateContext, ItemsProvider, useItems, useDispatchItems};