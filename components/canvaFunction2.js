import * as React$1 from 'react';
import React__default$1, {
  createContext,
  useContext,
  forwardRef,
  useMemo,
  Fragment as Fragment$1,
  useRef,
  useCallback,
  useEffect,
  useState,
  createElement,
  useReducer,
} from 'react';
import * as ReactJSXRuntime from 'react/jsx-runtime';
import { jsx as jsx$1, jsxs as jsxs$1 } from 'react/jsx-runtime';
const EditorContext = createContext({}),
  useEditor = (e) => {
    var t = useContext(EditorContext),
      { actions: n, getState: r, query: o } = t,
      e = e ? e(t.getState(), o) : {};
    return Object.assign(Object.assign({}, e), {
      actions: n,
      query: o,
      state: r(),
    });
  };
var __assign = function () {
  return (__assign =
    Object.assign ||
    function (e) {
      for (var t, n = 1, r = arguments.length; n < r; n++)
        for (var o in (t = arguments[n]))
          Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
      return e;
    }).apply(this, arguments);
};
function __rest(e, t) {
  var n = {};
  for (o in e)
    Object.prototype.hasOwnProperty.call(e, o) &&
      t.indexOf(o) < 0 &&
      (n[o] = e[o]);
  if (null != e && 'function' == typeof Object.getOwnPropertySymbols)
    for (var r = 0, o = Object.getOwnPropertySymbols(e); r < o.length; r++)
      t.indexOf(o[r]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, o[r]) &&
        (n[o[r]] = e[o[r]]);
  return n;
}
function sheetForTag(e) {
  if (e.sheet) return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e) return document.styleSheets[t];
}
function createStyleElement(e) {
  var t = document.createElement('style');
  return (
    t.setAttribute('data-emotion', e.key),
    void 0 !== e.nonce && t.setAttribute('nonce', e.nonce),
    t.appendChild(document.createTextNode('')),
    t.setAttribute('data-s', ''),
    t
  );
}
var StyleSheet = (function () {
    function e(e) {
      var n = this;
      (this._insertTag = function (e) {
        var t =
          0 === n.tags.length
            ? n.insertionPoint
              ? n.insertionPoint.nextSibling
              : n.prepend
              ? n.container.firstChild
              : n.before
            : n.tags[n.tags.length - 1].nextSibling;
        n.container.insertBefore(e, t), n.tags.push(e);
      }),
        (this.isSpeedy =
          void 0 === e.speedy
            ? 'production' === process.env.NODE_ENV
            : e.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = e.nonce),
        (this.key = e.key),
        (this.container = e.container),
        (this.prepend = e.prepend),
        (this.insertionPoint = e.insertionPoint),
        (this.before = null);
    }
    var t = e.prototype;
    return (
      (t.hydrate = function (e) {
        e.forEach(this._insertTag);
      }),
      (t.insert = function (t) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 &&
          this._insertTag(createStyleElement(this));
        var e = this.tags[this.tags.length - 1];
        if (
          ('production' !== process.env.NODE_ENV &&
            ((n = 64 === t.charCodeAt(0) && 105 === t.charCodeAt(1)) &&
              this._alreadyInsertedOrderInsensitiveRule &&
              console.error(
                "You're attempting to insert the following rule:\n" +
                  t +
                  '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.'
              ),
            (this._alreadyInsertedOrderInsensitiveRule =
              this._alreadyInsertedOrderInsensitiveRule || !n)),
          this.isSpeedy)
        ) {
          var n = sheetForTag(e);
          try {
            n.insertRule(t, n.cssRules.length);
          } catch (e) {
            'production' === process.env.NODE_ENV ||
              /:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(
                t
              ) ||
              console.error(
                'There was a problem inserting the following rule: "' + t + '"',
                e
              );
          }
        } else e.appendChild(document.createTextNode(t));
        this.ctr++;
      }),
      (t.flush = function () {
        this.tags.forEach(function (e) {
          return e.parentNode && e.parentNode.removeChild(e);
        }),
          (this.tags = []),
          (this.ctr = 0),
          'production' !== process.env.NODE_ENV &&
            (this._alreadyInsertedOrderInsensitiveRule = !1);
      }),
      e
    );
  })(),
  MS = '-ms-',
  MOZ = '-moz-',
  WEBKIT = '-webkit-',
  COMMENT = 'comm',
  RULESET = 'rule',
  DECLARATION = 'decl',
  IMPORT = '@import',
  KEYFRAMES = '@keyframes',
  LAYER = '@layer',
  abs = Math.abs,
  from = String.fromCharCode,
  assign = Object.assign;
function hash(e, t) {
  return 45 ^ charat(e, 0)
    ? (((((((t << 2) ^ charat(e, 0)) << 2) ^ charat(e, 1)) << 2) ^
        charat(e, 2)) <<
        2) ^
        charat(e, 3)
    : 0;
}
function trim(e) {
  return e.trim();
}
function match(e, t) {
  return (e = t.exec(e)) && e[0];
}
function replace$1(e, t, n) {
  return e.replace(t, n);
}
function indexof(e, t) {
  return e.indexOf(t);
}
function charat(e, t) {
  return 0 | e.charCodeAt(t);
}
function substr(e, t, n) {
  return e.slice(t, n);
}
function strlen(e) {
  return e.length;
}
function sizeof(e) {
  return e.length;
}
function append(e, t) {
  return t.push(e), e;
}
function combine(e, t) {
  return e.map(t).join('');
}
var line = 1,
  column = 1,
  length = 0,
  position = 0,
  character = 0,
  characters = '';
function node(e, t, n, r, o, i, a) {
  return {
    value: e,
    root: t,
    parent: n,
    type: r,
    props: o,
    children: i,
    line: line,
    column: column,
    length: a,
    return: '',
  };
}
function copy$2(e, t) {
  return assign(
    node('', null, null, '', null, null, 0),
    e,
    { length: -e.length },
    t
  );
}
function char() {
  return character;
}
function prev() {
  return (
    (character = 0 < position ? charat(characters, --position) : 0),
    column--,
    10 === character && ((column = 1), line--),
    character
  );
}
function next() {
  return (
    (character = position < length ? charat(characters, position++) : 0),
    column++,
    10 === character && ((column = 1), line++),
    character
  );
}
function peek$1() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(e, t) {
  return substr(characters, e, t);
}
function token(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(e) {
  return (
    (line = column = 1), (length = strlen((characters = e))), (position = 0), []
  );
}
function dealloc(e) {
  return (characters = ''), e;
}
function delimit(e) {
  return trim(
    slice(position - 1, delimiter(91 === e ? e + 2 : 40 === e ? e + 1 : e))
  );
}
function whitespace(e) {
  for (; (character = peek$1()) && character < 33; ) next();
  return 2 < token(e) || 3 < token(character) ? '' : ' ';
}
function escaping(e, t) {
  for (
    ;
    --t &&
    next() &&
    !(
      character < 48 ||
      102 < character ||
      (57 < character && character < 65) ||
      (70 < character && character < 97)
    );

  );
  return slice(e, caret() + (t < 6 && 32 == peek$1() && 32 == next()));
}
function delimiter(e) {
  for (; next(); )
    switch (character) {
      case e:
        return position;
      case 34:
      case 39:
        34 !== e && 39 !== e && delimiter(character);
        break;
      case 40:
        41 === e && delimiter(e);
        break;
      case 92:
        next();
    }
  return position;
}
function commenter(e, t) {
  for (
    ;
    next() && e + character !== 57 && (e + character !== 84 || 47 !== peek$1());

  );
  return '/*' + slice(t, position - 1) + '*' + from(47 === e ? e : next());
}
function identifier(e) {
  for (; !token(peek$1()); ) next();
  return slice(e, position);
}
function compile(e) {
  return dealloc(parse('', null, null, null, [''], (e = alloc(e)), 0, [0], e));
}
function parse(e, t, n, r, o, i, a, s, l) {
  for (
    var c,
      u,
      d,
      p = 0,
      f = 0,
      h = a,
      m = 0,
      g = 0,
      v = 1,
      y = 1,
      b = 1,
      w = 0,
      x = '',
      S = o,
      k = x;
    y;

  )
    switch (((c = w), (w = next()))) {
      case 40:
        if (108 != c && 58 == charat(k, h - 1)) {
          -1 != indexof((k += replace$1(delimit(w), '&', '&\f')), '&\f') &&
            (b = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        k += delimit(w);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        k += whitespace(c);
        break;
      case 92:
        k += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek$1()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), t, n), l);
            break;
          default:
            k += '/';
        }
        break;
      case 123 * v:
        s[p++] = strlen(k) * b;
      case 125 * v:
      case 59:
      case 0:
        switch (w) {
          case 0:
          case 125:
            y = 0;
          case 59 + f:
            -1 == b && (k = replace$1(k, /\f/g, '')),
              0 < g &&
                strlen(k) - h &&
                append(
                  32 < g
                    ? declaration(k + ';', r, n, h - 1)
                    : declaration(replace$1(k, ' ', '') + ';', r, n, h - 2),
                  l
                );
            break;
          case 59:
            k += ';';
          default:
            if (
              (append(
                (d = ruleset(k, t, n, p, f, o, s, x, (S = []), (u = []), h)),
                i
              ),
              123 === w)
            )
              if (0 === f) parse(k, t, d, d, S, i, h, s, u);
              else
                switch (99 === m && 110 === charat(k, 3) ? 100 : m) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(
                      e,
                      d,
                      d,
                      r &&
                        append(
                          ruleset(e, d, d, 0, 0, o, s, x, o, (S = []), h),
                          u
                        ),
                      o,
                      u,
                      h,
                      s,
                      r ? S : u
                    );
                    break;
                  default:
                    parse(k, d, d, d, [''], u, 0, s, u);
                }
        }
        (p = f = g = 0), (v = b = 1), (x = k = ''), (h = a);
        break;
      case 58:
        (h = 1 + strlen(k)), (g = c);
      default:
        if (v < 1)
          if (123 == w) --v;
          else if (125 == w && 0 == v++ && 125 == prev()) continue;
        switch (((k += from(w)), w * v)) {
          case 38:
            b = 0 < f ? 1 : ((k += '\f'), -1);
            break;
          case 44:
            (s[p++] = (strlen(k) - 1) * b), (b = 1);
            break;
          case 64:
            45 === peek$1() && (k += delimit(next())),
              (m = peek$1()),
              (f = h = strlen((x = k += identifier(caret())))),
              w++;
            break;
          case 45:
            45 === c && 2 == strlen(k) && (v = 0);
        }
    }
  return i;
}
function ruleset(e, t, n, r, o, i, a, s, l, c, u) {
  for (
    var d, p = o - 1, f = 0 === o ? i : [''], h = sizeof(f), m = 0, g = 0;
    m < r;
    ++m
  )
    for (var v, y = 0, b = substr(e, p + 1, (p = abs((d = a[m])))); y < h; ++y)
      (v = trim(0 < d ? f[y] + ' ' + b : replace$1(b, /&\f/g, f[y]))) &&
        (l[g++] = v);
  return node(e, t, n, 0 === o ? RULESET : s, l, c, u);
}
function comment(e, t, n) {
  return node(e, t, n, COMMENT, from(char()), substr(e, 2, -2), 0);
}
function declaration(e, t, n, r) {
  return node(e, t, n, DECLARATION, substr(e, 0, r), substr(e, r + 1, -1), r);
}
function serialize$1(e, t) {
  for (var n = '', r = sizeof(e), o = 0; o < r; o++)
    n += t(e[o], o, e, t) || '';
  return n;
}
function stringify(e, t, n, r) {
  switch (e.type) {
    case LAYER:
      if (e.children.length) break;
    case IMPORT:
    case DECLARATION:
      return (e.return = e.return || e.value);
    case COMMENT:
      return '';
    case KEYFRAMES:
      return (e.return = e.value + '{' + serialize$1(e.children, r) + '}');
    case RULESET:
      e.value = e.props.join(',');
  }
  return strlen((n = serialize$1(e.children, r)))
    ? (e.return = e.value + '{' + n + '}')
    : '';
}
function middleware(a) {
  var s = sizeof(a);
  return function (e, t, n, r) {
    for (var o = '', i = 0; i < s; i++) o += a[i](e, t, n, r) || '';
    return o;
  };
}
function rulesheet(t) {
  return function (e) {
    e.root || ((e = e.return) && t(e));
  };
}
var weakMemoize = function (n) {
  var r = new WeakMap();
  return function (e) {
    var t;
    return r.has(e) ? r.get(e) : ((t = n(e)), r.set(e, t), t);
  };
};
function memoize(t) {
  var n = Object.create(null);
  return function (e) {
    return void 0 === n[e] && (n[e] = t(e)), n[e];
  };
}
var identifierWithPointTracking = function (e, t, n) {
    for (
      var r, o = 0;
      (r = o), (o = peek$1()), 38 === r && 12 === o && (t[n] = 1), !token(o);

    )
      next();
    return slice(e, position);
  },
  toRules = function (e, t) {
    var n = -1,
      r = 44;
    do {
      switch (token(r)) {
        case 0:
          38 === r && 12 === peek$1() && (t[n] = 1),
            (e[n] += identifierWithPointTracking(position - 1, t, n));
          break;
        case 2:
          e[n] += delimit(r);
          break;
        case 4:
          if (44 === r) {
            (e[++n] = 58 === peek$1() ? '&\f' : ''), (t[n] = e[n].length);
            break;
          }
        default:
          e[n] += from(r);
      }
    } while ((r = next()));
    return e;
  },
  getRules = function (e, t) {
    return dealloc(toRules(alloc(e), t));
  },
  fixedElements = new WeakMap(),
  compat = function (e) {
    if ('rule' === e.type && e.parent && !(e.length < 1)) {
      for (
        var t = e.value,
          n = e.parent,
          r = e.column === n.column && e.line === n.line;
        'rule' !== n.type;

      )
        if (!(n = n.parent)) return;
      if (
        (1 !== e.props.length ||
          58 === t.charCodeAt(0) ||
          fixedElements.get(n)) &&
        !r
      ) {
        fixedElements.set(e, !0);
        for (
          var o = [], i = getRules(t, o), a = n.props, s = 0, l = 0;
          s < i.length;
          s++
        )
          for (var c = 0; c < a.length; c++, l++)
            e.props[l] = o[s] ? i[s].replace(/&\f/g, a[c]) : a[c] + ' ' + i[s];
      }
    }
  },
  removeLabel = function (e) {
    var t;
    'decl' === e.type &&
      108 === (t = e.value).charCodeAt(0) &&
      98 === t.charCodeAt(2) &&
      ((e.return = ''), (e.value = ''));
  },
  ignoreFlag =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  isIgnoringComment = function (e) {
    return 'comm' === e.type && -1 < e.children.indexOf(ignoreFlag);
  },
  createUnsafeSelectorsAlarm = function (s) {
    return function (e, t, n) {
      if ('rule' === e.type && !s.compat) {
        var r = e.value.match(/(:first|:nth|:nth-last)-child/g);
        if (r) {
          for (
            var o = !!e.parent ? e.parent.children : n, i = o.length - 1;
            0 <= i;
            i--
          ) {
            var a = o[i];
            if (a.line < e.line) break;
            if (a.column < e.column) {
              if (isIgnoringComment(a)) return;
              break;
            }
          }
          r.forEach(function (e) {
            console.error(
              'The pseudo class "' +
                e +
                '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
                e.split('-child')[0] +
                '-of-type".'
            );
          });
        }
      }
    };
  },
  isImportRule = function (e) {
    return 105 === e.type.charCodeAt(1) && 64 === e.type.charCodeAt(0);
  },
  isPrependedWithRegularRules = function (e, t) {
    for (var n = e - 1; 0 <= n; n--) if (!isImportRule(t[n])) return !0;
    return !1;
  },
  nullifyElement = function (e) {
    (e.type = ''),
      (e.value = ''),
      (e.return = ''),
      (e.children = ''),
      (e.props = '');
  },
  incorrectImportAlarm = function (e, t, n) {
    isImportRule(e) &&
      (e.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
          ),
          nullifyElement(e))
        : isPrependedWithRegularRules(t, n) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
          ),
          nullifyElement(e)));
  };
function prefix(e, t) {
  switch (hash(e, t)) {
    case 5103:
      return WEBKIT + 'print-' + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + e + MOZ + e + MS + e + e;
    case 6828:
    case 4268:
      return WEBKIT + e + MS + e + e;
    case 6165:
      return WEBKIT + e + MS + 'flex-' + e + e;
    case 5187:
      return (
        WEBKIT +
        e +
        replace$1(e, /(\w+).+(:[^]+)/, WEBKIT + 'box-$1$2' + MS + 'flex-$1$2') +
        e
      );
    case 5443:
      return (
        WEBKIT + e + MS + 'flex-item-' + replace$1(e, /flex-|-self/, '') + e
      );
    case 4675:
      return (
        WEBKIT +
        e +
        MS +
        'flex-line-pack' +
        replace$1(e, /align-content|flex-|-self/, '') +
        e
      );
    case 5548:
      return WEBKIT + e + MS + replace$1(e, 'shrink', 'negative') + e;
    case 5292:
      return WEBKIT + e + MS + replace$1(e, 'basis', 'preferred-size') + e;
    case 6060:
      return (
        WEBKIT +
        'box-' +
        replace$1(e, '-grow', '') +
        WEBKIT +
        e +
        MS +
        replace$1(e, 'grow', 'positive') +
        e
      );
    case 4554:
      return (
        WEBKIT + replace$1(e, /([^-])(transform)/g, '$1' + WEBKIT + '$2') + e
      );
    case 6187:
      return (
        replace$1(
          replace$1(
            replace$1(e, /(zoom-|grab)/, WEBKIT + '$1'),
            /(image-set)/,
            WEBKIT + '$1'
          ),
          e,
          ''
        ) + e
      );
    case 5495:
    case 3959:
      return replace$1(e, /(image-set\([^]*)/, WEBKIT + '$1$`$1');
    case 4968:
      return (
        replace$1(
          replace$1(
            e,
            /(.+:)(flex-)?(.*)/,
            WEBKIT + 'box-pack:$3' + MS + 'flex-pack:$3'
          ),
          /s.+-b[^;]+/,
          'justify'
        ) +
        WEBKIT +
        e +
        e
      );
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace$1(e, /(.+)-inline(.+)/, WEBKIT + '$1$2') + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (6 < strlen(e) - 1 - t)
        switch (charat(e, t + 1)) {
          case 109:
            if (45 !== charat(e, t + 4)) break;
          case 102:
            return (
              replace$1(
                e,
                /(.+:)(.+)-([^]+)/,
                '$1' +
                  WEBKIT +
                  '$2-$3$1' +
                  MOZ +
                  (108 == charat(e, t + 3) ? '$3' : '$2-$3')
              ) + e
            );
          case 115:
            return ~indexof(e, 'stretch')
              ? prefix(replace$1(e, 'stretch', 'fill-available'), t) + e
              : e;
        }
      break;
    case 4949:
      if (115 !== charat(e, t + 1)) break;
    case 6444:
      switch (charat(e, strlen(e) - 3 - (~indexof(e, '!important') && 10))) {
        case 107:
          return replace$1(e, ':', ':' + WEBKIT) + e;
        case 101:
          return (
            replace$1(
              e,
              /(.+:)([^;!]+)(;|!.+)?/,
              '$1' +
                WEBKIT +
                (45 === charat(e, 14) ? 'inline-' : '') +
                'box$3$1' +
                WEBKIT +
                '$2$3$1' +
                MS +
                '$2box$3'
            ) + e
          );
      }
      break;
    case 5936:
      switch (charat(e, t + 11)) {
        case 114:
          return WEBKIT + e + MS + replace$1(e, /[svh]\w+-[tblr]{2}/, 'tb') + e;
        case 108:
          return (
            WEBKIT + e + MS + replace$1(e, /[svh]\w+-[tblr]{2}/, 'tb-rl') + e
          );
        case 45:
          return WEBKIT + e + MS + replace$1(e, /[svh]\w+-[tblr]{2}/, 'lr') + e;
      }
      return WEBKIT + e + MS + e + e;
  }
  return e;
}
var prefixer = function (t, e, n, r) {
    if (-1 < t.length && !t.return)
      switch (t.type) {
        case DECLARATION:
          t.return = prefix(t.value, t.length);
          break;
        case KEYFRAMES:
          return serialize$1(
            [copy$2(t, { value: replace$1(t.value, '@', '@' + WEBKIT) })],
            r
          );
        case RULESET:
          if (t.length)
            return combine(t.props, function (e) {
              switch (match(e, /(::plac\w+|:read-\w+)/)) {
                case ':read-only':
                case ':read-write':
                  return serialize$1(
                    [
                      copy$2(t, {
                        props: [replace$1(e, /:(read-\w+)/, ':' + MOZ + '$1')],
                      }),
                    ],
                    r
                  );
                case '::placeholder':
                  return serialize$1(
                    [
                      copy$2(t, {
                        props: [
                          replace$1(e, /:(plac\w+)/, ':' + WEBKIT + 'input-$1'),
                        ],
                      }),
                      copy$2(t, {
                        props: [replace$1(e, /:(plac\w+)/, ':' + MOZ + '$1')],
                      }),
                      copy$2(t, {
                        props: [replace$1(e, /:(plac\w+)/, MS + 'input-$1')],
                      }),
                    ],
                    r
                  );
              }
              return '';
            });
      }
  },
  isBrowser$5 = 'undefined' != typeof document,
  getServerStylisCache = isBrowser$5
    ? void 0
    : weakMemoize(function () {
        return memoize(function () {
          var t = {};
          return function (e) {
            return t[e];
          };
        });
      }),
  defaultStylisPlugins = [prefixer],
  createCache = function (e) {
    var t = e.key;
    if ('production' !== process.env.NODE_ENV && !t)
      throw new Error(
        "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements."
      );
    isBrowser$5 &&
      'css' === t &&
      ((n = document.querySelectorAll('style[data-emotion]:not([data-s])')),
      Array.prototype.forEach.call(n, function (e) {
        -1 !== e.getAttribute('data-emotion').indexOf(' ') &&
          (document.head.appendChild(e), e.setAttribute('data-s', ''));
      }));
    var n = e.stylisPlugins || defaultStylisPlugins;
    if ('production' !== process.env.NODE_ENV && /[^a-z-]/.test(t))
      throw new Error(
        'Emotion key must only contain lower case alphabetical characters and - but "' +
          t +
          '" was passed'
      );
    var r,
      o,
      i,
      a,
      s,
      l,
      c,
      u = {},
      d = [],
      p =
        (isBrowser$5 &&
          ((r = e.container || document.head),
          Array.prototype.forEach.call(
            document.querySelectorAll('style[data-emotion^="' + t + ' "]'),
            function (e) {
              for (
                var t = e.getAttribute('data-emotion').split(' '), n = 1;
                n < t.length;
                n++
              )
                u[t[n]] = !0;
              d.push(e);
            }
          )),
        [compat, removeLabel]),
      f =
        ('production' !== process.env.NODE_ENV &&
          p.push(
            createUnsafeSelectorsAlarm({
              get compat() {
                return f.compat;
              },
            }),
            incorrectImportAlarm
          ),
        (a = isBrowser$5
          ? ((a = [
              stringify,
              'production' !== process.env.NODE_ENV
                ? function (e) {
                    e.root ||
                      (e.return
                        ? o.insert(e.return)
                        : e.value &&
                          e.type !== COMMENT &&
                          o.insert(e.value + '{}'));
                  }
                : rulesheet(function (e) {
                    o.insert(e);
                  }),
            ]),
            (i = middleware(p.concat(n, a))),
            function (e, t, n, r) {
              (o = n),
                'production' !== process.env.NODE_ENV &&
                  void 0 !== t.map &&
                  (o = {
                    insert: function (e) {
                      n.insert(e + t.map);
                    },
                  }),
                serialize$1(
                  compile(e ? e + '{' + t.styles + '}' : t.styles),
                  i
                ),
                r && (f.inserted[t.name] = !0);
            })
          : ((s = middleware(p.concat(n, [stringify]))),
            (l = function (e) {
              return serialize$1(compile(e), s);
            }),
            (c = getServerStylisCache(n)(t)),
            function (e, t, n, r) {
              var o,
                i,
                a = t.name,
                e =
                  ((e = e),
                  (i = (o = t).name),
                  void 0 === c[i] &&
                    (c[i] = l(e ? e + '{' + o.styles + '}' : o.styles)),
                  c[i]);
              return void 0 === f.compat
                ? (r && (f.inserted[a] = !0),
                  'development' === process.env.NODE_ENV && void 0 !== t.map
                    ? e + t.map
                    : e)
                : r
                ? void (f.inserted[a] = e)
                : e;
            })),
        {
          key: t,
          sheet: new StyleSheet({
            key: t,
            container: r,
            nonce: e.nonce,
            speedy: e.speedy,
            prepend: e.prepend,
            insertionPoint: e.insertionPoint,
          }),
          nonce: e.nonce,
          inserted: u,
          registered: {},
          insert: a,
        });
    return f.sheet.hydrate(d), f;
  };
function _extends$1() {
  return (_extends$1 = Object.assign
    ? Object.assign.bind()
    : function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n,
            r = arguments[t];
          for (n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      }).apply(this, arguments);
}
var commonjsGlobal =
  'undefined' != typeof globalThis
    ? globalThis
    : 'undefined' != typeof window
    ? window
    : 'undefined' != typeof global
    ? global
    : 'undefined' != typeof self
    ? self
    : {};
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default')
    ? e.default
    : e;
}
var hasRequiredReactIs_production_min,
  reactIs$1 = { exports: {} },
  reactIs_production_min = {};
function requireReactIs_production_min() {
  var e, n, r, o, i, a, s, l, c, u, d, p, t, f, h, m, g, v, y;
  return (
    hasRequiredReactIs_production_min ||
      ((hasRequiredReactIs_production_min = 1),
      (e = 'function' == typeof Symbol && Symbol.for),
      (n = e ? Symbol.for('react.element') : 60103),
      (r = e ? Symbol.for('react.portal') : 60106),
      (o = e ? Symbol.for('react.fragment') : 60107),
      (i = e ? Symbol.for('react.strict_mode') : 60108),
      (a = e ? Symbol.for('react.profiler') : 60114),
      (s = e ? Symbol.for('react.provider') : 60109),
      (l = e ? Symbol.for('react.context') : 60110),
      (c = e ? Symbol.for('react.async_mode') : 60111),
      (u = e ? Symbol.for('react.concurrent_mode') : 60111),
      (d = e ? Symbol.for('react.forward_ref') : 60112),
      (p = e ? Symbol.for('react.suspense') : 60113),
      (t = e ? Symbol.for('react.suspense_list') : 60120),
      (f = e ? Symbol.for('react.memo') : 60115),
      (h = e ? Symbol.for('react.lazy') : 60116),
      (m = e ? Symbol.for('react.block') : 60121),
      (g = e ? Symbol.for('react.fundamental') : 60117),
      (v = e ? Symbol.for('react.responder') : 60118),
      (y = e ? Symbol.for('react.scope') : 60119),
      (reactIs_production_min.AsyncMode = c),
      (reactIs_production_min.ConcurrentMode = u),
      (reactIs_production_min.ContextConsumer = l),
      (reactIs_production_min.ContextProvider = s),
      (reactIs_production_min.Element = n),
      (reactIs_production_min.ForwardRef = d),
      (reactIs_production_min.Fragment = o),
      (reactIs_production_min.Lazy = h),
      (reactIs_production_min.Memo = f),
      (reactIs_production_min.Portal = r),
      (reactIs_production_min.Profiler = a),
      (reactIs_production_min.StrictMode = i),
      (reactIs_production_min.Suspense = p),
      (reactIs_production_min.isAsyncMode = function (e) {
        return w(e) || b(e) === c;
      }),
      (reactIs_production_min.isConcurrentMode = w),
      (reactIs_production_min.isContextConsumer = function (e) {
        return b(e) === l;
      }),
      (reactIs_production_min.isContextProvider = function (e) {
        return b(e) === s;
      }),
      (reactIs_production_min.isElement = function (e) {
        return 'object' == typeof e && null !== e && e.$$typeof === n;
      }),
      (reactIs_production_min.isForwardRef = function (e) {
        return b(e) === d;
      }),
      (reactIs_production_min.isFragment = function (e) {
        return b(e) === o;
      }),
      (reactIs_production_min.isLazy = function (e) {
        return b(e) === h;
      }),
      (reactIs_production_min.isMemo = function (e) {
        return b(e) === f;
      }),
      (reactIs_production_min.isPortal = function (e) {
        return b(e) === r;
      }),
      (reactIs_production_min.isProfiler = function (e) {
        return b(e) === a;
      }),
      (reactIs_production_min.isStrictMode = function (e) {
        return b(e) === i;
      }),
      (reactIs_production_min.isSuspense = function (e) {
        return b(e) === p;
      }),
      (reactIs_production_min.isValidElementType = function (e) {
        return (
          'string' == typeof e ||
          'function' == typeof e ||
          e === o ||
          e === u ||
          e === a ||
          e === i ||
          e === p ||
          e === t ||
          ('object' == typeof e &&
            null !== e &&
            (e.$$typeof === h ||
              e.$$typeof === f ||
              e.$$typeof === s ||
              e.$$typeof === l ||
              e.$$typeof === d ||
              e.$$typeof === g ||
              e.$$typeof === v ||
              e.$$typeof === y ||
              e.$$typeof === m))
        );
      }),
      (reactIs_production_min.typeOf = b)),
    reactIs_production_min
  );
  function b(e) {
    if ('object' == typeof e && null !== e) {
      var t = e.$$typeof;
      switch (t) {
        case n:
          switch ((e = e.type)) {
            case c:
            case u:
            case o:
            case a:
            case i:
            case p:
              return e;
            default:
              switch ((e = e && e.$$typeof)) {
                case l:
                case d:
                case h:
                case f:
                case s:
                  return e;
                default:
                  return t;
              }
          }
        case r:
          return t;
      }
    }
  }
  function w(e) {
    return b(e) === u;
  }
}
var hasRequiredReactIs_development,
  reactIs_development = {};
function requireReactIs_development() {
  var e,
    o,
    i,
    a,
    s,
    l,
    c,
    u,
    d,
    p,
    f,
    h,
    t,
    m,
    g,
    n,
    r,
    v,
    y,
    b,
    w,
    x,
    S,
    k,
    C,
    E,
    T,
    _,
    R,
    O,
    I;
  return (
    hasRequiredReactIs_development ||
      ((hasRequiredReactIs_development = 1),
      'production' !== process.env.NODE_ENV &&
        ((e = 'function' == typeof Symbol && Symbol.for),
        (o = e ? Symbol.for('react.element') : 60103),
        (i = e ? Symbol.for('react.portal') : 60106),
        (a = e ? Symbol.for('react.fragment') : 60107),
        (s = e ? Symbol.for('react.strict_mode') : 60108),
        (l = e ? Symbol.for('react.profiler') : 60114),
        (c = e ? Symbol.for('react.provider') : 60109),
        (u = e ? Symbol.for('react.context') : 60110),
        (d = e ? Symbol.for('react.async_mode') : 60111),
        (p = e ? Symbol.for('react.concurrent_mode') : 60111),
        (f = e ? Symbol.for('react.forward_ref') : 60112),
        (h = e ? Symbol.for('react.suspense') : 60113),
        (t = e ? Symbol.for('react.suspense_list') : 60120),
        (m = e ? Symbol.for('react.memo') : 60115),
        (g = e ? Symbol.for('react.lazy') : 60116),
        (n = e ? Symbol.for('react.block') : 60121),
        (r = e ? Symbol.for('react.fundamental') : 60117),
        (v = e ? Symbol.for('react.responder') : 60118),
        (y = e ? Symbol.for('react.scope') : 60119),
        (e = p),
        (b = u),
        (w = c),
        (x = o),
        (S = f),
        (k = a),
        (C = g),
        (E = m),
        (T = i),
        (_ = l),
        (R = s),
        (O = h),
        (I = !1),
        (reactIs_development.AsyncMode = d),
        (reactIs_development.ConcurrentMode = e),
        (reactIs_development.ContextConsumer = b),
        (reactIs_development.ContextProvider = w),
        (reactIs_development.Element = x),
        (reactIs_development.ForwardRef = S),
        (reactIs_development.Fragment = k),
        (reactIs_development.Lazy = C),
        (reactIs_development.Memo = E),
        (reactIs_development.Portal = T),
        (reactIs_development.Profiler = _),
        (reactIs_development.StrictMode = R),
        (reactIs_development.Suspense = O),
        (reactIs_development.isAsyncMode = function (e) {
          return (
            I ||
              ((I = !0),
              console.warn(
                'The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.'
              )),
            D(e) || M(e) === d
          );
        }),
        (reactIs_development.isConcurrentMode = D),
        (reactIs_development.isContextConsumer = function (e) {
          return M(e) === u;
        }),
        (reactIs_development.isContextProvider = function (e) {
          return M(e) === c;
        }),
        (reactIs_development.isElement = function (e) {
          return 'object' == typeof e && null !== e && e.$$typeof === o;
        }),
        (reactIs_development.isForwardRef = function (e) {
          return M(e) === f;
        }),
        (reactIs_development.isFragment = function (e) {
          return M(e) === a;
        }),
        (reactIs_development.isLazy = function (e) {
          return M(e) === g;
        }),
        (reactIs_development.isMemo = function (e) {
          return M(e) === m;
        }),
        (reactIs_development.isPortal = function (e) {
          return M(e) === i;
        }),
        (reactIs_development.isProfiler = function (e) {
          return M(e) === l;
        }),
        (reactIs_development.isStrictMode = function (e) {
          return M(e) === s;
        }),
        (reactIs_development.isSuspense = function (e) {
          return M(e) === h;
        }),
        (reactIs_development.isValidElementType = function (e) {
          return (
            'string' == typeof e ||
            'function' == typeof e ||
            e === a ||
            e === p ||
            e === l ||
            e === s ||
            e === h ||
            e === t ||
            ('object' == typeof e &&
              null !== e &&
              (e.$$typeof === g ||
                e.$$typeof === m ||
                e.$$typeof === c ||
                e.$$typeof === u ||
                e.$$typeof === f ||
                e.$$typeof === r ||
                e.$$typeof === v ||
                e.$$typeof === y ||
                e.$$typeof === n))
          );
        }),
        (reactIs_development.typeOf = M))),
    reactIs_development
  );
  function M(e) {
    if ('object' == typeof e && null !== e) {
      var t = e.$$typeof;
      switch (t) {
        case o:
          var n = e.type;
          switch (n) {
            case d:
            case p:
            case a:
            case l:
            case s:
            case h:
              return n;
            default:
              var r = n && n.$$typeof;
              switch (r) {
                case u:
                case f:
                case g:
                case m:
                case c:
                  return r;
                default:
                  return t;
              }
          }
        case i:
          return t;
      }
    }
  }
  function D(e) {
    return M(e) === p;
  }
}
'production' === process.env.NODE_ENV
  ? (reactIs$1.exports = requireReactIs_production_min())
  : (reactIs$1.exports = requireReactIs_development());
var reactIsExports = reactIs$1.exports,
  reactIs = reactIsExports,
  FORWARD_REF_STATICS = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
  },
  MEMO_STATICS = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0,
  },
  TYPE_STATICS = {},
  isBrowser$4 =
    ((TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS),
    (TYPE_STATICS[reactIs.Memo] = MEMO_STATICS),
    'undefined' != typeof document);
function getRegisteredStyles(t, n, e) {
  var r = '';
  return (
    e.split(' ').forEach(function (e) {
      void 0 !== t[e] ? n.push(t[e] + ';') : (r += e + ' ');
    }),
    r
  );
}
var registerStyles = function (e, t, n) {
    var r = e.key + '-' + t.name;
    (!1 === n || (!1 === isBrowser$4 && void 0 !== e.compat)) &&
      void 0 === e.registered[r] &&
      (e.registered[r] = t.styles);
  },
  insertStyles = function (e, t, n) {
    registerStyles(e, t, n);
    var r = e.key + '-' + t.name;
    if (void 0 === e.inserted[t.name]) {
      var o = '',
        i = t;
      do {
        var a = e.insert(t === i ? '.' + r : '', i, e.sheet, !0);
      } while (
        (isBrowser$4 || void 0 === a || (o += a), void 0 !== (i = i.next))
      );
      if (!isBrowser$4 && 0 !== o.length) return o;
    }
  };
function murmur2(e) {
  for (var t, n = 0, r = 0, o = e.length; 4 <= o; ++r, o -= 4)
    (t =
      1540483477 *
        (65535 &
          (t =
            (255 & e.charCodeAt(r)) |
            ((255 & e.charCodeAt(++r)) << 8) |
            ((255 & e.charCodeAt(++r)) << 16) |
            ((255 & e.charCodeAt(++r)) << 24))) +
      ((59797 * (t >>> 16)) << 16)),
      (n =
        (1540483477 * (65535 & (t ^= t >>> 24)) +
          ((59797 * (t >>> 16)) << 16)) ^
        (1540483477 * (65535 & n) + ((59797 * (n >>> 16)) << 16)));
  switch (o) {
    case 3:
      n ^= (255 & e.charCodeAt(r + 2)) << 16;
    case 2:
      n ^= (255 & e.charCodeAt(r + 1)) << 8;
    case 1:
      n =
        1540483477 * (65535 & (n ^= 255 & e.charCodeAt(r))) +
        ((59797 * (n >>> 16)) << 16);
  }
  return (
    ((n =
      1540483477 * (65535 & (n ^= n >>> 13)) + ((59797 * (n >>> 16)) << 16)) ^
      (n >>> 15)) >>>
    0
  ).toString(36);
}
var contentValuePattern,
  contentValues,
  oldProcessStyleValue,
  msPattern,
  hyphenPattern,
  hyphenatedCache,
  unitlessKeys = {
    animationIterationCount: 1,
    aspectRatio: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  ILLEGAL_ESCAPE_SEQUENCE_ERROR =
    "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
  UNDEFINED_AS_OBJECT_KEY_ERROR =
    "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).",
  hyphenateRegex = /[A-Z]|^ms/g,
  animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
  isCustomProperty = function (e) {
    return 45 === e.charCodeAt(1);
  },
  isProcessableValue = function (e) {
    return null != e && 'boolean' != typeof e;
  },
  processStyleName = memoize(function (e) {
    return isCustomProperty(e)
      ? e
      : e.replace(hyphenateRegex, '-$&').toLowerCase();
  }),
  processStyleValue = function (e, t) {
    switch (e) {
      case 'animation':
      case 'animationName':
        if ('string' == typeof t)
          return t.replace(animationRegex, function (e, t, n) {
            return (cursor = { name: t, styles: n, next: cursor }), t;
          });
    }
    return 1 === unitlessKeys[e] ||
      isCustomProperty(e) ||
      'number' != typeof t ||
      0 === t
      ? t
      : t + 'px';
  },
  noComponentSelectorMessage =
    ('production' !== process.env.NODE_ENV &&
      ((contentValuePattern =
        /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/),
      (contentValues = ['normal', 'none', 'initial', 'inherit', 'unset']),
      (oldProcessStyleValue = processStyleValue),
      (msPattern = /^-ms-/),
      (hyphenPattern = /-(.)/g),
      (hyphenatedCache = {}),
      (processStyleValue = function (e, t) {
        var n;
        if (
          'content' !== e ||
          ('string' == typeof t &&
            (-1 !== contentValues.indexOf(t) ||
              contentValuePattern.test(t) ||
              (t.charAt(0) === t.charAt(t.length - 1) &&
                ('"' === t.charAt(0) || "'" === t.charAt(0)))))
        )
          return (
            '' === (n = oldProcessStyleValue(e, t)) ||
              isCustomProperty(e) ||
              -1 === e.indexOf('-') ||
              void 0 !== hyphenatedCache[e] ||
              ((hyphenatedCache[e] = !0),
              console.error(
                'Using kebab-case for css properties in objects is not supported. Did you mean ' +
                  e
                    .replace(msPattern, 'ms-')
                    .replace(hyphenPattern, function (e, t) {
                      return t.toUpperCase();
                    }) +
                  '?'
              )),
            n
          );
        throw new Error(
          "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
            t +
            '"\'`'
        );
      })),
    'Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.');
function handleInterpolation(e, t, n) {
  if (null == n) return '';
  if (void 0 !== n.__emotion_styles) {
    if (
      'production' !== process.env.NODE_ENV &&
      'NO_COMPONENT_SELECTOR' === n.toString()
    )
      throw new Error(noComponentSelectorMessage);
    return n;
  }
  switch (typeof n) {
    case 'boolean':
      return '';
    case 'object':
      if (1 === n.anim)
        return (
          (cursor = { name: n.name, styles: n.styles, next: cursor }), n.name
        );
      if (void 0 === n.styles) return createStringFromObject(e, t, n);
      var r = n.next;
      if (void 0 !== r)
        for (; void 0 !== r; )
          (cursor = { name: r.name, styles: r.styles, next: cursor }),
            (r = r.next);
      var o = n.styles + ';';
      return (
        'production' !== process.env.NODE_ENV &&
          void 0 !== n.map &&
          (o += n.map),
        o
      );
    case 'function':
      var i;
      if (void 0 !== e)
        return (
          (o = cursor), (i = n(e)), (cursor = o), handleInterpolation(e, t, i)
        );
      'production' !== process.env.NODE_ENV &&
        console.error(
          "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
        );
      break;
    case 'string':
      var a;
      'production' !== process.env.NODE_ENV &&
        ((a = []),
        (o = n.replace(animationRegex, function (e, t, n) {
          var r = 'animation' + a.length;
          return (
            a.push(
              'const ' +
                r +
                ' = keyframes`' +
                n.replace(/^@keyframes animation-\w+/, '') +
                '`'
            ),
            '${' + r + '}'
          );
        })),
        a.length) &&
        console.error(
          '`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n' +
            [].concat(a, ['`' + o + '`']).join('\n') +
            '\n\nYou should wrap it with `css` like this:\n\ncss`' +
            o +
            '`'
        );
  }
  var s;
  return null != t && void 0 !== (s = t[n]) ? s : n;
}
function createStringFromObject(e, t, n) {
  var r = '';
  if (Array.isArray(n))
    for (var o = 0; o < n.length; o++)
      r += handleInterpolation(e, t, n[o]) + ';';
  else
    for (var i in n) {
      var a = n[i];
      if ('object' != typeof a)
        null != t && void 0 !== t[a]
          ? (r += i + '{' + t[a] + '}')
          : isProcessableValue(a) &&
            (r += processStyleName(i) + ':' + processStyleValue(i, a) + ';');
      else {
        if (
          'NO_COMPONENT_SELECTOR' === i &&
          'production' !== process.env.NODE_ENV
        )
          throw new Error(noComponentSelectorMessage);
        if (
          !Array.isArray(a) ||
          'string' != typeof a[0] ||
          (null != t && void 0 !== t[a[0]])
        ) {
          var s = handleInterpolation(e, t, a);
          switch (i) {
            case 'animation':
            case 'animationName':
              r += processStyleName(i) + ':' + s + ';';
              break;
            default:
              'production' !== process.env.NODE_ENV &&
                'undefined' === i &&
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR),
                (r += i + '{' + s + '}');
          }
        } else
          for (var l = 0; l < a.length; l++)
            isProcessableValue(a[l]) &&
              (r +=
                processStyleName(i) + ':' + processStyleValue(i, a[l]) + ';');
      }
    }
  return r;
}
var sourceMapPattern,
  cursor,
  labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g,
  serializeStyles =
    ('production' !== process.env.NODE_ENV &&
      (sourceMapPattern =
        /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g),
    function (e, t, n) {
      if (
        1 === e.length &&
        'object' == typeof e[0] &&
        null !== e[0] &&
        void 0 !== e[0].styles
      )
        return e[0];
      var r = !0,
        o = '',
        i = ((cursor = void 0), e[0]);
      null == i || void 0 === i.raw
        ? ((r = !1), (o += handleInterpolation(n, t, i)))
        : ('production' !== process.env.NODE_ENV &&
            void 0 === i[0] &&
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR),
          (o += i[0]));
      for (var a, s = 1; s < e.length; s++)
        (o += handleInterpolation(n, t, e[s])),
          r &&
            ('production' !== process.env.NODE_ENV &&
              void 0 === i[s] &&
              console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR),
            (o += i[s]));
      'production' !== process.env.NODE_ENV &&
        (o = o.replace(sourceMapPattern, function (e) {
          return (a = e), '';
        })),
        (labelPattern.lastIndex = 0);
      for (var l, c = ''; null !== (l = labelPattern.exec(o)); )
        c += '-' + l[1];
      var u = murmur2(o) + c;
      return 'production' !== process.env.NODE_ENV
        ? {
            name: u,
            styles: o,
            map: a,
            next: cursor,
            toString: function () {
              return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
            },
          }
        : { name: u, styles: o, next: cursor };
    }),
  isBrowser$3 = 'undefined' != typeof document,
  syncFallback = function (e) {
    return e();
  },
  useInsertionEffect = React$1.useInsertionEffect || !1,
  useInsertionEffectAlwaysWithSyncFallback =
    (isBrowser$3 && useInsertionEffect) || syncFallback,
  useInsertionEffectWithLayoutFallback =
    useInsertionEffect || React$1.useLayoutEffect,
  isBrowser$2 = 'undefined' != typeof document,
  hasOwnProperty = {}.hasOwnProperty,
  EmotionCacheContext = React$1.createContext(
    'undefined' != typeof HTMLElement ? createCache({ key: 'css' }) : null
  ),
  withEmotionCache =
    ('production' !== process.env.NODE_ENV &&
      (EmotionCacheContext.displayName = 'EmotionCacheContext'),
    EmotionCacheContext.Provider,
    function (r) {
      return forwardRef(function (e, t) {
        var n = useContext(EmotionCacheContext);
        return r(e, n, t);
      });
    }),
  ThemeContext =
    (isBrowser$2 ||
      (withEmotionCache = function (n) {
        return function (e) {
          var t = useContext(EmotionCacheContext);
          return null === t
            ? ((t = createCache({ key: 'css' })),
              React$1.createElement(
                EmotionCacheContext.Provider,
                { value: t },
                n(e, t)
              ))
            : n(e, t);
        };
      }),
    React$1.createContext({})),
  getLastPart =
    ('production' !== process.env.NODE_ENV &&
      (ThemeContext.displayName = 'EmotionThemeContext'),
    function (e) {
      e = e.split('.');
      return e[e.length - 1];
    }),
  getFunctionNameFromStackTraceLine = function (e) {
    var t = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(e);
    return (t = t || /^([A-Za-z0-9$.]+)@/.exec(e)) ? getLastPart(t[1]) : void 0;
  },
  internalReactFunctionNames = new Set([
    'renderWithHooks',
    'processChild',
    'finishClassComponent',
    'renderToString',
  ]),
  sanitizeIdentifier = function (e) {
    return e.replace(/\$/g, '-');
  },
  getLabelFromStackTrace = function (e) {
    if (e)
      for (var t = e.split('\n'), n = 0; n < t.length; n++) {
        var r = getFunctionNameFromStackTraceLine(t[n]);
        if (r) {
          if (internalReactFunctionNames.has(r)) break;
          if (/^[A-Z]/.test(r)) return sanitizeIdentifier(r);
        }
      }
  },
  typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  createEmotionProps = function (e, t) {
    if (
      'production' !== process.env.NODE_ENV &&
      'string' == typeof t.css &&
      -1 !== t.css.indexOf(':')
    )
      throw new Error(
        "Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" +
          t.css +
          '`'
      );
    var n,
      r = {};
    for (n in t) hasOwnProperty.call(t, n) && (r[n] = t[n]);
    return (
      (r[typePropName] = e),
      'production' === process.env.NODE_ENV ||
        !t.css ||
        ('object' == typeof t.css &&
          'string' == typeof t.css.name &&
          -1 !== t.css.name.indexOf('-')) ||
        ((e = getLabelFromStackTrace(new Error().stack)) &&
          (r[labelPropName] = e)),
      r
    );
  },
  Insertion$1 = function (e) {
    var t = e.cache,
      n = e.serialized,
      r = e.isStringTag,
      e =
        (registerStyles(t, n, r),
        useInsertionEffectAlwaysWithSyncFallback(function () {
          return insertStyles(t, n, r);
        }));
    if (isBrowser$2 || void 0 === e) return null;
    for (var o, i = n.name, a = n.next; void 0 !== a; )
      (i += ' ' + a.name), (a = a.next);
    return React$1.createElement(
      'style',
      (((o = {})['data-emotion'] = t.key + ' ' + i),
      (o.dangerouslySetInnerHTML = { __html: e }),
      (o.nonce = t.sheet.nonce),
      o)
    );
  },
  Emotion = withEmotionCache(function (e, t, n) {
    var r,
      o,
      i = e.css,
      a =
        ('string' == typeof i &&
          void 0 !== t.registered[i] &&
          (i = t.registered[i]),
        e[typePropName]),
      i = [i],
      s = '',
      i =
        ('string' == typeof e.className
          ? (s = getRegisteredStyles(t.registered, i, e.className))
          : null != e.className && (s = e.className + ' '),
        serializeStyles(i, void 0, React$1.useContext(ThemeContext))),
      l =
        ('production' !== process.env.NODE_ENV &&
          -1 === i.name.indexOf('-') &&
          (r = e[labelPropName]) &&
          (i = serializeStyles([i, 'label:' + r + ';'])),
        (s += t.key + '-' + i.name),
        {});
    for (o in e)
      !hasOwnProperty.call(e, o) ||
        'css' === o ||
        o === typePropName ||
        ('production' !== process.env.NODE_ENV && o === labelPropName) ||
        (l[o] = e[o]);
    return (
      (l.ref = n),
      (l.className = s),
      React$1.createElement(
        React$1.Fragment,
        null,
        React$1.createElement(Insertion$1, {
          cache: t,
          serialized: i,
          isStringTag: 'string' == typeof a,
        }),
        React$1.createElement(a, l)
      )
    );
  }),
  Emotion$1 =
    ('production' !== process.env.NODE_ENV &&
      (Emotion.displayName = 'EmotionCssPropInternal'),
    Emotion);
function jsx(e, t, n) {
  return hasOwnProperty.call(t, 'css')
    ? ReactJSXRuntime.jsx(Emotion$1, createEmotionProps(e, t), n)
    : ReactJSXRuntime.jsx(e, t, n);
}
function jsxs(e, t, n) {
  return hasOwnProperty.call(t, 'css')
    ? ReactJSXRuntime.jsxs(Emotion$1, createEmotionProps(e, t), n)
    : ReactJSXRuntime.jsxs(e, t, n);
}
const LayerContext = createContext({}),
  LayerProvider = ({ id: e, children: t }) =>
    jsx(LayerContext.Provider, { value: { id: e }, children: t }),
  PageContext = createContext({}),
  PageProvider = ({ pageIndex: e, children: t }) =>
    jsx(PageContext.Provider, { value: { pageIndex: e }, children: t }),
  useLayer = (t) => {
    const o = useContext(PageContext)['pageIndex'],
      i = useContext(LayerContext)['id'],
      e = useEditor(
        (e) =>
          t && e.pages[o] && e.pages[o].layers[i] && t(e.pages[o].layers[i])
      ),
      { state: n, actions: a } = e,
      r = __rest(e, ['state', 'actions']);
    var s = useMemo(
      () => ({
        setProp: (e) => a.setProp(o, i, e),
        select: () => a.selectLayers(o, i),
        hover: (e) => a.hoverLayer(o, void 0 === e ? i : null),
        setTextEditor: (e) => a.setTextEditor(o, i, e),
        openTextEditor: () => a.openTextEditor(o, i),
        openImageEditor: ({ boxSize: e, position: t, rotate: n, image: r }) =>
          a.openImageEditor(o, i, {
            boxSize: e,
            position: t,
            rotate: n,
            image: r,
          }),
      }),
      [i, a]
    );
    return Object.assign(Object.assign({}, r), {
      pageIndex: o,
      id: i,
      state: n,
      actions: s,
    });
  },
  useSelectedLayers = () => {
    const r = useContext(PageContext)['pageIndex'];
    var { selectedLayerIds: e, selectedLayers: t } = useEditor((t) => {
      const n = void 0 === r ? t.activePage : r;
      var e = (t.selectedLayers[n] || []).filter(
        (e) => t.pages[n] && t.pages[n].layers[e]
      );
      return {
        selectedLayerIds: e,
        selectedLayers: e.map((e) => t.pages[n].layers[e]),
      };
    });
    return { selectedLayerIds: e, selectedLayers: t };
  },
  normalizeNumber = (e) =>
    0 < e % 1 && e % 1 < 0.5 ? Math.round(e) : Math.round(1e3 * e) / 1e3,
  getCirclePath = ({ width: e, height: t }) => {
    var n = (4 * (Math.sqrt(2) - 1)) / 3,
      r = normalizeNumber(e / 2),
      o = normalizeNumber(t / 2),
      i = normalizeNumber(e * n),
      n = normalizeNumber(t * n),
      i = normalizeNumber((e - i) / 2),
      n = normalizeNumber((t - n) / 2),
      a = [`M ${r} 0`];
    return (
      a.push(`C ${e - i} 0 ${e} ${n} ${e} ` + o),
      a.push(`C ${e} ${t - n} ${e - i} ${t} ${r} ` + t),
      a.push(`C ${i} ${t} 0 ${t - n} 0 ` + o),
      a.push(`C 0 ${n} ${i} 0 ${r} 0`),
      a.join(' ')
    );
  },
  getRectanglePath = ({ width: e, height: t, roundedCorners: n }) => {
    var r = 0.005 * Math.min(e, t),
      r = normalizeNumber(Math.min(Math.min(e / 2, r * n), t / 2)),
      o = (4 * (Math.sqrt(2) - 1)) / 3,
      o = normalizeNumber(r * (1 - o)),
      i = [`M ${r} 0`];
    return (
      i.push(`L ${normalizeNumber(e) - r} 0`),
      n &&
        i.push(
          `C ${normalizeNumber(e) - o} 0 ${normalizeNumber(
            e
          )} ${o} ${normalizeNumber(e)} ` + r
        ),
      i.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - r)),
      n &&
        i.push(
          `C ${normalizeNumber(e)} ${normalizeNumber(t) - o} ${
            normalizeNumber(e) - o
          } ${normalizeNumber(t)} ${normalizeNumber(e) - r} ` +
            normalizeNumber(t)
        ),
      i.push(`L ${r} ` + normalizeNumber(t)),
      n &&
        i.push(
          `C ${o} ${normalizeNumber(t)} 0 ${normalizeNumber(t) - o} 0 ` +
            (normalizeNumber(t) - r)
        ),
      i.push('L 0 ' + r),
      n && i.push(`C 0 ${o} ${o} 0 ${r} 0`),
      i.join(' ')
    );
  },
  getTrianglePath = ({ width: e, height: t }) => {
    var n = normalizeNumber(e / 2),
      r = [`M ${n} 0`];
    return (
      r.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t)),
      r.push('L 0 ' + normalizeNumber(t)),
      r.push(`L ${n} 0`),
      r.join(' ')
    );
  },
  getTriangleUpsideDownPath = ({ width: e, height: t }) => {
    var n = normalizeNumber(e / 2),
      r = ['M 0 0'];
    return (
      r.push(`L ${normalizeNumber(e)} 0`),
      r.push(`L ${n} ` + normalizeNumber(t)),
      r.push('L 0 0'),
      r.join(' ')
    );
  },
  PADDING$1 = 16,
  getParallelogramPath = ({ width: e, height: t }) => {
    var n = [`M ${PADDING$1} 0`];
    return (
      n.push(`L ${normalizeNumber(e)} 0`),
      n.push(`L ${normalizeNumber(e) - PADDING$1} ` + normalizeNumber(t)),
      n.push('L 0 ' + normalizeNumber(t)),
      n.push(`L ${PADDING$1} 0`),
      n.join(' ')
    );
  },
  getParallelogramUpsideDownPath = ({ width: e, height: t }) => {
    var n = [`M ${normalizeNumber(e - PADDING$1)} 0`];
    return (
      n.push('L 0 0'),
      n.push(`L ${PADDING$1} ` + normalizeNumber(t)),
      n.push(`L ${PADDING$1} ` + normalizeNumber(t)),
      n.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t)),
      n.push(`L ${normalizeNumber(e) - PADDING$1} 0`),
      n.join(' ')
    );
  },
  ARROW_SIZE = 32,
  getArrowPath = ({ width: e, height: t }) => {
    var n = normalizeNumber(t / 4),
      r = [`M ${normalizeNumber(e) - ARROW_SIZE} 0`];
    return (
      r.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t / 2)),
      r.push(`L ${normalizeNumber(e) - ARROW_SIZE} ` + normalizeNumber(t)),
      r.push(`L ${normalizeNumber(e) - ARROW_SIZE} ` + normalizeNumber(t - n)),
      r.push('L 0 ' + normalizeNumber(t - n)),
      r.push('L 0 ' + normalizeNumber(n)),
      r.push(`L ${normalizeNumber(e) - ARROW_SIZE} ` + normalizeNumber(n)),
      r.push(`L  ${normalizeNumber(e) - ARROW_SIZE} 0`),
      r.join(' ')
    );
  },
  getArrowBottomPath = ({ width: e, height: t }) => {
    var n = normalizeNumber(e / 4),
      r = [`M ${normalizeNumber(n)} 0`];
    return (
      r.push(`L ${normalizeNumber(e - n)} 0`),
      r.push(
        `L ${normalizeNumber(e - n)} ` + (normalizeNumber(t) - ARROW_SIZE)
      ),
      r.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - ARROW_SIZE)),
      r.push(`L ${normalizeNumber(e / 2)} ` + t),
      r.push('L 0 ' + (normalizeNumber(t) - ARROW_SIZE)),
      r.push(`L ${n} ` + (normalizeNumber(t) - ARROW_SIZE)),
      r.push(`L ${n} 0`),
      r.join(' ')
    );
  },
  getArrowTopPath = ({ width: e, height: t }) => {
    var n = e / 4,
      r = [`M ${normalizeNumber(e / 2)} 0`];
    return (
      r.push(`L ${normalizeNumber(e)} ` + ARROW_SIZE),
      r.push(`L ${normalizeNumber(e - n)} ` + ARROW_SIZE),
      r.push(`L ${normalizeNumber(e - n)} ` + normalizeNumber(t)),
      r.push(`L ${n} ` + normalizeNumber(t)),
      r.push(`L ${n} ` + ARROW_SIZE),
      r.push('L 0 ' + ARROW_SIZE),
      r.push(`L ${normalizeNumber(e / 2)} 0`),
      r.join(' ')
    );
  },
  getArrowLeftPath = ({ width: e, height: t }) => {
    var n = normalizeNumber(t / 4),
      r = [`M ${ARROW_SIZE} 0`];
    return (
      r.push(`L ${ARROW_SIZE} ` + n),
      r.push(`L ${normalizeNumber(e)} ` + n),
      r.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - n)),
      r.push(`L ${ARROW_SIZE} ` + (normalizeNumber(t) - n)),
      r.push(`L ${ARROW_SIZE} ` + normalizeNumber(t)),
      r.push('L 0 ' + normalizeNumber(t / 2)),
      r.push(`L ${ARROW_SIZE} 0`),
      r.join(' ')
    );
  },
  getChevronPath = ({ width: e, height: t }) => {
    var n = ARROW_SIZE / 2,
      r = normalizeNumber(t / 2),
      o = ['M 0 0'];
    return (
      o.push(`L ${normalizeNumber(e) - n} 0`),
      o.push(`L ${normalizeNumber(e)} ` + r),
      o.push(`L ${normalizeNumber(e) - n} ` + t),
      o.push('L 0 ' + normalizeNumber(t)),
      o.push(`L ${n} ` + r),
      o.push('L 0 0'),
      o.join(' ')
    );
  },
  getArrowPentagonPath = ({ width: e, height: t }) => {
    var n = ARROW_SIZE / 2,
      r = t / 2,
      o = ['M 0 0'];
    return (
      o.push(`L ${e - n} 0`),
      o.push(`L ${e} ` + r),
      o.push(`L ${e - n} ` + t),
      o.push('L 0 ' + t),
      o.push('L 0 0'),
      o.join(' ')
    );
  },
  getRhombusPath = ({ width: e, height: t }) => {
    var n = normalizeNumber(e / 2),
      r = normalizeNumber(t / 2),
      o = [`M ${n} 0`];
    return (
      o.push(`L ${normalizeNumber(e)} ` + r),
      o.push(`L ${n} ` + normalizeNumber(t)),
      o.push('L 0 ' + r),
      o.push(`L ${n} 0`),
      o.join(' ')
    );
  },
  PADDING = 16,
  getTrapezoidPath = ({ width: e, height: t }) => {
    var n = [`M ${PADDING} 0`];
    return (
      n.push(`L ${normalizeNumber(e) - PADDING} 0`),
      n.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t)),
      n.push('L 0 ' + normalizeNumber(t)),
      n.push(`L ${PADDING} 0`),
      n.join(' ')
    );
  },
  getTrapezoidUpsideDownPath = ({ width: e, height: t }) => {
    var n = ['M 0 0'];
    return (
      n.push(`L ${normalizeNumber(e)} 0`),
      n.push(`L ${normalizeNumber(e) - PADDING} ` + normalizeNumber(t)),
      n.push(`L ${PADDING} ` + normalizeNumber(t)),
      n.push('L 0 0'),
      n.join(' ')
    );
  },
  getCrossPath = ({ width: e, height: t }) => {
    var n = normalizeNumber(e / 3),
      r = 2 * n,
      o = normalizeNumber(t / 3),
      i = 2 * o,
      a = [`M ${n} 0`];
    return (
      a.push(`L ${r} 0`),
      a.push(`L ${r} ` + o),
      a.push(`L ${normalizeNumber(e)} ` + o),
      a.push(`L ${normalizeNumber(e)} ` + i),
      a.push(`L ${r} ` + i),
      a.push(`L ${r} ` + normalizeNumber(t)),
      a.push(`L ${n} ` + normalizeNumber(t)),
      a.push(`L ${n} ` + i),
      a.push('L 0 ' + i),
      a.push('L 0 ' + o),
      a.push(`L ${n} ` + o),
      a.push(`L ${n} 0`),
      a.join(' ')
    );
  },
  getPentagonPath = ({ width: e, height: t }) => {
    var n = [`M ${normalizeNumber(e / 2)} 0`];
    return (
      n.push(`L ${normalizeNumber(e)} ` + normalizeNumber(0.382 * t)),
      n.push(`L ${normalizeNumber(e - 0.191 * e)} ` + normalizeNumber(t)),
      n.push(`L ${normalizeNumber(0.191 * e)} ` + normalizeNumber(t)),
      n.push('L 0 ' + normalizeNumber(0.382 * t)),
      n.push(`L ${normalizeNumber(e / 2)} 0`),
      n.join(' ')
    );
  },
  getHexagonVerticalPath = ({ width: e, height: t }) => {
    var n = normalizeNumber(0.25 * t),
      r = [`M ${normalizeNumber(e / 2)} 0`];
    return (
      r.push(`L ${normalizeNumber(e)} ` + n),
      r.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - n)),
      r.push(`L ${normalizeNumber(e / 2)} ` + normalizeNumber(t)),
      r.push('L 0 ' + normalizeNumber(t - n)),
      r.push('L 0 ' + n),
      r.push(`L ${normalizeNumber(e / 2)} 0`),
      r.join(' ')
    );
  },
  getHexagonHorizontalPath = ({ width: e, height: t }) => {
    var n = normalizeNumber(0.25 * e),
      r = [`M ${n} 0`];
    return (
      r.push(`L ${normalizeNumber(e) - n} 0`),
      r.push(`L ${normalizeNumber(e)} ` + normalizeNumber(t / 2)),
      r.push(`L ${normalizeNumber(e - n)} ` + normalizeNumber(t)),
      r.push(`L ${n} ` + normalizeNumber(t)),
      r.push('L 0 ' + normalizeNumber(t / 2)),
      r.push(`L ${n} 0`),
      r.join(' ')
    );
  },
  getOctagonPath = ({ width: e, height: t }) => {
    var n = normalizeNumber(0.29 * e),
      r = normalizeNumber(0.29 * t),
      o = [`M ${n} 0`];
    return (
      o.push(`L ${normalizeNumber(e) - n} 0`),
      o.push(`L ${normalizeNumber(e)} ` + r),
      o.push(`L ${normalizeNumber(e)} ` + (normalizeNumber(t) - r)),
      o.push(`L ${normalizeNumber(e) - n} ` + normalizeNumber(t)),
      o.push(`L ${n} ` + normalizeNumber(t)),
      o.push('L 0 ' + (normalizeNumber(t) - r)),
      o.push('L 0 ' + r),
      o.push(`L ${n} 0`),
      o.join(' ')
    );
  },
  getShapePath = (e, t) => {
    switch (e) {
      case 'circle':
        return getCirclePath(t);
      case 'rectangle':
        return getRectanglePath(t);
      case 'triangle':
        return getTrianglePath(t);
      case 'triangleUpsideDown':
        return getTriangleUpsideDownPath(t);
      case 'cross':
        return getCrossPath(t);
      case 'parallelogram':
        return getParallelogramPath(t);
      case 'parallelogramUpsideDown':
        return getParallelogramUpsideDownPath(t);
      case 'trapezoid':
        return getTrapezoidPath(t);
      case 'trapezoidUpsideDown':
        return getTrapezoidUpsideDownPath(t);
      case 'arrowRight':
        return getArrowPath(t);
      case 'arrowLeft':
        return getArrowLeftPath(t);
      case 'arrowTop':
        return getArrowTopPath(t);
      case 'arrowBottom':
        return getArrowBottomPath(t);
      case 'rhombus':
        return getRhombusPath(t);
      case 'chevron':
        return getChevronPath(t);
      case 'arrowPentagon':
        return getArrowPentagonPath(t);
      case 'pentagon':
        return getPentagonPath(t);
      case 'hexagonVertical':
        return getHexagonVerticalPath(t);
      case 'hexagonHorizontal':
        return getHexagonHorizontalPath(t);
      case 'octagon':
        return getOctagonPath(t);
    }
  },
  scalePath = (e, t) => {
    return e
      .split(' ')
      .map((e) => (e.match(/^[+-]?\d+(\.\d+)?$/) ? parseFloat(e) * t : e))
      .join(' ');
  },
  hex2rgb = (e) =>
    (e = '#' === e[0] ? e.substring(1) : e).length < 6
      ? {
          r: parseInt(e[0] + e[0], 16),
          g: parseInt(e[1] + e[1], 16),
          b: parseInt(e[2] + e[2], 16),
          a:
            4 === e.length
              ? Math.round((parseInt(e[3] + e[3], 16) / 255) * 100) / 100
              : 1,
        }
      : {
          r: parseInt(e.substring(0, 2), 16),
          g: parseInt(e.substring(2, 4), 16),
          b: parseInt(e.substring(4, 6), 16),
          a:
            8 === e.length
              ? Math.round((parseInt(e.substring(6, 8), 16) / 255) * 100) / 100
              : 1,
        },
  hex2rgbString = (e) => {
    var { r: e, g: t, b: n, a: r } = hex2rgb(e);
    return 1 === r ? `rgb(${e}, ${t}, ${n})` : `rgba(${e}, ${t}, ${n}, ${r})`;
  },
  rgb2hsv = ({ r: e, g: t, b: n, a: r }) => {
    let o;
    var i = Math.max(e, t, n),
      a = i - Math.min(e, t, n);
    return (
      (o =
        0 == a
          ? 0
          : e === i
          ? ((t - n) / a) % 6
          : t === i
          ? (n - e) / a + 2
          : (e - t) / a + 4),
      (o *= 60) < 0 && (o += 360),
      { h: o, s: 100 * (0 === i ? 0 : a / i), v: (i / 255) * 100, a: r }
    );
  },
  hex2hsv = (e) => {
    e = hex2rgb(e);
    return rgb2hsv(e);
  },
  hsl2hsv = ({ h: e, s: t, l: n, a: r }) => ({
    h: e,
    s: 0 < (t *= (n < 50 ? n : 100 - n) / 100) ? ((2 * t) / (n + t)) * 100 : 0,
    v: n + t,
    a: r,
  }),
  hsv2rgb = ({ h: e, s: t, v: n, a: r }) => {
    let o = [];
    var t = (n /= 100) * (t /= 100),
      i = e / 60,
      a = t * (1 - Math.abs((i % 2) - 1)),
      n = n - t;
    return (
      (o =
        0 <= i && i < 1
          ? [t, a, 0]
          : 1 <= i && i < 2
          ? [a, t, 0]
          : 2 <= i && i < 3
          ? [0, t, a]
          : 3 <= e && i < 4
          ? [0, a, t]
          : 4 <= e && i < 5
          ? [a, 0, t]
          : 5 <= e && i <= 6
          ? [t, 0, a]
          : [0, 0, 0]),
      {
        r: Math.round(255 * (o[0] + n)),
        g: Math.round(255 * (o[1] + n)),
        b: Math.round(255 * (o[2] + n)),
        a: r,
      }
    );
  },
  convert = (e) => {
    e = e.toString(16);
    return 1 === e.length ? '0' + e : e;
  },
  rgb2hex = ({ r: e, g: t, b: n, a: r }) => {
    r = r < 1 ? convert(Math.round(255 * r)) : '';
    return '#' + [convert(e), convert(t), convert(n), r].join('');
  },
  hsv2hex = ({ h: e, s: t, v: n, a: r }) => {
    e = hsv2rgb({ h: e, s: t, v: n, a: r });
    return rgb2hex(e);
  },
  hsv2hsl = ({ h: e, s: t, v: n, a: r }) => {
    var o = ((200 - t) * n) / 100;
    return {
      h: e,
      s:
        0 < o && o < 200 ? ((t * n) / 100 / (o <= 100 ? o : 200 - o)) * 100 : 0,
      l: o / 2,
      a: r,
    };
  },
  hsv2hslString = ({ h: e, s: t, v: n, a: r }) => {
    e = hsv2hsl({ h: e, s: t, v: n, a: r });
    return `hsl(${e.h}, ${e.s}%, ${e.l}%, ${e.a})`;
  },
  rgbColorRegex =
    /rgba?\((?<r>[.\d]+)[, ]+(?<g>[.\d]+)[, ]+(?<b>[.\d]+)(?:\s?[,\/]\s?(?<a>[.\d]+%?))?\)/i,
  parseRgba = (e) => {
    e = rgbColorRegex.exec(e);
    if (null != e && e.groups)
      return {
        r: parseInt(e.groups.r, 10),
        g: parseInt(e.groups.g, 10),
        b: parseInt(e.groups.b, 10),
        a: void 0 !== e.groups.a ? parseInt(e.groups.a) : 1,
      };
  },
  hexColorRegex = /^#[0-9A-F]{3,6}[0-9a-f]{0,2}$/i,
  parseHex = (e) => hex2rgb(e),
  parseColor = (e) => {
    let t;
    if (
      (rgbColorRegex.test(e)
        ? (t = parseRgba(e))
        : hexColorRegex.test(e) && (t = parseHex(e)),
      t)
    )
      return rgb2hsv(t);
    throw new Error('Cannot parse ' + e);
  },
  isRGB = (e) => Object.keys(e).every((e) => ['r', 'g', 'b', 'a'].includes(e)),
  isHSL = (e) => Object.keys(e).every((e) => ['h', 's', 'l', 'a'].includes(e)),
  hsv2hwb = ({ h: e, s: t, v: n }) => ({
    h: e,
    w: ((100 - t) * n) / 100,
    b: 100 - n,
  }),
  hwb2hsv = ({ h: e, w: t, b: n }, r) => ({
    h: e,
    s: Math.max(0, Math.min(100, 100 === n ? 0 : 100 - (t / (100 - n)) * 100)),
    v: 100 - n,
    a: r,
  });
class Color {
  constructor(e) {
    var t;
    Object.defineProperty(this, '_color', {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0,
    }),
      Object.defineProperty(this, '_alpha', {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      'string' == typeof e
        ? ((t = parseColor(e)), (this._color = t), (this._alpha = t.a || 1))
        : (isRGB(e)
            ? (this._color = rgb2hsv(e))
            : isHSL(e)
            ? (this._color = hsl2hsv(e))
            : (this._color = e),
          (this._alpha = e.a || 1));
  }
  alpha(e) {
    return (this._alpha = e), this;
  }
  white() {
    return this.toHwb().w;
  }
  darken(e) {
    var t = this.toHsl();
    return (
      (t.l = Math.min(100, Math.max(t.l - t.l * e, 0))),
      (this._color = hsl2hsv(t)),
      this
    );
  }
  whiten(e) {
    var t = this.toHwb();
    return (
      (t.w = Math.min(100, Math.max(t.w + t.w * e, 0))),
      (this._color = hwb2hsv(t, this._alpha)),
      this
    );
  }
  blacken(e) {
    var t = this.toHwb();
    return (
      (t.b = Math.min(100, Math.max(t.b + t.b * e, 0))),
      (this._color = hwb2hsv(t, this._alpha)),
      this
    );
  }
  toHwb() {
    return hsv2hwb(this._color);
  }
  toHsl() {
    return hsv2hsl(
      Object.assign(Object.assign({}, this._color), { a: this._alpha })
    );
  }
  toRgbString() {
    var e = hsv2rgb(
      Object.assign(Object.assign({}, this._color), { a: this._alpha })
    );
    return `rgb${1 !== e.a ? 'a' : ''}(${e.r}, ${e.g}, ${e.b}${
      1 !== e.a ? ', ' + e.a : ''
    })`;
  }
  toHex() {
    return hsv2hex(
      Object.assign(Object.assign({}, this._color), { a: this._alpha })
    );
  }
}
const isMouseEvent = (e) =>
    Boolean((e.clientX || 0 === e.clientX) && (e.clientY || 0 === e.clientY)),
  isTouchEvent = (e) => Boolean(e.touches && e.touches.length),
  getPosition = (e) => (isTouchEvent(e) ? e.touches[0] : e);
var lib = {},
  uaParser_min = { exports: {} },
  uaParser_minExports =
    (uaParser_min.exports,
    !(function (L, j) {
      function e(e) {
        for (var t = {}, n = 0; n < e.length; n++) t[e[n].toUpperCase()] = e[n];
        return t;
      }
      function A(e, t) {
        return typeof e === g && -1 !== D(t).indexOf(D(e));
      }
      function s(e, t) {
        if (typeof e === g)
          return (
            (e = e.replace(/^\s\s*/, p)),
            typeof t == h ? e : e.substring(0, 350)
          );
      }
      function l(e, t) {
        for (var n, r, o, i, a, s = 0; s < t.length && !i; ) {
          for (
            var l = t[s], c = t[s + 1], u = (n = 0);
            u < l.length && !i && l[u];

          )
            if ((i = l[u++].exec(e)))
              for (r = 0; r < c.length; r++)
                (a = i[++n]),
                  typeof (o = c[r]) === m && 0 < o.length
                    ? 2 === o.length
                      ? typeof o[1] == f
                        ? (this[o[0]] = o[1].call(this, a))
                        : (this[o[0]] = o[1])
                      : 3 === o.length
                      ? typeof o[1] !== f || (o[1].exec && o[1].test)
                        ? (this[o[0]] = a ? a.replace(o[1], o[2]) : d)
                        : (this[o[0]] = a ? o[1].call(this, a, o[2]) : d)
                      : 4 === o.length &&
                        (this[o[0]] = a
                          ? o[3].call(this, a.replace(o[1], o[2]))
                          : d)
                    : (this[o] = a || d);
          s += 2;
        }
      }
      function t(e, t) {
        for (var n in t)
          if (typeof t[n] === m && 0 < t[n].length) {
            for (var r = 0; r < t[n].length; r++)
              if (A(t[n][r], e)) return '?' === n ? d : n;
          } else if (A(t[n], e)) return '?' === n ? d : n;
        return e;
      }
      function c(e, t) {
        var n, r, o, i, a;
        return (
          typeof e === m && ((t = e), (e = d)),
          this instanceof c
            ? ((n = typeof u != h && u.navigator ? u.navigator : d),
              (r = e || (n && n.userAgent ? n.userAgent : p)),
              (o = n && n.userAgentData ? n.userAgentData : d),
              (i = t
                ? (function (e, t) {
                    var n,
                      r = {};
                    for (n in e)
                      t[n] && t[n].length % 2 == 0
                        ? (r[n] = t[n].concat(e[n]))
                        : (r[n] = e[n]);
                    return r;
                  })(P, t)
                : P),
              (a = n && n.userAgent == r),
              (this.getBrowser = function () {
                var e,
                  t = {};
                return (
                  (t[y] = d),
                  (t[x] = d),
                  l.call(t, r, i.browser),
                  (t.major =
                    typeof (e = t[x]) === g
                      ? e.replace(/[^\d\.]/g, p).split('.')[0]
                      : d),
                  a &&
                    n &&
                    n.brave &&
                    typeof n.brave.isBrave == f &&
                    (t[y] = 'Brave'),
                  t
                );
              }),
              (this.getCPU = function () {
                var e = {};
                return (e[S] = d), l.call(e, r, i.cpu), e;
              }),
              (this.getDevice = function () {
                var e = {};
                return (
                  (e[w] = d),
                  (e[v] = d),
                  (e[b] = d),
                  l.call(e, r, i.device),
                  a && !e[b] && o && o.mobile && (e[b] = k),
                  a &&
                    'Macintosh' == e[v] &&
                    n &&
                    typeof n.standalone != h &&
                    n.maxTouchPoints &&
                    2 < n.maxTouchPoints &&
                    ((e[v] = 'iPad'), (e[b] = C)),
                  e
                );
              }),
              (this.getEngine = function () {
                var e = {};
                return (e[y] = d), (e[x] = d), l.call(e, r, i.engine), e;
              }),
              (this.getOS = function () {
                var e = {};
                return (
                  (e[y] = d),
                  (e[x] = d),
                  l.call(e, r, i.os),
                  a &&
                    !e[y] &&
                    o &&
                    'Unknown' != o.platform &&
                    (e[y] = o.platform
                      .replace(/chrome os/i, $)
                      .replace(/macos/i, 'Mac OS')),
                  e
                );
              }),
              (this.getResult = function () {
                return {
                  ua: this.getUA(),
                  browser: this.getBrowser(),
                  engine: this.getEngine(),
                  os: this.getOS(),
                  device: this.getDevice(),
                  cpu: this.getCPU(),
                };
              }),
              (this.getUA = function () {
                return r;
              }),
              (this.setUA = function (e) {
                return (
                  (r = typeof e === g && 350 < e.length ? s(e, 350) : e), this
                );
              }),
              this.setUA(r),
              this)
            : new c(e, t).getResult()
        );
      }
      var u,
        d,
        r,
        p,
        f,
        h,
        m,
        g,
        v,
        y,
        b,
        w,
        x,
        S,
        k,
        C,
        n,
        o,
        i,
        F,
        a,
        E,
        T,
        _,
        R,
        O,
        I,
        M,
        $,
        D,
        N,
        P,
        z;
      (u = 'object' == typeof window ? window : commonjsGlobal),
        (f = 'function'),
        (h = 'undefined'),
        (m = 'object'),
        (g = 'string'),
        (P = {
          browser: [
            [/\b(?:crmo|crios)\/([\w\.]+)/i],
            [(x = 'version'), [(y = 'name'), (a = 'Chrome')]],
            [/edg(?:e|ios|a)?\/([\w\.]+)/i],
            [x, [y, 'Edge']],
            [
              /(opera mini)\/([-\w\.]+)/i,
              /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
              /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i,
            ],
            [y, x],
            [/opios[\/ ]+([\w\.]+)/i],
            [x, [y, (M = 'Opera') + ' Mini']],
            [/\bopr\/([\w\.]+)/i],
            [x, [y, M]],
            [
              /(kindle)\/([\w\.]+)/i,
              /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
              /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
              /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
              /(?:ms|\()(ie) ([\w\.]+)/i,
              /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
              /(heytap|ovi)browser\/([\d\.]+)/i,
              /(weibo)__([\d\.]+)/i,
            ],
            [y, x],
            [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
            [x, [y, 'UC' + (_ = 'Browser')]],
            [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i],
            [x, [y, 'WeChat(Win) Desktop']],
            [/micromessenger\/([\w\.]+)/i],
            [x, [y, 'WeChat']],
            [/konqueror\/([\w\.]+)/i],
            [x, [y, 'Konqueror']],
            [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
            [x, [y, 'IE']],
            [/ya(?:search)?browser\/([\w\.]+)/i],
            [x, [y, 'Yandex']],
            [/(avast|avg)\/([\w\.]+)/i],
            [[y, /(.+)/, '$1 Secure ' + _], x],
            [/\bfocus\/([\w\.]+)/i],
            [x, [y, (E = 'Firefox') + ' Focus']],
            [/\bopt\/([\w\.]+)/i],
            [x, [y, M + ' Touch']],
            [/coc_coc\w+\/([\w\.]+)/i],
            [x, [y, 'Coc Coc']],
            [/dolfin\/([\w\.]+)/i],
            [x, [y, 'Dolphin']],
            [/coast\/([\w\.]+)/i],
            [x, [y, M + ' Coast']],
            [/miuibrowser\/([\w\.]+)/i],
            [x, [y, 'MIUI ' + _]],
            [/fxios\/([-\w\.]+)/i],
            [x, [y, E]],
            [/\bqihu|(qi?ho?o?|360)browser/i],
            [[y, '360 ' + _]],
            [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
            [[y, /(.+)/, '$1 ' + _], x],
            [/(comodo_dragon)\/([\w\.]+)/i],
            [[y, /_/g, ' '], x],
            [
              /(electron)\/([\w\.]+) safari/i,
              /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
              /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i,
            ],
            [y, x],
            [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i],
            [y],
            [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
            [[y, (M = 'Facebook')], x],
            [
              /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
              /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
              /safari (line)\/([\w\.]+)/i,
              /\b(line)\/([\w\.]+)\/iab/i,
              /(chromium|instagram)[\/ ]([-\w\.]+)/i,
            ],
            [y, x],
            [/\bgsa\/([\w\.]+) .*safari\//i],
            [x, [y, 'GSA']],
            [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
            [x, [y, 'TikTok']],
            [/headlesschrome(?:\/([\w\.]+)| )/i],
            [x, [y, a + ' Headless']],
            [/ wv\).+(chrome)\/([\w\.]+)/i],
            [[y, a + ' WebView'], x],
            [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
            [x, [y, 'Android ' + _]],
            [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
            [y, x],
            [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
            [x, [y, 'Mobile Safari']],
            [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
            [x, y],
            [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
            [
              y,
              [
                x,
                t,
                {
                  '1.0': '/8',
                  1.2: '/1',
                  1.3: '/3',
                  '2.0': '/412',
                  '2.0.2': '/416',
                  '2.0.3': '/417',
                  '2.0.4': '/419',
                  '?': '/',
                },
              ],
            ],
            [/(webkit|khtml)\/([\w\.]+)/i],
            [y, x],
            [/(navigator|netscape\d?)\/([-\w\.]+)/i],
            [[y, 'Netscape'], x],
            [/mobile vr; rv:([\w\.]+)\).+firefox/i],
            [x, [y, E + ' Reality']],
            [
              /ekiohf.+(flow)\/([\w\.]+)/i,
              /(swiftfox)/i,
              /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
              /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
              /(firefox)\/([\w\.]+)/i,
              /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
              /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
              /(links) \(([\w\.]+)/i,
              /panasonic;(viera)/i,
            ],
            [y, x],
            [/(cobalt)\/([\w\.]+)/i],
            [y, [x, /master.|lts./, (p = '')]],
          ],
          cpu: [
            [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
            [[(S = 'architecture'), 'amd64']],
            [/(ia32(?=;))/i],
            [
              [
                S,
                (D = function (e) {
                  return e.toLowerCase();
                }),
              ],
            ],
            [/((?:i[346]|x)86)[;\)]/i],
            [[S, 'ia32']],
            [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
            [[S, 'arm64']],
            [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
            [[S, 'armhf']],
            [/windows (ce|mobile); ppc;/i],
            [[S, 'arm']],
            [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
            [[S, /ower/, p, D]],
            [/(sun4\w)[;\)]/i],
            [[S, 'sparc']],
            [
              /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i,
            ],
            [[S, D]],
          ],
          device: [
            [
              /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
            ],
            [
              (v = 'model'),
              [(w = 'vendor'), (_ = 'Samsung')],
              [(b = 'type'), (C = 'tablet')],
            ],
            [
              /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
              /samsung[- ]([-\w]+)/i,
              /sec-(sgh\w+)/i,
            ],
            [v, [w, _], [b, (k = 'mobile')]],
            [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
            [v, [w, (i = 'Apple')], [b, k]],
            [
              /\((ipad);[-\w\),; ]+apple/i,
              /applecoremedia\/[\w\.]+ \((ipad)/i,
              /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
            ],
            [v, [w, i], [b, C]],
            [/(macintosh);/i],
            [v, [w, i]],
            [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
            [v, [w, 'Sharp'], [b, k]],
            [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
            [v, [w, 'Huawei'], [b, C]],
            [
              /(?:huawei|honor)([-\w ]+)[;\)]/i,
              /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i,
            ],
            [v, [w, 'Huawei'], [b, k]],
            [
              /\b(poco[\w ]+)(?: bui|\))/i,
              /\b; (\w+) build\/hm\1/i,
              /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
              /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
              /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i,
            ],
            [
              [v, /_/g, ' '],
              [w, (O = 'Xiaomi')],
              [b, k],
            ],
            [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
            [
              [v, /_/g, ' '],
              [w, O],
              [b, C],
            ],
            [
              /; (\w+) bui.+ oppo/i,
              /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
            ],
            [v, [w, 'OPPO'], [b, k]],
            [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
            [v, [w, 'Vivo'], [b, k]],
            [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
            [v, [w, 'Realme'], [b, k]],
            [
              /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
              /\bmot(?:orola)?[- ](\w*)/i,
              /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
            ],
            [v, [w, (T = 'Motorola')], [b, k]],
            [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
            [v, [w, T], [b, C]],
            [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
            [v, [w, 'LG'], [b, C]],
            [
              /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
              /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
              /\blg-?([\d\w]+) bui/i,
            ],
            [v, [w, 'LG'], [b, k]],
            [
              /(ideatab[-\w ]+)/i,
              /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
            ],
            [v, [w, 'Lenovo'], [b, C]],
            [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
            [
              [v, /_/g, ' '],
              [w, 'Nokia'],
              [b, k],
            ],
            [/(pixel c)\b/i],
            [v, [w, (T = 'Google')], [b, C]],
            [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
            [v, [w, T], [b, k]],
            [
              /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
            ],
            [v, [w, (R = 'Sony')], [b, k]],
            [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
            [
              [v, 'Xperia Tablet'],
              [w, R],
              [b, C],
            ],
            [
              / (kb2005|in20[12]5|be20[12][59])\b/i,
              /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
            ],
            [v, [w, 'OnePlus'], [b, k]],
            [
              /(alexa)webm/i,
              /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
              /(kf[a-z]+)( bui|\)).+silk\//i,
            ],
            [v, [w, (o = 'Amazon')], [b, C]],
            [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
            [
              [v, /(.+)/g, 'Fire Phone $1'],
              [w, o],
              [b, k],
            ],
            [/(playbook);[-\w\),; ]+(rim)/i],
            [v, w, [b, C]],
            [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
            [v, [w, (F = 'BlackBerry')], [b, k]],
            [
              /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
            ],
            [v, [w, 'ASUS'], [b, C]],
            [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
            [v, [w, 'ASUS'], [b, k]],
            [/(nexus 9)/i],
            [v, [w, 'HTC'], [b, C]],
            [
              /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
              /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
              /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i,
            ],
            [w, [v, /_/g, ' '], [b, k]],
            [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
            [v, [w, 'Acer'], [b, C]],
            [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
            [v, [w, 'Meizu'], [b, k]],
            [
              /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
              /(hp) ([\w ]+\w)/i,
              /(asus)-?(\w+)/i,
              /(microsoft); (lumia[\w ]+)/i,
              /(lenovo)[-_ ]?([-\w]+)/i,
              /(jolla)/i,
              /(oppo) ?([\w ]+) bui/i,
            ],
            [w, v, [b, k]],
            [
              /(kobo)\s(ereader|touch)/i,
              /(archos) (gamepad2?)/i,
              /(hp).+(touchpad(?!.+tablet)|tablet)/i,
              /(kindle)\/([\w\.]+)/i,
              /(nook)[\w ]+build\/(\w+)/i,
              /(dell) (strea[kpr\d ]*[\dko])/i,
              /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
              /(trinity)[- ]*(t\d{3}) bui/i,
              /(gigaset)[- ]+(q\w{1,9}) bui/i,
              /(vodafone) ([\w ]+)(?:\)| bui)/i,
            ],
            [w, v, [b, C]],
            [/(surface duo)/i],
            [v, [w, (N = 'Microsoft')], [b, C]],
            [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
            [v, [w, 'Fairphone'], [b, k]],
            [/(u304aa)/i],
            [v, [w, 'AT&T'], [b, k]],
            [/\bsie-(\w*)/i],
            [v, [w, 'Siemens'], [b, k]],
            [/\b(rct\w+) b/i],
            [v, [w, 'RCA'], [b, C]],
            [/\b(venue[\d ]{2,7}) b/i],
            [v, [w, 'Dell'], [b, C]],
            [/\b(q(?:mv|ta)\w+) b/i],
            [v, [w, 'Verizon'], [b, C]],
            [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
            [v, [w, 'Barnes & Noble'], [b, C]],
            [/\b(tm\d{3}\w+) b/i],
            [v, [w, 'NuVision'], [b, C]],
            [/\b(k88) b/i],
            [v, [w, 'ZTE'], [b, C]],
            [/\b(nx\d{3}j) b/i],
            [v, [w, 'ZTE'], [b, k]],
            [/\b(gen\d{3}) b.+49h/i],
            [v, [w, 'Swiss'], [b, k]],
            [/\b(zur\d{3}) b/i],
            [v, [w, 'Swiss'], [b, C]],
            [/\b((zeki)?tb.*\b) b/i],
            [v, [w, 'Zeki'], [b, C]],
            [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
            [[w, 'Dragon Touch'], v, [b, C]],
            [/\b(ns-?\w{0,9}) b/i],
            [v, [w, 'Insignia'], [b, C]],
            [/\b((nxa|next)-?\w{0,9}) b/i],
            [v, [w, 'NextBook'], [b, C]],
            [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
            [[w, 'Voice'], v, [b, k]],
            [/\b(lvtel\-)?(v1[12]) b/i],
            [[w, 'LvTel'], v, [b, k]],
            [/\b(ph-1) /i],
            [v, [w, 'Essential'], [b, k]],
            [/\b(v(100md|700na|7011|917g).*\b) b/i],
            [v, [w, 'Envizen'], [b, C]],
            [/\b(trio[-\w\. ]+) b/i],
            [v, [w, 'MachSpeed'], [b, C]],
            [/\btu_(1491) b/i],
            [v, [w, 'Rotor'], [b, C]],
            [/(shield[\w ]+) b/i],
            [v, [w, 'Nvidia'], [b, C]],
            [/(sprint) (\w+)/i],
            [w, v, [b, k]],
            [/(kin\.[onetw]{3})/i],
            [
              [v, /\./g, ' '],
              [w, N],
              [b, k],
            ],
            [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
            [v, [w, (I = 'Zebra')], [b, C]],
            [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
            [v, [w, I], [b, k]],
            [/smart-tv.+(samsung)/i],
            [w, [b, (n = 'smarttv')]],
            [/hbbtv.+maple;(\d+)/i],
            [
              [v, /^/, 'SmartTV'],
              [w, _],
              [b, n],
            ],
            [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
            [
              [w, 'LG'],
              [b, n],
            ],
            [/(apple) ?tv/i],
            [w, [v, i + ' TV'], [b, n]],
            [/crkey/i],
            [
              [v, a + 'cast'],
              [w, T],
              [b, n],
            ],
            [/droid.+aft(\w)( bui|\))/i],
            [v, [w, o], [b, n]],
            [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
            [v, [w, 'Sharp'], [b, n]],
            [/(bravia[\w ]+)( bui|\))/i],
            [v, [w, R], [b, n]],
            [/(mitv-\w{5}) bui/i],
            [v, [w, O], [b, n]],
            [/Hbbtv.*(technisat) (.*);/i],
            [w, v, [b, n]],
            [
              /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
              /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i,
            ],
            [
              [w, s],
              [v, s],
              [b, n],
            ],
            [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
            [[b, n]],
            [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
            [w, v, [b, (_ = 'console')]],
            [/droid.+; (shield) bui/i],
            [v, [w, 'Nvidia'], [b, _]],
            [/(playstation [345portablevi]+)/i],
            [v, [w, R], [b, _]],
            [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
            [v, [w, N], [b, _]],
            [/((pebble))app/i],
            [w, v, [b, (O = 'wearable')]],
            [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
            [v, [w, i], [b, O]],
            [/droid.+; (glass) \d/i],
            [v, [w, T], [b, O]],
            [/droid.+; (wt63?0{2,3})\)/i],
            [v, [w, I], [b, O]],
            [/(quest( 2| pro)?)/i],
            [v, [w, M], [b, O]],
            [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
            [w, [b, (R = 'embedded')]],
            [/(aeobc)\b/i],
            [v, [w, o], [b, R]],
            [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
            [v, [b, k]],
            [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
            [v, [b, C]],
            [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
            [[b, C]],
            [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
            [[b, k]],
            [/(android[-\w\. ]{0,9});.+buil/i],
            [v, [w, 'Generic']],
          ],
          engine: [
            [/windows.+ edge\/([\w\.]+)/i],
            [x, [y, 'EdgeHTML']],
            [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
            [x, [y, 'Blink']],
            [
              /(presto)\/([\w\.]+)/i,
              /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
              /ekioh(flow)\/([\w\.]+)/i,
              /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
              /(icab)[\/ ]([23]\.[\d\.]+)/i,
              /\b(libweb)/i,
            ],
            [y, x],
            [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
            [x, y],
          ],
          os: [
            [/microsoft (windows) (vista|xp)/i],
            [y, x],
            [
              /(windows) nt 6\.2; (arm)/i,
              /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
              /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
            ],
            [
              y,
              [
                x,
                t,
                (N = {
                  ME: '4.90',
                  'NT 3.11': 'NT3.51',
                  'NT 4.0': 'NT4.0',
                  2e3: 'NT 5.0',
                  XP: ['NT 5.1', 'NT 5.2'],
                  Vista: 'NT 6.0',
                  7: 'NT 6.1',
                  8: 'NT 6.2',
                  8.1: 'NT 6.3',
                  10: ['NT 6.4', 'NT 10.0'],
                  RT: 'ARM',
                }),
              ],
            ],
            [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
            [
              [y, 'Windows'],
              [x, t, N],
            ],
            [
              /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
              /ios;fbsv\/([\d\.]+)/i,
              /cfnetwork\/.+darwin/i,
            ],
            [
              [x, /_/g, '.'],
              [y, 'iOS'],
            ],
            [
              /(mac os x) ?([\w\. ]*)/i,
              /(macintosh|mac_powerpc\b)(?!.+haiku)/i,
            ],
            [
              [y, 'Mac OS'],
              [x, /_/g, '.'],
            ],
            [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
            [x, y],
            [
              /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
              /(blackberry)\w*\/([\w\.]*)/i,
              /(tizen|kaios)[\/ ]([\w\.]+)/i,
              /\((series40);/i,
            ],
            [y, x],
            [/\(bb(10);/i],
            [x, [y, F]],
            [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
            [x, [y, 'Symbian']],
            [
              /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i,
            ],
            [x, [y, E + ' OS']],
            [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
            [x, [y, 'webOS']],
            [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
            [x, [y, 'watchOS']],
            [/crkey\/([\d\.]+)/i],
            [x, [y, a + 'cast']],
            [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
            [[y, ($ = 'Chromium OS')], x],
            [
              /panasonic;(viera)/i,
              /(netrange)mmh/i,
              /(nettv)\/(\d+\.[\w\.]+)/i,
              /(nintendo|playstation) ([wids345portablevuch]+)/i,
              /(xbox); +xbox ([^\);]+)/i,
              /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
              /(mint)[\/\(\) ]?(\w*)/i,
              /(mageia|vectorlinux)[; ]/i,
              /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
              /(hurd|linux) ?([\w\.]*)/i,
              /(gnu) ?([\w\.]*)/i,
              /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
              /(haiku) (\w+)/i,
            ],
            [y, x],
            [/(sunos) ?([\w\.\d]*)/i],
            [[y, 'Solaris'], x],
            [
              /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
              /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
              /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
              /(unix) ?([\w\.]*)/i,
            ],
            [y, x],
          ],
        }),
        (c.VERSION = '1.0.35'),
        (c.BROWSER = e([y, x, 'major'])),
        (c.CPU = e([S])),
        (c.DEVICE = e([v, w, b, _, k, n, C, O, R])),
        (c.ENGINE = c.OS = e([y, x])),
        ((j = L.exports ? (L.exports = c) : j).UAParser = c),
        (z = typeof u != h && (u.jQuery || u.Zepto)) &&
          !z.ua &&
          ((r = new c()),
          (z.ua = r.getResult()),
          (z.ua.get = function () {
            return r.getUA();
          }),
          (z.ua.set = function (e) {
            r.setUA(e);
            var t,
              n = r.getResult();
            for (t in n) z.ua[t] = n[t];
          }));
    })(uaParser_min, uaParser_min.exports),
    uaParser_min.exports);
function _interopDefault(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
Object.defineProperty(lib, '__esModule', { value: !0 });
var React = React__default$1,
  React__default = _interopDefault(React),
  UAParser = uaParser_minExports,
  ClientUAInstance = new UAParser(),
  browser = ClientUAInstance.getBrowser(),
  cpu = ClientUAInstance.getCPU(),
  device = ClientUAInstance.getDevice(),
  engine = ClientUAInstance.getEngine(),
  os$1 = ClientUAInstance.getOS(),
  ua = ClientUAInstance.getUA(),
  setUa = function (e) {
    return ClientUAInstance.setUA(e);
  },
  parseUserAgent = function (e) {
    var t;
    if (e)
      return {
        UA: (t = new UAParser(e)),
        browser: t.getBrowser(),
        cpu: t.getCPU(),
        device: t.getDevice(),
        engine: t.getEngine(),
        os: t.getOS(),
        ua: t.getUA(),
        setUserAgent: function (e) {
          return t.setUA(e);
        },
      };
    console.error('No userAgent string was provided');
  },
  UAHelper = Object.freeze({
    ClientUAInstance: ClientUAInstance,
    browser: browser,
    cpu: cpu,
    device: device,
    engine: engine,
    os: os$1,
    ua: ua,
    setUa: setUa,
    parseUserAgent: parseUserAgent,
  });
function ownKeys(t, e) {
  var n,
    r = Object.keys(t);
  return (
    Object.getOwnPropertySymbols &&
      ((n = Object.getOwnPropertySymbols(t)),
      e &&
        (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
      r.push.apply(r, n)),
    r
  );
}
function _objectSpread2(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = null != arguments[e] ? arguments[e] : {};
    e % 2
      ? ownKeys(Object(n), !0).forEach(function (e) {
          _defineProperty(t, e, n[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
      : ownKeys(Object(n)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
        });
  }
  return t;
}
function _typeof(e) {
  return (_typeof =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        })(e);
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1),
      (r.configurable = !0),
      'value' in r && (r.writable = !0),
      Object.defineProperty(e, r.key, r);
  }
}
function _createClass(e, t, n) {
  return (
    t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e
  );
}
function _defineProperty(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function _extends() {
  return (_extends =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n,
          r = arguments[t];
        for (n in r)
          Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    }).apply(this, arguments);
}
function _inherits(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError('Super expression must either be null or a function');
  (e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    t && _setPrototypeOf(e, t);
}
function _getPrototypeOf(e) {
  return (_getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function (e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
}
function _setPrototypeOf(e, t) {
  return (_setPrototypeOf =
    Object.setPrototypeOf ||
    function (e, t) {
      return (e.__proto__ = t), e;
    })(e, t);
}
function _objectWithoutPropertiesLoose(e, t) {
  if (null == e) return {};
  for (var n, r = {}, o = Object.keys(e), i = 0; i < o.length; i++)
    (n = o[i]), 0 <= t.indexOf(n) || (r[n] = e[n]);
  return r;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var n,
    r = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols)
    for (var o = Object.getOwnPropertySymbols(e), i = 0; i < o.length; i++)
      (n = o[i]),
        0 <= t.indexOf(n) ||
          (Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]));
  return r;
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function _possibleConstructorReturn(e, t) {
  if (t && ('object' == typeof t || 'function' == typeof t)) return t;
  if (void 0 !== t)
    throw new TypeError(
      'Derived constructors may only return object or undefined'
    );
  return _assertThisInitialized(e);
}
function _slicedToArray(e, t) {
  return (
    _arrayWithHoles(e) ||
    _iterableToArrayLimit(e, t) ||
    _unsupportedIterableToArray(e, t) ||
    _nonIterableRest()
  );
}
function _arrayWithHoles(e) {
  if (Array.isArray(e)) return e;
}
function _iterableToArrayLimit(e, t) {
  var n =
    null == e
      ? null
      : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
  if (null != n) {
    var r,
      o,
      i = [],
      a = !0,
      s = !1;
    try {
      for (
        n = n.call(e);
        !(a = (r = n.next()).done) && (i.push(r.value), !t || i.length !== t);
        a = !0
      );
    } catch (e) {
      (s = !0), (o = e);
    } finally {
      try {
        a || null == n.return || n.return();
      } finally {
        if (s) throw o;
      }
    }
    return i;
  }
}
function _unsupportedIterableToArray(e, t) {
  var n;
  if (e)
    return 'string' == typeof e
      ? _arrayLikeToArray(e, t)
      : 'Map' ===
          (n =
            'Object' === (n = Object.prototype.toString.call(e).slice(8, -1)) &&
            e.constructor
              ? e.constructor.name
              : n) || 'Set' === n
      ? Array.from(e)
      : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      ? _arrayLikeToArray(e, t)
      : void 0;
}
function _arrayLikeToArray(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  );
}
var DeviceTypes = {
    Mobile: 'mobile',
    Tablet: 'tablet',
    SmartTv: 'smarttv',
    Console: 'console',
    Wearable: 'wearable',
    Embedded: 'embedded',
    Browser: void 0,
  },
  BrowserTypes = {
    Chrome: 'Chrome',
    Firefox: 'Firefox',
    Opera: 'Opera',
    Yandex: 'Yandex',
    Safari: 'Safari',
    InternetExplorer: 'Internet Explorer',
    Edge: 'Edge',
    Chromium: 'Chromium',
    Ie: 'IE',
    MobileSafari: 'Mobile Safari',
    EdgeChromium: 'Edge Chromium',
    MIUI: 'MIUI Browser',
    SamsungBrowser: 'Samsung Browser',
  },
  OsTypes = {
    IOS: 'iOS',
    Android: 'Android',
    WindowsPhone: 'Windows Phone',
    Windows: 'Windows',
    MAC_OS: 'Mac OS',
  },
  InitialDeviceTypes = {
    isMobile: !1,
    isTablet: !1,
    isBrowser: !1,
    isSmartTV: !1,
    isConsole: !1,
    isWearable: !1,
  },
  checkDeviceType = function (e) {
    switch (e) {
      case DeviceTypes.Mobile:
        return { isMobile: !0 };
      case DeviceTypes.Tablet:
        return { isTablet: !0 };
      case DeviceTypes.SmartTv:
        return { isSmartTV: !0 };
      case DeviceTypes.Console:
        return { isConsole: !0 };
      case DeviceTypes.Wearable:
        return { isWearable: !0 };
      case DeviceTypes.Browser:
        return { isBrowser: !0 };
      case DeviceTypes.Embedded:
        return { isEmbedded: !0 };
      default:
        return InitialDeviceTypes;
    }
  },
  setUserAgent = function (e) {
    return setUa(e);
  },
  setDefaults = function (e) {
    return (
      e ||
      (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'none')
    );
  },
  getNavigatorInstance = function () {
    return (
      !('undefined' == typeof window || (!window.navigator && !navigator)) &&
      (window.navigator || navigator)
    );
  },
  isIOS13Check = function (e) {
    var t = getNavigatorInstance();
    return (
      t &&
      t.platform &&
      (-1 !== t.platform.indexOf(e) ||
        ('MacIntel' === t.platform && 1 < t.maxTouchPoints && !window.MSStream))
    );
  },
  browserPayload = function (e, t, n, r, o) {
    return {
      isBrowser: e,
      browserMajorVersion: setDefaults(t.major),
      browserFullVersion: setDefaults(t.version),
      browserName: setDefaults(t.name),
      engineName: setDefaults(n.name),
      engineVersion: setDefaults(n.version),
      osName: setDefaults(r.name),
      osVersion: setDefaults(r.version),
      userAgent: setDefaults(o),
    };
  },
  mobilePayload = function (e, t, n, r) {
    return _objectSpread2({}, e, {
      vendor: setDefaults(t.vendor),
      model: setDefaults(t.model),
      os: setDefaults(n.name),
      osVersion: setDefaults(n.version),
      ua: setDefaults(r),
    });
  },
  smartTvPayload = function (e, t, n, r) {
    return {
      isSmartTV: e,
      engineName: setDefaults(t.name),
      engineVersion: setDefaults(t.version),
      osName: setDefaults(n.name),
      osVersion: setDefaults(n.version),
      userAgent: setDefaults(r),
    };
  },
  consolePayload = function (e, t, n, r) {
    return {
      isConsole: e,
      engineName: setDefaults(t.name),
      engineVersion: setDefaults(t.version),
      osName: setDefaults(n.name),
      osVersion: setDefaults(n.version),
      userAgent: setDefaults(r),
    };
  },
  wearablePayload = function (e, t, n, r) {
    return {
      isWearable: e,
      engineName: setDefaults(t.name),
      engineVersion: setDefaults(t.version),
      osName: setDefaults(n.name),
      osVersion: setDefaults(n.version),
      userAgent: setDefaults(r),
    };
  },
  embeddedPayload = function (e, t, n, r, o) {
    return {
      isEmbedded: e,
      vendor: setDefaults(t.vendor),
      model: setDefaults(t.model),
      engineName: setDefaults(n.name),
      engineVersion: setDefaults(n.version),
      osName: setDefaults(r.name),
      osVersion: setDefaults(r.version),
      userAgent: setDefaults(o),
    };
  };
function deviceDetect(e) {
  var e = e ? parseUserAgent(e) : UAHelper,
    t = e.device,
    n = e.browser,
    r = e.engine,
    o = e.os,
    e = e.ua,
    i = checkDeviceType(t.type),
    a = i.isBrowser,
    s = i.isMobile,
    l = i.isTablet,
    c = i.isSmartTV,
    u = i.isConsole,
    d = i.isWearable,
    p = i.isEmbedded;
  return a
    ? browserPayload(a, n, r, o, e)
    : c
    ? smartTvPayload(c, r, o, e)
    : u
    ? consolePayload(u, r, o, e)
    : s || l
    ? mobilePayload(i, t, o, e)
    : d
    ? wearablePayload(d, r, o, e)
    : p
    ? embeddedPayload(p, t, r, o, e)
    : void 0;
}
var isMobileType = function (e) {
    return e.type === DeviceTypes.Mobile;
  },
  isTabletType = function (e) {
    return e.type === DeviceTypes.Tablet;
  },
  isMobileAndTabletType = function (e) {
    e = e.type;
    return e === DeviceTypes.Mobile || e === DeviceTypes.Tablet;
  },
  isSmartTVType = function (e) {
    return e.type === DeviceTypes.SmartTv;
  },
  isBrowserType = function (e) {
    return e.type === DeviceTypes.Browser;
  },
  isWearableType = function (e) {
    return e.type === DeviceTypes.Wearable;
  },
  isConsoleType = function (e) {
    return e.type === DeviceTypes.Console;
  },
  isEmbeddedType = function (e) {
    return e.type === DeviceTypes.Embedded;
  },
  getMobileVendor = function (e) {
    e = e.vendor;
    return setDefaults(e);
  },
  getMobileModel = function (e) {
    e = e.model;
    return setDefaults(e);
  },
  getDeviceType = function (e) {
    e = e.type;
    return setDefaults(e, 'browser');
  },
  isAndroidType = function (e) {
    return e.name === OsTypes.Android;
  },
  isWindowsType = function (e) {
    return e.name === OsTypes.Windows;
  },
  isMacOsType = function (e) {
    return e.name === OsTypes.MAC_OS;
  },
  isWinPhoneType = function (e) {
    return e.name === OsTypes.WindowsPhone;
  },
  isIOSType = function (e) {
    return e.name === OsTypes.IOS;
  },
  getOsVersion = function (e) {
    e = e.version;
    return setDefaults(e);
  },
  getOsName = function (e) {
    e = e.name;
    return setDefaults(e);
  },
  isChromeType = function (e) {
    return e.name === BrowserTypes.Chrome;
  },
  isFirefoxType = function (e) {
    return e.name === BrowserTypes.Firefox;
  },
  isChromiumType = function (e) {
    return e.name === BrowserTypes.Chromium;
  },
  isEdgeType = function (e) {
    return e.name === BrowserTypes.Edge;
  },
  isYandexType = function (e) {
    return e.name === BrowserTypes.Yandex;
  },
  isSafariType = function (e) {
    e = e.name;
    return e === BrowserTypes.Safari || e === BrowserTypes.MobileSafari;
  },
  isMobileSafariType = function (e) {
    return e.name === BrowserTypes.MobileSafari;
  },
  isOperaType = function (e) {
    return e.name === BrowserTypes.Opera;
  },
  isIEType = function (e) {
    e = e.name;
    return e === BrowserTypes.InternetExplorer || e === BrowserTypes.Ie;
  },
  isMIUIType = function (e) {
    return e.name === BrowserTypes.MIUI;
  },
  isSamsungBrowserType = function (e) {
    return e.name === BrowserTypes.SamsungBrowser;
  },
  getBrowserFullVersion = function (e) {
    e = e.version;
    return setDefaults(e);
  },
  getBrowserVersion = function (e) {
    e = e.major;
    return setDefaults(e);
  },
  getBrowserName = function (e) {
    e = e.name;
    return setDefaults(e);
  },
  getEngineName = function (e) {
    e = e.name;
    return setDefaults(e);
  },
  getEngineVersion = function (e) {
    e = e.version;
    return setDefaults(e);
  },
  isElectronType = function () {
    var e = getNavigatorInstance(),
      e = e && e.userAgent && e.userAgent.toLowerCase();
    return 'string' == typeof e && /electron/.test(e);
  },
  isEdgeChromiumType = function (e) {
    return 'string' == typeof e && -1 !== e.indexOf('Edg/');
  },
  getIOS13 = function () {
    var e = getNavigatorInstance();
    return (
      e &&
      (/iPad|iPhone|iPod/.test(e.platform) ||
        ('MacIntel' === e.platform && 1 < e.maxTouchPoints)) &&
      !window.MSStream
    );
  },
  getIPad13 = function () {
    return isIOS13Check('iPad');
  },
  getIphone13 = function () {
    return isIOS13Check('iPhone');
  },
  getIPod13 = function () {
    return isIOS13Check('iPod');
  },
  getUseragent = function (e) {
    return setDefaults(e);
  };
function buildSelectorsObject(e) {
  var e = e || UAHelper,
    t = e.device,
    n = e.browser,
    r = e.os,
    o = e.engine,
    e = e.ua;
  return {
    isSmartTV: isSmartTVType(t),
    isConsole: isConsoleType(t),
    isWearable: isWearableType(t),
    isEmbedded: isEmbeddedType(t),
    isMobileSafari: isMobileSafariType(n) || getIPad13(),
    isChromium: isChromiumType(n),
    isMobile: isMobileAndTabletType(t) || getIPad13(),
    isMobileOnly: isMobileType(t),
    isTablet: isTabletType(t) || getIPad13(),
    isBrowser: isBrowserType(t),
    isDesktop: isBrowserType(t),
    isAndroid: isAndroidType(r),
    isWinPhone: isWinPhoneType(r),
    isIOS: isIOSType(r) || getIPad13(),
    isChrome: isChromeType(n),
    isFirefox: isFirefoxType(n),
    isSafari: isSafariType(n),
    isOpera: isOperaType(n),
    isIE: isIEType(n),
    osVersion: getOsVersion(r),
    osName: getOsName(r),
    fullBrowserVersion: getBrowserFullVersion(n),
    browserVersion: getBrowserVersion(n),
    browserName: getBrowserName(n),
    mobileVendor: getMobileVendor(t),
    mobileModel: getMobileModel(t),
    engineName: getEngineName(o),
    engineVersion: getEngineVersion(o),
    getUA: getUseragent(e),
    isEdge: isEdgeType(n) || isEdgeChromiumType(e),
    isYandex: isYandexType(n),
    deviceType: getDeviceType(t),
    isIOS13: getIOS13(),
    isIPad13: getIPad13(),
    isIPhone13: getIphone13(),
    isIPod13: getIPod13(),
    isElectron: isElectronType(),
    isEdgeChromium: isEdgeChromiumType(e),
    isLegacyEdge: isEdgeType(n) && !isEdgeChromiumType(e),
    isWindows: isWindowsType(r),
    isMacOs: isMacOsType(r),
    isMIUI: isMIUIType(n),
    isSamsungBrowser: isSamsungBrowserType(n),
  };
}
var isSmartTV = isSmartTVType(device),
  isConsole = isConsoleType(device),
  isWearable = isWearableType(device),
  isEmbedded = isEmbeddedType(device),
  isMobileSafari = isMobileSafariType(browser) || getIPad13(),
  isChromium = isChromiumType(browser),
  isMobile = isMobileAndTabletType(device) || getIPad13(),
  isMobileOnly = isMobileType(device),
  isTablet = isTabletType(device) || getIPad13(),
  isBrowser$1 = isBrowserType(device),
  isDesktop = isBrowserType(device),
  isAndroid = isAndroidType(os$1),
  isWinPhone = isWinPhoneType(os$1),
  isIOS = isIOSType(os$1) || getIPad13(),
  isChrome = isChromeType(browser),
  isFirefox = isFirefoxType(browser),
  isSafari = isSafariType(browser),
  isOpera = isOperaType(browser),
  isIE = isIEType(browser),
  osVersion = getOsVersion(os$1),
  osName = getOsName(os$1),
  fullBrowserVersion = getBrowserFullVersion(browser),
  browserVersion = getBrowserVersion(browser),
  browserName = getBrowserName(browser),
  mobileVendor = getMobileVendor(device),
  mobileModel = getMobileModel(device),
  engineName = getEngineName(engine),
  engineVersion = getEngineVersion(engine),
  getUA = getUseragent(ua),
  isEdge = isEdgeType(browser) || isEdgeChromiumType(ua),
  isYandex = isYandexType(browser),
  deviceType = getDeviceType(device),
  isIOS13 = getIOS13(),
  isIPad13 = getIPad13(),
  isIPhone13 = getIphone13(),
  isIPod13 = getIPod13(),
  isElectron = isElectronType(),
  isEdgeChromium = isEdgeChromiumType(ua),
  isLegacyEdge = isEdgeType(browser) && !isEdgeChromiumType(ua),
  isWindows = isWindowsType(os$1),
  isMacOs = isMacOsType(os$1),
  isMIUI = isMIUIType(browser),
  isSamsungBrowser = isSamsungBrowserType(browser),
  getSelectorsByUserAgent = function (e) {
    if (e && 'string' == typeof e)
      return buildSelectorsObject({
        device: (e = parseUserAgent(e)).device,
        browser: e.browser,
        os: e.os,
        engine: e.engine,
        ua: e.ua,
      });
    console.error('No valid user agent string was provided');
  },
  AndroidView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isAndroid
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  BrowserView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isBrowser$1
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  IEView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isIE
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  IOSView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isIOS
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  MobileView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isMobile
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  TabletView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isTablet
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  WinPhoneView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isWinPhone
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  MobileOnlyView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e =
        (e.viewClassName,
        e.style,
        _objectWithoutProperties(e, [
          'renderWithFragment',
          'children',
          'viewClassName',
          'style',
        ]));
    return isMobileOnly
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  SmartTVView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isSmartTV
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  ConsoleView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isConsole
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  WearableView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      e = _objectWithoutProperties(e, ['renderWithFragment', 'children']);
    return isWearable
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  },
  CustomView = function (e) {
    var t = e.renderWithFragment,
      n = e.children,
      r = (e.viewClassName, e.style, e.condition),
      e = _objectWithoutProperties(e, [
        'renderWithFragment',
        'children',
        'viewClassName',
        'style',
        'condition',
      ]);
    return r
      ? t
        ? React__default.createElement(React.Fragment, null, n)
        : React__default.createElement('div', e, n)
      : null;
  };
function withOrientationChange(e) {
  return (function () {
    function t(e) {
      return (
        _classCallCheck(this, t),
        ((e = _possibleConstructorReturn(
          this,
          _getPrototypeOf(t).call(this, e)
        )).isEventListenerAdded = !1),
        (e.handleOrientationChange = e.handleOrientationChange.bind(
          _assertThisInitialized(e)
        )),
        (e.onOrientationChange = e.onOrientationChange.bind(
          _assertThisInitialized(e)
        )),
        (e.onPageLoad = e.onPageLoad.bind(_assertThisInitialized(e))),
        (e.state = { isLandscape: !1, isPortrait: !1 }),
        e
      );
    }
    return (
      _inherits(t, React__default.Component),
      _createClass(t, [
        {
          key: 'handleOrientationChange',
          value: function () {
            this.isEventListenerAdded || (this.isEventListenerAdded = !0);
            var e = window.innerWidth > window.innerHeight ? 90 : 0;
            this.setState({ isPortrait: 0 == e, isLandscape: 90 == e });
          },
        },
        {
          key: 'onOrientationChange',
          value: function () {
            this.handleOrientationChange();
          },
        },
        {
          key: 'onPageLoad',
          value: function () {
            this.handleOrientationChange();
          },
        },
        {
          key: 'componentDidMount',
          value: function () {
            void 0 !==
              ('undefined' == typeof window ? 'undefined' : _typeof(window)) &&
              isMobile &&
              (this.isEventListenerAdded
                ? window.removeEventListener('load', this.onPageLoad, !1)
                : (this.handleOrientationChange(),
                  window.addEventListener('load', this.onPageLoad, !1)),
              window.addEventListener('resize', this.onOrientationChange, !1));
          },
        },
        {
          key: 'componentWillUnmount',
          value: function () {
            window.removeEventListener('resize', this.onOrientationChange, !1);
          },
        },
        {
          key: 'render',
          value: function () {
            return React__default.createElement(
              e,
              _extends({}, this.props, {
                isLandscape: this.state.isLandscape,
                isPortrait: this.state.isPortrait,
              })
            );
          },
        },
      ]),
      t
    );
  })();
}
function useMobileOrientation() {
  var e = _slicedToArray(
      React.useState(function () {
        var e = window.innerWidth > window.innerHeight ? 90 : 0;
        return {
          isPortrait: 0 == e,
          isLandscape: 90 == e,
          orientation: 0 == e ? 'portrait' : 'landscape',
        };
      }),
      2
    ),
    t = e[0],
    n = e[1],
    r = React.useCallback(
      function () {
        var e = window.innerWidth > window.innerHeight ? 90 : 0,
          e = {
            isPortrait: 0 == e,
            isLandscape: 90 == e,
            orientation: 0 == e ? 'portrait' : 'landscape',
          };
        t.orientation !== e.orientation && n(e);
      },
      [t.orientation]
    );
  return (
    React.useEffect(
      function () {
        return (
          void 0 !==
            ('undefined' == typeof window ? 'undefined' : _typeof(window)) &&
            isMobile &&
            (r(),
            window.addEventListener('load', r, !1),
            window.addEventListener('resize', r, !1)),
          function () {
            window.removeEventListener('resize', r, !1),
              window.removeEventListener('load', r, !1);
          }
        );
      },
      [r]
    ),
    t
  );
}
function useDeviceData(e) {
  e = e || window.navigator.userAgent;
  return parseUserAgent(e);
}
function useDeviceSelectors(e) {
  e = useDeviceData(e || window.navigator.userAgent);
  return [buildSelectorsObject(e), e];
}
(lib.AndroidView = AndroidView),
  (lib.BrowserTypes = BrowserTypes),
  (lib.BrowserView = BrowserView),
  (lib.ConsoleView = ConsoleView),
  (lib.CustomView = CustomView),
  (lib.IEView = IEView),
  (lib.IOSView = IOSView),
  (lib.MobileOnlyView = MobileOnlyView),
  (lib.MobileView = MobileView),
  (lib.OsTypes = OsTypes),
  (lib.SmartTVView = SmartTVView),
  (lib.TabletView = TabletView),
  (lib.WearableView = WearableView),
  (lib.WinPhoneView = WinPhoneView),
  (lib.browserName = browserName),
  (lib.browserVersion = browserVersion),
  (lib.deviceDetect = deviceDetect),
  (lib.deviceType = deviceType),
  (lib.engineName = engineName),
  (lib.engineVersion = engineVersion),
  (lib.fullBrowserVersion = fullBrowserVersion),
  (lib.getSelectorsByUserAgent = getSelectorsByUserAgent),
  (lib.getUA = getUA),
  (lib.isAndroid = isAndroid),
  (lib.isBrowser = isBrowser$1),
  (lib.isChrome = isChrome),
  (lib.isChromium = isChromium),
  (lib.isConsole = isConsole),
  (lib.isDesktop = isDesktop),
  (lib.isEdge = isEdge),
  (lib.isEdgeChromium = isEdgeChromium),
  (lib.isElectron = isElectron),
  (lib.isEmbedded = isEmbedded),
  (lib.isFirefox = isFirefox),
  (lib.isIE = isIE),
  (lib.isIOS = isIOS),
  (lib.isIOS13 = isIOS13),
  (lib.isIPad13 = isIPad13),
  (lib.isIPhone13 = isIPhone13),
  (lib.isIPod13 = isIPod13),
  (lib.isLegacyEdge = isLegacyEdge),
  (lib.isMIUI = isMIUI);
var isMacOs_1 = (lib.isMacOs = isMacOs),
  isMobile_1 = (lib.isMobile = isMobile);
(lib.isMobileOnly = isMobileOnly),
  (lib.isMobileSafari = isMobileSafari),
  (lib.isOpera = isOpera),
  (lib.isSafari = isSafari),
  (lib.isSamsungBrowser = isSamsungBrowser),
  (lib.isSmartTV = isSmartTV),
  (lib.isTablet = isTablet),
  (lib.isWearable = isWearable),
  (lib.isWinPhone = isWinPhone),
  (lib.isWindows = isWindows),
  (lib.isYandex = isYandex),
  (lib.mobileModel = mobileModel),
  (lib.mobileVendor = mobileVendor),
  (lib.osName = osName),
  (lib.osVersion = osVersion),
  (lib.parseUserAgent = parseUserAgent),
  (lib.setUserAgent = setUserAgent),
  (lib.useDeviceData = useDeviceData),
  (lib.useDeviceSelectors = useDeviceSelectors),
  (lib.useMobileOrientation = useMobileOrientation),
  (lib.withOrientationChange = withOrientationChange);
const normalizeKeyName$1 = (e) => {
    var t = e.split(/-(?!$)/);
    let n = t[t.length - 1];
    'Space' == n && (n = ' ');
    let r, o, i, a;
    for (let e = 0; e < t.length - 1; e++) {
      var s = t[e];
      if (/^(cmd|meta|m)$/i.test(s)) a = !0;
      else if (/^a(lt)?$/i.test(s)) r = !0;
      else if (/^(c|ctrl|control)$/i.test(s)) o = !0;
      else if (/^s(hift)?$/i.test(s)) i = !0;
      else {
        if (!/^mod$/i.test(s))
          throw new Error('Unrecognized modifier name: ' + s);
        isMacOs_1 ? (a = !0) : (o = !0);
      }
    }
    return (
      r && (n = 'Alt-' + n),
      o && (n = 'Ctrl-' + n),
      a && (n = 'Meta-' + n),
      (n = i ? 'Shift-' + n : n)
    );
  },
  modifiers$1 = (e, t, n = !0) => (
    t.altKey && (e = 'Alt-' + e),
    t.ctrlKey && (e = 'Ctrl-' + e),
    t.metaKey && (e = 'Meta-' + e),
    (e = n && t.shiftKey ? 'Shift-' + e : e)
  ),
  isValidUrl = (e) => {
    try {
      return new URL(e), !0;
    } catch (e) {
      return !1;
    }
  },
  fetchSvgContent = (o) =>
    new Promise((t, n) => {
      const e = new XMLHttpRequest(),
        r = new FileReader();
      isValidUrl(o)
        ? (e.open('GET', o),
          (e.responseType = 'blob'),
          (e.onload = () => {
            200 === e.status
              ? (r.readAsText(e.response),
                (r.onloadend = () => {
                  var e = new DOMParser().parseFromString(
                    r.result,
                    'text/xml'
                  ).documentElement;
                  t(e);
                }))
              : n('Cannot parse content');
          }),
          (e.onerror = (e) => {
            n(e);
          }),
          e.send())
        : (r.readAsDataURL(b64toBlob(o, 'image/svg+xml')),
          (r.onloadend = () => {
            var e = new DOMParser().parseFromString(
              r.result,
              'text/xml'
            ).documentElement;
            t(e);
          }));
    }),
  b64toBlob = (e, t = '', n = 512) => {
    var r = atob(e),
      o = [];
    for (let e = 0; e < r.length; e += n) {
      var i = r.slice(e, e + n),
        a = new Array(i.length);
      for (let e = 0; e < i.length; e++) a[e] = i.charCodeAt(e);
      var s = new Uint8Array(a);
      o.push(s);
    }
    return new Blob(o, { type: t });
  };
var lodash = { exports: {} },
  lodashExports =
    (lodash.exports,
    !(function (O, I) {
      !function () {
        var Bi,
          Vi = 'Expected a function',
          ya = '__lodash_hash_undefined__',
          ba = '__lodash_placeholder__',
          Hi = 128,
          Wi = 9007199254740991,
          wa = NaN,
          Ui = 4294967295,
          xa = [
            ['ary', Hi],
            ['bind', 1],
            ['bindKey', 2],
            ['curry', 8],
            ['curryRight', 16],
            ['flip', 512],
            ['partial', 32],
            ['partialRight', 64],
            ['rearg', 256],
          ],
          qi = '[object Arguments]',
          Sa = '[object Array]',
          Yi = '[object Boolean]',
          Ki = '[object Date]',
          ka = '[object Error]',
          Ca = '[object Function]',
          Ea = '[object GeneratorFunction]',
          Gi = '[object Map]',
          Zi = '[object Number]',
          Xi = '[object Object]',
          Ta = '[object Promise]',
          Ji = '[object RegExp]',
          Qi = '[object Set]',
          ea = '[object String]',
          _a = '[object Symbol]',
          ta = '[object WeakMap]',
          Ra = '[object ArrayBuffer]',
          na = '[object DataView]',
          Oa = '[object Float32Array]',
          Ia = '[object Float64Array]',
          Ma = '[object Int8Array]',
          Da = '[object Int16Array]',
          Na = '[object Int32Array]',
          Pa = '[object Uint8Array]',
          za = '[object Uint8ClampedArray]',
          La = '[object Uint16Array]',
          ja = '[object Uint32Array]',
          Aa = /\b__p \+= '';/g,
          Fa = /\b(__p \+=) '' \+/g,
          $a = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
          Ba = /&(?:amp|lt|gt|quot|#39);/g,
          Va = /[&<>"']/g,
          Ha = RegExp(Ba.source),
          Wa = RegExp(Va.source),
          Ua = /<%-([\s\S]+?)%>/g,
          qa = /<%([\s\S]+?)%>/g,
          Ya = /<%=([\s\S]+?)%>/g,
          Ka = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
          Ga = /^\w*$/,
          Za =
            /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
          Xa = /[\\^$.*+?()[\]{}|]/g,
          Ja = RegExp(Xa.source),
          Qa = /^\s+/,
          i = /\s/,
          es = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
          ts = /\{\n\/\* \[wrapped with (.+)\] \*/,
          ns = /,? & /,
          rs = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
          os = /[()=,{}\[\]\/\s]/,
          is = /\\(\\)?/g,
          as = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
          ss = /\w*$/,
          ls = /^[-+]0x[0-9a-f]+$/i,
          cs = /^0b[01]+$/i,
          us = /^\[object .+?Constructor\]$/,
          ds = /^0o[0-7]+$/i,
          ps = /^(?:0|[1-9]\d*)$/,
          fs = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
          hs = /($^)/,
          ms = /['\n\r\u2028\u2029\\]/g,
          a = '\\ud800-\\udfff',
          s = '\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff',
          l = '\\u2700-\\u27bf',
          e = 'a-z\\xdf-\\xf6\\xf8-\\xff',
          t = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
          c = '\\ufe0e\\ufe0f',
          u =
            '\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
          d = "['’]",
          n = '[' + a + ']',
          p = '[' + u + ']',
          f = '[' + s + ']',
          h = '[' + l + ']',
          m = '[' + e + ']',
          u = '[^' + a + u + '\\d+' + l + e + t + ']',
          l = '\\ud83c[\\udffb-\\udfff]',
          e = '[^' + a + ']',
          g = '(?:\\ud83c[\\udde6-\\uddff]){2}',
          r = '[\\ud800-\\udbff][\\udc00-\\udfff]',
          t = '[' + t + ']',
          v = '\\u200d',
          y = '(?:' + m + '|' + u + ')',
          u = '(?:' + t + '|' + u + ')',
          b = "(?:['’](?:d|ll|m|re|s|t|ve))?",
          w = "(?:['’](?:D|LL|M|RE|S|T|VE))?",
          x = '(?:' + f + '|' + l + ')' + '?',
          S = '[' + c + ']?',
          S =
            S +
            x +
            ('(?:' + v + '(?:' + [e, g, r].join('|') + ')' + S + x + ')*'),
          x = '(?:' + [h, g, r].join('|') + ')' + S,
          h = '(?:' + [e + f + '?', f, g, r, n].join('|') + ')',
          gs = RegExp(d, 'g'),
          vs = RegExp(f, 'g'),
          k = RegExp(l + '(?=' + l + ')|' + h + S, 'g'),
          ys = RegExp(
            [
              t + '?' + m + '+' + b + '(?=' + [p, t, '$'].join('|') + ')',
              u + '+' + w + '(?=' + [p, t + y, '$'].join('|') + ')',
              t + '?' + y + '+' + b,
              t + '+' + w,
              '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
              '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
              '\\d+',
              x,
            ].join('|'),
            'g'
          ),
          C = RegExp('[' + v + a + s + c + ']'),
          bs =
            /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
          ws = [
            'Array',
            'Buffer',
            'DataView',
            'Date',
            'Error',
            'Float32Array',
            'Float64Array',
            'Function',
            'Int8Array',
            'Int16Array',
            'Int32Array',
            'Map',
            'Math',
            'Object',
            'Promise',
            'RegExp',
            'Set',
            'String',
            'Symbol',
            'TypeError',
            'Uint8Array',
            'Uint8ClampedArray',
            'Uint16Array',
            'Uint32Array',
            'WeakMap',
            '_',
            'clearTimeout',
            'isFinite',
            'parseInt',
            'setTimeout',
          ],
          xs = -1,
          ra = {},
          oa =
            ((ra[Oa] =
              ra[Ia] =
              ra[Ma] =
              ra[Da] =
              ra[Na] =
              ra[Pa] =
              ra[za] =
              ra[La] =
              ra[ja] =
                !0),
            (ra[qi] =
              ra[Sa] =
              ra[Ra] =
              ra[Yi] =
              ra[na] =
              ra[Ki] =
              ra[ka] =
              ra[Ca] =
              ra[Gi] =
              ra[Zi] =
              ra[Xi] =
              ra[Ji] =
              ra[Qi] =
              ra[ea] =
              ra[ta] =
                !1),
            {}),
          E =
            ((oa[qi] =
              oa[Sa] =
              oa[Ra] =
              oa[na] =
              oa[Yi] =
              oa[Ki] =
              oa[Oa] =
              oa[Ia] =
              oa[Ma] =
              oa[Da] =
              oa[Na] =
              oa[Gi] =
              oa[Zi] =
              oa[Xi] =
              oa[Ji] =
              oa[Qi] =
              oa[ea] =
              oa[_a] =
              oa[Pa] =
              oa[za] =
              oa[La] =
              oa[ja] =
                !0),
            (oa[ka] = oa[Ca] = oa[ta] = !1),
            {
              '\\': '\\',
              "'": "'",
              '\n': 'n',
              '\r': 'r',
              '\u2028': 'u2028',
              '\u2029': 'u2029',
            }),
          Ss = parseFloat,
          ks = parseInt,
          e =
            'object' == typeof commonjsGlobal &&
            commonjsGlobal &&
            commonjsGlobal.Object === Object &&
            commonjsGlobal,
          g = 'object' == typeof self && self && self.Object === Object && self,
          ia = e || g || Function('return this')(),
          r = I && !I.nodeType && I,
          o = r && O && !O.nodeType && O,
          Cs = o && o.exports === r,
          T = Cs && e.process,
          n = (function () {
            try {
              var e = o && o.require && o.require('util').types;
              return e ? e : T && T.binding && T.binding('util');
            } catch (e) {}
          })(),
          Es = n && n.isArrayBuffer,
          Ts = n && n.isDate,
          _s = n && n.isMap,
          Rs = n && n.isRegExp,
          Os = n && n.isSet,
          Is = n && n.isTypedArray;
        function aa(e, t, n) {
          switch (n.length) {
            case 0:
              return e.call(t);
            case 1:
              return e.call(t, n[0]);
            case 2:
              return e.call(t, n[0], n[1]);
            case 3:
              return e.call(t, n[0], n[1], n[2]);
          }
          return e.apply(t, n);
        }
        function Ms(e, t, n, r) {
          for (var o = -1, i = null == e ? 0 : e.length; ++o < i; ) {
            var a = e[o];
            t(r, a, n(a), e);
          }
          return r;
        }
        function sa(e, t) {
          for (
            var n = -1, r = null == e ? 0 : e.length;
            ++n < r && !1 !== t(e[n], n, e);

          );
          return e;
        }
        function Ds(e, t) {
          for (var n = null == e ? 0 : e.length; n-- && !1 !== t(e[n], n, e); );
          return e;
        }
        function Ns(e, t) {
          for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
            if (!t(e[n], n, e)) return !1;
          return !0;
        }
        function la(e, t) {
          for (
            var n = -1, r = null == e ? 0 : e.length, o = 0, i = [];
            ++n < r;

          ) {
            var a = e[n];
            t(a, n, e) && (i[o++] = a);
          }
          return i;
        }
        function Ps(e, t) {
          return !!(null == e ? 0 : e.length) && -1 < da(e, t, 0);
        }
        function zs(e, t, n) {
          for (var r = -1, o = null == e ? 0 : e.length; ++r < o; )
            if (n(t, e[r])) return !0;
          return !1;
        }
        function ca(e, t) {
          for (
            var n = -1, r = null == e ? 0 : e.length, o = Array(r);
            ++n < r;

          )
            o[n] = t(e[n], n, e);
          return o;
        }
        function ua(e, t) {
          for (var n = -1, r = t.length, o = e.length; ++n < r; )
            e[o + n] = t[n];
          return e;
        }
        function Ls(e, t, n, r) {
          var o = -1,
            i = null == e ? 0 : e.length;
          for (r && i && (n = e[++o]); ++o < i; ) n = t(n, e[o], o, e);
          return n;
        }
        function js(e, t, n, r) {
          var o = null == e ? 0 : e.length;
          for (r && o && (n = e[--o]); o--; ) n = t(n, e[o], o, e);
          return n;
        }
        function As(e, t) {
          for (var n = -1, r = null == e ? 0 : e.length; ++n < r; )
            if (t(e[n], n, e)) return !0;
          return !1;
        }
        var _ = Ws('length');
        function Fs(e, r, t) {
          var o;
          return (
            t(e, function (e, t, n) {
              if (r(e, t, n)) return (o = t), !1;
            }),
            o
          );
        }
        function $s(e, t, n, r) {
          for (var o = e.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o; )
            if (t(e[i], i, e)) return i;
          return -1;
        }
        function da(e, t, n) {
          if (t != t) return $s(e, Vs, n);
          for (var r = e, o = t, i = n - 1, a = r.length; ++i < a; )
            if (r[i] === o) return i;
          return -1;
        }
        function Bs(e, t, n, r) {
          for (var o = n - 1, i = e.length; ++o < i; ) if (r(e[o], t)) return o;
          return -1;
        }
        function Vs(e) {
          return e != e;
        }
        function Hs(e, t) {
          var n = null == e ? 0 : e.length;
          return n ? qs(e, t) / n : wa;
        }
        function Ws(t) {
          return function (e) {
            return null == e ? Bi : e[t];
          };
        }
        function R(t) {
          return function (e) {
            return null == t ? Bi : t[e];
          };
        }
        function Us(e, r, o, i, t) {
          return (
            t(e, function (e, t, n) {
              o = i ? ((i = !1), e) : r(o, e, t, n);
            }),
            o
          );
        }
        function qs(e, t) {
          for (var n, r = -1, o = e.length; ++r < o; ) {
            var i = t(e[r]);
            i !== Bi && (n = n === Bi ? i : n + i);
          }
          return n;
        }
        function Ys(e, t) {
          for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
          return r;
        }
        function Ks(e) {
          return e && e.slice(0, il(e) + 1).replace(Qa, '');
        }
        function pa(t) {
          return function (e) {
            return t(e);
          };
        }
        function Gs(t, e) {
          return ca(e, function (e) {
            return t[e];
          });
        }
        function Zs(e, t) {
          return e.has(t);
        }
        function Xs(e, t) {
          for (var n = -1, r = e.length; ++n < r && -1 < da(t, e[n], 0); );
          return n;
        }
        function Js(e, t) {
          for (var n = e.length; n-- && -1 < da(t, e[n], 0); );
          return n;
        }
        var Qs = R({
            À: 'A',
            Á: 'A',
            Â: 'A',
            Ã: 'A',
            Ä: 'A',
            Å: 'A',
            à: 'a',
            á: 'a',
            â: 'a',
            ã: 'a',
            ä: 'a',
            å: 'a',
            Ç: 'C',
            ç: 'c',
            Ð: 'D',
            ð: 'd',
            È: 'E',
            É: 'E',
            Ê: 'E',
            Ë: 'E',
            è: 'e',
            é: 'e',
            ê: 'e',
            ë: 'e',
            Ì: 'I',
            Í: 'I',
            Î: 'I',
            Ï: 'I',
            ì: 'i',
            í: 'i',
            î: 'i',
            ï: 'i',
            Ñ: 'N',
            ñ: 'n',
            Ò: 'O',
            Ó: 'O',
            Ô: 'O',
            Õ: 'O',
            Ö: 'O',
            Ø: 'O',
            ò: 'o',
            ó: 'o',
            ô: 'o',
            õ: 'o',
            ö: 'o',
            ø: 'o',
            Ù: 'U',
            Ú: 'U',
            Û: 'U',
            Ü: 'U',
            ù: 'u',
            ú: 'u',
            û: 'u',
            ü: 'u',
            Ý: 'Y',
            ý: 'y',
            ÿ: 'y',
            Æ: 'Ae',
            æ: 'ae',
            Þ: 'Th',
            þ: 'th',
            ß: 'ss',
            Ā: 'A',
            Ă: 'A',
            Ą: 'A',
            ā: 'a',
            ă: 'a',
            ą: 'a',
            Ć: 'C',
            Ĉ: 'C',
            Ċ: 'C',
            Č: 'C',
            ć: 'c',
            ĉ: 'c',
            ċ: 'c',
            č: 'c',
            Ď: 'D',
            Đ: 'D',
            ď: 'd',
            đ: 'd',
            Ē: 'E',
            Ĕ: 'E',
            Ė: 'E',
            Ę: 'E',
            Ě: 'E',
            ē: 'e',
            ĕ: 'e',
            ė: 'e',
            ę: 'e',
            ě: 'e',
            Ĝ: 'G',
            Ğ: 'G',
            Ġ: 'G',
            Ģ: 'G',
            ĝ: 'g',
            ğ: 'g',
            ġ: 'g',
            ģ: 'g',
            Ĥ: 'H',
            Ħ: 'H',
            ĥ: 'h',
            ħ: 'h',
            Ĩ: 'I',
            Ī: 'I',
            Ĭ: 'I',
            Į: 'I',
            İ: 'I',
            ĩ: 'i',
            ī: 'i',
            ĭ: 'i',
            į: 'i',
            ı: 'i',
            Ĵ: 'J',
            ĵ: 'j',
            Ķ: 'K',
            ķ: 'k',
            ĸ: 'k',
            Ĺ: 'L',
            Ļ: 'L',
            Ľ: 'L',
            Ŀ: 'L',
            Ł: 'L',
            ĺ: 'l',
            ļ: 'l',
            ľ: 'l',
            ŀ: 'l',
            ł: 'l',
            Ń: 'N',
            Ņ: 'N',
            Ň: 'N',
            Ŋ: 'N',
            ń: 'n',
            ņ: 'n',
            ň: 'n',
            ŋ: 'n',
            Ō: 'O',
            Ŏ: 'O',
            Ő: 'O',
            ō: 'o',
            ŏ: 'o',
            ő: 'o',
            Ŕ: 'R',
            Ŗ: 'R',
            Ř: 'R',
            ŕ: 'r',
            ŗ: 'r',
            ř: 'r',
            Ś: 'S',
            Ŝ: 'S',
            Ş: 'S',
            Š: 'S',
            ś: 's',
            ŝ: 's',
            ş: 's',
            š: 's',
            Ţ: 'T',
            Ť: 'T',
            Ŧ: 'T',
            ţ: 't',
            ť: 't',
            ŧ: 't',
            Ũ: 'U',
            Ū: 'U',
            Ŭ: 'U',
            Ů: 'U',
            Ű: 'U',
            Ų: 'U',
            ũ: 'u',
            ū: 'u',
            ŭ: 'u',
            ů: 'u',
            ű: 'u',
            ų: 'u',
            Ŵ: 'W',
            ŵ: 'w',
            Ŷ: 'Y',
            ŷ: 'y',
            Ÿ: 'Y',
            Ź: 'Z',
            Ż: 'Z',
            Ž: 'Z',
            ź: 'z',
            ż: 'z',
            ž: 'z',
            Ĳ: 'IJ',
            ĳ: 'ij',
            Œ: 'Oe',
            œ: 'oe',
            ŉ: "'n",
            ſ: 's',
          }),
          el = R({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
          });
        function tl(e) {
          return '\\' + E[e];
        }
        function fa(e) {
          return C.test(e);
        }
        function nl(e) {
          var n = -1,
            r = Array(e.size);
          return (
            e.forEach(function (e, t) {
              r[++n] = [t, e];
            }),
            r
          );
        }
        function rl(t, n) {
          return function (e) {
            return t(n(e));
          };
        }
        function ha(e, t) {
          for (var n = -1, r = e.length, o = 0, i = []; ++n < r; ) {
            var a = e[n];
            (a !== t && a !== ba) || ((e[n] = ba), (i[o++] = n));
          }
          return i;
        }
        function ol(e) {
          var t = -1,
            n = Array(e.size);
          return (
            e.forEach(function (e) {
              n[++t] = e;
            }),
            n
          );
        }
        function ma(e) {
          return (
            fa(e)
              ? function (e) {
                  var t = (k.lastIndex = 0);
                  for (; k.test(e); ) ++t;
                  return t;
                }
              : _
          )(e);
        }
        function ga(e) {
          return fa(e) ? e.match(k) || [] : e.split('');
        }
        function il(e) {
          for (var t = e.length; t-- && i.test(e.charAt(t)); );
          return t;
        }
        var al = R({
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&#39;': "'",
        });
        var va = (function o(e) {
          var S = (e =
              null == e ? ia : va.defaults(ia.Object(), e, va.pick(ia, ws)))
              .Array,
            i = e.Date,
            D = e.Error,
            N = e.Function,
            P = e.Math,
            m = e.Object,
            z = e.RegExp,
            V = e.String,
            k = e.TypeError,
            H = S.prototype,
            W = N.prototype,
            U = m.prototype,
            q = e['__core-js_shared__'],
            Y = W.toString,
            L = U.hasOwnProperty,
            K = 0,
            G = (W = /[^.]+$/.exec((q && q.keys && q.keys.IE_PROTO) || ''))
              ? 'Symbol(src)_1.' + W
              : '',
            Z = U.toString,
            X = Y.call(m),
            J = ia._,
            Q = z(
              '^' +
                Y.call(L)
                  .replace(Xa, '\\$&')
                  .replace(
                    /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                    '$1.*?'
                  ) +
                '$'
            ),
            W = Cs ? e.Buffer : Bi,
            t = e.Symbol,
            ee = e.Uint8Array,
            te = W ? W.allocUnsafe : Bi,
            ne = rl(m.getPrototypeOf, m),
            re = m.create,
            oe = U.propertyIsEnumerable,
            ie = H.splice,
            ae = t ? t.isConcatSpreadable : Bi,
            se = t ? t.iterator : Bi,
            le = t ? t.toStringTag : Bi,
            ce = (function () {
              try {
                var e = Jn(m, 'defineProperty');
                return e({}, '', {}), e;
              } catch (e) {}
            })(),
            ue = e.clearTimeout !== ia.clearTimeout && e.clearTimeout,
            de = i && i.now !== ia.Date.now && i.now,
            pe = e.setTimeout !== ia.setTimeout && e.setTimeout,
            fe = P.ceil,
            he = P.floor,
            me = m.getOwnPropertySymbols,
            W = W ? W.isBuffer : Bi,
            ge = e.isFinite,
            ve = H.join,
            ye = rl(m.keys, m),
            C = P.max,
            E = P.min,
            be = i.now,
            we = e.parseInt,
            xe = P.random,
            Se = H.reverse,
            i = Jn(e, 'DataView'),
            ke = Jn(e, 'Map'),
            Ce = Jn(e, 'Promise'),
            Ee = Jn(e, 'Set'),
            e = Jn(e, 'WeakMap'),
            Te = Jn(m, 'create'),
            _e = e && new e(),
            Re = {},
            Oe = kr(i),
            Ie = kr(ke),
            Me = kr(Ce),
            De = kr(Ee),
            Ne = kr(e),
            t = t ? t.prototype : Bi,
            Pe = t ? t.valueOf : Bi,
            ze = t ? t.toString : Bi;
          function h(e) {
            if (B(e) && !$(e) && !(e instanceof v)) {
              if (e instanceof g) return e;
              if (L.call(e, '__wrapped__')) return Cr(e);
            }
            return new g(e);
          }
          var Le = function (e) {
            if (!x(e)) return {};
            if (re) return re(e);
            je.prototype = e;
            e = new je();
            return (je.prototype = Bi), e;
          };
          function je() {}
          function Ae() {}
          function g(e, t) {
            (this.__wrapped__ = e),
              (this.__actions__ = []),
              (this.__chain__ = !!t),
              (this.__index__ = 0),
              (this.__values__ = Bi);
          }
          function v(e) {
            (this.__wrapped__ = e),
              (this.__actions__ = []),
              (this.__dir__ = 1),
              (this.__filtered__ = !1),
              (this.__iteratees__ = []),
              (this.__takeCount__ = Ui),
              (this.__views__ = []);
          }
          function Fe(e) {
            var t = -1,
              n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
              var r = e[t];
              this.set(r[0], r[1]);
            }
          }
          function $e(e) {
            var t = -1,
              n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
              var r = e[t];
              this.set(r[0], r[1]);
            }
          }
          function Be(e) {
            var t = -1,
              n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n; ) {
              var r = e[t];
              this.set(r[0], r[1]);
            }
          }
          function Ve(e) {
            var t = -1,
              n = null == e ? 0 : e.length;
            for (this.__data__ = new Be(); ++t < n; ) this.add(e[t]);
          }
          function j(e) {
            e = this.__data__ = new $e(e);
            this.size = e.size;
          }
          function He(e, t) {
            var n,
              r = $(e),
              o = !r && yo(e),
              i = !r && !o && wo(e),
              a = !r && !o && !i && Mo(e),
              s = r || o || i || a,
              l = s ? Ys(e.length, V) : [],
              c = l.length;
            for (n in e)
              (!t && !L.call(e, n)) ||
                (s &&
                  ('length' == n ||
                    (i && ('offset' == n || 'parent' == n)) ||
                    (a &&
                      ('buffer' == n ||
                        'byteLength' == n ||
                        'byteOffset' == n)) ||
                    or(n, c))) ||
                l.push(n);
            return l;
          }
          function We(e) {
            var t = e.length;
            return t ? e[At(0, t - 1)] : Bi;
          }
          function Ue(e, t) {
            return br(T(e), et(t, 0, e.length));
          }
          function qe(e) {
            return br(T(e));
          }
          function Ye(e, t, n) {
            ((n === Bi || F(e[t], n)) && (n !== Bi || t in e)) || Je(e, t, n);
          }
          function Ke(e, t, n) {
            var r = e[t];
            (L.call(e, t) && F(r, n) && (n !== Bi || t in e)) || Je(e, t, n);
          }
          function Ge(e, t) {
            for (var n = e.length; n--; ) if (F(e[n][0], t)) return n;
            return -1;
          }
          function Ze(e, r, o, i) {
            return (
              ot(e, function (e, t, n) {
                r(i, e, o(e), n);
              }),
              i
            );
          }
          function Xe(e, t) {
            return e && gn(t, O(t), e);
          }
          function Je(e, t, n) {
            '__proto__' == t && ce
              ? ce(e, t, {
                  configurable: !0,
                  enumerable: !0,
                  value: n,
                  writable: !0,
                })
              : (e[t] = n);
          }
          function Qe(e, t) {
            for (var n = -1, r = t.length, o = S(r), i = null == e; ++n < r; )
              o[n] = i ? Bi : Uo(e, t[n]);
            return o;
          }
          function et(e, t, n) {
            return (e =
              e == e && (n !== Bi && (e = e <= n ? e : n), t !== Bi)
                ? t <= e
                  ? e
                  : t
                : e);
          }
          function y(n, r, o, e, t, i) {
            var a,
              s = 1 & r,
              l = 2 & r,
              c = 4 & r;
            if ((a = o ? (t ? o(n, e, t, i) : o(n)) : a) === Bi) {
              if (!x(n)) return n;
              var u,
                e = $(n);
              if (e) {
                if (
                  ((a = (function (e) {
                    var t = e.length,
                      n = new e.constructor(t);
                    t &&
                      'string' == typeof e[0] &&
                      L.call(e, 'index') &&
                      ((n.index = e.index), (n.input = e.input));
                    return n;
                  })(n)),
                  !s)
                )
                  return T(n, a);
              } else {
                var d = A(n),
                  p = d == Ca || d == Ea;
                if (wo(n)) return un(n, s);
                if (d == Xi || d == qi || (p && !t)) {
                  if (((a = l || p ? {} : nr(n)), !s))
                    return l
                      ? ((f = p = n),
                        (f = (u = a) && gn(f, I(f), u)),
                        gn(p, er(p), f))
                      : ((p = Xe(a, (u = n))), gn(u, Qn(u), p));
                } else {
                  if (!oa[d]) return t ? n : {};
                  a = (function (e, t, n) {
                    var r = e.constructor;
                    switch (t) {
                      case Ra:
                        return dn(e);
                      case Yi:
                      case Ki:
                        return new r(+e);
                      case na:
                        return (function (e, t) {
                          t = t ? dn(e.buffer) : e.buffer;
                          return new e.constructor(
                            t,
                            e.byteOffset,
                            e.byteLength
                          );
                        })(e, n);
                      case Oa:
                      case Ia:
                      case Ma:
                      case Da:
                      case Na:
                      case Pa:
                      case za:
                      case La:
                      case ja:
                        return pn(e, n);
                      case Gi:
                        return new r();
                      case Zi:
                      case ea:
                        return new r(e);
                      case Ji:
                        return (function (e) {
                          var t = new e.constructor(e.source, ss.exec(e));
                          return (t.lastIndex = e.lastIndex), t;
                        })(e);
                      case Qi:
                        return new r();
                      case _a:
                        return (function (e) {
                          return Pe ? m(Pe.call(e)) : {};
                        })(e);
                    }
                  })(n, d, s);
                }
              }
              var f = (i = i || new j()).get(n);
              if (f) return f;
              i.set(n, a),
                Oo(n)
                  ? n.forEach(function (e) {
                      a.add(y(e, r, o, e, n, i));
                    })
                  : Eo(n) &&
                    n.forEach(function (e, t) {
                      a.set(t, y(e, r, o, t, n, i));
                    });
              var h = e ? Bi : (c ? (l ? qn : Un) : l ? I : O)(n);
              sa(h || n, function (e, t) {
                h && (e = n[(t = e)]), Ke(a, t, y(e, r, o, t, n, i));
              });
            }
            return a;
          }
          function tt(e, t, n) {
            var r = n.length;
            if (null == e) return !r;
            for (e = m(e); r--; ) {
              var o = n[r],
                i = t[o],
                a = e[o];
              if ((a === Bi && !(o in e)) || !i(a)) return !1;
            }
            return !0;
          }
          function nt(e, t, n) {
            if ('function' != typeof e) throw new k(Vi);
            return mr(function () {
              e.apply(Bi, n);
            }, t);
          }
          function rt(e, t, n, r) {
            var o = -1,
              i = Ps,
              a = !0,
              s = e.length,
              l = [],
              c = t.length;
            if (s) {
              n && (t = ca(t, pa(n))),
                r
                  ? ((i = zs), (a = !1))
                  : 200 <= t.length && ((i = Zs), (a = !1), (t = new Ve(t)));
              e: for (; ++o < s; ) {
                var u = e[o],
                  d = null == n ? u : n(u),
                  u = r || 0 !== u ? u : 0;
                if (a && d == d) {
                  for (var p = c; p--; ) if (t[p] === d) continue e;
                  l.push(u);
                } else i(t, d, r) || l.push(u);
              }
            }
            return l;
          }
          (h.templateSettings = {
            escape: Ua,
            evaluate: qa,
            interpolate: Ya,
            variable: '',
            imports: { _: h },
          }),
            ((h.prototype = Ae.prototype).constructor = h),
            ((g.prototype = Le(Ae.prototype)).constructor = g),
            ((v.prototype = Le(Ae.prototype)).constructor = v),
            (Fe.prototype.clear = function () {
              (this.__data__ = Te ? Te(null) : {}), (this.size = 0);
            }),
            (Fe.prototype.delete = function (e) {
              return (
                (e = this.has(e) && delete this.__data__[e]),
                (this.size -= e ? 1 : 0),
                e
              );
            }),
            (Fe.prototype.get = function (e) {
              var t,
                n = this.__data__;
              return Te
                ? (t = n[e]) === ya
                  ? Bi
                  : t
                : L.call(n, e)
                ? n[e]
                : Bi;
            }),
            (Fe.prototype.has = function (e) {
              var t = this.__data__;
              return Te ? t[e] !== Bi : L.call(t, e);
            }),
            (Fe.prototype.set = function (e, t) {
              var n = this.__data__;
              return (
                (this.size += this.has(e) ? 0 : 1),
                (n[e] = Te && t === Bi ? ya : t),
                this
              );
            }),
            ($e.prototype.clear = function () {
              (this.__data__ = []), (this.size = 0);
            }),
            ($e.prototype.delete = function (e) {
              var t = this.__data__;
              return !(
                (e = Ge(t, e)) < 0 ||
                (e == t.length - 1 ? t.pop() : ie.call(t, e, 1), --this.size, 0)
              );
            }),
            ($e.prototype.get = function (e) {
              var t = this.__data__;
              return (e = Ge(t, e)) < 0 ? Bi : t[e][1];
            }),
            ($e.prototype.has = function (e) {
              return -1 < Ge(this.__data__, e);
            }),
            ($e.prototype.set = function (e, t) {
              var n = this.__data__,
                r = Ge(n, e);
              return (
                r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this
              );
            }),
            (Be.prototype.clear = function () {
              (this.size = 0),
                (this.__data__ = {
                  hash: new Fe(),
                  map: new (ke || $e)(),
                  string: new Fe(),
                });
            }),
            (Be.prototype.delete = function (e) {
              return (e = Zn(this, e).delete(e)), (this.size -= e ? 1 : 0), e;
            }),
            (Be.prototype.get = function (e) {
              return Zn(this, e).get(e);
            }),
            (Be.prototype.has = function (e) {
              return Zn(this, e).has(e);
            }),
            (Be.prototype.set = function (e, t) {
              var n = Zn(this, e),
                r = n.size;
              return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
            }),
            (Ve.prototype.add = Ve.prototype.push =
              function (e) {
                return this.__data__.set(e, ya), this;
              }),
            (Ve.prototype.has = function (e) {
              return this.__data__.has(e);
            }),
            (j.prototype.clear = function () {
              (this.__data__ = new $e()), (this.size = 0);
            }),
            (j.prototype.delete = function (e) {
              var t = this.__data__,
                e = t.delete(e);
              return (this.size = t.size), e;
            }),
            (j.prototype.get = function (e) {
              return this.__data__.get(e);
            }),
            (j.prototype.has = function (e) {
              return this.__data__.has(e);
            }),
            (j.prototype.set = function (e, t) {
              var n = this.__data__;
              if (n instanceof $e) {
                var r = n.__data__;
                if (!ke || r.length < 199)
                  return r.push([e, t]), (this.size = ++n.size), this;
                n = this.__data__ = new Be(r);
              }
              return n.set(e, t), (this.size = n.size), this;
            });
          var ot = bn(dt),
            it = bn(pt, !0);
          function at(e, r) {
            var o = !0;
            return (
              ot(e, function (e, t, n) {
                return (o = !!r(e, t, n));
              }),
              o
            );
          }
          function st(e, t, n) {
            for (var r = -1, o = e.length; ++r < o; ) {
              var i,
                a,
                s = e[r],
                l = t(s);
              null != l &&
                (i === Bi ? l == l && !b(l) : n(l, i)) &&
                ((i = l), (a = s));
            }
            return a;
          }
          function lt(e, r) {
            var o = [];
            return (
              ot(e, function (e, t, n) {
                r(e, t, n) && o.push(e);
              }),
              o
            );
          }
          function l(e, t, n, r, o) {
            var i = -1,
              a = e.length;
            for (n = n || rr, o = o || []; ++i < a; ) {
              var s = e[i];
              0 < t && n(s)
                ? 1 < t
                  ? l(s, t - 1, n, r, o)
                  : ua(o, s)
                : r || (o[o.length] = s);
            }
            return o;
          }
          var ct = wn(),
            ut = wn(!0);
          function dt(e, t) {
            return e && ct(e, t, O);
          }
          function pt(e, t) {
            return e && ut(e, t, O);
          }
          function ft(t, e) {
            return la(e, function (e) {
              return So(t[e]);
            });
          }
          function ht(e, t) {
            for (var n = 0, r = (t = an(t, e)).length; null != e && n < r; )
              e = e[Sr(t[n++])];
            return n && n == r ? e : Bi;
          }
          function mt(e, t, n) {
            t = t(e);
            return $(e) ? t : ua(t, n(e));
          }
          function n(e) {
            if (null == e)
              return e === Bi ? '[object Undefined]' : '[object Null]';
            if (le && le in m(e)) {
              var t = e,
                n = L.call(t, le),
                r = t[le];
              try {
                t[le] = Bi;
                var o = !0;
              } catch (e) {}
              var i = Z.call(t);
              return o && (n ? (t[le] = r) : delete t[le]), i;
            }
            return Z.call(e);
          }
          function gt(e, t) {
            return t < e;
          }
          function vt(e, t) {
            return null != e && L.call(e, t);
          }
          function yt(e, t) {
            return null != e && t in m(e);
          }
          function bt(e, t, n) {
            for (
              var r = n ? zs : Ps,
                o = e[0].length,
                i = e.length,
                a = i,
                s = S(i),
                l = 1 / 0,
                c = [];
              a--;

            ) {
              var u = e[a];
              a && t && (u = ca(u, pa(t))),
                (l = E(u.length, l)),
                (s[a] =
                  !n && (t || (120 <= o && 120 <= u.length))
                    ? new Ve(a && u)
                    : Bi);
            }
            var u = e[0],
              d = -1,
              p = s[0];
            e: for (; ++d < o && c.length < l; ) {
              var f = u[d],
                h = t ? t(f) : f,
                f = n || 0 !== f ? f : 0;
              if (!(p ? Zs(p, h) : r(c, h, n))) {
                for (a = i; --a; ) {
                  var m = s[a];
                  if (!(m ? Zs(m, h) : r(e[a], h, n))) continue e;
                }
                p && p.push(h), c.push(f);
              }
            }
            return c;
          }
          function wt(e, t, n) {
            t = null == (e = pr(e, (t = an(t, e)))) ? e : e[Sr(r(t))];
            return null == t ? Bi : aa(t, e, n);
          }
          function xt(e) {
            return B(e) && n(e) == qi;
          }
          function St(e, t, n, r, o) {
            if (e === t) return !0;
            if (null == e || null == t || (!B(e) && !B(t)))
              return e != e && t != t;
            var i = St,
              a = $(e),
              s = $(t),
              l = a ? Sa : A(e),
              s = s ? Sa : A(t),
              c = (l = l == qi ? Xi : l) == Xi,
              u = (s = s == qi ? Xi : s) == Xi;
            if ((s = l == s) && wo(e)) {
              if (!wo(t)) return !1;
              c = !(a = !0);
            }
            if (s && !c) {
              o = o || new j();
              if (a || Mo(e)) return Hn(e, t, n, r, i, o);
              else {
                var d = e;
                var p = t;
                var f = l;
                var h = n;
                var m = r;
                var g = i;
                var v = o;
                switch (f) {
                  case na:
                    if (
                      d.byteLength != p.byteLength ||
                      d.byteOffset != p.byteOffset
                    )
                      return !1;
                    (d = d.buffer), (p = p.buffer);
                  case Ra:
                    return d.byteLength == p.byteLength &&
                      g(new ee(d), new ee(p))
                      ? !0
                      : !1;
                  case Yi:
                  case Ki:
                  case Zi:
                    return F(+d, +p);
                  case ka:
                    return d.name == p.name && d.message == p.message;
                  case Ji:
                  case ea:
                    return d == p + '';
                  case Gi:
                    var y = nl;
                  case Qi:
                    var b = 1 & h;
                    if (((y = y || ol), d.size != p.size && !b)) return !1;
                    b = v.get(d);
                    if (b) return b == p;
                    (h |= 2), v.set(d, p);
                    b = Hn(y(d), y(p), h, m, g, v);
                    return v.delete(d), b;
                  case _a:
                    if (Pe) return Pe.call(d) == Pe.call(p);
                }
                return !1;
                return;
              }
            }
            if (!(1 & n)) {
              (a = c && L.call(e, '__wrapped__')),
                (l = u && L.call(t, '__wrapped__'));
              if (a || l)
                return (
                  (c = a ? e.value() : e),
                  (u = l ? t.value() : t),
                  (o = o || new j()),
                  i(c, u, n, r, o)
                );
            }
            if (s) {
              o = o || new j();
              var w = e,
                x = t,
                S = n,
                k = r,
                C = i,
                E = o,
                T = 1 & S,
                _ = Un(w),
                R = _.length,
                a = Un(x).length;
              if (R != a && !T) return !1;
              for (var O = R; O--; ) {
                var I = _[O];
                if (!(T ? I in x : L.call(x, I))) return !1;
              }
              (a = E.get(w)), (l = E.get(x));
              if (a && l) return a == x && l == w;
              for (var M = !0, D = (E.set(w, x), E.set(x, w), T); ++O < R; ) {
                I = _[O];
                var N,
                  P = w[I],
                  z = x[I];
                if (
                  !((N = k
                    ? T
                      ? k(z, P, I, x, w, E)
                      : k(P, z, I, w, x, E)
                    : N) === Bi
                    ? P === z || C(P, z, S, k, E)
                    : N)
                ) {
                  M = !1;
                  break;
                }
                D = D || 'constructor' == I;
              }
              return (
                M &&
                  !D &&
                  ((a = w.constructor), (l = x.constructor), a != l) &&
                  'constructor' in w &&
                  'constructor' in x &&
                  !(
                    'function' == typeof a &&
                    a instanceof a &&
                    'function' == typeof l &&
                    l instanceof l
                  ) &&
                  (M = !1),
                E.delete(w),
                E.delete(x),
                M
              );
            }
            return !1;
          }
          function kt(e, t, n, r) {
            var o = n.length,
              i = o,
              a = !r;
            if (null == e) return !i;
            for (e = m(e); o--; ) {
              var s = n[o];
              if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
            }
            for (; ++o < i; ) {
              var l = (s = n[o])[0],
                c = e[l],
                u = s[1];
              if (a && s[2]) {
                if (c === Bi && !(l in e)) return !1;
              } else {
                var d,
                  p = new j();
                if (
                  !((d = r ? r(c, u, l, e, t, p) : d) === Bi
                    ? St(u, c, 3, r, p)
                    : d)
                )
                  return !1;
              }
            }
            return !0;
          }
          function Ct(e) {
            var t;
            return (
              !(!x(e) || ((t = e), G && G in t)) && (So(e) ? Q : us).test(kr(e))
            );
          }
          function Et(e) {
            return 'function' == typeof e
              ? e
              : null == e
              ? M
              : 'object' == typeof e
              ? $(e)
                ? Mt(e[0], e[1])
                : It(e)
              : Ri(e);
          }
          function Tt(e) {
            if (!lr(e)) return ye(e);
            var t,
              n = [];
            for (t in m(e)) L.call(e, t) && 'constructor' != t && n.push(t);
            return n;
          }
          function _t(e) {
            if (!x(e)) {
              var t = e,
                n = [];
              if (null != t) for (var r in m(t)) n.push(r);
              return n;
            }
            var o,
              i = lr(e),
              a = [];
            for (o in e)
              ('constructor' != o || (!i && L.call(e, o))) && a.push(o);
            return a;
          }
          function Rt(e, t) {
            return e < t;
          }
          function Ot(e, r) {
            var o = -1,
              i = u(e) ? S(e.length) : [];
            return (
              ot(e, function (e, t, n) {
                i[++o] = r(e, t, n);
              }),
              i
            );
          }
          function It(t) {
            var n = Xn(t);
            return 1 == n.length && n[0][2]
              ? ur(n[0][0], n[0][1])
              : function (e) {
                  return e === t || kt(e, t, n);
                };
          }
          function Mt(n, r) {
            return ir(n) && cr(r)
              ? ur(Sr(n), r)
              : function (e) {
                  var t = Uo(e, n);
                  return t === Bi && t === r ? qo(e, n) : St(r, t, 3);
                };
          }
          function Dt(m, g, v, y, b) {
            m !== g &&
              ct(
                g,
                function (e, t) {
                  var n, r, o, i, a, s, l, c, u, d, p, f, h;
                  (b = b || new j()),
                    x(e)
                      ? ((r = g),
                        (i = v),
                        (a = Dt),
                        (s = y),
                        (l = b),
                        (p = fr((n = m), (o = t))),
                        (f = fr(r, o)),
                        (h = l.get(f))
                          ? Ye(n, o, h)
                          : ((h = s ? s(p, f, o + '', n, r, l) : Bi),
                            (r = h === Bi) &&
                              ((c = $(f)),
                              (u = !c && wo(f)),
                              (d = !c && !u && Mo(f)),
                              (h = f),
                              c || u || d
                                ? (h = $(p)
                                    ? p
                                    : w(p)
                                    ? T(p)
                                    : u
                                    ? un(f, !(r = !1))
                                    : d
                                    ? pn(f, !(r = !1))
                                    : [])
                                : _o(f) || yo(f)
                                ? yo((h = p))
                                  ? (h = jo(p))
                                  : (x(p) && !So(p)) || (h = nr(f))
                                : (r = !1)),
                            r && (l.set(f, h), a(h, f, i, s, l), l.delete(f)),
                            Ye(n, o, h)))
                      : ((c = y ? y(fr(m, t), e, t + '', m, g, b) : Bi),
                        Ye(m, t, (c = c === Bi ? e : c)));
                },
                I
              );
          }
          function Nt(e, t) {
            var n = e.length;
            if (n) return or((t += t < 0 ? n : 0), n) ? e[t] : Bi;
          }
          function Pt(e, r, u) {
            r = r.length
              ? ca(r, function (t) {
                  return $(t)
                    ? function (e) {
                        return ht(e, 1 === t.length ? t[0] : t);
                      }
                    : t;
                })
              : [M];
            var o = -1;
            r = ca(r, pa(d()));
            var t = Ot(e, function (t, e, n) {
                return {
                  criteria: ca(r, function (e) {
                    return e(t);
                  }),
                  index: ++o,
                  value: t,
                };
              }),
              e = function (e, t) {
                for (
                  var n = u,
                    r = -1,
                    o = e.criteria,
                    i = t.criteria,
                    a = o.length,
                    s = n.length;
                  ++r < a;

                ) {
                  var l,
                    c = fn(o[r], i[r]);
                  if (c)
                    return s <= r
                      ? c
                      : ((l = n[r]), c * ('desc' == l ? -1 : 1));
                }
                return e.index - t.index;
              },
              n = t.length;
            for (t.sort(e); n--; ) t[n] = t[n].value;
            return t;
          }
          function zt(e, t, n) {
            for (var r = -1, o = t.length, i = {}; ++r < o; ) {
              var a = t[r],
                s = ht(e, a);
              n(s, a) && Vt(i, an(a, e), s);
            }
            return i;
          }
          function Lt(e, t, n, r) {
            var o = r ? Bs : da,
              i = -1,
              a = t.length,
              s = e;
            for (e === t && (t = T(t)), n && (s = ca(e, pa(n))); ++i < a; )
              for (
                var l = 0, c = t[i], u = n ? n(c) : c;
                -1 < (l = o(s, u, l, r));

              )
                s !== e && ie.call(s, l, 1), ie.call(e, l, 1);
            return e;
          }
          function jt(e, t) {
            for (var n = e ? t.length : 0, r = n - 1; n--; ) {
              var o,
                i = t[n];
              (n != r && i === o) ||
                (or((o = i)) ? ie.call(e, i, 1) : Xt(e, i));
            }
          }
          function At(e, t) {
            return e + he(xe() * (t - e + 1));
          }
          function Ft(e, t) {
            var n = '';
            if (!(!e || t < 1 || Wi < t))
              for (; t % 2 && (n += e), (t = he(t / 2)) && (e += e), t; );
            return n;
          }
          function a(e, t) {
            return gr(dr(e, t, M), e + '');
          }
          function $t(e) {
            return We(ri(e));
          }
          function Bt(e, t) {
            e = ri(e);
            return br(e, et(t, 0, e.length));
          }
          function Vt(e, t, n, r) {
            if (x(e))
              for (
                var o = -1, i = (t = an(t, e)).length, a = i - 1, s = e;
                null != s && ++o < i;

              ) {
                var l,
                  c = Sr(t[o]),
                  u = n;
                if (
                  '__proto__' === c ||
                  'constructor' === c ||
                  'prototype' === c
                )
                  return e;
                Ke(
                  s,
                  c,
                  (u =
                    o != a && ((l = s[c]), (u = r ? r(l, c, s) : Bi) === Bi)
                      ? x(l)
                        ? l
                        : or(t[o + 1])
                        ? []
                        : {}
                      : u)
                ),
                  (s = s[c]);
              }
            return e;
          }
          var Ht = _e
              ? function (e, t) {
                  return _e.set(e, t), e;
                }
              : M,
            t = ce
              ? function (e, t) {
                  return ce(e, 'toString', {
                    configurable: !0,
                    enumerable: !1,
                    value: vi(t),
                    writable: !0,
                  });
                }
              : M;
          function Wt(e) {
            return br(ri(e));
          }
          function s(e, t, n) {
            for (
              var r = -1,
                o = e.length,
                i =
                  ((n = o < n ? o : n) < 0 && (n += o),
                  (o =
                    n < (t = t < 0 ? (o < -t ? 0 : o + t) : t)
                      ? 0
                      : (n - t) >>> 0),
                  (t >>>= 0),
                  S(o));
              ++r < o;

            )
              i[r] = e[r + t];
            return i;
          }
          function Ut(e, r) {
            var o;
            return (
              ot(e, function (e, t, n) {
                return !(o = r(e, t, n));
              }),
              !!o
            );
          }
          function qt(e, t, n) {
            var r = 0,
              o = null == e ? r : e.length;
            if ('number' == typeof t && t == t && o <= 2147483647) {
              for (; r < o; ) {
                var i = (r + o) >>> 1,
                  a = e[i];
                null !== a && !b(a) && (n ? a <= t : a < t)
                  ? (r = 1 + i)
                  : (o = i);
              }
              return o;
            }
            return Yt(e, t, M, n);
          }
          function Yt(e, t, n, r) {
            var o = 0,
              i = null == e ? 0 : e.length;
            if (0 === i) return 0;
            for (
              var a = (t = n(t)) != t, s = null === t, l = b(t), c = t === Bi;
              o < i;

            ) {
              var u = he((o + i) / 2),
                d = n(e[u]),
                p = d !== Bi,
                f = null === d,
                h = d == d,
                m = b(d),
                h = a
                  ? r || h
                  : c
                  ? h && (r || p)
                  : s
                  ? h && p && (r || !f)
                  : l
                  ? h && p && !f && (r || !m)
                  : !f && !m && (r ? d <= t : d < t);
              h ? (o = u + 1) : (i = u);
            }
            return E(i, 4294967294);
          }
          function Kt(e, t) {
            for (var n = -1, r = e.length, o = 0, i = []; ++n < r; ) {
              var a,
                s = e[n],
                l = t ? t(s) : s;
              (n && F(l, a)) || ((a = l), (i[o++] = 0 === s ? 0 : s));
            }
            return i;
          }
          function Gt(e) {
            return 'number' == typeof e ? e : b(e) ? wa : +e;
          }
          function c(e) {
            var t;
            return 'string' == typeof e
              ? e
              : $(e)
              ? ca(e, c) + ''
              : b(e)
              ? ze
                ? ze.call(e)
                : ''
              : '0' == (t = e + '') && 1 / e == -1 / 0
              ? '-0'
              : t;
          }
          function Zt(e, t, n) {
            var r = -1,
              o = Ps,
              i = e.length,
              a = !0,
              s = [],
              l = s;
            if (n) (a = !1), (o = zs);
            else if (200 <= i) {
              var c = t ? null : jn(e);
              if (c) return ol(c);
              (a = !1), (o = Zs), (l = new Ve());
            } else l = t ? [] : s;
            e: for (; ++r < i; ) {
              var u = e[r],
                d = t ? t(u) : u,
                u = n || 0 !== u ? u : 0;
              if (a && d == d) {
                for (var p = l.length; p--; ) if (l[p] === d) continue e;
                t && l.push(d), s.push(u);
              } else o(l, d, n) || (l !== s && l.push(d), s.push(u));
            }
            return s;
          }
          function Xt(e, t) {
            return null == (e = pr(e, (t = an(t, e)))) || delete e[Sr(r(t))];
          }
          function Jt(e, t, n, r) {
            return Vt(e, t, n(ht(e, t)), r);
          }
          function Qt(e, t, n, r) {
            for (
              var o = e.length, i = r ? o : -1;
              (r ? i-- : ++i < o) && t(e[i], i, e);

            );
            return n
              ? s(e, r ? 0 : i, r ? i + 1 : o)
              : s(e, r ? i + 1 : 0, r ? o : i);
          }
          function en(e, t) {
            var n = e;
            return Ls(
              t,
              function (e, t) {
                return t.func.apply(t.thisArg, ua([e], t.args));
              },
              (n = e instanceof v ? e.value() : n)
            );
          }
          function tn(e, t, n) {
            var r = e.length;
            if (r < 2) return r ? Zt(e[0]) : [];
            for (var o = -1, i = S(r); ++o < r; )
              for (var a = e[o], s = -1; ++s < r; )
                s != o && (i[o] = rt(i[o] || a, e[s], t, n));
            return Zt(l(i, 1), t, n);
          }
          function nn(e, t, n) {
            for (var r = -1, o = e.length, i = t.length, a = {}; ++r < o; ) {
              var s = r < i ? t[r] : Bi;
              n(a, e[r], s);
            }
            return a;
          }
          function rn(e) {
            return w(e) ? e : [];
          }
          function on(e) {
            return 'function' == typeof e ? e : M;
          }
          function an(e, t) {
            return $(e) ? e : ir(e, t) ? [e] : xr(f(e));
          }
          var sn = a;
          function ln(e, t, n) {
            var r = e.length;
            return (n = n === Bi ? r : n), !t && r <= n ? e : s(e, t, n);
          }
          var cn =
            ue ||
            function (e) {
              return ia.clearTimeout(e);
            };
          function un(e, t) {
            return t
              ? e.slice()
              : ((t = e.length),
                (t = te ? te(t) : new e.constructor(t)),
                e.copy(t),
                t);
          }
          function dn(e) {
            var t = new e.constructor(e.byteLength);
            return new ee(t).set(new ee(e)), t;
          }
          function pn(e, t) {
            t = t ? dn(e.buffer) : e.buffer;
            return new e.constructor(t, e.byteOffset, e.length);
          }
          function fn(e, t) {
            if (e !== t) {
              var n = e !== Bi,
                r = null === e,
                o = e == e,
                i = b(e),
                a = t !== Bi,
                s = null === t,
                l = t == t,
                c = b(t);
              if (
                (!s && !c && !i && t < e) ||
                (i && a && l && !s && !c) ||
                (r && a && l) ||
                (!n && l) ||
                !o
              )
                return 1;
              if (
                (!r && !i && !c && e < t) ||
                (c && n && o && !r && !i) ||
                (s && n && o) ||
                (!a && o) ||
                !l
              )
                return -1;
            }
            return 0;
          }
          function hn(e, t, n, r) {
            for (
              var o = -1,
                i = e.length,
                a = n.length,
                s = -1,
                l = t.length,
                c = C(i - a, 0),
                u = S(l + c),
                d = !r;
              ++s < l;

            )
              u[s] = t[s];
            for (; ++o < a; ) (d || o < i) && (u[n[o]] = e[o]);
            for (; c--; ) u[s++] = e[o++];
            return u;
          }
          function mn(e, t, n, r) {
            for (
              var o = -1,
                i = e.length,
                a = -1,
                s = n.length,
                l = -1,
                c = t.length,
                u = C(i - s, 0),
                d = S(u + c),
                p = !r;
              ++o < u;

            )
              d[o] = e[o];
            for (var f = o; ++l < c; ) d[f + l] = t[l];
            for (; ++a < s; ) (p || o < i) && (d[f + n[a]] = e[o++]);
            return d;
          }
          function T(e, t) {
            var n = -1,
              r = e.length;
            for (t = t || S(r); ++n < r; ) t[n] = e[n];
            return t;
          }
          function gn(e, t, n, r) {
            for (var o = !n, i = ((n = n || {}), -1), a = t.length; ++i < a; ) {
              var s = t[i],
                l = r ? r(n[s], e[s], s, n, e) : Bi;
              (o ? Je : Ke)(n, s, (l = l === Bi ? e[s] : l));
            }
            return n;
          }
          function vn(o, i) {
            return function (e, t) {
              var n = $(e) ? Ms : Ze,
                r = i ? i() : {};
              return n(e, o, d(t, 2), r);
            };
          }
          function yn(s) {
            return a(function (e, t) {
              var n = -1,
                r = t.length,
                o = 1 < r ? t[r - 1] : Bi,
                i = 2 < r ? t[2] : Bi,
                o = 3 < s.length && 'function' == typeof o ? (r--, o) : Bi;
              for (
                i && p(t[0], t[1], i) && ((o = r < 3 ? Bi : o), (r = 1)),
                  e = m(e);
                ++n < r;

              ) {
                var a = t[n];
                a && s(e, a, n, o);
              }
              return e;
            });
          }
          function bn(i, a) {
            return function (e, t) {
              if (null != e) {
                if (!u(e)) return i(e, t);
                for (
                  var n = e.length, r = a ? n : -1, o = m(e);
                  (a ? r-- : ++r < n) && !1 !== t(o[r], r, o);

                );
              }
              return e;
            };
          }
          function wn(l) {
            return function (e, t, n) {
              for (var r = -1, o = m(e), i = n(e), a = i.length; a--; ) {
                var s = i[l ? a : ++r];
                if (!1 === t(o[s], s, o)) break;
              }
              return e;
            };
          }
          function xn(r) {
            return function (e) {
              var t = fa((e = f(e))) ? ga(e) : Bi,
                n = t ? t[0] : e.charAt(0),
                t = t ? ln(t, 1).join('') : e.slice(1);
              return n[r]() + t;
            };
          }
          function Sn(t) {
            return function (e) {
              return Ls(hi(ai(e).replace(gs, '')), t, '');
            };
          }
          function kn(r) {
            return function () {
              var e = arguments;
              switch (e.length) {
                case 0:
                  return new r();
                case 1:
                  return new r(e[0]);
                case 2:
                  return new r(e[0], e[1]);
                case 3:
                  return new r(e[0], e[1], e[2]);
                case 4:
                  return new r(e[0], e[1], e[2], e[3]);
                case 5:
                  return new r(e[0], e[1], e[2], e[3], e[4]);
                case 6:
                  return new r(e[0], e[1], e[2], e[3], e[4], e[5]);
                case 7:
                  return new r(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
              }
              var t = Le(r.prototype),
                n = r.apply(t, e);
              return x(n) ? n : t;
            };
          }
          function Cn(i, a, s) {
            var l = kn(i);
            return function e() {
              for (var t = arguments.length, n = S(t), r = t, o = Gn(e); r--; )
                n[r] = arguments[r];
              o = t < 3 && n[0] !== o && n[t - 1] !== o ? [] : ha(n, o);
              return (t -= o.length) < s
                ? zn(i, a, _n, e.placeholder, Bi, n, o, Bi, Bi, s - t)
                : aa(this && this !== ia && this instanceof e ? l : i, this, n);
            };
          }
          function En(i) {
            return function (e, t, n) {
              var r,
                o = m(e),
                t =
                  (u(e) ||
                    ((r = d(t, 3)),
                    (e = O(e)),
                    (t = function (e) {
                      return r(o[e], e, o);
                    })),
                  i(e, t, n));
              return -1 < t ? o[r ? e[t] : t] : Bi;
            };
          }
          function Tn(l) {
            return Wn(function (o) {
              var i = o.length,
                e = i,
                t = g.prototype.thru;
              for (l && o.reverse(); e--; ) {
                var n = o[e];
                if ('function' != typeof n) throw new k(Vi);
                t && !s && 'wrapper' == Kn(n) && (s = new g([], !0));
              }
              for (e = s ? e : i; ++e < i; )
                var r = Kn((n = o[e])),
                  a = 'wrapper' == r ? Yn(n) : Bi,
                  s =
                    a && ar(a[0]) && 424 == a[1] && !a[4].length && 1 == a[9]
                      ? s[Kn(a[0])].apply(s, a[3])
                      : 1 == n.length && ar(n)
                      ? s[r]()
                      : s.thru(n);
              return function () {
                var e = arguments,
                  t = e[0];
                if (s && 1 == e.length && $(t)) return s.plant(t).value();
                for (var n = 0, r = i ? o[n].apply(this, e) : t; ++n < i; )
                  r = o[n].call(this, r);
                return r;
              };
            });
          }
          function _n(a, s, l, c, u, d, p, f, h, m) {
            var g = s & Hi,
              v = 1 & s,
              y = 2 & s,
              b = 24 & s,
              w = 512 & s,
              x = y ? Bi : kn(a);
            return function e() {
              for (var t, n, r, o = S((r = arguments.length)), i = r; i--; )
                o[i] = arguments[i];
              return (
                b &&
                  (n = (function (e, t) {
                    for (var n = e.length, r = 0; n--; ) e[n] === t && ++r;
                    return r;
                  })(o, (t = Gn(e)))),
                c && (o = hn(o, c, u, b)),
                d && (o = mn(o, d, p, b)),
                (r -= n),
                b && r < m
                  ? ((n = ha(o, t)),
                    zn(a, s, _n, e.placeholder, l, o, n, f, h, m - r))
                  : ((t = v ? l : this),
                    (n = y ? t[a] : a),
                    (r = o.length),
                    f
                      ? (o = (function (e, t) {
                          for (
                            var n = e.length, r = E(t.length, n), o = T(e);
                            r--;

                          ) {
                            var i = t[r];
                            e[r] = or(i, n) ? o[i] : Bi;
                          }
                          return e;
                        })(o, f))
                      : w && 1 < r && o.reverse(),
                    g && h < r && (o.length = h),
                    (n =
                      this && this !== ia && this instanceof e
                        ? x || kn(n)
                        : n).apply(t, o))
              );
            };
          }
          function Rn(n, a) {
            return function (e, t) {
              return (
                (e = e),
                (r = n),
                (o = a(t)),
                (i = {}),
                dt(e, function (e, t, n) {
                  r(i, o(e), t, n);
                }),
                i
              );
              var r, o, i;
            };
          }
          function On(r, o) {
            return function (e, t) {
              var n;
              if (e === Bi && t === Bi) return o;
              if ((e !== Bi && (n = e), t !== Bi)) {
                if (n === Bi) return t;
                (t = (
                  'string' == typeof e || 'string' == typeof t
                    ? ((e = c(e)), c)
                    : ((e = Gt(e)), Gt)
                )(t)),
                  (n = r(e, t));
              }
              return n;
            };
          }
          function In(r) {
            return Wn(function (e) {
              return (
                (e = ca(e, pa(d()))),
                a(function (t) {
                  var n = this;
                  return r(e, function (e) {
                    return aa(e, n, t);
                  });
                })
              );
            });
          }
          function Mn(e, t) {
            var n = (t = t === Bi ? ' ' : c(t)).length;
            return n < 2
              ? n
                ? Ft(t, e)
                : t
              : ((n = Ft(t, fe(e / ma(t)))),
                fa(t) ? ln(ga(n), 0, e).join('') : n.slice(0, e));
          }
          function Dn(s, e, l, c) {
            var u = 1 & e,
              d = kn(s);
            return function e() {
              for (
                var t = -1,
                  n = arguments.length,
                  r = -1,
                  o = c.length,
                  i = S(o + n),
                  a = this && this !== ia && this instanceof e ? d : s;
                ++r < o;

              )
                i[r] = c[r];
              for (; n--; ) i[r++] = arguments[++t];
              return aa(a, u ? l : this, i);
            };
          }
          function Nn(c) {
            return function (e, t, n) {
              n && 'number' != typeof n && p(e, t, n) && (t = n = Bi),
                (e = zo(e)),
                t === Bi ? ((t = e), (e = 0)) : (t = zo(t)),
                (n = n === Bi ? (e < t ? 1 : -1) : zo(n));
              for (
                var r = e,
                  o = n,
                  i = c,
                  a = -1,
                  s = C(fe((t - r) / (o || 1)), 0),
                  l = S(s);
                s--;

              )
                (l[i ? s : ++a] = r), (r += o);
              return l;
            };
          }
          function Pn(n) {
            return function (e, t) {
              return (
                ('string' == typeof e && 'string' == typeof t) ||
                  ((e = R(e)), (t = R(t))),
                n(e, t)
              );
            };
          }
          function zn(e, t, n, r, o, i, a, s, l, c) {
            var u = 8 & t,
              o =
                (4 & (t = (t | (u ? 32 : 64)) & ~(u ? 64 : 32)) || (t &= -4),
                [
                  e,
                  t,
                  o,
                  u ? i : Bi,
                  u ? a : Bi,
                  u ? Bi : i,
                  u ? Bi : a,
                  s,
                  l,
                  c,
                ]),
              i = n.apply(Bi, o);
            return ar(e) && hr(i, o), (i.placeholder = r), vr(i, e, t);
          }
          function Ln(e) {
            var r = P[e];
            return function (e, t) {
              var n;
              return (
                (e = R(e)),
                (t = null == t ? 0 : E(_(t), 292)) && ge(e)
                  ? ((n = (f(e) + 'e').split('e')),
                    +(
                      (n = (f(r(n[0] + 'e' + (+n[1] + t))) + 'e').split(
                        'e'
                      ))[0] +
                      'e' +
                      (+n[1] - t)
                    ))
                  : r(e)
              );
            };
          }
          var jn =
            Ee && 1 / ol(new Ee([, -0]))[1] == 1 / 0
              ? function (e) {
                  return new Ee(e);
                }
              : Ci;
          function An(i) {
            return function (e) {
              var t,
                n,
                r,
                o = A(e);
              return o == Gi
                ? nl(e)
                : o == Qi
                ? ((o = e),
                  (t = -1),
                  (n = Array(o.size)),
                  o.forEach(function (e) {
                    n[++t] = [e, e];
                  }),
                  n)
                : ca(i((r = e)), function (e) {
                    return [e, r[e]];
                  });
            };
          }
          function Fn(e, t, n, r, o, i, a, s) {
            var l,
              c,
              u,
              d,
              p,
              f,
              h,
              m,
              g,
              v,
              y,
              b,
              w,
              x = 2 & t;
            if (x || 'function' == typeof e)
              return (
                (l = r ? r.length : 0) || ((t &= -97), (r = o = Bi)),
                (a = a === Bi ? a : C(_(a), 0)),
                (s = s === Bi ? s : _(s)),
                (l -= o ? o.length : 0),
                64 & t && ((u = r), (d = o), (r = o = Bi)),
                (c = x ? Bi : Yn(e)),
                (u = [e, t, n, r, o, u, d, i, a, s]),
                c &&
                  ((d = c),
                  (a = (i = u)[1]),
                  (f = d[1]),
                  (m = (h = a | f) < 131),
                  (g =
                    (f == Hi && 8 == a) ||
                    (f == Hi && 256 == a && i[7].length <= d[8]) ||
                    (384 == f && d[7].length <= d[8] && 8 == a)),
                  m || g) &&
                  (1 & f && ((i[2] = d[2]), (h |= 1 & a ? 0 : 4)),
                  (m = d[3]) &&
                    ((p = i[3]),
                    (i[3] = p ? hn(p, m, d[4]) : m),
                    (i[4] = p ? ha(i[3], ba) : d[4])),
                  (m = d[5]) &&
                    ((p = i[5]),
                    (i[5] = p ? mn(p, m, d[6]) : m),
                    (i[6] = p ? ha(i[5], ba) : d[6])),
                  (m = d[7]) && (i[7] = m),
                  f & Hi && (i[8] = null == i[8] ? d[8] : E(i[8], d[8])),
                  null == i[9] && (i[9] = d[9]),
                  (i[0] = d[0]),
                  (i[1] = h)),
                (e = u[0]),
                (t = u[1]),
                (n = u[2]),
                (r = u[3]),
                (o = u[4]),
                !(s = u[9] =
                  u[9] === Bi ? (x ? 0 : e.length) : C(u[9] - l, 0)) &&
                  24 & t &&
                  (t &= -25),
                (g =
                  t && 1 != t
                    ? 8 == t || 16 == t
                      ? Cn(e, t, s)
                      : (32 != t && 33 != t) || o.length
                      ? _n.apply(Bi, u)
                      : Dn(e, t, n, r)
                    : ((y = n),
                      (b = 1 & t),
                      (w = kn((v = e))),
                      function e() {
                        return (
                          this && this !== ia && this instanceof e ? w : v
                        ).apply(b ? y : this, arguments);
                      })),
                vr((c ? Ht : hr)(g, u), e, t)
              );
            throw new k(Vi);
          }
          function $n(e, t, n, r) {
            return e === Bi || (F(e, U[n]) && !L.call(r, n)) ? t : e;
          }
          function Bn(e, t, n, r, o, i) {
            return (
              x(e) && x(t) && (i.set(t, e), Dt(e, t, Bi, Bn, i), i.delete(t)), e
            );
          }
          function Vn(e) {
            return _o(e) ? Bi : e;
          }
          function Hn(e, t, n, r, o, i) {
            var a = 1 & n,
              s = e.length,
              l = t.length;
            if (s != l && !(a && s < l)) return !1;
            var l = i.get(e),
              c = i.get(t);
            if (l && c) return l == t && c == e;
            var u = -1,
              d = !0,
              p = 2 & n ? new Ve() : Bi;
            for (i.set(e, t), i.set(t, e); ++u < s; ) {
              var f,
                h = e[u],
                m = t[u];
              if (
                (f = r
                  ? a
                    ? r(m, h, u, t, e, i)
                    : r(h, m, u, e, t, i)
                  : f) !== Bi
              ) {
                if (f) continue;
                d = !1;
                break;
              }
              if (p) {
                if (
                  !As(t, function (e, t) {
                    return (
                      !Zs(p, t) && (h === e || o(h, e, n, r, i)) && p.push(t)
                    );
                  })
                ) {
                  d = !1;
                  break;
                }
              } else if (h !== m && !o(h, m, n, r, i)) {
                d = !1;
                break;
              }
            }
            return i.delete(e), i.delete(t), d;
          }
          function Wn(e) {
            return gr(dr(e, Bi, _r), e + '');
          }
          function Un(e) {
            return mt(e, O, Qn);
          }
          function qn(e) {
            return mt(e, I, er);
          }
          var Yn = _e
            ? function (e) {
                return _e.get(e);
              }
            : Ci;
          function Kn(e) {
            for (
              var t = e.name + '', n = Re[t], r = L.call(Re, t) ? n.length : 0;
              r--;

            ) {
              var o = n[r],
                i = o.func;
              if (null == i || i == e) return o.name;
            }
            return t;
          }
          function Gn(e) {
            return (L.call(h, 'placeholder') ? h : e).placeholder;
          }
          function d() {
            var e = (e = h.iteratee || wi) === wi ? Et : e;
            return arguments.length ? e(arguments[0], arguments[1]) : e;
          }
          function Zn(e, t) {
            var n,
              r,
              e = e.__data__;
            return (
              'string' == (r = typeof (n = t)) ||
              'number' == r ||
              'symbol' == r ||
              'boolean' == r
                ? '__proto__' !== n
                : null === n
            )
              ? e['string' == typeof t ? 'string' : 'hash']
              : e.map;
          }
          function Xn(e) {
            for (var t = O(e), n = t.length; n--; ) {
              var r = t[n],
                o = e[r];
              t[n] = [r, o, cr(o)];
            }
            return t;
          }
          function Jn(e, t) {
            t = t;
            e = null == (e = e) ? Bi : e[t];
            return Ct(e) ? e : Bi;
          }
          var Qn = me
              ? function (t) {
                  return null == t
                    ? []
                    : ((t = m(t)),
                      la(me(t), function (e) {
                        return oe.call(t, e);
                      }));
                }
              : Mi,
            er = me
              ? function (e) {
                  for (var t = []; e; ) ua(t, Qn(e)), (e = ne(e));
                  return t;
                }
              : Mi,
            A = n;
          function tr(e, t, n) {
            for (var r = -1, o = (t = an(t, e)).length, i = !1; ++r < o; ) {
              var a = Sr(t[r]);
              if (!(i = null != e && n(e, a))) break;
              e = e[a];
            }
            return i || ++r != o
              ? i
              : !!(o = null == e ? 0 : e.length) &&
                  Co(o) &&
                  or(a, o) &&
                  ($(e) || yo(e));
          }
          function nr(e) {
            return 'function' != typeof e.constructor || lr(e) ? {} : Le(ne(e));
          }
          function rr(e) {
            return $(e) || yo(e) || !!(ae && e && e[ae]);
          }
          function or(e, t) {
            var n = typeof e;
            return (
              !!(t = null == t ? Wi : t) &&
              ('number' == n || ('symbol' != n && ps.test(e))) &&
              -1 < e &&
              e % 1 == 0 &&
              e < t
            );
          }
          function p(e, t, n) {
            var r;
            if (x(n))
              return (
                ('number' == (r = typeof t)
                  ? u(n) && or(t, n.length)
                  : 'string' == r && t in n) && F(n[t], e)
              );
          }
          function ir(e, t) {
            var n;
            if (!$(e))
              return (
                'number' == (n = typeof e) ||
                'symbol' == n ||
                'boolean' == n ||
                null == e ||
                b(e) ||
                Ga.test(e) ||
                !Ka.test(e) ||
                (null != t && e in m(t))
              );
          }
          function ar(e) {
            var t = Kn(e),
              n = h[t];
            return (
              'function' == typeof n &&
              t in v.prototype &&
              (e === n || ((t = Yn(n)) && e === t[0]))
            );
          }
          ((i && A(new i(new ArrayBuffer(1))) != na) ||
            (ke && A(new ke()) != Gi) ||
            (Ce && A(Ce.resolve()) != Ta) ||
            (Ee && A(new Ee()) != Qi) ||
            (e && A(new e()) != ta)) &&
            (A = function (e) {
              var t = n(e),
                e = t == Xi ? e.constructor : Bi,
                e = e ? kr(e) : '';
              if (e)
                switch (e) {
                  case Oe:
                    return na;
                  case Ie:
                    return Gi;
                  case Me:
                    return Ta;
                  case De:
                    return Qi;
                  case Ne:
                    return ta;
                }
              return t;
            });
          var sr = q ? So : Di;
          function lr(e) {
            var t = e && e.constructor;
            return e === (('function' == typeof t && t.prototype) || U);
          }
          function cr(e) {
            return e == e && !x(e);
          }
          function ur(t, n) {
            return function (e) {
              return null != e && e[t] === n && (n !== Bi || t in m(e));
            };
          }
          function dr(i, a, s) {
            return (
              (a = C(a === Bi ? i.length - 1 : a, 0)),
              function () {
                for (
                  var e = arguments, t = -1, n = C(e.length - a, 0), r = S(n);
                  ++t < n;

                )
                  r[t] = e[a + t];
                for (var t = -1, o = S(a + 1); ++t < a; ) o[t] = e[t];
                return (o[a] = s(r)), aa(i, this, o);
              }
            );
          }
          function pr(e, t) {
            return t.length < 2 ? e : ht(e, s(t, 0, -1));
          }
          function fr(e, t) {
            if (
              ('constructor' !== t || 'function' != typeof e[t]) &&
              '__proto__' != t
            )
              return e[t];
          }
          var hr = yr(Ht),
            mr =
              pe ||
              function (e, t) {
                return ia.setTimeout(e, t);
              },
            gr = yr(t);
          function vr(e, t, n) {
            var r,
              o,
              i,
              t = t + '';
            return gr(
              e,
              ((o = (t = (t = e = t).match(ts)) ? t[1].split(ns) : []),
              (i = n),
              sa(xa, function (e) {
                var t = '_.' + e[0];
                i & e[1] && !Ps(o, t) && o.push(t);
              }),
              (t = o.sort()),
              (n = t.length)
                ? ((t[(r = n - 1)] = (1 < n ? '& ' : '') + t[r]),
                  (t = t.join(2 < n ? ', ' : ' ')),
                  e.replace(es, '{\n/* [wrapped with ' + t + '] */\n'))
                : e)
            );
          }
          function yr(n) {
            var r = 0,
              o = 0;
            return function () {
              var e = be(),
                t = 16 - (e - o);
              if (((o = e), 0 < t)) {
                if (800 <= ++r) return arguments[0];
              } else r = 0;
              return n.apply(Bi, arguments);
            };
          }
          function br(e, t) {
            var n = -1,
              r = e.length,
              o = r - 1;
            for (t = t === Bi ? r : t; ++n < t; ) {
              var i = At(n, o),
                a = e[i];
              (e[i] = e[n]), (e[n] = a);
            }
            return (e.length = t), e;
          }
          wr = (ue = uo(
            (ue = function (e) {
              var o = [];
              return (
                46 === e.charCodeAt(0) && o.push(''),
                e.replace(Za, function (e, t, n, r) {
                  o.push(n ? r.replace(is, '$1') : t || e);
                }),
                o
              );
            }),
            function (e) {
              return 500 === wr.size && wr.clear(), e;
            }
          )).cache;
          var wr,
            xr = ue;
          function Sr(e) {
            var t;
            return 'string' == typeof e || b(e)
              ? e
              : '0' == (t = e + '') && 1 / e == -1 / 0
              ? '-0'
              : t;
          }
          function kr(e) {
            if (null != e) {
              try {
                return Y.call(e);
              } catch (e) {}
              try {
                return e + '';
              } catch (e) {}
            }
            return '';
          }
          function Cr(e) {
            var t;
            return e instanceof v
              ? e.clone()
              : (((t = new g(e.__wrapped__, e.__chain__)).__actions__ = T(
                  e.__actions__
                )),
                (t.__index__ = e.__index__),
                (t.__values__ = e.__values__),
                t);
          }
          (i = a(function (e, t) {
            return w(e) ? rt(e, l(t, 1, w, !0)) : [];
          })),
            (Ce = a(function (e, t) {
              var n = r(t);
              return (
                w(n) && (n = Bi), w(e) ? rt(e, l(t, 1, w, !0), d(n, 2)) : []
              );
            })),
            (e = a(function (e, t) {
              var n = r(t);
              return w(n) && (n = Bi), w(e) ? rt(e, l(t, 1, w, !0), Bi, n) : [];
            }));
          function Er(e, t, n) {
            var r = null == e ? 0 : e.length;
            return r
              ? ((n = null == n ? 0 : _(n)) < 0 && (n = C(r + n, 0)),
                $s(e, d(t, 3), n))
              : -1;
          }
          function Tr(e, t, n) {
            var r,
              o = null == e ? 0 : e.length;
            return o
              ? ((r = o - 1),
                n !== Bi &&
                  ((r = _(n)), (r = n < 0 ? C(o + r, 0) : E(r, o - 1))),
                $s(e, d(t, 3), r, !0))
              : -1;
          }
          function _r(e) {
            return (null == e ? 0 : e.length) ? l(e, 1) : [];
          }
          function Rr(e) {
            return e && e.length ? e[0] : Bi;
          }
          (q = a(function (e) {
            var t = ca(e, rn);
            return t.length && t[0] === e[0] ? bt(t) : [];
          })),
            (pe = a(function (e) {
              var t = r(e),
                n = ca(e, rn);
              return (
                t === r(n) ? (t = Bi) : n.pop(),
                n.length && n[0] === e[0] ? bt(n, d(t, 2)) : []
              );
            })),
            (t = a(function (e) {
              var t = r(e),
                n = ca(e, rn);
              return (
                (t = 'function' == typeof t ? t : Bi) && n.pop(),
                n.length && n[0] === e[0] ? bt(n, Bi, t) : []
              );
            }));
          function r(e) {
            var t = null == e ? 0 : e.length;
            return t ? e[t - 1] : Bi;
          }
          ue = a(Or);
          function Or(e, t) {
            return e && e.length && t && t.length ? Lt(e, t) : e;
          }
          var Ir = Wn(function (e, t) {
            var n = null == e ? 0 : e.length,
              r = Qe(e, t);
            return (
              jt(
                e,
                ca(t, function (e) {
                  return or(e, n) ? +e : e;
                }).sort(fn)
              ),
              r
            );
          });
          function Mr(e) {
            return null == e ? e : Se.call(e);
          }
          var Dr = a(function (e) {
              return Zt(l(e, 1, w, !0));
            }),
            Nr = a(function (e) {
              var t = r(e);
              return w(t) && (t = Bi), Zt(l(e, 1, w, !0), d(t, 2));
            }),
            Pr = a(function (e) {
              var t = 'function' == typeof (t = r(e)) ? t : Bi;
              return Zt(l(e, 1, w, !0), Bi, t);
            });
          function zr(t) {
            var n;
            return t && t.length
              ? ((n = 0),
                (t = la(t, function (e) {
                  return w(e) && ((n = C(e.length, n)), 1);
                })),
                Ys(n, function (e) {
                  return ca(t, Ws(e));
                }))
              : [];
          }
          function Lr(e, t) {
            return e && e.length
              ? ((e = zr(e)),
                null == t
                  ? e
                  : ca(e, function (e) {
                      return aa(t, Bi, e);
                    }))
              : [];
          }
          var jr = a(function (e, t) {
              return w(e) ? rt(e, t) : [];
            }),
            Ar = a(function (e) {
              return tn(la(e, w));
            }),
            Fr = a(function (e) {
              var t = r(e);
              return w(t) && (t = Bi), tn(la(e, w), d(t, 2));
            }),
            $r = a(function (e) {
              var t = 'function' == typeof (t = r(e)) ? t : Bi;
              return tn(la(e, w), Bi, t);
            }),
            Br = a(zr);
          var Vr = a(function (e) {
            var t = e.length,
              t =
                'function' == typeof (t = 1 < t ? e[t - 1] : Bi)
                  ? (e.pop(), t)
                  : Bi;
            return Lr(e, t);
          });
          function Hr(e) {
            e = h(e);
            return (e.__chain__ = !0), e;
          }
          function Wr(e, t) {
            return t(e);
          }
          var Ur = Wn(function (t) {
            function e(e) {
              return Qe(e, t);
            }
            var n = t.length,
              r = n ? t[0] : 0,
              o = this.__wrapped__;
            return !(1 < n || this.__actions__.length) &&
              o instanceof v &&
              or(r)
              ? ((o = o.slice(r, +r + (n ? 1 : 0))).__actions__.push({
                  func: Wr,
                  args: [e],
                  thisArg: Bi,
                }),
                new g(o, this.__chain__).thru(function (e) {
                  return n && !e.length && e.push(Bi), e;
                }))
              : this.thru(e);
          });
          var qr = vn(function (e, t, n) {
            L.call(e, n) ? ++e[n] : Je(e, n, 1);
          });
          var Yr = En(Er),
            Kr = En(Tr);
          function Gr(e, t) {
            return ($(e) ? sa : ot)(e, d(t, 3));
          }
          function Zr(e, t) {
            return ($(e) ? Ds : it)(e, d(t, 3));
          }
          var Xr = vn(function (e, t, n) {
            L.call(e, n) ? e[n].push(t) : Je(e, n, [t]);
          });
          var Jr = a(function (e, t, n) {
              var r = -1,
                o = 'function' == typeof t,
                i = u(e) ? S(e.length) : [];
              return (
                ot(e, function (e) {
                  i[++r] = o ? aa(t, e, n) : wt(e, t, n);
                }),
                i
              );
            }),
            Qr = vn(function (e, t, n) {
              Je(e, n, t);
            });
          function eo(e, t) {
            return ($(e) ? ca : Ot)(e, d(t, 3));
          }
          var to = vn(
            function (e, t, n) {
              e[n ? 0 : 1].push(t);
            },
            function () {
              return [[], []];
            }
          );
          var no = a(function (e, t) {
              var n;
              return null == e
                ? []
                : (1 < (n = t.length) && p(e, t[0], t[1])
                    ? (t = [])
                    : 2 < n && p(t[0], t[1], t[2]) && (t = [t[0]]),
                  Pt(e, l(t, 1), []));
            }),
            ro =
              de ||
              function () {
                return ia.Date.now();
              };
          function oo(e, t, n) {
            return (
              (t = n ? Bi : t),
              (t = e && null == t ? e.length : t),
              Fn(e, Hi, Bi, Bi, Bi, Bi, t)
            );
          }
          function io(e, t) {
            var n;
            if ('function' != typeof t) throw new k(Vi);
            return (
              (e = _(e)),
              function () {
                return (
                  0 < --e && (n = t.apply(this, arguments)),
                  e <= 1 && (t = Bi),
                  n
                );
              }
            );
          }
          var ao = a(function (e, t, n) {
              var r,
                o = 1;
              return (
                n.length && ((r = ha(n, Gn(ao))), (o |= 32)), Fn(e, o, t, n, r)
              );
            }),
            so = a(function (e, t, n) {
              var r,
                o = 3;
              return (
                n.length && ((r = ha(n, Gn(so))), (o |= 32)), Fn(t, o, e, n, r)
              );
            });
          function lo(r, n, e) {
            var o,
              i,
              a,
              s,
              l,
              c,
              u = 0,
              d = !1,
              p = !1,
              t = !0;
            if ('function' != typeof r) throw new k(Vi);
            function f(e) {
              var t = o,
                n = i;
              return (o = i = Bi), (u = e), (s = r.apply(n, t));
            }
            function h(e) {
              var t = e - c;
              return c === Bi || n <= t || t < 0 || (p && a <= e - u);
            }
            function m() {
              var e,
                t = ro();
              if (h(t)) return g(t);
              l = mr(m, ((e = n - ((t = t) - c)), p ? E(e, a - (t - u)) : e));
            }
            function g(e) {
              return (l = Bi), t && o ? f(e) : ((o = i = Bi), s);
            }
            function v() {
              var e = ro(),
                t = h(e);
              if (((o = arguments), (i = this), (c = e), t)) {
                if (l === Bi) return (u = e = c), (l = mr(m, n)), d ? f(e) : s;
                if (p) return cn(l), (l = mr(m, n)), f(c);
              }
              return l === Bi && (l = mr(m, n)), s;
            }
            return (
              (n = R(n) || 0),
              x(e) &&
                ((d = !!e.leading),
                (p = 'maxWait' in e),
                (a = p ? C(R(e.maxWait) || 0, n) : a),
                (t = 'trailing' in e ? !!e.trailing : t)),
              (v.cancel = function () {
                l !== Bi && cn(l), (u = 0), (o = c = i = l = Bi);
              }),
              (v.flush = function () {
                return l === Bi ? s : g(ro());
              }),
              v
            );
          }
          var de = a(function (e, t) {
              return nt(e, 1, t);
            }),
            co = a(function (e, t, n) {
              return nt(e, R(t) || 0, n);
            });
          function uo(r, o) {
            if ('function' != typeof r || (null != o && 'function' != typeof o))
              throw new k(Vi);
            function i() {
              var e = arguments,
                t = o ? o.apply(this, e) : e[0],
                n = i.cache;
              return n.has(t)
                ? n.get(t)
                : ((e = r.apply(this, e)), (i.cache = n.set(t, e) || n), e);
            }
            return (i.cache = new (uo.Cache || Be)()), i;
          }
          function po(t) {
            if ('function' != typeof t) throw new k(Vi);
            return function () {
              var e = arguments;
              switch (e.length) {
                case 0:
                  return !t.call(this);
                case 1:
                  return !t.call(this, e[0]);
                case 2:
                  return !t.call(this, e[0], e[1]);
                case 3:
                  return !t.call(this, e[0], e[1], e[2]);
              }
              return !t.apply(this, e);
            };
          }
          uo.Cache = Be;
          var sn = sn(function (r, o) {
              var i = (o =
                1 == o.length && $(o[0])
                  ? ca(o[0], pa(d()))
                  : ca(l(o, 1), pa(d()))).length;
              return a(function (e) {
                for (var t = -1, n = E(e.length, i); ++t < n; )
                  e[t] = o[t].call(this, e[t]);
                return aa(r, this, e);
              });
            }),
            fo = a(function (e, t) {
              var n = ha(t, Gn(fo));
              return Fn(e, 32, Bi, t, n);
            }),
            ho = a(function (e, t) {
              var n = ha(t, Gn(ho));
              return Fn(e, 64, Bi, t, n);
            }),
            mo = Wn(function (e, t) {
              return Fn(e, 256, Bi, Bi, Bi, t);
            });
          function F(e, t) {
            return e === t || (e != e && t != t);
          }
          var go = Pn(gt),
            vo = Pn(function (e, t) {
              return t <= e;
            }),
            yo = xt(
              (function () {
                return arguments;
              })()
            )
              ? xt
              : function (e) {
                  return B(e) && L.call(e, 'callee') && !oe.call(e, 'callee');
                },
            $ = S.isArray,
            bo = Es
              ? pa(Es)
              : function (e) {
                  return B(e) && n(e) == Ra;
                };
          function u(e) {
            return null != e && Co(e.length) && !So(e);
          }
          function w(e) {
            return B(e) && u(e);
          }
          var wo = W || Di,
            W = Ts
              ? pa(Ts)
              : function (e) {
                  return B(e) && n(e) == Ki;
                };
          function xo(e) {
            var t;
            return (
              !!B(e) &&
              ((t = n(e)) == ka ||
                '[object DOMException]' == t ||
                ('string' == typeof e.message &&
                  'string' == typeof e.name &&
                  !_o(e)))
            );
          }
          function So(e) {
            return (
              !!x(e) &&
              ((e = n(e)) == Ca ||
                e == Ea ||
                '[object AsyncFunction]' == e ||
                '[object Proxy]' == e)
            );
          }
          function ko(e) {
            return 'number' == typeof e && e == _(e);
          }
          function Co(e) {
            return 'number' == typeof e && -1 < e && e % 1 == 0 && e <= Wi;
          }
          function x(e) {
            var t = typeof e;
            return null != e && ('object' == t || 'function' == t);
          }
          function B(e) {
            return null != e && 'object' == typeof e;
          }
          var Eo = _s
            ? pa(_s)
            : function (e) {
                return B(e) && A(e) == Gi;
              };
          function To(e) {
            return 'number' == typeof e || (B(e) && n(e) == Zi);
          }
          function _o(e) {
            return (
              !(!B(e) || n(e) != Xi) &&
              (null === (e = ne(e)) ||
                ('function' ==
                  typeof (e = L.call(e, 'constructor') && e.constructor) &&
                  e instanceof e &&
                  Y.call(e) == X))
            );
          }
          var Ro = Rs
            ? pa(Rs)
            : function (e) {
                return B(e) && n(e) == Ji;
              };
          var Oo = Os
            ? pa(Os)
            : function (e) {
                return B(e) && A(e) == Qi;
              };
          function Io(e) {
            return 'string' == typeof e || (!$(e) && B(e) && n(e) == ea);
          }
          function b(e) {
            return 'symbol' == typeof e || (B(e) && n(e) == _a);
          }
          var Mo = Is
            ? pa(Is)
            : function (e) {
                return B(e) && Co(e.length) && !!ra[n(e)];
              };
          var Do = Pn(Rt),
            No = Pn(function (e, t) {
              return e <= t;
            });
          function Po(e) {
            if (!e) return [];
            if (u(e)) return (Io(e) ? ga : T)(e);
            if (se && e[se]) {
              for (var t, n = e[se](), r = []; !(t = n.next()).done; )
                r.push(t.value);
              return r;
            }
            var o = A(e);
            return (o == Gi ? nl : o == Qi ? ol : ri)(e);
          }
          function zo(e) {
            return e
              ? (e = R(e)) === 1 / 0 || e === -1 / 0
                ? 17976931348623157e292 * (e < 0 ? -1 : 1)
                : e == e
                ? e
                : 0
              : 0 === e
              ? e
              : 0;
          }
          function _(e) {
            var e = zo(e),
              t = e % 1;
            return e == e ? (t ? e - t : e) : 0;
          }
          function Lo(e) {
            return e ? et(_(e), 0, Ui) : 0;
          }
          function R(e) {
            if ('number' == typeof e) return e;
            if (b(e)) return wa;
            if (
              'string' !=
              typeof (e = x(e)
                ? x((t = 'function' == typeof e.valueOf ? e.valueOf() : e))
                  ? t + ''
                  : t
                : e)
            )
              return 0 === e ? e : +e;
            e = Ks(e);
            var t = cs.test(e);
            return t || ds.test(e)
              ? ks(e.slice(2), t ? 2 : 8)
              : ls.test(e)
              ? wa
              : +e;
          }
          function jo(e) {
            return gn(e, I(e));
          }
          function f(e) {
            return null == e ? '' : c(e);
          }
          var Ao = yn(function (e, t) {
              if (lr(t) || u(t)) gn(t, O(t), e);
              else for (var n in t) L.call(t, n) && Ke(e, n, t[n]);
            }),
            Fo = yn(function (e, t) {
              gn(t, I(t), e);
            }),
            $o = yn(function (e, t, n, r) {
              gn(t, I(t), e, r);
            }),
            Bo = yn(function (e, t, n, r) {
              gn(t, O(t), e, r);
            }),
            Vo = Wn(Qe);
          var Ho = a(function (e, t) {
              e = m(e);
              var n = -1,
                r = t.length,
                o = 2 < r ? t[2] : Bi;
              for (o && p(t[0], t[1], o) && (r = 1); ++n < r; )
                for (var i = t[n], a = I(i), s = -1, l = a.length; ++s < l; ) {
                  var c = a[s],
                    u = e[c];
                  (u === Bi || (F(u, U[c]) && !L.call(e, c))) && (e[c] = i[c]);
                }
              return e;
            }),
            Wo = a(function (e) {
              return e.push(Bi, Bn), aa(Xo, Bi, e);
            });
          function Uo(e, t, n) {
            e = null == e ? Bi : ht(e, t);
            return e === Bi ? n : e;
          }
          function qo(e, t) {
            return null != e && tr(e, t, yt);
          }
          var Yo = Rn(function (e, t, n) {
              e[
                (t =
                  null != t && 'function' != typeof t.toString ? Z.call(t) : t)
              ] = n;
            }, vi(M)),
            Ko = Rn(function (e, t, n) {
              null != t && 'function' != typeof t.toString && (t = Z.call(t)),
                L.call(e, t) ? e[t].push(n) : (e[t] = [n]);
            }, d),
            Go = a(wt);
          function O(e) {
            return (u(e) ? He : Tt)(e);
          }
          function I(e) {
            return u(e) ? He(e, !0) : _t(e);
          }
          var Zo = yn(function (e, t, n) {
              Dt(e, t, n);
            }),
            Xo = yn(function (e, t, n, r) {
              Dt(e, t, n, r);
            }),
            Jo = Wn(function (t, e) {
              var n = {};
              if (null != t)
                for (
                  var r = !1,
                    o =
                      ((e = ca(e, function (e) {
                        return (e = an(e, t)), (r = r || 1 < e.length), e;
                      })),
                      gn(t, qn(t), n),
                      r && (n = y(n, 7, Vn)),
                      e.length);
                  o--;

                )
                  Xt(n, e[o]);
              return n;
            });
          var Qo = Wn(function (e, t) {
            return null == e
              ? {}
              : zt((n = e), t, function (e, t) {
                  return qo(n, t);
                });
            var n;
          });
          function ei(e, n) {
            var t;
            return null == e
              ? {}
              : ((t = ca(qn(e), function (e) {
                  return [e];
                })),
                (n = d(n)),
                zt(e, t, function (e, t) {
                  return n(e, t[0]);
                }));
          }
          var ti = An(O),
            ni = An(I);
          function ri(e) {
            return null == e ? [] : Gs(e, O(e));
          }
          var oi = Sn(function (e, t, n) {
            return (t = t.toLowerCase()), e + (n ? ii(t) : t);
          });
          function ii(e) {
            return fi(f(e).toLowerCase());
          }
          function ai(e) {
            return (e = f(e)) && e.replace(fs, Qs).replace(vs, '');
          }
          var si = Sn(function (e, t, n) {
              return e + (n ? '-' : '') + t.toLowerCase();
            }),
            li = Sn(function (e, t, n) {
              return e + (n ? ' ' : '') + t.toLowerCase();
            }),
            ci = xn('toLowerCase');
          var ui = Sn(function (e, t, n) {
            return e + (n ? '_' : '') + t.toLowerCase();
          });
          var di = Sn(function (e, t, n) {
            return e + (n ? ' ' : '') + fi(t);
          });
          var pi = Sn(function (e, t, n) {
              return e + (n ? ' ' : '') + t.toUpperCase();
            }),
            fi = xn('toUpperCase');
          function hi(e, t, n) {
            return (
              (e = f(e)),
              (t = n ? Bi : t) === Bi
                ? ((n = e), bs.test(n) ? e.match(ys) || [] : e.match(rs) || [])
                : e.match(t) || []
            );
          }
          var mi = a(function (e, t) {
              try {
                return aa(e, Bi, t);
              } catch (e) {
                return xo(e) ? e : new D(e);
              }
            }),
            gi = Wn(function (t, e) {
              return (
                sa(e, function (e) {
                  (e = Sr(e)), Je(t, e, ao(t[e], t));
                }),
                t
              );
            });
          function vi(e) {
            return function () {
              return e;
            };
          }
          var yi = Tn(),
            bi = Tn(!0);
          function M(e) {
            return e;
          }
          function wi(e) {
            return Et('function' == typeof e ? e : y(e, 1));
          }
          var xi = a(function (t, n) {
              return function (e) {
                return wt(e, t, n);
              };
            }),
            Si = a(function (t, n) {
              return function (e) {
                return wt(t, e, n);
              };
            });
          function ki(r, t, e) {
            var n = O(t),
              o = ft(t, n),
              i =
                (null != e ||
                  (x(t) && (o.length || !n.length)) ||
                  ((e = t), (t = r), (r = this), (o = ft(t, O(t)))),
                !(x(e) && 'chain' in e && !e.chain)),
              a = So(r);
            return (
              sa(o, function (e) {
                var n = t[e];
                (r[e] = n),
                  a &&
                    (r.prototype[e] = function () {
                      var e,
                        t = this.__chain__;
                      return i || t
                        ? (((e = r(this.__wrapped__)).__actions__ = T(
                            this.__actions__
                          )).push({ func: n, args: arguments, thisArg: r }),
                          (e.__chain__ = t),
                          e)
                        : n.apply(r, ua([this.value()], arguments));
                    });
              }),
              r
            );
          }
          function Ci() {}
          var Ei = In(ca),
            Ti = In(Ns),
            _i = In(As);
          function Ri(e) {
            return ir(e)
              ? Ws(Sr(e))
              : ((t = e),
                function (e) {
                  return ht(e, t);
                });
            var t;
          }
          var Oi = Nn(),
            Ii = Nn(!0);
          function Mi() {
            return [];
          }
          function Di() {
            return !1;
          }
          var Ni = On(function (e, t) {
              return e + t;
            }, 0),
            Pi = Ln('ceil'),
            zi = On(function (e, t) {
              return e / t;
            }, 1),
            Li = Ln('floor');
          var ji,
            Ai = On(function (e, t) {
              return e * t;
            }, 1),
            Fi = Ln('round'),
            $i = On(function (e, t) {
              return e - t;
            }, 0);
          return (
            (h.after = function (e, t) {
              if ('function' != typeof t) throw new k(Vi);
              return (
                (e = _(e)),
                function () {
                  if (--e < 1) return t.apply(this, arguments);
                }
              );
            }),
            (h.ary = oo),
            (h.assign = Ao),
            (h.assignIn = Fo),
            (h.assignInWith = $o),
            (h.assignWith = Bo),
            (h.at = Vo),
            (h.before = io),
            (h.bind = ao),
            (h.bindAll = gi),
            (h.bindKey = so),
            (h.castArray = function () {
              var e;
              return arguments.length ? ($((e = arguments[0])) ? e : [e]) : [];
            }),
            (h.chain = Hr),
            (h.chunk = function (e, t, n) {
              t = (n ? p(e, t, n) : t === Bi) ? 1 : C(_(t), 0);
              var r = null == e ? 0 : e.length;
              if (!r || t < 1) return [];
              for (var o = 0, i = 0, a = S(fe(r / t)); o < r; )
                a[i++] = s(e, o, (o += t));
              return a;
            }),
            (h.compact = function (e) {
              for (
                var t = -1, n = null == e ? 0 : e.length, r = 0, o = [];
                ++t < n;

              ) {
                var i = e[t];
                i && (o[r++] = i);
              }
              return o;
            }),
            (h.concat = function () {
              var e = arguments.length;
              if (!e) return [];
              for (var t = S(e - 1), n = arguments[0], r = e; r--; )
                t[r - 1] = arguments[r];
              return ua($(n) ? T(n) : [n], l(t, 1));
            }),
            (h.cond = function (r) {
              var o = null == r ? 0 : r.length,
                t = d();
              return (
                (r = o
                  ? ca(r, function (e) {
                      if ('function' != typeof e[1]) throw new k(Vi);
                      return [t(e[0]), e[1]];
                    })
                  : []),
                a(function (e) {
                  for (var t = -1; ++t < o; ) {
                    var n = r[t];
                    if (aa(n[0], this, e)) return aa(n[1], this, e);
                  }
                })
              );
            }),
            (h.conforms = function (e) {
              return (
                (t = y(e, 1)),
                (n = O(t)),
                function (e) {
                  return tt(e, t, n);
                }
              );
              var t, n;
            }),
            (h.constant = vi),
            (h.countBy = qr),
            (h.create = function (e, t) {
              return (e = Le(e)), null == t ? e : Xe(e, t);
            }),
            (h.curry = function e(t, n, r) {
              t = Fn(t, 8, Bi, Bi, Bi, Bi, Bi, (n = r ? Bi : n));
              return (t.placeholder = e.placeholder), t;
            }),
            (h.curryRight = function e(t, n, r) {
              t = Fn(t, 16, Bi, Bi, Bi, Bi, Bi, (n = r ? Bi : n));
              return (t.placeholder = e.placeholder), t;
            }),
            (h.debounce = lo),
            (h.defaults = Ho),
            (h.defaultsDeep = Wo),
            (h.defer = de),
            (h.delay = co),
            (h.difference = i),
            (h.differenceBy = Ce),
            (h.differenceWith = e),
            (h.drop = function (e, t, n) {
              var r = null == e ? 0 : e.length;
              return r
                ? s(e, (t = n || t === Bi ? 1 : _(t)) < 0 ? 0 : t, r)
                : [];
            }),
            (h.dropRight = function (e, t, n) {
              var r = null == e ? 0 : e.length;
              return r
                ? s(e, 0, (t = r - (t = n || t === Bi ? 1 : _(t))) < 0 ? 0 : t)
                : [];
            }),
            (h.dropRightWhile = function (e, t) {
              return e && e.length ? Qt(e, d(t, 3), !0, !0) : [];
            }),
            (h.dropWhile = function (e, t) {
              return e && e.length ? Qt(e, d(t, 3), !0) : [];
            }),
            (h.fill = function (e, t, n, r) {
              if (!(l = null == e ? 0 : e.length)) return [];
              n && 'number' != typeof n && p(e, t, n) && ((n = 0), (r = l));
              var o = e,
                i = t,
                a = n,
                s = r,
                l = o.length;
              for (
                (a = _(a)) < 0 && (a = l < -a ? 0 : l + a),
                  (s = s === Bi || l < s ? l : _(s)) < 0 && (s += l),
                  s = s < a ? 0 : Lo(s);
                a < s;

              )
                o[a++] = i;
              return o;
            }),
            (h.filter = function (e, t) {
              return ($(e) ? la : lt)(e, d(t, 3));
            }),
            (h.flatMap = function (e, t) {
              return l(eo(e, t), 1);
            }),
            (h.flatMapDeep = function (e, t) {
              return l(eo(e, t), 1 / 0);
            }),
            (h.flatMapDepth = function (e, t, n) {
              return (n = n === Bi ? 1 : _(n)), l(eo(e, t), n);
            }),
            (h.flatten = _r),
            (h.flattenDeep = function (e) {
              return (null == e ? 0 : e.length) ? l(e, 1 / 0) : [];
            }),
            (h.flattenDepth = function (e, t) {
              return (null == e ? 0 : e.length)
                ? l(e, (t = t === Bi ? 1 : _(t)))
                : [];
            }),
            (h.flip = function (e) {
              return Fn(e, 512);
            }),
            (h.flow = yi),
            (h.flowRight = bi),
            (h.fromPairs = function (e) {
              for (
                var t = -1, n = null == e ? 0 : e.length, r = {};
                ++t < n;

              ) {
                var o = e[t];
                r[o[0]] = o[1];
              }
              return r;
            }),
            (h.functions = function (e) {
              return null == e ? [] : ft(e, O(e));
            }),
            (h.functionsIn = function (e) {
              return null == e ? [] : ft(e, I(e));
            }),
            (h.groupBy = Xr),
            (h.initial = function (e) {
              return (null == e ? 0 : e.length) ? s(e, 0, -1) : [];
            }),
            (h.intersection = q),
            (h.intersectionBy = pe),
            (h.intersectionWith = t),
            (h.invert = Yo),
            (h.invertBy = Ko),
            (h.invokeMap = Jr),
            (h.iteratee = wi),
            (h.keyBy = Qr),
            (h.keys = O),
            (h.keysIn = I),
            (h.map = eo),
            (h.mapKeys = function (e, r) {
              var o = {};
              return (
                (r = d(r, 3)),
                dt(e, function (e, t, n) {
                  Je(o, r(e, t, n), e);
                }),
                o
              );
            }),
            (h.mapValues = function (e, r) {
              var o = {};
              return (
                (r = d(r, 3)),
                dt(e, function (e, t, n) {
                  Je(o, t, r(e, t, n));
                }),
                o
              );
            }),
            (h.matches = function (e) {
              return It(y(e, 1));
            }),
            (h.matchesProperty = function (e, t) {
              return Mt(e, y(t, 1));
            }),
            (h.memoize = uo),
            (h.merge = Zo),
            (h.mergeWith = Xo),
            (h.method = xi),
            (h.methodOf = Si),
            (h.mixin = ki),
            (h.negate = po),
            (h.nthArg = function (t) {
              return (
                (t = _(t)),
                a(function (e) {
                  return Nt(e, t);
                })
              );
            }),
            (h.omit = Jo),
            (h.omitBy = function (e, t) {
              return ei(e, po(d(t)));
            }),
            (h.once = function (e) {
              return io(2, e);
            }),
            (h.orderBy = function (e, t, n, r) {
              return null == e
                ? []
                : Pt(
                    e,
                    (t = $(t) ? t : null == t ? [] : [t]),
                    (n = $((n = r ? Bi : n)) ? n : null == n ? [] : [n])
                  );
            }),
            (h.over = Ei),
            (h.overArgs = sn),
            (h.overEvery = Ti),
            (h.overSome = _i),
            (h.partial = fo),
            (h.partialRight = ho),
            (h.partition = to),
            (h.pick = Qo),
            (h.pickBy = ei),
            (h.property = Ri),
            (h.propertyOf = function (t) {
              return function (e) {
                return null == t ? Bi : ht(t, e);
              };
            }),
            (h.pull = ue),
            (h.pullAll = Or),
            (h.pullAllBy = function (e, t, n) {
              return e && e.length && t && t.length ? Lt(e, t, d(n, 2)) : e;
            }),
            (h.pullAllWith = function (e, t, n) {
              return e && e.length && t && t.length ? Lt(e, t, Bi, n) : e;
            }),
            (h.pullAt = Ir),
            (h.range = Oi),
            (h.rangeRight = Ii),
            (h.rearg = mo),
            (h.reject = function (e, t) {
              return ($(e) ? la : lt)(e, po(d(t, 3)));
            }),
            (h.remove = function (e, t) {
              var n = [];
              if (e && e.length) {
                var r = -1,
                  o = [],
                  i = e.length;
                for (t = d(t, 3); ++r < i; ) {
                  var a = e[r];
                  t(a, r, e) && (n.push(a), o.push(r));
                }
                jt(e, o);
              }
              return n;
            }),
            (h.rest = function (e, t) {
              if ('function' != typeof e) throw new k(Vi);
              return a(e, (t = t === Bi ? t : _(t)));
            }),
            (h.reverse = Mr),
            (h.sampleSize = function (e, t, n) {
              return (
                (t = (n ? p(e, t, n) : t === Bi) ? 1 : _(t)),
                ($(e) ? Ue : Bt)(e, t)
              );
            }),
            (h.set = function (e, t, n) {
              return null == e ? e : Vt(e, t, n);
            }),
            (h.setWith = function (e, t, n, r) {
              return (
                (r = 'function' == typeof r ? r : Bi),
                null == e ? e : Vt(e, t, n, r)
              );
            }),
            (h.shuffle = function (e) {
              return ($(e) ? qe : Wt)(e);
            }),
            (h.slice = function (e, t, n) {
              var r = null == e ? 0 : e.length;
              return r
                ? ((n =
                    n && 'number' != typeof n && p(e, t, n)
                      ? ((t = 0), r)
                      : ((t = null == t ? 0 : _(t)), n === Bi ? r : _(n))),
                  s(e, t, n))
                : [];
            }),
            (h.sortBy = no),
            (h.sortedUniq = function (e) {
              return e && e.length ? Kt(e) : [];
            }),
            (h.sortedUniqBy = function (e, t) {
              return e && e.length ? Kt(e, d(t, 2)) : [];
            }),
            (h.split = function (e, t, n) {
              return (
                n && 'number' != typeof n && p(e, t, n) && (t = n = Bi),
                (n = n === Bi ? Ui : n >>> 0)
                  ? (e = f(e)) &&
                    ('string' == typeof t || (null != t && !Ro(t))) &&
                    !(t = c(t)) &&
                    fa(e)
                    ? ln(ga(e), 0, n)
                    : e.split(t, n)
                  : []
              );
            }),
            (h.spread = function (n, r) {
              if ('function' != typeof n) throw new k(Vi);
              return (
                (r = null == r ? 0 : C(_(r), 0)),
                a(function (e) {
                  var t = e[r],
                    e = ln(e, 0, r);
                  return t && ua(e, t), aa(n, this, e);
                })
              );
            }),
            (h.tail = function (e) {
              var t = null == e ? 0 : e.length;
              return t ? s(e, 1, t) : [];
            }),
            (h.take = function (e, t, n) {
              return e && e.length
                ? s(e, 0, (t = n || t === Bi ? 1 : _(t)) < 0 ? 0 : t)
                : [];
            }),
            (h.takeRight = function (e, t, n) {
              var r = null == e ? 0 : e.length;
              return r
                ? s(e, (t = r - (t = n || t === Bi ? 1 : _(t))) < 0 ? 0 : t, r)
                : [];
            }),
            (h.takeRightWhile = function (e, t) {
              return e && e.length ? Qt(e, d(t, 3), !1, !0) : [];
            }),
            (h.takeWhile = function (e, t) {
              return e && e.length ? Qt(e, d(t, 3)) : [];
            }),
            (h.tap = function (e, t) {
              return t(e), e;
            }),
            (h.throttle = function (e, t, n) {
              var r = !0,
                o = !0;
              if ('function' != typeof e) throw new k(Vi);
              return (
                x(n) &&
                  ((r = 'leading' in n ? !!n.leading : r),
                  (o = 'trailing' in n ? !!n.trailing : o)),
                lo(e, t, { leading: r, maxWait: t, trailing: o })
              );
            }),
            (h.thru = Wr),
            (h.toArray = Po),
            (h.toPairs = ti),
            (h.toPairsIn = ni),
            (h.toPath = function (e) {
              return $(e) ? ca(e, Sr) : b(e) ? [e] : T(xr(f(e)));
            }),
            (h.toPlainObject = jo),
            (h.transform = function (e, r, o) {
              var t,
                n = $(e),
                i = n || wo(e) || Mo(e);
              return (
                (r = d(r, 4)),
                null == o &&
                  ((t = e && e.constructor),
                  (o = i
                    ? n
                      ? new t()
                      : []
                    : x(e) && So(t)
                    ? Le(ne(e))
                    : {})),
                (i ? sa : dt)(e, function (e, t, n) {
                  return r(o, e, t, n);
                }),
                o
              );
            }),
            (h.unary = function (e) {
              return oo(e, 1);
            }),
            (h.union = Dr),
            (h.unionBy = Nr),
            (h.unionWith = Pr),
            (h.uniq = function (e) {
              return e && e.length ? Zt(e) : [];
            }),
            (h.uniqBy = function (e, t) {
              return e && e.length ? Zt(e, d(t, 2)) : [];
            }),
            (h.uniqWith = function (e, t) {
              return (
                (t = 'function' == typeof t ? t : Bi),
                e && e.length ? Zt(e, Bi, t) : []
              );
            }),
            (h.unset = function (e, t) {
              return null == e || Xt(e, t);
            }),
            (h.unzip = zr),
            (h.unzipWith = Lr),
            (h.update = function (e, t, n) {
              return null == e ? e : Jt(e, t, on(n));
            }),
            (h.updateWith = function (e, t, n, r) {
              return (
                (r = 'function' == typeof r ? r : Bi),
                null == e ? e : Jt(e, t, on(n), r)
              );
            }),
            (h.values = ri),
            (h.valuesIn = function (e) {
              return null == e ? [] : Gs(e, I(e));
            }),
            (h.without = jr),
            (h.words = hi),
            (h.wrap = function (e, t) {
              return fo(on(t), e);
            }),
            (h.xor = Ar),
            (h.xorBy = Fr),
            (h.xorWith = $r),
            (h.zip = Br),
            (h.zipObject = function (e, t) {
              return nn(e || [], t || [], Ke);
            }),
            (h.zipObjectDeep = function (e, t) {
              return nn(e || [], t || [], Vt);
            }),
            (h.zipWith = Vr),
            (h.entries = ti),
            (h.entriesIn = ni),
            (h.extend = Fo),
            (h.extendWith = $o),
            ki(h, h),
            (h.add = Ni),
            (h.attempt = mi),
            (h.camelCase = oi),
            (h.capitalize = ii),
            (h.ceil = Pi),
            (h.clamp = function (e, t, n) {
              return (
                n === Bi && ((n = t), (t = Bi)),
                n !== Bi && (n = (n = R(n)) == n ? n : 0),
                t !== Bi && (t = (t = R(t)) == t ? t : 0),
                et(R(e), t, n)
              );
            }),
            (h.clone = function (e) {
              return y(e, 4);
            }),
            (h.cloneDeep = function (e) {
              return y(e, 5);
            }),
            (h.cloneDeepWith = function (e, t) {
              return y(e, 5, (t = 'function' == typeof t ? t : Bi));
            }),
            (h.cloneWith = function (e, t) {
              return y(e, 4, (t = 'function' == typeof t ? t : Bi));
            }),
            (h.conformsTo = function (e, t) {
              return null == t || tt(e, t, O(t));
            }),
            (h.deburr = ai),
            (h.defaultTo = function (e, t) {
              return null == e || e != e ? t : e;
            }),
            (h.divide = zi),
            (h.endsWith = function (e, t, n) {
              (e = f(e)), (t = c(t));
              var r = e.length,
                r = (n = n === Bi ? r : et(_(n), 0, r));
              return 0 <= (n -= t.length) && e.slice(n, r) == t;
            }),
            (h.eq = F),
            (h.escape = function (e) {
              return (e = f(e)) && Wa.test(e) ? e.replace(Va, el) : e;
            }),
            (h.escapeRegExp = function (e) {
              return (e = f(e)) && Ja.test(e) ? e.replace(Xa, '\\$&') : e;
            }),
            (h.every = function (e, t, n) {
              return ($(e) ? Ns : at)(e, d((t = n && p(e, t, n) ? Bi : t), 3));
            }),
            (h.find = Yr),
            (h.findIndex = Er),
            (h.findKey = function (e, t) {
              return Fs(e, d(t, 3), dt);
            }),
            (h.findLast = Kr),
            (h.findLastIndex = Tr),
            (h.findLastKey = function (e, t) {
              return Fs(e, d(t, 3), pt);
            }),
            (h.floor = Li),
            (h.forEach = Gr),
            (h.forEachRight = Zr),
            (h.forIn = function (e, t) {
              return null == e ? e : ct(e, d(t, 3), I);
            }),
            (h.forInRight = function (e, t) {
              return null == e ? e : ut(e, d(t, 3), I);
            }),
            (h.forOwn = function (e, t) {
              return e && dt(e, d(t, 3));
            }),
            (h.forOwnRight = function (e, t) {
              return e && pt(e, d(t, 3));
            }),
            (h.get = Uo),
            (h.gt = go),
            (h.gte = vo),
            (h.has = function (e, t) {
              return null != e && tr(e, t, vt);
            }),
            (h.hasIn = qo),
            (h.head = Rr),
            (h.identity = M),
            (h.includes = function (e, t, n, r) {
              return (
                (e = u(e) ? e : ri(e)),
                (n = n && !r ? _(n) : 0),
                (r = e.length),
                n < 0 && (n = C(r + n, 0)),
                Io(e) ? n <= r && -1 < e.indexOf(t, n) : !!r && -1 < da(e, t, n)
              );
            }),
            (h.indexOf = function (e, t, n) {
              var r = null == e ? 0 : e.length;
              return r
                ? da(
                    e,
                    t,
                    (e = (e = null == n ? 0 : _(n)) < 0 ? C(r + e, 0) : e)
                  )
                : -1;
            }),
            (h.inRange = function (e, t, n) {
              return (
                (t = zo(t)),
                n === Bi ? ((n = t), (t = 0)) : (n = zo(n)),
                (e = e = R(e)) >= E((t = t), (n = n)) && e < C(t, n)
              );
            }),
            (h.invoke = Go),
            (h.isArguments = yo),
            (h.isArray = $),
            (h.isArrayBuffer = bo),
            (h.isArrayLike = u),
            (h.isArrayLikeObject = w),
            (h.isBoolean = function (e) {
              return !0 === e || !1 === e || (B(e) && n(e) == Yi);
            }),
            (h.isBuffer = wo),
            (h.isDate = W),
            (h.isElement = function (e) {
              return B(e) && 1 === e.nodeType && !_o(e);
            }),
            (h.isEmpty = function (e) {
              if (null != e) {
                if (
                  u(e) &&
                  ($(e) ||
                    'string' == typeof e ||
                    'function' == typeof e.splice ||
                    wo(e) ||
                    Mo(e) ||
                    yo(e))
                )
                  return !e.length;
                var t,
                  n = A(e);
                if (n == Gi || n == Qi) return !e.size;
                if (lr(e)) return !Tt(e).length;
                for (t in e) if (L.call(e, t)) return !1;
              }
              return !0;
            }),
            (h.isEqual = function (e, t) {
              return St(e, t);
            }),
            (h.isEqualWith = function (e, t, n) {
              var r = (n = 'function' == typeof n ? n : Bi) ? n(e, t) : Bi;
              return r === Bi ? St(e, t, Bi, n) : !!r;
            }),
            (h.isError = xo),
            (h.isFinite = function (e) {
              return 'number' == typeof e && ge(e);
            }),
            (h.isFunction = So),
            (h.isInteger = ko),
            (h.isLength = Co),
            (h.isMap = Eo),
            (h.isMatch = function (e, t) {
              return e === t || kt(e, t, Xn(t));
            }),
            (h.isMatchWith = function (e, t, n) {
              return (n = 'function' == typeof n ? n : Bi), kt(e, t, Xn(t), n);
            }),
            (h.isNaN = function (e) {
              return To(e) && e != +e;
            }),
            (h.isNative = function (e) {
              if (sr(e))
                throw new D(
                  'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.'
                );
              return Ct(e);
            }),
            (h.isNil = function (e) {
              return null == e;
            }),
            (h.isNull = function (e) {
              return null === e;
            }),
            (h.isNumber = To),
            (h.isObject = x),
            (h.isObjectLike = B),
            (h.isPlainObject = _o),
            (h.isRegExp = Ro),
            (h.isSafeInteger = function (e) {
              return ko(e) && -Wi <= e && e <= Wi;
            }),
            (h.isSet = Oo),
            (h.isString = Io),
            (h.isSymbol = b),
            (h.isTypedArray = Mo),
            (h.isUndefined = function (e) {
              return e === Bi;
            }),
            (h.isWeakMap = function (e) {
              return B(e) && A(e) == ta;
            }),
            (h.isWeakSet = function (e) {
              return B(e) && '[object WeakSet]' == n(e);
            }),
            (h.join = function (e, t) {
              return null == e ? '' : ve.call(e, t);
            }),
            (h.kebabCase = si),
            (h.last = r),
            (h.lastIndexOf = function (e, t, n) {
              var r = null == e ? 0 : e.length;
              if (!r) return -1;
              var o = r;
              if (
                (n !== Bi && (o = (o = _(n)) < 0 ? C(r + o, 0) : E(o, r - 1)),
                t != t)
              )
                return $s(e, Vs, o, !0);
              for (var i = e, a = t, s = o + 1; s--; ) if (i[s] === a) return s;
              return s;
            }),
            (h.lowerCase = li),
            (h.lowerFirst = ci),
            (h.lt = Do),
            (h.lte = No),
            (h.max = function (e) {
              return e && e.length ? st(e, M, gt) : Bi;
            }),
            (h.maxBy = function (e, t) {
              return e && e.length ? st(e, d(t, 2), gt) : Bi;
            }),
            (h.mean = function (e) {
              return Hs(e, M);
            }),
            (h.meanBy = function (e, t) {
              return Hs(e, d(t, 2));
            }),
            (h.min = function (e) {
              return e && e.length ? st(e, M, Rt) : Bi;
            }),
            (h.minBy = function (e, t) {
              return e && e.length ? st(e, d(t, 2), Rt) : Bi;
            }),
            (h.stubArray = Mi),
            (h.stubFalse = Di),
            (h.stubObject = function () {
              return {};
            }),
            (h.stubString = function () {
              return '';
            }),
            (h.stubTrue = function () {
              return !0;
            }),
            (h.multiply = Ai),
            (h.nth = function (e, t) {
              return e && e.length ? Nt(e, _(t)) : Bi;
            }),
            (h.noConflict = function () {
              return ia._ === this && (ia._ = J), this;
            }),
            (h.noop = Ci),
            (h.now = ro),
            (h.pad = function (e, t, n) {
              e = f(e);
              var r = (t = _(t)) ? ma(e) : 0;
              return !t || t <= r
                ? e
                : Mn(he((t = (t - r) / 2)), n) + e + Mn(fe(t), n);
            }),
            (h.padEnd = function (e, t, n) {
              e = f(e);
              var r = (t = _(t)) ? ma(e) : 0;
              return t && r < t ? e + Mn(t - r, n) : e;
            }),
            (h.padStart = function (e, t, n) {
              e = f(e);
              var r = (t = _(t)) ? ma(e) : 0;
              return t && r < t ? Mn(t - r, n) + e : e;
            }),
            (h.parseInt = function (e, t, n) {
              return (
                (t = n || null == t ? 0 : t && +t),
                we(f(e).replace(Qa, ''), t || 0)
              );
            }),
            (h.random = function (e, t, n) {
              var r;
              return (
                n && 'boolean' != typeof n && p(e, t, n) && (t = n = Bi),
                n === Bi &&
                  ('boolean' == typeof t
                    ? ((n = t), (t = Bi))
                    : 'boolean' == typeof e && ((n = e), (e = Bi))),
                e === Bi && t === Bi
                  ? ((e = 0), (t = 1))
                  : ((e = zo(e)), t === Bi ? ((t = e), (e = 0)) : (t = zo(t))),
                t < e && ((r = e), (e = t), (t = r)),
                n || e % 1 || t % 1
                  ? ((r = xe()),
                    E(e + r * (t - e + Ss('1e-' + ((r + '').length - 1))), t))
                  : At(e, t)
              );
            }),
            (h.reduce = function (e, t, n) {
              var r = $(e) ? Ls : Us,
                o = arguments.length < 3;
              return r(e, d(t, 4), n, o, ot);
            }),
            (h.reduceRight = function (e, t, n) {
              var r = $(e) ? js : Us,
                o = arguments.length < 3;
              return r(e, d(t, 4), n, o, it);
            }),
            (h.repeat = function (e, t, n) {
              return (t = (n ? p(e, t, n) : t === Bi) ? 1 : _(t)), Ft(f(e), t);
            }),
            (h.replace = function () {
              var e = arguments,
                t = f(e[0]);
              return e.length < 3 ? t : t.replace(e[1], e[2]);
            }),
            (h.result = function (e, t, n) {
              var r = -1,
                o = (t = an(t, e)).length;
              for (o || ((o = 1), (e = Bi)); ++r < o; ) {
                var i = null == e ? Bi : e[Sr(t[r])];
                i === Bi && ((r = o), (i = n)), (e = So(i) ? i.call(e) : i);
              }
              return e;
            }),
            (h.round = Fi),
            (h.runInContext = o),
            (h.sample = function (e) {
              return ($(e) ? We : $t)(e);
            }),
            (h.size = function (e) {
              var t;
              return null == e
                ? 0
                : u(e)
                ? Io(e)
                  ? ma(e)
                  : e.length
                : (t = A(e)) == Gi || t == Qi
                ? e.size
                : Tt(e).length;
            }),
            (h.snakeCase = ui),
            (h.some = function (e, t, n) {
              return ($(e) ? As : Ut)(e, d((t = n && p(e, t, n) ? Bi : t), 3));
            }),
            (h.sortedIndex = function (e, t) {
              return qt(e, t);
            }),
            (h.sortedIndexBy = function (e, t, n) {
              return Yt(e, t, d(n, 2));
            }),
            (h.sortedIndexOf = function (e, t) {
              var n = null == e ? 0 : e.length;
              if (n) {
                var r = qt(e, t);
                if (r < n && F(e[r], t)) return r;
              }
              return -1;
            }),
            (h.sortedLastIndex = function (e, t) {
              return qt(e, t, !0);
            }),
            (h.sortedLastIndexBy = function (e, t, n) {
              return Yt(e, t, d(n, 2), !0);
            }),
            (h.sortedLastIndexOf = function (e, t) {
              if (null == e ? 0 : e.length) {
                var n = qt(e, t, !0) - 1;
                if (F(e[n], t)) return n;
              }
              return -1;
            }),
            (h.startCase = di),
            (h.startsWith = function (e, t, n) {
              return (
                (e = f(e)),
                (n = null == n ? 0 : et(_(n), 0, e.length)),
                (t = c(t)),
                e.slice(n, n + t.length) == t
              );
            }),
            (h.subtract = $i),
            (h.sum = function (e) {
              return e && e.length ? qs(e, M) : 0;
            }),
            (h.sumBy = function (e, t) {
              return e && e.length ? qs(e, d(t, 2)) : 0;
            }),
            (h.template = function (a, e, t) {
              var s,
                l,
                n = h.templateSettings;
              t && p(a, e, t) && (e = Bi), (a = f(a)), (e = $o({}, e, n, $n));
              var r = O((t = $o({}, e.imports, n.imports, $n))),
                o = Gs(t, r),
                c = 0,
                n = e.interpolate || hs,
                u = "__p += '",
                t = z(
                  (e.escape || hs).source +
                    '|' +
                    n.source +
                    '|' +
                    (n === Ya ? as : hs).source +
                    '|' +
                    (e.evaluate || hs).source +
                    '|$',
                  'g'
                ),
                i =
                  '//# sourceURL=' +
                  (L.call(e, 'sourceURL')
                    ? (e.sourceURL + '').replace(/\s/g, ' ')
                    : 'lodash.templateSources[' + ++xs + ']') +
                  '\n';
              if (
                (a.replace(t, function (e, t, n, r, o, i) {
                  return (
                    (n = n || r),
                    (u += a.slice(c, i).replace(ms, tl)),
                    t && ((s = !0), (u += "' +\n__e(" + t + ") +\n'")),
                    o && ((l = !0), (u += "';\n" + o + ";\n__p += '")),
                    n &&
                      (u +=
                        "' +\n((__t = (" + n + ")) == null ? '' : __t) +\n'"),
                    (c = i + e.length),
                    e
                  );
                }),
                (u += "';\n"),
                (n = L.call(e, 'variable') && e.variable))
              ) {
                if (os.test(n))
                  throw new D(
                    'Invalid `variable` option passed into `_.template`'
                  );
              } else u = 'with (obj) {\n' + u + '\n}\n';
              if (
                ((u = (l ? u.replace(Aa, '') : u)
                  .replace(Fa, '$1')
                  .replace($a, '$1;')),
                (u =
                  'function(' +
                  (n || 'obj') +
                  ') {\n' +
                  (n ? '' : 'obj || (obj = {});\n') +
                  "var __t, __p = ''" +
                  (s ? ', __e = _.escape' : '') +
                  (l
                    ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n"
                    : ';\n') +
                  u +
                  'return __p\n}'),
                ((t = mi(function () {
                  return N(r, i + 'return ' + u).apply(Bi, o);
                })).source = u),
                xo(t))
              )
                throw t;
              return t;
            }),
            (h.times = function (e, t) {
              if ((e = _(e)) < 1 || Wi < e) return [];
              for (
                var n = Ui, r = E(e, Ui), r = ((t = d(t)), (e -= Ui), Ys(r, t));
                ++n < e;

              )
                t(n);
              return r;
            }),
            (h.toFinite = zo),
            (h.toInteger = _),
            (h.toLength = Lo),
            (h.toLower = function (e) {
              return f(e).toLowerCase();
            }),
            (h.toNumber = R),
            (h.toSafeInteger = function (e) {
              return e ? et(_(e), -Wi, Wi) : 0 === e ? e : 0;
            }),
            (h.toString = f),
            (h.toUpper = function (e) {
              return f(e).toUpperCase();
            }),
            (h.trim = function (e, t, n) {
              return (e = f(e)) && (n || t === Bi)
                ? Ks(e)
                : e && (t = c(t))
                ? ln((n = ga(e)), Xs(n, (t = ga(t))), Js(n, t) + 1).join('')
                : e;
            }),
            (h.trimEnd = function (e, t, n) {
              return (e = f(e)) && (n || t === Bi)
                ? e.slice(0, il(e) + 1)
                : e && (t = c(t))
                ? ln((n = ga(e)), 0, Js(n, ga(t)) + 1).join('')
                : e;
            }),
            (h.trimStart = function (e, t, n) {
              return (e = f(e)) && (n || t === Bi)
                ? e.replace(Qa, '')
                : e && (t = c(t))
                ? ln((n = ga(e)), Xs(n, ga(t))).join('')
                : e;
            }),
            (h.truncate = function (e, t) {
              var n,
                r = 30,
                o = '...',
                t =
                  (x(t) &&
                    ((n = 'separator' in t ? t.separator : n),
                    (r = 'length' in t ? _(t.length) : r),
                    (o = 'omission' in t ? c(t.omission) : o)),
                  (e = f(e)).length);
              if ((t = fa(e) ? (i = ga(e)).length : t) <= r) return e;
              if ((t = r - ma(o)) < 1) return o;
              var i,
                r = i ? ln(i, 0, t).join('') : e.slice(0, t);
              if (n !== Bi)
                if ((i && (t += r.length - t), Ro(n))) {
                  if (e.slice(t).search(n)) {
                    var a,
                      s = r;
                    for (
                      (n = n.global
                        ? n
                        : z(n.source, f(ss.exec(n)) + 'g')).lastIndex = 0;
                      (a = n.exec(s));

                    )
                      var l = a.index;
                    r = r.slice(0, l === Bi ? t : l);
                  }
                } else
                  e.indexOf(c(n), t) != t &&
                    -1 < (i = r.lastIndexOf(n)) &&
                    (r = r.slice(0, i));
              return r + o;
            }),
            (h.unescape = function (e) {
              return (e = f(e)) && Ha.test(e) ? e.replace(Ba, al) : e;
            }),
            (h.uniqueId = function (e) {
              var t = ++K;
              return f(e) + t;
            }),
            (h.upperCase = pi),
            (h.upperFirst = fi),
            (h.each = Gr),
            (h.eachRight = Zr),
            (h.first = Rr),
            ki(
              h,
              ((ji = {}),
              dt(h, function (e, t) {
                L.call(h.prototype, t) || (ji[t] = e);
              }),
              ji),
              { chain: !1 }
            ),
            (h.VERSION = '4.17.21'),
            sa(
              [
                'bind',
                'bindKey',
                'curry',
                'curryRight',
                'partial',
                'partialRight',
              ],
              function (e) {
                h[e].placeholder = h;
              }
            ),
            sa(['drop', 'take'], function (n, r) {
              (v.prototype[n] = function (e) {
                e = e === Bi ? 1 : C(_(e), 0);
                var t = this.__filtered__ && !r ? new v(this) : this.clone();
                return (
                  t.__filtered__
                    ? (t.__takeCount__ = E(e, t.__takeCount__))
                    : t.__views__.push({
                        size: E(e, Ui),
                        type: n + (t.__dir__ < 0 ? 'Right' : ''),
                      }),
                  t
                );
              }),
                (v.prototype[n + 'Right'] = function (e) {
                  return this.reverse()[n](e).reverse();
                });
            }),
            sa(['filter', 'map', 'takeWhile'], function (e, t) {
              var n = t + 1,
                r = 1 == n || 3 == n;
              v.prototype[e] = function (e) {
                var t = this.clone();
                return (
                  t.__iteratees__.push({ iteratee: d(e, 3), type: n }),
                  (t.__filtered__ = t.__filtered__ || r),
                  t
                );
              };
            }),
            sa(['head', 'last'], function (e, t) {
              var n = 'take' + (t ? 'Right' : '');
              v.prototype[e] = function () {
                return this[n](1).value()[0];
              };
            }),
            sa(['initial', 'tail'], function (e, t) {
              var n = 'drop' + (t ? '' : 'Right');
              v.prototype[e] = function () {
                return this.__filtered__ ? new v(this) : this[n](1);
              };
            }),
            (v.prototype.compact = function () {
              return this.filter(M);
            }),
            (v.prototype.find = function (e) {
              return this.filter(e).head();
            }),
            (v.prototype.findLast = function (e) {
              return this.reverse().find(e);
            }),
            (v.prototype.invokeMap = a(function (t, n) {
              return 'function' == typeof t
                ? new v(this)
                : this.map(function (e) {
                    return wt(e, t, n);
                  });
            })),
            (v.prototype.reject = function (e) {
              return this.filter(po(d(e)));
            }),
            (v.prototype.slice = function (e, t) {
              e = _(e);
              var n = this;
              return n.__filtered__ && (0 < e || t < 0)
                ? new v(n)
                : (e < 0 ? (n = n.takeRight(-e)) : e && (n = n.drop(e)),
                  t !== Bi
                    ? (t = _(t)) < 0
                      ? n.dropRight(-t)
                      : n.take(t - e)
                    : n);
            }),
            (v.prototype.takeRightWhile = function (e) {
              return this.reverse().takeWhile(e).reverse();
            }),
            (v.prototype.toArray = function () {
              return this.take(Ui);
            }),
            dt(v.prototype, function (c, e) {
              var u = /^(?:filter|find|map|reject)|While$/.test(e),
                d = /^(?:head|last)$/.test(e),
                p = h[d ? 'take' + ('last' == e ? 'Right' : '') : e],
                f = d || /^find/.test(e);
              p &&
                (h.prototype[e] = function () {
                  function e(e) {
                    return (e = p.apply(h, ua([e], r))), d && s ? e[0] : e;
                  }
                  var t,
                    n = this.__wrapped__,
                    r = d ? [1] : arguments,
                    o = n instanceof v,
                    i = r[0],
                    a = o || $(n),
                    s =
                      (a &&
                        u &&
                        'function' == typeof i &&
                        1 != i.length &&
                        (o = a = !1),
                      this.__chain__),
                    i = !!this.__actions__.length,
                    l = f && !s,
                    o = o && !i;
                  return !f && a
                    ? ((n = o ? n : new v(this)),
                      (t = c.apply(n, r)).__actions__.push({
                        func: Wr,
                        args: [e],
                        thisArg: Bi,
                      }),
                      new g(t, s))
                    : l && o
                    ? c.apply(this, r)
                    : ((t = this.thru(e)),
                      l ? (d ? t.value()[0] : t.value()) : t);
                });
            }),
            sa(
              ['pop', 'push', 'shift', 'sort', 'splice', 'unshift'],
              function (e) {
                var n = H[e],
                  r = /^(?:push|sort|unshift)$/.test(e) ? 'tap' : 'thru',
                  o = /^(?:pop|shift)$/.test(e);
                h.prototype[e] = function () {
                  var e,
                    t = arguments;
                  return o && !this.__chain__
                    ? ((e = this.value()), n.apply($(e) ? e : [], t))
                    : this[r](function (e) {
                        return n.apply($(e) ? e : [], t);
                      });
                };
              }
            ),
            dt(v.prototype, function (e, t) {
              var n,
                r = h[t];
              r &&
                ((n = r.name + ''),
                L.call(Re, n) || (Re[n] = []),
                Re[n].push({ name: t, func: r }));
            }),
            (Re[_n(Bi, 2).name] = [{ name: 'wrapper', func: Bi }]),
            (v.prototype.clone = function () {
              var e = new v(this.__wrapped__);
              return (
                (e.__actions__ = T(this.__actions__)),
                (e.__dir__ = this.__dir__),
                (e.__filtered__ = this.__filtered__),
                (e.__iteratees__ = T(this.__iteratees__)),
                (e.__takeCount__ = this.__takeCount__),
                (e.__views__ = T(this.__views__)),
                e
              );
            }),
            (v.prototype.reverse = function () {
              var e;
              return (
                this.__filtered__
                  ? (((e = new v(this)).__dir__ = -1), (e.__filtered__ = !0))
                  : ((e = this.clone()).__dir__ *= -1),
                e
              );
            }),
            (v.prototype.value = function () {
              var e = this.__wrapped__.value(),
                t = this.__dir__,
                n = $(e),
                r = t < 0,
                o = n ? e.length : 0,
                i = (function (e, t, n) {
                  var r = -1,
                    o = n.length;
                  for (; ++r < o; ) {
                    var i = n[r],
                      a = i.size;
                    switch (i.type) {
                      case 'drop':
                        e += a;
                        break;
                      case 'dropRight':
                        t -= a;
                        break;
                      case 'take':
                        t = E(t, e + a);
                        break;
                      case 'takeRight':
                        e = C(e, t - a);
                    }
                  }
                  return { start: e, end: t };
                })(0, o, this.__views__),
                a = i.start,
                s = (i = i.end) - a,
                l = r ? i : a - 1,
                c = this.__iteratees__,
                u = c.length,
                d = 0,
                p = E(s, this.__takeCount__);
              if (!n || (!r && o == s && p == s))
                return en(e, this.__actions__);
              var f = [];
              e: for (; s-- && d < p; ) {
                for (var h = -1, m = e[(l += t)]; ++h < u; ) {
                  var g = c[h],
                    v = g.iteratee,
                    g = g.type,
                    v = v(m);
                  if (2 == g) m = v;
                  else if (!v) {
                    if (1 == g) continue e;
                    break e;
                  }
                }
                f[d++] = m;
              }
              return f;
            }),
            (h.prototype.at = Ur),
            (h.prototype.chain = function () {
              return Hr(this);
            }),
            (h.prototype.commit = function () {
              return new g(this.value(), this.__chain__);
            }),
            (h.prototype.next = function () {
              this.__values__ === Bi && (this.__values__ = Po(this.value()));
              var e = this.__index__ >= this.__values__.length;
              return {
                done: e,
                value: e ? Bi : this.__values__[this.__index__++],
              };
            }),
            (h.prototype.plant = function (e) {
              for (var t, n = this; n instanceof Ae; )
                var r = Cr(n),
                  o =
                    ((r.__index__ = 0),
                    (r.__values__ = Bi),
                    t ? (o.__wrapped__ = r) : (t = r),
                    r),
                  n = n.__wrapped__;
              return (o.__wrapped__ = e), t;
            }),
            (h.prototype.reverse = function () {
              var e = this.__wrapped__;
              return e instanceof v
                ? ((e = e),
                  (e = (e = this.__actions__.length
                    ? new v(this)
                    : e).reverse()).__actions__.push({
                    func: Wr,
                    args: [Mr],
                    thisArg: Bi,
                  }),
                  new g(e, this.__chain__))
                : this.thru(Mr);
            }),
            (h.prototype.toJSON =
              h.prototype.valueOf =
              h.prototype.value =
                function () {
                  return en(this.__wrapped__, this.__actions__);
                }),
            (h.prototype.first = h.prototype.head),
            se &&
              (h.prototype[se] = function () {
                return this;
              }),
            h
          );
        })();
        o ? (((o.exports = va)._ = va), (r._ = va)) : (ia._ = va);
      }.call(commonjsGlobal);
    })(lodash, lodash.exports),
    lodash.exports);
const mergeWithoutArray = (e, t, n) =>
    lodashExports.isArray(e) || lodashExports.isArray(t)
      ? t
      : lodashExports.mergeWith(
          e,
          t,
          (n =
            n ||
            ((e, t) => {
              if (lodashExports.isArray(e)) return t;
            }))
        ),
  getTextEffectStyle = (e, t, n, r) => {
    var o,
      i,
      a,
      s = {};
    return (
      'shadow' === e
        ? ((a = new Color(t.color)),
          (i = ((t.direction || 0) * Math.PI) / 180),
          (o = 0.00183334 * (t.offset || 0) * r * Math.sin(i)),
          (i = 0.00183334 * (t.offset || 0) * r * Math.cos(i)),
          (s.textShadow = `${a
            .alpha((t.transparency || 0) / 100)
            .toRgbString()} ${o}px ${i}px ${t.blur}px`))
        : 'lift' === e
        ? (s.textShadow = `rgba(0, 0, 0, ${
            0.05 + 0.005 * ((null == t ? void 0 : t.intensity) || 0)
          }) 0px ${Math.max(0.45, 0.05 * r)}px ${
            Math.max(0.45, 0.05 * r) +
            0.065 * ((null == t ? void 0 : t.intensity) || 0)
          }px; filter: opacity(1)`)
        : 'hollow' === e
        ? ((s.caretColor = n),
          (s.WebkitTextFillColor = 'transparent'),
          (s.WebkitTextStroke =
            (0.0091666 +
              833325e-9 * ((null == t ? void 0 : t.thickness) || 0)) *
              r +
            'px ' +
            n))
        : 'splice' === e
        ? ((s.caretColor = n),
          (s.WebkitTextFillColor = 'transparent'),
          (a = (null == t ? void 0 : t.thickness) || 0),
          (s.WebkitTextStroke =
            0.00916666 * Math.max(8, r) + 83333e-8 * r * a + 'px ' + n),
          (o = (((null == t ? void 0 : t.direction) || 0) * Math.PI) / 180),
          (i =
            0.00183334 *
            ((null == t ? void 0 : t.offset) || 0) *
            r *
            Math.sin(o)),
          (a =
            0.00183334 *
            ((null == t ? void 0 : t.offset) || 0) *
            r *
            Math.cos(o)),
          (s.textShadow = t.color + ` ${i}px ${a}px 0px`))
        : 'outline' !== e &&
          'echo' === e &&
          ((n = new Color(t.color)),
          (o = (((null == t ? void 0 : t.direction) || 0) * Math.PI) / 180),
          (i =
            0.00166666 *
            ((null == t ? void 0 : t.offset) || 0) *
            r *
            Math.sin(o)),
          (a =
            0.00166666 *
            ((null == t ? void 0 : t.offset) || 0) *
            r *
            Math.cos(o)),
          (s.textShadow = `${n.alpha(0.5).toRgbString()} ${i}px ${a}px 0px, ${n
            .alpha(0.3)
            .toRgbString()} ${2 * i}px ${2 * a}px 0px`)),
      s
    );
  },
  getTransformStyle = (e) => {
    var t = [];
    return (
      e.position && t.push(`translate(${e.position.x}px, ${e.position.y}px)`),
      e.scale && t.push(`scale(${e.scale})`),
      e.rotate && t.push(`rotate(${e.rotate}deg)`),
      t.join(' ')
    );
  };
var pkg = {
    name: '@emotion/react',
    version: '11.11.1',
    main: 'dist/emotion-react.cjs.js',
    module: 'dist/emotion-react.esm.js',
    browser: {
      './dist/emotion-react.esm.js': './dist/emotion-react.browser.esm.js',
    },
    exports: {
      '.': {
        module: {
          worker: './dist/emotion-react.worker.esm.js',
          browser: './dist/emotion-react.browser.esm.js',
          default: './dist/emotion-react.esm.js',
        },
        import: './dist/emotion-react.cjs.mjs',
        default: './dist/emotion-react.cjs.js',
      },
      './jsx-runtime': {
        module: {
          worker: './jsx-runtime/dist/emotion-react-jsx-runtime.worker.esm.js',
          browser:
            './jsx-runtime/dist/emotion-react-jsx-runtime.browser.esm.js',
          default: './jsx-runtime/dist/emotion-react-jsx-runtime.esm.js',
        },
        import: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.mjs',
        default: './jsx-runtime/dist/emotion-react-jsx-runtime.cjs.js',
      },
      './_isolated-hnrs': {
        module: {
          worker:
            './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.worker.esm.js',
          browser:
            './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.browser.esm.js',
          default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.esm.js',
        },
        import: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.mjs',
        default: './_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.js',
      },
      './jsx-dev-runtime': {
        module: {
          worker:
            './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.worker.esm.js',
          browser:
            './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.browser.esm.js',
          default:
            './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.esm.js',
        },
        import: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.mjs',
        default: './jsx-dev-runtime/dist/emotion-react-jsx-dev-runtime.cjs.js',
      },
      './package.json': './package.json',
      './types/css-prop': './types/css-prop.d.ts',
      './macro': {
        types: { import: './macro.d.mts', default: './macro.d.ts' },
        default: './macro.js',
      },
    },
    types: 'types/index.d.ts',
    files: [
      'src',
      'dist',
      'jsx-runtime',
      'jsx-dev-runtime',
      '_isolated-hnrs',
      'types/*.d.ts',
      'macro.*',
    ],
    sideEffects: !1,
    author: 'Emotion Contributors',
    license: 'MIT',
    scripts: { 'test:typescript': 'dtslint types' },
    dependencies: {
      '@babel/runtime': '^7.18.3',
      '@emotion/babel-plugin': '^11.11.0',
      '@emotion/cache': '^11.11.0',
      '@emotion/serialize': '^1.1.2',
      '@emotion/use-insertion-effect-with-fallbacks': '^1.0.1',
      '@emotion/utils': '^1.2.1',
      '@emotion/weak-memoize': '^0.3.1',
      'hoist-non-react-statics': '^3.3.1',
    },
    peerDependencies: { react: '>=16.8.0' },
    peerDependenciesMeta: { '@types/react': { optional: !0 } },
    devDependencies: {
      '@definitelytyped/dtslint': '0.0.112',
      '@emotion/css': '11.11.0',
      '@emotion/css-prettifier': '1.1.3',
      '@emotion/server': '11.11.0',
      '@emotion/styled': '11.11.0',
      'html-tag-names': '^1.1.2',
      react: '16.14.0',
      'svg-tag-names': '^1.1.1',
      typescript: '^4.5.5',
    },
    repository:
      'https://github.com/emotion-js/emotion/tree/main/packages/react',
    publishConfig: { access: 'public' },
    'umd:main': 'dist/emotion-react.umd.min.js',
    preconstruct: {
      entrypoints: [
        './index.js',
        './jsx-runtime.js',
        './jsx-dev-runtime.js',
        './_isolated-hnrs.js',
      ],
      umdName: 'emotionReact',
      exports: {
        envConditions: ['browser', 'worker'],
        extra: {
          './types/css-prop': './types/css-prop.d.ts',
          './macro': {
            types: { import: './macro.d.mts', default: './macro.d.ts' },
            default: './macro.js',
          },
        },
      },
    },
  },
  warnedAboutCssPropForGlobal = !1,
  Global = withEmotionCache(function (e, o) {
    'production' === process.env.NODE_ENV ||
      warnedAboutCssPropForGlobal ||
      (!e.className && !e.css) ||
      (console.error(
        "It looks like you're using the css prop on Global, did you mean to use the styles prop instead?"
      ),
      (warnedAboutCssPropForGlobal = !0));
    var i,
      e = e.styles,
      a = serializeStyles([e], void 0, React$1.useContext(ThemeContext));
    if (isBrowser$2)
      return (
        (i = React$1.useRef()),
        useInsertionEffectWithLayoutFallback(
          function () {
            var e = o.key + '-global',
              t = new o.sheet.constructor({
                key: e,
                nonce: o.sheet.nonce,
                container: o.sheet.container,
                speedy: o.sheet.isSpeedy,
              }),
              n = !1,
              r = document.querySelector(
                'style[data-emotion="' + e + ' ' + a.name + '"]'
              );
            return (
              o.sheet.tags.length && (t.before = o.sheet.tags[0]),
              null !== r &&
                ((n = !0), r.setAttribute('data-emotion', e), t.hydrate([r])),
              (i.current = [t, n]),
              function () {
                t.flush();
              }
            );
          },
          [o]
        ),
        useInsertionEffectWithLayoutFallback(
          function () {
            var e = i.current,
              t = e[0];
            e[1]
              ? (e[1] = !1)
              : (void 0 !== a.next && insertStyles(o, a.next, !0),
                t.tags.length &&
                  ((e = t.tags[t.tags.length - 1].nextElementSibling),
                  (t.before = e),
                  t.flush()),
                o.insert('', a, t, !1));
          },
          [o, a.name]
        ),
        null
      );
    for (var t = a.name, n = a.styles, r = a.next; void 0 !== r; )
      (t += ' ' + r.name), (n += r.styles), (r = r.next);
    var e = !0 === o.compat,
      s = o.insert('', { name: t, styles: n }, o.sheet, e);
    return e
      ? null
      : React$1.createElement(
          'style',
          (((e = {})['data-emotion'] = o.key + '-global ' + t),
          (e.dangerouslySetInnerHTML = { __html: s }),
          (e.nonce = o.sheet.nonce),
          e)
        );
  });
function css() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return serializeStyles(t);
}
'production' !== process.env.NODE_ENV && (Global.displayName = 'EmotionGlobal');
var classnames = function e(t) {
  for (var n = t.length, r = 0, o = ''; r < n; r++) {
    var i = t[r];
    if (null != i) {
      var a = void 0;
      switch (typeof i) {
        case 'boolean':
          break;
        case 'object':
          if (Array.isArray(i)) a = e(i);
          else
            for (var s in ('production' !== process.env.NODE_ENV &&
              void 0 !== i.styles &&
              void 0 !== i.name &&
              console.error(
                'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.'
              ),
            (a = ''),
            i))
              i[s] && s && (a && (a += ' '), (a += s));
          break;
        default:
          a = i;
      }
      a && (o && (o += ' '), (o += a));
    }
  }
  return o;
};
function merge(e, t, n) {
  var r = [],
    e = getRegisteredStyles(e, r, n);
  return r.length < 2 ? n : e + t(r);
}
var isBrowser,
  isTestEnv,
  globalContext,
  globalKey,
  Insertion = function (e) {
    var t,
      r = e.cache,
      o = e.serializedArr,
      e = useInsertionEffectAlwaysWithSyncFallback(function () {
        for (var e = '', t = 0; t < o.length; t++) {
          var n = insertStyles(r, o[t], !1);
          isBrowser$2 || void 0 === n || (e += n);
        }
        if (!isBrowser$2) return e;
      });
    return isBrowser$2 || 0 === e.length
      ? null
      : React$1.createElement(
          'style',
          (((t = {})['data-emotion'] =
            r.key +
            ' ' +
            o
              .map(function (e) {
                return e.name;
              })
              .join(' ')),
          (t.dangerouslySetInnerHTML = { __html: e }),
          (t.nonce = r.sheet.nonce),
          t)
        );
  },
  ClassNames = withEmotionCache(function (e, o) {
    function r() {
      if (i && 'production' !== process.env.NODE_ENV)
        throw new Error('css can only be used during render');
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      var r = serializeStyles(t, o.registered);
      return a.push(r), registerStyles(o, r, !1), o.key + '-' + r.name;
    }
    var i = !1,
      a = [],
      t = {
        css: r,
        cx: function () {
          if (i && 'production' !== process.env.NODE_ENV)
            throw new Error('cx can only be used during render');
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return merge(o.registered, r, classnames(t));
        },
        theme: React$1.useContext(ThemeContext),
      },
      e = e.children(t),
      i = !0;
    return React$1.createElement(
      React$1.Fragment,
      null,
      React$1.createElement(Insertion, { cache: o, serializedArr: a }),
      e
    );
  });
'production' !== process.env.NODE_ENV &&
  (ClassNames.displayName = 'EmotionClassNames'),
  'production' !== process.env.NODE_ENV &&
    ((isBrowser = 'undefined' != typeof document),
    (isTestEnv = 'undefined' != typeof jest || 'undefined' != typeof vi),
    isBrowser) &&
    !isTestEnv &&
    ((globalContext =
      'undefined' != typeof globalThis
        ? globalThis
        : isBrowser
        ? window
        : global)[
      (globalKey = '__EMOTION_REACT_' + pkg.version.split('.')[0] + '__')
    ] &&
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running multiple instances may cause problems. This can happen if multiple versions are used, or if multiple builds of the same version are used.'
      ),
    (globalContext[globalKey] = !0));
const FontStyle$2 = ({ font: r }) => {
  var e = useMemo(() => {
    const n = [];
    return (
      r.fonts.forEach((e) => {
        var t;
        n.push(`
                @font-face {
                  font-family: '${r.name}';
                  font-weight: ${
                    (null == (t = e.style)
                      ? void 0
                      : t.replace('_Italic', '')) || 'normal'
                  };
                  ${
                    null != (t = e.style) && t.includes('_Italic')
                      ? 'font-style: italic;\n'
                      : ''
                  }
                  src: url(${e.urls.join(',')}) format('woff2');
                  font-display: block;
                }
            `);
      }),
      n.join('\n')
    );
  }, [r]);
  return jsx(Global, {
    styles: css`
      ${e}
    `,
  });
};
var FontStyle$3 = React__default$1.memo(FontStyle$2);
const GlobalStyle = ({ fonts: e, mode: t = 'view' }) => {
    return jsxs(Fragment$1, {
      children: [
        jsx(Global, {
          styles: css`
            ${`
        .adojs-text {
            counter-reset: list;
            p {
                margin-left: calc(var(--indent-level)*1.7em);

            }
            p:before {
                counter-increment: list;
                content: counter(list, var(--counter-list-marker)) ".";
                left: 0;
                padding-right: 0.1em;
                height: calc(var(--line-height))*1em;
                width: calc(var(--indent-level)*1em);
                position: absolute;
                margin: 0;
                padding: 0;
                white-space: nowrap;
            }
        }
    `}
            ${`
        * {
            -webkit-user-select: ${
              'editor' === t ? 'none' : 'text'
            }; /* Safari */
            -khtml-user-select: ${
              'editor' === t ? 'none' : 'text'
            }; /* Konqueror HTML */
            -moz-user-select: ${
              'editor' === t ? 'none' : 'text'
            }; /* Old versions of Firefox */
            -ms-user-select: ${
              'editor' === t ? 'none' : 'text'
            }; /* Internet Explorer/Edge */
            user-select: ${'editor' === t ? 'none' : 'text'};
            -webkit-user-drag: none;
             -webkit-touch-callout: none; /* iOS Safari */
        }
    `}
          `,
        }),
        e.map((e) => jsx(FontStyle$3, { font: e }, e.name)),
      ],
    });
  },
  getGradientBackground = (e, t) => {
    const n = 100 / (e.length - 1);
    var r = e.map((e, t) => `${e} ${t * n}%`);
    switch (t) {
      case 'leftToRight':
        return `linear-gradient(90deg, ${r.join(', ')})`;
      case 'topToBottom':
        return `linear-gradient(${r.join(', ')})`;
      case 'topLeftToBottomRight':
        return `linear-gradient(135deg, ${r.join(', ')})`;
      case 'circleCenter':
        return `radial-gradient(circle at 50% 50%, ${r.join(', ')})`;
      default:
        return `radial-gradient(circle at 0% 0%, ${r.join(', ')})`;
    }
  },
  FrameContent = ({ clipPath: e, image: t, color: n, gradientBackground: r }) =>
    jsx('div', {
      css: {
        width: '100%',
        height: '100%',
        clipPath: e,
        background: r
          ? getGradientBackground(r.colors, r.style)
          : null != n
          ? n
          : void 0,
      },
      children:
        t &&
        jsx('div', {
          css: {
            width: t.boxSize.width,
            height: t.boxSize.height,
            transform: getTransformStyle({
              position: t.position,
              rotate: t.rotate,
            }),
            position: 'relative',
            userSelect: 'none',
          },
          children: jsx('img', {
            src: t.url,
            css: {
              objectFit: 'fill',
              width: '100%',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
            },
          }),
        }),
    }),
  TextContent = ({ text: e, colors: t, fontSizes: n, effect: r }) =>
    jsx('div', {
      className: 'adojs-text',
      css: Object.assign(
        {
          p: {
            '&:before': Object.assign(
              {},
              getTextEffectStyle(
                (null == r ? void 0 : r.name) || 'none',
                null == r ? void 0 : r.settings,
                t[0],
                n[0]
              )
            ),
          },
        },
        getTextEffectStyle(
          (null == r ? void 0 : r.name) || 'none',
          null == r ? void 0 : r.settings,
          t[0],
          n[0]
        )
      ),
      dangerouslySetInnerHTML: { __html: e },
    }),
  ImageContent = ({ image: e, boxSize: t }) =>
    jsx('div', {
      css: {
        overflow: 'hidden',
        pointerEvents: 'auto',
        width: t.width,
        height: t.height,
      },
      children: jsx('div', {
        css: {
          width: e.boxSize.width,
          height: e.boxSize.height,
          transform: getTransformStyle({
            position: e.position,
            rotate: e.rotate,
          }),
          position: 'relative',
          userSelect: 'none',
          opacity: e.transparency,
        },
        children: jsx('img', {
          src: e.url,
          css: {
            objectFit: 'fill',
            width: '100%',
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
          },
        }),
      }),
    }),
  ShapeContent = ({
    boxSize: e,
    shape: t,
    color: n,
    gradientBackground: r,
    roundedCorners: o = 0,
    scale: i = 1,
    border: a,
  }) => {
    return jsxs('div', {
      css: { position: 'relative', width: e.width / i, height: e.height / i },
      children: [
        jsx('div', {
          css: {
            clipPath: `path("${getShapePath(t, {
              width: e.width / i,
              height: e.height / i,
              roundedCorners: o,
            })}")`,
            width: '100%',
            height: '100%',
            background: r
              ? getGradientBackground(r.colors, r.style)
              : n || '#fff',
          },
        }),
        a &&
          jsxs('svg', {
            viewBox: `0 0 ${e.width / i} ` + e.height / i,
            css: { position: 'absolute', inset: 0 },
            children: [
              o &&
                jsx('defs', {
                  children: jsx('clipPath', {
                    id: 'roundedCorners',
                    children: jsx('path', {
                      d: getShapePath(t, {
                        width: e.width / i,
                        height: e.height / i,
                        roundedCorners: o,
                      }),
                    }),
                  }),
                }),
              jsx('path', {
                d: getShapePath(t, {
                  width: e.width / i,
                  height: e.height / i,
                  roundedCorners: o,
                }),
                strokeLinecap: 'butt',
                fill: 'none',
                stroke: a.color,
                strokeWidth: a.weight,
                strokeDasharray: (() => {
                  switch (null == a ? void 0 : a.style) {
                    case 'longDashes':
                      return 6 * a.weight + ', ' + a.weight;
                    case 'shortDashes':
                      return 3 * a.weight + ', ' + a.weight;
                    case 'dots':
                      return a.weight + ', ' + a.weight;
                    default:
                      return;
                  }
                })(),
                clipPath: `path("${getShapePath(t, {
                  width: e.width / i,
                  height: e.height / i,
                  roundedCorners: o,
                })}")`,
              }),
            ],
          }),
      ],
    });
  },
  RootContent = (e) => {
    var {
        boxSize: t,
        color: n,
        gradientBackground: r,
        image: o,
        position: i,
        rotate: a,
      } = e,
      e = __rest(e, [
        'boxSize',
        'color',
        'gradientBackground',
        'image',
        'position',
        'rotate',
      ]);
    return jsxs(
      'div',
      Object.assign(
        {
          css: {
            position: 'absolute',
            overflow: 'hidden',
            pointerEvents: 'auto',
            width: t.width,
            height: t.height,
          },
        },
        e,
        {
          children: [
            jsx('div', {
              css: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: t.width,
                height: t.height,
                background: r
                  ? getGradientBackground(r.colors, r.style)
                  : n || '#fff',
              },
            }),
            o &&
              jsx('div', {
                css: { width: t.width, height: t.height },
                children: jsx(ImageContent, {
                  image: o,
                  boxSize: t,
                  rotate: a,
                  position: i,
                }),
              }),
          ],
        }
      )
    );
  };
function useMountedState() {
  var e = useRef(!1),
    t = useCallback(function () {
      return e.current;
    }, []);
  return (
    useEffect(function () {
      return (
        (e.current = !0),
        function () {
          e.current = !1;
        }
      );
    }, []),
    t
  );
}
function useAsyncFn(r, e, t) {
  void 0 === e && (e = []), void 0 === t && (t = { loading: !1 });
  var o = useRef(0),
    i = useMountedState(),
    t = useState(t),
    a = t[0],
    s = t[1],
    t = useCallback(function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      var n = ++o.current;
      return (
        a.loading ||
          s(function (e) {
            return __assign(__assign({}, e), { loading: !0 });
          }),
        r.apply(void 0, e).then(
          function (e) {
            return i() && n === o.current && s({ value: e, loading: !1 }), e;
          },
          function (e) {
            return i() && n === o.current && s({ error: e, loading: !1 }), e;
          }
        )
      );
    }, e);
  return [a, t];
}
function useAsync(e, t) {
  var e = useAsyncFn(e, (t = void 0 === t ? [] : t), { loading: !0 }),
    t = e[0],
    n = e[1];
  return (
    useEffect(
      function () {
        n();
      },
      [n]
    ),
    t
  );
}
const SvgContent = ({ image: u, boxSize: e, colors: d }) => {
  const [t, p] = useState();
  return (
    useAsync(async () => {
      var e = await fetchSvgContent(u),
        t =
          ((e.style.fill = ''),
          (e.style.stroke = ''),
          e.getElementsByTagName('g'));
      if (0 < t.length)
        for (let e = 0; e < t.length; e++) {
          var n = t[e].getAttribute('id');
          if (n) {
            n = n.match(/^[a-z]+(\d+)(_)*(\d*)$/i);
            if (n && 2 <= n.length) {
              var r = parseInt(n[1], 10) - 1,
                o = t[e].querySelectorAll(
                  'path, circle, ellipse,line, rect, polygon,polyline, text'
                );
              for (let e = 0; e < o.length; e++) {
                var i = o[e].getAttribute('stroke') || 'none';
                (o[e].style.fill = ''),
                  (o[e].style.stroke = ''),
                  'none' !== i
                    ? o[e].setAttribute('stroke', d[r] || '#000000')
                    : o[e].setAttribute('fill', d[r] || '#000000');
              }
            }
          }
        }
      else {
        var a = [],
          s = e.querySelectorAll(
            'path, circle, ellipse,line, rect, polygon,polyline, text'
          );
        for (let n = 0; n < s.length; n++) {
          var l = s[n].getAttribute('style');
          let e = s[n].getAttribute('stroke') || 'none',
            t = s[n].getAttribute('fill') || '#000000';
          const c = {};
          l &&
            l.split(';').forEach((e) => {
              var [e, t] = e.split(':');
              c[e.trim()] = t.trim();
            }),
            c.stroke && (e = c.stroke),
            c.fill && (t = c.fill),
            e && 'none' !== e
              ? (a.includes(new Color(e).toRgbString()) ||
                  a.push(new Color(e).toRgbString()),
                (s[n].style.fill = ''),
                (s[n].style.stroke = ''),
                s[n].setAttribute(
                  'stroke',
                  d[a.indexOf(new Color(e).toRgbString())] || '#000000'
                ))
              : t &&
                'none' !== t &&
                (a.includes(new Color(t).toRgbString()) ||
                  a.push(new Color(t).toRgbString()),
                (s[n].style.fill = ''),
                (s[n].style.stroke = ''),
                s[n].setAttribute(
                  'fill',
                  d[a.indexOf(new Color(t).toRgbString())] || '#000000'
                ));
        }
      }
      (e = new Blob([e.outerHTML], { type: 'image/svg+xml;charset=utf-8' })),
        (e = URL.createObjectURL(e));
      p(e);
    }, [u, d]),
    jsx('div', {
      css: { width: '100%', height: '100%' },
      children:
        u &&
        jsx('div', {
          css: {
            width: e.width,
            height: e.height,
            position: 'relative',
            userSelect: 'none',
          },
          children: jsx('img', {
            src: t,
            crossOrigin: 'anonymous',
            css: {
              objectFit: 'fill',
              width: '100%',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
            },
          }),
        }),
    })
  );
};
function useEventCallback(e) {
  const t = useRef(e);
  var n = useRef((e) => {
    t.current && t.current(e);
  });
  return (t.current = e), n.current;
}
const SelectionBox = ({ selectedLayers: e }, t) =>
  jsxs(Fragment$1, {
    children: [
      jsx('div', {
        ref: t,
        css: {
          border: '1px solid #3d8eff',
          background: 'rgba(61, 142, 255, 0.2)',
          position: 'absolute',
        },
      }),
      jsx('div', {
        css: {
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
        },
        children: Object.entries(e || {}).map(
          ([e, { boxSize: t, position: n, rotate: r }]) =>
            jsx(
              'div',
              {
                css: {
                  position: 'absolute',
                  border: '1px solid #3d8eff',
                  transform: getTransformStyle({ position: n, rotate: r }),
                  width: t.width,
                  height: t.height,
                },
              },
              e
            )
        ),
      }),
    ],
  });
var SelectionBox$1 = forwardRef(SelectionBox);
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (
    (getRandomValues =
      getRandomValues ||
      ('undefined' != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)))
  )
    return getRandomValues(rnds8);
  throw new Error(
    'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
  );
}
const byteToHex = [];
for (let e = 0; e < 256; ++e) byteToHex.push((e + 256).toString(16).slice(1));
function unsafeStringify(e, t = 0) {
  return (
    byteToHex[e[t + 0]] +
    byteToHex[e[t + 1]] +
    byteToHex[e[t + 2]] +
    byteToHex[e[t + 3]] +
    '-' +
    byteToHex[e[t + 4]] +
    byteToHex[e[t + 5]] +
    '-' +
    byteToHex[e[t + 6]] +
    byteToHex[e[t + 7]] +
    '-' +
    byteToHex[e[t + 8]] +
    byteToHex[e[t + 9]] +
    '-' +
    byteToHex[e[t + 10]] +
    byteToHex[e[t + 11]] +
    byteToHex[e[t + 12]] +
    byteToHex[e[t + 13]] +
    byteToHex[e[t + 14]] +
    byteToHex[e[t + 15]]
  ).toLowerCase();
}
const randomUUID =
  'undefined' != typeof crypto &&
  crypto.randomUUID &&
  crypto.randomUUID.bind(crypto);
var native = { randomUUID: randomUUID };
function v4(e, t, n) {
  if (native.randomUUID && !t && !e) return native.randomUUID();
  var r = (e = e || {}).random || (e.rng || rng)();
  if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), t)) {
    n = n || 0;
    for (let e = 0; e < 16; ++e) t[n + e] = r[e];
    return t;
  }
  return unsafeStringify(r);
}
const ShapeLayer = ({
  boxSize: e,
  shape: t,
  color: n,
  gradientBackground: r,
  roundedCorners: o = 0,
  scale: i = 1,
  rotate: a,
  position: s,
  border: l,
}) =>
  jsx('div', {
    css: { transformOrigin: '0 0' },
    style: {
      width: e.width / (i || 1),
      height: e.height / (i || 1),
      transform: `scale(${i || 1})`,
    },
    children: jsx(ShapeContent, {
      shape: t,
      color: n,
      roundedCorners: o,
      gradientBackground: r,
      boxSize: e,
      rotate: a,
      scale: i,
      position: s,
      border: l,
    }),
  });
function OrderedMap(e) {
  this.content = e;
}
function findDiffStart(t, n, r) {
  for (let e = 0; ; e++) {
    if (e == t.childCount || e == n.childCount)
      return t.childCount == n.childCount ? null : r;
    var o = t.child(e),
      i = n.child(e);
    if (o == i);
    else {
      if (!o.sameMarkup(i)) return r;
      if (o.isText && o.text != i.text) {
        for (let e = 0; o.text[e] == i.text[e]; e++) r++;
        return r;
      }
      if (o.content.size || i.content.size) {
        var a = findDiffStart(o.content, i.content, r + 1);
        if (null != a) return a;
      }
    }
    r += o.nodeSize;
  }
}
function findDiffEnd(n, r, o, i) {
  for (let e = n.childCount, t = r.childCount; ; ) {
    if (0 == e || 0 == t) return e == t ? null : { a: o, b: i };
    var a = n.child(--e),
      s = r.child(--t),
      l = a.nodeSize;
    if (a == s);
    else {
      if (!a.sameMarkup(s)) return { a: o, b: i };
      if (a.isText && a.text != s.text) {
        let e = 0,
          t = Math.min(a.text.length, s.text.length);
        for (
          ;
          e < t &&
          a.text[a.text.length - e - 1] == s.text[s.text.length - e - 1];

        )
          e++, o--, i--;
        return { a: o, b: i };
      }
      if (a.content.size || s.content.size) {
        var c = findDiffEnd(a.content, s.content, o - 1, i - 1);
        if (c) return c;
      }
    }
    (o -= l), (i -= l);
  }
}
(ShapeLayer.info = { name: 'Shape', type: 'Shape' }),
  (OrderedMap.prototype = {
    constructor: OrderedMap,
    find: function (e) {
      for (var t = 0; t < this.content.length; t += 2)
        if (this.content[t] === e) return t;
      return -1;
    },
    get: function (e) {
      e = this.find(e);
      return -1 == e ? void 0 : this.content[e + 1];
    },
    update: function (e, t, n) {
      var r = n && n != e ? this.remove(n) : this,
        o = r.find(e),
        r = r.content.slice();
      return (
        -1 == o ? r.push(n || e, t) : ((r[o + 1] = t), n && (r[o] = n)),
        new OrderedMap(r)
      );
    },
    remove: function (e) {
      var t,
        e = this.find(e);
      return -1 == e
        ? this
        : ((t = this.content.slice()).splice(e, 2), new OrderedMap(t));
    },
    addToStart: function (e, t) {
      return new OrderedMap([e, t].concat(this.remove(e).content));
    },
    addToEnd: function (e, t) {
      var n = this.remove(e).content.slice();
      return n.push(e, t), new OrderedMap(n);
    },
    addBefore: function (e, t, n) {
      var r = this.remove(t),
        o = r.content.slice(),
        r = r.find(e);
      return o.splice(-1 == r ? o.length : r, 0, t, n), new OrderedMap(o);
    },
    forEach: function (e) {
      for (var t = 0; t < this.content.length; t += 2)
        e(this.content[t], this.content[t + 1]);
    },
    prepend: function (e) {
      return (e = OrderedMap.from(e)).size
        ? new OrderedMap(e.content.concat(this.subtract(e).content))
        : this;
    },
    append: function (e) {
      return (e = OrderedMap.from(e)).size
        ? new OrderedMap(this.subtract(e).content.concat(e.content))
        : this;
    },
    subtract: function (e) {
      var t = this;
      e = OrderedMap.from(e);
      for (var n = 0; n < e.content.length; n += 2) t = t.remove(e.content[n]);
      return t;
    },
    toObject: function () {
      var n = {};
      return (
        this.forEach(function (e, t) {
          n[e] = t;
        }),
        n
      );
    },
    get size() {
      return this.content.length >> 1;
    },
  }),
  (OrderedMap.from = function (e) {
    if (e instanceof OrderedMap) return e;
    var t = [];
    if (e) for (var n in e) t.push(n, e[n]);
    return new OrderedMap(t);
  });
class Fragment {
  constructor(t, e) {
    if (((this.content = t), (this.size = e || 0), null == e))
      for (let e = 0; e < t.length; e++) this.size += t[e].nodeSize;
  }
  nodesBetween(n, r, o, i = 0, a) {
    for (let e = 0, t = 0; t < r; e++) {
      var s,
        l = this.content[e],
        c = t + l.nodeSize;
      n < c &&
        !1 !== o(l, i + t, a || null, e) &&
        l.content.size &&
        ((s = t + 1),
        l.nodesBetween(
          Math.max(0, n - s),
          Math.min(l.content.size, r - s),
          o,
          i + s
        )),
        (t = c);
    }
  }
  descendants(e) {
    this.nodesBetween(0, this.size, e);
  }
  textBetween(n, r, o, i) {
    let a = '',
      s = !0;
    return (
      this.nodesBetween(
        n,
        r,
        (e, t) => {
          e.isText
            ? ((a += e.text.slice(Math.max(n, t) - t, r - t)), (s = !o))
            : e.isLeaf
            ? (i
                ? (a += 'function' == typeof i ? i(e) : i)
                : e.type.spec.leafText && (a += e.type.spec.leafText(e)),
              (s = !o))
            : !s && e.isBlock && ((a += o), (s = !0));
        },
        0
      ),
      a
    );
  }
  append(e) {
    if (!e.size) return this;
    if (!this.size) return e;
    let t = this.lastChild,
      n = e.firstChild,
      r = this.content.slice(),
      o = 0;
    for (
      t.isText &&
      t.sameMarkup(n) &&
      ((r[r.length - 1] = t.withText(t.text + n.text)), (o = 1));
      o < e.content.length;
      o++
    )
      r.push(e.content[o]);
    return new Fragment(r, this.size + e.size);
  }
  cut(o, i = this.size) {
    if (0 == o && i == this.size) return this;
    let a = [],
      s = 0;
    if (o < i)
      for (let n = 0, r = 0; r < i; n++) {
        let e = this.content[n],
          t = r + e.nodeSize;
        o < t &&
          ((r < o || i < t) &&
            (e = e.isText
              ? e.cut(Math.max(0, o - r), Math.min(e.text.length, i - r))
              : e.cut(
                  Math.max(0, o - r - 1),
                  Math.min(e.content.size, i - r - 1)
                )),
          a.push(e),
          (s += e.nodeSize)),
          (r = t);
      }
    return new Fragment(a, s);
  }
  cutByIndex(e, t) {
    return e == t
      ? Fragment.empty
      : 0 == e && t == this.content.length
      ? this
      : new Fragment(this.content.slice(e, t));
  }
  replaceChild(e, t) {
    var n,
      r = this.content[e];
    return r == t
      ? this
      : ((n = this.content.slice()),
        (r = this.size + t.nodeSize - r.nodeSize),
        (n[e] = t),
        new Fragment(n, r));
  }
  addToStart(e) {
    return new Fragment([e].concat(this.content), this.size + e.nodeSize);
  }
  addToEnd(e) {
    return new Fragment(this.content.concat(e), this.size + e.nodeSize);
  }
  eq(t) {
    if (this.content.length != t.content.length) return !1;
    for (let e = 0; e < this.content.length; e++)
      if (!this.content[e].eq(t.content[e])) return !1;
    return !0;
  }
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  get childCount() {
    return this.content.length;
  }
  child(e) {
    var t = this.content[e];
    if (t) return t;
    throw new RangeError('Index ' + e + ' out of range for ' + this);
  }
  maybeChild(e) {
    return this.content[e] || null;
  }
  forEach(n) {
    for (let e = 0, t = 0; e < this.content.length; e++) {
      var r = this.content[e];
      n(r, t, e), (t += r.nodeSize);
    }
  }
  findDiffStart(e, t = 0) {
    return findDiffStart(this, e, t);
  }
  findDiffEnd(e, t = this.size, n = e.size) {
    return findDiffEnd(this, e, t, n);
  }
  findIndex(n, r = -1) {
    if (0 == n) return retIndex(0, n);
    if (n == this.size) return retIndex(this.content.length, n);
    if (n > this.size || n < 0)
      throw new RangeError(`Position ${n} outside of fragment (${this})`);
    for (let e = 0, t = 0; ; e++) {
      var o = this.child(e),
        o = t + o.nodeSize;
      if (n <= o) return o == n || 0 < r ? retIndex(e + 1, o) : retIndex(e, t);
      t = o;
    }
  }
  toString() {
    return '<' + this.toStringInner() + '>';
  }
  toStringInner() {
    return this.content.join(', ');
  }
  toJSON() {
    return this.content.length ? this.content.map((e) => e.toJSON()) : null;
  }
  static fromJSON(e, t) {
    if (!t) return Fragment.empty;
    if (Array.isArray(t)) return new Fragment(t.map(e.nodeFromJSON));
    throw new RangeError('Invalid input for Fragment.fromJSON');
  }
  static fromArray(t) {
    if (!t.length) return Fragment.empty;
    let n,
      r = 0;
    for (let e = 0; e < t.length; e++) {
      var o = t[e];
      (r += o.nodeSize),
        e && o.isText && t[e - 1].sameMarkup(o)
          ? ((n = n || t.slice(0, e))[n.length - 1] = o.withText(
              n[n.length - 1].text + o.text
            ))
          : n && n.push(o);
    }
    return new Fragment(n || t, r);
  }
  static from(e) {
    if (!e) return Fragment.empty;
    if (e instanceof Fragment) return e;
    if (Array.isArray(e)) return this.fromArray(e);
    if (e.attrs) return new Fragment([e], e.nodeSize);
    throw new RangeError(
      'Can not convert ' +
        e +
        ' to a Fragment' +
        (e.nodesBetween
          ? ' (looks like multiple versions of prosemirror-model were loaded)'
          : '')
    );
  }
}
Fragment.empty = new Fragment([], 0);
const found = { index: 0, offset: 0 };
function retIndex(e, t) {
  return (found.index = e), (found.offset = t), found;
}
function compareDeep(t, n) {
  if (t !== n) {
    if (!t || 'object' != typeof t || !n || 'object' != typeof n) return !1;
    var e = Array.isArray(t);
    if (Array.isArray(n) != e) return !1;
    if (e) {
      if (t.length != n.length) return !1;
      for (let e = 0; e < t.length; e++)
        if (!compareDeep(t[e], n[e])) return !1;
    } else {
      for (var r in t) if (!(r in n && compareDeep(t[r], n[r]))) return !1;
      for (var o in n) if (!(o in t)) return !1;
    }
  }
  return !0;
}
class Mark {
  constructor(e, t) {
    (this.type = e), (this.attrs = t);
  }
  addToSet(t) {
    let n,
      r = !1;
    for (let e = 0; e < t.length; e++) {
      var o = t[e];
      if (this.eq(o)) return t;
      if (this.type.excludes(o.type)) n = n || t.slice(0, e);
      else {
        if (o.type.excludes(this.type)) return t;
        !r &&
          o.type.rank > this.type.rank &&
          ((n = n || t.slice(0, e)).push(this), (r = !0)),
          n && n.push(o);
      }
    }
    return (n = n || t.slice()), r || n.push(this), n;
  }
  removeFromSet(t) {
    for (let e = 0; e < t.length; e++)
      if (this.eq(t[e])) return t.slice(0, e).concat(t.slice(e + 1));
    return t;
  }
  isInSet(t) {
    for (let e = 0; e < t.length; e++) if (this.eq(t[e])) return !0;
    return !1;
  }
  eq(e) {
    return (
      this == e || (this.type == e.type && compareDeep(this.attrs, e.attrs))
    );
  }
  toJSON() {
    var e,
      t = { type: this.type.name };
    for (e in this.attrs) {
      t.attrs = this.attrs;
      break;
    }
    return t;
  }
  static fromJSON(e, t) {
    if (!t) throw new RangeError('Invalid input for Mark.fromJSON');
    e = e.marks[t.type];
    if (e) return e.create(t.attrs);
    throw new RangeError(`There is no mark type ${t.type} in this schema`);
  }
  static sameSet(t, n) {
    if (t != n) {
      if (t.length != n.length) return !1;
      for (let e = 0; e < t.length; e++) if (!t[e].eq(n[e])) return !1;
    }
    return !0;
  }
  static setFrom(e) {
    return !e || (Array.isArray(e) && 0 == e.length)
      ? Mark.none
      : e instanceof Mark
      ? [e]
      : ((e = e.slice()).sort((e, t) => e.type.rank - t.type.rank), e);
  }
}
Mark.none = [];
class ReplaceError extends Error {}
class Slice {
  constructor(e, t, n) {
    (this.content = e), (this.openStart = t), (this.openEnd = n);
  }
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  insertAt(e, t) {
    e = insertInto(this.content, e + this.openStart, t);
    return e && new Slice(e, this.openStart, this.openEnd);
  }
  removeBetween(e, t) {
    return new Slice(
      removeRange(this.content, e + this.openStart, t + this.openStart),
      this.openStart,
      this.openEnd
    );
  }
  eq(e) {
    return (
      this.content.eq(e.content) &&
      this.openStart == e.openStart &&
      this.openEnd == e.openEnd
    );
  }
  toString() {
    return this.content + '(' + this.openStart + ',' + this.openEnd + ')';
  }
  toJSON() {
    var e;
    return this.content.size
      ? ((e = { content: this.content.toJSON() }),
        0 < this.openStart && (e.openStart = this.openStart),
        0 < this.openEnd && (e.openEnd = this.openEnd),
        e)
      : null;
  }
  static fromJSON(e, t) {
    if (!t) return Slice.empty;
    var n = t.openStart || 0,
      r = t.openEnd || 0;
    if ('number' != typeof n || 'number' != typeof r)
      throw new RangeError('Invalid input for Slice.fromJSON');
    return new Slice(Fragment.fromJSON(e, t.content), n, r);
  }
  static maxOpen(t, n = !0) {
    let r = 0,
      o = 0;
    for (
      let e = t.firstChild;
      e && !e.isLeaf && (n || !e.type.spec.isolating);
      e = e.firstChild
    )
      r++;
    for (
      let e = t.lastChild;
      e && !e.isLeaf && (n || !e.type.spec.isolating);
      e = e.lastChild
    )
      o++;
    return new Slice(t, r, o);
  }
}
function removeRange(e, t, n) {
  var { index: r, offset: o } = e.findIndex(t),
    i = e.maybeChild(r),
    { index: a, offset: s } = e.findIndex(n);
  if (o == t || i.isText) {
    if (s == n || e.child(a).isText) return e.cut(0, t).append(e.cut(n));
    throw new RangeError('Removing non-flat range');
  }
  if (r != a) throw new RangeError('Removing non-flat range');
  return e.replaceChild(
    r,
    i.copy(removeRange(i.content, t - o - 1, n - o - 1))
  );
}
function insertInto(e, t, n, r) {
  var { index: o, offset: i } = e.findIndex(t),
    a = e.maybeChild(o);
  return i == t || a.isText
    ? r && !r.canReplace(o, o, n)
      ? null
      : e.cut(0, t).append(n).append(e.cut(t))
    : (r = insertInto(a.content, t - i - 1, n)) && e.replaceChild(o, a.copy(r));
}
function replace(e, t, n) {
  if (n.openStart > e.depth)
    throw new ReplaceError('Inserted content deeper than insertion position');
  if (e.depth - n.openStart != t.depth - n.openEnd)
    throw new ReplaceError('Inconsistent open depths');
  return replaceOuter(e, t, n, 0);
}
function replaceOuter(e, t, n, r) {
  var o,
    i = e.index(r),
    a = e.node(r);
  return i == t.index(r) && r < e.depth - n.openStart
    ? ((o = replaceOuter(e, t, n, r + 1)), a.copy(a.content.replaceChild(i, o)))
    : n.content.size
    ? n.openStart || n.openEnd || e.depth != r || t.depth != r
      ? (({ start: i, end: o } = prepareSliceForReplace(n, e)),
        close(a, replaceThreeWay(e, i, o, t, r)))
      : close(
          (i = e.parent),
          (o = i.content)
            .cut(0, e.parentOffset)
            .append(n.content)
            .append(o.cut(t.parentOffset))
        )
    : close(a, replaceTwoWay(e, t, r));
}
function checkJoin(e, t) {
  if (!t.type.compatibleContent(e.type))
    throw new ReplaceError(
      'Cannot join ' + t.type.name + ' onto ' + e.type.name
    );
}
function joinable$1(e, t, n) {
  e = e.node(n);
  return checkJoin(e, t.node(n)), e;
}
function addNode(e, t) {
  var n = t.length - 1;
  0 <= n && e.isText && e.sameMarkup(t[n])
    ? (t[n] = e.withText(t[n].text + e.text))
    : t.push(e);
}
function addRange(e, t, n, r) {
  var o = (t || e).node(n);
  let i = 0,
    a = t ? t.index(n) : o.childCount;
  e &&
    ((i = e.index(n)),
    e.depth > n ? i++ : e.textOffset && (addNode(e.nodeAfter, r), i++));
  for (let e = i; e < a; e++) addNode(o.child(e), r);
  t && t.depth == n && t.textOffset && addNode(t.nodeBefore, r);
}
function close(e, t) {
  return e.type.checkContent(t), e.copy(t);
}
function replaceThreeWay(e, t, n, r, o) {
  var i = e.depth > o && joinable$1(e, t, o + 1),
    a = r.depth > o && joinable$1(n, r, o + 1),
    s = [];
  return (
    addRange(null, e, o, s),
    i && a && t.index(o) == n.index(o)
      ? (checkJoin(i, a),
        addNode(close(i, replaceThreeWay(e, t, n, r, o + 1)), s))
      : (i && addNode(close(i, replaceTwoWay(e, t, o + 1)), s),
        addRange(t, n, o, s),
        a && addNode(close(a, replaceTwoWay(n, r, o + 1)), s)),
    addRange(r, null, o, s),
    new Fragment(s)
  );
}
function replaceTwoWay(e, t, n) {
  var r = [];
  return (
    addRange(null, e, n, r),
    e.depth > n &&
      addNode(close(joinable$1(e, t, n + 1), replaceTwoWay(e, t, n + 1)), r),
    addRange(t, null, n, r),
    new Fragment(r)
  );
}
function prepareSliceForReplace(e, t) {
  var n = t.depth - e.openStart;
  let r = t.node(n).copy(e.content);
  for (let e = n - 1; 0 <= e; e--) r = t.node(e).copy(Fragment.from(r));
  return {
    start: r.resolveNoCache(e.openStart + n),
    end: r.resolveNoCache(r.content.size - e.openEnd - n),
  };
}
Slice.empty = new Slice(Fragment.empty, 0, 0);
class ResolvedPos {
  constructor(e, t, n) {
    (this.pos = e),
      (this.path = t),
      (this.parentOffset = n),
      (this.depth = t.length / 3 - 1);
  }
  resolveDepth(e) {
    return null == e ? this.depth : e < 0 ? this.depth + e : e;
  }
  get parent() {
    return this.node(this.depth);
  }
  get doc() {
    return this.node(0);
  }
  node(e) {
    return this.path[3 * this.resolveDepth(e)];
  }
  index(e) {
    return this.path[3 * this.resolveDepth(e) + 1];
  }
  indexAfter(e) {
    return (
      (e = this.resolveDepth(e)),
      this.index(e) + (e != this.depth || this.textOffset ? 1 : 0)
    );
  }
  start(e) {
    return 0 == (e = this.resolveDepth(e)) ? 0 : this.path[3 * e - 1] + 1;
  }
  end(e) {
    return (
      (e = this.resolveDepth(e)), this.start(e) + this.node(e).content.size
    );
  }
  before(e) {
    if ((e = this.resolveDepth(e)))
      return e == this.depth + 1 ? this.pos : this.path[3 * e - 1];
    throw new RangeError('There is no position before the top-level node');
  }
  after(e) {
    if ((e = this.resolveDepth(e)))
      return e == this.depth + 1
        ? this.pos
        : this.path[3 * e - 1] + this.path[3 * e].nodeSize;
    throw new RangeError('There is no position after the top-level node');
  }
  get textOffset() {
    return this.pos - this.path[this.path.length - 1];
  }
  get nodeAfter() {
    var e,
      t,
      n = this.parent,
      r = this.index(this.depth);
    return r == n.childCount
      ? null
      : ((e = this.pos - this.path[this.path.length - 1]),
        (t = n.child(r)),
        e ? n.child(r).cut(e) : t);
  }
  get nodeBefore() {
    var e = this.index(this.depth),
      t = this.pos - this.path[this.path.length - 1];
    return t
      ? this.parent.child(e).cut(0, t)
      : 0 == e
      ? null
      : this.parent.child(e - 1);
  }
  posAtIndex(t, e) {
    e = this.resolveDepth(e);
    let n = this.path[3 * e],
      r = 0 == e ? 0 : this.path[3 * e - 1] + 1;
    for (let e = 0; e < t; e++) r += n.child(e).nodeSize;
    return r;
  }
  marks() {
    var e = this.parent,
      t = this.index();
    if (0 == e.content.size) return Mark.none;
    if (this.textOffset) return e.child(t).marks;
    let n = e.maybeChild(t - 1),
      r = e.maybeChild(t),
      o = (n || ((e = n), (n = r), (r = e)), n.marks);
    for (var i = 0; i < o.length; i++)
      !1 !== o[i].type.spec.inclusive ||
        (r && o[i].isInSet(r.marks)) ||
        (o = o[i--].removeFromSet(o));
    return o;
  }
  marksAcross(e) {
    var t = this.parent.maybeChild(this.index());
    if (!t || !t.isInline) return null;
    let n = t.marks,
      r = e.parent.maybeChild(e.index());
    for (var o = 0; o < n.length; o++)
      !1 !== n[o].type.spec.inclusive ||
        (r && n[o].isInSet(r.marks)) ||
        (n = n[o--].removeFromSet(n));
    return n;
  }
  sharedDepth(t) {
    for (let e = this.depth; 0 < e; e--)
      if (this.start(e) <= t && this.end(e) >= t) return e;
    return 0;
  }
  blockRange(t = this, n) {
    if (t.pos < this.pos) return t.blockRange(this);
    for (
      let e =
        this.depth - (this.parent.inlineContent || this.pos == t.pos ? 1 : 0);
      0 <= e;
      e--
    )
      if (t.pos <= this.end(e) && (!n || n(this.node(e))))
        return new NodeRange(this, t, e);
    return null;
  }
  sameParent(e) {
    return this.pos - this.parentOffset == e.pos - e.parentOffset;
  }
  max(e) {
    return e.pos > this.pos ? e : this;
  }
  min(e) {
    return e.pos < this.pos ? e : this;
  }
  toString() {
    let t = '';
    for (let e = 1; e <= this.depth; e++)
      t += (t ? '/' : '') + this.node(e).type.name + '_' + this.index(e - 1);
    return t + ':' + this.parentOffset;
  }
  static resolve(t, e) {
    if (!(0 <= e && e <= t.content.size))
      throw new RangeError('Position ' + e + ' out of range');
    var n = [];
    let r = 0,
      o = e;
    for (let e = t; ; ) {
      var { index: i, offset: a } = e.content.findIndex(o),
        s = o - a;
      if ((n.push(e, i, r + a), !s)) break;
      if ((e = e.child(i)).isText) break;
      (o = s - 1), (r += a + 1);
    }
    return new ResolvedPos(e, n, o);
  }
  static resolveCached(t, n) {
    for (let e = 0; e < resolveCache.length; e++) {
      var r = resolveCache[e];
      if (r.pos == n && r.doc == t) return r;
    }
    var e = (resolveCache[resolveCachePos] = ResolvedPos.resolve(t, n));
    return (resolveCachePos = (resolveCachePos + 1) % resolveCacheSize), e;
  }
}
let resolveCache = [],
  resolveCachePos = 0,
  resolveCacheSize = 12;
class NodeRange {
  constructor(e, t, n) {
    (this.$from = e), (this.$to = t), (this.depth = n);
  }
  get start() {
    return this.$from.before(this.depth + 1);
  }
  get end() {
    return this.$to.after(this.depth + 1);
  }
  get parent() {
    return this.$from.node(this.depth);
  }
  get startIndex() {
    return this.$from.index(this.depth);
  }
  get endIndex() {
    return this.$to.indexAfter(this.depth);
  }
}
const emptyAttrs = Object.create(null);
class Node {
  constructor(e, t, n, r = Mark.none) {
    (this.type = e),
      (this.attrs = t),
      (this.marks = r),
      (this.content = n || Fragment.empty);
  }
  get nodeSize() {
    return this.isLeaf ? 1 : 2 + this.content.size;
  }
  get childCount() {
    return this.content.childCount;
  }
  child(e) {
    return this.content.child(e);
  }
  maybeChild(e) {
    return this.content.maybeChild(e);
  }
  forEach(e) {
    this.content.forEach(e);
  }
  nodesBetween(e, t, n, r = 0) {
    this.content.nodesBetween(e, t, n, r, this);
  }
  descendants(e) {
    this.nodesBetween(0, this.content.size, e);
  }
  get textContent() {
    return this.isLeaf && this.type.spec.leafText
      ? this.type.spec.leafText(this)
      : this.textBetween(0, this.content.size, '');
  }
  textBetween(e, t, n, r) {
    return this.content.textBetween(e, t, n, r);
  }
  get firstChild() {
    return this.content.firstChild;
  }
  get lastChild() {
    return this.content.lastChild;
  }
  eq(e) {
    return this == e || (this.sameMarkup(e) && this.content.eq(e.content));
  }
  sameMarkup(e) {
    return this.hasMarkup(e.type, e.attrs, e.marks);
  }
  hasMarkup(e, t, n) {
    return (
      this.type == e &&
      compareDeep(this.attrs, t || e.defaultAttrs || emptyAttrs) &&
      Mark.sameSet(this.marks, n || Mark.none)
    );
  }
  copy(e = null) {
    return e == this.content
      ? this
      : new Node(this.type, this.attrs, e, this.marks);
  }
  mark(e) {
    return e == this.marks
      ? this
      : new Node(this.type, this.attrs, this.content, e);
  }
  cut(e, t = this.content.size) {
    return 0 == e && t == this.content.size
      ? this
      : this.copy(this.content.cut(e, t));
  }
  slice(e, t = this.content.size, n = !1) {
    var r;
    return e == t
      ? Slice.empty
      : ((e = this.resolve(e)),
        (r = this.resolve(t)),
        (n = n ? 0 : e.sharedDepth(t)),
        (t = e.start(n)),
        (t = e.node(n).content.cut(e.pos - t, r.pos - t)),
        new Slice(t, e.depth - n, r.depth - n));
  }
  replace(e, t, n) {
    return replace(this.resolve(e), this.resolve(t), n);
  }
  nodeAt(t) {
    for (let e = this; ; ) {
      var { index: n, offset: r } = e.content.findIndex(t);
      if (!(e = e.maybeChild(n))) return null;
      if (r == t || e.isText) return e;
      t -= r + 1;
    }
  }
  childAfter(e) {
    var { index: e, offset: t } = this.content.findIndex(e);
    return { node: this.content.maybeChild(e), index: e, offset: t };
  }
  childBefore(e) {
    var t, n;
    return 0 == e
      ? { node: null, index: 0, offset: 0 }
      : (({ index: t, offset: n } = this.content.findIndex(e)),
        n < e
          ? { node: this.content.child(t), index: t, offset: n }
          : {
              node: (e = this.content.child(t - 1)),
              index: t - 1,
              offset: n - e.nodeSize,
            });
  }
  resolve(e) {
    return ResolvedPos.resolveCached(this, e);
  }
  resolveNoCache(e) {
    return ResolvedPos.resolve(this, e);
  }
  rangeHasMark(e, t, n) {
    let r = !1;
    return (
      e < t &&
        this.nodesBetween(e, t, (e) => !(r = n.isInSet(e.marks) ? !0 : r)),
      r
    );
  }
  get isBlock() {
    return this.type.isBlock;
  }
  get isTextblock() {
    return this.type.isTextblock;
  }
  get inlineContent() {
    return this.type.inlineContent;
  }
  get isInline() {
    return this.type.isInline;
  }
  get isText() {
    return this.type.isText;
  }
  get isLeaf() {
    return this.type.isLeaf;
  }
  get isAtom() {
    return this.type.isAtom;
  }
  toString() {
    if (this.type.spec.toDebugString) return this.type.spec.toDebugString(this);
    let e = this.type.name;
    return (
      this.content.size && (e += '(' + this.content.toStringInner() + ')'),
      wrapMarks(this.marks, e)
    );
  }
  contentMatchAt(e) {
    e = this.type.contentMatch.matchFragment(this.content, 0, e);
    if (e) return e;
    throw new Error('Called contentMatchAt on a node with invalid content');
  }
  canReplace(e, t, n = Fragment.empty, r = 0, o = n.childCount) {
    (e = this.contentMatchAt(e).matchFragment(n, r, o)),
      (e = e && e.matchFragment(this.content, t));
    if (!e || !e.validEnd) return !1;
    for (let e = r; e < o; e++)
      if (!this.type.allowsMarks(n.child(e).marks)) return !1;
    return !0;
  }
  canReplaceWith(e, t, n, r) {
    return (
      !(
        (r && !this.type.allowsMarks(r)) ||
        !(e =
          (r = this.contentMatchAt(e).matchType(n)) &&
          r.matchFragment(this.content, t))
      ) && e.validEnd
    );
  }
  canAppend(e) {
    return e.content.size
      ? this.canReplace(this.childCount, this.childCount, e.content)
      : this.type.compatibleContent(e.type);
  }
  check() {
    this.type.checkContent(this.content);
    let t = Mark.none;
    for (let e = 0; e < this.marks.length; e++) t = this.marks[e].addToSet(t);
    if (!Mark.sameSet(t, this.marks))
      throw new RangeError(
        `Invalid collection of marks for node ${this.type.name}: ` +
          this.marks.map((e) => e.type.name)
      );
    this.content.forEach((e) => e.check());
  }
  toJSON() {
    var e,
      t = { type: this.type.name };
    for (e in this.attrs) {
      t.attrs = this.attrs;
      break;
    }
    return (
      this.content.size && (t.content = this.content.toJSON()),
      this.marks.length && (t.marks = this.marks.map((e) => e.toJSON())),
      t
    );
  }
  static fromJSON(e, t) {
    if (!t) throw new RangeError('Invalid input for Node.fromJSON');
    let n = null;
    if (t.marks) {
      if (!Array.isArray(t.marks))
        throw new RangeError('Invalid mark data for Node.fromJSON');
      n = t.marks.map(e.markFromJSON);
    }
    if ('text' == t.type) {
      if ('string' != typeof t.text)
        throw new RangeError('Invalid text node in JSON');
      return e.text(t.text, n);
    }
    var r = Fragment.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, r, n);
  }
}
Node.prototype.text = void 0;
class TextNode extends Node {
  constructor(e, t, n, r) {
    if ((super(e, t, null, r), !n))
      throw new RangeError('Empty text nodes are not allowed');
    this.text = n;
  }
  toString() {
    return this.type.spec.toDebugString
      ? this.type.spec.toDebugString(this)
      : wrapMarks(this.marks, JSON.stringify(this.text));
  }
  get textContent() {
    return this.text;
  }
  textBetween(e, t) {
    return this.text.slice(e, t);
  }
  get nodeSize() {
    return this.text.length;
  }
  mark(e) {
    return e == this.marks
      ? this
      : new TextNode(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text
      ? this
      : new TextNode(this.type, this.attrs, e, this.marks);
  }
  cut(e = 0, t = this.text.length) {
    return 0 == e && t == this.text.length
      ? this
      : this.withText(this.text.slice(e, t));
  }
  eq(e) {
    return this.sameMarkup(e) && this.text == e.text;
  }
  toJSON() {
    var e = super.toJSON();
    return (e.text = this.text), e;
  }
}
function wrapMarks(t, n) {
  for (let e = t.length - 1; 0 <= e; e--) n = t[e].type.name + '(' + n + ')';
  return n;
}
class ContentMatch {
  constructor(e) {
    (this.validEnd = e), (this.next = []), (this.wrapCache = []);
  }
  static parse(e, t) {
    e = new TokenStream(e, t);
    return null == e.next
      ? ContentMatch.empty
      : ((t = parseExpr(e)),
        e.next && e.err('Unexpected trailing text'),
        checkForDeadEnds((t = dfa(nfa(t))), e),
        t);
  }
  matchType(t) {
    for (let e = 0; e < this.next.length; e++)
      if (this.next[e].type == t) return this.next[e].next;
    return null;
  }
  matchFragment(t, n = 0, r = t.childCount) {
    let o = this;
    for (let e = n; o && e < r; e++) o = o.matchType(t.child(e).type);
    return o;
  }
  get inlineContent() {
    return 0 != this.next.length && this.next[0].type.isInline;
  }
  get defaultType() {
    for (let e = 0; e < this.next.length; e++) {
      var t = this.next[e]['type'];
      if (!t.isText && !t.hasRequiredAttrs()) return t;
    }
    return null;
  }
  compatible(n) {
    for (let t = 0; t < this.next.length; t++)
      for (let e = 0; e < n.next.length; e++)
        if (this.next[t].type == n.next[e].type) return !0;
    return !1;
  }
  fillBefore(a, s = !1, l = 0) {
    let c = [this];
    return (function t(n, r) {
      var e = n.matchFragment(a, l);
      if (e && (!s || e.validEnd))
        return Fragment.from(r.map((e) => e.createAndFill()));
      for (let e = 0; e < n.next.length; e++) {
        var { type: o, next: i } = n.next[e];
        if (
          !o.isText &&
          !o.hasRequiredAttrs() &&
          -1 == c.indexOf(i) &&
          (c.push(i), (i = t(i, r.concat(o))))
        )
          return i;
      }
      return null;
    })(this, []);
  }
  findWrapping(t) {
    for (let e = 0; e < this.wrapCache.length; e += 2)
      if (this.wrapCache[e] == t) return this.wrapCache[e + 1];
    var e = this.computeWrapping(t);
    return this.wrapCache.push(t, e), e;
  }
  computeWrapping(e) {
    for (
      var t = Object.create(null), n = [{ match: this, type: null, via: null }];
      n.length;

    ) {
      var r = n.shift(),
        o = r.match;
      if (o.matchType(e)) {
        var i = [];
        for (let e = r; e.type; e = e.via) i.push(e.type);
        return i.reverse();
      }
      for (let e = 0; e < o.next.length; e++) {
        var { type: a, next: s } = o.next[e];
        a.isLeaf ||
          a.hasRequiredAttrs() ||
          a.name in t ||
          (r.type && !s.validEnd) ||
          (n.push({ match: a.contentMatch, type: a, via: r }),
          (t[a.name] = !0));
      }
    }
    return null;
  }
  get edgeCount() {
    return this.next.length;
  }
  edge(e) {
    if (e >= this.next.length)
      throw new RangeError(`There's no ${e}th edge in this content match`);
    return this.next[e];
  }
  toString() {
    let r = [];
    return (
      (function t(n) {
        r.push(n);
        for (let e = 0; e < n.next.length; e++)
          -1 == r.indexOf(n.next[e].next) && t(n.next[e].next);
      })(this),
      r
        .map((t, e) => {
          let n = e + (t.validEnd ? '*' : ' ') + ' ';
          for (let e = 0; e < t.next.length; e++)
            n +=
              (e ? ', ' : '') +
              t.next[e].type.name +
              '->' +
              r.indexOf(t.next[e].next);
          return n;
        })
        .join('\n')
    );
  }
}
ContentMatch.empty = new ContentMatch(!0);
class TokenStream {
  constructor(e, t) {
    (this.string = e),
      (this.nodeTypes = t),
      (this.inline = null),
      (this.pos = 0),
      (this.tokens = e.split(/\s*(?=\b|\W|$)/)),
      '' == this.tokens[this.tokens.length - 1] && this.tokens.pop(),
      '' == this.tokens[0] && this.tokens.shift();
  }
  get next() {
    return this.tokens[this.pos];
  }
  eat(e) {
    return this.next == e && (this.pos++ || !0);
  }
  err(e) {
    throw new SyntaxError(e + " (in content expression '" + this.string + "')");
  }
}
function parseExpr(e) {
  for (var t = []; t.push(parseExprSeq(e)), e.eat('|'); );
  return 1 == t.length ? t[0] : { type: 'choice', exprs: t };
}
function parseExprSeq(e) {
  for (
    var t = [];
    t.push(parseExprSubscript(e)), e.next && ')' != e.next && '|' != e.next;

  );
  return 1 == t.length ? t[0] : { type: 'seq', exprs: t };
}
function parseExprSubscript(e) {
  let t = parseExprAtom(e);
  for (;;)
    if (e.eat('+')) t = { type: 'plus', expr: t };
    else if (e.eat('*')) t = { type: 'star', expr: t };
    else if (e.eat('?')) t = { type: 'opt', expr: t };
    else {
      if (!e.eat('{')) break;
      t = parseExprRange(e, t);
    }
  return t;
}
function parseNum(e) {
  /\D/.test(e.next) && e.err("Expected number, got '" + e.next + "'");
  var t = Number(e.next);
  return e.pos++, t;
}
function parseExprRange(e, t) {
  let n = parseNum(e),
    r = n;
  return (
    e.eat(',') && (r = '}' != e.next ? parseNum(e) : -1),
    e.eat('}') || e.err('Unclosed braced range'),
    { type: 'range', min: n, max: r, expr: t }
  );
}
function resolveName(e, t) {
  var n = e.nodeTypes,
    r = n[t];
  if (r) return [r];
  var o,
    i = [];
  for (o in n) {
    var a = n[o];
    -1 < a.groups.indexOf(t) && i.push(a);
  }
  return 0 == i.length && e.err("No node type or group '" + t + "' found"), i;
}
function parseExprAtom(t) {
  var e;
  return t.eat('(')
    ? ((e = parseExpr(t)), t.eat(')') || t.err('Missing closing paren'), e)
    : /\W/.test(t.next)
    ? void t.err("Unexpected token '" + t.next + "'")
    : ((e = resolveName(t, t.next).map(
        (e) => (
          null == t.inline
            ? (t.inline = e.isInline)
            : t.inline != e.isInline &&
              t.err('Mixing inline and block content'),
          { type: 'name', value: e }
        )
      )),
      t.pos++,
      1 == e.length ? e[0] : { type: 'choice', exprs: e });
}
function nfa(e) {
  let r = [[]];
  return (
    s(
      (function n(r, o) {
        {
          if ('choice' == r.type)
            return r.exprs.reduce((e, t) => e.concat(n(t, o)), []);
          if ('seq' != r.type) {
            if ('star' == r.type) {
              let e = i();
              return a(o, e), s(n(r.expr, e), e), [a(e)];
            }
            if ('plus' == r.type) {
              let e = i();
              return s(n(r.expr, o), e), s(n(r.expr, e), e), [a(e)];
            }
            if ('opt' == r.type) return [a(o)].concat(n(r.expr, o));
            if ('range' == r.type) {
              let t = o;
              for (let e = 0; e < r.min; e++) {
                let e = i();
                s(n(r.expr, t), e), (t = e);
              }
              if (-1 == r.max) s(n(r.expr, t), t);
              else
                for (let e = r.min; e < r.max; e++) {
                  let e = i();
                  a(t, e), s(n(r.expr, t), e), (t = e);
                }
              return [a(t)];
            }
            if ('name' == r.type) return [a(o, void 0, r.value)];
            throw new Error('Unknown expr type');
          }
          for (let t = 0; ; t++) {
            let e = n(r.exprs[t], o);
            if (t == r.exprs.length - 1) return e;
            s(e, (o = i()));
          }
        }
      })(e, 0),
      i()
    ),
    r
  );
  function i() {
    return r.push([]) - 1;
  }
  function a(e, t, n) {
    n = { term: n, to: t };
    return r[e].push(n), n;
  }
  function s(e, t) {
    e.forEach((e) => (e.to = t));
  }
}
function cmp(e, t) {
  return t - e;
}
function nullFrom(t, e) {
  let i = [];
  return (
    (function r(e) {
      let o = t[e];
      if (1 == o.length && !o[0].term) return r(o[0].to);
      i.push(e);
      for (let n = 0; n < o.length; n++) {
        let { term: e, to: t } = o[n];
        e || -1 != i.indexOf(t) || r(t);
      }
    })(e),
    i.sort(cmp)
  );
}
function dfa(i) {
  let a = Object.create(null);
  return (function n(e) {
    let r = [];
    e.forEach((e) => {
      i[e].forEach(({ term: n, to: e }) => {
        if (n) {
          let t;
          for (let e = 0; e < r.length; e++) r[e][0] == n && (t = r[e][1]);
          nullFrom(i, e).forEach((e) => {
            t || r.push([n, (t = [])]), -1 == t.indexOf(e) && t.push(e);
          });
        }
      });
    });
    let o = (a[e.join(',')] = new ContentMatch(-1 < e.indexOf(i.length - 1)));
    for (let t = 0; t < r.length; t++) {
      let e = r[t][1].sort(cmp);
      o.next.push({ type: r[t][0], next: a[e.join(',')] || n(e) });
    }
    return o;
  })(nullFrom(i, 0));
}
function checkForDeadEnds(t, i) {
  for (let e = 0, o = [t]; e < o.length; e++) {
    let t = o[e],
      n = !t.validEnd,
      r = [];
    for (let e = 0; e < t.next.length; e++) {
      var { type: a, next: s } = t.next[e];
      r.push(a.name),
        !n || a.isText || a.hasRequiredAttrs() || (n = !1),
        -1 == o.indexOf(s) && o.push(s);
    }
    n &&
      i.err(
        'Only non-generatable nodes (' +
          r.join(', ') +
          ') in a required position (see https://prosemirror.net/docs/guide/#generatable)'
      );
  }
}
function defaultAttrs(e) {
  var t,
    n = Object.create(null);
  for (t in e) {
    var r = e[t];
    if (!r.hasDefault) return null;
    n[t] = r.default;
  }
  return n;
}
function computeAttrs(t, n) {
  var r,
    o = Object.create(null);
  for (r in t) {
    let e = n && n[r];
    if (void 0 === e) {
      var i = t[r];
      if (!i.hasDefault)
        throw new RangeError('No value supplied for attribute ' + r);
      e = i.default;
    }
    o[r] = e;
  }
  return o;
}
function initAttrs(e) {
  var t = Object.create(null);
  if (e) for (var n in e) t[n] = new Attribute(e[n]);
  return t;
}
class NodeType$1 {
  constructor(e, t, n) {
    (this.name = e),
      (this.schema = t),
      (this.spec = n),
      (this.markSet = null),
      (this.groups = n.group ? n.group.split(' ') : []),
      (this.attrs = initAttrs(n.attrs)),
      (this.defaultAttrs = defaultAttrs(this.attrs)),
      (this.contentMatch = null),
      (this.inlineContent = null),
      (this.isBlock = !(n.inline || 'text' == e)),
      (this.isText = 'text' == e);
  }
  get isInline() {
    return !this.isBlock;
  }
  get isTextblock() {
    return this.isBlock && this.inlineContent;
  }
  get isLeaf() {
    return this.contentMatch == ContentMatch.empty;
  }
  get isAtom() {
    return this.isLeaf || !!this.spec.atom;
  }
  get whitespace() {
    return this.spec.whitespace || (this.spec.code ? 'pre' : 'normal');
  }
  hasRequiredAttrs() {
    for (var e in this.attrs) if (this.attrs[e].isRequired) return !0;
    return !1;
  }
  compatibleContent(e) {
    return this == e || this.contentMatch.compatible(e.contentMatch);
  }
  computeAttrs(e) {
    return !e && this.defaultAttrs
      ? this.defaultAttrs
      : computeAttrs(this.attrs, e);
  }
  create(e = null, t, n) {
    if (this.isText)
      throw new Error("NodeType.create can't construct text nodes");
    return new Node(
      this,
      this.computeAttrs(e),
      Fragment.from(t),
      Mark.setFrom(n)
    );
  }
  createChecked(e = null, t, n) {
    return (
      (t = Fragment.from(t)),
      this.checkContent(t),
      new Node(this, this.computeAttrs(e), t, Mark.setFrom(n))
    );
  }
  createAndFill(e = null, t, n) {
    if (((e = this.computeAttrs(e)), (t = Fragment.from(t)).size)) {
      var r = this.contentMatch.fillBefore(t);
      if (!r) return null;
      t = r.append(t);
    }
    (r = this.contentMatch.matchFragment(t)),
      (r = r && r.fillBefore(Fragment.empty, !0));
    return r ? new Node(this, e, t.append(r), Mark.setFrom(n)) : null;
  }
  validContent(t) {
    var e = this.contentMatch.matchFragment(t);
    if (!e || !e.validEnd) return !1;
    for (let e = 0; e < t.childCount; e++)
      if (!this.allowsMarks(t.child(e).marks)) return !1;
    return !0;
  }
  checkContent(e) {
    if (!this.validContent(e))
      throw new RangeError(
        `Invalid content for node ${this.name}: ` + e.toString().slice(0, 50)
      );
  }
  allowsMarkType(e) {
    return null == this.markSet || -1 < this.markSet.indexOf(e);
  }
  allowsMarks(t) {
    if (null != this.markSet)
      for (let e = 0; e < t.length; e++)
        if (!this.allowsMarkType(t[e].type)) return !1;
    return !0;
  }
  allowedMarks(t) {
    if (null == this.markSet) return t;
    let n;
    for (let e = 0; e < t.length; e++)
      this.allowsMarkType(t[e].type)
        ? n && n.push(t[e])
        : (n = n || t.slice(0, e));
    return n ? (n.length ? n : Mark.none) : t;
  }
  static compile(e, n) {
    let r = Object.create(null);
    e.forEach((e, t) => (r[e] = new NodeType$1(e, n, t)));
    var t,
      e = n.spec.topNode || 'doc';
    if (!r[e])
      throw new RangeError("Schema is missing its top node type ('" + e + "')");
    if (!r.text) throw new RangeError("Every schema needs a 'text' type");
    for (t in r.text.attrs)
      throw new RangeError('The text node type should not have attributes');
    return r;
  }
}
class Attribute {
  constructor(e) {
    (this.hasDefault = Object.prototype.hasOwnProperty.call(e, 'default')),
      (this.default = e.default);
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class MarkType {
  constructor(e, t, n, r) {
    (this.name = e),
      (this.rank = t),
      (this.schema = n),
      (this.spec = r),
      (this.attrs = initAttrs(r.attrs)),
      (this.excluded = null);
    e = defaultAttrs(this.attrs);
    this.instance = e ? new Mark(this, e) : null;
  }
  create(e = null) {
    return !e && this.instance
      ? this.instance
      : new Mark(this, computeAttrs(this.attrs, e));
  }
  static compile(e, n) {
    let r = Object.create(null),
      o = 0;
    return e.forEach((e, t) => (r[e] = new MarkType(e, o++, n, t))), r;
  }
  removeFromSet(e) {
    for (var t = 0; t < e.length; t++)
      e[t].type == this && ((e = e.slice(0, t).concat(e.slice(t + 1))), t--);
    return e;
  }
  isInSet(t) {
    for (let e = 0; e < t.length; e++) if (t[e].type == this) return t[e];
  }
  excludes(e) {
    return -1 < this.excluded.indexOf(e);
  }
}
class Schema {
  constructor(e) {
    this.cached = Object.create(null);
    var t,
      n = (this.spec = {});
    for (t in e) n[t] = e[t];
    (n.nodes = OrderedMap.from(e.nodes)),
      (n.marks = OrderedMap.from(e.marks || {})),
      (this.nodes = NodeType$1.compile(this.spec.nodes, this)),
      (this.marks = MarkType.compile(this.spec.marks, this));
    var r,
      o,
      i = Object.create(null);
    for (r in this.nodes) {
      if (r in this.marks)
        throw new RangeError(r + ' can not be both a node and a mark');
      var a = this.nodes[r],
        s = a.spec.content || '',
        l = a.spec.marks;
      (a.contentMatch = i[s] || (i[s] = ContentMatch.parse(s, this.nodes))),
        (a.inlineContent = a.contentMatch.inlineContent),
        (a.markSet =
          '_' == l
            ? null
            : l
            ? gatherMarks(this, l.split(' '))
            : '' != l && a.inlineContent
            ? null
            : []);
    }
    for (o in this.marks) {
      var c = this.marks[o],
        u = c.spec.excludes;
      c.excluded =
        null == u ? [c] : '' == u ? [] : gatherMarks(this, u.split(' '));
    }
    (this.nodeFromJSON = this.nodeFromJSON.bind(this)),
      (this.markFromJSON = this.markFromJSON.bind(this)),
      (this.topNodeType = this.nodes[this.spec.topNode || 'doc']),
      (this.cached.wrappings = Object.create(null));
  }
  node(e, t = null, n, r) {
    if ('string' == typeof e) e = this.nodeType(e);
    else {
      if (!(e instanceof NodeType$1))
        throw new RangeError('Invalid node type: ' + e);
      if (e.schema != this)
        throw new RangeError(
          'Node type from different schema used (' + e.name + ')'
        );
    }
    return e.createChecked(t, n, r);
  }
  text(e, t) {
    var n = this.nodes.text;
    return new TextNode(n, n.defaultAttrs, e, Mark.setFrom(t));
  }
  mark(e, t) {
    return (e = 'string' == typeof e ? this.marks[e] : e).create(t);
  }
  nodeFromJSON(e) {
    return Node.fromJSON(this, e);
  }
  markFromJSON(e) {
    return Mark.fromJSON(this, e);
  }
  nodeType(e) {
    var t = this.nodes[e];
    if (t) return t;
    throw new RangeError('Unknown node type: ' + e);
  }
}
function gatherMarks(o, i) {
  var a = [];
  for (let r = 0; r < i.length; r++) {
    let e = i[r],
      t = o.marks[e],
      n = t;
    if (t) a.push(t);
    else
      for (var s in o.marks) {
        s = o.marks[s];
        ('_' == e ||
          (s.spec.group && -1 < s.spec.group.split(' ').indexOf(e))) &&
          a.push((n = s));
      }
    if (!n) throw new SyntaxError("Unknown mark type: '" + i[r] + "'");
  }
  return a;
}
class DOMParser$1 {
  constructor(t, e) {
    (this.schema = t),
      (this.rules = e),
      (this.tags = []),
      (this.styles = []),
      e.forEach((e) => {
        e.tag ? this.tags.push(e) : e.style && this.styles.push(e);
      }),
      (this.normalizeLists = !this.tags.some((e) => {
        return (
          !(!/^(ul|ol)\b/.test(e.tag) || !e.node) &&
          (e = t.nodes[e.node]).contentMatch.matchType(e)
        );
      }));
  }
  parse(e, t = {}) {
    var n = new ParseContext(this, t, !1);
    return n.addAll(e, t.from, t.to), n.finish();
  }
  parseSlice(e, t = {}) {
    var n = new ParseContext(this, t, !0);
    return n.addAll(e, t.from, t.to), Slice.maxOpen(n.finish());
  }
  matchTag(t, n, r) {
    for (let e = r ? this.tags.indexOf(r) + 1 : 0; e < this.tags.length; e++) {
      var o = this.tags[e];
      if (
        matches(t, o.tag) &&
        (void 0 === o.namespace || t.namespaceURI == o.namespace) &&
        (!o.context || n.matchesContext(o.context))
      ) {
        if (o.getAttrs) {
          var i = o.getAttrs(t);
          if (!1 === i) continue;
          o.attrs = i || void 0;
        }
        return o;
      }
    }
  }
  matchStyle(t, n, r, o) {
    for (
      let e = o ? this.styles.indexOf(o) + 1 : 0;
      e < this.styles.length;
      e++
    ) {
      var i = this.styles[e],
        a = i.style;
      if (
        !(
          0 != a.indexOf(t) ||
          (i.context && !r.matchesContext(i.context)) ||
          (a.length > t.length &&
            (61 != a.charCodeAt(t.length) || a.slice(t.length + 1) != n))
        )
      ) {
        if (i.getAttrs) {
          a = i.getAttrs(n);
          if (!1 === a) continue;
          i.attrs = a || void 0;
        }
        return i;
      }
    }
  }
  static schemaRules(e) {
    let o = [];
    function n(e) {
      let t = null == e.priority ? 50 : e.priority,
        n = 0;
      for (; n < o.length; n++) {
        var r = o[n];
        if ((null == r.priority ? 50 : r.priority) < t) break;
      }
      o.splice(n, 0, e);
    }
    for (let t in e.marks) {
      var r = e.marks[t].spec.parseDOM;
      r &&
        r.forEach((e) => {
          n((e = copy$1(e))), e.mark || e.ignore || e.clearMark || (e.mark = t);
        });
    }
    for (let t in e.nodes) {
      var i = e.nodes[t].spec.parseDOM;
      i &&
        i.forEach((e) => {
          n((e = copy$1(e))), e.node || e.ignore || e.mark || (e.node = t);
        });
    }
    return o;
  }
  static fromSchema(e) {
    return (
      e.cached.domParser ||
      (e.cached.domParser = new DOMParser$1(e, DOMParser$1.schemaRules(e)))
    );
  }
}
const blockTags = {
    address: !0,
    article: !0,
    aside: !0,
    blockquote: !0,
    canvas: !0,
    dd: !0,
    div: !0,
    dl: !0,
    fieldset: !0,
    figcaption: !0,
    figure: !0,
    footer: !0,
    form: !0,
    h1: !0,
    h2: !0,
    h3: !0,
    h4: !0,
    h5: !0,
    h6: !0,
    header: !0,
    hgroup: !0,
    hr: !0,
    li: !0,
    noscript: !0,
    ol: !0,
    output: !0,
    p: !0,
    pre: !0,
    section: !0,
    table: !0,
    tfoot: !0,
    ul: !0,
  },
  ignoreTags = {
    head: !0,
    noscript: !0,
    object: !0,
    script: !0,
    style: !0,
    title: !0,
  },
  listTags = { ol: !0, ul: !0 },
  OPT_PRESERVE_WS = 1,
  OPT_PRESERVE_WS_FULL = 2,
  OPT_OPEN_LEFT = 4;
function wsOptionsFor(e, t, n) {
  return null != t
    ? (t ? OPT_PRESERVE_WS : 0) | ('full' === t ? OPT_PRESERVE_WS_FULL : 0)
    : e && 'pre' == e.whitespace
    ? OPT_PRESERVE_WS | OPT_PRESERVE_WS_FULL
    : n & ~OPT_OPEN_LEFT;
}
class NodeContext {
  constructor(e, t, n, r, o, i, a) {
    (this.type = e),
      (this.attrs = t),
      (this.marks = n),
      (this.pendingMarks = r),
      (this.solid = o),
      (this.options = a),
      (this.content = []),
      (this.activeMarks = Mark.none),
      (this.stashMarks = []),
      (this.match = i || (a & OPT_OPEN_LEFT ? null : e.contentMatch));
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type) return [];
      var t,
        n,
        r = this.type.contentMatch.fillBefore(Fragment.from(e));
      if (!r)
        return (n = (t = this.type.contentMatch).findWrapping(e.type))
          ? ((this.match = t), n)
          : null;
      this.match = this.type.contentMatch.matchFragment(r);
    }
    return this.match.findWrapping(e.type);
  }
  finish(e) {
    if (!(this.options & OPT_PRESERVE_WS)) {
      let e = this.content[this.content.length - 1],
        t;
      var n;
      e &&
        e.isText &&
        (t = /[ \t\r\n\u000c]+$/.exec(e.text)) &&
        ((n = e).text.length == t[0].length
          ? this.content.pop()
          : (this.content[this.content.length - 1] = n.withText(
              n.text.slice(0, n.text.length - t[0].length)
            )));
    }
    let t = Fragment.from(this.content);
    return (
      !e &&
        this.match &&
        (t = t.append(this.match.fillBefore(Fragment.empty, !0))),
      this.type ? this.type.create(this.attrs, t, this.marks) : t
    );
  }
  popFromStashMark(t) {
    for (let e = this.stashMarks.length - 1; 0 <= e; e--)
      if (t.eq(this.stashMarks[e])) return this.stashMarks.splice(e, 1)[0];
  }
  applyPending(n) {
    for (let e = 0, t = this.pendingMarks; e < t.length; e++) {
      var r = t[e];
      (this.type
        ? this.type.allowsMarkType(r.type)
        : markMayApply(r.type, n)) &&
        !r.isInSet(this.activeMarks) &&
        ((this.activeMarks = r.addToSet(this.activeMarks)),
        (this.pendingMarks = r.removeFromSet(this.pendingMarks)));
    }
  }
  inlineContext(e) {
    return this.type
      ? this.type.inlineContent
      : this.content.length
      ? this.content[0].isInline
      : e.parentNode &&
        !blockTags.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class ParseContext {
  constructor(e, t, n) {
    (this.parser = e), (this.options = t), (this.isOpen = n), (this.open = 0);
    let r = t.topNode,
      o;
    var i =
      wsOptionsFor(null, t.preserveWhitespace, 0) | (n ? OPT_OPEN_LEFT : 0);
    (o = r
      ? new NodeContext(
          r.type,
          r.attrs,
          Mark.none,
          Mark.none,
          !0,
          t.topMatch || r.type.contentMatch,
          i
        )
      : n
      ? new NodeContext(null, null, Mark.none, Mark.none, !0, null, i)
      : new NodeContext(
          e.schema.topNodeType,
          null,
          Mark.none,
          Mark.none,
          !0,
          null,
          i
        )),
      (this.nodes = [o]),
      (this.find = t.findPositions),
      (this.needsBlock = !1);
  }
  get top() {
    return this.nodes[this.open];
  }
  addDOM(e) {
    3 == e.nodeType
      ? this.addTextNode(e)
      : 1 == e.nodeType && this.addElement(e);
  }
  withStyleRules(e, t) {
    e = e.getAttribute('style');
    if (!e) return t();
    e = this.readStyles(parseStyles(e));
    if (e) {
      var [n, r] = e,
        o = this.top;
      for (let e = 0; e < r.length; e++) this.removePendingMark(r[e], o);
      for (let e = 0; e < n.length; e++) this.addPendingMark(n[e]);
      t();
      for (let e = 0; e < n.length; e++) this.removePendingMark(n[e], o);
      for (let e = 0; e < r.length; e++) this.addPendingMark(r[e]);
    }
  }
  addTextNode(e) {
    let t = e.nodeValue;
    var n,
      r = this.top;
    r.options & OPT_PRESERVE_WS_FULL ||
    r.inlineContext(e) ||
    /[^ \t\r\n\u000c]/.test(t)
      ? (r.options & OPT_PRESERVE_WS
          ? (t =
              r.options & OPT_PRESERVE_WS_FULL
                ? t.replace(/\r\n?/g, '\n')
                : t.replace(/\r?\n|\r/g, ' '))
          : ((t = t.replace(/[ \t\r\n\u000c]+/g, ' ')),
            /^[ \t\r\n\u000c]/.test(t) &&
              this.open == this.nodes.length - 1 &&
              ((r = r.content[r.content.length - 1]),
              (n = e.previousSibling),
              !r ||
                (n && 'BR' == n.nodeName) ||
                (r.isText && /[ \t\r\n\u000c]$/.test(r.text))) &&
              (t = t.slice(1))),
        t && this.insertNode(this.parser.schema.text(t)),
        this.findInText(e))
      : this.findInside(e);
  }
  addElement(r, e) {
    let o = r.nodeName.toLowerCase(),
      t,
      i =
        (listTags.hasOwnProperty(o) &&
          this.parser.normalizeLists &&
          normalizeList(r),
        (this.options.ruleFromNode && this.options.ruleFromNode(r)) ||
          (t = this.parser.matchTag(r, this, e)));
    if (i ? i.ignore : ignoreTags.hasOwnProperty(o))
      this.findInside(r), this.ignoreFallback(r);
    else if (!i || i.skip || i.closeParent) {
      i && i.closeParent
        ? (this.open = Math.max(0, this.open - 1))
        : i && i.skip.nodeType && (r = i.skip);
      let e,
        t = this.top,
        n = this.needsBlock;
      if (blockTags.hasOwnProperty(o))
        t.content.length &&
          t.content[0].isInline &&
          this.open &&
          (this.open--, (t = this.top)),
          (e = !0),
          t.type || (this.needsBlock = !0);
      else if (!r.firstChild) return void this.leafFallback(r);
      i && i.skip
        ? this.addAll(r)
        : this.withStyleRules(r, () => this.addAll(r)),
        e && this.sync(t),
        (this.needsBlock = n);
    } else
      this.withStyleRules(r, () => {
        this.addElementByRule(r, i, !1 === i.consuming ? t : void 0);
      });
  }
  leafFallback(e) {
    'BR' == e.nodeName &&
      this.top.type &&
      this.top.type.inlineContent &&
      this.addTextNode(e.ownerDocument.createTextNode('\n'));
  }
  ignoreFallback(e) {
    'BR' != e.nodeName ||
      (this.top.type && this.top.type.inlineContent) ||
      this.findPlace(this.parser.schema.text('-'));
  }
  readStyles(r) {
    let o = Mark.none,
      i = Mark.none;
    for (let n = 0; n < r.length; n += 2)
      for (let e = void 0; ; ) {
        let t = this.parser.matchStyle(r[n], r[n + 1], this, e);
        if (!t) break;
        if (t.ignore) return null;
        if (
          (t.clearMark
            ? this.top.pendingMarks
                .concat(this.top.activeMarks)
                .forEach((e) => {
                  t.clearMark(e) && (i = e.addToSet(i));
                })
            : (o = this.parser.schema.marks[t.mark]
                .create(t.attrs)
                .addToSet(o)),
          !1 !== t.consuming)
        )
          break;
        e = t;
      }
    return [o, i];
  }
  addElementByRule(t, n, e) {
    let r, o, i;
    n.node
      ? (o = this.parser.schema.nodes[n.node]).isLeaf
        ? this.insertNode(o.create(n.attrs)) || this.leafFallback(t)
        : (r = this.enter(o, n.attrs || null, n.preserveWhitespace))
      : ((a = this.parser.schema.marks[n.mark]),
        (i = a.create(n.attrs)),
        this.addPendingMark(i));
    var a = this.top;
    if (o && o.isLeaf) this.findInside(t);
    else if (e) this.addElement(t, e);
    else if (n.getContent)
      this.findInside(t),
        n.getContent(t, this.parser.schema).forEach((e) => this.insertNode(e));
    else {
      let e = t;
      'string' == typeof n.contentElement
        ? (e = t.querySelector(n.contentElement))
        : 'function' == typeof n.contentElement
        ? (e = n.contentElement(t))
        : n.contentElement && (e = n.contentElement),
        this.findAround(t, e, !0),
        this.addAll(e);
    }
    r && this.sync(a) && this.open--, i && this.removePendingMark(i, a);
  }
  addAll(n, r, o) {
    let i = r || 0;
    for (
      let e = r ? n.childNodes[r] : n.firstChild,
        t = null == o ? null : n.childNodes[o];
      e != t;
      e = e.nextSibling, ++i
    )
      this.findAtPoint(n, i), this.addDOM(e);
    this.findAtPoint(n, i);
  }
  findPlace(t) {
    let n, r;
    for (let e = this.open; 0 <= e; e--) {
      var o = this.nodes[e],
        i = o.findWrapping(t);
      if (i && (!n || n.length > i.length) && ((n = i), (r = o), !i.length))
        break;
      if (o.solid) break;
    }
    if (!n) return !1;
    this.sync(r);
    for (let e = 0; e < n.length; e++) this.enterInner(n[e], null, !1);
    return !0;
  }
  insertNode(n) {
    var e;
    if (
      (n.isInline &&
        this.needsBlock &&
        !this.top.type &&
        (e = this.textblockFromContext()) &&
        this.enterInner(e),
      this.findPlace(n))
    ) {
      this.closeExtra();
      var r = this.top;
      r.applyPending(n.type), r.match && (r.match = r.match.matchType(n.type));
      let t = r.activeMarks;
      for (let e = 0; e < n.marks.length; e++)
        (r.type && !r.type.allowsMarkType(n.marks[e].type)) ||
          (t = n.marks[e].addToSet(t));
      return r.content.push(n.mark(t)), !0;
    }
    return !1;
  }
  enter(e, t, n) {
    var r = this.findPlace(e.create(t));
    return r && this.enterInner(e, t, !0, n), r;
  }
  enterInner(e, t = null, n = !1, r) {
    this.closeExtra();
    var o = this.top;
    o.applyPending(e), (o.match = o.match && o.match.matchType(e));
    let i = wsOptionsFor(e, r, o.options);
    o.options & OPT_OPEN_LEFT && 0 == o.content.length && (i |= OPT_OPEN_LEFT),
      this.nodes.push(
        new NodeContext(e, t, o.activeMarks, o.pendingMarks, n, null, i)
      ),
      this.open++;
  }
  closeExtra(e = !1) {
    let t = this.nodes.length - 1;
    if (t > this.open) {
      for (; t > this.open; t--)
        this.nodes[t - 1].content.push(this.nodes[t].finish(e));
      this.nodes.length = this.open + 1;
    }
  }
  finish() {
    return (
      (this.open = 0),
      this.closeExtra(this.isOpen),
      this.nodes[0].finish(this.isOpen || this.options.topOpen)
    );
  }
  sync(t) {
    for (let e = this.open; 0 <= e; e--)
      if (this.nodes[e] == t) return (this.open = e), !0;
    return !1;
  }
  get currentPos() {
    this.closeExtra();
    let t = 0;
    for (let e = this.open; 0 <= e; e--) {
      var n = this.nodes[e].content;
      for (let e = n.length - 1; 0 <= e; e--) t += n[e].nodeSize;
      e && t++;
    }
    return t;
  }
  findAtPoint(t, n) {
    if (this.find)
      for (let e = 0; e < this.find.length; e++)
        this.find[e].node == t &&
          this.find[e].offset == n &&
          (this.find[e].pos = this.currentPos);
  }
  findInside(t) {
    if (this.find)
      for (let e = 0; e < this.find.length; e++)
        null == this.find[e].pos &&
          1 == t.nodeType &&
          t.contains(this.find[e].node) &&
          (this.find[e].pos = this.currentPos);
  }
  findAround(t, n, r) {
    if (t != n && this.find)
      for (let e = 0; e < this.find.length; e++)
        null == this.find[e].pos &&
          1 == t.nodeType &&
          t.contains(this.find[e].node) &&
          n.compareDocumentPosition(this.find[e].node) & (r ? 2 : 4) &&
          (this.find[e].pos = this.currentPos);
  }
  findInText(t) {
    if (this.find)
      for (let e = 0; e < this.find.length; e++)
        this.find[e].node == t &&
          (this.find[e].pos =
            this.currentPos - (t.nodeValue.length - this.find[e].offset));
  }
  matchesContext(e) {
    if (-1 < e.indexOf('|'))
      return e.split(/\s*\|\s*/).some(this.matchesContext, this);
    let o = e.split('/'),
      i = this.options.context,
      a = !(this.isOpen || (i && i.parent.type != this.nodes[0].type)),
      s = -(i ? i.depth + 1 : 0) + (a ? 0 : 1),
      l = (e, t) => {
        for (; 0 <= e; e--) {
          var n = o[e];
          if ('' == n) {
            if (e != o.length - 1 && 0 != e) {
              for (; t >= s; t--) if (l(e - 1, t)) return !0;
              return !1;
            }
          } else {
            var r =
              0 < t || (0 == t && a)
                ? this.nodes[t].type
                : i && t >= s
                ? i.node(t - s).type
                : null;
            if (!r || (r.name != n && -1 == r.groups.indexOf(n))) return !1;
            t--;
          }
        }
        return !0;
      };
    return l(o.length - 1, this.open);
  }
  textblockFromContext() {
    var e,
      t = this.options.context;
    if (t)
      for (let e = t.depth; 0 <= e; e--) {
        var n = t.node(e).contentMatchAt(t.indexAfter(e)).defaultType;
        if (n && n.isTextblock && n.defaultAttrs) return n;
      }
    for (e in this.parser.schema.nodes) {
      var r = this.parser.schema.nodes[e];
      if (r.isTextblock && r.defaultAttrs) return r;
    }
  }
  addPendingMark(e) {
    var t = findSameMarkInSet(e, this.top.pendingMarks);
    t && this.top.stashMarks.push(t),
      (this.top.pendingMarks = e.addToSet(this.top.pendingMarks));
  }
  removePendingMark(t, n) {
    for (let e = this.open; 0 <= e; e--) {
      var r,
        o = this.nodes[e];
      if (
        (-1 < o.pendingMarks.lastIndexOf(t)
          ? (o.pendingMarks = t.removeFromSet(o.pendingMarks))
          : ((o.activeMarks = t.removeFromSet(o.activeMarks)),
            (r = o.popFromStashMark(t)) &&
              o.type &&
              o.type.allowsMarkType(r.type) &&
              (o.activeMarks = r.addToSet(o.activeMarks))),
        o == n)
      )
        break;
    }
  }
}
function normalizeList(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    var r = 1 == e.nodeType ? e.nodeName.toLowerCase() : null;
    r && listTags.hasOwnProperty(r) && t
      ? (t.appendChild(e), (e = t))
      : 'li' == r
      ? (t = e)
      : r && (t = null);
  }
}
function matches(e, t) {
  return (
    e.matches ||
    e.msMatchesSelector ||
    e.webkitMatchesSelector ||
    e.mozMatchesSelector
  ).call(e, t);
}
function parseStyles(e) {
  for (var t, n = /\s*([\w-]+)\s*:\s*([^;]+)/g, r = []; (t = n.exec(e)); )
    r.push(t[1], t[2].trim());
  return r;
}
function copy$1(e) {
  var t,
    n = {};
  for (t in e) n[t] = e[t];
  return n;
}
function markMayApply(e, a) {
  var t,
    n = a.schema.nodes;
  for (t in n) {
    var r = n[t];
    if (r.allowsMarkType(e)) {
      let o = [],
        i = (t) => {
          o.push(t);
          for (let e = 0; e < t.edgeCount; e++) {
            var { type: n, next: r } = t.edge(e);
            if (n == a) return !0;
            if (o.indexOf(r) < 0 && i(r)) return !0;
          }
        };
      if (i(r.contentMatch)) return !0;
    }
  }
}
function findSameMarkInSet(t, n) {
  for (let e = 0; e < n.length; e++) if (t.eq(n[e])) return n[e];
}
class DOMSerializer {
  constructor(e, t) {
    (this.nodes = e), (this.marks = t);
  }
  serializeFragment(e, a = {}, t) {
    let s = (t = t || doc$1(a).createDocumentFragment()),
      l = [];
    return (
      e.forEach((n) => {
        if (l.length || n.marks.length) {
          let e = 0,
            t = 0;
          for (; e < l.length && t < n.marks.length; ) {
            var r = n.marks[t];
            if (this.marks[r.type.name]) {
              if (!r.eq(l[e][0]) || !1 === r.type.spec.spanning) break;
              e++;
            }
            t++;
          }
          for (; e < l.length; ) s = l.pop()[1];
          for (; t < n.marks.length; ) {
            var o = n.marks[t++],
              i = this.serializeMark(o, n.isInline, a);
            i &&
              (l.push([o, s]),
              s.appendChild(i.dom),
              (s = i.contentDOM || i.dom));
          }
        }
        s.appendChild(this.serializeNodeInner(n, a));
      }),
      t
    );
  }
  serializeNodeInner(e, t) {
    var { dom: n, contentDOM: r } = DOMSerializer.renderSpec(
      doc$1(t),
      this.nodes[e.type.name](e)
    );
    if (r) {
      if (e.isLeaf)
        throw new RangeError('Content hole not allowed in a leaf node spec');
      this.serializeFragment(e.content, t, r);
    }
    return n;
  }
  serializeNode(t, n = {}) {
    let r = this.serializeNodeInner(t, n);
    for (let e = t.marks.length - 1; 0 <= e; e--) {
      var o = this.serializeMark(t.marks[e], t.isInline, n);
      o && ((o.contentDOM || o.dom).appendChild(r), (r = o.dom));
    }
    return r;
  }
  serializeMark(e, t, n = {}) {
    var r = this.marks[e.type.name];
    return r && DOMSerializer.renderSpec(doc$1(n), r(e, t));
  }
  static renderSpec(t, n, r = null) {
    if ('string' == typeof n) return { dom: t.createTextNode(n) };
    if (null != n.nodeType) return { dom: n };
    if (n.dom && null != n.dom.nodeType) return n;
    let e = n[0],
      o = e.indexOf(' ');
    0 < o && ((r = e.slice(0, o)), (e = e.slice(o + 1)));
    let i;
    var a,
      s = r ? t.createElementNS(r, e) : t.createElement(e);
    let l = n[1],
      c = 1;
    if (l && 'object' == typeof l && null == l.nodeType && !Array.isArray(l))
      for (var u in ((c = 2), l))
        null != l[u] &&
          (0 < (a = u.indexOf(' '))
            ? s.setAttributeNS(u.slice(0, a), u.slice(a + 1), l[u])
            : s.setAttribute(u, l[u]));
    for (let e = c; e < n.length; e++) {
      var d = n[e];
      if (0 === d) {
        if (e < n.length - 1 || e > c)
          throw new RangeError(
            'Content hole must be the only child of its parent node'
          );
        return { dom: s, contentDOM: s };
      }
      var { dom: d, contentDOM: p } = DOMSerializer.renderSpec(t, d, r);
      if ((s.appendChild(d), p)) {
        if (i) throw new RangeError('Multiple content holes');
        i = p;
      }
    }
    return { dom: s, contentDOM: i };
  }
  static fromSchema(e) {
    return (
      e.cached.domSerializer ||
      (e.cached.domSerializer = new DOMSerializer(
        this.nodesFromSchema(e),
        this.marksFromSchema(e)
      ))
    );
  }
  static nodesFromSchema(e) {
    e = gatherToDOM(e.nodes);
    return e.text || (e.text = (e) => e.text), e;
  }
  static marksFromSchema(e) {
    return gatherToDOM(e.marks);
  }
}
function gatherToDOM(e) {
  var t,
    n = {};
  for (t in e) {
    var r = e[t].spec.toDOM;
    r && (n[t] = r);
  }
  return n;
}
function doc$1(e) {
  return e.document || window.document;
}
const lower16 = 65535,
  factor16 = Math.pow(2, 16);
function makeRecover(e, t) {
  return e + t * factor16;
}
function recoverIndex(e) {
  return e & lower16;
}
function recoverOffset(e) {
  return (e - (e & lower16)) / factor16;
}
const DEL_BEFORE = 1,
  DEL_AFTER = 2,
  DEL_ACROSS = 4,
  DEL_SIDE = 8;
class MapResult {
  constructor(e, t, n) {
    (this.pos = e), (this.delInfo = t), (this.recover = n);
  }
  get deleted() {
    return 0 < (this.delInfo & DEL_SIDE);
  }
  get deletedBefore() {
    return 0 < (this.delInfo & (DEL_BEFORE | DEL_ACROSS));
  }
  get deletedAfter() {
    return 0 < (this.delInfo & (DEL_AFTER | DEL_ACROSS));
  }
  get deletedAcross() {
    return 0 < (this.delInfo & DEL_ACROSS);
  }
}
class StepMap {
  constructor(e, t = !1) {
    if (((this.ranges = e), (this.inverted = t), !e.length && StepMap.empty))
      return StepMap.empty;
  }
  recover(e) {
    let t = 0,
      n = recoverIndex(e);
    if (!this.inverted)
      for (let e = 0; e < n; e++)
        t += this.ranges[3 * e + 2] - this.ranges[3 * e + 1];
    return this.ranges[3 * n] + t + recoverOffset(e);
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  map(e, t = 1) {
    return this._map(e, t, !0);
  }
  _map(n, r, o) {
    let i = 0,
      e = this.inverted ? 2 : 1,
      a = this.inverted ? 1 : 2;
    for (let t = 0; t < this.ranges.length; t += 3) {
      var s = this.ranges[t] - (this.inverted ? i : 0);
      if (n < s) break;
      var l = this.ranges[t + e],
        c = this.ranges[t + a],
        u = s + l;
      if (n <= u) {
        var d = s + i + ((l ? (n == s ? -1 : n == u ? 1 : r) : r) < 0 ? 0 : c);
        if (o) return d;
        var p = n == (r < 0 ? s : u) ? null : makeRecover(t / 3, n - s);
        let e = n == s ? DEL_AFTER : n == u ? DEL_BEFORE : DEL_ACROSS;
        return (
          (r < 0 ? n != s : n != u) && (e |= DEL_SIDE), new MapResult(d, e, p)
        );
      }
      i += c - l;
    }
    return o ? n + i : new MapResult(n + i, 0, null);
  }
  touches(t, e) {
    let n = 0,
      r = recoverIndex(e);
    var o = this.inverted ? 2 : 1,
      i = this.inverted ? 1 : 2;
    for (let e = 0; e < this.ranges.length; e += 3) {
      var a = this.ranges[e] - (this.inverted ? n : 0);
      if (t < a) break;
      var s = this.ranges[e + o];
      if (t <= a + s && e == 3 * r) return !0;
      n += this.ranges[e + i] - s;
    }
    return !1;
  }
  forEach(n) {
    var r = this.inverted ? 2 : 1,
      o = this.inverted ? 1 : 2;
    for (let e = 0, t = 0; e < this.ranges.length; e += 3) {
      var i = this.ranges[e],
        a = i - (this.inverted ? t : 0),
        i = i + (this.inverted ? 0 : t),
        s = this.ranges[e + r],
        l = this.ranges[e + o];
      n(a, a + s, i, i + l), (t += l - s);
    }
  }
  invert() {
    return new StepMap(this.ranges, !this.inverted);
  }
  toString() {
    return (this.inverted ? '-' : '') + JSON.stringify(this.ranges);
  }
  static offset(e) {
    return 0 == e ? StepMap.empty : new StepMap(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
StepMap.empty = new StepMap([]);
class Mapping {
  constructor(e = [], t, n = 0, r = e.length) {
    (this.maps = e), (this.mirror = t), (this.from = n), (this.to = r);
  }
  slice(e = 0, t = this.maps.length) {
    return new Mapping(this.maps, this.mirror, e, t);
  }
  copy() {
    return new Mapping(
      this.maps.slice(),
      this.mirror && this.mirror.slice(),
      this.from,
      this.to
    );
  }
  appendMap(e, t) {
    (this.to = this.maps.push(e)),
      null != t && this.setMirror(this.maps.length - 1, t);
  }
  appendMapping(n) {
    for (let e = 0, t = this.maps.length; e < n.maps.length; e++) {
      var r = n.getMirror(e);
      this.appendMap(n.maps[e], null != r && r < e ? t + r : void 0);
    }
  }
  getMirror(t) {
    if (this.mirror)
      for (let e = 0; e < this.mirror.length; e++)
        if (this.mirror[e] == t) return this.mirror[e + (e % 2 ? -1 : 1)];
  }
  setMirror(e, t) {
    this.mirror || (this.mirror = []), this.mirror.push(e, t);
  }
  appendMappingInverted(n) {
    for (
      let e = n.maps.length - 1, t = this.maps.length + n.maps.length;
      0 <= e;
      e--
    ) {
      var r = n.getMirror(e);
      this.appendMap(
        n.maps[e].invert(),
        null != r && r > e ? t - r - 1 : void 0
      );
    }
  }
  invert() {
    var e = new Mapping();
    return e.appendMappingInverted(this), e;
  }
  map(t, n = 1) {
    if (this.mirror) return this._map(t, n, !0);
    for (let e = this.from; e < this.to; e++) t = this.maps[e].map(t, n);
    return t;
  }
  mapResult(e, t = 1) {
    return this._map(e, t, !1);
  }
  _map(t, n, e) {
    let r = 0;
    for (let e = this.from; e < this.to; e++) {
      var o = this.maps[e].mapResult(t, n);
      if (null != o.recover) {
        var i = this.getMirror(e);
        if (null != i && i > e && i < this.to) {
          (e = i), (t = this.maps[i].recover(o.recover));
          continue;
        }
      }
      (r |= o.delInfo), (t = o.pos);
    }
    return e ? t : new MapResult(t, r, null);
  }
}
const stepsByID = Object.create(null);
class Step {
  getMap() {
    return StepMap.empty;
  }
  merge(e) {
    return null;
  }
  static fromJSON(e, t) {
    if (!t || !t.stepType)
      throw new RangeError('Invalid input for Step.fromJSON');
    var n = stepsByID[t.stepType];
    if (n) return n.fromJSON(e, t);
    throw new RangeError(`No step type ${t.stepType} defined`);
  }
  static jsonID(e, t) {
    if (e in stepsByID)
      throw new RangeError('Duplicate use of step JSON ID ' + e);
    return ((stepsByID[e] = t).prototype.jsonID = e), t;
  }
}
class StepResult {
  constructor(e, t) {
    (this.doc = e), (this.failed = t);
  }
  static ok(e) {
    return new StepResult(e, null);
  }
  static fail(e) {
    return new StepResult(null, e);
  }
  static fromReplace(e, t, n, r) {
    try {
      return StepResult.ok(e.replace(t, n, r));
    } catch (e) {
      if (e instanceof ReplaceError) return StepResult.fail(e.message);
      throw e;
    }
  }
}
function mapFragment(n, r, o) {
  var i = [];
  for (let t = 0; t < n.childCount; t++) {
    let e = n.child(t);
    (e = e.content.size ? e.copy(mapFragment(e.content, r, e)) : e).isInline &&
      (e = r(e, o, t)),
      i.push(e);
  }
  return Fragment.fromArray(i);
}
class AddMarkStep extends Step {
  constructor(e, t, n) {
    super(), (this.from = e), (this.to = t), (this.mark = n);
  }
  apply(e) {
    var t = e.slice(this.from, this.to),
      n = e.resolve(this.from),
      n = n.node(n.sharedDepth(this.to)),
      n = new Slice(
        mapFragment(
          t.content,
          (e, t) =>
            e.isAtom && t.type.allowsMarkType(this.mark.type)
              ? e.mark(this.mark.addToSet(e.marks))
              : e,
          n
        ),
        t.openStart,
        t.openEnd
      );
    return StepResult.fromReplace(e, this.from, this.to, n);
  }
  invert() {
    return new RemoveMarkStep(this.from, this.to, this.mark);
  }
  map(e) {
    var t = e.mapResult(this.from, 1),
      e = e.mapResult(this.to, -1);
    return (t.deleted && e.deleted) || t.pos >= e.pos
      ? null
      : new AddMarkStep(t.pos, e.pos, this.mark);
  }
  merge(e) {
    return e instanceof AddMarkStep &&
      e.mark.eq(this.mark) &&
      this.from <= e.to &&
      this.to >= e.from
      ? new AddMarkStep(
          Math.min(this.from, e.from),
          Math.max(this.to, e.to),
          this.mark
        )
      : null;
  }
  toJSON() {
    return {
      stepType: 'addMark',
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to,
    };
  }
  static fromJSON(e, t) {
    if ('number' != typeof t.from || 'number' != typeof t.to)
      throw new RangeError('Invalid input for AddMarkStep.fromJSON');
    return new AddMarkStep(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Step.jsonID('addMark', AddMarkStep);
class RemoveMarkStep extends Step {
  constructor(e, t, n) {
    super(), (this.from = e), (this.to = t), (this.mark = n);
  }
  apply(e) {
    var t = e.slice(this.from, this.to),
      t = new Slice(
        mapFragment(
          t.content,
          (e) => e.mark(this.mark.removeFromSet(e.marks)),
          e
        ),
        t.openStart,
        t.openEnd
      );
    return StepResult.fromReplace(e, this.from, this.to, t);
  }
  invert() {
    return new AddMarkStep(this.from, this.to, this.mark);
  }
  map(e) {
    var t = e.mapResult(this.from, 1),
      e = e.mapResult(this.to, -1);
    return (t.deleted && e.deleted) || t.pos >= e.pos
      ? null
      : new RemoveMarkStep(t.pos, e.pos, this.mark);
  }
  merge(e) {
    return e instanceof RemoveMarkStep &&
      e.mark.eq(this.mark) &&
      this.from <= e.to &&
      this.to >= e.from
      ? new RemoveMarkStep(
          Math.min(this.from, e.from),
          Math.max(this.to, e.to),
          this.mark
        )
      : null;
  }
  toJSON() {
    return {
      stepType: 'removeMark',
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to,
    };
  }
  static fromJSON(e, t) {
    if ('number' != typeof t.from || 'number' != typeof t.to)
      throw new RangeError('Invalid input for RemoveMarkStep.fromJSON');
    return new RemoveMarkStep(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Step.jsonID('removeMark', RemoveMarkStep);
class AddNodeMarkStep extends Step {
  constructor(e, t) {
    super(), (this.pos = e), (this.mark = t);
  }
  apply(e) {
    var t,
      n = e.nodeAt(this.pos);
    return n
      ? ((t = n.type.create(n.attrs, null, this.mark.addToSet(n.marks))),
        StepResult.fromReplace(
          e,
          this.pos,
          this.pos + 1,
          new Slice(Fragment.from(t), 0, n.isLeaf ? 0 : 1)
        ))
      : StepResult.fail("No node at mark step's position");
  }
  invert(e) {
    var t = e.nodeAt(this.pos);
    if (t) {
      var n = this.mark.addToSet(t.marks);
      if (n.length == t.marks.length) {
        for (let e = 0; e < t.marks.length; e++)
          if (!t.marks[e].isInSet(n))
            return new AddNodeMarkStep(this.pos, t.marks[e]);
        return new AddNodeMarkStep(this.pos, this.mark);
      }
    }
    return new RemoveNodeMarkStep(this.pos, this.mark);
  }
  map(e) {
    e = e.mapResult(this.pos, 1);
    return e.deletedAfter ? null : new AddNodeMarkStep(e.pos, this.mark);
  }
  toJSON() {
    return { stepType: 'addNodeMark', pos: this.pos, mark: this.mark.toJSON() };
  }
  static fromJSON(e, t) {
    if ('number' != typeof t.pos)
      throw new RangeError('Invalid input for AddNodeMarkStep.fromJSON');
    return new AddNodeMarkStep(t.pos, e.markFromJSON(t.mark));
  }
}
Step.jsonID('addNodeMark', AddNodeMarkStep);
class RemoveNodeMarkStep extends Step {
  constructor(e, t) {
    super(), (this.pos = e), (this.mark = t);
  }
  apply(e) {
    var t,
      n = e.nodeAt(this.pos);
    return n
      ? ((t = n.type.create(n.attrs, null, this.mark.removeFromSet(n.marks))),
        StepResult.fromReplace(
          e,
          this.pos,
          this.pos + 1,
          new Slice(Fragment.from(t), 0, n.isLeaf ? 0 : 1)
        ))
      : StepResult.fail("No node at mark step's position");
  }
  invert(e) {
    e = e.nodeAt(this.pos);
    return e && this.mark.isInSet(e.marks)
      ? new AddNodeMarkStep(this.pos, this.mark)
      : this;
  }
  map(e) {
    e = e.mapResult(this.pos, 1);
    return e.deletedAfter ? null : new RemoveNodeMarkStep(e.pos, this.mark);
  }
  toJSON() {
    return {
      stepType: 'removeNodeMark',
      pos: this.pos,
      mark: this.mark.toJSON(),
    };
  }
  static fromJSON(e, t) {
    if ('number' != typeof t.pos)
      throw new RangeError('Invalid input for RemoveNodeMarkStep.fromJSON');
    return new RemoveNodeMarkStep(t.pos, e.markFromJSON(t.mark));
  }
}
Step.jsonID('removeNodeMark', RemoveNodeMarkStep);
class ReplaceStep extends Step {
  constructor(e, t, n, r = !1) {
    super(),
      (this.from = e),
      (this.to = t),
      (this.slice = n),
      (this.structure = r);
  }
  apply(e) {
    return this.structure && contentBetween(e, this.from, this.to)
      ? StepResult.fail('Structure replace would overwrite content')
      : StepResult.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new StepMap([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new ReplaceStep(
      this.from,
      this.from + this.slice.size,
      e.slice(this.from, this.to)
    );
  }
  map(e) {
    var t = e.mapResult(this.from, 1),
      e = e.mapResult(this.to, -1);
    return t.deletedAcross && e.deletedAcross
      ? null
      : new ReplaceStep(t.pos, Math.max(t.pos, e.pos), this.slice);
  }
  merge(e) {
    var t;
    return e instanceof ReplaceStep && !e.structure && !this.structure
      ? this.from + this.slice.size != e.from ||
        this.slice.openEnd ||
        e.slice.openStart
        ? e.to != this.from || this.slice.openStart || e.slice.openEnd
          ? null
          : ((t =
              this.slice.size + e.slice.size == 0
                ? Slice.empty
                : new Slice(
                    e.slice.content.append(this.slice.content),
                    e.slice.openStart,
                    this.slice.openEnd
                  )),
            new ReplaceStep(e.from, this.to, t, this.structure))
        : ((t =
            this.slice.size + e.slice.size == 0
              ? Slice.empty
              : new Slice(
                  this.slice.content.append(e.slice.content),
                  this.slice.openStart,
                  e.slice.openEnd
                )),
          new ReplaceStep(
            this.from,
            this.to + (e.to - e.from),
            t,
            this.structure
          ))
      : null;
  }
  toJSON() {
    var e = { stepType: 'replace', from: this.from, to: this.to };
    return (
      this.slice.size && (e.slice = this.slice.toJSON()),
      this.structure && (e.structure = !0),
      e
    );
  }
  static fromJSON(e, t) {
    if ('number' != typeof t.from || 'number' != typeof t.to)
      throw new RangeError('Invalid input for ReplaceStep.fromJSON');
    return new ReplaceStep(
      t.from,
      t.to,
      Slice.fromJSON(e, t.slice),
      !!t.structure
    );
  }
}
Step.jsonID('replace', ReplaceStep);
class ReplaceAroundStep extends Step {
  constructor(e, t, n, r, o, i, a = !1) {
    super(),
      (this.from = e),
      (this.to = t),
      (this.gapFrom = n),
      (this.gapTo = r),
      (this.slice = o),
      (this.insert = i),
      (this.structure = a);
  }
  apply(e) {
    var t;
    return this.structure &&
      (contentBetween(e, this.from, this.gapFrom) ||
        contentBetween(e, this.gapTo, this.to))
      ? StepResult.fail('Structure gap-replace would overwrite content')
      : (t = e.slice(this.gapFrom, this.gapTo)).openStart || t.openEnd
      ? StepResult.fail('Gap is not a flat range')
      : (t = this.slice.insertAt(this.insert, t.content))
      ? StepResult.fromReplace(e, this.from, this.to, t)
      : StepResult.fail('Content does not fit in gap');
  }
  getMap() {
    return new StepMap([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert,
    ]);
  }
  invert(e) {
    var t = this.gapTo - this.gapFrom;
    return new ReplaceAroundStep(
      this.from,
      this.from + this.slice.size + t,
      this.from + this.insert,
      this.from + this.insert + t,
      e
        .slice(this.from, this.to)
        .removeBetween(this.gapFrom - this.from, this.gapTo - this.from),
      this.gapFrom - this.from,
      this.structure
    );
  }
  map(e) {
    var t = e.mapResult(this.from, 1),
      n = e.mapResult(this.to, -1),
      r = e.map(this.gapFrom, -1),
      e = e.map(this.gapTo, 1);
    return (t.deletedAcross && n.deletedAcross) || r < t.pos || e > n.pos
      ? null
      : new ReplaceAroundStep(
          t.pos,
          n.pos,
          r,
          e,
          this.slice,
          this.insert,
          this.structure
        );
  }
  toJSON() {
    var e = {
      stepType: 'replaceAround',
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert,
    };
    return (
      this.slice.size && (e.slice = this.slice.toJSON()),
      this.structure && (e.structure = !0),
      e
    );
  }
  static fromJSON(e, t) {
    if (
      'number' != typeof t.from ||
      'number' != typeof t.to ||
      'number' != typeof t.gapFrom ||
      'number' != typeof t.gapTo ||
      'number' != typeof t.insert
    )
      throw new RangeError('Invalid input for ReplaceAroundStep.fromJSON');
    return new ReplaceAroundStep(
      t.from,
      t.to,
      t.gapFrom,
      t.gapTo,
      Slice.fromJSON(e, t.slice),
      t.insert,
      !!t.structure
    );
  }
}
function contentBetween(e, t, n) {
  let r = e.resolve(t),
    o = n - t,
    i = r.depth;
  for (; 0 < o && 0 < i && r.indexAfter(i) == r.node(i).childCount; ) i--, o--;
  if (0 < o) {
    let e = r.node(i).maybeChild(r.indexAfter(i));
    for (; 0 < o; ) {
      if (!e || e.isLeaf) return !0;
      (e = e.firstChild), o--;
    }
  }
  return !1;
}
function addMark(t, s, l, c) {
  let u = [],
    d = [],
    p,
    f;
  t.doc.nodesBetween(s, l, (e, t, n) => {
    if (e.isInline) {
      var r = e.marks;
      if (!c.isInSet(r) && n.type.allowsMarkType(c.type)) {
        var o = Math.max(t, s),
          i = Math.min(t + e.nodeSize, l),
          a = c.addToSet(r);
        for (let e = 0; e < r.length; e++)
          r[e].isInSet(a) ||
            (p && p.to == o && p.mark.eq(r[e])
              ? (p.to = i)
              : u.push((p = new RemoveMarkStep(o, i, r[e]))));
        f && f.to == o ? (f.to = i) : d.push((f = new AddMarkStep(o, i, c)));
      }
    }
  }),
    u.forEach((e) => t.step(e)),
    d.forEach((e) => t.step(e));
}
function removeMark(t, s, e, l) {
  let c = [],
    u = 0;
  t.doc.nodesBetween(s, e, (n, o) => {
    if (n.isInline) {
      u++;
      let r = null;
      if (l instanceof MarkType) {
        let e = n.marks,
          t;
        for (; (t = l.isInSet(e)); )
          (r = r || []).push(t), (e = t.removeFromSet(e));
      } else l ? l.isInSet(n.marks) && (r = [l]) : (r = n.marks);
      if (r && r.length) {
        var i = Math.min(o + n.nodeSize, e);
        for (let e = 0; e < r.length; e++) {
          let t = r[e],
            n;
          for (let e = 0; e < c.length; e++) {
            var a = c[e];
            a.step == u - 1 && t.eq(c[e].style) && (n = a);
          }
          n
            ? ((n.to = i), (n.step = u))
            : c.push({ style: t, from: Math.max(o, s), to: i, step: u });
        }
      }
    }
  }),
    c.forEach((e) => t.step(new RemoveMarkStep(e.from, e.to, e.style)));
}
function clearIncompatible(t, e, r, n = r.contentMatch) {
  var o = t.doc.nodeAt(e);
  let i = [],
    a = e + 1;
  for (let e = 0; e < o.childCount; e++) {
    var s = o.child(e),
      l = a + s.nodeSize,
      c = n.matchType(s.type);
    if (c) {
      n = c;
      for (let e = 0; e < s.marks.length; e++)
        r.allowsMarkType(s.marks[e].type) ||
          t.step(new RemoveMarkStep(a, l, s.marks[e]));
      if (s.isText && !r.spec.code) {
        let e,
          t = /\r?\n|\r/g,
          n;
        for (; (e = t.exec(s.text)); )
          (n =
            n ||
            new Slice(
              Fragment.from(r.schema.text(' ', r.allowedMarks(s.marks))),
              0,
              0
            )),
            i.push(new ReplaceStep(a + e.index, a + e.index + e[0].length, n));
      }
    } else i.push(new ReplaceStep(a, l, Slice.empty));
    a = l;
  }
  n.validEnd ||
    ((e = n.fillBefore(Fragment.empty, !0)),
    t.replace(a, a, new Slice(e, 0, 0)));
  for (let e = i.length - 1; 0 <= e; e--) t.step(i[e]);
}
function canCut(e, t, n) {
  return (
    (0 == t || e.canReplace(t, e.childCount)) &&
    (n == e.childCount || e.canReplace(0, n))
  );
}
function liftTarget(t) {
  var n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
  for (let e = t.depth; ; --e) {
    var r = t.$from.node(e),
      o = t.$from.index(e),
      i = t.$to.indexAfter(e);
    if (e < t.depth && r.canReplace(o, i, n)) return e;
    if (0 == e || r.type.spec.isolating || !canCut(r, o, i)) break;
  }
  return null;
}
function lift$1(e, n, r) {
  var { $from: o, $to: i, depth: n } = n,
    t = o.before(n + 1),
    a = i.after(n + 1);
  let s = t,
    l = a,
    c = Fragment.empty,
    u = 0;
  for (let e = n, t = !1; e > r; e--)
    t || 0 < o.index(e)
      ? ((t = !0), (c = Fragment.from(o.node(e).copy(c))), u++)
      : s--;
  let d = Fragment.empty,
    p = 0;
  for (let e = n, t = !1; e > r; e--)
    t || i.after(e + 1) < i.end(e)
      ? ((t = !0), (d = Fragment.from(i.node(e).copy(d))), p++)
      : l++;
  e.step(
    new ReplaceAroundStep(
      s,
      l,
      t,
      a,
      new Slice(c.append(d), u, p),
      c.size - u,
      !0
    )
  );
}
function findWrapping(e, t, n = null, r = e) {
  var o = findWrappingOutside(e, t),
    r = o && findWrappingInside(r, t);
  return r
    ? o.map(withAttrs).concat({ type: t, attrs: n }).concat(r.map(withAttrs))
    : null;
}
function withAttrs(e) {
  return { type: e, attrs: null };
}
function findWrappingOutside(e, t) {
  var { parent: e, startIndex: n, endIndex: r } = e,
    o = e.contentMatchAt(n).findWrapping(t);
  return o && ((t = o.length ? o[0] : t), e.canReplaceWith(n, r, t)) ? o : null;
}
function findWrappingInside(t, e) {
  var { parent: n, startIndex: t, endIndex: r } = t,
    o = n.child(t),
    o = e.contentMatch.findWrapping(o.type);
  if (!o) return null;
  let i = (o.length ? o[o.length - 1] : e).contentMatch;
  for (let e = t; i && e < r; e++) i = i.matchType(n.child(e).type);
  return i && i.validEnd ? o : null;
}
function wrap(e, t, n) {
  let r = Fragment.empty;
  for (let e = n.length - 1; 0 <= e; e--) {
    if (r.size) {
      var o = n[e].type.contentMatch.matchFragment(r);
      if (!o || !o.validEnd)
        throw new RangeError(
          'Wrapper type given to Transform.wrap does not form valid content of its parent wrapper'
        );
    }
    r = Fragment.from(n[e].type.create(n[e].attrs, r));
  }
  var i = t.start,
    t = t.end;
  e.step(new ReplaceAroundStep(i, t, i, t, new Slice(r, 0, 0), n.length, !0));
}
function setBlockType$1(o, e, t, i, a) {
  if (!i.isTextblock)
    throw new RangeError('Type given to setBlockType should be a textblock');
  let s = o.steps.length;
  o.doc.nodesBetween(e, t, (e, t) => {
    var n, r;
    if (
      e.isTextblock &&
      !e.hasMarkup(i, a) &&
      canChangeType(o.doc, o.mapping.slice(s).map(t), i)
    )
      return (
        o.clearIncompatible(o.mapping.slice(s).map(t, 1), i),
        (n = (r = o.mapping.slice(s)).map(t, 1)),
        (r = r.map(t + e.nodeSize, 1)),
        o.step(
          new ReplaceAroundStep(
            n,
            r,
            n + 1,
            r - 1,
            new Slice(Fragment.from(i.create(a, null, e.marks)), 0, 0),
            1,
            !0
          )
        ),
        !1
      );
  });
}
function canChangeType(e, t, n) {
  (e = e.resolve(t)), (t = e.index());
  return e.parent.canReplaceWith(t, t + 1, n);
}
function setNodeMarkup(e, t, n, r, o) {
  var i = e.doc.nodeAt(t);
  if (!i) throw new RangeError('No node at given position');
  r = (n = n || i.type).create(r, null, o || i.marks);
  if (i.isLeaf) return e.replaceWith(t, t + i.nodeSize, r);
  if (!n.validContent(i.content))
    throw new RangeError('Invalid content for node type ' + n.name);
  e.step(
    new ReplaceAroundStep(
      t,
      t + i.nodeSize,
      t + 1,
      t + i.nodeSize - 1,
      new Slice(Fragment.from(r), 0, 0),
      1,
      !0
    )
  );
}
function canSplit(e, t, r = 1, o) {
  var i = e.resolve(t),
    a = i.depth - r,
    e = (o && o[o.length - 1]) || i.parent;
  if (
    a < 0 ||
    i.parent.type.spec.isolating ||
    !i.parent.canReplace(i.index(), i.parent.childCount) ||
    !e.type.validContent(
      i.parent.content.cutByIndex(i.index(), i.parent.childCount)
    )
  )
    return !1;
  for (let t = i.depth - 1, n = r - 2; t > a; t--, n--) {
    var s = i.node(t),
      l = i.index(t);
    if (s.type.spec.isolating) return !1;
    let e = s.content.cutByIndex(l, s.childCount);
    var c = o && o[n + 1],
      c =
        (c && (e = e.replaceChild(0, c.type.create(c.attrs))),
        (o && o[n]) || s);
    if (!s.canReplace(l + 1, s.childCount) || !c.type.validContent(e))
      return !1;
  }
  (t = i.indexAfter(a)), (e = o && o[0]);
  return i.node(a).canReplaceWith(t, t, (e || i.node(1 + a)).type);
}
function split(e, t, r = 1, o) {
  let i = e.doc.resolve(t),
    a = Fragment.empty,
    s = Fragment.empty;
  for (let e = i.depth, t = i.depth - r, n = r - 1; e > t; e--, n--) {
    a = Fragment.from(i.node(e).copy(a));
    var l = o && o[n];
    s = Fragment.from(l ? l.type.create(l.attrs, s) : i.node(e).copy(s));
  }
  e.step(new ReplaceStep(t, t, new Slice(a.append(s), r, r), !0));
}
function canJoin(e, t) {
  (e = e.resolve(t)), (t = e.index());
  return joinable(e.nodeBefore, e.nodeAfter) && e.parent.canReplace(t, t + 1);
}
function joinable(e, t) {
  return !(!e || !t || e.isLeaf || !e.canAppend(t));
}
function joinPoint(e, o, i = -1) {
  var a = e.resolve(o);
  for (let r = a.depth; ; r--) {
    let e,
      t,
      n = a.index(r);
    if (
      ((t =
        r == a.depth
          ? ((e = a.nodeBefore), a.nodeAfter)
          : 0 < i
          ? ((e = a.node(r + 1)), n++, a.node(r).maybeChild(n))
          : ((e = a.node(r).maybeChild(n - 1)), a.node(r + 1))),
      e && !e.isTextblock && joinable(e, t) && a.node(r).canReplace(n, n + 1))
    )
      return o;
    if (0 == r) break;
    o = i < 0 ? a.before(r) : a.after(r);
  }
}
function join(e, t, n) {
  t = new ReplaceStep(t - n, t + n, Slice.empty, !0);
  e.step(t);
}
function insertPoint(e, t, n) {
  var r = e.resolve(t);
  if (r.parent.canReplaceWith(r.index(), r.index(), n)) return t;
  if (0 == r.parentOffset)
    for (let e = r.depth - 1; 0 <= e; e--) {
      var o = r.index(e);
      if (r.node(e).canReplaceWith(o, o, n)) return r.before(e + 1);
      if (0 < o) return null;
    }
  if (r.parentOffset == r.parent.content.size)
    for (let e = r.depth - 1; 0 <= e; e--) {
      var i = r.indexAfter(e);
      if (r.node(e).canReplaceWith(i, i, n)) return r.after(e + 1);
      if (i < r.node(e).childCount) return null;
    }
  return null;
}
function dropPoint(e, t, n) {
  var o = e.resolve(t);
  if (!n.content.size) return t;
  let i = n.content;
  for (let e = 0; e < n.openStart; e++) i = i.firstChild.content;
  for (let r = 1; r <= (0 == n.openStart && n.size ? 2 : 1); r++)
    for (let n = o.depth; 0 <= n; n--) {
      var a,
        s =
          n == o.depth
            ? 0
            : o.pos <= (o.start(n + 1) + o.end(n + 1)) / 2
            ? -1
            : 1,
        l = o.index(n) + (0 < s ? 1 : 0);
      let e = o.node(n),
        t = !1;
      if (
        (t =
          1 == r
            ? e.canReplace(l, l, i)
            : (a = e.contentMatchAt(l).findWrapping(i.firstChild.type)) &&
              e.canReplaceWith(l, l, a[0]))
      )
        return 0 == s ? o.pos : s < 0 ? o.before(n + 1) : o.after(n + 1);
    }
  return null;
}
function replaceStep(e, t, n = t, r = Slice.empty) {
  var o;
  return t != n || r.size
    ? fitsTrivially((o = e.resolve(t)), (e = e.resolve(n)), r)
      ? new ReplaceStep(t, n, r)
      : new Fitter(o, e, r).fit()
    : null;
}
function fitsTrivially(e, t, n) {
  return (
    !n.openStart &&
    !n.openEnd &&
    e.start() == t.start() &&
    e.parent.canReplace(e.index(), t.index(), n.content)
  );
}
Step.jsonID('replaceAround', ReplaceAroundStep);
class Fitter {
  constructor(t, e, n) {
    (this.$from = t),
      (this.$to = e),
      (this.unplaced = n),
      (this.frontier = []),
      (this.placed = Fragment.empty);
    for (let e = 0; e <= t.depth; e++) {
      var r = t.node(e);
      this.frontier.push({
        type: r.type,
        match: r.contentMatchAt(t.indexAfter(e)),
      });
    }
    for (let e = t.depth; 0 < e; e--)
      this.placed = Fragment.from(t.node(e).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      var e = this.findFittable();
      e ? this.placeNodes(e) : this.openMore() || this.dropNode();
    }
    var t = this.mustMoveInline(),
      n = this.placed.size - this.depth - this.$from.depth,
      r = this.$from,
      o = this.close(t < 0 ? this.$to : r.doc.resolve(t));
    if (!o) return null;
    let i = this.placed,
      a = r.depth,
      s = o.depth;
    for (; a && s && 1 == i.childCount; ) (i = i.firstChild.content), a--, s--;
    var l = new Slice(i, a, s);
    return -1 < t
      ? new ReplaceAroundStep(r.pos, t, this.$to.pos, this.$to.end(), l, n)
      : l.size || r.pos != this.$to.pos
      ? new ReplaceStep(r.pos, o.pos, l)
      : null;
  }
  findFittable() {
    let r = this.unplaced.openStart;
    for (
      let e = this.unplaced.content, t = 0, n = this.unplaced.openEnd;
      t < r;
      t++
    ) {
      var o = e.firstChild;
      if ((1 < e.childCount && (n = 0), o.type.spec.isolating && n <= t)) {
        r = t;
        break;
      }
      e = o.content;
    }
    for (let s = 1; s <= 2; s++)
      for (let a = 1 == s ? r : this.unplaced.openStart; 0 <= a; a--) {
        let e,
          i = null;
        var l = (e = (
          a
            ? (i = contentAt(this.unplaced.content, a - 1).firstChild)
            : this.unplaced
        ).content).firstChild;
        for (let o = this.depth; 0 <= o; o--) {
          let { type: e, match: t } = this.frontier[o],
            n,
            r = null;
          if (
            1 == s &&
            (l
              ? t.matchType(l.type) || (r = t.fillBefore(Fragment.from(l), !1))
              : i && e.compatibleContent(i.type))
          )
            return { sliceDepth: a, frontierDepth: o, parent: i, inject: r };
          if (2 == s && l && (n = t.findWrapping(l.type)))
            return { sliceDepth: a, frontierDepth: o, parent: i, wrap: n };
          if (i && t.matchType(i.type)) break;
        }
      }
  }
  openMore() {
    var { content: e, openStart: t, openEnd: n } = this.unplaced,
      r = contentAt(e, t);
    return !(
      !r.childCount ||
      r.firstChild.isLeaf ||
      ((this.unplaced = new Slice(
        e,
        t + 1,
        Math.max(n, r.size + t >= e.size - n ? t + 1 : 0)
      )),
      0)
    );
  }
  dropNode() {
    var { content: e, openStart: t, openEnd: n } = this.unplaced,
      r = contentAt(e, t);
    r.childCount <= 1 && 0 < t
      ? ((r = e.size - t <= t + r.size),
        (this.unplaced = new Slice(
          dropFromFragment(e, t - 1, 1),
          t - 1,
          r ? t - 1 : n
        )))
      : (this.unplaced = new Slice(dropFromFragment(e, t, 1), t, n));
  }
  placeNodes({
    sliceDepth: e,
    frontierDepth: t,
    parent: n,
    inject: r,
    wrap: o,
  }) {
    for (; this.depth > t; ) this.closeFrontierNode();
    if (o) for (let e = 0; e < o.length; e++) this.openFrontierNode(o[e]);
    var i = this.unplaced,
      a = (n || i).content,
      s = i.openStart - e;
    let l = 0,
      c = [],
      { match: u, type: d } = this.frontier[t];
    if (r) {
      for (let e = 0; e < r.childCount; e++) c.push(r.child(e));
      u = u.matchFragment(r);
    }
    let p = a.size + e - (i.content.size - i.openEnd);
    for (; l < a.childCount; ) {
      var f = a.child(l),
        h = u.matchType(f.type);
      if (!h) break;
      (1 < ++l || 0 == s || f.content.size) &&
        ((u = h),
        c.push(
          closeNodeStart(
            f.mark(d.allowedMarks(f.marks)),
            1 == l ? s : 0,
            l == a.childCount ? p : -1
          )
        ));
    }
    var m = l == a.childCount;
    m || (p = -1),
      (this.placed = addToFragment(this.placed, t, Fragment.from(c))),
      (this.frontier[t].match = u),
      m &&
        p < 0 &&
        n &&
        n.type == this.frontier[this.depth].type &&
        1 < this.frontier.length &&
        this.closeFrontierNode();
    for (let e = 0, t = a; e < p; e++) {
      var g = t.lastChild;
      this.frontier.push({
        type: g.type,
        match: g.contentMatchAt(g.childCount),
      }),
        (t = g.content);
    }
    this.unplaced = m
      ? 0 == e
        ? Slice.empty
        : new Slice(
            dropFromFragment(i.content, e - 1, 1),
            e - 1,
            p < 0 ? i.openEnd : e - 1
          )
      : new Slice(dropFromFragment(i.content, e, l), i.openStart, i.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock) return -1;
    let e = this.frontier[this.depth],
      t;
    if (
      !e.type.isTextblock ||
      !contentAfterFits(this.$to, this.$to.depth, e.type, e.match, !1) ||
      (this.$to.depth == this.depth &&
        (t = this.findCloseLevel(this.$to)) &&
        t.depth == this.depth)
    )
      return -1;
    let n = this.$to['depth'],
      r = this.$to.after(n);
    for (; 1 < n && r == this.$to.end(--n); ) ++r;
    return r;
  }
  findCloseLevel(n) {
    e: for (let t = Math.min(this.depth, n.depth); 0 <= t; t--) {
      var { match: e, type: r } = this.frontier[t],
        o = t < n.depth && n.end(t + 1) == n.pos + (n.depth - (t + 1)),
        r = contentAfterFits(n, t, r, e, o);
      if (r) {
        for (let e = t - 1; 0 <= e; e--) {
          var { match: i, type: a } = this.frontier[e],
            a = contentAfterFits(n, e, a, i, !0);
          if (!a || a.childCount) continue e;
        }
        return {
          depth: t,
          fit: r,
          move: o ? n.doc.resolve(n.after(t + 1)) : n,
        };
      }
    }
  }
  close(t) {
    var n = this.findCloseLevel(t);
    if (!n) return null;
    for (; this.depth > n.depth; ) this.closeFrontierNode();
    n.fit.childCount &&
      (this.placed = addToFragment(this.placed, n.depth, n.fit)),
      (t = n.move);
    for (let e = n.depth + 1; e <= t.depth; e++) {
      var r = t.node(e),
        o = r.type.contentMatch.fillBefore(r.content, !0, t.index(e));
      this.openFrontierNode(r.type, r.attrs, o);
    }
    return t;
  }
  openFrontierNode(e, t = null, n) {
    var r = this.frontier[this.depth];
    (r.match = r.match.matchType(e)),
      (this.placed = addToFragment(
        this.placed,
        this.depth,
        Fragment.from(e.create(t, n))
      )),
      this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    var e = this.frontier.pop().match.fillBefore(Fragment.empty, !0);
    e.childCount &&
      (this.placed = addToFragment(this.placed, this.frontier.length, e));
  }
}
function dropFromFragment(e, t, n) {
  return 0 == t
    ? e.cutByIndex(n, e.childCount)
    : e.replaceChild(
        0,
        e.firstChild.copy(dropFromFragment(e.firstChild.content, t - 1, n))
      );
}
function addToFragment(e, t, n) {
  return 0 == t
    ? e.append(n)
    : e.replaceChild(
        e.childCount - 1,
        e.lastChild.copy(addToFragment(e.lastChild.content, t - 1, n))
      );
}
function contentAt(t, n) {
  for (let e = 0; e < n; e++) t = t.firstChild.content;
  return t;
}
function closeNodeStart(e, t, n) {
  if (t <= 0) return e;
  let r = e.content;
  return (
    1 < t &&
      (r = r.replaceChild(
        0,
        closeNodeStart(r.firstChild, t - 1, 1 == r.childCount ? n - 1 : 0)
      )),
    0 < t &&
      ((r = e.type.contentMatch.fillBefore(r).append(r)), n <= 0) &&
      (r = r.append(
        e.type.contentMatch.matchFragment(r).fillBefore(Fragment.empty, !0)
      )),
    e.copy(r)
  );
}
function contentAfterFits(e, t, n, r, o) {
  var i = e.node(t),
    o = o ? e.indexAfter(t) : e.index(t);
  return (o != i.childCount || n.compatibleContent(i.type)) &&
    (e = r.fillBefore(i.content, !0, o)) &&
    !invalidMarks(n, i.content, o)
    ? e
    : null;
}
function invalidMarks(t, n, r) {
  for (let e = r; e < n.childCount; e++)
    if (!t.allowsMarks(n.child(e).marks)) return !0;
  return !1;
}
function definesContent(e) {
  return e.spec.defining || e.spec.definingForContent;
}
function replaceRange(r, t, o, i) {
  if (!i.size) return r.deleteRange(t, o);
  var a = r.doc.resolve(t),
    s = r.doc.resolve(o);
  if (fitsTrivially(a, s, i)) return r.step(new ReplaceStep(t, o, i));
  var l = coveredDepths(a, r.doc.resolve(o));
  0 == l[l.length - 1] && l.pop();
  let n = -(a.depth + 1);
  l.unshift(n);
  for (let e = a.depth, t = a.pos - 1; 0 < e; e--, t--) {
    var c = a.node(e).type.spec;
    if (c.defining || c.definingAsContext || c.isolating) break;
    -1 < l.indexOf(e) ? (n = e) : a.before(e) == t && l.splice(1, 0, -e);
  }
  var u = l.indexOf(n);
  let d = [],
    p = i.openStart;
  for (let e = i.content, t = 0; ; t++) {
    var f = e.firstChild;
    if ((d.push(f), t == i.openStart)) break;
    e = f.content;
  }
  for (let e = p - 1; 0 <= e; e--) {
    var h = d[e],
      m = definesContent(h.type);
    if (m && !h.sameMarkup(a.node(Math.abs(n) - 1))) p = e;
    else if (m || !h.type.isTextblock) break;
  }
  for (let e = i.openStart; 0 <= e; e--) {
    var g = (e + p + 1) % (i.openStart + 1),
      v = d[g];
    if (v)
      for (let n = 0; n < l.length; n++) {
        let e = l[(n + u) % l.length],
          t = !0;
        e < 0 && ((t = !1), (e = -e));
        var y = a.node(e - 1),
          b = a.index(e - 1);
        if (y.canReplaceWith(b, b, v.type, v.marks))
          return r.replace(
            a.before(e),
            t ? s.after(e) : o,
            new Slice(closeFragment(i.content, 0, i.openStart, g), g, i.openEnd)
          );
      }
  }
  var w = r.steps.length;
  for (
    let e = l.length - 1;
    0 <= e && (r.replace(t, o, i), !(r.steps.length > w));
    e--
  ) {
    var x = l[e];
    x < 0 || ((t = a.before(x)), (o = s.after(x)));
  }
}
function closeFragment(e, t, n, r, o) {
  var i;
  return (
    t < n &&
      ((i = e.firstChild),
      (e = e.replaceChild(
        0,
        i.copy(closeFragment(i.content, t + 1, n, r, i))
      ))),
    (e =
      r < t
        ? (i = (n = o.contentMatchAt(0)).fillBefore(e).append(e)).append(
            n.matchFragment(i).fillBefore(Fragment.empty, !0)
          )
        : e)
  );
}
function replaceRangeWith(e, t, n, r) {
  var o;
  !r.isInline &&
    t == n &&
    e.doc.resolve(t).parent.content.size &&
    null != (o = insertPoint(e.doc, t, r.type)) &&
    (t = n = o),
    e.replaceRange(t, n, new Slice(Fragment.from(r), 0, 0));
}
function deleteRange(t, n, r) {
  var o = t.doc.resolve(n),
    i = t.doc.resolve(r),
    a = coveredDepths(o, i);
  for (let e = 0; e < a.length; e++) {
    var s = a[e],
      l = e == a.length - 1;
    if ((l && 0 == s) || o.node(s).type.contentMatch.validEnd)
      return t.delete(o.start(s), i.end(s));
    if (
      0 < s &&
      (l || o.node(s - 1).canReplace(o.index(s - 1), i.indexAfter(s - 1)))
    )
      return t.delete(o.before(s), i.after(s));
  }
  for (let e = 1; e <= o.depth && e <= i.depth; e++)
    if (
      n - o.start(e) == o.depth - e &&
      r > o.end(e) &&
      i.end(e) - r != i.depth - e
    )
      return t.delete(o.before(e), r);
  t.delete(n, r);
}
function coveredDepths(t, n) {
  var r = [];
  for (let e = Math.min(t.depth, n.depth); 0 <= e; e--) {
    var o = t.start(e);
    if (
      o < t.pos - (t.depth - e) ||
      n.end(e) > n.pos + (n.depth - e) ||
      t.node(e).type.spec.isolating ||
      n.node(e).type.spec.isolating
    )
      break;
    (o == n.start(e) ||
      (e == t.depth &&
        e == n.depth &&
        t.parent.inlineContent &&
        n.parent.inlineContent &&
        e &&
        n.start(e - 1) == o - 1)) &&
      r.push(e);
  }
  return r;
}
class AttrStep extends Step {
  constructor(e, t, n) {
    super(), (this.pos = e), (this.attr = t), (this.value = n);
  }
  apply(e) {
    var t = e.nodeAt(this.pos);
    if (!t) return StepResult.fail("No node at attribute step's position");
    var n,
      r = Object.create(null);
    for (n in t.attrs) r[n] = t.attrs[n];
    r[this.attr] = this.value;
    var o = t.type.create(r, null, t.marks);
    return StepResult.fromReplace(
      e,
      this.pos,
      this.pos + 1,
      new Slice(Fragment.from(o), 0, t.isLeaf ? 0 : 1)
    );
  }
  getMap() {
    return StepMap.empty;
  }
  invert(e) {
    return new AttrStep(
      this.pos,
      this.attr,
      e.nodeAt(this.pos).attrs[this.attr]
    );
  }
  map(e) {
    e = e.mapResult(this.pos, 1);
    return e.deletedAfter ? null : new AttrStep(e.pos, this.attr, this.value);
  }
  toJSON() {
    return {
      stepType: 'attr',
      pos: this.pos,
      attr: this.attr,
      value: this.value,
    };
  }
  static fromJSON(e, t) {
    if ('number' != typeof t.pos || 'string' != typeof t.attr)
      throw new RangeError('Invalid input for AttrStep.fromJSON');
    return new AttrStep(t.pos, t.attr, t.value);
  }
}
Step.jsonID('attr', AttrStep);
let TransformError = class extends Error {};
((TransformError = function e(t) {
  t = Error.call(this, t);
  return (t.__proto__ = e.prototype), t;
}).prototype = Object.create(Error.prototype)),
  ((TransformError.prototype.constructor = TransformError).prototype.name =
    'TransformError');
class Transform {
  constructor(e) {
    (this.doc = e),
      (this.steps = []),
      (this.docs = []),
      (this.mapping = new Mapping());
  }
  get before() {
    return this.docs.length ? this.docs[0] : this.doc;
  }
  step(e) {
    e = this.maybeStep(e);
    if (e.failed) throw new TransformError(e.failed);
    return this;
  }
  maybeStep(e) {
    var t = e.apply(this.doc);
    return t.failed || this.addStep(e, t.doc), t;
  }
  get docChanged() {
    return 0 < this.steps.length;
  }
  addStep(e, t) {
    this.docs.push(this.doc),
      this.steps.push(e),
      this.mapping.appendMap(e.getMap()),
      (this.doc = t);
  }
  replace(e, t = e, n = Slice.empty) {
    t = replaceStep(this.doc, e, t, n);
    return t && this.step(t), this;
  }
  replaceWith(e, t, n) {
    return this.replace(e, t, new Slice(Fragment.from(n), 0, 0));
  }
  delete(e, t) {
    return this.replace(e, t, Slice.empty);
  }
  insert(e, t) {
    return this.replaceWith(e, e, t);
  }
  replaceRange(e, t, n) {
    return replaceRange(this, e, t, n), this;
  }
  replaceRangeWith(e, t, n) {
    return replaceRangeWith(this, e, t, n), this;
  }
  deleteRange(e, t) {
    return deleteRange(this, e, t), this;
  }
  lift(e, t) {
    return lift$1(this, e, t), this;
  }
  join(e, t = 1) {
    return join(this, e, t), this;
  }
  wrap(e, t) {
    return wrap(this, e, t), this;
  }
  setBlockType(e, t = e, n, r = null) {
    return setBlockType$1(this, e, t, n, r), this;
  }
  setNodeMarkup(e, t, n = null, r) {
    return setNodeMarkup(this, e, t, n, r), this;
  }
  setNodeAttribute(e, t, n) {
    return this.step(new AttrStep(e, t, n)), this;
  }
  addNodeMark(e, t) {
    return this.step(new AddNodeMarkStep(e, t)), this;
  }
  removeNodeMark(e, t) {
    if (!(t instanceof Mark)) {
      var n = this.doc.nodeAt(e);
      if (!n) throw new RangeError('No node at position ' + e);
      if (!(t = t.isInSet(n.marks))) return this;
    }
    return this.step(new RemoveNodeMarkStep(e, t)), this;
  }
  split(e, t = 1, n) {
    return split(this, e, t, n), this;
  }
  addMark(e, t, n) {
    return addMark(this, e, t, n), this;
  }
  removeMark(e, t, n) {
    return removeMark(this, e, t, n), this;
  }
  clearIncompatible(e, t, n) {
    return clearIncompatible(this, e, t, n), this;
  }
}
const classesById = Object.create(null);
class Selection {
  constructor(e, t, n) {
    (this.$anchor = e),
      (this.$head = t),
      (this.ranges = n || [new SelectionRange(e.min(t), e.max(t))]);
  }
  get anchor() {
    return this.$anchor.pos;
  }
  get head() {
    return this.$head.pos;
  }
  get from() {
    return this.$from.pos;
  }
  get to() {
    return this.$to.pos;
  }
  get $from() {
    return this.ranges[0].$from;
  }
  get $to() {
    return this.ranges[0].$to;
  }
  get empty() {
    var t = this.ranges;
    for (let e = 0; e < t.length; e++)
      if (t[e].$from.pos != t[e].$to.pos) return !1;
    return !0;
  }
  content() {
    return this.$from.doc.slice(this.from, this.to, !0);
  }
  replace(t, n = Slice.empty) {
    let r = n.content.lastChild,
      o = null;
    for (let e = 0; e < n.openEnd; e++) r = (o = r).lastChild;
    var i = t.steps.length,
      a = this.ranges;
    for (let e = 0; e < a.length; e++) {
      var { $from: s, $to: l } = a[e],
        c = t.mapping.slice(i);
      t.replaceRange(c.map(s.pos), c.map(l.pos), e ? Slice.empty : n),
        0 == e &&
          selectionToInsertionEnd(
            t,
            i,
            (r ? r.isInline : o && o.isTextblock) ? -1 : 1
          );
    }
  }
  replaceWith(t, n) {
    var r = t.steps.length,
      o = this.ranges;
    for (let e = 0; e < o.length; e++) {
      var { $from: i, $to: a } = o[e],
        s = t.mapping.slice(r),
        i = s.map(i.pos),
        s = s.map(a.pos);
      e
        ? t.deleteRange(i, s)
        : (t.replaceRangeWith(i, s, n),
          selectionToInsertionEnd(t, r, n.isInline ? -1 : 1));
    }
  }
  static findFrom(t, n, r = !1) {
    var e = t.parent.inlineContent
      ? new TextSelection(t)
      : findSelectionIn(t.node(0), t.parent, t.pos, t.index(), n, r);
    if (e) return e;
    for (let e = t.depth - 1; 0 <= e; e--) {
      var o =
        n < 0
          ? findSelectionIn(
              t.node(0),
              t.node(e),
              t.before(e + 1),
              t.index(e),
              n,
              r
            )
          : findSelectionIn(
              t.node(0),
              t.node(e),
              t.after(e + 1),
              t.index(e) + 1,
              n,
              r
            );
      if (o) return o;
    }
    return null;
  }
  static near(e, t = 1) {
    return (
      this.findFrom(e, t) || this.findFrom(e, -t) || new AllSelection(e.node(0))
    );
  }
  static atStart(e) {
    return findSelectionIn(e, e, 0, 0, 1) || new AllSelection(e);
  }
  static atEnd(e) {
    return (
      findSelectionIn(e, e, e.content.size, e.childCount, -1) ||
      new AllSelection(e)
    );
  }
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError('Invalid input for Selection.fromJSON');
    var n = classesById[t.type];
    if (n) return n.fromJSON(e, t);
    throw new RangeError(`No selection type ${t.type} defined`);
  }
  static jsonID(e, t) {
    if (e in classesById)
      throw new RangeError('Duplicate use of selection JSON ID ' + e);
    return ((classesById[e] = t).prototype.jsonID = e), t;
  }
  getBookmark() {
    return TextSelection.between(this.$anchor, this.$head).getBookmark();
  }
}
Selection.prototype.visible = !0;
class SelectionRange {
  constructor(e, t) {
    (this.$from = e), (this.$to = t);
  }
}
let warnedAboutTextSelection = !1;
function checkTextSelection(e) {
  warnedAboutTextSelection ||
    e.parent.inlineContent ||
    ((warnedAboutTextSelection = !0),
    console.warn(
      'TextSelection endpoint not pointing into a node with inline content (' +
        e.parent.type.name +
        ')'
    ));
}
class TextSelection extends Selection {
  constructor(e, t = e) {
    checkTextSelection(e), checkTextSelection(t), super(e, t);
  }
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(e, t) {
    var n = e.resolve(t.map(this.head));
    return n.parent.inlineContent
      ? ((e = e.resolve(t.map(this.anchor))),
        new TextSelection(e.parent.inlineContent ? e : n, n))
      : Selection.near(n);
  }
  replace(e, t = Slice.empty) {
    super.replace(e, t),
      t == Slice.empty &&
        (t = this.$from.marksAcross(this.$to)) &&
        e.ensureMarks(t);
  }
  eq(e) {
    return (
      e instanceof TextSelection &&
      e.anchor == this.anchor &&
      e.head == this.head
    );
  }
  getBookmark() {
    return new TextBookmark(this.anchor, this.head);
  }
  toJSON() {
    return { type: 'text', anchor: this.anchor, head: this.head };
  }
  static fromJSON(e, t) {
    if ('number' != typeof t.anchor || 'number' != typeof t.head)
      throw new RangeError('Invalid input for TextSelection.fromJSON');
    return new TextSelection(e.resolve(t.anchor), e.resolve(t.head));
  }
  static create(e, t, n = t) {
    var r = e.resolve(t);
    return new this(r, n == t ? r : e.resolve(n));
  }
  static between(e, t, n) {
    var r = e.pos - t.pos;
    if (((n && !r) || (n = 0 <= r ? 1 : -1), !t.parent.inlineContent)) {
      var o = Selection.findFrom(t, n, !0) || Selection.findFrom(t, -n, !0);
      if (!o) return Selection.near(t, n);
      t = o.$head;
    }
    return (
      e.parent.inlineContent ||
        (0 != r &&
          (e = (Selection.findFrom(e, -n, !0) || Selection.findFrom(e, n, !0))
            .$anchor).pos <
            t.pos ==
            r < 0) ||
        (e = t),
      new TextSelection(e, t)
    );
  }
}
Selection.jsonID('text', TextSelection);
class TextBookmark {
  constructor(e, t) {
    (this.anchor = e), (this.head = t);
  }
  map(e) {
    return new TextBookmark(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return TextSelection.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class NodeSelection extends Selection {
  constructor(e) {
    var t = e.nodeAfter,
      n = e.node(0).resolve(e.pos + t.nodeSize);
    super(e, n), (this.node = t);
  }
  map(e, t) {
    var { deleted: t, pos: n } = t.mapResult(this.anchor),
      e = e.resolve(n);
    return t ? Selection.near(e) : new NodeSelection(e);
  }
  content() {
    return new Slice(Fragment.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof NodeSelection && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: 'node', anchor: this.anchor };
  }
  getBookmark() {
    return new NodeBookmark(this.anchor);
  }
  static fromJSON(e, t) {
    if ('number' != typeof t.anchor)
      throw new RangeError('Invalid input for NodeSelection.fromJSON');
    return new NodeSelection(e.resolve(t.anchor));
  }
  static create(e, t) {
    return new NodeSelection(e.resolve(t));
  }
  static isSelectable(e) {
    return !e.isText && !1 !== e.type.spec.selectable;
  }
}
(NodeSelection.prototype.visible = !1), Selection.jsonID('node', NodeSelection);
class NodeBookmark {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    var { deleted: e, pos: t } = e.mapResult(this.anchor);
    return e ? new TextBookmark(t, t) : new NodeBookmark(t);
  }
  resolve(e) {
    var e = e.resolve(this.anchor),
      t = e.nodeAfter;
    return t && NodeSelection.isSelectable(t)
      ? new NodeSelection(e)
      : Selection.near(e);
  }
}
class AllSelection extends Selection {
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = Slice.empty) {
    var n;
    t == Slice.empty
      ? (e.delete(0, e.doc.content.size),
        (n = Selection.atStart(e.doc)).eq(e.selection) || e.setSelection(n))
      : super.replace(e, t);
  }
  toJSON() {
    return { type: 'all' };
  }
  static fromJSON(e) {
    return new AllSelection(e);
  }
  map(e) {
    return new AllSelection(e);
  }
  eq(e) {
    return e instanceof AllSelection;
  }
  getBookmark() {
    return AllBookmark;
  }
}
Selection.jsonID('all', AllSelection);
const AllBookmark = {
  map() {
    return this;
  },
  resolve(e) {
    return new AllSelection(e);
  },
};
function findSelectionIn(t, n, r, o, i, a = !1) {
  if (n.inlineContent) return TextSelection.create(t, r);
  for (let e = o - (0 < i ? 0 : 1); 0 < i ? e < n.childCount : 0 <= e; e += i) {
    var s = n.child(e);
    if (s.isAtom) {
      if (!a && NodeSelection.isSelectable(s))
        return NodeSelection.create(t, r - (i < 0 ? s.nodeSize : 0));
    } else {
      var l = findSelectionIn(t, s, r + i, i < 0 ? s.childCount : 0, i, a);
      if (l) return l;
    }
    r += s.nodeSize * i;
  }
  return null;
}
function selectionToInsertionEnd(t, e, n) {
  var r = t.steps.length - 1;
  if (!(r < e)) {
    e = t.steps[r];
    if (e instanceof ReplaceStep || e instanceof ReplaceAroundStep) {
      let e = t.mapping.maps[r],
        o;
      e.forEach((e, t, n, r) => {
        null == o && (o = r);
      }),
        t.setSelection(Selection.near(t.doc.resolve(o), n));
    }
  }
}
const UPDATED_SEL = 1,
  UPDATED_MARKS = 2,
  UPDATED_SCROLL = 4;
class Transaction extends Transform {
  constructor(e) {
    super(e.doc),
      (this.curSelectionFor = 0),
      (this.updated = 0),
      (this.meta = Object.create(null)),
      (this.time = Date.now()),
      (this.curSelection = e.selection),
      (this.storedMarks = e.storedMarks);
  }
  get selection() {
    return (
      this.curSelectionFor < this.steps.length &&
        ((this.curSelection = this.curSelection.map(
          this.doc,
          this.mapping.slice(this.curSelectionFor)
        )),
        (this.curSelectionFor = this.steps.length)),
      this.curSelection
    );
  }
  setSelection(e) {
    if (e.$from.doc != this.doc)
      throw new RangeError(
        'Selection passed to setSelection must point at the current document'
      );
    return (
      (this.curSelection = e),
      (this.curSelectionFor = this.steps.length),
      (this.updated = (this.updated | UPDATED_SEL) & ~UPDATED_MARKS),
      (this.storedMarks = null),
      this
    );
  }
  get selectionSet() {
    return 0 < (this.updated & UPDATED_SEL);
  }
  setStoredMarks(e) {
    return (this.storedMarks = e), (this.updated |= UPDATED_MARKS), this;
  }
  ensureMarks(e) {
    return (
      Mark.sameSet(this.storedMarks || this.selection.$from.marks(), e) ||
        this.setStoredMarks(e),
      this
    );
  }
  addStoredMark(e) {
    return this.ensureMarks(
      e.addToSet(this.storedMarks || this.selection.$head.marks())
    );
  }
  removeStoredMark(e) {
    return this.ensureMarks(
      e.removeFromSet(this.storedMarks || this.selection.$head.marks())
    );
  }
  get storedMarksSet() {
    return 0 < (this.updated & UPDATED_MARKS);
  }
  addStep(e, t) {
    super.addStep(e, t),
      (this.updated = this.updated & ~UPDATED_MARKS),
      (this.storedMarks = null);
  }
  setTime(e) {
    return (this.time = e), this;
  }
  replaceSelection(e) {
    return this.selection.replace(this, e), this;
  }
  replaceSelectionWith(e, t = !0) {
    var n = this.selection;
    return (
      t &&
        (e = e.mark(
          this.storedMarks ||
            (n.empty
              ? n.$from.marks()
              : n.$from.marksAcross(n.$to) || Mark.none)
        )),
      n.replaceWith(this, e),
      this
    );
  }
  deleteSelection() {
    return this.selection.replace(this), this;
  }
  insertText(t, n, r) {
    var o,
      i = this.doc.type.schema;
    if (null == n)
      return t
        ? this.replaceSelectionWith(i.text(t), !0)
        : this.deleteSelection();
    {
      if (((r = null == (r = null == r ? n : r) ? n : r), !t))
        return this.deleteRange(n, r);
      let e = this.storedMarks;
      return (
        e ||
          ((o = this.doc.resolve(n)),
          (e = r == n ? o.marks() : o.marksAcross(this.doc.resolve(r)))),
        this.replaceRangeWith(n, r, i.text(t, e)),
        this.selection.empty ||
          this.setSelection(Selection.near(this.selection.$to)),
        this
      );
    }
  }
  setMeta(e, t) {
    return (this.meta['string' == typeof e ? e : e.key] = t), this;
  }
  getMeta(e) {
    return this.meta['string' == typeof e ? e : e.key];
  }
  get isGeneric() {
    for (var e in this.meta) return !1;
    return !0;
  }
  scrollIntoView() {
    return (this.updated |= UPDATED_SCROLL), this;
  }
  get scrolledIntoView() {
    return 0 < (this.updated & UPDATED_SCROLL);
  }
}
function bind(e, t) {
  return t && e ? e.bind(t) : e;
}
class FieldDesc {
  constructor(e, t, n) {
    (this.name = e),
      (this.init = bind(t.init, n)),
      (this.apply = bind(t.apply, n));
  }
}
const baseFields = [
  new FieldDesc('doc', {
    init(e) {
      return e.doc || e.schema.topNodeType.createAndFill();
    },
    apply(e) {
      return e.doc;
    },
  }),
  new FieldDesc('selection', {
    init(e, t) {
      return e.selection || Selection.atStart(t.doc);
    },
    apply(e) {
      return e.selection;
    },
  }),
  new FieldDesc('storedMarks', {
    init(e) {
      return e.storedMarks || null;
    },
    apply(e, t, n, r) {
      return r.selection.$cursor ? e.storedMarks : null;
    },
  }),
  new FieldDesc('scrollToSelection', {
    init() {
      return 0;
    },
    apply(e, t) {
      return e.scrolledIntoView ? t + 1 : t;
    },
  }),
];
class Configuration {
  constructor(e, t) {
    (this.schema = e),
      (this.plugins = []),
      (this.pluginsByKey = Object.create(null)),
      (this.fields = baseFields.slice()),
      t &&
        t.forEach((e) => {
          if (this.pluginsByKey[e.key])
            throw new RangeError(
              'Adding different instances of a keyed plugin (' + e.key + ')'
            );
          this.plugins.push(e),
            (this.pluginsByKey[e.key] = e).spec.state &&
              this.fields.push(new FieldDesc(e.key, e.spec.state, e));
        });
  }
}
class EditorState {
  constructor(e) {
    this.config = e;
  }
  get schema() {
    return this.config.schema;
  }
  get plugins() {
    return this.config.plugins;
  }
  apply(e) {
    return this.applyTransaction(e).state;
  }
  filterTransaction(t, n = -1) {
    for (let e = 0; e < this.config.plugins.length; e++)
      if (e != n) {
        var r = this.config.plugins[e];
        if (
          r.spec.filterTransaction &&
          !r.spec.filterTransaction.call(r, t, this)
        )
          return !1;
      }
    return !0;
  }
  applyTransaction(n) {
    if (!this.filterTransaction(n)) return { state: this, transactions: [] };
    let r = [n],
      o = this.applyInner(n),
      i = null;
    for (;;) {
      let e = !1;
      for (let t = 0; t < this.config.plugins.length; t++) {
        var a = this.config.plugins[t];
        if (a.spec.appendTransaction) {
          var s = i ? i[t].n : 0,
            l = i ? i[t].state : this,
            a =
              s < r.length &&
              a.spec.appendTransaction.call(a, s ? r.slice(s) : r, l, o);
          if (a && o.filterTransaction(a, t)) {
            if ((a.setMeta('appendedTransaction', n), !i)) {
              i = [];
              for (let e = 0; e < this.config.plugins.length; e++)
                i.push(
                  e < t ? { state: o, n: r.length } : { state: this, n: 0 }
                );
            }
            r.push(a), (o = o.applyInner(a)), (e = !0);
          }
          i && (i[t] = { state: o, n: r.length });
        }
      }
      if (!e) return { state: o, transactions: r };
    }
  }
  applyInner(t) {
    if (!t.before.eq(this.doc))
      throw new RangeError('Applying a mismatched transaction');
    var n = new EditorState(this.config),
      r = this.config.fields;
    for (let e = 0; e < r.length; e++) {
      var o = r[e];
      n[o.name] = o.apply(t, this[o.name], this, n);
    }
    return n;
  }
  get tr() {
    return new Transaction(this);
  }
  static create(t) {
    var n = new Configuration((t.doc ? t.doc.type : t).schema, t.plugins),
      r = new EditorState(n);
    for (let e = 0; e < n.fields.length; e++)
      r[n.fields[e].name] = n.fields[e].init(t, r);
    return r;
  }
  reconfigure(t) {
    var e = new Configuration(this.schema, t.plugins),
      n = e.fields,
      r = new EditorState(e);
    for (let e = 0; e < n.length; e++) {
      var o = n[e].name;
      r[o] = this.hasOwnProperty(o) ? this[o] : n[e].init(t, r);
    }
    return r;
  }
  toJSON(e) {
    var t = { doc: this.doc.toJSON(), selection: this.selection.toJSON() };
    if (
      (this.storedMarks &&
        (t.storedMarks = this.storedMarks.map((e) => e.toJSON())),
      e && 'object' == typeof e)
    )
      for (var n in e) {
        if ('doc' == n || 'selection' == n)
          throw new RangeError(
            'The JSON fields `doc` and `selection` are reserved'
          );
        var r = e[n],
          o = r.spec.state;
        o && o.toJSON && (t[n] = o.toJSON.call(r, this[r.key]));
      }
    return t;
  }
  static fromJSON(o, i, a) {
    if (!i) throw new RangeError('Invalid input for EditorState.fromJSON');
    if (!o.schema)
      throw new RangeError("Required config field 'schema' missing");
    var e = new Configuration(o.schema, o.plugins);
    let s = new EditorState(e);
    return (
      e.fields.forEach((e) => {
        if ('doc' == e.name) s.doc = Node.fromJSON(o.schema, i.doc);
        else if ('selection' == e.name)
          s.selection = Selection.fromJSON(s.doc, i.selection);
        else if ('storedMarks' == e.name)
          i.storedMarks &&
            (s.storedMarks = i.storedMarks.map(o.schema.markFromJSON));
        else {
          if (a)
            for (var t in a) {
              var n = a[t],
                r = n.spec.state;
              if (
                n.key == e.name &&
                r &&
                r.fromJSON &&
                Object.prototype.hasOwnProperty.call(i, t)
              )
                return void (s[e.name] = r.fromJSON.call(n, o, i[t], s));
            }
          s[e.name] = e.init(o, s);
        }
      }),
      s
    );
  }
}
function bindProps(t, n, r) {
  for (var o in t) {
    let e = t[o];
    e instanceof Function
      ? (e = e.bind(n))
      : 'handleDOMEvents' == o && (e = bindProps(e, n, {})),
      (r[o] = e);
  }
  return r;
}
class Plugin {
  constructor(e) {
    (this.spec = e),
      (this.props = {}),
      e.props && bindProps(e.props, this, this.props),
      (this.key = e.key ? e.key.key : createKey('plugin'));
  }
  getState(e) {
    return e[this.key];
  }
}
const keys = Object.create(null);
function createKey(e) {
  return e in keys ? e + '$' + ++keys[e] : ((keys[e] = 0), e + '$');
}
class PluginKey {
  constructor(e = 'key') {
    this.key = createKey(e);
  }
  get(e) {
    return e.config.pluginsByKey[this.key];
  }
  getState(e) {
    return e[this.key];
  }
}
class InputRule {
  constructor(e, t) {
    (this.match = e),
      (this.match = e),
      (this.handler = 'string' == typeof t ? stringHandler(t) : t);
  }
}
function stringHandler(s) {
  return function (e, t, n, r) {
    let o = s;
    var i, a;
    return (
      t[1] &&
        ((i = t[0].lastIndexOf(t[1])),
        (o += t[0].slice(i + t[1].length)),
        0 < (a = (n += i) - r)) &&
        ((o = t[0].slice(i - a, i) + o), (n = r)),
      e.tr.insertText(o, n, r)
    );
  };
}
const MAX_MATCH = 500;
function inputRules({ rules: o }) {
  let i = new Plugin({
    state: {
      init() {
        return null;
      },
      apply(e, t) {
        var n = e.getMeta(this);
        return n || (e.selectionSet || e.docChanged ? null : t);
      },
    },
    props: {
      handleTextInput(e, t, n, r) {
        return run(e, t, n, r, o, i);
      },
      handleDOMEvents: {
        compositionend: (t) => {
          setTimeout(() => {
            var e = t.state.selection['$cursor'];
            e && run(t, e.pos, e.pos, '', o, i);
          });
        },
      },
    },
    isInputRules: !0,
  });
  return i;
}
function run(t, n, r, o, i, a) {
  if (!t.composing) {
    var s = t.state,
      e = s.doc.resolve(n);
    if (!e.parent.type.spec.code) {
      var l =
        e.parent.textBetween(
          Math.max(0, e.parentOffset - MAX_MATCH),
          e.parentOffset,
          null,
          '￼'
        ) + o;
      for (let e = 0; e < i.length; e++) {
        var c = i[e].match.exec(l),
          c = c && i[e].handler(s, c, n - (c[0].length - o.length), r);
        if (c)
          return (
            t.dispatch(c.setMeta(a, { transform: c, from: n, to: r, text: o })),
            !0
          );
      }
    }
  }
  return !1;
}
const undoInputRule = (r, o) => {
    var i = r.plugins;
    for (let n = 0; n < i.length; n++) {
      let e = i[n],
        t;
      if (e.spec.isInputRules && (t = e.getState(r))) {
        if (o) {
          var a,
            s = r.tr,
            l = t.transform;
          for (let e = l.steps.length - 1; 0 <= e; e--)
            s.step(l.steps[e].invert(l.docs[e]));
          t.text
            ? ((a = s.doc.resolve(t.from).marks()),
              s.replaceWith(t.from, t.to, r.schema.text(t.text, a)))
            : s.delete(t.from, t.to),
            o(s);
        }
        return !0;
      }
    }
    return !1;
  },
  emDash = new InputRule(/--$/, '—'),
  ellipsis = new InputRule(/\.\.\.$/, '…'),
  openDoubleQuote = new InputRule(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(")$/, '“'),
  closeDoubleQuote = new InputRule(/"$/, '”'),
  openSingleQuote = new InputRule(/(?:^|[\s\{\[\(\<'"\u2018\u201C])(')$/, '‘'),
  closeSingleQuote = new InputRule(/'$/, '’'),
  smartQuotes = [
    openDoubleQuote,
    closeDoubleQuote,
    openSingleQuote,
    closeSingleQuote,
  ];
function wrappingInputRule(e, i, a = null, s) {
  return new InputRule(e, (e, t, n, r) => {
    var o = a instanceof Function ? a(t) : a,
      e = e.tr.delete(n, r),
      r = e.doc.resolve(n).blockRange(),
      o = r && findWrapping(r, i, o);
    if (!o) return null;
    e.wrap(r, o);
    r = e.doc.resolve(n - 1).nodeBefore;
    return (
      r &&
        r.type == i &&
        canJoin(e.doc, n - 1) &&
        (!s || s(t, r)) &&
        e.join(n - 1),
      e
    );
  });
}
function textblockTypeInputRule(e, i, a = null) {
  return new InputRule(e, (e, t, n, r) => {
    var o = e.doc.resolve(n),
      t = a instanceof Function ? a(t) : a;
    return o.node(-1).canReplaceWith(o.index(-1), o.indexAfter(-1), i)
      ? e.tr.delete(n, r).setBlockType(n, n, i, t)
      : null;
  });
}
function blockQuoteRule(e) {
  return wrappingInputRule(/^\s*>\s$/, e);
}
function orderedListRule(e) {
  return wrappingInputRule(
    /^(\d+)\.\s$/,
    e,
    (e) => ({ order: +e[1] }),
    (e, t) => t.childCount + t.attrs.order == +e[1]
  );
}
function bulletListRule(e) {
  return wrappingInputRule(/^\s*([-+*])\s$/, e);
}
function codeBlockRule(e) {
  return textblockTypeInputRule(/^```$/, e);
}
function headingRule(e, t) {
  return textblockTypeInputRule(
    new RegExp('^(#{1,' + t + '})\\s$'),
    e,
    (e) => ({ level: e[1].length })
  );
}
function buildInputRules(e) {
  var t,
    n = smartQuotes.concat(ellipsis, emDash);
  return (
    (t = e.nodes.blockquote) && n.push(blockQuoteRule(t)),
    (t = e.nodes.ordered_list) && n.push(orderedListRule(t)),
    (t = e.nodes.bullet_list) && n.push(bulletListRule(t)),
    (t = e.nodes.code_block) && n.push(codeBlockRule(t)),
    (t = e.nodes.heading) && n.push(headingRule(t, 6)),
    inputRules({ rules: n })
  );
}
const deleteSelection = (e, t) =>
  !e.selection.empty && (t && t(e.tr.deleteSelection().scrollIntoView()), !0);
function atBlockStart(e, t) {
  var n = e.selection['$cursor'];
  return !n || (t ? !t.endOfTextblock('backward', e) : 0 < n.parentOffset)
    ? null
    : n;
}
const joinBackward = (e, t, n) => {
  n = atBlockStart(e, n);
  if (!n) return !1;
  var r = findCutBefore(n);
  if (!r)
    return (
      null != (i = (o = n.blockRange()) && liftTarget(o)) &&
      (t && t(e.tr.lift(o, i).scrollIntoView()), !0)
    );
  var o = r.nodeBefore;
  if (!o.type.spec.isolating && deleteBarrier(e, r, t)) return !0;
  if (
    0 == n.parent.content.size &&
    (textblockAt(o, 'end') || NodeSelection.isSelectable(o))
  ) {
    var i = replaceStep(e.doc, n.before(), n.after(), Slice.empty);
    if (i && i.slice.size < i.to - i.from)
      return (
        t &&
          ((i = e.tr.step(i)).setSelection(
            textblockAt(o, 'end')
              ? Selection.findFrom(i.doc.resolve(i.mapping.map(r.pos, -1)), -1)
              : NodeSelection.create(i.doc, r.pos - o.nodeSize)
          ),
          t(i.scrollIntoView())),
        !0
      );
  }
  return !(
    !o.isAtom ||
    r.depth != n.depth - 1 ||
    (t && t(e.tr.delete(r.pos - o.nodeSize, r.pos).scrollIntoView()), 0)
  );
};
function textblockAt(t, n, r = !1) {
  for (let e = t; e; e = 'start' == n ? e.firstChild : e.lastChild) {
    if (e.isTextblock) return !0;
    if (r && 1 != e.childCount) return !1;
  }
  return !1;
}
const selectNodeBackward = (e, t, n) => {
  let { $head: r, empty: o } = e.selection,
    i = r;
  if (!o) return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock('backward', e) : 0 < r.parentOffset) return !1;
    i = findCutBefore(r);
  }
  n = i && i.nodeBefore;
  return !(
    !n ||
    !NodeSelection.isSelectable(n) ||
    (t &&
      t(
        e.tr
          .setSelection(NodeSelection.create(e.doc, i.pos - n.nodeSize))
          .scrollIntoView()
      ),
    0)
  );
};
function findCutBefore(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; 0 <= e; e--) {
      if (0 < t.index(e)) return t.doc.resolve(t.before(e + 1));
      if (t.node(e).type.spec.isolating) break;
    }
  return null;
}
function atBlockEnd(e, t) {
  var n = e.selection['$cursor'];
  return !n ||
    (t
      ? !t.endOfTextblock('forward', e)
      : n.parentOffset < n.parent.content.size)
    ? null
    : n;
}
const joinForward = (e, t, n) => {
    n = atBlockEnd(e, n);
    if (!n) return !1;
    var r = findCutAfter(n);
    if (!r) return !1;
    var o = r.nodeAfter;
    if (deleteBarrier(e, r, t)) return !0;
    if (
      0 == n.parent.content.size &&
      (textblockAt(o, 'start') || NodeSelection.isSelectable(o))
    ) {
      var i = replaceStep(e.doc, n.before(), n.after(), Slice.empty);
      if (i && i.slice.size < i.to - i.from)
        return (
          t &&
            ((i = e.tr.step(i)).setSelection(
              textblockAt(o, 'start')
                ? Selection.findFrom(i.doc.resolve(i.mapping.map(r.pos)), 1)
                : NodeSelection.create(i.doc, i.mapping.map(r.pos))
            ),
            t(i.scrollIntoView())),
          !0
        );
    }
    return !(
      !o.isAtom ||
      r.depth != n.depth - 1 ||
      (t && t(e.tr.delete(r.pos, r.pos + o.nodeSize).scrollIntoView()), 0)
    );
  },
  selectNodeForward = (e, t, n) => {
    let { $head: r, empty: o } = e.selection,
      i = r;
    if (!o) return !1;
    if (r.parent.isTextblock) {
      if (
        n
          ? !n.endOfTextblock('forward', e)
          : r.parentOffset < r.parent.content.size
      )
        return !1;
      i = findCutAfter(r);
    }
    n = i && i.nodeAfter;
    return !(
      !n ||
      !NodeSelection.isSelectable(n) ||
      (t &&
        t(
          e.tr.setSelection(NodeSelection.create(e.doc, i.pos)).scrollIntoView()
        ),
      0)
    );
  };
function findCutAfter(t) {
  if (!t.parent.type.spec.isolating)
    for (let e = t.depth - 1; 0 <= e; e--) {
      var n = t.node(e);
      if (t.index(e) + 1 < n.childCount) return t.doc.resolve(t.after(e + 1));
      if (n.type.spec.isolating) break;
    }
  return null;
}
const joinUp = (e, t) => {
    let n = e.selection,
      r = n instanceof NodeSelection,
      o;
    if (r) {
      if (n.node.isTextblock || !canJoin(e.doc, n.from)) return !1;
      o = n.from;
    } else if (null == (o = joinPoint(e.doc, n.from, -1))) return !1;
    var i;
    return (
      t &&
        ((i = e.tr.join(o)),
        r &&
          i.setSelection(
            NodeSelection.create(
              i.doc,
              o - e.doc.resolve(o).nodeBefore.nodeSize
            )
          ),
        t(i.scrollIntoView())),
      !0
    );
  },
  joinDown = (e, t) => {
    let n = e.selection,
      r;
    if (n instanceof NodeSelection) {
      if (n.node.isTextblock || !canJoin(e.doc, n.to)) return !1;
      r = n.to;
    } else if (null == (r = joinPoint(e.doc, n.to, 1))) return !1;
    return t && t(e.tr.join(r).scrollIntoView()), !0;
  },
  lift = (e, t) => {
    var { $from: n, $to: r } = e.selection,
      n = n.blockRange(r),
      r = n && liftTarget(n);
    return null != r && (t && t(e.tr.lift(n, r).scrollIntoView()), !0);
  },
  newlineInCode = (e, t) => {
    var { $head: n, $anchor: r } = e.selection;
    return !(
      !n.parent.type.spec.code ||
      !n.sameParent(r) ||
      (t && t(e.tr.insertText('\n').scrollIntoView()), 0)
    );
  };
function defaultBlockAt$1(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    var n = t.edge(e)['type'];
    if (n.isTextblock && !n.hasRequiredAttrs()) return n;
  }
  return null;
}
const exitCode = (e, t) => {
    var n,
      r,
      { $head: o, $anchor: i } = e.selection;
    return !(
      !o.parent.type.spec.code ||
      !o.sameParent(i) ||
      ((i = o.node(-1)),
      (r = o.indexAfter(-1)),
      !(n = defaultBlockAt$1(i.contentMatchAt(r)))) ||
      !i.canReplaceWith(r, r, n) ||
      (t &&
        ((i = o.after()),
        (r = e.tr.replaceWith(i, i, n.createAndFill())).setSelection(
          Selection.near(r.doc.resolve(i), 1)
        ),
        t(r.scrollIntoView())),
      0)
    );
  },
  createParagraphNear = (e, t) => {
    var n = e.selection,
      { $from: r, $to: o } = n;
    return !(
      n instanceof AllSelection ||
      r.parent.inlineContent ||
      o.parent.inlineContent ||
      !(n = defaultBlockAt$1(o.parent.contentMatchAt(o.indexAfter()))) ||
      !n.isTextblock ||
      (t &&
        ((r = (!r.parentOffset && o.index() < o.parent.childCount ? r : o).pos),
        (o = e.tr.insert(r, n.createAndFill())).setSelection(
          TextSelection.create(o.doc, r + 1)
        ),
        t(o.scrollIntoView())),
      0)
    );
  },
  liftEmptyBlock = (e, t) => {
    var n = e.selection['$cursor'];
    if (!n || n.parent.content.size) return !1;
    if (1 < n.depth && n.after() != n.end(-1)) {
      var r = n.before();
      if (canSplit(e.doc, r)) return t && t(e.tr.split(r).scrollIntoView()), !0;
    }
    (r = n.blockRange()), (n = r && liftTarget(r));
    return null != n && (t && t(e.tr.lift(r, n).scrollIntoView()), !0);
  };
function splitBlockAs$1(l) {
  return (n, r) => {
    var { $from: o, $to: i } = n.selection;
    if (n.selection instanceof NodeSelection && n.selection.node.isBlock)
      return !(
        !o.parentOffset ||
        !canSplit(n.doc, o.pos) ||
        (r && r(n.tr.split(o.pos).scrollIntoView()), 0)
      );
    if (!o.parent.isBlock) return !1;
    if (r) {
      var a = i.parentOffset == i.parent.content.size,
        s = n.tr,
        n =
          ((n.selection instanceof TextSelection ||
            n.selection instanceof AllSelection) &&
            s.deleteSelection(),
          0 == o.depth
            ? null
            : defaultBlockAt$1(o.node(-1).contentMatchAt(o.indexAfter(-1)))),
        i = l && l(i.parent, a);
      let e = i ? [i] : a && n ? [{ type: n }] : void 0,
        t = canSplit(s.doc, s.mapping.map(o.pos), 1, e);
      e ||
        t ||
        !canSplit(s.doc, s.mapping.map(o.pos), 1, n ? [{ type: n }] : void 0) ||
        (n && (e = [{ type: n }]), (t = !0)),
        t &&
          (s.split(s.mapping.map(o.pos), 1, e),
          a ||
            o.parentOffset ||
            o.parent.type == n ||
            ((i = s.mapping.map(o.before())),
            (a = s.doc.resolve(i)),
            n &&
              o.node(-1).canReplaceWith(a.index(), a.index() + 1, n) &&
              s.setNodeMarkup(s.mapping.map(o.before()), n))),
        r(s.scrollIntoView());
    }
    return !0;
  };
}
const splitBlock = splitBlockAs$1(),
  selectParentNode = (e, t) => {
    var { $from: n, to: r } = e.selection,
      r = n.sharedDepth(r);
    return (
      0 != r &&
      ((n = n.before(r)),
      t && t(e.tr.setSelection(NodeSelection.create(e.doc, n))),
      !0)
    );
  },
  selectAll$1 = (e, t) => (
    t && t(e.tr.setSelection(new AllSelection(e.doc))), !0
  );
function joinMaybeClear(e, t, n) {
  var r = t.nodeBefore,
    o = t.nodeAfter,
    i = t.index();
  if (!r || !o || !r.type.compatibleContent(o.type)) return !1;
  if (!r.content.size && t.parent.canReplace(i - 1, i))
    n && n(e.tr.delete(t.pos - r.nodeSize, t.pos).scrollIntoView());
  else {
    if (
      !t.parent.canReplace(i, i + 1) ||
      (!o.isTextblock && !canJoin(e.doc, t.pos))
    )
      return !1;
    n &&
      n(
        e.tr
          .clearIncompatible(t.pos, r.type, r.contentMatchAt(r.childCount))
          .join(t.pos)
          .scrollIntoView()
      );
  }
  return !0;
}
function deleteBarrier(o, i, a) {
  let s = i.nodeBefore,
    l = i.nodeAfter,
    n,
    e;
  if (!s.type.spec.isolating && !l.type.spec.isolating) {
    if (joinMaybeClear(o, i, a)) return !0;
    var t = i.parent.canReplace(i.index(), i.index() + 1);
    if (
      t &&
      (n = (e = s.contentMatchAt(s.childCount)).findWrapping(l.type)) &&
      e.matchType(n[0] || l.type).validEnd
    ) {
      if (a) {
        let e = i.pos + l.nodeSize,
          t = Fragment.empty;
        for (let e = n.length - 1; 0 <= e; e--)
          t = Fragment.from(n[e].create(null, t));
        t = Fragment.from(s.copy(t));
        var r = o.tr.step(
            new ReplaceAroundStep(
              i.pos - 1,
              e,
              i.pos,
              e,
              new Slice(t, 1, 0),
              n.length,
              !0
            )
          ),
          c = e + 2 * n.length;
        canJoin(r.doc, c) && r.join(c), a(r.scrollIntoView());
      }
      return !0;
    }
    (c = Selection.findFrom(i, 1)),
      (r = c && c.$from.blockRange(c.$to)),
      (c = r && liftTarget(r));
    if (null != c && c >= i.depth)
      return a && a(o.tr.lift(r, c).scrollIntoView()), !0;
    if (t && textblockAt(l, 'start', !0) && textblockAt(s, 'end')) {
      let e = s,
        n = [];
      for (; n.push(e), !e.isTextblock; ) e = e.lastChild;
      let t = l,
        r = 1;
      for (; !t.isTextblock; t = t.firstChild) r++;
      if (e.canReplace(e.childCount, e.childCount, t.content)) {
        if (a) {
          let t = Fragment.empty;
          for (let e = n.length - 1; 0 <= e; e--)
            t = Fragment.from(n[e].copy(t));
          a(
            o.tr
              .step(
                new ReplaceAroundStep(
                  i.pos - n.length,
                  i.pos + l.nodeSize,
                  i.pos + r,
                  i.pos + l.nodeSize - r,
                  new Slice(t, n.length, 0),
                  0,
                  !0
                )
              )
              .scrollIntoView()
          );
        }
        return !0;
      }
    }
  }
  return !1;
}
function selectTextblockSide(i) {
  return function (e, t) {
    var n = e.selection,
      r = i < 0 ? n.$from : n.$to;
    let o = r.depth;
    for (; r.node(o).isInline; ) {
      if (!o) return !1;
      o--;
    }
    return (
      !!r.node(o).isTextblock &&
      (t &&
        t(
          e.tr.setSelection(
            TextSelection.create(e.doc, i < 0 ? r.start(o) : r.end(o))
          )
        ),
      !0)
    );
  };
}
const selectTextblockStart = selectTextblockSide(-1),
  selectTextblockEnd = selectTextblockSide(1);
function setBlockType(l, c = null) {
  return function (n, e) {
    let r = !1;
    for (let e = 0; e < n.selection.ranges.length && !r; e++) {
      var {
        $from: { pos: t },
        $to: { pos: o },
      } = n.selection.ranges[e];
      n.doc.nodesBetween(t, o, (e, t) => {
        if (r) return !1;
        e.isTextblock &&
          !e.hasMarkup(l, c) &&
          (r =
            e.type == l ||
            ((t = (e = n.doc.resolve(t)).index()),
            e.parent.canReplaceWith(t, t + 1, l)));
      });
    }
    if (!r) return !1;
    if (e) {
      var i = n.tr;
      for (let e = 0; e < n.selection.ranges.length; e++) {
        var {
          $from: { pos: a },
          $to: { pos: s },
        } = n.selection.ranges[e];
        i.setBlockType(a, s, l, c);
      }
      e(i.scrollIntoView());
    }
    return !0;
  };
}
function chainCommands(...o) {
  return function (t, n, r) {
    for (let e = 0; e < o.length; e++) if (o[e](t, n, r)) return !0;
    return !1;
  };
}
let backspace = chainCommands(
    deleteSelection,
    joinBackward,
    selectNodeBackward
  ),
  del = chainCommands(deleteSelection, joinForward, selectNodeForward);
const pcBaseKeymap = {
    Enter: chainCommands(
      newlineInCode,
      createParagraphNear,
      liftEmptyBlock,
      splitBlock
    ),
    'Mod-Enter': exitCode,
    Backspace: backspace,
    'Mod-Backspace': backspace,
    'Shift-Backspace': backspace,
    Delete: del,
    'Mod-Delete': del,
    'Mod-a': selectAll$1,
  },
  macBaseKeymap = {
    'Ctrl-h': pcBaseKeymap.Backspace,
    'Alt-Backspace': pcBaseKeymap['Mod-Backspace'],
    'Ctrl-d': pcBaseKeymap.Delete,
    'Ctrl-Alt-Backspace': pcBaseKeymap['Mod-Delete'],
    'Alt-Delete': pcBaseKeymap['Mod-Delete'],
    'Alt-d': pcBaseKeymap['Mod-Delete'],
    'Ctrl-a': selectTextblockStart,
    'Ctrl-e': selectTextblockEnd,
  };
for (let e in pcBaseKeymap) macBaseKeymap[e] = pcBaseKeymap[e];
const mac$3 =
    'undefined' != typeof navigator
      ? /Mac|iP(hone|[oa]d)/.test(navigator.platform)
      : !('undefined' == typeof os || !os.platform) &&
        'darwin' == os.platform(),
  baseKeymap = mac$3 ? macBaseKeymap : pcBaseKeymap;
for (
  var base = {
      8: 'Backspace',
      9: 'Tab',
      10: 'Enter',
      12: 'NumLock',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      44: 'PrintScreen',
      45: 'Insert',
      46: 'Delete',
      59: ';',
      61: '=',
      91: 'Meta',
      92: 'Meta',
      106: '*',
      107: '+',
      108: ',',
      109: '-',
      110: '.',
      111: '/',
      144: 'NumLock',
      145: 'ScrollLock',
      160: 'Shift',
      161: 'Shift',
      162: 'Control',
      163: 'Control',
      164: 'Alt',
      165: 'Alt',
      173: '-',
      186: ';',
      187: '=',
      188: ',',
      189: '-',
      190: '.',
      191: '/',
      192: '`',
      219: '[',
      220: '\\',
      221: ']',
      222: "'",
    },
    shift = {
      48: ')',
      49: '!',
      50: '@',
      51: '#',
      52: '$',
      53: '%',
      54: '^',
      55: '&',
      56: '*',
      57: '(',
      59: ':',
      61: '+',
      173: '_',
      186: ':',
      187: '+',
      188: '<',
      189: '_',
      190: '>',
      191: '?',
      192: '~',
      219: '{',
      220: '|',
      221: '}',
      222: '"',
    },
    mac$2 = 'undefined' != typeof navigator && /Mac/.test(navigator.platform),
    ie$1 =
      'undefined' != typeof navigator &&
      /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),
    i = 0;
  i < 10;
  i++
)
  base[48 + i] = base[96 + i] = String(i);
for (i = 1; i <= 24; i++) base[i + 111] = 'F' + i;
for (var code, i = 65; i <= 90; i++)
  (base[i] = String.fromCharCode(i + 32)), (shift[i] = String.fromCharCode(i));
for (code in base) shift.hasOwnProperty(code) || (shift[code] = base[code]);
function keyName(e) {
  e =
    (!(
      (mac$2 && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey) ||
      (ie$1 && e.shiftKey && e.key && 1 == e.key.length) ||
      'Unidentified' == e.key
    ) &&
      e.key) ||
    (e.shiftKey ? shift : base)[e.keyCode] ||
    e.key ||
    'Unidentified';
  return (e =
    'Down' ==
    (e =
      'Right' ==
      (e =
        'Up' ==
        (e =
          'Left' ==
          (e = 'Del' == (e = 'Esc' == e ? 'Escape' : e) ? 'Delete' : e)
            ? 'ArrowLeft'
            : e)
          ? 'ArrowUp'
          : e)
        ? 'ArrowRight'
        : e)
      ? 'ArrowDown'
      : e);
}
const mac$1 =
  'undefined' != typeof navigator &&
  /Mac|iP(hone|[oa]d)/.test(navigator.platform);
function normalizeKeyName(e) {
  let t = e.split(/-(?!$)/),
    n = t[t.length - 1];
  'Space' == n && (n = ' ');
  let r, o, i, a;
  for (let e = 0; e < t.length - 1; e++) {
    var s = t[e];
    if (/^(cmd|meta|m)$/i.test(s)) a = !0;
    else if (/^a(lt)?$/i.test(s)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(s)) o = !0;
    else if (/^s(hift)?$/i.test(s)) i = !0;
    else {
      if (!/^mod$/i.test(s))
        throw new Error('Unrecognized modifier name: ' + s);
      mac$1 ? (a = !0) : (o = !0);
    }
  }
  return (
    r && (n = 'Alt-' + n),
    o && (n = 'Ctrl-' + n),
    a && (n = 'Meta-' + n),
    (n = i ? 'Shift-' + n : n)
  );
}
function normalize$1(e) {
  var t,
    n = Object.create(null);
  for (t in e) n[normalizeKeyName(t)] = e[t];
  return n;
}
function modifiers(e, t, n = !0) {
  return (
    t.altKey && (e = 'Alt-' + e),
    t.ctrlKey && (e = 'Ctrl-' + e),
    t.metaKey && (e = 'Meta-' + e),
    (e = n && t.shiftKey ? 'Shift-' + e : e)
  );
}
function keydownHandler$1(e) {
  let a = normalize$1(e);
  return function (e, t) {
    let n = keyName(t),
      r,
      o = a[modifiers(n, t)];
    if (o && o(e.state, e.dispatch, e)) return !0;
    if (1 == n.length && ' ' != n) {
      if (t.shiftKey) {
        var i = a[modifiers(n, t, !1)];
        if (i && i(e.state, e.dispatch, e)) return !0;
      }
      if (
        (t.shiftKey || t.altKey || t.metaKey || 127 < n.charCodeAt(0)) &&
        (r = base[t.keyCode]) &&
        r != n
      ) {
        i = a[modifiers(r, t)];
        if (i && i(e.state, e.dispatch, e)) return !0;
      }
    }
    return !1;
  };
}
const domIndex = function (e) {
    for (var t = 0; ; t++) if (!(e = e.previousSibling)) return t;
  },
  parentNode = function (e) {
    e = e.assignedSlot || e.parentNode;
    return e && 11 == e.nodeType ? e.host : e;
  };
let reusedRange = null;
const textRange = function (e, t, n) {
    var r = (reusedRange = reusedRange || document.createRange());
    return (
      r.setEnd(e, null == n ? e.nodeValue.length : n), r.setStart(e, t || 0), r
    );
  },
  isEquivalentPosition = function (e, t, n, r) {
    return n && (scanFor(e, t, n, r, -1) || scanFor(e, t, n, r, 1));
  },
  atomElements = /^(img|br|input|textarea|hr)$/i;
function scanFor(e, t, n, r, o) {
  for (;;) {
    if (e == n && t == r) return !0;
    if (t == (o < 0 ? 0 : nodeSize(e))) {
      var i = e.parentNode;
      if (
        !i ||
        1 != i.nodeType ||
        hasBlockDesc(e) ||
        atomElements.test(e.nodeName) ||
        'false' == e.contentEditable
      )
        return !1;
      (t = domIndex(e) + (o < 0 ? 0 : 1)), (e = i);
    } else {
      if (1 != e.nodeType) return !1;
      if ('false' == (e = e.childNodes[t + (o < 0 ? -1 : 0)]).contentEditable)
        return !1;
      t = o < 0 ? nodeSize(e) : 0;
    }
  }
}
function nodeSize(e) {
  return (3 == e.nodeType ? e.nodeValue : e.childNodes).length;
}
function isOnEdge(n, r, o) {
  for (let e = 0 == r, t = r == nodeSize(n); e || t; ) {
    if (n == o) return !0;
    var i = domIndex(n);
    if (!(n = n.parentNode)) return !1;
    (e = e && 0 == i), (t = t && i == nodeSize(n));
  }
}
function hasBlockDesc(t) {
  let n;
  for (let e = t; e && !(n = e.pmViewDesc); e = e.parentNode);
  return n && n.node && n.node.isBlock && (n.dom == t || n.contentDOM == t);
}
const selectionCollapsed = function (e) {
  return (
    e.focusNode &&
    isEquivalentPosition(
      e.focusNode,
      e.focusOffset,
      e.anchorNode,
      e.anchorOffset
    )
  );
};
function keyEvent(e, t) {
  var n = document.createEvent('Event');
  return (
    n.initEvent('keydown', !0, !0), (n.keyCode = e), (n.key = n.code = t), n
  );
}
function deepActiveElement(e) {
  let t = e.activeElement;
  for (; t && t.shadowRoot; ) t = t.shadowRoot.activeElement;
  return t;
}
function caretFromPoint(e, t, n) {
  if (e.caretPositionFromPoint)
    try {
      var r = e.caretPositionFromPoint(t, n);
      if (r) return { node: r.offsetNode, offset: r.offset };
    } catch (e) {}
  if (e.caretRangeFromPoint) {
    r = e.caretRangeFromPoint(t, n);
    if (r) return { node: r.startContainer, offset: r.startOffset };
  }
}
const nav = 'undefined' != typeof navigator ? navigator : null,
  doc = 'undefined' != typeof document ? document : null,
  agent = (nav && nav.userAgent) || '',
  ie_edge = /Edge\/(\d+)/.exec(agent),
  ie_upto10 = /MSIE \d/.exec(agent),
  ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(agent),
  ie = !!(ie_upto10 || ie_11up || ie_edge),
  ie_version = ie_upto10
    ? document.documentMode
    : ie_11up
    ? +ie_11up[1]
    : ie_edge
    ? +ie_edge[1]
    : 0,
  gecko = !ie && /gecko\/(\d+)/i.test(agent),
  _chrome =
    (gecko && (/Firefox\/(\d+)/.exec(agent) || [0, 0])[1],
    !ie && /Chrome\/(\d+)/.exec(agent)),
  chrome = !!_chrome,
  chrome_version = _chrome ? +_chrome[1] : 0,
  safari = !ie && !!nav && /Apple Computer/.test(nav.vendor),
  ios =
    safari && (/Mobile\/\w+/.test(agent) || (!!nav && 2 < nav.maxTouchPoints)),
  mac = ios || (!!nav && /Mac/.test(nav.platform)),
  windows = !!nav && /Win/.test(nav.platform),
  android = /Android \d/.test(agent),
  webkit = !!doc && 'webkitFontSmoothing' in doc.documentElement.style,
  webkit_version = webkit
    ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
    : 0;
function windowRect(e) {
  return {
    left: 0,
    right: e.documentElement.clientWidth,
    top: 0,
    bottom: e.documentElement.clientHeight,
  };
}
function getSide(e, t) {
  return 'number' == typeof e ? e : e[t];
}
function clientRect(e) {
  var t = e.getBoundingClientRect(),
    n = t.width / e.offsetWidth || 1,
    r = t.height / e.offsetHeight || 1;
  return {
    left: t.left,
    right: t.left + e.clientWidth * n,
    top: t.top,
    bottom: t.top + e.clientHeight * r,
  };
}
function scrollRectIntoView(e, r, t) {
  var o = e.someProp('scrollThreshold') || 0,
    i = e.someProp('scrollMargin') || 5,
    a = e.dom.ownerDocument;
  for (let n = t || e.dom; n; n = parentNode(n))
    if (1 == n.nodeType) {
      var s,
        l = n,
        c = l == a.body,
        u = c ? windowRect(a) : clientRect(l);
      let e = 0,
        t = 0;
      if (
        (r.top < u.top + getSide(o, 'top')
          ? (t = -(u.top - r.top + getSide(i, 'top')))
          : r.bottom > u.bottom - getSide(o, 'bottom') &&
            (t =
              r.bottom - r.top > u.bottom - u.top
                ? r.top + getSide(i, 'top') - u.top
                : r.bottom - u.bottom + getSide(i, 'bottom')),
        r.left < u.left + getSide(o, 'left')
          ? (e = -(u.left - r.left + getSide(i, 'left')))
          : r.right > u.right - getSide(o, 'right') &&
            (e = r.right - u.right + getSide(i, 'right')),
        (e || t) &&
          (c
            ? a.defaultView.scrollBy(e, t)
            : ((u = l.scrollLeft),
              (s = l.scrollTop),
              t && (l.scrollTop += t),
              e && (l.scrollLeft += e),
              (u = l.scrollLeft - u),
              (l = l.scrollTop - s),
              (r = {
                left: r.left - u,
                top: r.top - l,
                right: r.right - u,
                bottom: r.bottom - l,
              }))),
        c || /^(fixed|sticky)$/.test(getComputedStyle(n).position))
      )
        break;
    }
}
function storeScrollPos(n) {
  var r = n.dom.getBoundingClientRect(),
    o = Math.max(0, r.top);
  let i, a;
  for (
    let e = (r.left + r.right) / 2, t = o + 1;
    t < Math.min(innerHeight, r.bottom);
    t += 5
  ) {
    var s = n.root.elementFromPoint(e, t);
    if (s && s != n.dom && n.dom.contains(s)) {
      var l = s.getBoundingClientRect();
      if (l.top >= o - 20) {
        (i = s), (a = l.top);
        break;
      }
    }
  }
  return { refDOM: i, refTop: a, stack: scrollStack(n.dom) };
}
function scrollStack(t) {
  var n = [],
    r = t.ownerDocument;
  for (
    let e = t;
    e && (n.push({ dom: e, top: e.scrollTop, left: e.scrollLeft }), t != r);
    e = parentNode(e)
  );
  return n;
}
function resetScrollPos({ refDOM: e, refTop: t, stack: n }) {
  e = e ? e.getBoundingClientRect().top : 0;
  restoreScrollStack(n, 0 == e ? 0 : e - t);
}
function restoreScrollStack(t, n) {
  for (let e = 0; e < t.length; e++) {
    var { dom: r, top: o, left: i } = t[e];
    r.scrollTop != o + n && (r.scrollTop = o + n),
      r.scrollLeft != i && (r.scrollLeft = i);
  }
}
let preventScrollSupported = null;
function focusPreventScroll(e) {
  var t;
  return e.setActive
    ? e.setActive()
    : preventScrollSupported
    ? e.focus(preventScrollSupported)
    : ((t = scrollStack(e)),
      e.focus(
        null == preventScrollSupported
          ? {
              get preventScroll() {
                return (preventScrollSupported = { preventScroll: !0 }), !0;
              },
            }
          : void 0
      ),
      void (
        preventScrollSupported ||
        ((preventScrollSupported = !1), restoreScrollStack(t, 0))
      ));
}
function findOffsetInNode(e, o) {
  let i,
    a = 2e8,
    s,
    l = 0,
    c = o.top,
    u = o.top,
    d,
    p;
  for (let n = e.firstChild, r = 0; n; n = n.nextSibling, r++) {
    let t;
    if (1 == n.nodeType) t = n.getClientRects();
    else {
      if (3 != n.nodeType) continue;
      t = textRange(n).getClientRects();
    }
    for (let e = 0; e < t.length; e++) {
      var f = t[e];
      if (f.top <= c && f.bottom >= u) {
        (c = Math.max(f.bottom, c)), (u = Math.min(f.top, u));
        var h =
          f.left > o.left
            ? f.left - o.left
            : f.right < o.left
            ? o.left - f.right
            : 0;
        if (h < a) {
          (i = n),
            (a = h),
            (s =
              h && 3 == i.nodeType
                ? { left: f.right < o.left ? f.right : f.left, top: o.top }
                : o),
            1 == n.nodeType &&
              h &&
              (l = r + (o.left >= (f.left + f.right) / 2 ? 1 : 0));
          continue;
        }
      } else
        f.top > o.top &&
          !d &&
          f.left <= o.left &&
          f.right >= o.left &&
          ((d = n),
          (p = {
            left: Math.max(f.left, Math.min(f.right, o.left)),
            top: f.top,
          }));
      !i &&
        ((o.left >= f.right && o.top >= f.top) ||
          (o.left >= f.left && o.top >= f.bottom)) &&
        (l = r + 1);
    }
  }
  return (
    !i && d && ((i = d), (s = p), (a = 0)),
    i && 3 == i.nodeType
      ? findOffsetInText(i, s)
      : !i || (a && 1 == i.nodeType)
      ? { node: e, offset: l }
      : findOffsetInNode(i, s)
  );
}
function findOffsetInText(t, n) {
  var r = t.nodeValue.length,
    o = document.createRange();
  for (let e = 0; e < r; e++) {
    o.setEnd(t, e + 1), o.setStart(t, e);
    var i = singleRect(o, 1);
    if (i.top != i.bottom && inRect(n, i))
      return {
        node: t,
        offset: e + (n.left >= (i.left + i.right) / 2 ? 1 : 0),
      };
  }
  return { node: t, offset: 0 };
}
function inRect(e, t) {
  return (
    e.left >= t.left - 1 &&
    e.left <= t.right + 1 &&
    e.top >= t.top - 1 &&
    e.top <= t.bottom + 1
  );
}
function targetKludge(e, t) {
  var n = e.parentNode;
  return n &&
    /^li$/i.test(n.nodeName) &&
    t.left < e.getBoundingClientRect().left
    ? n
    : e;
}
function posFromElement(e, t, n) {
  let { node: r, offset: o } = findOffsetInNode(t, n),
    i = -1;
  return (
    1 != r.nodeType ||
      r.firstChild ||
      ((t = r.getBoundingClientRect()),
      (i = t.left != t.right && n.left > (t.left + t.right) / 2 ? 1 : -1)),
    e.docView.posFromDOM(r, o, i)
  );
}
function posFromCaret(n, r, e, o) {
  let i = -1;
  for (let e = r, t = !1; e != n.dom; ) {
    var a = n.docView.nearestDesc(e, !0);
    if (!a) return null;
    if (
      1 == a.dom.nodeType &&
      ((a.node.isBlock && a.parent && !t) || !a.contentDOM)
    ) {
      var s = a.dom.getBoundingClientRect();
      if (
        (a.node.isBlock &&
          a.parent &&
          !t &&
          ((t = !0),
          s.left > o.left || s.top > o.top
            ? (i = a.posBefore)
            : (s.right < o.left || s.bottom < o.top) && (i = a.posAfter)),
        !a.contentDOM && i < 0 && !a.node.isText)
      )
        return (
          a.node.isBlock
            ? o.top < (s.top + s.bottom) / 2
            : o.left < (s.left + s.right) / 2
        )
          ? a.posBefore
          : a.posAfter;
    }
    e = a.dom.parentNode;
  }
  return -1 < i ? i : n.docView.posFromDOM(r, e, -1);
}
function elementFromPoint(n, r, o) {
  var i = n.childNodes.length;
  if (i && o.top < o.bottom)
    for (
      let e = Math.max(
          0,
          Math.min(
            i - 1,
            Math.floor((i * (r.top - o.top)) / (o.bottom - o.top)) - 2
          )
        ),
        t = e;
      ;

    ) {
      var a = n.childNodes[t];
      if (1 == a.nodeType) {
        var s = a.getClientRects();
        for (let e = 0; e < s.length; e++) {
          var l = s[e];
          if (inRect(r, l)) return elementFromPoint(a, r, l);
        }
      }
      if ((t = (t + 1) % i) == e) break;
    }
  return n;
}
function posAtCoords(e, n) {
  let t = e.dom.ownerDocument,
    r,
    o = 0;
  var i = caretFromPoint(t, n.left, n.top);
  i && ({ node: r, offset: o } = i);
  let a = (e.root.elementFromPoint ? e.root : t).elementFromPoint(
      n.left,
      n.top
    ),
    s;
  if (!a || !e.dom.contains(1 != a.nodeType ? a.parentNode : a)) {
    i = e.dom.getBoundingClientRect();
    if (!inRect(n, i)) return null;
    if (!(a = elementFromPoint(e.dom, n, i))) return null;
  }
  if (safari)
    for (let e = a; r && e; e = parentNode(e)) e.draggable && (r = void 0);
  if (((a = targetKludge(a, n)), r)) {
    if (
      gecko &&
      1 == r.nodeType &&
      (o = Math.min(o, r.childNodes.length)) < r.childNodes.length
    ) {
      let e = r.childNodes[o],
        t;
      'IMG' == e.nodeName &&
        (t = e.getBoundingClientRect()).right <= n.left &&
        t.bottom > n.top &&
        o++;
    }
    r == e.dom &&
    o == r.childNodes.length - 1 &&
    1 == r.lastChild.nodeType &&
    n.top > r.lastChild.getBoundingClientRect().bottom
      ? (s = e.state.doc.content.size)
      : (0 != o && 1 == r.nodeType && 'BR' == r.childNodes[o - 1].nodeName) ||
        (s = posFromCaret(e, r, o, n));
  }
  null == s && (s = posFromElement(e, a, n));
  i = e.docView.nearestDesc(a, !0);
  return { pos: s, inside: i ? i.posAtStart - i.border : -1 };
}
function nonZero(e) {
  return e.top < e.bottom || e.left < e.right;
}
function singleRect(e, t) {
  var n = e.getClientRects();
  if (n.length) {
    t = n[t < 0 ? 0 : n.length - 1];
    if (nonZero(t)) return t;
  }
  return Array.prototype.find.call(n, nonZero) || e.getBoundingClientRect();
}
const BIDI = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
function coordsAtPos(e, t, r) {
  var { node: o, offset: i, atom: n } = e.docView.domFromPos(t, r < 0 ? -1 : 1),
    a = webkit || gecko;
  if (3 == o.nodeType) {
    if (
      !a ||
      (!BIDI.test(o.nodeValue) && (r < 0 ? i : i != o.nodeValue.length))
    ) {
      let e = i,
        t = i,
        n = r < 0 ? 1 : -1;
      return (
        r < 0 && !i
          ? (t++, (n = -1))
          : 0 <= r && i == o.nodeValue.length
          ? (e--, (n = 1))
          : r < 0
          ? e--
          : t++,
        flattenV(singleRect(textRange(o, e, t), n), n < 0)
      );
    }
    var s = singleRect(textRange(o, i, i), r);
    if (gecko && i && /\s/.test(o.nodeValue[i - 1]) && i < o.nodeValue.length) {
      var l = singleRect(textRange(o, i - 1, i - 1), -1);
      if (l.top == s.top) {
        var c = singleRect(textRange(o, i, i + 1), -1);
        if (c.top != s.top) return flattenV(c, c.left < l.left);
      }
    }
    return s;
  }
  if (!e.state.doc.resolve(t - (n || 0)).parent.inlineContent) {
    if (null == n && i && (r < 0 || i == nodeSize(o))) {
      c = o.childNodes[i - 1];
      if (1 == c.nodeType) return flattenH(c.getBoundingClientRect(), !1);
    }
    if (null == n && i < nodeSize(o)) {
      l = o.childNodes[i];
      if (1 == l.nodeType) return flattenH(l.getBoundingClientRect(), !0);
    }
    return flattenH(o.getBoundingClientRect(), 0 <= r);
  }
  if (null == n && i && (r < 0 || i == nodeSize(o))) {
    (s = o.childNodes[i - 1]),
      (e =
        3 == s.nodeType
          ? textRange(s, nodeSize(s) - (a ? 0 : 1))
          : 1 != s.nodeType || ('BR' == s.nodeName && s.nextSibling)
          ? null
          : s);
    if (e) return flattenV(singleRect(e, 1), !1);
  }
  if (null == n && i < nodeSize(o)) {
    let e = o.childNodes[i];
    for (; e.pmViewDesc && e.pmViewDesc.ignoreForCoords; ) e = e.nextSibling;
    t = e
      ? 3 == e.nodeType
        ? textRange(e, 0, a ? 0 : 1)
        : 1 == e.nodeType
        ? e
        : null
      : null;
    if (t) return flattenV(singleRect(t, -1), !0);
  }
  return flattenV(singleRect(3 == o.nodeType ? textRange(o) : o, -r), 0 <= r);
}
function flattenV(e, t) {
  return 0 == e.width
    ? e
    : ((t = t ? e.left : e.right),
      { top: e.top, bottom: e.bottom, left: t, right: t });
}
function flattenH(e, t) {
  return 0 == e.height
    ? e
    : {
        top: (t = t ? e.top : e.bottom),
        bottom: t,
        left: e.left,
        right: e.right,
      };
}
function withFlushedState(e, t, n) {
  var r = e.state,
    o = e.root.activeElement;
  r != t && e.updateState(t), o != e.dom && e.focus();
  try {
    return n();
  } finally {
    r != t && e.updateState(r), o != e.dom && o && o.focus();
  }
}
function endOfTextblockVertical(o, e, i) {
  var t = e.selection;
  let a = 'up' == i ? t.$from : t.$to;
  return withFlushedState(o, e, () => {
    let t = o.docView.domFromPos(a.pos, 'up' == i ? -1 : 1)['node'];
    for (;;) {
      var e = o.docView.nearestDesc(t, !0);
      if (!e) break;
      if (e.node.isBlock) {
        t = e.contentDOM || e.dom;
        break;
      }
      t = e.dom.parentNode;
    }
    var n = coordsAtPos(o, a.pos, 1);
    for (let e = t.firstChild; e; e = e.nextSibling) {
      let t;
      if (1 == e.nodeType) t = e.getClientRects();
      else {
        if (3 != e.nodeType) continue;
        t = textRange(e, 0, e.nodeValue.length).getClientRects();
      }
      for (let e = 0; e < t.length; e++) {
        var r = t[e];
        if (
          r.bottom > r.top + 1 &&
          ('up' == i
            ? n.top - r.top > 2 * (r.bottom - n.top)
            : r.bottom - n.bottom > 2 * (n.bottom - r.top))
        )
          return !1;
      }
    }
    return !0;
  });
}
const maybeRTL = /[\u0590-\u08ac]/;
function endOfTextblockHorizontal(l, e, c) {
  let u = e.selection['$head'];
  if (!u.parent.isTextblock) return !1;
  var t = u.parentOffset,
    n = !t,
    t = t == u.parent.content.size;
  let d = l.domSelection();
  return maybeRTL.test(u.parent.textContent) && d.modify
    ? withFlushedState(l, e, () => {
        var {
            focusNode: e,
            focusOffset: t,
            anchorNode: n,
            anchorOffset: r,
          } = l.domSelectionRange(),
          o = d.caretBidiLevel,
          i =
            (d.modify('move', c, 'character'),
            u.depth ? l.docView.domAfterPos(u.before()) : l.dom),
          { focusNode: a, focusOffset: s } = l.domSelectionRange(),
          i =
            (a && !i.contains(1 == a.nodeType ? a : a.parentNode)) ||
            (e == a && t == s);
        try {
          d.collapse(n, r),
            e && (e != n || t != r) && d.extend && d.extend(e, t);
        } catch (e) {}
        return null != o && (d.caretBidiLevel = o), i;
      })
    : 'left' == c || 'backward' == c
    ? n
    : t;
}
let cachedState = null,
  cachedDir = null,
  cachedResult = !1;
function endOfTextblock(e, t, n) {
  return cachedState == t && cachedDir == n
    ? cachedResult
    : ((cachedState = t),
      (cachedDir = n),
      (cachedResult = (
        'up' == n || 'down' == n
          ? endOfTextblockVertical
          : endOfTextblockHorizontal
      )(e, t, n)));
}
const NOT_DIRTY = 0,
  CHILD_DIRTY = 1,
  CONTENT_DIRTY = 2,
  NODE_DIRTY = 3;
class ViewDesc {
  constructor(e, t, n, r) {
    (this.parent = e),
      (this.children = t),
      (this.dom = n),
      (this.contentDOM = r),
      (this.dirty = NOT_DIRTY),
      (n.pmViewDesc = this);
  }
  matchesWidget(e) {
    return !1;
  }
  matchesMark(e) {
    return !1;
  }
  matchesNode(e, t, n) {
    return !1;
  }
  matchesHack(e) {
    return !1;
  }
  parseRule() {
    return null;
  }
  stopEvent(e) {
    return !1;
  }
  get size() {
    let t = 0;
    for (let e = 0; e < this.children.length; e++) t += this.children[e].size;
    return t;
  }
  get border() {
    return 0;
  }
  destroy() {
    (this.parent = void 0),
      this.dom.pmViewDesc == this && (this.dom.pmViewDesc = void 0);
    for (let e = 0; e < this.children.length; e++) this.children[e].destroy();
  }
  posBeforeChild(n) {
    for (let e = 0, t = this.posAtStart; ; e++) {
      var r = this.children[e];
      if (r == n) return t;
      t += r.size;
    }
  }
  get posBefore() {
    return this.parent.posBeforeChild(this);
  }
  get posAtStart() {
    return this.parent ? this.parent.posBeforeChild(this) + this.border : 0;
  }
  get posAfter() {
    return this.posBefore + this.size;
  }
  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }
  localPosFromDOM(n, r, e) {
    if (
      this.contentDOM &&
      this.contentDOM.contains(1 == n.nodeType ? n : n.parentNode)
    ) {
      if (e < 0) {
        let e, t;
        if (n == this.contentDOM) e = n.childNodes[r - 1];
        else {
          for (; n.parentNode != this.contentDOM; ) n = n.parentNode;
          e = n.previousSibling;
        }
        for (; e && (!(t = e.pmViewDesc) || t.parent != this); )
          e = e.previousSibling;
        return e ? this.posBeforeChild(t) + t.size : this.posAtStart;
      }
      {
        let e, t;
        if (n == this.contentDOM) e = n.childNodes[r];
        else {
          for (; n.parentNode != this.contentDOM; ) n = n.parentNode;
          e = n.nextSibling;
        }
        for (; e && (!(t = e.pmViewDesc) || t.parent != this); )
          e = e.nextSibling;
        return e ? this.posBeforeChild(t) : this.posAtEnd;
      }
    }
    let t;
    if (n == this.dom && this.contentDOM) t = r > domIndex(this.contentDOM);
    else if (
      this.contentDOM &&
      this.contentDOM != this.dom &&
      this.dom.contains(this.contentDOM)
    )
      t = 2 & n.compareDocumentPosition(this.contentDOM);
    else if (this.dom.firstChild) {
      if (0 == r)
        for (let e = n; ; e = e.parentNode) {
          if (e == this.dom) {
            t = !1;
            break;
          }
          if (e.previousSibling) break;
        }
      if (null == t && r == n.childNodes.length)
        for (let e = n; ; e = e.parentNode) {
          if (e == this.dom) {
            t = !0;
            break;
          }
          if (e.nextSibling) break;
        }
    }
    return (null == t ? 0 < e : t) ? this.posAtEnd : this.posAtStart;
  }
  nearestDesc(o, i = !1) {
    for (let n = !0, r = o; r; r = r.parentNode) {
      let e = this.getDesc(r),
        t;
      if (e && (!i || e.node)) {
        if (
          !n ||
          !(t = e.nodeDOM) ||
          (1 == t.nodeType
            ? t.contains(1 == o.nodeType ? o : o.parentNode)
            : t == o)
        )
          return e;
        n = !1;
      }
    }
  }
  getDesc(e) {
    var t = e.pmViewDesc;
    for (let e = t; e; e = e.parent) if (e == this) return t;
  }
  posFromDOM(t, n, r) {
    for (let e = t; e; e = e.parentNode) {
      var o = this.getDesc(e);
      if (o) return o.localPosFromDOM(t, n, r);
    }
    return -1;
  }
  descAt(o) {
    for (let n = 0, r = 0; n < this.children.length; n++) {
      let e = this.children[n],
        t = r + e.size;
      if (r == o && t != r) {
        for (; !e.border && e.children.length; ) e = e.children[0];
        return e;
      }
      if (o < t) return e.descAt(o - r - e.border);
      r = t;
    }
  }
  domFromPos(t, n) {
    if (!this.contentDOM) return { node: this.dom, offset: 0, atom: t + 1 };
    let r = 0,
      o = 0;
    for (let e = 0; r < this.children.length; r++) {
      var i = this.children[r],
        a = e + i.size;
      if (t < a || i instanceof TrailingHackViewDesc) {
        o = t - e;
        break;
      }
      e = a;
    }
    if (o) return this.children[r].domFromPos(o - this.children[r].border, n);
    for (
      let e;
      r &&
      !(e = this.children[r - 1]).size &&
      e instanceof WidgetViewDesc &&
      0 <= e.side;
      r--
    );
    if (n <= 0) {
      let e,
        t = !0;
      for (
        ;
        (e = r ? this.children[r - 1] : null) &&
        e.dom.parentNode != this.contentDOM;
        r--, t = !1
      );
      return e && n && t && !e.border && !e.domAtom
        ? e.domFromPos(e.size, n)
        : { node: this.contentDOM, offset: e ? domIndex(e.dom) + 1 : 0 };
    }
    {
      let e,
        t = !0;
      for (
        ;
        (e = r < this.children.length ? this.children[r] : null) &&
        e.dom.parentNode != this.contentDOM;
        r++, t = !1
      );
      return e && t && !e.border && !e.domAtom
        ? e.domFromPos(0, n)
        : {
            node: this.contentDOM,
            offset: e ? domIndex(e.dom) : this.contentDOM.childNodes.length,
          };
    }
  }
  parseRange(n, r, o = 0) {
    if (0 == this.children.length)
      return {
        node: this.contentDOM,
        from: n,
        to: r,
        fromOffset: 0,
        toOffset: this.contentDOM.childNodes.length,
      };
    let i = -1,
      a = -1;
    for (let e = o, t = 0; ; t++) {
      var s = this.children[t],
        l = e + s.size;
      if (-1 == i && n <= l) {
        var c = e + s.border;
        if (
          c <= n &&
          r <= l - s.border &&
          s.node &&
          s.contentDOM &&
          this.contentDOM.contains(s.contentDOM)
        )
          return s.parseRange(n, r, c);
        n = e;
        for (let e = t; 0 < e; e--) {
          var u = this.children[e - 1];
          if (
            u.size &&
            u.dom.parentNode == this.contentDOM &&
            !u.emptyChildAt(1)
          ) {
            i = domIndex(u.dom) + 1;
            break;
          }
          n -= u.size;
        }
        -1 == i && (i = 0);
      }
      if (-1 < i && (r < l || t == this.children.length - 1)) {
        r = l;
        for (let e = t + 1; e < this.children.length; e++) {
          var d = this.children[e];
          if (
            d.size &&
            d.dom.parentNode == this.contentDOM &&
            !d.emptyChildAt(-1)
          ) {
            a = domIndex(d.dom);
            break;
          }
          r += d.size;
        }
        -1 == a && (a = this.contentDOM.childNodes.length);
        break;
      }
      e = l;
    }
    return {
      node: this.contentDOM,
      from: n,
      to: r,
      fromOffset: i,
      toOffset: a,
    };
  }
  emptyChildAt(e) {
    var t;
    return (
      !(this.border || !this.contentDOM || !this.children.length) &&
      (0 == (t = this.children[e < 0 ? 0 : this.children.length - 1]).size ||
        t.emptyChildAt(e))
    );
  }
  domAfterPos(e) {
    var { node: t, offset: n } = this.domFromPos(e, 0);
    if (1 != t.nodeType || n == t.childNodes.length)
      throw new RangeError('No node after pos ' + e);
    return t.childNodes[n];
  }
  setSelection(n, r, o, i = !1) {
    var a = Math.min(n, r),
      s = Math.max(n, r);
    for (let e = 0, t = 0; e < this.children.length; e++) {
      var l = this.children[e],
        c = t + l.size;
      if (a > t && s < c)
        return l.setSelection(n - t - l.border, r - t - l.border, o, i);
      t = c;
    }
    let u = this.domFromPos(n, n ? -1 : 1),
      d = r == n ? u : this.domFromPos(r, r ? -1 : 1);
    var t = o.getSelection();
    let p = !1;
    if ((gecko || safari) && n == r) {
      var { node: f, offset: h } = u;
      if (3 == f.nodeType) {
        if (
          (p = !(!h || '\n' != f.nodeValue[h - 1])) &&
          h == f.nodeValue.length
        )
          for (let e = f, t; e; e = e.parentNode) {
            if ((t = e.nextSibling)) {
              'BR' == t.nodeName &&
                (u = d = { node: t.parentNode, offset: domIndex(t) + 1 });
              break;
            }
            var m = e.pmViewDesc;
            if (m && m.node && m.node.isBlock) break;
          }
      } else {
        var f = f.childNodes[h - 1];
        p = f && ('BR' == f.nodeName || 'false' == f.contentEditable);
      }
    }
    if (
      (i =
        gecko &&
        t.focusNode &&
        t.focusNode != d.node &&
        1 == t.focusNode.nodeType &&
        (h = t.focusNode.childNodes[t.focusOffset]) &&
        'false' == h.contentEditable
          ? !0
          : i) ||
      (p && safari) ||
      !isEquivalentPosition(u.node, u.offset, t.anchorNode, t.anchorOffset) ||
      !isEquivalentPosition(d.node, d.offset, t.focusNode, t.focusOffset)
    ) {
      let e = !1;
      if ((t.extend || n == r) && !p) {
        t.collapse(u.node, u.offset);
        try {
          n != r && t.extend(d.node, d.offset), (e = !0);
        } catch (e) {}
      }
      e ||
        (r < n && ((f = u), (u = d), (d = f)),
        (h = document.createRange()).setEnd(d.node, d.offset),
        h.setStart(u.node, u.offset),
        t.removeAllRanges(),
        t.addRange(h));
    }
  }
  ignoreMutation(e) {
    return !this.contentDOM && 'selection' != e.type;
  }
  get contentLost() {
    return (
      this.contentDOM &&
      this.contentDOM != this.dom &&
      !this.dom.contains(this.contentDOM)
    );
  }
  markDirty(n, r) {
    for (let e = 0, t = 0; t < this.children.length; t++) {
      var o = this.children[t],
        i = e + o.size;
      if (e == i ? n <= i && r >= e : n < i && r > e) {
        var a = e + o.border,
          s = i - o.border;
        if (a <= n && r <= s)
          return (
            (this.dirty = n == e || r == i ? CONTENT_DIRTY : CHILD_DIRTY),
            void (n != a ||
            r != s ||
            (!o.contentLost && o.dom.parentNode == this.contentDOM)
              ? o.markDirty(n - a, r - a)
              : (o.dirty = NODE_DIRTY))
          );
        o.dirty =
          o.dom != o.contentDOM ||
          o.dom.parentNode != this.contentDOM ||
          o.children.length
            ? NODE_DIRTY
            : CONTENT_DIRTY;
      }
      e = i;
    }
    this.dirty = CONTENT_DIRTY;
  }
  markParentsDirty() {
    let t = 1;
    for (let e = this.parent; e; e = e.parent, t++) {
      var n = 1 == t ? CONTENT_DIRTY : CHILD_DIRTY;
      e.dirty < n && (e.dirty = n);
    }
  }
  get domAtom() {
    return !1;
  }
  get ignoreForCoords() {
    return !1;
  }
}
class WidgetViewDesc extends ViewDesc {
  constructor(e, t, n, r) {
    let o,
      i = t.type.toDOM;
    'function' == typeof i &&
      (i = i(n, () =>
        o ? (o.parent ? o.parent.posBeforeChild(o) : void 0) : r
      )),
      t.type.spec.raw ||
        (1 != i.nodeType &&
          ((n = document.createElement('span')).appendChild(i), (i = n)),
        (i.contentEditable = 'false'),
        i.classList.add('ProseMirror-widget')),
      super(e, [], i, null),
      (this.widget = t),
      (this.widget = t),
      (o = this);
  }
  matchesWidget(e) {
    return this.dirty == NOT_DIRTY && e.type.eq(this.widget.type);
  }
  parseRule() {
    return { ignore: !0 };
  }
  stopEvent(e) {
    var t = this.widget.spec.stopEvent;
    return !!t && t(e);
  }
  ignoreMutation(e) {
    return 'selection' != e.type || this.widget.spec.ignoreSelection;
  }
  destroy() {
    this.widget.type.destroy(this.dom), super.destroy();
  }
  get domAtom() {
    return !0;
  }
  get side() {
    return this.widget.type.side;
  }
}
class CompositionViewDesc extends ViewDesc {
  constructor(e, t, n, r) {
    super(e, [], t, null), (this.textDOM = n), (this.text = r);
  }
  get size() {
    return this.text.length;
  }
  localPosFromDOM(e, t) {
    return e != this.textDOM
      ? this.posAtStart + (t ? this.size : 0)
      : this.posAtStart + t;
  }
  domFromPos(e) {
    return { node: this.textDOM, offset: e };
  }
  ignoreMutation(e) {
    return 'characterData' === e.type && e.target.nodeValue == e.oldValue;
  }
}
class MarkViewDesc extends ViewDesc {
  constructor(e, t, n, r) {
    super(e, [], n, r), (this.mark = t);
  }
  static create(e, t, n, r) {
    var o = r.nodeViews[t.type.name];
    let i = o && o(t, r, n);
    return (
      (i && i.dom) ||
        (i = DOMSerializer.renderSpec(document, t.type.spec.toDOM(t, n))),
      new MarkViewDesc(e, t, i.dom, i.contentDOM || i.dom)
    );
  }
  parseRule() {
    return this.dirty & NODE_DIRTY || this.mark.type.spec.reparseInView
      ? null
      : {
          mark: this.mark.type.name,
          attrs: this.mark.attrs,
          contentElement: this.contentDOM,
        };
  }
  matchesMark(e) {
    return this.dirty != NODE_DIRTY && this.mark.eq(e);
  }
  markDirty(e, t) {
    if ((super.markDirty(e, t), this.dirty != NOT_DIRTY)) {
      let e = this.parent;
      for (; !e.node; ) e = e.parent;
      e.dirty < this.dirty && (e.dirty = this.dirty), (this.dirty = NOT_DIRTY);
    }
  }
  slice(e, t, n) {
    var r = MarkViewDesc.create(this.parent, this.mark, !0, n);
    let o = this.children,
      i = this.size;
    t < i && (o = replaceNodes(o, t, i, n)),
      0 < e && (o = replaceNodes(o, 0, e, n));
    for (let e = 0; e < o.length; e++) o[e].parent = r;
    return (r.children = o), r;
  }
}
class NodeViewDesc extends ViewDesc {
  constructor(e, t, n, r, o, i, a, s, l) {
    super(e, [], o, i),
      (this.node = t),
      (this.outerDeco = n),
      (this.innerDeco = r),
      (this.nodeDOM = a);
  }
  static create(e, t, n, r, o, i) {
    let a = o.nodeViews[t.type.name],
      s;
    var l =
      a &&
      a(
        t,
        o,
        () => (s ? (s.parent ? s.parent.posBeforeChild(s) : void 0) : i),
        n,
        r
      );
    let c = l && l.dom,
      u = l && l.contentDOM;
    if (t.isText)
      if (c) {
        if (3 != c.nodeType)
          throw new RangeError('Text must be rendered as a DOM text node');
      } else c = document.createTextNode(t.text);
    else
      c ||
        ({ dom: c, contentDOM: u } = DOMSerializer.renderSpec(
          document,
          t.type.spec.toDOM(t)
        ));
    u ||
      t.isText ||
      'BR' == c.nodeName ||
      (c.hasAttribute('contenteditable') || (c.contentEditable = 'false'),
      t.type.spec.draggable && (c.draggable = !0));
    var d = c;
    return (
      (c = applyOuterDeco(c, n, t)),
      l
        ? (s = new CustomNodeViewDesc(e, t, n, r, c, u || null, d, l, o, i + 1))
        : t.isText
        ? new TextViewDesc(e, t, n, r, c, d, o)
        : new NodeViewDesc(e, t, n, r, c, u || null, d, o, i + 1)
    );
  }
  parseRule() {
    if (this.node.type.spec.reparseInView) return null;
    var t = { node: this.node.type.name, attrs: this.node.attrs };
    if (
      ('pre' == this.node.type.whitespace && (t.preserveWhitespace = 'full'),
      this.contentDOM)
    )
      if (this.contentLost) {
        for (let e = this.children.length - 1; 0 <= e; e--) {
          var n = this.children[e];
          if (this.dom.contains(n.dom.parentNode)) {
            t.contentElement = n.dom.parentNode;
            break;
          }
        }
        t.contentElement || (t.getContent = () => Fragment.empty);
      } else t.contentElement = this.contentDOM;
    else t.getContent = () => this.node.content;
    return t;
  }
  matchesNode(e, t, n) {
    return (
      this.dirty == NOT_DIRTY &&
      e.eq(this.node) &&
      sameOuterDeco(t, this.outerDeco) &&
      n.eq(this.innerDeco)
    );
  }
  get size() {
    return this.node.nodeSize;
  }
  get border() {
    return this.node.isLeaf ? 0 : 1;
  }
  updateChildren(i, e) {
    let a = this.node.inlineContent,
      s = e,
      l = i.composing ? this.localCompositionInfo(i, e) : null;
    e = l && -1 < l.pos ? l : null;
    let c = l && l.pos < 0,
      u = new ViewTreeUpdater(this, e && e.node, i);
    iterDeco(
      this.node,
      this.innerDeco,
      (e, t, n) => {
        e.spec.marks
          ? u.syncToMarks(e.spec.marks, a, i)
          : 0 <= e.type.side &&
            !n &&
            u.syncToMarks(
              t == this.node.childCount ? Mark.none : this.node.child(t).marks,
              a,
              i
            ),
          u.placeWidget(e, i, s);
      },
      (e, t, n, r) => {
        u.syncToMarks(e.marks, a, i);
        let o;
        u.findNodeMatch(e, t, n, r) ||
          (c &&
            i.state.selection.from > s &&
            i.state.selection.to < s + e.nodeSize &&
            -1 < (o = u.findIndexWithChild(l.node)) &&
            u.updateNodeAt(e, t, n, o, i)) ||
          u.updateNextNode(e, t, n, i, r, s) ||
          u.addNode(e, t, n, i, s),
          (s += e.nodeSize);
      }
    ),
      u.syncToMarks([], a, i),
      this.node.isTextblock && u.addTextblockHacks(),
      u.destroyRest(),
      (u.changed || this.dirty == CONTENT_DIRTY) &&
        (e && this.protectLocalComposition(i, e),
        renderDescs(this.contentDOM, this.children, i),
        ios) &&
        iosHacks(this.dom);
  }
  localCompositionInfo(e, t) {
    var n,
      { from: r, to: o } = e.state.selection;
    return !(
      !(e.state.selection instanceof TextSelection) ||
      r < t ||
      o > t + this.node.content.size
    ) &&
      (e = nearbyTextNode(
        (e = e.domSelectionRange()).focusNode,
        e.focusOffset
      )) &&
      this.dom.contains(e.parentNode)
      ? this.node.inlineContent
        ? ((n = e.nodeValue),
          (r = findTextInFragment(this.node.content, n, r - t, o - t)) < 0
            ? null
            : { node: e, pos: r, text: n })
        : { node: e, pos: -1, text: '' }
      : null;
  }
  protectLocalComposition(t, { node: n, pos: r, text: o }) {
    if (!this.getDesc(n)) {
      let e = n;
      for (; e.parentNode != this.contentDOM; e = e.parentNode) {
        for (; e.previousSibling; ) e.parentNode.removeChild(e.previousSibling);
        for (; e.nextSibling; ) e.parentNode.removeChild(e.nextSibling);
        e.pmViewDesc && (e.pmViewDesc = void 0);
      }
      n = new CompositionViewDesc(this, e, n, o);
      t.input.compositionNodes.push(n),
        (this.children = replaceNodes(this.children, r, r + o.length, t, n));
    }
  }
  update(e, t, n, r) {
    return !(
      this.dirty == NODE_DIRTY ||
      !e.sameMarkup(this.node) ||
      (this.updateInner(e, t, n, r), 0)
    );
  }
  updateInner(e, t, n, r) {
    this.updateOuterDeco(t),
      (this.node = e),
      (this.innerDeco = n),
      this.contentDOM && this.updateChildren(r, this.posAtStart),
      (this.dirty = NOT_DIRTY);
  }
  updateOuterDeco(e) {
    var t, n;
    sameOuterDeco(e, this.outerDeco) ||
      ((t = 1 != this.nodeDOM.nodeType),
      (n = this.dom),
      (this.dom = patchOuterDeco(
        this.dom,
        this.nodeDOM,
        computeOuterDeco(this.outerDeco, this.node, t),
        computeOuterDeco(e, this.node, t)
      )),
      this.dom != n && ((n.pmViewDesc = void 0), (this.dom.pmViewDesc = this)),
      (this.outerDeco = e));
  }
  selectNode() {
    1 == this.nodeDOM.nodeType &&
      this.nodeDOM.classList.add('ProseMirror-selectednode'),
      (!this.contentDOM && this.node.type.spec.draggable) ||
        (this.dom.draggable = !0);
  }
  deselectNode() {
    1 == this.nodeDOM.nodeType &&
      this.nodeDOM.classList.remove('ProseMirror-selectednode'),
      (!this.contentDOM && this.node.type.spec.draggable) ||
        this.dom.removeAttribute('draggable');
  }
  get domAtom() {
    return this.node.isAtom;
  }
}
function docViewDesc(e, t, n, r, o) {
  applyOuterDeco(r, t, e);
  e = new NodeViewDesc(void 0, e, t, n, r, r, r, o, 0);
  return e.contentDOM && e.updateChildren(o, 0), e;
}
class TextViewDesc extends NodeViewDesc {
  constructor(e, t, n, r, o, i, a) {
    super(e, t, n, r, o, null, i, a, 0);
  }
  parseRule() {
    let e = this.nodeDOM.parentNode;
    for (; e && e != this.dom && !e.pmIsDeco; ) e = e.parentNode;
    return { skip: e || !0 };
  }
  update(e, t, n, r) {
    return !(
      this.dirty == NODE_DIRTY ||
      (this.dirty != NOT_DIRTY && !this.inParent()) ||
      !e.sameMarkup(this.node) ||
      (this.updateOuterDeco(t),
      (this.dirty == NOT_DIRTY && e.text == this.node.text) ||
        e.text == this.nodeDOM.nodeValue ||
        ((this.nodeDOM.nodeValue = e.text),
        r.trackWrites == this.nodeDOM && (r.trackWrites = null)),
      (this.node = e),
      (this.dirty = NOT_DIRTY),
      0)
    );
  }
  inParent() {
    var t = this.parent.contentDOM;
    for (let e = this.nodeDOM; e; e = e.parentNode) if (e == t) return !0;
    return !1;
  }
  domFromPos(e) {
    return { node: this.nodeDOM, offset: e };
  }
  localPosFromDOM(e, t, n) {
    return e == this.nodeDOM
      ? this.posAtStart + Math.min(t, this.node.text.length)
      : super.localPosFromDOM(e, t, n);
  }
  ignoreMutation(e) {
    return 'characterData' != e.type && 'selection' != e.type;
  }
  slice(e, t, n) {
    (e = this.node.cut(e, t)), (t = document.createTextNode(e.text));
    return new TextViewDesc(
      this.parent,
      e,
      this.outerDeco,
      this.innerDeco,
      t,
      t,
      n
    );
  }
  markDirty(e, t) {
    super.markDirty(e, t),
      this.dom == this.nodeDOM ||
        (0 != e && t != this.nodeDOM.nodeValue.length) ||
        (this.dirty = NODE_DIRTY);
  }
  get domAtom() {
    return !1;
  }
}
class TrailingHackViewDesc extends ViewDesc {
  parseRule() {
    return { ignore: !0 };
  }
  matchesHack(e) {
    return this.dirty == NOT_DIRTY && this.dom.nodeName == e;
  }
  get domAtom() {
    return !0;
  }
  get ignoreForCoords() {
    return 'IMG' == this.dom.nodeName;
  }
}
class CustomNodeViewDesc extends NodeViewDesc {
  constructor(e, t, n, r, o, i, a, s, l, c) {
    super(e, t, n, r, o, i, a, l, c), (this.spec = s);
  }
  update(e, t, n, r) {
    var o;
    return (
      this.dirty != NODE_DIRTY &&
      (this.spec.update
        ? ((o = this.spec.update(e, t, n)) && this.updateInner(e, t, n, r), o)
        : !(!this.contentDOM && !e.isLeaf) && super.update(e, t, n, r))
    );
  }
  selectNode() {
    this.spec.selectNode ? this.spec.selectNode() : super.selectNode();
  }
  deselectNode() {
    this.spec.deselectNode ? this.spec.deselectNode() : super.deselectNode();
  }
  setSelection(e, t, n, r) {
    this.spec.setSelection
      ? this.spec.setSelection(e, t, n)
      : super.setSelection(e, t, n, r);
  }
  destroy() {
    this.spec.destroy && this.spec.destroy(), super.destroy();
  }
  stopEvent(e) {
    return !!this.spec.stopEvent && this.spec.stopEvent(e);
  }
  ignoreMutation(e) {
    return this.spec.ignoreMutation
      ? this.spec.ignoreMutation(e)
      : super.ignoreMutation(e);
  }
}
function renderDescs(t, n, r) {
  let o = t.firstChild,
    i = !1;
  for (let e = 0; e < n.length; e++) {
    var a,
      s = n[e],
      l = s.dom;
    if (l.parentNode == t) {
      for (; l != o; ) (o = rm(o)), (i = !0);
      o = o.nextSibling;
    } else (i = !0), t.insertBefore(l, o);
    s instanceof MarkViewDesc &&
      ((a = o ? o.previousSibling : t.lastChild),
      renderDescs(s.contentDOM, s.children, r),
      (o = a ? a.nextSibling : t.firstChild));
  }
  for (; o; ) (o = rm(o)), (i = !0);
  i && r.trackWrites == t && (r.trackWrites = null);
}
const OuterDecoLevel = function (e) {
    e && (this.nodeName = e);
  },
  noDeco =
    ((OuterDecoLevel.prototype = Object.create(null)), [new OuterDecoLevel()]);
function computeOuterDeco(t, n, r) {
  if (0 == t.length) return noDeco;
  let o = r ? noDeco[0] : new OuterDecoLevel(),
    i = [o];
  for (let e = 0; e < t.length; e++) {
    var a = t[e].type.attrs;
    if (a)
      for (var s in (a.nodeName && i.push((o = new OuterDecoLevel(a.nodeName))),
      a)) {
        var l = a[s];
        null != l &&
          (r &&
            1 == i.length &&
            i.push((o = new OuterDecoLevel(n.isInline ? 'span' : 'div'))),
          'class' == s
            ? (o.class = (o.class ? o.class + ' ' : '') + l)
            : 'style' == s
            ? (o.style = (o.style ? o.style + ';' : '') + l)
            : 'nodeName' != s && (o[s] = l));
      }
  }
  return i;
}
function patchOuterDeco(r, e, o, i) {
  if (o == noDeco && i == noDeco) return e;
  let a = e;
  for (let e = 0; e < i.length; e++) {
    let t = i[e],
      n = o[e];
    if (e) {
      let e;
      a =
        ((n &&
          n.nodeName == t.nodeName &&
          a != r &&
          (e = a.parentNode) &&
          e.nodeName.toLowerCase() == t.nodeName) ||
          (((e = document.createElement(t.nodeName)).pmIsDeco = !0),
          e.appendChild(a),
          (n = noDeco[0])),
        e);
    }
    patchAttributes(a, n || noDeco[0], t);
  }
  return a;
}
function patchAttributes(t, e, n) {
  for (var r in e)
    'class' == r ||
      'style' == r ||
      'nodeName' == r ||
      r in n ||
      t.removeAttribute(r);
  for (var o in n)
    'class' != o &&
      'style' != o &&
      'nodeName' != o &&
      n[o] != e[o] &&
      t.setAttribute(o, n[o]);
  if (e.class != n.class) {
    var i = e.class ? e.class.split(' ').filter(Boolean) : [],
      a = n.class ? n.class.split(' ').filter(Boolean) : [];
    for (let e = 0; e < i.length; e++)
      -1 == a.indexOf(i[e]) && t.classList.remove(i[e]);
    for (let e = 0; e < a.length; e++)
      -1 == i.indexOf(a[e]) && t.classList.add(a[e]);
    0 == t.classList.length && t.removeAttribute('class');
  }
  if (e.style != n.style) {
    if (e.style)
      for (
        var s,
          l =
            /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g;
        (s = l.exec(e.style));

      )
        t.style.removeProperty(s[1]);
    n.style && (t.style.cssText += n.style);
  }
}
function applyOuterDeco(e, t, n) {
  return patchOuterDeco(e, e, noDeco, computeOuterDeco(t, n, 1 != e.nodeType));
}
function sameOuterDeco(t, n) {
  if (t.length != n.length) return !1;
  for (let e = 0; e < t.length; e++) if (!t[e].type.eq(n[e].type)) return !1;
  return !0;
}
function rm(e) {
  var t = e.nextSibling;
  return e.parentNode.removeChild(e), t;
}
class ViewTreeUpdater {
  constructor(e, t, n) {
    (this.lock = t),
      (this.view = n),
      (this.index = 0),
      (this.stack = []),
      (this.changed = !1),
      (this.top = e),
      (this.preMatch = preMatch(e.node.content, e));
  }
  destroyBetween(t, n) {
    if (t != n) {
      for (let e = t; e < n; e++) this.top.children[e].destroy();
      this.top.children.splice(t, n - t), (this.changed = !0);
    }
  }
  destroyRest() {
    this.destroyBetween(this.index, this.top.children.length);
  }
  syncToMarks(n, e, r) {
    let t = 0,
      o = this.stack.length >> 1;
    for (
      var i, a = Math.min(o, n.length);
      t < a &&
      (t == o - 1 ? this.top : this.stack[(t + 1) << 1]).matchesMark(n[t]) &&
      !1 !== n[t].type.spec.spanning;

    )
      t++;
    for (; t < o; )
      this.destroyRest(),
        (this.top.dirty = NOT_DIRTY),
        (this.index = this.stack.pop()),
        (this.top = this.stack.pop()),
        o--;
    for (; o < n.length; ) {
      this.stack.push(this.top, this.index + 1);
      let t = -1;
      for (
        let e = this.index;
        e < Math.min(this.index + 3, this.top.children.length);
        e++
      ) {
        var s = this.top.children[e];
        if (s.matchesMark(n[o]) && !this.isLocked(s.dom)) {
          t = e;
          break;
        }
      }
      -1 < t
        ? (t > this.index &&
            ((this.changed = !0), this.destroyBetween(this.index, t)),
          (this.top = this.top.children[this.index]))
        : ((i = MarkViewDesc.create(this.top, n[o], e, r)),
          this.top.children.splice(this.index, 0, i),
          (this.top = i),
          (this.changed = !0)),
        (this.index = 0),
        o++;
    }
  }
  findNodeMatch(n, r, o, e) {
    let i = -1,
      t;
    if (
      e >= this.preMatch.index &&
      (t = this.preMatch.matches[e - this.preMatch.index]).parent == this.top &&
      t.matchesNode(n, r, o)
    )
      i = this.top.children.indexOf(t, this.index);
    else
      for (
        let e = this.index, t = Math.min(this.top.children.length, e + 5);
        e < t;
        e++
      ) {
        var a = this.top.children[e];
        if (a.matchesNode(n, r, o) && !this.preMatch.matched.has(a)) {
          i = e;
          break;
        }
      }
    return !(i < 0 || (this.destroyBetween(this.index, i), this.index++, 0));
  }
  updateNodeAt(e, t, n, r, o) {
    var i = this.top.children[r];
    return (
      i.dirty == NODE_DIRTY &&
        i.dom == i.contentDOM &&
        (i.dirty = CONTENT_DIRTY),
      !!i.update(e, t, n, o) &&
        (this.destroyBetween(this.index, r), this.index++, !0)
    );
  }
  findIndexWithChild(e) {
    for (;;) {
      var t = e.parentNode;
      if (!t) return -1;
      if (t == this.top.contentDOM) {
        var n = e.pmViewDesc;
        if (n)
          for (let e = this.index; e < this.top.children.length; e++)
            if (this.top.children[e] == n) return e;
        return -1;
      }
      e = t;
    }
  }
  updateNextNode(r, o, i, a, s, l) {
    for (let n = this.index; n < this.top.children.length; n++) {
      var c = this.top.children[n];
      if (c instanceof NodeViewDesc) {
        var u = this.preMatch.matched.get(c);
        if (null != u && u != s) return !1;
        let e = c.dom,
          t;
        u =
          this.isLocked(e) &&
          !(
            r.isText &&
            c.node &&
            c.node.isText &&
            c.nodeDOM.nodeValue == r.text &&
            c.dirty != NODE_DIRTY &&
            sameOuterDeco(o, c.outerDeco)
          );
        if (!u && c.update(r, o, i, a))
          return (
            this.destroyBetween(this.index, n),
            c.dom != e && (this.changed = !0),
            this.index++,
            !0
          );
        if (!u && (t = this.recreateWrapper(c, r, o, i, a, l)))
          return (
            ((this.top.children[this.index] = t).dirty = CONTENT_DIRTY),
            t.updateChildren(a, l + 1),
            (t.dirty = NOT_DIRTY),
            (this.changed = !0),
            this.index++,
            !0
          );
        break;
      }
    }
    return !1;
  }
  recreateWrapper(e, t, n, r, o, i) {
    if (
      e.dirty ||
      t.isAtom ||
      !e.children.length ||
      !e.node.content.eq(t.content)
    )
      return null;
    var a,
      s = NodeViewDesc.create(this.top, t, n, r, o, i);
    if (!s.contentDOM) return null;
    (s.children = e.children), (e.children = []), e.destroy();
    for (a of s.children) a.parent = s;
    return s;
  }
  addNode(e, t, n, r, o) {
    e = NodeViewDesc.create(this.top, e, t, n, r, o);
    e.contentDOM && e.updateChildren(r, o + 1),
      this.top.children.splice(this.index++, 0, e),
      (this.changed = !0);
  }
  placeWidget(e, t, n) {
    var r =
      this.index < this.top.children.length
        ? this.top.children[this.index]
        : null;
    !r ||
    !r.matchesWidget(e) ||
    (e != r.widget && r.widget.type.toDOM.parentNode)
      ? ((r = new WidgetViewDesc(this.top, e, t, n)),
        this.top.children.splice(this.index++, 0, r),
        (this.changed = !0))
      : this.index++;
  }
  addTextblockHacks() {
    let e = this.top.children[this.index - 1],
      t = this.top;
    for (; e instanceof MarkViewDesc; )
      e = (t = e).children[t.children.length - 1];
    (!(e && e instanceof TextViewDesc) ||
      /\n$/.test(e.node.text) ||
      (this.view.requiresGeckoHackNode && /\s$/.test(e.node.text))) &&
      ((safari || chrome) &&
        e &&
        'false' == e.dom.contentEditable &&
        this.addHackNode('IMG', t),
      this.addHackNode('BR', this.top));
  }
  addHackNode(e, t) {
    var n;
    t == this.top &&
    this.index < t.children.length &&
    t.children[this.index].matchesHack(e)
      ? this.index++
      : ((n = document.createElement(e)),
        'IMG' == e && ((n.className = 'ProseMirror-separator'), (n.alt = '')),
        'BR' == e && (n.className = 'ProseMirror-trailingBreak'),
        (e = new TrailingHackViewDesc(this.top, [], n, null)),
        t != this.top
          ? t.children.push(e)
          : t.children.splice(this.index++, 0, e),
        (this.changed = !0));
  }
  isLocked(e) {
    return (
      this.lock &&
      (e == this.lock || (1 == e.nodeType && e.contains(this.lock.parentNode)))
    );
  }
}
function preMatch(t, n) {
  let r = n,
    o = r.children.length,
    i = t.childCount,
    a = new Map(),
    s = [];
  e: for (; 0 < i; ) {
    let e;
    for (;;)
      if (o) {
        var l = r.children[o - 1];
        if (!(l instanceof MarkViewDesc)) {
          (e = l), o--;
          break;
        }
        (r = l), (o = l.children.length);
      } else {
        if (r == n) break e;
        (o = r.parent.children.indexOf(r)), (r = r.parent);
      }
    var c = e.node;
    if (c) {
      if (c != t.child(i - 1)) break;
      --i, a.set(e, i), s.push(e);
    }
  }
  return { index: i, matched: a, matches: s.reverse() };
}
function compareSide(e, t) {
  return e.type.side - t.type.side;
}
function iterDeco(t, l, c, u) {
  let d = l.locals(t),
    p = 0;
  if (0 == d.length)
    for (let e = 0; e < t.childCount; e++) {
      var n = t.child(e);
      u(n, d, l.forChild(p, n), e), (p += n.nodeSize);
    }
  else {
    let i = 0,
      a = [],
      s = null;
    for (let o = 0; ; ) {
      if (i < d.length && d[i].to == p) {
        let e = d[i++],
          t;
        for (; i < d.length && d[i].to == p; ) (t = t || [e]).push(d[i++]);
        if (t) {
          t.sort(compareSide);
          for (let e = 0; e < t.length; e++) c(t[e], o, !!s);
        } else c(e, o, !!s);
      }
      let e, n;
      if (s) (n = -1), (e = s), (s = null);
      else {
        if (!(o < t.childCount)) break;
        (n = o), (e = t.child(o++));
      }
      for (let e = 0; e < a.length; e++) a[e].to <= p && a.splice(e--, 1);
      for (; i < d.length && d[i].from <= p && d[i].to > p; ) a.push(d[i++]);
      let r = p + e.nodeSize;
      if (e.isText) {
        let t = r;
        i < d.length && d[i].from < t && (t = d[i].from);
        for (let e = 0; e < a.length; e++) a[e].to < t && (t = a[e].to);
        t < r && ((s = e.cut(t - p)), (e = e.cut(0, t - p)), (r = t), (n = -1));
      }
      var f = e.isInline && !e.isLeaf ? a.filter((e) => !e.inline) : a.slice();
      u(e, f, l.forChild(p, e), n), (p = r);
    }
  }
}
function iosHacks(e) {
  var t;
  ('UL' != e.nodeName && 'OL' != e.nodeName) ||
    ((t = e.style.cssText),
    (e.style.cssText = t + '; list-style: square !important'),
    window.getComputedStyle(e).listStyle,
    (e.style.cssText = t));
}
function nearbyTextNode(e, t) {
  for (;;) {
    if (3 == e.nodeType) return e;
    if (1 == e.nodeType && 0 < t) {
      if (e.childNodes.length > t && 3 == e.childNodes[t].nodeType)
        return e.childNodes[t];
      t = nodeSize((e = e.childNodes[t - 1]));
    } else {
      if (!(1 == e.nodeType && t < e.childNodes.length)) return null;
      (e = e.childNodes[t]), (t = 0);
    }
  }
}
function findTextInFragment(r, o, i, a) {
  for (let t = 0, n = 0; t < r.childCount && n <= a; ) {
    var s = r.child(t++),
      l = n;
    if (((n += s.nodeSize), s.isText)) {
      let e = s.text;
      for (; t < r.childCount; ) {
        var c = r.child(t++);
        if (((n += c.nodeSize), !c.isText)) break;
        e += c.text;
      }
      if (n >= i) {
        s = l < a ? e.lastIndexOf(o, a - l - 1) : -1;
        if (0 <= s && s + o.length + l >= i) return l + s;
        if (
          i == a &&
          e.length >= a + o.length - l &&
          e.slice(a - l, a - l + o.length) == o
        )
          return a;
      }
    }
  }
  return -1;
}
function replaceNodes(n, r, o, i, a) {
  var s = [];
  for (let e = 0, t = 0; e < n.length; e++) {
    var l = n[e],
      c = t,
      u = (t += l.size);
    o <= c || u <= r
      ? s.push(l)
      : (c < r && s.push(l.slice(0, r - c, i)),
        a && (s.push(a), (a = void 0)),
        o < u && s.push(l.slice(o - c, l.size, i)));
  }
  return s;
}
function selectionFromDOM(e, t = null) {
  var n = e.domSelectionRange(),
    r = e.state.doc;
  if (!n.focusNode) return null;
  let o = e.docView.nearestDesc(n.focusNode),
    i = o && 0 == o.size;
  var a = e.docView.posFromDOM(n.focusNode, n.focusOffset, 1);
  if (a < 0) return null;
  let s = r.resolve(a),
    l,
    c;
  if (selectionCollapsed(n)) {
    for (l = s; o && !o.node; ) o = o.parent;
    var u = o.node;
    !(o && u.isAtom && NodeSelection.isSelectable(u) && o.parent) ||
      (u.isInline && isOnEdge(n.focusNode, n.focusOffset, o.dom)) ||
      ((u = o.posBefore), (c = new NodeSelection(a == u ? s : r.resolve(u))));
  } else {
    a = e.docView.posFromDOM(n.anchorNode, n.anchorOffset, 1);
    if (a < 0) return null;
    l = r.resolve(a);
  }
  return (
    c ||
      ((u = 'pointer' == t || (e.state.selection.head < s.pos && !i) ? 1 : -1),
      (c = selectionBetween(e, l, s, u))),
    c
  );
}
function editorOwnsSelection(e) {
  return e.editable
    ? e.hasFocus()
    : hasSelection(e) &&
        document.activeElement &&
        document.activeElement.contains(e.dom);
}
function selectionToDOM(o, i = !1) {
  var a = o.state.selection;
  if ((syncNodeSelection(o, a), editorOwnsSelection(o))) {
    if (!i && o.input.mouseDown && o.input.mouseDown.allowDefault && chrome) {
      var e = o.domSelectionRange(),
        t = o.domObserver.currentSelection;
      if (
        e.anchorNode &&
        t.anchorNode &&
        isEquivalentPosition(
          e.anchorNode,
          e.anchorOffset,
          t.anchorNode,
          t.anchorOffset
        )
      )
        return (
          (o.input.mouseDown.delayedSelectionSync = !0),
          void o.domObserver.setCurSelection()
        );
    }
    if ((o.domObserver.disconnectSelection(), o.cursorWrapper))
      selectCursorWrapper(o);
    else {
      let { anchor: e, head: t } = a,
        n,
        r;
      !brokenSelectBetweenUneditable ||
        a instanceof TextSelection ||
        (a.$from.parent.inlineContent ||
          (n = temporarilyEditableNear(o, a.from)),
        a.empty) ||
        a.$from.parent.inlineContent ||
        (r = temporarilyEditableNear(o, a.to)),
        o.docView.setSelection(e, t, o.root, i),
        brokenSelectBetweenUneditable &&
          (n && resetEditable(n), r) &&
          resetEditable(r),
        a.visible
          ? o.dom.classList.remove('ProseMirror-hideselection')
          : (o.dom.classList.add('ProseMirror-hideselection'),
            'onselectionchange' in document && removeClassOnSelectionChange(o));
    }
    o.domObserver.setCurSelection(), o.domObserver.connectSelection();
  }
}
const brokenSelectBetweenUneditable = safari || (chrome && chrome_version < 63);
function temporarilyEditableNear(e, t) {
  var { node: e, offset: t } = e.docView.domFromPos(t, 0),
    n = t < e.childNodes.length ? e.childNodes[t] : null,
    e = t ? e.childNodes[t - 1] : null;
  return safari && n && 'false' == n.contentEditable
    ? setEditable(n)
    : (n && 'false' != n.contentEditable) || (e && 'false' != e.contentEditable)
    ? void 0
    : n
    ? setEditable(n)
    : e
    ? setEditable(e)
    : void 0;
}
function setEditable(e) {
  return (
    (e.contentEditable = 'true'),
    safari && e.draggable && ((e.draggable = !1), (e.wasDraggable = !0)),
    e
  );
}
function resetEditable(e) {
  (e.contentEditable = 'false'),
    e.wasDraggable && ((e.draggable = !0), (e.wasDraggable = null));
}
function removeClassOnSelectionChange(e) {
  let t = e.dom.ownerDocument,
    n =
      (t.removeEventListener('selectionchange', e.input.hideSelectionGuard),
      e.domSelectionRange()),
    r = n.anchorNode,
    o = n.anchorOffset;
  t.addEventListener(
    'selectionchange',
    (e.input.hideSelectionGuard = () => {
      (n.anchorNode == r && n.anchorOffset == o) ||
        (t.removeEventListener('selectionchange', e.input.hideSelectionGuard),
        setTimeout(() => {
          (editorOwnsSelection(e) && !e.state.selection.visible) ||
            e.dom.classList.remove('ProseMirror-hideselection');
        }, 20));
    })
  );
}
function selectCursorWrapper(e) {
  var t = e.domSelection(),
    n = document.createRange(),
    r = e.cursorWrapper.dom,
    o = 'IMG' == r.nodeName;
  o ? n.setEnd(r.parentNode, domIndex(r) + 1) : n.setEnd(r, 0),
    n.collapse(!1),
    t.removeAllRanges(),
    t.addRange(n),
    !o &&
      !e.state.selection.visible &&
      ie &&
      ie_version <= 11 &&
      ((r.disabled = !0), (r.disabled = !1));
}
function syncNodeSelection(e, t) {
  t instanceof NodeSelection
    ? (t = e.docView.descAt(t.from)) != e.lastSelectedViewDesc &&
      (clearNodeSelection(e), t && t.selectNode(), (e.lastSelectedViewDesc = t))
    : clearNodeSelection(e);
}
function clearNodeSelection(e) {
  e.lastSelectedViewDesc &&
    (e.lastSelectedViewDesc.parent && e.lastSelectedViewDesc.deselectNode(),
    (e.lastSelectedViewDesc = void 0));
}
function selectionBetween(t, n, r, e) {
  return (
    t.someProp('createSelectionBetween', (e) => e(t, n, r)) ||
    TextSelection.between(n, r, e)
  );
}
function hasFocusAndSelection(e) {
  return !(e.editable && !e.hasFocus()) && hasSelection(e);
}
function hasSelection(e) {
  var t = e.domSelectionRange();
  if (!t.anchorNode) return !1;
  try {
    return (
      e.dom.contains(
        3 == t.anchorNode.nodeType ? t.anchorNode.parentNode : t.anchorNode
      ) &&
      (e.editable ||
        e.dom.contains(
          3 == t.focusNode.nodeType ? t.focusNode.parentNode : t.focusNode
        ))
    );
  } catch (e) {
    return !1;
  }
}
function anchorInRightPlace(e) {
  var t = e.docView.domFromPos(e.state.selection.anchor, 0),
    e = e.domSelectionRange();
  return isEquivalentPosition(t.node, t.offset, e.anchorNode, e.anchorOffset);
}
function moveSelectionBlock(e, t) {
  var { $anchor: n, $head: r } = e.selection,
    n = 0 < t ? n.max(r) : n.min(r),
    r = n.parent.inlineContent
      ? n.depth
        ? e.doc.resolve(0 < t ? n.after() : n.before())
        : null
      : n;
  return r && Selection.findFrom(r, t);
}
function apply(e, t) {
  return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()), !0;
}
function selectHorizontally(e, t, n) {
  var r,
    o,
    i,
    a = e.state.selection;
  return a instanceof TextSelection
    ? !(!a.empty || -1 < n.indexOf('s')) &&
        (e.endOfTextblock(0 < t ? 'forward' : 'backward')
          ? !!(
              (r = moveSelectionBlock(e.state, t)) && r instanceof NodeSelection
            ) && apply(e, r)
          : mac && -1 < n.indexOf('m')
          ? void 0
          : !(
              !(n = (r = a.$head).textOffset
                ? null
                : t < 0
                ? r.nodeBefore
                : r.nodeAfter) ||
              n.isText ||
              ((o = t < 0 ? r.pos - n.nodeSize : r.pos),
              !(n.isAtom || ((i = e.docView.descAt(o)) && !i.contentDOM)))
            ) &&
            (NodeSelection.isSelectable(n)
              ? apply(
                  e,
                  new NodeSelection(
                    t < 0 ? e.state.doc.resolve(r.pos - n.nodeSize) : r
                  )
                )
              : !!webkit &&
                apply(
                  e,
                  new TextSelection(
                    e.state.doc.resolve(t < 0 ? o : o + n.nodeSize)
                  )
                )))
    : a instanceof NodeSelection && a.node.isInline
    ? apply(e, new TextSelection(0 < t ? a.$to : a.$from))
    : !!(i = moveSelectionBlock(e.state, t)) && apply(e, i);
}
function nodeLen(e) {
  return (3 == e.nodeType ? e.nodeValue : e.childNodes).length;
}
function isIgnorable(e) {
  var t;
  return (
    'false' == e.contentEditable ||
    ((t = e.pmViewDesc) && 0 == t.size && (e.nextSibling || 'BR' != e.nodeName))
  );
}
function skipIgnoredNodes(e, t) {
  return (t < 0 ? skipIgnoredNodesBefore : skipIgnoredNodesAfter)(e);
}
function skipIgnoredNodesBefore(r) {
  var e = r.domSelectionRange();
  let o = e.focusNode,
    i = e.focusOffset;
  if (o) {
    let t,
      n,
      e = !1;
    for (
      gecko &&
      1 == o.nodeType &&
      i < nodeLen(o) &&
      isIgnorable(o.childNodes[i]) &&
      (e = !0);
      ;

    )
      if (0 < i) {
        if (1 != o.nodeType) break;
        var a = o.childNodes[i - 1];
        if (isIgnorable(a)) (t = o), (n = --i);
        else {
          if (3 != a.nodeType) break;
          (o = a), (i = o.nodeValue.length);
        }
      } else {
        if (isBlockNode(o)) break;
        {
          let e = o.previousSibling;
          for (; e && isIgnorable(e); )
            (t = o.parentNode), (n = domIndex(e)), (e = e.previousSibling);
          if (e) (o = e), (i = nodeLen(o));
          else {
            if ((o = o.parentNode) == r.dom) break;
            i = 0;
          }
        }
      }
    e ? setSelFocus(r, o, i) : t && setSelFocus(r, t, n);
  }
}
function skipIgnoredNodesAfter(o) {
  var e = o.domSelectionRange();
  let i = e.focusNode,
    a = e.focusOffset;
  if (i) {
    let t = nodeLen(i),
      n,
      r;
    for (;;)
      if (a < t) {
        if (1 != i.nodeType) break;
        if (!isIgnorable(i.childNodes[a])) break;
        (n = i), (r = ++a);
      } else {
        if (isBlockNode(i)) break;
        {
          let e = i.nextSibling;
          for (; e && isIgnorable(e); )
            (n = e.parentNode), (r = domIndex(e) + 1), (e = e.nextSibling);
          if (e) (i = e), (a = 0), (t = nodeLen(i));
          else {
            if ((i = i.parentNode) == o.dom) break;
            a = t = 0;
          }
        }
      }
    n && setSelFocus(o, n, r);
  }
}
function isBlockNode(e) {
  e = e.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function textNodeAfter(e, t) {
  for (; e && t == e.childNodes.length && !hasBlockDesc(e); )
    (t = domIndex(e) + 1), (e = e.parentNode);
  for (; e && t < e.childNodes.length; ) {
    if (3 == (e = e.childNodes[t]).nodeType) return e;
    t = 0;
  }
}
function textNodeBefore(e, t) {
  for (; e && !t && !hasBlockDesc(e); ) (t = domIndex(e)), (e = e.parentNode);
  for (; e && t; ) {
    if (3 == (e = e.childNodes[t - 1]).nodeType) return e;
    t = e.childNodes.length;
  }
}
function setSelFocus(e, t, n) {
  3 != t.nodeType &&
    ((o = textNodeAfter(t, n))
      ? ((t = o), (n = 0))
      : (o = textNodeBefore(t, n)) && (n = (t = o).nodeValue.length));
  var r,
    o = e.domSelection();
  selectionCollapsed(o)
    ? ((r = document.createRange()).setEnd(t, n),
      r.setStart(t, n),
      o.removeAllRanges(),
      o.addRange(r))
    : o.extend && o.extend(t, n),
    e.domObserver.setCurSelection();
  let i = e['state'];
  setTimeout(() => {
    e.state == i && selectionToDOM(e);
  }, 50);
}
function findDirection(e, t) {
  var n = e.state.doc.resolve(t);
  if (!chrome && !windows && n.parent.inlineContent) {
    var r = e.coordsAtPos(t);
    if (t > n.start()) {
      var o = e.coordsAtPos(t - 1),
        i = (o.top + o.bottom) / 2;
      if (i > r.top && i < r.bottom && 1 < Math.abs(o.left - r.left))
        return o.left < r.left ? 'ltr' : 'rtl';
    }
    if (t < n.end()) {
      (i = e.coordsAtPos(t + 1)), (o = (i.top + i.bottom) / 2);
      if (o > r.top && o < r.bottom && 1 < Math.abs(i.left - r.left))
        return i.left > r.left ? 'ltr' : 'rtl';
    }
  }
  return 'rtl' == getComputedStyle(e.dom).direction ? 'rtl' : 'ltr';
}
function selectVertically(e, t, n) {
  var r = e.state.selection;
  if ((r instanceof TextSelection && !r.empty) || -1 < n.indexOf('s'))
    return !1;
  if (mac && -1 < n.indexOf('m')) return !1;
  var { $from: n, $to: o } = r;
  if (!n.parent.inlineContent || e.endOfTextblock(t < 0 ? 'up' : 'down')) {
    var i = moveSelectionBlock(e.state, t);
    if (i && i instanceof NodeSelection) return apply(e, i);
  }
  return (
    !n.parent.inlineContent &&
    ((i = t < 0 ? n : o),
    !!(n =
      r instanceof AllSelection
        ? Selection.near(i, t)
        : Selection.findFrom(i, t))) &&
    apply(e, n)
  );
}
function stopNativeHorizontalDelete(e, t) {
  var n, r, o;
  return !(
    e.state.selection instanceof TextSelection &&
    (({ $head: n, $anchor: r, empty: o } = e.state.selection),
    n.sameParent(r)) &&
    (!o ||
      (!e.endOfTextblock(0 < t ? 'forward' : 'backward') &&
        (!(r = !n.textOffset && (t < 0 ? n.nodeBefore : n.nodeAfter)) ||
          r.isText ||
          ((o = e.state.tr),
          t < 0
            ? o.delete(n.pos - r.nodeSize, n.pos)
            : o.delete(n.pos, n.pos + r.nodeSize),
          e.dispatch(o),
          0))))
  );
}
function switchEditable(e, t, n) {
  e.domObserver.stop(), (t.contentEditable = n), e.domObserver.start();
}
function safariDownArrowBug(t) {
  if (safari && !(0 < t.state.selection.$head.parentOffset)) {
    var { focusNode: n, focusOffset: e } = t.domSelectionRange();
    if (
      n &&
      1 == n.nodeType &&
      0 == e &&
      n.firstChild &&
      'false' == n.firstChild.contentEditable
    ) {
      let e = n.firstChild;
      switchEditable(t, e, 'true'),
        setTimeout(() => switchEditable(t, e, 'false'), 20);
    }
  }
  return !1;
}
function getMods(e) {
  let t = '';
  return (
    e.ctrlKey && (t += 'c'),
    e.metaKey && (t += 'm'),
    e.altKey && (t += 'a'),
    e.shiftKey && (t += 's'),
    t
  );
}
function captureKeyDown(e, t) {
  var n = t.keyCode,
    r = getMods(t);
  return 8 == n || (mac && 72 == n && 'c' == r)
    ? stopNativeHorizontalDelete(e, -1) || skipIgnoredNodes(e, -1)
    : (46 == n && !t.shiftKey) || (mac && 68 == n && 'c' == r)
    ? stopNativeHorizontalDelete(e, 1) || skipIgnoredNodes(e, 1)
    : 13 == n ||
      27 == n ||
      (37 == n || (mac && 66 == n && 'c' == r)
        ? selectHorizontally(
            e,
            (t =
              37 != n || 'ltr' == findDirection(e, e.state.selection.from)
                ? -1
                : 1),
            r
          ) || skipIgnoredNodes(e, t)
        : 39 == n || (mac && 70 == n && 'c' == r)
        ? selectHorizontally(
            e,
            (t =
              39 != n || 'ltr' == findDirection(e, e.state.selection.from)
                ? 1
                : -1),
            r
          ) || skipIgnoredNodes(e, t)
        : 38 == n || (mac && 80 == n && 'c' == r)
        ? selectVertically(e, -1, r) || skipIgnoredNodes(e, -1)
        : 40 == n || (mac && 78 == n && 'c' == r)
        ? safariDownArrowBug(e) ||
          selectVertically(e, 1, r) ||
          skipIgnoredNodesAfter(e)
        : r == (mac ? 'm' : 'c') && (66 == n || 73 == n || 89 == n || 90 == n));
}
function serializeForClipboard(t, n) {
  t.someProp('transformCopied', (e) => {
    n = e(n, t);
  });
  let e = [],
    { content: r, openStart: o, openEnd: i } = n;
  for (
    ;
    1 < o && 1 < i && 1 == r.childCount && 1 == r.firstChild.childCount;

  ) {
    o--, i--;
    var a = r.firstChild;
    e.push(a.type.name, a.attrs != a.type.defaultAttrs ? a.attrs : null),
      (r = a.content);
  }
  var s =
      t.someProp('clipboardSerializer') ||
      DOMSerializer.fromSchema(t.state.schema),
    l = detachedDoc(),
    c = l.createElement('div');
  c.appendChild(s.serializeFragment(r, { document: l }));
  let u = c.firstChild,
    d,
    p = 0;
  for (; u && 1 == u.nodeType && (d = wrapMap[u.nodeName.toLowerCase()]); ) {
    for (let e = d.length - 1; 0 <= e; e--) {
      for (var f = l.createElement(d[e]); c.firstChild; )
        f.appendChild(c.firstChild);
      c.appendChild(f), p++;
    }
    u = c.firstChild;
  }
  return (
    u &&
      1 == u.nodeType &&
      u.setAttribute(
        'data-pm-slice',
        `${o} ${i}${p ? ' -' + p : ''} ` + JSON.stringify(e)
      ),
    {
      dom: c,
      text:
        t.someProp('clipboardTextSerializer', (e) => e(n, t)) ||
        n.content.textBetween(0, n.content.size, '\n\n'),
    }
  );
}
function parseFromClipboard(t, i, n, r, a) {
  let o = a.parent.type.spec.code,
    s,
    l;
  if (!n && !i) return null;
  var e = i && (r || o || !n);
  if (e) {
    if (
      (t.someProp('transformPastedText', (e) => {
        i = e(i, o || r, t);
      }),
      o)
    )
      return i
        ? new Slice(
            Fragment.from(t.state.schema.text(i.replace(/\r\n?/g, '\n'))),
            0,
            0
          )
        : Slice.empty;
    var c = t.someProp('clipboardTextParser', (e) => e(i, a, r, t));
    if (c) l = c;
    else {
      let n = a.marks(),
        r = t.state['schema'],
        o = DOMSerializer.fromSchema(r);
      (s = document.createElement('div')),
        i.split(/(?:\r\n?|\n)+/).forEach((e) => {
          var t = s.appendChild(document.createElement('p'));
          e && t.appendChild(o.serializeNode(r.text(e, n)));
        });
    }
  } else
    t.someProp('transformPastedHTML', (e) => {
      n = e(n, t);
    }),
      (s = readHTML(n)),
      webkit && restoreReplacedSpaces(s);
  var u,
    c = s && s.querySelector('[data-pm-slice]'),
    c =
      c &&
      /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(
        c.getAttribute('data-pm-slice') || ''
      );
  if (c && c[3])
    for (let e = +c[3]; 0 < e; e--) {
      let e = s.firstChild;
      for (; e && 1 != e.nodeType; ) e = e.nextSibling;
      if (!e) break;
      s = e;
    }
  if (
    (l ||
      ((u =
        t.someProp('clipboardParser') ||
        t.someProp('domParser') ||
        DOMParser$1.fromSchema(t.state.schema)),
      (l = u.parseSlice(s, {
        preserveWhitespace: !(!e && !c),
        context: a,
        ruleFromNode(e) {
          return 'BR' != e.nodeName ||
            e.nextSibling ||
            !e.parentNode ||
            inlineParents.test(e.parentNode.nodeName)
            ? null
            : { ignore: !0 };
        },
      }))),
    c)
  )
    l = addContext(closeSlice(l, +c[1], +c[2]), c[4]);
  else if (
    (l = Slice.maxOpen(normalizeSiblings(l.content, a), !0)).openStart ||
    l.openEnd
  ) {
    let t = 0,
      n = 0;
    for (
      let e = l.content.firstChild;
      t < l.openStart && !e.type.spec.isolating;
      t++, e = e.firstChild
    );
    for (
      let e = l.content.lastChild;
      n < l.openEnd && !e.type.spec.isolating;
      n++, e = e.lastChild
    );
    l = closeSlice(l, t, n);
  }
  return (
    t.someProp('transformPasted', (e) => {
      l = e(l, t);
    }),
    l
  );
}
const inlineParents =
  /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function normalizeSiblings(t, n) {
  if (!(t.childCount < 2))
    for (let e = n.depth; 0 <= e; e--) {
      let r = n.node(e).contentMatchAt(n.index(e)),
        o,
        i = [];
      if (
        (t.forEach((e) => {
          var t, n;
          if (i)
            return (t = r.findWrapping(e.type))
              ? void ((n =
                  i.length &&
                  o.length &&
                  addToSibling(t, o, e, i[i.length - 1], 0))
                  ? (i[i.length - 1] = n)
                  : (i.length &&
                      (i[i.length - 1] = closeRight(i[i.length - 1], o.length)),
                    (n = withWrappers(e, t)),
                    i.push(n),
                    (r = r.matchType(n.type)),
                    (o = t)))
              : (i = null);
        }),
        i)
      )
        return Fragment.from(i);
    }
  return t;
}
function withWrappers(t, n, r = 0) {
  for (let e = n.length - 1; e >= r; e--)
    t = n[e].create(null, Fragment.from(t));
  return t;
}
function addToSibling(e, t, n, r, o) {
  if (o < e.length && o < t.length && e[o] == t[o])
    return (t = addToSibling(e, t, n, r.lastChild, o + 1))
      ? r.copy(r.content.replaceChild(r.childCount - 1, t))
      : r
          .contentMatchAt(r.childCount)
          .matchType(o == e.length - 1 ? n.type : e[o + 1])
      ? r.copy(r.content.append(Fragment.from(withWrappers(n, e, o + 1))))
      : void 0;
}
function closeRight(e, t) {
  var n;
  return 0 == t
    ? e
    : ((t = e.content.replaceChild(
        e.childCount - 1,
        closeRight(e.lastChild, t - 1)
      )),
      (n = e.contentMatchAt(e.childCount).fillBefore(Fragment.empty, !0)),
      e.copy(t.append(n)));
}
function closeRange(e, t, n, r, o, i) {
  let a = t < 0 ? e.firstChild : e.lastChild,
    s = a.content;
  return (
    1 < e.childCount && (i = 0),
    o < r - 1 && (s = closeRange(s, t, n, r, o + 1, i)),
    n <= o &&
      (s =
        t < 0
          ? a
              .contentMatchAt(0)
              .fillBefore(s, i <= o)
              .append(s)
          : s.append(
              a.contentMatchAt(a.childCount).fillBefore(Fragment.empty, !0)
            )),
    e.replaceChild(t < 0 ? 0 : e.childCount - 1, a.copy(s))
  );
}
function closeSlice(e, t, n) {
  return (e =
    n <
    (e =
      t < e.openStart
        ? new Slice(
            closeRange(e.content, -1, t, e.openStart, 0, e.openEnd),
            t,
            e.openEnd
          )
        : e).openEnd
      ? new Slice(closeRange(e.content, 1, n, e.openEnd, 0, 0), e.openStart, n)
      : e);
}
const wrapMap = {
  thead: ['table'],
  tbody: ['table'],
  tfoot: ['table'],
  caption: ['table'],
  colgroup: ['table'],
  col: ['table', 'colgroup'],
  tr: ['table', 'tbody'],
  td: ['table', 'tbody', 'tr'],
  th: ['table', 'tbody', 'tr'],
};
let _detachedDoc = null;
function detachedDoc() {
  return (_detachedDoc =
    _detachedDoc || document.implementation.createHTMLDocument('title'));
}
function readHTML(e) {
  var t = /^(\s*<meta [^>]*>)*/.exec(e);
  t && (e = e.slice(t[0].length));
  let n = detachedDoc().createElement('div');
  var r,
    t = /<([a-z][^>\s]+)/i.exec(e);
  if (
    ((r = t && wrapMap[t[1].toLowerCase()]) &&
      (e =
        r.map((e) => '<' + e + '>').join('') +
        e +
        r
          .map((e) => '</' + e + '>')
          .reverse()
          .join('')),
    (n.innerHTML = e),
    r)
  )
    for (let e = 0; e < r.length; e++) n = n.querySelector(r[e]) || n;
  return n;
}
function restoreReplacedSpaces(t) {
  var n = t.querySelectorAll(
    chrome ? 'span:not([class]):not([style])' : 'span.Apple-converted-space'
  );
  for (let e = 0; e < n.length; e++) {
    var r = n[e];
    1 == r.childNodes.length &&
      ' ' == r.textContent &&
      r.parentNode &&
      r.parentNode.replaceChild(t.ownerDocument.createTextNode(' '), r);
  }
}
function addContext(t, e) {
  if (!t.size) return t;
  let n = t.content.firstChild.type.schema,
    r;
  try {
    r = JSON.parse(e);
  } catch (e) {
    return t;
  }
  let { content: o, openStart: i, openEnd: a } = t;
  for (let e = r.length - 2; 0 <= e; e -= 2) {
    var s = n.nodes[r[e]];
    if (!s || s.hasRequiredAttrs()) break;
    (o = Fragment.from(s.create(r[e + 1], o))), i++, a++;
  }
  return new Slice(o, i, a);
}
const handlers = {},
  editHandlers = {},
  passiveHandlers = { touchstart: !0, touchmove: !0 };
class InputState {
  constructor() {
    (this.shiftKey = !1),
      (this.mouseDown = null),
      (this.lastKeyCode = null),
      (this.lastKeyCodeTime = 0),
      (this.lastClick = { time: 0, x: 0, y: 0, type: '' }),
      (this.lastSelectionOrigin = null),
      (this.lastSelectionTime = 0),
      (this.lastIOSEnter = 0),
      (this.lastIOSEnterFallbackTimeout = -1),
      (this.lastFocus = 0),
      (this.lastTouch = 0),
      (this.lastAndroidDelete = 0),
      (this.composing = !1),
      (this.composingTimeout = -1),
      (this.compositionNodes = []),
      (this.compositionEndedAt = -2e8),
      (this.compositionID = 1),
      (this.compositionPendingChanges = 0),
      (this.domChangeCount = 0),
      (this.eventHandlers = Object.create(null)),
      (this.hideSelectionGuard = null);
  }
}
function initInput(n) {
  for (var e in handlers) {
    let t = handlers[e];
    n.dom.addEventListener(
      e,
      (n.input.eventHandlers[e] = (e) => {
        !eventBelongsToView(n, e) ||
          runCustomHandler(n, e) ||
          (!n.editable && e.type in editHandlers) ||
          t(n, e);
      }),
      passiveHandlers[e] ? { passive: !0 } : void 0
    );
  }
  safari && n.dom.addEventListener('input', () => null), ensureListeners(n);
}
function setSelectionOrigin(e, t) {
  (e.input.lastSelectionOrigin = t), (e.input.lastSelectionTime = Date.now());
}
function destroyInput(e) {
  for (var t in (e.domObserver.stop(), e.input.eventHandlers))
    e.dom.removeEventListener(t, e.input.eventHandlers[t]);
  clearTimeout(e.input.composingTimeout),
    clearTimeout(e.input.lastIOSEnterFallbackTimeout);
}
function ensureListeners(n) {
  n.someProp('handleDOMEvents', (e) => {
    for (var t in e)
      n.input.eventHandlers[t] ||
        n.dom.addEventListener(
          t,
          (n.input.eventHandlers[t] = (e) => runCustomHandler(n, e))
        );
  });
}
function runCustomHandler(t, n) {
  return t.someProp('handleDOMEvents', (e) => {
    e = e[n.type];
    return !!e && (e(t, n) || n.defaultPrevented);
  });
}
function eventBelongsToView(t, n) {
  if (n.bubbles) {
    if (n.defaultPrevented) return !1;
    for (let e = n.target; e != t.dom; e = e.parentNode)
      if (!e || 11 == e.nodeType || (e.pmViewDesc && e.pmViewDesc.stopEvent(n)))
        return !1;
  }
  return !0;
}
function dispatchEvent(e, t) {
  runCustomHandler(e, t) ||
    !handlers[t.type] ||
    (!e.editable && t.type in editHandlers) ||
    handlers[t.type](e, t);
}
function eventCoords(e) {
  return { left: e.clientX, top: e.clientY };
}
function isNear(e, t) {
  var n = t.x - e.clientX,
    t = t.y - e.clientY;
  return n * n + t * t < 100;
}
function runHandlerOnContext(r, e, o, t, i) {
  if (-1 != t) {
    let n = r.state.doc.resolve(t);
    for (let t = n.depth + 1; 0 < t; t--)
      if (
        r.someProp(e, (e) =>
          t > n.depth
            ? e(r, o, n.nodeAfter, n.before(t), i, !0)
            : e(r, o, n.node(t), n.before(t), i, !1)
        )
      )
        return !0;
  }
  return !1;
}
function updateSelection(e, t, n) {
  e.focused || e.focus();
  t = e.state.tr.setSelection(t);
  'pointer' == n && t.setMeta('pointer', !0), e.dispatch(t);
}
function selectClickedLeaf(e, t) {
  var n;
  return (
    -1 != t &&
    !!(
      (n = (t = e.state.doc.resolve(t)).nodeAfter) &&
      n.isAtom &&
      NodeSelection.isSelectable(n)
    ) &&
    (updateSelection(e, new NodeSelection(t), 'pointer'), !0)
  );
}
function selectClickedNode(e, t) {
  if (-1 == t) return !1;
  let n = e.state.selection,
    r,
    o;
  n instanceof NodeSelection && (r = n.node);
  var i = e.state.doc.resolve(t);
  for (let e = i.depth + 1; 0 < e; e--) {
    var a = e > i.depth ? i.nodeAfter : i.node(e);
    if (NodeSelection.isSelectable(a)) {
      o =
        r &&
        0 < n.$from.depth &&
        e >= n.$from.depth &&
        i.before(n.$from.depth + 1) == n.$from.pos
          ? i.before(n.$from.depth)
          : i.before(e);
      break;
    }
  }
  return (
    null != o &&
    (updateSelection(e, NodeSelection.create(e.state.doc, o), 'pointer'), !0)
  );
}
function handleSingleClick(t, n, e, r, o) {
  return (
    runHandlerOnContext(t, 'handleClickOn', n, e, r) ||
    t.someProp('handleClick', (e) => e(t, n, r)) ||
    (o ? selectClickedNode : selectClickedLeaf)(t, e)
  );
}
function handleDoubleClick(t, n, e, r) {
  return (
    runHandlerOnContext(t, 'handleDoubleClickOn', n, e, r) ||
    t.someProp('handleDoubleClick', (e) => e(t, n, r))
  );
}
function handleTripleClick(t, n, e, r) {
  return (
    runHandlerOnContext(t, 'handleTripleClickOn', n, e, r) ||
    t.someProp('handleTripleClick', (e) => e(t, n, r)) ||
    defaultTripleClick(t, e, r)
  );
}
function defaultTripleClick(t, e, n) {
  if (0 != n.button) return !1;
  var r = t.state.doc;
  if (-1 == e)
    return (
      !!r.inlineContent &&
      (updateSelection(
        t,
        TextSelection.create(r, 0, r.content.size),
        'pointer'
      ),
      !0)
    );
  var o = r.resolve(e);
  for (let e = o.depth + 1; 0 < e; e--) {
    var i = e > o.depth ? o.nodeAfter : o.node(e),
      a = o.before(e);
    if (i.inlineContent)
      updateSelection(
        t,
        TextSelection.create(r, a + 1, a + 1 + i.content.size),
        'pointer'
      );
    else {
      if (!NodeSelection.isSelectable(i)) continue;
      updateSelection(t, NodeSelection.create(r, a), 'pointer');
    }
    return !0;
  }
}
function forceDOMFlush(e) {
  return endComposition(e);
}
(editHandlers.keydown = (t, e) => {
  let n = e;
  if (
    ((t.input.shiftKey = 16 == n.keyCode || n.shiftKey),
    !inOrNearComposition(t, n) &&
      ((t.input.lastKeyCode = n.keyCode),
      (t.input.lastKeyCodeTime = Date.now()),
      !android || !chrome || 13 != n.keyCode))
  )
    if (
      (229 != n.keyCode && t.domObserver.forceFlush(),
      !ios || 13 != n.keyCode || n.ctrlKey || n.altKey || n.metaKey)
    )
      t.someProp('handleKeyDown', (e) => e(t, n)) || captureKeyDown(t, n)
        ? n.preventDefault()
        : setSelectionOrigin(t, 'key');
    else {
      let e = Date.now();
      (t.input.lastIOSEnter = e),
        (t.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
          t.input.lastIOSEnter == e &&
            (t.someProp('handleKeyDown', (e) => e(t, keyEvent(13, 'Enter'))),
            (t.input.lastIOSEnter = 0));
        }, 200));
    }
}),
  (editHandlers.keyup = (e, t) => {
    16 == t.keyCode && (e.input.shiftKey = !1);
  }),
  (editHandlers.keypress = (r, e) => {
    let o = e;
    if (
      !(
        inOrNearComposition(r, o) ||
        !o.charCode ||
        (o.ctrlKey && !o.altKey) ||
        (mac && o.metaKey)
      )
    )
      if (r.someProp('handleKeyPress', (e) => e(r, o))) o.preventDefault();
      else {
        let n = r.state.selection;
        if (!(n instanceof TextSelection && n.$from.sameParent(n.$to))) {
          let t = String.fromCharCode(o.charCode);
          /[\r\n]/.test(t) ||
            r.someProp('handleTextInput', (e) =>
              e(r, n.$from.pos, n.$to.pos, t)
            ) ||
            r.dispatch(r.state.tr.insertText(t).scrollIntoView()),
            o.preventDefault();
        }
      }
  });
const selectNodeModifier = mac ? 'metaKey' : 'ctrlKey';
handlers.mousedown = (e, t) => {
  e.input.shiftKey = t.shiftKey;
  var n = forceDOMFlush(e);
  let r = Date.now(),
    o = 'singleClick';
  r - e.input.lastClick.time < 500 &&
    isNear(t, e.input.lastClick) &&
    !t[selectNodeModifier] &&
    ('singleClick' == e.input.lastClick.type
      ? (o = 'doubleClick')
      : 'doubleClick' == e.input.lastClick.type && (o = 'tripleClick')),
    (e.input.lastClick = { time: r, x: t.clientX, y: t.clientY, type: o });
  var i = e.posAtCoords(eventCoords(t));
  i &&
    ('singleClick' == o
      ? (e.input.mouseDown && e.input.mouseDown.done(),
        (e.input.mouseDown = new MouseDown(e, i, t, !!n)))
      : ('doubleClick' == o ? handleDoubleClick : handleTripleClick)(
          e,
          i.pos,
          i.inside,
          t
        )
      ? t.preventDefault()
      : setSelectionOrigin(e, 'pointer'));
};
class MouseDown {
  constructor(e, t, n, r) {
    (this.view = e),
      (this.pos = t),
      (this.event = n),
      (this.flushed = r),
      (this.delayedSelectionSync = !1),
      (this.mightDrag = null),
      (this.startDoc = e.state.doc),
      (this.selectNode = !!n[selectNodeModifier]),
      (this.allowDefault = n.shiftKey);
    let o, i;
    i =
      -1 < t.inside
        ? ((o = e.state.doc.nodeAt(t.inside)), t.inside)
        : ((t = e.state.doc.resolve(t.pos)),
          (o = t.parent),
          t.depth ? t.before() : 0);
    (t = r ? null : n.target),
      (r = t ? e.docView.nearestDesc(t, !0) : null),
      (this.target = r ? r.dom : null),
      (t = e.state.selection);
    ((0 == n.button &&
      o.type.spec.draggable &&
      !1 !== o.type.spec.selectable) ||
      (t instanceof NodeSelection && t.from <= i && t.to > i)) &&
      (this.mightDrag = {
        node: o,
        pos: i,
        addAttr: !(!this.target || this.target.draggable),
        setUneditable: !(
          !this.target ||
          !gecko ||
          this.target.hasAttribute('contentEditable')
        ),
      }),
      this.target &&
        this.mightDrag &&
        (this.mightDrag.addAttr || this.mightDrag.setUneditable) &&
        (this.view.domObserver.stop(),
        this.mightDrag.addAttr && (this.target.draggable = !0),
        this.mightDrag.setUneditable &&
          setTimeout(() => {
            this.view.input.mouseDown == this &&
              this.target.setAttribute('contentEditable', 'false');
          }, 20),
        this.view.domObserver.start()),
      e.root.addEventListener('mouseup', (this.up = this.up.bind(this))),
      e.root.addEventListener('mousemove', (this.move = this.move.bind(this))),
      setSelectionOrigin(e, 'pointer');
  }
  done() {
    this.view.root.removeEventListener('mouseup', this.up),
      this.view.root.removeEventListener('mousemove', this.move),
      this.mightDrag &&
        this.target &&
        (this.view.domObserver.stop(),
        this.mightDrag.addAttr && this.target.removeAttribute('draggable'),
        this.mightDrag.setUneditable &&
          this.target.removeAttribute('contentEditable'),
        this.view.domObserver.start()),
      this.delayedSelectionSync && setTimeout(() => selectionToDOM(this.view)),
      (this.view.input.mouseDown = null);
  }
  up(t) {
    if ((this.done(), this.view.dom.contains(t.target))) {
      let e = this.pos;
      this.view.state.doc != this.startDoc &&
        (e = this.view.posAtCoords(eventCoords(t))),
        this.updateAllowDefault(t),
        this.allowDefault || !e
          ? setSelectionOrigin(this.view, 'pointer')
          : handleSingleClick(this.view, e.pos, e.inside, t, this.selectNode)
          ? t.preventDefault()
          : 0 == t.button &&
            (this.flushed ||
              (safari && this.mightDrag && !this.mightDrag.node.isAtom) ||
              (chrome &&
                !this.view.state.selection.visible &&
                Math.min(
                  Math.abs(e.pos - this.view.state.selection.from),
                  Math.abs(e.pos - this.view.state.selection.to)
                ) <= 2))
          ? (updateSelection(
              this.view,
              Selection.near(this.view.state.doc.resolve(e.pos)),
              'pointer'
            ),
            t.preventDefault())
          : setSelectionOrigin(this.view, 'pointer');
    }
  }
  move(e) {
    this.updateAllowDefault(e),
      setSelectionOrigin(this.view, 'pointer'),
      0 == e.buttons && this.done();
  }
  updateAllowDefault(e) {
    !this.allowDefault &&
      (4 < Math.abs(this.event.x - e.clientX) ||
        4 < Math.abs(this.event.y - e.clientY)) &&
      (this.allowDefault = !0);
  }
}
function inOrNearComposition(e, t) {
  return (
    !!e.composing ||
    (!!(safari && Math.abs(t.timeStamp - e.input.compositionEndedAt) < 500) &&
      ((e.input.compositionEndedAt = -2e8), !0))
  );
}
(handlers.touchstart = (e) => {
  (e.input.lastTouch = Date.now()),
    forceDOMFlush(e),
    setSelectionOrigin(e, 'pointer');
}),
  (handlers.touchmove = (e) => {
    (e.input.lastTouch = Date.now()), setSelectionOrigin(e, 'pointer');
  }),
  (handlers.contextmenu = (e) => forceDOMFlush(e));
const timeoutComposition = android ? 5e3 : -1;
function scheduleComposeEnd(e, t) {
  clearTimeout(e.input.composingTimeout),
    -1 < t &&
      (e.input.composingTimeout = setTimeout(() => endComposition(e), t));
}
function clearComposition(e) {
  for (
    e.composing &&
    ((e.input.composing = !1),
    (e.input.compositionEndedAt = timestampFromCustomEvent()));
    0 < e.input.compositionNodes.length;

  )
    e.input.compositionNodes.pop().markParentsDirty();
}
function timestampFromCustomEvent() {
  var e = document.createEvent('Event');
  return e.initEvent('event', !0, !0), e.timeStamp;
}
function endComposition(e, t = !1) {
  if (!(android && 0 <= e.domObserver.flushingSoon))
    return (
      e.domObserver.forceFlush(),
      clearComposition(e),
      !!(t || (e.docView && e.docView.dirty)) &&
        ((t = selectionFromDOM(e)) && !t.eq(e.state.selection)
          ? e.dispatch(e.state.tr.setSelection(t))
          : e.updateState(e.state),
        !0)
    );
}
function captureCopy(t, n) {
  if (t.dom.parentNode) {
    let e = t.dom.parentNode.appendChild(document.createElement('div'));
    e.appendChild(n),
      (e.style.cssText = 'position: fixed; left: -10000px; top: 10px');
    var r = getSelection(),
      o = document.createRange();
    o.selectNodeContents(n),
      t.dom.blur(),
      r.removeAllRanges(),
      r.addRange(o),
      setTimeout(() => {
        e.parentNode && e.parentNode.removeChild(e), t.focus();
      }, 50);
  }
}
(editHandlers.compositionstart = editHandlers.compositionupdate =
  (n) => {
    if (!n.composing) {
      n.domObserver.flush();
      var r = n['state'],
        e = r.selection.$from;
      if (
        r.selection.empty &&
        (r.storedMarks ||
          (!e.textOffset &&
            e.parentOffset &&
            e.nodeBefore.marks.some((e) => !1 === e.type.spec.inclusive)))
      )
        (n.markCursor = n.state.storedMarks || e.marks()),
          endComposition(n, !0),
          (n.markCursor = null);
      else if (
        (endComposition(n),
        gecko &&
          r.selection.empty &&
          e.parentOffset &&
          !e.textOffset &&
          e.nodeBefore.marks.length)
      ) {
        r = n.domSelectionRange();
        for (
          let e = r.focusNode, t = r.focusOffset;
          e && 1 == e.nodeType && 0 != t;

        ) {
          var o = t < 0 ? e.lastChild : e.childNodes[t - 1];
          if (!o) break;
          if (3 == o.nodeType) {
            n.domSelection().collapse(o, o.nodeValue.length);
            break;
          }
          (e = o), (t = -1);
        }
      }
      n.input.composing = !0;
    }
    scheduleComposeEnd(n, timeoutComposition);
  }),
  (editHandlers.compositionend = (e, t) => {
    e.composing &&
      ((e.input.composing = !1),
      (e.input.compositionEndedAt = t.timeStamp),
      (e.input.compositionPendingChanges = e.domObserver.pendingRecords().length
        ? e.input.compositionID
        : 0),
      e.input.compositionPendingChanges &&
        Promise.resolve().then(() => e.domObserver.flush()),
      e.input.compositionID++,
      scheduleComposeEnd(e, 20));
  });
const brokenClipboardAPI =
  (ie && ie_version < 15) || (ios && webkit_version < 604);
function sliceSingleNode(e) {
  return 0 == e.openStart && 0 == e.openEnd && 1 == e.content.childCount
    ? e.content.firstChild
    : null;
}
function capturePaste(r, o) {
  if (r.dom.parentNode) {
    let e = r.input.shiftKey || r.state.selection.$from.parent.type.spec.code,
      t = r.dom.parentNode.appendChild(
        document.createElement(e ? 'textarea' : 'div')
      ),
      n =
        (e || (t.contentEditable = 'true'),
        (t.style.cssText = 'position: fixed; left: -10000px; top: 10px'),
        t.focus(),
        r.input.shiftKey && 45 != r.input.lastKeyCode);
    setTimeout(() => {
      r.focus(),
        t.parentNode && t.parentNode.removeChild(t),
        e
          ? doPaste(r, t.value, null, n, o)
          : doPaste(r, t.textContent, t.innerHTML, n, o);
    }, 50);
  }
}
function doPaste(t, e, n, r, o) {
  let i = parseFromClipboard(t, e, n, r, t.state.selection.$from);
  if (!t.someProp('handlePaste', (e) => e(t, o, i || Slice.empty))) {
    if (!i) return !1;
    (e = sliceSingleNode(i)),
      (n = e
        ? t.state.tr.replaceSelectionWith(e, r)
        : t.state.tr.replaceSelection(i));
    t.dispatch(
      n.scrollIntoView().setMeta('paste', !0).setMeta('uiEvent', 'paste')
    );
  }
  return !0;
}
(handlers.copy = editHandlers.cut =
  (e, t) => {
    var n,
      r,
      o = e.state.selection,
      i = 'cut' == t.type;
    o.empty ||
      ((n = brokenClipboardAPI ? null : t.clipboardData),
      ({ dom: o, text: r } = serializeForClipboard(e, o.content())),
      n
        ? (t.preventDefault(),
          n.clearData(),
          n.setData('text/html', o.innerHTML),
          n.setData('text/plain', r))
        : captureCopy(e, o),
      i &&
        e.dispatch(
          e.state.tr
            .deleteSelection()
            .scrollIntoView()
            .setMeta('uiEvent', 'cut')
        ));
  }),
  (editHandlers.paste = (e, t) => {
    var n, r;
    (e.composing && !android) ||
      ((n = brokenClipboardAPI ? null : t.clipboardData),
      (r = e.input.shiftKey && 45 != e.input.lastKeyCode),
      n && doPaste(e, n.getData('text/plain'), n.getData('text/html'), r, t)
        ? t.preventDefault()
        : capturePaste(e, t));
  });
class Dragging {
  constructor(e, t) {
    (this.slice = e), (this.move = t);
  }
}
const dragCopyModifier = mac ? 'altKey' : 'ctrlKey';
(handlers.dragstart = (e, t) => {
  var n,
    r,
    o = e.input.mouseDown;
  o && o.done(),
    t.dataTransfer &&
      (((r = (n = e.state.selection).empty
        ? null
        : e.posAtCoords(eventCoords(t))) &&
        r.pos >= n.from &&
        r.pos <= (n instanceof NodeSelection ? n.to - 1 : n.to)) ||
        (o && o.mightDrag
          ? e.dispatch(
              e.state.tr.setSelection(
                NodeSelection.create(e.state.doc, o.mightDrag.pos)
              )
            )
          : t.target &&
            1 == t.target.nodeType &&
            (r = e.docView.nearestDesc(t.target, !0)) &&
            r.node.type.spec.draggable &&
            r != e.docView &&
            e.dispatch(
              e.state.tr.setSelection(
                NodeSelection.create(e.state.doc, r.posBefore)
              )
            )),
      (n = e.state.selection.content()),
      ({ dom: o, text: r } = serializeForClipboard(e, n)),
      t.dataTransfer.clearData(),
      t.dataTransfer.setData(
        brokenClipboardAPI ? 'Text' : 'text/html',
        o.innerHTML
      ),
      (t.dataTransfer.effectAllowed = 'copyMove'),
      brokenClipboardAPI || t.dataTransfer.setData('text/plain', r),
      (e.dragging = new Dragging(n, !t[dragCopyModifier])));
}),
  (handlers.dragend = (e) => {
    let t = e.dragging;
    window.setTimeout(() => {
      e.dragging == t && (e.dragging = null);
    }, 50);
  }),
  (editHandlers.dragover = editHandlers.dragenter =
    (e, t) => t.preventDefault()),
  (editHandlers.drop = (r, i) => {
    let o = i;
    i = r.dragging;
    if (((r.dragging = null), o.dataTransfer)) {
      var a = r.posAtCoords(eventCoords(o));
      if (a) {
        a = r.state.doc.resolve(a.pos);
        let t = i && i.slice,
          n =
            (t
              ? r.someProp('transformPasted', (e) => {
                  t = e(t, r);
                })
              : (t = parseFromClipboard(
                  r,
                  o.dataTransfer.getData(
                    brokenClipboardAPI ? 'Text' : 'text/plain'
                  ),
                  brokenClipboardAPI
                    ? null
                    : o.dataTransfer.getData('text/html'),
                  !1,
                  a
                )),
            !(!i || o[dragCopyModifier]));
        if (r.someProp('handleDrop', (e) => e(r, o, t || Slice.empty, n)))
          o.preventDefault();
        else if (t) {
          o.preventDefault();
          let e = t ? dropPoint(r.state.doc, a.pos, t) : a.pos;
          null == e && (e = a.pos);
          var i = r.state.tr,
            a = (n && i.deleteSelection(), i.mapping.map(e)),
            s = 0 == t.openStart && 0 == t.openEnd && 1 == t.content.childCount,
            l = i.doc;
          if (
            (s
              ? i.replaceRangeWith(a, a, t.content.firstChild)
              : i.replaceRange(a, a, t),
            !i.doc.eq(l))
          ) {
            l = i.doc.resolve(a);
            if (
              s &&
              NodeSelection.isSelectable(t.content.firstChild) &&
              l.nodeAfter &&
              l.nodeAfter.sameMarkup(t.content.firstChild)
            )
              i.setSelection(new NodeSelection(l));
            else {
              let o = i.mapping.map(e);
              i.mapping.maps[i.mapping.maps.length - 1].forEach(
                (e, t, n, r) => (o = r)
              ),
                i.setSelection(selectionBetween(r, l, i.doc.resolve(o)));
            }
            r.focus(), r.dispatch(i.setMeta('uiEvent', 'drop'));
          }
        }
      }
    }
  }),
  (handlers.focus = (e) => {
    (e.input.lastFocus = Date.now()),
      e.focused ||
        (e.domObserver.stop(),
        e.dom.classList.add('ProseMirror-focused'),
        e.domObserver.start(),
        (e.focused = !0),
        setTimeout(() => {
          e.docView &&
            e.hasFocus() &&
            !e.domObserver.currentSelection.eq(e.domSelectionRange()) &&
            selectionToDOM(e);
        }, 20));
  }),
  (handlers.blur = (e, t) => {
    e.focused &&
      (e.domObserver.stop(),
      e.dom.classList.remove('ProseMirror-focused'),
      e.domObserver.start(),
      t.relatedTarget &&
        e.dom.contains(t.relatedTarget) &&
        e.domObserver.currentSelection.clear(),
      (e.focused = !1));
  }),
  (handlers.beforeinput = (n, e) => {
    if (chrome && android && 'deleteContentBackward' == e.inputType) {
      n.domObserver.flushSoon();
      let t = n.input['domChangeCount'];
      setTimeout(() => {
        var e;
        n.input.domChangeCount != t ||
          (n.dom.blur(),
          n.focus(),
          n.someProp('handleKeyDown', (e) => e(n, keyEvent(8, 'Backspace')))) ||
          ((e = n.state.selection['$cursor']),
          e &&
            0 < e.pos &&
            n.dispatch(n.state.tr.delete(e.pos - 1, e.pos).scrollIntoView()));
      }, 50);
    }
  });
for (let e in editHandlers) handlers[e] = editHandlers[e];
function compareObjs(e, t) {
  if (e != t) {
    for (var n in e) if (e[n] !== t[n]) return !1;
    for (var r in t) if (!(r in e)) return !1;
  }
  return !0;
}
class WidgetType {
  constructor(e, t) {
    (this.toDOM = e),
      (this.spec = t || noSpec),
      (this.side = this.spec.side || 0);
  }
  map(e, t, n, r) {
    var { pos: e, deleted: t } = e.mapResult(
      t.from + r,
      this.side < 0 ? -1 : 1
    );
    return t ? null : new Decoration(e - n, e - n, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return (
      this == e ||
      (e instanceof WidgetType &&
        ((this.spec.key && this.spec.key == e.spec.key) ||
          (this.toDOM == e.toDOM && compareObjs(this.spec, e.spec))))
    );
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class InlineType {
  constructor(e, t) {
    (this.attrs = e), (this.spec = t || noSpec);
  }
  map(e, t, n, r) {
    var o = e.map(t.from + r, this.spec.inclusiveStart ? -1 : 1) - n,
      e = e.map(t.to + r, this.spec.inclusiveEnd ? 1 : -1) - n;
    return e <= o ? null : new Decoration(o, e, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return (
      this == e ||
      (e instanceof InlineType &&
        compareObjs(this.attrs, e.attrs) &&
        compareObjs(this.spec, e.spec))
    );
  }
  static is(e) {
    return e.type instanceof InlineType;
  }
  destroy() {}
}
class NodeType {
  constructor(e, t) {
    (this.attrs = e), (this.spec = t || noSpec);
  }
  map(e, t, n, r) {
    var o = e.mapResult(t.from + r, 1);
    return o.deleted ||
      (e = e.mapResult(t.to + r, -1)).deleted ||
      e.pos <= o.pos
      ? null
      : new Decoration(o.pos - n, e.pos - n, this);
  }
  valid(e, t) {
    let { index: n, offset: r } = e.content.findIndex(t.from),
      o;
    return r == t.from && !(o = e.child(n)).isText && r + o.nodeSize == t.to;
  }
  eq(e) {
    return (
      this == e ||
      (e instanceof NodeType &&
        compareObjs(this.attrs, e.attrs) &&
        compareObjs(this.spec, e.spec))
    );
  }
  destroy() {}
}
class Decoration {
  constructor(e, t, n) {
    (this.from = e), (this.to = t), (this.type = n);
  }
  copy(e, t) {
    return new Decoration(e, t, this.type);
  }
  eq(e, t = 0) {
    return (
      this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to
    );
  }
  map(e, t, n) {
    return this.type.map(e, this, t, n);
  }
  static widget(e, t, n) {
    return new Decoration(e, e, new WidgetType(t, n));
  }
  static inline(e, t, n, r) {
    return new Decoration(e, t, new InlineType(n, r));
  }
  static node(e, t, n, r) {
    return new Decoration(e, t, new NodeType(n, r));
  }
  get spec() {
    return this.type.spec;
  }
  get inline() {
    return this.type instanceof InlineType;
  }
}
const none = [],
  noSpec = {};
class DecorationSet {
  constructor(e, t) {
    (this.local = e.length ? e : none), (this.children = t.length ? t : none);
  }
  static create(e, t) {
    return t.length ? buildTree(t, e, 0, noSpec) : empty;
  }
  find(e, t, n) {
    var r = [];
    return this.findInner(null == e ? 0 : e, null == t ? 1e9 : t, r, 0, n), r;
  }
  findInner(t, n, r, o, i) {
    for (let e = 0; e < this.local.length; e++) {
      var a = this.local[e];
      a.from <= n &&
        a.to >= t &&
        (!i || i(a.spec)) &&
        r.push(a.copy(a.from + o, a.to + o));
    }
    for (let e = 0; e < this.children.length; e += 3) {
      var s;
      this.children[e] < n &&
        this.children[e + 1] > t &&
        ((s = this.children[e] + 1),
        this.children[e + 2].findInner(t - s, n - s, r, o + s, i));
    }
  }
  map(e, t, n) {
    return this == empty || 0 == e.maps.length
      ? this
      : this.mapInner(e, t, 0, 0, n || noSpec);
  }
  mapInner(t, n, r, o, i) {
    let a;
    for (let e = 0; e < this.local.length; e++) {
      var s = this.local[e].map(t, r, o);
      s && s.type.valid(n, s)
        ? (a = a || []).push(s)
        : i.onRemove && i.onRemove(this.local[e].spec);
    }
    return this.children.length
      ? mapChildren(this.children, a || [], t, n, r, o, i)
      : a
      ? new DecorationSet(a.sort(byPos), none)
      : empty;
  }
  add(e, t) {
    return t.length
      ? this == empty
        ? DecorationSet.create(e, t)
        : this.addInner(e, t, 0)
      : this;
  }
  addInner(t, o, i) {
    let a,
      s = 0;
    t.forEach((e, t) => {
      var n,
        r = t + i;
      if ((n = takeSpansForNode(o, e, r))) {
        for (a = a || this.children.slice(); s < a.length && a[s] < t; ) s += 3;
        a[s] == t
          ? (a[s + 2] = a[s + 2].addInner(e, n, r + 1))
          : a.splice(s, 0, t, t + e.nodeSize, buildTree(n, e, r + 1, noSpec)),
          (s += 3);
      }
    });
    var n = moveSpans(s ? withoutNulls(o) : o, -i);
    for (let e = 0; e < n.length; e++)
      n[e].type.valid(t, n[e]) || n.splice(e--, 1);
    return new DecorationSet(
      n.length ? this.local.concat(n).sort(byPos) : this.local,
      a || this.children
    );
  }
  remove(e) {
    return 0 == e.length || this == empty ? this : this.removeInner(e, 0);
  }
  removeInner(r, o) {
    let t = this.children,
      n = this.local;
    for (let e = 0; e < t.length; e += 3) {
      let n;
      var i,
        a = t[e] + o,
        s = t[e + 1] + o;
      for (let e = 0, t; e < r.length; e++)
        (t = r[e]) &&
          t.from > a &&
          t.to < s &&
          ((r[e] = null), (n = n || []).push(t));
      n &&
        ((i = (t = t == this.children ? this.children.slice() : t)[
          e + 2
        ].removeInner(n, a + 1)) != empty
          ? (t[e + 2] = i)
          : (t.splice(e, 3), (e -= 3)));
    }
    if (n.length)
      for (let e = 0, t; e < r.length; e++)
        if ((t = r[e]))
          for (let e = 0; e < n.length; e++)
            n[e].eq(t, o) &&
              (n = n == this.local ? this.local.slice() : n).splice(e--, 1);
    return t == this.children && n == this.local
      ? this
      : n.length || t.length
      ? new DecorationSet(n, t)
      : empty;
  }
  forChild(t, e) {
    if (this == empty) return this;
    if (e.isLeaf) return DecorationSet.empty;
    let n, r;
    for (let e = 0; e < this.children.length; e += 3)
      if (this.children[e] >= t) {
        this.children[e] == t && (n = this.children[e + 2]);
        break;
      }
    var o = t + 1,
      i = o + e.content.size;
    for (let e = 0; e < this.local.length; e++) {
      var a,
        s,
        l = this.local[e];
      l.from < i &&
        l.to > o &&
        l.type instanceof InlineType &&
        (a = Math.max(o, l.from) - o) < (s = Math.min(i, l.to) - o) &&
        (r = r || []).push(l.copy(a, s));
    }
    return r
      ? ((e = new DecorationSet(r.sort(byPos), none)),
        n ? new DecorationGroup([e, n]) : e)
      : n || empty;
  }
  eq(t) {
    if (this != t) {
      if (
        !(t instanceof DecorationSet) ||
        this.local.length != t.local.length ||
        this.children.length != t.children.length
      )
        return !1;
      for (let e = 0; e < this.local.length; e++)
        if (!this.local[e].eq(t.local[e])) return !1;
      for (let e = 0; e < this.children.length; e += 3)
        if (
          this.children[e] != t.children[e] ||
          this.children[e + 1] != t.children[e + 1] ||
          !this.children[e + 2].eq(t.children[e + 2])
        )
          return !1;
    }
    return !0;
  }
  locals(e) {
    return removeOverlap(this.localsInner(e));
  }
  localsInner(e) {
    if (this == empty) return none;
    if (e.inlineContent || !this.local.some(InlineType.is)) return this.local;
    var t = [];
    for (let e = 0; e < this.local.length; e++)
      this.local[e].type instanceof InlineType || t.push(this.local[e]);
    return t;
  }
}
(DecorationSet.empty = new DecorationSet([], [])),
  (DecorationSet.removeOverlap = removeOverlap);
const empty = DecorationSet.empty;
class DecorationGroup {
  constructor(e) {
    this.members = e;
  }
  map(t, n) {
    var e = this.members.map((e) => e.map(t, n, noSpec));
    return DecorationGroup.from(e);
  }
  forChild(t, n) {
    if (n.isLeaf) return DecorationSet.empty;
    let r = [];
    for (let e = 0; e < this.members.length; e++) {
      var o = this.members[e].forChild(t, n);
      o != empty &&
        (o instanceof DecorationGroup ? (r = r.concat(o.members)) : r.push(o));
    }
    return DecorationGroup.from(r);
  }
  eq(t) {
    if (
      !(t instanceof DecorationGroup) ||
      t.members.length != this.members.length
    )
      return !1;
    for (let e = 0; e < this.members.length; e++)
      if (!this.members[e].eq(t.members[e])) return !1;
    return !0;
  }
  locals(t) {
    let n,
      r = !0;
    for (let e = 0; e < this.members.length; e++) {
      var o = this.members[e].localsInner(t);
      if (o.length)
        if (n) {
          r && ((n = n.slice()), (r = !1));
          for (let e = 0; e < o.length; e++) n.push(o[e]);
        } else n = o;
    }
    return n ? removeOverlap(r ? n : n.sort(byPos)) : none;
  }
  static from(e) {
    switch (e.length) {
      case 0:
        return empty;
      case 1:
        return e[0];
      default:
        return new DecorationGroup(
          e.every((e) => e instanceof DecorationSet)
            ? e
            : e.reduce(
                (e, t) => e.concat(t instanceof DecorationSet ? t : t.members),
                []
              )
        );
    }
  }
}
function mapChildren(t, e, n, r, l, o, i) {
  let c = t.slice();
  for (let e = 0, s = o; e < n.maps.length; e++) {
    let a = 0;
    n.maps[e].forEach((t, n, r, e) => {
      var o = e - r - (n - t);
      for (let e = 0; e < c.length; e += 3) {
        var i = c[e + 1];
        i < 0 ||
          t > i + s - a ||
          ((i = c[e] + s - a) <= n
            ? (c[e + 1] = t <= i ? -2 : -1)
            : l <= r && o && ((c[e] += o), (c[e + 1] += o)));
      }
      a += o;
    }),
      (s = n.maps[e].map(s, -1));
  }
  let a = !1;
  for (let e = 0; e < c.length; e += 3)
    if (c[e + 1] < 0) {
      if (-2 == c[e + 1]) {
        (a = !0), (c[e + 1] = -1);
        continue;
      }
      var s = n.map(t[e] + o),
        u = s - l;
      if (u < 0 || u >= r.content.size) {
        a = !0;
        continue;
      }
      var d = n.map(t[e + 1] + o, -1) - l,
        { index: p, offset: f } = r.content.findIndex(u),
        p = r.maybeChild(p);
      p && f == u && f + p.nodeSize == d
        ? (f = c[e + 2].mapInner(n, p, s + 1, t[e] + o + 1, i)) != empty
          ? ((c[e] = u), (c[e + 1] = d), (c[e + 2] = f))
          : ((c[e + 1] = -2), (a = !0))
        : (a = !0);
    }
  if (a) {
    var h = buildTree(
      mapAndGatherRemainingDecorations(c, t, e, n, l, o, i),
      r,
      0,
      i
    );
    e = h.local;
    for (let e = 0; e < c.length; e += 3)
      c[e + 1] < 0 && (c.splice(e, 3), (e -= 3));
    for (let e = 0, t = 0; e < h.children.length; e += 3) {
      for (var m = h.children[e]; t < c.length && c[t] < m; ) t += 3;
      c.splice(t, 0, h.children[e], h.children[e + 1], h.children[e + 2]);
    }
  }
  return new DecorationSet(e.sort(byPos), c);
}
function moveSpans(t, n) {
  if (!n || !t.length) return t;
  var r = [];
  for (let e = 0; e < t.length; e++) {
    var o = t[e];
    r.push(new Decoration(o.from + n, o.to + n, o.type));
  }
  return r;
}
function mapAndGatherRemainingDecorations(t, n, i, a, s, r, l) {
  for (let e = 0; e < t.length; e += 3)
    -1 == t[e + 1] &&
      !(function t(n, r) {
        for (let e = 0; e < n.local.length; e++) {
          var o = n.local[e].map(a, s, r);
          o ? i.push(o) : l.onRemove && l.onRemove(n.local[e].spec);
        }
        for (let e = 0; e < n.children.length; e += 3)
          t(n.children[e + 2], n.children[e] + r + 1);
      })(t[e + 2], n[e] + r + 1);
  return i;
}
function takeSpansForNode(n, e, r) {
  if (e.isLeaf) return null;
  let o = r + e.nodeSize,
    i = null;
  for (let e = 0, t; e < n.length; e++)
    (t = n[e]) &&
      t.from > r &&
      t.to < o &&
      ((i = i || []).push(t), (n[e] = null));
  return i;
}
function withoutNulls(t) {
  var n = [];
  for (let e = 0; e < t.length; e++) null != t[e] && n.push(t[e]);
  return n;
}
function buildTree(r, t, o, i) {
  let a = [],
    s = !1;
  t.forEach((e, t) => {
    var n = takeSpansForNode(r, e, t + o);
    n &&
      ((s = !0), (n = buildTree(n, e, o + t + 1, i)) != empty) &&
      a.push(t, t + e.nodeSize, n);
  });
  var n = moveSpans(s ? withoutNulls(r) : r, -o).sort(byPos);
  for (let e = 0; e < n.length; e++)
    n[e].type.valid(t, n[e]) ||
      (i.onRemove && i.onRemove(n[e].spec), n.splice(e--, 1));
  return n.length || a.length ? new DecorationSet(n, a) : empty;
}
function byPos(e, t) {
  return e.from - t.from || e.to - t.to;
}
function removeOverlap(n) {
  let r = n;
  for (let t = 0; t < r.length - 1; t++) {
    var o = r[t];
    if (o.from != o.to)
      for (let e = t + 1; e < r.length; e++) {
        var i = r[e];
        if (i.from != o.from) {
          i.from < o.to &&
            (((r = r == n ? n.slice() : r)[t] = o.copy(o.from, i.from)),
            insertAhead(r, e, o.copy(i.from, o.to)));
          break;
        }
        i.to != o.to &&
          (((r = r == n ? n.slice() : r)[e] = i.copy(i.from, o.to)),
          insertAhead(r, e + 1, i.copy(o.to, i.to)));
      }
  }
  return r;
}
function insertAhead(e, t, n) {
  for (; t < e.length && 0 < byPos(n, e[t]); ) t++;
  e.splice(t, 0, n);
}
function viewDecorations(t) {
  let n = [];
  return (
    t.someProp('decorations', (e) => {
      e = e(t.state);
      e && e != empty && n.push(e);
    }),
    t.cursorWrapper &&
      n.push(DecorationSet.create(t.state.doc, [t.cursorWrapper.deco])),
    DecorationGroup.from(n)
  );
}
const observeOptions = {
    childList: !0,
    characterData: !0,
    characterDataOldValue: !0,
    attributes: !0,
    attributeOldValue: !0,
    subtree: !0,
  },
  useCharData = ie && ie_version <= 11;
class SelectionState {
  constructor() {
    (this.anchorNode = null),
      (this.anchorOffset = 0),
      (this.focusNode = null),
      (this.focusOffset = 0);
  }
  set(e) {
    (this.anchorNode = e.anchorNode),
      (this.anchorOffset = e.anchorOffset),
      (this.focusNode = e.focusNode),
      (this.focusOffset = e.focusOffset);
  }
  clear() {
    this.anchorNode = this.focusNode = null;
  }
  eq(e) {
    return (
      e.anchorNode == this.anchorNode &&
      e.anchorOffset == this.anchorOffset &&
      e.focusNode == this.focusNode &&
      e.focusOffset == this.focusOffset
    );
  }
}
class DOMObserver {
  constructor(e, t) {
    (this.view = e),
      (this.handleDOMChange = t),
      (this.queue = []),
      (this.flushingSoon = -1),
      (this.observer = null),
      (this.currentSelection = new SelectionState()),
      (this.onCharData = null),
      (this.suppressingSelectionUpdates = !1),
      (this.observer =
        window.MutationObserver &&
        new window.MutationObserver((t) => {
          for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
          ie &&
          ie_version <= 11 &&
          t.some(
            (e) =>
              ('childList' == e.type && e.removedNodes.length) ||
              ('characterData' == e.type &&
                e.oldValue.length > e.target.nodeValue.length)
          )
            ? this.flushSoon()
            : this.flush();
        })),
      useCharData &&
        (this.onCharData = (e) => {
          this.queue.push({
            target: e.target,
            type: 'characterData',
            oldValue: e.prevValue,
          }),
            this.flushSoon();
        }),
      (this.onSelectionChange = this.onSelectionChange.bind(this));
  }
  flushSoon() {
    this.flushingSoon < 0 &&
      (this.flushingSoon = window.setTimeout(() => {
        (this.flushingSoon = -1), this.flush();
      }, 20));
  }
  forceFlush() {
    -1 < this.flushingSoon &&
      (window.clearTimeout(this.flushingSoon),
      (this.flushingSoon = -1),
      this.flush());
  }
  start() {
    this.observer &&
      (this.observer.takeRecords(),
      this.observer.observe(this.view.dom, observeOptions)),
      this.onCharData &&
        this.view.dom.addEventListener(
          'DOMCharacterDataModified',
          this.onCharData
        ),
      this.connectSelection();
  }
  stop() {
    if (this.observer) {
      var t = this.observer.takeRecords();
      if (t.length) {
        for (let e = 0; e < t.length; e++) this.queue.push(t[e]);
        window.setTimeout(() => this.flush(), 20);
      }
      this.observer.disconnect();
    }
    this.onCharData &&
      this.view.dom.removeEventListener(
        'DOMCharacterDataModified',
        this.onCharData
      ),
      this.disconnectSelection();
  }
  connectSelection() {
    this.view.dom.ownerDocument.addEventListener(
      'selectionchange',
      this.onSelectionChange
    );
  }
  disconnectSelection() {
    this.view.dom.ownerDocument.removeEventListener(
      'selectionchange',
      this.onSelectionChange
    );
  }
  suppressSelectionUpdates() {
    (this.suppressingSelectionUpdates = !0),
      setTimeout(() => (this.suppressingSelectionUpdates = !1), 50);
  }
  onSelectionChange() {
    if (hasFocusAndSelection(this.view)) {
      if (this.suppressingSelectionUpdates) return selectionToDOM(this.view);
      if (ie && ie_version <= 11 && !this.view.state.selection.empty) {
        var e = this.view.domSelectionRange();
        if (
          e.focusNode &&
          isEquivalentPosition(
            e.focusNode,
            e.focusOffset,
            e.anchorNode,
            e.anchorOffset
          )
        )
          return this.flushSoon();
      }
      this.flush();
    }
  }
  setCurSelection() {
    this.currentSelection.set(this.view.domSelectionRange());
  }
  ignoreSelectionChange(t) {
    if (!t.focusNode) return !0;
    let n = new Set(),
      r;
    for (let e = t.focusNode; e; e = parentNode(e)) n.add(e);
    for (let e = t.anchorNode; e; e = parentNode(e))
      if (n.has(e)) {
        r = e;
        break;
      }
    t = r && this.view.docView.nearestDesc(r);
    return t &&
      t.ignoreMutation({
        type: 'selection',
        target: 3 == r.nodeType ? r.parentNode : r,
      })
      ? (this.setCurSelection(), !0)
      : void 0;
  }
  pendingRecords() {
    if (this.observer)
      for (var e of this.observer.takeRecords()) this.queue.push(e);
    return this.queue;
  }
  flush() {
    var i = this['view'];
    if (i.docView && !(-1 < this.flushingSoon)) {
      var a,
        s,
        l = this.pendingRecords(),
        c = (l.length && (this.queue = []), i.domSelectionRange()),
        u =
          !this.suppressingSelectionUpdates &&
          !this.currentSelection.eq(c) &&
          hasFocusAndSelection(i) &&
          !this.ignoreSelectionChange(c);
      let t = -1,
        n = -1,
        r = !1,
        o = [];
      if (i.editable)
        for (let e = 0; e < l.length; e++) {
          var d = this.registerMutation(l[e], o);
          d &&
            ((t = t < 0 ? d.from : Math.min(d.from, t)),
            (n = n < 0 ? d.to : Math.max(d.to, n)),
            d.typeOver) &&
            (r = !0);
        }
      gecko &&
        1 < o.length &&
        2 == (s = o.filter((e) => 'BR' == e.nodeName)).length &&
        ((a = s[0]),
        (s = s[1]),
        (a.parentNode && a.parentNode.parentNode == s.parentNode
          ? s
          : a
        ).remove());
      let e = null;
      t < 0 &&
      u &&
      i.input.lastFocus > Date.now() - 200 &&
      Math.max(i.input.lastTouch, i.input.lastClick.time) < Date.now() - 300 &&
      selectionCollapsed(c) &&
      (e = selectionFromDOM(i)) &&
      e.eq(Selection.near(i.state.doc.resolve(0), 1))
        ? ((i.input.lastFocus = 0),
          selectionToDOM(i),
          this.currentSelection.set(c),
          i.scrollToSelection())
        : (-1 < t || u) &&
          (-1 < t && (i.docView.markDirty(t, n), checkCSS(i)),
          this.handleDOMChange(t, n, r, o),
          i.docView && i.docView.dirty
            ? i.updateState(i.state)
            : this.currentSelection.eq(c) || selectionToDOM(i),
          this.currentSelection.set(c));
    }
  }
  registerMutation(r, o) {
    if (-1 < o.indexOf(r.target)) return null;
    var e = this.view.docView.nearestDesc(r.target);
    if (
      'attributes' == r.type &&
      (e == this.view.docView ||
        'contenteditable' == r.attributeName ||
        ('style' == r.attributeName &&
          !r.oldValue &&
          !r.target.getAttribute('style')))
    )
      return null;
    if (!e || e.ignoreMutation(r)) return null;
    if ('childList' != r.type)
      return 'attributes' == r.type
        ? { from: e.posAtStart - e.border, to: e.posAtEnd + e.border }
        : {
            from: e.posAtStart,
            to: e.posAtEnd,
            typeOver: r.target.nodeValue == r.oldValue,
          };
    {
      for (let e = 0; e < r.addedNodes.length; e++) o.push(r.addedNodes[e]);
      if (
        e.contentDOM &&
        e.contentDOM != e.dom &&
        !e.contentDOM.contains(r.target)
      )
        return { from: e.posBefore, to: e.posAfter };
      let t = r.previousSibling,
        n = r.nextSibling;
      if (ie && ie_version <= 11 && r.addedNodes.length)
        for (let e = 0; e < r.addedNodes.length; e++) {
          var { previousSibling: i, nextSibling: a } = r.addedNodes[e];
          (!i || Array.prototype.indexOf.call(r.addedNodes, i) < 0) && (t = i),
            (!a || Array.prototype.indexOf.call(r.addedNodes, a) < 0) &&
              (n = a);
        }
      var s = t && t.parentNode == r.target ? domIndex(t) + 1 : 0,
        s = e.localPosFromDOM(r.target, s, -1),
        l =
          n && n.parentNode == r.target
            ? domIndex(n)
            : r.target.childNodes.length;
      return { from: s, to: e.localPosFromDOM(r.target, l, 1) };
    }
  }
}
let cssChecked = new WeakMap(),
  cssCheckWarned = !1;
function checkCSS(e) {
  cssChecked.has(e) ||
    (cssChecked.set(e, null),
    -1 !==
      ['normal', 'nowrap', 'pre-line'].indexOf(
        getComputedStyle(e.dom).whiteSpace
      ) &&
      ((e.requiresGeckoHackNode = gecko),
      cssCheckWarned ||
        (console.warn(
          "ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."
        ),
        (cssCheckWarned = !0))));
}
function safariShadowSelectionRange(e) {
  let t;
  function n(e) {
    e.preventDefault(),
      e.stopImmediatePropagation(),
      (t = e.getTargetRanges()[0]);
  }
  e.dom.addEventListener('beforeinput', n, !0),
    document.execCommand('indent'),
    e.dom.removeEventListener('beforeinput', n, !0);
  let r = t.startContainer,
    o = t.startOffset,
    i = t.endContainer,
    a = t.endOffset;
  e = e.domAtPos(e.state.selection.anchor);
  return (
    isEquivalentPosition(e.node, e.offset, i, a) &&
      ([r, o, i, a] = [i, a, r, o]),
    { anchorNode: r, anchorOffset: o, focusNode: i, focusOffset: a }
  );
}
function parseBetween(e, t, n) {
  let {
    node: r,
    fromOffset: o,
    toOffset: i,
    from: a,
    to: s,
  } = e.docView.parseRange(t, n);
  t = e.domSelectionRange();
  let l;
  n = t.anchorNode;
  if (
    (n &&
      e.dom.contains(1 == n.nodeType ? n : n.parentNode) &&
      ((l = [{ node: n, offset: t.anchorOffset }]),
      selectionCollapsed(t) ||
        l.push({ node: t.focusNode, offset: t.focusOffset })),
    chrome && 8 === e.input.lastKeyCode)
  )
    for (let e = i; e > o; e--) {
      var c = r.childNodes[e - 1],
        u = c.pmViewDesc;
      if ('BR' == c.nodeName && !u) {
        i = e;
        break;
      }
      if (!u || u.size) break;
    }
  (n = e.state.doc),
    (t = e.someProp('domParser') || DOMParser$1.fromSchema(e.state.schema)),
    (e = n.resolve(a));
  let d = null,
    p = t.parse(r, {
      topNode: e.parent,
      topMatch: e.parent.contentMatchAt(e.index()),
      topOpen: !0,
      from: o,
      to: i,
      preserveWhitespace: 'pre' != e.parent.type.whitespace || 'full',
      findPositions: l,
      ruleFromNode: ruleFromNode,
      context: e,
    });
  if (l && null != l[0].pos) {
    let e = l[0].pos,
      t = l[1] && l[1].pos;
    null == t && (t = e), (d = { anchor: e + a, head: t + a });
  }
  return { doc: p, sel: d, from: a, to: s };
}
function ruleFromNode(e) {
  var t = e.pmViewDesc;
  if (t) return t.parseRule();
  if ('BR' == e.nodeName && e.parentNode) {
    if (safari && /^(ul|ol)$/i.test(e.parentNode.nodeName))
      return (
        (t = document.createElement('div')).appendChild(
          document.createElement('li')
        ),
        { skip: t }
      );
    if (
      e.parentNode.lastChild == e ||
      (safari && /^(tr|table)$/i.test(e.parentNode.nodeName))
    )
      return { ignore: !0 };
  } else if ('IMG' == e.nodeName && e.getAttribute('mark-placeholder'))
    return { ignore: !0 };
  return null;
}
const isInline =
  /^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i;
function readDOMChange(s, l, c, u, d) {
  var p =
    s.input.compositionPendingChanges ||
    (s.composing ? s.input.compositionID : 0);
  if (l < (s.input.compositionPendingChanges = 0)) {
    var f =
        s.input.lastSelectionTime > Date.now() - 50
          ? s.input.lastSelectionOrigin
          : null,
      h = selectionFromDOM(s, f);
    if (h && !s.state.selection.eq(h)) {
      if (
        chrome &&
        android &&
        13 === s.input.lastKeyCode &&
        Date.now() - 100 < s.input.lastKeyCodeTime &&
        s.someProp('handleKeyDown', (e) => e(s, keyEvent(13, 'Enter')))
      )
        return;
      h = s.state.tr.setSelection(h);
      'pointer' == f
        ? h.setMeta('pointer', !0)
        : 'key' == f && h.scrollIntoView(),
        p && h.setMeta('composition', p),
        s.dispatch(h);
    }
  } else {
    var f = s.state.doc.resolve(l),
      h = f.sharedDepth(c),
      f =
        ((l = f.before(h + 1)),
        (c = s.state.doc.resolve(c).after(h + 1)),
        s.state.selection),
      h = parseBetween(s, l, c),
      l = s.state.doc,
      c = l.slice(h.from, h.to);
    let e,
      t,
      a =
        ((t =
          8 === s.input.lastKeyCode &&
          Date.now() - 100 < s.input.lastKeyCodeTime
            ? ((e = s.state.selection.to), 'end')
            : ((e = s.state.selection.from), 'start')),
        (s.input.lastKeyCode = null),
        findDiff(c.content, h.doc.content, h.from, e, t));
    if (
      ((ios && s.input.lastIOSEnter > Date.now() - 225) || android) &&
      d.some((e) => 1 == e.nodeType && !isInline.test(e.nodeName)) &&
      (!a || a.endA >= a.endB) &&
      s.someProp('handleKeyDown', (e) => e(s, keyEvent(13, 'Enter')))
    )
      s.input.lastIOSEnter = 0;
    else {
      if (!a) {
        if (
          !(
            u &&
            f instanceof TextSelection &&
            !f.empty &&
            f.$head.sameParent(f.$anchor)
          ) ||
          s.composing ||
          (h.sel && h.sel.anchor != h.sel.head)
        )
          return void (
            h.sel &&
            (c = resolveSelection(s, s.state.doc, h.sel)) &&
            !c.eq(s.state.selection) &&
            ((u = s.state.tr.setSelection(c)),
            p && u.setMeta('composition', p),
            s.dispatch(u))
          );
        a = { start: f.from, endA: f.to, endB: f.to };
      }
      chrome &&
        s.cursorWrapper &&
        h.sel &&
        h.sel.anchor == s.cursorWrapper.deco.from &&
        h.sel.head == h.sel.anchor &&
        ((c = a.endB - a.start),
        (h.sel = { anchor: h.sel.anchor + c, head: h.sel.anchor + c })),
        s.input.domChangeCount++,
        s.state.selection.from < s.state.selection.to &&
          a.start == a.endB &&
          s.state.selection instanceof TextSelection &&
          (a.start > s.state.selection.from &&
          a.start <= s.state.selection.from + 2 &&
          s.state.selection.from >= h.from
            ? (a.start = s.state.selection.from)
            : a.endA < s.state.selection.to &&
              a.endA >= s.state.selection.to - 2 &&
              s.state.selection.to <= h.to &&
              ((a.endB += s.state.selection.to - a.endA),
              (a.endA = s.state.selection.to))),
        ie &&
          ie_version <= 11 &&
          a.endB == a.start + 1 &&
          a.endA == a.start &&
          a.start > h.from &&
          '  ' ==
            h.doc.textBetween(a.start - h.from - 1, a.start - h.from + 1) &&
          (a.start--, a.endA--, a.endB--);
      u = h.doc.resolveNoCache(a.start - h.from);
      let i = h.doc.resolveNoCache(a.endB - h.from);
      (f = l.resolve(a.start)),
        (c = u.sameParent(i) && u.parent.inlineContent && f.end() >= a.endA);
      let e;
      if (
        ((ios &&
          s.input.lastIOSEnter > Date.now() - 225 &&
          (!c || d.some((e) => 'DIV' == e.nodeName || 'P' == e.nodeName))) ||
          (!c &&
            u.pos < h.doc.content.size &&
            !u.sameParent(i) &&
            (e = Selection.findFrom(h.doc.resolve(u.pos + 1), 1, !0)) &&
            e.head == i.pos)) &&
        s.someProp('handleKeyDown', (e) => e(s, keyEvent(13, 'Enter')))
      )
        s.input.lastIOSEnter = 0;
      else if (
        s.state.selection.anchor > a.start &&
        looksLikeJoin(l, a.start, a.endA, u, i) &&
        s.someProp('handleKeyDown', (e) => e(s, keyEvent(8, 'Backspace')))
      )
        android && chrome && s.domObserver.suppressSelectionUpdates();
      else {
        chrome &&
          android &&
          a.endB == a.start &&
          (s.input.lastAndroidDelete = Date.now()),
          android &&
            !c &&
            u.start() != i.start() &&
            0 == i.parentOffset &&
            u.depth == i.depth &&
            h.sel &&
            h.sel.anchor == h.sel.head &&
            h.sel.head == a.endA &&
            ((a.endB -= 2),
            (i = h.doc.resolveNoCache(a.endB - h.from)),
            setTimeout(() => {
              s.someProp('handleKeyDown', function (e) {
                return e(s, keyEvent(13, 'Enter'));
              });
            }, 20));
        let n = a.start,
          r = a.endA,
          e,
          t,
          o;
        if (c)
          if (u.pos == i.pos)
            ie &&
              ie_version <= 11 &&
              0 == u.parentOffset &&
              (s.domObserver.suppressSelectionUpdates(),
              setTimeout(() => selectionToDOM(s), 20)),
              (e = s.state.tr.delete(n, r)),
              (t = l.resolve(a.start).marksAcross(l.resolve(a.endA)));
          else if (
            a.endA == a.endB &&
            (o = isMarkChange(
              u.parent.content.cut(u.parentOffset, i.parentOffset),
              f.parent.content.cut(f.parentOffset, a.endA - f.start())
            ))
          )
            (e = s.state.tr),
              'add' == o.type
                ? e.addMark(n, r, o.mark)
                : e.removeMark(n, r, o.mark);
          else if (
            u.parent.child(u.index()).isText &&
            u.index() == i.index() - (i.textOffset ? 0 : 1)
          ) {
            let t = u.parent.textBetween(u.parentOffset, i.parentOffset);
            if (s.someProp('handleTextInput', (e) => e(s, n, r, t))) return;
            e = s.state.tr.insertText(t, n, r);
          }
        (e =
          e ||
          s.state.tr.replace(
            n,
            r,
            h.doc.slice(a.start - h.from, a.endB - h.from)
          )),
          h.sel &&
            (d = resolveSelection(s, e.doc, h.sel)) &&
            !(
              (chrome &&
                android &&
                s.composing &&
                d.empty &&
                (a.start != a.endB ||
                  s.input.lastAndroidDelete < Date.now() - 100) &&
                (d.head == n || d.head == e.mapping.map(r) - 1)) ||
              (ie && d.empty && d.head == n)
            ) &&
            e.setSelection(d),
          t && e.ensureMarks(t),
          p && e.setMeta('composition', p),
          s.dispatch(e.scrollIntoView());
      }
    }
  }
}
function resolveSelection(e, t, n) {
  return Math.max(n.anchor, n.head) > t.content.size
    ? null
    : selectionBetween(e, t.resolve(n.anchor), t.resolve(n.head));
}
function isMarkChange(e, t) {
  var n = e.firstChild.marks,
    r = t.firstChild.marks;
  let o = n,
    i = r,
    a,
    s,
    l;
  for (let e = 0; e < r.length; e++) o = r[e].removeFromSet(o);
  for (let e = 0; e < n.length; e++) i = n[e].removeFromSet(i);
  if (1 == o.length && 0 == i.length)
    (s = o[0]), (a = 'add'), (l = (e) => e.mark(s.addToSet(e.marks)));
  else {
    if (0 != o.length || 1 != i.length) return null;
    (s = i[0]), (a = 'remove'), (l = (e) => e.mark(s.removeFromSet(e.marks)));
  }
  var c = [];
  for (let e = 0; e < t.childCount; e++) c.push(l(t.child(e)));
  if (Fragment.from(c).eq(e)) return { mark: s, type: a };
}
function looksLikeJoin(e, t, n, r, o) {
  var i;
  return (
    !(
      !r.parent.isTextblock ||
      n - t <= o.pos - r.pos ||
      skipClosingAndOpening(r, !0, !1) < o.pos ||
      (o = e.resolve(t)).parentOffset < o.parent.content.size ||
      !o.parent.isTextblock ||
      !(i = e.resolve(skipClosingAndOpening(o, !0, !0))).parent.isTextblock ||
      i.pos > n ||
      skipClosingAndOpening(i, !0, !1) < n
    ) && r.parent.content.cut(r.parentOffset).eq(i.parent.content)
  );
}
function skipClosingAndOpening(t, e, n) {
  let r = t.depth,
    o = e ? t.end() : t.pos;
  for (; 0 < r && (e || t.indexAfter(r) == t.node(r).childCount); )
    r--, o++, (e = !1);
  if (n) {
    let e = t.node(r).maybeChild(t.indexAfter(r));
    for (; e && !e.isLeaf; ) (e = e.firstChild), o++;
  }
  return o;
}
function findDiff(e, t, n, r, o) {
  let i = e.findDiffStart(t, n);
  if (null == i) return null;
  let { a, b: s } = e.findDiffEnd(t, n + e.size, n + t.size);
  return (
    'end' == o && ((n = Math.max(0, i - Math.min(a, s))), (r -= a + n - i)),
    a < i && e.size < t.size
      ? ((o = r <= i && r >= a ? i - r : 0),
        (i -= o),
        (s = i + (s - a)),
        (a = i))
      : s < i &&
        ((n = r <= i && r >= s ? i - r : 0),
        (i -= n),
        (a = i + (a - s)),
        (s = i)),
    { start: i, endA: a, endB: s }
  );
}
class EditorView {
  constructor(e, t) {
    (this._root = null),
      (this.focused = !1),
      (this.trackWrites = null),
      (this.mounted = !1),
      (this.markCursor = null),
      (this.cursorWrapper = null),
      (this.lastSelectedViewDesc = void 0),
      (this.input = new InputState()),
      (this.prevDirectPlugins = []),
      (this.pluginViews = []),
      (this.requiresGeckoHackNode = !1),
      (this.dragging = null),
      (this._props = t),
      (this.state = t.state),
      (this.directPlugins = t.plugins || []),
      this.directPlugins.forEach(checkStateComponent),
      (this.dispatch = this.dispatch.bind(this)),
      (this.dom = (e && e.mount) || document.createElement('div')),
      e &&
        (e.appendChild
          ? e.appendChild(this.dom)
          : 'function' == typeof e
          ? e(this.dom)
          : e.mount && (this.mounted = !0)),
      (this.editable = getEditable(this)),
      updateCursorWrapper(this),
      (this.nodeViews = buildNodeViews(this)),
      (this.docView = docViewDesc(
        this.state.doc,
        computeDocDeco(this),
        viewDecorations(this),
        this.dom,
        this
      )),
      (this.domObserver = new DOMObserver(this, (e, t, n, r) =>
        readDOMChange(this, e, t, n, r)
      )),
      this.domObserver.start(),
      initInput(this),
      this.updatePluginViews();
  }
  get composing() {
    return this.input.composing;
  }
  get props() {
    if (this._props.state != this.state) {
      var e,
        t = this._props;
      for (e in ((this._props = {}), t)) this._props[e] = t[e];
      this._props.state = this.state;
    }
    return this._props;
  }
  update(e) {
    e.handleDOMEvents != this._props.handleDOMEvents && ensureListeners(this);
    var t = this._props;
    (this._props = e).plugins &&
      (e.plugins.forEach(checkStateComponent),
      (this.directPlugins = e.plugins)),
      this.updateStateInner(e.state, t);
  }
  setProps(e) {
    var t,
      n,
      r = {};
    for (t in this._props) r[t] = this._props[t];
    for (n in ((r.state = this.state), e)) r[n] = e[n];
    this.update(r);
  }
  updateState(e) {
    this.updateStateInner(e, this._props);
  }
  updateStateInner(t, e) {
    let n = this.state,
      r = !1,
      o = !1;
    t.storedMarks && this.composing && (clearComposition(this), (o = !0)),
      (this.state = t);
    var i = n.plugins != t.plugins || this._props.plugins != e.plugins,
      a =
        ((i ||
          this._props.plugins != e.plugins ||
          this._props.nodeViews != e.nodeViews) &&
          changedNodeViews((a = buildNodeViews(this)), this.nodeViews) &&
          ((this.nodeViews = a), (r = !0)),
        (!i && e.handleDOMEvents == this._props.handleDOMEvents) ||
          ensureListeners(this),
        (this.editable = getEditable(this)),
        updateCursorWrapper(this),
        viewDecorations(this)),
      i = computeDocDeco(this),
      e =
        n.plugins == t.plugins || n.doc.eq(t.doc)
          ? t.scrollToSelection > n.scrollToSelection
            ? 'to selection'
            : 'preserve'
          : 'reset',
      s = r || !this.docView.matchesNode(t.doc, i, a),
      l =
        ((!s && t.selection.eq(n.selection)) || (o = !0),
        'preserve' == e &&
          o &&
          null == this.dom.style.overflowAnchor &&
          storeScrollPos(this));
    if (o) {
      this.domObserver.stop();
      let e =
        s &&
        (ie || chrome) &&
        !this.composing &&
        !n.selection.empty &&
        !t.selection.empty &&
        selectionContextChanged(n.selection, t.selection);
      (e =
        s &&
        ((s = chrome
          ? (this.trackWrites = this.domSelectionRange().focusNode)
          : null),
        (!r && this.docView.update(t.doc, i, a, this)) ||
          (this.docView.updateOuterDeco([]),
          this.docView.destroy(),
          (this.docView = docViewDesc(t.doc, i, a, this.dom, this))),
        s) &&
        !this.trackWrites
          ? !0
          : e) ||
      !(
        this.input.mouseDown &&
        this.domObserver.currentSelection.eq(this.domSelectionRange()) &&
        anchorInRightPlace(this)
      )
        ? selectionToDOM(this, e)
        : (syncNodeSelection(this, t.selection),
          this.domObserver.setCurSelection()),
        this.domObserver.start();
    }
    this.updatePluginViews(n),
      'reset' == e
        ? (this.dom.scrollTop = 0)
        : 'to selection' == e
        ? this.scrollToSelection()
        : l && resetScrollPos(l);
  }
  scrollToSelection() {
    var e,
      t = this.domSelectionRange().focusNode;
    this.someProp('handleScrollToSelection', (e) => e(this)) ||
      (this.state.selection instanceof NodeSelection
        ? 1 ==
            (e = this.docView.domAfterPos(this.state.selection.from))
              .nodeType &&
          scrollRectIntoView(this, e.getBoundingClientRect(), t)
        : scrollRectIntoView(
            this,
            this.coordsAtPos(this.state.selection.head, 1),
            t
          ));
  }
  destroyPluginViews() {
    for (var e; (e = this.pluginViews.pop()); ) e.destroy && e.destroy();
  }
  updatePluginViews(t) {
    if (
      t &&
      t.plugins == this.state.plugins &&
      this.directPlugins == this.prevDirectPlugins
    )
      for (let e = 0; e < this.pluginViews.length; e++) {
        var n = this.pluginViews[e];
        n.update && n.update(this, t);
      }
    else {
      (this.prevDirectPlugins = this.directPlugins), this.destroyPluginViews();
      for (let e = 0; e < this.directPlugins.length; e++) {
        var r = this.directPlugins[e];
        r.spec.view && this.pluginViews.push(r.spec.view(this));
      }
      for (let e = 0; e < this.state.plugins.length; e++) {
        var o = this.state.plugins[e];
        o.spec.view && this.pluginViews.push(o.spec.view(this));
      }
    }
  }
  someProp(t, n) {
    let e = this._props && this._props[t],
      r;
    if (null != e && (r = n ? n(e) : e)) return r;
    for (let e = 0; e < this.directPlugins.length; e++) {
      var o = this.directPlugins[e].props[t];
      if (null != o && (r = n ? n(o) : o)) return r;
    }
    var i = this.state.plugins;
    if (i)
      for (let e = 0; e < i.length; e++) {
        var a = i[e].props[t];
        if (null != a && (r = n ? n(a) : a)) return r;
      }
  }
  hasFocus() {
    if (ie) {
      let e = this.root.activeElement;
      if (e != this.dom) {
        if (!e || !this.dom.contains(e)) return !1;
        for (; e && this.dom != e && this.dom.contains(e); ) {
          if ('false' == e.contentEditable) return !1;
          e = e.parentElement;
        }
      }
      return !0;
    }
    return this.root.activeElement == this.dom;
  }
  focus() {
    this.domObserver.stop(),
      this.editable && focusPreventScroll(this.dom),
      selectionToDOM(this),
      this.domObserver.start();
  }
  get root() {
    var e = this._root;
    if (null == e)
      for (let e = this.dom.parentNode; e; e = e.parentNode)
        if (9 == e.nodeType || (11 == e.nodeType && e.host))
          return (
            e.getSelection ||
              (Object.getPrototypeOf(e).getSelection = () =>
                e.ownerDocument.getSelection()),
            (this._root = e)
          );
    return e || document;
  }
  posAtCoords(e) {
    return posAtCoords(this, e);
  }
  coordsAtPos(e, t = 1) {
    return coordsAtPos(this, e, t);
  }
  domAtPos(e, t = 0) {
    return this.docView.domFromPos(e, t);
  }
  nodeDOM(e) {
    e = this.docView.descAt(e);
    return e ? e.nodeDOM : null;
  }
  posAtDOM(e, t, n = -1) {
    e = this.docView.posFromDOM(e, t, n);
    if (null == e) throw new RangeError('DOM position not inside the editor');
    return e;
  }
  endOfTextblock(e, t) {
    return endOfTextblock(this, t || this.state, e);
  }
  pasteHTML(e, t) {
    return doPaste(this, '', e, !1, t || new ClipboardEvent('paste'));
  }
  pasteText(e, t) {
    return doPaste(this, e, null, !0, t || new ClipboardEvent('paste'));
  }
  destroy() {
    this.docView &&
      (destroyInput(this),
      this.destroyPluginViews(),
      this.mounted
        ? (this.docView.update(this.state.doc, [], viewDecorations(this), this),
          (this.dom.textContent = ''))
        : this.dom.parentNode && this.dom.parentNode.removeChild(this.dom),
      this.docView.destroy(),
      (this.docView = null));
  }
  get isDestroyed() {
    return null == this.docView;
  }
  dispatchEvent(e) {
    return dispatchEvent(this, e);
  }
  dispatch(e) {
    var t = this._props.dispatchTransaction;
    t ? t.call(this, e) : this.updateState(this.state.apply(e));
  }
  domSelectionRange() {
    return safari &&
      11 === this.root.nodeType &&
      deepActiveElement(this.dom.ownerDocument) == this.dom
      ? safariShadowSelectionRange(this)
      : this.domSelection();
  }
  domSelection() {
    return this.root.getSelection();
  }
}
function computeDocDeco(n) {
  let r = Object.create(null);
  return (
    (r.class = 'ProseMirror'),
    (r.contenteditable = String(n.editable)),
    n.someProp('attributes', (e) => {
      if ((e = 'function' == typeof e ? e(n.state) : e))
        for (var t in e)
          'class' == t
            ? (r.class += ' ' + e[t])
            : 'style' == t
            ? (r.style = (r.style ? r.style + ';' : '') + e[t])
            : r[t] ||
              'contenteditable' == t ||
              'nodeName' == t ||
              (r[t] = String(e[t]));
    }),
    r.translate || (r.translate = 'no'),
    [Decoration.node(0, n.state.doc.content.size, r)]
  );
}
function updateCursorWrapper(e) {
  var t;
  e.markCursor
    ? (((t = document.createElement('img')).className =
        'ProseMirror-separator'),
      t.setAttribute('mark-placeholder', 'true'),
      t.setAttribute('alt', ''),
      (e.cursorWrapper = {
        dom: t,
        deco: Decoration.widget(e.state.selection.head, t, {
          raw: !0,
          marks: e.markCursor,
        }),
      }))
    : (e.cursorWrapper = null);
}
function getEditable(t) {
  return !t.someProp('editable', (e) => !1 === e(t.state));
}
function selectionContextChanged(e, t) {
  var n = Math.min(
    e.$anchor.sharedDepth(e.head),
    t.$anchor.sharedDepth(t.head)
  );
  return e.$anchor.start(n) != t.$anchor.start(n);
}
function buildNodeViews(e) {
  let n = Object.create(null);
  function t(e) {
    for (var t in e)
      Object.prototype.hasOwnProperty.call(n, t) || (n[t] = e[t]);
  }
  return e.someProp('nodeViews', t), e.someProp('markViews', t), n;
}
function changedNodeViews(e, t) {
  let n = 0,
    r = 0;
  for (var o in e) {
    if (e[o] != t[o]) return !0;
    n++;
  }
  for (var i in t) r++;
  return n != r;
}
function checkStateComponent(e) {
  if (e.spec.state || e.spec.filterTransaction || e.spec.appendTransaction)
    throw new RangeError(
      'Plugins passed directly to the view must not have a state component'
    );
}
class GapCursor extends Selection {
  constructor(e) {
    super(e, e);
  }
  map(e, t) {
    e = e.resolve(t.map(this.head));
    return GapCursor.valid(e) ? new GapCursor(e) : Selection.near(e);
  }
  content() {
    return Slice.empty;
  }
  eq(e) {
    return e instanceof GapCursor && e.head == this.head;
  }
  toJSON() {
    return { type: 'gapcursor', pos: this.head };
  }
  static fromJSON(e, t) {
    if ('number' != typeof t.pos)
      throw new RangeError('Invalid input for GapCursor.fromJSON');
    return new GapCursor(e.resolve(t.pos));
  }
  getBookmark() {
    return new GapBookmark(this.anchor);
  }
  static valid(e) {
    var t,
      n = e.parent;
    return (
      !(n.isTextblock || !closedBefore(e) || !closedAfter(e)) &&
      (null != (t = n.type.spec.allowGapCursor)
        ? t
        : (t = n.contentMatchAt(e.index()).defaultType) && t.isTextblock)
    );
  }
  static findGapCursorFrom(r, o, e = !1) {
    e: for (;;) {
      if (!e && GapCursor.valid(r)) return r;
      let t = r.pos,
        n = null;
      for (let e = r.depth; ; e--) {
        var i = r.node(e);
        if (0 < o ? r.indexAfter(e) < i.childCount : 0 < r.index(e)) {
          n = i.child(0 < o ? r.indexAfter(e) : r.index(e) - 1);
          break;
        }
        if (0 == e) return null;
        t += o;
        i = r.doc.resolve(t);
        if (GapCursor.valid(i)) return i;
      }
      for (;;) {
        var a = 0 < o ? n.firstChild : n.lastChild;
        if (!a) {
          if (!n.isAtom || n.isText || NodeSelection.isSelectable(n)) break;
          (r = r.doc.resolve(t + n.nodeSize * o)), (e = !1);
          continue e;
        }
        (n = a), (t += o);
        a = r.doc.resolve(t);
        if (GapCursor.valid(a)) return a;
      }
      return null;
    }
  }
}
(GapCursor.prototype.visible = !1),
  (GapCursor.findFrom = GapCursor.findGapCursorFrom),
  Selection.jsonID('gapcursor', GapCursor);
class GapBookmark {
  constructor(e) {
    this.pos = e;
  }
  map(e) {
    return new GapBookmark(e.map(this.pos));
  }
  resolve(e) {
    e = e.resolve(this.pos);
    return GapCursor.valid(e) ? new GapCursor(e) : Selection.near(e);
  }
}
function closedBefore(t) {
  for (let e = t.depth; 0 <= e; e--) {
    var n = t.index(e),
      r = t.node(e);
    if (0 == n) {
      if (r.type.spec.isolating) return !0;
    } else
      for (let e = r.child(n - 1); ; e = e.lastChild) {
        if (
          (0 == e.childCount && !e.inlineContent) ||
          e.isAtom ||
          e.type.spec.isolating
        )
          return !0;
        if (e.inlineContent) return !1;
      }
  }
  return !0;
}
function closedAfter(t) {
  for (let e = t.depth; 0 <= e; e--) {
    var n = t.indexAfter(e),
      r = t.node(e);
    if (n == r.childCount) {
      if (r.type.spec.isolating) return !0;
    } else
      for (let e = r.child(n); ; e = e.firstChild) {
        if (
          (0 == e.childCount && !e.inlineContent) ||
          e.isAtom ||
          e.type.spec.isolating
        )
          return !0;
        if (e.inlineContent) return !1;
      }
  }
  return !0;
}
function gapCursor() {
  return new Plugin({
    props: {
      decorations: drawGapCursor,
      createSelectionBetween(e, t, n) {
        return t.pos == n.pos && GapCursor.valid(n) ? new GapCursor(n) : null;
      },
      handleClick: handleClick,
      handleKeyDown: handleKeyDown,
      handleDOMEvents: { beforeinput: beforeinput },
    },
  });
}
const handleKeyDown = keydownHandler$1({
  ArrowLeft: arrow('horiz', -1),
  ArrowRight: arrow('horiz', 1),
  ArrowUp: arrow('vert', -1),
  ArrowDown: arrow('vert', 1),
});
function arrow(e, a) {
  const s = 'vert' == e ? (0 < a ? 'down' : 'up') : 0 < a ? 'right' : 'left';
  return function (e, t, n) {
    var r = e.selection;
    let o = 0 < a ? r.$to : r.$from,
      i = r.empty;
    if (r instanceof TextSelection) {
      if (!n.endOfTextblock(s) || 0 == o.depth) return !1;
      (i = !1), (o = e.doc.resolve(0 < a ? o.after() : o.before()));
    }
    r = GapCursor.findGapCursorFrom(o, a, i);
    return !!r && (t && t(e.tr.setSelection(new GapCursor(r))), !0);
  };
}
function handleClick(e, t, n) {
  return !(
    !e ||
    !e.editable ||
    ((t = e.state.doc.resolve(t)), !GapCursor.valid(t)) ||
    ((n = e.posAtCoords({ left: n.clientX, top: n.clientY })) &&
      -1 < n.inside &&
      NodeSelection.isSelectable(e.state.doc.nodeAt(n.inside))) ||
    (e.dispatch(e.state.tr.setSelection(new GapCursor(t))), 0)
  );
}
function beforeinput(e, n) {
  if (
    'insertCompositionText' == n.inputType &&
    e.state.selection instanceof GapCursor
  ) {
    var n = e.state.selection['$from'],
      r = n.parent
        .contentMatchAt(n.index())
        .findWrapping(e.state.schema.nodes.text);
    if (r) {
      let t = Fragment.empty;
      for (let e = r.length - 1; 0 <= e; e--)
        t = Fragment.from(r[e].createAndFill(null, t));
      var o = e.state.tr.replace(n.pos, n.pos, new Slice(t, 0, 0));
      o.setSelection(TextSelection.near(o.doc.resolve(n.pos + 1))),
        e.dispatch(o);
    }
  }
  return !1;
}
function drawGapCursor(e) {
  var t;
  return e.selection instanceof GapCursor
    ? (((t = document.createElement('div')).className =
        'ProseMirror-gapcursor'),
      DecorationSet.create(e.doc, [
        Decoration.widget(e.selection.head, t, { key: 'gapcursor' }),
      ]))
    : null;
}
var GOOD_LEAF_SIZE = 200,
  RopeSequence = function () {},
  Leaf =
    ((RopeSequence.prototype.append = function (e) {
      return e.length
        ? ((e = RopeSequence.from(e)),
          (!this.length && e) ||
            (e.length < GOOD_LEAF_SIZE && this.leafAppend(e)) ||
            (this.length < GOOD_LEAF_SIZE && e.leafPrepend(this)) ||
            this.appendInner(e))
        : this;
    }),
    (RopeSequence.prototype.prepend = function (e) {
      return e.length ? RopeSequence.from(e).append(this) : this;
    }),
    (RopeSequence.prototype.appendInner = function (e) {
      return new Append(this, e);
    }),
    (RopeSequence.prototype.slice = function (e, t) {
      return (t = void 0 === t ? this.length : t) <= (e = void 0 === e ? 0 : e)
        ? RopeSequence.empty
        : this.sliceInner(Math.max(0, e), Math.min(this.length, t));
    }),
    (RopeSequence.prototype.get = function (e) {
      if (!(e < 0 || e >= this.length)) return this.getInner(e);
    }),
    (RopeSequence.prototype.forEach = function (e, t, n) {
      (t = void 0 === t ? 0 : t) <= (n = void 0 === n ? this.length : n)
        ? this.forEachInner(e, t, n, 0)
        : this.forEachInvertedInner(e, t, n, 0);
    }),
    (RopeSequence.prototype.map = function (n, e, t) {
      void 0 === t && (t = this.length);
      var r = [];
      return (
        this.forEach(
          function (e, t) {
            return r.push(n(e, t));
          },
          (e = void 0 === e ? 0 : e),
          t
        ),
        r
      );
    }),
    (RopeSequence.from = function (e) {
      return e instanceof RopeSequence
        ? e
        : e && e.length
        ? new Leaf(e)
        : RopeSequence.empty;
    }),
    (function (t) {
      function n(e) {
        t.call(this), (this.values = e);
      }
      t && (n.__proto__ = t);
      var e = { length: { configurable: !0 }, depth: { configurable: !0 } };
      return (
        (((n.prototype = Object.create(t && t.prototype)).constructor =
          n).prototype.flatten = function () {
          return this.values;
        }),
        (n.prototype.sliceInner = function (e, t) {
          return 0 == e && t == this.length
            ? this
            : new n(this.values.slice(e, t));
        }),
        (n.prototype.getInner = function (e) {
          return this.values[e];
        }),
        (n.prototype.forEachInner = function (e, t, n, r) {
          for (var o = t; o < n; o++)
            if (!1 === e(this.values[o], r + o)) return !1;
        }),
        (n.prototype.forEachInvertedInner = function (e, t, n, r) {
          for (var o = t - 1; n <= o; o--)
            if (!1 === e(this.values[o], r + o)) return !1;
        }),
        (n.prototype.leafAppend = function (e) {
          if (this.length + e.length <= GOOD_LEAF_SIZE)
            return new n(this.values.concat(e.flatten()));
        }),
        (n.prototype.leafPrepend = function (e) {
          if (this.length + e.length <= GOOD_LEAF_SIZE)
            return new n(e.flatten().concat(this.values));
        }),
        (e.length.get = function () {
          return this.values.length;
        }),
        (e.depth.get = function () {
          return 0;
        }),
        Object.defineProperties(n.prototype, e),
        n
      );
    })(RopeSequence)),
  Append =
    ((RopeSequence.empty = new Leaf([])),
    (function (n) {
      function t(e, t) {
        n.call(this),
          (this.left = e),
          (this.right = t),
          (this.length = e.length + t.length),
          (this.depth = Math.max(e.depth, t.depth) + 1);
      }
      return (
        n && (t.__proto__ = n),
        (((t.prototype = Object.create(n && n.prototype)).constructor =
          t).prototype.flatten = function () {
          return this.left.flatten().concat(this.right.flatten());
        }),
        (t.prototype.getInner = function (e) {
          return e < this.left.length
            ? this.left.get(e)
            : this.right.get(e - this.left.length);
        }),
        (t.prototype.forEachInner = function (e, t, n, r) {
          var o = this.left.length;
          return (
            !(
              (t < o &&
                !1 === this.left.forEachInner(e, t, Math.min(n, o), r)) ||
              (o < n &&
                !1 ===
                  this.right.forEachInner(
                    e,
                    Math.max(t - o, 0),
                    Math.min(this.length, n) - o,
                    r + o
                  ))
            ) && void 0
          );
        }),
        (t.prototype.forEachInvertedInner = function (e, t, n, r) {
          var o = this.left.length;
          return (
            !(
              (o < t &&
                !1 ===
                  this.right.forEachInvertedInner(
                    e,
                    t - o,
                    Math.max(n, o) - o,
                    r + o
                  )) ||
              (n < o &&
                !1 === this.left.forEachInvertedInner(e, Math.min(t, o), n, r))
            ) && void 0
          );
        }),
        (t.prototype.sliceInner = function (e, t) {
          var n;
          return 0 == e && t == this.length
            ? this
            : t <= (n = this.left.length)
            ? this.left.slice(e, t)
            : n <= e
            ? this.right.slice(e - n, t - n)
            : this.left.slice(e, n).append(this.right.slice(0, t - n));
        }),
        (t.prototype.leafAppend = function (e) {
          e = this.right.leafAppend(e);
          if (e) return new t(this.left, e);
        }),
        (t.prototype.leafPrepend = function (e) {
          e = this.left.leafPrepend(e);
          if (e) return new t(e, this.right);
        }),
        (t.prototype.appendInner = function (e) {
          return this.left.depth >= Math.max(this.right.depth, e.depth) + 1
            ? new t(this.left, new t(this.right, e))
            : new t(this, e);
        }),
        t
      );
    })(RopeSequence));
const max_empty_items = 500;
class Branch {
  constructor(e, t) {
    (this.items = e), (this.eventCount = t);
  }
  popEvent(e, t) {
    if (0 == this.eventCount) return null;
    let r = this.items.length;
    for (; ; r--)
      if (this.items.get(r - 1).selection) {
        --r;
        break;
      }
    let o,
      i,
      a =
        (t && ((o = this.remapping(r, this.items.length)), (i = o.maps.length)),
        e.tr),
      s,
      l,
      c = [],
      u = [];
    return (
      this.items.forEach(
        (n, e) => {
          if (n.step) {
            if (o) {
              u.push(new Item(n.map));
              let e = n.step.map(o.slice(i)),
                t;
              e &&
                a.maybeStep(e).doc &&
                ((t = a.mapping.maps[a.mapping.maps.length - 1]),
                c.push(new Item(t, void 0, void 0, c.length + u.length))),
                i--,
                t && o.appendMap(t, i);
            } else a.maybeStep(n.step);
            return n.selection
              ? ((s = o ? n.selection.map(o.slice(i)) : n.selection),
                (l = new Branch(
                  this.items.slice(0, r).append(u.reverse().concat(c)),
                  this.eventCount - 1
                )),
                !1)
              : void 0;
          }
          o || ((o = this.remapping(r, e + 1)), (i = o.maps.length)),
            i--,
            u.push(n);
        },
        this.items.length,
        0
      ),
      { remaining: l, transform: a, selection: s }
    );
  }
  addTransform(r, o, e, i) {
    let a = [],
      s = this.eventCount,
      l = this.items,
      c = !i && l.length ? l.get(l.length - 1) : null;
    for (let n = 0; n < r.steps.length; n++) {
      var u = r.steps[n].invert(r.docs[n]);
      let e = new Item(r.mapping.maps[n], u, o),
        t;
      (t = c && c.merge(e)) &&
        ((e = t), n ? a.pop() : (l = l.slice(0, l.length - 1))),
        a.push(e),
        o && (s++, (o = void 0)),
        i || (c = e);
    }
    e = s - e.depth;
    return (
      e > DEPTH_OVERFLOW && ((l = cutOffEvents(l, e)), (s -= e)),
      new Branch(l.append(a), s)
    );
  }
  remapping(n, e) {
    let r = new Mapping();
    return (
      this.items.forEach(
        (e, t) => {
          t =
            null != e.mirrorOffset && t - e.mirrorOffset >= n
              ? r.maps.length - e.mirrorOffset
              : void 0;
          r.appendMap(e.map, t);
        },
        n,
        e
      ),
      r
    );
  }
  addMaps(e) {
    return 0 == this.eventCount
      ? this
      : new Branch(
          this.items.append(e.map((e) => new Item(e))),
          this.eventCount
        );
  }
  rebased(o, t) {
    if (!this.eventCount) return this;
    let i = [],
      e = Math.max(0, this.items.length - t),
      a = o.mapping,
      s = o.steps.length,
      l = this.eventCount,
      c =
        (this.items.forEach((e) => {
          e.selection && l--;
        }, e),
        t);
    this.items.forEach((e) => {
      var t,
        n,
        r = a.getMirror(--c);
      null != r &&
        ((s = Math.min(s, r)),
        (t = a.maps[r]),
        e.step
          ? ((n = o.steps[r].invert(o.docs[r])),
            (e = e.selection && e.selection.map(a.slice(c + 1, r))) && l++,
            i.push(new Item(t, n, e)))
          : i.push(new Item(t)));
    }, e);
    var n = [];
    for (let e = t; e < s; e++) n.push(new Item(a.maps[e]));
    t = this.items.slice(0, e).append(n).append(i);
    let r = new Branch(t, l);
    return (r =
      r.emptyItemCount() > max_empty_items
        ? r.compress(this.items.length - i.length)
        : r);
  }
  emptyItemCount() {
    let t = 0;
    return (
      this.items.forEach((e) => {
        e.step || t++;
      }),
      t
    );
  }
  compress(o = this.items.length) {
    let i = this.remapping(0, o),
      a = i.maps.length,
      s = [],
      l = 0;
    return (
      this.items.forEach(
        (e, t) => {
          var n, r;
          o <= t
            ? (s.push(e), e.selection && l++)
            : e.step
            ? ((n = (t = e.step.map(i.slice(a))) && t.getMap()),
              a--,
              n && i.appendMap(n, a),
              t &&
                ((r = e.selection && e.selection.map(i.slice(a))) && l++,
                (n = new Item(n.invert(), t, r)),
                (t = s.length - 1),
                (r = s.length && s[t].merge(n)) ? (s[t] = r) : s.push(n)))
            : e.map && a--;
        },
        this.items.length,
        0
      ),
      new Branch(RopeSequence.from(s.reverse()), l)
    );
  }
}
function cutOffEvents(e, n) {
  let r;
  return (
    e.forEach((e, t) => {
      if (e.selection && 0 == n--) return (r = t), !1;
    }),
    e.slice(r)
  );
}
Branch.empty = new Branch(RopeSequence.empty, 0);
class Item {
  constructor(e, t, n, r) {
    (this.map = e),
      (this.step = t),
      (this.selection = n),
      (this.mirrorOffset = r);
  }
  merge(e) {
    if (this.step && e.step && !e.selection) {
      e = e.step.merge(this.step);
      if (e) return new Item(e.getMap().invert(), e, this.selection);
    }
  }
}
class HistoryState {
  constructor(e, t, n, r, o) {
    (this.done = e),
      (this.undone = t),
      (this.prevRanges = n),
      (this.prevTime = r),
      (this.prevComposition = o);
  }
}
const DEPTH_OVERFLOW = 20;
function applyTransaction(e, t, n, r) {
  var o = n.getMeta(historyKey);
  if (o) return o.historyState;
  n.getMeta(closeHistoryKey) &&
    (e = new HistoryState(e.done, e.undone, null, 0, -1));
  var i,
    a,
    o = n.getMeta('appendedTransaction');
  return 0 == n.steps.length
    ? e
    : o && o.getMeta(historyKey)
    ? o.getMeta(historyKey).redo
      ? new HistoryState(
          e.done.addTransform(n, void 0, r, mustPreserveItems(t)),
          e.undone,
          rangesFor(n.mapping.maps[n.steps.length - 1]),
          e.prevTime,
          e.prevComposition
        )
      : new HistoryState(
          e.done,
          e.undone.addTransform(n, void 0, r, mustPreserveItems(t)),
          null,
          e.prevTime,
          e.prevComposition
        )
    : !1 === n.getMeta('addToHistory') ||
      (o && !1 === o.getMeta('addToHistory'))
    ? (i = n.getMeta('rebased'))
      ? new HistoryState(
          e.done.rebased(n, i),
          e.undone.rebased(n, i),
          mapRanges(e.prevRanges, n.mapping),
          e.prevTime,
          e.prevComposition
        )
      : new HistoryState(
          e.done.addMaps(n.mapping.maps),
          e.undone.addMaps(n.mapping.maps),
          mapRanges(e.prevRanges, n.mapping),
          e.prevTime,
          e.prevComposition
        )
    : ((i = n.getMeta('composition')),
      (a =
        0 == e.prevTime ||
        (!o &&
          e.prevComposition != i &&
          (e.prevTime < (n.time || 0) - r.newGroupDelay ||
            !isAdjacentTo(n, e.prevRanges)))),
      (o = o
        ? mapRanges(e.prevRanges, n.mapping)
        : rangesFor(n.mapping.maps[n.steps.length - 1])),
      new HistoryState(
        e.done.addTransform(
          n,
          a ? t.selection.getBookmark() : void 0,
          r,
          mustPreserveItems(t)
        ),
        Branch.empty,
        o,
        n.time,
        null == i ? e.prevComposition : i
      ));
}
function isAdjacentTo(e, r) {
  if (!r) return !1;
  if (!e.docChanged) return !0;
  let o = !1;
  return (
    e.mapping.maps[0].forEach((t, n) => {
      for (let e = 0; e < r.length; e += 2)
        t <= r[e + 1] && n >= r[e] && (o = !0);
    }),
    o
  );
}
function rangesFor(e) {
  let o = [];
  return e.forEach((e, t, n, r) => o.push(n, r)), o;
}
function mapRanges(t, n) {
  if (!t) return null;
  var r = [];
  for (let e = 0; e < t.length; e += 2) {
    var o = n.map(t[e], 1),
      i = n.map(t[e + 1], -1);
    o <= i && r.push(o, i);
  }
  return r;
}
function histTransaction(e, t, n, r) {
  var o,
    i = mustPreserveItems(t),
    a = historyKey.get(t).spec.config,
    s = (r ? e.undone : e.done).popEvent(t, i);
  s &&
    ((o = s.selection.resolve(s.transform.doc)),
    (e = (r ? e.done : e.undone).addTransform(
      s.transform,
      t.selection.getBookmark(),
      a,
      i
    )),
    (t = new HistoryState(
      r ? e : s.remaining,
      r ? s.remaining : e,
      null,
      0,
      -1
    )),
    n(
      s.transform
        .setSelection(o)
        .setMeta(historyKey, { redo: r, historyState: t })
        .scrollIntoView()
    ));
}
let cachedPreserveItems = !1,
  cachedPreserveItemsPlugins = null;
function mustPreserveItems(e) {
  var t = e.plugins;
  if (cachedPreserveItemsPlugins != t) {
    (cachedPreserveItems = !1), (cachedPreserveItemsPlugins = t);
    for (let e = 0; e < t.length; e++)
      if (t[e].spec.historyPreserveItems) {
        cachedPreserveItems = !0;
        break;
      }
  }
  return cachedPreserveItems;
}
const historyKey = new PluginKey('history'),
  closeHistoryKey = new PluginKey('closeHistory');
function history(r = {}) {
  return (
    (r = { depth: r.depth || 100, newGroupDelay: r.newGroupDelay || 500 }),
    new Plugin({
      key: historyKey,
      state: {
        init() {
          return new HistoryState(Branch.empty, Branch.empty, null, 0, -1);
        },
        apply(e, t, n) {
          return applyTransaction(t, n, e, r);
        },
      },
      config: r,
      props: {
        handleDOMEvents: {
          beforeinput(e, t) {
            var n = t.inputType,
              n = 'historyUndo' == n ? undo : 'historyRedo' == n ? redo : null;
            return !!n && (t.preventDefault(), n(e.state, e.dispatch));
          },
        },
      },
    })
  );
}
const undo = (e, t) => {
    var n = historyKey.getState(e);
    return !(
      !n ||
      0 == n.done.eventCount ||
      (t && histTransaction(n, e, t, !1), 0)
    );
  },
  redo = (e, t) => {
    var n = historyKey.getState(e);
    return !(
      !n ||
      0 == n.undone.eventCount ||
      (t && histTransaction(n, e, t, !0), 0)
    );
  },
  ParagraphSpec = {
    attrs: {
      textAlign: { default: null },
      color: { default: null },
      fontFamily: { default: null },
      fontSize: { default: null },
      lineHeight: { default: null },
      letterSpacing: { default: null },
      textTransform: { default: null },
      marginLeft: { default: null },
      indent: { default: null },
      listType: { default: '' },
    },
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p', getAttrs: (e) => getAttrs$1(e) }],
    toDOM: (e) => toDOM(e),
  },
  getAttrs$1 = (e) => {
    var {
        lineHeight: t,
        letterSpacing: n,
        textTransform: r,
        textAlign: o,
        fontFamily: i,
        fontSize: a,
        color: s,
      } = e.style,
      l = e.getAttribute('data-indent'),
      l = l ? parseInt(l, 10) : 0,
      e = l && 'ordered' === e.getAttribute('data-list-type') ? 'ordered' : '';
    return {
      textAlign: o,
      textTransform: r,
      lineHeight: t,
      letterSpacing: parseInt(n, 10),
      fontFamily: i.replaceAll('"', ''),
      fontSize: a,
      color: s,
      indent: l,
      listType: e,
    };
  },
  toDOM = (e) => {
    var {
        textAlign: e,
        textTransform: t,
        lineHeight: n,
        letterSpacing: r,
        fontFamily: o,
        fontSize: i,
        color: a,
        indent: s,
        listType: l,
      } = e.attrs,
      c = {};
    let u = '';
    return (
      e && 'left' !== e && (u += `text-align: ${e};`),
      o && (u += `font-family: ${o};`),
      t && (u += `text-transform: ${t};`),
      i && (u += `font-size: ${i};`),
      a && (u += `color: ${a};`),
      s &&
        ((u = u + `--indent-level: ${s};` + 'display: list-item;'),
        (c['data-indent'] = String(s)),
        'ordered' === (c['data-list-type'] = l)
          ? ((e = ['decimal', 'lower-alpha', 'lower-roman']),
            (u =
              (u += 'list-style-type: none;') +
              `--counter-list-marker: ${e[(s - 1) % e.length]};`))
          : (u += 'list-style-type: disc;')),
      (u = u + `line-height: ${n || 1.4};` + `letter-spacing: ${r}em;`) &&
        (c.style = u),
      ['p', c, 0]
    );
  },
  ItalicSpec = {
    parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
    toDOM() {
      return ['em', 0];
    },
  },
  BoldSpec = {
    parseDOM: [
      { tag: 'strong' },
      { tag: 'b', getAttrs: (e) => 'normal' != e.style.fontWeight && null },
      {
        style: 'font-weight',
        getAttrs: (e) => /^(bold(er)?|[5-9]\d{2,})$/.test(e) && null,
      },
    ],
    toDOM() {
      return ['strong', 0];
    },
  },
  TextUnderlineSpec = {
    parseDOM: [
      { tag: 'u' },
      {
        style: 'text-decoration-line',
        getAttrs: (e) => 'underline' === e && null,
      },
      { style: 'text-decoration', getAttrs: (e) => 'underline' === e && null },
    ],
    toDOM() {
      return ['u', 0];
    },
  },
  ListItemSpec = {
    content: 'paragraph block*',
    parseDOM: [{ tag: 'li' }],
    attrs: {
      align: { default: null },
      style: { default: 'display: list-item; ' },
    },
    toDOM(e) {
      return ['li', e.attrs, 0];
    },
    defining: !0,
  },
  BulletListSpec = {
    content: 'listItem+',
    group: 'block',
    attrs: {
      align: { default: null },
      style: { default: 'list-style-type: disc;padding-left: 1.7em;margin:0;' },
    },
    parseDOM: [{ tag: 'ul' }],
    toDOM(e) {
      return ['ul', e.attrs, 0];
    },
  },
  TextColorSpec = {
    attrs: { color: { default: '' } },
    inline: !0,
    group: 'inline',
    parseDOM: [{ style: 'color', getAttrs: (e) => ({ color: e }) }],
    toDOM(e) {
      e = e.attrs.color;
      let t = '';
      return e && (t += `color: ${e};`), ['span', { style: t }, 0];
    },
  },
  brDOM = ['br'],
  nodes = {
    doc: { content: 'block+' },
    paragraph: ParagraphSpec,
    listItem: ListItemSpec,
    bulletList: BulletListSpec,
    text: { group: 'inline' },
    hard_break: {
      inline: !0,
      group: 'inline',
      selectable: !1,
      parseDOM: [{ tag: 'br' }],
      toDOM() {
        return brDOM;
      },
    },
  },
  marks = {
    link: {
      attrs: { href: {}, title: { default: null } },
      inclusive: !1,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs(e) {
            return {
              href: e.getAttribute('href'),
              title: e.getAttribute('title'),
            };
          },
        },
      ],
      toDOM(e) {
        var { href: e, title: t } = e.attrs;
        return ['a', { href: e, title: t }, 0];
      },
    },
    italic: ItalicSpec,
    bold: BoldSpec,
    underline: TextUnderlineSpec,
    color: TextColorSpec,
  },
  schema = new Schema({ nodes: nodes, marks: marks });
class EventEmitter {
  constructor() {
    Object.defineProperty(this, 'callbacks', {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {},
    });
  }
  on(e, t) {
    return (
      this.callbacks[e] || (this.callbacks[e] = []),
      this.callbacks[e].push(t),
      this
    );
  }
  emit(e, ...t) {
    e = this.callbacks[e];
    return e && e.forEach((e) => e.apply(this, t)), this;
  }
  off(e, t) {
    var n = this.callbacks[e];
    return (
      n &&
        (t
          ? (this.callbacks[e] = n.filter((e) => e !== t))
          : delete this.callbacks[e]),
      this
    );
  }
}
function normalize(e) {
  var t = Object.create(null);
  for (const n in e) t[normalizeKeyName$1(n)] = e[n];
  return t;
}
function keymap(e) {
  return new Plugin({ props: { handleKeyDown: keydownHandler(e) } });
}
function keydownHandler(e) {
  const i = normalize(e);
  return function (e, t) {
    t.stopPropagation();
    var n = keyName(t),
      r = i[modifiers$1(n, t)];
    let o;
    if (r && r(e.state, e.dispatch, e)) return !0;
    if (1 == n.length && ' ' != n) {
      if (t.shiftKey) {
        r = i[modifiers$1(n, t, !1)];
        if (r && r(e.state, e.dispatch, e)) return !0;
      }
      if (
        (t.shiftKey || t.altKey || t.metaKey || 127 < n.charCodeAt(0)) &&
        (o = base[t.keyCode]) &&
        o != n
      ) {
        r = i[modifiers$1(o, t)];
        if (r && r(e.state, e.dispatch, e)) return !0;
      }
    }
    return !1;
  };
}
function objectIncludes(t, n) {
  var e = Object.keys(n);
  return !e.length || e.every((e) => n[e] === t[e]);
}
function findMarkInSet(e, t, n = {}) {
  return e.find((e) => e.type === t && objectIncludes(e.attrs, n));
}
function isMarkInSet(e, t, n = {}) {
  return !!findMarkInSet(e, t, n);
}
function getMarkRange(i, a, s = {}) {
  if (i && a) {
    let o = i.parent.childAfter(i.parentOffset);
    if (
      (o =
        i.parentOffset === o.offset && 0 !== o.offset
          ? i.parent.childBefore(i.parentOffset)
          : o).node
    ) {
      var l = findMarkInSet([...o.node.marks], a, s);
      if (l) {
        let e = o.index,
          t = i.start() + o.offset,
          n = e + 1,
          r = t + o.node.nodeSize;
        for (
          findMarkInSet([...o.node.marks], a, s);
          0 < e && l.isInSet(i.parent.child(e - 1).marks);

        )
          --e, (t -= i.parent.child(e).nodeSize);
        for (
          ;
          n < i.parent.childCount &&
          isMarkInSet([...i.parent.child(n).marks], a, s);

        )
          (r += i.parent.child(n).nodeSize), (n += 1);
        return { from: t, to: r };
      }
    }
  }
}
const unsetMark =
  (l, c = {}) =>
  (n, e) => {
    var { extendEmptyMarkRange: r = !1 } = c;
    const o = n.tr;
    var i = o['selection'];
    const a = n.schema.mark(l);
    var { $from: n, empty: s, ranges: t } = i;
    if (s && r) {
      let { from: e, to: t } = i;
      (r =
        null == (s = n.marks().find((e) => e.type === a.type))
          ? void 0
          : s.attrs),
        (i = getMarkRange(n, a.type, r));
      i && ((e = i.from), (t = i.to)), o.removeMark(e, t, a);
    } else
      t.forEach((e) => {
        o.removeMark(e.$from.pos, e.$to.pos, a);
      });
    return o.removeStoredMark(a), !!e && (e(o), !0);
  };
function getMarkType(e, t) {
  if ('string' != typeof e) return e;
  if (t.marks[e]) return t.marks[e];
  throw Error(`There is no mark type named '${e}'!`);
}
function isMarkActive(n, e, t = {}) {
  var { empty: r, ranges: o } = n.selection;
  const i = e ? getMarkType(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks())
      .filter((e) => !i || i.name === e.type.name)
      .find((e) => objectIncludes(e.attrs, t));
  let a = 0;
  const s = [];
  return (
    o.forEach(({ $from: e, $to: t }) => {
      const o = e.pos,
        i = t.pos;
      n.doc.nodesBetween(o, i, (e, t) => {
        if (e.isText || e.marks.length) {
          const n = Math.max(o, t),
            r = Math.min(i, t + e.nodeSize);
          t = r - n;
          (a += t),
            s.push(...e.marks.map((e) => ({ mark: e, from: n, to: r })));
        }
      });
    }),
    0 !== a &&
      ((e = s
        .filter((e) => !i || i.name === e.mark.type.name)
        .filter((e) => objectIncludes(e.mark.attrs, t))
        .reduce((e, t) => e + t.to - t.from, 0)),
      (r = s
        .filter((e) => !i || (e.mark.type !== i && e.mark.type.excludes(i)))
        .reduce((e, t) => e + t.to - t.from, 0)),
      (0 < e ? e + r : e) >= a)
  );
}
function getMarkAttributes(e, t) {
  const n = getMarkType(t, e.schema);
  var { from: t, to: r, empty: o } = e.selection;
  const i = [];
  o
    ? (e.storedMarks && i.push(...e.storedMarks),
      i.push(...e.selection.$head.marks()))
    : e.doc.nodesBetween(t, r, (e) => {
        i.push(...e.marks);
      });
  o = i.find((e) => e.type.name === n.name);
  return o ? Object.assign({}, o.attrs) : {};
}
const setMark =
    (o, l = {}) =>
    (t, e) => {
      const a = t.tr.setSelection(t.selection);
      var n = a['selection'],
        { empty: n, ranges: r } = n;
      const s = getMarkType(o, t.schema);
      return (
        n
          ? ((n = getMarkAttributes(t, s)),
            a.addStoredMark(s.create(Object.assign(Object.assign({}, n), l))))
          : r.forEach((e) => {
              const o = e.$from.pos,
                i = e.$to.pos;
              t.doc.nodesBetween(o, i, (e, t) => {
                const n = Math.max(t, o),
                  r = Math.min(t + e.nodeSize, i);
                e.marks.find((e) => e.type === s)
                  ? e.marks.forEach((e) => {
                      s === e.type &&
                        a.addMark(
                          n,
                          r,
                          s.create(Object.assign(Object.assign({}, e.attrs), l))
                        );
                    })
                  : a.addMark(n, r, s.create(l));
              });
            }),
        !!e && (e(a), !0)
      );
    },
  toggleMark =
    (o, i = {}, a = {}) =>
    (e, t, ...n) => {
      var r = getMarkType(o, e.schema);
      return (isMarkActive(e, r) ? unsetMark(r, a) : setMark(r, i))(e, t, ...n);
    },
  toggleBold = (...e) => toggleMark('bold')(...e),
  unsetBold = (...e) => unsetMark('bold')(...e),
  setBold = (...e) => setMark('bold')(...e),
  unsetBoldOfBlock = (e, t) => {
    var { $from: n, $to: r } = e.tr.setSelection(e.selection).selection,
      n = n.blockRange(r);
    return !(
      !n ||
      !t ||
      (t(e.tr.removeMark(n.start, n.end, e.schema.mark('bold'))), 0)
    );
  },
  toggleItalic = (...e) => toggleMark('italic')(...e),
  unsetItalic = (...e) => unsetMark('italic')(...e),
  setItalic = (...e) => setMark('italic')(...e),
  unsetItalicOfBlock = (e, t) => {
    var { $from: n, $to: r } = e.selection,
      n = n.blockRange(r);
    return !(
      !n ||
      !t ||
      ((r = e.schema.mark('bold')), t(e.tr.removeMark(n.start, n.end, r)), 0)
    );
  },
  splitBlockKeepMarks = (e, t) =>
    splitBlockAs((e) => ({
      type: e.type.schema.nodes.paragraph,
      attrs: e.attrs,
    }))(e, t);
function splitBlockAs(c) {
  return (e, t) => {
    var { $from: n, $to: r } = e.selection;
    if (e.selection instanceof NodeSelection && e.selection.node.isBlock)
      return !(
        !n.parentOffset ||
        !canSplit(e.doc, n.pos) ||
        (t && t(e.tr.split(n.pos).scrollIntoView()), 0)
      );
    if (!n.parent.isBlock) return !1;
    var o = r.parentOffset == r.parent.content.size,
      i = e.tr,
      a =
        ((e.selection instanceof TextSelection ||
          e.selection instanceof AllSelection) &&
          i.deleteSelection(),
        0 == n.depth
          ? null
          : defaultBlockAt(n.node(-1).contentMatchAt(n.indexAfter(-1)))),
      r = c && c(r.parent, o);
    let s = r ? [r] : o && a ? [{ type: a }] : void 0,
      l = canSplit(i.doc, i.mapping.map(n.pos), 1, s);
    s ||
      l ||
      !canSplit(i.doc, i.mapping.map(n.pos), 1, a ? [{ type: a }] : void 0) ||
      (a && (s = [{ type: a }]), (l = !0)),
      l &&
        (i.split(i.mapping.map(n.pos), 1, s),
        o ||
          n.parentOffset ||
          n.parent.type == a ||
          ((r = i.mapping.map(n.before())),
          (o = i.doc.resolve(r)),
          a &&
            n.node(-1).canReplaceWith(o.index(), o.index() + 1, a) &&
            i.setNodeMarkup(i.mapping.map(n.before()), a)));
    r =
      e.storedMarks ||
      (e.selection.$to.parentOffset && e.selection.$from.marks());
    return r && i.ensureMarks(r), t && t(i), !0;
  };
}
function defaultBlockAt(t) {
  for (let e = 0; e < t.edgeCount; e++) {
    var n = t.edge(e)['type'];
    if (n.isTextblock && !n.hasRequiredAttrs()) return n;
  }
  return null;
}
const selectText = (s) => (e, t) => {
    var e = e.tr,
      n = e['doc'],
      { from: r, to: o } = s,
      i = TextSelection.atStart(n).from,
      a = TextSelection.atEnd(n).to,
      r = Math.min(Math.max(r, i), a),
      o = Math.min(Math.max(o, i), a),
      i = TextSelection.create(n, r, o);
    return e.setSelection(i), !!t && (t(e), !0);
  },
  selectAll = (e, t, ...n) => (
    selectText({ from: 0, to: e.doc.content.size })(e, t, ...n), !0
  );
function buildKeyMap(e, r) {
  const o = {};
  var t;
  function n(e, t) {
    if (r) {
      var n = r[e];
      if (!1 === n) return;
      n && (e = n);
    }
    o[e] = t;
  }
  if (
    (n('Mod-z', undo),
    n('Mod-y', redo),
    n('Mod-a', selectAll),
    n('Backspace', undoInputRule),
    n('Alt-ArrowUp', joinUp),
    n('Alt-ArrowDown', joinDown),
    n('Mod-BracketLeft', lift),
    n('Escape', selectParentNode),
    e.marks.bold && (n('Mod-b', toggleBold), n('Mod-B', toggleBold)),
    e.marks.italic && (n('Mod-i', toggleItalic), n('Mod-I', toggleItalic)),
    n('Enter', splitBlockKeepMarks),
    (t = e.nodes.hard_break))
  ) {
    const i = t,
      a = chainCommands(
        exitCode,
        (e, t) => (
          t && t(e.tr.replaceSelectionWith(i.create()).scrollIntoView()), !0
        )
      );
    n('Mod-Enter', a), n('Shift-Enter', a), isMacOs_1 && n('Ctrl-Enter', a);
  }
  return (t = e.nodes.paragraph) && n('Shift-Ctrl-0', setBlockType(t)), o;
}
const events = () =>
    new Plugin({
      view() {
        return {
          update: function (e, t) {
            var n = e.state;
            (t && t.doc.eq(n.doc) && t.selection.eq(n.selection)) ||
              (t && !t.doc.eq(n.doc)
                ? e.events.emit('update', e)
                : e.events.emit('selectionUpdate', e));
          },
        };
      },
    }),
  editorSchema = new Schema({
    nodes: schema.spec.nodes,
    marks: schema.spec.marks,
  }),
  createEditor = ({ content: e, ele: t = null, handleDOMEvents: n = {} }) => {
    var r = document.createElement('div'),
      e =
        ((r.innerHTML = e),
        EditorState.create({
          doc: DOMParser$1.fromSchema(editorSchema).parse(r),
          plugins: [
            buildInputRules(editorSchema),
            keymap(buildKeyMap(editorSchema)),
            keymap(baseKeymap),
            gapCursor(),
            history(),
            events(),
          ],
        })),
      r = new EditorView(t, {
        attributes: { class: 'adojs-text' },
        state: e,
        handleDOMEvents: n,
      });
    return (r.events = new EventEmitter()), r;
  },
  TextLayer = ({
    text: t,
    boxSize: e,
    scale: n,
    fonts: r,
    colors: o,
    fontSizes: i,
    effect: a,
    rotate: s,
    position: l,
  }) => {
    const { actions: c, id: u, pageIndex: d } = useLayer(),
      p = useSelectedLayers()['selectedLayerIds'],
      { actions: f, textEditor: h } = useEditor((e) => ({
        textEditor: e.textEditor,
      }));
    useEffect(() => {
      var e = createEditor({ content: t });
      e && c.setTextEditor(e);
    }, []);
    var m = useCallback(() => {
        p.includes(u) && c.openTextEditor();
      }, [f, p]),
      g = useMemo(() => !!h && h.pageIndex === d && h.layerId === u, [h]);
    return jsx('div', {
      css: { transformOrigin: '0 0' },
      style: {
        width: e.width / n,
        height: e.height / n,
        transform: `scale(${n})`,
        opacity: g ? 0 : 1,
      },
      onDoubleClick: m,
      children: jsx(TextContent, {
        text: t,
        scale: n,
        fonts: r,
        colors: o,
        fontSizes: i,
        effect: a,
        boxSize: e,
        rotate: s,
        position: l,
      }),
    });
  },
  ImageLayer =
    ((TextLayer.info = { name: 'Text', type: 'Text' }),
    ({ image: t, boxSize: e, position: n, rotate: r }) => {
      const { actions: o, pageIndex: i, id: a } = useLayer(),
        s = useSelectedLayers()['selectedLayerIds'];
      var l = useEditor((e) => ({ imageEditor: e.imageEditor }))['imageEditor'];
      const [c, u] = useState(
        Object.assign(Object.assign({}, t), { url: t.thumb })
      );
      return (
        useEffect(() => {
          var e = new Image();
          (e.onload = () => {
            u((e) => Object.assign(Object.assign({}, e), { url: t.url }));
          }),
            (e.src = t.url);
        }, [t, u]),
        useEffect(() => {
          u(t);
        }, [t]),
        jsx('div', {
          css: {
            pointerEvents: 'auto',
            visibility:
              l && l.pageIndex === i && l.layerId === a ? 'hidden' : void 0,
          },
          onDoubleClick: () =>
            s.includes(a) &&
            o.openImageEditor({ position: n, rotate: r, boxSize: e, image: t }),
          children: jsx(ImageContent, {
            image: c,
            boxSize: e,
            rotate: r,
            position: n,
          }),
        })
      );
    }),
  GroupLayer =
    ((ImageLayer.info = { name: 'Image', type: 'Image' }),
    ({ boxSize: e, scale: t, children: n }) =>
      jsx('div', {
        css: { transformOrigin: '0 0' },
        style: {
          width: e.width / t,
          height: e.height / t,
          transform: `scale(${t})`,
        },
        children: n,
      })),
  FrameLayer =
    ((GroupLayer.info = { name: 'Group', type: 'Group' }),
    ({
      clipPath: e,
      image: r,
      color: o,
      gradientBackground: i,
      boxSize: a,
      position: t,
      rotate: n,
      scale: s,
    }) => {
      const l = useContext(EditorContext)['config'],
        { actions: c, pageIndex: u, id: d } = useLayer(),
        p = useSelectedLayers()['selectedLayerIds'];
      var f = useEditor((e) => ({ imageEditor: e.imageEditor }))['imageEditor'];
      const [h, m] = useState(null);
      useEffect(() => {
        if (r) {
          const t = new Image();
          (t.onload = () => {
            m((e) => e && Object.assign(Object.assign({}, e), { url: t.src }));
          }),
            (t.src = r.url);
        }
      }, [r]),
        useEffect(() => {
          var e, t, n;
          r || o || i
            ? m(r)
            : m(
                ((e = l.frame.defaultImage.width / l.frame.defaultImage.height),
                (t = a.width / a.height),
                (n = t < e ? (a.height / s) * e : a.width / s),
                (t = t < e ? a.height / s : (a.width / s) * e),
                {
                  boxSize: { width: n, height: t },
                  position: {
                    x: -(n - a.width / s) / 2,
                    y: -(t - a.height / s) / 2,
                  },
                  rotate: 0,
                  url: l.frame.defaultImage.url,
                  thumb: l.frame.defaultImage.url,
                })
              );
        }, [r, o, i]);
      return jsx('div', {
        css: { transformOrigin: '0 0' },
        style: {
          width: a.width / s,
          height: a.height / s,
          transform: `scale(${s})`,
          visibility:
            f && f.pageIndex === u && f.layerId === d ? 'hidden' : void 0,
        },
        onDoubleClick: () => {
          r &&
            p.includes(d) &&
            c.openImageEditor({
              boxSize: a,
              position: t,
              rotate: n,
              image: {
                boxSize: {
                  width: r.boxSize.width * s,
                  height: r.boxSize.height * s,
                },
                position: { x: r.position.x * s, y: r.position.y * s },
                rotate: r.rotate || 0,
                url: r.url,
              },
            });
        },
        children: jsx(FrameContent, {
          clipPath: e,
          scale: s,
          color: o,
          gradientBackground: i,
          image: h,
          boxSize: a,
          rotate: n,
          position: t,
        }),
      });
    }),
  SvgLayer =
    ((FrameLayer.info = { name: 'Frame', type: 'Frame' }),
    (e) => {
      var t = e['boxSize'],
        e = __rest(e, ['boxSize']);
      return jsx('div', {
        css: { transformOrigin: '0 0' },
        style: { width: t.width, height: t.height },
        children: jsx(SvgContent, Object.assign({ boxSize: t }, e)),
      });
    }),
  RootLayer =
    ((SvgLayer.info = { name: 'Svg', type: 'Svg' }),
    ({
      boxSize: e,
      children: t,
      color: n,
      gradientBackground: r,
      image: o,
      position: i,
      rotate: a,
      scale: s,
    }) => {
      const l = useLayer()['actions'];
      return jsxs(Fragment$1, {
        children: [
          jsx(RootContent, {
            boxSize: e,
            position: i,
            rotate: a,
            gradientBackground: r,
            color: n,
            image: o,
            scale: s,
            onDoubleClick: () =>
              o &&
              l.openImageEditor({
                boxSize: e,
                position: i,
                rotate: a,
                image: o,
              }),
          }),
          t,
        ],
      });
    }),
  resolvers =
    ((RootLayer.info = { name: 'Main', type: 'Root' }),
    {
      RootLayer: RootLayer,
      ShapeLayer: ShapeLayer,
      TextLayer: TextLayer,
      ImageLayer: ImageLayer,
      GroupLayer: GroupLayer,
      FrameLayer: FrameLayer,
      SvgLayer: SvgLayer,
    }),
  resolveComponent = (t) => {
    const e = 'string' == typeof t ? 'string' : t.name;
    if (resolvers[e]) return e;
    for (let e = 0; e < Object.keys(resolvers).length; e++) {
      var n = Object.keys(resolvers)[e];
      if (resolvers[n] === t) return n;
    }
    return t;
  },
  getRandomId = () => v4(),
  deserializeLayer = (e) => {
    var { type: t, props: n } = deserializeComponent(e);
    return Object.assign(Object.assign({}, t.info), {
      comp: t,
      props: n,
      locked: e.locked,
      child: e.child,
      parent: e.parent,
    });
  },
  deserializeComponent = (e) => {
    var {
        type: { resolvedName: e },
        props: t,
      } = e,
      e = resolvers[e];
    return createElement(e, t);
  },
  serializeLayers = (t, e) => {
    let n = {};
    return (
      (n[e] = {
        type: { resolvedName: resolveComponent(t[e].data.comp) },
        props: t[e].data.props,
        locked: t[e].data.locked,
        child: t[e].data.child,
        parent: t[e].data.parent,
      }),
      t[e].data.child.forEach((e) => {
        n = Object.assign(Object.assign({}, n), serializeLayers(t, e));
      }),
      n
    );
  },
  isRootLayer = (e) => 'Root' === e.data.type,
  isMainLayer = (e) => 'ROOT' === e.data.parent,
  isGroupLayer = (e) => 'Group' === e.data.type,
  isTextLayer = (e) => 'Text' === e.data.type,
  isFrameLayer = (e) => 'Frame' === e.data.type,
  isSvgLayer = (e) => 'Svg' === e.data.type,
  isImageLayer = (e) => 'Image' === e.data.type,
  isShapeLayer = (e) => 'Shape' === e.data.type,
  copy = async (t, { pageIndex: n, layerIds: e }) => {
    const r = [];
    e.map((e) => {
      r.push({ rootId: e, layers: serializeLayers(t.pages[n].layers, e) });
    }),
      await navigator.clipboard.writeText(JSON.stringify(r));
  },
  paste = async ({ actions: e }) => {
    var t = await navigator.clipboard.readText();
    try {
      JSON.parse(t).forEach((t) => {
        Object.entries(t.layers).forEach(([e]) => {
          (t.layers[e].props.position.x += 10),
            (t.layers[e].props.position.y += 10);
        }),
          e.addLayerTree(t);
      });
    } catch (e) {}
  },
  duplicate = (t, { pageIndex: n, layerIds: e, actions: r }) => {
    const o = [];
    e.map((e) => {
      o.push({
        rootId: e,
        layers: lodashExports.cloneDeep(serializeLayers(t.pages[n].layers, e)),
      });
    }),
      r.addLayerTrees(
        o.map(
          (t) => (
            Object.entries(t.layers).forEach(([e]) => {
              (t.layers[e].props.position.x += 10),
                (t.layers[e].props.position.y += 10);
            }),
            t
          )
        )
      );
  };
var ClipboardIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M200 32h-36.26a47.92 47.92 0 0 0-71.48 0H56a16 16 0 0 0-16 16v168a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm-72 0a32 32 0 0 1 32 32H96a32 32 0 0 1 32-32Zm72 184H56V48h26.75A47.93 47.93 0 0 0 80 64v8a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-8a47.93 47.93 0 0 0-2.75-16H200Z',
          }),
        }
      )
    );
  },
  CopyIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z',
          }),
        }
      )
    );
  },
  TrashIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z',
          }),
        }
      )
    );
  },
  LayersIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          viewBox: '0 0 24 24',
        },
        e,
        {
          children: jsx$1('path', {
            fill: 'currentColor',
            d: 'm19.474 12.838 1.697.835a1 1 0 0 1 0 1.795L13.32 19.33a3 3 0 0 1-2.649 0L2.82 15.468a1 1 0 0 1 0-1.795l1.697-.835 1.698.836-1.821.896 6.94 3.415a1.5 1.5 0 0 0 1.324 0l6.94-3.415-1.822-.896 1.7-.836ZM13.32 4.673l7.852 3.864a1 1 0 0 1 0 1.794l-7.852 3.864a3 3 0 0 1-2.649 0L2.82 10.33a1 1 0 0 1 0-1.794l7.851-3.864a3 3 0 0 1 2.65 0Zm-1.986 8.176a1.5 1.5 0 0 0 1.324 0l6.94-3.415-6.94-3.415a1.5 1.5 0 0 0-1.324 0l-6.94 3.415 6.94 3.415Z',
          }),
        }
      )
    );
  },
  SelectionBackgroundIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M160 80H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h112a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16Zm0 128H48V96h112ZM136 40a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16h-16a8 8 0 0 1-8-8Zm88 8v8a8 8 0 0 1-16 0v-8h-8a8 8 0 0 1 0-16h8a16 16 0 0 1 16 16Zm0 48v16a8 8 0 0 1-16 0V96a8 8 0 0 1 16 0Zm0 56v8a16 16 0 0 1-16 16h-8a8 8 0 0 1 0-16h8v-8a8 8 0 0 1 16 0ZM80 56v-8a16 16 0 0 1 16-16h8a8 8 0 0 1 0 16h-8v8a8 8 0 0 1-16 0Z',
          }),
        }
      )
    );
  },
  SelectionForegroundIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M64 216a8 8 0 0 1-8 8h-8a16 16 0 0 1-16-16v-8a8 8 0 0 1 16 0v8h8a8 8 0 0 1 8 8Zm48-8H96a8 8 0 0 0 0 16h16a8 8 0 0 0 0-16Zm-72-40a8 8 0 0 0 8-8v-16a8 8 0 0 0-16 0v16a8 8 0 0 0 8 8Zm128 24a8 8 0 0 0-8 8v8h-8a8 8 0 0 0 0 16h8a16 16 0 0 0 16-16v-8a8 8 0 0 0-8-8Zm0-80a8 8 0 0 0 8-8v-8a16 16 0 0 0-16-16h-8a8 8 0 0 0 0 16h8v8a8 8 0 0 0 8 8ZM56 80h-8a16 16 0 0 0-16 16v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16Zm152-48H96a16 16 0 0 0-16 16v40a4.44 4.44 0 0 0 0 .55A8 8 0 0 0 88 96h24a8 8 0 0 0 0-16H96V48h112v112h-32v-16a8 8 0 0 0-16 0v24a8 8 0 0 0 8 8h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Z',
          }),
        }
      )
    );
  },
  DuplicateIcon = function (e) {
    return jsxs$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: [
            jsx$1('path', { fill: 'none', d: 'M0 0h256v256H0z' }),
            jsx$1('path', {
              fill: 'none',
              stroke: 'currentColor',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 12,
              d: 'M168 168h48V40H88v48',
            }),
            jsx$1('path', {
              fill: 'none',
              stroke: 'currentColor',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 12,
              d: 'M40 88h128v128H40z',
            }),
            jsx$1('path', {
              fill: 'currentColor',
              d: 'M138.14 152.43a4.46 4.46 0 0 1-4.45 4.46h-25.26v25.25a4.46 4.46 0 0 1-8.92 0v-25.25H74.26a4.46 4.46 0 0 1 0-8.92h25.25v-25.26a4.46 4.46 0 0 1 8.92 0V148h25.26a4.46 4.46 0 0 1 4.45 4.43Z',
            }),
          ],
        }
      )
    );
  },
  LockKeyIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M128 112a28 28 0 0 0-8 54.83V184a8 8 0 0 0 16 0v-17.17a28 28 0 0 0-8-54.83Zm0 40a12 12 0 1 1 12-12 12 12 0 0 1-12 12Zm80-72h-32V56a48 48 0 0 0-96 0v24H48a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16ZM96 56a32 32 0 0 1 64 0v24H96Zm112 152H48V96h160v112Z',
          }),
        }
      )
    );
  },
  BoundingBoxIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M208 96a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16h-32a16 16 0 0 0-16 16v8H96v-8a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h8v64h-8a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-8h64v8a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-8V96Zm-32-48h32v32h-32ZM48 48h32v15.9a.51.51 0 0 0 0 .2V80H48Zm32 160H48v-32h32v15.9a.51.51 0 0 0 0 .2V208Zm128 0h-32v-32h32Zm-24-48h-8a16 16 0 0 0-16 16v8H96v-8a16 16 0 0 0-16-16h-8V96h8a16 16 0 0 0 16-16v-8h64v8a16 16 0 0 0 16 16h8Z',
          }),
        }
      )
    );
  },
  ShapesIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M71.59 61.47a8 8 0 0 0-15.18 0l-40 120A8 8 0 0 0 24 192h80a8 8 0 0 0 7.59-10.53ZM35.1 176 64 89.3 92.9 176ZM208 76a52 52 0 1 0-52 52 52.06 52.06 0 0 0 52-52Zm-88 0a36 36 0 1 1 36 36 36 36 0 0 1-36-36Zm104 68h-88a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8h88a8 8 0 0 0 8-8v-56a8 8 0 0 0-8-8Zm-8 56h-72v-40h72Z',
          }),
        }
      )
    );
  },
  CaretCircleUpIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm45.66-77.66a8 8 0 0 1-11.32 11.32L128 115.31l-34.34 34.35a8 8 0 0 1-11.32-11.32l40-40a8 8 0 0 1 11.32 0Z',
          }),
        }
      )
    );
  },
  CaretCircleDoubleUpIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M201.54 54.46A104 104 0 0 0 54.46 201.54 104 104 0 0 0 201.54 54.46Zm-11.31 135.77a88 88 0 1 1 0-124.46 88.11 88.11 0 0 1 0 124.46Zm-24.57-27.89a8 8 0 0 1-11.32 11.32L128 147.31l-26.34 26.35a8 8 0 0 1-11.32-11.32l32-32a8 8 0 0 1 11.32 0Zm0-56a8 8 0 0 1-11.32 11.32L128 91.31l-26.34 26.35a8 8 0 0 1-11.32-11.32l32-32a8 8 0 0 1 11.32 0Z',
          }),
        }
      )
    );
  },
  CaretCircleDownIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm45.66-109.66a8 8 0 0 1 0 11.32l-40 40a8 8 0 0 1-11.32 0l-40-40a8 8 0 0 1 11.32-11.32L128 140.69l34.34-34.35a8 8 0 0 1 11.32 0Z',
          }),
        }
      )
    );
  },
  XIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z',
          }),
        }
      )
    );
  },
  AlignLeftIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M48 40v176a8 8 0 0 1-16 0V40a8 8 0 0 1 16 0Zm16 64V64a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16v40a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16Zm16 0h96V64H80Zm152 48v40a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16v-40a16 16 0 0 1 16-16h136a16 16 0 0 1 16 16Zm-16 40v-40H80v40h136Z',
          }),
        }
      )
    );
  },
  CaretRightIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'm181.66 133.66-80 80a8 8 0 0 1-11.32-11.32L164.69 128 90.34 53.66a8 8 0 0 1 11.32-11.32l80 80a8 8 0 0 1 0 11.32Z',
          }),
        }
      )
    );
  };
const ContextMenuItem = ({
  name: e,
  icon: t,
  shortcut: n,
  disabled: r = !1,
  children: o,
  onClick: i,
}) => {
  const [a, s] = useState(!1);
  return jsxs('div', {
    css: {
      padding: '8px 16px 8px 8px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      color: r ? 'rgba(36,49,61,.4)' : 'rgb(13, 18, 22)',
      cursor: r ? 'not-allowed' : 'pointer',
      ':hover': { background: r ? void 0 : 'rgba(64,87,109,.07)' },
    },
    onMouseOver: () => s(!0),
    onMouseOut: () => s(!1),
    onMouseLeave: () => s(!1),
    onClick: () => !r && i && i(),
    children: [
      jsx('div', { css: { fontSize: 20 }, children: t }),
      jsx('div', {
        css: { marginLeft: 8, fontSize: 14, flexGrow: 1, whiteSpace: 'nowrap' },
        children: e,
      }),
      jsx('div', {
        css: {
          width: 48,
          paddingLeft: 8,
          '@media (max-width: 900px)': { display: 'none' },
        },
      }),
      (o || n) &&
        jsxs('div', {
          css: {
            height: 24,
            lineHeight: '24px',
            fontSize: n ? 12 : 20,
            padding: n ? '0 8px' : 0,
            marginLeft: 8,
            background: n ? 'rgba(64,87,109,.07)' : void 0,
            borderRadius: 4,
            whiteSpace: 'nowrap',
            '@media (max-width: 900px)': { display: 'none' },
          },
          children: [n, o && jsx(CaretRightIcon, {})],
        }),
      a && o,
    ],
  });
};
var AlignBottomIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M224 216a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8Zm-88-40V80a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16Zm16 0h40V80h-40Zm-104 0V40a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16v136a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16Zm16 0h40V40H64Z',
          }),
        }
      )
    );
  },
  AlignTopIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M224 40a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8Zm-16 40v96a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16Zm-16 0h-40v96h40Zm-72 0v136a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16Zm-16 0H64v136h40Z',
          }),
        }
      )
    );
  },
  AlignRightIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M224 40v176a8 8 0 0 1-16 0V40a8 8 0 0 1 16 0Zm-32 24v40a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V64a16 16 0 0 1 16-16h96a16 16 0 0 1 16 16Zm-16 0H80v40h96Zm16 88v40a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16v-40a16 16 0 0 1 16-16h136a16 16 0 0 1 16 16Zm-16 0H40v40h136Z',
          }),
        }
      )
    );
  },
  AlignCenterHorizontalIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M208 136h-72v-16h48a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16h-48V32a8 8 0 0 0-16 0v16H72a16 16 0 0 0-16 16v40a16 16 0 0 0 16 16h48v16H48a16 16 0 0 0-16 16v40a16 16 0 0 0 16 16h72v16a8 8 0 0 0 16 0v-16h72a16 16 0 0 0 16-16v-40a16 16 0 0 0-16-16ZM72 64h112v40H72Zm136 128H48v-40h160v40Z',
          }),
        }
      )
    );
  },
  AlignCenterVerticalIcon = function (e) {
    return jsx$1(
      'svg',
      _extends$1(
        {
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 256 256',
          fill: 'currentColor',
          width: '1em',
          height: '1em',
        },
        e,
        {
          children: jsx$1('path', {
            d: 'M224 120h-16V72a16 16 0 0 0-16-16h-40a16 16 0 0 0-16 16v48h-16V48a16 16 0 0 0-16-16H64a16 16 0 0 0-16 16v72H32a8 8 0 0 0 0 16h16v72a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16v-72h16v48a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16v-48h16a8 8 0 0 0 0-16Zm-120 88H64V48h40Zm88-24h-40V72h40Z',
          }),
        }
      )
    );
  };
const SubMenu = ({ transform: r, children: e }) => {
  const o = useRef(null),
    [t, i] = useState({ x: -9999, y: -9999 });
  return (
    useEffect(() => {
      var e, t, n;
      o.current &&
        o.current.parentElement &&
        ((e = { x: 0, y: 0 }),
        (t = o.current.parentElement),
        (n = o.current.getBoundingClientRect()),
        r.y + t.offsetTop + n.height > window.innerHeight
          ? (e.y =
              t.offsetTop - (r.y + t.offsetTop + n.height - window.innerHeight))
          : (e.y = t.offsetTop),
        r.x + t.offsetWidth + n.width > window.innerWidth
          ? (e.x = -n.width)
          : (e.x = t.offsetLeft + t.offsetWidth),
        i(e));
    }, [r]),
    jsx('div', {
      ref: o,
      css: {
        position: 'fixed',
        top: 0,
        left: 0,
        transform: getTransformStyle({ position: t }),
        paddingLeft: 8,
        paddingRight: 8,
      },
      children: jsx('div', {
        css: {
          background: 'white',
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 4,
          zIndex: 30,
          boxShadow:
            '0 0 0 1px rgba(64,87,109,.07),0 2px 12px rgba(53,71,90,.2)',
        },
        children: e,
      }),
    })
  );
};
var CaretCircleDoubleDownIcon = function (e) {
  return jsx$1(
    'svg',
    _extends$1(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 256 256',
        fill: 'currentColor',
        width: '1em',
        height: '1em',
      },
      e,
      {
        children: jsx$1('path', {
          d: 'M201.54 54.46A104 104 0 0 0 54.46 201.54 104 104 0 0 0 201.54 54.46Zm-11.31 135.77a88 88 0 1 1 0-124.46 88.11 88.11 0 0 1 0 124.46ZM165.66 82.34a8 8 0 0 1 0 11.32l-32 32a8 8 0 0 1-11.32 0l-32-32a8 8 0 0 1 11.32-11.32L128 108.69l26.34-26.35a8 8 0 0 1 11.32 0Zm0 56a8 8 0 0 1 0 11.32l-32 32a8 8 0 0 1-11.32 0l-32-32a8 8 0 0 1 11.32-11.32L128 164.69l26.34-26.35a8 8 0 0 1 11.32 0Z',
        }),
      }
    )
  );
};
const useForwardedRef = (e) => {
    const t = useRef(null);
    return (
      useEffect(() => {
        e && ('function' == typeof e ? e(t.current) : (e.current = t.current));
      }),
      t
    );
  },
  LayerContextMenu = (e, t) => {
    const { selectedLayerIds: n, selectedLayers: r } = useSelectedLayers(),
      o = useForwardedRef(t),
      [i, a] = useState({ x: -9999, y: -9999 }),
      {
        state: s,
        openMenu: l,
        actions: c,
        pageIndex: u,
        pageSize: d,
        rootLayer: p,
      } = useEditor((e) => ({
        openMenu: e.openMenu,
        pageIndex: e.activePage,
        pageSize: e.pageSize,
        rootLayer: e.pages[e.activePage] && e.pages[e.activePage].layers.ROOT,
      })),
      f = r.find((e) => 'Image' === e.data.type);
    var t = useCallback(async () => {
        await paste({ actions: c }), c.hideContextMenu();
      }, [c, u]),
      h = useCallback(() => {
        n.includes('ROOT') || (c.deleteLayer(u, n), c.hideContextMenu());
      }, [c, n]);
    const m =
        0 ===
        (null === p || void 0 === p
          ? void 0
          : p.data.child.findIndex((e) => n.includes(e))),
      g =
        (null === p || void 0 === p
          ? void 0
          : p.data.child.findLastIndex((e) => n.includes(e))) ===
        ((null === p || void 0 === p ? void 0 : p.data.child.length) || 0) - 1;
    const v = (e) => {
      c.setAlign(e), c.hideContextMenu();
    };
    var y;
    return (
      useEffect(() => {
        var e, t;
        (e = null == (e = o.current) ? void 0 : e.getBoundingClientRect()),
          (t = { x: -9999, y: -9999 }),
          l &&
            ((t.x = 0),
            (t.y = 0),
            e.width + l.clientX > window.innerWidth && (t.x = -e.width),
            e.height + l.clientY > window.innerHeight) &&
            (t.y = window.innerHeight - e.height - l.clientY),
          a(t);
        const n = () => {
          c.hideContextMenu();
        };
        return (
          window.addEventListener('resize', n),
          () => {
            window.removeEventListener('resize', n);
          }
        );
      }, [o, l]),
      l
        ? ((y = !!r.find((e) => isGroupLayer(e))),
          jsxs('div', {
            ref: o,
            css: {
              position: 'fixed',
              top: 0,
              left: 0,
              background: 'white',
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 4,
              zIndex: 30,
              boxShadow:
                '0 0 0 1px rgba(64,87,109,.07),0 2px 12px rgba(53,71,90,.2)',
              transform: getTransformStyle({
                position: { x: l.clientX + i.x, y: l.clientY + i.y },
              }),
              '@media (max-width: 900px)': {
                bottom: 0,
                top: 'auto',
                transform: 'none',
                display: 'flex',
                right: 0,
                padding: 0,
              },
            },
            children: [
              jsx('div', {
                css: {
                  display: 'none',
                  '@media (max-width: 900px)': {
                    flexShrink: 0,
                    fontSize: 24,
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#EBECF0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    margin: 16,
                  },
                },
                onClick: () => c.hideContextMenu(),
                children: jsx(XIcon, {}),
              }),
              jsxs('div', {
                css: {
                  '@media (max-width: 900px)': {
                    overflowX: 'auto',
                    flexGrow: 1,
                    padding: 16,
                    display: 'flex',
                  },
                },
                children: [
                  !n.includes('ROOT') &&
                    jsx(ContextMenuItem, {
                      name: 'Copy',
                      icon: jsx(CopyIcon, {}),
                      shortcut: 'Ctrl+C',
                      onClick: async () => {
                        await copy(s, { pageIndex: u, layerIds: n }),
                          c.hideContextMenu();
                      },
                    }),
                  !n.includes('ROOT') &&
                    jsxs(Fragment$1, {
                      children: [
                        jsx(ContextMenuItem, {
                          name: 'Paste',
                          icon: jsx(ClipboardIcon, {}),
                          shortcut: 'Ctrl+V',
                          onClick: t,
                        }),
                        jsx(ContextMenuItem, {
                          name: 'Duplicate',
                          icon: jsx(DuplicateIcon, {}),
                          shortcut: 'Ctrl+D',
                          onClick: () => {
                            duplicate(s, {
                              pageIndex: u,
                              layerIds: n,
                              actions: c,
                            }),
                              c.hideContextMenu();
                          },
                        }),
                        jsx(ContextMenuItem, {
                          name: 'Delete',
                          icon: jsx(TrashIcon, {}),
                          shortcut: 'Delete',
                          onClick: h,
                        }),
                      ],
                    }),
                  !n.includes('ROOT') &&
                    jsxs(Fragment$1, {
                      children: [
                        jsx('div', {
                          css: {
                            marginTop: 8,
                            marginBottom: 8,
                            height: 1,
                            borderBottom: '1px solid rgba(57,76,96,.15)',
                            width: '100%',
                          },
                        }),
                        jsx(ContextMenuItem, {
                          name: 'Layer',
                          icon: jsx(LayersIcon, {}),
                          children: jsxs(SubMenu, {
                            transform: {
                              x: l.clientX + i.x,
                              y: l.clientY + i.y,
                            },
                            children: [
                              jsx(ContextMenuItem, {
                                name: 'Bring Forward',
                                icon: jsx(CaretCircleUpIcon, {}),
                                shortcut: 'Ctrl+]',
                                disabled: g,
                                onClick: () => {
                                  g ||
                                    (c.bringForward(u, n), c.hideContextMenu());
                                },
                              }),
                              jsx(ContextMenuItem, {
                                name: 'Bring to Front',
                                icon: jsx(CaretCircleDoubleUpIcon, {}),
                                shortcut: 'Ctrl+Alt+]',
                                disabled: g,
                                onClick: () => {
                                  g ||
                                    (c.bringToFront(u, n), c.hideContextMenu());
                                },
                              }),
                              jsx(ContextMenuItem, {
                                name: 'Send Backward',
                                icon: jsx(CaretCircleDownIcon, {}),
                                shortcut: 'Ctrl+[',
                                disabled: m,
                                onClick: () => {
                                  m ||
                                    (c.sendBackward(u, n), c.hideContextMenu());
                                },
                              }),
                              jsx(ContextMenuItem, {
                                name: 'Send to Back',
                                icon: jsx(CaretCircleDoubleDownIcon, {}),
                                shortcut: 'Ctrl+Alt+[',
                                disabled: m,
                                onClick: () => {
                                  m ||
                                    (c.sendToBack(u, n), c.hideContextMenu());
                                },
                              }),
                              jsx(ContextMenuItem, {
                                name: 'Show Layers',
                                icon: jsx(LayersIcon, {}),
                                onClick: () => {
                                  c.setSidebar('LAYER_MANAGEMENT'),
                                    c.hideContextMenu();
                                },
                              }),
                            ],
                          }),
                        }),
                        jsx(ContextMenuItem, {
                          name: 'Align',
                          icon: jsx(AlignLeftIcon, {}),
                          children: jsxs(SubMenu, {
                            transform: {
                              x: l.clientX + i.x,
                              y: l.clientY + i.y,
                            },
                            children: [
                              jsx(ContextMenuItem, {
                                name: 'Left',
                                icon: jsx(AlignLeftIcon, {}),
                                onClick: () => v('left'),
                              }),
                              jsx(ContextMenuItem, {
                                name: 'Center',
                                icon: jsx(AlignCenterHorizontalIcon, {}),
                                onClick: () => v('center'),
                              }),
                              jsx(ContextMenuItem, {
                                name: 'Right',
                                icon: jsx(AlignRightIcon, {}),
                                onClick: () => v('right'),
                              }),
                              jsx(ContextMenuItem, {
                                name: 'Top',
                                icon: jsx(AlignTopIcon, {}),
                                onClick: () => v('top'),
                              }),
                              jsx(ContextMenuItem, {
                                name: 'Middle',
                                icon: jsx(AlignCenterVerticalIcon, {}),
                                onClick: () => v('middle'),
                              }),
                              jsx(ContextMenuItem, {
                                name: 'Bottom',
                                icon: jsx(AlignBottomIcon, {}),
                                onClick: () => v('bottom'),
                              }),
                            ],
                          }),
                        }),
                        jsx('div', {
                          css: {
                            marginTop: 8,
                            marginBottom: 8,
                            height: 1,
                            borderBottom: '1px solid rgba(57,76,96,.15)',
                            width: '100%',
                          },
                        }),
                      ],
                    }),
                  1 < n.length &&
                    jsx(ContextMenuItem, {
                      name: 'Group',
                      icon: jsx(BoundingBoxIcon, {}),
                      onClick: () => {
                        c.group(n), c.hideContextMenu();
                      },
                    }),
                  y &&
                    jsx(ContextMenuItem, {
                      name: 'Ungroup',
                      icon: jsx(ShapesIcon, {}),
                      onClick: () => {
                        1 === n.length && c.ungroup(n[0]), c.hideContextMenu();
                      },
                    }),
                  !n.includes('ROOT') &&
                    jsx(ContextMenuItem, {
                      name: 'Lock',
                      icon: jsx(LockKeyIcon, {}),
                      onClick: () => {
                        c.lock(u, n), c.hideContextMenu();
                      },
                    }),
                  1 === n.length &&
                    isFrameLayer(r[0]) &&
                    r[0].data.props.image &&
                    jsx(ContextMenuItem, {
                      name: 'Detach Image',
                      icon: jsx(SelectionBackgroundIcon, {}),
                      onClick: () => {
                        var e, t, n;
                        isFrameLayer(r[0]) &&
                          (e = r[0].data.props.image) &&
                          ((n = { boxSize: { width: 0, height: 0 } }),
                          d.width / d.height <
                          (t = e.boxSize.width / e.boxSize.height)
                            ? ((n.boxSize.width = 0.8 * d.width),
                              (n.boxSize.height = n.boxSize.width / t))
                            : ((n.boxSize.height = 0.8 * d.height),
                              (n.boxSize.width = n.boxSize.height * t)),
                          c.addImageLayer(
                            { url: e.url, thumb: e.thumb },
                            n.boxSize
                          ),
                          c.history
                            .merge()
                            .setProp(u, r[0].id, { image: null }),
                          c.hideContextMenu());
                      },
                    }),
                  f &&
                    1 === n.length &&
                    jsx(ContextMenuItem, {
                      name: 'Set as Background Image',
                      icon: jsx(SelectionForegroundIcon, {}),
                      onClick: () => {
                        var e, t, n;
                        f &&
                          ((e = d.width / d.height),
                          (t =
                            (n = f.data.props.image).boxSize.width /
                            n.boxSize.height),
                          (n = Object.assign(
                            Object.assign({}, lodashExports.cloneDeep(n)),
                            { rotate: 0 }
                          )),
                          t < e
                            ? ((n.boxSize.width = d.width),
                              (n.boxSize.height = d.width / t),
                              (n.position.y =
                                (n.boxSize.height - d.height) / -2),
                              (n.position.x = 0))
                            : ((n.boxSize.height = d.height),
                              (n.boxSize.width = d.height * t),
                              (n.position.x = (n.boxSize.width - d.width) / -2),
                              (n.position.y = 0)),
                          c.setProp(u, 'ROOT', { image: n }),
                          c.history.merge().deleteLayer(u, f.id)),
                          c.hideContextMenu();
                      },
                    }),
                  1 === n.length &&
                    n.includes('ROOT') &&
                    (null ==
                    (t = null === p || void 0 === p ? void 0 : p.data.props)
                      ? void 0
                      : t.image) &&
                    jsx(ContextMenuItem, {
                      name: 'Set Background as Image Layer',
                      icon: jsx(SelectionBackgroundIcon, {}),
                      onClick: () => {
                        var e, t, n;
                        p &&
                          (e = p.data.props.image) &&
                          ((n = { boxSize: { width: 0, height: 0 } }),
                          d.width / d.height <
                          (t = e.boxSize.width / e.boxSize.height)
                            ? ((n.boxSize.width = 0.8 * d.width),
                              (n.boxSize.height = n.boxSize.width / t))
                            : ((n.boxSize.height = 0.8 * d.height),
                              (n.boxSize.width = n.boxSize.height * t)),
                          c.addImageLayer(
                            { url: e.url, thumb: e.thumb },
                            n.boxSize
                          ),
                          c.history.merge().setProp(u, 'ROOT', { image: null }),
                          c.hideContextMenu());
                      },
                    }),
                ],
              }),
            ],
          }))
        : null
    );
  };
var LayerContextMenu$1 = forwardRef(LayerContextMenu);
const useClickOutside = (n, e, t = 'mousedown', r) => {
    const o = useRef(e),
      i = useCallback(
        (e) => {
          var t = null == n ? void 0 : n.current;
          t && !t.contains(e.target) && o.current(e);
        },
        [n, o]
      );
    useEffect(
      () => (
        window.addEventListener(t, i, r),
        () => {
          window.removeEventListener(t, i, r);
        }
      ),
      [i]
    );
  },
  TransformLayer = (
    { boxSize: e, rotate: t, position: n, transparency: r, children: o },
    i
  ) =>
    jsx('div', {
      ref: i,
      css: {
        touchAction: 'pan-x pan-y pinch-zoom',
        pointerEvents: 'auto',
        position: 'absolute',
      },
      style: {
        width: e.width,
        height: e.height,
        transform: getTransformStyle({ position: n, rotate: t }),
        opacity: r,
      },
      children: o,
    });
var TransformLayer$1 = forwardRef(TransformLayer);
const RenderLayer = () => {
  const {
      id: n,
      comp: r,
      props: o,
      layers: i,
      type: e,
      actions: t,
      parent: a,
    } = useLayer((e) => ({
      id: e.id,
      comp: e.data.comp,
      props: e.data.props,
      layers: e.data.child,
      type: e.data.type,
      parent: e.data.parent,
    })),
    {
      isResize: s,
      pageSize: l,
      isDragging: c,
      isRotate: u,
    } = useEditor((e) => ({
      isResize: e.resizeData.status,
      isDragging: e.dragData.status,
      isRotate: e.rotateData.status,
      pageSize: e.pageSize,
    })),
    d = (e) => {
      s ||
        !['ROOT', null].includes(a) ||
        c ||
        u ||
        (e.stopPropagation(), t.hover());
    },
    p = () => {
      t.hover(null);
    };
  return useMemo(() => {
    if (!r) return null;
    let e = null;
    if (
      (i &&
        0 < i.length &&
        (e = jsx(Fragment$1, {
          children: i.map((e) => jsx(LayerElement, { id: e }, e)),
        })),
      'ROOT' === n)
    ) {
      const t = createElement(r, o, e);
      return jsx('div', {
        onMouseOver: d,
        onMouseLeave: p,
        onMouseOut: p,
        children: t,
      });
    }
    const t = createElement(r, o, e);
    return jsx(TransformLayer$1, {
      boxSize: o.boxSize,
      rotate: o.rotate,
      position: o.position,
      transparency: o.transparency,
      children: jsx('div', {
        onMouseOver: d,
        onMouseLeave: p,
        onMouseOut: p,
        children: t,
      }),
    });
  }, [e, r, o, i, s, l, u, c]);
};
var RenderLayer$1 = React__default$1.memo(RenderLayer);
const LayerElement = ({ id: e }) =>
    jsx(LayerProvider, { id: e, children: jsx(RenderLayer$1, {}) }),
  PageElement = () => jsx(LayerElement, { id: 'ROOT' }),
  ImageEditorHandler = ({ direction: t, onResizeStart: n }) => {
    var e = useMemo(() => {
        var e = {};
        return (
          t.toLowerCase().includes('top') && (e.top = -16),
          t.toLowerCase().includes('left') && (e.left = -16),
          t.toLowerCase().includes('bottom') && (e.bottom = -16),
          t.toLowerCase().includes('right') && (e.right = -16),
          e
        );
      }, [t]),
      r = useCallback(
        (e) => {
          e.stopPropagation(), n(e.nativeEvent, t);
        },
        [n, t]
      );
    return jsx('div', {
      css: Object.assign(
        {
          height: 32,
          width: 32,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'auto',
          zIndex: 50,
        },
        e
      ),
      onMouseDown: r,
      onTouchStart: r,
      children: jsx('div', {
        css: {
          borderRadius: '50%',
          cursor: 'auto',
          width: 12,
          height: 12,
          background: 'white',
          boxShadow:
            '0 0 4px 1px rgba(57,76,96,.15), 0 0 0 1px rgba(43,59,74,.3)',
        },
      }),
    });
  },
  distanceBetweenPoints = (e, t, n) => {
    var r = t.clientX - e.clientX,
      t = t.clientY - e.clientY;
    return Math.sqrt(r * r + t * t) / (n || 1);
  },
  horizontalAndVerticalChange = (e, t, n) => {
    t = ((t - e) * Math.PI) / 180;
    return { width: n * Math.cos(t), height: n * Math.sin(t) };
  },
  angleBetweenPoints = (e, t) =>
    (180 * Math.atan2(t.clientY - e.clientY, t.clientX - e.clientX)) / Math.PI,
  getSizeWithRatio = (e, t, n) => {
    return n
      ? t < (n = e.width / e.height)
        ? Object.assign(Object.assign({}, e), { height: e.width / t })
        : n < t
        ? Object.assign(Object.assign({}, e), { width: e.height * t })
        : e
      : e;
  },
  applyToPoint = (e, t) => ({
    x: e.a * t.x + e.c * t.y,
    y: e.b * t.x + e.d * t.y,
  }),
  visualCorners = (e, t, n) => {
    var r = e.width / 2,
      e = e.height / 2,
      o = { x: -r, y: -e },
      i = { x: r, y: -e },
      a = { x: -r, y: e },
      s = { x: r, y: e },
      o = applyToPoint(t, o),
      i = applyToPoint(t, i),
      a = applyToPoint(t, a),
      t = applyToPoint(t, s);
    return {
      nw: { x: o.x + r + n.x, y: o.y + e + n.y },
      ne: { x: i.x + r + n.x, y: i.y + e + n.y },
      sw: { x: a.x + r + n.x, y: a.y + e + n.y },
      se: { x: t.x + r + n.x, y: t.y + e + n.y },
    };
  },
  getPositionChangesBetweenTwoCorners = (e, t, n) => {
    let r, o;
    switch (n) {
      case 'topRight':
        (r = t.sw.x - e.sw.x), (o = t.sw.y - e.sw.y);
        break;
      case 'bottomLeft':
        (r = t.ne.x - e.ne.x), (o = t.ne.y - e.ne.y);
        break;
      case 'top':
      case 'left':
      case 'topLeft':
        (r = t.se.x - e.se.x), (o = t.se.y - e.se.y);
        break;
      default:
        (r = t.nw.x - e.nw.x), (o = t.nw.y - e.nw.y);
    }
    return { changeX: r, changeY: o };
  },
  useResize = (d) => {
    const p = useEditor((e) => ({ frameScale: e.scale }))['frameScale'];
    return useMemo(
      () => ({
        getResized: (e, t, n, r) => {
          var { boxSize: o, position: i, rotate: a, scale: s } = d(),
            l = o.width / o.height,
            c = new WebKitCSSMatrix(
              getTransformStyle({ position: i, rotate: a })
            ),
            u = distanceBetweenPoints(t, n, p),
            t = horizontalAndVerticalChange(a, angleBetweenPoints(t, n), u),
            n = getNewSize(o, t, i, e),
            u = Object.assign(Object.assign({}, n), {
              width: Math.max(20, n.width),
              height: Math.max(20, n.height),
            }),
            t = getSizeWithRatio(u, l, r),
            n = visualCorners(o, c, i),
            u = visualCorners(t, c, t),
            { changeX: l, changeY: r } = getPositionChangesBetweenTwoCorners(
              n,
              u,
              e
            );
          return {
            boxSize: t,
            position: { x: t.x - l, y: t.y - r },
            rotate: a,
            scale: s,
          };
        },
      }),
      [d, p]
    );
  },
  getNewSize = (e, t, n, r) => {
    switch (r) {
      case 'top':
        return {
          x: n.x,
          y: n.y + t.height,
          width: e.width,
          height: e.height - t.height,
        };
      case 'bottom':
        return { x: n.x, y: n.y, width: e.width, height: e.height + t.height };
      case 'left':
        return {
          x: n.x + t.width,
          y: n.y,
          width: e.width - t.width,
          height: e.height,
        };
      case 'right':
        return { x: n.x, y: n.y, width: e.width + t.width, height: e.height };
      case 'topLeft':
        return {
          x: n.x + t.width,
          y: n.y + t.height,
          width: e.width - t.width,
          height: e.height - t.height,
        };
      case 'bottomLeft':
        return {
          x: n.x + t.width,
          y: n.y,
          width: e.width - t.width,
          height: e.height + t.height,
        };
      case 'bottomRight':
        return {
          x: n.x,
          y: n.y,
          width: e.width + t.width,
          height: e.height + t.height,
        };
      default:
        return {
          x: n.x,
          y: n.y + t.height,
          width: e.width + t.width,
          height: e.height - t.height,
        };
    }
  },
  getImageSize$1 = (e, t, n, r) => {
    var o,
      i = lodashExports.cloneDeep({
        boxSize: e.boxSize,
        position: e.position,
        rotate: e.rotate,
        scale: e.scale,
        image: { boxSize: t.boxSize, position: t.position, rotate: t.rotate },
      }),
      a = t.boxSize.width / t.boxSize.height;
    return (
      0 !== r.width &&
        ((i.boxSize.width += r.width),
        n.toLowerCase().includes('left') &&
          (r.width > Math.abs(i.image.position.x)
            ? ((i.image.position.x = 0),
              (o = r.width - Math.abs(t.position.x)),
              (i.image.boxSize.width += o),
              (i.image.boxSize.height += o * a))
            : (i.image.position.x += r.width)),
        n.toLowerCase().includes('right')) &&
        r.width + e.boxSize.width - t.position.x > t.boxSize.width &&
        ((o = r.width + e.boxSize.width - t.position.x - t.boxSize.width),
        (i.image.boxSize.width += o),
        (i.image.boxSize.height += o * a)),
      0 !== r.height &&
        ((i.boxSize.height += r.height),
        n.toLowerCase().includes('top') &&
          (r.height > Math.abs(i.image.position.y)
            ? ((i.image.position.y = 0),
              (o = r.height - Math.abs(t.position.y)),
              (i.image.boxSize.height += o),
              (i.image.boxSize.width += o / a))
            : (i.image.position.y += r.height)),
        n.toLowerCase().includes('bottom')) &&
        r.height + e.boxSize.height - t.position.y > t.boxSize.height &&
        ((o = r.height + e.boxSize.height - t.position.y - t.boxSize.height),
        (i.image.boxSize.height += o),
        (i.image.boxSize.width += o / a)),
      i
    );
  },
  useResizeImage = ({
    getData: e,
    onResizeStart: o,
    onResize: r,
    onResizeEnd: n,
    lockAspect: i = !1,
  }) => {
    const a = useRef({
        clientX: 0,
        clientY: 0,
        last: { clientX: 0, clientY: 0 },
        direction: 'topRight',
        isResizing: !1,
        lockAspect: i,
      }),
      s = useResize(e)['getResized'],
      l = (e, t) =>
        s(
          a.current.direction,
          a.current,
          { clientX: e, clientY: t },
          a.current.lockAspect
        ),
      c = lodashExports.throttle((e) => {
        e.stopPropagation(), (a.current.e = e);
        var { clientX: e, clientY: t } = getPosition(e),
          n = ((a.current.last = { clientX: e, clientY: t }), l(e, t));
        r(n, a.current.direction, a.current, { clientX: e, clientY: t });
      }, 16),
      u = (e) => {
        e.stopPropagation();
        var { clientX: e, clientY: t } = a.current.last,
          e = l(e, t);
        n && n(e),
          window.removeEventListener('mousemove', c),
          window.removeEventListener('touchmove', c),
          window.removeEventListener('mouseup', u),
          window.removeEventListener('mouseleave', u),
          window.removeEventListener('touchend', u);
      };
    useEffect(() => {
      const e = (e) => {
        (a.current.lockAspect = i || e.shiftKey),
          a.current.e && a.current.isResizing && c(a.current.e);
      };
      return (
        window.addEventListener('keydown', e),
        window.addEventListener('keyup', e),
        () => {
          window.removeEventListener('keydown', e),
            window.removeEventListener('keyup', e);
        }
      );
    }, [c]);
    return {
      startResize: (e, t) => {
        var { clientX: n, clientY: r } = getPosition(e);
        (a.current = {
          clientX: n,
          clientY: r,
          last: { clientX: n, clientY: r },
          direction: t,
          e: e,
          isResizing: !0,
          lockAspect: i,
        }),
          o(e, t),
          window.addEventListener('mousemove', c),
          window.addEventListener('touchmove', c),
          window.addEventListener('mouseup', u, { once: !0 }),
          window.addEventListener('mouseleave', u, { once: !0 }),
          window.addEventListener('touchend', u, { once: !0 });
      },
    };
  };
function useLinkedRef(e) {
  const t = void 0 === e ? useRef() : useRef(e);
  var e = useCallback(() => t.current, []),
    n = useCallback((e) => {
      t.current = e;
    }, []);
  return [t, e, n];
}
const boundingRect = (e, t, n) => {
    var n = (n * Math.PI) / 180,
      r = Math.cos(n),
      n = Math.sin(n),
      o = e.width * Math.abs(r) + e.height * Math.abs(n),
      n = e.width * Math.abs(n) + e.height * Math.abs(r),
      r = t.x + e.width / 2,
      t = t.y + e.height / 2;
    return {
      width: o,
      height: n,
      centerX: r,
      centerY: t,
      x: r - o / 2,
      y: t - n / 2,
    };
  },
  useDrag = ({ getData: r, onDragStart: n }) => {
    const {
        imageEditor: o,
        actions: i,
        scale: a,
      } = useEditor((e) => {
        return { imageEditor: e.imageEditor, scale: e.scale };
      }),
      s = useRef(),
      l = () => {
        window.removeEventListener('mousemove', u),
          window.removeEventListener('touchmove', u),
          window.removeEventListener('mouseup', d),
          window.removeEventListener('mouseleave', d),
          window.removeEventListener('touchend', d);
      },
      c = ({ clientX: e, clientY: t }) => {
        var n = distanceBetweenPoints(s.current, { clientX: e, clientY: t }, a),
          e = horizontalAndVerticalChange(
            r(),
            angleBetweenPoints(s.current, { clientX: e, clientY: t }),
            n
          );
        return { x: e.width, y: e.height };
      },
      u = lodashExports.throttle((e) => {
        var t;
        o &&
          s.current &&
          (e.stopPropagation(),
          ({ clientX: e, clientY: t } = getPosition(e)),
          (s.current.moveX = e),
          (s.current.moveY = t),
          (e = c({ clientX: e, clientY: t })),
          (t = boundingRect(
            o.boxSize,
            { x: o.image.position.x + e.x, y: o.image.position.y + e.y },
            0
          )),
          (e = Math.min(Math.max(t.x, t.width - o.image.boxSize.width), 0)),
          (t = Math.min(Math.max(t.y, t.height - o.image.boxSize.height), 0)),
          o) &&
          i.updateImageEditor({ image: { position: { x: e, y: t } } });
      }, 16),
      d = () => {
        var e, t;
        o &&
          s.current &&
          (({ moveX: e, moveY: t } = s.current),
          (e = c({ clientX: e, clientY: t })),
          (t = boundingRect(
            o.boxSize,
            { x: o.image.position.x + e.x, y: o.image.position.y + e.y },
            0
          )),
          (e = Math.min(Math.max(t.x, t.width - o.image.boxSize.width), 0)),
          (t = Math.min(Math.max(t.y, t.height - o.image.boxSize.height), 0)),
          o && i.updateImageEditor({ image: { position: { x: e, y: t } } }),
          l());
      };
    return {
      startDrag: (e) => {
        e.stopPropagation();
        var { clientX: e, clientY: t } = getPosition(e.nativeEvent);
        (s.current = { clientX: e, clientY: t, moveX: e, moveY: t }),
          n && n(),
          window.addEventListener('mousemove', u),
          window.addEventListener('touchmove', u),
          window.addEventListener('mouseup', d, { once: !0 }),
          window.addEventListener('mouseleave', d, { once: !0 }),
          window.addEventListener('touchend', d, { once: !0 });
      },
    };
  },
  ImageEditorControl = () => {
    const r = useRef(null),
      o = useRef(null),
      [m, e, t] = useLinkedRef(),
      [, n, i] = useLinkedRef(),
      {
        imageEditor: g,
        actions: v,
        originalLayer: a,
        scale: u,
      } = useEditor((e) => {
        var t = e.imageEditor;
        return {
          imageEditor: t,
          scale: e.scale,
          originalLayer: e.pages[t.pageIndex].layers[t.layerId],
        };
      });
    var s = useDrag({
        getData: n,
        onDragStart: () => {
          g && i(g.rotate);
        },
      })['startDrag'],
      l = (useEffect(() => {
        const e = (e) => {
          var t = null === o || void 0 === o ? void 0 : o.current,
            n = null === r || void 0 === r ? void 0 : r.current;
          !t ||
            t.contains(e.target) ||
            ('ROOT' !== g.layerId && null != n && n.contains(e.target)) ||
            v.closeImageEditor();
        };
        return (
          window.addEventListener('mousedown', e, { capture: !0 }),
          () => {
            window.removeEventListener('mousedown', e, { capture: !0 });
          }
        );
      }, []),
      useResizeImage({
        lockAspect: !0,
        getData: e,
        onResizeStart: () => {
          g &&
            t({
              boxSize: g.image.boxSize,
              position: g.image.position,
              rotate: g.image.rotate,
            });
        },
        onResize: ({ boxSize: o, position: i, rotate: a }, s) => {
          if (g && m.current) {
            let e = Math.min(i.x, 0),
              t = Math.min(i.y, 0),
              n = o.width,
              r = o.height;
            var l,
              c,
              u,
              d = m.current.boxSize.width / m.current.boxSize.height,
              p = -1 * m.current.position.x - -1 * m.current.position.y * d,
              f = -1 * m.current.position.y - (-1 * m.current.position.x) / d,
              h = m.current.position.x / m.current.position.y;
            ['topLeft'].includes(s)
              ? ((c = g.boxSize.width / g.boxSize.height),
                (l = i.y - t),
                (u = i.x - e),
                (0 < l || 0 < u) &&
                  (c < h
                    ? ((e = -p), (n += i.x - e), (r += +i.y))
                    : ((t = -f), (n += i.x), (r += +i.y - t))))
              : 'bottomRight' === s &&
                (o.width < g.boxSize.width - g.image.position.x ||
                  o.height < g.boxSize.height - g.image.position.y)
              ? d <
                (l = Math.max(o.width, g.boxSize.width - g.image.position.x)) /
                  (u = Math.max(
                    o.height,
                    g.boxSize.height - g.image.position.y
                  ))
                ? ((n = g.boxSize.width - g.image.position.x), (r = n / d))
                : l / u < d &&
                  ((r = g.boxSize.height - g.image.position.y), (n = r * d))
              : 'topRight' === s &&
                (0 < i.y || o.width < g.boxSize.width - m.current.position.x)
              ? ((c = g.boxSize.width - m.current.position.x),
                d <
                ((p =
                  (null == (h = m.current) ? void 0 : h.boxSize.width) - c) /
                  m.current.position.y) *
                  -1
                  ? ((r = Math.max(
                      m.current.boxSize.height + m.current.position.y,
                      o.height
                    )),
                    (n = r * d))
                  : ((n = Math.max(
                      g.boxSize.width - m.current.position.x,
                      o.width
                    )),
                    (r = n / d),
                    (t = m.current.position.y + p / d)))
              : 'bottomLeft' === s &&
                (0 < i.x ||
                  o.height < g.boxSize.height - m.current.position.y) &&
                ((f = g.boxSize.height - m.current.position.y),
                d <
                (((u =
                  (null == (l = m.current) ? void 0 : l.boxSize.height) - f) /
                  m.current.position.x) *
                  -1 || 0)
                  ? ((n = Math.max(
                      m.current.boxSize.width + m.current.position.x,
                      o.width
                    )),
                    (r = n / d))
                  : ((r = Math.max(
                      g.boxSize.height - m.current.position.y,
                      o.height
                    )),
                    (n = r * d),
                    (e = m.current.position.x + u * d))),
              v.updateImageEditor({
                image: {
                  boxSize: { width: n, height: r },
                  position: { x: e, y: t },
                  rotate: a,
                },
              });
          }
        },
      }))['startResize'];
    return (
      useResizeImage({
        getData: e,
        onResizeStart: () => {
          g &&
            t({ boxSize: g.boxSize, position: g.position, rotate: g.rotate });
        },
        onResize: ({ boxSize: n, position: r, rotate: o }, i, a, s) => {
          if (g && m.current) {
            var l = distanceBetweenPoints(a, s, u),
              c = horizontalAndVerticalChange(
                g.rotate,
                angleBetweenPoints(a, s),
                l
              );
            let e = g.image.position.x,
              t = g.image.position.y;
            switch (i) {
              case 'topLeft':
                (e -= c.width), (t -= c.height);
                break;
              case 'bottomLeft':
                e -= c.width;
                break;
              case 'topRight':
                t -= c.height;
            }
            (a = Math.min(e, 0)), (s = Math.min(t, 0));
            v.updateImageEditor({
              boxSize: {
                width: Math.min(n.width + (a - e), g.image.boxSize.width + a),
                height: Math.min(
                  n.height + (s - t),
                  g.image.boxSize.height + s
                ),
              },
              position: {
                x: Math.max(r.x, m.current.position.x + g.image.position.x),
                y: Math.max(r.y, m.current.position.y + g.image.position.y),
              },
              rotate: o,
              image: { position: { x: a, y: s } },
            });
          }
        },
        onResizeEnd: ({ boxSize: e, position: t, rotate: n }) => {
          g &&
            v.setProp(g.pageIndex, g.layerId, {
              boxSize: e,
              position: t,
              rotate: n,
            });
        },
      }),
      jsxs('div', {
        css: {
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 4,
        },
        children: [
          'ROOT' !== g.layerId &&
            !isFrameLayer(a) &&
            jsx('div', {
              ref: r,
              css: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: g.boxSize.width * u,
                height: g.boxSize.height * u,
                outline: '2px solid #3d8eff',
                boxShadow:
                  '0 0 0 1px hsla(0,0%,100%,.07), inset 0 0 0 1px hsla(0,0%,100%,.07)',
                transform: getTransformStyle({
                  position: { x: g.position.x * u, y: g.position.y * u },
                  rotate: g.rotate,
                }),
              },
              children: !1,
            }),
          jsx('div', {
            css: {
              width: g.boxSize.width * u,
              height: g.boxSize.height * u,
              left: 0,
              top: 0,
              position: 'absolute',
              transform: getTransformStyle({
                position: { x: g.position.x * u, y: g.position.y * u },
                rotate: g.rotate,
              }),
            },
            children: jsxs('div', {
              ref: o,
              css: {
                width: g.image.boxSize.width * u,
                height: g.image.boxSize.height * u,
                left: 0,
                top: 0,
                position: 'absolute',
                outline: '2px solid rgba(61, 142, 255,.5)',
                boxShadow:
                  '0 0 0 1px hsla(0,0%,100%,.07), inset 0 0 0 1px hsla(0,0%,100%,.07)',
                transform: getTransformStyle({
                  position: {
                    x: g.image.position.x * u,
                    y: g.image.position.y * u,
                  },
                  rotate: g.image.rotate,
                }),
              },
              onTouchStart: s,
              onMouseDown: s,
              children: [
                jsx('div', {
                  css: {
                    position: 'absolute',
                    inset: -12,
                    pointerEvents: 'auto',
                    cursor: 'move',
                  },
                }),
                jsx(ImageEditorHandler, {
                  direction: 'topLeft',
                  onResizeStart: l,
                }),
                jsx(ImageEditorHandler, {
                  direction: 'topRight',
                  onResizeStart: l,
                }),
                jsx(ImageEditorHandler, {
                  direction: 'bottomRight',
                  onResizeStart: l,
                }),
                jsx(ImageEditorHandler, {
                  direction: 'bottomLeft',
                  onResizeStart: l,
                }),
              ],
            }),
          }),
        ],
      })
    );
  },
  positionOfObjectInsideAnother = (e, t) => {
    var n = boundingRect(e.boxSize, e.position, e.rotate),
      r = boundingRect(
        t.boxSize,
        {
          x: e.position.x + t.position.x * (e.scale || 1),
          y: e.position.y + t.position.y * (e.scale || 1),
        },
        e.rotate
      ),
      o = n.centerX,
      n = n.centerY,
      i = r.centerX,
      r = r.centerY,
      a = Math.cos((e.rotate * Math.PI) / 180),
      s = Math.sin((e.rotate * Math.PI) / 180);
    const l = o + (i - o) * a - (r - n) * s,
      c = n + (i - o) * s + (r - n) * a;
    (o = l - i), (s = c - r);
    return {
      x: e.position.x + t.position.x * (e.scale || 1) + o,
      y: e.position.y + t.position.y * (e.scale || 1) + s,
      rotate: e.rotate + t.rotate,
    };
  },
  ImageEditor = () => {
    var e,
      t = useRef(null),
      {
        imageEditor: n,
        originalLayer: r,
        scale: o,
      } = useEditor((e) => {
        var t = e.imageEditor;
        return {
          imageEditor: t,
          scale: e.scale,
          originalLayer: t ? e.pages[t.pageIndex].layers[t.layerId] : null,
        };
      });
    return n && r
      ? ((e = positionOfObjectInsideAnother(n, n.image)),
        jsxs('div', {
          css: { position: 'absolute', inset: 0, pointerEvents: 'none' },
          children: [
            jsx('div', {
              css: {
                width: n.image.boxSize.width * o,
                height: n.image.boxSize.height * o,
                left: 0,
                top: 0,
                position: 'absolute',
                transform: getTransformStyle({
                  position: { x: e.x * o, y: e.y * o },
                  rotate: e.rotate,
                }),
                opacity: 0.5,
              },
              children: jsx('div', {
                css: { width: '100%', height: '100%' },
                children: jsx('img', {
                  src: n.image.url,
                  crossOrigin: 'anonymous',
                  css: {
                    display: 'block',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    pointerEvents: 'none',
                    objectFit: 'fill',
                  },
                }),
              }),
            }),
            jsx('div', {
              ref: t,
              css: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: n.boxSize.width * o,
                height: n.boxSize.height * o,
                transform: getTransformStyle({
                  position: { x: n.position.x * o, y: n.position.y * o },
                  rotate: n.rotate,
                }),
                overflow: 'hidden',
                clipPath: isFrameLayer(r)
                  ? scalePath(r.data.props.clipPath, r.data.props.scale * o)
                  : void 0,
              },
              children: jsx('div', {
                css: {
                  width: n.image.boxSize.width * o,
                  height: n.image.boxSize.height * o,
                  transform: getTransformStyle({
                    position: {
                      x: n.image.position.x * o,
                      y: n.image.position.y * o,
                    },
                    rotate: n.image.rotate,
                  }),
                  opacity: 1,
                  position: 'absolute',
                  left: 0,
                  top: 0,
                },
                children: jsx('div', {
                  css: { width: '100%', height: '100%' },
                  children: jsx('img', {
                    src: n.image.url,
                    crossOrigin: 'anonymous',
                    css: {
                      display: 'block',
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      pointerEvents: 'none',
                      objectFit: 'fill',
                    },
                  }),
                }),
              }),
            }),
            jsx(ImageEditorControl, {}),
          ],
        }))
      : null;
  },
  getVirtualDomHeight = (e, t, n) => {
    var r = document.createElement('div'),
      t =
        ((r.style.width = t / n + 'px'),
        (r.style.visibility = 'hidden'),
        (r.style.top = '-9999px'),
        (r.style.transform = `scale(${n})`),
        (r.style.position = 'fixed'),
        r.appendChild(e),
        document.body.appendChild(r),
        e.clientHeight * n);
    return document.body.removeChild(r), { clientHeight: t };
  },
  useResizeLayer = ({
    options: { scalable: a },
    getLayerData: e,
    setLayerData: o,
    controlBox: s,
    getControlBoxData: l,
    setControlBoxData: c,
    onResize: r,
    onResizeStop: n,
  }) => {
    const u = useRef({
        clientX: 0,
        clientY: 0,
        lastClientX: 0,
        lastClientY: 0,
        direction: 'right',
        isResizing: !1,
        shiftKey: !1,
      }),
      d = useResize(l)['getResized'],
      { selectedLayers: p, selectedLayerIds: f } = useSelectedLayers(),
      h = useEditor()['actions'],
      i = (e, t) => {
        var n,
          r,
          o,
          i = 1 === p.length && isImageLayer(p[0]);
        return a
          ? ((n = !['top', 'left', 'right', 'bottom'].includes(
              u.current.direction
            )),
            (r = d(
              u.current.direction,
              u.current,
              { clientX: e, clientY: t },
              n
            )),
            (o = l()),
            Object.assign(Object.assign({}, r), {
              scale: n
                ? (r.boxSize.width / o.boxSize.width) * (o.scale || 1)
                : o.scale,
            }))
          : d(
              u.current.direction,
              u.current,
              { clientX: e, clientY: t },
              (u.current.shiftKey && !i) ||
                1 < f.length ||
                (i &&
                  !u.current.shiftKey &&
                  !['top', 'left', 'right', 'bottom'].includes(
                    u.current.direction
                  ))
            );
      },
      m = ({ clientX: e, clientY: t }) => {
        var n = u.current,
          e = i(e, t);
        return !a ||
          !['top', 'left', 'right', 'bottom'].includes(n.direction) ||
          1 < f.length ||
          !isTextLayer(p[0])
          ? e
          : ((n = getVirtualDomHeight(
              null == (t = p[0].data.editor) ? void 0 : t.dom,
              e.boxSize.width,
              e.scale || 1
            )['clientHeight']),
            mergeWithoutArray(e, { boxSize: { height: n } }));
      },
      g = (r) => {
        const o = e(),
          i = l(),
          a = r.boxSize.width / i.boxSize.width,
          s = {};
        return (
          p.forEach(({ id: e }) => {
            var t = o[e],
              n = { width: t.boxSize.width * a, height: t.boxSize.height * a };
            s[e] = {
              position: {
                x:
                  i.position.x -
                  (i.position.x - t.position.x) * a +
                  (r.position.x - i.position.x),
                y:
                  i.position.y -
                  (i.position.y - t.position.y) * a +
                  (r.position.y - i.position.y),
              },
              boxSize: n,
              scale: void 0 !== t.scale ? t.scale * a : void 0,
              rotate: t.rotate,
            };
          }),
          s
        );
      },
      v = lodashExports.throttle((e) => {
        var t, n;
        u.current.isResizing &&
          (({ clientX: t, clientY: n } = getPosition(e)),
          (u.current.lastClientX = t),
          (u.current.lastClientY = n),
          (u.current.e = e),
          (e = m({ clientX: t, clientY: n })),
          h.setResizeData(!0, f, u.current.direction, e.rotate, e.boxSize, {
            clientX: t,
            clientY: n,
          }),
          1 === f.length
            ? r({
                controlBox: e,
                layers: { [f[0]]: e },
                direction: u.current.direction,
                lockAspect:
                  (!u.current.shiftKey &&
                    !['top', 'left', 'right', 'bottom'].includes(
                      u.current.direction
                    ) &&
                    isImageLayer(p[0])) ||
                  (u.current.shiftKey && !isImageLayer(p[0])),
              })
            : r({
                controlBox: e,
                layers: g(e),
                direction: u.current.direction,
                lockAspect: !0,
              }));
      }, 16),
      y = () => {
        var e, t;
        u.current.isResizing &&
          (({ lastClientX: t, lastClientY: e } = u.current),
          (t = m({ clientX: t, clientY: e })),
          1 === f.length
            ? n({
                controlBox: t,
                layers: { [f[0]]: t },
                direction: u.current.direction,
                lockAspect:
                  (!u.current.shiftKey &&
                    !['top', 'left', 'right', 'bottom'].includes(
                      u.current.direction
                    ) &&
                    isImageLayer(p[0])) ||
                  (u.current.shiftKey && !isImageLayer(p[0])),
              })
            : n({
                controlBox: t,
                layers: g(t),
                direction: u.current.direction,
                lockAspect: !0,
              }),
          (u.current.isResizing = !1),
          h.setResizeData(!1),
          window.removeEventListener('mousemove', v),
          window.removeEventListener('touchmove', v));
      };
    useEffect(() => {
      const e = (e) => {
        (u.current.shiftKey = e.shiftKey),
          u.current.e && u.current.isResizing && v(u.current.e);
      };
      return (
        window.addEventListener('keydown', e),
        window.addEventListener('keyup', e),
        () => {
          window.removeEventListener('keydown', e),
            window.removeEventListener('keyup', e);
        }
      );
    }, [i]);
    return {
      startResizing: (e, t) => {
        if (s) {
          var { clientX: n, clientY: r } = getPosition(e);
          (u.current = {
            clientX: n,
            clientY: r,
            lastClientX: n,
            lastClientY: r,
            direction: t,
            e: e,
            isResizing: !0,
            shiftKey: !1,
          }),
            h.setResizeData(!0, f, u.current.direction, s.rotate, s.boxSize, {
              clientX: n,
              clientY: r,
            }),
            c(s);
          const i = {};
          p.forEach(
            ({
              id: e,
              data: {
                props: { boxSize: t, position: n, rotate: r, scale: o },
              },
            }) => {
              i[e] = lodashExports.cloneDeep({
                boxSize: t,
                position: n,
                rotate: r,
                scale: o,
              });
            }
          ),
            o(i),
            h.history.new(),
            window.addEventListener('mousemove', v),
            window.addEventListener('touchmove', v),
            window.addEventListener('mouseup', y, { once: !0 }),
            window.addEventListener('mouseleave', y, { once: !0 }),
            window.addEventListener('touchend', y, { once: !0 });
        }
      },
    };
  },
  setRightAngle = (e) =>
    (e < 1 && 0 <= e) || (e <= 360 && 359 < e)
      ? 0
      : 44 < e && e < 46
      ? 45
      : 89 < e && e < 91
      ? 90
      : 134 < e && e < 136
      ? 135
      : 179 < e && e < 181
      ? 180
      : 224 < e && e < 226
      ? 225
      : 269 < e && e < 271
      ? 270
      : e,
  useRotateLayer = ({
    pageIndex: r,
    getLayerData: t,
    setLayerData: i,
    pageOffset: n,
    getControlBoxData: o,
    setControlBoxData: a,
    onRotate: s,
  }) => {
    const f = useRef(),
      { selectedLayers: l, selectedLayerIds: h } = useSelectedLayers(),
      {
        scale: c,
        controlBox: u,
        actions: d,
      } = useEditor((e, t) => {
        var n = e.hoveredLayer[r];
        return {
          scale: e.scale,
          controlBox: e.controlBox,
          hoveredLayer: n && t.getLayer(r, n),
        };
      }),
      p = (e) => {
        const a = e - o().rotate,
          s = Math.cos((a * Math.PI) / 180),
          l = Math.sin((a * Math.PI) / 180),
          c = t(),
          u = {},
          d = (null == (e = f.current) ? void 0 : e.centerX) || 0,
          p = (null == (e = f.current) ? void 0 : e.centerY) || 0;
        return (
          h.map((e) => {
            var t = c[e],
              { centerX: n, centerY: r } = Object.assign(
                { centerX: 0, centerY: 0 },
                t
              );
            const o = d + (n - d) * s - (r - p) * l,
              i = p + (n - d) * l + (r - p) * s;
            u[e] = {
              boxSize: t.boxSize,
              rotate: t.rotate + a,
              position: {
                x: t.position.x + (o - n),
                y: t.position.y + (i - r),
              },
              scale: t.scale,
            };
          }),
          u
        );
      },
      m = lodashExports.throttle((e) => {
        var t;
        f.current &&
          (({ clientX: e, clientY: t } = getPosition(e)),
          (f.current.last = { clientX: e, clientY: t }),
          (t =
            (180 *
              Math.atan2(
                t - n.y - f.current.centerY * c,
                e - n.x - f.current.centerX * c
              )) /
              Math.PI -
            (f.current.prevDegree < 230 && 130 < f.current.prevDegree
              ? 0
              : 90)),
          (t = setRightAngle((360 + t) % 360)),
          d.setRotateData(!0, t),
          1 === h.length
            ? s({
                controlBox: Object.assign(Object.assign({}, u), { rotate: t }),
                layers: {
                  [l[0].id]: {
                    boxSize: l[0].data.props.boxSize,
                    position: l[0].data.props.position,
                    scale: l[0].data.props.scale,
                    rotate: t,
                  },
                },
              })
            : s({
                controlBox: Object.assign(Object.assign({}, u), { rotate: t }),
                layers: p(t),
              }));
      }, 16),
      g = () => {
        var e, t;
        f.current &&
          (({ clientX: e, clientY: t } = f.current.last),
          (t =
            (180 *
              Math.atan2(
                t - n.y - f.current.centerY * c,
                e - n.x - f.current.centerX * c
              )) /
              Math.PI -
            (f.current.prevDegree < 230 && 130 < f.current.prevDegree
              ? 0
              : 90)),
          (t = setRightAngle((360 + t) % 360)),
          1 === h.length
            ? s({
                controlBox: Object.assign(Object.assign({}, u), { rotate: t }),
                layers: {
                  [l[0].id]: {
                    boxSize: l[0].data.props.boxSize,
                    position: l[0].data.props.position,
                    scale: l[0].data.props.scale,
                    rotate: t,
                  },
                },
              })
            : s({
                controlBox: Object.assign(Object.assign({}, u), { rotate: t }),
                layers: p(t),
              }),
          (f.current = void 0),
          d.setRotateData(!1),
          window.removeEventListener('touchmove', m),
          window.removeEventListener('mousemove', m),
          window.removeEventListener('mouseup', g),
          window.removeEventListener('mouseleave', g),
          window.removeEventListener('touchend', g));
      };
    return {
      startRotate: (e) => {
        var { clientX: e, clientY: t } = getPosition(e),
          { centerX: n, centerY: r } = boundingRect(
            u.boxSize,
            u.position,
            u.rotate
          );
        f.current = {
          centerX: n,
          centerY: r,
          last: { clientX: e, clientY: t },
          prevDegree: u.rotate,
        };
        const o = {};
        l.forEach((e) => {
          var { centerX: t, centerY: n } = boundingRect(
            e.data.props.boxSize,
            e.data.props.position,
            e.data.props.rotate
          );
          o[e.id] = lodashExports.cloneDeep({
            position: e.data.props.position,
            boxSize: e.data.props.boxSize,
            rotate: e.data.props.rotate,
            scale: e.data.props.scale,
            centerX: t,
            centerY: n,
          });
        }),
          a(u),
          i(o),
          d.setRotateData(!0, setRightAngle(u.rotate)),
          d.history.new(),
          window.addEventListener('touchmove', m),
          window.addEventListener('mousemove', m),
          window.addEventListener('mouseup', g, { once: !0 }),
          window.addEventListener('mouseleave', g, { once: !0 }),
          window.addEventListener('touchend', g, { once: !0 });
      },
    };
  },
  useDisabledFeatures = () => {
    const e = useSelectedLayers()['selectedLayers'],
      n = useMemo(
        () =>
          !!e.find(
            (e) =>
              isTextLayer(e) ||
              isGroupLayer(e) ||
              isFrameLayer(e) ||
              isShapeLayer(e)
          ),
        [JSON.stringify(e.map((e) => e.id))]
      );
    return useMemo(() => {
      const t = {
        vertical: 1 < e.length,
        horizontal: 1 < e.length,
        corners: !1,
        locked: !1,
        rotate: !1,
        scalable: !n,
      };
      return (
        e.forEach((e) => {
          e.data.locked &&
            ((t.locked = !0),
            (t.vertical = !0),
            (t.horizontal = !0),
            (t.corners = !0),
            (t.rotate = !0)),
            isTextLayer(e) && (t.vertical = !0),
            (isFrameLayer(e) || isSvgLayer(e)) &&
              ((t.horizontal = !0), (t.vertical = !0), (t.scalable = !1)),
            isGroupLayer(e) && ((t.horizontal = !0), (t.vertical = !0));
        }),
        t
      );
    }, [e]);
  },
  HANDLER_CORNER_SIZE = 16,
  CornerResizeHandler = ({
    isActive: e,
    top: t,
    left: n,
    bottom: r,
    right: o,
    direction: i,
    rotate: a,
    onResizeStart: s,
  }) => {
    var l = useContext(EditorContext)['config']['assetPath'],
      a = Math.round(
        ((a +
          { bottomLeft: 45, topLeft: 135, topRight: 225, bottomRight: 315 }[i] +
          90) %
          180) /
          10
      );
    const c = (e) => {
      s(e.nativeEvent, i);
    };
    return jsx('div', {
      css: {
        top: t,
        left: n,
        bottom: r,
        right: o,
        position: 'absolute',
        width: 32,
        height: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      children: jsx('div', {
        onTouchStart: (e) => {
          e.stopPropagation(), c(e);
        },
        onMouseDown: (e) => {
          e.stopPropagation(), c(e);
        },
        css: {
          width: HANDLER_CORNER_SIZE,
          height: HANDLER_CORNER_SIZE,
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ':hover': {
            cursor: `url('${l}/cursors/resize/${a}.png') 12 12, auto`,
          },
        },
        children: jsx('div', {
          css: {
            background: e ? '#3d8eff' : 'white',
            width: 12,
            height: 12,
            position: 'absolute',
            borderRadius: '50%',
            boxShadow:
              '0 0 4px 1px rgba(57,76,96,.15), 0 0 0 1px rgba(43,59,74,.3)',
            pointerEvents: 'none',
            ':hover': { background: '#3d8eff' },
          },
        }),
      }),
    });
  },
  HANDLER_SIZE = 16,
  ResizeHandler = ({
    isActive: e,
    boxSize: t,
    width: n,
    height: r,
    top: o,
    left: i,
    right: a,
    bottom: s,
    direction: l,
    rotate: c,
    onResizeStart: u,
  }) => {
    var d = useContext(EditorContext)['config']['assetPath'],
      c = Math.round(
        ((c + { left: 90, top: 180, right: 270, bottom: 0 }[l] + 90) % 180) / 10
      );
    const p = (e) => {
      u(e.nativeEvent, l);
    };
    return jsx('div', {
      css: {
        width: n,
        height: r,
        top: o,
        left: i,
        right: a,
        bottom: s,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
        clipPath: ['top', 'bottom'].includes(l)
          ? `inset(0 ${HANDLER_SIZE / 2}px)`
          : `inset(${HANDLER_SIZE / 2}px 0)`,
        ':hover': { cursor: `url('${d}/cursors/resize/${c}.png') 12 12, auto` },
      },
      onTouchStart: (e) => {
        e.stopPropagation(), p(e);
      },
      onMouseDown: (e) => {
        e.stopPropagation(), p(e);
      },
      children:
        ((50 < t.width && ['top', 'bottom'].includes(l)) ||
          (50 < t.height && ['left', 'right'].includes(l))) &&
        jsx('div', {
          css: {
            background: e ? '#3d8eff' : 'white',
            width: ['top', 'bottom'].includes(l) ? 18 : 6,
            height: ['top', 'bottom'].includes(l) ? 6 : 18,
            borderRadius: 3,
            position: 'absolute',
            boxShadow:
              '0 0 4px 1px rgba(57,76,96,.15), 0 0 0 1px rgba(43,59,74,.3)',
            ':hover': {
              background: '#3d8eff',
              boxShadow: '0 0 0 1px rgba(57,76,96,.15)',
            },
          },
        }),
    });
  };
var ArrowsClockwiseIcon = function (e) {
  return jsx$1(
    'svg',
    _extends$1(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 256 256',
        fill: 'currentColor',
        width: '1em',
        height: '1em',
      },
      e,
      {
        children: jsx$1('path', {
          d: 'M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z',
        }),
      }
    )
  );
};

function resolveUrl(e, t) {
  var n, r, o;
  return e.match(/^[a-z]+:\/\//i)
    ? e
    : e.match(/^\/\//)
    ? window.location.protocol + e
    : e.match(/^[a-z]+:/i)
    ? e
    : ((r = (n = document.implementation.createHTMLDocument()).createElement(
        'base'
      )),
      (o = n.createElement('a')),
      n.head.appendChild(r),
      n.body.appendChild(o),
      t && (r.href = t),
      (o.href = e),
      o.href);
}
const uuid = (() => {
  let e = 0;
  return () => (
    (e += 1),
    'u' + ('0000' + ((Math.random() * 36 ** 4) << 0).toString(36)).slice(-4) + e
  );
})();
function toArray(n) {
  var r = [];
  for (let e = 0, t = n.length; e < t; e++) r.push(n[e]);
  return r;
}
function px(e, t) {
  e = (e.ownerDocument.defaultView || window)
    .getComputedStyle(e)
    .getPropertyValue(t);
  return e ? parseFloat(e.replace('px', '')) : 0;
}
function getNodeWidth(e) {
  var t = px(e, 'border-left-width'),
    n = px(e, 'border-right-width');
  return e.clientWidth + t + n;
}
function getNodeHeight(e) {
  var t = px(e, 'border-top-width'),
    n = px(e, 'border-bottom-width');
  return e.clientHeight + t + n;
}
function getImageSize(e, t = {}) {
  return {
    width: t.width || getNodeWidth(e),
    height: t.height || getNodeHeight(e),
  };
}
function getPixelRatio() {
  let e, t;
  try {
    t = process;
  } catch (e) {}
  var n = t && t.env ? t.env.devicePixelRatio : null;
  return (
    (e = n && ((e = parseInt(n, 10)), Number.isNaN(e)) ? 1 : e) ||
    window.devicePixelRatio ||
    1
  );
}
const canvasDimensionLimit = 16384;
function checkCanvasDimensions(e) {
  (e.width > canvasDimensionLimit || e.height > canvasDimensionLimit) &&
    (e.width > canvasDimensionLimit && e.height > canvasDimensionLimit
      ? e.width > e.height
        ? ((e.height *= canvasDimensionLimit / e.width),
          (e.width = canvasDimensionLimit))
        : ((e.width *= canvasDimensionLimit / e.height),
          (e.height = canvasDimensionLimit))
      : e.width > canvasDimensionLimit
      ? ((e.height *= canvasDimensionLimit / e.width),
        (e.width = canvasDimensionLimit))
      : ((e.width *= canvasDimensionLimit / e.height),
        (e.height = canvasDimensionLimit)));
}
function createImage(r) {
  return new Promise((e, t) => {
    const n = new Image();
    (n.decode = () => e(n)),
      (n.onload = () => e(n)),
      (n.onerror = t),
      (n.crossOrigin = 'anonymous'),
      (n.decoding = 'async'),
      (n.src = r);
  });
}
async function svgToDataURL(e) {
  return Promise.resolve()
    .then(() => new XMLSerializer().serializeToString(e))
    .then(encodeURIComponent)
    .then((e) => 'data:image/svg+xml;charset=utf-8,' + e);
}
async function nodeToDataURL(e, t, n) {
  var r = 'http://www.w3.org/2000/svg',
    o = document.createElementNS(r, 'svg'),
    r = document.createElementNS(r, 'foreignObject');
  return (
    o.setAttribute('width', '' + t),
    o.setAttribute('height', '' + n),
    o.setAttribute('viewBox', `0 0 ${t} ` + n),
    r.setAttribute('width', '100%'),
    r.setAttribute('height', '100%'),
    r.setAttribute('x', '0'),
    r.setAttribute('y', '0'),
    r.setAttribute('externalResourcesRequired', 'true'),
    o.appendChild(r),
    r.appendChild(e),
    svgToDataURL(o)
  );
}
const isInstanceOfElement = (e, t) => {
  return (
    e instanceof t ||
    (null !== (e = Object.getPrototypeOf(e)) &&
      (e.constructor.name === t.name || isInstanceOfElement(e, t)))
  );
};
function formatCSSText(e) {
  var t = e.getPropertyValue('content');
  return `${e.cssText} content: '${t.replace(/'|"/g, '')}';`;
}
function formatCSSProperties(t) {
  return toArray(t)
    .map((e) => {
      return (
        e +
        `: ${t.getPropertyValue(e)}${
          t.getPropertyPriority(e) ? ' !important' : ''
        };`
      );
    })
    .join(' ');
}
function getPseudoElementStyle(e, t, n) {
  (e = `.${e}:` + t),
    (t = (n.cssText ? formatCSSText : formatCSSProperties)(n));
  return document.createTextNode(e + `{${t}}`);
}
function clonePseudoElement(e, t, n) {
  var e = window.getComputedStyle(e, n),
    r = e.getPropertyValue('content');
  if ('' !== r && 'none' !== r) {
    r = uuid();
    try {
      t.className = t.className + ' ' + r;
    } catch (e) {
      return;
    }
    var o = document.createElement('style');
    o.appendChild(getPseudoElementStyle(r, n, e)), t.appendChild(o);
  }
}
function clonePseudoElements(e, t) {
  clonePseudoElement(e, t, ':before'), clonePseudoElement(e, t, ':after');
}
const WOFF = 'application/font-woff',
  JPEG = 'image/jpeg',
  mimes = {
    woff: WOFF,
    woff2: WOFF,
    ttf: 'application/font-truetype',
    eot: 'application/vnd.ms-fontobject',
    png: 'image/png',
    jpg: JPEG,
    jpeg: JPEG,
    gif: 'image/gif',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    webp: 'image/webp',
  };
function getExtension(e) {
  e = /\.([^./]*?)$/g.exec(e);
  return e ? e[1] : '';
}
function getMimeType(e) {
  e = getExtension(e).toLowerCase();
  return mimes[e] || '';
}
function getContentFromDataUrl(e) {
  return e.split(/,/)[1];
}
function isDataUrl(e) {
  if (e !== undefined) {
    return -1 !== e.search(/^(data:)/);
  }
}
function makeDataUrl(e, t) {
  return `data:${t};base64,` + e;
}
async function fetchAsDataURL(e, t, r) {
  const o = await fetch(e, t);
  if (404 === o.status) throw new Error(`Resource "${o.url}" not found`);
  const i = await o.blob();
  return new Promise((e, t) => {
    const n = new FileReader();
    (n.onerror = t),
      (n.onloadend = () => {
        try {
          e(r({ res: o, result: n.result }));
        } catch (e) {
          t(e);
        }
      }),
      n.readAsDataURL(i);
  });
}
const cache = {};
function getCacheKey(e, t, n) {
  let r = e.replace(/\?.*/, '');
  return (
    n && (r = e),
    /ttf|otf|eot|woff2?/i.test(r) && (r = r.replace(/.*\//, '')),
    t ? `[${t}]` + r : r
  );
}
async function resourceToDataURL(n, r, o) {
  var e = getCacheKey(n, r, o.includeQueryParams);
  if (null != cache[e]) return cache[e];
  o.cacheBust && (n += (/\?/.test(n) ? '&' : '?') + new Date().getTime());
  let i;
  try {
    var t = await fetchAsDataURL(
      n,
      o.fetchRequestInit,
      ({ res: e, result: t }) => (
        (r = r || e.headers.get('Content-Type') || ''), getContentFromDataUrl(t)
      )
    );
    i = makeDataUrl(t, r);
  } catch (e) {
    i = o.imagePlaceholder || '';
    let t = 'Failed to fetch resource: ' + n;
    (t = e ? ('string' == typeof e ? e : e.message) : t) && console.warn(t);
  }
  return (cache[e] = i);
}
async function cloneCanvasElement(e) {
  var t = e.toDataURL();
  return 'data:,' === t ? e.cloneNode(!1) : createImage(t);
}
async function cloneVideoElement(e, t) {
  if (e.currentSrc) {
    var n = document.createElement('canvas'),
      r = n.getContext('2d');
    (n.width = e.clientWidth),
      (n.height = e.clientHeight),
      null != r && r.drawImage(e, 0, 0, n.width, n.height);
    const o = n.toDataURL();
    return createImage(o);
  }
  r = e.poster;
  const o = await resourceToDataURL(r, getMimeType(r), t);
  return createImage(o);
}
async function cloneIFrameElement(e) {
  var t;
  try {
    if (null != (t = null == e ? void 0 : e.contentDocument) && t.body)
      return await cloneNode(e.contentDocument.body, {}, !0);
  } catch (e) {}
  return e.cloneNode(!1);
}
async function cloneSingleNode(e, t) {
  return isInstanceOfElement(e, HTMLCanvasElement)
    ? cloneCanvasElement(e)
    : isInstanceOfElement(e, HTMLVideoElement)
    ? cloneVideoElement(e, t)
    : isInstanceOfElement(e, HTMLIFrameElement)
    ? cloneIFrameElement(e)
    : e.cloneNode(!1);
}
const isSlotElement = (e) =>
  null != e.tagName && 'SLOT' === e.tagName.toUpperCase();
async function cloneChildren(e, n, r) {
  var t;
  let o = [];
  return (
    0 ===
      (o =
        isSlotElement(e) && e.assignedNodes
          ? toArray(e.assignedNodes())
          : isInstanceOfElement(e, HTMLIFrameElement) &&
            null != (t = e.contentDocument) &&
            t.body
          ? toArray(e.contentDocument.body.childNodes)
          : toArray((null != (t = e.shadowRoot) ? t : e).childNodes)).length ||
      isInstanceOfElement(e, HTMLVideoElement) ||
      (await o.reduce(
        (e, t) =>
          e
            .then(() => cloneNode(t, r))
            .then((e) => {
              e && n.appendChild(e);
            }),
        Promise.resolve()
      )),
    n
  );
}
function cloneCSSStyle(r, o) {
  const i = o.style;
  if (i) {
    const a = window.getComputedStyle(r);
    a.cssText
      ? ((i.cssText = a.cssText), (i.transformOrigin = a.transformOrigin))
      : toArray(a).forEach((e) => {
          let t = a.getPropertyValue(e);
          var n;
          'font-size' === e &&
            t.endsWith('px') &&
            ((n = Math.floor(parseFloat(t.substring(0, t.length - 2))) - 0.1),
            (t = n + 'px')),
            isInstanceOfElement(r, HTMLIFrameElement) &&
              'display' === e &&
              'inline' === t &&
              (t = 'block'),
            'd' === e &&
              o.getAttribute('d') &&
              (t = `path(${o.getAttribute('d')})`),
            i.setProperty(e, t, a.getPropertyPriority(e));
        });
  }
}
function cloneInputValue(e, t) {
  isInstanceOfElement(e, HTMLTextAreaElement) && (t.innerHTML = e.value),
    isInstanceOfElement(e, HTMLInputElement) &&
      t.setAttribute('value', e.value);
}
function cloneSelectValue(t, e) {
  isInstanceOfElement(t, HTMLSelectElement) &&
    (e = Array.from(e.children).find(
      (e) => t.value === e.getAttribute('value')
    )) &&
    e.setAttribute('selected', '');
}
function decorate(e, t) {
  return (
    isInstanceOfElement(t, Element) &&
      (cloneCSSStyle(e, t),
      clonePseudoElements(e, t),
      cloneInputValue(e, t),
      cloneSelectValue(e, t)),
    t
  );
}
async function ensureSVGSymbols(t, n) {
  var r = t.querySelectorAll ? t.querySelectorAll('use') : [];
  if (0 !== r.length) {
    var o = {};
    for (let e = 0; e < r.length; e++) {
      var i,
        a,
        s = r[e].getAttribute('xlink:href');
      s &&
        ((i = t.querySelector(s)),
        (a = document.querySelector(s)),
        i || !a || o[s] || (o[s] = await cloneNode(a, n, !0)));
    }
    var l = Object.values(o);
    if (l.length) {
      var e = 'http://www.w3.org/1999/xhtml',
        c = document.createElementNS(e, 'svg'),
        u =
          (c.setAttribute('xmlns', e),
          (c.style.position = 'absolute'),
          (c.style.width = '0'),
          (c.style.height = '0'),
          (c.style.overflow = 'hidden'),
          (c.style.display = 'none'),
          document.createElementNS(e, 'defs'));
      c.appendChild(u);
      for (let e = 0; e < l.length; e++) u.appendChild(l[e]);
      t.appendChild(c);
    }
  }
  return t;
}
async function cloneNode(t, n, e) {
  return e || !n.filter || n.filter(t)
    ? Promise.resolve(t)
        .then((e) => cloneSingleNode(e, n))
        .then((e) => cloneChildren(t, e, n))
        .then((e) => decorate(t, e))
        .then((e) => ensureSVGSymbols(e, n))
    : null;
}
const URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g,
  URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,
  FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function toRegex(e) {
  e = e.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
  return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`, 'g');
}
function parseURLs(e) {
  const r = [];
  return (
    e.replace(URL_REGEX, (e, t, n) => (r.push(n), e)),
    r.filter((e) => !isDataUrl(e))
  );
}
async function embed(t, n, r, o, i) {
  try {
    var a = r ? resolveUrl(n, r) : n,
      s = getMimeType(n);
    let e;
    return (
      (e = i ? makeDataUrl(await i(a), s) : await resourceToDataURL(a, s, o)),
      t.replace(toRegex(n), `$1${e}$3`)
    );
  } catch (e) {}
  return t;
}
function filterPreferredFontFormat(e, { preferredFontFormat: r }) {
  return r
    ? e.replace(FONT_SRC_REGEX, (e) => {
        for (;;) {
          var [t, , n] = URL_WITH_FORMAT_REGEX.exec(e) || [];
          if (!n) return '';
          if (n === r) return `src: ${t};`;
        }
      })
    : e;
}
function shouldEmbed(e) {
  return -1 !== e.search(URL_REGEX);
}
async function embedResources(e, n, r) {
  var t;
  return shouldEmbed(e)
    ? parseURLs((t = filterPreferredFontFormat(e, r))).reduce(
        (e, t) => e.then((e) => embed(e, t, n, r)),
        Promise.resolve(t)
      )
    : e;
}
async function embedProp(e, t, n) {
  var r = null == (r = t.style) ? void 0 : r.getPropertyValue(e);
  return (
    !!r &&
    ((r = await embedResources(r, null, n)),
    t.style.setProperty(e, r, t.style.getPropertyPriority(e)),
    !0)
  );
}
async function embedBackground(e, t) {
  (await embedProp('background', e, t)) ||
    (await embedProp('background-image', e, t)),
    (await embedProp('mask', e, t)) || (await embedProp('mask-image', e, t));
}
async function embedImageNode(n, e) {
  const r = isInstanceOfElement(n, HTMLImageElement);
  if (
    (r && isDataUrl(n.src)) ||
    (isInstanceOfElement(n, SVGImageElement) && !isDataUrl(n.href.baseVal))
  ) {
    var t = r ? n.src : n.href.baseVal;
    const o = await resourceToDataURL(t, getMimeType(t), e);
    await new Promise((e, t) => {
      (n.onload = e), (n.onerror = t);
      t = n;
      t.decode && (t.decode = e),
        'lazy' === t.loading && (t.loading = 'eager'),
        r ? ((n.srcset = ''), (n.src = o)) : (n.href.baseVal = o);
    });
  }
}
async function embedChildren(e, t) {
  var n = toArray(e.childNodes).map((e) => embedImages(e, t));
  await Promise.all(n).then(() => e);
}
async function embedImages(e, t) {
  isInstanceOfElement(e, Element) &&
    (await embedBackground(e, t),
    await embedImageNode(e, t),
    await embedChildren(e, t));
}
function applyStyle(e, t) {
  const n = e['style'],
    r =
      (t.backgroundColor && (n.backgroundColor = t.backgroundColor),
      t.width && (n.width = t.width + 'px'),
      t.height && (n.height = t.height + 'px'),
      t.style);
  return (
    null != r &&
      Object.keys(r).forEach((e) => {
        n[e] = r[e];
      }),
    e
  );
}
const cssFetchCache = {};
async function fetchCSS(e) {
  var t = cssFetchCache[e];
  return (
    null == t &&
      ((t = { url: e, cssText: await (await fetch(e)).text() }),
      (cssFetchCache[e] = t)),
    t
  );
}
async function embedFonts(n, r) {
  let o = n.cssText;
  const i = /url\(["']?([^"')]+)["']?\)/g;
  var e = (o.match(/url\([^)]+\)/g) || []).map(async (t) => {
    let e = t.replace(i, '$1');
    return fetchAsDataURL(
      (e = e.startsWith('https://') ? e : new URL(e, n.url).href),
      r.fetchRequestInit,
      ({ result: e }) => ((o = o.replace(t, `url(${e})`)), [t, e])
    );
  });
  return Promise.all(e).then(() => o);
}
function parseCSS(e) {
  if (null == e) return [];
  var t = [];
  let n = e.replace(/(\/\*[\s\S]*?\*\/)/gi, '');
  for (
    var r = new RegExp(
      '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})',
      'gi'
    );
    ;

  ) {
    var o = r.exec(n);
    if (null === o) break;
    t.push(o[0]);
  }
  n = n.replace(r, '');
  for (
    var i = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,
      a = new RegExp(
        '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})',
        'gi'
      );
    ;

  ) {
    let e = i.exec(n);
    if (null === e) {
      if (null === (e = a.exec(n))) break;
      i.lastIndex = a.lastIndex;
    } else a.lastIndex = i.lastIndex;
    t.push(e[0]);
  }
  return t;
}
async function getCSSRules(n, o) {
  const r = [],
    i = [];
  return (
    n.forEach((r) => {
      if ('cssRules' in r)
        try {
          toArray(r.cssRules || []).forEach((e, t) => {
            if (e.type === CSSRule.IMPORT_RULE) {
              let n = t + 1;
              t = fetchCSS(e.href)
                .then((e) => embedFonts(e, o))
                .then((e) =>
                  parseCSS(e).forEach((t) => {
                    try {
                      r.insertRule(
                        t,
                        t.startsWith('@import') ? (n += 1) : r.cssRules.length
                      );
                    } catch (e) {
                      console.error('Error inserting rule from remote css', {
                        rule: t,
                        error: e,
                      });
                    }
                  })
                )
                .catch((e) => {
                  console.error('Error loading remote css', e.toString());
                });
              i.push(t);
            }
          });
        } catch (e) {
          const t = n.find((e) => null == e.href) || document.styleSheets[0];
          null != r.href &&
            i.push(
              fetchCSS(r.href)
                .then((e) => embedFonts(e, o))
                .then((e) =>
                  parseCSS(e).forEach((e) => {
                    t.insertRule(e, r.cssRules.length);
                  })
                )
                .catch((e) => {
                  console.error('Error loading remote stylesheet', e);
                })
            ),
            console.error('Error inlining remote css file', e);
        }
    }),
    Promise.all(i).then(
      () => (
        n.forEach((t) => {
          if ('cssRules' in t)
            try {
              toArray(t.cssRules || []).forEach((e) => {
                r.push(e);
              });
            } catch (e) {
              console.error('Error while reading CSS rules from ' + t.href, e);
            }
        }),
        r
      )
    )
  );
}
function getWebFontRules(e) {
  return e
    .filter((e) => e.type === CSSRule.FONT_FACE_RULE)
    .filter((e) => shouldEmbed(e.style.getPropertyValue('src')));
}
async function parseWebFontRules(e, t) {
  if (null == e.ownerDocument)
    throw new Error('Provided element is not within a Document');
  return getWebFontRules(
    await getCSSRules(toArray(e.ownerDocument.styleSheets), t)
  );
}
async function getWebFontCSS(e, n) {
  e = await parseWebFontRules(e, n);
  return (
    await Promise.all(
      e.map((e) => {
        var t = e.parentStyleSheet ? e.parentStyleSheet.href : null;
        return embedResources(e.cssText, t, n);
      })
    )
  ).join('\n');
}
async function embedWebFonts(e, t) {
  var n,
    t =
      null != t.fontEmbedCSS
        ? t.fontEmbedCSS
        : t.skipFonts
        ? null
        : await getWebFontCSS(e, t);
  t &&
    ((n = document.createElement('style')),
    (t = document.createTextNode(t)),
    n.appendChild(t),
    e.firstChild ? e.insertBefore(n, e.firstChild) : e.appendChild(n));
}
async function toSvg(e, t = {}) {
  var { width: n, height: r } = getImageSize(e, t),
    e = await cloneNode(e, t, !0),
    t =
      (await embedWebFonts(e, t),
      await embedImages(e, t),
      applyStyle(e, t),
      await nodeToDataURL(e, n, r));
  return t;
}
async function toCanvas(e, t = {}) {
  try {
    var { width: n, height: r } = getImageSize(e, t),
      e = await createImage(await toSvg(e, t)),
      o = document.createElement('canvas'),
      i = o.getContext('2d'),
      a = t.pixelRatio || getPixelRatio(),
      n = t.canvasWidth || n,
      r = t.canvasHeight || r;
    console.log(`🚀 ~ file: canvaFunction2.js:26433 ~ toCanvas ~ o:`, o);
  } catch (e) {
    console.log(`🚀 ~ file: canvaFunction2.js:26440 ~ toCanvas ~ e:`, e);
  }
  return (
    (o.width = n * a),
    (o.height = r * a),
    t.skipAutoScale || checkCanvasDimensions(o),
    (o.style.width = '' + n),
    (o.style.height = '' + r),
    t.backgroundColor &&
      ((i.fillStyle = t.backgroundColor), i.fillRect(0, 0, o.width, o.height)),
    i.drawImage(e, 0, 0, o.width, o.height),
    o
  );
}
async function toPng(e, t = {}) {
  console.log(`🚀 ~ file: canvaFunction2.js:26456 ~ toPng ~ e:`, t);
  try {
    return (await toCanvas(e, t)).toDataURL();
  } catch (e) {
    console.log(`🚀 ~ file: canvaFunction2.js:26461 ~ toPng ~ e:`, e);
  }
}
const functionToDwnload = async (i, e) => {
  if (i.current)
    try {
      var t = await toPng(i.current),
        n = document.createElement('a');
      (n.download = `design-id-page-${e + 1}.png`), (n.href = t), n.click();
    } catch (e) {
      window.console.log('Cannot download: ' + JSON.stringify(e));
    }
};

export { functionToDwnload };
