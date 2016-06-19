import * as React from 'react';
import Panel from './panels/Panel.tsx';

const App = () =>
    <div>
        <h1>LISP to JavaScript Compiler</h1>
        <div id="panels">
            <Panel heading="Lisp">
                <div>LISP PANEL</div>
            </Panel>
            <Panel heading="AST">
                <div>AST PANEL</div>
            </Panel>
            <Panel heading="JS">
                <div>JS PANEL</div>
            </Panel>
        </div>
    </div>;

export default App;