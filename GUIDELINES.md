## (S)CSS

CSS is mainly written via Sass pre-processor at Chefkoch, though some projects may deviate from this. We follow a cherry-picked mixture of [cssguidelin.es](http://cssguidelin.es) and [sass-guidelin.es](http://sass-guidelin.es) for writing our SCSS files. All example snippets are sourced from [sass-guidelin.es](http://sass-guidelin.es/) / created by [Hugo Giraudel](http://hugogiraudel.com/) / [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.en)

### Syntax and Formatting

At a very high-level, we want:

* four (4) space indents, no tabs
* multi-line CSS
* meaningful use of whitespace

        // Yep
        .foo {
            display: block;
            overflow: hidden;
            padding: 0 1em;
        }

        // Nope
        .foo {
          display: block; overflow: hidden;

          padding: 0 1em;
        }

### Quotes

Although neither CSS nor Sass do require strings to be quoted, we recommend that **strings should always be wrapped with single quotes** (`'`) in Sass. Besides consistency with other languages, including CSS’ cousin JavaScript, there are several reasons for this choice:

*   color names are treated as colors when unquoted, which can lead to serious issues
*   most syntax highlighters will choke on unquoted strings
*   it helps general readability
*   there is no valid reason not to quote strings

        // Yep
        $direction: 'left';

        // Nope
        $direction: left;

#### Exceptions for quotes

// Yep
$font-type: sans-serif;

// Nope
$font-type: 'sans-serif';

#### Strings containing quotes

If a string contains one or several single quotes, one might consider wrapping the string with double quotes (`"`) instead, in order to avoid escaping characters within the string.

// Okay
@warn 'You can\'t do that.';

// Okay
@warn "You can't do that.";

### URLs

URLs should be quoted as well, for the same reasons as above:

// Yep
.foo {
    background-image: url('/images/kittens.jpg');
}

// Nope
.foo {
  background-image: url(/images/kittens.jpg);
}

### Numbers

In Sass, _number_ is a data type including everything from unitless numbers to lengths, durations, frequencies, angles and so on. This allows calculations to be run on such measures.

#### Zeros

Numbers should display leading zeros before a decimal value less than one. Never display trailing zeros.

// Yep 
.foo {
    padding: 2em;
    opacity: 0.5;
}

// Nope 
.foo {
  padding: 2.0em;
  opacity: .5;
}

#### Units

When dealing with lengths, a 0 value should never ever have a unit.

// Yep
margin: 0;

// Nope
margin: 0px;

Beware, this practice should be limited to lengths only. Having a unitless zero for a time property such as transition-delay is not allowed. Theoretically, if a unitless zero is specified for a duration, the declaration is deemed invalid and should be discarded. Not all browsers are that strict, but some are. Long story short: only omit the unit for lengths.

**Note:** There are more good practices dealing with numbers at [http://sass-guidelin.es/#numbers](http://sass-guidelin.es/#numbers) and we recommend to follow them.

### Colors and Variables

When using a color more than once, store it in a variable (prefixed with `$color-`) with a standardized name representing the color like `$color-sushi` (use [chir.ag's Name That Color](http://chir.ag/projects/name-that-color/#7BA344) to find the name). Since this method leads to unique color names which we do not want to spread around our code base (cannot reuse when the color changes), you need to map this color to an abstract second variable like `$color-brand-primary.` David Walsh has explained at length why this seemingly convoluted approach is a good idea: [Sass Color Variables That Don’t Suck](https://davidwalsh.name/sass-color-variables-dont-suck).

$color-sushi: #7ba344;

[…]

$color-brand-primary: $color-sushi;

### The actual (S)CSS Ruleset

Here is how a (S)CSS ruleset should be written (at least, according to most guidelines, including [cssguidelin.es](http://cssguidelin.es/#anatomy-of-a-ruleset)):

*   related selectors on the same line; unrelated selectors on new lines
*   the opening brace ({) spaced from the last selector by a single space
*   each declaration on its own new line
*   a space after the colon (:)
*   a trailing semi-colon (;) at the end of all declarations
*   the closing brace (}) on its own new line
*   a new line after the closing brace `}  

// Yep
.foo, .foo--bar,
.baz {
    display: block;
    overflow: hidden;
    margin: 0 auto;
}

// Nope
.foo,
.foo-bar, .baz {
  display: block;
  overflow: hidden;
  margin: 0 auto }

Adding to those CSS-related guidelines, we want to pay attention to:

*   local variables being declared before any declarations, then spaced from declarations by a new line
*   mixin calls with no `@content` coming before any declaration
*   new line after mixin calls with not `@content` that are followed by a declaration
*   nested selectors always coming after a new line
*   mixin calls with `@content` coming after any nested selector
*   no new line before a closing brace (`}`)

// Yep
.foo, .foo-bar,
.baz {
    $length: 42em;

    @include ellipsis;
    @include size($length);
    display: block;
    overflow: hidden;
    margin: 0 auto;

    &:hover {
      color: red;
    }

    @include breakpoint('$my-breakpoint') {
      overflow: visible;
    }
}

### Declaration Sorting

There is a lot of [discussion](http://css-tricks.com/poll-results-how-do-you-order-your-css-properties/) around the [order of declarations](http://sass-guidelin.es/#declaration-sorting). The different factions are _alphabetical order_, _order by type_ and _fuck it, random_. Find an approach that works for you and your team until we have implemented automated declaration sorting with either [csscomb.com](http://csscomb.com) or [stylelint.io](http://stylelint.io/) (with [stylefmt](https://github.com/morishitter/stylefmt)).

### Selector Nesting

One particular feature Sass provides that is being overly misused by many developers is _selector nesting_. Selector nesting offers a way for stylesheet authors to compute long selectors by nesting shorter selectors within each others.

We recommend to **avoid selector nesting as much as** **possible** for reasons given in [Beware of Selector Nesting](http://www.sitepoint.com/beware-selector-nesting-sass/) and [Avoid nested selectors for more modular CSS](http://thesassway.com/intermediate/avoid-nested-selectors-for-more-modular-css) (tl;dr: better reuse, better maintainability). The [BEM naming convention](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) for HTML classes helps a lot in this regard. 

It can make sense to use moderate nesting, but please keep to [the Inception rule](http://thesassway.com/beginner/the-inception-rule)(never nest more than 3 levels deep).

#### Exceptions

Of course, there are cases where nesting is not only allowed, but recommended:

*   use selector nesting for pseudo-classes and pseudo-elements
*   use selector nesting for component-agnostic state classes such as .is-active

// Yep
.foo {
    color: red;

    &:hover {
        color: green;
    }

    &::before {
        content: 'pseudo-element';
    }

    &.is-active {
        font-weight: bold;
    }
}

Last but not least, it may make sense to use the _[reverse parent selector](http://thesassway.com/intermediate/referencing-parent-selectors-using-ampersand#wait-theres-more)_ when styling an element because it happens to be contained within another specific element. This can help to keep everything about the component in the same place.


// Yep
.foo {
    // …

    .no-opacity & {
      display: none;
    }
}


This will compile to:

// CSS
.no-opacity .foo {
    display: none;
}

### Naming Conventions

We recommend to closely follow the naming conventions proposed by [cssguidelin.es](http://cssguidelin.es/#naming-conventions), especially **BEM-like Naming**.

_BEM, _meaning _Block_, _Element_, _Modifier_, is a front-end methodology coined by developers working at Yandex. Whilst BEM is a complete methodology, here we are only concerned with its naming convention. Further, the naming convention here only is BEM-_like_; the principles are exactly the same, but the actual syntax differs slightly.

BEM splits components’ classes into three groups:

*   Block: The sole root of the component
*   Element: A component part of the Block
*   Modifier: A variant or extension of the Block

To take an analogy (note, not an example):

.person {}
.person__head {}
.person--tall {}


Elements are delimited with two (2) underscores (__), and Modifiers are delimited by two (2) hyphens (--).

Here we can see that .person {} is the Block; it is the sole root of a discrete entity..person__head {} is an Element; it is a smaller part of the .person {} Block. Finally, .person--tall {} is a Modifier; it is a specific variant of the `.person {}` Block.

**Please note: **If we were to add another Element—called, let’s say, `.person__eye {}`—to this `.person {}` component, we would not need to step through every layer of the DOM. That is to say, the correct notation would be `.person__eye {}`, and not `.person__head__eye {}`. Your classes do not reflect the full paper-trail of the DOM.

Hugo Giraudel has explained [BEM syntax regarding nested elements](https://github.com/HugoGiraudel/ama/issues/47#issuecomment-145522130) in more detail, while Harry Roberts clarifies [when to use a BEM modifier vs. a _stateful class_](http://www.sassmeister.com/gist/91bebd16ce4bbb7d6a45).