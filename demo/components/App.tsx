import 'codemirror/lib/codemirror.css';

import * as React from 'react';
import * as CodeMirror from 'react-codemirror';
import Panel from './panels/Panel.tsx';

type AppState = { lisp: string, ast: string, javascript: string };

class App extends React.Component<{}, AppState> {
    state: AppState = {
        lisp: "// Code", 
        ast: "", 
        javascript: ""
    };

    private onChange(newLisp: string): void {
        this.setState({ lisp: newLisp } as AppState);
    }

    render() {
        return <div>
            <h1>LISP to JavaScript Compiler</h1>
            <div id="panels">
                <Panel heading="Lisp">
                    <CodeMirror value={this.state.lisp} onChange={this.onChange.bind(this)} />
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