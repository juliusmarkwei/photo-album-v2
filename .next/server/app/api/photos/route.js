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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _app_utils_s3Config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/utils/s3Config */ \"(rsc)/./app/utils/s3Config.ts\");\n/* harmony import */ var _app_utils_db_data_source__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/utils/db/data-source */ \"(rsc)/./app/utils/db/data-source.ts\");\n/* harmony import */ var _app_utils_db_entity_Photo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/utils/db/entity/Photo */ \"(rsc)/./app/utils/db/entity/Photo.ts\");\n/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-unused-vars */ \n\n\n\n\nconst BUCKETNAME = \"julius-photo-album-store\";\nconst AWSREGION = \"us-east-1\";\nconst GET = async (request)=>{\n    try {\n        // fetching images from the database -- option 1\n        // const dataSource = await AppDataSource();\n        // if (!dataSource.isInitialized) {\n        //     await dataSource.initialize();\n        // }\n        // const photoRepository = await dataSource.getRepository(Photo).find();\n        // const imageUrls = photoRepository.map((photo) => ({\n        //     key: photo.url.split(\"/\").pop(),\n        //     name: photo.name,\n        //     category: photo.category,\n        //     url: photo.url,\n        // }));\n        // fetching images from the S3 bucket -- option 2\n        const command = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__.ListObjectsV2Command({\n            Bucket: BUCKETNAME\n        });\n        const { Contents } = await _app_utils_s3Config__WEBPACK_IMPORTED_MODULE_2__.s3Client.send(command);\n        const imageUrls = Contents?.map((obj)=>{\n            const key = obj.Key;\n            const name = key?.split(\"/\")[2].split(\"-\")[1];\n            const category = key?.split(\"/\")[1];\n            const url = `https://${BUCKETNAME}.s3.${AWSREGION}.amazonaws.com/${encodeURIComponent(obj.Key)}`;\n            return {\n                key,\n                name,\n                category,\n                url\n            };\n        }) || [];\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            images: imageUrls\n        });\n    } catch (error) {\n        console.error(\"Error fetching S3 objects:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Failed to retrieve objects\"\n        }, {\n            status: 500\n        });\n    }\n};\nconst DELETE = async (request)=>{\n    try {\n        const dataSource = await (0,_app_utils_db_data_source__WEBPACK_IMPORTED_MODULE_3__.AppDataSource)();\n        if (!dataSource.isInitialized) {\n            await dataSource.initialize();\n        }\n        const searchParams = request.nextUrl.searchParams;\n        const key = searchParams.get(\"key\");\n        console.log(\"Raw key received:\", key);\n        if (!key) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: \"Key parameter is missing\"\n            });\n        }\n        // Decode the key\n        const decodedKey = decodeURIComponent(key);\n        console.log(\"Decoded key:\", decodedKey);\n        const command = new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_1__.DeleteObjectCommand({\n            Bucket: \"julius-photo-album-store\",\n            Key: decodedKey\n        });\n        console.log(\"S3 Delete Command:\", JSON.stringify(command, null, 2));\n        await _app_utils_s3Config__WEBPACK_IMPORTED_MODULE_2__.s3Client.send(command);\n        const photoRepository = dataSource.getRepository(_app_utils_db_entity_Photo__WEBPACK_IMPORTED_MODULE_4__.Photo);\n        console.log(\"Photo key to delete:\", key);\n        const photo = await photoRepository.findOneBy({\n            url: `https://${BUCKETNAME}.s3.${AWSREGION}.amazonaws.com/${key}`\n        });\n        await photoRepository.remove(photo);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"Error deleting S3 object:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: `Failed to delete object: ${error.name} - ${error.message}`\n        }, {\n            status: error.name === \"NoSuchKey\" ? 404 : 500\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGdCQUFnQkksTUFBTSxDQUFDRjtRQUU3QixPQUFPakQscURBQVlBLENBQUM0QixJQUFJLENBQUM7WUFDckJDLFNBQVM7UUFDYjtJQUNKLEVBQUUsT0FBT0UsT0FBWTtRQUNqQkMsUUFBUUQsS0FBSyxDQUFDLDZCQUE2QkE7UUFDM0MsT0FBTy9CLHFEQUFZQSxDQUFDNEIsSUFBSSxDQUNwQjtZQUNJQyxTQUFTO1lBQ1RJLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRUYsTUFBTVIsSUFBSSxDQUFDLEdBQUcsRUFBRVEsTUFBTUUsT0FBTyxFQUFFO1FBQ3hFLEdBQ0E7WUFBRUMsUUFBUUgsTUFBTVIsSUFBSSxLQUFLLGNBQWMsTUFBTTtRQUFJO0lBRXpEO0FBQ0osRUFBRSIsInNvdXJjZXMiOlsiL2hvbWUvanVsaXVzL0RvY3VtZW50cy9GaWxlcy9BbWFsaXRlY2gvTGFicy9hd3MtbWljb3JzZXJ2aWNlLWxhYnMvd2VlazYvcGhvdG8tYWxidW0tYXBwLXYyL2FwcC9hcGkvcGhvdG9zL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgRGVsZXRlT2JqZWN0Q29tbWFuZCwgTGlzdE9iamVjdHNWMkNvbW1hbmQgfSBmcm9tIFwiQGF3cy1zZGsvY2xpZW50LXMzXCI7XG5pbXBvcnQgeyBzM0NsaWVudCB9IGZyb20gXCJAL2FwcC91dGlscy9zM0NvbmZpZ1wiO1xuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCJAL2FwcC91dGlscy9kYi9kYXRhLXNvdXJjZVwiO1xuaW1wb3J0IHsgUGhvdG8gfSBmcm9tIFwiQC9hcHAvdXRpbHMvZGIvZW50aXR5L1Bob3RvXCI7XG5cbmNvbnN0IEJVQ0tFVE5BTUUgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BV1NfQlVDS0VUX05BTUU7XG5jb25zdCBBV1NSRUdJT04gPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BV1NfUkVHSU9OO1xuXG5leHBvcnQgY29uc3QgR0VUID0gYXN5bmMgKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gZmV0Y2hpbmcgaW1hZ2VzIGZyb20gdGhlIGRhdGFiYXNlIC0tIG9wdGlvbiAxXG4gICAgICAgIC8vIGNvbnN0IGRhdGFTb3VyY2UgPSBhd2FpdCBBcHBEYXRhU291cmNlKCk7XG5cbiAgICAgICAgLy8gaWYgKCFkYXRhU291cmNlLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgLy8gICAgIGF3YWl0IGRhdGFTb3VyY2UuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gY29uc3QgcGhvdG9SZXBvc2l0b3J5ID0gYXdhaXQgZGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KFBob3RvKS5maW5kKCk7XG4gICAgICAgIC8vIGNvbnN0IGltYWdlVXJscyA9IHBob3RvUmVwb3NpdG9yeS5tYXAoKHBob3RvKSA9PiAoe1xuICAgICAgICAvLyAgICAga2V5OiBwaG90by51cmwuc3BsaXQoXCIvXCIpLnBvcCgpLFxuICAgICAgICAvLyAgICAgbmFtZTogcGhvdG8ubmFtZSxcbiAgICAgICAgLy8gICAgIGNhdGVnb3J5OiBwaG90by5jYXRlZ29yeSxcbiAgICAgICAgLy8gICAgIHVybDogcGhvdG8udXJsLFxuICAgICAgICAvLyB9KSk7XG5cbiAgICAgICAgLy8gZmV0Y2hpbmcgaW1hZ2VzIGZyb20gdGhlIFMzIGJ1Y2tldCAtLSBvcHRpb24gMlxuICAgICAgICBjb25zdCBjb21tYW5kID0gbmV3IExpc3RPYmplY3RzVjJDb21tYW5kKHtcbiAgICAgICAgICAgIEJ1Y2tldDogQlVDS0VUTkFNRSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgeyBDb250ZW50cyB9ID0gYXdhaXQgczNDbGllbnQuc2VuZChjb21tYW5kKTtcbiAgICAgICAgY29uc3QgaW1hZ2VVcmxzID1cbiAgICAgICAgICAgIENvbnRlbnRzPy5tYXAoKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IG9iai5LZXk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGtleT8uc3BsaXQoXCIvXCIpWzJdLnNwbGl0KFwiLVwiKVsxXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjYXRlZ29yeSA9IGtleT8uc3BsaXQoXCIvXCIpWzFdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGBodHRwczovLyR7QlVDS0VUTkFNRX0uczMuJHtBV1NSRUdJT059LmFtYXpvbmF3cy5jb20vJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgICAgICAgICAgIG9iai5LZXkhXG4gICAgICAgICAgICAgICAgKX1gO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGtleSwgbmFtZSwgY2F0ZWdvcnksIHVybCB9O1xuICAgICAgICAgICAgfSkgfHwgW107XG5cbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBpbWFnZXM6IGltYWdlVXJscyxcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIFMzIG9iamVjdHM6XCIsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHJldHJpZXZlIG9iamVjdHNcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHN0YXR1czogNTAwIH1cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgREVMRVRFID0gYXN5bmMgKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YVNvdXJjZSA9IGF3YWl0IEFwcERhdGFTb3VyY2UoKTtcblxuICAgICAgICBpZiAoIWRhdGFTb3VyY2UuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgYXdhaXQgZGF0YVNvdXJjZS5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSByZXF1ZXN0Lm5leHRVcmwuc2VhcmNoUGFyYW1zO1xuICAgICAgICBjb25zdCBrZXkgPSBzZWFyY2hQYXJhbXMuZ2V0KFwia2V5XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJhdyBrZXkgcmVjZWl2ZWQ6XCIsIGtleSk7XG5cbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJLZXkgcGFyYW1ldGVyIGlzIG1pc3NpbmdcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVjb2RlIHRoZSBrZXlcbiAgICAgICAgY29uc3QgZGVjb2RlZEtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrZXkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkRlY29kZWQga2V5OlwiLCBkZWNvZGVkS2V5KTtcblxuICAgICAgICBjb25zdCBjb21tYW5kID0gbmV3IERlbGV0ZU9iamVjdENvbW1hbmQoe1xuICAgICAgICAgICAgQnVja2V0OiBcImp1bGl1cy1waG90by1hbGJ1bS1zdG9yZVwiLFxuICAgICAgICAgICAgS2V5OiBkZWNvZGVkS2V5LFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlMzIERlbGV0ZSBDb21tYW5kOlwiLCBKU09OLnN0cmluZ2lmeShjb21tYW5kLCBudWxsLCAyKSk7XG4gICAgICAgIGF3YWl0IHMzQ2xpZW50LnNlbmQoY29tbWFuZCk7XG5cbiAgICAgICAgY29uc3QgcGhvdG9SZXBvc2l0b3J5ID0gZGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KFBob3RvKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJQaG90byBrZXkgdG8gZGVsZXRlOlwiLCBrZXkpO1xuICAgICAgICBjb25zdCBwaG90byA9IGF3YWl0IHBob3RvUmVwb3NpdG9yeS5maW5kT25lQnkoe1xuICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly8ke0JVQ0tFVE5BTUV9LnMzLiR7QVdTUkVHSU9OfS5hbWF6b25hd3MuY29tLyR7a2V5fWAsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBwaG90b1JlcG9zaXRvcnkucmVtb3ZlKHBob3RvKTtcblxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgUzMgb2JqZWN0OlwiLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRmFpbGVkIHRvIGRlbGV0ZSBvYmplY3Q6ICR7ZXJyb3IubmFtZX0gLSAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHN0YXR1czogZXJyb3IubmFtZSA9PT0gXCJOb1N1Y2hLZXlcIiA/IDQwNCA6IDUwMCB9XG4gICAgICAgICk7XG4gICAgfVxufTtcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJEZWxldGVPYmplY3RDb21tYW5kIiwiTGlzdE9iamVjdHNWMkNvbW1hbmQiLCJzM0NsaWVudCIsIkFwcERhdGFTb3VyY2UiLCJQaG90byIsIkJVQ0tFVE5BTUUiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVdTX0JVQ0tFVF9OQU1FIiwiQVdTUkVHSU9OIiwiTkVYVF9QVUJMSUNfQVdTX1JFR0lPTiIsIkdFVCIsInJlcXVlc3QiLCJjb21tYW5kIiwiQnVja2V0IiwiQ29udGVudHMiLCJzZW5kIiwiaW1hZ2VVcmxzIiwibWFwIiwib2JqIiwia2V5IiwiS2V5IiwibmFtZSIsInNwbGl0IiwiY2F0ZWdvcnkiLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqc29uIiwic3VjY2VzcyIsImltYWdlcyIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJERUxFVEUiLCJkYXRhU291cmNlIiwiaXNJbml0aWFsaXplZCIsImluaXRpYWxpemUiLCJzZWFyY2hQYXJhbXMiLCJuZXh0VXJsIiwiZ2V0IiwibG9nIiwiZGVjb2RlZEtleSIsImRlY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwaG90b1JlcG9zaXRvcnkiLCJnZXRSZXBvc2l0b3J5IiwicGhvdG8iLCJmaW5kT25lQnkiLCJyZW1vdmUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/photos/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/utils/db/data-source.ts":
/*!*************************************!*\
  !*** ./app/utils/db/data-source.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AppDataSource: () => (/* binding */ AppDataSource)\n/* harmony export */ });\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ \"(rsc)/./node_modules/reflect-metadata/Reflect.js\");\n/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! typeorm */ \"(rsc)/./node_modules/typeorm/index.mjs\");\n/* harmony import */ var _entity_Photo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entity/Photo */ \"(rsc)/./app/utils/db/entity/Photo.ts\");\n\n\n\n// import { getDbCredentials } from \"../parameterStoreConfig\";\nconst AppDataSource = async ()=>{\n    // const { username, password, host, dbName, port } = await getDbCredentials();\n    return new typeorm__WEBPACK_IMPORTED_MODULE_1__.DataSource({\n        type: \"postgres\",\n        host: \"localhost\",\n        port: 5432,\n        username: \"postgres\",\n        password: \"postgres\",\n        database: \"photoalbum\",\n        synchronize: true,\n        logging: false,\n        entities: [\n            _entity_Photo__WEBPACK_IMPORTED_MODULE_2__.Photo\n        ],\n        ssl: {\n            rejectUnauthorized: false\n        },\n        migrations: [],\n        subscribers: [],\n        migrationsRun: true\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvdXRpbHMvZGIvZGF0YS1zb3VyY2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEI7QUFDVztBQUNFO0FBQ3ZDLDhEQUE4RDtBQUV2RCxNQUFNRSxnQkFBZ0I7SUFDekIsK0VBQStFO0lBQy9FLE9BQU8sSUFBSUYsK0NBQVVBLENBQUM7UUFDbEJHLE1BQU07UUFDTkMsTUFBTTtRQUNOQyxNQUFNO1FBQ05DLFVBQVU7UUFDVkMsVUFBVTtRQUNWQyxVQUFVO1FBQ1ZDLGFBQWE7UUFDYkMsU0FBUztRQUNUQyxVQUFVO1lBQUNWLGdEQUFLQTtTQUFDO1FBQ2pCVyxLQUFLO1lBQ0RDLG9CQUFvQjtRQUN4QjtRQUNBQyxZQUFZLEVBQUU7UUFDZEMsYUFBYSxFQUFFO1FBQ2ZDLGVBQWU7SUFDbkI7QUFDSixFQUFFIiwic291cmNlcyI6WyIvaG9tZS9qdWxpdXMvRG9jdW1lbnRzL0ZpbGVzL0FtYWxpdGVjaC9MYWJzL2F3cy1taWNvcnNlcnZpY2UtbGFicy93ZWVrNi9waG90by1hbGJ1bS1hcHAtdjIvYXBwL3V0aWxzL2RiL2RhdGEtc291cmNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInJlZmxlY3QtbWV0YWRhdGFcIjtcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tIFwidHlwZW9ybVwiO1xuaW1wb3J0IHsgUGhvdG8gfSBmcm9tIFwiLi9lbnRpdHkvUGhvdG9cIjtcbi8vIGltcG9ydCB7IGdldERiQ3JlZGVudGlhbHMgfSBmcm9tIFwiLi4vcGFyYW1ldGVyU3RvcmVDb25maWdcIjtcblxuZXhwb3J0IGNvbnN0IEFwcERhdGFTb3VyY2UgPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gY29uc3QgeyB1c2VybmFtZSwgcGFzc3dvcmQsIGhvc3QsIGRiTmFtZSwgcG9ydCB9ID0gYXdhaXQgZ2V0RGJDcmVkZW50aWFscygpO1xuICAgIHJldHVybiBuZXcgRGF0YVNvdXJjZSh7XG4gICAgICAgIHR5cGU6IFwicG9zdGdyZXNcIixcbiAgICAgICAgaG9zdDogXCJsb2NhbGhvc3RcIixcbiAgICAgICAgcG9ydDogNTQzMixcbiAgICAgICAgdXNlcm5hbWU6IFwicG9zdGdyZXNcIixcbiAgICAgICAgcGFzc3dvcmQ6IFwicG9zdGdyZXNcIixcbiAgICAgICAgZGF0YWJhc2U6IFwicGhvdG9hbGJ1bVwiLFxuICAgICAgICBzeW5jaHJvbml6ZTogdHJ1ZSxcbiAgICAgICAgbG9nZ2luZzogZmFsc2UsXG4gICAgICAgIGVudGl0aWVzOiBbUGhvdG9dLFxuICAgICAgICBzc2w6IHtcbiAgICAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIG1pZ3JhdGlvbnM6IFtdLFxuICAgICAgICBzdWJzY3JpYmVyczogW10sXG4gICAgICAgIG1pZ3JhdGlvbnNSdW46IHRydWUsXG4gICAgfSk7XG59O1xuIl0sIm5hbWVzIjpbIkRhdGFTb3VyY2UiLCJQaG90byIsIkFwcERhdGFTb3VyY2UiLCJ0eXBlIiwiaG9zdCIsInBvcnQiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZGF0YWJhc2UiLCJzeW5jaHJvbml6ZSIsImxvZ2dpbmciLCJlbnRpdGllcyIsInNzbCIsInJlamVjdFVuYXV0aG9yaXplZCIsIm1pZ3JhdGlvbnMiLCJzdWJzY3JpYmVycyIsIm1pZ3JhdGlvbnNSdW4iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/utils/db/data-source.ts\n");

/***/ }),

/***/ "(rsc)/./app/utils/db/entity/Photo.ts":
/*!**************************************!*\
  !*** ./app/utils/db/entity/Photo.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Photo: () => (/* binding */ Photo)\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swc/helpers/_/_ts_metadata */ \"(rsc)/./node_modules/tslib/tslib.es6.mjs\");\n/* harmony import */ var typeorm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typeorm */ \"(rsc)/./node_modules/typeorm/index.mjs\");\n\n\n\nclass Photo {\n}\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.PrimaryGeneratedColumn)(),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", Number)\n], Photo.prototype, \"id\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({\n        length: 100\n    }),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", String)\n], Photo.prototype, \"name\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)(\"text\"),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", String)\n], Photo.prototype, \"description\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)(),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", String)\n], Photo.prototype, \"category\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)(),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", String)\n], Photo.prototype, \"url\", void 0);\n(0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Column)({\n        type: \"timestamp\",\n        default: ()=>\"CURRENT_TIMESTAMP\"\n    }),\n    (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__metadata)(\"design:type\", typeof Date === \"undefined\" ? Object : Date)\n], Photo.prototype, \"uploadedAt\", void 0);\nPhoto = (0,_swc_helpers_ts_decorate__WEBPACK_IMPORTED_MODULE_1__.__decorate)([\n    (0,typeorm__WEBPACK_IMPORTED_MODULE_0__.Entity)()\n], Photo);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvdXRpbHMvZGIvZW50aXR5L1Bob3RvLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQWlFO0FBRzFELE1BQU1HO0FBb0JiOzs7Ozs7O1FBZlFDLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWFGQyxNQUFNO1FBQWFDLFNBQVMsSUFBTSIsInNvdXJjZXMiOlsiL2hvbWUvanVsaXVzL0RvY3VtZW50cy9GaWxlcy9BbWFsaXRlY2gvTGFicy9hd3MtbWljb3JzZXJ2aWNlLWxhYnMvd2VlazYvcGhvdG8tYWxidW0tYXBwLXYyL2FwcC91dGlscy9kYi9lbnRpdHkvUGhvdG8udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5LCBDb2x1bW4sIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4gfSBmcm9tIFwidHlwZW9ybVwiO1xuXG5ARW50aXR5KClcbmV4cG9ydCBjbGFzcyBQaG90byB7XG4gICAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxuICAgIGlkOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHtcbiAgICAgICAgbGVuZ3RoOiAxMDAsXG4gICAgfSlcbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKFwidGV4dFwiKVxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKClcbiAgICBjYXRlZ29yeTogc3RyaW5nO1xuXG4gICAgQENvbHVtbigpXG4gICAgdXJsOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHsgdHlwZTogXCJ0aW1lc3RhbXBcIiwgZGVmYXVsdDogKCkgPT4gXCJDVVJSRU5UX1RJTUVTVEFNUFwiIH0pXG4gICAgdXBsb2FkZWRBdDogRGF0ZTtcbn1cbiJdLCJuYW1lcyI6WyJFbnRpdHkiLCJDb2x1bW4iLCJQcmltYXJ5R2VuZXJhdGVkQ29sdW1uIiwiUGhvdG8iLCJsZW5ndGgiLCJ0eXBlIiwiZGVmYXVsdCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/utils/db/entity/Photo.ts\n");

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

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

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

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/reflect-metadata","vendor-chunks/typeorm","vendor-chunks/glob","vendor-chunks/sha.js","vendor-chunks/debug","vendor-chunks/sql-highlight","vendor-chunks/app-root-path","vendor-chunks/inherits","vendor-chunks/dotenv","vendor-chunks/tslib","vendor-chunks/path-scurry","vendor-chunks/minipass","vendor-chunks/lru-cache","vendor-chunks/supports-color","vendor-chunks/safe-buffer","vendor-chunks/pg-query-stream","vendor-chunks/pg-cursor","vendor-chunks/ms","vendor-chunks/has-flag","vendor-chunks/dayjs","vendor-chunks/balanced-match","vendor-chunks/ansis"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fphotos%2Froute&page=%2Fapi%2Fphotos%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fphotos%2Froute.ts&appDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();