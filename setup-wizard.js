#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

// Setup colors for CLI
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// IDE/Tool options with their corresponding directory structures
const ideTools = [
  { name: 'Generic AI Tool (recommended)', folder: '.ai/rules' },
  { name: 'Cursor AI', folder: '.cursor/rules' },
  { name: 'Windsurf', folder: '.windsurf/rules' },
  { name: 'GitHub Copilot', folder: '.github/copilot/rules' },
  { name: 'VS Code', folder: '.vscode/ai-rules' },
  { name: 'Claude Code Integration', folder: '.claude/rules' },
  { name: 'OpenAI Codex', folder: '.openai/rules' }
];

// Configuration options
const frameworks = [
  { name: 'React', folder: 'React19' },
  { name: 'Next.js', folder: 'NextJS15' },
  { name: 'Vue', folder: 'Vue3' },
  { name: 'Svelte', folder: 'Svelte5' },
  { name: 'Angular', folder: 'Angular' },
  { name: 'Express', folder: 'NodeExpress' },
  { name: 'FastAPI', folder: 'FastAPI' },
  { name: 'Flutter', folder: 'Flutter' },
  { name: 'SwiftUI', folder: 'SwiftUI' },
  { name: 'PySide', folder: 'PySideUI' },
  { name: 'Tauri', folder: 'Tauri' },
  { name: 'None/Other', folder: null }
];

const languages = [
  { name: 'TypeScript', folder: 'TypeScript-Modern' },
  { name: 'JavaScript', folder: null },
  { name: 'Python', folder: 'Python3' },
  { name: 'Swift', folder: 'Swift' },
  { name: 'Kotlin', folder: 'Kotlin' },
  { name: 'C++', folder: 'CPP20' },
  { name: 'Go', folder: null },
  { name: 'Rust', folder: null },
  { name: 'Other', folder: null }
];

const stacks = [
  { name: 'Next.js + Supabase', folder: 'Supabase-NextJS-Stack' },
  { name: 'Next.js Enterprise', folder: 'NextJS-Enterprise-Stack' },
  { name: 'tRPC Full-Stack', folder: 'TRPC-FullStack' },
  { name: 'Astro Content', folder: 'Astro-Content-Stack' },
  { name: 'E-commerce', folder: 'Ecommerce-Stack' },
  { name: 'React Native Mobile', folder: 'ReactNative-Mobile-Stack' },
  { name: 'None/Other', folder: null }
];

const technologies = [
  { name: 'Tailwind CSS', folder: 'Tailwind4' },
  { name: 'GraphQL', folder: 'GraphQL' },
  { name: 'Supabase', folder: 'Supabase' },
  { name: 'Docker/Kubernetes', folder: 'Docker-Kubernetes' },
  { name: 'shadcn/ui', folder: 'ShadcnUI' },
  { name: 'Agentic AI', folder: 'Agentic-AI-Development' },
  { name: 'MCP Servers', folder: 'MCP-Integration' },
  { name: 'Sequential Thinking', folder: 'Sequential-Thinking-Advanced' },
  { name: 'Memory Management', folder: 'Memory-Management' }
];

const tools = [
  { name: 'AI Code Review', folder: 'AI-Code-Review' },
  { name: 'AI Pair Programming', folder: 'AI-Pair-Programming' },
  { name: 'Memory Handoff', folder: 'AI-Session-Handoff' },
  { name: 'AI Refactoring', folder: 'AI-Refactoring' },
  { name: 'API Development', folder: 'API-Endpoints' },
  { name: 'Performance Optimization', folder: 'Optimize-Performance' },
  { name: 'Task Breakdown', folder: 'Task-Breakdown' },
  { name: 'Write Tests', folder: 'Write-Tests' }
];

// User selections
const userSelections = {
  projectPath: process.cwd(),
  ideTool: null,
  framework: null,
  language: null,
  stack: null,
  technologies: [],
  tools: []
};

// Function to ask a question and get input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Function to select an IDE/Tool
async function selectIDETool() {
  console.log(`\n${colors.bright}${colors.blue}Select your IDE or AI Tool:${colors.reset}`);
  
  ideTools.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name}`);
  });
  
  const answer = await askQuestion(`\nEnter number (1-${ideTools.length}): `);
  const index = parseInt(answer) - 1;
  
  if (index >= 0 && index < ideTools.length) {
    userSelections.ideTool = ideTools[index];
    console.log(`${colors.green}Selected: ${userSelections.ideTool.name}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}Invalid selection. Using default.${colors.reset}`);
    userSelections.ideTool = ideTools[0]; // Default to first option
  }
}

// Function to select a framework
async function selectFramework() {
  console.log(`\n${colors.bright}${colors.blue}Select your primary framework:${colors.reset}`);
  
  frameworks.forEach((framework, index) => {
    console.log(`${index + 1}. ${framework.name}`);
  });
  
  const answer = await askQuestion(`\nEnter number (1-${frameworks.length}): `);
  const index = parseInt(answer) - 1;
  
  if (index >= 0 && index < frameworks.length) {
    userSelections.framework = frameworks[index];
    console.log(`${colors.green}Selected: ${userSelections.framework.name}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}Invalid selection. Using default.${colors.reset}`);
    userSelections.framework = frameworks[frameworks.length - 1]; // Default to None/Other
  }
}

// Function to select a language
async function selectLanguage() {
  console.log(`\n${colors.bright}${colors.blue}Select your primary language:${colors.reset}`);
  
  languages.forEach((language, index) => {
    console.log(`${index + 1}. ${language.name}`);
  });
  
  const answer = await askQuestion(`\nEnter number (1-${languages.length}): `);
  const index = parseInt(answer) - 1;
  
  if (index >= 0 && index < languages.length) {
    userSelections.language = languages[index];
    console.log(`${colors.green}Selected: ${userSelections.language.name}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}Invalid selection. Using default.${colors.reset}`);
    userSelections.language = languages[languages.length - 1]; // Default to Other
  }
}

// Function to select a stack
async function selectStack() {
  console.log(`\n${colors.bright}${colors.blue}Select your project stack (optional):${colors.reset}`);
  
  stacks.forEach((stack, index) => {
    console.log(`${index + 1}. ${stack.name}`);
  });
  
  const answer = await askQuestion(`\nEnter number (1-${stacks.length}) or press Enter to skip: `);
  
  if (answer.trim() === '') {
    userSelections.stack = stacks[stacks.length - 1]; // Default to None/Other
    console.log(`${colors.yellow}Skipped stack selection.${colors.reset}`);
    return;
  }
  
  const index = parseInt(answer) - 1;
  
  if (index >= 0 && index < stacks.length) {
    userSelections.stack = stacks[index];
    console.log(`${colors.green}Selected: ${userSelections.stack.name}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}Invalid selection. Using default.${colors.reset}`);
    userSelections.stack = stacks[stacks.length - 1]; // Default to None/Other
  }
}

// Function to select technologies
async function selectTechnologies() {
  console.log(`\n${colors.bright}${colors.blue}Select additional technologies (multiple selections allowed):${colors.reset}`);
  
  technologies.forEach((tech, index) => {
    console.log(`${index + 1}. ${tech.name}`);
  });
  
  const answer = await askQuestion(`\nEnter numbers separated by commas (1-${technologies.length}) or press Enter to skip: `);
  
  if (answer.trim() === '') {
    console.log(`${colors.yellow}No additional technologies selected.${colors.reset}`);
    return;
  }
  
  const selections = answer.split(',').map(num => parseInt(num.trim()) - 1);
  
  selections.forEach(index => {
    if (index >= 0 && index < technologies.length) {
      userSelections.technologies.push(technologies[index]);
      console.log(`${colors.green}Added: ${technologies[index].name}${colors.reset}`);
    }
  });
}

// Function to select tools/tasks
async function selectTools() {
  console.log(`\n${colors.bright}${colors.blue}Select AI assistant tools (multiple selections allowed):${colors.reset}`);
  
  tools.forEach((tool, index) => {
    console.log(`${index + 1}. ${tool.name}`);
  });
  
  const answer = await askQuestion(`\nEnter numbers separated by commas (1-${tools.length}) or press Enter to skip: `);
  
  if (answer.trim() === '') {
    console.log(`${colors.yellow}No tools selected.${colors.reset}`);
    return;
  }
  
  const selections = answer.split(',').map(num => parseInt(num.trim()) - 1);
  
  selections.forEach(index => {
    if (index >= 0 && index < tools.length) {
      userSelections.tools.push(tools[index]);
      console.log(`${colors.green}Added: ${tools[index].name}${colors.reset}`);
    }
  });
}

// Function to confirm the selections
async function confirmSelections() {
  console.log(`\n${colors.bright}${colors.blue}Review your selections:${colors.reset}`);
  console.log(`AI Tool: ${userSelections.ideTool.name}`);
  console.log(`Framework: ${userSelections.framework.name}`);
  console.log(`Language: ${userSelections.language.name}`);
  console.log(`Stack: ${userSelections.stack ? userSelections.stack.name : 'None'}`);
  
  console.log('Technologies:');
  if (userSelections.technologies.length === 0) {
    console.log('  None');
  } else {
    userSelections.technologies.forEach(tech => {
      console.log(`  - ${tech.name}`);
    });
  }
  
  console.log('Tools:');
  if (userSelections.tools.length === 0) {
    console.log('  None');
  } else {
    userSelections.tools.forEach(tool => {
      console.log(`  - ${tool.name}`);
    });
  }
  
  const answer = await askQuestion(`\nIs this correct? (Y/n): `);
  return answer.toLowerCase() !== 'n';
}

// Function to copy rule files
async function copyRuleFiles() {
  // Get source rules directory (from repository or local installation)
  const sourceRulesDir = path.join(__dirname, '.ai/rules');
  if (!fs.existsSync(sourceRulesDir)) {
    console.log(`${colors.yellow}Warning: Source rules directory not found at ${sourceRulesDir}.${colors.reset}`);
    console.log(`${colors.yellow}Falling back to .cursor/rules directory.${colors.reset}`);
    
    // Try alternate location
    const altSourceRulesDir = path.join(__dirname, '.cursor/rules');
    if (!fs.existsSync(altSourceRulesDir)) {
      console.log(`${colors.red}Error: Cannot find rules directory. Setup cannot continue.${colors.reset}`);
      return false;
    }
  }
  
  // Create target directory based on selected IDE/Tool
  const targetDir = path.join(userSelections.projectPath, userSelections.ideTool.folder);
  
  console.log(`\n${colors.bright}${colors.blue}Setting up AIDevRules in ${targetDir}...${colors.reset}`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Create subdirectories
  const subdirs = ['languages', 'technologies', 'tasks', 'stacks', 'assistants', 'tools'];
  subdirs.forEach(dir => {
    const subdir = path.join(targetDir, dir);
    if (!fs.existsSync(subdir)) {
      fs.mkdirSync(subdir, { recursive: true });
    }
  });
  
  // Copy core files
  const coreFiles = ['00-core-agent.mdc', '01-project-context.mdc', '02-common-errors.mdc', '03-mcp-configuration.mdc'];
  coreFiles.forEach(file => {
    const source = path.join(sourceRulesDir, file);
    const target = path.join(targetDir, file);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, target);
      console.log(`${colors.green}✓${colors.reset} Copied ${file}`);
    }
  });
  
  // Copy selected language
  if (userSelections.language && userSelections.language.folder) {
    const langSource = path.join(sourceRulesDir, 'languages', `${userSelections.language.folder}.mdc`);
    const langTarget = path.join(targetDir, 'languages', `${userSelections.language.folder}.mdc`);
    
    if (fs.existsSync(langSource)) {
      fs.copyFileSync(langSource, langTarget);
      console.log(`${colors.green}✓${colors.reset} Copied ${userSelections.language.name} language rules`);
    }
  }
  
  // Copy selected framework
  if (userSelections.framework && userSelections.framework.folder) {
    const frameworkSource = path.join(sourceRulesDir, 'technologies', `${userSelections.framework.folder}.mdc`);
    const frameworkTarget = path.join(targetDir, 'technologies', `${userSelections.framework.folder}.mdc`);
    
    if (fs.existsSync(frameworkSource)) {
      fs.copyFileSync(frameworkSource, frameworkTarget);
      console.log(`${colors.green}✓${colors.reset} Copied ${userSelections.framework.name} framework rules`);
    }
  }
  
  // Copy selected stack
  if (userSelections.stack && userSelections.stack.folder) {
    const stackSource = path.join(sourceRulesDir, 'stacks', `${userSelections.stack.folder}.mdc`);
    const stackTarget = path.join(targetDir, 'stacks', `${userSelections.stack.folder}.mdc`);
    
    if (fs.existsSync(stackSource)) {
      fs.copyFileSync(stackSource, stackTarget);
      console.log(`${colors.green}✓${colors.reset} Copied ${userSelections.stack.name} stack rules`);
    }
  }
  
  // Copy selected technologies
  if (userSelections.technologies.length > 0) {
    console.log(`\n${colors.bright}${colors.blue}Setting up technology rules...${colors.reset}`);
    userSelections.technologies.forEach(tech => {
      if (tech.folder) {
        const techSource = path.join(sourceRulesDir, 'technologies', `${tech.folder}.mdc`);
        const techTarget = path.join(targetDir, 'technologies', `${tech.folder}.mdc`);
        
        if (fs.existsSync(techSource)) {
          fs.copyFileSync(techSource, techTarget);
          console.log(`${colors.green}✓${colors.reset} Copied ${tech.name} rules`);
        }
      }
    });
  }
  
  // Copy selected tools
  if (userSelections.tools.length > 0) {
    console.log(`\n${colors.bright}${colors.blue}Setting up task rules...${colors.reset}`);
    userSelections.tools.forEach(tool => {
      if (tool.folder) {
        const toolSource = path.join(sourceRulesDir, 'tasks', `${tool.folder}.mdc`);
        const toolTarget = path.join(targetDir, 'tasks', `${tool.folder}.mdc`);
        
        if (fs.existsSync(toolSource)) {
          fs.copyFileSync(toolSource, toolTarget);
          console.log(`${colors.green}✓${colors.reset} Copied ${tool.name} rules`);
        }
      }
    });
  }
  
  // Configure project context file
  await customizeProjectContext();
  
  console.log(`\n${colors.bright}${colors.green}Setup complete!${colors.reset}`);
  console.log(`\nAIDevRules has been configured for your project at: ${userSelections.projectPath}`);
  console.log(`\nTo use these rules with your selected AI tool, open your project in ${userSelections.ideTool.name}.`);
  
  rl.close();
}

// Function to customize project context file
async function customizeProjectContext() {
  console.log(`\n${colors.bright}${colors.blue}Customizing project context...${colors.reset}`);
  
  const contextPath = path.join(userSelections.projectPath, userSelections.ideTool.folder, '01-project-context.mdc');
  
  if (fs.existsSync(contextPath)) {
    let content = fs.readFileSync(contextPath, 'utf8');
    
    // Replace template variables with actual selections
    content = content.replace(/\{\{PROJECT_FRAMEWORK\}\}/g, userSelections.framework.name);
    content = content.replace(/\{\{PROJECT_LANGUAGE\}\}/g, userSelections.language.name);
    
    const techList = userSelections.technologies.map(t => t.name).join(', ');
    content = content.replace(/\{\{ADDITIONAL_TECHNOLOGIES\}\}/g, techList || 'None');
    
    fs.writeFileSync(contextPath, content, 'utf8');
    console.log(`${colors.green}✓${colors.reset} Customized project context file`);
  }
}

// Main function to run the setup wizard
async function runSetupWizard() {
  console.log(`\n${colors.bright}${colors.magenta}=== AIDevRules Setup Wizard ===${colors.reset}\n`);
  console.log(`This wizard will help you configure AIDevRules for your project.`);
  console.log(`You'll select your IDE, frameworks, languages, and more.`);
  
  // Get selections from user
  await selectIDETool();
  await selectFramework();
  await selectLanguage();
  await selectStack();
  await selectTechnologies();
  await selectTools();
  
  // Confirm selections
  const confirmed = await confirmSelections();
  if (!confirmed) {
    console.log(`\n${colors.yellow}Setup cancelled. Please run the wizard again.${colors.reset}`);
    rl.close();
    return;
  }
  
  // Copy rule files based on selections
  await copyRuleFiles();
}

// Run the wizard
runSetupWizard().catch(err => {
  console.error(`${colors.red}Error:${colors.reset}`, err);
  rl.close();
});