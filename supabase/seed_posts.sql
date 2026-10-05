-- Three starter guides. Run after schema.sql. Edit or delete them from /admin.
insert into public.posts (slug, title, excerpt, category, cover_label, seo_title, seo_description, status, published_at, content_md) values
('how-withholding-tax-is-posted-on-a-vendor-payment',
 'How withholding tax is posted on a vendor payment',
 'A plain-language walkthrough of the journal entry when you pay a supplier and withhold tax, with a worked example.',
 'Tax', 'Tax and WHT',
 'How Withholding Tax Is Posted on a Vendor Payment | OneAccounts',
 'See the exact journal entry when you pay a vendor and withhold tax: payable, tax payable and bank, with a worked example in rupees.',
 'published', now() - interval '3 days',
$$When you pay a supplier and withhold tax, three accounts move at once. Getting the entry right matters, because a wrong entry quietly drifts your supplier balance, your bill and your ledger apart.

## The idea in one line

You pay the supplier the **net** amount from your bank. The tax you withheld is owed to the government. Together they settle the supplier's bill.

## A worked example

Suppose a supplier bill is **Rs 10,000**, and a 5 percent withholding rate applies. This is an illustration only. Check the rate that applies to your supplier with your tax advisor.

You pay **Rs 5,000** from the bank, as part payment. The bill is settled by a gross amount, so the system works backwards:

| Item | Amount |
|---|---|
| Net paid from bank | 5,000 |
| Tax withheld | 263 |
| Settled against the bill (gross) | 5,263 |

## The journal entry

| Account | Debit | Credit |
|---|---|---|
| Accounts Payable | 5,263 | |
| Withholding Tax Payable | | 263 |
| Bank | | 5,000 |

Both sides total 5,263. The supplier's balance falls by the full 5,263, the tax sits in a liability account until you deposit it, and the bank shows only what actually left.

## Common mistakes

- **Reducing the bank line by the tax.** The bank only moves by what you actually paid.
- **Settling the bill by the net amount only.** The bill is then left owing the tax portion forever.
- **Editing the original entry.** Always reverse and repost, so the audit trail stays complete.

## How OneAccounts handles it

In OneAccounts you type the amount that left the bank. The system finds the tax on the bill, posts both sides, and updates the bill and supplier balance together. If you edit or reverse the payment later, it mirrors the latest posting exactly, so nothing drifts.$$),

('budget-control-for-ngo-projects-step-by-step',
 'Budget control for NGO projects, step by step',
 'How donor budgets work by activity, location and account, and how every bill is checked before it posts.',
 'NGO', 'NGO budgets',
 'Budget Control for NGO Projects: Step by Step | OneAccounts',
 'How NGOs set donor budgets by activity, location and account, split them by month, and stop overspending before a bill posts.',
 'published', now() - interval '2 days',
$$Donors usually fund a project once, for its whole life. Good budget control follows that: you set the budget once, then make sure no bill can overspend it.

## Step 1: set up the structure

Start with the donor, the project, its locations and its activities. A location can belong to one project or be shared across all of them.

## Step 2: budget by activity, location and account

Each budget line is the combination of **activity**, **location** and **account**. For example, an Awareness activity can have a separate budget for each city. Using the same three-part key everywhere keeps entry, reports and checks in agreement.

## Step 3: split the budget across months

The project lasts a set number of months. The budget is divided equally to start with, with any remainder on the last month. You can then edit individual months. The total does not change, and any difference is shown until you fix it.

## Step 4: approve

A budget is submitted for approval and an admin approves or rejects it. A rejection needs a reason and sends the budget back to draft without wiping your monthly work. Every save is recorded in a change history.

## Step 5: check every bill

When someone enters a bill, the system compares it with the available budget for that activity, location and account. If the bill is too large, it is refused before it posts. If the bill is later edited down, the budget is released again.

## Step 6: report

A Budget vs Actual report shows budget, actual and variance by activity and location. Variance is **budget minus actual**, so a positive number means money left, and a negative number means overspent.$$),

('what-property-management-software-should-control',
 'What property management software should control',
 'A checklist of what a landlord or building manager should expect software to handle, from units to owner statements.',
 'Property', 'Property',
 'What Property Management Software Should Control | OneAccounts',
 'A practical checklist for landlords and building managers: units, leases, rent, deposits, expenses and owner statements.',
 'published', now() - interval '1 day',
$$If you collect rent from more than a few units, a spreadsheet stops being enough. Here is what good property management software should control.

## 1. The portfolio

Buildings, floors and apartments, with who owns each one and who lives there now. You should be able to see occupancy at a glance.

## 2. Leases

A lease records the tenant, the dates, the rent and any recurring charges. Extra details such as roommates and facilities should live with the lease, not in a separate note.

## 3. Rent invoicing

Invoices should be created in a batch, and receipts should be easy to print or share. Every receipt should reduce what the tenant owes automatically.

## 4. Security deposits

Deposits are not income. They should be held as a liability, and settled with clear deductions when the tenant leaves.

## 5. Expenses

Building expenses and staff costs should be recorded against the property, so each owner sees a true profit.

## 6. Owner statements

An owner statement should come straight from the ledger: rent collected, expenses, and what is owed or paid out. If it is typed separately, it will eventually disagree with the books.

## 7. Real accounting underneath

The most useful property software is also real accounting software, with a chart of accounts, a trial balance and a balance sheet. That is how OneAccounts Property Management is built.$$)
on conflict (slug) do nothing;
