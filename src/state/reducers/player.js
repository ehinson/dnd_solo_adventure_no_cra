import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import * as s from '../selectors/player';
import { roll } from '../../utils/playerUtils';

const skills = {
  strength: {
    athletics: 0,
  },
  dexterity: {
    acrobatics: 0,
    sleightOfHand: 0,
    stealth: 0,
  },
  intelligence: {
    arcana: 0,
    history: 0,
    investigation: 0,
    nature: 0,
    religion: 0,
  },
  wisdom: {
    animalHandling: 0,
    insight: 0,
    medicine: 0,
    perception: 0,
    survival: 0,
  },
  charisma: {
    deception: 0,
    intimidation: 0,
    performance: 0,
    persuasion: 0,
  },
};

export const defaultState = fromJS({
  race: {
    name: 'human',
  },
  category: {
    name: 'fighter',
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

function setAbilityModifier(statObject, state) {
  const newStatObject = {};

  Object.keys(statObject).forEach((ability) => {
    const race = s.getRace(state);
    const modifier = calculateModifier(statObject, ability, race);
    Object.keys(skills).forEach((skill) => {
      Object.keys(skills[skill]).forEach((skl) => {
        const proficiencies = s.getProficiencies(state);
        if (proficiencies.includes(skl)) {
          const newModifier = modifier + s.getProficiencyBonus(state);
          skills[skill][skl] = newModifier;
        } else {
          skills[skill][skl] = modifier;
        }
      });
    });

    newStatObject[ability] = {
      score: statObject[ability].score,
      modifier,
      ...skills[ability],

    };
  });

  return newStatObject;
}

function calculateModifier(stats, ability, race) {
  console.log(race);
  console.log(stats);
  console.log(ability);
  const baseModifier = Math.floor(Number(stats[ability].score) / 2) - 5;
  switch (true) {
    case race === 'human':
      return baseModifier + 1;
    case race === 'dwarf' && ability === 'constitution':
      return baseModifier + 2;
    case race === 'elf' && ability === 'dexterity':
      return baseModifier + 2;
    default:
      return baseModifier;
  }
}

function calculateHealth(category, modifier, level) {
  console.log(category);
  console.log(modifier);

  const sidesOfDice = getHitDice(category.name);
  const baseHealth = sidesOfDice + modifier;

  if (level === 1) {
    return {
      currentHealth: baseHealth,
      maxHealth: baseHealth,
    };
  }
  const health = baseHealth + ((level - 1) * (roll(sidesOfDice) + modifier));

  return {
    currentHealth: health,
    maxHealth: health,
  };
}

function getHitDice(category) {
  switch (true) {
    case category === 'fighter':
      return 10;
    case category === 'wizard':
      return 6;
    default:
      return 8;
  }
}

function calculateProficiencyBonus(level) {
  switch (true) {
    case level <= 4:
      return 2;
    case level <= 8:
      return 3;
    case level <= 12:
      return 4;
    case level <= 16:
      return 5;
    case level <= 20:
      return 6;
    default:
      return 2;
  }
}
