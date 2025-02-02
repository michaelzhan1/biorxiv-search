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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("function handleSubmit(e) {\r\n  e.preventDefault();\r\n\r\n  const formData = new FormData(e.target);\r\n  const email = formData.get(\"email\");\r\n  const search = formData.get(\"search\");\r\n\r\n  fetch(\"http://localhost:3000\" + \"/users\", {\r\n    method: \"POST\",\r\n    headers: {\r\n      \"Content-Type\": \"application/json\",\r\n    },\r\n    body: JSON.stringify({\r\n      email: email,\r\n      search: search,\r\n      categories: [],\r\n    }),\r\n  }).then((response) => {\r\n    if (response.ok) {\r\n      alert(\"User created/updated successfully\");\r\n    } else {\r\n      alert(\"An error occurred\");\r\n    }\r\n  });\r\n}\r\n\r\nconst form = document.getElementById(\"main-form\");\r\nform.addEventListener(\"submit\", handleSubmit);\r\n\n\n//# sourceURL=webpack://fix/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;