import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

// Load LiberationSerif TrueType font files which provide full Unicode support
const regularFontPath = '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf';
const boldFontPath = '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf';
const italicFontPath = '/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf';
const boldItalicFontPath = '/usr/share/fonts/truetype/liberation/LiberationSerif-BoldItalic.ttf';

const regularB64 = fs.readFileSync(regularFontPath).toString('base64');
const boldB64 = fs.readFileSync(boldFontPath).toString('base64');
const italicB64 = fs.readFileSync(italicFontPath).toString('base64');
const boldItalicB64 = fs.readFileSync(boldItalicFontPath).toString('base64');

const doc = new jsPDF({
  unit: 'pt',
  format: 'letter',
});

// Register LiberationSerif as a custom Unicode font family in jsPDF
doc.addFileToVFS('LiberationSerif-Regular.ttf', regularB64);
doc.addFont('LiberationSerif-Regular.ttf', 'LiberationSerif', 'normal');

doc.addFileToVFS('LiberationSerif-Bold.ttf', boldB64);
doc.addFont('LiberationSerif-Bold.ttf', 'LiberationSerif', 'bold');

doc.addFileToVFS('LiberationSerif-Italic.ttf', italicB64);
doc.addFont('LiberationSerif-Italic.ttf', 'LiberationSerif', 'italic');

doc.addFileToVFS('LiberationSerif-BoldItalic.ttf', boldItalicB64);
doc.addFont('LiberationSerif-BoldItalic.ttf', 'LiberationSerif', 'bolditalic');

// Clean any accidental corrupted replacement bytes if any exist
function cleanText(str: string): string {
  if (!str) return '';
  return str
    .replace(/ï¿½/g, '')
    .replace(/\uFFFD/g, '')
    .replace(/ï/g, '')
    .replace(/¿/g, '')
    .replace(/½/g, '');
}

const pageWidth = doc.internal.pageSize.getWidth(); // 612
const pageHeight = doc.internal.pageSize.getHeight(); // 792
const margin = 54; // 0.75 in
const contentWidth = pageWidth - margin * 2;

// PAGE 1: Title Page
doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(18);

let y = 300;
doc.text(cleanText('“What We Heard” Student Athlete Report'), pageWidth / 2, y, { align: 'center' });

y += 30;
doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(14);
doc.text(cleanText('Vikings Student Athlete Wellness Survey Summary'), pageWidth / 2, y, { align: 'center' });

y += 24;
doc.text(cleanText('Augustana Vikings April 2026'), pageWidth / 2, y, { align: 'center' });

y += 36;
doc.text(cleanText('Created by: MSc. OT Students - Augustana Cohort'), pageWidth / 2, y, { align: 'center' });

y += 24;
doc.text(cleanText('April 2026'), pageWidth / 2, y, { align: 'center' });


// PAGE 2: Introduction, Who We Heard From, Key Findings
doc.addPage();
y = margin;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(13);
doc.text(cleanText('Introduction'), margin, y);
y += 18;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);

const introText = "This report summarizes findings from the Augustana Student-Athlete Wellness Survey conducted as part of the Occupational Therapy capstone project focused on lifestyle balance and student-athlete wellness. Of the 150 student-athletes, our survey had a 22% response rate. The survey explored student-athletes’ experiences balancing academics, athletics, recovery, and personal well-being. The purpose of this report is to identify common themes and experiences among the student-athlete population to inform future wellness initiatives, educational resources, and supports for Augustana athletes. Overall, the findings suggest that student-athletes are balancing significant academic, athletic, and personal demands with limited time for recovery and wellness.";

const splitIntro = doc.splitTextToSize(cleanText(introText), contentWidth);
doc.text(splitIntro, margin, y);
y += splitIntro.length * 14 + 12;

const intro2 = "Four major themes emerged from the survey data:";
doc.setFont('LiberationSerif', 'italic');
doc.text(cleanText(intro2), margin, y);
y += 18;

const themes = [
  "Time Management & Academic Balance",
  "Stress Management",
  "Sleep & Recovery",
  "Nutrition"
];

doc.setFont('LiberationSerif', 'normal');
themes.forEach(t => {
  doc.text(cleanText(`●  ${t}`), margin + 20, y);
  y += 16;
});
y += 8;

const themeFooter = "These themes were interconnected and consistently reflected the challenges student-athletes face while balancing multiple responsibilities and expectations.";
const splitTF = doc.splitTextToSize(cleanText(themeFooter), contentWidth);
doc.text(splitTF, margin, y);
y += splitTF.length * 14 + 20;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(13);
doc.text(cleanText('Who We Heard From'), margin, y);
y += 18;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const whoText = "The survey included responses from student-athletes across multiple Vikings teams and years of study, including: Volleyball, Hockey, Soccer, Basketball, Curling, Track/XC/Nordic. Athletes from both in-season and off-season participation completed the survey, representing a range of experiences and perspectives.";
const splitWho = doc.splitTextToSize(cleanText(whoText), contentWidth);
doc.text(splitWho, margin, y);
y += splitWho.length * 14 + 20;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(13);
doc.text(cleanText('Key Findings/ Survey Highlights'), margin, y);
y += 18;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const highlights = [
  "42% of athletes reported feeling often or always overwhelmed",
  "33% reported that academics and athletics frequently interfere with sleep",
  "30% reported difficulty balancing responsibilities",
  "Many athletes identified time constraints as their biggest challenge",
  "Nutrition barriers were commonly linked to limited time, travel, and scheduling demands"
];
highlights.forEach(h => {
  const splitH = doc.splitTextToSize(cleanText(`●  ${h}`), contentWidth - 20);
  doc.text(splitH, margin + 20, y);
  y += splitH.length * 14 + 4;
});


// PAGE 3: Theme 1 & Theme 2
doc.addPage();
y = margin;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(13);
doc.text(cleanText('Theme 1: Time Management & Academic Balance'), margin, y);
y += 18;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const t1Text1 = "Time management emerged as one of the most consistent themes throughout the survey, with over 33% of athletes identifying it as an area where they would like additional support or resources. Time management challenges were also closely linked to difficulties maintaining academic balance, with over 45% of athletes identifying academics as a major concern. Athletes frequently described challenges balancing academic responsibilities alongside athletics, recovery, social life, and personal activities. Many student-athletes reported that there was simply “not enough time” to fully manage all of their responsibilities during the season. Academic work, sleep, and self-care were commonly identified as the areas hardest to prioritize, particularly during periods of travel, competition, and high training demands.";
const splitT1 = doc.splitTextToSize(cleanText(t1Text1), contentWidth);
doc.text(splitT1, margin, y);
y += splitT1.length * 14 + 12;

doc.text(cleanText('Athletes frequently discussed:'), margin, y);
y += 16;

const t1Bullets = [
  "difficulty keeping up with assignments and studying",
  "falling behind during busy competition periods",
  "balancing school work after practices or games",
  "maintaining routines during travel schedules",
  "balancing academic expectations with athletic performance demands"
];
t1Bullets.forEach(b => {
  doc.text(cleanText(`●  ${b}`), margin + 20, y);
  y += 16;
});
y += 12;

const t1Text2 = "Several athletes described feeling as though academics and athletics were constantly competing for their time and energy. While many athletes valued success in both roles, maintaining both simultaneously was often described as stressful and exhausting.";
const splitT1_2 = doc.splitTextToSize(cleanText(t1Text2), contentWidth);
doc.text(splitT1_2, margin, y);
y += splitT1_2.length * 14 + 14;

doc.setFont('LiberationSerif', 'italic');
doc.text(cleanText('Academic strain appeared particularly noticeable:'), margin, y);
y += 16;

doc.setFont('LiberationSerif', 'normal');
const t1Strain = [
  "During in-season periods",
  "Among athletes in demanding academic programs",
  "During the transition into university athletics",
  "When travel disrupts routines and study time"
];
t1Strain.forEach(s => {
  doc.text(cleanText(`●  ${s}`), margin + 20, y);
  y += 16;
});
y += 12;

const t1Summary = "The findings suggest that many student-athletes are struggling to maintain balance across academics, athletics, recovery, and personal life. When time demands increase in one area, it often becomes difficult to prioritize sleep, recovery, academics, social connection, and other important aspects of well-being.";
const splitT1Sum = doc.splitTextToSize(cleanText(t1Summary), contentWidth);
doc.text(splitT1Sum, margin, y);
y += splitT1Sum.length * 14 + 18;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(12);
doc.text(cleanText('Theme 2: Stress Management:'), margin, y);
const labelWidth = doc.getTextWidth('Theme 2: Stress Management: ');

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const t2Intro = "Stress and mental load were commonly reported across teams and years of study, with over 42% of student-athletes who completed the survey citing these as major concerns for which they would like more support or resources. Many athletes described feeling overwhelmed by the combined demands of academics and athletics.";
const splitT2Intro = doc.splitTextToSize(cleanText(t2Intro), contentWidth - labelWidth);
doc.text(splitT2Intro, margin + labelWidth, y);
y += splitT2Intro.length * 14 + 12;

doc.setFont('LiberationSerif', 'italic');
doc.text(cleanText('Stress appeared connected to:'), margin, y);
y += 16;
doc.setFont('LiberationSerif', 'normal');
doc.text(cleanText('●  academic pressure'), margin + 20, y);


// PAGE 4: Stress Continued, Theme 3, Theme 4, Team Trends
doc.addPage();
y = margin;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const t2BulletsCont = [
  "performance expectations",
  "time demands",
  "limited recovery",
  "uncertainty about future planning"
];
t2BulletsCont.forEach(b => {
  doc.text(cleanText(`●  ${b}`), margin + 20, y);
  y += 16;
});
y += 12;

const t2Barriers = "Several athletes also described barriers to accessing support, including lack of time, uncertainty about available resources, and difficulty prioritizing help-seeking. While stress was present across all teams, the intensity and experience of stress varied depending on team culture, schedules, and individual circumstances.";
const splitT2B = doc.splitTextToSize(cleanText(t2Barriers), contentWidth);
doc.text(splitT2B, margin, y);
y += splitT2B.length * 14 + 20;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(12);
doc.text(cleanText('Theme 3: Sleep & Recovery:'), margin, y);
const t3LabelW = doc.getTextWidth('Theme 3: Sleep & Recovery: ');

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const t3Text = "Sleep and recovery emerged as major concerns for many student-athletes, with over 30% of those who completed this survey indicating this as an area where they would like more support/resources. Academic demands, practices, games, travel, and scheduling conflicts frequently interfered with athletes’ ability to get enough rest. Many athletes reported averaging approximately 6–7 hours of sleep per night during the season, with several describing this as insufficient for recovery and performance.";
const splitT3 = doc.splitTextToSize(cleanText(t3Text), contentWidth - t3LabelW);
doc.text(splitT3, margin + t3LabelW, y);
y += splitT3.length * 14 + 12;

doc.setFont('LiberationSerif', 'italic');
doc.text(cleanText('Athletes commonly link sleep disruption to:'), margin, y);
y += 16;

doc.setFont('LiberationSerif', 'normal');
const t3Bullets = [
  "late practices or games",
  "early morning training",
  "travel",
  "completing school work after athletics"
];
t3Bullets.forEach(b => {
  doc.text(cleanText(`●  ${b}`), margin + 20, y);
  y += 16;
});
y += 18;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(12);
doc.text(cleanText('Theme 4: Nutrition:'), margin, y);
const t4LabelW = doc.getTextWidth('Theme 4: Nutrition: ');

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const t4Text = "Nutrition challenges were another important theme identified throughout the survey, with over 42% of the student-athletes who completed the survey indicating that this is an area where they would like more support and resources. Many athletes reported difficulty maintaining consistent or balanced eating habits while managing athletics and academics. The most common nutrition barriers included limited time to prepare meals, travel schedules that disrupt routines, financial barriers, and limited access to convenient food options.";
const splitT4 = doc.splitTextToSize(cleanText(t4Text), contentWidth - t4LabelW);
doc.text(splitT4, margin + t4LabelW, y);
y += splitT4.length * 14 + 20;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(13);
doc.text(cleanText('Trends Across Teams & Years:'), margin, y);
const trendLabelW = doc.getTextWidth('Trends Across Teams & Years: ');
doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const trendIntro = "Although the themes were consistent across the student-athlete population, some differences emerged across teams and years of study.";
const splitTrendIntro = doc.splitTextToSize(cleanText(trendIntro), contentWidth - trendLabelW);
doc.text(splitTrendIntro, margin + trendLabelW, y);
y += splitTrendIntro.length * 14 + 16;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(12);
doc.text(cleanText('Team Trends'), margin, y);
y += 16;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const teamTrends = [
  "Soccer athletes reported higher levels of stress and sleep disruption",
  "Hockey athletes reported greater lifestyle imbalance",
  "Basketball athletes frequently identified recovery and fatigue concerns",
  "Track/XC athletes described more independent, well-managed techniques for managing well-being and more experiences of isolation compared to other teams."
];
teamTrends.forEach(t => {
  const splitT = doc.splitTextToSize(cleanText(`●  ${t}`), contentWidth - 20);
  doc.text(splitT, margin + 20, y);
  y += splitT.length * 14 + 4;
});


// PAGE 5: Year of Study Trends, Preferred Support Formats, Closing Reflection
doc.addPage();
y = margin;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
doc.text(cleanText('●  Curling athletes reported comparatively lower overall lifestyle strain'), margin + 20, y);
y += 24;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(12);
doc.text(cleanText('Year of Study Trends:'), margin, y);
y += 18;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const y1 = "First-year athletes frequently described the transition to university athletics as challenging, particularly as they adjusted to increased independence, academic expectations, and athletic demands.";
const splitY1 = doc.splitTextToSize(cleanText(y1), contentWidth);
doc.text(splitY1, margin, y);
y += splitY1.length * 14 + 12;

const y2 = "Second-year students reported the highest frequency of stress, sleep disruption, and balance difficulties.";
const splitY2 = doc.splitTextToSize(cleanText(y2), contentWidth);
doc.text(splitY2, margin, y);
y += splitY2.length * 14 + 12;

const y3 = "Athletes in Years 3–5+ generally described improved coping strategies and stronger routines developed over time. Many upper-year athletes reported becoming better at scheduling, prioritizing responsibilities, and managing expectations. However, despite improved experience and coping skills, workload strain, fatigue, and difficulty balancing responsibilities remained ongoing concerns for many athletes.";
const splitY3 = doc.splitTextToSize(cleanText(y3), contentWidth);
doc.text(splitY3, margin, y);
y += splitY3.length * 14 + 12;

const y4 = "Additionally, several upper-year athletes also discussed increased leadership expectations, preparing for graduation or future careers, concerns about transition out of sport, and maintaining wellness while managing long-term demands.";
const splitY4 = doc.splitTextToSize(cleanText(y4), contentWidth);
doc.text(splitY4, margin, y);
y += splitY4.length * 14 + 20;

doc.setFont('LiberationSerif', 'bold');
doc.setFontSize(12);
doc.text(cleanText('Preferred support formats for the previously identified themes include:'), margin, y);
y += 18;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);
const prefSupports = [
  "33% preferred short online resources on Canva",
  "27% preferred having one-on-one support",
  "25% preferred having team workshops or presentations",
  "9.1% preferred practical tip sheets posted on Canva"
];
prefSupports.forEach(ps => {
  doc.text(cleanText(`●  ${ps}`), margin + 20, y);
  y += 16;
});
y += 12;

const pSuppText = "Athletes emphasized that support should be practical, accessible, easy to use, and realistic within their athletic schedules. Moving forward, the findings from this survey helped inform future wellness initiatives, practical athlete resources, recommendations for athletics and Student Services, and the creation of an Occupational Balance Toolkit, which will be available on Canvas in the fall. The occupational balance toolkit will be posted on Canvas in the fall and will comprise various interventions based on the major themes found in the survey regarding academics, time management, stress management, nutrition, and mental health.";
const splitPSupp = doc.splitTextToSize(cleanText(pSuppText), contentWidth);
doc.text(splitPSupp, margin, y);
y += splitPSupp.length * 14 + 20;

doc.setFont('LiberationSerif', 'bold');
doc.text(cleanText('Closing Reflection: '), margin, y);
const crLabelW = doc.getTextWidth('Closing Reflection: ');

doc.setFont('LiberationSerif', 'normal');
const crText = "Thank you again to everyone who participated in the student-athlete wellness survey. The information and experiences shared through this project will help guide the next phase of our capstone work. Based on the themes identified in the data, our next steps will";
const splitCR = doc.splitTextToSize(cleanText(crText), contentWidth - crLabelW);
doc.text(splitCR, margin + crLabelW, y);


// PAGE 6: Next Steps, Questions & AI Statement
doc.addPage();
y = margin;

doc.setFont('LiberationSerif', 'normal');
doc.setFontSize(11);

const page6Text1 = "involve developing a Student Occupational Balance Toolkit to support student-athlete wellness in realistic, accessible ways. We also plan to develop several practical interventions and resource ideas related to the main themes identified within the survey, including time management, stress management, sleep and recovery, and nutrition. Because many athletes identified mental health as an area where they would like more support, the Occupational Balance Toolkit will also include accessible mental health and wellness resources specific to Camrose and Augustana. The goal is to improve awareness of available supports and make resources easier for student-athletes to access within their schedules. The goal of these resources is to help support sustainable routines, occupational balance, and overall well-being among student-athletes at Augustana.";
const splitP6_1 = doc.splitTextToSize(cleanText(page6Text1), contentWidth);
doc.text(splitP6_1, margin, y);
y += splitP6_1.length * 14 + 16;

const page6Text2 = "The findings highlight that student-athletes are balancing much more than sport and academics alone. Many are navigating overlapping pressures related to performance, recovery, routines, and personal well-being. Supporting student-athlete wellness means recognizing athletes as whole people and creating supports that promote sustainable participation across all areas of life.";
const splitP6_2 = doc.splitTextToSize(cleanText(page6Text2), contentWidth);
doc.text(splitP6_2, margin, y);
y += splitP6_2.length * 14 + 20;

const page6Text3 = "We would also love to continue hearing from student-athletes as we move forward with this project. If you have a moment, please complete this short Google Form by answering the following two questions, and have this submitted by August 1st, 2026:";
const splitP6_3 = doc.splitTextToSize(cleanText(page6Text3), contentWidth);
doc.text(splitP6_3, margin, y);
y += splitP6_3.length * 14 + 12;

const q1 = "1.  Does this report align with your experience as a student-athlete?";
const q2 = "2.  Are there any specific supports, interventions, or wellness resources you would like to see on campus for student-athletes? What would that look like? Please be as specific as possible.";

doc.text(doc.splitTextToSize(cleanText(q1), contentWidth - 20), margin + 15, y);
y += 18;
const splitQ2 = doc.splitTextToSize(cleanText(q2), contentWidth - 20);
doc.text(splitQ2, margin + 15, y);
y += splitQ2.length * 14 + 20;

const page6Text4 = "Thank you for your time and for participating in the survey and in the creation of these wellness resources. We truly appreciate it.";
doc.text(doc.splitTextToSize(cleanText(page6Text4), contentWidth), margin, y);
y += 30;

doc.setFont('LiberationSerif', 'bold');
doc.text(cleanText('AI Statement: '), margin, y);
const aiLabelW = doc.getTextWidth('AI Statement: ');
doc.setFont('LiberationSerif', 'normal');
const aiText = "OpenAI (ChatGPT) was used as an editing tool for this report, assisting with grammar correction, general formatting, and data synthesis, including organizing qualitative data.";
doc.text(doc.splitTextToSize(cleanText(aiText), contentWidth - aiLabelW), margin + aiLabelW, y);

const outputPath = path.join(process.cwd(), 'public', 'documents', 'what-we-heard-student-athletes.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);

console.log('PDF successfully generated with Unicode LiberationSerif at:', outputPath);
