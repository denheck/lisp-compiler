/**
 * Parser - AST Generator - Syntactic Analysis
 */

import { isStartExpression, isEndExpression, extractCharacter } from "./lib.js";
import { TOKEN_TYPES } from "../parser/lib";

const { EXPRESSION, SEQUENCE } = TOKEN_TYPES;

const astGenerator = (tokens) => {
    const lastTokenPosition = tokens.length - 1;
    const generateTree = (position) => {
        const currentToken = tokens[position];
        const nextPosition = position + 1;
        const nextToken = tokens[nextPosition];

        if (typeof nextToken !== 'undefined' && isStartExpression(currentToken)) {
            const type = EXPRESSION;
            const name = extractCharacter(nextToken);
            const nextNextPosition = nextPosition + 1;
            const [newPosition, params] = generateTrees(nextNextPosition);

            return [newPosition, { type, name, params }];
        }

        return [nextPosition, currentToken];
    };

    const generateTrees = (position, trees = []) => {
        const currentToken = tokens[position];

        if (position >= lastTokenPosition || isEndExpression(currentToken)) {
            return [lastTokenPosition, trees];
        }

        const [nextPosition, treeNode] = generateTree(position);

        return generateTrees(nextPosition, [...trees, treeNode]);
    };

    const startingPosition = 0;
    const [, body] = generateTrees(startingPosition);

    return {
        type: SEQUENCE,
        body
    };
};

export default astGenerator;