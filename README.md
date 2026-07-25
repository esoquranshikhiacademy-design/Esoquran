# এসো কুরআন শিখি একাডেমি

Phase 0-4 (Foundation, Home, Course/LMS, Self Assessment, Quran Learning Suite) + Phase 5 (Practice Zone + Quiz Center) — **সম্পূর্ণ**।

## এই ধাপে যা তৈরি হয়েছে

**Phase 0-4:** Auth, Home page, Course/Lesson/Quiz/Assignment/Enrollment সিস্টেম, Admin Panel, Self Assessment + Learning Path, Arabic Alphabet Studio, Makhraj Studio, Tajweed Lab, Quran Reading Lab।

**Phase 5 — Practice Zone + Quiz Center:**

*(নোট: ডকুমেন্টের Gamification ও Certificate System অংশ ইউজারের অনুরোধে এই ফেজে বাদ দেওয়া হয়েছে)*

`/practice-zone` — হাব পেজ, ৮টা গেমের প্রবেশদ্বার। প্রতিটা গেমের স্কোর **শুধু সেশন-ভিত্তিক** (React state এ), Firestore এ সেভ হয় না — পেজ ছাড়লে হারিয়ে যাবে (ইচ্ছাকৃত সিদ্ধান্ত)।

| গেম | ডেটা সোর্স | অবস্থা |
|---|---|---|
| Letter Matching | আরবি বর্ণমালা (অক্ষর ↔ নাম) | ✅ |
| Word Matching | আরবি বর্ণমালার exampleWords (শব্দ ↔ অর্থ) | ✅ |
| Drag & Drop | আরবি বর্ণমালা (বর্ণক্রম সাজানো, framer-motion Reorder) | ✅ |
| Listening Test | audio প্রয়োজন | ⏳ শীঘ্রই (audio সিস্টেম আসার পর) |
| Memory Game | আরবি বর্ণমালা (কার্ড ফ্লিপ, জোড়া মেলানো) | ✅ |
| Speed Reading | Reading Lab এর সূরা (সময় মেপে পড়া, WPM হিসাব) | ✅ |
| Missing Letter | Reading Lab এর আয়াত (ফাঁকা শব্দ পূরণ, MCQ স্টাইল) | ✅ |
| Arrange Ayah | Reading Lab এর আয়াত (শব্দ সাজিয়ে আয়াত তৈরি) | ✅ |

`/quiz-center` — কেন্দ্রীয় কুইজ ইঞ্জিন। Firestore এর `collectionGroup("quiz")` কুয়েরি দিয়ে **সব প্রকাশিত কোর্সের সব লেসনের quiz প্রশ্ন** একত্রিত করে দেখায় (MCQ + True/False + Short Answer)। কোর্স অনুযায়ী ফিল্টার ও র‍্যান্ডম শাফল বাটন আছে। এটা মূলত স্ব-মূল্যায়ন/রিভিউ টুল — উত্তর দিলে সাথে সাথে সঠিক/ভুল দেখায় কিন্তু কোনো ফলাফল সেভ হয় না বা Course Lesson Quiz-এর (Phase 2) progress/score-কে প্রভাবিত করে না।

**গুরুত্বপূর্ণ কারিগরি নোট:**
- `collectionGroup("quiz")` কুয়েরির জন্য `firestore.rules`-এ একটা নতুন **wildcard rule** (`match /{path=**}/quiz/{questionId}`) যোগ করতে হয়েছে — সাধারণ nested rule (`courses/{courseId}/lessons/{lessonId}/quiz/{questionId}`) collectionGroup কুয়েরিতে কাজ করে না, এটা Firestore-এর নিজস্ব সীমাবদ্ধতা।
- Quiz Center শুধু `status: "published"` কোর্সের প্রশ্ন দেখায় (draft কোর্সের quiz বাদ)।
- **দুটো ছোট bug ধরে ফিক্স করা হয়েছে এই ব্যাচে:**
  1. Word Matching গেমে আরবি শব্দের `exampleWords` ডেটাসেটে দুইটা ডুপ্লিকেট বাংলা অর্থ ("আলো", "ছাত্র") ছিল, যা একই রাউন্ডে দুইবার এলে মেলানো অস্পষ্ট করে ফেলতো — এখন `buildWordPool()`-এ deduplication যোগ করা হয়েছে।
  2. Quiz Center-এর `getAllQuizQuestionsForCenter()` প্রথমে lesson-এর Firestore ডকুমেন্ট আইডি-কে ভুলবশত "lesson title" হিসেবে দেখানোর চেষ্টা করছিল; এই জটিলতা ও সংশ্লিষ্ট permission সমস্যা এড়াতে `lessonTitle` ফিল্ড বাদ দিয়ে শুধু `courseTitle` রাখা হয়েছে।

---

## GitHub এ আপলোড করার আগে/পরে যা করতে হবে

**⚠️ এই ফেজে `firestore.rules` পরিবর্তন হয়েছে — নতুন করে Firebase Console এ Publish করতে হবে**, নাহলে Quiz Center কাজ করবে না (permission-denied error আসবে)।

চেকলিস্ট:
1. Firebase project + Auth (Email/Password + Google) + Firestore + Storage
2. **`firestore.rules` নতুন করে Publish করুন** (Quiz Center এর জন্য নতুন wildcard rule যোগ হয়েছে)
3. `storage.rules` Publish করা (আগে থেকে করা থাকলে আবার করার দরকার নেই)
4. Vercel এ `.env.local.example` অনুযায়ী env variables বসানো
5. প্রথম admin অ্যাকাউন্ট (Firestore Console থেকে ম্যানুয়ালি `role: "admin"` সেট করা)
6. Authentication > Authorized domains এ Vercel domain যোগ করা

---

## Firestore Data Model সারসংক্ষেপ

```
users/{uid}
courses/{courseId}
  └── lessons/{lessonId}
        ├── quiz/{questionId}          ← Quiz Center collectionGroup দিয়ে এখান থেকে সব প্রশ্ন আনে
        ├── assignmentSubmissions/{userId}
        └── comments/{commentId}
enrollments/{userId_courseId}
lessonProgress/{userId_lessonId}
quizAttempts/{userId_lessonId}
assessmentResults/{userId}
dailyContent/{date}
contactMessages/{id}
```

(Practice Zone এর গেম ডেটা এবং Phase 4 এর আরবি অক্ষর/মাখরাজ/তাজবীদ/সূরা ডেটা Firestore এ নেই — কোডে static থাকে, `src/lib/data/`)

---

## পরবর্তী ধাপ

- **Phase 6**: Knowledge Center + Quran Explorer (বাকি ১০০টা সূরা এখানে যোগ হতে পারে)
- **Phase 7**: Admin Analytics, Multi-language পূর্ণাঙ্গকরণ, Accessibility, SEO, Performance

*(Gamification ও Certificate System, যা মূল ডকুমেন্টে Phase 5 এর অংশ ছিল, ইউজারের সিদ্ধান্তে স্কোপের বাইরে রাখা হয়েছে — ভবিষ্যতে আলাদা ফেজ হিসেবে যোগ করা যাবে প্রয়োজন হলে)*

কোন ফেজ থেকে এগোতে চান জানালেই পরের ব্যাচের ফাইল তৈরি করে দেওয়া হবে।





