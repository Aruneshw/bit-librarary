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
  path: string;
  tree: FileNode[];
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(name: string): string {
  const ext = name.split('.').pop()?.toLowerCase();
  if (name === '.gitignore') return '🚫';
  if (name === 'Dockerfile') return '🐳';
  if (name === 'Makefile') return '🔨';
  if (name === 'README.md') return '📖';
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
    case 'env': case 'env.example': return '🔒';
    case 'gitkeep': return '📄';
    case 'ico': return '🖼️';
    case 'pdf': return '📕';
    case 'mp4': case 'webm': case 'mov': return '🎬';
    case 'woff': case 'woff2': case 'ttf': case 'otf': return '🔤';
    default: return '📄';
  }
}

function countItems(nodes: FileNode[]): { files: number; folders: number } {
  let files = 0;
  let folders = 0;
  for (const n of nodes) {
    if (n.type === 'folder') {
      folders++;
      if (n.children) {
        const sub = countItems(n.children);
        files += sub.files;
        folders += sub.folders;
      }
    } else {
      files++;
    }
  }
  return { files, folders };
}

function TreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);

  const hasChildren = node.type === 'folder' && node.children && node.children.length > 0;

  return (
    <div>
      <div
        onClick={() => node.type === 'folder' && setExpanded(!expanded)}
        className={`flex items-center gap-1.5 py-0.5 px-1 rounded hover:bg-white/[0.04] transition-colors ${
          node.type === 'folder' ? 'cursor-pointer' : ''
        }`}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
      >
        <span className="text-[9px] w-2.5 text-center shrink-0 text-white/25 font-mono">
          {node.type === 'folder' ? (expanded ? '▼' : '▶') : ' '}
        </span>
        <span className="shrink-0 text-[13px] leading-none">{node.type === 'folder' ? '📁' : fileIcon(node.name)}</span>
        <span className={`font-mono text-[12px] leading-tight truncate ${
          node.type === 'folder' ? 'text-arc-blue font-semibold' : 'text-white/80'
        }`}>
          {node.name}
        </span>
        <span className="font-mono text-[9px] text-white/25 ml-auto shrink-0 tabular-nums">
          {node.type === 'file' && node.size != null && formatSize(node.size)}
          {node.type === 'folder' && hasChildren && `${node.children!.length}`}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {node.type === 'folder' && expanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="overflow-hidden"
          >
            {node.children.length > 0 ? (
              node.children.map((child) => (
                <TreeNode key={child.name} node={child} depth={depth + 1} />
              ))
            ) : (
              <div className="font-mono text-[10px] text-white/20 italic py-0.5" style={{ paddingLeft: `${(depth + 1) * 16 + 22}px` }}>
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
        const res = await fetch('/api/explorer?depth=10');
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

  const counts = data ? countItems(data.tree) : null;

  return (
    <div className="bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]">
      <div className="p-4 border-b border-arc-blue/20 bg-arc-blue/5 flex items-center justify-between">
        <h2 className="font-orbitron text-lg text-white tracking-wider flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse" />
          Project Structure
        </h2>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-arc-blue/60 hidden sm:inline">
            {data?.path || ''}
          </span>
          {counts && (
            <span className="font-mono text-[9px] text-white/25 bg-white/5 px-2 py-0.5 rounded tabular-nums">
              {counts.folders} dirs / {counts.files} files
            </span>
          )}
        </div>
      </div>
      <div className="p-3 overflow-y-auto custom-scrollbar" style={{ maxHeight: '70vh' }}>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-5 h-5 rounded-full border-2 border-arc-blue/40 border-t-arc-blue animate-spin" />
            <span className="font-mono text-xs text-white/40 ml-3">Scanning project directory...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="font-mono text-xs text-warning-red">{error}</p>
            <p className="font-mono text-[10px] text-white/30 mt-2">Make sure you are logged in as admin</p>
          </div>
        ) : data ? (
          data.tree.length === 0 ? (
            <p className="font-mono text-xs text-white/30 text-center py-12">No files found</p>
          ) : (
            <div className="font-mono text-[10px] text-white/20 pb-2 mb-1 border-b border-white/5 flex items-center gap-4 px-1" style={{ paddingLeft: '4px' }}>
              <span className="w-2.5 shrink-0" />
              <span className="w-4 shrink-0" />
              <span className="text-white/30">Name</span>
              <span className="ml-auto text-white/30">Size</span>
            </div>
          )
        ) : null}
        <AnimatePresence>
          {data && data.tree.map((node) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <TreeNode node={node} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 217, 255, 0.15);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 217, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
