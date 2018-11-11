import React from 'react';
import { Link } from 'react-router-dom';
import { SplitLayoutContainer, SplitLayout, FullScreen, Content } from './App';
import Form from "./Form";


export default class Combat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visited: false,

    };
  }
  render(){
    return (
      <SplitLayoutContainer>
        <SplitLayout>
          <FullScreen>
            <Content>
                Combat<br/>
                {this.state.visited}
                <Form />
                <Link to="/">Link to Home</Link>
            </Content>
          </FullScreen>
        </SplitLayout>
      </SplitLayoutContainer>
    )
  }
}