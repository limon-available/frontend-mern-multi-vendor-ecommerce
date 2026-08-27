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
