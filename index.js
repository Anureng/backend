#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Function to create a file
const createFile = (filePath, content) => {
  console.log(`Creating file: ${filePath}`);
  fs.writeFileSync(filePath, content, { encoding: 'utf8' });
};

// Function to read a template file
const readTemplate = (templatePath) => {
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf8');
  } else {
    throw new Error(`Template file not found at: ${templatePath}`);
  }
};

// Main function
const main = () => {
  const currentDir = process.cwd();
  console.log('Current directory:', currentDir);

  // Ensure 'src' directory exists
  const srcDir = path.join(currentDir, 'src');
  if (!fs.existsSync(srcDir)) {
    console.log('Creating src directory...');
    fs.mkdirSync(srcDir);
  } else {
    console.log('src directory already exists.');
  }

  // Paths to the templates directory
  const templatesDir = path.join(__dirname, 'templates');

  try {
    // Create package.json
    const packageJsonContent = readTemplate(path.join(templatesDir, 'package.json'));
    createFile(path.join(currentDir, 'package.json'), packageJsonContent);

    // Create tsconfig.json
    const tsConfigContent = readTemplate(path.join(templatesDir, 'tsconfig.json'));
    createFile(path.join(currentDir, 'tsconfig.json'), tsConfigContent);

    // Create app.ts
    const appContent = readTemplate(path.join(templatesDir, 'app.ts'));
    createFile(path.join(srcDir, 'app.ts'), appContent);

    console.log('Basic Node.js TypeScript setup created successfully!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Execute main function
try {
  main();
} catch (error) {
  console.error('Error creating Node.js TypeScript setup:', error);
}
