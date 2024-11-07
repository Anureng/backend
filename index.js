#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Function to create a file
const createFile = (filePath, content) => {
  console.log(`Creating file: ${filePath}`);
  fs.writeFileSync(filePath, content, { encoding: 'utf8' });
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

  // Create package.json
  const packageJsonPath = path.join(__dirname, 'templates', 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = require(packageJsonPath);
    createFile(path.join(currentDir, 'package.json'), JSON.stringify(packageJson, null, 2));
  } else {
    console.error('Template package.json not found!');
  }

  // Create tsconfig.json
  const tsConfigPath = path.join(__dirname, 'templates', 'tsconfig.json');
  if (fs.existsSync(tsConfigPath)) {
    const tsConfig = require(tsConfigPath);
    createFile(path.join(currentDir, 'tsconfig.json'), JSON.stringify(tsConfig, null, 2));
  } else {
    console.error('Template tsconfig.json not found!');
  }

  // Create server.ts
  const serverContentPath = path.join(__dirname, 'templates', 'app.ts');
  if (fs.existsSync(serverContentPath)) {
    const serverContent = fs.readFileSync(serverContentPath, 'utf-8');
    createFile(path.join(srcDir, 'app.ts'), serverContent);
  } else {
    console.error('Template server.ts not found!');
  }

  console.log('Basic Node.js TypeScript setup created successfully!');
};

// Execute main function
try {
  main();
} catch (error) {
  console.error('Error creating Node.js TypeScript setup:', error);
}
