import { Credentials, User } from '@/types/user';
import { nextServer } from './api';
import { Note, Tag } from '@/types/note';

// !Interface
interface SessionStatus {
  success: boolean;
}

export interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: Tag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNoteCreate {
  title: string;
  content: string;
  tag: Tag;
}

export async function updateUser(payload: {
  username?: string;
  email?: string;
}): Promise<User> {
  const { data } = await nextServer.patch<User>('/users/me', payload);
  return data;
}

// !HTTP
export const register = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>('/auth/register', credentials);
  console.log('API REGISTER DATA:', data);
  return data;
};
export const login = async (credentials: Credentials) => {
  const { data } = await nextServer.post<User>('/auth/login', credentials);

  return data;
};

export const logout = async () => {
  await nextServer.post<User>('/auth/logout');
};

export const checkSession = async () => {
  const { data } = await nextServer.get<SessionStatus>('/auth/session');
  return data.success;
};
export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export async function fetchNotes({
  search,
  page,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: { [key: string]: string | number } = {
    page,
    perPage: 6,
  };

  if (search && search.trim() !== '') {
    params.search = search;
  }

  if (tag && tag.trim() !== '') {
    params.tag = tag;
  }

  const res = await nextServer.get<FetchNotesResponse>('/notes', { params });
  return res.data;
}

export async function fetchNoteId(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

// ! POST
export async function createNote(newNote: FetchNoteCreate): Promise<Note> {
  const { data } = await nextServer.post<Note>('/notes', newNote);
  return data;
}

// ! DELETE
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}
