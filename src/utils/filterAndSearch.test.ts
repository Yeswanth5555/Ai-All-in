import test from 'node:test';
import assert from 'node:assert/strict';
import { AI_TOOLS_DATA } from '../data/tools';
import {
  searchAndFilterTools,
  detectSearchIntent,
  extractSearchTokens,
  getFreeAlternatives,
  getCategoryCounts,
  generateToolSchemaJsonLd,
  CATEGORY_LABELS,
} from './filterAndSearch';

test('dataset contains at least 100 verified tools', () => {
  assert.ok(
    AI_TOOLS_DATA.length >= 100,
    `Expected at least 100 tools, but found ${AI_TOOLS_DATA.length}`
  );
});

test('all required categories are populated in the dataset', () => {
  const categories = Object.keys(CATEGORY_LABELS) as (keyof typeof CATEGORY_LABELS)[];
  const counts = getCategoryCounts(AI_TOOLS_DATA);

  for (const cat of categories) {
    const count = counts[cat] || 0;
    assert.ok(
      count >= 5,
      `Category ${cat} should have at least 5 tools, found ${count}`
    );
  }
});

test('searchAndFilterTools accurately resolves "editing names in the pdf" intent and ranks PDF editing tools first', () => {
  const query = 'editing names in the pdf';
  const intent = detectSearchIntent(query);

  assert.ok(intent !== null, 'Intent should be recognized');
  assert.equal(intent?.key, 'pdf-edit');
  assert.equal(intent?.badge, 'PDF TEXT & NAME EDITING');
  assert.ok(intent?.summary.includes('PDF'));

  const results = searchAndFilterTools(AI_TOOLS_DATA, { searchQuery: query });
  assert.ok(results.length >= 3, `Expected at least 3 matching PDF tools, found ${results.length}`);

  // Top tools must include specialized PDF editors
  const topIds = results.slice(0, 4).map((t) => t.id);
  assert.ok(
    topIds.includes('pdfgear-ai') || topIds.includes('adobe-acrobat-ai') || topIds.includes('updf-ai'),
    `Top results ${JSON.stringify(topIds)} should contain dedicated PDF editing tools`
  );

  // Every top result must have PDF capabilities
  for (const tool of results.slice(0, 4)) {
    const mentionsPdf =
      tool.name.toLowerCase().includes('pdf') ||
      tool.tags.some((t) => t.includes('pdf')) ||
      tool.description.toLowerCase().includes('pdf');
    assert.ok(mentionsPdf, `Tool ${tool.name} should have PDF capabilities`);
  }
});

test('detectSearchIntent recognizes diverse task intents across categories', () => {
  // Video background removal
  const videoIntent = detectSearchIntent('remove background from video');
  assert.equal(videoIntent?.key, 'video-bg-remove');

  // Music stem separation
  const stemIntent = detectSearchIntent('separate vocals from song');
  assert.equal(stemIntent?.key, 'music-stems');

  // Code testing
  const codeIntent = detectSearchIntent('generate unit tests for python code');
  assert.equal(codeIntent?.key, 'code-testing-debug');

  // Voice cloning
  const voiceIntent = detectSearchIntent('clone my voice');
  assert.equal(voiceIntent?.key, 'voice-cloning');

  // Slides
  const slideIntent = detectSearchIntent('make a presentation slide deck');
  assert.equal(slideIntent?.key, 'presentation-slides');
});

test('extractSearchTokens strips stop words and stems plurals', () => {
  const tokens = extractSearchTokens('i need editing names in the pdf');
  assert.ok(tokens.includes('edit') || tokens.includes('editing'));
  assert.ok(tokens.includes('name') || tokens.includes('names'));
  assert.ok(tokens.includes('pdf'));
  assert.ok(!tokens.includes('the'));
  assert.ok(!tokens.includes('in'));
});

test('searchAndFilterTools filters by keyword across title, tags and descriptions', () => {
  const results = searchAndFilterTools(AI_TOOLS_DATA, { searchQuery: 'Claude' });
  assert.ok(results.length > 0);
  assert.ok(results.some((t) => t.id === 'claude-ai'));

  const codeResults = searchAndFilterTools(AI_TOOLS_DATA, {
    category: 'coding',
    searchQuery: 'editor',
  });
  assert.ok(codeResults.some((t) => t.id === 'cursor'));
});

test('searchAndFilterTools handles free-only and open-source filters', () => {
  const openSourceTools = searchAndFilterTools(AI_TOOLS_DATA, {
    onlyOpenSource: true,
  });
  assert.ok(openSourceTools.length > 10);
  for (const tool of openSourceTools) {
    assert.equal(tool.isOpenSource, true);
  }

  const freeOrFreemium = searchAndFilterTools(AI_TOOLS_DATA, {
    onlyFreeOrFreemium: true,
  });
  for (const tool of freeOrFreemium) {
    const isFreeCapable =
      tool.hasFreeTier || tool.pricingModel === 'Free' || tool.pricingModel === 'Open Source';
    assert.equal(isFreeCapable, true);
  }
});

test('getFreeAlternatives reliably suggests free or open source options', () => {
  const midjourney = AI_TOOLS_DATA.find((t) => t.id === 'midjourney');
  assert.ok(midjourney, 'Midjourney should exist');

  const alternatives = getFreeAlternatives(midjourney, AI_TOOLS_DATA);
  assert.ok(alternatives.length > 0, 'Should find alternatives for Midjourney');

  // Alternatives should have free tier or open source
  for (const alt of alternatives) {
    assert.ok(
      alt.hasFreeTier || alt.isOpenSource || alt.pricingModel === 'Free',
      `Alternative ${alt.name} should be free or open source`
    );
  }
});

test('generateToolSchemaJsonLd generates valid JSON-LD schema', () => {
  const tool = AI_TOOLS_DATA[0];
  const jsonLdString = generateToolSchemaJsonLd(tool);
  const parsed = JSON.parse(jsonLdString);

  assert.equal(parsed['@context'], 'https://schema.org');
  assert.equal(parsed['@type'], 'SoftwareApplication');
  assert.equal(parsed.name, tool.name);
  assert.equal(parsed.url, tool.websiteUrl);
});
