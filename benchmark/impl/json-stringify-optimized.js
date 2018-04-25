module.exports = class JSONStringifyOptimizedMap {
	constructor() {
		this.map = Object.create( null );
	}

	set( key, value ) {
		this.map[ JSON.stringify( key ) ] = value;
	}

	get( key ) {
		return this.map[ JSON.stringify( key ) ];
	}
};
