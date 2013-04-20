/*
 * 
 * clientenv
 * 
 * ---
 * @Copyright(c) 2013, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 0.0.6
 * @updated 2013/04/21
 * @author falsandtru  http://fat.main.jp/  http://sa-kusaku.sakura.ne.jp/
 * @CodingConventions Google JavaScript Style Guide
 * ---
 * Note: 
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.clientenv();
 * $.clientenv().is('os', 'windowsXP:lte');
 * $.clientenv().addClass('browser').addClass('ie8:lte');
 * $(function(){ $.clientenv({'font':'Meiryo, "メイリオ"'}).addClass('font', 'Meiryo, メイリオ', 'meiryo'); });
 * 
 */

( function() {
  
  if ( typeof window[ 'jQuery' ] === 'undefined' ) { return ; } ;
  
  var $ = jQuery = window[ 'jQuery' ] , undefined = void( 0 ) , win = window , doc = document , plugin_data = [ 'settings' ] ;
  
  jQuery.fn.clientenv = clientenv ;
  jQuery.clientenv = clientenv ;
  
  
  function clientenv( options ) {
    
    if ( typeof this === 'function' || this === win ) { return arguments.callee.apply( jQuery( 'html' ) , arguments ) ; } ;
    
    var
      context = this ,
      defaults = {
        id : 0 ,
        gns : 'clientenv' ,
        ns : undefined ,
        userAgent : win.navigator.userAgent ,
        hardware : true ,
        platform : true ,
        os : true ,
        browser : true ,
        font : { family : jQuery( 'body' )[ 0 ] ? jQuery( 'body' ).css( 'font-family' ) : '' , symbol : true , lang : 'en' } ,
        attribute : true ,
        support : true ,
        strict : { ie : false } ,
        not : true ,
        options : options
      } ,
      settings = jQuery.extend( true , {} , defaults , options ) ,
      nsArray = [ settings.gns ].concat( settings.ns || [] ) ;
    
    if ( 1 === plugin_data.length || arguments.length ) {
      settings.id = 1 ;
      
      jQuery.extend
      (
        true ,
        settings , {
          nss : {
            class4html : nsArray.join( '-' )
          } ,
          context : this ,
          response : {
            0 : this[ 0 ] ,
            clientenv : clientenv ,
            addClass : addClass ,
            removeClass : removeClass ,
            is : is ,
            reset : reset ,
            end : function() { return context ; }
          }
        }
      ) ;
      
      register( settings ) ;
    } else {
      plugin_data[ 1 ].context = this ;
      plugin_data[ 1 ].response[ 0 ] = this[ 0 ] ;
    } ;
    
    return 1 < plugin_data.length ? plugin_data[ 1 ].response : undefined ;
    
    
    /* function */
    
    function register( settings ) {
      var
        userAgent = settings.userAgent.toLowerCase() ,
        result = plugin_data[ 1 ] ? plugin_data[ 1 ].response : {} ,
        property ;
      
      OS : {
        if ( plugin_data[ 1 ] && ( !settings.options || !settings.options.os ) ) { break OS ; } ;
        
        result.os = {
          windows8          : /Win(dows )?NT 6\.2/i.test( userAgent ) && 0 > userAgent.indexOf( 'arm' ) ,
          windowsRT         : /Win(dows )?NT 6\.2/i.test( userAgent ) && -1 < userAgent.indexOf( 'arm' ) ,
          windows7          : /Win(dows )?NT 6\.1/i.test( userAgent ) ,
          windowsVista      : /Win(dows )?NT 6\.0/i.test( userAgent ) ,
          windowsServer2003 : /Win(dows )?NT 5\.2/i.test( userAgent ) ,
          windowsXP         : /Win(dows )?(NT 5\.1|XP)/i.test( userAgent ) ,
          windowsME         : /Win(dows )?(9x 4\.90|ME)/i.test( userAgent ) ,
          windows2000       : /Win(dows )?(NT 5\.0|2000)/i.test( userAgent ) ,
          windows98         : /Win(dows )?98/i.test( userAgent ) ,
          windowsNT         : /Win(dows )?NT( [3-4]\.0| [^0-9]+[^.])/i.test( userAgent ) ,
          windows95         : /Win(dows )?95/i.test( userAgent ) ,
          'osx10.8'         : /Mac OS X 10[._]8/i.test( userAgent ) ,
          'osx10.7'         : /Mac OS X 10[._]7/i.test( userAgent ) ,
          'osx10.6'         : /Mac OS X 10[._]6/i.test( userAgent ) ,
          'osx10.5'         : /Mac OS X 10[._]5/i.test( userAgent ) ,
          'osx10.4'         : /Mac OS X 10[._]4/i.test( userAgent ) ,
          'osx10.3'         : /Mac OS X 10[._]3/i.test( userAgent ) ,
          'osx10.2'         : /Mac OS X 10[._]2/i.test( userAgent ) ,
          'osx10.1'         : /Mac OS X 10[._]1/i.test( userAgent ) ,
          'osx10.0'         : /Mac OS X 10[._]0/i.test( userAgent ) ,
          ios               : -1 < userAgent.indexOf( 'iphone os' ) || -1 < userAgent.indexOf( 'like mac OS x' ) ,
          androidos         : -1 < userAgent.indexOf( 'android' ) ,
          otherOS           : false
        } ;
        
        property = result.os ;
        for ( var i in property ) { if ( !property[ i ] || i === 'name' ) { continue ; } ; property.name = i ; } ;
        if ( !result.os.name ) { result.os.name = 'otherOS' ; result.os.otherOS = true ; } ;
      } ;
      
      PLATFORM : {
        if ( plugin_data[ 1 ] && ( !settings.options || !settings.options.platform ) ) { break PLATFORM ; } ;
        
        result.platform = {
          windows      : -1 < userAgent.indexOf( 'windows' ) ,
          mac          : -1 < userAgent.indexOf( 'macintosh' ) ,
          android      : -1 < userAgent.indexOf( 'android' ) ,
          iphone       : -1 < userAgent.indexOf( 'iphone' ) ,
          ipad         : -1 < userAgent.indexOf( 'ipad' ) ,
          ipod         : -1 < userAgent.indexOf( 'ipod' ) ,
          windowsPhone : -1 < userAgent.indexOf( 'windows phone' ) ,
          blackberry   : -1 < userAgent.indexOf( 'blackberry' ) ,
          wii          : -1 < userAgent.indexOf( 'nintendo wii' ) ,
          ds           : -1 < userAgent.indexOf( 'nitro' ) ,
          psp          : -1 < userAgent.indexOf( 'psp' ) ,
          ps2          : -1 < userAgent.indexOf( 'ps2' ) ,
          ps3          : -1 < userAgent.indexOf( 'playstation 3' ) ,
          otherPlatform : false
        } ;
        
        property = result.platform ;
        for ( var i in property ) { if ( !property[ i ] || i === 'name' ) { continue ; } ; property.name = i ; } ;
        if ( !result.platform.name ) { result.platform.name = 'otherPlatform' ; result.platform.otherPlatform = true ; } ;
      } ;
      
      HARDWARE : {
        if ( plugin_data[ 1 ] && ( !settings.options || !settings.options.hardware ) ) { break HARDWARE ; } ;
        
        result.hardware = {
          pc     : result.platform.windows || result.platform.mac ,
          mobile : -1 < userAgent.indexOf( 'mobile' ) ,
          tablet : -1 < userAgent.indexOf( 'tablet' ) ,
          game   : result.platform.wii || result.platform.ds || result.platform.psp || result.platform.ps2 || result.platform.ps3 ,
          otherHardware : false
        } ;
        
        property = result.hardware ;
        for ( var i in property ) { if ( !property[ i ] || i === 'name' ) { continue ; } ; property.name = i ; } ;
        if ( !result.hardware.name ) { result.hardware.name = 'otherHardware' ; result.hardware.otherHardware = true ; } ;
      } ;
      
      BROWSER : {
        if ( plugin_data[ 1 ] && ( !settings.options || !settings.options.browser ) ) { break BROWSER ; } ;
        
        result.browser = {
          version   : ( userAgent.match( /.*(?:rv|webkit|chrome|safari|opera(?:\/.+ version)?|msie)[\/: ]([\d.]+)/ ) || [] )[ 1 ] ,
          chrome    : -1 < userAgent.indexOf( 'chrome' ) ,
          safari    : -1 < userAgent.indexOf( 'safari' ) && 0 > userAgent.indexOf( 'chrome' ) ,
          opera     : -1 < userAgent.indexOf( 'opera' ) && !result.platform.wii && !result.platform.ds ,
          firefox   : -1 < userAgent.indexOf( 'firefox' ) ,
          mozilla   : -1 < userAgent.indexOf( 'mozilla' ) && 0 > userAgent.indexOf( 'compatible' ) && 0 > userAgent.indexOf( 'webkit' ) && 0 > userAgent.indexOf( 'firefox' ) ,
          lunascape : -1 < userAgent.indexOf( 'lunascape' ) ,
          sleipnir  : -1 < userAgent.indexOf( 'sleipnir' ) ,
          ie        : -1 < userAgent.indexOf( 'msie' ) && 0 > userAgent.indexOf( 'opera' ) ,
          otherBrowser : false
        } ;
        
        for ( var i = 5 , element ; i <= 10 ; i++ ) { result.browser[ 'ie' + i ] = Boolean( 0 === result.browser.version.indexOf( i + '.' ) && 0 > userAgent.indexOf( 'opera' ) ) ; } ;
        
        if ( result.browser.ie && settings.strict.ie ) {
          result.browser[ 'ie' ] = Boolean( jQuery( '<!--[if IE ]><wbr><![endif]-->' ).length && jQuery( '<!--[if IE ]><wbr><![endif]-->' )[ 0 ].nodeType === 1 ) ;
          for ( var i = 5 , element ; i <= 9 ; i++ ) {
            element = jQuery( '<!--[if IE ' + i + ']><wbr><![endif]-->' ) ;
            result.browser[ 'ie' + i ] = Boolean( element.length && element[ 0 ].nodeType === 1 ) ;
            element = null ;
          } ;
        } ;
        
        property = result.browser ;
        for ( var i in property ) { if ( !property[ i ] || i === 'name' ) { continue ; } ; property.name = i ; } ;
        if ( !result.browser.name ) { result.browser.name = 'otherBrowser' ; result.browser.otherBrowser = true ; } ;
      } ;
      
      ATTRIBUTE : {
        if ( plugin_data[ 1 ] && ( !settings.options || !settings.options.attribute ) ) { break ATTRIBUTE ; } ;
        
        result.attribute = {
          name : '' ,
          touch : -1 < userAgent.indexOf( 'touch' ) || result.hardware.tablet || result.platform.iphone || result.platform.ipad || result.platform.android
        } ;
      } ;
      
      FONT : {
        if ( plugin_data[ 1 ] && plugin_data[ 1 ].response.font && ( !settings.options || !settings.options.font ) ) { break FONT ; } ;
        
        if ( !settings.font || !jQuery( 'body' ).length ) { break FONT ; } ;
        
        var body , base , element , style , fonts , text , alphanumeric , symbol , lang ;
        
        fonts = [ 'monospace' , 'fantasy' , 'cursive' , 'sans-serif' , 'serif' ]
        
        style = 'font-size: 72px !important; ' +
                'font-style: normal !important; ' +
                'font-weight: normal !important; ' +
                'font-variant: normal !important; ' +
                'letter-spacing: normal !important; ' +
                'line-height: normal !important; ' +
                'display: block !important; ' +
                'visibility: hidden !important; ' +
                'position: absolute !important; ' +
                'top: -9999px !important; ' +
                'left: -9999px !important; ' +
                'width: auto !important; ' +
                'height: auto !important; '
        
        alphanumeric = 'alphanumericmmmmmmmmm1234567890' ;
        
        symbol = settings.font.symbol ? '_!#$&:;@+-*/%=^\\(){}[]<>' : '' ;
        
        lang = {
          en : 'environment' ,
          ja : '環境　かんきょう　カンキョウ'
        } ;
        
        text = alphanumeric + symbol ;
        for ( var i = 0 , keys = settings.font.lang.split( /\s*,\s*/ ) , key ; key = keys[ i ] ; i++ ) {
          if ( key in lang ) { text += lang[ key ] ; } ;
        } ;
        
        base = [] ;
        base[ 0 ] = jQuery( '<pre/>' ).text( text ) ;
        base[ 1 ] = jQuery( '<pre/>' ).text( text ) ;
        
        body = jQuery( 'body' ) ;
        body.append( base[ 0 ] , base[ 1 ] ) ;
        for ( var i = 0 ; i + 1 < fonts.length ; i++ ) {
          base[ 0 ].attr( 'style' , 'font-family: ' + fonts.slice( i + 0 ).join( ', ' ) + ' !important; ' + style ) ;
          base[ 1 ].attr( 'style' , 'font-family: ' + fonts.slice( i + 1 ).join( ', ' ) + ' !important; ' + style ) ;
          if ( base[ 0 ][ 0 ].offsetWidth !== base[ 1 ][ 0 ].offsetWidth || base[ 0 ][ 0 ].offsetHeight !== base[ 1 ][ 0 ].offsetHeight ) {
          } else {
            fonts.splice( i-- , 1 ) ;
          } ;
        } ;
        
        base[ 0 ].attr( 'style' , 'font-family: ' + fonts.join( ', ' ) + ' !important; ' + style ) ;
        base[ 1 ].attr( 'style' , 'font-family: ' + fonts.slice( 1 < fonts.length ? 1 : 0 ).join( ', ' ) + ' !important; ' + style ) ;
        
        style = fonts.join( ', ' ) + ' !important; ' + style ;
        fonts = settings.font.family.split( /\s*,\s*/ )
        result.font = { support : '' , support4style : '' , notsupport : '' , notsupport4style : '' } ;
        
        element = jQuery( '<pre/>' ).text( text ) ;
        body.append( element ) ;
        for ( var i = 0 , font , font4style ; font4style = fonts[ i ] ; i++ ) {
          font = font4style.replace( /"|'/g , '' )
          for ( var j = 0 , len = base.length , source , format ; source = base[ j ] ; j++ ) {
            element.attr( 'style' , 'font-family: ' + font4style + ', ' + style.slice( !j ? 0 : style.indexOf( ', ' ) + 2 ) ) ;
            if ( source[ 0 ].offsetWidth !== element[ 0 ].offsetWidth || source[ 0 ].offsetHeight !== element[ 0 ].offsetHeight ) {
              result.font[ font ] = true ;
              result.font.support += ',' + font ;
              result.font.support4style += ',' + font4style ;
              break ;
            } else if ( j === len - 1 ) {
              result.font[ font ] = false ;
              result.font.notsupport += ',' + font ;
              result.font.notsupport4style += ',' + font4style ;
            } ;
          } ;
        } ;
        
        base[ 0 ].remove() ;
        base[ 0 ] = null ;
        base[ 1 ].remove() ;
        base[ 1 ] = null ;
        element.remove() ;
        element = null ;
        
        result.font.support = result.font.support.slice( 1 ) ;
        result.font.notsupport = result.font.notsupport.slice( 1 ) ;
        result.font.support4style = result.font.support4style.slice( 1 ) ;
        result.font.notsupport4style = result.font.notsupport4style.slice( 1 ) ;
        result.font.name = result.font.support.split( /\s*,\s*/ , 2 )[ 0 ] ;
      } ;
      
      SUPPORT : {
        if ( !settings.support ) { break SUPPORT ; } ;
        
        result.support = jQuery.support ;
      } ;
      
      jQuery.extend( true , settings.response , result ) ;
      plugin_data[ 1 ] = settings ;
    }
    
    function addClass( property , query , key ) {
      var settings = plugin_data[ 1 ] , fproperty , fquery , classname ;
      
      if ( !settings.response[ 0 ] || !property ) { return this ; } ;
      
      for ( var i = 0 , properties = property.split( /\s+/ ) ; property = properties[ i ] ; i++ ) {
        result = format( property , query ) ;
        fproperty = result[ 0 ] ;
        fquery = result[ 1 ] ;
        
        classname = key || fquery || reference( fproperty , fquery ) ;
        
        if ( is( fproperty , fquery , true ) ) {
          !settings.not && !classname.indexOf( 'not-' ) ? null : jQuery( plugin_data[ 1 ].response[ 0 ] ).addClass( classname ) ;
        } else {
          if ( fquery === undefined ) { return this ; } ;
          !settings.not ? null : jQuery( plugin_data[ 1 ].response[ 0 ] ).addClass( ( classname.indexOf( 'not-' ) ? 'not-' : '' ) + classname ) ;
        } ;
      } ;
      
      return this ;
    }
    
    function removeClass( property , query , key ) {
      var settings = plugin_data[ 1 ] , fproperty , fquery , classname ;
      
      if ( !settings.response[ 0 ] || !property ) { return this ; } ;
      
      for ( var i = 0 , properties = property.split( /\s+/ ) ; property = properties[ i ] ; i++ ) {
        result = format( property , query ) ;
        fproperty = result[ 0 ] ;
        fquery = result[ 1 ] ;
        
        classname = key || fquery || reference( fproperty , fquery ) ;
        
        if ( is( fproperty , fquery , true ) ) {
          !settings.not && !classname.indexOf( 'not-' ) ? null : jQuery( plugin_data[ 1 ].response[ 0 ] ).removeClass( classname ) ;
        } else {
          if ( fquery === undefined ) { return this ; } ;
          !settings.not ? null : jQuery( plugin_data[ 1 ].response[ 0 ] ).removeClass( ( classname.indexOf( 'not-' ) ? 'not-' : '' ) + classname ) ;
        } ;
      } ;
      
      return this ;
    }
    
    function is( property , query , boolean ) {
      var settings = plugin_data[ 1 ] , properties , queries , result = 0 ;
      
      properties = property.replace( /"|'/g , '' ).split( /\s*,\s*/ ) ;
      queries = query === undefined || query === 'name' ? [ 'name' ] : query.replace( /"|'/g , '' ).split( /\s*,\s*/ ) ;
      for ( var i = 0 , property ; property = properties[ i ] ; i++ ) {
        for ( var j = 0 , query ; query = queries[ j ] ; j++ ) {
          query = format( property , query ) ;
          property = query[ 0 ] ;
          query = query[ 1 ] ;
          
          result += reference( property , query ) ? 1 : 0 ;
        } ;
      } ;
      result = query !== undefined && 0 === query.indexOf( 'not-' ) ? !result : result ;
      if ( !result && !boolean ) { delete plugin_data[ 1 ].response[ 0 ] ; } ;
      return boolean ? Boolean( result ) : plugin_data[ 1 ].response ;
    }
    
    function format( property , query ) {
      if ( property in settings.response && query ) {
        query = query ? query.replace( /(\S+):(\S+)/ , '$2-$1' ) : query ;
        query = query ? query.replace( /(\w+)-(not-)/ , '$2-$1' ) : query ;
      } else if ( property in settings.response ) {
      } else {
        property = property ? property.replace( /(\S+):(\S+)/ , '$2-$1' ) : property ;
        property = property ? property.replace( /(\w+)-(not-)/ , '$2-$1' ) : property ;
        query = [ property.split( /(?:not|lte|lt|gte|gt)-/ ).pop() ][ 0 ] ;
        for ( var i in settings.response ) {
          if ( query in settings.response[ i ] ) {
            query = property ;
            property = i ;
          } ;
        } ;
      } ;
      return [ property , query ] ;
    }
    
    function reference( property , query ) {
      var settings = plugin_data[ 1 ] , queries , list , position = [ undefined , undefined ] , result ;
      
      queries = query === undefined ? [ query ] : query.replace( /(not|)-?(lte|lt|gte|gt|)-?(\S+)/ , '$3,$2,$1' ).split( ',' ) ;
      queries[ 2 ] = queries[ 2 ] === 'not' ? false : true ;
      
      switch ( true ) {
        case !query || 0 > query.indexOf( '-' ) :
          query = query ? query : 'name' ;
          if ( settings.response[ property ] && query in settings.response[ property ] ) {
            result = settings.response[ property ][ query ] ;
          } else {
            result = undefined
          } ;
          return queries[ 2 ] ? result : !result ;
          break ;
          
        case property === 'os' && !queries[ 0 ].indexOf( 'windows' ) :
          list = [
              'windows8' ,
              'windowsRT' ,
              'windows7' ,
              'windowsVista' ,
              'windowsServer2003' ,
              'windowsXP' ,
              'windowsME' ,
              'windows2000' ,
              'windows98' ,
              'windowsNT' ,
              'windows95'
          ] ;
          break ;
          
        case property === 'os' && !queries[ 0 ].indexOf( 'osx' ) :
          list = [
              'osx10.8' ,
              'osx10.7' ,
              'osx10.6' ,
              'osx10.5' ,
              'osx10.4' ,
              'osx10.3' ,
              'osx10.2' ,
              'osx10.1' ,
              'osx10.0'
          ] ;
          break ;
          
        case property === 'browser' && !queries[ 0 ].indexOf( 'ie' ) :
          list = [
              'ie10' ,
              'ie9' ,
              'ie8' ,
              'ie7' ,
              'ie6' ,
              'ie5'
          ] ;
          break ;
          
        default :
          return undefined ;
      } ;
      
      for ( var i = 0 , value ; value = list[ i ] ; i++ ) {
        if ( settings.response[ property ][ 'name' ] === value ) { position[ 0 ] = i ; } ;
        if ( queries[ 0 ] === value ) { position[ 1 ] = i ; } ;
      } ;
      
      if ( undefined in position ) { return undefined ; } ;
      
      switch ( queries[ 1 ] ) {
        case 'gt' :
          result = position[ 0 ] < position[ 1 ] ;
          break ;
          
        case 'gte' :
          result = position[ 0 ] <= position[ 1 ] ;
          break ;
          
        case 'lt' :
          result = position[ 0 ] > position[ 1 ] ;
          break ;
          
        case 'lte' :
          result = position[ 0 ] >= position[ 1 ] ;
          break ;
          
        default :
          return undefined ;
      } ;
      return queries[ 2 ] ? result : !result ;
    }
    
    function reset( options ) {
      1 < plugin_data.length && plugin_data.splice( 1 , 1 ) ;
      clientenv( options ) ;
      return 1 < plugin_data.length ? plugin_data[ 1 ].response : undefined ;
    }
  }
} )() ;
