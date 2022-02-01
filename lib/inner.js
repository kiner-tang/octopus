"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApp = void 0;
var BaseApp = /** @class */ (function () {
    function BaseApp() {
        this.handlers = {};
        this.data = [];
    }
    BaseApp.prototype.push = function (data) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this;
                        return [4 /*yield*/, this.resolveData(data)];
                    case 1:
                        _b.data = _c.sent();
                        (_a = this.next) === null || _a === void 0 ? void 0 : _a.push(this.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseApp.prototype.pipe = function (_next) {
        this.next = _next;
        return _next;
    };
    BaseApp.prototype.on = function (eventName, handler) {
        (this.handlers[eventName] || (this.handlers[eventName] = [])).push(handler);
    };
    BaseApp.prototype.emit = function (eventName, data) {
        var _a;
        (_a = this.handlers[eventName]) === null || _a === void 0 ? void 0 : _a.forEach(function (fn) { return fn({
            eventName: eventName,
            detail: data
        }); });
    };
    BaseApp.prototype.resolveData = function (data) {
        return __spreadArray(__spreadArray([], this.data), data);
    };
    return BaseApp;
}());
exports.BaseApp = BaseApp;
// class TestAPP extends BaseApp<unknown, {name: string}> {
//   constructor() {
//     super();
//     this.init();
//   }
//   init() {
//     this.on("click", (data) => {
//       console.log(`0. 用户点击了，数据为：`, data.eventName, data.detail);
//     });
//     this.on("input", (data) => {
//       console.log(`0. 用户输入了，数据为：`, data);
//     });
//     this.emit("click", {name: "文本框"});
//     this.emit("input", {name: "文本框"});
//     const cur: any = {
//       name: "kiner",
//       age: 18,
//     };
//     this.push([cur]);
//   }
// }
// class TestAPP2 extends BaseApp {
//   constructor() {
//     super();
//     this.init();
//   }
//   init() {
//     this.on("click", (data) => {
//       console.log(`1. 用户点击了，数据为：`, data);
//     });
//     this.on("input", (data) => {
//       console.log(`1. 用户输入了，数据为：`, data);
//     });
//     this.emit("click", "文本域");
//     this.emit("input", "文本域");
//   }
//   resolveData(data: any[]): any[] | Promise<any[]> {
//     data.forEach((item) => (item.friends = ["kanger"]));
//     return data;
//   }
// }
// class TestAPP3 extends BaseApp {
//   constructor() {
//     super();
//     this.init();
//   }
//   init() {
//     this.on("click", (data) => {
//       console.log(`2. 用户点击了，数据为：`, data);
//     });
//     this.on("input", (data) => {
//       console.log(`2. 用户输入了，数据为：`, data);
//     });
//     this.emit("click", "div");
//     this.emit("input", "div");
//   }
//   resolveData(data: any[]): any[] | Promise<any[]> {
//     data.forEach((item) => (item.otherfriends = ["kiner", "blue"]));
//     return data;
//   }
// }
// class TestAPP4 extends BaseApp {
//   constructor() {
//     super();
//     this.init();
//   }
//   init() {
//     this.on("click", (data) => {
//       console.log(`2. 用户点击了，数据为：`, data);
//     });
//     this.on("input", (data) => {
//       console.log(`2. 用户输入了，数据为：`, data);
//     });
//     this.emit("click", "div");
//     this.emit("input", "div");
//   }
//   resolveData(data: any[]): any[] | Promise<any[]> {
//     data.forEach((item) => (item.fav = "playing football"));
//     return data;
//   }
// }
// class Output extends BaseApp {
//   constructor() {
//     super();
//   }
//   resolveData(data: any[]): any[] | Promise<any[]> {
//     console.log(data);
//     return data;
//   }
// }
// const test1 = new TestAPP();
// test1
//   .pipe(new Output())
//   .pipe(new TestAPP2())
//   .pipe(new Output())
//   .pipe(new TestAPP3())
//   .pipe(new Output())
//   .pipe(new TestAPP4())
//   .pipe(new Output());
