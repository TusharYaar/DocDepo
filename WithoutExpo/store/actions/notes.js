export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const SET_NOTES = 'SET_NOTES'
export const addNote = (payload) => ({
    type: ADD_NOTE,
    payload
})

export const deleteNote = (payload) => ({   
    type: DELETE_NOTE,
    payload          
})

export const addMultipleNotes = (payload) => ({
    type: SET_NOTES,
    payload
})