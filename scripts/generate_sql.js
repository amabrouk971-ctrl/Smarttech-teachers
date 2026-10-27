/**
 * Generates database/schema.sql with full MySQL DDL + seed data for cPanel / PHP deployment
 */

import fs from 'fs';
import path from 'path';
import { CURRICULUM_MODULES } from '../src/data/curriculumData.js';

let sql = `-- ==========================================================
-- SmartTech Teacher Academy (SmartTech English for Teachers)
-- Production MySQL Schema & Seed Data
-- Domain: https://teaches.smart-courses.org
-- Compatible with: cPanel, phpMyAdmin, MySQL 5.7+ / 8.0+, MariaDB 10.3+
-- ==========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------
-- Table structure for users
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`users\`;
CREATE TABLE \`users\` (
  \`id\` VARCHAR(64) NOT NULL,
  \`email\` VARCHAR(191) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) DEFAULT NULL,
  \`full_name\` VARCHAR(191) NOT NULL,
  \`phone\` VARCHAR(32) DEFAULT NULL,
  \`role\` ENUM('teacher', 'admin', 'super_admin') NOT NULL DEFAULT 'teacher',
  \`cefr_level\` ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2') NOT NULL DEFAULT 'A1',
  \`subscription_status\` ENUM('trial', 'active', 'expired', 'lifetime') NOT NULL DEFAULT 'trial',
  \`subscription_tier\` ENUM('free_trial', 'monthly_50egp', 'annual_250egp') NOT NULL DEFAULT 'free_trial',
  \`subscription_expires_at\` DATETIME DEFAULT NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for curriculum_modules
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`curriculum_modules\`;
CREATE TABLE \`curriculum_modules\` (
  \`id\` VARCHAR(64) NOT NULL,
  \`number\` INT NOT NULL,
  \`title_en\` VARCHAR(255) NOT NULL,
  \`title_ar\` VARCHAR(255) NOT NULL,
  \`cefr_range\` VARCHAR(32) NOT NULL,
  \`color\` VARCHAR(32) NOT NULL,
  \`description_en\` TEXT NOT NULL,
  \`description_ar\` TEXT NOT NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for lessons
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`lessons\`;
CREATE TABLE \`lessons\` (
  \`id\` VARCHAR(64) NOT NULL,
  \`module_id\` VARCHAR(64) NOT NULL,
  \`number\` VARCHAR(16) NOT NULL,
  \`slug\` VARCHAR(128) NOT NULL,
  \`cefr\` ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2') NOT NULL DEFAULT 'A1',
  \`duration_min\` INT NOT NULL DEFAULT 15,
  \`title_en\` VARCHAR(255) NOT NULL,
  \`title_ar\` VARCHAR(255) NOT NULL,
  \`subtitle_en\` VARCHAR(255) NOT NULL,
  \`subtitle_ar\` VARCHAR(255) NOT NULL,
  \`pedagogical_overview_en\` TEXT NOT NULL,
  \`pedagogical_overview_ar\` TEXT NOT NULL,
  \`is_free_preview\` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`),
  KEY \`idx_module_id\` (\`module_id\`),
  CONSTRAINT \`fk_lessons_module\` FOREIGN KEY (\`module_id\`) REFERENCES \`curriculum_modules\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for vocabulary
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`vocabulary\`;
CREATE TABLE \`vocabulary\` (
  \`id\` INT AUTO_INCREMENT NOT NULL,
  \`lesson_id\` VARCHAR(64) NOT NULL,
  \`word_en\` VARCHAR(128) NOT NULL,
  \`phonetic\` VARCHAR(128) NOT NULL,
  \`meaning_ar\` VARCHAR(255) NOT NULL,
  \`example_en\` TEXT NOT NULL,
  \`example_ar\` TEXT NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`idx_voc_lesson\` (\`lesson_id\`),
  CONSTRAINT \`fk_voc_lesson\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for expressions
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`expressions\`;
CREATE TABLE \`expressions\` (
  \`id\` VARCHAR(64) NOT NULL,
  \`lesson_id\` VARCHAR(64) NOT NULL,
  \`english\` TEXT NOT NULL,
  \`arabic\` TEXT NOT NULL,
  \`phonetic_tip\` VARCHAR(255) DEFAULT NULL,
  \`pedagogical_note_en\` TEXT NOT NULL,
  \`pedagogical_note_ar\` TEXT NOT NULL,
  \`category\` ENUM('instruction', 'questioning', 'management', 'feedback', 'transition') NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`idx_exp_lesson\` (\`lesson_id\`),
  CONSTRAINT \`fk_exp_lesson\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for dialogues
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`dialogues\`;
CREATE TABLE \`dialogues\` (
  \`id\` INT AUTO_INCREMENT NOT NULL,
  \`lesson_id\` VARCHAR(64) NOT NULL,
  \`sort_order\` INT NOT NULL DEFAULT 1,
  \`speaker\` VARCHAR(64) NOT NULL,
  \`speaker_ar\` VARCHAR(64) NOT NULL,
  \`en\` TEXT NOT NULL,
  \`ar\` TEXT NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`idx_dlg_lesson\` (\`lesson_id\`),
  CONSTRAINT \`fk_dlg_lesson\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for exercises
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`exercises\`;
CREATE TABLE \`exercises\` (
  \`id\` VARCHAR(64) NOT NULL,
  \`lesson_id\` VARCHAR(64) NOT NULL,
  \`prompt_en\` TEXT NOT NULL,
  \`prompt_ar\` TEXT NOT NULL,
  \`context_en\` TEXT NOT NULL,
  \`context_ar\` TEXT NOT NULL,
  \`explanation_en\` TEXT NOT NULL,
  \`explanation_ar\` TEXT NOT NULL,
  \`source_reference\` VARCHAR(255) NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`idx_ex_lesson\` (\`lesson_id\`),
  CONSTRAINT \`fk_ex_lesson\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for exercise_options
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`exercise_options\`;
CREATE TABLE \`exercise_options\` (
  \`id\` VARCHAR(64) NOT NULL,
  \`exercise_id\` VARCHAR(64) NOT NULL,
  \`text_en\` TEXT NOT NULL,
  \`text_ar\` TEXT NOT NULL,
  \`is_correct\` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (\`id\`),
  KEY \`idx_opt_ex\` (\`exercise_id\`),
  CONSTRAINT \`fk_opt_ex\` FOREIGN KEY (\`exercise_id\`) REFERENCES \`exercises\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for assignments
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`assignments\`;
CREATE TABLE \`assignments\` (
  \`id\` VARCHAR(64) NOT NULL,
  \`lesson_id\` VARCHAR(64) NOT NULL,
  \`title_en\` VARCHAR(255) NOT NULL,
  \`title_ar\` VARCHAR(255) NOT NULL,
  \`instructions_en\` TEXT NOT NULL,
  \`instructions_ar\` TEXT NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`idx_asgn_lesson\` (\`lesson_id\`),
  CONSTRAINT \`fk_asgn_lesson\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for user_progress
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`user_progress\`;
CREATE TABLE \`user_progress\` (
  \`id\` INT AUTO_INCREMENT NOT NULL,
  \`user_id\` VARCHAR(64) NOT NULL,
  \`lesson_id\` VARCHAR(64) NOT NULL,
  \`is_completed\` TINYINT(1) NOT NULL DEFAULT 1,
  \`completed_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uniq_user_lesson\` (\`user_id\`, \`lesson_id\`),
  CONSTRAINT \`fk_prog_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_prog_lesson\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for speech_practice_logs
-- ----------------------------------------------------------
DROP TABLE IF EXISTS \`speech_practice_logs\`;
CREATE TABLE \`speech_practice_logs\` (
  \`id\` INT AUTO_INCREMENT NOT NULL,
  \`user_id\` VARCHAR(64) NOT NULL,
  \`expression_id\` VARCHAR(64) NOT NULL,
  \`spoken_transcript\` TEXT NOT NULL,
  \`accuracy_score\` INT NOT NULL,
  \`recorded_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  KEY \`idx_speech_user\` (\`user_id\`),
  CONSTRAINT \`fk_spch_user\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================================
-- SEED DATA INGESTION
-- ==========================================================

-- Super Admin User
INSERT INTO \`users\` (\`id\`, \`email\`, \`full_name\`, \`role\`, \`cefr_level\`, \`subscription_status\`, \`subscription_tier\`, \`subscription_expires_at\`)
VALUES ('usr-admin-mabrouk', 'amabrouk971@gmail.com', 'Dr. Ahmed Mabrouk', 'super_admin', 'C2', 'lifetime', 'annual_250egp', '2099-12-31 23:59:59')
ON DUPLICATE KEY UPDATE \`role\` = 'super_admin';

`;

function escapeSql(str) {
  if (!str) return "''";
  return "'" + str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0": return "\\0";
      case "\x08": return "\\b";
      case "\x09": return "\\t";
      case "\x1a": return "\\z";
      case "\n": return "\\n";
      case "\r": return "\\r";
      case "\"":
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  }) + "'";
}

// Ingest Modules & Lessons
for (const mod of CURRICULUM_MODULES) {
  sql += `\n-- Ingest Module ${mod.number}: ${mod.titleEn}\n`;
  sql += `INSERT INTO \`curriculum_modules\` (\`id\`, \`number\`, \`title_en\`, \`title_ar\`, \`cefr_range\`, \`color\`, \`description_en\`, \`description_ar\`) VALUES (${escapeSql(mod.id)}, ${mod.number}, ${escapeSql(mod.titleEn)}, ${escapeSql(mod.titleAr)}, ${escapeSql(mod.cefrRange)}, ${escapeSql(mod.color)}, ${escapeSql(mod.descriptionEn)}, ${escapeSql(mod.descriptionAr)});\n`;

  for (const les of mod.lessons) {
    const isFree = les.id === 'les-1-1' ? 1 : 0;
    sql += `INSERT INTO \`lessons\` (\`id\`, \`module_id\`, \`number\`, \`slug\`, \`cefr\`, \`duration_min\`, \`title_en\`, \`title_ar\`, \`subtitle_en\`, \`subtitle_ar\`, \`pedagogical_overview_en\`, \`pedagogical_overview_ar\`, \`is_free_preview\`) VALUES (${escapeSql(les.id)}, ${escapeSql(mod.id)}, ${escapeSql(les.number)}, ${escapeSql(les.slug)}, ${escapeSql(les.cefr)}, ${les.durationMin}, ${escapeSql(les.titleEn)}, ${escapeSql(les.titleAr)}, ${escapeSql(les.subtitleEn)}, ${escapeSql(les.subtitleAr)}, ${escapeSql(les.pedagogicalOverviewEn)}, ${escapeSql(les.pedagogicalOverviewAr)}, ${isFree});\n`;

    // Vocabulary
    for (const v of les.vocabulary) {
      sql += `INSERT INTO \`vocabulary\` (\`lesson_id\`, \`word_en\`, \`phonetic\`, \`meaning_ar\`, \`example_en\`, \`example_ar\`) VALUES (${escapeSql(les.id)}, ${escapeSql(v.wordEn)}, ${escapeSql(v.phonetic)}, ${escapeSql(v.meaningAr)}, ${escapeSql(v.exampleEn)}, ${escapeSql(v.exampleAr)});\n`;
    }

    // Expressions
    for (const exp of les.expressions) {
      sql += `INSERT INTO \`expressions\` (\`id\`, \`lesson_id\`, \`english\`, \`arabic\`, \`phonetic_tip\`, \`pedagogical_note_en\`, \`pedagogical_note_ar\`, \`category\`) VALUES (${escapeSql(exp.id)}, ${escapeSql(les.id)}, ${escapeSql(exp.english)}, ${escapeSql(exp.arabic)}, ${escapeSql(exp.phoneticTip || '')}, ${escapeSql(exp.pedagogicalNoteEn)}, ${escapeSql(exp.pedagogicalNoteAr)}, ${escapeSql(exp.category)});\n`;
    }

    // Dialogues
    let dIdx = 1;
    for (const d of les.dialogue) {
      sql += `INSERT INTO \`dialogues\` (\`lesson_id\`, \`sort_order\`, \`speaker\`, \`speaker_ar\`, \`en\`, \`ar\`) VALUES (${escapeSql(les.id)}, ${dIdx++}, ${escapeSql(d.speaker)}, ${escapeSql(d.speakerAr)}, ${escapeSql(d.en)}, ${escapeSql(d.ar)});\n`;
    }

    // Exercises & Options
    for (const ex of les.exercises) {
      sql += `INSERT INTO \`exercises\` (\`id\`, \`lesson_id\`, \`prompt_en\`, \`prompt_ar\`, \`context_en\`, \`context_ar\`, \`explanation_en\`, \`explanation_ar\`, \`source_reference\`) VALUES (${escapeSql(ex.id)}, ${escapeSql(les.id)}, ${escapeSql(ex.promptEn)}, ${escapeSql(ex.promptAr)}, ${escapeSql(ex.contextEn)}, ${escapeSql(ex.contextAr)}, ${escapeSql(ex.explanationEn)}, ${escapeSql(ex.explanationAr)}, ${escapeSql(ex.sourceReference)});\n`;
      for (const opt of ex.options) {
        sql += `INSERT INTO \`exercise_options\` (\`id\`, \`exercise_id\`, \`text_en\`, \`text_ar\`, \`is_correct\`) VALUES (${escapeSql(opt.id)}, ${escapeSql(ex.id)}, ${escapeSql(opt.textEn)}, ${escapeSql(opt.textAr)}, ${opt.isCorrect ? 1 : 0});\n`;
      }
    }

    // Assignment
    if (les.assignment) {
      sql += `INSERT INTO \`assignments\` (\`id\`, \`lesson_id\`, \`title_en\`, \`title_ar\`, \`instructions_en\`, \`instructions_ar\`) VALUES (${escapeSql('asgn-' + les.id)}, ${escapeSql(les.id)}, ${escapeSql(les.assignment.titleEn)}, ${escapeSql(les.assignment.titleAr)}, ${escapeSql(les.assignment.instructionsEn)}, ${escapeSql(les.assignment.instructionsAr)});\n`;
    }
  }
}

sql += `\nSET FOREIGN_KEY_CHECKS = 1;\n-- Completed SmartTech schema generation\n`;

const targetDir = path.resolve(process.cwd(), 'database');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}
fs.writeFileSync(path.join(targetDir, 'schema.sql'), sql, 'utf8');
console.log('Successfully written database/schema.sql');
