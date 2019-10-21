import {
    ADD_TOKEN
} from '../actions/buddyActions';
const initialState = {
    token: null,
}

export const buddyReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TOKEN: {
            console.log(action.payload)
            return {
                ...state,
                token: action.payload,
            }
        }
        default: return state;
    }
}