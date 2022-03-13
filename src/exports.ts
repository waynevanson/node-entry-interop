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

export interface ExportConditional
  extends Partial<
    Record<ConditionalNodeProperty, ExportConditional | RootRelativePath>
  > {}

export type ExportLabelledValue = RootRelativePath | ExportConditional

export interface ExportLabelledConditional
  extends Partial<Record<RootRelativePath, ExportLabelledValue>>,
    Record<Default, ExportLabelledValue> {}

export type Exports =
  | RootRelativePath
  | ExportConditional
  | ExportLabelledConditional
