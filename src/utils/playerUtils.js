import * as s from '../state/selectors/player';


export function roll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

export const skills = {
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

export function setAbilityModifier(statObject, state) {
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

export function calculateModifier(stats, ability, race) {
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

export function calculateHealth(category, modifier, level) {
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

export function getHitDice(category) {
  switch (true) {
    case category === 'fighter':
      return 10;
    case category === 'wizard':
      return 6;
    default:
      return 8;
  }
}

export function calculateProficiencyBonus(level) {
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
