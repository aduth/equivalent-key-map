const fasterStableStringify = require( 'faster-stable-stringify' );

module.exports = class FasterStableStringifyMap {
	constructor() {
		this.map = Object.create( null );
	}

	set( key, value ) {
		this.map[ fasterStableStringify( key ) ] = value;
	}

	get( key ) {
		return this.map[ fasterStableStringify( key ) ];
	}
};
