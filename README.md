# YO ASS!

## Getting Started

### What is Yeoman?

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-ass from npm, run:

```
$ npm install -g generator-ass
```

Finally, initiate the generator:

```
$ yo ass
```

#### Build

Install Grunt

```
npm install grunt -g
```

and build

```
grunt build
```

Now all your scripts are minified in one file `/app/js/app.min.js` and your styles in `/app/style/styles.min.css`

#### Sub-generators

To create new module

```
ass:module newModuleName
```

To create new controller/service/filter/directive

```
ass:controller/service/filter/directive name
```
then enter module name

To create new page

```
ass:page name
```

## License

MIT
