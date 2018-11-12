import { getFormValues, formValueSelector } from 'redux-form';

export const formName = 'player';

export const getPlayerFormValues = state => getFormValues(formName)(state);

export const getPlayerFieldValues = (state, fieldNames) => formValueSelector(formName)(state, ...fieldNames);

export const getPlayer = state => state.player || state;

export const getPlayerLevel = state => getPlayer(state).getIn(['level', 'currentLevel']);

export const getMainStats = state => getPlayer(state).get('mainStats');

export const getPlayerAbility = (state, ability) => getMainStats(state).getIn([ability, 'score']);

export const getPlayerAbilityModifier = (state, ability) => getMainStats(state).getIn([ability, 'modifier']);

export const getRace = state => getPlayer(state).getIn(['race', 'name']);

export const getProficiencies = state => getPlayer(state).get('proficiencies');

export const getProficiencyBonus = state => getPlayer(state).getIn(['level', 'proficiencyBonus']);
