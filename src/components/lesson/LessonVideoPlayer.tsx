"use client";

export function LessonVideoPlayer({ youtubeVideoId }: { youtubeVideoId?: string | null }) {
  if (!youtubeVideoId) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-ink-900 text-sm text-ink-300">
        এই লেসনে কোনো ভিডিও যুক্ত নেই
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-xl bg-black">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
        title="Lesson Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
