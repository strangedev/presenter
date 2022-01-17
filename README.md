A simple markdown slideshow tool for displaying markdown files.

## Getting started

First, place your markdown files into some directory of your choice.

Next, set the `SLIDES_DIRECTORY` variable in `.env.local` to the path where you put your slides, relative to the application root. Say you put your slides in `/home/noah/presentations/unicorns` and the presenter into `/home/noah/devel/presenter`, your `.env.local` should look like this:

```dotenv
SLIDES_DIRECTORY=../../presentations/unicorns
```

Next, run the server:

```shell
npm run dev
```

You can now open `http://localhost:3000`, where you should see an overview of the found slides. Click on one to view it, then use the buttons at the bottom to navigate.

## Supported Markdown Features

- CommonMark
- mermaid diagrams using a code block tagged with `mermaid`
- Remote images using the `![alt-text](URL)` syntax
- Syntax highlighting