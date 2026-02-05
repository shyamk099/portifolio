import json
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors

ROOT = Path(__file__).resolve().parents[1]
RESUME_PATH = ROOT / "src" / "data" / "resume.json"
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_PATH = OUTPUT_DIR / "resume.pdf"


def build_resume(data):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=letter,
        leftMargin=0.85 * inch,
        rightMargin=0.85 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch,
    )

    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="Name", fontSize=22, leading=26, spaceAfter=6))
    styles.add(ParagraphStyle(name="Role", fontSize=12, leading=16, textColor=colors.grey))
    styles.add(ParagraphStyle(name="Section", fontSize=12, leading=16, spaceBefore=14, spaceAfter=6))
    styles.add(ParagraphStyle(name="Body", fontSize=10.5, leading=14))

    basics = data.get("basics", {})
    story = []

    story.append(Paragraph(basics.get("name", ""), styles["Name"]))
    story.append(Paragraph(basics.get("label", ""), styles["Role"]))
    story.append(Paragraph(basics.get("summary", ""), styles["Body"]))
    story.append(Spacer(1, 0.2 * inch))

    contact = f"Email: {basics.get('email', '')} | Location: {basics.get('location', '')}"
    story.append(Paragraph(contact, styles["Body"]))
    story.append(Spacer(1, 0.3 * inch))

    def add_section(title, paragraphs):
        story.append(Paragraph(title, styles["Section"]))
        for text in paragraphs:
            story.append(Paragraph(text, styles["Body"]))
            story.append(Spacer(1, 0.1 * inch))

    about = data.get("about", {})
    if about.get("description"):
        add_section("About", [about.get("description")])

    work = data.get("work", [])
    if work:
        story.append(Paragraph("Experience", styles["Section"]))
        for item in work:
            header = f"<b>{item.get('position', '')}</b> · {item.get('company', '')} ({item.get('startDate', '')} - {item.get('endDate', 'Present')})"
            story.append(Paragraph(header, styles["Body"]))
            story.append(Paragraph(item.get("summary", ""), styles["Body"]))
            for highlight in item.get("highlights", []) or []:
                story.append(Paragraph(f"- {highlight}", styles["Body"]))
            story.append(Spacer(1, 0.12 * inch))

    skills = data.get("skills", [])
    if skills:
        skill_rows = [[skill.get("name", ""), ", ".join(skill.get("keywords", []) or [])] for skill in skills]
        story.append(Paragraph("Skills", styles["Section"]))
        table = Table(skill_rows, colWidths=[1.5 * inch, 4.5 * inch])
        table.setStyle(
            TableStyle(
                [
                    ("TEXTCOLOR", (0, 0), (-1, -1), colors.grey),
                    ("FONT", (0, 0), (-1, -1), "Helvetica", 9),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                ]
            )
        )
        story.append(table)
        story.append(Spacer(1, 0.2 * inch))

    projects = data.get("projects", [])
    if projects:
        story.append(Paragraph("Projects", styles["Section"]))
        for item in projects:
            story.append(Paragraph(f"<b>{item.get('name', '')}</b> — {item.get('role', '')}", styles["Body"]))
            story.append(Paragraph(item.get("summary", ""), styles["Body"]))
            story.append(Spacer(1, 0.1 * inch))

    education = data.get("education", [])
    if education:
        story.append(Paragraph("Education", styles["Section"]))
        for item in education:
            line = f"{item.get('institution', '')} — {item.get('studyType', '')} {item.get('area', '')}"
            story.append(Paragraph(line.strip(), styles["Body"]))

    doc.build(story)


if __name__ == "__main__":
    data = json.loads(RESUME_PATH.read_text())
    build_resume(data)
    print(f"Generated {OUTPUT_PATH}")
