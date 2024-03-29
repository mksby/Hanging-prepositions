var Prepositions = function(obj) {
  if (!(this instanceof Prepositions)) {
    return new Prepositions(obj)
  }
  this.runtime(obj);  
};

Prepositions.prototype = {
  constructor: Prepositions,
  dictionary: "а-ля|без|без ведома|безо|благодаря|близ|близко от|в|в виде|в зависимости от|в интересах|в качестве|в лице|в отличие от|в отношении|в пандан|в пользу|в преддверии|в продолжение|в результате|в роли|в связи с|в силу|в случае|в соответствии с|в течение|в целях|вблизи|ввиду|вглубь|вдогон|вдоль|вдоль по|взамен|включая|вкруг|вместо|вне|внизу|внутри|внутрь|во|во имя|возле|вокруг|вопреки|вослед|впереди|вплоть до|впредь до|вразрез|вроде|вслед|вслед за|вследствие|для|для-ради|до|з|за|за вычетом|за исключением|за счёт|заместо|из|из-за|из-под|изнутри|изо|исходя из|к|касательно|ко|кроме|кругом|лицом к лицу с|меж|между|мимо|на|на благо|на виду у|на глазах у|на предмет|наверху|навстречу|над|надо|назад|накануне|наперекор|наперерез|наподобие|напротив|наряду с|насупротив|насчёт|начиная с|не без|не в|не за|не считая|невзирая на|недалеко от|независимо от|несмотря на|ниже|о|об|обо|обок|около|окрест|окромя|округ|опосля|от|от имени|от лица|относительно|ото|перед|передо|по|по линии|по мере|по направлению к|по отношению к|по поводу|по причине|по случаю|по сравнению с|по-за|по-над|по-под|поблизости от|поверх|под|под видом|под эгидой|подле|подо|подобно|позади|позднее|помимо|поперёк|порядка|посередине|посередь|после|посреди|посредине|посредством|пред|предо|прежде|при|при помощи|применительно к|про|против|путём|ради|рядом с|с|с ведома|с помощью|с точки зрения|с целью|сверх|сверху|свыше|сзади|сквозь|скрозь|следом за|смотря по|снизу|со|согласно|спустя|среди|средь|сродни|судя по|супротив|через|чрез".split('|').map(function(word) {
    return {
      regexp1: new RegExp('(^|\\s)'+ word +'(\\s|$)', 'gmi'),
      regexp2: new RegExp(word + '(\\s|$)', 'gmi'),
      orig: word
    }
  }),
  each: function (obj, cb) {
    var i = 0, len = obj.length;
    for(; i < len; i += 1) {
      cb(i, obj[i], obj);
    }
  },
  runtime: function(obj) {
    var objs = 
      typeof obj === 'string' || obj === undefined
      ? document.querySelectorAll(obj || 'body') : obj;

    var self = this;

    self.each(objs, function(objIndex, obj) {
      self.each(obj.childNodes, function(nodeIndex, node, nodes) {

        if (node.nodeType === 3 && !!node.nodeValue.replace(/\s/g, '').length) {
          self.each(self.dictionary, function(dictionaryIndex, dictionaryWord, dictionary) {
            if (dictionaryWord.regexp1.test(node.nodeValue)) {
              node.nodeValue = node.nodeValue.replace(dictionaryWord.regexp2, function(word) {
                return word.replace(/\s+$/, '') + '\u00A0'
              })
            }
          })
        }

      })
      !!obj.children.length && self.runtime(obj.children)
    })
  }
};

Prepositions()
