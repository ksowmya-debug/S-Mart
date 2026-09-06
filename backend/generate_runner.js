import { generatePhoneFirstDsaPdf } from './src/utils/generate_phone_pdf.js';
import fs from 'fs';
import path from 'path';

console.log('Generating updated phone-first PDF...');
generatePhoneFirstDsaPdf()
  .then((outputPath) => {
    console.log('PDF generated at:', outputPath);
    const stats = fs.statSync(outputPath);
    console.log('File size:', (stats.size / 1024).toFixed(2), 'KB');

    // Also copy to root and brain artifact directory
    const rootPath = path.resolve('../SowmyaKCode_DSA_Demystified_Phone_First.pdf');
    fs.copyFileSync(outputPath, rootPath);
    console.log('Copied to root:', rootPath);

    const artifactPath = 'C:/Users/krish/.gemini/antigravity/brain/f6fe5dbf-2b4b-40c3-b181-8fa88af34c6d/SowmyaKCode_DSA_Demystified_Phone_First.pdf';
    fs.copyFileSync(outputPath, artifactPath);
    console.log('Copied to artifacts:', artifactPath);
  })
  .catch((err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
