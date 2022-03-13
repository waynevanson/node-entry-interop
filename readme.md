# node-entry-interop

> NOTE: A work in progress

## Purpose

Apply the new features of [`package.json` imports and export](https://nodejs.org/api/packages.html#package-entry-points) to older versions of node.

## How does it work?

This tool reads the `exports` of your `package.json` and creates `package.json`'s that reflect the structure of exports, allowing consumers to import the files you allow them to.

## Installation

```sh
# NPM
npm install -D node-entry-interop

# Yarn
yarn add -D node-entry-interop

# PNPM
pnpm add -D node-entry-interop

```

## Usage

1. Create the `exports` object in your `package.json` (refer to [this documentation](https://nodejs.org/api/packages.html#package-entry-points) for schema and usages.
2. Add `{ "scripts": { "prepublishOnly": "node-entry-interop" } }` to your `package.json`

Now when you publish your package, it will create `package.json`'s that map to the required entrypoints.
