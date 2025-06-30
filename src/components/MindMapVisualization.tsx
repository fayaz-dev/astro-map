import { useEffect, useRef, useState } from 'preact/hooks';
import * as THREE from 'three';
import ForceGraph3D from 'three-forcegraph';

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

interface MindMapProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function MindMapVisualization({ 
  width = 800, 
  height = 600, 
  className = '' 
}: MindMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGraphData() {
      try {
        const response = await fetch('/mindmap.json');
        if (!response.ok) {
          throw new Error('Failed to load mind map data');
        }
        const data = await response.json();
        setGraphData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadGraphData();
  }, []);

  useEffect(() => {
    if (!containerRef.current || loading || error || graphData.nodes.length === 0) {
      return;
    }

    // Clear previous content
    containerRef.current.innerHTML = '';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const Graph = ForceGraph3D()
      .width(width)
      .height(height)
      .backgroundColor('rgba(0,0,0,0)')
      .nodeLabel('title')
      .nodeColor((node: any) => {
        const colors = {
          javascript: '#f7df1e',
          react: '#61dafb',
          design: '#ff6b6b',
          tutorial: '#4ecdc4',
          default: '#74b9ff'
        };
        const primaryTag = node.tags?.[0]?.toLowerCase();
        return colors[primaryTag as keyof typeof colors] || colors.default;
      })
      .nodeVal((node: any) => Math.max(1, (node.tags?.length || 1) * 2))
      .linkColor(() => 'rgba(255,255,255,0.2)')
      .linkWidth((link: any) => link.strength * 2)
      .onNodeClick((node: any) => {
        window.location.href = `/blog/${node.slug}`;
      })
      .onNodeHover((node: any) => {
        if (containerRef.current) {
          containerRef.current.style.cursor = node ? 'pointer' : 'default';
        }
      })
      .enableNodeDrag(!prefersReducedMotion)
      .enableNavigationControls(!prefersReducedMotion);

    // Disable animations if user prefers reduced motion
    if (prefersReducedMotion) {
      Graph.cooldownTicks(0);
    }

    Graph(containerRef.current).graphData(graphData);

    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        Graph.width(rect.width).height(rect.height);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [graphData, loading, error, width, height]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading mind map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Failed to load mind map</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div 
        ref={containerRef} 
        className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
        style={{ minHeight: height }}
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click on nodes to explore posts • Drag to navigate • Scroll to zoom
        </p>
      </div>
    </div>
  );
}