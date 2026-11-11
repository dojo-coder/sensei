"""Download the two reference textbooks and extract their text.

Usage:  python style/textbooks/fetch.py
Needs:  pip install pymupdf

The PDFs and the extracted .txt files are local reference material and are
not committed (see .gitignore). Both textbooks are published for free reading
by the Ministry of Education / the publishers; they stay their property.
"""

import pathlib
import urllib.request

import pymupdf

HERE = pathlib.Path(__file__).parent

BOOKS = {
    "intuitext-informatica-9-mate-info": "https://www.digital.intuitext.ro/09inf_MI-Man/carte/09inf/pages/images/09inf_MI.pdf",
    "cdpress-informatica-9-mate-info": "https://manuale.edu.ro/manuale/Clasa%20a%20IX-a/Informatica/Q0QgUFJFU1M/A2098.pdf",
}


def download(url: str, target: pathlib.Path) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(request) as response:
        target.write_bytes(response.read())


def extract(pdf: pathlib.Path, target: pathlib.Path) -> int:
    document = pymupdf.open(pdf)
    with target.open("w", encoding="utf-8") as output:
        for number, page in enumerate(document, start=1):
            output.write(f"\n===== PAGE {number} =====\n")
            output.write(page.get_text("text", sort=True))
    return document.page_count


for name, url in BOOKS.items():
    pdf = HERE / f"{name}.pdf"
    if not pdf.exists():
        download(url, pdf)
    pages = extract(pdf, HERE / f"{name}.txt")
    print(f"{name}: {pages} pages")
