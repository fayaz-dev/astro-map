import fs from 'fs/promises';
import path from 'path';
import { getCollection } from 'astro:content';

interface Node {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  category?: string;
  publishDate: string;
}

interface Link {
  source: string;
  target: string;
  strength: number;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

export async function generateMindMap() {
  try {
    console.log('🧠 Generating mind map data...');
    
    // Get all blog posts
    const allPosts = await getCollection('blog');
    const publishedPosts = allPosts.filter(post => !post.data.draft);
    
    // Create nodes from posts
    const nodes: Node[] = publishedPosts.map(post => ({
      id: post.slug,
      title: post.data.title,
      slug: post.slug,
      tags: post.data.tags,
      category: post.data.category,
      publishDate: post.data.publishDate.toISOString(),
    }));
    
    // Create links based on relationships
    const links: Link[] = [];
    
    publishedPosts.forEach(post => {
      // Explicit relationships from frontmatter
      if (post.data.related) {
        post.data.related.forEach(relatedSlug => {
          const targetExists = nodes.find(node => node.id === relatedSlug);
          if (targetExists) {
            links.push({
              source: post.slug,
              target: relatedSlug,
              strength: 3, // Strong explicit relationship
            });
          }
        });
      }
      
      // Tag-based relationships
      publishedPosts.forEach(otherPost => {
        if (post.slug !== otherPost.slug) {
          const commonTags = post.data.tags.filter(tag => 
            otherPost.data.tags.includes(tag)
          );
          
          if (commonTags.length > 0) {
            // Avoid duplicate links
            const existingLink = links.find(link => 
              (link.source === post.slug && link.target === otherPost.slug) ||
              (link.source === otherPost.slug && link.target === post.slug)
            );
            
            if (!existingLink) {
              links.push({
                source: post.slug,
                target: otherPost.slug,
                strength: Math.min(commonTags.length, 2), // Weaker tag-based relationship
              });
            }
          }
        }
      });
    });
    
    const graphData: GraphData = { nodes, links };
    
    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    await fs.mkdir(publicDir, { recursive: true });
    
    // Write the mind map data
    const outputPath = path.join(publicDir, 'mindmap.json');
    await fs.writeFile(outputPath, JSON.stringify(graphData, null, 2));
    
    console.log(`✅ Mind map generated with ${nodes.length} nodes and ${links.length} links`);
    console.log(`📁 Saved to: ${outputPath}`);
    
    return graphData;
  } catch (error) {
    console.error('❌ Error generating mind map:', error);
    throw error;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateMindMap().catch(console.error);
}