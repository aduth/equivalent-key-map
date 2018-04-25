/* eslint-disable no-console */

const Benchmark = require( 'benchmark' );

const JSONStringifyNaiveMap = require( './impl/json-stringify-naive' );
const JSONStringifyOptimizedMap = require( './impl/json-stringify-optimized' );
const JSONStableStringifyMap = require( './impl/json-stable-stringify' );
const FasterStableStringifyMap = require( './impl/faster-stable-stringify' );
const TupleStringifyMap = require( './impl/tuple-stringify' );
const EquivalentKeyMap = require( '../' );

const CHAR_CODE_LOWERCASE_A = 97;

const suite = new Benchmark.Suite;

[
	EquivalentKeyMap,
	JSONStringifyNaiveMap,
	JSONStringifyOptimizedMap,
	JSONStableStringifyMap,
	FasterStableStringifyMap,
	TupleStringifyMap,
].forEach( ( Impl ) => {
	const map = new Impl;

	for ( let i = 1; i < 4; i++ ) {
		const numKeyProperties = ( i ** 2 ) * 2;

		const key = {};

		for ( let j = 0; j < numKeyProperties; j++ ) {
			key[ String.fromCharCode( CHAR_CODE_LOWERCASE_A + j ) ] = j;
		}

		map.set( key, 0 );

		suite.add( `${ Impl.name } (${ numKeyProperties } properties)`, () => {
			map.get( key );
		} );
	}
} );

console.log( 'Running...' );

suite
	.on( 'cycle', ( event ) => console.log( event.target.toString() ) )
	.run( { async: true } );
