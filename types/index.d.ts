import * as pc from 'playcanvas';

export = pc;

declare global {
  const pc: typeof import('playcanvas');
}
