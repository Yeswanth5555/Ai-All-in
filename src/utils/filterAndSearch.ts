import { AITool, FilterOptions, ToolCategory } from '../types/tool';

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  video: 'AI Video',
  image: 'Image Generation',
  coding: 'Coding & Dev',
  writing: 'Writing & Copy',
  chatbots: 'Chatbots & LLMs',
  music: 'Music Generation',
  voice: 'Voice & Audio',
  research: 'Research & Science',
  education: 'Education & Learning',
  automation: 'Automation & Agents',
  business: 'Business & Productivity',
};

export const CATEGORY_DESCRIPTIONS: Record<ToolCategory, string> = {
  video: 'Tools for text-to-video generation, video editing, avatar animation, and clips.',
  image: 'Generative art models, photo enhancers, design helpers, and canvas creators.',
  coding: 'AI code editors, autocompletion engines, app generators, and terminal assistants.',
  writing: 'Content drafting, grammar correction, essay helpers, and copy generators.',
  chatbots: 'Conversational assistants, frontier language models, and reasoning engines.',
  music: 'Full-song generation, vocal synthesis, background audio, and stems.',
  voice: 'Voice cloning, text-to-speech, transcription, and speech analysis.',
  research: 'Paper search, academic summarization, data analysis, and citation verification.',
  education: 'AI tutors, interactive language practice, quiz makers, and concept tutors.',
  automation: 'Workflow builders, autonomous multi-agent systems, and webhook triggers.',
  business: 'Meeting notes, presentations, slide decks, spreadsheet AI, and CRM boosters.',
};

export interface SearchIntent {
  key: string;
  label: string;
  summary: string;
  badge: string;
  actionPhrase: string;
  categoryFilter?: ToolCategory;
  recommendedTags: string[];
  matchedAspect: string;
}

const STOP_WORDS = new Set([
  'i',
  'need',
  'want',
  'how',
  'to',
  'the',
  'in',
  'a',
  'an',
  'for',
  'of',
  'and',
  'with',
  'on',
  'at',
  'by',
  'this',
  'that',
  'my',
  'can',
  'you',
  'me',
  'is',
  'are',
  'please',
  'give',
  'some',
  'find',
  'tool',
  'tools',
  'ai',
]);

/**
 * Basic stemming and normalization for English query tokens.
 */
function stemWord(word: string): string {
  let w = word.toLowerCase().trim();
  if (w.endsWith('ing') && w.length > 5) {
    w = w.slice(0, -3);
    if (w.endsWith('tt') || w.endsWith('nn') || w.endsWith('pp')) {
      w = w.slice(0, -1);
    }
  } else if (w.endsWith('es') && w.length > 4) {
    w = w.slice(0, -2);
  } else if (w.endsWith('s') && !w.endsWith('ss') && w.length > 3) {
    w = w.slice(0, -1);
  } else if (w.endsWith('ed') && w.length > 4) {
    w = w.slice(0, -2);
  }
  return w;
}

/**
 * Extract meaningful semantic tokens from a search query.
 */
export function extractSearchTokens(query: string): string[] {
  const rawWords = query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1);

  const meaningful = rawWords.filter((w) => !STOP_WORDS.has(w));
  const stemmed = (meaningful.length > 0 ? meaningful : rawWords).map(stemWord);

  // Return unique tokens
  return Array.from(new Set([...meaningful, ...stemmed]));
}

/**
 * Detect user's functional intent and purpose from natural language search queries.
 * Examples: "editing names in the pdf" -> PDF text & name editing intent
 */
export function detectSearchIntent(query: string): SearchIntent | null {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 3) return null;

  const tokens = extractSearchTokens(q);
  const tokenSet = new Set(tokens);
  const rawHas = (str: string) => q.includes(str);
  const tokenHas = (...keys: string[]) => keys.some((k) => tokenSet.has(k) || tokenSet.has(stemWord(k)));

  // 1. PDF Editing & Text / Name Replacement
  if (
    rawHas('pdf') &&
    (rawHas('edit') ||
      rawHas('name') ||
      rawHas('text') ||
      rawHas('fill') ||
      rawHas('form') ||
      rawHas('modify') ||
      rawHas('replace') ||
      rawHas('sign') ||
      rawHas('change') ||
      tokenHas('edit', 'name', 'text', 'form', 'fill', 'replac', 'chang'))
  ) {
    return {
      key: 'pdf-edit',
      label: 'PDF Document Editing & Text Replacement',
      summary: 'AI tools engineered to modify text, update names, fill interactive forms, and edit content directly in PDF files.',
      badge: 'PDF TEXT & NAME EDITING',
      actionPhrase: 'Edit names, rewrite text, and fill forms in PDF files',
      categoryFilter: 'business',
      recommendedTags: ['pdf-editor', 'edit-names-in-pdf', 'edit-pdf-text', 'pdf', 'fill-form'],
      matchedAspect: 'Document Modification & PDF Editing',
    };
  }

  // 2. Video Background Removal / Greenscreen
  if (
    (rawHas('video') || tokenHas('video', 'clip')) &&
    (rawHas('background') || rawHas('bg') || rawHas('greenscreen') || tokenHas('remov', 'cutout', 'rotoscop'))
  ) {
    return {
      key: 'video-bg-remove',
      label: 'Video Background Removal & Cutout',
      summary: 'AI tools to isolate subjects and erase or replace video backgrounds without physical green screens.',
      badge: 'VIDEO BACKGROUND REMOVAL',
      actionPhrase: 'Remove or swap video backgrounds automatically',
      categoryFilter: 'video',
      recommendedTags: ['background-removal', 'video-editing', 'rotoscoping'],
      matchedAspect: 'Subject Isolation & Video VFX',
    };
  }

  // 3. Audio Stem Separation & Vocal Isolation
  if (
    (tokenHas('stem', 'vocal', 'isolat', 'separat', 'acapella', 'instrument') &&
      tokenHas('song', 'music', 'track', 'audio', 'sound')) ||
    rawHas('separate vocals') ||
    rawHas('stem separation') ||
    rawHas('isolate vocals')
  ) {
    return {
      key: 'music-stems',
      label: 'Vocal Isolation & Stem Separation',
      summary: 'AI engines that split full music tracks into isolated vocal lines, drums, bass, and instrumental stems.',
      badge: 'STEM SEPARATION & VOCALS',
      actionPhrase: 'Split songs into vocals and stems',
      categoryFilter: 'music',
      recommendedTags: ['stem-separation', 'vocal-remover', 'audio-editing'],
      matchedAspect: 'Vocal Extraction & Stems',
    };
  }

  // 4. Code Unit Testing & Automated Debugging
  if (
    (tokenHas('test', 'unit', 'debug', 'refactor', 'bug', 'fix') &&
      tokenHas('code', 'python', 'javascript', 'typescript', 'react', 'program', 'develop')) ||
    rawHas('unit test') ||
    rawHas('debug code') ||
    rawHas('write tests')
  ) {
    return {
      key: 'code-testing-debug',
      label: 'Code Testing, Debugging & Refactoring',
      summary: 'Developer AI assistants that generate automated test suites, locate edge cases, and debug errors across codebases.',
      badge: 'DEV TESTING & DEBUG',
      actionPhrase: 'Generate unit tests and debug codebases',
      categoryFilter: 'coding',
      recommendedTags: ['unit-testing', 'debugging', 'code-assistant', 'refactoring'],
      matchedAspect: 'Automated Testing & Code Quality',
    };
  }

  // 5. Voice Cloning & Speech Synthesis
  if (
    tokenHas('voice', 'speech') &&
    (tokenHas('clone', 'clon', 'mimic', 'synthes', 'tts', 'dub') || rawHas('voice clone') || rawHas('text to speech'))
  ) {
    return {
      key: 'voice-cloning',
      label: 'Voice Cloning & Realistic Speech',
      summary: 'Generative audio models to clone human voice timbres, generate emotional voiceovers, and localize dubbing.',
      badge: 'VOICE CLONING & TTS',
      actionPhrase: 'Clone voices and synthesize speech',
      categoryFilter: 'voice',
      recommendedTags: ['voice-cloning', 'tts', 'text-to-speech', 'speech-synthesis'],
      matchedAspect: 'Generative Voice & Cloning',
    };
  }

  // 6. Photo Inpainting & Object Removal
  if (
    (tokenHas('remov', 'eras', 'inpaint', 'cleanup', 'clean', 'retouch', 'watermark') &&
      tokenHas('photo', 'imag', 'pictur', 'canvas')) ||
    rawHas('remove object') ||
    rawHas('erase object') ||
    rawHas('inpaint')
  ) {
    return {
      key: 'photo-inpaint',
      label: 'Photo Inpainting & Object Removal',
      summary: 'Generative image editors that erase unwanted objects, restore photos, and fill backgrounds cleanly.',
      badge: 'PHOTO INPAINTING & CLEANUP',
      actionPhrase: 'Erase unwanted objects and retouch photos',
      categoryFilter: 'image',
      recommendedTags: ['inpainting', 'object-removal', 'photo-editing', 'generative-fill'],
      matchedAspect: 'Generative Inpainting & Canvas Cleanup',
    };
  }

  // 7. Presentation & Slide Deck Generation
  if (tokenHas('present', 'slide', 'deck', 'powerpoint', 'pitchdeck', 'keynot') || rawHas('slide deck')) {
    return {
      key: 'presentation-slides',
      label: 'AI Presentation & Slide Deck Creation',
      summary: 'AI presentation makers that turn prompts and documents into interactive slide decks with custom visual layouts.',
      badge: 'SLIDE DECK CREATION',
      actionPhrase: 'Generate complete presentation decks',
      categoryFilter: 'business',
      recommendedTags: ['presentations', 'pitch-decks', 'slide-generator'],
      matchedAspect: 'Slide Design & Decks',
    };
  }

  // 8. Spreadsheet & Excel Formula Automation
  if (tokenHas('excel', 'sheet', 'spreadsheet', 'formula', 'pivot', 'tabular', 'csv')) {
    return {
      key: 'spreadsheet-automation',
      label: 'Spreadsheet Automation & Formula Generator',
      summary: 'Assistants that generate complex Excel/Google Sheets formulas, automate data transformations, and analyze tables.',
      badge: 'EXCEL & DATA FORMULAS',
      actionPhrase: 'Generate spreadsheet formulas and analyze tabular data',
      categoryFilter: 'business',
      recommendedTags: ['spreadsheet', 'excel', 'formula-ai', 'google-sheets'],
      matchedAspect: 'Formulas & Spreadsheet Automation',
    };
  }

  // 9. Academic Literature Review & Citations
  if (
    tokenHas('research', 'literatur', 'paper', 'academ', 'citat', 'arxiv', 'thes') ||
    rawHas('literature review') ||
    rawHas('research paper')
  ) {
    return {
      key: 'academic-research',
      label: 'Academic Paper Discovery & Literature Synthesis',
      summary: 'Research engines that search indexed scientific papers, map citation networks, and synthesize key findings.',
      badge: 'RESEARCH & CITATIONS',
      actionPhrase: 'Search academic papers and synthesize literature',
      categoryFilter: 'research',
      recommendedTags: ['paper-search', 'citations', 'academic', 'literature-review'],
      matchedAspect: 'Scientific Literature & Citation Analysis',
    };
  }

  // 10. Meeting Transcription & Recaps
  if (tokenHas('meet', 'transcrib', 'zoom', 'transcript', 'minut') || rawHas('meeting notes')) {
    return {
      key: 'meeting-transcription',
      label: 'Meeting Audio Transcription & Action Items',
      summary: 'Automated meeting assistants that join calls, generate timestamped transcripts, and summarize action items.',
      badge: 'MEETING TRANSCRIPTION',
      actionPhrase: 'Transcribe meetings and extract action items',
      categoryFilter: 'business',
      recommendedTags: ['meeting-notes', 'transcription', 'action-items', 'zoom-bot'],
      matchedAspect: 'Meeting Intelligence & Audio Transcription',
    };
  }

  // Fallback for multi-word action intent
  if (tokens.length >= 2) {
    const titleized = tokens
      .slice(0, 4)
      .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
      .join(' ');

    return {
      key: 'custom-intent',
      label: `Task: ${titleized}`,
      summary: `AI tools matching natural language task: "${query}"`,
      badge: 'NATURAL TASK MATCH',
      actionPhrase: `Accomplish "${query}" using specialized AI`,
      recommendedTags: tokens,
      matchedAspect: 'Specialized Natural Language Task',
    };
  }

  return null;
}

/**
 * Filter and sort tools based on search term, category, pricing, and platform.
 * Features intelligent multi-token scoring and intent-based ranking.
 */
export function searchAndFilterTools(
  tools: AITool[],
  options: Partial<FilterOptions> = {}
): AITool[] {
  const {
    searchQuery = '',
    category = 'all',
    pricingModel = 'all',
    onlyFreeOrFreemium = false,
    onlyOpenSource = false,
    onlyVerified = false,
    platform = 'all',
    sortBy = 'popular',
  } = options;

  const rawQuery = searchQuery.trim().toLowerCase();
  const searchTokens = rawQuery ? extractSearchTokens(rawQuery) : [];
  const detectedIntent = rawQuery ? detectSearchIntent(rawQuery) : null;

  // Filter and calculate relevance score
  const scoredTools: { tool: AITool; score: number }[] = [];

  for (const tool of tools) {
    // 1. Hard filters
    if (category !== 'all' && tool.category !== category) {
      continue;
    }
    if (pricingModel !== 'all' && tool.pricingModel !== pricingModel) {
      continue;
    }
    if (onlyFreeOrFreemium && !tool.hasFreeTier && tool.pricingModel !== 'Free' && tool.pricingModel !== 'Open Source') {
      continue;
    }
    if (onlyOpenSource && !tool.isOpenSource) {
      continue;
    }
    if (onlyVerified && !tool.isVerified) {
      continue;
    }
    if (platform !== 'all' && !tool.platforms.includes(platform)) {
      continue;
    }

    // 2. Search query scoring
    if (!rawQuery) {
      scoredTools.push({ tool, score: 1 });
      continue;
    }

    let score = 0;
    const nameLower = tool.name.toLowerCase();
    const taglineLower = tool.tagline.toLowerCase();
    const descLower = tool.description.toLowerCase();
    const companyLower = tool.company.toLowerCase();
    const tagsLower = tool.tags.map((t) => t.toLowerCase());
    const featuresLower = tool.keyFeatures.map((f) => f.toLowerCase());

    // Exact full query match
    if (nameLower.includes(rawQuery)) score += 120;
    if (taglineLower.includes(rawQuery)) score += 60;
    if (descLower.includes(rawQuery)) score += 40;
    if (companyLower.includes(rawQuery)) score += 50;
    if (tagsLower.some((t) => t.includes(rawQuery))) score += 70;
    if (featuresLower.some((f) => f.includes(rawQuery))) score += 50;

    // Intent match bonuses
    if (detectedIntent) {
      // Direct intent tag match
      const matchingTags = tagsLower.filter((t) =>
        detectedIntent.recommendedTags.some((rt) => t.includes(rt) || rt.includes(t))
      );
      if (matchingTags.length > 0) {
        score += 80 + matchingTags.length * 20;
      }

      // Intent category match bonus
      if (detectedIntent.categoryFilter && tool.category === detectedIntent.categoryFilter) {
        score += 25;
      }
    }

    // Individual token matching
    let matchedTokenCount = 0;
    for (const token of searchTokens) {
      const stem = stemWord(token);
      let tokenMatched = false;

      if (nameLower.includes(token) || nameLower.includes(stem)) {
        score += 35;
        tokenMatched = true;
      }
      if (taglineLower.includes(token) || taglineLower.includes(stem)) {
        score += 15;
        tokenMatched = true;
      }
      if (tagsLower.some((t) => t.includes(token) || t.includes(stem))) {
        score += 25;
        tokenMatched = true;
      }
      if (featuresLower.some((f) => f.includes(token) || f.includes(stem))) {
        score += 18;
        tokenMatched = true;
      }
      if (descLower.includes(token) || descLower.includes(stem)) {
        score += 8;
        tokenMatched = true;
      }

      if (tokenMatched) {
        matchedTokenCount++;
      }
    }

    // Require either a full query match, intent tag match, or multi-token match
    const isMultiWord = searchTokens.length >= 2;
    const passesTokenThreshold = isMultiWord ? matchedTokenCount >= Math.min(2, searchTokens.length) : matchedTokenCount >= 1;

    if (score > 0 && passesTokenThreshold) {
      // Bonus if all query tokens were matched
      if (matchedTokenCount === searchTokens.length) {
        score += 50;
      }
      scoredTools.push({ tool, score });
    }
  }

  // 3. Sorting
  scoredTools.sort((a, b) => {
    // When searching, sort by relevance score first if scores differ significantly
    if (rawQuery && Math.abs(b.score - a.score) >= 15) {
      return b.score - a.score;
    }

    // Fallback to chosen sort method
    switch (sortBy) {
      case 'rating':
        return b.tool.rating - a.tool.rating || b.tool.reviewCount - a.tool.reviewCount;
      case 'popular':
        return b.tool.reviewCount - a.tool.reviewCount || b.tool.rating - a.tool.rating;
      case 'newest':
        return b.tool.launchYear - a.tool.launchYear || a.tool.name.localeCompare(b.tool.name);
      case 'name':
        return a.tool.name.localeCompare(b.tool.name);
      default:
        return b.score - a.score;
    }
  });

  return scoredTools.map((st) => st.tool);
}

/**
 * Find recommended free or open-source alternatives for a tool.
 */
export function getFreeAlternatives(tool: AITool, allTools: AITool[]): AITool[] {
  const toolMap = new Map(allTools.map((t) => [t.id, t]));
  const explicitAlternatives: AITool[] = [];

  // 1. Explicitly mapped alternatives
  if (tool.freeAlternatives && tool.freeAlternatives.length > 0) {
    for (const altId of tool.freeAlternatives) {
      const found = toolMap.get(altId);
      if (found) {
        explicitAlternatives.push(found);
      }
    }
  }

  if (explicitAlternatives.length >= 3) {
    return explicitAlternatives;
  }

  // 2. Discover other free or open-source tools in the same category
  const discovered = allTools.filter(
    (t) =>
      t.id !== tool.id &&
      t.category === tool.category &&
      (t.isOpenSource || t.pricingModel === 'Free' || t.hasFreeTier) &&
      !explicitAlternatives.some((alt) => alt.id === t.id)
  );

  return [...explicitAlternatives, ...discovered].slice(0, 4);
}

/**
 * Returns counts per category.
 */
export function getCategoryCounts(tools: AITool[]): Record<string, number> {
  const counts: Record<string, number> = { all: tools.length };
  for (const tool of tools) {
    counts[tool.category] = (counts[tool.category] || 0) + 1;
  }
  return counts;
}

/**
 * Generate JSON-LD Schema structured data for SEO.
 */
export function generateToolSchemaJsonLd(tool: AITool): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: CATEGORY_LABELS[tool.category] || 'Artificial Intelligence',
    operatingSystem: tool.platforms.join(', '),
    offers: {
      '@type': 'Offer',
      price: tool.pricingModel === 'Free' || tool.isOpenSource ? '0' : 'Varies',
      priceCurrency: 'USD',
      description: tool.pricingDetails,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating.toString(),
      ratingCount: tool.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    url: tool.websiteUrl,
    author: {
      '@type': 'Organization',
      name: tool.company,
    },
  };
  return JSON.stringify(schema, null, 2);
}
