export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  permissions: string[];
  phone: string;
  avatarUrl: string;
  isActive: boolean;
  createdAt: string;
}
