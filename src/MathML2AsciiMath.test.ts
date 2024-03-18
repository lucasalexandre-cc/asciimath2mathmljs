import { MathML2AsciiMath } from './MathML2AsciiMath';

const conversor = new MathML2AsciiMath();

describe('MathML2AsciiMath', () => {
  it('should convert MathML to AsciiMath', () => {
    const formulas = [
      {
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
        <msup>
          <mrow>
            <mfenced open="|" close="|" separators="|">
              <mrow>
                <mi>z</mi>
                <mo>+</mo>
                <mi>w</mi>
              </mrow>
            </mfenced>
          </mrow>
          <mrow>
            <mn>2</mn>
          </mrow>
        </msup>
        <mo>=</mo>
        <msup>
          <mrow>
            <mfenced open="|" close="|" separators="|">
              <mrow>
                <mi>z</mi>
              </mrow>
            </mfenced>
          </mrow>
          <mrow>
            <mn>2</mn>
          </mrow>
        </msup>
        <mo>+</mo>
        <msup>
          <mrow>
            <mfenced open="|" close="|" separators="|">
              <mrow>
                <mi>w</mi>
              </mrow>
            </mfenced>
          </mrow>
          <mrow>
            <mn>2</mn>
          </mrow>
        </msup>
        <mo>+</mo>
        <mn>2</mn>
        <mi>r</mi>
        <mi>e</mi>
        <mo>(</mo>
        <mi>z</mi>
        <mo>.</mo>
        <mover accent="true">
          <mrow>
            <mi>w</mi>
          </mrow>
          <mo>-</mo>
        </mover>
        <mo>)</mo>
        <mo>;</mo>
      </math>`,
        asciimath: '|z + w|_2 = |z|_2 + |w|_2 + 2 r e ( z . overset(-)(w) ) ;',
      },
    ];

    for (const formula of formulas) {
      expect(conversor.convert(formula.mathml)).toBe(formula.asciimath);
    }
  });
});
