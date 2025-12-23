# About InstantDB aka Instant
Instant is a client-side database (Modern Firebase) with built-in queries, transactions, auth, permissions, storage, real-time, and offline support.

# Instant SDKs
Instant provides client-side JS SDKs and an admin SDK:

- `@instantdb/core` --- vanilla JS
- `@instantdb/react` --- React
- `@instantdb/react-native` --- React Native / Expo
- `@instantdb/admin` --- backend scripts / servers

# Managing Instant Apps
## Prerequisites
Look for `instant.schema.ts` and `instant.perms.ts`. These define the schema and permissions.
Look for an app id and admin token in `.env` or another env file.

## Schema changes
Edit `instant.schema.ts`, then push:
```bash
npx instant-cli push schema --app <APP_ID> --token <ADMIN_TOKEN> --yes
```

# CRITICAL Query Guidelines
CRITICAL: When using React make sure to follow the rules of hooks. Remember, you can't have hooks show up conditionally.
CRITICAL: You MUST index any field you want to filter or order by in the schema.

```tsx
// Ordering example
$: { order: { dueDate: 'asc' } }
```

# Best Practices
## Pass `schema` when initializing Instant
```tsx
import schema from '@/instant.schema'
import { init } from '@instantdb/react';
const db = init({ appId, schema });
```

## Use `id()` to generate ids
```tsx
import { id } from '@instantdb/react';
db.transact(db.tx.contacts[id()].create({ name: 'John' }));
```
