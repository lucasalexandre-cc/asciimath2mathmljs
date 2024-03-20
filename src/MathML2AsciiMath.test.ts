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
        asciimath: '|z + w|^2 = |z|^2 + |w|^2 + 2 r e ( z . overset(-)(w) ) ;',
      },
      {
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
        <msub>
          <mrow>
            <mi>a</mi>
          </mrow>
          <mrow>
            <mn>1</mn>
          </mrow>
        </msub>
        <mo>=</mo>
        <mn>3,0</mn>
        <mi>&#xA0;</mi>
        <mi>m</mi>
        <mo>/</mo>
        <msup>
          <mrow>
            <mi>s</mi>
          </mrow>
          <mrow>
            <mn>2</mn>
          </mrow>
        </msup>
      </math>`,
        asciimath: '(a)_(1) = 3,0 m // s^2',
      },
    ];

    for (const formula of formulas) {
      expect(conversor.convert(formula.mathml)).toBe(formula.asciimath);
    }
  });
});
