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
exports.id = "app/api/upload/route";
exports.ids = ["app/api/upload/route"];
exports.modules = {

/***/ "(rsc)/./app/api/upload/route.ts":
/*!*********************************!*\
  !*** ./app/api/upload/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _app_utils_s3Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/utils/s3Config */ \"(rsc)/./app/utils/s3Config.ts\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @aws-sdk/client-s3 */ \"@aws-sdk/client-s3\");\n/* harmony import */ var _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_utils_db_data_source__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/utils/db/data-source */ \"(rsc)/./app/utils/db/data-source.ts\");\n/* harmony import */ var _app_utils_db_entity_Photo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/utils/db/entity/Photo */ \"(rsc)/./app/utils/db/entity/Photo.ts\");\n\n\n\n\n\nconst BUCKETNAME = \"julius-photo-album-store\";\nconst AWSREGION = \"us-east-1\";\nconst POST = async (request)=>{\n    try {\n        const dataSource = await (0,_app_utils_db_data_source__WEBPACK_IMPORTED_MODULE_3__.AppDataSource)();\n        if (!dataSource.isInitialized) {\n            await dataSource.initialize();\n        }\n        const formData = await request.formData();\n        const file = formData.get(\"file\");\n        const name = formData.get(\"name\");\n        const category = formData.get(\"category\");\n        const description = formData.get(\"description\");\n        // convert file to buffer\n        const buffer = await file.arrayBuffer();\n        const fileBuffer = Buffer.from(buffer);\n        const imageKey = `uploads/${category || \"Other\"}/${new Date()}-${name || file.name}`;\n        const uploadParams = {\n            Bucket: BUCKETNAME,\n            Key: imageKey,\n            Body: fileBuffer,\n            ContentType: file.type\n        };\n        await _app_utils_s3Config__WEBPACK_IMPORTED_MODULE_1__.s3Client.send(new _aws_sdk_client_s3__WEBPACK_IMPORTED_MODULE_2__.PutObjectCommand(uploadParams));\n        const newPhoto = new _app_utils_db_entity_Photo__WEBPACK_IMPORTED_MODULE_4__.Photo();\n        newPhoto.name = name;\n        newPhoto.category = category;\n        newPhoto.description = description;\n        newPhoto.url = `https://${BUCKETNAME}.s3.${AWSREGION}.amazonaws.com/${encodeURIComponent(imageKey)}`;\n        const photoRepository = dataSource.getRepository(_app_utils_db_entity_Photo__WEBPACK_IMPORTED_MODULE_4__.Photo);\n        await photoRepository.save(newPhoto);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"File uploaded successfully\"\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.log(error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Error uploading file\"\n        }, {\n            status: 500\n        });\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3VwbG9hZC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXdEO0FBQ1I7QUFDTTtBQUNLO0FBQ1A7QUFFcEQsTUFBTUssYUFBYUMsMEJBQXVDO0FBQzFELE1BQU1HLFlBQVlILFdBQWtDO0FBRTdDLE1BQU1LLE9BQU8sT0FBT0M7SUFDdkIsSUFBSTtRQUNBLE1BQU1DLGFBQWEsTUFBTVYsd0VBQWFBO1FBRXRDLElBQUksQ0FBQ1UsV0FBV0MsYUFBYSxFQUFFO1lBQzNCLE1BQU1ELFdBQVdFLFVBQVU7UUFDL0I7UUFDQSxNQUFNQyxXQUFXLE1BQU1KLFFBQVFJLFFBQVE7UUFDdkMsTUFBTUMsT0FBT0QsU0FBU0UsR0FBRyxDQUFDO1FBQzFCLE1BQU1DLE9BQU9ILFNBQVNFLEdBQUcsQ0FBQztRQUMxQixNQUFNRSxXQUFXSixTQUFTRSxHQUFHLENBQUM7UUFDOUIsTUFBTUcsY0FBY0wsU0FBU0UsR0FBRyxDQUFDO1FBRWpDLHlCQUF5QjtRQUN6QixNQUFNSSxTQUFTLE1BQU1MLEtBQUtNLFdBQVc7UUFDckMsTUFBTUMsYUFBYUMsT0FBT0MsSUFBSSxDQUFDSjtRQUUvQixNQUFNSyxXQUFXLENBQUMsUUFBUSxFQUFFUCxZQUFZLFFBQVEsQ0FBQyxFQUFFLElBQUlRLE9BQU8sQ0FBQyxFQUMzRFQsUUFBUUYsS0FBS0UsSUFBSSxFQUNuQjtRQUNGLE1BQU1VLGVBQWU7WUFDakJDLFFBQVF6QjtZQUNSMEIsS0FBS0o7WUFDTEssTUFBTVI7WUFDTlMsYUFBYWhCLEtBQUtpQixJQUFJO1FBQzFCO1FBRUEsTUFBTWpDLHlEQUFRQSxDQUFDa0MsSUFBSSxDQUFDLElBQUlqQyxnRUFBZ0JBLENBQUMyQjtRQUV6QyxNQUFNTyxXQUFXLElBQUloQyw2REFBS0E7UUFDMUJnQyxTQUFTakIsSUFBSSxHQUFHQTtRQUNoQmlCLFNBQVNoQixRQUFRLEdBQUdBO1FBQ3BCZ0IsU0FBU2YsV0FBVyxHQUFHQTtRQUN2QmUsU0FBU0MsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFaEMsV0FBVyxJQUFJLEVBQUVJLFVBQVUsZUFBZSxFQUFFNkIsbUJBQ2xFWCxXQUNEO1FBRUgsTUFBTVksa0JBQWtCMUIsV0FBVzJCLGFBQWEsQ0FBQ3BDLDZEQUFLQTtRQUN0RCxNQUFNbUMsZ0JBQWdCRSxJQUFJLENBQUNMO1FBRTNCLE9BQU9wQyxxREFBWUEsQ0FBQzBDLElBQUksQ0FDcEI7WUFBRUMsU0FBUztRQUE2QixHQUN4QztZQUFFQyxRQUFRO1FBQUk7SUFFdEIsRUFBRSxPQUFPQyxPQUFPO1FBQ1pDLFFBQVFDLEdBQUcsQ0FBQ0Y7UUFDWixPQUFPN0MscURBQVlBLENBQUMwQyxJQUFJLENBQ3BCO1lBQUVDLFNBQVM7UUFBdUIsR0FDbEM7WUFBRUMsUUFBUTtRQUFJO0lBRXRCO0FBQ0osRUFBRSIsInNvdXJjZXMiOlsiL2hvbWUvanVsaXVzL0RvY3VtZW50cy9GaWxlcy9BbWFsaXRlY2gvTGFicy9hd3MtbWljb3JzZXJ2aWNlLWxhYnMvd2VlazYvcGhvdG8tYWxidW0tYXBwLXYyL2FwcC9hcGkvdXBsb2FkL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IHMzQ2xpZW50IH0gZnJvbSBcIkAvYXBwL3V0aWxzL3MzQ29uZmlnXCI7XG5pbXBvcnQgeyBQdXRPYmplY3RDb21tYW5kIH0gZnJvbSBcIkBhd3Mtc2RrL2NsaWVudC1zM1wiO1xuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCJAL2FwcC91dGlscy9kYi9kYXRhLXNvdXJjZVwiO1xuaW1wb3J0IHsgUGhvdG8gfSBmcm9tIFwiQC9hcHAvdXRpbHMvZGIvZW50aXR5L1Bob3RvXCI7XG5cbmNvbnN0IEJVQ0tFVE5BTUUgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BV1NfQlVDS0VUX05BTUU7XG5jb25zdCBBV1NSRUdJT04gPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BV1NfUkVHSU9OO1xuXG5leHBvcnQgY29uc3QgUE9TVCA9IGFzeW5jIChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRhdGFTb3VyY2UgPSBhd2FpdCBBcHBEYXRhU291cmNlKCk7XG5cbiAgICAgICAgaWYgKCFkYXRhU291cmNlLmlzSW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGF3YWl0IGRhdGFTb3VyY2UuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxdWVzdC5mb3JtRGF0YSgpO1xuICAgICAgICBjb25zdCBmaWxlID0gZm9ybURhdGEuZ2V0KFwiZmlsZVwiKSBhcyBGaWxlO1xuICAgICAgICBjb25zdCBuYW1lID0gZm9ybURhdGEuZ2V0KFwibmFtZVwiKSBhcyBzdHJpbmc7XG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gZm9ybURhdGEuZ2V0KFwiY2F0ZWdvcnlcIikgYXMgc3RyaW5nO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGZvcm1EYXRhLmdldChcImRlc2NyaXB0aW9uXCIpIGFzIHN0cmluZztcblxuICAgICAgICAvLyBjb252ZXJ0IGZpbGUgdG8gYnVmZmVyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IGZpbGUuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgY29uc3QgZmlsZUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGJ1ZmZlcik7XG5cbiAgICAgICAgY29uc3QgaW1hZ2VLZXkgPSBgdXBsb2Fkcy8ke2NhdGVnb3J5IHx8IFwiT3RoZXJcIn0vJHtuZXcgRGF0ZSgpfS0ke1xuICAgICAgICAgICAgbmFtZSB8fCBmaWxlLm5hbWVcbiAgICAgICAgfWA7XG4gICAgICAgIGNvbnN0IHVwbG9hZFBhcmFtcyA9IHtcbiAgICAgICAgICAgIEJ1Y2tldDogQlVDS0VUTkFNRSxcbiAgICAgICAgICAgIEtleTogaW1hZ2VLZXksXG4gICAgICAgICAgICBCb2R5OiBmaWxlQnVmZmVyLFxuICAgICAgICAgICAgQ29udGVudFR5cGU6IGZpbGUudHlwZSxcbiAgICAgICAgfTtcblxuICAgICAgICBhd2FpdCBzM0NsaWVudC5zZW5kKG5ldyBQdXRPYmplY3RDb21tYW5kKHVwbG9hZFBhcmFtcykpO1xuXG4gICAgICAgIGNvbnN0IG5ld1Bob3RvID0gbmV3IFBob3RvKCk7XG4gICAgICAgIG5ld1Bob3RvLm5hbWUgPSBuYW1lO1xuICAgICAgICBuZXdQaG90by5jYXRlZ29yeSA9IGNhdGVnb3J5O1xuICAgICAgICBuZXdQaG90by5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICBuZXdQaG90by51cmwgPSBgaHR0cHM6Ly8ke0JVQ0tFVE5BTUV9LnMzLiR7QVdTUkVHSU9OfS5hbWF6b25hd3MuY29tLyR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgICAgaW1hZ2VLZXlcbiAgICAgICAgKX1gO1xuXG4gICAgICAgIGNvbnN0IHBob3RvUmVwb3NpdG9yeSA9IGRhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShQaG90byk7XG4gICAgICAgIGF3YWl0IHBob3RvUmVwb3NpdG9yeS5zYXZlKG5ld1Bob3RvKTtcblxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgICB7IG1lc3NhZ2U6IFwiRmlsZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHlcIiB9LFxuICAgICAgICAgICAgeyBzdGF0dXM6IDIwMSB9XG4gICAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgICAgICB7IG1lc3NhZ2U6IFwiRXJyb3IgdXBsb2FkaW5nIGZpbGVcIiB9LFxuICAgICAgICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgICAgICk7XG4gICAgfVxufTtcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJzM0NsaWVudCIsIlB1dE9iamVjdENvbW1hbmQiLCJBcHBEYXRhU291cmNlIiwiUGhvdG8iLCJCVUNLRVROQU1FIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FXU19CVUNLRVRfTkFNRSIsIkFXU1JFR0lPTiIsIk5FWFRfUFVCTElDX0FXU19SRUdJT04iLCJQT1NUIiwicmVxdWVzdCIsImRhdGFTb3VyY2UiLCJpc0luaXRpYWxpemVkIiwiaW5pdGlhbGl6ZSIsImZvcm1EYXRhIiwiZmlsZSIsImdldCIsIm5hbWUiLCJjYXRlZ29yeSIsImRlc2NyaXB0aW9uIiwiYnVmZmVyIiwiYXJyYXlCdWZmZXIiLCJmaWxlQnVmZmVyIiwiQnVmZmVyIiwiZnJvbSIsImltYWdlS2V5IiwiRGF0ZSIsInVwbG9hZFBhcmFtcyIsIkJ1Y2tldCIsIktleSIsIkJvZHkiLCJDb250ZW50VHlwZSIsInR5cGUiLCJzZW5kIiwibmV3UGhvdG8iLCJ1cmwiLCJlbmNvZGVVUklDb21wb25lbnQiLCJwaG90b1JlcG9zaXRvcnkiLCJnZXRSZXBvc2l0b3J5Iiwic2F2ZSIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/upload/route.ts\n");

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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_julius_Documents_Files_Amalitech_Labs_aws_micorservice_labs_week6_photo_album_app_v2_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/upload/route.ts */ \"(rsc)/./app/api/upload/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/upload/route\",\n        pathname: \"/api/upload\",\n        filename: \"route\",\n        bundlePath: \"app/api/upload/route\"\n    },\n    resolvedPagePath: \"/home/julius/Documents/Files/Amalitech/Labs/aws-micorservice-labs/week6/photo-album-app-v2/app/api/upload/route.ts\",\n    nextConfigOutput,\n    userland: _home_julius_Documents_Files_Amalitech_Labs_aws_micorservice_labs_week6_photo_album_app_v2_app_api_upload_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ1cGxvYWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnVwbG9hZCUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGanVsaXVzJTJGRG9jdW1lbnRzJTJGRmlsZXMlMkZBbWFsaXRlY2glMkZMYWJzJTJGYXdzLW1pY29yc2VydmljZS1sYWJzJTJGd2VlazYlMkZwaG90by1hbGJ1bS1hcHAtdjIlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZqdWxpdXMlMkZEb2N1bWVudHMlMkZGaWxlcyUyRkFtYWxpdGVjaCUyRkxhYnMlMkZhd3MtbWljb3JzZXJ2aWNlLWxhYnMlMkZ3ZWVrNiUyRnBob3RvLWFsYnVtLWFwcC12MiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDa0U7QUFDL0k7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9ob21lL2p1bGl1cy9Eb2N1bWVudHMvRmlsZXMvQW1hbGl0ZWNoL0xhYnMvYXdzLW1pY29yc2VydmljZS1sYWJzL3dlZWs2L3Bob3RvLWFsYnVtLWFwcC12Mi9hcHAvYXBpL3VwbG9hZC9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdXBsb2FkL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdXBsb2FkXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS91cGxvYWQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS9qdWxpdXMvRG9jdW1lbnRzL0ZpbGVzL0FtYWxpdGVjaC9MYWJzL2F3cy1taWNvcnNlcnZpY2UtbGFicy93ZWVrNi9waG90by1hbGJ1bS1hcHAtdjIvYXBwL2FwaS91cGxvYWQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/reflect-metadata","vendor-chunks/typeorm","vendor-chunks/glob","vendor-chunks/path-scurry","vendor-chunks/lru-cache","vendor-chunks/minipass","vendor-chunks/sha.js","vendor-chunks/debug","vendor-chunks/tslib","vendor-chunks/dotenv","vendor-chunks/dayjs","vendor-chunks/pg-cursor","vendor-chunks/sql-highlight","vendor-chunks/app-root-path","vendor-chunks/ansis","vendor-chunks/ms","vendor-chunks/supports-color","vendor-chunks/pg-query-stream","vendor-chunks/safe-buffer","vendor-chunks/balanced-match","vendor-chunks/inherits","vendor-chunks/has-flag"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fupload%2Froute&page=%2Fapi%2Fupload%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fupload%2Froute.ts&appDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fjulius%2FDocuments%2FFiles%2FAmalitech%2FLabs%2Faws-micorservice-labs%2Fweek6%2Fphoto-album-app-v2&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();