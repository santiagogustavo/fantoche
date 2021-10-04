# fantoche

## About

**fantoche (`puppet` in portuguese)** is an API for generating static screenshots from websites. It uses [puppeteer](https://github.com/puppeteer/puppeteer) for rendering.

### Motivation

* `.md` files do not support the use of embedded JS scripts or `<iframe>` tags
* This limitation makes the display of real time informations not possible, requiring workarounds
* Inspired by [metrics](https://github.com/lowlighter/metrics)

## Usage

For rendering pages, you can pass these parameters:
* `url` **(required)**: the website you want to print
* `width`: viewport width
* `height`: viewport height

## Example

Below, an `<img>` tag is rendered. Its `src` property receives the following value:
```
https://fantoche.herokuapp.com/?url=https://chrismckenzie.com/&width=300&height=300
```

<img src="https://fantoche.herokuapp.com/?url=https://chrismckenzie.com/&width=300&height=300" />
