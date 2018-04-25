const jsonStableStringify = require( 'json-stable-stringify' );

module.exports = class JSONStableStringifyMap {
	constructor() {
		this.map = Object.create( null );
	}

	set( key, value ) {
		this.map[ jsonStableStringify( key ) ] = value;
	}

	get( key ) {
		return this.map[ jsonStableStringify( key ) ];
	}
};
