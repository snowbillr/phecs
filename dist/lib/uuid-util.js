"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // tslint:disable-next-line:one-variable-per-declaration
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
exports.generateUuid = generateUuid;
//# sourceMappingURL=uuid-util.js.map