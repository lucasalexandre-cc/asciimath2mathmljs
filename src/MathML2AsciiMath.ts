import { JSDOM } from 'jsdom';
import he from 'he';

export class MathML2AsciiMath {
  convert(html: string): string {
    const dom = new JSDOM(this._clearHtml(html), {
      contentType: 'application/xml',
    });

    const x = dom.window.document.documentElement;

    return this._parse(dom.window.document.documentElement).replace(/\s+/g, ' ').trim();
  }

  _clearHtml(html: string) {
    return html.replace(/&nbsp;/g, ' ');
  }

  _parse(node: ChildNode) {
    const nodesToClean = [];
    if (node.childNodes) {
      // Clean empty nodes
      for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType === node.TEXT_NODE && !node.childNodes[i].nodeValue.trim()) {
          nodesToClean.push(node.childNodes[i]);
        }
      }

      for (const nodeToClean of nodesToClean) {
        node.removeChild(nodeToClean);
      }
    }

    if (node.nodeType === node.TEXT_NODE) {
      return node.nodeValue ? this._encodechars(he.decode(node.nodeValue)) : '';
    }

    let out = '';
    let sub = '';
    let sup = '';
    let elem1 = '';
    let accent = '';
    let op = '';

    switch (node.nodeName) {
      case 'math':
        return this._joinParsedChildren(node.childNodes);
      case 'annotation':
        return '';
      case 'semantics':
        return this._joinParsedChildren(node.childNodes);
      case 'mrow':
        return this._joinParsedChildren(node.childNodes);
      case 'mfenced':
        // @ts-ignore
        let symOpen = node.getAttribute('open') || '(';
        // @ts-ignore
        let symClose = node.getAttribute('close') || ')';

        let separator = ',';
        out = this._joinParsedChildren(node.childNodes, separator);
        return `${symOpen}${out}${symClose}`;
      case 'msqrt':
        return `sqrt(${this._joinParsedChildren(node.childNodes)})`;
      case 'mfrac':
        return `(${this._joinParsedChildren(node.childNodes[0], ' ')})/(${this._joinParsedChildren(node.childNodes[1])})`;
      case 'msup':
        sub = this._parse(node.childNodes[1]);
        sub = sub.length === 1 ? sub : `(${sub})`;
        op = this._parse(node.childNodes[0]).replace(/ $/, '');
        return `${op}^${sub}`;
      case 'msub':
        sub = this._parse(node.childNodes[1]);
        op = this._parse(node.childNodes[0]).replace(/ $/, '');
        return `${op}_${sub}`;

      case 'munderover':
      case 'msubsup':
        sub = this._parse(node.childNodes[1]);
        sub = sub.length === 1 ? sub : `(${sub})`;
        sup = this._parse(node.childNodes[2]);
        sup = sup.length === 1 ? sup : `(${sup})`;
        op = this._parse(node.childNodes[0]).replace(/ $/, '');
        return `${op}_${sub}^${sup}`;

      case 'munder':
        elem1 = this._parse(node.childNodes[1]).trim();

        accent = (() => {
          switch (elem1) {
            case '\u0332':
              return 'ul';

            case '\u23df':
              return 'ubrace';

            default:
              return 'underset';
          }
        })();

        if (accent === 'underset') {
          return `underset(${elem1})(${this._parse(node.childNodes[0])})`;
        } else {
          return `${accent} ${this._parse(node.childNodes[0])}`;
        }

      case 'mover':
        elem1 = this._parse(node.childNodes[1]).trim();
        accent = (() => {
          switch (elem1) {
            case '\u005e':
              return 'hat';
            case '\u00af':
              return 'bar';
            case '->':
              return 'vec';
            case '.':
              return 'dot';
            case '..':
              return 'ddot';
            case '\u23de':
              return 'obrace';
            default:
              return 'overset';
          }
        })();

        if (accent === 'overset') {
          return `overset(${elem1})(${this._parse(node.childNodes[0])})`;
        } else {
          return `${accent} ${this._parse(node.childNodes[0])}`;
        }

      case 'mtable':
        return `[${this._joinParsedChildren(node.childNodes, ',')}]`;

      case 'mtr':
        return `[${this._joinParsedChildren(node.childNodes, ',')}]`;

      case 'mtd':
        return this._joinParsedChildren(node.childNodes, ',');

      case 'mn':
      case 'mtext':
        return this._joinParsedChildren(node.childNodes, '');

      case 'mi':
        let outMi = this._joinParsedChildren(node.childNodes);
        // TODO: Add specific logic here if necessary for handling spaces
        return outMi;

      case 'mo':
        let outMo = this._joinParsedChildren(node.childNodes);
        // @ts-ignore
        outMo = node.getAttribute('fence') ? ` ${outMo} ` : outMo;
        return outMo;

      case 'mstyle':
        return this._joinParsedChildren(node.childNodes, '');

      case 'mroot':
        return `root(${this._parse(node.childNodes[1])})(${this._parse(node.childNodes[0])})`;

      case 'mmultiscripts':
        // it is not a perfect representation
        const base = node.childNodes[0];
        const arrayRepresentation = Array.from(node.childNodes).slice(1);
        const mprescriptsIndex = arrayRepresentation.findIndex((node) => node.nodeName === 'mprescripts');

        const subArray = arrayRepresentation.slice(0, mprescriptsIndex);
        const supArray = arrayRepresentation.slice(mprescriptsIndex + 1);

        return `${subArray.length ? this._joinParsedChildren(subArray, '') : ''} ${this._parse(base)} ${supArray.length > 0 ? this._joinParsedChildren(supArray, '') : ''}`;

      // align items
      case 'malignmark':
      case 'maligngroup':
      case 'mphantom':
        return this._joinParsedChildren(node.childNodes, '');

      // ignored items
      case 'menclose':
      case 'none':
        return this._joinParsedChildren(node.childNodes, '');

      default:
        return `Fail(${node.nodeName})`;
    }
  }

  _encodechars(xml) {
    return xml
      .replace(/\u03b1/g, 'alpha')
      .replace(/\u03b2/g, 'beta')
      .replace(/\u03b3/g, 'gamma')
      .replace(/\u0393/g, 'Gamma')
      .replace(/\u03b4/g, 'delta')
      .replace(/\u0394/g, 'Delta')
      .replace(/\u2206/g, 'Delta')
      .replace(/\u03b5/g, 'epsilon')
      .replace(/\u025b/g, 'varepsilon')
      .replace(/\u03b6/g, 'zeta')
      .replace(/\u03b7/g, 'eta')
      .replace(/\u03b8/g, 'theta')
      .replace(/\u0398/g, 'Theta')
      .replace(/\u03d1/g, 'vartheta')
      .replace(/\u03b9/g, 'iota')
      .replace(/\u03ba/g, 'kappa')
      .replace(/\u03bb/g, 'lambda')
      .replace(/\u039b/g, 'Lambda')
      .replace(/\u03bc/g, 'mu')
      .replace(/\u03bd/g, 'nu')
      .replace(/\u03be/g, 'xi')
      .replace(/\u039e/g, 'Xi')
      .replace(/\u03c0/g, 'pi')
      .replace(/\u03a0/g, 'Pi')
      .replace(/\u03c1/g, 'rho')
      .replace(/\u03c2/g, 'beta')
      .replace(/\u03c3/g, 'sigma')
      .replace(/\u03a3/g, 'Sigma')
      .replace(/\u03c4/g, 'tau')
      .replace(/\u03c5/g, 'upsilon')
      .replace(/\u03c6/g, 'phi')
      .replace(/\u03a6/g, 'Phi')
      .replace(/\u03d5/g, 'varphi')
      .replace(/\u03c7/g, 'chi')
      .replace(/\u03c8/g, 'psi')
      .replace(/\u03a8/g, 'Psi')
      .replace(/\u03c9/g, 'omega')
      .replace(/\u03a9/g, 'omega')
      .replace(/\u22c5/g, '*')
      .replace(/\u2219/g, '*')
      .replace(/\u00b7/g, '*')
      .replace(/\u2217/g, '**')
      .replace(/\u22c6/g, '***')
      .replace(/\//g, '//')
      .replace(/\\/g, '\\\\')
      .replace(/\u00d7/g, 'xx')
      .replace(/\u22c9/g, '|><')
      .replace(/\u22ca/g, '><|')
      .replace(/\u22c8/g, '|><|')
      .replace(/\u00f7/g, '-:')
      .replace(/\u2218/g, '@')
      .replace(/\u2295/g, 'o+')
      .replace(/\u2a01/g, 'o+')
      .replace(/\u2297/g, 'ox')
      .replace(/\u2299/g, 'o.')
      .replace(/\u2211/g, 'sum')
      .replace(/\u220f/g, 'prod')
      .replace(/\u2227/g, '^^')
      .replace(/\u22c0/g, '^^^')
      .replace(/\u2228/g, 'vv')
      .replace(/\u22c1/g, 'vvv')
      .replace(/\u2229/g, 'nn')
      .replace(/\u22c2/g, 'nnn')
      .replace(/\u222a/g, 'uu')
      .replace(/\u22c3/g, 'uuu')
      .replace(/\u2260/g, '!=')
      .replace(/\u2264/g, '<=')
      .replace(/\u2265/g, '>=')
      .replace(/\u227a/g, '-<')
      .replace(/\u227b/g, '>-')
      .replace(/\u2aaf/g, '-<=')
      .replace(/\u2ab0/g, '>-=')
      .replace(/\u2208/g, 'in')
      .replace(/\u2209/g, '!in')
      .replace(/\u2282/g, 'sub')
      .replace(/\u2283/g, 'sup')
      .replace(/\u2286/g, 'sube')
      .replace(/\u2287/g, 'supe')
      .replace(/\u2261/g, '-=')
      .replace(/\u2245/g, '~=')
      .replace(/\u2248/g, '~~')
      .replace(/\u221d/g, 'prop')
      .replace(/\u00ac/g, 'not')
      .replace(/\u21d2/g, '=>')
      .replace(/\u21d4/g, '<=>')
      .replace(/\u2200/g, 'AA')
      .replace(/\u2203/g, 'EE')
      .replace(/\u22a5/g, '_|_')
      .replace(/\u22a4/g, 'TT')
      .replace(/\u22a2/g, '|--')
      .replace(/\u22a8/g, '|==')
      .replace(/\u22a8/g, '|==')
      .replace(/\u2329/g, '(:')
      .replace(/\u232a/g, ':)')
      .replace(/\u2329/g, '<<')
      .replace(/\u27e8/g, '<<')
      .replace(/\u232a/g, '>>')
      .replace(/\u27e9/g, '>>')
      .replace(/\u222b/g, 'int')
      .replace(/\u222e/g, 'oint')
      .replace(/\u2202/g, 'del')
      .replace(/\u2207/g, 'grad')
      .replace(/\u00b1/g, '+-')
      .replace(/\u2205/g, 'O/')
      .replace(/\u221e/g, 'oo')
      .replace(/\u2135/g, 'aleph')
      .replace(/\u2234/g, ':.')
      .replace(/\u2235/g, ":'")
      .replace(/\u2220/g, '/_')
      .replace(/\u25b3/g, '/_\\')
      .replace(/\u2032/g, "'")
      .replace(/~/g, 'tilde')
      .replace(/\u00a0\u00a0\u00a0\u00a0/g, 'qquad')
      .replace(/\u00a0\u00a0/g, 'quad')
      .replace(/\u00a0/g, '\\ ')
      .replace(/\u2322/g, 'frown')
      .replace(/\u00a0/g, 'quad')
      .replace(/\u22ef/g, 'cdots')
      .replace(/\u22ee/g, 'vdots')
      .replace(/\u22f1/g, 'ddots')
      .replace(/\u22c4/g, 'diamond')
      .replace(/\u25a1/g, 'square')
      .replace(/\u230a/g, '|__')
      .replace(/\u230b/g, '__|')
      .replace(/\u2308/g, '|~')
      .replace(/\u2309/g, '~|')
      .replace(/\u2102/g, 'CC')
      .replace(/\u2115/g, 'NN')
      .replace(/\u211a/g, 'QQ')
      .replace(/\u211d/g, 'RR')
      .replace(/\u2124/g, 'ZZ')
      .replace(/\u2191/g, 'uarr')
      .replace(/\u2193/g, 'darr')
      .replace(/\u2190/g, 'larr')
      .replace(/\u2194/g, 'harr')
      .replace(/\u21d2/g, 'rArr')
      .replace(/\u21d0/g, 'lArr')
      .replace(/\u21d4/g, 'hArr')
      .replace(/\u2192/g, '->')
      .replace(/\u21a3/g, '>->')
      .replace(/\u21a0/g, '->>')
      .replace(/\u2916/g, '>->>')
      .replace(/\u21a6/g, '|->')
      .replace(/\u2026/g, '...')
      .replace(/\u2212/g, '-')
      .replace(/\u2061/g, '')
      .replace(/\u2751/g, 'square')
      .replace(/[\u2028\u2029]/g, ' ');
  }

  _joinParsedChildren(children: NodeListOf<ChildNode> | ChildNode | Array<ChildNode>, delimiter = ' ') {
    // @ts-ignore
    if (children.length) {
      // @ts-ignore
      return Array.from(children)
        .map((child) => this._parse(child).trim())
        .join(delimiter);
    } else {
      // @ts-ignore
      return [children].map((child) => this._parse(child).trim()).join(delimiter);
    }
  }
}
