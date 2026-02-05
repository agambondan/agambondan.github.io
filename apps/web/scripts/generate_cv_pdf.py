#!/usr/bin/env python3
import json
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[3]
CV_DIR = ROOT / "packages" / "cv-data" / "locales"
OUT_DIR = ROOT / "apps" / "web" / "public" / "cv"
OUT_DIR.mkdir(parents=True, exist_ok=True)

PAGE_W, PAGE_H = A4
MARGIN_X = 42

WEB = {
    "header": colors.HexColor("#151F46"),
    "header_alt": colors.HexColor("#1F2D66"),
    "accent": colors.HexColor("#35B7F5"),
    "accent_soft": colors.HexColor("#7567EC"),
    "ink": colors.HexColor("#18233E"),
    "muted": colors.HexColor("#4F5E7F"),
    "divider": colors.HexColor("#D7E1F4"),
    "card": colors.HexColor("#F4F8FF"),
}

DOC = {
    "header": colors.HexColor("#262A36"),
    "header_alt": colors.HexColor("#3A4154"),
    "accent": colors.HexColor("#6576B4"),
    "accent_soft": colors.HexColor("#BBC5E5"),
    "ink": colors.HexColor("#222838"),
    "muted": colors.HexColor("#57617A"),
    "divider": colors.HexColor("#D9DEE9"),
    "card": colors.HexColor("#F8F9FC"),
}

ATS = {
    "header": colors.HexColor("#222222"),
    "header_alt": colors.HexColor("#3A3A3A"),
    "accent": colors.HexColor("#4A4A4A"),
    "accent_soft": colors.HexColor("#6B6B6B"),
    "ink": colors.HexColor("#141414"),
    "muted": colors.HexColor("#4D4D4D"),
    "divider": colors.HexColor("#CFCFCF"),
    "card": colors.HexColor("#FFFFFF"),
}

LABELS = {
    "en": {
        "summary": "Summary",
        "skills": "Core Skills",
        "experience": "Experience",
        "continued": "Experience Continued",
        "education": "Education",
        "languages": "Languages",
        "links": "Links",
        "highlights": "Highlights",
        "footer": "Auto-generated from the latest profile data.",
    },
    "id": {
        "summary": "Ringkasan",
        "skills": "Keahlian Inti",
        "experience": "Pengalaman",
        "continued": "Lanjutan Pengalaman",
        "education": "Pendidikan",
        "languages": "Bahasa",
        "links": "Tautan",
        "highlights": "Sorotan",
        "footer": "Dibuat otomatis dari data profil terbaru.",
    },
}


def wrap_lines(c: canvas.Canvas, text: str, width: float, font_name: str, font_size: float):
    c.setFont(font_name, font_size)
    words = " ".join(text.split()).split(" ")
    lines = []
    line = ""
    for word in words:
        test = f"{line} {word}".strip()
        if c.stringWidth(test, font_name, font_size) <= width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_text_block(c, text, x, y, width, font_name, font_size, leading, color):
    c.setFillColor(color)
    lines = wrap_lines(c, text, width, font_name, font_size)
    cursor = y
    for line in lines:
        c.setFont(font_name, font_size)
        c.drawString(x, cursor, line)
        cursor -= leading
    return cursor


def draw_section_title(c, text, y, palette):
    c.setFillColor(palette["ink"])
    c.setFont("Helvetica-Bold", 12.2)
    c.drawString(MARGIN_X, y, text)
    c.setStrokeColor(palette["divider"])
    c.setLineWidth(1)
    c.line(MARGIN_X, y - 6, PAGE_W - MARGIN_X, y - 6)
    c.setStrokeColor(palette["accent"])
    c.setLineWidth(2.4)
    c.line(MARGIN_X, y - 6, MARGIN_X + 36, y - 6)
    return y - 22


def draw_chip(c, text, x, y, palette):
    c.setFont("Helvetica", 8.2)
    tw = c.stringWidth(text, "Helvetica", 8.2)
    w = tw + 12
    c.setFillColor(palette["accent_soft"])
    c.roundRect(x, y - 9, w, 14, 6, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.drawString(x + 6, y - 4.2, text)
    return x + w + 6


def draw_experience_card(c, item, y, palette, max_bullets=4):
    card_h = 24 + (max_bullets * 16)
    c.setFillColor(palette["card"])
    c.roundRect(MARGIN_X, y - card_h + 6, PAGE_W - (MARGIN_X * 2), card_h, 8, stroke=0, fill=1)

    c.setFillColor(palette["ink"])
    c.setFont("Helvetica-Bold", 11)
    c.drawString(MARGIN_X + 10, y - 8, f"{item['role']} - {item['company']}")

    c.setFillColor(palette["muted"])
    c.setFont("Helvetica", 8.8)
    c.drawString(MARGIN_X + 10, y - 21, f"{item['location']} | {item['period']['start']} - {item['period']['end']}")

    by = y - 36
    for bullet in item["bullets"][:max_bullets]:
        bullet_lines = wrap_lines(c, f"- {bullet}", PAGE_W - (MARGIN_X * 2) - 24, "Helvetica", 8.8)
        for line in bullet_lines:
            c.setFillColor(palette["ink"])
            c.setFont("Helvetica", 8.8)
            c.drawString(MARGIN_X + 12, by, line)
            by -= 10.5

    return y - card_h - 8


def draw_footer(c, text_left, text_right, palette):
    c.setStrokeColor(palette["divider"])
    c.setLineWidth(1)
    c.line(MARGIN_X, 52, PAGE_W - MARGIN_X, 52)
    c.setFillColor(palette["muted"])
    c.setFont("Helvetica", 8)
    c.drawString(MARGIN_X, 38, text_left)
    c.drawRightString(PAGE_W - MARGIN_X, 38, text_right)


def render_web(locale):
    cv = json.loads((CV_DIR / locale / "cv.json").read_text())
    t = LABELS[locale]
    out = OUT_DIR / f"firman-agam-cv-web-{locale}.pdf"
    c = canvas.Canvas(str(out), pagesize=A4)
    p = WEB

    # Page 1 hero
    c.setFillColor(p["header"])
    c.rect(0, PAGE_H - 130, PAGE_W, 130, stroke=0, fill=1)
    c.setFillColor(p["header_alt"])
    c.rect(PAGE_W - 200, PAGE_H - 130, 200, 130, stroke=0, fill=1)
    c.setFillColor(p["accent"])
    c.circle(PAGE_W - 76, PAGE_H - 68, 52, stroke=0, fill=1)
    c.setFillColor(p["accent_soft"])
    c.circle(PAGE_W - 128, PAGE_H - 88, 28, stroke=0, fill=1)

    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 27)
    c.drawString(MARGIN_X, PAGE_H - 56, cv["identity"]["name"])
    c.setFont("Helvetica", 13)
    c.drawString(MARGIN_X, PAGE_H - 78, cv["identity"]["title"])
    c.setFont("Helvetica", 9)
    c.drawString(MARGIN_X, PAGE_H - 96, f"{cv['identity']['location']} | {cv['identity']['email']} | {cv['identity']['phone']}")

    y = PAGE_H - 152
    y = draw_section_title(c, t["summary"], y, p)
    y = draw_text_block(c, cv["summary"], MARGIN_X, y, PAGE_W - (MARGIN_X * 2), "Helvetica", 9.8, 12.6, p["ink"]) - 4

    y = draw_section_title(c, t["skills"], y, p)
    chip_y = y
    for group in ["backend", "frontend", "architecture", "tooling"]:
        x = MARGIN_X
        c.setFillColor(p["muted"])
        c.setFont("Helvetica-Bold", 8.8)
        c.drawString(x, chip_y, group.capitalize())
        x += 66
        for skill in cv["skills"][group][:4]:
            x = draw_chip(c, skill, x, chip_y, p)
        chip_y -= 18
    y = chip_y - 2

    y = draw_section_title(c, t["experience"], y, p)
    exp = cv["experience"]
    if exp:
        y = draw_experience_card(c, exp[0], y, p, 4)
    if len(exp) > 1:
        y = draw_experience_card(c, exp[1], y, p, 3)

    c.showPage()

    # Page 2
    c.setFillColor(p["header"])
    c.rect(0, PAGE_H - 64, PAGE_W, 64, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(MARGIN_X, PAGE_H - 38, f"{cv['identity']['name']} - {t['continued']}")

    y2 = PAGE_H - 90
    y2 = draw_section_title(c, t["continued"], y2, p)
    for idx, item in enumerate(exp[2:]):
        y2 = draw_experience_card(c, item, y2, p, 2 if idx > 1 else 3)

    # Two-column bottom
    col_x = MARGIN_X
    col_w = (PAGE_W - (MARGIN_X * 2) - 16) / 2
    right_x = col_x + col_w + 16

    y_left = y2
    c.setFillColor(p["ink"])
    c.setFont("Helvetica-Bold", 11)
    c.drawString(col_x, y_left, t["education"])
    c.setStrokeColor(p["divider"])
    c.line(col_x, y_left - 4, col_x + col_w, y_left - 4)
    y_left -= 18
    for edu in cv["education"]:
        y_left = draw_text_block(c, f"{edu['institution']} - {edu['degree']}", col_x, y_left, col_w, "Helvetica-Bold", 9.3, 11, p["ink"])
        y_left = draw_text_block(c, f"{edu['location']} | {edu['period']['start']} - {edu['period']['end']}", col_x, y_left, col_w, "Helvetica", 8.6, 10.6, p["muted"]) - 3

    y_right = y2
    c.setFillColor(p["ink"])
    c.setFont("Helvetica-Bold", 11)
    c.drawString(right_x, y_right, t["languages"])
    c.setStrokeColor(p["divider"])
    c.line(right_x, y_right - 4, right_x + col_w, y_right - 4)
    y_right -= 18
    for lang in cv["languages"]:
        y_right = draw_text_block(c, f"{lang['name']}: {lang['proficiency']}", right_x, y_right, col_w, "Helvetica", 8.8, 11, p["ink"])

    y_right -= 10
    c.setFillColor(p["ink"])
    c.setFont("Helvetica-Bold", 11)
    c.drawString(right_x, y_right, t["links"])
    c.setStrokeColor(p["divider"])
    c.line(right_x, y_right - 4, right_x + col_w, y_right - 4)
    y_right -= 18

    link_lines = [
        f"Product: {cv['links']['product']}",
        f"Portfolio: {cv['links']['portfolio']}",
        f"GitHub: {cv['links']['github']}",
    ]
    if cv["links"].get("linkedin"):
        link_lines.append(f"LinkedIn: {cv['links']['linkedin']}")

    for line in link_lines:
        y_right = draw_text_block(c, line, right_x, y_right, col_w, "Helvetica", 8.4, 10.4, p["ink"])

    draw_footer(c, t["footer"], f"Generated for {cv['identity']['name']}", p)
    c.save()
    return out


def render_doc(locale):
    cv = json.loads((CV_DIR / locale / "cv.json").read_text())
    t = LABELS[locale]
    out = OUT_DIR / f"firman-agam-cv-doc-{locale}.pdf"
    c = canvas.Canvas(str(out), pagesize=A4)
    p = DOC

    # Page 1 formal masthead
    c.setFillColor(p["header"])
    c.rect(0, PAGE_H - 96, PAGE_W, 96, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 24)
    c.drawString(MARGIN_X, PAGE_H - 52, cv["identity"]["name"])
    c.setFont("Helvetica", 12)
    c.drawString(MARGIN_X, PAGE_H - 71, cv["identity"]["title"])
    c.setFont("Helvetica", 8.8)
    c.drawString(MARGIN_X, PAGE_H - 86, cv["identity"]["location"])

    c.setFillColor(colors.white)
    c.setFont("Helvetica", 8.6)
    c.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 64, cv["identity"]["email"])
    c.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 78, cv["identity"]["phone"])

    y = PAGE_H - 120
    y = draw_section_title(c, t["summary"], y, p)
    y = draw_text_block(c, cv["summary"], MARGIN_X, y, PAGE_W - (MARGIN_X * 2), "Helvetica", 9.6, 12.2, p["ink"]) - 2

    # Highlights panel
    c.setFillColor(p["card"])
    c.roundRect(MARGIN_X, y - 74, PAGE_W - (MARGIN_X * 2), 68, 6, stroke=0, fill=1)
    c.setFillColor(p["ink"])
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(MARGIN_X + 10, y - 22, t["highlights"])
    c.setFont("Helvetica", 8.8)
    highlights = [
        cv["experience"][0]["bullets"][0],
        cv["experience"][0]["bullets"][1],
        cv["experience"][0]["bullets"][2],
    ]
    hy = y - 36
    for h in highlights:
        hy = draw_text_block(c, f"- {h}", MARGIN_X + 10, hy, PAGE_W - (MARGIN_X * 2) - 20, "Helvetica", 8.6, 10.4, p["ink"])

    y = y - 86
    y = draw_section_title(c, t["skills"], y, p)

    left_x = MARGIN_X
    right_x = MARGIN_X + (PAGE_W - (MARGIN_X * 2)) / 2
    col_w = (PAGE_W - (MARGIN_X * 2)) / 2 - 6

    groups = [
        ("Backend", cv["skills"]["backend"]),
        ("Frontend", cv["skills"]["frontend"]),
        ("Architecture", cv["skills"]["architecture"]),
        ("Tooling", cv["skills"]["tooling"]),
    ]

    yl = y
    yr = y
    for idx, (label, values) in enumerate(groups):
        if idx % 2 == 0:
            c.setFont("Helvetica-Bold", 9)
            c.setFillColor(p["ink"])
            c.drawString(left_x, yl, label)
            yl = draw_text_block(c, ", ".join(values), left_x, yl - 11, col_w, "Helvetica", 8.4, 10.2, p["muted"]) - 4
        else:
            c.setFont("Helvetica-Bold", 9)
            c.setFillColor(p["ink"])
            c.drawString(right_x, yr, label)
            yr = draw_text_block(c, ", ".join(values), right_x, yr - 11, col_w, "Helvetica", 8.4, 10.2, p["muted"]) - 4

    y = min(yl, yr) - 2
    y = draw_section_title(c, t["experience"], y, p)
    exp = cv["experience"]
    if exp:
        y = draw_experience_card(c, exp[0], y, p, 4)
    if len(exp) > 1:
        y = draw_experience_card(c, exp[1], y, p, 3)

    c.showPage()

    # Page 2 simple formal continuation
    c.setFillColor(p["header_alt"])
    c.rect(0, PAGE_H - 54, PAGE_W, 54, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 12.4)
    c.drawString(MARGIN_X, PAGE_H - 34, f"{cv['identity']['name']} - {t['continued']}")

    y2 = PAGE_H - 80
    y2 = draw_section_title(c, t["continued"], y2, p)
    for idx, item in enumerate(exp[2:]):
        y2 = draw_experience_card(c, item, y2, p, 2 if idx > 1 else 3)

    y2 = draw_section_title(c, t["education"], y2, p)
    for edu in cv["education"]:
        y2 = draw_text_block(c, f"{edu['institution']} - {edu['degree']}", MARGIN_X, y2, PAGE_W - (MARGIN_X * 2), "Helvetica-Bold", 9.4, 11, p["ink"])
        y2 = draw_text_block(c, f"{edu['location']} | {edu['period']['start']} - {edu['period']['end']}", MARGIN_X, y2, PAGE_W - (MARGIN_X * 2), "Helvetica", 8.6, 10.5, p["muted"]) - 3

    y2 = draw_section_title(c, t["languages"], y2, p)
    for lang in cv["languages"]:
        y2 = draw_text_block(c, f"{lang['name']}: {lang['proficiency']}", MARGIN_X, y2, PAGE_W - (MARGIN_X * 2), "Helvetica", 8.8, 10.8, p["ink"])

    y2 = draw_section_title(c, t["links"], y2 - 2, p)
    link_lines = [
        f"Product: {cv['links']['product']}",
        f"Portfolio: {cv['links']['portfolio']}",
        f"GitHub: {cv['links']['github']}",
    ]
    if cv["links"].get("linkedin"):
        link_lines.append(f"LinkedIn: {cv['links']['linkedin']}")
    for line in link_lines:
        y2 = draw_text_block(c, line, MARGIN_X, y2, PAGE_W - (MARGIN_X * 2), "Helvetica", 8.6, 10.5, p["ink"])

    draw_footer(c, t["footer"], f"Generated for {cv['identity']['name']}", p)
    c.save()
    return out


def render_ats(locale):
    cv = json.loads((CV_DIR / locale / "cv.json").read_text())
    t = LABELS[locale]
    out = OUT_DIR / f"firman-agam-cv-ats-{locale}.pdf"
    c = canvas.Canvas(str(out), pagesize=A4)
    p = ATS

    c.setFillColor(p["header"])
    c.rect(0, PAGE_H - 78, PAGE_W, 78, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(MARGIN_X, PAGE_H - 44, cv["identity"]["name"])
    c.setFont("Helvetica", 11)
    c.drawString(MARGIN_X, PAGE_H - 61, cv["identity"]["title"])
    c.setFont("Helvetica", 8.4)
    c.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 44, cv["identity"]["email"])
    c.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 58, cv["identity"]["phone"])
    c.drawRightString(PAGE_W - MARGIN_X, PAGE_H - 72, cv["identity"]["location"])

    y = PAGE_H - 104
    y = draw_section_title(c, t["summary"], y, p)
    y = draw_text_block(c, cv["summary"], MARGIN_X, y, PAGE_W - (MARGIN_X * 2), "Helvetica", 9.4, 12, p["ink"]) - 4

    y = draw_section_title(c, t["experience"], y, p)
    exp = cv["experience"]
    if exp:
        y = draw_experience_card(c, exp[0], y, p, 5)
    if len(exp) > 1:
        y = draw_experience_card(c, exp[1], y, p, 4)

    c.showPage()

    c.setFillColor(p["header_alt"])
    c.rect(0, PAGE_H - 48, PAGE_W, 48, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 11.8)
    c.drawString(MARGIN_X, PAGE_H - 30, f"{cv['identity']['name']} - {t['continued']}")

    y2 = PAGE_H - 72
    y2 = draw_section_title(c, t["continued"], y2, p)
    for idx, item in enumerate(exp[2:]):
        y2 = draw_experience_card(c, item, y2, p, 3 if idx < 2 else 2)

    y2 = draw_section_title(c, t["skills"], y2, p)
    for label, values in [
        ("Backend", cv["skills"]["backend"]),
        ("Frontend", cv["skills"]["frontend"]),
        ("Architecture", cv["skills"]["architecture"]),
        ("Tooling", cv["skills"]["tooling"]),
    ]:
        y2 = draw_text_block(
            c,
            f"{label}: {', '.join(values)}",
            MARGIN_X,
            y2,
            PAGE_W - (MARGIN_X * 2),
            "Helvetica",
            8.6,
            10.5,
            p["ink"],
        )
    y2 -= 2

    y2 = draw_section_title(c, t["education"], y2, p)
    for edu in cv["education"]:
        y2 = draw_text_block(c, f"{edu['institution']} - {edu['degree']}", MARGIN_X, y2, PAGE_W - (MARGIN_X * 2), "Helvetica-Bold", 9.2, 10.8, p["ink"])
        y2 = draw_text_block(c, f"{edu['location']} | {edu['period']['start']} - {edu['period']['end']}", MARGIN_X, y2, PAGE_W - (MARGIN_X * 2), "Helvetica", 8.4, 10.2, p["muted"]) - 3

    y2 = draw_section_title(c, t["languages"], y2, p)
    for lang in cv["languages"]:
        y2 = draw_text_block(c, f"{lang['name']}: {lang['proficiency']}", MARGIN_X, y2, PAGE_W - (MARGIN_X * 2), "Helvetica", 8.5, 10.3, p["ink"])

    y2 = draw_section_title(c, t["links"], y2, p)
    links = [
        f"Product: {cv['links']['product']}",
        f"Portfolio: {cv['links']['portfolio']}",
        f"GitHub: {cv['links']['github']}",
    ]
    if cv["links"].get("linkedin"):
        links.append(f"LinkedIn: {cv['links']['linkedin']}")
    for line in links:
        y2 = draw_text_block(c, line, MARGIN_X, y2, PAGE_W - (MARGIN_X * 2), "Helvetica", 8.4, 10.2, p["ink"])

    draw_footer(c, t["footer"], f"Generated for {cv['identity']['name']}", p)
    c.save()
    return out


if __name__ == "__main__":
    generated = []
    for locale in ("en", "id"):
        generated.append(render_web(locale))
        generated.append(render_doc(locale))
        generated.append(render_ats(locale))
    for file in generated:
        print("Generated:", file)
