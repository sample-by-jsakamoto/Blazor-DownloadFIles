"use strict";
function downloadFromUrl(options) {
    var _a;
    // console.log(options);
    var anchorElement = document.createElement('a');
    anchorElement.href = options.url;
    anchorElement.download = (_a = options.fileName) !== null && _a !== void 0 ? _a : '';
    anchorElement.click();
    anchorElement.remove();
}
function downloadFromByteArray(options) {
    // console.log(options);
    // The byte array in .NET is encoded to base64 string when it passes to JavaScript.
    // Therefore, it has to be decoded from the base64 string and has to be converted to Uint8Array manually.
    var uint8Array = new Uint8Array(atob(options.byteArray).split('').map(function (c) { return c.charCodeAt(0); }));
    var blob = new Blob([uint8Array], { type: options.contentType });
    var url = URL.createObjectURL(blob);
    downloadFromUrl({ url: url, fileName: options.fileName });
    URL.revokeObjectURL(url);
}
