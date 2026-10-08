# Development Notes

## 2026-08-27 — Pagination Issue with Large Dataset

### Problem

The database contains 50,000 products.

The pagination component was showing too many page numbers instead of showing only a limited number of page buttons.

### Cause

`showItem` was incorrectly set to the total number of pages:

```jsx
showItem={Math.ceil(totalProduct / parPage)}
```

## 2026-10-08 — Find Sellers in Customer Chat

### Problem

Customers had no way to start a chat with a seller who was not already in
their chat friend list. The customer chat sidebar only showed existing friends,
and the existing seller-list endpoint was restricted to administrators.
Additionally, adding a first chat friend could fail when the customer did not
yet have a chat record in the database.

### Cause

The customer frontend had an API action for adding a seller as a friend, but
no customer-facing seller discovery UI or API action to load sellers. The
backend's `get_sellers` route only allowed admin access. The friend-adding
controller updated chat records without creating them when they did not
already exist.

### Solution

- Added a **Find Sellers** button and seller-picker modal to the customer chat
  sidebar. The list shows each seller's shop name, image, and ID, with loading,
  retry, empty, and error states.
- Added a customer-authorized seller-list endpoint that returns the seller
  fields needed by the picker.
- Connected the picker to Redux: selecting a seller calls
  `add_customer_friend`; after success the updated friend list is stored
  without a page refresh, the modal closes, and the seller's chat opens.
- Made chat-record creation use upserts for both participants, so a customer's
  first chat can be created successfully, and return a clear not-found
  response if the selected seller or customer does not exist.
- Avoided submitting the same friend-add request again when navigating to the
  selected seller's chat.

### Validation

The frontend production build completed successfully with existing lint
warnings. The changed backend chat controller and routes passed Node.js syntax
checks.
