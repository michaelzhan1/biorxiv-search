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

/***/ "./src/preferences.js":
/*!****************************!*\
  !*** ./src/preferences.js ***!
  \****************************/
/***/ (() => {

eval("const numRegex = /^\\d+$/;\r\n\r\nfunction getId() {\r\n  const queryString = window.location.search;\r\n  const urlParams = new URLSearchParams(queryString);\r\n\r\n  if (!urlParams.get(\"id\")) {\r\n    alert(\"Missing id\");\r\n    window.location.href = \"/index.html\";\r\n    return;\r\n  }\r\n\r\n  if (!numRegex.test(urlParams.get(\"id\"))) {\r\n    alert(\"Invalid id\");\r\n    window.location.href = \"/index.html\";\r\n    return;\r\n  }\r\n\r\n  const id = parseInt(urlParams.get(\"id\"));\r\n  return id;\r\n}\r\n\r\nfunction updatePreferences(e) {\r\n  e.preventDefault();\r\n\r\n  const formData = new FormData(e.target);\r\n  const email = formData.get(\"email\");\r\n  const search = formData.get(\"search\");\r\n\r\n  fetch(`${\"http://localhost:3000\"}/users?id=${id}`, {\r\n    method: \"POST\",\r\n    headers: {\r\n      \"Content-Type\": \"application/json\",\r\n    },\r\n    body: JSON.stringify({\r\n      email: email,\r\n      search: search,\r\n      categories: [],\r\n    }),\r\n  }).then((response) => response.json())\r\n    .then(() => {\r\n      alert(\"Preferences updated\");\r\n    });\r\n}\r\n\r\nfunction deleteUser(e) {\r\n  e.preventDefault();\r\n\r\n  if (!confirm(\"Are you sure you want to delete your account?\")) {\r\n    return;\r\n  }\r\n\r\n  fetch(`${\"http://localhost:3000\"}/users?id=${id}`, {\r\n    method: \"DELETE\",\r\n  }).then(() => {\r\n    alert(\"User deleted\");\r\n    window.location.href = \"/index.html\";\r\n  });\r\n}\r\n\r\nconst id = getId();\r\n\r\n// fetch user data\r\nfetch(`${\"http://localhost:3000\"}/users?id=${id}`)\r\n  .then((response) => response.json())\r\n  .then((userInfo) => {\r\n    if (userInfo.length === 0) {\r\n      alert(\"No user found\");\r\n      window.location.href = \"/index.html\";\r\n      return;\r\n    }\r\n\r\n    const user = userInfo[0];\r\n\r\n    document.getElementById(\"email\").value = user.email;\r\n    document.getElementById(\"search\").value = user.search.split(\";\").join(\" \");\r\n  });\r\n\r\ndocument.getElementById(\"main-form\").addEventListener(\"submit\", updatePreferences);\r\ndocument.getElementById(\"unsubscribe\").addEventListener(\"click\", deleteUser);\n\n//# sourceURL=webpack://fix/./src/preferences.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/preferences.js"]();
/******/ 	
/******/ })()
;