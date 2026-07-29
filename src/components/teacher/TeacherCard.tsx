import { User as UserIcon } from "lucide-react";
import type { Teacher } from "@/types/teacher";

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-50 text-primary-700">
          {teacher.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={teacher.photoURL}
              alt={teacher.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserIcon size={24} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink-800">{teacher.name}</p>
          <p className="text-xs text-primary-600">{teacher.title}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-ink-500">{teacher.bio}</p>

      {teacher.qualifications && teacher.qualifications.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {teacher.qualifications.map((q) => (
            <li
              key={q}
              className="rounded-full bg-primary-50 px-2.5 py-1 text-xs text-primary-700"
            >
              {q}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
