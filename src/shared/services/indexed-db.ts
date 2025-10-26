import Dexie, { type EntityTable } from 'dexie';

export type Summary = {
  id: number;
  threadId: string;
  summary: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'resolved' | 'expired';
  sender: string;
  expiresAt: number;
  createdAt: number;
  resolvedAt: number;
};

export const db = new Dexie('MerifyDatabase') as Dexie & {
  summaries: EntityTable<Summary, 'id'>;
};

db.version(1).stores({
  summaries:
    '++id, threadId, sender, priority, status, expiresAt, createdAt, resolvedAt',
});
