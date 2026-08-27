export type SectionId = 'time-management' | 'academic-balance' | 'stress-management' | 'sleep-recovery' | 'nutrition';

export interface WorksheetLink {
  label: string;
  url: string;
  isPrimary?: boolean;
}

export interface WorksheetItem {
  id: string;
  name: string;
  description: string;
  category: string;
  pdfUrl?: string;
  externalUrl?: string;
  externalButtonText?: string;
  links?: WorksheetLink[];
  isInteractive?: boolean;
  interactiveToolId?: string;
  estimatedMinutes?: number;
  tags: string[];
}

export interface ResourceItem {
  id: string;
  name: string;
  type: 'website' | 'app' | 'pdf' | 'u-of-a-resource' | 'community';
  description: string;
  url: string;
  isFree?: boolean;
  platform?: string;
  badge?: string;
}

export interface StrategyItem {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  athleteTip?: string;
  iconName?: string;
}

export interface SupportResource {
  name: string;
  role: string;
  description: string;
  contact?: string;
  email?: string;
  phone?: string;
  location?: string;
  link?: string;
  buttonText?: string;
  isAugustanaSpecific?: boolean;
}

export interface ToolkitSection {
  id: SectionId;
  title: string;
  subtitle: string;
  icon: string;
  badgeCount: number;
  color: string;
  heroBgClass: string;
  whyThisMatters: string;
  evidenceHighlight?: string;
  strategies: StrategyItem[];
  worksheets: WorksheetItem[];
  appsAndResources: ResourceItem[];
  supportResources: SupportResource[];
}

export interface StudentSurveyStat {
  totalParticipants: number;
  femalePct: number;
  malePct: number;
  nonBinaryPct: number;
  yearsInSchool: string;
  teamsRepresented: number;
  keyTakeaways: {
    title: string;
    desc: string;
  }[];
  teamTrends: {
    sport: string;
    trend: string;
  }[];
}
