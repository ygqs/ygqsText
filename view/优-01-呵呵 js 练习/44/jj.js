(function (window,document,undefined) {
  if(!document.getElementsByClassName){
    document.getElementsByClassName = function (eleClassName) {
      var aEle = document.getElementsByTagName('*'),
        reg = new RegExp("\\b"+eleClassName+"\\b"),
        arrEle =[];
      for (var i = 0, len = aEle.length; i < len; i++) {
        if (reg.text(aEle[i].className)) {
          if (reg.text(aEle[i].className)) {
            arrEle.push(aEle[i]);
          }
        }
        return arrEle;
      }
    }
  }
  /*工具类*/
  function asd(selector) {
    // return new asd()
    return new asd.prototype.init(selector);
  }

  asd.prototype = {
    constructor: asd,
    init: function (selector) {
      var arr = [],
        obj = {
          id: function (select) {
            var dom = document.getElementById(select.slice(1));
            dom = null ? [] :[dom];
            return dom;
            },
          className: function (select) {
              return document.getElementsByClassName(select.slice(1));
          },
          tag:function (select) {
            return document.getElementsByTagName(select)
          },
          html:function (select) {
            var div = document.createElement("div");
            div.innerHTML = select;
            div.children;//取出节点
          },
          css3:function (select) {
            document.querySelectorAll(select);
          }
        };
        /*判断参数*/
        if (typeof selector ==="string") {}
    },
    on: function () {

    }
  };
  /*设置init的圆形 = asd类的原型*/
  asd.prototype.init.prototype = asd.prototype;
  window.$ = asd;
}(window,document,undefined));
