import { deleteNote } from '../../lib/api';
import { Note } from '../../types/note';
import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { IoMdInformation } from 'react-icons/io';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>
              <IoMdInformation className={css.inform} />
            </Link>
            <button
              onClick={() => mutation.mutate(note.id)}
              className={css.button}
            >
              DEL
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
