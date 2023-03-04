import { attribute, createScript } from '../utils/scriptDecorators';

@createScript('myAwesomeScript')
export class MyAwesomeScript extends pc.ScriptType {
  @attribute({
    type: 'string',
  })
  public stringAttribute?: string;

  @attribute({
    type: 'number',
    default: 0,
  })
  public numberAttribute: number = 0;

  //   public initialize() {}

  //   public postInitialize(): void {}

  //   public update(dt: number) {}

  //   public postUpdate(): void {}

  //   public swap(): void {}
}
