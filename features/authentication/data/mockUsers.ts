export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type AuthenticatedUser = Omit<MockUser, "password">;

export const initialMockUsers: MockUser[] = [
  {
    id: "user-1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
  },
  {
    id: "user-2",
    name: "Ahmed Ali",
    email: "ahmed.ali@example.com",
    password: "password123",
  },
  {
    id: "user-3",
    name: "Sara Mahmoud",
    email: "sara.mahmoud@example.com",
    password: "password123",
  },
  {
    id: "user-4",
    name: "Mohamed Khaled",
    email: "mohamed.khaled@example.com",
    password: "password123",
  },
  {
    id: "user-5",
    name: "Nouran Tarek",
    email: "nouran.tarek@example.com",
    password: "password123",
  },
];
