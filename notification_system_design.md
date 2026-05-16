# Notification System Design

## Stage 1

### Problem
The campus notification platform receives many notifications of different types (placement, result, event, default). Users need to see the most important unread notifications first, without being overwhelmed.

### Priority Strategy
Notifications are ranked using a **two-factor sort**:
1. **Type Priority** (higher = more important):
   - `placement` → 3
   - `result` → 2
   - `event` → 1
   - `default` → 0

2. **Recency** (tiebreaker): newer timestamp wins

### Why This Approach?
- Placement notifications are career-critical and time-sensitive
- Results directly affect a student's academic standing
- Events are important but less urgent
- Default/general notifications are lowest priority

### Implementation
- `sortByPriority(notifications)` in `src/utils/prioritySort.js` handles all sorting logic
- `getTopN(notifications, 10)` returns the top 10 for the Priority Inbox
- The Priority Inbox always displays top 10 unread notifications at the top of the UI
- No database required — sorting is done in-memory on the fetched data

### UI
- Priority Inbox is shown on the left panel (desktop) or top (mobile)
- Most recent 3 are visually highlighted as "NEW"
- Each card shows: type badge, message, timestamp

---

## Stage 2

### Problem
Users also need to browse all notifications and filter by type across both desktop and mobile views.

### Approach
- All notifications are fetched from the API and sorted by priority + recency
- A `FilterBar` component allows filtering by: All, Placement, Result, Event
- `filterByType()` + `sortByPriority()` are chained to produce the filtered sorted list
- The layout uses MUI `Grid` for responsive desktop/mobile layout
- Material UI is used exclusively for styling (no Tailwind, no ShadCN, no custom CSS)

### Component Structure
```
pages/
  index.js              ← main page combining Stage 1 & 2
components/
  PriorityInbox.js      ← top 10 priority notifications
  NotificationCard.js   ← individual notification display
  FilterBar.js          ← filter by type toggle
service/
  notificationService.js ← API calls with logging
utils/
  prioritySort.js       ← sorting and filtering logic
logging_middleware/
  index.js              ← Log(stack, level, package, message)
```

### Responsive Design
- Desktop: 2-column layout (Priority Inbox | All Notifications)
- Mobile: stacked layout (Priority Inbox on top, All Notifications below)
- MUI `Grid` with `xs={12} md={4/8}` breakpoints handle this automatically
