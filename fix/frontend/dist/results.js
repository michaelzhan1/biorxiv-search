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

/***/ "./src/results.js":
/*!************************!*\
  !*** ./src/results.js ***!
  \************************/
/***/ (() => {

eval("const numRegex = /^\\d+$/;\r\n\r\nfunction getId() {\r\n  const queryString = window.location.search;\r\n  const urlParams = new URLSearchParams(queryString);\r\n\r\n  if (!urlParams.get(\"id\")) {\r\n    alert(\"Missing id\");\r\n    window.location.href = \"/index.html\";\r\n    return;\r\n  }\r\n\r\n  if (!numRegex.test(urlParams.get(\"id\"))) {\r\n    alert(\"Invalid id\");\r\n    window.location.href = \"/index.html\";\r\n    return;\r\n  }\r\n\r\n  const id = parseInt(urlParams.get(\"id\"));\r\n  return id;\r\n}\r\n\r\nfunction getDateRange() {\r\n  const today = new Date();\r\n  const lastWeek = new Date(today);\r\n  lastWeek.setDate(lastWeek.getDate() - 7);\r\n\r\n  const todayDay = today.getDate();\r\n  const todayMonth = today.getMonth() + 1;\r\n  const todayYear = today.getFullYear();\r\n\r\n  const lastWeekDay = lastWeek.getDate();\r\n  const lastWeekMonth = lastWeek.getMonth() + 1;\r\n  const lastWeekYear = lastWeek.getFullYear();\r\n\r\n  return [`${lastWeekMonth}/${lastWeekDay}/${lastWeekYear}`, `${todayMonth}/${todayDay}/${todayYear}`];\r\n}\r\n\r\nconst id = getId();\r\n\r\n// header\r\nconst [today, lastWeek] = getDateRange();\r\ndocument.getElementById(\"header\").innerHTML = `Results for ${today} to ${lastWeek}`;\r\n\r\n// fetch user data\r\nfetch(`${\"http://localhost:3000\"}/users?id=${id}`)\r\n  .then((response) => response.json())\r\n  .then((userInfo) => {\r\n    if (userInfo.length === 0) {\r\n      alert(\"No user found\");\r\n      window.location.href = \"/index.html\";\r\n      return;\r\n    }\r\n\r\n    const user = userInfo[0];\r\n    document.getElementById(\"email\").innerHTML = user.email;\r\n    document.getElementById(\"search\").innerHTML = user.search;\r\n    document.getElementById(\"categories\").innerHTML = user.categories;\r\n  });\r\n\r\n\r\n// fetch articles\r\nfetch(`${\"http://localhost:3000\"}/data?id=${id}`)\r\n  .then((response) => response.json())\r\n  .then((articles) => {\r\n    if (articles.length === 0) {\r\n      alert(\"No articles found\");\r\n    }\r\n\r\n    console.log(articles)\r\n\r\n    const articleContainer = document.getElementById(\"article-container\");\r\n    articles.forEach((article) => {\r\n      const articleElement = document.createElement(\"div\");\r\n      articleElement.innerHTML = `\r\n        <h2>${article.title}</h2>\r\n        <p>${article.authors}</p>\r\n        <a href=\"https://doi.org/${article.doi}\">https://doi.org/${article.doi}</a>\r\n        <p>${article.abstract}</p>\r\n      `;\r\n      articleContainer.appendChild(articleElement);\r\n    });\r\n  });\n\n//# sourceURL=webpack://fix/./src/results.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/results.js"]();
/******/ 	
/******/ })()
;