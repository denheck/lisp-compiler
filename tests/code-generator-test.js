import codeGenerator from '../code-generator';
import { TOKEN_TYPES } from "../parser/lib";

const { NUMBER, EXPRESSION, SEQUENCE } = TOKEN_TYPES;

describe("Code Generator", () => {
    it("Will generate an ADD function in JavaScript", () => {
        const expectedJavaScript = "add(1, 2)";
        const ast = {
            type: SEQUENCE,
            params: [
                {
                    type: EXPRESSION,
                    name: 'add',
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

        expect(codeGenerator(ast)).toEqual(expectedJavaScript);
    });
});