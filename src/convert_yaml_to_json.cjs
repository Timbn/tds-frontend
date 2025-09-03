// convert_yaml_to_json.js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Paths
const yamlPath = path.join(__dirname, '../public/county_zip_colormap_FINAL.yaml');
const jsonPath = path.join(__dirname, '../public/county_zip_colormap_FINAL.json');

try {
  const yamlContent = fs.readFileSync(yamlPath, 'utf8');
  const jsonData = yaml.load(yamlContent);
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8');
  console.log('✅ YAML successfully converted to JSON!');
} catch (e) {
  console.error('❌ Error converting YAML to JSON:', e);
}
