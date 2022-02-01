"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
describe("🔫 数据源 Datasource", function () {
    it("🧼 管道数据流 Pipeline", function () {
        var fn = jest.fn();
        var App1 = /** @class */ (function (_super) {
            __extends(App1, _super);
            function App1() {
                var _this = _super.call(this) || this;
                _this.push([{ name: "kiner" }]);
                return _this;
            }
            return App1;
        }(BaseApp));
        var App2 = /** @class */ (function (_super) {
            __extends(App2, _super);
            function App2() {
                return _super.call(this) || this;
            }
            App2.prototype.resolveData = function (data) {
                data.forEach(function (item) { return (item.age = 18); });
                return data;
            };
            return App2;
        }(BaseApp));
        var App3 = /** @class */ (function (_super) {
            __extends(App3, _super);
            function App3() {
                return _super.call(this) || this;
            }
            App3.prototype.resolveData = function (data) {
                data.forEach(function (item) { return (item.friends = ["kanger", "wenhui"]); });
                return data;
            };
            return App3;
        }(BaseApp));
        var Output = /** @class */ (function (_super) {
            __extends(Output, _super);
            function Output() {
                return _super.call(this) || this;
            }
            Output.prototype.resolveData = function (data) {
                var str = JSON.stringify(data);
                fn(str);
                return data;
            };
            return Output;
        }(BaseApp));
        var app = new App1();
        app
            .pipe(new Output())
            .pipe(new App2())
            .pipe(new Output())
            .pipe(new App3())
            .pipe(new Output());
        expect(fn).toBeCalledTimes(3);
    });
});
