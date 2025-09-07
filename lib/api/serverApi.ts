import { cookies } from 'next/headers';
import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { FetchNotesResponse, FetchNotesParams } from './clientApi';
import type { AxiosResponse } from 'axios';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const responce = await nextServer.get('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  });
  return responce;
};

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string | null,
): Promise<FetchNotesParams> => {
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

  const { data } = await nextServer.get<FetchNotesParams>('/notes', params);

  return data;
};

export async function fetchNoteId(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

// ! Контроль доступу
export type SessionResponse = { success: boolean } | User | null;

function isSuccessResponse(x: SessionResponse): x is { success: boolean } {
  return typeof x === 'object' && x !== null && 'success' in x;
}

export async function sHasSession(): Promise<boolean> {
  const res = await checkServerSession();
  const data = res.data;
  return isSuccessResponse(data) ? data.success : Boolean(data);
}

export const getMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
