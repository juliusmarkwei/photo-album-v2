/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/photos/route";
exports.ids = ["app/api/photos/route"];
exports.modules = {

/***/ "(rsc)/./app/api/photos/route.ts":
/*!*********************************!*\
  !*** ./app/api/photos/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_utils_s3Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/utils/s3Config */ \"(rsc)/./app/utils/s3Config.ts\");\n/* harmony import */ var _app_utils_db_data_source__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/utils/db/data-source */ \"(rsc)/./app/utils/db/data-source.ts\");\n/* harmony import */ var _app_utils_db_entity_Photo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/utils/db/entity/Photo */ \"(rsc)/./app/utils/db/entity/Photo.ts\");\n/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-unused-vars */ \n\n\n\n\nconst BUCKETNAME = \"julius-photo-album-store\";\nconst AWSREGION = \"us-east-1\";\nconst GET = async (request)=>{\n    try {\n        // fetching images from the database -- option 1\n        // const dataSource = await AppDataSource();\n        // if (!dataSource.isInitialized) {\n        //     await dataSource.initialize();\n        // }\n        // const photoRepository = await dataSource.getRepository(Photo).find();\n        // const imageUrls = photoRepository.map((photo) => ({\n        //     \"name\": photo.name,\n        //     \"category\": photo.category,\n        //     \"url\": photo.url,\n        // }));\n        // fetching images from the S3 bucket -- option 2\n        const command = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__.ListObjectsV2Command({\n            Bucket: BUCKETNAME\n        });\n        const { Contents } = await _app_utils_s3Config__WEBPACK_IMPORTED_MODULE_2__.s3Client.send(command);\n        const imageUrls = Contents?.map((obj)=>{\n            const key = obj.Key;\n            const name = key?.split(\"/\")[2].split(\"-\")[1];\n            const category = key?.split(\"/\")[1];\n            const url = `https://${BUCKETNAME}.s3.${AWSREGION}.amazonaws.com/${encodeURIComponent(obj.Key)}`;\n            return {\n                key,\n                name,\n                category,\n                url\n            };\n        }) || [];\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            images: imageUrls\n        });\n    } catch (error) {\n        console.error(\"Error fetching S3 objects:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Failed to retrieve objects\"\n        }, {\n            status: 500\n        });\n    }\n};\nconst DELETE = async (request)=>{\n    try {\n        const dataSource = await (0,_app_utils_db_data_source__WEBPACK_IMPORTED_MODULE_3__.AppDataSource)();\n        if (!dataSource.isInitialized) {\n            await dataSource.initialize();\n        }\n        const searchParams = request.nextUrl.searchParams;\n        const key = searchParams.get(\"key\");\n        console.log(\"Raw key received:\", key);\n        if (!key) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Key parameter is missing\"\n            });\n        }\n        // Decode the key\n        const decodedKey = decodeURIComponent(key);\n        console.log(\"Decoded key:\", decodedKey);\n        const command = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__.DeleteObjectCommand({\n            Bucket: \"julius-photo-album-store\",\n            Key: decodedKey\n        });\n        console.log(\"S3 Delete Command:\", JSON.stringify(command, null, 2));\n        await _app_utils_s3Config__WEBPACK_IMPORTED_MODULE_2__.s3Client.send(command);\n        const photoRepository = dataSource.getRepository(_app_utils_db_entity_Photo__WEBPACK_IMPORTED_MODULE_4__.Photo);\n        console.log(\"Photo key to delete:\", key);\n        const photo = await photoRepository.findOneBy({\n            url: `https://${BUCKETNAME}.s3.${AWSREGION}.amazonaws.com/${encodeURIComponent(key)}`\n        });\n        await photoRepository.remove(photo);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"Error deleting S3 object:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: `Failed to delete object: ${error.name} - ${error.message}`\n        }, {\n            status: error.name === \"NoSuchKey\" ? 404 : 500\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0JJLE1BQU0sQ0FBQ0Y7UUFFN0IsT0FBT2pELHFEQUFZQSxDQUFDNEIsSUFBSSxDQUFDO1lBQ3JCQyxTQUFTO1FBQ2I7SUFDSixFQUFFLE9BQU9FLE9BQVk7UUFDakJDLFFBQVFELEtBQUssQ0FBQyw2QkFBNkJBO1FBQzNDLE9BQU8vQixxREFBWUEsQ0FBQzRCLElBQUksQ0FDcEI7WUFDSUMsU0FBUztZQUNUSSxTQUFTLENBQUMseUJBQXlCLEVBQUVGLE1BQU1SLElBQUksQ0FBQyxHQUFHLEVBQUVRLE1BQU1FLE9BQU8sRUFBRTtRQUN4RSxHQUNBO1lBQUVDLFFBQVFILE1BQU1SLElBQUksS0FBSyxjQUFjLE1BQU07UUFBSTtJQUV6RDtBQUNKLEVBQUUiLCJzb3VyY2VzIjpbIi9ob21lL2p1bGl1cy9Eb2N1bWVudHMvRmlsZXMvQW1hbGl0ZWNoL0xhYnMvYXdzLW1pY29yc2VydmljZS1sYWJzL3dlZWs2L3Bob3RvLWFsYnVtLWFwcC12Mi9hcHAvYXBpL3Bob3Rvcy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IERlbGV0ZU9iamVjdENvbW1hbmQsIExpc3RPYmplY3RzVjJDb21tYW5kIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1zM1wiO1xuaW1wb3J0IHsgczNDbGllbnQgfSBmcm9tIFwiQC9hcHAvdXRpbHMvczNDb25maWdcIjtcbmltcG9ydCB7IEFwcERhdGFTb3VyY2UgfSBmcm9tIFwiQC9hcHAvdXRpbHMvZGIvZGF0YS1zb3VyY2VcIjtcbmltcG9ydCB7IFBob3RvIH0gZnJvbSBcIkAvYXBwL3V0aWxzL2RiL2VudGl0eS9QaG90b1wiO1xuXG5jb25zdCBCVUNLRVROQU1FID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVdTX0JVQ0tFVF9OQU1FO1xuY29uc3QgQVdTUkVHSU9OID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVdTX1JFR0lPTjtcblxuZXhwb3J0IGNvbnN0IEdFVCA9IGFzeW5jIChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIC8vIGZldGNoaW5nIGltYWdlcyBmcm9tIHRoZSBkYXRhYmFzZSAtLSBvcHRpb24gMVxuICAgICAgICAvLyBjb25zdCBkYXRhU291cmNlID0gYXdhaXQgQXBwRGF0YVNvdXJjZSgpO1xuXG4gICAgICAgIC8vIGlmICghZGF0YVNvdXJjZS5pc0luaXRpYWxpemVkKSB7XG4gICAgICAgIC8vICAgICBhd2FpdCBkYXRhU291cmNlLmluaXRpYWxpemUoKTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIGNvbnN0IHBob3RvUmVwb3NpdG9yeSA9IGF3YWl0IGRhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShQaG90bykuZmluZCgpO1xuICAgICAgICAvLyBjb25zdCBpbWFnZVVybHMgPSBwaG90b1JlcG9zaXRvcnkubWFwKChwaG90bykgPT4gKHtcbiAgICAgICAgLy8gICAgIFwibmFtZVwiOiBwaG90by5uYW1lLFxuICAgICAgICAvLyAgICAgXCJjYXRlZ29yeVwiOiBwaG90by5jYXRlZ29yeSxcbiAgICAgICAgLy8gICAgIFwidXJsXCI6IHBob3RvLnVybCxcbiAgICAgICAgLy8gfSkpO1xuXG4gICAgICAgIC8vIGZldGNoaW5nIGltYWdlcyBmcm9tIHRoZSBTMyBidWNrZXQgLS0gb3B0aW9uIDJcbiAgICAgICAgY29uc3QgY29tbWFuZCA9IG5ldyBMaXN0T2JqZWN0c1YyQ29tbWFuZCh7XG4gICAgICAgICAgICBCdWNrZXQ6IEJVQ0tFVE5BTUUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHsgQ29udGVudHMgfSA9IGF3YWl0IHMzQ2xpZW50LnNlbmQoY29tbWFuZCk7XG4gICAgICAgIGNvbnN0IGltYWdlVXJscyA9XG4gICAgICAgICAgICBDb250ZW50cz8ubWFwKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBvYmouS2V5O1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBrZXk/LnNwbGl0KFwiL1wiKVsyXS5zcGxpdChcIi1cIilbMV07XG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBrZXk/LnNwbGl0KFwiL1wiKVsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly8ke0JVQ0tFVE5BTUV9LnMzLiR7QVdTUkVHSU9OfS5hbWF6b25hd3MuY29tLyR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgICAgICAgICAgICBvYmouS2V5IVxuICAgICAgICAgICAgICAgICl9YDtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBrZXksIG5hbWUsIGNhdGVnb3J5LCB1cmwgfTtcbiAgICAgICAgICAgIH0pIHx8IFtdO1xuXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgaW1hZ2VzOiBpbWFnZVVybHMsXG4gICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBTMyBvYmplY3RzOlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkZhaWxlZCB0byByZXRyaWV2ZSBvYmplY3RzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgICAgICk7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IERFTEVURSA9IGFzeW5jIChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGFTb3VyY2UgPSBhd2FpdCBBcHBEYXRhU291cmNlKCk7XG5cbiAgICAgICAgaWYgKCFkYXRhU291cmNlLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IGRhdGFTb3VyY2UuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gcmVxdWVzdC5uZXh0VXJsLnNlYXJjaFBhcmFtcztcbiAgICAgICAgY29uc3Qga2V5ID0gc2VhcmNoUGFyYW1zLmdldChcImtleVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJSYXcga2V5IHJlY2VpdmVkOlwiLCBrZXkpO1xuXG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiS2V5IHBhcmFtZXRlciBpcyBtaXNzaW5nXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlY29kZSB0aGUga2V5XG4gICAgICAgIGNvbnN0IGRlY29kZWRLZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa2V5KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGVkIGtleTpcIiwgZGVjb2RlZEtleSk7XG5cbiAgICAgICAgY29uc3QgY29tbWFuZCA9IG5ldyBEZWxldGVPYmplY3RDb21tYW5kKHtcbiAgICAgICAgICAgIEJ1Y2tldDogXCJqdWxpdXMtcGhvdG8tYWxidW0tc3RvcmVcIixcbiAgICAgICAgICAgIEtleTogZGVjb2RlZEtleSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJTMyBEZWxldGUgQ29tbWFuZDpcIiwgSlNPTi5zdHJpbmdpZnkoY29tbWFuZCwgbnVsbCwgMikpO1xuICAgICAgICBhd2FpdCBzM0NsaWVudC5zZW5kKGNvbW1hbmQpO1xuXG4gICAgICAgIGNvbnN0IHBob3RvUmVwb3NpdG9yeSA9IGRhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShQaG90byk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGhvdG8ga2V5IHRvIGRlbGV0ZTpcIiwga2V5KTtcbiAgICAgICAgY29uc3QgcGhvdG8gPSBhd2FpdCBwaG90b1JlcG9zaXRvcnkuZmluZE9uZUJ5KHtcbiAgICAgICAgICAgIHVybDogYGh0dHBzOi8vJHtCVUNLRVROQU1FfS5zMy4ke0FXU1JFR0lPTn0uYW1hem9uYXdzLmNvbS8ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICAgICAgICBrZXlcbiAgICAgICAgICAgICl9YCxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHBob3RvUmVwb3NpdG9yeS5yZW1vdmUocGhvdG8pO1xuXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkZWxldGluZyBTMyBvYmplY3Q6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBGYWlsZWQgdG8gZGVsZXRlIG9iamVjdDogJHtlcnJvci5uYW1lfSAtICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgc3RhdHVzOiBlcnJvci5uYW1lID09PSBcIk5vU3VjaEtleVwiID8gNDA0IDogNTAwIH1cbiAgICAgICAgKTtcbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIkRlbGV0ZU9iamVjdENvbW1hbmQiLCJMaXN0T2JqZWN0c1YyQ29tbWFuZCIsInMzQ2xpZW50IiwiQXBwRGF0YVNvdXJjZSIsIlBob3RvIiwiQlVDS0VUTkFNRSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19BV1NfQlVDS0VUX05BTUUiLCJBV1NSRUdJT04iLCJORVhUX1BVQkxJQ19BV1NfUkVHSU9OIiwiR0VUIiwicmVxdWVzdCIsImNvbW1hbmQiLCJCdWNrZXQiLCJDb250ZW50cyIsInNlbmQiLCJpbWFnZVVybHMiLCJtYXAiLCJvYmoiLCJrZXkiLCJLZXkiLCJuYW1lIiwic3BsaXQiLCJjYXRlZ29yeSIsInVybCIsImVuY29kZVVSSUNvbXBvbmVudCIsImpzb24iLCJzdWNjZXNzIiwiaW1hZ2VzIiwiZXJyb3IiLCJjb25zb2xlIiwibWVzc2FnZSIsInN0YXR1cyIsIkRFTEVURSIsImRhdGFTb3VyY2UiLCJpc0luaXRpYWxpemVkIiwiaW5pdGlhbGl6ZSIsInNlYXJjaFBhcmFtcyIsIm5leHRVcmwiLCJnZXQiLCJsb2ciLCJkZWNvZGVkS2V5IiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsInBob3RvUmVwb3NpdG9yeSIsImdldFJlcG9zaXRvcnkiLCJwaG90byIsImZpbmRPbmVCeSIsInJlbW92ZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/photos/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/utils/db/data-source.ts":
/*!*************************************!*\
  !*** ./app/utils/db/data-source.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppDataSource: () => (/* binding */ AppDataSource)\n/* harmony export */ });\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ \"(rsc)/./node_modules/reflect-metadata/Reflect.js\");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ \"(rsc)/./node_modules/typeorm/index.mjs\");\n/* harmony import */ var _entity_Photo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity/Photo */ \"(rsc)/./app/utils/db/entity/Photo.ts\");\n/* harmony import */ var _parameterStoreConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../parameterStoreConfig */ \"(rsc)/./app/utils/parameterStoreConfig.ts\");\n\n\n\n\nconst AppDataSource = async ()=>{\n    const { username, password, host, dbName, port } = await (0,_parameterStoreConfig__WEBPACK_IMPORTED_MODULE_3__.getDbCredentials)();\n    return new typeorm__WEBPACK_IMPORTED_MODULE_1__.DataSource({\n        type: \"postgres\",\n        host,\n        port: Number(port),\n        username,\n        password,\n        database: dbName,\n        synchronize: false,\n        logging: false,\n        entities: [\n            _entity_Photo__WEBPACK_IMPORTED_MODULE_2__.Photo\n        ],\n        ssl: {\n            rejectUnauthorized: false\n        },\n        migrations: [],\n        subscribers: []\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvdXRpbHMvZGIvZGF0YS1zb3VyY2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTBCO0FBQ1c7QUFDRTtBQUNvQjtBQUVwRCxNQUFNRyxnQkFBZ0I7SUFDekIsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLFFBQVEsRUFBRUMsSUFBSSxFQUFFQyxNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHLE1BQU1OLHVFQUFnQkE7SUFDekUsT0FBTyxJQUFJRiwrQ0FBVUEsQ0FBQztRQUNsQlMsTUFBTTtRQUNOSDtRQUNBRSxNQUFNRSxPQUFPRjtRQUNiSjtRQUNBQztRQUNBTSxVQUFVSjtRQUNWSyxhQUFhO1FBQ2JDLFNBQVM7UUFDVEMsVUFBVTtZQUFDYixnREFBS0E7U0FBQztRQUNqQmMsS0FBSztZQUNEQyxvQkFBb0I7UUFDeEI7UUFDQUMsWUFBWSxFQUFFO1FBQ2RDLGFBQWEsRUFBRTtJQUNuQjtBQUNKLEVBQUUiLCJzb3VyY2VzIjpbIi9ob21lL2p1bGl1cy9Eb2N1bWVudHMvRmlsZXMvQW1hbGl0ZWNoL0xhYnMvYXdzLW1pY29yc2VydmljZS1sYWJzL3dlZWs2L3Bob3RvLWFsYnVtLWFwcC12Mi9hcHAvdXRpbHMvZGIvZGF0YS1zb3VyY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCJ0eXBlb3JtXCI7XG5pbXBvcnQgeyBQaG90byB9IGZyb20gXCIuL2VudGl0eS9QaG90b1wiO1xuaW1wb3J0IHsgZ2V0RGJDcmVkZW50aWFscyB9IGZyb20gXCIuLi9wYXJhbWV0ZXJTdG9yZUNvbmZpZ1wiO1xuXG5leHBvcnQgY29uc3QgQXBwRGF0YVNvdXJjZSA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCwgaG9zdCwgZGJOYW1lLCBwb3J0IH0gPSBhd2FpdCBnZXREYkNyZWRlbnRpYWxzKCk7XG4gICAgcmV0dXJuIG5ldyBEYXRhU291cmNlKHtcbiAgICAgICAgdHlwZTogXCJwb3N0Z3Jlc1wiLFxuICAgICAgICBob3N0LFxuICAgICAgICBwb3J0OiBOdW1iZXIocG9ydCksXG4gICAgICAgIHVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgZGF0YWJhc2U6IGRiTmFtZSxcbiAgICAgICAgc3luY2hyb25pemU6IGZhbHNlLFxuICAgICAgICBsb2dnaW5nOiBmYWxzZSxcbiAgICAgICAgZW50aXRpZXM6IFtQaG90b10sXG4gICAgICAgIHNzbDoge1xuICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgbWlncmF0aW9uczogW10sXG4gICAgICAgIHN1YnNjcmliZXJzOiBbXSxcbiAgICB9KTtcbn07XG4iXSwibmFtZXMiOlsiRGF0YVNvdXJjZSIsIlBob3RvIiwiZ2V0RGJDcmVkZW50aWFscyIsIkFwcERhdGFTb3VyY2UiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiaG9zdCIsImRiTmFtZSIsInBvcnQiLCJ0eXBlIiwiTnVtYmVyIiwiZGF0YWJhc2UiLCJzeW5jaHJvbml6ZSIsImxvZ2dpbmciLCJlbnRpdGllcyIsInNzbCIsInJlamVjdFVuYXV0aG9yaXplZCIsIm1pZ3JhdGlvbnMiLCJzdWJzY3JpYmVycyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/utils/db/data-source.ts\n");

/***/ }),

/***/ "(rsc)/./app/utils/db/entity/Photo.ts":
/*!**************************************!*\
  !*** ./app/utils/db/entity/Photo.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Photo: () => (/* binding */ Photo)\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swc/helpers/_/_ts_metadata */ \"(rsc)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typeorm */ \"(rsc)/./node_modules/typeorm/index.mjs\");\n\n\n\nclass Photo {\n}\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.PrimaryGeneratedColumn)(),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Number)\n], Photo.prototype, \"id\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({\n        length: 100\n    }),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", String)\n], Photo.prototype, \"name\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)(\"text\"),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", String)\n], Photo.prototype, \"description\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)(),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", String)\n], Photo.prototype, \"category\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)(),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", String)\n], Photo.prototype, \"url\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({\n        type: \"timestamp\",\n        default: ()=>\"CURRENT_TIMESTAMP\"\n    }),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", typeof Date === \"undefined\" ? Object : Date)\n], Photo.prototype, \"uploadedAt\", void 0);\nPhoto = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Entity)()\n], Photo);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvdXRpbHMvZGIvZW50aXR5L1Bob3RvLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQWlFO0FBRzFELE1BQU1HO0FBb0JiOzs7Ozs7O1FBZlFDLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWFGQyxNQUFNO1FBQWFDLFNBQVMsSUFBTSIsInNvdXJjZXMiOlsiL2hvbWUvanVsaXVzL0RvY3VtZW50cy9GaWxlcy9BbWFsaXRlY2gvTGFicy9hd3MtbWljb3JzZXJ2aWNlLWxhYnMvd2VlazYvcGhvdG8tYWxidW0tYXBwLXYyL2FwcC91dGlscy9kYi9lbnRpdHkvUGhvdG8udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5LCBDb2x1bW4sIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4gfSBmcm9tIFwidHlwZW9ybVwiO1xuXG5ARW50aXR5KClcbmV4cG9ydCBjbGFzcyBQaG90byB7XG4gICAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICAgIGlkOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHtcbiAgICAgICAgbGVuZ3RoOiAxMDAsXG4gICAgfSlcbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKFwidGV4dFwiKVxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKClcbiAgICBjYXRlZ29yeTogc3RyaW5nO1xuXG4gICAgQENvbHVtbigpXG4gICAgdXJsOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHsgdHlwZTogXCJ0aW1lc3RhbXBcIiwgZGVmYXVsdDogKCkgPT4gXCJDVVJSRU5UX1RJTUVTVEFNUFwiIH0pXG4gICAgdXBsb2FkZWRBdDogRGF0ZTtcbn1cbiJdLCJuYW1lcyI6WyJFbnRpdHkiLCJDb2x1bW4iLCJQcmltYXJ5R2VuZXJhdGVkQ29sdW1uIiwiUGhvdG8iLCJsZW5ndGgiLCJ0eXBlIiwiZGVmYXVsdCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/utils/db/entity/Photo.ts\n");

/***/ }),

/***/ "(rsc)/./app/utils/parameterStoreConfig.ts":
/*!*******************************************!*\
  !*** ./app/utils/parameterStoreConfig.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getDbCredentials: () => (/* binding */ getDbCredentials)\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"(rsc)/./node_modules/aws-sdk/lib/aws.js\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable @typescript-eslint/no-unused-vars */ \nconst secretsManager = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.SecretsManager({\n    region: \"us-east-1\"\n});\nconst getSecret = async (secretId)=>{\n    try {\n        const data = await secretsManager.getSecretValue({\n            SecretId: secretId\n        }).promise();\n        return data.SecretString;\n    } catch (error) {\n        throw new Error(\"Unable to retrieve secret\");\n    }\n};\nconst getDbCredentials = async ()=>{\n    const secretString = await getSecret(\"julius-photoalbum-credentials\");\n    const { username, password, dbname, port, host } = JSON.parse(secretString);\n    return {\n        username,\n        password,\n        host,\n        dbName: dbname,\n        port: port || 5432\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvdXRpbHMvcGFyYW1ldGVyU3RvcmVDb25maWcudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQW9ELEdBQ3JCO0FBRS9CLE1BQU1DLGlCQUFpQixJQUFJRCxtREFBa0IsQ0FBQztJQUMxQ0csUUFBUTtBQUNaO0FBRUEsTUFBTUMsWUFBWSxPQUFPQztJQUNyQixJQUFJO1FBQ0EsTUFBTUMsT0FBTyxNQUFNTCxlQUNkTSxjQUFjLENBQUM7WUFBRUMsVUFBVUg7UUFBUyxHQUNwQ0ksT0FBTztRQUNaLE9BQU9ILEtBQUtJLFlBQVk7SUFDNUIsRUFBRSxPQUFPQyxPQUFPO1FBQ1osTUFBTSxJQUFJQyxNQUFNO0lBQ3BCO0FBQ0o7QUFFTyxNQUFNQyxtQkFBbUI7SUFDNUIsTUFBTUMsZUFBZSxNQUFNVixVQUFVO0lBQ3JDLE1BQU0sRUFBRVcsUUFBUSxFQUFFQyxRQUFRLEVBQUVDLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxJQUFJLEVBQUUsR0FBR0MsS0FBS0MsS0FBSyxDQUFDUDtJQUM5RCxPQUFPO1FBQ0hDO1FBQ0FDO1FBQ0FHO1FBQ0FHLFFBQVFMO1FBQ1JDLE1BQU1BLFFBQVE7SUFDbEI7QUFDSixFQUFFIiwic291cmNlcyI6WyIvaG9tZS9qdWxpdXMvRG9jdW1lbnRzL0ZpbGVzL0FtYWxpdGVjaC9MYWJzL2F3cy1taWNvcnNlcnZpY2UtbGFicy93ZWVrNi9waG90by1hbGJ1bS1hcHAtdjIvYXBwL3V0aWxzL3BhcmFtZXRlclN0b3JlQ29uZmlnLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0ICogYXMgQVdTIGZyb20gXCJhd3Mtc2RrXCI7XG5cbmNvbnN0IHNlY3JldHNNYW5hZ2VyID0gbmV3IEFXUy5TZWNyZXRzTWFuYWdlcih7XG4gICAgcmVnaW9uOiBcInVzLWVhc3QtMVwiLFxufSk7XG5cbmNvbnN0IGdldFNlY3JldCA9IGFzeW5jIChzZWNyZXRJZDogc3RyaW5nKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHNlY3JldHNNYW5hZ2VyXG4gICAgICAgICAgICAuZ2V0U2VjcmV0VmFsdWUoeyBTZWNyZXRJZDogc2VjcmV0SWQgfSlcbiAgICAgICAgICAgIC5wcm9taXNlKCk7XG4gICAgICAgIHJldHVybiBkYXRhLlNlY3JldFN0cmluZztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gcmV0cmlldmUgc2VjcmV0XCIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXREYkNyZWRlbnRpYWxzID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHNlY3JldFN0cmluZyA9IGF3YWl0IGdldFNlY3JldChcImp1bGl1cy1waG90b2FsYnVtLWNyZWRlbnRpYWxzXCIpO1xuICAgIGNvbnN0IHsgdXNlcm5hbWUsIHBhc3N3b3JkLCBkYm5hbWUsIHBvcnQsIGhvc3QgfSA9IEpTT04ucGFyc2Uoc2VjcmV0U3RyaW5nKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIGhvc3QsXG4gICAgICAgIGRiTmFtZTogZGJuYW1lLFxuICAgICAgICBwb3J0OiBwb3J0IHx8IDU0MzIsXG4gICAgfTtcbn07XG4iXSwibmFtZXMiOlsiQVdTIiwic2VjcmV0c01hbmFnZXIiLCJTZWNyZXRzTWFuYWdlciIsInJlZ2lvbiIsImdldFNlY3JldCIsInNlY3JldElkIiwiZGF0YSIsImdldFNlY3JldFZhbHVlIiwiU2VjcmV0SWQiLCJwcm9taXNlIiwiU2VjcmV0U3RyaW5nIiwiZXJyb3IiLCJFcnJvciIsImdldERiQ3JlZGVudGlhbHMiLCJzZWNyZXRTdHJpbmciLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZGJuYW1lIiwicG9ydCIsImhvc3QiLCJKU09OIiwicGFyc2UiLCJkYk5hbWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/utils/parameterStoreConfig.ts\n");

/***/ }),

/***/ "(rsc)/./app/utils/s3Config.ts":
/*!*******************************!*\
  !*** ./app/utils/s3Config.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   s3Client: () => (/* binding */ s3Client)\n/* harmony export */ });\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__);\n\nconst s3Client = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_0__.S3Client({\n    region: \"us-east-1\"\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvdXRpbHMvczNDb25maWcudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQThDO0FBRXZDLE1BQU1DLFdBQVcsSUFBSUQsd0RBQVFBLENBQUM7SUFDakNFLFFBQVFDLFdBQWtDO0FBQzlDLEdBQUciLCJzb3VyY2VzIjpbIi9ob21lL2p1bGl1cy9Eb2N1bWVudHMvRmlsZXMvQW1hbGl0ZWNoL0xhYnMvYXdzLW1pY29yc2VydmljZS1sYWJzL3dlZWs2L3Bob3RvLWFsYnVtLWFwcC12Mi9hcHAvdXRpbHMvczNDb25maWcudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUzNDbGllbnQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LXMzXCI7XG5cbmV4cG9ydCBjb25zdCBzM0NsaWVudCA9IG5ldyBTM0NsaWVudCh7XG4gICAgcmVnaW9uOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BV1NfUkVHSU9OISxcbn0pO1xuIl0sIm5hbWVzIjpbIlMzQ2xpZW50IiwiczNDbGllbnQiLCJyZWdpb24iLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVdTX1JFR0lPTiJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/utils/s3Config.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/app-root-path/lib sync recursive":
/*!**********************************************!*\
  !*** ./node_modules/app-root-path/lib/ sync ***!
  \**********************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/app-root-path/lib sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fphotos%2Froute&page=%2Fapi%2Fphotos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fphotos%2Froute.ts&appDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fphotos%2Froute&page=%2Fapi%2Fphotos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fphotos%2Froute.ts&appDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_julius_Documents_Files_Amalitech_Labs_aws_micorservice_labs_week6_photo_album_app_v2_app_api_photos_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/photos/route.ts */ \"(rsc)/./app/api/photos/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/photos/route\",\n        pathname: \"/api/photos\",\n        filename: \"route\",\n        bundlePath: \"app/api/photos/route\"\n    },\n    resolvedPagePath: \"/home/julius/Documents/Files/Amalitech/Labs/aws-micorservice-labs/week6/photo-album-app-v2/app/api/photos/route.ts\",\n    nextConfigOutput,\n    userland: _home_julius_Documents_Files_Amalitech_Labs_aws_micorservice_labs_week6_photo_album_app_v2_app_api_photos_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwaG90b3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnBob3RvcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnBob3RvcyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGanVsaXVzJTJGRG9jdW1lbnRzJTJGRmlsZXMlMkZBbWFsaXRlY2glMkZMYWJzJTJGYXdzLW1pY29yc2VydmljZS1sYWJzJTJGd2VlazYlMkZwaG90by1hbGJ1bS1hcHAtdjIlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZqdWxpdXMlMkZEb2N1bWVudHMlMkZGaWxlcyUyRkFtYWxpdGVjaCUyRkxhYnMlMkZhd3MtbWljb3JzZXJ2aWNlLWxhYnMlMkZ3ZWVrNiUyRnBob3RvLWFsYnVtLWFwcC12MiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDa0U7QUFDL0k7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL2p1bGl1cy9Eb2N1bWVudHMvRmlsZXMvQW1hbGl0ZWNoL0xhYnMvYXdzLW1pY29yc2VydmljZS1sYWJzL3dlZWs2L3Bob3RvLWFsYnVtLWFwcC12Mi9hcHAvYXBpL3Bob3Rvcy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcGhvdG9zL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcGhvdG9zXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9waG90b3Mvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS9qdWxpdXMvRG9jdW1lbnRzL0ZpbGVzL0FtYWxpdGVjaC9MYWJzL2F3cy1taWNvcnNlcnZpY2UtbGFicy93ZWVrNi9waG90by1hbGJ1bS1hcHAtdjIvYXBwL2FwaS9waG90b3Mvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fphotos%2Froute&page=%2Fapi%2Fphotos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fphotos%2Froute.ts&appDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./node_modules/typeorm/connection sync recursive":
/*!***********************************************!*\
  !*** ./node_modules/typeorm/connection/ sync ***!
  \***********************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/typeorm/connection sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/typeorm/platform sync recursive":
/*!*********************************************!*\
  !*** ./node_modules/typeorm/platform/ sync ***!
  \*********************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/typeorm/platform sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(rsc)/./node_modules/typeorm/util sync recursive":
/*!*****************************************!*\
  !*** ./node_modules/typeorm/util/ sync ***!
  \*****************************************/
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = "(rsc)/./node_modules/typeorm/util sync recursive";
module.exports = webpackEmptyContext;

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?08c5":
/*!**************************!*\
  !*** hdb-pool (ignored) ***!
  \**************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?1c85":
/*!***********************!*\
  !*** mssql (ignored) ***!
  \***********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?2e9b":
/*!*************************!*\
  !*** ioredis (ignored) ***!
  \*************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?3288":
/*!************************************************!*\
  !*** typeorm-aurora-data-api-driver (ignored) ***!
  \************************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?436d":
/*!************************!*\
  !*** sql.js (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?6699":
/*!********************************!*\
  !*** better-sqlite3 (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66f8":
/*!***************************************!*\
  !*** @google-cloud/spanner (ignored) ***!
  \***************************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?6b11":
/*!**************************!*\
  !*** oracledb (ignored) ***!
  \**************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?6f2f":
/*!*************************!*\
  !*** sqlite3 (ignored) ***!
  \*************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?8b85":
/*!*************************!*\
  !*** mongodb (ignored) ***!
  \*************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?a096":
/*!**********************************!*\
  !*** @sap/hana-client (ignored) ***!
  \**********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?deb4":
/*!************************!*\
  !*** mysql2 (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?ecb3":
/*!***************************!*\
  !*** pg-native (ignored) ***!
  \***************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?f901":
/*!***********************!*\
  !*** redis (ignored) ***!
  \***********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dgram":
/*!************************!*\
  !*** external "dgram" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("dgram");

/***/ }),

/***/ "domain":
/*!*************************!*\
  !*** external "domain" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("domain");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "module":
/*!*************************!*\
  !*** external "module" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("module");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:string_decoder":
/*!**************************************!*\
  !*** external "node:string_decoder" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:string_decoder");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("pg");

/***/ }),

/***/ "pg/lib/result.js":
/*!***********************************!*\
  !*** external "pg/lib/result.js" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("pg/lib/result.js");

/***/ }),

/***/ "pg/lib/utils.js":
/*!**********************************!*\
  !*** external "pg/lib/utils.js" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("pg/lib/utils.js");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/reflect-metadata","vendor-chunks/aws-sdk","vendor-chunks/typeorm","vendor-chunks/xmlbuilder","vendor-chunks/glob","vendor-chunks/sha.js","vendor-chunks/xml2js","vendor-chunks/debug","vendor-chunks/sql-highlight","vendor-chunks/app-root-path","vendor-chunks/inherits","vendor-chunks/dotenv","vendor-chunks/tslib","vendor-chunks/path-scurry","vendor-chunks/minipass","vendor-chunks/lru-cache","vendor-chunks/supports-color","vendor-chunks/sax","vendor-chunks/safe-buffer","vendor-chunks/pg-query-stream","vendor-chunks/pg-cursor","vendor-chunks/ms","vendor-chunks/jmespath","vendor-chunks/has-flag","vendor-chunks/dayjs","vendor-chunks/balanced-match","vendor-chunks/ansis"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fphotos%2Froute&page=%2Fapi%2Fphotos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fphotos%2Froute.ts&appDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();