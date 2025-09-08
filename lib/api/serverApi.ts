import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { FetchNotesResponse } from './clientApi';

export async function checkServerSession() {
  const cookieStore = await cookies();
  const response = await nextServer.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return response;
}

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string | null,
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const params = {
    params: {
      page,
      search,
      perPage: 6,
      tag,
    },
    headers: { Cookie: cookieStore.toString() },
  };

  const { data } = await nextServer.get<FetchNotesResponse>('/notes', params);

  return data;
}

export async function fetchNoteId(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

// ! Контроль доступу
export type SessionResponse = { success: boolean } | User | null;

export function isSuccessResponse(
  x: SessionResponse,
): x is { success: boolean } {
  return typeof x === 'object' && x !== null && 'success' in x;
}

export async function sHasSession(): Promise<boolean> {
  const res = await checkServerSession();
  const data = res.data;
  return isSuccessResponse(data) ? data.success : Boolean(data);
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}
