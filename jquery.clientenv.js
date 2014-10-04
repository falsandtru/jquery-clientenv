/*
 * 
 * clientenv
 * 
 * ---
 * @Copyright(c) 2013, falsandtru
 * @license MIT http://opensource.org/licenses/mit-license.php
 * @version 0.2.1
 * @author falsandtru https://github.com/falsandtru/
 * @CodingConventions Google JavaScript Style Guide
 * ---
 * Note: 
 * 
 * ---
 * Example:
 * @jquery 1.7.2
 * 
 * $.clientenv();
 * $.clientenv.is('os', 'windowsXP:lte');
 * $.clientenv.addClass('browser').addClass('ie8:lte');
 * $(function(){$.clientenv({'font':'Meiryo, "メイリオ"'}).addClass('font', 'Meiryo, メイリオ', 'meiryo');});
 * 
 */

(function(jQuery, window, document, undefined) {
  
  var Store;
  
  function registrate(jQuery, window, document, undefined, Store) {
    jQuery.fn[Store.name] = jQuery[Store.name] = function() {
      
      return initialize.apply(this, [
        jQuery, window, document, undefined, Store
      ].concat([].slice.call(arguments)));
    };
    Store.setProperties.call(jQuery[Store.name]);
  }
  
  function initialize(jQuery, window, document, undefined, Store, option) {
    
    var $context = this;
    
    // polymorphism
    switch (true) {
      default:
        $context = $context instanceof jQuery ? $context : jQuery[Store.name];
        $context = Store.setProperties.call($context, null, null);
    }
    
    // setting
    var setting;
    setting = jQuery.extend(true,
      {
        id: 0,
        gns: Store.name,
        ns: undefined,
        userAgent: window.navigator.userAgent,
        hardware: true,
        platform: true,
        os: true,
        browser: true,
        font: {family: jQuery('body')[0] ? jQuery('body').css('font-family') : '', symbol: true, lang: 'en'},
        attribute: true,
        support: true,
        strict: {ie: false},
        not: true
      },
      option
    );
    
    setting.nss = {
      array: [Store.name].concat(setting.ns && String(setting.ns).split('.') || [])
    };
    jQuery.extend
    (
      true,
      setting = setting.scope && Store.scope(setting) || setting,
      {
        nss: {
          name: setting.ns || '',
          alias: Store.alias ? [Store.alias].concat(setting.nss.array.slice(1)).join('.') : false,
          event: setting.nss.array.join('.'),
          data: setting.nss.array.join('-'),
          class4html: setting.nss.array.join('-')
        },
        option: option
      }
    );
    
    // registrate
    Store.registrate.call($context, jQuery, window, document, undefined, Store, setting);
    
    return $context; // function: pjax
  }
  
  Store = {
    name: 'clientenv',
    alias: '',
    ids: [],
    settings: [0],
    count: 0,
    parseHTML: null,
    setAlias:  function(name) {
      Store.alias = typeof name === 'string' ? name : Store.alias;
      if (Store.name !== Store.alias && !jQuery[Store.alias]) {
        jQuery[Store.name][Store.alias] = jQuery.fn[Store.name];
        jQuery.fn[Store.alias] = jQuery[Store.alias] = jQuery.fn[Store.name];
      }
    },
    setProperties: function(namespace, element) {
      
      var $context = this;
      
      if ($context instanceof jQuery || $context === jQuery[Store.name]) {
        
        $context = $context instanceof jQuery && element !== undefined ? $context.add(element) : $context;
        
        $context[Store.name] = jQuery[Store.name];
        
        $context.addClass = function(property, query, key) {
          var $context, setting, fproperty, fquery, classname, result;
          $context = this[0] ? this : jQuery('html');
          setting = Store.settings[1];
          
          if (!property) {
            return this;
          };
          
          for (var i = 0, properties = property.split(/\s+/); property = properties[i]; i++) {
            
            result = Store.format.apply(this, [property, query]);
            fproperty = result[0];
            fquery = result[1];
            
            classname = key || fquery || Store.reference.apply(this, [fproperty, fquery]);
            
            if (this.is(fproperty, fquery)) {
              !setting.not && !classname.indexOf('not-') || jQuery($context).addClass(classname);
            } else {
              if (fquery === undefined) {
                continue;
              };
              !setting.not || jQuery($context).addClass((classname.indexOf('not-') ? 'not-' : '') + classname);
            };
          };
          
          return this;
        };
        
        $context.removeClass = function(property, query, key) {
          var $context, setting, fproperty, fquery, classname, result;
          $context = this[0] ? this : jQuery('html');
          setting = Store.settings[1];
          
          if (!property) {
            return this;
          };
          
          for (var i = 0, properties = property.split(/\s+/); property = properties[i]; i++) {
            
            result = Store.format.apply(this, [property, query]);
            fproperty = result[0];
            fquery = result[1];
            
            classname = key || fquery || Store.reference.apply(this, [fproperty, fquery]);
            
            if (this.is(fproperty, fquery)) {
              !setting.not && !classname.indexOf('not-') || jQuery($context).removeClass(classname);
            } else {
              if (fquery === undefined) {
                
                continue;
              };
              !setting.not || jQuery($context).removeClass((classname.indexOf('not-') ? 'not-' : '') + classname);
            };
            
          };
          
          return this;
        };
        
        $context.filter = function(property, query) {
          return this.not(this.is(property, query) ? '' : '*');
        };
        
        $context.is = function(property, query) {
          var properties, queries, result = 0;
          
          properties = property.replace(/"|'/g, '').split(/\s*,\s*/);
          queries = query === undefined || query === 'name' ? ['name'] : query.replace(/"|'/g, '').split(/\s*,\s*/);
          for (var i = 0, property; property = properties[i]; i++) {
            for (var j = 0, query; query = queries[j]; j++) {
              query = Store.format.apply(this, [property, query]);
              property = query[0];
              query = query[1];
              
              result += Store.reference.apply(this, [property, query]) ? 1 : 0;
            };
          };
          result = query !== undefined && 0 === query.indexOf('not-') ? !result : result;
          return Boolean(result);
        };
        
        $context.data = function() {
          var response = jQuery.extend(true, {userAgent: this.userAgent}, this);
          delete response[0];
          
          return response;
        };
        
        $context.reset = function(option) {
          1 < Store.settings.length && Store.settings.splice(1, 1);
          jQuery[Store.name](option);
          return 1 < Store.settings.length ? this : undefined;
        };
        
      }
      return $context;
    },
    registrate: function(jQuery, window, document, undefined, Store, setting) {
      
      var context = this;
      
      setting.id = 1;
      Store.ids.push(setting.id);
      Store.settings[setting.id] = setting;
      
      var
        userAgent = setting.userAgent.toLowerCase(),
        response = {os: {}, platform: {}, hardware: {}, browser: {}, attribute: {}, font: {}},
        property;
      
      for (var i in response) {
        response[i] = jQuery[Store.name][i];
      }
      

      OS: {
        if (response.os && (!setting.option || !setting.option.os && !setting.option.userAgent)) {
          break OS;
        };
        
        response.os = {
          name              : '',
          windows8          : /Win(dows)? NT 6\.2/i.test(userAgent) && !~userAgent.indexOf('arm'),
          windowsRT         : /Win(dows)? NT 6\.2/i.test(userAgent) && ~userAgent.indexOf('arm'),
          windows7          : /Win(dows)? NT 6\.1/i.test(userAgent),
          windowsVista      : /Win(dows)? NT 6\.0/i.test(userAgent),
          windowsServer2003 : /Win(dows)? NT 5\.2/i.test(userAgent),
          windowsXP         : /Win(dows)? (NT 5\.1|XP)/i.test(userAgent),
          windowsME         : /Win(dows)? (9x 4\.90|ME)/i.test(userAgent),
          windows2000       : /Win(dows)? (NT 5\.0|2000)/i.test(userAgent),
          windows98         : /Win(dows)? 98/i.test(userAgent),
          windowsNT         : /Win(dows)? NT([3-4]\.0| [^0-9]+[^.])/i.test(userAgent),
          windows95         : /Win(dows)? 95/i.test(userAgent),
          'osx10.8'         : /Mac OS X 10[._]8/i.test(userAgent),
          'osx10.7'         : /Mac OS X 10[._]7/i.test(userAgent),
          'osx10.6'         : /Mac OS X 10[._]6/i.test(userAgent),
          'osx10.5'         : /Mac OS X 10[._]5/i.test(userAgent),
          'osx10.4'         : /Mac OS X 10[._]4/i.test(userAgent),
          'osx10.3'         : /Mac OS X 10[._]3/i.test(userAgent),
          'osx10.2'         : /Mac OS X 10[._]2/i.test(userAgent),
          'osx10.1'         : /Mac OS X 10[._]1/i.test(userAgent),
          'osx10.0'         : /Mac OS X 10[._]0/i.test(userAgent),
          ios               : ~userAgent.indexOf('iphone os') || ~userAgent.indexOf('like mac os x'),
          androidos         : ~userAgent.indexOf('android'),
          otherOS           : false
        };
        
        property = response.os;
        for (var i in property) {if (!property[i] || i === 'name') {continue;}; property.name = i;};
        if (!response.os.name) {response.os.name = 'otherOS'; response.os.otherOS = true;};
      };
      
      PLATFORM: {
        if (response.platform && (!setting.option || !setting.option.platform && !setting.option.userAgent)) {
          break PLATFORM;
        };
        
        response.platform = {
          name         : '',
          windows      : ~userAgent.indexOf('windows'),
          mac          : ~userAgent.indexOf('macintosh'),
          linux        : ~userAgent.indexOf('x11'),
          android      : ~userAgent.indexOf('android'),
          iphone       : ~userAgent.indexOf('iphone'),
          ipad         : ~userAgent.indexOf('ipad'),
          ipod         : ~userAgent.indexOf('ipod'),
          windowsPhone : ~userAgent.indexOf('windows phone'),
          blackberry   : ~userAgent.indexOf('blackberry'),
          wii          : ~userAgent.indexOf('nintendo wii'),
          ds           : ~userAgent.indexOf('nitro'),
          psp          : ~userAgent.indexOf('psp'),
          ps2          : ~userAgent.indexOf('ps2'),
          ps3          : ~userAgent.indexOf('playstation 3'),
          otherPlatform: false
        };
        
        property = response.platform;
        for (var i in property) {if (!property[i] || i === 'name') {continue;}; property.name = i;};
        if (!response.platform.name) {response.platform.name = 'otherPlatform'; response.platform.otherPlatform = true;};
      };
      
      HARDWARE: {
        if (response.hardware && (!setting.option || !setting.option.hardware && !setting.option.userAgent)) {
          break HARDWARE;
        };
        
        response.hardware = {
          name   : '',
          pc     : response.platform.windows || response.platform.mac,
          mobile : ~userAgent.indexOf('mobile'),
          tablet : ~userAgent.indexOf('tablet'),
          game   : response.platform.wii || response.platform.ds || response.platform.psp || response.platform.ps2 || response.platform.ps3,
          otherHardware: false
        };
        
        property = response.hardware;
        for (var i in property) {if (!property[i] || i === 'name') {continue;}; property.name = i;};
        if (!response.hardware.name) {response.hardware.name = 'otherHardware'; response.hardware.otherHardware = true;};
      };
      
      BROWSER: {
        if (response.browser && (!setting.option || !setting.option.browser && !setting.option.userAgent)) {
          break BROWSER;
        };
        
        response.browser = {
          name      : '',
          version   : (userAgent.match(/(?:chrome|firefox|safari|msie|rv|opera(?:\/.+ version)?|version)[\/:\s]([\d.]+)/) || [])[1],
          chrome    : ~userAgent.indexOf('chrome'),
          safari    : ~userAgent.indexOf('safari') && !~userAgent.indexOf('chrome'),
          opera     : ~userAgent.indexOf('opera') && !response.platform.wii && !response.platform.ds,
          firefox   : ~userAgent.indexOf('firefox'),
          mozilla   : ~userAgent.indexOf('mozilla') && !~userAgent.indexOf('compatible') && !~userAgent.indexOf('webkit') && !~userAgent.indexOf('firefox'),
          lunascape : ~userAgent.indexOf('lunascape'),
          sleipnir  : ~userAgent.indexOf('sleipnir'),
          ie        : ~userAgent.indexOf('msie') && !~userAgent.indexOf('opera') || ~userAgent.indexOf('trident') && ~userAgent.indexOf('rv:'),
          otherBrowser: false
        };
        
        for (var i = 5, element; i <= 15; i++) {
          response.browser['ie' + i] = Boolean(response.browser.ie && 0 === response.browser.version.indexOf(i));
        };
        
        if (setting.strict.ie) {
          response.browser['ie'] = response.browser.ie && /^\d{2}\./.test(response.browser.version) ||
					                           Boolean(jQuery('<!--[if IE]><wbr><![endif]-->').length && jQuery('<!--[if IE]><wbr><![endif]-->')[0].nodeType === 1);
          for (var i = 5, element; i <= 9; i++) {
            element = jQuery('<!--[if IE ' + i + ']><wbr><![endif]-->');
            response.browser['ie' + i] = Boolean(element.length && element[0].nodeType === 1);
            element = null;
          };
        };
        
        property = response.browser;
        for (var i in property) {if (!property[i] || i === 'name') {continue;}; property.name = i;};
        if (!response.browser.name) {response.browser.name = 'otherBrowser'; response.browser.otherBrowser = true;};
      };
      
      ATTRIBUTE: {
        if (response.attribute && (!setting.option || !setting.option.attribute && !setting.option.userAgent)) {
          break ATTRIBUTE;
        };
        

        response.attribute = {
          name  : '',
          touch : !!~userAgent.indexOf('touch') ||
                  response.hardware.tablet ||
                  response.platform.iphone ||
                  response.platform.ipad ||
                  (response.platform.android && response.hardware.mobile),
          bot   : /Bot\W|Robot|Crawler|Spider/i.test(userAgent)
        };
      };
      
      FONT: {
        if (response.font && (!setting.option || !setting.option.font && !setting.option.userAgent)) {
          break FONT;
        };
        
        if (!setting.font || !jQuery('body').length) {break FONT;};
        
        var body, base, element, style, fonts, text, alphanumeric, symbol, lang;
        
        fonts = ['monospace', 'fantasy', 'cursive', 'sans-serif', 'serif'];
        
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
                'height: auto !important; ';
        
        alphanumeric = 'alphanumericmmmmmmmmm1234567890';
        
        symbol = setting.font.symbol ? '_!#$&:;@+-*/%=^\\(){}[]<>' : '';
        
        lang = {
          en : 'environment',
          ja : '環境　かんきょう　カンキョウ'
        };
        
        text = alphanumeric + symbol;
        for (var i = 0, keys = setting.font.lang.split(/\s*,\s*/), key; key = keys[i]; i++) {
          if (key in lang) {text += lang[key];};
        };
        
        base = [];
        base[0] = jQuery('<pre/>').text(text);
        base[1] = jQuery('<pre/>').text(text);
        
        body = jQuery('body');
        body.append(base[0], base[1]);
        for (var i = 0; i + 1 < fonts.length; i++) {
          base[0].attr('style', 'font-family: ' + fonts.slice(i + 0).join(', ') + ' !important; ' + style);
          base[1].attr('style', 'font-family: ' + fonts.slice(i + 1).join(', ') + ' !important; ' + style);
          if (base[0][0].offsetWidth !== base[1][0].offsetWidth || base[0][0].offsetHeight !== base[1][0].offsetHeight) {
          } else {
            fonts.splice(i--, 1);
          };
        };
        
        base[0].attr('style', 'font-family: ' + fonts.join(', ') + ' !important; ' + style);
        base[1].attr('style', 'font-family: ' + fonts.slice(1 < fonts.length ? 1 : 0).join(', ') + ' !important; ' + style);
        
        style = fonts.join(', ') + ' !important; ' + style;
        fonts = setting.font.family.split(/\s*,\s*/);
        response.font = {support: '', support4style: '', notsupport: '', notsupport4style: ''};
        
        element = jQuery('<pre/>').text(text);
        body.append(element);
        for (var i = 0, font, font4style; font4style = fonts[i]; i++) {
          font = font4style.replace(/"|'/g, '');
          for (var j = 0, len = base.length, source, format; source = base[j]; j++) {
            element.attr('style', 'font-family: ' + font4style + ', ' + style.slice(!j ? 0 : style.indexOf(', ') + 2));
            if (source[0].offsetWidth !== element[0].offsetWidth || source[0].offsetHeight !== element[0].offsetHeight || response.os.androidos || response.os.ios) {
              response.font[font] = true;
              response.font.support += ',' + font;
              response.font.support4style += ',' + font4style;
              break;
            } else if (j === len - 1) {
              response.font[font] = false;
              response.font.notsupport += ',' + font;
              response.font.notsupport4style += ',' + font4style;
            };
          };
        };
        
        base[0].remove();
        base[0] = null;
        base[1].remove();
        base[1] = null;
        element.remove();
        element = null;
        
        response.font.support = response.font.support.slice(1);
        response.font.notsupport = response.font.notsupport.slice(1);
        response.font.support4style = response.font.support4style.slice(1);
        response.font.notsupport4style = response.font.notsupport4style.slice(1);
        response.font.name = response.font.support.split(/\s*,\s*/, 2)[0];
      };
      
      SUPPORT: {
        if (!response.support) {break SUPPORT;};
        
        response.support = jQuery.support;
      };
      
      jQuery.extend(true, context, response);
    },
    format: function(property, query) {
      if (property in this && query) {
        query = query ? query.replace(/(\S+):(\S+)/, '$2-$1') : query;
        query = query ? query.replace(/(\w+)-(not-)/, '$2-$1') : query;
      } else if (property in this) {
      } else {
        property = property ? property.replace(/(\S+):(\S+)/, '$2-$1') : property;
        property = property ? property.replace(/(\w+)-(not-)/, '$2-$1') : property;
        query = [property.split(/(?:not|lte|lt|gte|gt)-/).pop()][0];
        for (var i in this) {
          if (typeof this[i] !== 'object') {continue;};
          if (query in this[i]) {
            query = property;
            property = i;
          };
        };
      };
      return [property, query];
    },
    reference: function(property, query) {
      var queries, list, position = [undefined, undefined], result;
      
      queries = query === undefined ? [query] : query.replace(/(not|)-?(lte|lt|gte|gt|)-?(\S+)/, '$3,$2,$1').split(',');
      queries[2] = queries[2] === 'not' ? false : true;
      
      switch (true) {
        case !query || !~query.indexOf('-') :
          query = query ? query : 'name';
          if (this[property] && query in this[property]) {
            result = this[property][query];
          } else {
            result = undefined
          };
          return queries[2] ? result : !result;
          break;
          
        case property === 'os' && !queries[0].indexOf('windows') :
          list = [
              'windows8',
              'windowsRT',
              'windows7',
              'windowsVista',
              'windowsServer2003',
              'windowsXP',
              'windowsME',
              'windows2000',
              'windows98',
              'windowsNT',
              'windows95'
          ];
          break;
          
        case property === 'os' && !queries[0].indexOf('osx') :
          list = [
              'osx10.8',
              'osx10.7',
              'osx10.6',
              'osx10.5',
              'osx10.4',
              'osx10.3',
              'osx10.2',
              'osx10.1',
              'osx10.0'
          ];
          break;
          
        case property === 'browser' && !queries[0].indexOf('ie') :
          list = [
              'ie15',
              'ie14',
              'ie13',
              'ie12',
              'ie11',
              'ie10',
              'ie9',
              'ie8',
              'ie7',
              'ie6',
              'ie5'
          ];
          break;
          
        default :
          return undefined;
      };
      
      for (var i = 0, value; value = list[i]; i++) {
        if (this[property]['name'] === value) {position[0] = i;};
        if (queries[0] === value) {position[1] = i;};
      };
      
      if (undefined in position) {return undefined;};
      
      switch (queries[1]) {
        case 'gt' :
          result = position[0] < position[1];
          break;
          
        case 'gte' :
          result = position[0] <= position[1];
          break;
          
        case 'lt' :
          result = position[0] > position[1];
          break;
          
        case 'lte' :
          result = position[0] >= position[1];
          break;
          
        default :
          return undefined;
      };
      return queries[2] ? result : !result;
    }
  };
  
  registrate.apply(this, [].slice.call(arguments).concat([Store]));
}) (jQuery, window, document, void 0);
