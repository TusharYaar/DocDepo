export const ADD_DOC = 'ADD_DOC';
export const DELETE_DOC = 'DELETE_DOC';
export const SET_DOCS = 'SET_DOCS'
export const addDoc = (payload) => ({
    type: ADD_DOC,
    payload
})

export const deleteDoc = (payload) => ({   
    type: DELETE_DOC,
    payload          
})

export const addMultipleDocs = (payload) => ({
    type: SET_DOCS,
    payload
})