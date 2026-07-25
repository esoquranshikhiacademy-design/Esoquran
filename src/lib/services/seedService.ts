import { createCourse, createLesson } from "@/lib/services/courseService";
import { createQuizQuestion } from "@/lib/services/quizService";
import { createDefaultCourse, createDefaultLesson } from "@/types/course";

/**
 * ডেমো/স্যাম্পল ডেটা - অ্যাডমিন প্যানেল থেকে এক ক্লিকে তৈরি হবে।
 * উদ্দেশ্য: নতুন ডেভেলপার/অ্যাডমিন যেন খালি হাতে UI টেস্ট করতে না হয় -
 * বাস্তবসম্মত একটা কোর্স + ৩টা লেসন + কুইজ দিয়ে পুরো ফ্লো (enrollment,
 * video, quiz, assignment, comments) সরাসরি যাচাই করা যাবে।
 */
export async function seedSampleCourse(): Promise<{ courseId: string; message: string }> {
  // ধাপ ১: কোর্স তৈরি
  const courseData = createDefaultCourse({
    title: "তাজবীদের মূল নিয়মাবলী (স্যাম্পল কোর্স)",
    description:
      "এই কোর্সে আপনি তাজবীদের প্রাথমিক নিয়মকানুন শিখবেন - মাখরাজ, নূন সাকিন ও তানভীনের হুকুম, এবং সঠিক উচ্চারণের কৌশল। এটি একটি ডেমো কোর্স যা UI/UX টেস্ট করার জন্য তৈরি।",
    category: "তাজবীদ",
    level: "beginner",
    instructorName: "উস্তাদ আব্দুল্লাহ (ডেমো)",
  });
  courseData.status = "published";
  courseData.estimatedHours = 2;
  courseData.order = 0;

  const courseId = await createCourse(courseData);

  // ধাপ ২: ৩টা লেসন তৈরি
  const lessonsData = [
    {
      title: "ভূমিকা: তাজবীদ কী এবং কেন গুরুত্বপূর্ণ",
      summary: "তাজবীদের সংজ্ঞা, ইতিহাস এবং কুরআন তেলাওয়াতে এর গুরুত্ব নিয়ে আলোচনা।",
      youtubeVideoId: "dQw4w9WgXcQ", // ডেমো placeholder - অ্যাডমিন পরে আসল ভিডিও আইডি দিয়ে বদলাবেন
      durationMinutes: 8,
      transcript:
        "আজকের লেসনে আমরা জানব তাজবীদ কী। তাজবীদ শব্দের অর্থ 'উন্নত করা' বা 'সুন্দর করা'। কুরআন তেলাওয়াতের ক্ষেত্রে তাজবীদ বলতে বোঝায় প্রতিটি হরফ তার সঠিক মাখরাজ (উচ্চারণস্থল) ও গুণাবলী অনুযায়ী উচ্চারণ করা...",
      referenceNotes: "রেফারেন্স: নূরানী কায়দা, তাজভীদ আল-কুরআন (শাইখ আইমান রুশদি)",
      isFreePreview: true, // প্রথম লেসন ফ্রি প্রিভিউ - এনরোলমেন্ট ছাড়াই দেখা যাবে
      quiz: [
        {
          type: "mcq" as const,
          questionText: "তাজবীদ শব্দের অর্থ কী?",
          options: ["দ্রুত পড়া", "উন্নত/সুন্দর করা", "মুখস্থ করা", "অনুবাদ করা"],
          correctOptionIndex: 1,
        },
        {
          type: "true_false" as const,
          questionText: "তাজবীদ শেখা সব মুসলিমের জন্য (ফরজে আইন) বাধ্যতামূলক।",
          correctBoolAnswer: false,
        },
      ],
    },
    {
      title: "মাখরাজ পরিচিতি: উচ্চারণস্থল",
      summary: "আরবি হরফের বিভিন্ন উচ্চারণস্থল (হালক, জিহ্বা, ঠোঁট) নিয়ে বিস্তারিত।",
      youtubeVideoId: "dQw4w9WgXcQ",
      durationMinutes: 12,
      transcript:
        "মাখরাজ মানে হলো যেখান থেকে একটি হরফের ধ্বনি উৎপন্ন হয়। প্রধানত ৫টি মূল মাখরাজ রয়েছে: জাওফ (মুখগহ্বর), হালক (কণ্ঠনালী), লিসান (জিহ্বা), শাফাতাইন (দুই ঠোঁট), এবং খাইশুম (নাসিকা)...",
      referenceNotes: "প্রতিটি মাখরাজের বিস্তারিত ডায়াগ্রাম পরবর্তী Makhraj Studio মডিউলে পাবেন।",
      isFreePreview: false,
      quiz: [
        {
          type: "mcq" as const,
          questionText: "নিচের কোনটি মূল মাখরাজের অংশ নয়?",
          options: ["হালক (কণ্ঠনালী)", "লিসান (জিহ্বা)", "আনফ (নাক ফুঁকরা)", "শাফাতাইন (ঠোঁট)"],
          correctOptionIndex: 2,
        },
        {
          type: "short_answer" as const,
          questionText: "আপনার মতে মাখরাজ শেখা কেন গুরুত্বপূর্ণ? সংক্ষেপে লিখুন।",
        },
      ],
    },
    {
      title: "নূন সাকিন ও তানভীনের হুকুম",
      summary: "ইজহার, ইদগাম, ইকলাব ও ইখফা - চারটি হুকুম এবং তাদের উদাহরণ।",
      youtubeVideoId: "dQw4w9WgXcQ",
      durationMinutes: 15,
      transcript:
        "নূন সাকিন বা তানভীনের পরে কোন হরফ আসলে কী নিয়ম প্রযোজ্য হবে তা নির্ভর করে ৪টি হুকুমের উপর: ইজহার (স্পষ্ট উচ্চারণ), ইদগাম (মিলিয়ে পড়া), ইকলাব (পরিবর্তন), এবং ইখফা (গোপন/আধা-উচ্চারণ)...",
      referenceNotes: "প্রতিটি হুকুমের ২৮টি হরফের তালিকা মুখস্থ রাখা প্রয়োজন।",
      isFreePreview: false,
      quiz: [
        {
          type: "mcq" as const,
          questionText: "নূন সাকিনের কতটি হুকুম আছে?",
          options: ["২টি", "৩টি", "৪টি", "৫টি"],
          correctOptionIndex: 2,
        },
        {
          type: "true_false" as const,
          questionText: "ইখফা মানে হলো সম্পূর্ণ স্পষ্টভাবে উচ্চারণ করা।",
          correctBoolAnswer: false,
        },
      ],
    },
  ];

  for (let i = 0; i < lessonsData.length; i++) {
    const { quiz, ...lessonInfo } = lessonsData[i];

    const lessonData = createDefaultLesson({
      courseId,
      title: lessonInfo.title,
      order: i,
      summary: lessonInfo.summary,
    });
    lessonData.youtubeVideoId = lessonInfo.youtubeVideoId;
    lessonData.durationMinutes = lessonInfo.durationMinutes;
    lessonData.transcript = lessonInfo.transcript;
    lessonData.referenceNotes = lessonInfo.referenceNotes;
    lessonData.isFreePreview = lessonInfo.isFreePreview;

    const lessonId = await createLesson(courseId, lessonData);

    // কুইজ প্রশ্ন যোগ করা - Firestore undefined গ্রহণ করে না,
    // তাই প্রশ্নের ধরন অনুযায়ী conditional object তৈরি করা হচ্ছে
    for (let qIndex = 0; qIndex < quiz.length; qIndex++) {
      const q = quiz[qIndex];
      const base = {
        lessonId,
        courseId,
        order: qIndex,
        type: q.type,
        questionText: q.questionText,
        points: 1,
      };

      if (q.type === "mcq") {
        await createQuizQuestion(courseId, lessonId, {
          ...base,
          options: q.options,
          correctOptionIndex: q.correctOptionIndex,
        });
      } else if (q.type === "true_false") {
        await createQuizQuestion(courseId, lessonId, {
          ...base,
          correctBoolAnswer: q.correctBoolAnswer,
        });
      } else {
        await createQuizQuestion(courseId, lessonId, base);
      }
    }
  }

  return {
    courseId,
    message: `স্যাম্পল কোর্স "${courseData.title}" তৈরি হয়েছে, সাথে ${lessonsData.length}টি লেসন ও কুইজ প্রশ্ন যুক্ত হয়েছে।`,
  };
}
