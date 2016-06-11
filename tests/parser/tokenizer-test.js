import tokenizer from "../../parser/tokenizer.js";
import { TOKEN_TYPES } from "../../parser/lib.js";

const { S_EXPRESSION, END_S_EXPRESSION, SYMBOL, NUMBER } = TOKEN_TYPES;

describe("Tokenizer", () => {
    const expectTokenized = (code) => {
        return {
            toEqual(expected) {
                expect(tokenizer(code)).toEqual(expected);
            }
        };
    };

    it("Won't add whitespace to tokens", () => {
        expect(tokenizer(" \n")).toEqual([]);
    });

    it("Will add parens to tokens", () => {
        expectTokenized("(").toEqual([
            {
                type: S_EXPRESSION,
                value: "("
            }
        ]);

        expectTokenized(")").toEqual([
            {
                type: END_S_EXPRESSION,
                value: ")"
            }
        ]);
    });

    it("Will add symbols to tokens", () => {
        expectTokenized("a").toEqual([
            {
                type: SYMBOL,
                value: "a"
            }
        ]);

        expectTokenized("Z").toEqual([
            {
                type: SYMBOL,
                value: "Z"
            }
        ]);

        expectTokenized("_").toEqual([
            {
                type: SYMBOL,
                value: "_"
            }
        ]);

        expectTokenized("-").toEqual([
            {
                type: SYMBOL,
                value: "-"
            }
        ]);
    });


    it("Will group consecutive symbols into tokens", () => {
        expectTokenized("FooBar").toEqual([
            {
                type: SYMBOL,
                value: "FooBar"
            }
        ]);
    });

    it("Will group symbols separated by whitespace into tokens", () => {
        const code = ["proc", "first_arg", "second_arg"].join(" ");

        expectTokenized(code).toEqual([
            {
                type: SYMBOL,
                value: "proc"
            },
            {
                type: SYMBOL,
                value: "first_arg"
            },
            {
                type: SYMBOL,
                value: "second_arg"
            }
        ])
    });

    it("Will group consecutive numbers into a token of type NUMBER", () => {
        expectTokenized("1234").toEqual([
            {
                type: NUMBER,
                value: "1234"
            }
        ]);
    });

    it("Will group numbers separated by whitespace into tokens of type NUMBER", () => {
        const code = ["123", "456", "7890"].join(" ");

        expectTokenized(code).toEqual([
            {
                type: NUMBER,
                value: "123"
            },
            {
                type: NUMBER,
                value: "456"
            },
            {
                type: NUMBER,
                value: "7890"
            }
        ]);
    });

    it("Will be unable to parse invalid tokens", () => {
        // have to wrap exceptions in anonymous function
        expect(() => tokenizer("$")).toThrow(new Error('Unable to parse invalid token: "$"'));
    });
});