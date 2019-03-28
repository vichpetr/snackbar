(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/add-forms/add-forms.component.css":
/*!***************************************************!*\
  !*** ./src/app/add-forms/add-forms.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/add-forms/add-forms.component.html":
/*!****************************************************!*\
  !*** ./src/app/add-forms/add-forms.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-container\">\n  <h2>Add Avatar</h2>\n  <form [formGroup]=\"avatarform.getForm()\">\n    <mat-form-field>\n      <input matInput placeholder=\"Name\" #Name formControlName=\"name\">\n    </mat-form-field>\n    <mat-form-field>\n      <input matInput placeholder=\"Email\" #Email formControlName=\"email\">\n    </mat-form-field>\n    <input name=\"imageUrl\" type=\"file\" accept=\"image/*\" (change)=\"handleInputChange($event)\"/>\n    <button mat-raised-button (click)=\"addAvatar()\">OK</button>\n  </form>\n</div>\n<div class=\"form-container\">\n  <h2>Add Snack</h2>\n  <form *ngIf=\"avatars\" [formGroup]=\"snackform.getForm()\">\n    <mat-form-field>\n      <input matInput placeholder=\"Name\" #Name formControlName=\"name\">\n    </mat-form-field>\n    <mat-form-field>\n      <input matInput placeholder=\"Price\" #Price formControlName=\"price\">\n    </mat-form-field>\n    <mat-form-field>\n      <input matInput placeholder=\"Count\" #Count formControlName=\"count\">\n    </mat-form-field>\n    <mat-form-field>\n      <mat-select placeholder=\"Owner\" #Owner formControlName=\"owner\">\n        <mat-option *ngFor=\"let avatar of avatars\" [value]=\"avatar.id\" [ngStyle]=\"{'background' : 'url(' + avatar.pic + ')', 'background-size': 'contain', 'background-repeat': 'no-repeat', 'background-position-x': 'right'}\" >{{avatar.name}} </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <input name=\"imageUrl\" type=\"file\" accept=\"image/*\" (change)=\"handleInputChange($event)\"/>\n    <button mat-raised-button (click)=\"addSnack()\">OK</button>\n  </form>\n</div>\n<button mat-raised-button routerLink=\"/\">Go Back</button>\n"

/***/ }),

/***/ "./src/app/add-forms/add-forms.component.ts":
/*!**************************************************!*\
  !*** ./src/app/add-forms/add-forms.component.ts ***!
  \**************************************************/
/*! exports provided: AddFormsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFormsComponent", function() { return AddFormsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_validation_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-validation-manager */ "./node_modules/ng2-validation-manager/index.js");
/* harmony import */ var ng2_validation_manager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ng2_validation_manager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _service_avatar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/avatar.service */ "./src/app/service/avatar.service.ts");
/* harmony import */ var _service_snack_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/snack.service */ "./src/app/service/snack.service.ts");
/* harmony import */ var _model_upload_file__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../model/upload-file */ "./src/app/model/upload-file.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddFormsComponent = /** @class */ (function () {
    function AddFormsComponent(avatarService, snackService) {
        var _this = this;
        this.avatarService = avatarService;
        this.snackService = snackService;
        this.file = new _model_upload_file__WEBPACK_IMPORTED_MODULE_4__["UploadFile"]();
        this.avatarService.getAvatars().then(function (result) {
            _this.avatarService.avatars = result;
            _this.avatars = _this.avatarService.avatars;
        });
    }
    AddFormsComponent.prototype.ngOnInit = function () {
        this.setForm();
    };
    AddFormsComponent.prototype.addAvatar = function () {
        var _this = this;
        var params = this.avatarform.getData();
        this.avatarService.addAvatar(params.name.toString(), params.email.toString(), this.file.imageType, this.file.base64Image).then(function (result) {
            _this.avatarService.getAvatars().then(function (result) {
                _this.avatarService.avatars = result;
                _this.avatars = _this.avatarService.avatars;
            });
        });
    };
    AddFormsComponent.prototype.addSnack = function () {
        var _this = this;
        var params = this.snackform.getData();
        this.snackService.addSnack(params.name.toString(), params.price, params.count, params.owner, this.file.imageType, this.file.base64Image).then(function (result) {
            _this.snackService.getSnacks().then(function (result) {
                _this.snackService.snacks = result;
            });
        });
    };
    AddFormsComponent.prototype.setForm = function () {
        this.avatarform = new ng2_validation_manager__WEBPACK_IMPORTED_MODULE_1__["ValidationManager"]({
            'name': 'required|alphaNumSpace',
            'email': 'required|email'
        });
        this.snackform = new ng2_validation_manager__WEBPACK_IMPORTED_MODULE_1__["ValidationManager"]({
            'name': 'required|alphaNumSpace',
            'price': 'required|number',
            'count': 'required|number',
            'owner': 'required|number'
        });
    };
    AddFormsComponent.prototype.handleInputChange = function (e) {
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var pattern = /image-*/;
        var reader = new FileReader();
        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        this.file.imageType = file.type;
        reader.readAsDataURL(file);
    };
    AddFormsComponent.prototype._handleReaderLoaded = function (e) {
        var reader = e.target;
        this.file.base64Image = reader.result;
    };
    AddFormsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-forms',
            template: __webpack_require__(/*! ./add-forms.component.html */ "./src/app/add-forms/add-forms.component.html"),
            styles: [__webpack_require__(/*! ./add-forms.component.css */ "./src/app/add-forms/add-forms.component.css")]
        }),
        __metadata("design:paramtypes", [_service_avatar_service__WEBPACK_IMPORTED_MODULE_2__["AvatarService"],
            _service_snack_service__WEBPACK_IMPORTED_MODULE_3__["SnackService"]])
    ], AddFormsComponent);
    return AddFormsComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _avatars_avatars_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./avatars/avatars.component */ "./src/app/avatars/avatars.component.ts");
/* harmony import */ var _snacks_snacks_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./snacks/snacks.component */ "./src/app/snacks/snacks.component.ts");
/* harmony import */ var _add_forms_add_forms_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./add-forms/add-forms.component */ "./src/app/add-forms/add-forms.component.ts");
/* harmony import */ var _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transactions/transactions.component */ "./src/app/transactions/transactions.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', redirectTo: '/avatars', pathMatch: 'full' },
    { path: 'avatars', component: _avatars_avatars_component__WEBPACK_IMPORTED_MODULE_2__["AvatarsComponent"] },
    { path: 'add', component: _add_forms_add_forms_component__WEBPACK_IMPORTED_MODULE_4__["AddFormsComponent"] },
    { path: 'snacks/:id', component: _snacks_snacks_component__WEBPACK_IMPORTED_MODULE_3__["SnacksComponent"] },
    { path: 'transactions/:id', component: _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_5__["TransactionsComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n  <router-outlet></router-outlet>\n</div>\n\n\n\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'SnackBar';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _avatars_avatars_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./avatars/avatars.component */ "./src/app/avatars/avatars.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _snacks_snacks_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./snacks/snacks.component */ "./src/app/snacks/snacks.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _add_forms_add_forms_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./add-forms/add-forms.component */ "./src/app/add-forms/add-forms.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./transactions/transactions.component */ "./src/app/transactions/transactions.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _avatars_avatars_component__WEBPACK_IMPORTED_MODULE_4__["AvatarsComponent"],
                _snacks_snacks_component__WEBPACK_IMPORTED_MODULE_6__["SnacksComponent"],
                _add_forms_add_forms_component__WEBPACK_IMPORTED_MODULE_9__["AddFormsComponent"],
                _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_11__["TransactionsComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_13__["FontAwesomeModule"]
            ],
            providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_12__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_12__["HashLocationStrategy"] }],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/avatars/avatars.component.css":
/*!***********************************************!*\
  !*** ./src/app/avatars/avatars.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/avatars/avatars.component.html":
/*!************************************************!*\
  !*** ./src/app/avatars/avatars.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"avatars\" class=\"button-container\">\n      <button *ngFor=\"let avatar of avatars\" mat-raised-button color=\"primary\" routerLink=\"/snacks/{{avatar.id}}\" [ngStyle]=\"{'background' : 'url(' + avatar.pic + ')', 'background-size': 'cover'}\">\n        <span class=\"namelabel\">{{avatar.name}}</span>\n      </button>\n</div>\n<button mat-raised-button color=\"secondary\" routerLink=\"/add/\">Add</button>\n"

/***/ }),

/***/ "./src/app/avatars/avatars.component.ts":
/*!**********************************************!*\
  !*** ./src/app/avatars/avatars.component.ts ***!
  \**********************************************/
/*! exports provided: AvatarsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvatarsComponent", function() { return AvatarsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_avatar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/avatar.service */ "./src/app/service/avatar.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AvatarsComponent = /** @class */ (function () {
    function AvatarsComponent(avatarService) {
        this.avatarService = avatarService;
        this.getAvatars();
    }
    AvatarsComponent.prototype.ngOnInit = function () {
    };
    AvatarsComponent.prototype.getAvatars = function () {
        var _this = this;
        this.avatarService.getAvatars().then(function (result) {
            _this.avatarService.avatars = result;
            _this.avatars = _this.avatarService.avatars;
        });
    };
    AvatarsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-avatars',
            template: __webpack_require__(/*! ./avatars.component.html */ "./src/app/avatars/avatars.component.html"),
            styles: [__webpack_require__(/*! ./avatars.component.css */ "./src/app/avatars/avatars.component.css")]
        }),
        __metadata("design:paramtypes", [_service_avatar_service__WEBPACK_IMPORTED_MODULE_1__["AvatarService"]])
    ], AvatarsComponent);
    return AvatarsComponent;
}());



/***/ }),

/***/ "./src/app/model/upload-file.ts":
/*!**************************************!*\
  !*** ./src/app/model/upload-file.ts ***!
  \**************************************/
/*! exports provided: UploadFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadFile", function() { return UploadFile; });
var UploadFile = /** @class */ (function () {
    function UploadFile() {
        this.base64Image = '';
    }
    return UploadFile;
}());



/***/ }),

/***/ "./src/app/service/avatar.service.ts":
/*!*******************************************!*\
  !*** ./src/app/service/avatar.service.ts ***!
  \*******************************************/
/*! exports provided: AvatarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AvatarService", function() { return AvatarService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AvatarService = /** @class */ (function () {
    function AvatarService(http) {
        this.http = http;
    }
    AvatarService.prototype.getAvatars = function () {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8' });
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url + '/api/avatar/';
        return this.http.get(url.toString(), { headers: httpHeaders }).toPromise();
    };
    AvatarService.prototype.getAvatar = function (link) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8' });
        return this.http.get(link.href, { headers: httpHeaders }).toPromise();
    };
    AvatarService.prototype.findAvatar = function (id) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8' });
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url + '/api/avatar/' + id;
        return this.http.get(url.toString(), { headers: httpHeaders }).toPromise();
    };
    AvatarService.prototype.addAvatar = function (name, email, pictype, pic) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8' });
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url + '/api/avatar';
        return this.http.post(url.toString(), { name: name, email: email, pictype: pictype, pic: pic }, { headers: httpHeaders }).toPromise();
    };
    AvatarService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AvatarService);
    return AvatarService;
}());



/***/ }),

/***/ "./src/app/service/snack.service.ts":
/*!******************************************!*\
  !*** ./src/app/service/snack.service.ts ***!
  \******************************************/
/*! exports provided: SnackService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnackService", function() { return SnackService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SnackService = /** @class */ (function () {
    function SnackService(http) {
        this.http = http;
    }
    SnackService.prototype.getSnacks = function () {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8' });
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url + '/api/snack';
        return this.http.get(url.toString(), { headers: httpHeaders }).toPromise();
    };
    SnackService.prototype.findSnack = function (id) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8' });
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url + '/api/snack/search';
        return this.http.post(url.toString(), { id: id }, { headers: httpHeaders }).toPromise();
    };
    SnackService.prototype.addSnack = function (name, price, count, owner, pictype, pic) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8', 'owner': owner.toString() });
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url + '/api/snack';
        return this.http.post(url.toString(), { name: name, price: price, count: count, pic: pic }, { headers: httpHeaders }).toPromise();
    };
    SnackService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], SnackService);
    return SnackService;
}());



/***/ }),

/***/ "./src/app/service/transaction.service.ts":
/*!************************************************!*\
  !*** ./src/app/service/transaction.service.ts ***!
  \************************************************/
/*! exports provided: TransactionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionService", function() { return TransactionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TransactionService = /** @class */ (function () {
    function TransactionService(http) {
        this.http = http;
    }
    TransactionService.prototype.getTransactions = function (id, paidVisible) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8', 'userId': id.toString() });
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url + '/api/transaction/my?paid=' + paidVisible;
        return this.http.get(url.toString(), { headers: httpHeaders }).toPromise();
    };
    TransactionService.prototype.addTransaction = function (buyer, snack) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8' });
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url + '/api/transaction';
        return this.http.post(url.toString(), { buyerId: buyer, snackId: snack }, { headers: httpHeaders }).toPromise();
    };
    TransactionService.prototype.payTransactions = function (buyer, ids) {
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-type': 'application/json; charset=utf-8' });
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].url + '/api/transaction/pay';
        return this.http.post(url.toString(), { buyer: buyer, ids: ids }, { headers: httpHeaders }).toPromise();
    };
    TransactionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TransactionService);
    return TransactionService;
}());



/***/ }),

/***/ "./src/app/snacks/snacks.component.css":
/*!*********************************************!*\
  !*** ./src/app/snacks/snacks.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button{\n  margin: 5px;\n}\n\n.snackCount {\n  font-size: 1.5rem;\n  font-weight: bolder;\n  background-color: black;\n  border-radius: 1rem;\n  padding: 1rem .6rem;\n  margin: 1rem;\n  opacity: 0.7;\n  display: inline-block;\n}\n"

/***/ }),

/***/ "./src/app/snacks/snacks.component.html":
/*!**********************************************!*\
  !*** ./src/app/snacks/snacks.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"snacks\" class=\"button-container\">\n  <ng-container *ngFor=\"let snack of snacks\">\n    <button *ngIf=\"snack.count > 0\" mat-raised-button color=\"primary\" (click)=\"onSelect(snack)\"\n            [ngStyle]=\"{'background' : 'url(' + snack.pic + ')', 'background-size': 'cover'}\">\n      <span class=\"snackCount\">{{snack.count}}</span>\n      <span class=\"snackCount\">{{snack.price}} Kč</span>\n      <span class=\"namelabel\">{{snack.name}}</span>\n    </button>\n  </ng-container>\n</div>\n<button *ngIf=\"selectedAvatar\" mat-raised-button color=\"secondary\"\n        routerLink=\"/transactions/{{selectedAvatar.entityId}}\">Transactions\n</button>\n<button mat-raised-button color=\"secondary\" (click)=\"goBack()\">Cancel</button>\n"

/***/ }),

/***/ "./src/app/snacks/snacks.component.ts":
/*!********************************************!*\
  !*** ./src/app/snacks/snacks.component.ts ***!
  \********************************************/
/*! exports provided: SnacksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SnacksComponent", function() { return SnacksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_snack_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/snack.service */ "./src/app/service/snack.service.ts");
/* harmony import */ var _service_avatar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/avatar.service */ "./src/app/service/avatar.service.ts");
/* harmony import */ var _service_transaction_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/transaction.service */ "./src/app/service/transaction.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SnacksComponent = /** @class */ (function () {
    function SnacksComponent(snackBar, snackService, avatarService, transactionService, route, location, domSanitizer, router) {
        this.snackBar = snackBar;
        this.snackService = snackService;
        this.avatarService = avatarService;
        this.transactionService = transactionService;
        this.route = route;
        this.location = location;
        this.domSanitizer = domSanitizer;
        this.router = router;
        this.cancel_message = ['Salary not received yet?', 'Nevermind', 'Come on, take one', 'Coward!'];
        this.getSnacks();
        this.findAvatar();
    }
    SnacksComponent_1 = SnacksComponent;
    SnacksComponent.prototype.ngOnInit = function () {
    };
    SnacksComponent.prototype.onSelect = function (snack) {
        var _this = this;
        if (snack.count <= 0) {
            return;
        }
        this.snackService.selectedSnack = snack;
        var link = snack.links.find(function (f) { return f.rel === 'owner'; });
        link.href = link.href.replace(_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].localAddress, _environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].publicAddress);
        this.avatarService.getAvatar(link).then(function (result) {
            _this.placeOrder(result);
        });
    };
    SnacksComponent.getLinkByRel = function (rel, link) {
        if (link.rel === rel) {
            return link;
        }
    };
    SnacksComponent.prototype.getSnacks = function () {
        var _this = this;
        this.snackService.getSnacks().then(function (result) {
            _this.snackService.snacks = result;
            _this.snacks = _this.snackService.snacks;
        });
    };
    SnacksComponent.prototype.findAvatar = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        // this.avatarService.findAvatar(id).subscribe(result => {console.log('avatar is ', result);this.avatar = result['data'][0]});
        this.avatarService.findAvatar(id).then(function (result) {
            _this.avatarService.selectedAvatar = result;
            _this.selectedAvatar = _this.avatarService.selectedAvatar;
        });
    };
    ;
    SnacksComponent.prototype.placeOrder = function (owner) {
        this.owner = owner;
        this.addTransaction(this.owner, this.avatarService.selectedAvatar.entityId, this.snackService.selectedSnack.entityId);
    };
    SnacksComponent.get_random_index = function (length) {
        return Math.floor(Math.random() * length);
    };
    SnacksComponent.get_random_message = function (array) {
        return array[SnacksComponent_1.get_random_index(array.length)];
    };
    SnacksComponent.prototype.goBack = function () {
        this.snackBar.open(SnacksComponent_1.get_random_message(this.cancel_message), 'Ok', { duration: 2000, panelClass: ['snackbar'] });
        this.location.back();
    };
    SnacksComponent.prototype.addTransaction = function (owner, buyer, snack) {
        var _this = this;
        this.transactionService.addTransaction(buyer, snack).then(function (result) {
            if (owner.entityId === _this.avatarService.selectedAvatar.entityId) {
                _this.snackBar.open("You won't get any money back this way " + _this.owner.name, 'Ok', { duration: 5000, panelClass: ['snackbar'] });
            }
            else {
                _this.snackBar.open(_this.avatarService.selectedAvatar.name + " was charged " + _this.snackService.selectedSnack.price + " money units for " + _this.snackService.selectedSnack.name + " on behalf of " + owner.name, 'Ok', {
                    duration: 5000,
                    panelClass: ['snackbar']
                });
            }
            _this.router.navigate(['/']);
        });
    };
    SnacksComponent = SnacksComponent_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-snacks',
            template: __webpack_require__(/*! ./snacks.component.html */ "./src/app/snacks/snacks.component.html"),
            styles: [__webpack_require__(/*! ./snacks.component.css */ "./src/app/snacks/snacks.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"],
            _service_snack_service__WEBPACK_IMPORTED_MODULE_1__["SnackService"],
            _service_avatar_service__WEBPACK_IMPORTED_MODULE_2__["AvatarService"],
            _service_transaction_service__WEBPACK_IMPORTED_MODULE_3__["TransactionService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["DomSanitizer"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], SnacksComponent);
    return SnacksComponent;
    var SnacksComponent_1;
}());



/***/ }),

/***/ "./src/app/transactions/transactions.component.css":
/*!*********************************************************!*\
  !*** ./src/app/transactions/transactions.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%;\n}\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%;\n}\n\n.form-container {\n  text-align: left;\n}\n\n"

/***/ }),

/***/ "./src/app/transactions/transactions.component.html":
/*!**********************************************************!*\
  !*** ./src/app/transactions/transactions.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-checkbox (change)=\"changePaymentVisible()\"\n              [(ngModel)]=\"paidVisible\"> Show paid transactions\n</mat-checkbox>\n\n<div>Total Price: {{total}}</div>\n<div>Unpaid Price: {{totalUnpaid}}</div>\n\n<div *ngIf=\"dataSource\" class=\"form-container\">\n  <mat-form-field>\n    <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n  </mat-form-field>\n  <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\" matSort>\n    <ng-container matColumnDef=\"select\">\n      <th mat-header-cell *matHeaderCellDef>\n        <mat-checkbox (change)=\"$event ? masterToggle() : null\"\n                      [checked]=\"selection.hasValue() && isAllSelected()\"\n                      [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n        </mat-checkbox>\n      </th>\n      <td mat-cell *matCellDef=\"let row\">\n        <mat-checkbox (click)=\"$event.stopPropagation()\"\n                      (change)=\"$event ? selection.toggle(row) : null\"\n                      [checked]=\"selection.isSelected(row)\">\n        </mat-checkbox>\n      </td>\n    </ng-container>\n    <ng-container matColumnDef=\"id\">\n      <th mat-header-cell *matHeaderCellDef> Paid</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.paid}}</td>\n    </ng-container>\n    <ng-container matColumnDef=\"snack\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Snack</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.snack}}</td>\n    </ng-container>\n    <ng-container matColumnDef=\"price\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Price</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.price}}</td>\n    </ng-container>\n    <ng-container matColumnDef=\"owner\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Owner</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.owner}}</td>\n    </ng-container>\n    <ng-container matColumnDef=\"time\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Time</th>\n      <td mat-cell *matCellDef=\"let element\"> {{element.transactionDate }}</td>\n    </ng-container>\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\" (click)=\"selection.toggle(row)\"></tr>\n  </table>\n\n  <mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n</div>\n<button mat-raised-button color=\"secondary\" (click)=\"goBack()\">Back</button>\n<button mat-raised-button color=\"secondary\" (click)=\"Pay()\">Pay</button>\n"

/***/ }),

/***/ "./src/app/transactions/transactions.component.ts":
/*!********************************************************!*\
  !*** ./src/app/transactions/transactions.component.ts ***!
  \********************************************************/
/*! exports provided: TransactionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsComponent", function() { return TransactionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _service_transaction_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/transaction.service */ "./src/app/service/transaction.service.ts");
/* harmony import */ var _service_avatar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/avatar.service */ "./src/app/service/avatar.service.ts");
/* harmony import */ var _service_snack_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../service/snack.service */ "./src/app/service/snack.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TransactionsComponent = /** @class */ (function () {
    function TransactionsComponent(transactionService, snackService, avatarService, route, location, snackBar) {
        var _this = this;
        this.transactionService = transactionService;
        this.snackService = snackService;
        this.avatarService = avatarService;
        this.route = route;
        this.location = location;
        this.snackBar = snackBar;
        this.displayedColumns = ['select', 'id', 'snack', 'owner', 'price', 'time'];
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__["SelectionModel"](true, []);
        this.paidVisible = false;
        this.avatarService.findAvatar(this.avatarService.selectedAvatar.entityId).then(function (result) {
            _this.avatar = result;
            _this.reloadTransactions();
        });
    }
    TransactionsComponent.prototype.reloadTransactions = function () {
        var _this = this;
        this.transactionService.getTransactions(this.avatar.entityId, this.paidVisible).then(function (result) {
            _this.transactionService.transactionList = result;
            _this.transactionService.transactions = result.transactions;
            _this.total = _this.transactionService.transactionList.totalAll;
            _this.totalUnpaid = _this.transactionService.transactionList.totalUnpaid;
            _this.loadTransactions();
        });
    };
    TransactionsComponent.prototype.ngOnInit = function () {
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](this.transactionService.transactions);
    };
    TransactionsComponent.prototype.changePaymentVisible = function () {
        this.reloadTransactions();
    };
    TransactionsComponent.prototype.loadTransactions = function () {
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"](this.transactionService.transactions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = function (item, property) {
            switch (property) {
                case 'time': return new Date(item.transactionDate);
                default: return item[property];
            }
        };
    };
    TransactionsComponent.prototype.applyFilter = function (filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    TransactionsComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    TransactionsComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    TransactionsComponent.prototype.goBack = function () {
        this.location.back();
    };
    TransactionsComponent.prototype.Pay = function () {
        var _this = this;
        var ids = [];
        this.selection.selected.forEach(function (transaction) {
            if (transaction.paid === false) {
                ids.push(transaction.id);
            }
        });
        this.transactionService.payTransactions(this.avatar.entityId, ids).then(function (result) {
            _this.transactionService.transactionList = result;
            _this.transactionService.transactions = result.transactions;
            _this.snackBar.open("You will pay for " + ids.length + " transactions", 'Ok', { duration: 5000, panelClass: ['snackbar'] });
            _this.selection.clear();
            _this.loadTransactions();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginator"])
    ], TransactionsComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSort"])
    ], TransactionsComponent.prototype, "sort", void 0);
    TransactionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-transactions',
            template: __webpack_require__(/*! ./transactions.component.html */ "./src/app/transactions/transactions.component.html"),
            styles: [__webpack_require__(/*! ./transactions.component.css */ "./src/app/transactions/transactions.component.css")]
        }),
        __metadata("design:paramtypes", [_service_transaction_service__WEBPACK_IMPORTED_MODULE_1__["TransactionService"],
            _service_snack_service__WEBPACK_IMPORTED_MODULE_3__["SnackService"],
            _service_avatar_service__WEBPACK_IMPORTED_MODULE_2__["AvatarService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBar"]])
    ], TransactionsComponent);
    return TransactionsComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false,
    url: 'http://localhost:8080',
    localAddress: '172.16.9.19:8080',
    publicAddress: 'api.snackbar.petrvich.eu'
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/petr/GIT/TM/PCRF/snackbar/SnackBar/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map