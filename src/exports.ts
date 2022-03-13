import { either as E, readonlyRecord as RC } from "fp-ts"
import { flow, pipe } from "fp-ts/lib/function"
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

// todo - can be any string, but keep to these until someone asks
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

export const rootRelativePath = pipe(
  d.string,
  d.refine(
    (string): string is RootRelativePath =>
      string.startsWith("./") && string.length > 2,
    "rootRelativePath"
  )
)

export const exportSubpathValue: d.Decoder<unknown, ExportSubpathValue> =
  d.union(
    rootRelativePath,
    d.lazy("ExportConditional", () => exportConditional)
  )

export const exportSubpathConditional: d.Decoder<
  unknown,
  ExportSubpathConditional
> = pipe(
  d.record(d.nullable(exportSubpathValue)),
  d.refine(
    //@ts-expect-error
    (
      record
      //@ts-expect-error
    ): record is Partial<Record<RootRelativePath, ExportSubpathValue | null>> =>
      RC.isEmpty(record) ||
      pipe(
        record,
        RC.fromRecord,
        RC.filterWithIndex(flow(rootRelativePath.decode, E.isLeft)),
        RC.isEmpty
      ),
    "Partial<Record<RootRelativePath,ExportSubpathValue>>"
  ),
  d.intersect(
    d.struct<Record<Default, ExportSubpathValue>>({ ".": exportSubpathValue })
  )
)

// read json file, decode,
// check if real file is there
// check if proxy can be placed
// skip if proxy is same as entry point
// write proxy package.json where possible
// add to files

export const exportConditionalValue: d.Decoder<
  unknown,
  ExportConditional | RootRelativePath
> = d.union(
  rootRelativePath,
  d.lazy("ExportConditional", () => exportConditional)
)

export const exportConditional =
  // todo - can be any property, but keep to these until someone asks
  d.partial<Record<ConditionalProperty, ExportConditional | RootRelativePath>>({
    "node-addons": exportConditionalValue,
    browser: exportConditionalValue,
    default: exportConditionalValue,
    deno: exportConditionalValue,
    development: exportConditionalValue,
    import: exportConditionalValue,
    node: exportConditionalValue,
    production: exportConditionalValue,
    require: exportConditionalValue,
    types: exportConditionalValue,
  })

export const exports_: d.Decoder<unknown, Exports> = d.union(
  rootRelativePath,
  exportConditional,
  exportSubpathConditional
)
