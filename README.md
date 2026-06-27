# מדריך פסיכופיזיולוגיה
**מעבדה לפסיכולוגיה קלינית · אוניברסיטת בר-אילן**

אתר מדריך למדדים פיזיולוגיים בפסיכולוגיה קלינית — רקע היסטורי ותיאורטי,
EDA, ECG/RSA, ניתוח מקרה, ומשאבים. עברית RTL, נבנה ב-HTML/CSS/JS ללא framework.

---

## מבנה הקבצים

```
physiological-guide/
├── index.html              ← עמוד נחיתה (סגנון inline)
├── 404.html                ← עמוד שגיאה מעוצב
├── .nojekyll               ← אומר ל-GitHub Pages להגיש קבצים as-is
├── css/
│   └── shared.css          ← Design system משותף (5 הסקשנים הפנימיים)
├── intro/index.html        ← Section 1: רקע היסטורי ותיאורטי ✅ מלא
├── measures/index.html     ← Section 2: מפת המדדים 🗂 שלד
├── eda/index.html          ← Section 3: EDA 🗂 שלד
├── ecg-rsa/index.html      ← Section 4: ECG & RSA 🗂 שלד
├── case-study/index.html   ← Section 5: ניתוח מקרה ⏳ ממתין לנתונים
└── resources/index.html    ← Section 6: משאבים 🗂 שלד
```

> **הערה על סגנון:** `index.html` (עמוד הנחיתה) ו-`intro/index.html` מכילים
> את ה-CSS שלהם inline בתוך `<style>`. חמשת דפי הסקשן האחרים טוענים את
> `css/shared.css`. זה תקין ומכוון — אין צורך "לתקן" את זה.

---

## מצב התוכן

| Section | קובץ | סטטוס |
|---|---|---|
| 1 · רקע ועולם המחקר | `intro/` | ✅ מלא — 5 תתי-סקשנים + timeline אינטראקטיבי (22 אירועים) |
| 2 · מפת המדדים | `measures/` | 🗂 שלד עם placeholders מובנים |
| 3 · EDA | `eda/` | 🗂 שלד עם placeholders מובנים |
| 4 · ECG & RSA | `ecg-rsa/` | 🗂 שלד עם placeholders מובנים |
| 5 · ניתוח מקרה | `case-study/` | ⏳ שלד — ממתין לנתונים אמיתיים |
| 6 · משאבים | `resources/` | 🗂 שלד עם download slots |

---

## פריסה ל-GitHub Pages

ראה את קובץ ההנחיות `DEPLOY-claude-code-prompt.md` להוראות מלאות
ולפרומפט המוכן ל-Claude Code. בקצרה:

1. צור repository ציבורי חדש ב-GitHub.
2. העלה את כל תוכן התיקייה `physiological-guide/` ל-root של הריפו.
3. Settings → Pages → Source: `Deploy from a branch` → `main` / `(root)`.
4. האתר יעלה תוך 1–2 דקות בכתובת:
   `https://<USERNAME>.github.io/<REPO>/`

---

## טכנולוגיה

- HTML/CSS/JS vanilla — ללא תלויות build
- Google Fonts: Frank Ruhl Libre · Lato · Fira Code
- אין שלב קומפילציה, אין npm — הקבצים מוגשים כמו שהם
- מתאים מצוין ל-GitHub Pages / Netlify / Cloudflare Pages
