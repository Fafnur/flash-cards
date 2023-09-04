import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

function generateEnvs(project: string): void {
  const file = `apps/${project}/.env`;
  const path = join(process.cwd(), file);
  if (!existsSync(path)) {
    const fileContent = readFileSync(`${path}.example`, 'utf8');
    writeFileSync(file, fileContent);
  }
}

function generateDynamicRoutes(project: string): void {
  const file = `apps/${project}/dynamic-routes.txt`;
  const path = join(process.cwd(), file);
  if (!existsSync(path)) {
    writeFileSync(file, '/\n');
  }
}

// const project = 'web';
// generateEnvs(project);
// generateDynamicRoutes(project);
