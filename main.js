const data = [
  {
    project: 'Portfolio Lab',
    task: 'UX multi-role research foundation',
    meta: 'Role: UX / Analysis platform',
    status: 'Queued'
  },
  {
    project: 'Kanban Board',
    task: 'Build static board + deploy to Vercel',
    meta: 'Role: Frontend',
    status: 'Building'
  },
  {
    project: 'Signal Drift',
    task: 'Ship neon canvas game',
    meta: 'Role: Frontend – shipped 2026-03-01',
    status: 'Shipped'
  }
];

const template = document.getElementById('card-template');
const columns = document.querySelectorAll('.column');

data.forEach((item) => addCard(item));

function addCard({ project, task, meta, status }) {
  const card = template.content.cloneNode(true);
  card.querySelector('.project').textContent = project;
  card.querySelector('.task').textContent = task;
  card.querySelector('.meta').textContent = meta;
  card.querySelector('.status').textContent = status;
  const column = document.querySelector(`[data-status="${status.toLowerCase()}"] .cards`);
  column.appendChild(card);
}
