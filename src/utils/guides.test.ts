import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HOW_TO_GUIDES,
  GUIDE_CATEGORIES,
  getAllGuides,
  getGuideBySlug,
  getGuidesForTool,
  getGuidesByCategory,
  searchGuides,
} from '../data/guides';
import { AI_TOOLS_DATA } from '../data/tools';

test('Guide Library - contains all 10 required initial tutorials', () => {
  const guides = getAllGuides();
  assert.ok(guides.length >= 10, `Expected at least 10 guides, got ${guides.length}`);

  // Check specific required workflows exist
  const slugs = guides.map((g) => g.slug);
  const requiredSlugs = [
    'building-website-google-ai-studio',
    'building-website-google-antigravity',
    'creating-ai-generated-images',
    'creating-ai-videos',
    'building-react-app-ai-coding-assistant',
    'creating-presentations-using-ai',
    'generating-voice-audio',
    'writing-improving-content-ai',
    'building-portfolio-without-coding',
    'publishing-website-free-first-hosting',
  ];

  for (const slug of requiredSlugs) {
    assert.ok(slugs.includes(slug), `Missing required guide slug: ${slug}`);
  }
});

test('Guide Categories - covers all 11 required category classifications', () => {
  const expectedCategoryIds = [
    'website-app-development',
    'ai-image-generation',
    'ai-video-generation',
    'coding',
    'writing',
    'presentations',
    'voice-audio',
    'productivity',
    'education',
    'marketing',
    'business-research',
  ];

  const actualCategoryIds = GUIDE_CATEGORIES.map((c) => c.id);
  for (const expectedId of expectedCategoryIds) {
    assert.ok(actualCategoryIds.includes(expectedId as any), `Missing category: ${expectedId}`);
  }

  const guides = getAllGuides();
  for (const guide of guides) {
    assert.ok(
      actualCategoryIds.includes(guide.category),
      `Guide "${guide.title}" has invalid category "${guide.category}"`
    );
  }
});

test('Step-by-step structure - each guide fulfills all required instruction specifications', () => {
  const guides = getAllGuides();

  for (const guide of guides) {
    // 1. Task / What user will accomplish
    assert.ok(guide.task && guide.task.length > 20, `Guide ${guide.slug} missing descriptive task`);

    // 2. Official tool website
    assert.ok(
      guide.officialWebsiteUrl && guide.officialWebsiteUrl.startsWith('http'),
      `Guide ${guide.slug} missing valid officialWebsiteUrl`
    );

    // 3. Prerequisites & account requirements
    assert.ok(
      Array.isArray(guide.prerequisites) && guide.prerequisites.length > 0,
      `Guide ${guide.slug} missing prerequisites`
    );
    for (const prereq of guide.prerequisites) {
      assert.ok(prereq.label, `Prerequisite missing label in ${guide.slug}`);
      assert.ok(
        ['free', 'freemium', 'paid', 'api-key-required', 'account-required'].includes(prereq.status),
        `Invalid prereq status in ${guide.slug}`
      );
    }

    // 4. Ordered instructions explaining what to click/enter/select
    assert.ok(
      Array.isArray(guide.steps) && guide.steps.length >= 3,
      `Guide ${guide.slug} must have >= 3 steps`
    );
    guide.steps.forEach((step, idx) => {
      assert.equal(step.stepNumber, idx + 1, `Step numbering mismatch in ${guide.slug}`);
      assert.ok(step.title && step.title.length > 3, `Step ${idx + 1} in ${guide.slug} missing title`);
      assert.ok(
        step.instructions && step.instructions.length > 20,
        `Step ${idx + 1} in ${guide.slug} missing instructions`
      );

      // Expected results or troubleshooting
      if (step.expectedResult) {
        assert.ok(step.expectedResult.length > 10, `Step ${idx + 1} in ${guide.slug} has tiny expectedResult`);
      }
    });

    // 5. Copyable prompts and commands where appropriate
    const hasPrompts = guide.steps.some((step) => Boolean(step.codePrompt?.prompt));
    assert.ok(hasPrompts, `Guide ${guide.slug} should include at least one copyable prompt or command`);

    // 6. Troubleshooting advice in guide steps
    const hasTroubleshooting = guide.steps.some((step) => Boolean(step.troubleshootingAdvice));
    assert.ok(hasTroubleshooting, `Guide ${guide.slug} should include troubleshooting advice`);

    // 7. Instructions for testing, exporting, or publishing
    assert.ok(
      guide.testingExportInstructions && guide.testingExportInstructions.length > 15,
      `Guide ${guide.slug} missing testingExportInstructions`
    );

    // 8. Official references
    assert.ok(
      Array.isArray(guide.officialReferences) && guide.officialReferences.length > 0,
      `Guide ${guide.slug} missing officialReferences`
    );
    for (const ref of guide.officialReferences) {
      assert.ok(ref.title && ref.url.startsWith('http'), `Invalid reference in ${guide.slug}`);
    }

    // 9. Relevant alternative tools
    assert.ok(
      Array.isArray(guide.relatedToolIds) && guide.relatedToolIds.length > 0,
      `Guide ${guide.slug} missing relatedToolIds`
    );
  }
});

test('Primary and Related Tools - exist in AI_TOOLS_DATA dataset', () => {
  const toolIds = new Set(AI_TOOLS_DATA.map((t) => t.id));
  const guides = getAllGuides();

  for (const guide of guides) {
    assert.ok(
      toolIds.has(guide.primaryToolId),
      `Primary tool "${guide.primaryToolId}" in guide ${guide.slug} not found in AI_TOOLS_DATA dataset`
    );
    for (const relId of guide.relatedToolIds) {
      assert.ok(
        toolIds.has(relId),
        `Related tool "${relId}" in guide ${guide.slug} not found in AI_TOOLS_DATA dataset`
      );
    }
  }
});

test('getGuideBySlug - retrieves single guide correctly', () => {
  const guide = getGuideBySlug('building-website-google-ai-studio');
  assert.ok(guide);
  assert.equal(guide?.primaryToolId, 'google-ai-studio');

  const missing = getGuideBySlug('non-existent-tutorial-slug');
  assert.equal(missing, undefined);
});

test('getGuidesForTool - returns relevant guides matching tool ID', () => {
  const studioGuides = getGuidesForTool('google-ai-studio');
  assert.ok(studioGuides.length >= 1);
  assert.ok(studioGuides.some((g) => g.slug === 'building-website-google-ai-studio'));

  const cursorGuides = getGuidesForTool('cursor');
  assert.ok(cursorGuides.length >= 1);
  assert.ok(cursorGuides.some((g) => g.slug === 'building-react-app-ai-coding-assistant'));
});

test('searchGuides - finds tutorials by task, title, tags, and category', () => {
  const presentationResults = searchGuides('presentation');
  assert.ok(presentationResults.length >= 1);
  assert.ok(presentationResults.some((g) => g.slug === 'creating-presentations-using-ai'));

  const voiceResults = searchGuides('voice');
  assert.ok(voiceResults.some((g) => g.slug === 'generating-voice-audio'));

  const emptyResults = searchGuides('xyz123randomnonexistentword99');
  assert.equal(emptyResults.length, 0);
});

test('getGuidesByCategory - filters correctly across distinct categories', () => {
  const codingGuides = getGuidesByCategory('coding');
  assert.ok(codingGuides.some((g) => g.slug === 'building-react-app-ai-coding-assistant'));

  const videoGuides = getGuidesByCategory('ai-video-generation');
  assert.ok(videoGuides.some((g) => g.slug === 'creating-ai-videos'));
});
