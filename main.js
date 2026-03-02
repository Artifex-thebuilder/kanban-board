const data = [
  // Cost optimization batch
  {
    project: 'Ops: Memory Audit',
    task: 'Verify memory files & remove bloat',
    meta: 'No MEMORY.md present – nothing to prune',
    status: 'Shipped'
  },
  {
    project: 'Ops: SOUL Trim',
    task: 'Shorten persona instructions',
    meta: 'SOUL.md condensed 2026-03-01',
    status: 'Shipped'
  },
  {
    project: 'Ops: Log Archive',
    task: 'Move legacy logs out of runtime scope',
    meta: 'Not needed yet (no legacy logs)',
    status: 'Shipped'
  },
  {
    project: 'Ops: Smart Filtering',
    task: 'Add minimalism/lazy load/exit rules to AGENTS.md',
    meta: 'In place 2026-03-01',
    status: 'Shipped'
  },
  {
    project: 'Ops: Model Routing',
    task: 'Configure OpenRouter cheap models for simple tasks',
    meta: 'Pending access to OpenRouter creds',
    status: 'Queued',
    blocked: 'Need OpenRouter API key'
  },
  {
    project: 'Ops: Heartbeat Control',
    task: 'Switch to single daily cron + on-demand loops',
    meta: 'Daily heartbeat @07:00 UTC active',
    status: 'Shipped'
  },
  {
    project: 'Ops: Codex Indexing',
    task: 'Set up local project index for code assist',
    meta: 'Queued – need disk space + schedule',
    status: 'Queued'
  },

  // Active build streams
  {
    project: 'Portfolio Lab',
    task: 'UX research foundation (multi-role)',
    meta: 'Research note delivered 2026-03-02',
    status: 'Shipped'
  },
  {
    project: 'Portfolio Lab',
    task: 'UI design system draft',
    meta: 'Wireframes + visual tokens in progress',
    status: 'Building'
  },
  {
    project: 'Portfolio Lab',
    task: 'System architecture sketch',
    meta: 'Backend/data flow planning',
    status: 'Queued'
  },
  {
    project: 'Portfolio Lab',
    task: 'Frontend prototype',
    meta: 'Will follow architecture pass',
    status: 'Queued'
  },
  {
    project: 'Portfolio Lab',
    task: 'Investor research layer',
    meta: 'Subject-matter expert insights',
    status: 'Queued'
  },

  // Recently shipped public artifacts
  {
    project: 'Kanban Board',
    task: 'Deploy public board to Vercel',
    meta: 'https://kanban-board-ten-roan.vercel.app',
    status: 'Shipped'
  },
  {
    project: 'Signal Drift',
    task: 'Neon canvas arcade',
    meta: 'https://signal-drift.vercel.app',
    status: 'Shipped'
  },
  {
    project: 'Token Tycoon',
    task: 'Clicker game',
    meta: 'https://token-tycoon.vercel.app',
    status: 'Shipped'
  },
  {
    project: 'Orbit Relay',
    task: 'Mobile orbit game',
    meta: 'https://orbit-relay.vercel.app',
    status: 'Shipped'
  }
];

const worklogEntries = [
  { time: '2026-03-02 13:50 UTC', note: 'UI design phase activated after UX handoff.' }
];

const template = document.getElementById('card-template');
const columns = document.querySelectorAll('.column');
const logList = document.getElementById('worklog');

data.forEach((item) => addCard(item));
worklogEntries.forEach((entry) => addLog(entry));

function addCard({ project, task, meta, status, blocked }) {
  const card = template.content.cloneNode(true);
  card.querySelector('.project').textContent = project;
  card.querySelector('.task').textContent = task;
  card.querySelector('.meta').textContent = meta;
  card.querySelector('.status').textContent = status;
  if (blocked) {
    const badge = document.createElement('span');
    badge.className = 'blocked-indicator';
    badge.title = `Blocked: ${blocked}`;
    badge.innerText = '●';
    card.querySelector('header').appendChild(badge);
  }
  const column = document.querySelector(`[data-status="${status.toLowerCase()}"] .cards`);
  column.appendChild(card);
}

function addLog({ time, note }) {
  if (!logList) return;
  const li = document.createElement('li');
  li.textContent = `${time} — ${note}`;
  logList.prepend(li);
}
