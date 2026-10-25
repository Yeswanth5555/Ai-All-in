export type GuideCategory =
  | 'website-app-development'
  | 'ai-image-generation'
  | 'ai-video-generation'
  | 'coding'
  | 'writing'
  | 'presentations'
  | 'voice-audio'
  | 'productivity'
  | 'education'
  | 'marketing'
  | 'business-research';

export type GuideDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface GuidePrerequisite {
  label: string;
  isPaid: boolean;
  status: 'free' | 'freemium' | 'paid' | 'api-key-required' | 'account-required';
  description: string;
}

export interface GuideStep {
  stepNumber: number;
  title: string;
  instructions: string;
  codePrompt?: {
    prompt: string;
    label?: string;
    type?: 'prompt' | 'code' | 'command';
  };
  expectedResult?: string;
  troubleshootingAdvice?: string;
  actionUrl?: {
    url: string;
    label: string;
  };
}

export interface HowToGuide {
  slug: string;
  title: string;
  task: string;
  category: GuideCategory;
  difficulty: GuideDifficulty;
  estimatedDuration: string;
  pricingStatus: string;
  isVerified: boolean;
  verifiedDate: string;
  officialWebsiteUrl: string;
  officialDocumentationUrl: string;
  primaryToolId: string;
  primaryToolName: string;
  relatedToolIds: string[];
  relatedGuideSlugs?: string[];
  prerequisites: GuidePrerequisite[];
  steps: GuideStep[];
  testingExportInstructions: string;
  officialReferences: {
    title: string;
    url: string;
  }[];
  tags: string[];
}

export interface GuideProgress {
  currentStepIndex: number;
  completedStepIndices: number[];
  isCompleted: boolean;
  lastUpdated: string;
}
