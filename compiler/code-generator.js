import { TOKEN_TYPES } from "./parser/lib";

const { NUMBER, EXPRESSION, SEQUENCE } = TOKEN_TYPES;

const codeGenerator = (ast) => {
    const generateCodeFromToken = (token) => {
        if (token.type === NUMBER) {
            return token.value;
        } else if (token.type === EXPRESSION) {
            return `${token.name}(${token.params.map(generateCodeFromToken).join(", ")})`;
        } else if (token.type === SEQUENCE) {
            return token.params.map(generateCodeFromToken).join(";\n");
        }
    };

    return generateCodeFromToken(ast);
};

export default codeGenerator;