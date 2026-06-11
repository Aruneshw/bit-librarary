'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  size?: number;
}

interface ExplorerData {
  root: string;
  tree: FileNode[];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  if (!ext) return '📄';
  switch (ext) {
    case 'ts': case 'tsx': return '🟦';
    case 'js': case 'jsx': return '🟨';
    case 'css': case 'scss': case 'sass': return '🎨';
    case 'json': return '📋';
    case 'md': return '📝';
    case 'sql': return '🗄️';
    case 'html': return '🌐';
    case 'svg': return '🖼️';
    case 'png': case 'jpg': case 'jpeg': case 'gif': case 'webp': return '🖼️';
    case 'py': return '🐍';
    case 'sh': return '⚙️';
    case 'toml': case 'yaml': case 'yml': return '⚙️';
    case 'env': return '🔒';
    case 'gitignore': return '🚫';
    default: return '📄';
  }
}

function TreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 1);

  const hasChildren = node.type === 'folder' && node.children && node.children.length > 0;

  return (
    <div>
      <div
        onClick={() => node.type === 'folder' && setExpanded(!expanded)}
        className={`flex items-center gap-2 py-0.5 px-1 rounded hover:bg-white/[0.04] transition-colors ${
          node.type === 'folder' ? 'cursor-pointer' : ''
        }`}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
      >
        {node.type === 'folder' ? (
          <span className="text-[10px] w-3 text-center shrink-0 text-white/30">
            {expanded ? '▼' : '▶'}
          </span>
        ) : (
          <span className="text-[10px] w-3 text-center shrink-0 text-white/10">•</span>
        )}
        <span className="shrink-0">{node.type === 'folder' ? '📁' : fileIcon(node.name)}</span>
        <span className={`font-mono text-xs truncate ${
          node.type === 'folder' ? 'text-arc-blue font-semibold' : 'text-white/70'
        }`}>
          {node.name}
        </span>
        {node.type === 'file' && node.size != null && (
          <span className="font-mono text-[9px] text-white/30 ml-auto shrink-0">
            {formatSize(node.size)}
          </span>
        )}
        {node.type === 'folder' && hasChildren && (
          <span className="font-mono text-[9px] text-white/20 ml-auto shrink-0">
            {node.children!.length} items
          </span>
        )}
      </div>
      <AnimatePresence initial={false}>
        {node.type === 'folder' && expanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {node.children.length > 0 ? (
              node.children.map((child) => (
                <TreeNode key={child.name} node={child} depth={depth + 1} />
              ))
            ) : (
              <div className="font-mono text-[10px] text-white/20 italic py-0.5" style={{ paddingLeft: `${(depth + 1) * 16 + 20}px` }}>
                (empty)
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FolderExplorer() {
  const [data, setData] = useState<ExplorerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchTree = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/explorer');
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: 'Failed to load' }));
          throw new Error(err.error || `HTTP ${res.status}`);
        }
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchTree();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]">
      <div className="p-4 border-b border-arc-blue/20 bg-arc-blue/5 flex items-center justify-between">
        <h2 className="font-orbitron text-lg text-white tracking-wider flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
          Project Explorer
        </h2>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-white/30">
            {data ? `/${data.root}` : ''}
          </span>
          {data && (
            <span className="font-mono text-[9px] text-white/20 bg-white/5 px-2 py-0.5 rounded">
              {data.tree.length} root items
            </span>
          )}
        </div>
      </div>
      <div className="p-3 max-h-[500px] overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-5 h-5 rounded-full border-2 border-arc-blue/40 border-t-arc-blue animate-spin" />
            <span className="font-mono text-xs text-white/40 ml-3">Scanning project directory...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="font-mono text-xs text-warning-red">{error}</p>
            <p className="font-mono text-[10px] text-white/30 mt-2">Make sure you are logged in as admin</p>
          </div>
        ) : data ? (
          data.tree.length === 0 ? (
            <p className="font-mono text-xs text-white/30 text-center py-8">No files found</p>
          ) : (
            data.tree.map((node) => (
              <TreeNode key={node.name} node={node} />
            ))
          )
        ) : null}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 217, 255, 0.2);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
