import tokenizer from './parser/tokenizer.js';
import astGenerator from './parser/ast-generator';

export default (code) => astGenerator(tokenizer(code))