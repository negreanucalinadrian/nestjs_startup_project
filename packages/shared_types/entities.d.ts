export interface IUser {
  id: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}