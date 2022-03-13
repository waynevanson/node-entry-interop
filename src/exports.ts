import { pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"

export type RootRelativePath = `./${string}${string}`
export type Main = RootRelativePath
export type Types = RootRelativePath
export type Default = "."

export type ConditionalNodeProperty =
  | "node"
  | "node-addons"
  | "default"
  | "browser"
  // todo - make last two mutually exclusive
  | "import"
  | "require"

export type ConditionalUserProperty =
  // should be first
  | "types"
  | "deno"
  | "browser"
  // todo - development and production must be mutually exclusive
  | "development"
  | "production"

export type ConditionalProperty =
  | ConditionalNodeProperty
  | ConditionalUserProperty

export interface ExportConditional
  extends Partial<
    Record<ConditionalProperty, ExportConditional | RootRelativePath>
  > {}

export type ExportSubpathValue = RootRelativePath | ExportConditional

export interface ExportSubpathConditional
  extends Partial<Record<RootRelativePath, ExportSubpathValue | null>>,
    Record<Default, ExportSubpathValue> {}

export type Exports =
  | RootRelativePath
  | ExportConditional
  | ExportSubpathConditional

// read json file, decode,
// check if real file is there
// check if proxy can be placed
// skip if proxy is same as entry point
// write proxy package.json where possible
// add to files

export const rootRelativePath = pipe(
  d.string,
  d.refine(
    (string): string is RootRelativePath =>
      string.startsWith("./") && string.length > 2,
    "rootRelativePath"
  )
)

export const exports_ = d.union(rootRelativePath)
