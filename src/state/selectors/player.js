export const getPlayer = state => state.player || state;

export const getPlayerAbility = (state, ability) => getPlayer(state).getIn([ability, 'score']);

export const getPlayerLevel = state => getPlayer(state).getIn(['level', 'currentLevel']);

export const getPlayerAbilityModifier = (state, ability) => getMainStats(state).getIn([ability, 'modifier']);

export const getMainStats = state => getPlayer(state).get('mainStats');

export const getRace = state => getPlayer(state).getIn(['race', 'name']);

export const getProficiencies = state => getPlayer(state).get('proficiencies');

export const getProficiencyBonus = state => getPlayer(state).getIn(['level', 'proficiencyBonus']);
