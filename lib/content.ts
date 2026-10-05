export const SITE = {
  url: "https://www.oneaccountsbysiqbal.com",
  name: "OneAccounts",
  tagline: "Simple by Design. Professional by Nature.",
  app: "https://app.oneaccountsbysiqbal.com",
  properties: "https://properties.oneaccountsbysiqbal.com",
  whatsapp: "https://wa.me/923716853677",
  whatsappDisplay: "+92 371 6853677",
  email: "support@oneaccountsbysiqbal.com",
  youtube: "https://www.youtube.com/@OneAccountsbySiqbal",
}

// Public prices (confirmed by Shahid, Oct 2026). Add-ons are extra and priced separately.
export const PRICING = {
  service: 3000, // Service and Trading, per user per month
  ngo: 5000, // NGO and Construction, per user per month
  property: 5000, // Property Management, per month
}

export type Solution = {
  slug: string
  name: string
  h1: string
  metaTitle: string
  metaDesc: string
  intro: string
  points: { t: string; d: string }[]
  faq: { q: string; a: string }[]
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "service-business-accounting",
    name: "Service",
    h1: "Accounting software for service businesses",
    metaTitle: "Accounting Software for Service Businesses in Pakistan | OneAccounts",
    metaDesc: "Invoices, bills, receipts, payments, journals and every core report for service companies. Simple to use, double-entry underneath. Free trial.",
    intro: "Bill your clients, pay your vendors and see where the business stands, without a spreadsheet in sight. Every service company starts with the full accounting core.",
    points: [
      { t: "Invoices and bills", d: "Manual entry exactly the way you work, with tax and withholding built in." },
      { t: "Receipts and payments", d: "Apply money to invoices and bills, or to opening balances, with partial payments handled." },
      { t: "Journal entries", d: "Post your own entries when you need to. Edits reverse and repost, so history stays intact." },
      { t: "Customer and vendor ledgers", d: "Opening balance, every transaction and the running balance, in order." },
      { t: "Core reports", d: "Chart of accounts, trial balance, profit and loss, balance sheet, journal and general ledger." },
      { t: "Drill down", d: "From any report to the ledger, the journal entry and the original document." },
    ],
    faq: [
      { q: "Is this suitable for a small service company?", a: "Yes. A new company starts with the full accounting core and a free trial. You add modules such as payroll only when you need them." },
      { q: "Can I send invoices on WhatsApp?", a: "Yes. WhatsApp invoicing is available as a module, along with PDF invoices." },
    ],
  },
  {
    slug: "trading-business-software",
    name: "Trading",
    h1: "Accounting and inventory software for trading businesses",
    metaTitle: "Trading Business Accounting & Inventory Software Pakistan | OneAccounts",
    metaDesc: "Accounting plus inventory with a stock check on every sale and average costing. Product search on invoices and bills, cash sales, returns and stock ledgers. Free trial.",
    intro: "Trading is accounting plus stock. OneAccounts checks available stock before you sell and values it on the average costing method, so what the shelf says and what the books say never drift apart.",
    points: [
      { t: "Stock check on every sale", d: "Invoices check available stock, so you do not sell what you do not have." },
      { t: "Average costing", d: "Stock is valued on the average costing method, and cost of goods sold follows it." },
      { t: "Product search on invoices and bills", d: "Pick products as you type, with units of measurement and current quantity." },
      { t: "Cash sales", d: "Sell for cash directly, with partial payment and discount, without going through receivables." },
      { t: "Sales and purchase returns", d: "Returns reverse the stock and the accounts together." },
      { t: "Product ledger", d: "Every movement of every product, in order, on screen and in PDF." },
    ],
    faq: [
      { q: "Which costing method does OneAccounts use for stock?", a: "Average costing. Each purchase updates the average cost, and sales are costed at that average." },
      { q: "Does it stop me selling stock I do not have?", a: "Yes. The system checks available stock when you enter a sale." },
      { q: "Can I import my products?", a: "Yes. CSV import and export is available, and we help you bring over opening balances." },
    ],
  },
  {
    slug: "ngo-accounting-software",
    name: "NGO",
    h1: "NGO accounting software with project and donor budgets",
    metaTitle: "NGO Accounting Software with Donor & Project Budgets | OneAccounts",
    metaDesc: "Projects, activities, donor budgets and a budget check on every bill. Month-wise budgets, approval workflow and Budget vs Actual reports. Free trial.",
    intro: "Donors fund a project once, for its whole life. OneAccounts follows that: you set the budget by activity, location and account, and every bill is checked against it before it posts.",
    points: [
      { t: "Donors, projects, activities, locations", d: "Set them up by hand or import them from Excel, with a clear error list if something is wrong." },
      { t: "Budgets by activity, location and account", d: "The same key is used for entry, reports and the check on every bill." },
      { t: "Month-wise budgets", d: "Split the budget across the project's months and edit it without changing the total." },
      { t: "Approval workflow", d: "Submit, approve or reject with a reason, with a full change history." },
      { t: "Budget vs Actual", d: "Budget, actual and variance by activity and location, in screen and PDF." },
      { t: "NGO dashboard", d: "Donor balances and budget use at a glance." },
    ],
    faq: [
      { q: "What happens if a bill exceeds the budget?", a: "The bill is refused before it posts, with the available balance shown. When the bill is edited down, the budget is released again." },
      { q: "Is the budget tied to a calendar year?", a: "No. Budgets follow the project period, because donors fund a project for its whole duration." },
    ],
  },
  {
    slug: "construction-accounting-software",
    name: "Construction",
    h1: "Construction company accounting with site budgets and investor capital",
    metaTitle: "Construction Accounting Software: Site Budgets & Investors | OneAccounts",
    metaDesc: "Projects, activities and budgets for each site, with validation on every bill and invoice. Investor capital with percentage profit share. Built for construction companies.",
    intro: "Set up each site as a project with its activities and a budget. Every bill and invoice is then validated against that site's budget before it posts, and investors are tracked by their share of each site.",
    points: [
      { t: "Projects (sites) and activities", d: "Organise spending by site, location and activity, the way a project actually runs." },
      { t: "A budget for each site", d: "Budget by activity, location and account, so every site has its own limit." },
      { t: "Budget validation", d: "Bills and invoices are checked against the site budget before they post." },
      { t: "Investor profit share", d: "Assign investors to a site by percentage, with the total held at exactly 100 percent." },
      { t: "Investor capital", d: "Target contribution from the site budget, with every contribution recorded and editable." },
      { t: "Construction dashboard", d: "Sites, spending against budget and investors in one view." },
    ],
    faq: [
      { q: "Is the budget checked separately for every site?", a: "Yes. Each site has its own budget by activity, location and account, and every bill and invoice is validated against it." },
      { q: "Does editing an investor's percentage change the books?", a: "No. Profit share and capital contributed are kept separate, so changing a percentage never touches a journal entry." },
      { q: "What if I correct a contribution?", a: "A corrected contribution reverses the old entry and posts a new one. Nothing is deleted, so the audit trail stays complete." },
    ],
  },
  {
    slug: "inventory-management-software",
    name: "Inventory",
    h1: "Inventory management software connected to your accounts",
    metaTitle: "Inventory Management Software for Traders in Pakistan | OneAccounts",
    metaDesc: "Stock register, stock check on every sale, average costing, units of measurement and a product ledger, all connected to sales, purchases and accounts.",
    intro: "Stock that agrees with your accounts. Every quantity change is a recorded movement, stock is checked before you sell and valued on average cost, so you can always see how a number came to be.",
    points: [
      { t: "Stock register", d: "Products with units, opening quantity and live quantity on hand." },
      { t: "Stock check on sale", d: "Sales check available stock, so quantities never run below zero by accident." },
      { t: "Average costing", d: "Stock is valued on the average costing method, and sales are costed at the average." },
      { t: "Adjustments", d: "Correct stock with a recorded adjustment, not by overwriting a number." },
      { t: "Product ledger", d: "Open any product and see every movement in order." },
      { t: "Material management", d: "Gate pass and store for companies that receive materials." },
    ],
    faq: [
      { q: "Which costing method does it use?", a: "Average costing." },
      { q: "Can quantity go negative?", a: "The system checks available stock on sales, and the quantity follows the recorded stock movements." },
    ],
  },
  {
    slug: "accounting-software-pakistan",
    name: "Accounting software for Pakistan",
    h1: "Cloud accounting software made for Pakistani businesses",
    metaTitle: "Accounting Software in Pakistan | Cloud ERP in PKR | OneAccounts",
    metaDesc: "Cloud accounting and ERP in rupees, with withholding tax, payroll, inventory, WhatsApp invoices and support on WhatsApp. Start a free trial.",
    intro: "Built in Pakistan, priced in rupees and supported on WhatsApp. Tax and withholding are handled inside the entry, so the journal comes out right the first time.",
    points: [
      { t: "Priced in rupees", d: "Simple per-user pricing, with discounts for six-month and yearly plans." },
      { t: "Withholding tax", d: "Enter the amount that left the bank. The tax is worked out and both sides are posted." },
      { t: "Payroll", d: "Attendance, leave, loans, advances, approvals and payslips." },
      { t: "CSV and Excel import", d: "Bring your customers, suppliers and products in from a file." },
      { t: "Your data stays yours", d: "Each company's records are isolated from every other company." },
      { t: "Support on WhatsApp", d: "Reach us on WhatsApp or by email; we usually reply within the day." },
    ],
    faq: [
      { q: "Do you help with opening balances?", a: "Yes. We help you bring over your chart of accounts, opening balances and history when you start." },
      { q: "Is there a free trial?", a: "Yes. New companies get a free trial, and no credit card is needed." },
    ],
  },
  {
    slug: "rental-property-accounting",
    name: "Rental property accounting",
    h1: "Rental property accounting that matches your rent roll",
    metaTitle: "Rental Property Accounting Software | OneAccounts Property Management",
    metaDesc: "Rent invoices, receipts, security deposits, expenses and owner statements, posted into real double-entry books. Built for landlords and building managers.",
    intro: "Rent collected is already in the books. Property operations and accounting live in one place, so the owner's statement comes straight from the ledger.",
    points: [
      { t: "Rent invoicing", d: "Batch invoices with PDF receipts." },
      { t: "Security deposits", d: "Receive, hold and settle deposits with deductions." },
      { t: "Expenses", d: "Record building expenses by category." },
      { t: "Owner ledger", d: "A running statement per owner, with settlement and payout." },
      { t: "Full reports", d: "Trial balance, profit and loss, balance sheet and ledger." },
      { t: "Audit history", d: "Every change is recorded and attributable." },
    ],
    faq: [
      { q: "Is this a separate product?", a: "Yes. OneAccounts Property Management is its own application at its own address, with the same standard of accounting underneath." },
    ],
  },
]

export const MODULES = [
  ["Payroll", "Salaries, attendance, leave, loans, advances, approvals and payslips."],
  ["WhatsApp invoices", "Send invoices and statements on WhatsApp."],
  ["Inventory", "Products, stock movements and a product ledger."],
  ["Material management", "Gate pass and material store."],
  ["Purchase orders", "Orders and receiving, tied to bills."],
  ["Tax management", "Tax codes and withholding."],
  ["Fixed assets", "Depreciation, transfer and disposal."],
  ["Invoice automation", "Recurring invoices."],
  ["Investors", "Capital and profit share."],
  ["CSV import and export", "Bulk upload and download."],
  ["Email reports", "Reports by email."],
  ["Payment reminders", "Chase overdue payments."],
]

export const PM_FEATURES = [
  ["Buildings and rooms", "Floors, rooms and occupancy history."],
  ["Owners, tenants and leases", "Charges, roommates and facility details stay with the lease."],
  ["Property reports", "Occupancy, rent, deposits and owner statements, straight from the books."],
  ["Rent invoicing", "Batch invoices and PDF receipts."],
  ["Security deposits", "Receive, hold and settle with deductions."],
  ["Expenses and staff", "Building expenses, staff and salary payments."],
  ["Owner ledger", "Statements, settlement and payout."],
  ["Accounting reports", "Chart of accounts, journal, ledger, trial balance, profit and loss, balance sheet."],
  ["Backup and import", "Backup, restore and Excel templates for bulk import."],
  ["Roles and audit", "Role-based access and a full audit log."],
]

export const HOME_FAQ = [
  { q: "Is there a free trial?", a: "Yes. New companies get a free trial with no credit card required, so you can be up and running the same day." },
  { q: "What happens when my trial ends?", a: "You choose a plan from your dashboard. Service and Trading plans are Rs 3,000 per user per month, and NGO and Construction plans are Rs 5,000 per user per month, plus optional add-ons. Nothing is charged without your say-so." },
  { q: "Can I import my existing data?", a: "Yes. Our team can help you bring over your chart of accounts, opening balances, and historical transactions when you get started." },
  { q: "Is OneAccounts built for NGOs specifically, or just adapted?", a: "It is purpose-built for each business type. Trading, service, NGO and construction companies each get their own dashboard and tools: donor balances and budget tracking for NGOs, inventory and margins for trading, project billing for service organisations, and site budgets and investor capital for construction." },
  { q: "Does OneAccounts support construction companies?", a: "Yes. Each site has its own projects, activities and budget, every bill and invoice is validated against it, and investor capital is tracked against each investor's profit share." },
  { q: "What is OneAccounts Property Management?", a: "A separate product for landlords, plazas and apartment buildings. It manages buildings, rooms, owners, tenants, leases, rent invoices, security deposits and owner statements, with real double-entry accounting underneath. It runs at properties.oneaccountsbysiqbal.com." },
  { q: "Is my data secure?", a: "Yes. Your data is encrypted in transit and at rest, and each company's records are fully isolated from every other company on OneAccounts." },
  { q: "How do I get help if I'm stuck?", a: "Reach us directly by email or WhatsApp. We usually reply within the day. You will find both in the footer." },
]
