"""Build the four-day script workbook: one tab per day, from the CSV."""
import csv, zipfile, re, os
from xml.sax.saxutils import escape

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CSV = os.path.join(ROOT, 'docs/scripts/ielts-lesson-scripts.csv')
OUT = os.path.join(ROOT, 'docs/scripts/ielts-lesson-scripts.xlsx')

rows = list(csv.reader(open(CSV)))
head, body = rows[0], rows[1:]
days = ['Day 1', 'Day 2', 'Day 3', 'Day 4']
tabs = [(d, [r for r in body if r[0] == d]) for d in days]
tabs.append(('All days', body))

def col(i):                       # 0 -> A
    s = ''
    while True:
        s = chr(65 + i % 26) + s; i = i // 26 - 1
        if i < 0: return s

WIDTHS = [7, 7, 24, 9, 20, 20, 78, 40]

def sheet_xml(rows, with_day):
    use = range(len(head)) if with_day else range(1, len(head))
    cols = ''.join(f'<col min="{n+1}" max="{n+1}" width="{WIDTHS[i]}" customWidth="1"/>'
                   for n, i in enumerate(use))
    out = []
    def row(n, cells, style):
        tds = ''.join(
            f'<c r="{col(j)}{n}" t="inlineStr" s="{style}"><is><t xml:space="preserve">{escape(v)}</t></is></c>'
            for j, v in enumerate(cells))
        out.append(f'<row r="{n}">{tds}</row>')
    row(1, [head[i] for i in use], 1)
    for n, r in enumerate(rows, 2):
        row(n, [r[i] for i in use], 0)
    last = col(len(list(use)) - 1)
    return ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
            '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
            '<sheetViews><sheetView workbookViewId="0">'
            '<pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/>'
            '</sheetView></sheetViews>'
            f'<cols>{cols}</cols><sheetData>{"".join(out)}</sheetData>'
            f'<autoFilter ref="A1:{last}{len(rows)+1}"/></worksheet>')

STYLES = ('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
 '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
 '<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font>'
 '<font><b/><sz val="11"/><name val="Calibri"/></font></fonts>'
 '<fills count="3"><fill><patternFill patternType="none"/></fill>'
 '<fill><patternFill patternType="gray125"/></fill>'
 '<fill><patternFill patternType="solid"><fgColor rgb="FFEFEDE7"/><bgColor indexed="64"/></patternFill></fill></fills>'
 '<borders count="1"><border/></borders>'
 '<cellStyleXfs count="1"><xf/></cellStyleXfs>'
 '<cellXfs count="2">'
 '<xf xfId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>'
 '<xf xfId="0" fontId="1" fillId="2" applyFont="1" applyFill="1" applyAlignment="1"><alignment vertical="top"/></xf>'
 '</cellXfs></styleSheet>')

sheets = ''.join(f'<sheet name="{escape(n)}" sheetId="{i+1}" r:id="rId{i+1}"/>'
                 for i, (n, _) in enumerate(tabs))
rels = ''.join(f'<Relationship Id="rId{i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet{i+1}.xml"/>'
               for i in range(len(tabs)))
overrides = ''.join(f'<Override PartName="/xl/worksheets/sheet{i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>'
                    for i in range(len(tabs)))

with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED) as z:
    z.writestr('[Content_Types].xml',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>'
        '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>'
        + overrides + '</Types>')
    z.writestr('_rels/.rels',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'
        '</Relationships>')
    z.writestr('xl/workbook.xml',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'
        f'<sheets>{sheets}</sheets></workbook>')
    z.writestr('xl/_rels/workbook.xml.rels',
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        + rels
        + f'<Relationship Id="rId{len(tabs)+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'
        '</Relationships>')
    z.writestr('xl/styles.xml', STYLES)
    for i, (name, rws) in enumerate(tabs):
        z.writestr(f'xl/worksheets/sheet{i+1}.xml', sheet_xml(rws, name == 'All days'))

print('wrote', OUT)
for n, r in tabs: print(f'  {n}: {len(r)} rows')
