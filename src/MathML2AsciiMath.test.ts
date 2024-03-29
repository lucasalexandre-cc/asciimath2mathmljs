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
        asciimath: 'a_1 = 3,0 m // s^2',
      },
      {
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
        <mi>g</mi>
        <mfenced separators="|">
          <mrow>
            <mi>x</mi>
          </mrow>
        </mfenced>
        <mo>=</mo>
        <mi>&#xA0;</mi>
        <mroot>
          <mrow>
            <mn>1</mn>
            <mo>+</mo>
            <mi>x</mi>
          </mrow>
          <mrow>
            <mn>3</mn>
          </mrow>
        </mroot>
      </math>`,
        asciimath: 'g (x) = root(3)(1 + x)',
      },
      {
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
        <mrow>
          <mrow>
            <munder>
              <mrow>
                <mi mathvariant="normal">lim</mi>
              </mrow>
              <mrow>
                <mi>x</mi>
                <mo>&#x2192;</mo>
                <mn>2</mn>
                <mo>&#x207A;</mo>
              </mrow>
            </munder>
          </mrow>
          <mo>&#x2061;</mo>
          <mrow>
            <mfrac>
              <mrow>
                <mi>g</mi>
                <mfenced separators="|">
                  <mrow>
                    <mi>x</mi>
                  </mrow>
                </mfenced>
                <mo>-</mo>
                <mi>g</mi>
                <mfenced separators="|">
                  <mrow>
                    <mn>2</mn>
                  </mrow>
                </mfenced>
              </mrow>
              <mrow>
                <mi>x</mi>
                <mo>-</mo>
                <mn>2</mn>
              </mrow>
            </mfrac>
          </mrow>
        </mrow>
        <mi>&#xA0;</mi>
        <mi>o</mi>
        <mi>n</mi>
        <mi>d</mi>
        <mi>e</mi>
        <mi>&#xA0;</mi>
        <mi>g</mi>
        <mfenced separators="|">
          <mrow>
            <mi>x</mi>
          </mrow>
        </mfenced>
        <mo>=</mo>
        <mfenced open="{" close="" separators="|">
          <mrow>
            <mtable>
              <mtr>
                <mtd>
                  <mrow>
                    <maligngroup />
                    <mi>x</mi>
                    <mi>&#xA0;</mi>
                    <mi>&#xA0;</mi>
                    <mi>s</mi>
                    <mi>e</mi>
                    <mi>&#xA0;</mi>
                    <mi>&#xA0;</mi>
                    <mi>x</mi>
                    <mo>&#x2265;</mo>
                    <mn>2</mn>
                  </mrow>
                </mtd>
              </mtr>
              <mtr>
                <mtd>
                  <mrow>
                    <maligngroup />
                    <mfrac>
                      <mrow>
                        <msup>
                          <mrow>
                            <mi>x</mi>
                          </mrow>
                          <mrow>
                            <mn>2</mn>
                          </mrow>
                        </msup>
                      </mrow>
                      <mrow>
                        <mn>2</mn>
                      </mrow>
                    </mfrac>
                    <mi>&#xA0;</mi>
                    <mi>&#xA0;</mi>
                    <mi>s</mi>
                    <mi>e</mi>
                    <mi>&#xA0;</mi>
                    <mi>&#xA0;</mi>
                    <mi>x</mi>
                    <mo>&lt;</mo>
                    <mn>2</mn>
                  </mrow>
                </mtd>
              </mtr>
            </mtable>
          </mrow>
        </mfenced>
      </math>`,
        asciimath: 'underset(x -> 2 ⁺)(lim) (g (x) - g (2))/(x - 2) o n d e g (x) = {[[x s e x >= 2],[(x^2)/(2) s e x < 2]])',
      },
      {
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
        <msub>
          <mrow>
            <mi>R</mi>
          </mrow>
          <mrow>
            <mi>n</mi>
          </mrow>
        </msub>
        <mo>&#x2264;</mo>
        <mfrac>
          <mrow>
            <mn>1</mn>
          </mrow>
          <mrow>
            <mn>10</mn>
            <msup>
              <mrow>
                <mfenced separators="|">
                  <mrow>
                    <mn>2</mn>
                    <mi>n</mi>
                    <mo>+</mo>
                    <mn>1</mn>
                  </mrow>
                </mfenced>
              </mrow>
              <mrow>
                <mn>5</mn>
              </mrow>
            </msup>
          </mrow>
        </mfrac>
        <mi>&#xA0;</mi>
        <mi>e</mi>
        <mi>&#xA0;</mi>
        <msub>
          <mrow>
            <mi>R</mi>
          </mrow>
          <mrow>
            <mi>n</mi>
          </mrow>
        </msub>
        <mo>&#x2264;</mo>
        <mn>0,000005</mn>
        <mo>&#x2234;</mo>
        <mfrac>
          <mrow>
            <mn>1</mn>
          </mrow>
          <mrow>
            <mn>10</mn>
            <msup>
              <mrow>
                <mfenced separators="|">
                  <mrow>
                    <mn>2</mn>
                    <mi>n</mi>
                    <mo>+</mo>
                    <mn>1</mn>
                  </mrow>
                </mfenced>
              </mrow>
              <mrow>
                <mn>5</mn>
              </mrow>
            </msup>
          </mrow>
        </mfrac>
        <mo>&#x2264;</mo>
        <mn>0,000005</mn>
        <mo>&#x2194;</mo>
        <menclose notation="box">
          <mi>n</mi>
          <mo>&#x2265;</mo>
          <mn>3,1</mn>
        </menclose>
      </math>`,
        asciimath: 'R_n <= (1)/(10 (2 n + 1)^5) e R_n <= 0,000005 :. (1)/(10 (2 n + 1)^5) <= 0,000005 harr n>=3,1',
      },
      {
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML">
        <mi>s</mi>
        <mi>e</mi>
        <mi>n</mi>
        <mmultiscripts>
          <mrow>
            <mi>x</mi>
          </mrow>
          <mprescripts />
          <none />
          <mrow>
            <mn>2</mn>
          </mrow>
        </mmultiscripts>
        <mo>=</mo>
        <mi>&#xA0;</mi>
        <mi>&#xA0;</mi>
        <mfrac>
          <mrow>
            <mtext>(1-2</mtext>
            <mtext>cos(</mtext>
            <mtext>2x))</mtext>
          </mrow>
          <mrow>
            <mn>2</mn>
          </mrow>
        </mfrac>
      </math>`,
        asciimath: 's e n x 2 = ((1-2 cos( 2x)))/(2)',
      },
      {
        mathml: `<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
        <mphantom>
          <mrow>
            <mover accent="true">
              <mrow>
                <mi>u</mi>
              </mrow>
              <mo>&#x2192;</mo>
            </mover>
            <mo>&#x22C5;</mo>
            <mover accent="true">
              <mrow>
                <mover accent="true">
                  <mrow>
                    <mi>v</mi>
                  </mrow>
                  <mo>&#x2192;</mo>
                </mover>
              </mrow>
              <mo>-</mo>
            </mover>
          </mrow>
        </mphantom>
        <mo>=</mo>
        <mfenced separators="|">
          <mrow>
            <mi>i</mi>
            <mo>,</mo>
            <mn>2</mn>
            <mi>i</mi>
            <mo>,</mo>
            <mn>3</mn>
          </mrow>
        </mfenced>
        <mo>&#x22C5;</mo>
        <mfenced separators="|">
          <mrow>
            <mn>4</mn>
            <mo>,</mo>
            <mn>2</mn>
            <mi>i</mi>
            <mo>,</mo>
            <mn>1</mn>
            <mo>-</mo>
            <mi>i</mi>
          </mrow>
        </mfenced>
      </math>`,
        asciimath: 'vec u * overset(-)(vec v) = (i , 2 i , 3) * (4 , 2 i , 1 - i)',
      },
    ];

    for (const formula of formulas) {
      expect(conversor.convert(formula.mathml)).toBe(formula.asciimath);
    }
  });
});
