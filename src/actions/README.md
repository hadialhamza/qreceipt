# Server Actions (Centralized Approach)

This folder contains all Server Actions for the qreceipt application.

## What are Server Actions?

Server Actions are asynchronous functions that run on the server. They can be called directly from Client Components via forms or event handlers, eliminating the need for explicit API routes for mutations.

## Folder Structure

```
src/actions/
├── README.md                # This file
├── receipts/                # Receipt-related actions
│   ├── create-receipt.js    # Create new receipt
│   ├── update-receipt.js    # Update receipt
│   ├── delete-receipt.js    # Delete receipt
│   └── validate-receipt.js  # Validate receipt data
├── auth/                    # Authentication actions (if needed)
└── user/                    # User management actions
```

## Guidelines

### 1. File Naming

- Use **kebab-case** for filenames: `create-receipt.js`
- Function names should be **camelCase**: `createReceipt()`

### 2. Required Directive

All Server Actions MUST start with:

```javascript
"use server";
```

### 3. Error Handling

Return errors as data (don't throw):

```javascript
export async function createReceipt(formData) {
  try {
    // ... logic
    return { success: true, data: receipt };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

### 4. Input Validation

Always validate input before processing:

```javascript
import { validateReceipt } from "@/lib/validations/receipt";

export async function createReceipt(formData) {
  const validation = validateReceipt(formData);
  if (!validation.success) {
    return { success: false, error: validation.error };
  }
  // ... proceed
}
```

### 5. Database Connection

Always connect to DB before queries:

```javascript
import dbConnect from "@/lib/db/connect";

export async function createReceipt(formData) {
  await dbConnect();
  // ... DB operations
}
```

## Usage in Components

### From Client Components:

```jsx
"use client";

import { createReceipt } from "@/actions/receipts/create-receipt";

export default function ReceiptForm() {
  return <form action={createReceipt}>{/* form fields */}</form>;
}
```

### From Server Components:

```jsx
import { getReceipts } from "@/actions/receipts/get-receipts";

export default async function ReceiptsPage() {
  const receipts = await getReceipts();
  // ... render
}
```

## Phase 1 Status

✅ Folder structure created  
⏳ Server Actions implementation pending (Phase 2+)
