export interface User {
    id: number;
    name: string;
    email: string;
  }
  export interface UserToken {
    id: number;
    token: string;
    user_id: number;
  }
  export interface Category {
    id: number;
    label: string;
    priority: 'High' | 'Medium' | 'Low';
  }
  export interface Subcategory {
    id: number;
    label: string;
    category_id: number;
  }
  export interface Requester {
    id: number;
    name: string;
    email: string;
    phone: string;
  }
  export interface Ticket {
    id: number;
    description: string;
    requester_id: number;
    subcategory_id: number;
    user_id?: number;   
    status: string;
    created_at: string;
    updated_at: string;
  }