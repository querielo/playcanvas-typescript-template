export const createScript = function (attributes: {
  [key: string]: {
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
    default?: any;
    title?: string;
    description?: string;
    placeholder?: string | string[];
    array?: boolean;
    size?: number;
    min?: number;
    max?: number;
    precision?: number;
    step?: number;
    assetType?: string;
    curves?: string[];
    color?: string;
    enum?: object[];
    schema?: object[];
  };
}) {
  return function (classDeclaration: any) {
    const name =
      classDeclaration.name.charAt(0).toLowerCase() +
      classDeclaration.name.slice(1);
    pc.registerScript(classDeclaration, name);

    for (const attributeName in attributes) {
      classDeclaration.attributes.add(attributeName, attributes[attributeName]);
    }
  };
};
