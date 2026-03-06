const cards = [
  {
    title: 'Portfolio Lab – UI design system',
    task_type: 'research',
    priority: 'high',
    route: 'cheap',
    model: 'openrouter/qwen/qwen-2.5-7b-instruct',
    cache: 'n/a',
    escalation: false,
    cost: 'low',
    status: 'in-progress',
    reason: 'Wireframes + visual tokens derived from UX note'
  },
  {
    title: 'Portfolio Lab – UX research foundation',
    task_type: 'summary',
    priority: 'high',
    route: 'cheap',
    model: 'openrouter/qwen/qwen-2.5-7b-instruct',
    cache: 'hit',
    escalation: false,
    cost: 'low',
    status: 'done',
    reason: 'Research note delivered 2026-03-02'
  },
  {
    title: 'Portfolio Lab – investor research layer',
    task_type: 'research',
    priority: 'medium',
    route: 'cheap',
    model: 'openrouter/qwen/qwen-2.5-7b-instruct',
    cache: 'n/a',
    escalation: false,
    cost: 'low',
    status: 'backlog',
    reason: 'Awaiting UX/UI outputs before SME pass',
    blocked: false
  },
  {
    title: 'Ops – Model routing',
    task_type: 'workflow_update',
    priority: 'high',
    route: 'no-llm',
    model: 'n/a',
    cache: 'n/a',
    escalation: false,
    cost: 'n/a',
    status: 'backlog',
    reason: 'Need OpenRouter premium creds for fallback',
    blocked: true
  },
  {
    title: 'Ops – Codex indexing',
    task_type: 'workflow_update',
    priority: 'medium',
    route: 'no-llm',
    model: 'n/a',
    cache: 'n/a',
    escalation: false,
    cost: 'n/a',
    status: 'backlog',
    reason: 'Schedule local index build',
    blocked: false
  },
  {
    title: 'Ops – Log archive',
    task_type: 'workflow_update',
    priority: 'low',
    route: 'no-llm',
    model: 'n/a',
    cache: 'n/a',
    escalation: false,
    cost: 'zero',
    status: 'skipped',
    reason: 'No legacy logs to move (cache hit)'
  },
  {
    title: 'Portfolio Lab – multi-source code generation',
    task_type: 'code_analysis',
    priority: 'medium',
    route: 'premium',
    model: 'pending escalation',
    cache: 'n/a',
    escalation: true,
    cost: 'tbd',
    status: 'escalated',
    reason: 'Needs premium model for synthesis once cheap pass is insufficient'
  },
  {
    title: 'Kanban board maintenance',
    task_type: 'workflow_update',
    priority: 'high',
    route: 'no-llm',
    model: 'n/a',
    cache: 'n/a',
    escalation: false,
    cost: 'low',
    status: 'done',
    reason: 'Board conforms to new spec'
  }
];

const activityLog = [
  { time: '2026-03-06 14:27 UTC', entry: { type: 'agent_activity', event: 'cycle_start', status: 'running' } },
  { time: '2026-03-06 14:28 UTC', entry: { type: 'agent_activity', event: 'cycle_complete', status: 'idle' } }
];

const template = document.getElementById('card-template');
const columns = document.querySelectorAll('.column');
const logList = document.getElementById('worklog');

cards.forEach((item) => addCard(item));
activityLog.forEach((entry) => addLog(entry));

function addCard(card) {
  const { title, task_type, priority, route, model, cache, cost, status, reason, blocked } = card;
  const clone = template.content.cloneNode(true);
  clone.querySelector('.title').textContent = title;
  clone.querySelector('.priority').textContent = priority;
  clone.querySelector('.reason').textContent = reason;
  clone.querySelector('.task_type').textContent = task_type;
  clone.querySelector('.route').textContent = route;
  clone.querySelector('.model').textContent = model;
  clone.querySelector('.cache').textContent = cache;
  clone.querySelector('.cost').textContent = cost;
  clone.querySelector('.status').textContent = status.toUpperCase();
  if (blocked) {
    const badge = document.createElement('span');
    badge.className = 'blocked-indicator';
    badge.title = 'Blocked';
    badge.textContent = '●';
    clone.querySelector('header').appendChild(badge);
  }
  const column = document.querySelector(`[data-status="${status}"] .cards`);
  if (column) column.appendChild(clone);
}

function addLog({ time, entry }) {
  if (!logList) return;
  const li = document.createElement('li');
  li.textContent = `${time} — ${JSON.stringify(entry)}`;
  logList.prepend(li);
}
