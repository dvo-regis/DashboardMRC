"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
    // see if DOM is already renewable
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      setTimeout(fn, 1);
    }
  };
  
  var resize = function resize(fn) {
    return window.addEventListener('resize', fn);
  };
  
  var isIterableArray = function isIterableArray(array) {
    return Array.isArray(array) && !!array.length;
  };
  
  var camelize = function camelize(str) {
    var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
      return c ? c.toUpperCase() : '';
    });
    return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
  };
  
  var getData = function getData(el, data) {
    try {
      return JSON.parse(el.dataset[camelize(data)]);
    } catch (e) {
      return el.dataset[camelize(data)];
    }
  };
  /* ----------------------------- Colors function ---------------------------- */
  
  
  var hexToRgb = function hexToRgb(hexValue) {
    var hex;
    hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    }));
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  };
  
  var rgbaColor = function rgbaColor() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
    var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
    return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
  };
  /* --------------------------------- Colors --------------------------------- */
  
  
  var getColor = function getColor(name) {
    var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return getComputedStyle(dom).getPropertyValue("--emrctracker-".concat(name)).trim();
  };
  
  var getColors = function getColors(dom) {
    return {
      primary: getColor('primary', dom),
      secondary: getColor('secondary', dom),
      success: getColor('success', dom),
      info: getColor('info', dom),
      warning: getColor('warning', dom),
      danger: getColor('danger', dom),
      light: getColor('light', dom),
      dark: getColor('dark', dom)
    };
  };
  
  var getSoftColors = function getSoftColors(dom) {
    return {
      primary: getColor('soft-primary', dom),
      secondary: getColor('soft-secondary', dom),
      success: getColor('soft-success', dom),
      info: getColor('soft-info', dom),
      warning: getColor('soft-warning', dom),
      danger: getColor('soft-danger', dom),
      light: getColor('soft-light', dom),
      dark: getColor('soft-dark', dom)
    };
  };
  
  var getGrays = function getGrays(dom) {
    return {
      white: getColor('gray-white', dom),
      100: getColor('gray-100', dom),
      200: getColor('gray-200', dom),
      300: getColor('gray-300', dom),
      400: getColor('gray-400', dom),
      500: getColor('gray-500', dom),
      600: getColor('gray-600', dom),
      700: getColor('gray-700', dom),
      800: getColor('gray-800', dom),
      900: getColor('gray-900', dom),
      1000: getColor('gray-1000', dom),
      1100: getColor('gray-1100', dom),
      black: getColor('gray-black', dom)
    };
  };
  
  var hasClass = function hasClass(el, className) {
    !el && false;
    return el.classList.value.includes(className);
  };
  
  var addClass = function addClass(el, className) {
    el.classList.add(className);
  };
  
  var removeClass = function removeClass(el, className) {
    el.classList.remove(className);
  };
  
  var getOffset = function getOffset(el) {
    var rect = el.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  };
  
  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
    return vertInView && horInView;
  }
  
  var breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1540
  };
  
  var getBreakpoint = function getBreakpoint(el) {
    var classes = el && el.classList.value;
    var breakpoint;
  
    if (classes) {
      breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
        return cls.includes('navbar-expand-');
      }).pop().split('-').pop()];
    }
  
    return breakpoint;
  };
  /* --------------------------------- Cookie --------------------------------- */
  
  
  var setCookie = function setCookie(name, value, expire) {
    var expires = new Date();
    expires.setTime(expires.getTime() + expire);
    document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
  };
  
  var getCookie = function getCookie(name) {
    var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
    return keyValue ? keyValue[2] : keyValue;
  };
  
  var settings = {
    tinymce: {
      theme: 'oxide'
    },
    chart: {
      borderColor: 'rgba(255, 255, 255, 0.8)'
    }
  };
  /* -------------------------- Chart Initialization -------------------------- */
  
  var newChart = function newChart(chart, config) {
    var ctx = chart.getContext('2d');
    return new window.Chart(ctx, config);
  };
  /* ---------------------------------- Store --------------------------------- */
  
  
  var getItemFromStore = function getItemFromStore(key, defaultValue) {
    var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  
    try {
      return JSON.parse(store.getItem(key)) || defaultValue;
    } catch (_unused) {
      return store.getItem(key) || defaultValue;
    }
  };
  
  var setItemToStore = function setItemToStore(key, payload) {
    var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
    return store.setItem(key, payload);
  };
  
  var getStoreSpace = function getStoreSpace() {
    var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
    return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
  };
  /* get Dates between */
  
  
  var getDates = function getDates(startDate, endDate) {
    var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 * 60 * 60 * 24;
    var duration = endDate - startDate;
    var steps = duration / interval;
    return Array.from({
      length: steps + 1
    }, function (v, i) {
      return new Date(startDate.valueOf() + interval * i);
    });
  };
  
  var getPastDates = function getPastDates(duration) {
    var days;
  
    switch (duration) {
      case 'week':
        days = 7;
        break;
  
      case 'month':
        days = 30;
        break;
  
      case 'year':
        days = 365;
        break;
  
      default:
        days = duration;
    }
  
    var date = new Date();
    var endDate = date;
    var startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
    return getDates(startDate, endDate);
  };
  /* Get Random Number */
  
  
  var getRandomNumber = function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };
  
  var utils = {
    docReady: docReady,
    breakpoints: breakpoints,
    resize: resize,
    isIterableArray: isIterableArray,
    camelize: camelize,
    getData: getData,
    hasClass: hasClass,
    addClass: addClass,
    hexToRgb: hexToRgb,
    rgbaColor: rgbaColor,
    getColor: getColor,
    getColors: getColors,
    getSoftColors: getSoftColors,
    getGrays: getGrays,
    getOffset: getOffset,
    isScrolledIntoView: isScrolledIntoView,
    getBreakpoint: getBreakpoint,
    setCookie: setCookie,
    getCookie: getCookie,
    newChart: newChart,
    settings: settings,
    getItemFromStore: getItemFromStore,
    setItemToStore: setItemToStore,
    getStoreSpace: getStoreSpace,
    getDates: getDates,
    getPastDates: getPastDates,
    getRandomNumber: getRandomNumber,
    removeClass: removeClass
  };
  /* eslint-disable */
  
  var getPosition = function getPosition(pos, params, dom, rect, size) {
    return {
      top: pos[1] - size.contentSize[1] - 10,
      left: pos[0] - size.contentSize[0] / 2
    };
  };
  
  var echartSetOption = function echartSetOption(chart, userOptions, getDefaultOptions) {
    var themeController = document.body; // Merge user options with lodash
  
    chart.setOption(window._.merge(getDefaultOptions(), userOptions));
    themeController.addEventListener('clickControl', function (_ref) {
      var control = _ref.detail.control;
  
      if (control === 'theme') {
        chart.setOption(window._.merge(getDefaultOptions(), userOptions));
      }
    });
  };
  
  var tooltipFormatter = function tooltipFormatter(params) {
    var tooltipItem = "";
    params.forEach(function (el) {
      tooltipItem = tooltipItem + "<div class='ms-1'>\n        <h6 class=\"text-700\"><span class=\"fas fa-circle me-1 fs--2\" style=\"color:".concat(el.borderColor ? el.borderColor : el.color, "\"></span>\n          ").concat(el.seriesName, " : ").concat(_typeof(el.value) === 'object' ? el.value[1] : el.value, "\n        </h6>\n      </div>");
    });
    return "<div>\n            <p class='mb-2 text-600'>\n              ".concat(window.dayjs(params[0].axisValue).isValid() ? window.dayjs(params[0].axisValue).format('MMMM DD') : params[0].axisValue, "\n            </p>\n            ").concat(tooltipItem, "\n          </div>");
  };

/* -------------------------------------------------------------------------- */

/*                             Echarts Bar Chart                             */

/* -------------------------------------------------------------------------- */

var echartsBarSeriesChartInit = function echartsBarSeriesChartInit() {
    var $barSeriesChartEl = document.querySelector('.genco-available-capacity');
  
    if ($barSeriesChartEl) {
      // Get options from data attribute
      var userOptions = utils.getData($barSeriesChartEl, 'options');
      var chart = window.echarts.init($barSeriesChartEl);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0", "#34a6f0"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            padding: [0, 10],
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          xAxis: {
            type: 'value',
            axisLabel: {
              formatter: function formatter(value) {
                return "".concat(value / 1000, "k");
              },
              color: utils.getGrays()['500']
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: utils.getGrays()['200']
              }
            }
          },
          yAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500']
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['DECEMBER', 'NOVEMBER', 'OCTOBER', 'SEPTEMBER', 'AUGUST', 'JULY', 'JUNE',
                   'MAY', 'APRIL', 'MARCH', 'FEBRUARY', 'JANUARY',
                  ]
          },
          series: [{
            name: 'HYDRO',
            type: 'bar',
            stack: 'stack', 
            data: [18203, 23489, 29034, 104970, 131744, 18203, 23489, 29034, 104970, 131744, 18203, 23489, 29034, 104970, 131744,
              18203, 23489, 29034, 104970, 131744, 18203, 23489, 29034, 104970, 131744, 18203, 23489, 29034, 104970, 131744],
            itemStyle: {
              barBorderRadius: [0, 0, 0, 0]
            }
          }, {
            name: 'THERMAL',
            type: 'bar',
            stack: 'stack', 
            data: [19325, 23438, 31000, 121594, 134141, 18203, 23489, 29034, 104970, 131744, 18203, 23489, 29034, 104970, 131744, 18203, 23489, 29034, 104970, 131744,
              18203, 23489, 29034, 104970, 131744, 18203, 23489, 29034, 104970, 131744, 18203, 23489, 29034, 104970, 131744],
            itemStyle: {
              barBorderRadius: [0, 10, 10, 0]
            }
          }],
          grid: {
            right: 15,
            left: '9%',
            bottom: '10%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  
  /* -------------------------------------------------------------------------- */

/*                             Monthly Generation                            */

/* -------------------------------------------------------------------------- */

var echartsStackedBarSeriesChartInit = function echartsStackedBarSeriesChartInit() {
    var $stackedBarSeriesChartEl = document.querySelector('.monthly-capacity');
  
    if ($stackedBarSeriesChartEl) {
      // Get options from data attribute
      var userOptions = utils.getData($stackedBarSeriesChartEl, 'options');
      var chart = window.echarts.init($stackedBarSeriesChartEl);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0", "#34a6f0"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          backgroundColor: '#fff',
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function formatter(value) {
                return "".concat(value / 1000, "k");
              },
              color: utils.getGrays()['500']
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022',
                   '2023',
                  ]
          },
          series: [{
            name: 'HYDRO',
            type: 'bar',
            stack: "stack",
            data: [118203, 213489, 291034, 141970, 311744, 181203, 231489, 291034,],
            itemStyle: {
              barBorderRadius: [0, 0, 10, 10]
            }
          }, {
            name: 'THERMAL',
            type: 'bar',
            stack: "stack",
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
            itemStyle: {
              barBorderRadius: [10, 10, 0, 0]
            }
          }],
          grid: {
            right: 15,
            left: '7%',
            bottom: '8%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  /* -------------------------------------------------------------------------- */

/*                           Genco Capacity                       */

/* -------------------------------------------------------------------------- */


var echartsGencoCapacityChartInit = function echartsGencoCapacityChartInit() {
    var $echartsGencoCapacityChart = document.querySelector('.genco-capacity');
  
    if ($echartsGencoCapacityChart) {
      var userOptions = utils.getData($echartsGencoCapacityChart, 'options');
      var chart = window.echarts.init($echartsGencoCapacityChart);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0", "#ff718b"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          backgroundColor: '#fff',
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function formatter(value) {
                return "".concat(value / 1000, "k");
              },
              color: utils.getGrays()['500']
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
          },
          series: [{
            name: 'Available',
            type: 'line', 
            data: [61823, 41389, 49034, 41970, 31174, 81203, 31489, 91034],
            smooth: true,
          }, {
            name: 'Sent-Out',
            type: 'line', 
            data: [19125, 23148, 31100, 21194, 31141, 18103, 23489, 29134],
            smooth: true,
          }],
          grid: {
            right: 15,
            left: '7%',
            bottom: '8%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };
  

  /* -------------------------------------------------------------------------- */

/*                           Genco Capacity                       */

/* -------------------------------------------------------------------------- */


var echartsGenerationVsSentChartInit = function echartsGenerationVsSentChartInit() {
    var $echartsGenerationVsSentChart = document.querySelector('.generation-sent-out');
  
    if ($echartsGenerationVsSentChart) {
      var userOptions = utils.getData($echartsGenerationVsSentChart, 'options');
      var chart = window.echarts.init($echartsGenerationVsSentChart);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0", "#ff718b"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          backgroundColor: '#fff',
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function formatter(value) {
                return "".concat(value / 1000, "k");
              },
              color: utils.getGrays()['500']
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
          },
          series: [{
            name: 'Available',
            type: 'line', 
            data: [61823, 41389, 49034, 41970, 31174, 81203, 31489, 91034],
            smooth: true,
          }, {
            name: 'Sent-Out',
            type: 'line', 
            data: [19125, 23148, 31100, 21194, 31141, 18103, 23489, 29134],
            smooth: true,
          }],
          grid: {
            right: 5,
            left: '5%',
            bottom: '10%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };


  /* -------------------------------------------------------------------------- */

/*                           Transmission Loss Factor                      */

/* -------------------------------------------------------------------------- */


var echartsTLFChartInit = function echartsTLFChartInit() {
    var $echartsTLFChart = document.querySelector('.tlf');
  
    if ($echartsTLFChart) {
      var userOptions = utils.getData($echartsTLFChart, 'options');
      var chart = window.echarts.init($echartsTLFChart);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0", "#ff718b"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          backgroundColor: '#fff',
          yAxis: {
            type: 'value',
            axisLabel: {
              color: utils.getGrays()['500']
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
          },
          series: [{
            name: 'TOTAL',
            type: 'line', 
            data: [61823, 41389, 49034, 41970, 31174, 81203, 31489, 91034],
            smooth: true,
          }, {
            name: 'PARTIAL',
            type: 'line', 
            data: [19125, 23148, 31100, 21194, 31141, 18103, 23489, 29134],
            smooth: true,
          }], 
          grid: {
            right: 45,
            left: '8%',
            bottom: '10%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

    /* -------------------------------------------------------------------------- */

/*                           Monthly System Collapse                       */

/* -------------------------------------------------------------------------- */


var echartsSystemCollapseChartInit = function echartsSystemCollapseChartInit() {
    var $echartsSystemCollapseChart = document.querySelector('.system-collapse');
  
    if ($echartsSystemCollapseChart) {
      var userOptions = utils.getData($echartsSystemCollapseChart, 'options');
      var chart = window.echarts.init($echartsSystemCollapseChart);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0", "#ff718b"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          backgroundColor: '#fff',
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
          },
          series: [{
            name: 'TOTAL',
            type: 'line', 
            data: [61823, 41389, 49034, 41970, 31174, 81203, 31489, 91034],
            smooth: true,
          }, {
            name: 'PARTIAL',
            type: 'line', 
            data: [19125, 23148, 31100, 21194, 31141, 18103, 23489, 29134],
            smooth: true,
          }],
          grid: {
            right: 45,
            left: '8%',
            bottom: '10%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  /* -------------------------------------------------------------------------- */

/*              Aggregate Technical and Collection Losses                        */

/* -------------------------------------------------------------------------- */

var echartsATCnCChartInit = function echartsATCnCChartInit() {
    var $atcncChartEl = document.querySelector('.atc-c');
  
    if ($atcncChartEl) {
      // Get options from data attribute
      var userOptions = utils.getData($atcncChartEl, 'options');
      var chart = window.echarts.init($atcncChartEl);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          backgroundColor: '#fff',
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
                color: utils.getGrays()['500'],
              },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022',
                   '2023',
                  ]
          },
          series: [{
            name: 'HYDRO',
            type: 'bar',
            data: [82, 89, 94, 97, 74, 81, 89, 94,],
            itemStyle: {
              barBorderRadius: [10, 10, 10, 10]
            },
            showBackground: true,
            backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
            barBorderRadius: [10, 10, 10, 10]
            }
          }, 
        ],
          grid: {
            right: 5,
            left: '7%',
            bottom: '8%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

    /* -------------------------------------------------------------------------- */

/*                             Average Tariff                            */

/* -------------------------------------------------------------------------- */

var echartsAverageTariffChartInit = function echartsAverageTariffChartInit() {
    var $averageTariffChartEl = document.querySelector('.average-tariff');
  
    if ($averageTariffChartEl) {
      // Get options from data attribute
      var userOptions = utils.getData($averageTariffChartEl, 'options');
      var chart = window.echarts.init($averageTariffChartEl);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#649E91", "#D199A3", "#4D1A7F", "#9F99D1", "#E29666", "#4D1A7F", "#66AAE2", "#D1B699", "#E2CA66", "#99BDD1", "#CAC8B1"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          backgroundColor: '#fff',
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function formatter(value) {
                return "".concat(value / 1000, "k");
              },
              color: utils.getGrays()['500']
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022',
                   '2023',
                  ]
          },
          series: [{
            name: 'ABUJA',
            type: 'bar',
            stack: 'stack', 
            data: [118203, 213489, 291034, 141970, 311744, 181203, 231489, 291034,],
          }, {
            name: 'BENIN',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
          }, {
            name: 'EKO',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
          }, {
            name: 'ENUGU',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
          }, {
            name: 'IBADAN',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
          }, {
            name: 'IKEJA',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
          }, {
            name: 'JOS',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
          }, {
            name: 'KADUNA',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
          }, {
            name: 'KANO',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
          }, {
            name: 'PH',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
          }, {
            name: 'YOLA',
            type: 'bar',
            stack: 'stack', 
            data: [191325, 231438, 311000, 211594, 341141, 182103, 234189, 291034,],
            itemStyle: {
              barBorderRadius: [10, 10, 0, 0]
            }
          }, {
            type: 'line',
            stack: 'total', 
            smooth: true,
            data: [1191325, 2311438, 3111000, 2115194, 3411411, 1821103, 2341189, 2910314,],
            symbol: 'emptyCircle',
            itemStyle: {
                color: localStorage.getItem('theme') === 'light' ? utils.getGrays().white : utils.getColors().primary
            },
            lineStyle: {
                color: localStorage.getItem('theme') === 'light' ? utils.rgbaColor(utils.getGrays().white, 0.8) : utils.getColors().primary
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: localStorage.getItem('theme') === 'light' ? 'rgba(255, 255, 255, 0.5)' : utils.rgbaColor(utils.getColors().primary, 0.5)
                    }, {
                        offset: 1,
                        color: localStorage.getItem('theme') === 'light' ? 'rgba(255, 255, 255, 0)' : utils.rgbaColor(utils.getColors().primary, 0)
                    }]
                }
            },
            emphasis: {
                lineStyle: {
                    width: 2
                }
            }
        }   
        ],
          grid: {
            right: 15,
            left: '7%',
            bottom: '8%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

/* -------------------------------------------------------------------------- */

/*                             Energy Billed Chart                           */

/* -------------------------------------------------------------------------- */


var EnergyBilledChartInit = function EnergyBilledChartInit() {
    var $echartsEnergyBilledChart = document.querySelector('.energy-billed');
    var dataset = {
        all: [4, 1, 6, 2, 7, 12, 4, 6, 5]
    };
    var labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023',];

    if ($echartsEnergyBilledChart) {
        var userOptions = utils.getData($echartsEnergyBilledChart, 'options');
        var chart = window.echarts.init($echartsEnergyBilledChart);

        var getDefaultOptions = function getDefaultOptions() {
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    padding: [7, 10],
                    backgroundColor: utils.getGrays()['100'],
                    borderColor: utils.getGrays()['300'],
                    borderWidth: 1,
                    transitionDuration: 0,
                    formatter: function formatter(params) {
                        return "".concat(params[0].axisValue, " - ").concat(params[0].value, "%");
                    },
                    textStyle: {
                        fontWeight: 500,
                        fontSize: 12,
                        color: utils.getColors().dark
                    }
                },
                xAxis: {
                    type: 'category',
                    data: labels,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: utils.getGrays()['300'],
                        },
                        interval: 0
                    },
                    axisLine: {
                        lineStyle: {
                            color: utils.getGrays()['300'],
                        }
                    },
                    axisTick: {
                        show: true,
                        length: 10,
                        lineStyle: {
                            color: utils.getGrays()['300'],
                        }
                    },
                    axisLabel: {
                        color: utils.getGrays()['400'],
                        fontWeight: 600,
                        fontSize: 12,
                        interval: window.innerWidth < 768 ? 'auto' : 0,
                        margin: 15
                    },
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    axisPointer: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    }
                },
                series: [{
                    type: 'line',
                    smooth: true,
                    data: dataset.all,
                    symbol: 'emptyCircle',
                    itemStyle: {
                        color: '#2c7be5'
                    },
                    lineStyle: {
                        color: '#2c7be5'
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: localStorage.getItem('theme') === 'light' ? 'rgba(255, 255, 255, 0.5)' : utils.rgbaColor(utils.getColors().primary, 0.5)
                            }, {
                                offset: 1,
                                color: localStorage.getItem('theme') === 'light' ? 'rgba(255, 255, 255, 0)' : utils.rgbaColor(utils.getColors().primary, 0)
                            }]
                        }
                    },
                    emphasis: {
                        lineStyle: {
                            width: 2
                        }
                    }
                }],
                grid: {
                    right: '45px',
                    left: '45px',
                    bottom: '10%',
                    top: '1%'
                }
            };
        };

        echartSetOption(chart, userOptions, getDefaultOptions);
        utils.resize(function() {
            if (window.innerWidth < 768) {
                chart.setOption({
                    xAxis: {
                        axisLabel: {
                            interval: 'auto'
                        }
                    }
                });
            }
        });
    }
};
  
/* -------------------------------------------------------------------------- */

/*              Total Energy Received by Discos(MW)                        */

/* -------------------------------------------------------------------------- */

var echartsEnergyRecievedChartInit = function echartsEnergyRecievedChartInit() {
    var $echartsEnergyRecievedChartEl = document.querySelector('.energy-recieved');
  
    if ($echartsEnergyRecievedChartEl) {
      // Get options from data attribute
      var userOptions = utils.getData($echartsEnergyRecievedChartEl, 'options');
      var chart = window.echarts.init($echartsEnergyRecievedChartEl);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
                color: utils.getGrays()['500'],
              },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2017', '2018', '2019', '2020', '2021', '2022',
                   '2023',
                  ]
          },
          series: [{
            name: 'Naira',
            type: 'bar',
            data: [89, 94, 97, 74, 81, 89, 94,],
            width: "10px",
            showBackground: true,
            backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
            barBorderRadius: [10, 10, 10, 10]
            }
          }, 
        ],
          grid: {
            right: 5,
            left: '7%',
            bottom: '8%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

  /* -------------------------------------------------------------------------- */

/*              Revenue Collected by Discos(MW)                        */

/* -------------------------------------------------------------------------- */

var echartsRevenueCollectedChartInit = function echartsRevenueCollectedChartInit() {
    var $echartsRevenueCollectedChartEl = document.querySelector('.revenue-collected');
  
    if ($echartsRevenueCollectedChartEl) {
      // Get options from data attribute
      var userOptions = utils.getData($echartsRevenueCollectedChartEl, 'options');
      var chart = window.echarts.init($echartsRevenueCollectedChartEl);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
                color: utils.getGrays()['500'],
              },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2017', '2018', '2019', '2020', '2021', '2022',
                   '2023',
                  ]
          },
          series: [{
            name: 'Naira',
            type: 'bar',
            data: [89, 94, 97, 74, 81, 89, 94,],
            showBackground: true,
            backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
            }
          }, 
        ],
        grid: {
          right: 5,
          left: '6%',
          bottom: '20%',
          top: 15,
        }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

    /* -------------------------------------------------------------------------- */

/*                          Revenue Billed by Discos                     */

/* -------------------------------------------------------------------------- */


var echartsRevenueBilledChartInit = function echartsRevenueBilledChartInit() {
    var $echartsRevenueBilledChart = document.querySelector('.revenue-billed');
  
    if ($echartsRevenueBilledChart) {
      var userOptions = utils.getData($echartsRevenueBilledChart, 'options');
      var chart = window.echarts.init($echartsRevenueBilledChart);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#3448f0"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
                color: utils.getGrays()['500'],
              },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2017', '2018', '2019', '2020', '2021', '2022',
                   '2023',
                  ]
          },
          series: [{
            name: 'Naira',
            type: 'bar',
            data: [89, 94, 97, 74, 81, 89, 94,],
            showBackground: true,
            backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
            }
          }, 
        ],
        grid: {
          right: 5,
          left: '6%',
          bottom: '20%',
          top: 15,
        }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

    /* -------------------------------------------------------------------------- */

/*              Installed Capacity Generated(MW)                        */

/* -------------------------------------------------------------------------- */

var echartsInstalledMGCapacityGeneratedChartInit = function echartsInstalledMGCapacityGeneratedChartInit() {
    var $echartsInstalledMGCapacityGeneratedChartEl = document.querySelector('.installed-capacity-mg');
  
    if ($echartsInstalledMGCapacityGeneratedChartEl) {
      // Get options from data attribute
      var userOptions = utils.getData($echartsInstalledMGCapacityGeneratedChartEl, 'options');
      var chart = window.echarts.init($echartsInstalledMGCapacityGeneratedChartEl);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#2c7be5", "#198754"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
                color: utils.getGrays()['500'],
              },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022',
                   '2023',
                  ]
          },
          series: [{
            name: 'Conventional',
            type: 'bar',
            stack: "stack",            
            data: [82, 89, 94, 97, 74, 81, 89, 94,],
            itemStyle: {
              barBorderRadius: [0, 0, 0, 0],
              borderColor: "#000000",
              borderWidth: 0.5,
            },
            showBackground: true,
            backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
            barBorderRadius: [0, 0, 10, 10],
            
            }
          }, {
            name: 'PV',
            type: 'bar', 
            stack: "stack",
            data: [94, 40, 94, 90, 90, 94, 40, 90],
            smooth: true,
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0],
                borderColor: "#000000",
                borderWidth: 0.5,
              },
          }
        ],
          grid: {
            right: 5,
            left: '8%',
            bottom: '8%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

      /* -------------------------------------------------------------------------- */

/*                          People Connected Via Mini-Grids                     */

/* -------------------------------------------------------------------------- */


var echartsPeopleConnectedMGChartInit = function echartsPeopleConnectedMGChartInit() {
    var $echartsPeopleConnectedMGChart = document.querySelector('.people-connected-mg');
  
    if ($echartsPeopleConnectedMGChart) {
      var userOptions = utils.getData($echartsPeopleConnectedMGChart, 'options');
      var chart = window.echarts.init($echartsPeopleConnectedMGChart);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#198754"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          backgroundColor: '#fff',
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function formatter(value) {
                return "".concat(value / 1000, "k");
              },
              color: utils.getGrays()['500']
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
          },
          series: [{
            name: 'Revenue Collected',
            type: 'line', 
            data: [61823, 41389, 49034, 41970, 31174, 81203, 31489, 91034],
            smooth: true,
            itemStyle: {
                width: 4,
                barBorderRadius: [10, 10, 0, 0],
                borderColor: "#000000",
                borderWidth: 1,
              },
          }],
          grid: {
            right: 0,
            left: '8%',
            bottom: '10%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };


      /* -------------------------------------------------------------------------- */

/*                          Communities Connected Via Mini-Grids                     */

/* -------------------------------------------------------------------------- */


var echartsCommunitiesConnectedMGChartInit = function echartsCommunitiesConnectedMGChartInit() {
    var $echartsCommunitiesConnectedMGChart = document.querySelector('.communities-connected-mg');
  
    if ($echartsCommunitiesConnectedMGChart) {
      var userOptions = utils.getData($echartsCommunitiesConnectedMGChart, 'options');
      var chart = window.echarts.init($echartsCommunitiesConnectedMGChart);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#198754"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          backgroundColor: '#fff',
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function formatter(value) {
                return "".concat(value / 1000, "k");
              },
              color: utils.getGrays()['500']
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
          },
          series: [{
            name: 'Revenue Collected',
            type: 'line', 
            data: [61823, 41389, 49034, 41970, 31174, 81203, 31489, 91034],
            smooth: true,
            itemStyle: {
                width: 4,
                barBorderRadius: [10, 10, 0, 0],
                borderColor: "#000000",
                borderWidth: 1,
              },
          }],
          grid: {
            right: 0,
            left: '8%',
            bottom: '10%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

      /* -------------------------------------------------------------------------- */

/*              Metered Vs Unmetered Customer Numbers                        */

/* -------------------------------------------------------------------------- */

var echartsMeteredVsUnmeteredInit = function echartsMeteredVsUnmeteredInit() {
    var $echartsMeteredVsUnmeteredEl = document.querySelector('.metered-unmetered');
  
    if ($echartsMeteredVsUnmeteredEl) {
      // Get options from data attribute
      var userOptions = utils.getData($echartsMeteredVsUnmeteredEl, 'options');
      var chart = window.echarts.init($echartsMeteredVsUnmeteredEl);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: [ "#4a3aff", "#c893fd"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
                color: utils.getGrays()['500'],
              },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022',
                   '2023',
                  ]
          },
          series: [{
            name: 'Conventional',
            type: 'bar',
            stack: "stack",            
            data: [82, 89, 94, 97, 74, 81, 89, 94,],
            itemStyle: {
              barBorderRadius: [0, 0, 0, 0],
              borderColor: "#000000",
              borderWidth: 0.5,
            },
            showBackground: true,
            backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
            barBorderRadius: [0, 0, 10, 10],
            
            }
          }, {
            name: 'PV',
            type: 'bar', 
            stack: "stack",
            data: [94, 40, 94, 90, 90, 94, 40, 90],
            smooth: true,
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0],
                borderColor: "#000000",
                borderWidth: 0.5,
              },
          }
        ],
          grid: {
            right: 5,
            left: '8%',
            bottom: '8%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };

      /* -------------------------------------------------------------------------- */

/*                                      SBT TARIFF                             */

/* -------------------------------------------------------------------------- */

var echartsSBTChartInit = function echartsSBTChartInit() {
    var $echartsSBTChartEl = document.querySelector('.sbt');
  
    if ($echartsSBTChartEl) {
      // Get options from data attribute
      var userOptions = utils.getData($echartsSBTChartEl, 'options');
      var chart = window.echarts.init($echartsSBTChartEl);
  
      var getDefaultOptions = function getDefaultOptions() {
        return {
          color: ["#CFDAE9", "#78AFD5"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            backgroundColor: utils.getGrays()['100'],
            borderColor: utils.getGrays()['300'],
            textStyle: {
              color: utils.getColors().dark,
            },
            borderWidth: 1,
            transitionDuration: 0,
            formatter: tooltipFormatter
          },
          
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
                color: utils.getGrays()['500'],
              },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: utils.getGrays()['200']
              }
            }
          },
          xAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: utils.getGrays()['300'],
                type: 'solid'
              }
            },
            axisLabel: {
              color: utils.getGrays()['500'],
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['Band A', 'Band B', 'Band C', 'Band D', 'Band E',]
          },
          series: [{
            name: 'Conventional',
            type: 'bar',
            stack: "stack",            
            data: [82, 89, 94, 97, 74,],
            itemStyle: {
              barBorderRadius: [0, 0, 0, 0],
              borderColor: "#000000",
              borderWidth: 0.5,
            },
          }, {
            name: 'PV',
            type: 'bar', 
            stack: "stack",
            data: [94, 40, 94, 90, 90,],
            smooth: true,
            itemStyle: {
                barBorderRadius: [10, 10, 0, 0],
                borderColor: "#000000",
                borderWidth: 0.5,
              },
          }
        ],
          grid: {
            right: 5,
            left: '8%',
            bottom: '8%',
            top: 15,
          }
        };
      };
  
      echartSetOption(chart, userOptions, getDefaultOptions);
    }
  };
/* -------------------------------------------------------------------------- */

/*                 Hourly Energy Generated by Gencos Chart                           */

/* -------------------------------------------------------------------------- */


var HourlyEnergyGeneratedChartInit = function HourlyEnergyGeneratedChartInit() {
  var $echartsHourlyEnergyGeneratedChart = document.querySelector('.hourly-energy-generated');
  var dataset = {
      all: [14, 10, 16, 12, 13, 12, 7, 9, 15, 10, 11, 16, 12, 17, 12, 14, 16, 15, 14, 10, 6, 12, 7, 12]
  };
  var labels = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00','8:00', 
  '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00','16:00', '17:00', '18:00', '19:00', '20:00',
   '21:00', '22:00', '23:00'];

  if ($echartsHourlyEnergyGeneratedChart) {
      var userOptions = utils.getData($echartsHourlyEnergyGeneratedChart, 'options');
      var chart = window.echarts.init($echartsHourlyEnergyGeneratedChart);

      var getDefaultOptions = function getDefaultOptions() {
          return {
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'none'
                  },
                  padding: [7, 10],
                  backgroundColor: utils.getGrays()['100'],
                  borderColor: utils.getGrays()['300'],
                  borderWidth: 1,
                  transitionDuration: 0,
                  formatter: function formatter(params) {
                      return "".concat(params[0].axisValue, " - ").concat(params[0].value, "%");
                  },
                  textStyle: {
                      fontWeight: 500,
                      fontSize: 12,
                      color: utils.getColors().dark
                  }
              },
              xAxis: {
                  type: 'category',
                  data: labels,
                  
                  axisLine: {
                      lineStyle: {
                          color: utils.getGrays()['400'],
                      }
                  },
                  axisTick: {
                      show: true,
                      length: 10,
                      lineStyle: {
                          color: utils.getGrays()['300'],
                      }
                  },
                  axisLabel: {
                      color: utils.getGrays()['400'],
                      fontWeight: 600,
                      fontSize: 12,
                      interval: window.innerWidth < 768 ? 'auto' : 0,
                      margin: 15
                  },
                  boundaryGap: false
              },
              yAxis: {
                  type: 'value',
                  axisPointer: {
                      show: false
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                        color: utils.getGrays()['300'],
                    },
                    interval: 0
                },
                  axisLabel: {
                      show: false
                  },
                  axisTick: {
                      show: false
                  },
                  axisLine: {
                      show: false
                  }
              },
              series: [{
                  type: 'line',
                  smooth: true,
                  data: dataset.all,
                  symbol: 'emptyCircle',
                  itemStyle: {
                      color: '#2c7be5'
                  },
                  lineStyle: {
                      color: '#2c7be5'
                  },
                  areaStyle: {
                      color: {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                              offset: 0,
                              color: '#2c7be5'
                          }, {
                              offset: 1,
                              color: localStorage.getItem('theme') === 'light' ? 'rgba(255, 255, 255, 0)' : utils.rgbaColor(utils.getColors().primary, 0)
                          }]
                      }
                  },
                  emphasis: {
                      lineStyle: {
                          width: 2
                      }
                  }
              }],
              grid: {
                  right: '45px',
                  left: '45px',
                  bottom: '10%',
                  top: '1%'
              }
          };
      };

      echartSetOption(chart, userOptions, getDefaultOptions);
      utils.resize(function() {
          if (window.innerWidth < 768) {
              chart.setOption({
                  xAxis: {
                      axisLabel: {
                          interval: 'auto'
                      }
                  }
              });
          }
      });
  }
};

  /* -------------------------------------------------------------------------- */

/*                           Industry KPI Generation  Installed                    */

/* -------------------------------------------------------------------------- */


var echartsInstalledCapacityChartInit = function echartsInstalledCapacityChartInit() {
  var $echartsInstalledCapacityChart = document.querySelector('.installed-capacity');

  if ($echartsInstalledCapacityChart) {
    var userOptions = utils.getData($echartsInstalledCapacityChart, 'options');
    var chart = window.echarts.init($echartsInstalledCapacityChart);

    var getDefaultOptions = function getDefaultOptions() {
      return {
        color: ["#3448f0", "#ff718b"],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: utils.getGrays()['100'],
          borderColor: utils.getGrays()['300'],
          textStyle: {
            color: utils.getColors().dark,
          },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: tooltipFormatter
        },
        backgroundColor: '#fff',
        yAxis: {
          type: 'category',
          axisLabel: {
            formatter: function formatter(value) {
              return "".concat(value / 1000, "k");
            },
            color: utils.getGrays()['500']
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: utils.getGrays()['300'],
              type: 'solid'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: utils.getGrays()['200']
            }
          }
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: utils.getGrays()['300'],
              type: 'solid'
            }
          },
          axisLabel: {
            color: utils.getGrays()['500'],
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: ['2016']
        },
        series: [{
          name: 'Renewable',
          type: 'bar', 
          data: [70],
          smooth: true,
          color: "#78add3",
          itemStyle: {
            barBorderRadius: [0, 0, 0, 0],
            borderColor: "#000000",
            borderWidth: 0.5,
          },
          label: {
            show: true,
            position: 'inside', // Display the label inside the bar
            formatter: '{c}' + "%", // Display the data value
            color: '#000', // White color for better visibility
            fontWeight: 'bold'
          }
        }, {
          name: 'Non-renewable',
          type: 'bar', 
          data: [30],
          smooth: true,
          color: "#caddff",
          itemStyle: {
            barBorderRadius: [0, 0, 0, 0],
            borderColor: "#000000",
            borderWidth: 0.5,
          },
          label: {
            show: true,
            position: 'inside', // Display the label inside the bar
            formatter: '{c}'+ "%", // Display the data value
            color: '#000', // White color for better visibility
            fontWeight: 'bold'
          }
        }],
        grid: {
          right: 15,
          left: '0%',
          bottom: '8%',
          top: 15,
        }
      };
    };

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

  /* -------------------------------------------------------------------------- */

/*                           Industry KPI Generation  Available                    */

/* -------------------------------------------------------------------------- */


var echartsAvailableCapacityChartInit = function echartsAvailableCapacityChartInit() {
  var $echartsAvailableCapacityChart = document.querySelector('.available-capacity');

  if ($echartsAvailableCapacityChart) {
    var userOptions = utils.getData($echartsAvailableCapacityChart, 'options');
    var chart = window.echarts.init($echartsAvailableCapacityChart);

    var getDefaultOptions = function getDefaultOptions() {
      return {
        color: ["#3448f0", "#ff718b"],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: utils.getGrays()['100'],
          borderColor: utils.getGrays()['300'],
          textStyle: {
            color: utils.getColors().dark,
          },
          borderWidth: 1,
          transitionDuration: 0,
          formatter: tooltipFormatter
        },
        backgroundColor: '#fff',
        yAxis: {
          type: 'category',
          axisLabel: {
            formatter: function formatter(value) {
              return "".concat(value / 1000, "k");
            },
            color: utils.getGrays()['500']
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: utils.getGrays()['300'],
              type: 'solid'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
              color: utils.getGrays()['200']
            }
          }
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: utils.getGrays()['300'],
              type: 'solid'
            }
          },
          axisLabel: {
            color: utils.getGrays()['500'],
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: ['2016']
        },
        series: [{
          name: 'Renewable',
          type: 'bar', 
          data: [70],
          smooth: true,
          color: "#78add3",
          itemStyle: {
            barBorderRadius: [0, 0, 0, 0],
            borderColor: "#000000",
            borderWidth: 0.5,
          },
          label: {
            show: true,
            position: 'inside', // Display the label inside the bar
            formatter: '{c}' + "%", // Display the data value
            color: '#000', // White color for better visibility
            fontWeight: 'bold'
          }
        }, {
          name: 'Non-renewable',
          type: 'bar', 
          data: [30],
          smooth: true,
          color: "#caddff",
          itemStyle: {
            barBorderRadius: [0, 0, 0, 0],
            borderColor: "#000000",
            borderWidth: 0.5,
          },
          label: {
            show: true,
            position: 'inside', // Display the label inside the bar
            formatter: '{c}'+ "%", // Display the data value
            color: '#000', // White color for better visibility
            fontWeight: 'bold'
          }
        }],
        grid: {
          right: 15,
          left: '0%',
          bottom: '8%',
          top: 15,
        }
      };
    };

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};


  /* -------------------------------------------------------------------------- */

/*                             Initialization                            */

/* -------------------------------------------------------------------------- */

docReady(echartsBarSeriesChartInit);
docReady(echartsStackedBarSeriesChartInit);
docReady(echartsGencoCapacityChartInit);
docReady(echartsGenerationVsSentChartInit);
docReady(echartsTLFChartInit);
docReady(echartsSystemCollapseChartInit);
docReady(echartsATCnCChartInit);
docReady(echartsAverageTariffChartInit);
docReady(EnergyBilledChartInit);
docReady(HourlyEnergyGeneratedChartInit);
docReady(echartsInstalledCapacityChartInit);
docReady(echartsAvailableCapacityChartInit);
docReady(echartsEnergyRecievedChartInit);
docReady(echartsRevenueCollectedChartInit);
docReady(echartsRevenueBilledChartInit);
docReady(echartsInstalledMGCapacityGeneratedChartInit);
docReady(echartsPeopleConnectedMGChartInit);
docReady(echartsCommunitiesConnectedMGChartInit);
docReady(echartsMeteredVsUnmeteredInit);
docReady(echartsSBTChartInit);





