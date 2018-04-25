function getStableTupleKey( key ) {
	const tuples = [];
	const properties = Object.keys( key ).sort();
	for ( let i = 0; i < properties.length; i++ ) {
		const property = properties[ i ];
		tuples.push( [ property, key[ property ] ] );
	}

	return JSON.stringify( tuples );
}

module.exports = class TupleStringifyMap {
	constructor() {
		this.map = Object.create( null );
	}

	set( key, value ) {
		this.map[ getStableTupleKey( key ) ] = value;
	}

	get( key ) {
		return this.map[ getStableTupleKey( key ) ];
	}
};
