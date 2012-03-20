
/**
 * Buffer utility functions
 * @type {Object}
 */
module.exports = {
  
  /**
   * [indexOf description]
   * 
   * @param  {[type]} needle   [description]
   * @param  {[type]} haystack [description]
   * @return {[type]}          [description]
   */
  indexOf: function( needle, haystack ) {
    
    var i, k;
    var n = needle.length;
    var m = haystack.length;
    
    if( n === 0 ) return n;
    
    var charTable = moore.makeCharTable( needle );
    var offsetTable = moore.makeOffsetTable( needle );
    
    for( i = n - 1; i < m; ) {
      for( k = n - 1; needle[k] === haystack[i]; --i, --k ) {
        if( k === 0 ) return i;
      }
      // i += n - k; // for naive method
      i += Math.max(
        offsetTable[ n - 1 - k ],
        charTable[ haystack[i] ]
      );
    }
    
    return -1;
    
  },
  
  /**
   * [split description]
   * 
   * @param  {[type]} needle   [description]
   * @param  {[type]} haystack [description]
   * @return {[type]}          [description]
   */
  split: function( needle, haystack ) {
    
    var i, k;
    var n = needle.length;
    var m = haystack.length;
    var r = [];
    
    if( n === 0 ) return n;
    
    var charTable = moore.makeCharTable( needle );
    var offsetTable = moore.makeOffsetTable( needle );
    
    for( i = n - 1; i < m; ) {
      for( k = n - 1; needle[k] === haystack[i]; --i, --k ) {
        if( k === 0 ) {
          r.push( i );
          break;
        }
      }
      i += Math.max(
        offsetTable[ n - 1 - k ],
        charTable[ haystack[i] ]
      );
    }
        
    for( i = 0, m = r.length; i < m; i++ ) {
      if( i === 0 ) r[i] = haystack.slice( 0, r[i] );
      else r[i] = haystack.slice( r[i], r[ i + 1 ] );
    }
    
    return r;
    
  }
  
};

/**
 * Boyer-Moore specific functions
 * @type {Object}
 */
var moore = {
  
  /**
   * Makes the jump table based on the
   * mismatched character information.
   * 
   * @param  {Buffer} needle
   * @return {Uint32Array}
   */
  makeCharTable: function( needle ) {
    
    var table = new Uint32Array( this.alphabetSize );
    var n = needle.length;
    var t = table.length;
    var i = 0;
    
    for( ; i < t; ++i ) {
      table[i] = n;
    }
    
    n--;
    
    for( i = 0; i < n; ++i ) {
      table[ needle[i] ] = n - i;
    }
    
    return table;
    
  },
  
  /**
   * Makes the jump table based on the
   * scan offset which mismatch occurs.
   * 
   * @param  {Buffer} needle
   * @return {Uint32Array}
   */
  makeOffsetTable: function( needle ) {
    
    var i, suffix;
    var n = needle.length;
    var m = n - 1;
    var lastPrefix = n;
    var table = new Uint32Array( n );
    
    for( i = m; i >= 0; --i ) {
      if( this.isPrefix( needle, i + 1 ) ) {
        lastPrefix = i + 1;
      }
      table[ m - i ] = lastPrefix - i + m;
    }
    
    for( i = 0; i < n; ++i ) {
      suffix = this.suffixLength( needle, i );
      table[ suffix ] = m - i + suffix;
    }
    
    return table;
    
  },
  
  /**
   * Is `needle[i:end]` a prefix of `needle`?
   * 
   * @param  {Buffer}  needle
   * @param  {Number}  i
   * @return {Boolean}
   */
  isPrefix: function( needle, i ) {
    
    var k = 0;
    var n = needle.length;
    
    for( ; i < n; ++i, ++k ) {
      if( needle[i] !== needle[k] ) {
        return false;
      }
    }
    
    return true;
    
  },
  
  /**
   * Determines the maximum length of the
   * substring that ends at `i` and is a suffix.
   * 
   * @param  {Buffer} needle
   * @param  {Number} i
   * @return {Number}
   */
  suffixLength: function( needle, i ) {
    
    var k = 0;
    var n = needle.length;
    var m = n - 1;
    
    for( ; i >= 0 && needle[i] === needle[m]; --i, --m ) {
      k += 1;
    }
    
    return k;
    
  }
  
};