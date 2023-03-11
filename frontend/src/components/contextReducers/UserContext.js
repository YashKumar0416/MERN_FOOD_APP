export const initialUser = {isAuthenticated: false, name: '', email: '', phone: '', address: ''}

export const userReducer = (state, action)=> {
    if(action.type === "USER") {
        return {...state, isAuthenticated: action.isAuthenticated , name: action.name, email:action.email, phone: action.phone, address: action.address}
    }    
    return state;
}