export class JsonApi {
  id?: any;
  type?: string;
  data?: string;
  included?: any[];
  relationships: any = {};

  static buildFromObject<T extends JsonApi>(type, object): T {
    const obj = new type();
    Object.keys(obj).forEach((key: any) => {
      if (object[key] !== null) {
        obj[key as keyof T] = object[key];
      }
    });
    return obj;
  }

  static parseJsonApi<T extends JsonApi>(
    type: new () => T,
    data: any,
    included?: any[]
  ): T {
    const obj = new type();

    if (!data) {
      return obj;
    }

    obj.id = data.id;
    obj.type = data.type;
    obj.relationships = data.relationships;

    Object.keys(obj).forEach((key) => {
      if (data.attributes[key]) {
        obj[key] = data.attributes[key];
      }
    });

    if (data.relationships) {
      Object.entries(data.relationships).forEach(
        ([key, val]: [string, any]) => {
          if (val.data) {
            const found = included.find((include) => include.type === val.data.type);
            obj[key] = found.attributes;
            // obj[key] = JsonApi.getRelationship(
            //   obj,
            //   obj.relationships[key],
            //   val,
            //   included
            // );

          }
        }
      );
    }

    return obj;
  }

  static getRelationship(obj: any, relationship: any, val: any, included): any {
    if (!relationship) {
      return [];
    }

    if (relationship.rel === 'has_one') {
      const data = included.find((item: any) => {
        return item.type === val.data.type && item.id === val.data.id;
      });
      return JsonApi.parseJsonApi(relationship.model, data);
    }

    if (relationship.rel === 'has_many') {
      const data: any[] = [];
      val.data.forEach((element: any) => {
        const matchItem = included.find((item: any) => {
          return element.type === item.type && element.id === item.id;
        });
        data.push(JsonApi.parseJsonApi(relationship.model, matchItem));
      });
      return data;
    }
  }
}
