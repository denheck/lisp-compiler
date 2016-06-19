import * as React from 'react';

type Props = { children?: any, heading: string };

const Panel = ({ children, heading }: Props) =>
    <div className="panel">
        <h3>{heading}</h3>
        {children}
    </div>;

export default Panel;