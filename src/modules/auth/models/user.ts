export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; 
  tenantId: string; 

export const mockUsersDatabase: User[] = [
  {
    id: "usr-001",
    name: "Hernani Tech Alpha Admin",
    email: "admin@techalpha.com",
    passwordHash: "$2b$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcFl7v9EXI7wZXPhqClbAE8K9S6", 
    tenantId: "d83fb79c-76e9-4e78-bc4a-81a1d1d8ef31" // Pertence ao tenant: tech-alpha
  },
  {
    id: "usr-002",
    name: "Hernani Fashion Beta Admin",
    email: "admin@fashionbeta.com",
    passwordHash: "$2b$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcFl7v9EXI7wZXPhqClbAE8K9S6", 
    tenantId: "f42cd28a-31b2-4d7a-af18-92c2b2d9fa42" // Pertence ao tenant: fashion-beta
  }
];
