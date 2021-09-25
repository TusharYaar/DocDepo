import {ADD_NOTE, DELETE_NOTE,SET_NOTES } from "../actions/notes";

const initialState = {
    notes : [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case ADD_NOTE:
        return {notes : [...state.notes, payload]}
    case DELETE_NOTE:
        return {notes : state.notes.filter(note => note.id !== payload.id)}
    case SET_NOTES:
        return {notes : [...payload]}
    default:
        return state
    }
}
