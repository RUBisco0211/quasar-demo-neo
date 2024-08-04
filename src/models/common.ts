import { RouteRecordName, RouteMeta } from 'vue-router';

export interface StringIndexedObject {
  [key: string]: any;
}
export interface RouteTagProps {
  path: string;
  name?: RouteRecordName | null;
  meta?: RouteMeta;
}
