function getStableStringKey( key ) {
	let stableKey = '';

	const properties = Object.keys( key ).sort();
	for ( let i = 0; i < properties.length; i++ ) {
		const property = properties[ i ];
		if ( stableKey ) {
			stableKey += '&';
		}

		stableKey += (
			encodeURIComponent( property ) +
			'=' +
			encodeURIComponent( key[ property ] )
		);
	}

	return stableKey;
}

module.exports = class StableQuerystringMap {
	constructor() {
		this.map = Object.create( null );
	}

	set( key, value ) {
		this.map[ getStableStringKey( key ) ] = value;
	}

	get( key ) {
		return this.map[ getStableStringKey( key ) ];
	}
};
