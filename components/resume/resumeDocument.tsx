import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 2 },
  contact: { fontSize: 10, color: "#555", marginBottom: 16 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 6,
    borderBottom: "1px solid #ccc",
    paddingBottom: 2,
  },
  entryTitle: { fontSize: 11, fontWeight: "bold" },
  entrySubtitle: { fontSize: 10, color: "#555", marginBottom: 2 },
  entryBody: { fontSize: 10, marginBottom: 8, lineHeight: 1.4 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skillChip: {
    fontSize: 9,
    backgroundColor: "#e6f4f1",
    color: "#0D9488",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginRight: 6,
    marginBottom: 6,
  },
});

type ResumeData = {
  name: string;
  email: string;
  location?: string;
  jobTitle?: string;
  highestDegree?: string;
  fieldOfStudy?: string;
  workExperiences: {
    jobTitle: string;
    company: string;
    startDate: Date;
    endDate: Date | null;
    rolesAndResponsibilities: string;
  }[];
  skills: string[];
  certifications: { name: string; platform: string }[];
};

function formatDate(date: Date | null) {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function ResumeDocument({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.contact}>
          {data.email}
          {data.location ? ` · ${data.location}` : ""}
          {data.jobTitle ? ` · ${data.jobTitle}` : ""}
        </Text>

        {(data.highestDegree || data.fieldOfStudy) && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            <Text style={styles.entryBody}>
              {data.highestDegree}
              {data.fieldOfStudy ? ` in ${data.fieldOfStudy}` : ""}
            </Text>
          </>
        )}

        {data.workExperiences.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {data.workExperiences.map((exp, i) => (
              <View key={i}>
                <Text style={styles.entryTitle}>{exp.jobTitle}</Text>
                <Text style={styles.entrySubtitle}>
                  {exp.company} · {formatDate(exp.startDate)} -{" "}
                  {formatDate(exp.endDate)}
                </Text>
                <Text style={styles.entryBody}>
                  {exp.rolesAndResponsibilities}
                </Text>
              </View>
            ))}
          </>
        )}

        {data.skills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {data.skills.map((skill) => (
                <Text key={skill} style={styles.skillChip}>
                  {skill}
                </Text>
              ))}
            </View>
          </>
        )}

        {data.certifications.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, i) => (
              <Text key={i} style={styles.entryBody}>
                {cert.name} — {cert.platform}
              </Text>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
