import astGenerator from '../../parser/ast-generator.js';
import { TOKEN_TYPES } from "../../parser/lib.js";

const { S_EXPRESSION, END_S_EXPRESSION, SYMBOL, NUMBER, SEQUENCE, EXPRESSION } = TOKEN_TYPES;

describe("AST Generator", () => {
    it("Will return an AST with an empty body if 0 tokens are provided", () => {
        const expectedAst = {
            type: SEQUENCE,
            body: []
        };

        expect(astGenerator([])).toEqual(expectedAst);
    });

    it("Will generate an AST with an Expression for calling the ADD method", () => {
        const expectedAst = {
            type: SEQUENCE,
            body: [
                {
                    type: EXPRESSION,
                    name: 'ADD',
                    params: [
                        {
                            type: NUMBER,
                            value: "1"
                        },
                        {
                            type: NUMBER,
                            value: "2"
                        }
                    ]
                }
            ]
        };

        const tokens = [
            {
                type: S_EXPRESSION,
                value: "("
            },
            {
                type: SYMBOL,
                value: "ADD"
            },
            {
                type: NUMBER,
                value: "1"
            },
            {
                type: NUMBER,
                value: "2"
            },
            {
                type: END_S_EXPRESSION,
                value: ")"
            }
        ];

        expect(astGenerator(tokens)).toEqual(expectedAst);
    });
});