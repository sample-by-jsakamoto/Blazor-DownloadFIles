function downloadFromUrl(options: { url: string, fileName?: string }): void {
    // console.log(options);
    const anchorElement = document.createElement('a');
    anchorElement.href = options.url;
    anchorElement.download = options.fileName ?? '';
    anchorElement.click();
    anchorElement.remove();
}

function downloadFromByteArray(options: { byteArray: string, fileName: string, contentType: string }): void {
    // console.log(options);

    // The byte array in .NET is encoded to base64 string when it passes to JavaScript.
    // Therefore, it has to be decoded from the base64 string and has to be converted to Uint8Array manually.
    const uint8Array = new Uint8Array(atob(options.byteArray).split('').map(c => c.charCodeAt(0)));

    const blob = new Blob([uint8Array], { type: options.contentType });
    const url = URL.createObjectURL(blob);

    downloadFromUrl({ url: url, fileName: options.fileName });

    URL.revokeObjectURL(url);
}