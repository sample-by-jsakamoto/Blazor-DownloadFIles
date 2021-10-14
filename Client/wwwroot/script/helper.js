"use strict";
function clickElement(element) {
    element.click();
}
function downloadFromUrl(options) {
    var _a;
    var anchorElement = document.createElement('a');
    anchorElement.href = options.url;
    anchorElement.download = (_a = options.fileName) !== null && _a !== void 0 ? _a : '';
    anchorElement.click();
    anchorElement.remove();
}
function downloadFromByteArray(options) {
    var url = typeof (options.byteArray) === 'string' ?
        // .NET 5 or earlier, the byte array in .NET is encoded to base64 string when it passes to JavaScript.
        // In that case, that base64 encoded string can be pass to the browser as a "data URL" directly.
        "data:" + options.contentType + ";base64," + options.byteArray :
        // .NET 6 or later, the byte array in .NET is passed to JavaScript as an UInt8Array efficiently.
        // - https://docs.microsoft.com/en-us/dotnet/core/compatibility/aspnet-core/6.0/byte-array-interop
        // In that case, the UInt8Array can be converted to an object URL and passed to the browser.
        // But don't forget to revoke the object URL when it is no longer needed.
        URL.createObjectURL(new Blob([options.byteArray], { type: options.contentType }));
    downloadFromUrl({ url: url, fileName: options.fileName });
    if (typeof (options.byteArray) !== 'string')
        URL.revokeObjectURL(url);
}
