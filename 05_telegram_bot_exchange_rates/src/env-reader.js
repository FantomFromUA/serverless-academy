import fs from 'fs';

export const envData = fs.readFileSync('.env', 'utf-8');

envData
  .split('\n')
  .forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key] = value.trim();
    }
  });