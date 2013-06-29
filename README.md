# tupp - Tumblr Photo Post
> Create photo posts from the command line

The tupp utility uploads photo and create photo posts from JPEGs. It will automatically retrieve the creation date from exif data, and date the post accordingly.

## Limitations

It is not possible to create a photo post with multiple images. If multiple images are specified in the command line, several posts will be created.


## Install

```shell
npm install tumblr-photo-post -g
```

## Getting Started

First you have to rename conf.js.sample into conf.js and type your tumblr credentials. Then you can use the command line tool.

```shell
tupp -t /path/to/jpeg
```
