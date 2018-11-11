export const getPlayer = state => state.player || state;

export const getPlayerAbility = (state, ability) => {
    return getPlayer(state).getIn([ability, 'score'])
};

export const getPlayerLevel = state => {
    return getPlayer(state).getIn(['level', 'currentLevel'])
}

export const getPlayerAbilityModifier = (state, ability) => {
    return getMainStats(state).getIn([ability, 'modifier'])
}

export const getMainStats = (state) => {
    return getPlayer(state).get('mainStats');
};

export const getRace = (state) => {
    return getPlayer(state).getIn(['race', 'name']);
};

export const getProficiencies = (state) => {
    return getPlayer(state).get('proficiencies');
};

export const getProficiencyBonus = (state) => {
    return getPlayer(state).getIn(['level', 'proficiencyBonus']);
};