// NOTE: the code below was taken from here: https://github.com/matgawin/playcanvas-typescript-template/blob/main/src/decorators.ts

// I improved it a bit, but it's still not perfect. I'm not sure if it's possible to make it perfect.
// The main difference is tt doesn't include Playcanvas engine. So bundles are smaller.

// The MIT License (MIT)
// Copyright (c) 2023 Mateusz Gawin
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/**
 * @category Decorators
 * @description Decorator used on classes for creating PlayCanvas scripts.
 * @param name The name of the script. Will be visible in PlayCanvas online editor.
 * @returns Initialized Playcanvas script.
 */
export function createScript(name: string) {
  return (obj: any) => {
    const instance = new obj({
      app: {},
      entity: {
        script: {
          enabled: true,
        },
      },
    });

    const script: any = pc.createScript(name);
    // Add public attributes accessible in the editor
    instance.atts = instance.atts || {};

    for (const attr in instance.atts) {
      script.attributes.add(attr, instance.atts[attr]);
    }

    // Add instance properties and methods to prototype
    const proto = script.prototype;

    for (const prop of Object.getOwnPropertyNames(obj.prototype)) {
      if (prop !== 'constructor') {
        proto[prop] = obj.prototype[prop];
      }
    }

    // Add static properties
    for (const prop in obj) {
      script[prop] = obj[prop];
    }

    const oldInitialize = proto.initialize;
    proto.initialize = function () {
      const cloneAttr = Object.getOwnPropertyNames(instance).filter(
        (attrKey) =>
          attrKey !== 'atts' &&
          attrKey !== '_callbacks' &&
          attrKey !== '_callbackActive'
      );

      for (const attrKey of cloneAttr) {
        const attr = instance[attrKey];

        if (attr !== undefined) {
          if (attr.clone) {
            this[attrKey] = attr.clone();
          } else if (Array.isArray(attr)) {
            this[attrKey] = [...attr];
          } else if (typeof attr === 'object') {
            this[attrKey] = { ...attr };
          } else {
            this[attrKey] = attr;
          }
        }
      }

      oldInitialize.call(this);
    };
  };
}

/**
 * @category Decorators
 * @description Decorator used on class variables for creating PlayCanvas attributes.
 * Works only with classes that have been decorated with @createScript.
 * @param params The parameters of the attribute.
 * @see {@link AttributeParams}
 * @see {@link createScript}
 * @returns Attribute that will be added to the script in {@link createScript}
 */
export function attribute(params: AttributeParams): any {
  return function (target: ScriptTypeBase, propertyKey: string): any {
    if (!target.atts) target.atts = {};
    target.atts[propertyKey] = params;
  };
}

/**
 * @category PlayCanvas
 * @description Descriptor for type of PlayCanvas script attributes.
 */
export type AttributeParams = {
  /** Type of the attribute. Only required value. */
  type:
    | 'boolean'
    | 'number'
    | 'string'
    | 'json'
    | 'asset'
    | 'entity'
    | 'rgb'
    | 'rgba'
    | 'vec2'
    | 'vec3'
    | 'vec4'
    | 'curve';
  /** Default value of attribute, its type depends on type value. */
  default?: any;
  /** Title that will be displayed in PlayCanvas editor instead of attribute name. */
  title?: string;
  /** Description that will be displayed in PlayCanvas editor while hovering mouse over attribute. */
  description?: string;
  /** Placeholder for PlayCanvas editors ui field. For multi-field types, such as vec2, vec3, and others use array of strings. */
  placeholder?: string | string[];
  /** Determines if attribute can hold single or multiple values. */
  array?: boolean;
  /** If attribute is array, determines maximum number of values. */
  size?: number;
  /** Minimum value for type 'number', if max and min are defined, slider will be rendered in Editor's UI. */
  min?: number;
  /** Maximum value for type 'number', if max and min are defined, slider will be rendered in Editor's UI. */
  max?: number;
  /** Level of precision for field type 'number' with floating values. */
  precision?: number;
  /**
   * Step value for type 'number'. The amount used to increment the value
   *  when using the arrow keys in the Editor's UI.
   */
  step?: number;
  /** Name of asset type to be used in 'asset' type attribute picker in Editor's UI, defaults to '*' (all). */
  assetType?: string;
  /** List of names for Curves for field type 'curve'. */
  curves?: string[];
  /**
   * String of color channels for Curves for field type 'curve',
   * can be any combination of rgba characters. Defining this property will render Gradient in Editor's field UI.
   */
  color?: string;
  /** List of fixed choices for field, defined as array of objects, where key in object is a title of an option. */
  enum?: object[];
  /**
   * List of attributes for type 'json'. Each attribute description is an object
   *  with the same properties as regular script attributes but with an added 'name' field
   *  to specify the name of each attribute in the JSON.
   */
  schema?: object[];
};

/**
 * @category PlayCanvas
 * @classdesc Stripped down copy of the PlayCanvas ScriptType class. Used to create a new script.
 * @see {@link createScript}
 */
export class ScriptTypeBase extends pc.EventHandler {
  /** Map of {@link AttributeParams} used by {@link attribute} decorator. */
  atts?: { [key: string]: AttributeParams };
  /** PlayCanvas script attributes used on script initialization. */
  attributes!: pc.ScriptAttributes;

  /** The PlayCanvas Application that is running the script. */
  app!: pc.Application;
  /** The PlayCanvas Entity that the script is attached to. */
  entity!: pc.Entity;
  /**
   * True if the instance of this type is in running state.
   * False when script is not running, because the Entity
   * or any of its parents are disabled or the ScriptComponent is disabled
   * or the Script Instance is disabled. When disabled no update methods will be called on each tick.
   * initialize and postInitialize methods will run once
   * when the script instance is in enabled state during app tick.*/
  enabled!: boolean;

  /**
   * Called when script is about to run for the first time.
   */
  initialize?(): void;
  /**
   * Called after all initialize methods are executed in the same tick or enabling chain of actions.
   */
  postInitialize?(): void;
  /**
   * Called for enabled (running state) scripts on each tick.
   * @param dt - The delta time in seconds since the last frame.
   */
  update?(dt: number): void;
  /**
   * Called for enabled (running state) scripts on each tick, after update.
   * @param dt - The delta time in seconds since the last frame.
   */
  postUpdate?(dt: number): void;
  /**
   * Called when a ScriptType that already exists in the registry gets redefined. If the new
   * ScriptType has a `swap` method in its prototype, then it will be executed to perform
   * hot-reload at runtime.
   * @param old - Old instance of the scriptType to copy data to the new instance.
   */
  swap?(old: pc.ScriptType): void;
}
