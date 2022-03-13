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
