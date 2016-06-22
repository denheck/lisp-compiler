/**
 * Parser - Tokenizer - Lexical Analysis
 */

import { isStartExpression, isEndExpression, extractCharacter, TOKEN_TYPES } from "./lib.js";

const { S_EXPRESSION, END_S_EXPRESSION, SYMBOL, NUMBER } = TOKEN_TYPES;

const createToken = (type, value) => {
    return { type, value };
};

const REGEX_WHITESPACE = /^\s{1}$/;
const isWhitespace = (string) => REGEX_WHITESPACE.test(string);

const REGEX_SYMBOL = /^[a-zA-Z-_]{1}$/;
const isSymbol = (string) => REGEX_SYMBOL.test(string);

const REGEX_NUMBER = /^[0-9]{1}$/;
const isNumber = (string) => REGEX_NUMBER.test(string);

const isGroupable = (character) => isNumber(character) || isSymbol(character);

const tokenize = (code, position = 0, tokens = []) => {
    const lastCharPosition = code.length - 1;

    if (position > lastCharPosition) {
        return tokens;
    }

    const nextPosition = position + 1;
    const previousPosition = position - 1;
    const character = code[position];

    // skip tokenizing whitespace
    if (isWhitespace(character)) {
        return tokenize(code, nextPosition, tokens);
    } else if (isStartExpression(character)) {
        const token = createToken(S_EXPRESSION, character);

        return tokenize(code, nextPosition, [...tokens, token]);
    } else if (isEndExpression(character)) {
        const token = createToken(END_S_EXPRESSION, character);

        return tokenize(code, nextPosition, [...tokens, token]);
    } else if (isGroupable(character)) {
        const previousCharacter = code[previousPosition];

        if (isGroupable(previousCharacter)) {
            // all tokens except the last one
            const initialTokens = tokens.slice(0 ,-1);
            const [lastToken] = tokens.slice(-1);
            const newValue = extractCharacter(lastToken) + character;
            const newLastToken = Object.assign({}, lastToken, { value: newValue });

            return tokenize(code, nextPosition, [...initialTokens, newLastToken]);
        }

        if (isNumber(character)) {
            const token = createToken(NUMBER, character);

            return tokenize(code, nextPosition, [...tokens, token]);
        }

        const token = createToken(SYMBOL, character);

        return tokenize(code, nextPosition, [...tokens, token]);
    }

    throw new Error(`Unable to parse invalid token: "${character}"`);
};

export default tokenize;