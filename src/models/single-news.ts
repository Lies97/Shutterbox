export class SingleNews {
  relationships: any = {};

  constructor(
    public id?: string,
    public created_at?: string,
    public description?: string,
    public img_for_detail_post?: string,
    public section?: string[],
    public title?: string,
    public updated_at?: string
  ) {}
}
