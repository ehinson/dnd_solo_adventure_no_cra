import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import styled from 'styled-components';

import Home from './Home';
import Topics from './Topic';
import About from './About';
import Ring from './Ring';
import Combat from './Combat';

export const SplitLayoutContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const SplitLayout = styled.div`
  position: relative;
  overflow-x: hidden;
  min-height: 100%;
  width: 100%;
`;

export const LeftSide = styled.div`
  position: fixed;
  top: 0;
  z-index: ${p => (p.leftOpen ? '200' : '100')};
  width: 50%;
  height: 100%;
  text-align: center;
  -webkit-backface-visibility: hidden;
  background: red;
  left: 0;
  color: white;
  outline: 1px solid red;
  transition: transform 0.6s;
  transform: ${p => (p.leftOpen ? 'translateX(150%)' : p.rightOpen ? 'translateX(-60%)' : 'translateX(0)')};
`;

export const RightSide = styled.div`
  position: fixed;
  top: 0;
  z-index: ${p => (p.rightOpen ? '200' : '100')};
  width: 50%;
  height: 100%;
  text-align: center;
  -webkit-backface-visibility: hidden;
  background: yellow;
  right: 0;
	color: black;
  outline: 1px solid yellow;
  transition: transform 0.6s;
  transform: ${p => (p.rightOpen ? 'translateX(-150%)' : p.leftOpen ? 'translateX(60%)' : 'translateX(0)')};
`;

export const FullScreen = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  text-align: center;
  -webkit-backface-visibility: hidden;
  background: blue;

`;

export const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0 1em;
  width: 50%;
  cursor: pointer;
  transform: translateY(-50%) translateX(-50%);
  transition: transform 0.6s, top 0.6s;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 499;
  visibility: ${p => ((p.rightOpen || p.leftOpen) ? 'visible' : 'hidden')};
  width: 100%;
  height: 100%;
  opacity: ${p => ((p.rightOpen || p.leftOpen) ? 1 : 0)};
  color: gray;
  transition: opacity 0.6s, visibility 0.1s 0.6s;
  background: rgba(0,0,0,0.3);
`;

export const Page = styled.div`
  position: relative;
  top: 0;
  overflow: auto;
  min-height: 100%;
  width: 75%;
  height: auto;
  font-size: 1.4em;
  -webkit-backface-visibility: hidden;
  transition: transform 0.6s;
`;

export const PageRight = styled(Page)`
  left: 25%;
  outline: 5px solid magenta;
  background: magenta;
  color: white;
  transform: ${p => (p.rightOpen ? 'translateX(0%)' : 'translateX(100%)')};
  ${p => (p.rightOpen) && `
    position: absolute;
    overflow: hidden;
    height: 100%;
  `};
  ${p => (p.leftOpen) && `
    position: relative;
    overflow: auto;
    height: auto;
  `};
`;

export const PageLeft = styled(Page)`
  left: 0;
  outline: 5px solid orange;
  background: orange;
  color: #fff;
  text-align: right;
  transform: ${p => (p.leftOpen ? 'translateX(0%)' : 'translateX(-100%)')};
  ${p => (p.leftOpen) && `
    position: absolute;
    overflow: hidden;
    height: 100%;
  `};
  ${p => (p.rightOpen) && `
    position: relative;
    overflow: auto;
    height: auto;
  `};
`;

class App extends Component {
    render() {
        return (
            <Router>
                <SplitLayoutContainer>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/ring" component={Ring} />
                    <Route path="/topics" component={Topics} />
                    <Route path="/combat" component={Combat} />
                </SplitLayoutContainer>
            </Router>
        );
    }
}

export default App;
