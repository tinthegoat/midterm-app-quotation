# Quotation App (React + MUI)

This is a simple Quotation App built with React and Material UI (MUI) that allows users to manage a list of quoted products. Users can add products with specific prices, quantities, and discounts, and the app will intelligently handle merging or separating similar items.

---

## Features

- Select products from a dropdown
- Auto-fill price per unit from product data
- Add quantity and discount for each item
- Redundant item merging logic:
  - Same product name, price, and discount → merge
  - Same name/price but different discount → treated as unique
- View all added items in a table
- Remove single items or clear all
- Total calculations (discount, subtotal, etc.)

---


---

## Merging Logic Explained

### When is a product entry considered redundant (and merged)?

| Product Name | Price | Discount | Action      |
|--------------|-------|----------|-------------|
| A            | 100   | 10       | Add as new  |
| A            | 100   | 10       | Merge qty   |
| A            | 100   | 15       | Add as new  |
| A            | 150   | 10       | Add as new  |
| B            | 100   | 10       | Add as new  |

- Merge occurs only when name, price, and discount are all the same

---

## Stacks

- React
- MUI

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/quotation-app.git
cd quotation-app

---
