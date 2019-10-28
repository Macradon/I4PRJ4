export interface Toast {
    type?: ToastType;
    message?: string;
    links?: Link[];
  }
  
  export enum ToastType {
    Success,
    Error,
    Info,
    Warning
  }
  
  export interface Link {
    title: string;
    link: string;
  }
  