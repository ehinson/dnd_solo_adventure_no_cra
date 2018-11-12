import React from 'react';
import { connect } from 'react-redux';
import {
  Field,
  reduxForm,
  change,
  FormSection,
} from 'redux-form';
import { compose } from 'recompose';
import { func, bool, object } from 'prop-types';
import { required } from 'redux-form-validators';

import {
  StyledForm,
} from './App';

import playerActions from '../state/actions/player';
import * as s from '../state/selectors/player';
import { roll } from '../utils/playerUtils';
import { toJS } from '../utils/utils';


const abilitiesPropTypes = {
  generateAbilityScore: func.isRequired,
};

// map over array to build this component
const Abilities = props => (
  <React.Fragment>
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
        onClick={() => props.generateAbilityScore('abilities.strength', 6, 4)}
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
        onClick={() => props.generateAbilityScore('abilities.dexterity', 6, 4)}
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
        onClick={() => props.generateAbilityScore('abilities.constitution', 6, 4)}
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
        onClick={() => props.generateAbilityScore('abilities.intelligence', 6, 4)}
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
        onClick={() => props.generateAbilityScore('abilities.wisdom', 6, 4)}
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
        onClick={() => props.generateAbilityScore('abilities.charisma', 6, 4)}
      />
    </div>
  </React.Fragment>
);

Abilities.propTypes = abilitiesPropTypes;

const propTypes = {
  changeFieldValue: func.isRequired,
  createPlayer: func.isRequired,
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  player: object,
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
          score: values.abilities.strength,
        },
        dexterity: {
          score: values.abilities.dexterity,
        },
        constitution: {
          score: values.abilities.constitution,
        },
        intelligence: {
          score: values.abilities.intelligence,
        },
        wisdom: {
          score: values.abilities.wisdom,
        },
        charisma: {
          score: values.abilities.charisma,
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
    const {
      handleSubmit,
      submitting,
      player,
      valid,
    } = this.props;

    return (
      <StyledForm onSubmit={handleSubmit(this.submit)}>
        <div>
          <label htmlFor="race">Race</label>
          <div>
            <Field name="race" id="race" component="select" validate={required()}>
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
            <Field name="category" id="category" component="select" validate={required()}>
              <option />
              <option value="fighter">Fighter</option>
              <option value="wizard">Wizard</option>
            </Field>
          </div>
        </div>
        { player && player.race && player.category && (
          <FormSection name="abilities">
            <Abilities generateAbilityScore={this.generateAbilityScore} />
          </FormSection>
        )
        }
        <input type="submit" value="Submit" disabled={submitting || !valid} />
      </StyledForm>
    );
  }
}

const mapStateToProps = state => ({
  player: s.getPlayerFormValues(state),
  initialValues: {
    race: '',
    category: '',
    abilities: {
      strength: s.getPlayerAbility(state, 'strength'),
      dexterity: s.getPlayerAbility(state, 'dexterity'),
      constitution: s.getPlayerAbility(state, 'constitution'),
      intelligence: s.getPlayerAbility(state, 'intelligence'),
      wisdom: s.getPlayerAbility(state, 'wisdom'),
      charisma: s.getPlayerAbility(state, 'charisma'),
    },
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
