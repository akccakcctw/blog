#!/usr/bin/env node

import { writeFile } from 'fs/promises';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { select, input } from '@inquirer/prompts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIRS = {
  til: 'src/content/til/',
  blog: 'src/content/blog/',
};

// 互動式詢問用戶（使用新版 Inquirer 提示函式）
async function promptUser() {
  const type = await select({
    message: '請選擇要產生的模板類型:',
    choices: [
      { name: '📌 TIL (Today I Learned)', value: 'til' },
      { name: '📝 Blog', value: 'blog' },
    ],
  });
  const title = await input({
    message: '請輸入文章標題:',
    validate: (text) => text.trim() ? true : '標題不能為空！',
  });
  return { type, title };
}

// 產生 Markdown 檔案
async function createNewPost(type, title) {
  try {
    // 獲取當前日期時間（Asia/Taipei）
    const date = execSync("TZ='Asia/Taipei' date +'%Y-%m-%dT%H:%M:%S.000+08:00'")
      .toString()
      .trim();

    const datePart = date.split('T')[0]; // 取得 YYYY-MM-DD
    const filename = `${datePart}-${title.replace(/\s+/g, '-').toLowerCase()}.md`;
    const outputDir = OUTPUT_DIRS[type];
    const filepath = join(__dirname, '..', outputDir, filename);

    // Markdown 內容
    const content = `---
title: ${title}
date: ${date}
tags:
---

`;

    // 寫入檔案
    await writeFile(filepath, content);
    console.log(`✅ 已新增: ${filepath}`);
  } catch (error) {
    console.error('❌ 發生錯誤:', error.message);
    process.exit(1);
  }
}

// 主執行函式
async function main() {
  const { type, title } = await promptUser();
  await createNewPost(type, title);
}

main();
