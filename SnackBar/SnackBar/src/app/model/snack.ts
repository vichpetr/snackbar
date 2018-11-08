import {Link} from "./link";

export interface Snack {
  entityId: number;
  name: string;
  pic: string;
  pictype: string;
  price: number;
  count: number;
  owner: number;

  links: Link[];
}
