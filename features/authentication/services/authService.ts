import {
  AuthenticatedUser,
  initialMockUsers,
  MockUser,
} from "@/features/authentication/data/mockUsers";

const USERS_STORAGE_KEY = "mock-auth-users";
const AUTH_STORAGE_KEY = "mock-auth-user";

function getUsers(): MockUser[] {
  if (typeof window === "undefined") return initialMockUsers;

  const storedUsers = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (!storedUsers) {
    window.localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify(initialMockUsers),
    );
    return initialMockUsers;
  }

  try {
    return JSON.parse(storedUsers) as MockUser[];
  } catch {
    return initialMockUsers;
  }
}

function userWithoutPassword(user: MockUser): AuthenticatedUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function saveAuthenticatedUser(user: AuthenticatedUser) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function login(email: string, password: string): AuthenticatedUser {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find(
    (storedUser) =>
      storedUser.email.toLowerCase() === normalizedEmail &&
      storedUser.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const authenticatedUser = userWithoutPassword(user);
  saveAuthenticatedUser(authenticatedUser);
  return authenticatedUser;
}

export function signup(
  name: string,
  email: string,
  password: string,
): AuthenticatedUser {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const newUser: MockUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  window.localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify([...users, newUser]),
  );

  const authenticatedUser = userWithoutPassword(newUser);
  saveAuthenticatedUser(authenticatedUser);
  return authenticatedUser;
}
