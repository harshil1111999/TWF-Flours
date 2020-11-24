export const initialState = {
    user: null
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            if(action.payload === undefined)
                return state
            return {
                user: action.payload
            }
        default: 
            return state
    }
}

export default reducer;