# Reference textbooks

The wording of challenge descriptions follows the two Romanian 9th-grade Informatics textbooks (Python, the curriculum that
applies from the 2026-2027 school year). They are the style and terminology reference for `style/challenge-description-style.md`.

| File | Textbook | Source |
| --- | --- | --- |
| `intuitext-informatica-9-mate-info.pdf` | Informatică, clasa a IX-a, matematică-informatică. Emanuela Cerchez, Mihai Nan, Dana Lica. Editura Intuitext, 2026 | https://www.digital.intuitext.ro/09inf_MI-Man/carte/ |
| `cdpress-informatica-9-mate-info.pdf` | Informatică, clasa a IX-a, matematică-informatică. Ioana Cosma, Alina Boca, Emanuela Pădurariu, Alina Pintescu, Corina Vinț. CD Press, 2026 | https://manuale.edu.ro (Clasa a IX-a → Informatică → CD PRESS) |

The PDFs and the extracted text are **not committed**. Get them with:

```bash
pip install pymupdf
python style/textbooks/fetch.py
```

This writes each PDF and a `.txt` next to it, one `===== PAGE n =====` marker per page, diacritics intact. (`pdftotext`
drops ă / ș / ț on these files; use the script.)

## How to use them

- Search the `.txt` files for how a concept or an exercise type is worded before writing about it:
  `grep -n -i "restul împărțirii" style/textbooks/*.txt`.
- Where the exercises are: Intuitext has "Exersează" and "Portofoliu digital" boxes at the end of each lesson and an
  "Evaluare" page per unit; CD Press has "Activități practice", "Exersare" and "Evaluare" pages.
- Use them for **wording, structure and vocabulary**. Do not copy an exercise as a challenge: write a new problem in the
  same register.
