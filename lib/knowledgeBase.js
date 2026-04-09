import fs from 'fs';
import path from 'path';

/**
 * Loads and parses the toolshop-kb.md file.
 * Returns an array of KB entries.
 */
function loadKB() {
  const filePath = path.join(process.cwd(), 'data', 'toolshop-kb.md');
  const content = fs.readFileSync(filePath, 'utf8');
  
  const sections = [];
  const lines = content.split('\n');
  
  let currentSection = null;
  
  for (const line of lines) {
    const headerMatch = line.match(/^# (.*?) \[(.*?)\]/);
    if (headerMatch) {
      currentSection = {
        title: headerMatch[1],
        tags: headerMatch[2].split(',').map(t => t.trim().toLowerCase()),
        items: []
      };
      sections.push(currentSection);
      continue;
    }
    
    if (currentSection && line.trim().startsWith('- **')) {
      // Extract content after the list bullet
      const itemContent = line.trim().substring(2);
      // Extract tags from the end if present e.g. [tag, tag]
      const tagsMatch = itemContent.match(/\[(.*?)\]$/);
      const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().toLowerCase()) : [];
      const cleanContent = itemContent.replace(/\[(.*?)\]$/, '').trim();
      
      currentSection.items.push({
        content: cleanContent,
        tags: [...currentSection.tags, ...tags]
      });
    } else if (currentSection && line.trim().startsWith('- ')) {
      // Fallback for non-bold items
      const itemContent = line.trim().substring(2);
      const tagsMatch = itemContent.match(/\[(.*?)\]$/);
      const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().toLowerCase()) : [];
      const cleanContent = itemContent.replace(/\[(.*?)\]$/, '').trim();
      
      currentSection.items.push({
        content: cleanContent,
        tags: [...currentSection.tags, ...tags]
      });
    }
  }
  
  return sections;
}

/**
 * Searches the KB for a query.
 * Returns the best match if confidence is above threshold.
 */
export function searchKB(query) {
  const sections = loadKB();
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter(w => w.length > 2);
  
  let bestMatch = null;
  let maxScore = 0;
  
  for (const section of sections) {
    for (const item of section.items) {
      let score = 0;
      
      // Tag matching (High weight)
      for (const tag of item.tags) {
        if (q.includes(tag)) {
          score += 5;
        }
      }
      
      // Keyword matching in content (Medium weight)
      for (const word of words) {
        if (item.content.toLowerCase().includes(word)) {
          score += 2;
        }
      }
      
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item.content;
      }
    }
  }
  
  // Confidence threshold: at least 5 points (one tag match or multiple keyword matches)
  if (maxScore >= 5) {
    return bestMatch;
  }
  
  return null;
}
