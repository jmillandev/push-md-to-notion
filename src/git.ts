import { execSync } from 'node:child_process';
import * as core from '@actions/core';

/**
 * Query git repo for any markdown files that have changed in the last commit.
 * @returns List of markdown files.
 */
export function getChangedMdFiles(): string[] {
  core.startGroup('get changed markdown files');
  const gitCommand = 'git show --name-only --pretty=format:';
  const gitOutput = execSync(gitCommand, {
    encoding: 'utf-8',
  });
  console.log(gitCommand);
  console.log(gitOutput);
  const markdownChanges = gitOutput
      .trim()
      .split('\n')
      .filter((fn: string) => fn.endsWith('.md'));
  console.info(`Markdown files changed in last commit: ${markdownChanges}`);
  core.endGroup()
  return markdownChanges
}
