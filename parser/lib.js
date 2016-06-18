const OPEN_PAREN = "(";
const CLOSE_PAREN = ")";

const S_EXPRESSION = "S_EXPRESSION";
const END_S_EXPRESSION = "END_S_EXPRESSION";
const SYMBOL = "SYMBOL";
const NUMBER = "NUMBER";
const EXPRESSION = "EXPRESSION";
const SEQUENCE = "SEQUENCE";

export const TOKEN_TYPES = { S_EXPRESSION, END_S_EXPRESSION, SYMBOL, NUMBER, EXPRESSION, SEQUENCE };

export const extractCharacter = (arg) => {
    const argType = typeof arg;

    if (argType === "object") {
        return arg.value;
    }

    if (argType === "string") {
        return arg;
    }

    throw new TypeError(`Invalid argument of type "${argType}"`);
};

export const isStartExpression = (arg) => extractCharacter(arg) === OPEN_PAREN;
export const isEndExpression = (arg) => extractCharacter(arg) === CLOSE_PAREN;