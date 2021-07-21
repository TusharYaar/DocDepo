import { SET_THEME } from "../actions/themes"

const initialState = {
    value: "lightTheme"
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case SET_THEME:
        return { value :payload}

    default:
        return state
    }
}
