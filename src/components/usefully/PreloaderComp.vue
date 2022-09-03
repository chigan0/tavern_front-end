<template id="">
  <div class="preloader">
    <section class="_preloader">
       <div class="_preloader__content">
          <div class="_preloader__item _preloader__item_1"></div>
          <div class="_preloader__item _preloader__item_2"></div>
          <div class="_preloader__item _preloader__item_3"></div>
          <div class="_preloader__item _preloader__item_4"></div>
          <div class="_preloader__item _preloader__item_5"></div>
          <div class="_preloader__item _preloader__item_6"></div>
          <div class="_preloader__item _preloader__item_7"></div>
          <div class="_preloader__item _preloader__item_8"></div>
       </div>
    </section>
  </div>
</template>


<script>
  export default{
    name: 'PreloaderComp'
  }
</script>


<style media="screen">
/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
}

/* Sections
     ========================================================================== */

/**
   * Remove the margin in all browsers.
   */

body {
  margin: 0;
}

/**
   * Render the `main` element consistently in IE.
   */

main {
  display: block;
}

/**
   * Correct the font size and margin on `h1` elements within `section` and
   * `article` contexts in Chrome, Firefox, and Safari.
   */

h1 {
  font-size: 2em;
  margin: 0em 0;
}

/* Grouping content
     ========================================================================== */

/**
   * 1. Add the correct box sizing in Firefox.
   * 2. Show the overflow in Edge and IE.
   */

hr {
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  /* 1 */
  height: 0;
  /* 1 */
  overflow: visible;
  /* 2 */
}

/**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd `em` font sizing in all browsers.
   */

pre {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/* Text-level semantics
     ========================================================================== */

/**
   * Remove the gray background on active links in IE 10.
   */

a {
  background-color: transparent;
}

/**
   * 1. Remove the bottom border in Chrome 57-
   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
   */

abbr[title] {
  border-bottom: none;
  /* 1 */
  text-decoration: underline;
  /* 2 */
  -webkit-text-decoration: underline dotted;
  text-decoration: underline dotted;
  /* 2 */
}

/**
   * Add the correct font weight in Chrome, Edge, and Safari.
   */

b,
strong {
  font-weight: bolder;
}

/**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd `em` font sizing in all browsers.
   */

code,
kbd,
samp {
  font-family: monospace, monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/**
   * Add the correct font size in all browsers.
   */

small {
  font-size: 80%;
}

/**
   * Prevent `sub` and `sup` elements from affecting the line height in
   * all browsers.
   */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
     ========================================================================== */

/**
   * Remove the border on images inside links in IE 10.
   */

img {
  border-style: none;
  vertical-align: top;
}

/* Forms
     ========================================================================== */

/**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  line-height: 1.15;
  /* 1 */
  margin: 0;
  /* 2 */
}

/**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */

button,
input {
  /* 1 */
  overflow: visible;
}

/**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */

button,
select {
  /* 1 */
  text-transform: none;
}

/**
   * Correct the inability to style clickable types in iOS and Safari.
   */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
   * Remove the inner border and padding in Firefox.
   */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
   * Restore the focus styles unset by the previous rule.
   */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
   * Correct the padding in Firefox.
   */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
   * 1. Correct the text wrapping in Edge and IE.
   * 2. Correct the color inheritance from `fieldset` elements in IE.
   * 3. Remove the padding so developers are not caught out when they zero out
   *    `fieldset` elements in all browsers.
   */

legend {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* 1 */
  color: inherit;
  /* 2 */
  display: table;
  /* 1 */
  max-width: 100%;
  /* 1 */
  padding: 0;
  /* 3 */
  white-space: normal;
  /* 1 */
}

/**
   * Add the correct vertical alignment in Chrome, Firefox, and Opera.
   */

progress {
  vertical-align: baseline;
}

/**
   * Remove the default vertical scrollbar in IE 10+.
   */

textarea {
  overflow: auto;
}

/**
   * 1. Add the correct box sizing in IE 10.
   * 2. Remove the padding in IE 10.
   */

[type="checkbox"],
[type="radio"] {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* 1 */
  padding: 0;
  /* 2 */
}

/**
   * Correct the cursor style of increment and decrement buttons in Chrome.
   */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
   * 1. Correct the odd appearance in Chrome and Safari.
   * 2. Correct the outline style in Safari.
   */

[type="search"] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/**
   * Remove the inner padding in Chrome and Safari on macOS.
   */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
   * 1. Correct the inability to style clickable types in iOS and Safari.
   * 2. Change font properties to `inherit` in Safari.
   */

::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}

/* Interactive
     ========================================================================== */

/*
   * Add the correct display in Edge, IE 10+, and Firefox.
   */

details {
  display: block;
}

/*
   * Add the correct display in all browsers.
   */

summary {
  display: list-item;
}

/* Misc
     ========================================================================== */

/**
   * Add the correct display in IE 10+.
   */

template {
  display: none;
}

/**
   * Add the correct display in IE 10.
   */

[hidden] {
  display: none;
}

* {
  padding: 0px;
  margin: 0px;
  border: 0;
}

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

:focus,
:acive {
  outline: none;
}

a:focus,
a:acive {
  outline: none;
}

nav,
footer,
header,
aside {
  display: block;
}

html,
body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

input,
button,
textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}

button {
  cursor: pointer;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

a,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

li {
  list-style: none;
}

body.lock {
  overflow: hidden;
}

input:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus:-moz-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder {
  color: transparent;
}

input:focus:-ms-input-placeholder {
  color: transparent;
}

._preloader {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

._preloader__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 160px;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  height: 150px;
}

._preloader__item {
  -webkit-animation-duration: 1s;
          animation-duration: 1s;
  animation-direction: reverse;
  -webkit-animation-timing-function: ease;
          animation-timing-function: ease;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #6d5a03;
}

._preloader__item_1 {
  -webkit-animation-name: opacityPreloader1;
          animation-name: opacityPreloader1;
  -webkit-transform: translate(29px, 0px);
      -ms-transform: translate(29px, 0px);
          transform: translate(29px, 0px);
  -webkit-animation-delay: .75s;
          animation-delay: .75s;
  opacity: .25;
}

._preloader__item_2 {
  -webkit-animation-name: opacityPreloader1;
          animation-name: opacityPreloader1;
  -webkit-transform: translate(21px, 29px);
      -ms-transform: translate(21px, 29px);
          transform: translate(21px, 29px);
  -webkit-animation-delay: .625s;
          animation-delay: .625s;
  opacity: .375;
}

._preloader__item_3 {
  -webkit-animation-name: opacityPreloader1;
          animation-name: opacityPreloader1;
  -webkit-animation-delay: .875s;
          animation-delay: .875s;
  opacity: .125;
  -webkit-transform: translate(3px, -29px);
      -ms-transform: translate(3px, -29px);
          transform: translate(3px, -29px);
}

._preloader__item_4 {
  -webkit-animation-name: opacityPreloader1;
          animation-name: opacityPreloader1;
  -webkit-transform: translate(10px, 40px);
      -ms-transform: translate(10px, 40px);
          transform: translate(10px, 40px);
  -webkit-animation-delay: .5s;
          animation-delay: .5s;
  opacity: .5;
}

._preloader__item_5 {
  -webkit-animation-name: opacityPreloader1;
          animation-name: opacityPreloader1;
  -webkit-transform: translate(18px, 29px);
      -ms-transform: translate(18px, 29px);
          transform: translate(18px, 29px);
  -webkit-animation-delay: .375s;
          animation-delay: .375s;
  opacity: .625;
}

._preloader__item_6 {
  -webkit-animation-name: opacityPreloader1;
          animation-name: opacityPreloader1;
  -webkit-transform: translate(-2px, -29px);
      -ms-transform: translate(-2px, -29px);
          transform: translate(-2px, -29px);
  -webkit-animation-delay: .125s;
          animation-delay: .125s;
  opacity: .875;
}

._preloader__item_7 {
  -webkit-animation-name: opacityPreloader1;
          animation-name: opacityPreloader1;
  -webkit-transform: translate(-10px, 0px);
      -ms-transform: translate(-10px, 0px);
          transform: translate(-10px, 0px);
  -webkit-animation-delay: .25s;
          animation-delay: .25s;
  opacity: .75;
}

._preloader__item_8 {
  -webkit-animation-name: opacityPreloader1;
          animation-name: opacityPreloader1;
  -webkit-transform: translate(-70px, -40px);
      -ms-transform: translate(-70px, -40px);
          transform: translate(-70px, -40px);
}

@-webkit-keyframes opacityPreloader1 {
  0% {
    opacity: 0;
  }

  12% {
    opacity: .125;
  }

  25% {
    opacity: .25;
  }

  37% {
    opacity: .375;
  }

  50% {
    opacity: .5;
  }

  62% {
    opacity: .625;
  }

  75% {
    opacity: .75;
  }

  87% {
    opacity: .875;
  }

  100% {
    opacity: 1;
  }
}

@keyframes opacityPreloader1 {
  0% {
    opacity: 0;
  }

  12% {
    opacity: .125;
  }

  25% {
    opacity: .25;
  }

  37% {
    opacity: .375;
  }

  50% {
    opacity: .5;
  }

  62% {
    opacity: .625;
  }

  75% {
    opacity: .75;
  }

  87% {
    opacity: .875;
  }

  100% {
    opacity: 1;
  }
}

@media (max-width: 767px) {
  ._preloader__item {
    width: 18px;
    height: 18px;
  }

  ._preloader__item_2 {
    -webkit-transform: translate(22px, 25px);
        -ms-transform: translate(22px, 25px);
            transform: translate(22px, 25px);
  }

  ._preloader__item_3 {
    -webkit-transform: translate(3px, -25px);
        -ms-transform: translate(3px, -25px);
            transform: translate(3px, -25px);
  }

  ._preloader__item_4 {
    -webkit-transform: translate(10px, 35px);
        -ms-transform: translate(10px, 35px);
            transform: translate(10px, 35px);
  }

  ._preloader__item_5 {
    -webkit-transform: translate(17px, 25px);
        -ms-transform: translate(17px, 25px);
            transform: translate(17px, 25px);
  }

  ._preloader__item_6 {
    -webkit-transform: translate(-1px, -26px);
        -ms-transform: translate(-1px, -26px);
            transform: translate(-1px, -26px);
  }

  ._preloader__item_8 {
    -webkit-transform: translate(-63px, -35px);
        -ms-transform: translate(-63px, -35px);
            transform: translate(-63px, -35px);
  }
}

@media (max-width: 496px) {
  ._preloader__item {
    width: 14px;
    height: 14px;
  }

  ._preloader__item_1 {
    -webkit-transform: translate(22px, 0px);
        -ms-transform: translate(22px, 0px);
            transform: translate(22px, 0px);
  }

  ._preloader__item_2 {
    -webkit-transform: translate(16px, 20px);
        -ms-transform: translate(16px, 20px);
            transform: translate(16px, 20px);
  }

  ._preloader__item_3 {
    -webkit-transform: translate(2px, -20px);
        -ms-transform: translate(2px, -20px);
            transform: translate(2px, -20px);
  }

  ._preloader__item_4 {
    -webkit-transform: translate(8px, 28px);
        -ms-transform: translate(8px, 28px);
            transform: translate(8px, 28px);
  }

  ._preloader__item_5 {
    -webkit-transform: translate(13px, 20px);
        -ms-transform: translate(13px, 20px);
            transform: translate(13px, 20px);
  }

  ._preloader__item_6 {
    -webkit-transform: translate(-1px, -20px);
        -ms-transform: translate(-1px, -20px);
            transform: translate(-1px, -20px);
  }

  ._preloader__item_7 {
    -webkit-transform: translate(-7px, 0px);
        -ms-transform: translate(-7px, 0px);
            transform: translate(-7px, 0px);
  }

  ._preloader__item_8 {
    -webkit-transform: translate(-49px, -28px);
        -ms-transform: translate(-49px, -28px);
            transform: translate(-49px, -28px);
  }
}
</style>
