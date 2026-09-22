export function buildCourseSearchUrl(courseTitle: string) {
  return `https://www.coursera.org/search?query=${encodeURIComponent(courseTitle)}`;
}
