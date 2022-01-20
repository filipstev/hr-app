export const ACTIONS = {
    FETCH_PROFILES: 'FETCH_PROFILES',
    PAGE_NUMBER: 'PAGE_NUMBER',
};

const initalState = { profiles: [], pageNumber: '' };
const getProfilesReducer = (state = initalState, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_PROFILES:
            console.log(ACTIONS.FETCH_PROFILES);
            return {
                ...state,
                profiles: action.fetchedProfiles,
            };
        case ACTIONS.PAGE_NUMBER:
            console.log(ACTIONS.PAGE_NUMBER);
            return {
                ...state,
                pageNumber: action.pageNumber,
            };
        default:
            return state;
    }
};

export default getProfilesReducer;
