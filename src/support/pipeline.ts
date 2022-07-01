/* eslint-disable @typescript-eslint/no-explicit-any */
interface Destination<I = any, O = any> {
  (passable: I): O;
}

interface Pipeline<I, O> {
  (passable: I): O,
}

export interface Pipe<I = any, O = any> {
  (passable: I, next: Pipeline<I, O>): O,
}

export default function pipeline<I = any, O = any>([...pipes]: Pipe<I, O>[], destination?: Destination<I, O>): Pipeline<I, O> {
  // eslint-disable-next-line no-param-reassign
  destination ??= (passable: I): O => passable as unknown as O;

  return pipes
    .reverse()
    .reduce((stack: Pipeline<I, O>, pipe): Pipeline<I, O> => passable => pipe(passable, stack), destination);
}
