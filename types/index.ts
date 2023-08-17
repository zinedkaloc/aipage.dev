import type { User as AltogicUser } from "altogic";

export interface User extends AltogicUser {
  credits: number;
}

export interface Product {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null;
  livemode: boolean;
  lookup_key: string | null;
  metadata: {
    description: string;
    info: string;
  };
  nickname: string;
  product: string;
  recurring: string | null;
  tax_behavior: string;
  tiers_mode: string | null;
  transform_quantity: string | null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface Project {
  _id: string;
  content: string;
  result: string;
  rating: number;
  role: string;
  ratingText: string;
  user: string | User;
  createdAt: string;
  updatedAt: string;
}
