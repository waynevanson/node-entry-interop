import * as _ from "./exports"
import { quickcheck as qc, arbitrary as AR } from "fp-ts-quickcheck"
import { either as E } from "fp-ts"
import { pipe } from "fp-ts/lib/function"

const nonemptystring = pipe(
  AR.string,
  AR.filter((a) => a !== "")
)
describe("exports", () => {
  describe("decoder", () => {
    describe("rootRelativePath", () => {
      it('should always be true when the value starts with "./" and is at least 3 letters long', () => {
        qc.unsafeAssertSync(
          pipe(
            nonemptystring,
            AR.map((nonemptystring) => `./${nonemptystring}`)
          ),
          (subpath) =>
            expect(_.rootRelativePath.decode(subpath)).toEqual(E.right(subpath))
        )
      })

      it('should return an error when it starts with "./" and is not 4 characters long', () => {
        expect(_.rootRelativePath.decode("./")).toMatchObject(E.left({}))
      })
    })
  })
})
