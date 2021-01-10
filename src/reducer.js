import {
    ACTIVATE_USER,
    ADD_USER,
    DEACTIVATE_USER,
    REMOVE_USER,
    EDIT_USER,
    EXIT_ADD_FORM,
    EXIT_EDIT_USER,
    ADD_USER_FORM,
    VIEW_USER,
    EXIT_VEW_USER,
    SAVE_UPDATES,
} from "./actions";
import { removeUser, registerUser } from "./client/";

function reducer(state, action) {
    /*forms*/
    if (action.type === EXIT_ADD_FORM) {
        return {...state, adduser: false };
    }
    if (action.type === ADD_USER_FORM) {
        return {...state, adduser: true };
    }

    /*user data*/
    if (action.type === ADD_USER) {
        if (action.payload) {
            registerUser(action.payload);
        }
        return {...state, adduser: false };
    }

    if (action.type === REMOVE_USER) {
        return {...state, data: removeUser(action.payload) };
    }

    if (action.type === VIEW_USER) {
        return {
            ...state,
            adduser: false,
            viewuser: true,
            viewdata: action.payload,
            viewusr: true,
        };
    }
    if (action.type === EXIT_VEW_USER) {
        return {
            ...state,
            viewuser: false,
            viewdata: null,
        };
    }
    if (action.type === EDIT_USER) {
        return {...state, edituser: true, viewuser: false };
    }
    if (action.type === EXIT_EDIT_USER) {
        return {...state, edituser: false, viewdata: null };
    }
    if (action.type === SAVE_UPDATES) {
        let { data } = state;
        const { payload } = action;

        for (let i = 0; i < data.length; i++) {
            if (data[i].id === payload.id) {
                data[i] = payload;
                if (payload.role === "admin") {
                    state.profile = payload;
                }
            }
        }

        return {...state, edituser: false, data, viewdata: null };
    }
    return state;
}

export default reducer;