function clickElement(element: HTMLElement): void {
    element.click();
}

function downloadFromUrl(options: { url: string, fileName?: string }): void {
    const anchorElement = document.createElement('a');
    anchorElement.href = options.url;
    anchorElement.download = options.fileName ?? '';
    anchorElement.click();
    anchorElement.remove();
}

function downloadFromByteArray(options: { byteArray: string, fileName: string, contentType: string }): void {
    // The byte array in .NET is encoded to base64 string when it passes to JavaScript.
    // So we can pass that base64 encoded string to the browser as a "data URL" directly.
    const url = "data:" + options.contentType + ";base64," + options.byteArray;
    downloadFromUrl({ url: url, fileName: options.fileName });
}