(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.al.K === region.av.K)
	{
		return 'on line ' + region.al.K;
	}
	return 'on lines ' + region.al.K + ' through ' + region.av.K;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bj,
		impl.bD,
		impl.bz,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		z: func(record.z),
		am: record.am,
		aj: record.aj
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.z;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.am;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.aj) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bj,
		impl.bD,
		impl.bz,
		function(sendToApp, initialModel) {
			var view = impl.bE;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bj,
		impl.bD,
		impl.bz,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.ak && impl.ak(sendToApp)
			var view = impl.bE;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.a5);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.bC) && (_VirtualDom_doc.title = title = doc.bC);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.bt;
	var onUrlRequest = impl.bu;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		ak: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.aO === next.aO
							&& curr.aB === next.aB
							&& curr.aL.a === next.aL.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		bj: function(flags)
		{
			return A3(impl.bj, flags, _Browser_getUrl(), key);
		},
		bE: impl.bE,
		bD: impl.bD,
		bz: impl.bz
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { bh: 'hidden', a7: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { bh: 'mozHidden', a7: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { bh: 'msHidden', a7: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { bh: 'webkitHidden', a7: 'webkitvisibilitychange' }
		: { bh: 'hidden', a7: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		aU: _Browser_getScene(),
		a_: {
			a0: _Browser_window.pageXOffset,
			a1: _Browser_window.pageYOffset,
			a$: _Browser_doc.documentElement.clientWidth,
			aA: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		a$: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		aA: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			aU: {
				a$: node.scrollWidth,
				aA: node.scrollHeight
			},
			a_: {
				a0: node.scrollLeft,
				a1: node.scrollTop,
				a$: node.clientWidth,
				aA: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			aU: _Browser_getScene(),
			a_: {
				a0: x,
				a1: y,
				a$: _Browser_doc.documentElement.clientWidth,
				aA: _Browser_doc.documentElement.clientHeight
			},
			bb: {
				a0: x + rect.left,
				a1: y + rect.top,
				a$: rect.width,
				aA: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = 2;
var $author$project$Data$Audience$Authored = 0;
var $author$project$Main$Failure = {$: 1};
var $elm$core$Maybe$Nothing = {$: 1};
var $author$project$Main$Success = function (a) {
	return {$: 0, a: a};
};
var $author$project$Data$AudienceFolder$audienceFoldersJSON = '\n    {\n        "data": [\n            {\n                "id": 357,\n                "name": "Demographics",\n                "curated": true,\n                "parent": null\n            },\n            {\n                "id": 358,\n                "name": "Marketing Personas",\n                "curated": true,\n                "parent": null\n            },\n            {\n                "id": 383,\n                "name": "Reports",\n                "curated": true,\n                "parent": null\n            },\n            {\n                "id": 3110,\n                "name": "New Group",\n                "curated": false,\n                "parent": null\n            },\n            {\n                "id": 3111,\n                "name": "New Group 2",\n                "curated": false,\n                "parent": 3110\n            }\n        ]\n    }\n    ';
var $author$project$Data$Audience$audiencesJSON = '\n    {\n        "data": [\n            {\n                "id": 104,\n                "name": "Food Lovers",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_6"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 97,\n                "name": "Brand Likers",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q2157_8"\n                            ],\n                            "question": "q2157"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 116,\n                "name": "Political Commentators",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_9"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 118,\n                "name": "Music Lovers",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_3"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 5028,\n                "name": "Social Segments: Creators",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_1"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5030,\n                "name": "Social Segments: Sharers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_2"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 4996,\n                "name": "Female 35-44",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_4"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5000,\n                "name": "Male 16-24",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_2"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5006,\n                "name": "Income: Mid 50%",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "i1_2"\n                            ],\n                            "question": "i1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 43311,\n                "name": "Ad-Clickers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2157_4"\n                            ],\n                            "question": "q2157"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 43312,\n                "name": "Apple Pay Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3158_1"\n                            ],\n                            "question": "q3158"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 5003,\n                "name": "Male 45-54",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_5"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5004,\n                "name": "Male 55-64",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_6"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5007,\n                "name": "Income: Top 25%",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "i1_3"\n                            ],\n                            "question": "i1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5013,\n                "name": "Marital Status: In a Relationship",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q7_2"\n                            ],\n                            "question": "q7"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5010,\n                "name": "Children in HH: 2",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q8_3"\n                            ],\n                            "question": "q8"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5016,\n                "name": "Education: School Until 16",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q6_1"\n                            ],\n                            "question": "q6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5017,\n                "name": "Education: School Until 18",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q6_2"\n                            ],\n                            "question": "q6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5018,\n                "name": "Education: Trade/Technical School or College",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q6_3"\n                            ],\n                            "question": "q6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5022,\n                "name": "Employment: Full-Time Parent",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_5"\n                            ],\n                            "question": "q14"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5021,\n                "name": "Employment: Full-Time Worker",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_1"\n                            ],\n                            "question": "q14"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5023,\n                "name": "Employment: Part-Time Worker",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_2"\n                            ],\n                            "question": "q14"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5036,\n                "name": "World Region: Middle East & Africa",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s6_5"\n                            ],\n                            "question": "s6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5025,\n                "name": "Employment: Freelancer",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_3"\n                            ],\n                            "question": "q14"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5026,\n                "name": "Employment: Student",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_6"\n                            ],\n                            "question": "q14"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 53516,\n                "name": "Furniture Buyers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q91_13"\n                            ],\n                            "question": "q91",\n                            "suffixes": [\n                                4\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 5029,\n                "name": "Social Segments: Reviewers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_3"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5035,\n                "name": "World Region: Latin America",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s6_3"\n                            ],\n                            "question": "s6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5031,\n                "name": "Social Segments: Commenters",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_6"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5032,\n                "name": "Social Segments: Passives",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_5"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 4993,\n                "name": "Female",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5019,\n                "name": "Education: University",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q6_4"\n                            ],\n                            "question": "q6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 4833,\n                "name": "Meal Providers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q25_6"\n                            ],\n                            "question": "q25",\n                            "not": true\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "r2021d_2"\n                                    ],\n                                    "question": "r2021d"\n                                },\n                                {\n                                    "options": [\n                                        "r2021e_2"\n                                    ],\n                                    "question": "r2021e"\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q8_2",\n                                "q8_3",\n                                "q8_4"\n                            ],\n                            "question": "q8"\n                        },\n                        {\n                            "and": [\n                                {\n                                    "options": [\n                                        "r2021d_46"\n                                    ],\n                                    "question": "r2021d",\n                                    "not": true\n                                },\n                                {\n                                    "options": [\n                                        "r2021e_46"\n                                    ],\n                                    "question": "r2021e",\n                                    "not": true\n                                }\n                            ]\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 5034,\n                "name": "World Region: Europe",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s6_1"\n                            ],\n                            "question": "s6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 4938,\n                "name": "ITDM",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q16_8",\n                                "q16_4",\n                                "q16_3",\n                                "q16_2"\n                            ],\n                            "question": "q16"\n                        },\n                        {\n                            "options": [\n                                "q17_4"\n                            ],\n                            "question": "q17"\n                        },\n                        {\n                            "options": [\n                                "q18a_4",\n                                "q18a_5"\n                            ],\n                            "question": "q18a"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 5037,\n                "name": "World Region: North America",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s6_2"\n                            ],\n                            "question": "s6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 4995,\n                "name": "Female 25-34",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_3"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 4997,\n                "name": "Female 45-54",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_5"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 4998,\n                "name": "Female 55-64",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_6"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5008,\n                "name": "Children in HH: 0",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q8_1"\n                            ],\n                            "question": "q8"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5012,\n                "name": "Marital Status: Single",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q7_1"\n                            ],\n                            "question": "q7"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5009,\n                "name": "Children in HH: 1",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q8_2"\n                            ],\n                            "question": "q8"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5011,\n                "name": "Children in HH: 3+",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q8_4"\n                            ],\n                            "question": "q8"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 4999,\n                "name": "Male",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5001,\n                "name": "Male 25-34",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_3"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5002,\n                "name": "Male 35-44",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_4"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5014,\n                "name": "Marital Status: Married",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q7_3"\n                            ],\n                            "question": "q7"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 32394,\n                "name": "Social Networkers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r4154cd_1"\n                            ],\n                            "question": "r4154cd"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 5033,\n                "name": "World Region: Asia Pacific",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s6_4"\n                            ],\n                            "question": "s6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 8306,\n                "name": "Teens",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3_16",\n                                "q3_17",\n                                "q3_18",\n                                "q3_19"\n                            ],\n                            "question": "q3"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 109,\n                "name": "Parents (Young Children)",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_2"\n                            ],\n                            "question": "q9"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": null,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 8296,\n                "name": "Console Gamers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q21510_6"\n                            ],\n                            "question": "q21510"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 43303,\n                "name": "Mobile Internet Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q39a_3"\n                            ],\n                            "question": "q39a"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 43307,\n                "name": "Price Conscious Consumers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q20_58"\n                            ],\n                            "question": "q20",\n                            "suffixes": [\n                                4,\n                                5\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32382,\n                "name": "Tablet Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q39a_6"\n                            ],\n                            "question": "q39a"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 8304,\n                "name": "Parents (Young Children)",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_2"\n                            ],\n                            "question": "q9"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 80901,\n                "name": "blackberry",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126h_3"\n                            ],\n                            "question": "q126h"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "user",\n                "shared": false,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 32512,\n                "name": "Business Leaders",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_1"\n                            ],\n                            "question": "q14"\n                        },\n                        {\n                            "options": [\n                                "q16_1"\n                            ],\n                            "question": "q16"\n                        },\n                        {\n                            "options": [\n                                "q18a_5",\n                                "q18a_4",\n                                "q18a_3"\n                            ],\n                            "question": "q18a"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32514,\n                "name": "Fashionistas",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q25_14"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 32518,\n                "name": "Social Segments: Commentators",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_6"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 32521,\n                "name": "Social Segments: Sharers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_2"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 32519,\n                "name": "Social Segments: Creators",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_1"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 32520,\n                "name": "Social Segments: Reviewers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_3"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 32525,\n                "name": "PC Gamers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q21510_1"\n                            ],\n                            "question": "q21510"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 32526,\n                "name": "Smartphone Owners",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q39d_1"\n                            ],\n                            "question": "q39d"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32522,\n                "name": "Social Segments: Socializers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_4"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 32388,\n                "name": "Second-Screeners",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q120_4",\n                                "q120_5",\n                                "q120_3",\n                                "q120_1",\n                                "q120_2"\n                            ],\n                            "question": "q120"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32381,\n                "name": "Spotify Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q320_5"\n                            ],\n                            "question": "q320",\n                            "suffixes": [\n                                1\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32387,\n                "name": "WeChat Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126i_26"\n                            ],\n                            "question": "q126i"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32377,\n                "name": "Pinterest Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_4"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32361,\n                "name": "Twitter Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_2"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32399,\n                "name": "WhatsApp Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126i_29"\n                            ],\n                            "question": "q126i"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32384,\n                "name": "Viber Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126i_41"\n                            ],\n                            "question": "q126i"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32350,\n                "name": "F1 Fans",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_17"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                3,\n                                2,\n                                1\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32385,\n                "name": "YouTube Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_5"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32356,\n                "name": "Shazam Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126i_25"\n                            ],\n                            "question": "q126i"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 85888,\n                "name": "Premier League (Watch TV OR ONLINE) 55-64",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q4_6"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 32352,\n                "name": "NFL Fans",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_1"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                3,\n                                2,\n                                1\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32371,\n                "name": "Facebook Messenger Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126i_23"\n                            ],\n                            "question": "q126i"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32699,\n                "name": "Marital Status: Divorced/Widowed",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q7_4"\n                            ],\n                            "question": "q7"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 32372,\n                "name": "Google+ Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_3"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32369,\n                "name": "Sports Fans",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q25_26"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32365,\n                "name": "Vlog Watchers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r4154cd_34"\n                            ],\n                            "question": "r4154cd"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32380,\n                "name": "SoundCloud Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q320_61"\n                            ],\n                            "question": "q320",\n                            "suffixes": [\n                                1\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32358,\n                "name": "Snapchat Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126i_30"\n                            ],\n                            "question": "q126i"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32404,\n                "name": "Facebook Account Holders",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x1_1"\n                            ],\n                            "question": "q46x1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32373,\n                "name": "iPhone Owners",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q127ag2_5"\n                            ],\n                            "question": "q127ag2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32397,\n                "name": "Online Shoppers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r4154cd_22"\n                            ],\n                            "question": "r4154cd"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32346,\n                "name": "Brand Followers",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q48_9",\n                                "q48_10"\n                            ],\n                            "question": "q48"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32378,\n                "name": "Reddit Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_48"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32405,\n                "name": "Twitter Account Holders",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x1_2"\n                            ],\n                            "question": "q46x1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32376,\n                "name": "LinkedIn Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_6"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32403,\n                "name": "Podcast Listeners",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r4154cd_30"\n                            ],\n                            "question": "r4154cd"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32396,\n                "name": "Vine Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_56"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32697,\n                "name": "Education: Post Graduate",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q6_5"\n                            ],\n                            "question": "q6"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 32386,\n                "name": "VPN Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q309_1"\n                            ],\n                            "question": "q309"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32085,\n                "name": "4G Mobile Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q39c_1"\n                            ],\n                            "question": "q39c"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32375,\n                "name": "Netflix Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q320_1"\n                            ],\n                            "question": "q320",\n                            "suffixes": [\n                                1\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32362,\n                "name": "Facebook Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_1"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32348,\n                "name": "Business Travelers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q311_1",\n                                "q311_2"\n                            ],\n                            "question": "q311",\n                            "suffixes": [\n                                3\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32359,\n                "name": "Students",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_6"\n                            ],\n                            "question": "q14"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 35789,\n                "name": "Ad-Blockers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q324_4"\n                            ],\n                            "question": "q324",\n                            "suffixes": [\n                                1\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 35792,\n                "name": "Social Sharers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2157_13"\n                            ],\n                            "question": "q2157"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 35793,\n                "name": "Streaming Device Owners",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q39d_10"\n                            ],\n                            "question": "q39d"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 44991,\n                "name": "Vacationers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q311_4",\n                                "q311_3",\n                                "q311_2",\n                                "q311_1"\n                            ],\n                            "question": "q311",\n                            "suffixes": [\n                                2\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 45382,\n                "name": "LINE Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126i_32"\n                            ],\n                            "question": "q126i"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 43304,\n                "name": "Eco-Consumers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r2021e_48"\n                            ],\n                            "question": "r2021e"\n                        },\n                        {\n                            "options": [\n                                "q2154_11"\n                            ],\n                            "question": "q2154"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 43308,\n                "name": "Brand Experimenters",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q20_7"\n                            ],\n                            "question": "q20",\n                            "suffixes": [\n                                4,\n                                5\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 43306,\n                "name": "Brand Conscious Consumers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q20_24"\n                            ],\n                            "question": "q20",\n                            "suffixes": [\n                                4,\n                                5\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 43309,\n                "name": "Brand Loyalists",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q20_10"\n                            ],\n                            "question": "q20",\n                            "suffixes": [\n                                4,\n                                5\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 95,\n                "name": "Baby Boomers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3_52",\n                                "q3_53",\n                                "q3_54",\n                                "q3_55",\n                                "q3_56",\n                                "q3_57",\n                                "q3_58",\n                                "q3_59",\n                                "q3_60",\n                                "q3_61",\n                                "q3_62",\n                                "q3_63",\n                                "q3_64"\n                            ],\n                            "question": "q3"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": null,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 223,\n                "name": "All Internet Uses",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2",\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 1809,\n                "name": "Console Gamers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q21510_6"\n                            ],\n                            "question": "q21510"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 4994,\n                "name": "Female 16-24",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_2"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 43305,\n                "name": "Early Tech Adopters",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q39d_1"\n                            ],\n                            "question": "q39d"\n                        },\n                        {\n                            "options": [\n                                "q39d_4"\n                            ],\n                            "question": "q39d"\n                        },\n                        {\n                            "options": [\n                                "q39d_5",\n                                "q39d_6"\n                            ],\n                            "question": "q39d"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 60808,\n                "name": "PRUK>Confident Connectors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s2_44"\n                            ],\n                            "question": "s2"\n                        },\n                        {\n                            "options": [\n                                "q20_6",\n                                "q20_8",\n                                "q20_26",\n                                "q20_16",\n                                "q20_52",\n                                "q20_42"\n                            ],\n                            "question": "q20",\n                            "suffixes": [\n                                5\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q4_3",\n                                "q4_4"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "q94new_23"\n                            ],\n                            "question": "q94new"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 48982,\n                "name": "mums ( 21+) with kids aged 3-11) copy - pay TV",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3_16",\n                                "q3_17",\n                                "q3_18",\n                                "q3_19",\n                                "q3_20"\n                            ],\n                            "question": "q3",\n                            "not": true\n                        },\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q8_2",\n                                "q8_3",\n                                "q8_4"\n                            ],\n                            "question": "q8"\n                        },\n                        {\n                            "options": [\n                                "q9_2",\n                                "q9_3"\n                            ],\n                            "question": "q9"\n                        },\n                        {\n                            "options": [\n                                "q1151_1"\n                            ],\n                            "question": "q1151"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 82636,\n                "name": "NBC Chicago - C Suite",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "o0_0"\n                            ],\n                            "question": "gwiq-c0111.o0"\n                        },\n                        {\n                            "options": [\n                                "i1_2",\n                                "i1_3"\n                            ],\n                            "question": "i1"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 53506,\n                "name": "Car Buyers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q91_11"\n                            ],\n                            "question": "q91",\n                            "suffixes": [\n                                4\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 52334,\n                "name": "Old Fiesta",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_3"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "q14_1"\n                            ],\n                            "question": "q14"\n                        },\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_3",\n                                "q9_2",\n                                "q9_4",\n                                "q9_5",\n                                "q9_6",\n                                "q9_7"\n                            ],\n                            "question": "q9",\n                            "not": true\n                        },\n                        {\n                            "options": [\n                                "q20_23",\n                                "q20_16",\n                                "q20_26",\n                                "q20_11",\n                                "q20_4"\n                            ],\n                            "question": "q20",\n                            "min_count": "3",\n                            "suffixes": [\n                                5,\n                                4\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q20_3",\n                                "q20_42"\n                            ],\n                            "question": "q20",\n                            "suffixes": [\n                                5,\n                                4\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q91_11"\n                            ],\n                            "question": "q91",\n                            "suffixes": [\n                                1,\n                                2\n                            ]\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 52348,\n                "name": "Mondeo",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_4"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "q7_3"\n                            ],\n                            "question": "q7"\n                        },\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_3",\n                                "q9_2",\n                                "q9_4",\n                                "q9_5",\n                                "q9_6",\n                                "q9_7"\n                            ],\n                            "question": "q9"\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q21a_17"\n                                    ],\n                                    "question": "q21a",\n                                    "suffixes": [\n                                        5,\n                                        4\n                                    ]\n                                },\n                                {\n                                    "options": [\n                                        "q20_14",\n                                        "q20_8",\n                                        "q20_16",\n                                        "q20_3",\n                                        "q20_23"\n                                    ],\n                                    "question": "q20",\n                                    "min_count": "3",\n                                    "suffixes": [\n                                        5,\n                                        4\n                                    ]\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q91_11"\n                            ],\n                            "question": "q91",\n                            "suffixes": [\n                                1,\n                                2\n                            ]\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 52377,\n                "name": "Old Fiesta copy",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_3"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "q14_1"\n                            ],\n                            "question": "q14"\n                        },\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_3",\n                                "q9_2",\n                                "q9_4",\n                                "q9_5",\n                                "q9_6",\n                                "q9_7"\n                            ],\n                            "question": "q9",\n                            "not": true\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q20_23",\n                                        "q20_16",\n                                        "q20_26",\n                                        "q20_11",\n                                        "q20_4"\n                                    ],\n                                    "question": "q20",\n                                    "min_count": "3",\n                                    "suffixes": [\n                                        5,\n                                        4\n                                    ]\n                                },\n                                {\n                                    "options": [\n                                        "q20_3",\n                                        "q20_42"\n                                    ],\n                                    "question": "q20",\n                                    "suffixes": [\n                                        5,\n                                        4\n                                    ]\n                                }\n                            ]\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 56010,\n                "name": "AOL Travel for business abroad ",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q311_1"\n                            ],\n                            "question": "q311",\n                            "suffixes": [\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q4_4",\n                                "q4_5",\n                                "q4_6"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "r52allse_1"\n                            ],\n                            "question": "r52allse"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 57550,\n                "name": "Flipboard users  ",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126i_39"\n                            ],\n                            "question": "q126i"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 53514,\n                "name": "Online-Only TV Viewers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q27lf_10"\n                            ],\n                            "question": "q27lf",\n                            "not": true\n                        },\n                        {\n                            "options": [\n                                "q27lb_10"\n                            ],\n                            "question": "q27lb"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 53515,\n                "name": "Linear Loyalists",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q27lf_10"\n                            ],\n                            "question": "q27lf"\n                        },\n                        {\n                            "options": [\n                                "q27lb_10"\n                            ],\n                            "question": "q27lb",\n                            "not": true\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32360,\n                "name": "Top 1%",\n                "expression": {\n                    "and": [\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q4dar_7"\n                                    ],\n                                    "question": "q4dar"\n                                },\n                                {\n                                    "options": [\n                                        "q4dau_7"\n                                    ],\n                                    "question": "q4dau"\n                                },\n                                {\n                                    "options": [\n                                        "q4dbe_7"\n                                    ],\n                                    "question": "q4dbe"\n                                },\n                                {\n                                    "options": [\n                                        "q4dbr_7"\n                                    ],\n                                    "question": "q4dbr"\n                                },\n                                {\n                                    "options": [\n                                        "q4dca_7"\n                                    ],\n                                    "question": "q4dca"\n                                },\n                                {\n                                    "options": [\n                                        "q4dfr_7"\n                                    ],\n                                    "question": "q4dfr"\n                                },\n                                {\n                                    "options": [\n                                        "q4dde_7"\n                                    ],\n                                    "question": "q4dde"\n                                },\n                                {\n                                    "options": [\n                                        "q4dhk_7"\n                                    ],\n                                    "question": "q4dhk"\n                                },\n                                {\n                                    "options": [\n                                        "q4din_7"\n                                    ],\n                                    "question": "q4din"\n                                },\n                                {\n                                    "options": [\n                                        "q4dind_7"\n                                    ],\n                                    "question": "q4dind"\n                                },\n                                {\n                                    "options": [\n                                        "q4dit_7"\n                                    ],\n                                    "question": "q4dit"\n                                },\n                                {\n                                    "options": [\n                                        "q4dire_7"\n                                    ],\n                                    "question": "q4dire"\n                                },\n                                {\n                                    "options": [\n                                        "q4djp_7"\n                                    ],\n                                    "question": "q4djp"\n                                },\n                                {\n                                    "options": [\n                                        "q4dml_7"\n                                    ],\n                                    "question": "q4dml"\n                                },\n                                {\n                                    "options": [\n                                        "q4dmx_7"\n                                    ],\n                                    "question": "q4dmx"\n                                },\n                                {\n                                    "options": [\n                                        "q4dnl_7"\n                                    ],\n                                    "question": "q4dnl"\n                                },\n                                {\n                                    "options": [\n                                        "q4dph_7"\n                                    ],\n                                    "question": "q4dph"\n                                },\n                                {\n                                    "options": [\n                                        "q4dpo_7"\n                                    ],\n                                    "question": "q4dpo"\n                                },\n                                {\n                                    "options": [\n                                        "q4dpt_7"\n                                    ],\n                                    "question": "q4dpt"\n                                },\n                                {\n                                    "options": [\n                                        "q4dru_7"\n                                    ],\n                                    "question": "q4dru"\n                                },\n                                {\n                                    "options": [\n                                        "q4dsa_7"\n                                    ],\n                                    "question": "q4dsa"\n                                },\n                                {\n                                    "options": [\n                                        "q4dsg_7"\n                                    ],\n                                    "question": "q4dsg"\n                                },\n                                {\n                                    "options": [\n                                        "q4dza_7"\n                                    ],\n                                    "question": "q4dza"\n                                },\n                                {\n                                    "options": [\n                                        "q4dsk_7"\n                                    ],\n                                    "question": "q4dsk"\n                                },\n                                {\n                                    "options": [\n                                        "q4des_7"\n                                    ],\n                                    "question": "q4des"\n                                },\n                                {\n                                    "options": [\n                                        "q4dse_7"\n                                    ],\n                                    "question": "q4dse"\n                                },\n                                {\n                                    "options": [\n                                        "q4dtw_7"\n                                    ],\n                                    "question": "q4dtw"\n                                },\n                                {\n                                    "options": [\n                                        "q4dth_7"\n                                    ],\n                                    "question": "q4dth"\n                                },\n                                {\n                                    "options": [\n                                        "q4dtr_7"\n                                    ],\n                                    "question": "q4dtr"\n                                },\n                                {\n                                    "options": [\n                                        "q4duae_7"\n                                    ],\n                                    "question": "q4duae"\n                                },\n                                {\n                                    "options": [\n                                        "q4duk_7"\n                                    ],\n                                    "question": "q4duk"\n                                },\n                                {\n                                    "options": [\n                                        "q4dus_7"\n                                    ],\n                                    "question": "q4dus"\n                                },\n                                {\n                                    "options": [\n                                        "q4dvt_7"\n                                    ],\n                                    "question": "q4dvt"\n                                },\n                                {\n                                    "options": [\n                                        "q4dcn_7"\n                                    ],\n                                    "question": "q4dcn"\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q1d_2",\n                                "q1d_4",\n                                "q1d_3"\n                            ],\n                            "question": "q1d",\n                            "suffixes": [\n                                1\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 82270,\n                "name": "Mothers Gen Y",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q8_2",\n                                "q8_4",\n                                "q8_3"\n                            ],\n                            "question": "q8"\n                        },\n                        {\n                            "options": [\n                                "q4_2",\n                                "q4_3"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 105,\n                "name": "Celebrity Gossipers",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_13"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 120,\n                "name": "Business Leaders",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_1"\n                            ],\n                            "question": "q14"\n                        },\n                        {\n                            "options": [\n                                "q18a_4",\n                                "q18a_5",\n                                "q18a_3"\n                            ],\n                            "question": "q18a"\n                        },\n                        {\n                            "options": [\n                                "q16_1"\n                            ],\n                            "question": "q16"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 121,\n                "name": "Travel Enthusiasts",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_5"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 122,\n                "name": "Movie Buffs",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_4"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 123,\n                "name": "Finance Experts",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_21"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 125,\n                "name": "Social Segments: Passives",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r1_5"\n                            ],\n                            "question": "r1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 126,\n                "name": "Smartphone Owners",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q39d_1"\n                            ],\n                            "question": "q39d"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 129,\n                "name": "Photo Fanatics",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_20"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 130,\n                "name": "Parents",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_2",\n                                "q9_3",\n                                "q9_4",\n                                "q9_5",\n                                "q9_6",\n                                "q9_7"\n                            ],\n                            "question": "q9"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": null,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 131,\n                "name": "Culture Lovers",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_15"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 5024,\n                "name": "Employment: Self-Employed",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_4"\n                            ],\n                            "question": "q14"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5027,\n                "name": "Employment: Unemployed",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_7"\n                            ],\n                            "question": "q14"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 5005,\n                "name": "Income: Bottom 25%",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "i1_1"\n                            ],\n                            "question": "i1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Demographics",\n                "folder": 357\n            },\n            {\n                "id": 8305,\n                "name": "Tech Influencers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q115_13"\n                            ],\n                            "question": "q115"\n                        },\n                        {\n                            "options": [\n                                "q20_6"\n                            ],\n                            "question": "q20",\n                            "suffixes": [\n                                5\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q25_1"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 43310,\n                "name": "YouTube Visitors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r52all_9"\n                            ],\n                            "question": "r52all"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 32391,\n                "name": "Skype Users",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126i_22"\n                            ],\n                            "question": "q126i"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Enterprise",\n                "folder": 383\n            },\n            {\n                "id": 8303,\n                "name": "Parents",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_2",\n                                "q9_3",\n                                "q9_4",\n                                "q9_5",\n                                "q9_6",\n                                "q9_7"\n                            ],\n                            "question": "q9"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 35788,\n                "name": "Digital Content Purchasers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q85b1_17",\n                                "q85b1_19",\n                                "q85b1_18",\n                                "q85b1_20",\n                                "q85b1_16",\n                                "q85b1_15",\n                                "q85b1_11",\n                                "q85b1_21",\n                                "q85b1_13",\n                                "q85b1_22",\n                                "q85b1_9",\n                                "q85b1_4",\n                                "q85b1_12",\n                                "q85b1_10",\n                                "q85b1_8",\n                                "q85b1_14",\n                                "q85b1_6",\n                                "q85b1_7",\n                                "q85b1_3"\n                            ],\n                            "question": "q85b1"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 96,\n                "name": "B2B Buyers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q17_4",\n                                "q17_5"\n                            ],\n                            "question": "q17"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": null,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 98,\n                "name": "Dads",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_2",\n                                "q9_3",\n                                "q9_4",\n                                "q9_5",\n                                "q9_6",\n                                "q9_7"\n                            ],\n                            "question": "q9"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": null,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 99,\n                "name": "Entrepreneurs",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q14_4"\n                            ],\n                            "question": "q14"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 100,\n                "name": "Fitness Fanatics",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_24"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 101,\n                "name": "Petrol Heads",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_18"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 108,\n                "name": "Moms",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_2",\n                                "q9_3",\n                                "q9_4",\n                                "q9_5",\n                                "q9_6",\n                                "q9_7"\n                            ],\n                            "question": "q9"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": null,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 110,\n                "name": "Environmentalists",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_8"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 111,\n                "name": "Teens",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3_16",\n                                "q3_17",\n                                "q3_18",\n                                "q3_19"\n                            ],\n                            "question": "q3"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": null,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 112,\n                "name": "Brand Advocates",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q20_6"\n                            ],\n                            "question": "q20",\n                            "suffixes": [\n                                5\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 113,\n                "name": "Gen X",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3_33",\n                                "q3_34",\n                                "q3_35",\n                                "q3_36",\n                                "q3_37",\n                                "q3_38",\n                                "q3_39",\n                                "q3_40",\n                                "q3_41",\n                                "q3_42",\n                                "q3_43",\n                                "q3_44",\n                                "q3_45",\n                                "q3_46",\n                                "q3_47",\n                                "q3_48",\n                                "q3_49",\n                                "q3_50",\n                                "q3_51"\n                            ],\n                            "question": "q3"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 8298,\n                "name": "Gen X",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3_33",\n                                "q3_34",\n                                "q3_35",\n                                "q3_36",\n                                "q3_37",\n                                "q3_38",\n                                "q3_39",\n                                "q3_40",\n                                "q3_41",\n                                "q3_42",\n                                "q3_43",\n                                "q3_44",\n                                "q3_45",\n                                "q3_46",\n                                "q3_47",\n                                "q3_48",\n                                "q3_49",\n                                "q3_50",\n                                "q3_51"\n                            ],\n                            "question": "q3"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 8299,\n                "name": "Gen Y / Millennials",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3_18",\n                                "q3_19",\n                                "q3_20",\n                                "q3_21",\n                                "q3_22",\n                                "q3_23",\n                                "q3_24",\n                                "q3_25",\n                                "q3_26",\n                                "q3_27",\n                                "q3_28",\n                                "q3_29",\n                                "q3_30",\n                                "q3_31",\n                                "q3_32"\n                            ],\n                            "question": "q3"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 114,\n                "name": "Gen Y / Millennials",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3_18",\n                                "q3_19",\n                                "q3_20",\n                                "q3_21",\n                                "q3_22",\n                                "q3_23",\n                                "q3_24",\n                                "q3_25",\n                                "q3_26",\n                                "q3_27",\n                                "q3_28",\n                                "q3_29",\n                                "q3_30",\n                                "q3_31",\n                                "q3_32"\n                            ],\n                            "question": "q3"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 127,\n                "name": "Sports Players",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q25_25"\n                            ],\n                            "question": "q25"\n                        },\n                        {\n                            "options": [\n                                "q4141_2",\n                                "q4141_16",\n                                "q4141_9",\n                                "q4141_3",\n                                "q4141_18",\n                                "q4141_7",\n                                "q4141_15",\n                                "q4141_10",\n                                "q4141_11",\n                                "q4141_1",\n                                "q4141_5",\n                                "q4141_8",\n                                "q4141_14",\n                                "q4141_6",\n                                "q4141_19",\n                                "q4141_17",\n                                "q4141_13",\n                                "q4141_4",\n                                "q4141_12"\n                            ],\n                            "question": "q4141",\n                            "suffixes": [\n                                1\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 128,\n                "name": "Tech Influencers",\n                "expression": {\n                    "and": [\n                        {\n                            "and": [\n                                {\n                                    "options": [\n                                        "q25_1"\n                                    ],\n                                    "question": "q25"\n                                },\n                                {\n                                    "options": [\n                                        "q115_13"\n                                    ],\n                                    "question": "q115"\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q20_6"\n                            ],\n                            "question": "q20",\n                            "suffixes": [\n                                5,\n                                4\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 133,\n                "name": "Beauty Fans",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q25_17"\n                            ],\n                            "question": "q25"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 1811,\n                "name": "Mobile Gamers",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q21510_4"\n                            ],\n                            "question": "q21510"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 358\n            },\n            {\n                "id": 8293,\n                "name": "Baby Boomers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q3_52",\n                                "q3_53",\n                                "q3_54",\n                                "q3_55",\n                                "q3_56",\n                                "q3_57",\n                                "q3_58",\n                                "q3_59",\n                                "q3_60",\n                                "q3_61",\n                                "q3_62",\n                                "q3_63",\n                                "q3_64"\n                            ],\n                            "question": "q3"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 8294,\n                "name": "Brand Advocates",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "r2021e_35"\n                            ],\n                            "question": "r2021e"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 8297,\n                "name": "Dads",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_2",\n                                "q9_3",\n                                "q9_4",\n                                "q9_5",\n                                "q9_6",\n                                "q9_7"\n                            ],\n                            "question": "q9"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 8300,\n                "name": "Mobile Gamers",\n                "expression": {\n                    "or": [\n                        {\n                            "options": [\n                                "q21510_4"\n                            ],\n                            "question": "q21510"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 8302,\n                "name": "Moms",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q9_1",\n                                "q9_2",\n                                "q9_3",\n                                "q9_4",\n                                "q9_5",\n                                "q9_6",\n                                "q9_7"\n                            ],\n                            "question": "q9"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 77543,\n                "name": "Hershey_SS_HomemadeTraditionalists",\n                "expression": {\n                    "and": [\n                        {\n                            "and": [\n                                {\n                                    "options": [\n                                        "q9_5",\n                                        "q9_6",\n                                        "q9_7"\n                                    ],\n                                    "question": "q9"\n                                },\n                                {\n                                    "options": [\n                                        "q8_2",\n                                        "q8_3"\n                                    ],\n                                    "question": "q8"\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q4_5",\n                                "q4_6"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "q13newca_7",\n                                "q13newca_8",\n                                "q13newca_9",\n                                "q13newca_6"\n                            ],\n                            "question": "q13newca"\n                        },\n                        {\n                            "options": [\n                                "q2_2",\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "s2_2"\n                            ],\n                            "question": "s2"\n                        },\n                        {\n                            "options": [\n                                "q2021a_2",\n                                "q2021a_4",\n                                "q2021a_5",\n                                "q2021a_25",\n                                "q2021a_28",\n                                "q2021a_38",\n                                "q2021a_42",\n                                "q2021a_46"\n                            ],\n                            "question": "q2021a",\n                            "min_count": "4"\n                        },\n                        {\n                            "options": [\n                                "q94newfc_27"\n                            ],\n                            "question": "q94newfc"\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 77538,\n                "name": "Hershey_SS_ElvesUnderPressure",\n                "expression": {\n                    "and": [\n                        {\n                            "and": [\n                                {\n                                    "and": [\n                                        {\n                                            "options": [\n                                                "q2_1"\n                                            ],\n                                            "question": "q2"\n                                        },\n                                        {\n                                            "options": [\n                                                "s2_2"\n                                            ],\n                                            "question": "s2"\n                                        }\n                                    ]\n                                },\n                                {\n                                    "or": [\n                                        {\n                                            "options": [\n                                                "q3_18",\n                                                "q3_19",\n                                                "q3_20",\n                                                "q3_21",\n                                                "q3_22",\n                                                "q3_23",\n                                                "q3_24",\n                                                "q3_45",\n                                                "q3_46",\n                                                "q3_47",\n                                                "q3_48"\n                                            ],\n                                            "question": "q3"\n                                        },\n                                        {\n                                            "options": [\n                                                "q4_3",\n                                                "q4_4"\n                                            ],\n                                            "question": "q4"\n                                        }\n                                    ]\n                                },\n                                {\n                                    "options": [\n                                        "q13newca_7",\n                                        "q13newca_6",\n                                        "q13newca_8"\n                                    ],\n                                    "question": "q13newca"\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q16_5",\n                                "q16_6"\n                            ],\n                            "question": "q16"\n                        },\n                        {\n                            "options": [\n                                "q2021a_8",\n                                "q2021a_39",\n                                "q2021a_64",\n                                "q2021a_65",\n                                "q2021a_7"\n                            ],\n                            "question": "q2021a"\n                        },\n                        {\n                            "options": [\n                                "q94new_38",\n                                "q94new_27"\n                            ],\n                            "question": "q94new"\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 77539,\n                "name": "Hershey_SS_GraciousGuests",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s2_2"\n                            ],\n                            "question": "s2"\n                        },\n                        {\n                            "options": [\n                                "q13newca_7",\n                                "q13newca_6",\n                                "q13newca_8",\n                                "q13newca_9"\n                            ],\n                            "question": "q13newca"\n                        },\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q4_6"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "q10_4",\n                                "q10_1"\n                            ],\n                            "question": "q10"\n                        },\n                        {\n                            "options": [\n                                "q14_9",\n                                "q14_1"\n                            ],\n                            "question": "q14"\n                        },\n                        {\n                            "options": [\n                                "q2021a_2",\n                                "q2021a_34",\n                                "q2021a_41",\n                                "q2021a_28"\n                            ],\n                            "question": "q2021a"\n                        },\n                        {\n                            "options": [\n                                "q94newfc_27"\n                            ],\n                            "question": "q94newfc"\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 77541,\n                "name": "Hershey_SS_LacklusterContributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1",\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q13newca_7",\n                                "q13newca_8",\n                                "q13newca_9",\n                                "q13newca_6"\n                            ],\n                            "question": "q13newca"\n                        },\n                        {\n                            "options": [\n                                "q4_6",\n                                "q4_5"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "s2_2"\n                            ],\n                            "question": "s2"\n                        },\n                        {\n                            "options": [\n                                "q14_9",\n                                "q14_8"\n                            ],\n                            "question": "q14"\n                        },\n                        {\n                            "options": [\n                                "q2021a_7",\n                                "q2021a_28",\n                                "q2021a_27",\n                                "q2021a_34"\n                            ],\n                            "question": "q2021a"\n                        },\n                        {\n                            "options": [\n                                "q94newfc_27"\n                            ],\n                            "question": "q94newfc"\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 77537,\n                "name": "Hershey_SS_ChristmasEnthusiasts",\n                "expression": {\n                    "and": [\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q3_45",\n                                        "q3_47",\n                                        "q3_46",\n                                        "q3_48"\n                                    ],\n                                    "question": "q3"\n                                },\n                                {\n                                    "options": [\n                                        "q4_3",\n                                        "q4_4"\n                                    ],\n                                    "question": "q4"\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q13newca_6",\n                                "q13newca_7",\n                                "q13newca_5"\n                            ],\n                            "question": "q13newca"\n                        },\n                        {\n                            "options": [\n                                "s2_2"\n                            ],\n                            "question": "s2"\n                        },\n                        {\n                            "options": [\n                                "q8_3",\n                                "q8_4",\n                                "q8_2",\n                                "q8_1"\n                            ],\n                            "question": "q8"\n                        },\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q2021a_1",\n                                "q2021a_45",\n                                "q2021a_4"\n                            ],\n                            "question": "q2021a"\n                        },\n                        {\n                            "options": [\n                                "q94new_27"\n                            ],\n                            "question": "q94new"\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 67512,\n                "name": "Euro Viewers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_30"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 32363,\n                "name": "Instagram Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_49"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 31642,\n                "name": "ABC1",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s2_44"\n                            ],\n                            "question": "s2"\n                        },\n                        {\n                            "options": [\n                                "q6_5",\n                                "q6_4",\n                                "q6_3"\n                            ],\n                            "question": "q6"\n                        },\n                        {\n                            "options": [\n                                "q15_1",\n                                "q15_4",\n                                "q15_6",\n                                "q15_7",\n                                "q15_10",\n                                "q15_13",\n                                "q15_16",\n                                "q15_17",\n                                "q15_19"\n                            ],\n                            "question": "q15"\n                        },\n                        {\n                            "options": [\n                                "i1_2",\n                                "i1_3"\n                            ],\n                            "question": "i1"\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 32383,\n                "name": "Tumblr Engagers/Contributors",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q46x2_9"\n                            ],\n                            "question": "q46x2"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 67513,\n                "name": "Fashionistas",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q25_14"\n                            ],\n                            "question": "q25"\n                        },\n                        {\n                            "options": [\n                                "q94new_29"\n                            ],\n                            "question": "q94new"\n                        },\n                        {\n                            "options": [\n                                "q2021a_25"\n                            ],\n                            "question": "q2021a"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 31646,\n                "name": "C2DE",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s2_44"\n                            ],\n                            "question": "s2"\n                        },\n                        {\n                            "options": [\n                                "i1_1"\n                            ],\n                            "question": "i1"\n                        },\n                        {\n                            "options": [\n                                "q15_9",\n                                "q15_5",\n                                "q15_8",\n                                "q15_11",\n                                "q15_12",\n                                "q15_18",\n                                "q15_2"\n                            ],\n                            "question": "q15"\n                        },\n                        {\n                            "options": [\n                                "q6_2",\n                                "q6_1"\n                            ],\n                            "question": "q6"\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 67511,\n                "name": "Mobile Ad-Blockers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q324b_1"\n                            ],\n                            "question": "q324b"\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 67516,\n                "name": "Olympics Fans",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_3"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 36272,\n                "name": "25-34 Urban Affluents",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4_3"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "q11_1"\n                            ],\n                            "question": "q11"\n                        },\n                        {\n                            "options": [\n                                "i1_3"\n                            ],\n                            "question": "i1"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 77536,\n                "name": "Hershey_SS_CasualCelebrators",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "s2_2"\n                            ],\n                            "question": "s2"\n                        },\n                        {\n                            "options": [\n                                "q4_4",\n                                "q4_5"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "options": [\n                                "q13newca_6",\n                                "q13newca_7",\n                                "q13newca_8"\n                            ],\n                            "question": "q13newca"\n                        },\n                        {\n                            "options": [\n                                "q2_2",\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q8_4",\n                                "q8_3",\n                                "q8_1",\n                                "q8_2"\n                            ],\n                            "question": "q8"\n                        },\n                        {\n                            "options": [\n                                "q2021a_2",\n                                "q2021a_6",\n                                "q2021a_41"\n                            ],\n                            "question": "q2021a"\n                        },\n                        {\n                            "options": [\n                                "q94new_27"\n                            ],\n                            "question": "q94new"\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 70335,\n                "name": "ios + ford / chevrolet / Audi",\n                "expression": {\n                    "and": [\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q126h_1"\n                                    ],\n                                    "question": "q126h"\n                                },\n                                {\n                                    "options": [\n                                        "q126j_3"\n                                    ],\n                                    "question": "q126j"\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q306a_14",\n                                "q306a_5",\n                                "q306a_8"\n                            ],\n                            "question": "q306a",\n                            "suffixes": [\n                                1,\n                                2,\n                                3,\n                                4\n                            ]\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "user",\n                "shared": false,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 80899,\n                "name": "android",\n                "expression": {\n                    "and": []\n                },\n                "curated": null,\n                "type": "user",\n                "shared": false,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 85462,\n                "name": "4G Mobile Users copy",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q39c_1"\n                            ],\n                            "question": "q39c"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "user",\n                "shared": false,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 32354,\n                "name": "Premier League Fans",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                3,\n                                2\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 84063,\n                "name": "TV Buyers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q91el_5"\n                            ],\n                            "question": "q91el",\n                            "suffixes": [\n                                4\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 84064,\n                "name": "Vacationers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q311_1",\n                                "q311_2",\n                                "q311_3",\n                                "q311_4"\n                            ],\n                            "question": "q311",\n                            "suffixes": [\n                                2\n                            ]\n                        }\n                    ]\n                },\n                "curated": true,\n                "type": "curated",\n                "shared": false,\n                "category": "Audiences",\n                "folder": 383\n            },\n            {\n                "id": 76232,\n                "name": "Tesla Campaign - UK tech or ecofriendly Parents and expecting with high income ",\n                "expression": {\n                    "and": [\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q8_2",\n                                        "q8_3",\n                                        "q8_4"\n                                    ],\n                                    "question": "q8"\n                                },\n                                {\n                                    "options": [\n                                        "q31512_1"\n                                    ],\n                                    "question": "q31512"\n                                }\n                            ]\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q13newuk_13",\n                                        "q13newuk_14"\n                                    ],\n                                    "question": "q13newuk"\n                                },\n                                {\n                                    "options": [\n                                        "i1_3"\n                                    ],\n                                    "question": "i1"\n                                }\n                            ]\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "r2021e_3"\n                                    ],\n                                    "question": "r2021e"\n                                },\n                                {\n                                    "options": [\n                                        "q2021a_48"\n                                    ],\n                                    "question": "q2021a"\n                                }\n                            ]\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "r2021e_38"\n                                    ],\n                                    "question": "r2021e"\n                                },\n                                {\n                                    "options": [\n                                        "r2021e_46"\n                                    ],\n                                    "question": "r2021e"\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "r8_1"\n                            ],\n                            "question": "r8"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 30256,\n                "name": "16-24 travellers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4_2"\n                            ],\n                            "question": "q4"\n                        },\n                        {\n                            "and": [\n                                {\n                                    "options": [\n                                        "q2_1"\n                                    ],\n                                    "question": "q2"\n                                },\n                                {\n                                    "or": [\n                                        {\n                                            "options": [\n                                                "q126a2co_968",\n                                                "q126a2co_1023",\n                                                "q126a2co_982"\n                                            ],\n                                            "question": "q126a2co"\n                                        },\n                                        {\n                                            "options": [\n                                                "q311_3",\n                                                "q311_2",\n                                                "q311_1"\n                                            ],\n                                            "question": "q311",\n                                            "suffixes": [\n                                                1,\n                                                2,\n                                                3\n                                            ],\n                                            "not": true\n                                        }\n                                    ]\n                                }\n                            ]\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 80898,\n                "name": "tripomatic users maybe",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126h_2",\n                                "q126h_1",\n                                "q126h_3"\n                            ],\n                            "question": "q126h"\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q94newtr_31"\n                                    ],\n                                    "question": "q94newtr"\n                                },\n                                {\n                                    "options": [\n                                        "q126d2_7"\n                                    ],\n                                    "question": "q126d2"\n                                },\n                                {\n                                    "options": [\n                                        "q4154m_16"\n                                    ],\n                                    "question": "q4154m"\n                                },\n                                {\n                                    "options": [\n                                        "q91tr_15",\n                                        "q91tr_14"\n                                    ],\n                                    "question": "q91tr",\n                                    "suffixes": [\n                                        1,\n                                        2,\n                                        3,\n                                        4\n                                    ]\n                                }\n                            ]\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "user",\n                "shared": false,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 80900,\n                "name": "ios",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q126h_1"\n                            ],\n                            "question": "q126h"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "user",\n                "shared": false,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 85882,\n                "name": "Premier League (Watch TV OR ONLINE) Female",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 76588,\n                "name": "Top 1% copy",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4dar_7"\n                            ],\n                            "question": "q4dar"\n                        },\n                        {\n                            "options": [\n                                "q4dau_7"\n                            ],\n                            "question": "q4dau"\n                        },\n                        {\n                            "options": [\n                                "q1d_2",\n                                "q1d_4",\n                                "q1d_3"\n                            ],\n                            "question": "q1d",\n                            "suffixes": [\n                                1\n                            ]\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "user",\n                "shared": false,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 85884,\n                "name": "Premier League (Watch TV OR ONLINE) 25-34",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q4_3"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 85893,\n                "name": "Premier League (Watch TV OR ONLINE) B2B IT Buyers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q17_4"\n                            ],\n                            "question": "q17"\n                        },\n                        {\n                            "options": [\n                                "q18_1",\n                                "q18_2"\n                            ],\n                            "question": "q18"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 91107,\n                "name": "filter",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_1",\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "user",\n                "shared": false,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 83677,\n                "name": "Snapchat users (training) and travel",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "r52alls_1006"\n                            ],\n                            "question": "r52alls"\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q25_5"\n                                    ],\n                                    "question": "q25"\n                                },\n                                {\n                                    "options": [\n                                        "q311_1",\n                                        "q311_2",\n                                        "q311_3",\n                                        "q311_4"\n                                    ],\n                                    "question": "q311",\n                                    "suffixes": [\n                                        2,\n                                        1\n                                    ]\n                                }\n                            ]\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 85885,\n                "name": "Premier League (Watch TV OR ONLINE) 35-44",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q4_4"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 85883,\n                "name": "Premier League (Watch TV OR ONLINE) 16-24",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q4_2"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 85880,\n                "name": "Premier League (Watch TV OR ONLINE) Male",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q2_1"\n                            ],\n                            "question": "q2"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 81598,\n                "name": "APAC Social networking Mums with children ages 0-11 ",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "options": [\n                                "q8_2",\n                                "q8_4",\n                                "q8_3"\n                            ],\n                            "question": "q8"\n                        },\n                        {\n                            "options": [\n                                "q9_3",\n                                "q9_2",\n                                "q9_1"\n                            ],\n                            "question": "q9"\n                        },\n                        {\n                            "options": [\n                                "q27lj_1"\n                            ],\n                            "question": "q27lj"\n                        },\n                        {\n                            "options": [\n                                "s2_86",\n                                "s2_852",\n                                "s2_65",\n                                "s2_886",\n                                "s2_66",\n                                "s2_82"\n                            ],\n                            "question": "s2"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 85887,\n                "name": "Premier League (Watch TV OR ONLINE) 45-54",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q4_5"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 82272,\n                "name": "Mothers Gen X",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q8_2",\n                                "q8_4",\n                                "q8_3"\n                            ],\n                            "question": "q8"\n                        },\n                        {\n                            "options": [\n                                "q4_4",\n                                "q4_5",\n                                "q4_6"\n                            ],\n                            "question": "q4"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 83800,\n                "name": "Millennials Mums",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2_2"\n                            ],\n                            "question": "q2"\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q3_35"\n                                    ],\n                                    "question": "q3"\n                                },\n                                {\n                                    "options": [\n                                        "q4_3"\n                                    ],\n                                    "question": "q4"\n                                }\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q11_1"\n                            ],\n                            "question": "q11"\n                        },\n                        {\n                            "options": [\n                                "q6_4"\n                            ],\n                            "question": "q6"\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q31512_1"\n                                    ],\n                                    "question": "q31512"\n                                },\n                                {\n                                    "options": [\n                                        "q8_2",\n                                        "q8_3",\n                                        "q8_4"\n                                    ],\n                                    "question": "q8"\n                                }\n                            ]\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 85890,\n                "name": "Premier League (Watch TV OR ONLINE) B2B Buyers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q4142_6"\n                            ],\n                            "question": "q4142",\n                            "suffixes": [\n                                2,\n                                3\n                            ]\n                        },\n                        {\n                            "options": [\n                                "q17_5",\n                                "q17_4"\n                            ],\n                            "question": "q17"\n                        },\n                        {\n                            "options": [\n                                "q18_1",\n                                "q18_2"\n                            ],\n                            "question": "q18"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 89182,\n                "name": "Facebook Vlogger Fans (APAC)",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q48_13"\n                            ],\n                            "question": "q48"\n                        },\n                        {\n                            "options": [\n                                "q46x2_1"\n                            ],\n                            "question": "q46x2"\n                        },\n                        {\n                            "options": [\n                                "s6_4"\n                            ],\n                            "question": "s6"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 89214,\n                "name": "All things hair",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q7_1",\n                                "q7_2",\n                                "q7_3",\n                                "q7_4"\n                            ],\n                            "question": "gwi-160815.q7"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "user",\n                "shared": false,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 88145,\n                "name": "High achiever",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q2021a_5",\n                                "q2021a_8",\n                                "q2021a_16",\n                                "q2021a_68",\n                                "q2021a_53"\n                            ],\n                            "question": "q2021a"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 87906,\n                "name": "Top 25% - business travel or interest",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "i1_3",\n                                "i1_4"\n                            ],\n                            "question": "i1"\n                        },\n                        {\n                            "or": [\n                                {\n                                    "options": [\n                                        "q25_10",\n                                        "q25_21",\n                                        "q25_11",\n                                        "q25_36"\n                                    ],\n                                    "question": "q25"\n                                },\n                                {\n                                    "options": [\n                                        "q311_2"\n                                    ],\n                                    "question": "q311",\n                                    "suffixes": [\n                                        3\n                                    ]\n                                }\n                            ]\n                        }\n                    ]\n                },\n                "curated": false,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            },\n            {\n                "id": 91958,\n                "name": "Mothers Main Food Shoppers",\n                "expression": {\n                    "and": [\n                        {\n                            "options": [\n                                "q8_2",\n                                "q8_3",\n                                "q8_4"\n                            ],\n                            "question": "q8"\n                        },\n                        {\n                            "options": [\n                                "q12b_1"\n                            ],\n                            "question": "q12b"\n                        }\n                    ]\n                },\n                "curated": null,\n                "type": "shared",\n                "shared": true,\n                "category": null,\n                "folder": null\n            }\n        ]\n    }\n    ';
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.b) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.d),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.d);
		} else {
			var treeLen = builder.b * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.e) : builder.e;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.b);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.d) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.d);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{e: nodeList, b: (len / $elm$core$Array$branchFactor) | 0, d: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Data$Audience$RawData = F4(
	function (id, name, type_, folder) {
		return {U: folder, V: id, X: name, ab: type_};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map4 = _Json_map4;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Data$Audience$rawDataDecoder = A5(
	$elm$json$Json$Decode$map4,
	$author$project$Data$Audience$RawData,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'folder',
		$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int)));
var $author$project$Data$Audience$createAudience = F4(
	function (id, name, type_, folder) {
		return {U: folder, V: id, X: name, ab: type_};
	});
var $author$project$Data$Audience$Curated = 2;
var $author$project$Data$Audience$Shared = 1;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $author$project$Data$Audience$decodeAudienceType = function (str) {
	switch (str) {
		case 'user':
			return $elm$json$Json$Decode$succeed(0);
		case 'shared':
			return $elm$json$Json$Decode$succeed(1);
		case 'curated':
			return $elm$json$Json$Decode$succeed(2);
		default:
			return $elm$json$Json$Decode$fail('Invalid audience type: ' + str);
	}
};
var $author$project$Data$Audience$rawDataToAudience = function (rawData) {
	return A5(
		$elm$json$Json$Decode$map4,
		$author$project$Data$Audience$createAudience,
		$elm$json$Json$Decode$succeed(rawData.V),
		$elm$json$Json$Decode$succeed(rawData.X),
		$author$project$Data$Audience$decodeAudienceType(rawData.ab),
		$elm$json$Json$Decode$succeed(rawData.U));
};
var $author$project$Data$Audience$decoder = A2(
	$elm$json$Json$Decode$field,
	'data',
	$elm$json$Json$Decode$list(
		A2($elm$json$Json$Decode$andThen, $author$project$Data$Audience$rawDataToAudience, $author$project$Data$Audience$rawDataDecoder)));
var $author$project$Data$AudienceFolder$AudienceFolder = F3(
	function (id, name, parent) {
		return {V: id, X: name, aI: parent};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Data$AudienceFolder$decoder = A2(
	$elm$json$Json$Decode$field,
	'data',
	$elm$json$Json$Decode$list(
		A4(
			$elm$json$Json$Decode$map3,
			$author$project$Data$AudienceFolder$AudienceFolder,
			A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$int),
			A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string),
			A2(
				$elm$json$Json$Decode$field,
				'parent',
				$elm$json$Json$Decode$nullable($elm$json$Json$Decode$int)))));
var $author$project$Main$init = function () {
	var _v0 = _Utils_Tuple2(
		A2($elm$json$Json$Decode$decodeString, $author$project$Data$AudienceFolder$decoder, $author$project$Data$AudienceFolder$audienceFoldersJSON),
		A2($elm$json$Json$Decode$decodeString, $author$project$Data$Audience$decoder, $author$project$Data$Audience$audiencesJSON));
	if ((!_v0.a.$) && (!_v0.b.$)) {
		var audienceFolders = _v0.a.a;
		var audiences = _v0.b.a;
		return $author$project$Main$Success(
			{S: audienceFolders, ad: audiences, x: 0, y: $elm$core$Maybe$Nothing});
	} else {
		return $author$project$Main$Failure;
	}
}();
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {ax: fragment, aB: host, aJ: path, aL: port_, aO: protocol, aP: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$sandbox = function (impl) {
	return _Browser_element(
		{
			bj: function (_v0) {
				return _Utils_Tuple2(impl.bj, $elm$core$Platform$Cmd$none);
			},
			bz: function (_v1) {
				return $elm$core$Platform$Sub$none;
			},
			bD: F2(
				function (msg, model) {
					return _Utils_Tuple2(
						A2(impl.bD, msg, model),
						$elm$core$Platform$Cmd$none);
				}),
			bE: impl.bE
		});
};
var $author$project$Main$update = F2(
	function (msg, model) {
		if (!model.$) {
			var loadedModel = model.a;
			if (!msg.$) {
				var id = msg.a;
				return $author$project$Main$Success(
					_Utils_update(
						loadedModel,
						{y: id}));
			} else {
				var type_ = msg.a;
				return $author$project$Main$Success(
					_Utils_update(
						loadedModel,
						{x: type_, y: $elm$core$Maybe$Nothing}));
			}
		} else {
			return model;
		}
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $author$project$Data$AudienceFolder$getParentId = F2(
	function (currentFolderId, folders) {
		if (!currentFolderId.$) {
			var folder = currentFolderId.a;
			var _v1 = A2(
				$elm_community$list_extra$List$Extra$find,
				function (a) {
					return _Utils_eq(a.V, folder);
				},
				folders);
			if (!_v1.$) {
				var f = _v1.a;
				return f.aI;
			} else {
				return $elm$core$Maybe$Nothing;
			}
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Main$showAudience = function (name) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('entry'),
				$elm$html$Html$Attributes$class('audience')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(name)
					]))
			]));
};
var $author$project$Main$SetFolder = function (a) {
	return {$: 0, a: a};
};
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $feathericons$elm_feather$FeatherIcons$Icon = $elm$core$Basics$identity;
var $feathericons$elm_feather$FeatherIcons$defaultAttributes = function (name) {
	return {
		T: $elm$core$Maybe$Just('feather feather-' + name),
		_: 24,
		N: '',
		aa: 2,
		ac: '0 0 24 24'
	};
};
var $feathericons$elm_feather$FeatherIcons$makeBuilder = F2(
	function (name, src) {
		return {
			i: $feathericons$elm_feather$FeatherIcons$defaultAttributes(name),
			l: src
		};
	});
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $feathericons$elm_feather$FeatherIcons$folder = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'folder',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z')
				]),
			_List_Nil)
		]));
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$svg$Svg$map = $elm$virtual_dom$VirtualDom$map;
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $feathericons$elm_feather$FeatherIcons$toHtml = F2(
	function (attributes, _v0) {
		var src = _v0.l;
		var attrs = _v0.i;
		var strSize = $elm$core$String$fromFloat(attrs._);
		var baseAttributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$fill('none'),
				$elm$svg$Svg$Attributes$height(
				_Utils_ap(strSize, attrs.N)),
				$elm$svg$Svg$Attributes$width(
				_Utils_ap(strSize, attrs.N)),
				$elm$svg$Svg$Attributes$stroke('currentColor'),
				$elm$svg$Svg$Attributes$strokeLinecap('round'),
				$elm$svg$Svg$Attributes$strokeLinejoin('round'),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(attrs.aa)),
				$elm$svg$Svg$Attributes$viewBox(attrs.ac)
			]);
		var combinedAttributes = _Utils_ap(
			function () {
				var _v1 = attrs.T;
				if (!_v1.$) {
					var c = _v1.a;
					return A2(
						$elm$core$List$cons,
						$elm$svg$Svg$Attributes$class(c),
						baseAttributes);
				} else {
					return baseAttributes;
				}
			}(),
			attributes);
		return A2(
			$elm$svg$Svg$svg,
			combinedAttributes,
			A2(
				$elm$core$List$map,
				$elm$svg$Svg$map($elm$core$Basics$never),
				src));
	});
var $author$project$Main$showAudienceFolder = F2(
	function (id, name) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('entry'),
					$elm$html$Html$Attributes$class('audienceFolder'),
					$elm$html$Html$Events$onClick(
					$author$project$Main$SetFolder(
						$elm$core$Maybe$Just(id)))
				]),
			_List_fromArray(
				[
					A2(
					$feathericons$elm_feather$FeatherIcons$toHtml,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle'),
							A2($elm$html$Html$Attributes$style, 'display', 'inline-block')
						]),
					$feathericons$elm_feather$FeatherIcons$folder),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(name)
						]))
				]));
	});
var $author$project$Main$SetType = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $author$project$Main$showAudienceType = F3(
	function (name, type_, currentAudienceType) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('button', true),
							_Utils_Tuple2(
							'selected',
							_Utils_eq(type_, currentAudienceType))
						])),
					$elm$html$Html$Events$onClick(
					$author$project$Main$SetType(type_))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(name)
				]));
	});
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polyline = $elm$svg$Svg$trustedNode('polyline');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $feathericons$elm_feather$FeatherIcons$arrowLeft = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'arrow-left',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('19'),
					$elm$svg$Svg$Attributes$y1('12'),
					$elm$svg$Svg$Attributes$x2('5'),
					$elm$svg$Svg$Attributes$y2('12')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('12 19 5 12 12 5')
				]),
			_List_Nil)
		]));
var $author$project$Main$showUpFolder = F2(
	function (currentFolderId, parentFolderId) {
		if (!currentFolderId.$) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('entry'),
						$elm$html$Html$Attributes$class('parent'),
						$elm$html$Html$Events$onClick(
						$author$project$Main$SetFolder(parentFolderId))
					]),
				_List_fromArray(
					[
						A2(
						$feathericons$elm_feather$FeatherIcons$toHtml,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle'),
								A2($elm$html$Html$Attributes$style, 'display', 'inline-block')
							]),
						$feathericons$elm_feather$FeatherIcons$arrowLeft),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Up')
							]))
					]));
		} else {
			return $elm$html$Html$text('');
		}
	});
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Main$view = function (model) {
	if (!model.$) {
		var m = model.a;
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('buttons')
						]),
					_List_fromArray(
						[
							A3($author$project$Main$showAudienceType, 'Authored', 0, m.x),
							A3($author$project$Main$showAudienceType, 'Shared', 1, m.x),
							A3($author$project$Main$showAudienceType, 'Curated', 2, m.x)
						])),
					A2(
					$elm$html$Html$ul,
					_List_Nil,
					function () {
						var parentFolderId = A2($author$project$Data$AudienceFolder$getParentId, m.y, m.S);
						var audiences = A2(
							$elm$core$List$filter,
							function (a) {
								return _Utils_eq(a.U, m.y) && _Utils_eq(a.ab, m.x);
							},
							m.ad);
						var audienceFolders = A2(
							$elm$core$List$filter,
							function (a) {
								return _Utils_eq(a.aI, m.y);
							},
							m.S);
						return $elm$core$List$concat(
							_List_fromArray(
								[
									$elm$core$List$singleton(
									A2($author$project$Main$showUpFolder, m.y, parentFolderId)),
									(m.x !== 1) ? A2(
									$elm$core$List$map,
									function (a) {
										return A2($author$project$Main$showAudienceFolder, a.V, a.X);
									},
									audienceFolders) : _List_Nil,
									A2(
									$elm$core$List$map,
									function (a) {
										return $author$project$Main$showAudience(a.X);
									},
									audiences)
								]));
					}())
				]));
	} else {
		return $elm$html$Html$text('Failed to parse JSON');
	}
};
var $author$project$Main$main = $elm$browser$Browser$sandbox(
	{bj: $author$project$Main$init, bD: $author$project$Main$update, bE: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));