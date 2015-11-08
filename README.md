# polish-match-stylesheet-names-to-rules
[Polish](https://github.com/brendanlacroix/polish-css) plugin to flag files where the top-level selector does not match the style name.
This encourages small files and componentized Sass.

[![Build Status](https://travis-ci.org/brendanlacroix/polish-match-stylesheet-names-to-rules.svg)](https://travis-ci.org/brendanlacroix/polish-match-stylesheet-names-to-rules)

## Installation
`npm install polish-match-stylesheet-names-to-rules`

**Note that this only works for Sass & SCSS.**

## Example
Filename: `_global_header.scss`
Enforced structure:

```scss
.global-header {
  ...

  ~ .button {
    ...
  }
}
```

Both the filename and the top-level selector are lowercased, and
underscores are globally replace with hyphens, before doing a comparison.