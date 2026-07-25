import { getPublishedCourses } from "@/lib/services/courseService";
import type { Course, CourseLevel } from "@/types/course";
import type { OverallLevel } from "@/types/assessment";

/**
 * Assessment এর overallLevel সরাসরি Course.level এর সাথে টাইপ-সামঞ্জস্যপূর্ণ
 * (দুটোই "beginner" | "intermediate" | "advanced"), তাই কোনো ম্যাপিং দরকার নেই।
 */
function levelMatches(courseLevel: CourseLevel, userLevel: OverallLevel): boolean {
  return courseLevel === userLevel;
}

/**
 * ক্যাটাগরি ও লেভেল মিলিয়ে কোর্স সাজেস্ট করে।
 * অগ্রাধিকার: (１) category + level দুটোই মিলে যাওয়া কোর্স,
 * তারপর (２) শুধু category মিলে যাওয়া কোর্স, তারপর (３) শুধু level মিলে যাওয়া কোর্স।
 * কিছু না মিললে সাধারণ published কোর্স থেকে level অনুযায়ী সাজানো তালিকা ফেরত দেয়।
 */
export async function getRecommendedCourses(
  recommendedCategory: string,
  overallLevel: OverallLevel,
  limit = 3
): Promise<Course[]> {
  const allCourses = await getPublishedCourses();

  const exactMatch = allCourses.filter(
    (c) => c.category === recommendedCategory && levelMatches(c.level, overallLevel)
  );
  const categoryMatch = allCourses.filter(
    (c) => c.category === recommendedCategory && !levelMatches(c.level, overallLevel)
  );
  const levelMatch = allCourses.filter(
    (c) => c.category !== recommendedCategory && levelMatches(c.level, overallLevel)
  );

  const ordered = [...exactMatch, ...categoryMatch, ...levelMatch];
  return ordered.slice(0, limit);
}
