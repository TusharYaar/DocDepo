export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';



export const loginUser = (payload) => ({
    type: LOGIN,
    payload
})

export const logoutUser = () => ({   
    type: LOGOUT,
})

