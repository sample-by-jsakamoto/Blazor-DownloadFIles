﻿function clickElement(element: HTMLElement): void {
    element.click();
}

function downloadFromUrl(options: { url: string, fileName?: string }): void {
    const anchorElement = document.createElement('a');
    anchorElement.href = options.url;
    anchorElement.download = options.fileName ?? '';
    anchorElement.click();
    anchorElement.remove();
}

function downloadFromByteArray(options: { byteArray: Uint8Array | string, fileName: string, contentType: string }): void {

    const url = typeof (options.byteArray) === 'string' ?

        // .NET 5 or earlier, the byte array in .NET is encoded to base64 string when it passes to JavaScript.
        // In that case, that base64 encoded string can be pass to the browser as a "data URL" directly.
        "data:" + options.contentType + ";base64," + options.byteArray :

        // .NET 6 or later, the byte array in .NET is passed to JavaScript as an UInt8Array efficiently.
        // - https://docs.microsoft.com/en-us/dotnet/core/compatibility/aspnet-core/6.0/byte-array-interop
        // In that case, the UInt8Array can be converted to an object URL and passed to the browser.
        // But don't forget to revoke the object URL when it is no longer needed.
        URL.createObjectURL(new Blob([options.byteArray], { type: options.contentType }))

    downloadFromUrl({ url: url, fileName: options.fileName });

    if (typeof (options.byteArray) !== 'string') URL.revokeObjectURL(url);
}