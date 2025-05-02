"use strict";

//
if (sessionStorage.getItem("opening-displayed") === "true") {
  $(".js-loading").remove();
}

// ===== init =====
["pageshow", "load"].forEach(function (evt) {
  window.addEventListener(evt, function () {
    document.body.classList.remove("fadeout");
    sessionStorage.setItem("opening-displayed", !0);
  });
});

// ===== locomotive scroll =====
const scrollEl = "#scroller";
let scroll = new LocomotiveScroll({
  el: document.querySelector(scrollEl),
  smooth: true,
  lerp: 0.07,
});

new ResizeObserver(() => scroll.update()).observe(
  document.querySelector(scrollEl)
);
document.addEventListener("DOMContentLoaded", function () {
  function ScrollUpdateDelay() {
    setTimeout(function () {
      scroll.update();
    }, 500);
  }
  ScrollUpdateDelay();
});

// connect scrollTrigger to Locomotive
gsap.registerPlugin(ScrollTrigger);
scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(scrollEl, {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

if ($(window).width() < 1024) {
  ScrollTrigger.config({
    // a comma-delimited list of events that trigger a refresh.
    // default: "visibilitychange,DOMContentLoaded,load,resize"
    // so remove the "resize" one:
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });
}
// ===== home page =====

const home = () => {
  // blur variables gsap
  const blurProperty = gsap.utils.checkPrefix("filter"),
    blurExp = /blur\((.+)?px\)/,
    getBlurMatch = (target) =>
      (gsap.getProperty(target, blurProperty) || "").match(blurExp) || [];

  gsap.registerPlugin({
    name: "blur",
    get(target) {
      return +getBlurMatch(target)[1] || 0;
    },
    init(target, endValue) {
      let data = this,
        filter = gsap.getProperty(target, blurProperty),
        endBlur = "blur(" + endValue + "px)",
        match = getBlurMatch(target)[0],
        index;
      if (filter === "none") {
        filter = "";
      }
      if (match) {
        index = filter.indexOf(match);
        endValue =
          filter.substr(0, index) +
          endBlur +
          filter.substr(index + match.length);
      } else {
        endValue = filter + endBlur;
        filter += filter ? " blur(0px)" : "blur(0px)";
      }
      data.target = target;
      data.interp = gsap.utils.interpolate(filter, endValue);
    },
    render(progress, data) {
      data.target.style[blurProperty] = data.interp(progress);
    },
  });
  // preloader animtion
  let load = gsap.timeline();
  load
    .to(".js-loading-logo", {
      blur: 0,
      opacity: 1,
      duration: 0.4,
      ease: "none",
    })
    .to(".js-loading-blur", {
      blur: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.8,
      ease: "none",
    })
    .to(".js-loading-title", {
      blur: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.4,
      ease: "none",
    })
    .to(".js-loading-logo", {
      delay: 0.6,
      duration: 1.5,
      height: "50%",
      ease: Power4.easeOut,
    })
    .to(
      ".js-loading-bg",
      {
        top: 0,
        duration: 1.2,
        ease: Power4.easeOut,
      },
      "-=1.5"
    )
    .to(
      ".js-loading",
      {
        delay: 0.3,
        autoAlpha: 0,
        blur: 15,
        duration: 1,
        zIndex: -100,
        ease: "none",
      },
      "-=0.6"
    );

  //init swiper overview
  const overviewSwiper = new Swiper(".js-overview-swiper", {
    speed: 800,
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        spaceBetween: 10,
        allowTouchMove: true,
        draggable: true,
      },
      1024: {
        slidesPerView: "auto",
        spaceBetween: 10,
        draggable: false,
        allowTouchMove: false,
      },
    },
  });
  const swiperWrapper = document.querySelector(
    ".js-overview-swiper .swiper-wrapper"
  );
  const updateSlidesPerView = () => {
    if (window.innerWidth >= 1024) {
      const slides = swiperWrapper.querySelectorAll(
        ".js-overview-swiper .swiper-slide"
      ).length;
      overviewSwiper.params.slidesPerView = slides;
      overviewSwiper.update();
    }
  };
  const observer = new MutationObserver(updateSlidesPerView);
  observer.observe(swiperWrapper, { childList: true, subtree: true });
  updateSlidesPerView();

  // scroll show text
  const isBlur = gsap.utils.toArray(".js-is-blur");
  isBlur.forEach((box, index) => {
    gsap.to(box, {
      opacity: 1,
      blur: 0,
      ease: "none",
      duration: 0.5,
      scrollTrigger: {
        trigger: box,
        scroller: scrollEl,
        start: "top 80%",
        // markers: true,
      },
    });
  });

  // scroll active link
  // const scrollSections = gsap.utils.toArray(".js-sections");
  // // const links = gsap.utils.toArray(".js-header-nav li a");
  // scrollSections.forEach((section, i) => {
  //   // const link = links[i];
  //   const sectionId = section.getAttribute("id");
  //   ScrollTrigger.create({
  //     scroller: scrollEl,
  //     trigger: section,
  //     start: "top 50%",
  //     end: "bottom 50%",
  //     onEnter: () =>
  //       document
  //         .querySelector(`[data-scrollto="${sectionId}"]`)
  //         .classList.add("active"),
  //     onEnterBack: () =>
  //       document
  //         .querySelector(`[data-scrollto="${sectionId}"]`)
  //         .classList.add("active"),
  //     onLeave: () =>
  //       document
  //         .querySelector(`[data-scrollto="${sectionId}"]`)
  //         .classList.remove("active"),
  //     onLeaveBack: () =>
  //       document
  //         .querySelector(`[data-scrollto="${sectionId}"]`)
  //         .classList.remove("active"),
  //     // markers: true,
  //   });
  // });
  // ScrollTrigger.create({
  //   scroller: scrollEl,
  //   trigger: "#overview",
  //   start: "top 50%",
  //   end: "bottom 50%",
  //   onEnter: () =>
  //     document.querySelector(`[data-scrollto="about"]`).classList.add("active"),
  //   onEnterBack: () =>
  //     document.querySelector(`[data-scrollto="about"]`).classList.add("active"),
  //   onLeave: () =>
  //     document
  //       .querySelector(`[data-scrollto="about"]`)
  //       .classList.remove("active"),
  //   onLeaveBack: () =>
  //     document
  //       .querySelector(`[data-scrollto="about"]`)
  //       .classList.remove("active"),
  // });

  // scroll envent
  const footerSetTop = $(".js-footer").offset().top,
    hSize = $(".js-offset-top").offset().top;
  scroll.on("scroll", (instance) => {
    let scrollf = instance.scroll.y;

    scrollf + hSize + 200 >= footerSetTop
      ? $(".js-entry").addClass("is-hide")
      : $(".js-entry").removeClass("is-hide");

    scrollf >= hSize
      ? $(".js-header-left").addClass("is-show")
      : $(".js-header-left").removeClass("is-show");
  });
  // scroll section
  const anchorLinks = document.querySelectorAll(".c-header_link a");
  anchorLinks.forEach((anchorLink) => {
    let hashval = anchorLink.getAttribute("data-scrollto");
    let target = document.querySelector("#" + hashval);

    anchorLink.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      scroll.scrollTo(target);
    });
  });
};

$(document).on(
  "click",
  'a:not([href^="#"]):not([target]):not([href^="mailto"]):not([href^="tel"])',
  function (e) {
    e.preventDefault();
    const url = $(this).attr("href");
    if (url !== "") {
      const idx = url.indexOf("#");
      const hash = idx != -1 ? url.substring(idx) : "";
      if ($(hash).length > 0) {
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          300
        );
        return false;
      }
      $("body").addClass("fadeout");
      setTimeout(function () {
        window.location = url;
      }, 500);
    }
    return false;
  }
);

window.onload = () => {
  home();
};

// init resize when refresh page locomotive
setTimeout(() => {
  window.dispatchEvent(new Event("resize"));
}, 4000);

// init scrolling speed
$(window).on("load resize", function () {
  if ($(window).width() < 1024) {
    $.fn.moveIt = function () {
      let $window = $(window);
      let instances = [];
      $(this).each(function () {
        instances.push(new moveItItem($(this)));
      });
      window.onscroll = function () {
        let scrollTop = $window.scrollTop();
        console.log("scrollTop", scrollTop);
        instances.forEach(function (inst) {
          inst.update(scrollTop);
        });
      };
    };

    let moveItItem = function (el) {
      this.el = $(el);
      this.speed = parseInt(this.el.attr("data-scroll-speed"));
    };
    moveItItem.prototype.update = function (scrollTop) {
      let dist = -scrollTop / (this.speed * 8) + 80;
      gsap.to(this.el, { y: dist, duration: 0.4, ease: "none" });
    };

    // intersectionObserver ===============
    const options = {
      threshold: 0.5,
      rootMargin: "0px 0px -10% 0px",
    };
    // instantiate a new Intersection Observer
    let observer = new IntersectionObserver(onEntry, options);
    // list of elements to observe
    let elements = document.querySelectorAll(".js-element");
    // loop through all elements / pass each element to observe method
    for (let elm of elements) {
      observer.observe(elm);
    }
    // define the activities
    function onEntry(entry) {
      entry.forEach((change) => {
        if (change.isIntersecting) {
          $("[data-scroll-speed]").moveIt(); // instantiate
        } else {
          $("").moveIt(); // quick & dirty
        }
      });
    }
    // Initialization
    $(function () {
      $("[data-scroll-speed]").moveIt();
    });
  }
});
