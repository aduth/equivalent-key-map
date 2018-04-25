# EquivalentKeyMap

`EquivalentKeyMap` is a variant of a [`Map` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) which enables lookup by _equivalent_ (deeply equal) object and array keys.

## Example

With a standard `Map`, a value is only returned if its key is strictly equal to the one used in assigning its value.

```js
const map = new Map();
map.set( { a: 1 }, 10 );
map.get( { a: 1 } );
// ⇒ undefined
```

By contrast, `EquivalentKeyMap` considers key equality of objects and arrays deeply:

```js
const map = new EquivalentKeyMap();
map.set( { a: 1 }, 10 );
map.get( { a: 1 } );
// ⇒ 10
```

## Installation

EquivalentKeyMap is published as an [npm](https://www.npmjs.com/) package:

```
npm install equivalent-key-map
```

Browser-ready versions are available from [unpkg](https://unpkg.com/equivalent-key-map/dist/equivalent-key-map.min.js). The browser-ready version assigns itself on the global scope as `EquivalentKeyMap`.

```html
<script src="https://unpkg.com/equivalent-key-map/dist/equivalent-key-map.min.js"></script>
<script>
var map = new EquivalentKeyMap();

// ...
</script>
```

## Usage

`EquivalentKeyMap` is intended to recreate the same API properties and methods available for `WeakMap`:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap

**Note:** In a future version, `EquivalentKeyMap` may support all methods of a `Map`. That said, it may be considered strictly accurate to not allow `EquivalentKeyMap` to be iterable, as there is no singular value reference which can represent an object or array key, since keys are considered by equivalence.

## Performance Considerations

There is inevitably some overhead in tracking object and array references deeply, contrasted with the standard Map object. This is a compromise you should consider when deciding whether you need deep key equality behavior.

That said, `EquivalentKeyMap` was implemented with performance in mind, and is significantly faster — and importantaly, more [correct](https://github.com/aduth/equivalent-key-map/blob/210f42bbd431c7c10da33d310cf56ef3b3ca96e7/test/index.js#L67-L71) — than a number of [alternative naive approaches](https://github.com/aduth/equivalent-key-map/tree/master/benchmark/impl).

### Benchmarks

The following benchmark results describe the behavior of `EquivalentMap#get` with keys of varying property lengths. 

>**`EquivalentKeyMap (2 properties) x 2,186,074 ops/sec ±0.52% (90 runs sampled)`**  
>**`EquivalentKeyMap (8 properties) x 1,366,996 ops/sec ±0.49% (94 runs sampled)`**  
>**`EquivalentKeyMap (18 properties) x 566,008 ops/sec ±0.77% (89 runs sampled)`**  
>
>`JSONStringifyNaiveMap (2 properties) x 1,683,683 ops/sec ±0.61% (89 runs sampled)`  
>`JSONStringifyNaiveMap (8 properties) x 934,253 ops/sec ±0.52% (91 runs sampled)`  
>`JSONStringifyNaiveMap (18 properties) x 568,055 ops/sec ±0.56% (93 runs sampled)`  
>
>`JSONStringifyOptimizedMap (2 properties) x 1,971,482 ops/sec ±1.03% (90 runs sampled)`  
>`JSONStringifyOptimizedMap (8 properties) x 1,021,981 ops/sec ±0.56% (90 runs sampled)`  
>`JSONStringifyOptimizedMap (18 properties) x 596,477 ops/sec ±0.52% (93 runs sampled)`  
>
>`JSONStableStringifyMap (2 properties) x 290,168 ops/sec ±0.96% (86 runs sampled)`  
>`JSONStableStringifyMap (8 properties) x 130,502 ops/sec ±0.48% (89 runs sampled)`  
>`JSONStableStringifyMap (18 properties) x 63,924 ops/sec ±1.00% (93 runs sampled)`  
>
>`FasterStableStringifyMap (2 properties) x 347,172 ops/sec ±0.85% (80 runs sampled)`  
>`FasterStableStringifyMap (8 properties) x 174,823 ops/sec ±0.60% (90 runs sampled)`  
>`FasterStableStringifyMap (18 properties) x 89,231 ops/sec ±0.39% (93 runs sampled)`  
>
>`TupleStringifyMap (2 properties) x 837,870 ops/sec ±0.69% (89 runs sampled)`  
>`TupleStringifyMap (8 properties) x 408,946 ops/sec ±1.19% (89 runs sampled)`  
>`TupleStringifyMap (18 properties) x 208,670 ops/sec ±0.51% (91 runs sampled)`  
>
>`StableQuerystringMap (2 properties) x 1,023,860 ops/sec ±1.06% (88 runs sampled)`  
>`StableQuerystringMap (8 properties) x 347,168 ops/sec ±0.85% (92 runs sampled)`  
>`StableQuerystringMap (18 properties) x 158,737 ops/sec ±0.44% (91 runs sampled)`  

You can run these on your own machine by cloning the repository, installing optional dependencies, and running `npm run benchmark`.

```
git clone https://github.com/aduth/equivalent-key-map.git
cd equivalent-key-map
npm install --optional
npm run benchmark
```

## Browser Support

`EquivalentKeyMap` is implemented using `Map` and follows the corresponding [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Browser_compatibility). Notably, this includes all modern browsers and Internet Explorer 11. The `Map` methods not supported by Internet Explorer 11 are not used by `EquivalentKeyMap` and can be safely overlooked.

If you need support for older browsers, it's recommended that you use a polyfill such as [`core-js`](https://github.com/zloirock/core-js) or [polyfill.io](https://polyfill.io/v2/docs/).

## License

Copyright 2018 Andrew Duthie

Released under the [MIT License](https://github.com/aduth/equivalent-key-map/tree/master/LICENSE.md).
