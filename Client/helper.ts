function downloadFromUrl(options: { url: string, fileName?: string }): void {
    // console.log(options);
    const anchorElement = document.createElement('a');
    anchorElement.href = options.url;
    anchorElement.download = options.fileName ?? '';
    anchorElement.click();
    anchorElement.remove();
}