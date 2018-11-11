import React from 'react';
import { Link } from 'react-router-dom';
import {
    SplitLayoutContainer,
    SplitLayout,
    LeftSide,
    RightSide,
    PageRight,
    PageLeft,
    Content,
    Overlay,
} from './App';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            right: {
                open: false,
            },
            left: {
                open: false,
            },
        };
    }

    handleLeftClick = () => {
        const { left } = this.state;
        this.setState({
            left: {
                open: !left.open,
            },
        });
    };

    handleRightClick = () => {
        const { right } = this.state;
        this.setState({
            right: {
                open: !right.open,
            },
        });
    };

    render() {
        const { left, right } = this.state;
        return (
            <SplitLayoutContainer>
                <SplitLayout leftOpen={left.open} rightOpen={right.open}>
                    <div className="intro">
                        <LeftSide
                            leftOpen={left.open}
                            rightOpen={right.open}
                            onClick={this.handleLeftClick}
                        >
                            <Content>
                                Choose A
                                <br />
                                <Link to="/">Home</Link>
                            </Content>
                            <Overlay leftOpen={left.open} rightOpen={right.open} />
                        </LeftSide>
                        <RightSide
                            rightOpen={right.open}
                            leftOpen={left.open}
                            onClick={this.handleRightClick}
                        >
                            <Content>
                                Choose B
                                <br />
                                <Link to="/">Home</Link>
                            </Content>
                            <Overlay rightOpen={right.open} leftOpen={left.open} />
                        </RightSide>
                    </div>
                    <PageRight rightOpen={right.open} leftOpen={left.open}>
                        You chose B <Link to="/combat">Combat</Link>
                    </PageRight>
                    <PageLeft rightOpen={right.open} leftOpen={left.open}>
                        You chose A <Link to="/ring">Ring</Link>
                    </PageLeft>
                </SplitLayout>
            </SplitLayoutContainer>
        );
    }
}
