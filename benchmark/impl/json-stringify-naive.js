module.exports = class JSONStringifyNaiveMap {
	constructor() {
		this.map = {};
	}

	set( key, value ) {
		this.map[ JSON.stringify( key ) ] = value;
	}

	get( key ) {
		return this.map[ JSON.stringify( key ) ];
	}
};
