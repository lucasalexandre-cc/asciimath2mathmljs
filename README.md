# mathml2asciimathjs

`mathml2asciimathjs` is a JavaScript library that converts MathML to ASCII math notation. This library is a direct port of a public Ruby library to JavaScript/TypeScript, enabling easy integration into web projects and applications to work seamlessly with both mathematical markup languages. It is a not a full complete conversion lib, so if you want to extend our funcionalities, feel free!

## Installation

You can install `mathml2asciimathjs` using npm:

```bash
npm install mathml2asciimathjs
```

Or yarn:

```bash
yarn install mathml2asciimathjs
```

## Usage

To use asciimath2mathmljs in your project, you can follow this basic example:

```typescript
const { MathML2AsciiMath } = require('mathml2asciimathjs');

// Example conversion
const mathML = '<math>...</math>';
const conversor = new MathML2AsciiMath();
const asciiMath = conversor.convert(mathML);

console.log(asciiMath); // it will print a tranlated asciimath formula
```

## Credits

This library is inspired by and based on [the original Ruby library](https://github.com/plurimath/mathml2asciimath). The JavaScript/TypeScript version was created to provide the same functionality for projects running in JavaScript environments.

## TO-DO's

- Implement automated tests to ensure reliability and ease future development.
- Extend library to support more tags. We encourage the community to contribute by submitting a PR or creating an issue for discussion.
