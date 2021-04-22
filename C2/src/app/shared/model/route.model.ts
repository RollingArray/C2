export interface RouteModel{
  title: string;
  children: RouteChildrenModel[];
}

export interface RouteChildrenModel{
  title: string;
  root ? : boolean;
  url: string[];
  icon: string;
}
