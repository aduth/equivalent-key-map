/**
 * Variant of a Map object which enables lookup by equivalent (deeply equal)
 * object and array keys.
 */
class EquivalentKeyMap {
	/**
	 * Constructs a new instance of EquivalentKeyMap.
	 *
	 * @param {Iterable.<*>} iterable Initial pair of key, value for map.
	 */
	constructor( iterable ) {
		this.clear();

		if ( iterable instanceof EquivalentKeyMap ) {
			// Map#forEach is only means of iterating with support for IE11.
			const iterablePairs = [];
			iterable._map.forEach( ( value, key ) => {
				iterablePairs.push( [ key, value ] );
			} );

			iterable = iterablePairs;
		}

		if ( iterable != null ) {
			for ( let i = 0; i < iterable.length; i++ ) {
				this.set( iterable[ i ][ 0 ], iterable[ i ][ 1 ] );
			}
		}
	}

	/**
	 * Add or update an element with a specified key and value.
	 *
	 * @param {*} key   The key of the element to add.
	 * @param {*} value The value of the element to add.
	 *
	 * @return {EquivalentKeyMap} Map instance.
	 */
	set( key, value ) {
		// Shortcut non-object-like to set on internal Map.
		if ( key === null || typeof key !== 'object' ) {
			this._flatMap.set( key, value );
			return this;
		}

		// Sort keys to ensure stable assignment into tree.
		const properties = Object.keys( key ).sort();

		// Tree by type to avoid conflicts on numeric object keys, empty value.
		let map = Array.isArray( key ) ? this._arrayTreeMap : this._objectTreeMap;

		for ( let i = 0; i < properties.length; i++ ) {
			const property = properties[ i ];

			if ( ! map.has( property ) ) {
				map.set( property, new EquivalentKeyMap );
			}

			map = map.get( property );

			const propertyValue = key[ property ];
			if ( ! map.has( propertyValue ) ) {
				map.set( propertyValue, new EquivalentKeyMap );
			}

			map = map.get( propertyValue );
		}

		map.set( '_ekm_value', value );
		return this;
	}

	/**
	 * Returns a specified element.
	 *
	 * @param {*} key The key of the element to return.
	 *
	 * @return {?*} The element associated with the specified key or undefined
	 *              if the key can't be found.
	 */
	get( key ) {
		// Shortcut non-object-like to get from internal Map.
		if ( key === null || typeof key !== 'object' ) {
			return this._flatMap.get( key );
		}

		// Sort keys to ensure stable retrieval from tree.
		const properties = Object.keys( key ).sort();

		// Tree by type to avoid conflicts on numeric object keys, empty value.
		let map = Array.isArray( key ) ? this._arrayTreeMap : this._objectTreeMap;

		for ( let i = 0; i < properties.length; i++ ) {
			const property = properties[ i ];

			map = map.get( property );
			if ( map === undefined ) {
				return;
			}

			const propertyValue = key[ property ];
			map = map.get( propertyValue );
			if ( map === undefined ) {
				return;
			}
		}

		return map.get( '_ekm_value' );
	}

	/**
	 * Returns a boolean indicating whether an element with the specified key
	 * exists or not.
	 *
	 * @param {*} key The key of the element to test for presence.
	 *
	 * @return {boolean} Whether an element with the specified key exists.
	 */
	has( key ) {
		if ( key === null || typeof key !== 'object' ) {
			return this._flatMap.has( key );
		}

		return Boolean( this.get( key ) );
	}

	/**
	 * Removes the specified element.
	 *
	 * @param {*} key The key of the element to remove.
	 *
	 * @return {boolean} Returns true if an element existed and has been
	 *                   removed, or false if the element does not exist.
	 */
	delete( key ) {
		if ( ! this.has( key ) ) {
			return false;
		}

		// This naive implementation will leave orphaned child trees. A better
		// implementation should traverse and remove orphans.
		this.set( key, undefined );

		return true;
	}

	/**
	 * Removes all elements.
	 */
	clear() {
		this._flatMap = new Map;
		this._arrayTreeMap = new Map;
		this._objectTreeMap = new Map;
	}
}

export default EquivalentKeyMap;
