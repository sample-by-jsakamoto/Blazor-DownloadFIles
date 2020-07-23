# Blazor Samples - Download files from Blazor WebAssembly app

## How to implement downloading files from the server by normal HTML anchor element on a Blazor Wasm app?

You should add `target="_top"` and `download[="{file name}"]` attributes to the Anchor element to make sure that an Anchor element is clicked to start downloading a file.

```html
<a href="foo/bar" target="_top" download="fizz.buzz">
  download
</a>
```

## License

[The Unlicense](LICENSE)