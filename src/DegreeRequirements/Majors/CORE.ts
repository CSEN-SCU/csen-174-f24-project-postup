// These are needed by all majors, makes sense to create a sep file for this
// Don't specify by class, rather specify by requirement
export const core_reqs_ENGR = [
  {
    requirement: "Core Explorations",
    courses: [
      { courseId: "Critical Thinking and Writing I" },
      { courseId: "Critical Thinking and Writing II" },
      { courseId: "Culture and Ideas I" },
      { courseId: "Culture and Ideas II" },
      { courseId: "Culture and Ideas III" },
      { courseId: "Religion, Theology and Culture I", courses: [

      ] },
      { courseId: "Religion, Theology and Culture II" },
      { courseId: "Religion, Theology and Culture III" },
      { courseId: "Ethics" },
      { courseId: "Diversity" },
      { courseId: "Civic Engagement" },
      { courseId: "Natural Sciences" },
      { courseId: "Arts" },
      { courseId: "Science, Technology, and Society" },
    ],
  },
  {
    requirement: "Integrations",
    courses: [
      { courseId: "Experiential Learning for Social Justice (ELSJ)" },
      { courseId: "Advanced Writing" },
    ],
  },
];
