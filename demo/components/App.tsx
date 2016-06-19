import * as React from 'react';
import Panel from './panels/Panel.tsx';
import * as CodeMirror from "react-codemirror"

type AppState = { lisp: string, ast: string, javascript: string };

class App extends React.Component<{}, AppState> {
    state: AppState;

    constructor() {
        super();
        this.state = { lisp: "// Code", ast: "", javascript: "" };
    }

    private onChange(newLisp: string): void {
        this.setState({ lisp: newLisp } as AppState);
    }

    render() {
        return <div>
            <h1>LISP to JavaScript Compiler</h1>
            <div id="panels">
                <Panel heading="Lisp">
                    <CodeMirror value={this.state.lisp} onChange={this.onChange} />
                </Panel>
                <Panel heading="AST">
                    <div>{this.state.ast}</div>
                </Panel>
                <Panel heading="JS">
                    <div>{this.state.javascript}</div>
                </Panel>
            </div>
        </div>;
    }
}

export default App;