# Blazor Samples - Download files from Blazor WebAssembly app

## How to implement downloading files from the server by normal HTML anchor element on a Blazor Wasm app?

You should add `target="_top"` and `download[="{file name}"]` attributes to the Anchor element to make sure that an Anchor element is clicked to start downloading a file.

```html
<a href="foo/bar" target="_top" download="fizz.buzz">
  download
</a>
```

## How to download files via C# code?

It requires JavaScript helper function.

At first, you have to implement JavaScript helper function, like this:

```ts
// helper.ts
function downloadFromUrl(options: { url: string, fileName?: string }): void {
  const anchorElement = document.createElement('a');
  anchorElement.href = options.url;
  anchorElement.download = options.fileName ?? '';
  anchorElement.click();
}
```

and include it from the html document.

```html
<!-- index.html -->
  ...
  <script src="_framework/blazor.webassembly.js"></script>
  <!-- 👇 include helper! -->
  <script src="script/helper.js"></script>
</body>
```

After do that, you can start downloading from C# code, like this:

```razor
@inject IJSRuntime JSRuntime
...
@code {
  private async Task OnClickDownloadButton()
  {
    await JSRuntime.InvokeVoidAsync(
      "downloadFromUrl",
      new {
        Url = "files/dotnet-icon",
        FileName = "dotnet.ico"
      });
  }
}
```


## License

[The Unlicense](LICENSE)