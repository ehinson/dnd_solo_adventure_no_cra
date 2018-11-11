import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import * as s from '../selectors/player';
import { setAbilityModifier, calculateHealth } from '../../utils/playerUtils';

export const defaultState = fromJS({
  race: {
    name: null,
  },
  category: {
    name: null,
  },
  level: {
    currentLevel: 1,
    proficiencyBonus: 2,
  },
  health: {
    currentHealth: 8,
    maxHealth: 8,
  },
  proficiencies: [],
  mainStats: {
    strength: {
      score: 10,
      modifier: 0,
    },
    dexterity: {
      score: 10,
      modifier: 0,
    },
    constitution: {
      score: 10,
      modifier: 0,
    },
    intelligence: {
      score: 10,
      modifier: 0,
    },
    wisdom: {
      score: 10,
      modifier: 0,
    },
    charisma: {
      score: 10,
      modifier: 0,
    },
  },
});

export default handleActions({
  PLAYER: {
    SET: (state, { payload: player }) => state.mergeDeep(fromJS(player)),
    MODIFIER: {
      SET: (state, { payload: modifier }) => state.set('modifier', fromJS(modifier)),
    },
    RACE: {
      SET: (state, { payload: race }) => state.set('race', fromJS(race)),
    },
    CATEGORY: {
      SET: (state, { payload: category }) => state.set('category', fromJS(category)),
    },
    HEALTH: {
      SET: (state, { payload: category }) => state.set('health', fromJS(calculateHealth(category, s.getPlayerAbilityModifier(state, 'constitution'), s.getPlayerLevel(state)))),
      HEAL: {
        SET: (state, { payload: heal }) => state.setIn(['health', 'currentHealth'], fromJS(state.getIn(['health', 'currentHealth']) + heal)),
      },
      HARM: {
        SET: (state, { payload: harm }) => state.setIn(['health', 'currentHealth'], fromJS(state.getIn(['health', 'currentHealth']) - harm)),
      },
    },
    PROFICIENCIES: {
      SET: (state, { payload: prof }) => state.merge(fromJS(prof)),
    },
    MAIN_STATS: {
      SET: (state, { payload: stats }) => state.set('mainStats', fromJS(setAbilityModifier(stats, state))),
    },
  },
}, defaultState);
