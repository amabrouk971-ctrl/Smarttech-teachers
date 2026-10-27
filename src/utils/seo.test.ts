/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Test suite for SmartTech SEO & GEO Intelligence Engine,
 * Article Quality Verification, 1-Click Repair Engine & Schema Generator.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { COMPLETE_ARTICLES } from '../data/articlesData';
import {
  runTechnicalSeoAudit,
  applyRepair,
  rollbackRepair,
  verifyRepair,
  generateArticleJsonLd,
  assessGeoReadiness,
  getRepairAuditLogs,
} from '../services/seoEngine';
import {
  getGscConnectionStatus,
  connectGscAccount,
  disconnectGscAccount,
  getGscPerformanceData,
} from '../services/gscService';

describe('SmartTech SEO & Content Verification Suite', () => {

  describe('1. Authoritative Articles Completeness & Depth', () => {
    it('should have exactly 10 comprehensive articles', () => {
      assert.strictEqual(COMPLETE_ARTICLES.length, 10, 'Expected exactly 10 fully-researched articles');
    });

    it('every article must exceed the 2,500 word threshold for comprehensive topical depth', () => {
      COMPLETE_ARTICLES.forEach((article, index) => {
        const rawWords = article.bodyMarkdown.trim().split(/\s+/).length;
        assert.ok(
          rawWords >= 2500,
          `Article #${index + 1} (${article.slug}) has ${rawWords} words, which is under the 2,500 words requirement`
        );
        assert.ok(
          article.wordCount >= 2500,
          `Article #${index + 1} wordCount property is ${article.wordCount}`
        );
      });
    });

    it('every article must have verified primary citations and educational sources', () => {
      COMPLETE_ARTICLES.forEach((article) => {
        assert.ok(
          Array.isArray(article.sources) && article.sources.length >= 3,
          `Article ${article.slug} must have at least 3 authoritative sources`
        );
        article.sources.forEach((src) => {
          assert.ok(src.title && src.publisher && src.year, `Invalid source in ${article.slug}`);
        });
      });
    });

    it('every article must have at least 3 structured FAQ questions with clear answers', () => {
      COMPLETE_ARTICLES.forEach((article) => {
        assert.ok(
          Array.isArray(article.faqs) && article.faqs.length >= 3,
          `Article ${article.slug} must have at least 3 FAQs`
        );
        article.faqs.forEach((faq) => {
          assert.ok(faq.question.length > 5, `FAQ question too short in ${article.slug}`);
          assert.ok(faq.answer.length > 15, `FAQ answer too short in ${article.slug}`);
        });
      });
    });

    it('every article must have strategic internal links defined', () => {
      COMPLETE_ARTICLES.forEach((article) => {
        assert.ok(
          Array.isArray(article.internalLinks) && article.internalLinks.length >= 1,
          `Article ${article.slug} must have internal link suggestions`
        );
        article.internalLinks.forEach((link) => {
          assert.ok(link.targetUrl && link.anchorText, `Malformed internal link in ${article.slug}`);
        });
      });
    });
  });

  describe('2. Technical Crawler & Audit Engine', () => {
    it('should calculate technical SEO health score and detect actionable issues', () => {
      const auditResult = runTechnicalSeoAudit(COMPLETE_ARTICLES);
      assert.ok(typeof auditResult.healthScore === 'number', 'Health score must be a number');
      assert.ok(auditResult.healthScore >= 0 && auditResult.healthScore <= 100, 'Health score must be 0-100');
      assert.ok(Array.isArray(auditResult.issues), 'Audit issues must be an array');
      assert.ok(auditResult.issues.length > 0, 'Audit should detect issues or optimization candidates');
      assert.ok(auditResult.totalUrlsAudited >= 10, 'Audit must analyze all site URLs');
    });

    it('should evaluate GEO 9-dimension readiness score between 0 and 100', () => {
      const testArt = COMPLETE_ARTICLES[0];
      const geo = assessGeoReadiness(testArt);
      assert.ok(geo.overallGeoScore >= 0 && geo.overallGeoScore <= 100, 'GEO score must be in 0-100 range');
      assert.ok(Object.keys(geo.dimensions).length === 9, 'GEO evaluation must assess all 9 dimensions');
      assert.ok(Array.isArray(geo.recommendations), 'GEO recommendations must be an array');
    });
  });

  describe('3. One-Click Repair, Rollback & Audit Trail Engine', () => {
    it('should safely apply an approved repair, verify it, rollback, and log immutable entries', () => {
      const auditResult = runTechnicalSeoAudit(COMPLETE_ARTICLES);
      const repairable = auditResult.issues[0];
      assert.ok(repairable, 'At least one repairable issue must exist');

      const initialLogCount = getRepairAuditLogs().length;

      // Apply repair
      const res = applyRepair(repairable.id, 'Dr. Ahmed Mabrouk (Admin)');
      assert.strictEqual(res.success, true, 'Repair should succeed');
      assert.strictEqual(res.issue?.status, 'Applied', 'Status must be Applied');

      // Verify audit log appended
      assert.ok(getRepairAuditLogs().length > initialLogCount, 'Audit log entry must be recorded');

      // Verify repair
      const verRes = verifyRepair(repairable.id);
      assert.strictEqual(verRes.verified, true, 'Verification should succeed');

      // Rollback repair
      const rollbackRes = rollbackRepair(repairable.id, 'Dr. Ahmed Mabrouk (Admin)');
      assert.strictEqual(rollbackRes.success, true, 'Rollback should succeed');
    });
  });

  describe('4. Schema.org Structured Data Generator', () => {
    it('should generate valid JSON-LD graph with Article, BreadcrumbList, and FAQPage schemas', () => {
      const art = COMPLETE_ARTICLES[0];
      const jsonLdString = generateArticleJsonLd(art);
      assert.ok(typeof jsonLdString === 'string', 'generateArticleJsonLd should return JSON string');

      const jsonLd = JSON.parse(jsonLdString);

      assert.strictEqual(jsonLd['@context'], 'https://schema.org', 'Must have schema.org context');
      assert.ok(Array.isArray(jsonLd['@graph']), 'Must contain @graph array');

      const types = jsonLd['@graph'].map((item: any) => item['@type']);
      assert.ok(types.includes('Article'), 'Graph must contain Article');
      assert.ok(types.includes('BreadcrumbList'), 'Graph must contain BreadcrumbList');
      assert.ok(types.includes('FAQPage'), 'Graph must contain FAQPage');

      const articleNode = jsonLd['@graph'].find((i: any) => i['@type'] === 'Article');
      assert.strictEqual(articleNode.headline, art.seoTitle);
      assert.strictEqual(articleNode.author.name, 'Dr. Ahmed Mabrouk');
      assert.strictEqual(articleNode.publisher.name, 'SmartTech Training & Testing Center');

      const faqNode = jsonLd['@graph'].find((i: any) => i['@type'] === 'FAQPage');
      assert.strictEqual(faqNode.mainEntity.length, art.faqs.length);
    });
  });

  describe('5. Google Search Console Honest Architecture', () => {
    it('should be disconnected initially and never fabricate fake traffic/volume metrics', () => {
      disconnectGscAccount();
      const status = getGscConnectionStatus();
      assert.strictEqual(status.isConnected, false, 'GSC must be disconnected initially');
      
      const perf = getGscPerformanceData();
      assert.strictEqual(perf.queries.length, 0, 'GSC queries must be empty when disconnected');
      assert.strictEqual(perf.pages.length, 0, 'GSC pages must be empty when disconnected');
      assert.strictEqual(perf.highImpressionOpportunities.length, 0, 'Opportunities must be empty when disconnected');
      assert.strictEqual(perf.cannibalizationAlerts.length, 0, 'Cannibalization must be empty when disconnected');
    });

    it('should provide authentic query and opportunity insights upon authorized connection', () => {
      const connectedStatus = connectGscAccount('amabrouk971@gmail.com');
      assert.strictEqual(connectedStatus.isConnected, true, 'GSC must show connected');
      assert.strictEqual(connectedStatus.connectedAccountEmail, 'amabrouk971@gmail.com');

      const perf = getGscPerformanceData();
      assert.ok(perf.queries.length > 0, 'Must have verified query breakdown when connected');
      assert.ok(perf.pages.length > 0, 'Must have page analytics when connected');
      assert.ok(Array.isArray(perf.highImpressionOpportunities), 'Opportunities must be analyzed');

      // Clean up after test
      disconnectGscAccount();
    });
  });
});
