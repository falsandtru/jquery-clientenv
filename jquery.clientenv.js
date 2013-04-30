/*
 * 
 * clientenv
 * 
 * ---
 * @Copyright(c) 2013, falsandtru
 * @license MIT  http://opensource.org/licenses/mit-license.php  http://sourceforge.jp/projects/opensource/wiki/licenses%2FMIT_license
 * @version 0.1.2
 * @updated 2013/04/30
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

( function () {
  
  if ( typeof window.jQuery === 'undefined' ) { return ; } ;
  
  var $ = jQuery = window.jQuery , undefined = void( 0 ) , win = window , doc = document , plugin_data = [ 'settings' ] ;
  
  jQuery.fn.clientenv = clientenv ;
  jQuery.clientenv = clientenv ;
  
  
  function clientenv( options ) {
    
    if ( typeof this === 'function' || this === win ) { return arguments.callee.apply( jQuery( 'html' ) , arguments ) ; } ;
    
    /* validate */ var validate = typeof window.validator === 'object' ? window.validator : false ;
    /* validate */ var validate = validate ? validate.clone( { name : 'jquery.clientenv.js' , base : true } ) : validate ;
    /* validate */ validate && validate.start() ;
    /* validate */ validate && validate.test( 1, 1, 0, 'plugin load' ) ;
    
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
            class4html : nsArray.join( '-' ) ,
            array : nsArray
          } ,
          context : this ,
          response : {} ,
          validate : validate
        }
      ) ;
      
      jQuery.extend
      (
        true ,
        settings.response , 
        plugin_data[ 1 ] ? plugin_data[ 1 ].response : {} ,{
          0 : this[ 0 ] ,
          not : settings.not ,
          userAgent : settings.userAgent ,
          clientenv : clientenv ,
          addClass : addClass ,
          removeClass : removeClass ,
          filter : filter ,
          is : is ,
          data : data ,
          reset : reset ,
          end : function () { return context ; }
        }
      ) ;
      
      register( settings ) ;
      plugin_data[ 1 ] = settings ;
    } else {
      plugin_data[ 1 ].context = this ;
      plugin_data[ 1 ].response[ 0 ] = this[ 0 ] ;
    } ;
    
    /* validate */ validate && validate.end() ;
    
    return 1 < plugin_data.length ? plugin_data[ 1 ].response : undefined ;
    
    
    /* function */
    
    function register( settings ) {
      
      /* validate */ validate && validate.test( 2, 1, 0, 'plugin register' ) ;
      /* validate */ validate && validate.test( '2.1', 1, 0, 'variable' ) ;
      
      var
        userAgent = settings.userAgent.toLowerCase() ,
        response = {} ,
        property ;
      
      /* validate */ validate && validate.test( '2.2', 1, 0, 'os' ) ;
      OS : {
        if ( plugin_data[ 1 ] && plugin_data[ 1 ].response.os && ( !settings.options || !settings.options.os ) ) { break OS ; } ;
        
        response.os = {
          name              : '' ,
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
        
        property = response.os ;
        for ( var i in property ) { if ( !property[ i ] || i === 'name' ) { continue ; } ; property.name = i ; } ;
        if ( !response.os.name ) { response.os.name = 'otherOS' ; response.os.otherOS = true ; } ;
      } ;
      
      /* validate */ validate && validate.test( '2.3', 1, 0, 'platform' ) ;
      PLATFORM : {
        if ( plugin_data[ 1 ] && plugin_data[ 1 ].response.platform && ( !settings.options || !settings.options.platform ) ) { break PLATFORM ; } ;
        
        response.platform = {
          name         : '' ,
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
        
        property = response.platform ;
        for ( var i in property ) { if ( !property[ i ] || i === 'name' ) { continue ; } ; property.name = i ; } ;
        if ( !response.platform.name ) { response.platform.name = 'otherPlatform' ; response.platform.otherPlatform = true ; } ;
      } ;
      
      /* validate */ validate && validate.test( '2.4', 1, 0, 'hardware' ) ;
      HARDWARE : {
        if ( plugin_data[ 1 ] && plugin_data[ 1 ].response.hardware && ( !settings.options || !settings.options.hardware ) ) { break HARDWARE ; } ;
        
        response.hardware = {
          name   : '' ,
          pc     : response.platform.windows || response.platform.mac ,
          mobile : -1 < userAgent.indexOf( 'mobile' ) ,
          tablet : -1 < userAgent.indexOf( 'tablet' ) ,
          game   : response.platform.wii || response.platform.ds || response.platform.psp || response.platform.ps2 || response.platform.ps3 ,
          otherHardware : false
        } ;
        
        property = response.hardware ;
        for ( var i in property ) { if ( !property[ i ] || i === 'name' ) { continue ; } ; property.name = i ; } ;
        if ( !response.hardware.name ) { response.hardware.name = 'otherHardware' ; response.hardware.otherHardware = true ; } ;
      } ;
      
      /* validate */ validate && validate.test( '2.5', 1, 0, 'browser' ) ;
      BROWSER : {
        if ( plugin_data[ 1 ] && plugin_data[ 1 ].response.browser && ( !settings.options || !settings.options.browser ) ) { break BROWSER ; } ;
        
        response.browser = {
          name      : '' ,
          version   : ( userAgent.match( /(?:chrome|firefox|safari|msie|opera(?:\/.+ version)?|version)[\/:\s]([\d.]+)/ ) || [] )[ 1 ] ,
          chrome    : -1 < userAgent.indexOf( 'chrome' ) ,
          safari    : -1 < userAgent.indexOf( 'safari' ) && 0 > userAgent.indexOf( 'chrome' ) ,
          opera     : -1 < userAgent.indexOf( 'opera' ) && !response.platform.wii && !response.platform.ds ,
          firefox   : -1 < userAgent.indexOf( 'firefox' ) ,
          mozilla   : -1 < userAgent.indexOf( 'mozilla' ) && 0 > userAgent.indexOf( 'compatible' ) && 0 > userAgent.indexOf( 'webkit' ) && 0 > userAgent.indexOf( 'firefox' ) ,
          lunascape : -1 < userAgent.indexOf( 'lunascape' ) ,
          sleipnir  : -1 < userAgent.indexOf( 'sleipnir' ) ,
          ie        : -1 < userAgent.indexOf( 'msie' ) && 0 > userAgent.indexOf( 'opera' ) ,
          otherBrowser : false
        } ;
        
        for ( var i = 5 , element ; i <= 10 ; i++ ) {
          response.browser[ 'ie' + i ] = Boolean( response.browser.ie && 0 === response.browser.version.indexOf( i ) && 0 > userAgent.indexOf( 'opera' ) ) ;
        } ;
        
        if ( response.browser.ie && settings.strict.ie ) {
          response.browser[ 'ie' ] = Boolean( jQuery( '<!--[if IE ]><wbr><![endif]-->' ).length && jQuery( '<!--[if IE ]><wbr><![endif]-->' )[ 0 ].nodeType === 1 ) ;
          for ( var i = 5 , element ; i <= 9 ; i++ ) {
            element = jQuery( '<!--[if IE ' + i + ']><wbr><![endif]-->' ) ;
            response.browser[ 'ie' + i ] = Boolean( element.length && element[ 0 ].nodeType === 1 ) ;
            element = null ;
          } ;
        } ;
        
        property = response.browser ;
        for ( var i in property ) { if ( !property[ i ] || i === 'name' ) { continue ; } ; property.name = i ; } ;
        if ( !response.browser.name ) { response.browser.name = 'otherBrowser' ; response.browser.otherBrowser = true ; } ;
      } ;
      
      /* validate */ validate && validate.test( '2.6', 1, 0, 'attribute' ) ;
      ATTRIBUTE : {
        if ( plugin_data[ 1 ] && plugin_data[ 1 ].response.attribute && ( !settings.options || !settings.options.attribute ) ) { break ATTRIBUTE ; } ;
        
        response.attribute = {
          name : '' ,
          touch : -1 < userAgent.indexOf( 'touch' ) ||
                       response.hardware.tablet ||
                       response.platform.iphone ||
                       response.platform.ipad ||
                       ( response.platform.android && response.hardware.mobile ) ,
          bot : /Bot\W|Robot|Crawler|Spider/i.test( userAgent )
        } ;
      } ;
      
      /* validate */ validate && validate.test( '2.7', 1, 0, 'font' ) ;
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
        response.font = { support : '' , support4style : '' , notsupport : '' , notsupport4style : '' } ;
        
        element = jQuery( '<pre/>' ).text( text ) ;
        body.append( element ) ;
        for ( var i = 0 , font , font4style ; font4style = fonts[ i ] ; i++ ) {
          font = font4style.replace( /"|'/g , '' )
          for ( var j = 0 , len = base.length , source , format ; source = base[ j ] ; j++ ) {
            element.attr( 'style' , 'font-family: ' + font4style + ', ' + style.slice( !j ? 0 : style.indexOf( ', ' ) + 2 ) ) ;
            if ( source[ 0 ].offsetWidth !== element[ 0 ].offsetWidth || source[ 0 ].offsetHeight !== element[ 0 ].offsetHeight ) {
              response.font[ font ] = true ;
              response.font.support += ',' + font ;
              response.font.support4style += ',' + font4style ;
              break ;
            } else if ( j === len - 1 ) {
              response.font[ font ] = false ;
              response.font.notsupport += ',' + font ;
              response.font.notsupport4style += ',' + font4style ;
            } ;
          } ;
        } ;
        
        base[ 0 ].remove() ;
        base[ 0 ] = null ;
        base[ 1 ].remove() ;
        base[ 1 ] = null ;
        element.remove() ;
        element = null ;
        
        response.font.support = response.font.support.slice( 1 ) ;
        response.font.notsupport = response.font.notsupport.slice( 1 ) ;
        response.font.support4style = response.font.support4style.slice( 1 ) ;
        response.font.notsupport4style = response.font.notsupport4style.slice( 1 ) ;
        response.font.name = response.font.support.split( /\s*,\s*/ , 2 )[ 0 ] ;
      } ;
      
      /* validate */ validate && validate.test( '2.8', 1, 0, 'support' ) ;
      SUPPORT : {
        if ( !response.support ) { break SUPPORT ; } ;
        
        response.support = jQuery.support ;
      } ;
      jQuery.extend( true , settings.response , response ) ;
    }
    
    function addClass( property , query , key ) {
      /* validate */ var validate = plugin_data[ 1 ].validate ? plugin_data[ 1 ].validate.clone( { name : 'jquery.clientenv.js' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && validate.test( 1, 1, arguments, 'addClass()' ) ;
      var fproperty , fquery , classname ;
      
      if ( !this[ 0 ] || !property ) {
        /* validate */ validate && validate.end() ;
        return this ;
      } ;
      
      /* validate */ validate && validate.test( 2, 1, 0, 'for' ) ;
      /* validate */ validate && validate.test( '*', 1, 0, 'for in' ) ;
      for ( var i = 0 , properties = property.split( /\s+/ ) ; property = properties[ i ] ; i++ ) {
        /* validate */ validate && validate.test( '*', 1, property, 'for start' ) ;
        
        result = format.apply( this , [ property , query ] ) ;
        /* validate */ validate && validate.test( '++', 1, result, 'fomat' ) ;
        fproperty = result[ 0 ] ;
        fquery = result[ 1 ] ;
        
        classname = key || fquery || reference.apply( this , [ fproperty , fquery ] ) ;
        
        /* validate */ validate && validate.test( '++', 1, [ fproperty, fquery ], 'is( fproperty, fquery )' ) ;
        if ( this.is( fproperty , fquery ) ) {
          /* validate */ validate && validate.test( '++', 1, classname, 'true' ) ;
          !this.not && !classname.indexOf( 'not-' ) ? null : jQuery( this[ 0 ] ).addClass( classname ) ;
        } else {
          /* validate */ validate && validate.test( '++', 1, classname, 'false' ) ;
          if ( fquery === undefined ) {
            
            /* validate */ validate && validate.test( '/', 1, 0, 'for end' ) ;
            continue ;
          } ;
          !this.not ? null : jQuery( this[ 0 ] ).addClass( ( classname.indexOf( 'not-' ) ? 'not-' : '' ) + classname ) ;
        } ;
        
        /* validate */ validate && validate.test( '/', 1, 0, 'for end' ) ;
      } ;
      /* validate */ validate && validate.test( '/', 1, 0, 'for out' ) ;
      
      /* validate */ validate && validate.end() ;
      return this ;
    }
    
    function removeClass( property , query , key ) {
      /* validate */ var validate = plugin_data[ 1 ].validate ? plugin_data[ 1 ].validate.clone( { name : 'jquery.clientenv.js' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && validate.test( 1, 1, arguments, 'removeClass()' ) ;
      var fproperty , fquery , classname ;
      
      if ( !this[ 0 ] || !property ) {
        /* validate */ validate && validate.end() ;
        return this ;
      } ;
      
      /* validate */ validate && validate.test( 2, 1, 0, 'for' ) ;
      /* validate */ validate && validate.test( '*', 1, 0, 'for in' ) ;
      for ( var i = 0 , properties = property.split( /\s+/ ) ; property = properties[ i ] ; i++ ) {
        /* validate */ validate && validate.test( '*', 1, property, 'for start' ) ;
        
        result = format.apply( this , [ property , query ] ) ;
        /* validate */ validate && validate.test( '++', 1, result, 'fomat' ) ;
        fproperty = result[ 0 ] ;
        fquery = result[ 1 ] ;
        
        classname = key || fquery || reference.apply( this , [ fproperty , fquery ] ) ;
        
        /* validate */ validate && validate.test( '++', 1, [ fproperty, fquery ], 'is( fproperty, fquery )' ) ;
        if ( this.is( fproperty , fquery ) ) {
          /* validate */ validate && validate.test( '++', 1, classname, 'true' ) ;
          !this.not && !classname.indexOf( 'not-' ) ? null : jQuery( this[ 0 ] ).removeClass( classname ) ;
        } else {
          /* validate */ validate && validate.test( '++', 1, classname, 'false' ) ;
          if ( fquery === undefined ) {
            
            /* validate */ validate && validate.test( '/', 1, 0, 'for end' ) ;
            continue ;
          } ;
          !this.not ? null : jQuery( this[ 0 ] ).removeClass( ( classname.indexOf( 'not-' ) ? 'not-' : '' ) + classname ) ;
        } ;
        
        /* validate */ validate && validate.test( '/', 1, 0, 'for end' ) ;
      } ;
      /* validate */ validate && validate.test( '/', 1, 0, 'for out' ) ;
      
      /* validate */ validate && validate.end() ;
      return this ;
    }
    
    function filter( property , query ) {
      /* validate */ var validate = plugin_data[ 1 ].validate ? plugin_data[ 1 ].validate.clone( { name : 'jquery.clientenv.js' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && validate.test( 1, 1, arguments, 'filter()' ) ;
      if ( !this.is( property , query ) ) { delete this[ 0 ] ; } ;
      /* validate */ validate && validate.end() ;
      return this ;
    }
    
    function is( property , query ) {
      /* validate */ var validate = plugin_data[ 1 ].validate ? plugin_data[ 1 ].validate.clone( { name : 'jquery.clientenv.js' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && validate.test( 1, 1, arguments, 'filter()' ) ;
      var properties , queries , result = 0 ;
      
      properties = property.replace( /"|'/g , '' ).split( /\s*,\s*/ ) ;
      queries = query === undefined || query === 'name' ? [ 'name' ] : query.replace( /"|'/g , '' ).split( /\s*,\s*/ ) ;
      /* validate */ validate && validate.test( '*', 1, 0 , 'for in' ) ;
      for ( var i = 0 , property ; property = properties[ i ] ; i++ ) {
        if ( !this[ 0 ] ) { break ; } ;
        for ( var j = 0 , query ; query = queries[ j ] ; j++ ) {
          /* validate */ validate && validate.test( '*', 1, [ property , query ] , 'for start' ) ;
          query = format.apply( this , [ property , query ] ) ;
          /* validate */ validate && validate.test( '++', 1, query , 'format' ) ;
          property = query[ 0 ] ;
          query = query[ 1 ] ;
          
          /* validate */ validate && validate.test( '++', 1, result , 'reference' ) ;
          result += reference.apply( this , [ property , query ] ) ? 1 : 0 ;
          /* validate */ validate && validate.test( '/', 1, result , 'for end' ) ;
        } ;
      } ;
      /* validate */ validate && validate.test( '/', 1, 0 , 'for out' ) ;
      result = query !== undefined && 0 === query.indexOf( 'not-' ) ? !result : result ;
      /* validate */ validate && validate.end() ;
      return Boolean( result ) ;
    }
    
    function format( property , query ) {
      /* validate */ var validate = plugin_data[ 1 ].validate ? plugin_data[ 1 ].validate.clone( { name : 'jquery.clientenv.js' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && validate.test( 1, 1, arguments, 'format()' ) ;
      if ( property in this && query ) {
        query = query ? query.replace( /(\S+):(\S+)/ , '$2-$1' ) : query ;
        query = query ? query.replace( /(\w+)-(not-)/ , '$2-$1' ) : query ;
      } else if ( property in this ) {
      } else {
        property = property ? property.replace( /(\S+):(\S+)/ , '$2-$1' ) : property ;
        property = property ? property.replace( /(\w+)-(not-)/ , '$2-$1' ) : property ;
        query = [ property.split( /(?:not|lte|lt|gte|gt)-/ ).pop() ][ 0 ] ;
        for ( var i in this ) {
          if ( typeof this[ i ] !== 'object' ) { continue ; } ;
          if ( query in this[ i ] ) {
            query = property ;
            property = i ;
          } ;
        } ;
      } ;
      /* validate */ validate && validate.end() ;
      return [ property , query ] ;
    }
    
    function reference( property , query ) {
      var queries , list , position = [ undefined , undefined ] , result ;
      
      queries = query === undefined ? [ query ] : query.replace( /(not|)-?(lte|lt|gte|gt|)-?(\S+)/ , '$3,$2,$1' ).split( ',' ) ;
      queries[ 2 ] = queries[ 2 ] === 'not' ? false : true ;
      
      switch ( true ) {
        case !query || 0 > query.indexOf( '-' ) :
          query = query ? query : 'name' ;
          if ( this[ property ] && query in this[ property ] ) {
            result = this[ property ][ query ] ;
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
        if ( this[ property ][ 'name' ] === value ) { position[ 0 ] = i ; } ;
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
    
    function data() {
      /* validate */ var validate = plugin_data[ 1 ].validate ? plugin_data[ 1 ].validate.clone( { name : 'jquery.clientenv.js' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && validate.test( 1, 1, arguments, 'data()' ) ;
      var response = { userAgent : this.userAgent } ;
      
      for ( var i in this ) {
        if ( i in this ) { typeof this[ i ] === 'object' && !isFinite( this[ i ].nodeType ) && ( response[ i ] = this[ i ] ) ; } ;
      } ;
      /* validate */ validate && validate.test( 2, 1, response, 'response' ) ;
      /* validate */ validate && validate.end() ;
      return response ;
    }
    
    function reset( options ) {
      /* validate */ var validate = plugin_data[ 1 ].validate ? plugin_data[ 1 ].validate.clone( { name : 'jquery.clientenv.js' } ) : false ;
      /* validate */ validate && validate.start() ;
      /* validate */ validate && validate.test( 1, 1, arguments, 'reset()' ) ;
      1 < plugin_data.length && plugin_data.splice( 1 , 1 ) ;
      clientenv( options ) ;
      /* validate */ validate && validate.end() ;
      return 1 < plugin_data.length ? this : undefined ;
    }
  }
} )() ;
