/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	// TODO: need a way to trigger events that propagate downstream from

	const compose = (f, g) => {
	    return (value) => f(g(value));
	};

	const identity = (v) => v;

	const createDispatcher = (dispatchedFunction) => {
	    return (value) => dispatchedFunction(value);
	};

	const createStream = (prevfn = identity, subscribe) => {
	    return {

	        map(fn) {
	            return createStream(compose(fn, prevfn), subscribe);
	        },

	        onValue(fn) {
	            return createDispatcher((value) => {
	                fn(prevfn(value));
	            });
	        }
	    };
	};

	// API

	const dispatch = createStream().map((value) => value + 5)
	                               .map((value) => value * 10)
	                               .onValue(console.log.bind(console));

	dispatch(5);

/***/ }
/******/ ]);