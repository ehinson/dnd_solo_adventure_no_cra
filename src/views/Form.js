import React from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  change,
} from 'redux-form';
import { compose } from 'recompose';
import { func, bool } from 'prop-types';

import playerActions from '../state/actions/player';
import * as s from '../state/selectors/player';
import { roll } from '../utils/playerUtils';
import { toJS } from '../utils/utils';


const propTypes = {
  changeFieldValue: func.isRequired,
  createPlayer: func.isRequired,
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
};

class Form extends React.Component {
  static propTypes = propTypes;

  generateAbilityScore = (fieldName, sides, numberOfDice) => {
    const rollArray = [];
    const { changeFieldValue } = this.props;

    for (let i = 0; i < numberOfDice; i++) {
      const diceRoll = roll(sides);
      rollArray.push(diceRoll);
    }
    rollArray.sort((a, b) => {
      if (a < b) {
        return -1;
      } if (a > b) {
        return 1;
      }
      return 0;

    });

    const total = rollArray.reduce((item, total) => item + total);
    if (total <= 20) {
      changeFieldValue(fieldName, total);
    } else {
      changeFieldValue(fieldName, 20);
    }
  };

  submit = (values) => {
    const { createPlayer } = this.props;

    const newPlayer = {
      mainStats: {
        strength: {
          score: values.strength,
        },
        dexterity: {
          score: values.dexterity,
        },
        constitution: {
          score: values.constitution,
        },
        intelligence: {
          score: values.intelligence,
        },
        wisdom: {
          score: values.wisdom,
        },
        charisma: {
          score: values.charisma,
        },
      },
      race: {
        name: values.race,
      },
      health: {
        currentHealth: 0,
        maxHealth: 0,
      },
      category: {
        name: values.category,
      },
    };
    createPlayer(newPlayer);
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div>
          <label htmlFor="strength">strength</label>
          <Field
            name="strength"
            id="strength"
            component="input"
            type="number"
            min="-10"
            max="20"
          />
          <input
            type="button"
            value="Roll"
            onClick={() => this.generateAbilityScore('strength', 6, 4)}
          />
        </div>
        <div>
          <label htmlFor="dexterity">dexterity</label>
          <Field
            name="dexterity"
            id="dexterity"
            component="input"
            type="number"
            min="-10"
            max="20"
          />
          <input
            type="button"
            value="Roll"
            onClick={() => this.generateAbilityScore('dexterity', 6, 4)}
          />
        </div>
        <div>
          <label htmlFor="constitution">constitution</label>
          <Field
            name="constitution"
            id="constitution"
            component="input"
            type="number"
            min="-10"
            max="20"
          />
          <input
            type="button"
            value="Roll"
            onClick={() => this.generateAbilityScore('constitution', 6, 4)}
          />
        </div>
        <div>
          <label htmlFor="intelligence">intelligence</label>
          <Field
            name="intelligence"
            id="intelligence"
            component="input"
            type="number"
            min="-10"
            max="20"
          />
          <input
            type="button"
            value="Roll"
            onClick={() => this.generateAbilityScore('intelligence', 6, 4)}
          />
        </div>
        <div>
          <label htmlFor="wisdom">wisdom</label>
          <Field
            name="wisdom"
            id="wisdom"
            component="input"
            type="number"
            min="-10"
            max="20"
          />
          <input
            type="button"
            value="Roll"
            onClick={() => this.generateAbilityScore('wisdom', 6, 4)}
          />
        </div>
        <div>
          <label htmlFor="charisma">charisma</label>
          <Field
            name="charisma"
            id="charisma"
            component="input"
            type="number"
            min="-10"
            max="20"
          />
          <input
            type="button"
            value="Roll"
            onClick={() => this.generateAbilityScore('charisma', 6, 4)}
          />
        </div>
        <div>
          <label htmlFor="race">Race</label>
          <div>
            <Field name="race" id="race" component="select">
              <option />
              <option value="human">Human</option>
              <option value="elf">Elf</option>
              <option value="dwarf">Dwarf</option>
            </Field>
          </div>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <div>
            <Field name="category" id="category" component="select">
              <option />
              <option value="fighter">Fighter</option>
              <option value="wizard">Wizard</option>
            </Field>
          </div>
        </div>
        <input type="submit" value="Submit" disabled={submitting} />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  player: {},
  initialValues: {
    strength: s.getPlayerAbility(state, 'strength'),
    dexterity: s.getPlayerAbility(state, 'dexterity'),
    constitution: s.getPlayerAbility(state, 'constitution'),
    intelligence: s.getPlayerAbility(state, 'intelligence'),
    wisdom: s.getPlayerAbility(state, 'wisdom'),
    charisma: s.getPlayerAbility(state, 'charisma'),
  },
});

const mapDispatchToProps = dispatch => ({
  createPlayer: (player) => {
    // create thunks so it's thenable?
    dispatch(playerActions.race.set(player.race));
    dispatch(playerActions.mainStats.set(player.mainStats));
    dispatch(playerActions.category.set(player.category));
    dispatch(playerActions.health.set(player.category));
  },
  changeFieldValue(field, value) {
    dispatch(change(s.formName, field, value));
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({
    form: s.formName,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
  }),
  toJS,
)(Form);
