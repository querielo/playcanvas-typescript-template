/*!
 * 
 * Project Id: undefined
 * Branch: master
 * Commit: 9f6735bab1dbe5154df6530edf6ab3a86ba22efb
 * User: {"email":"querielo@protonmail.com","name":"Kirill Osipov"}
 * Date: 2022-12-12T19:50:22.909Z
 *
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/playcanvas/scripts/camera/fly-camera.js":
/*!**************************************************************!*\
  !*** ./node_modules/playcanvas/scripts/camera/fly-camera.js ***!
  \**************************************************************/
/***/ (() => {

eval("var FlyCamera = pc.createScript('flyCamera');\n\nFlyCamera.attributes.add('speed', {\n    type: 'number',\n    default: 10\n});\n\nFlyCamera.attributes.add('fastSpeed', {\n    type: 'number',\n    default: 20\n});\n\nFlyCamera.attributes.add('mode', {\n    type: 'number',\n    default: 0,\n    enum: [{\n        \"Lock\": 0\n    }, {\n        \"Drag\": 1\n    }]\n});\n\nFlyCamera.prototype.initialize = function () {\n    // Camera euler angle rotation around x and y axes\n    var eulers = this.entity.getLocalEulerAngles();\n    this.ex = eulers.x;\n    this.ey = eulers.y;\n    this.moved = false;\n    this.lmbDown = false;\n\n    // Disabling the context menu stops the browser displaying a menu when\n    // you right-click the page\n    this.app.mouse.disableContextMenu();\n    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);\n    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);\n    this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);\n};\n\nFlyCamera.prototype.update = function (dt) {\n    // Update the camera's orientation\n    this.entity.setLocalEulerAngles(this.ex, this.ey, 0);\n\n    var app = this.app;\n\n    var speed = this.speed;\n    if (app.keyboard.isPressed(pc.KEY_SHIFT)) {\n        speed = this.fastSpeed;\n    }\n\n    // Update the camera's position\n    if (app.keyboard.isPressed(pc.KEY_UP) || app.keyboard.isPressed(pc.KEY_W)) {\n        this.entity.translateLocal(0, 0, -speed * dt);\n    } else if (app.keyboard.isPressed(pc.KEY_DOWN) || app.keyboard.isPressed(pc.KEY_S)) {\n        this.entity.translateLocal(0, 0, speed * dt);\n    }\n\n    if (app.keyboard.isPressed(pc.KEY_LEFT) || app.keyboard.isPressed(pc.KEY_A)) {\n        this.entity.translateLocal(-speed * dt, 0, 0);\n    } else if (app.keyboard.isPressed(pc.KEY_RIGHT) || app.keyboard.isPressed(pc.KEY_D)) {\n        this.entity.translateLocal(speed * dt, 0, 0);\n    }\n};\n\nFlyCamera.prototype.onMouseMove = function (event) {\n    if (!this.mode) {\n        if (!pc.Mouse.isPointerLocked())\n            return;\n    } else {\n        if (!this.lmbDown)\n            return;\n    }\n\n\n    // Update the current Euler angles, clamp the pitch.\n    if (!this.moved) {\n        // first move event can be very large\n        this.moved = true;\n        return;\n    }\n    this.ex -= event.dy / 5;\n    this.ex = pc.math.clamp(this.ex, -90, 90);\n    this.ey -= event.dx / 5;\n};\n\nFlyCamera.prototype.onMouseDown = function (event) {\n    if (event.button === 0) {\n        this.lmbDown = true;\n\n        // When the mouse button is clicked try and capture the pointer\n        if (!this.mode && !pc.Mouse.isPointerLocked()) {\n            this.app.mouse.enablePointerLock();\n        }\n    }\n};\n\nFlyCamera.prototype.onMouseUp = function (event) {\n    if (event.button === 0) {\n        this.lmbDown = false;\n    }\n};\n\n\n//# sourceURL=webpack://playcanvas-typescript-template/./node_modules/playcanvas/scripts/camera/fly-camera.js?");

/***/ }),

/***/ "./src/components/fly-camera.ts":
/*!**************************************!*\
  !*** ./src/components/fly-camera.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! playcanvas/scripts/camera/fly-camera */ \"./node_modules/playcanvas/scripts/camera/fly-camera.js\");\n\n\n//# sourceURL=webpack://playcanvas-typescript-template/./src/components/fly-camera.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! ./components/fly-camera */ \"./src/components/fly-camera.ts\");\nconsole.log(\"Hello World!\");\n\n\n//# sourceURL=webpack://playcanvas-typescript-template/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;