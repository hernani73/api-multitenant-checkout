export interface Tenant {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  stripeAccountId?: string;
}

export const mockTenantsDatabase: Tenant[] = [
  {
    id: "d83fb79c-76e9-4e78-bc4a-81a1d1d8ef31",
    name: "Loja Tech Alpha",
    slug: "tech-alpha",
    isActive: true
  },
  {
    id: "f42cd28a-31b2-4d7a-af18-92c2b2d9fa42",
    name: "Fashion Beta Studio",
    slug: "fashion-beta",
    isActive: true
  },
  {
    id: "a11bc39e-22c4-4e8b-b129-13c3b3d9ff55",
    name: "Inquilino Inativo Exemplo",
    slug: "loja-bloqueada",
    isActive: false 
  }
];
