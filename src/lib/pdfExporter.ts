import { jsPDF } from 'jspdf';

function cleanText(str: string): string {
  if (!str) return '';
  return str
    .replace(/ï¿½/g, '')
    .replace(/ï/g, '')
    .replace(/¿/g, '')
    .replace(/½/g, '')
    .replace(/“/g, String.fromCharCode(147))
    .replace(/”/g, String.fromCharCode(148))
    .replace(/’/g, String.fromCharCode(146))
    .replace(/‘/g, String.fromCharCode(145))
    .replace(/–/g, String.fromCharCode(150))
    .replace(/—/g, String.fromCharCode(151))
    .replace(/●/g, String.fromCharCode(149))
    .replace(/•/g, String.fromCharCode(149));
}

export interface WorksheetPdfSection {
  label?: string;
  heading?: string;
  value?: string;
  content?: string;
  items?: string[];
  highlight?: 'red' | 'emerald' | 'gray' | 'black';
}

export interface WorksheetPdfData {
  title: string;
  subtitle?: string;
  dateStr?: string;
  completedDate?: string;
  filename?: string;
  fileName?: string;
  sections: WorksheetPdfSection[];
  coachNote?: string;
  coachHeading?: string;
  footerNote?: string;
}

export async function downloadWorksheetPdf(
  data: WorksheetPdfData,
  overrideFileName?: string
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
  });

  const outputFileName = overrideFileName || data.filename || data.fileName || 'Augustana_Worksheet.pdf';
  const completedDate = data.completedDate || data.dateStr || new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 215.9 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 279.4 mm
  const leftMargin = 14;
  const contentWidth = pageWidth - (leftMargin * 2); // 187.9 mm

  // Header Bar (Augustana Red #C8102E)
  doc.setFillColor(200, 16, 46);
  doc.rect(0, 0, pageWidth, 24, 'F');

  // Augustana Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('AUGUSTANA VIKINGS', leftMargin, 10);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('STUDENT-ATHLETE WELL-BEING TOOLKIT', leftMargin, 17);

  // Date at top right of header
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(completedDate, pageWidth - leftMargin, 13, { align: 'right' });

  let y = 32;

  // Title
  doc.setTextColor(23, 23, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  const titleLines = doc.splitTextToSize(cleanText(data.title), contentWidth);
  doc.text(titleLines, leftMargin, y);
  y += (titleLines.length * 6) + 2;

  // Subtitle
  if (data.subtitle) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    const subLines = doc.splitTextToSize(cleanText(data.subtitle), contentWidth);
    doc.text(subLines, leftMargin, y);
    y += (subLines.length * 5) + 3;
  }

  y += 2;

  // Render Sections
  for (const section of data.sections) {
    const headingText = cleanText(section.heading || (section.label && !section.content ? section.label : 'Section'));
    const subLabelText = (section.heading && section.label) ? cleanText(section.label) : undefined;
    const rawVal = section.content || section.value || (section.items ? section.items.join('\n') : '');
    const mainText = cleanText(rawVal.trim() !== '' ? rawVal : 'No reflection recorded.');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    const headingLines = doc.splitTextToSize(headingText, contentWidth - 8);

    let subLabelLines: string[] = [];
    if (subLabelText) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      subLabelLines = doc.splitTextToSize(subLabelText, contentWidth - 8);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    const textLines = doc.splitTextToSize(mainText, contentWidth - 8);

    const sectionPadding = 4;
    const subLabelSpace = subLabelLines.length > 0 ? (subLabelLines.length * 4.2) + 2 : 0;
    const sectionHeight = (headingLines.length * 5) + subLabelSpace + (textLines.length * 4.5) + (sectionPadding * 2) + 2;

    // Check if new page needed
    if (y + sectionHeight > (pageHeight - 22)) {
      doc.addPage();
      y = 20;
    }

    // Background color based on highlight
    if (section.highlight === 'red') {
      doc.setFillColor(254, 242, 242); // bg-red-50
      doc.setDrawColor(252, 165, 165); // border-red-300
    } else if (section.highlight === 'emerald') {
      doc.setFillColor(240, 253, 244); // bg-emerald-50
      doc.setDrawColor(134, 239, 172); // border-emerald-300
    } else if (section.highlight === 'black') {
      doc.setFillColor(23, 23, 23); // bg-neutral-900
      doc.setDrawColor(38, 38, 38);
    } else {
      doc.setFillColor(248, 250, 252); // bg-slate-50
      doc.setDrawColor(203, 213, 225); // border-slate-300
    }

    // Draw background box
    doc.roundedRect(leftMargin, y, contentWidth, sectionHeight, 2, 2, 'FD');

    let textY = y + sectionPadding + 4;

    // Heading text color
    if (section.highlight === 'red') {
      doc.setTextColor(200, 16, 46);
    } else if (section.highlight === 'emerald') {
      doc.setTextColor(21, 128, 61);
    } else if (section.highlight === 'black') {
      doc.setTextColor(248, 113, 113);
    } else {
      doc.setTextColor(30, 41, 59);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(headingLines, leftMargin + 4, textY);
    textY += (headingLines.length * 5);

    if (subLabelLines.length > 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(subLabelLines, leftMargin + 4, textY);
      textY += (subLabelLines.length * 4.2) + 2;
    }

    // Body text color
    if (section.highlight === 'black') {
      doc.setTextColor(245, 245, 245);
    } else {
      doc.setTextColor(15, 23, 42);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text(textLines, leftMargin + 4, textY);

    y += sectionHeight + 7;
  }

  // Render Coach / Planning Note if present
  if (data.coachNote) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    const coachHeading = cleanText(data.coachHeading || "Coach’s Perspective");
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9.5);
    const coachLines = doc.splitTextToSize(cleanText(`“${data.coachNote}”`), contentWidth - 8);

    const coachBoxHeight = 5 + (coachLines.length * 4.5) + 8;

    if (y + coachBoxHeight > (pageHeight - 22)) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(23, 23, 23);
    doc.setDrawColor(38, 38, 38);
    doc.roundedRect(leftMargin, y, contentWidth, coachBoxHeight, 2, 2, 'FD');

    doc.setTextColor(248, 113, 113);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(coachHeading, leftMargin + 4, y + 6);

    doc.setTextColor(245, 245, 245);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9.5);
    doc.text(coachLines, leftMargin + 4, y + 12);

    y += coachBoxHeight + 7;
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page++) {
    doc.setPage(page);

    if (data.footerNote) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 116, 139);
      const footerLines = doc.splitTextToSize(cleanText(data.footerNote), contentWidth);
      doc.text(footerLines, leftMargin, pageHeight - 14);
    }

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('Augustana Vikings Student-Athlete Well-Being Toolkit', leftMargin, pageHeight - 8);
    doc.text(`Page ${page} of ${totalPages}`, pageWidth - leftMargin, pageHeight - 8, { align: 'right' });
  }

  // Trigger download
  doc.save(outputFileName);
}
