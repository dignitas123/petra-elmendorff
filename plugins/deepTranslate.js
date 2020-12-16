export default ({ app, store }, inject) => {
  // translate everything with $t(obj, [lang])
  //    
  //  	its possible to traverse nested objects, arrays etc
  //    whereever an obj has an language keyname like de or en 
  //    it will get unpacked
  //    {en: {x: 1}, de:} becomes {x: 1}
  //

  inject('t', (obj, lang, langDefault='de') => {

    if (lang == undefined) lang = store.state.language

    const deepTranslate = function (obj, lang, langDefault='de') {
      if (obj != null && Array.isArray(obj)) {    // if array, map recursive
        return obj.map(val => deepTranslate(val, lang, langDefault));
      } 
      else if (obj != null && typeof obj === 'object') {
          if (obj.hasOwnProperty(lang) ) return obj[lang] // locale object with current lang?
          else if (obj.hasOwnProperty(langDefault) ) return obj[langDefault] // locale object with default lang?
          else {              // copy object and repeat recursivly
            var res = {};
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) res[key] = deepTranslate(obj[key], lang, langDefault)
            }
            return res;
          }
      } 
      else {
          return obj;       // keep non locale data untouched
      }
    }

    return deepTranslate(obj, lang, langDefault='de');
  })

  

}

