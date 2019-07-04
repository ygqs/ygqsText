function examcookie(e) {
  var a, s = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
  return (a = document.cookie.match(s)) ? unescape(a[2]) : null
}

function getExam(e) {
  var a = $(".hq2018exam").data("id");
  e && (a = e), $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: "http://kjapi.hqwx.com/web/goods/getCourse?categoryId=" + a,
    success: function (e) {
      0 == e.status.code && ($(".showexam").show(), $(".showexam .hq2018title h2").text(e.data.category), $(".showexam .coursecontent").html(e.data.classInfo), 0 == e.data.total && $(".showexam").hide())
    }
  })
}

function daojishi() {
  $(".coursecard").find(".coursecard-djs").each(function () {
    daojishitext($(this))
  })
}

function daojishitext(e) {
  var a, s, o, i, t = parseInt(e.data("time"));
  if (!(0 <= t)) return e.html("已恢复原价"), !1;
  a = Math.floor(t / 1e3 / 60 / 60 / 24), (s = Math.floor(t / 1e3 / 60 / 60 % 24)) < 10 && (s = "0" + s), (o = Math.floor(t / 1e3 / 60 % 60)) < 10 && (o = "0" + o), (i = Math.floor(t / 1e3 % 60)) < 10 && (i = "0" + i), 0 < e.parents(".cousepart").length ? "block" == e.parents(".cousepart").css("display") && e.html("剩<span>" + a + "</span>天<span>" + s + ":" + o + ":" + i + "</span>恢复原价") : e.html("剩<span>" + a + "</span>天<span>" + s + ":" + o + ":" + i + "</span>恢复原价"), e.data("time", e.data("time") - 1e3)
}

$(function () {
  var e = 0;

  function a(e) {
    $(".banner_choose li").eq(e).addClass("choose_now").siblings("li").removeClass("choose_now"), $(".banner_pic a").eq(e).stop(!0, !0).css("display", "block").siblings("a").hide()
  }

  $(".banner_choose li").mouseover(function () {
    a(e = $(".banner_choose li").index(this))
  }), $(".icon18-banner-left").click(function () {
    -1 == (e = $(".choose_now").index() - 1) && (e = $(".banner_pic").children().length - 1), a(e)
  }), $(".icon18-banner-right").click(function () {
    (e = $(".choose_now").index() + 1) == $(".banner_pic").children().length && (e = 0), a(e)
  }), $(".banner_pic").hover(function () {
    s && clearInterval(s)
  }, function () {
    s = setInterval(function () {
      a(e), ++e == $(".banner_pic").children().length && (e = 0)
    }, 3e3)
  });
  var s = setInterval(function () {
    a(e), ++e == $(".banner_pic").children().length && (e = 0)
  }, 3e3);
  setInterval(daojishi, 1e3), $(".newschoose span").mouseenter(function () {
    $(this).addClass("active").siblings().removeClass("active"), 0 == $(this).index() ? $(this).parents(".courseinfo-news").find(".newslist").hide().eq(0).show() : $(this).parents(".courseinfo-news").find(".newslist").hide().eq(1).show()
  }), $(".hq2018course .hq2018title li").mouseenter(function () {
    $(this).addClass("active").siblings().removeClass("active"), $(this).parents(".w1180").find(".cousepart").hide().eq($(this).index()).show()
  }), examcookie("passportCors") || examcookie("commencookie") ? (examdata = {}, "" != examcookie("passportCors") && null != examcookie("passportCors") && (examdata.passport = examcookie("passportCors")), "" != examcookie("commencookie") && null != examcookie("commencookie") && (examdata.commencookie = examcookie("commencookie")), examdata.passport || examdata.commencookie ? $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: "http://api.hqwx.com/phpapi/examIntention/get",
    data: {passport: examdata.passport, commentcookie: examdata.commencookie},
    success: function (e) {
      1 == e.status && (0 != e.data.lessonId ? ($(".hq2018exam").data("id", e.data.lessonId), $(".chooseexam").hide(), $(".shade").hide(), $(".examchoose").hide(), getExam()) : ($(".shade").show(), $(".examchoose").show(), $(".chooseexam").show()))
    }
  }) : ($(".shade").show(), $(".examchoose").show(), $(".chooseexam").show())) : ($(".shade").show(), $(".examchoose").show(), $(".chooseexam").show()), $(".hq2018exam .chooseexam span,.hq2018exam .showexam p").click(function () {
    $(".shade").show(), $(".examchoose").show(), $(".examchoose .list1 span").removeClass("active"), $(".examchoose .list2 em").removeClass("active"), $(".examchoose  a").removeClass("active"), $(".examchoose .list1").show(), $(".examchoose .list2").hide(), $(".examchoose .choosemore").show(), 0 != $(".hq2018exam").data("id") && $(".list1 span").each(function () {
      $(this).data("id") == $(".hq2018exam").data("id") && ($(this).addClass("active"), $(".examchoose a").addClass("active"))
    })
  }), $(".examchoose .list1 span,.examchoose .list2 em").click(function () {
    $(".examchoose .list1 span").removeClass("active"), $(".examchoose .list2 em").removeClass("active"), $(this).addClass("active"), $(".examchoose a").addClass("active")
  }), $(".examchoose .choosemore  span").click(function () {
    $(".examchoose .list1 span").removeClass("active"), $(".examchoose .list2 em").removeClass("active"), $(".examchoose a").removeClass("active"), $(".examchoose .list1").hide(), $(".examchoose .list2").show(), $(".examchoose .choosemore").hide(), 0 != $(".hq2018exam").data("id") && $(".list2 em").each(function () {
      $(this).data("id") == $(".hq2018exam").data("id") && ($(this).addClass("active"), $(".examchoose a").addClass("active"))
    })
  }), $(".examchoose .icon18-indexclose").click(function () {
    $(".shade").hide(), $(".examchoose").hide()
  }), $(".examchoose a").click(function () {
    if ($(this).hasClass("active")) {
      var e = $(".examchoose .active").data("id");
      getExam(e), $(".shade").hide(), $(".examchoose").hide(), $(".chooseexam").hide(), $(".hq2018exam").data("id", e), datainfo = "new_lessonid=" + e, $.ajax({
        type: "POST",
        data: datainfo,
        url: "/commentcookie.asp"
      }), -1 == window.location.hostname.indexOf("hqwx") ? $.ajax({
        type: "POST",
        data: datainfo,
        xhrFields: {withCredentials: !0},
        url: "http://www.hqwx.com/commentcookie.asp"
      }) : $.ajax({
        type: "POST",
        data: datainfo,
        xhrFields: {withCredentials: !0},
        url: "http://www.edu24ol.com/commentcookie.asp"
      }), examcookie("passportCors") && $.ajax({
        type: "get",
        data: "passport=" + examcookie("passportCors") + "&lessonIds=" + e,
        dataType: "jsonp",
        url: "http://api.hqwx.com/phpapi/userIntention/new"
      })
    }
  })
}), $(document).ready(function () {
  var e, i = function () {
    var e = window.document.location.href.toString().split("?");
    if ("string" == typeof e[1]) {
      e = e[1].split("&");
      var a = {};
      for (var s in e) {
        var o = e[s].split("=");
        a[o[0]] = o[1]
      }
      return a
    }
    return {}
  }();
  if (e = {
    init: function () {
      var e = this;
      e.pages = 1, e.getInfo(e.pages, 1), e.buttonE(), $(".searchmain .choose li").click(function () {
        $(this).addClass("active").siblings().removeClass("active"), 0 == $(this).index() ? ($(".searchmain .examlist").hide(), $(".searchnull").hide(), $(".uc2018-loading").show(), $(".searchmain .courselist").hide(), $(".uc2018-mycourse-page").hide(), e.getInfo(e.pages, 1)) : ($(".uc2018-loading").hide(), $(".searchmain .courselist").hide(), $(".uc2018-mycourse-page").hide(), 0 == $(".searchmain .examlist a").length ? ($(".searchnull").show(), $(".searchmain .examlist").hide()) : ($(".searchnull").hide(), $(".searchmain .examlist").show(), 0 == $(".searchmain .examlist .nomore").length && $(".searchmain .examlist").append('<p class="nomore">没有更多了</p>')))
      })
    }, getInfo: function (e, a) {
      var s = this, o = i.keyword ? i.keyword : "";
      e ? s.pages = e : e = s.pages, $(".uc2018-loading").show(), $(".searchmain .courselist").hide(), $(".uc2018-mycourse-page").hide(), $(".searchmain .examlist").hide(), $(".searchnull").hide(), s.allN && 1 != a && s.page(s.allN), 1 != a && $(window).scrollTop($(".searchmain").offset().top), $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: "http://kjapi.hqwx.com/web/goods/getSearchResult",
        data: {
          _appid: "wwwedu24ol",
          _os: "1",
          _v: "1.0.0",
          _t: (new Date).getTime(),
          org_id: "1",
          platform: "web",
          from: 20 * (e - 1),
          rows: 20,
          keyword: o
        },
        success: function (e) {
          0 == e.status.code && (0 == e.data.goodsCount ? ($(".uc2018-loading").hide(), $(".searchnull").show()) : $(".searchmain .courselist").show(), $(".searchmain .examlist").html(e.data.examList), s.allN = e.data.goodsCount, 1 == a && s.page(s.allN), e.data.goodsCount < 20 ? $(".uc2018-mycourse-page").hide() : $(".uc2018-mycourse-page").show(), $(".searchmain .courselist").html(""), $(".searchmain .courselist").html(e.data.goodsList)), $(".uc2018-loading").hide()
        }
      })
    }, page: function (e) {
      var a = this, s = $(".uc2018-mycourse-page"), o = Math.ceil(e / 20);
      1 == a.pages ? (s.children(".f").addClass("dis"), s.children(".p").addClass("dis")) : (s.children(".f").removeClass("dis"), s.children(".p").removeClass("dis")), a.pages == o ? (s.children(".l").addClass("dis"), s.children(".n").addClass("dis")) : (s.children(".l").removeClass("dis"), s.children(".n").removeClass("dis")), s.children("s").html("");
      for (var i = 1; i <= o; i++) i == a.pages ? s.children("s").append('<b class="active" data-p="' + i + '">' + i + "</b>") : s.children("s").append('<b data-p="' + i + '">' + i + "</b>");
      if (o <= 7) s.children("s").children("b").css("display", "inline-block"); else if (a.pages <= 3) for (i = 0; i <= 6; i++) s.children("s").children("b").eq(i).css("display", "inline-block"); else if (a.pages >= o - 2) for (i = o; o - 7 <= i; i--) s.children("s").children("b").eq(i).css("display", "inline-block"); else for (i = a.pages - 4; i <= a.pages + 2; i++) s.children("s").children("b").eq(i).css("display", "inline-block")
    }, buttonE: function () {
      var e = this;
      $(".uc2018-mycourse-page").on("click", ".f", function () {
        $(this).hasClass("dis") || e.getInfo(1)
      }), $(".uc2018-mycourse-page").on("click", ".p", function () {
        $(this).hasClass("dis") || e.getInfo(e.pages - 1)
      }), $(".uc2018-mycourse-page").on("click", ".l", function () {
        $(this).hasClass("dis") || e.getInfo(Math.ceil(e.allN / 20))
      }), $(".uc2018-mycourse-page").on("click", ".n", function () {
        $(this).hasClass("dis") || e.getInfo(e.pages + 1)
      }), $(".uc2018-mycourse-page s").on("click", "b", function () {
        $(this).hasClass("active") || e.getInfo($(this).data("p"))
      }), $(".uc2018-mycourse-title ul li").click(function () {
        e.type = $(this).data("id"), e.getInfo(1, 1), $(this).addClass("active").siblings().removeClass("active")
      })
    }
  }, 0 < $(".searchmain").length) {
    e.init();
    var a = $(window).height() - 105 - 107 - 72 - 40;
    $(".uc2018-loading,.searchnull,.searchmain .examlist,.searchmain .courselist").css("min-height", a)
  }
  0 < navigator.userAgent.indexOf("MSIE") && (0 < navigator.userAgent.indexOf("MSIE 7.0") || 0 < navigator.userAgent.indexOf("MSIE 8.0")) && $(".lazyload").each(function () {
    $(this).attr("src", $(this).data("src")), $(this).removeClass("lazyload").addClass("lazyloaded")
  })
});
//# sourceMappingURL=hq2018.map
