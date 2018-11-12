import React from 'react';
import { Route, Link } from 'react-router-dom';
import { object } from 'prop-types';


const topicPropTypes = {
  match: object.isRequired,
};

const Topic = ({ match }) => (
  <div>
    <h3>{ match.params.topicId }</h3>
  </div>
);

Topic.propTypes = topicPropTypes;

const topicsPropTypes = {
  match: object.isRequired,
};

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

Topics.propTypes = topicsPropTypes;

export default Topics;
