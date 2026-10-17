export const SITE = {
  url: "https://www.oneaccountsbysiqbal.com",
  name: "OneAccounts",
  tagline: "Simple by Design. Professional by Nature.",
  app: "https://app.oneaccountsbysiqbal.com",
  properties: "https://properties.oneaccountsbysiqbal.com",
  propertiesLogin: "https://properties.oneaccountsbysiqbal.com/login", // sign in or create an account
  whatsapp: "https://wa.me/923716853677",
  whatsappDisplay: "+92 371 6853677",
  email: "support@oneaccountsbysiqbal.com",
  street: "Noon Avenue, Muslim Town",
  city: "Lahore",
  country: "Pakistan",
  youtube: "https://www.youtube.com/@OneAccountsbySiqbal",
}

// Prices are shown publicly on the home page and /pricing (Shahid, Oct 2026: experts advise showing prices up front).
// Set PRICING_PUBLIC = false to hide them again and show the "see plans inside your trial" box instead.
export const PRICING_PUBLIC = true
// Confirmed prices (Oct 2026). Add-ons are extra and priced separately.
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
  // Optional long-form body shown under the feature grid. Each section is a heading plus paragraphs and an optional list.
  sections?: { h: string; p: string[]; list?: string[] }[]
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "service-business-accounting",
    name: "Service",
    h1: "Accounting software for service businesses",
    metaTitle: "Accounting Software for Service Companies | OneAccounts",
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
    h1: "Trading ERP software: accounting and inventory for trading businesses",
    metaTitle: "Trading ERP Software with Stock Check | OneAccounts",
    metaDesc: "Trading ERP for Pakistan: accounting plus inventory, a stock check on every sale, average costing, cash sales, returns and product ledgers. Free trial.",
    intro: "Trading is accounting plus stock. OneAccounts works as a trading ERP: it checks available stock before you sell and values it on the average costing method, so what the shelf says and what the books say never drift apart.",
    points: [
      { t: "Stock check on every sale", d: "Invoices check available stock, so you do not sell what you do not have." },
      { t: "Average costing", d: "Stock is valued on the average costing method, and cost of goods sold follows it." },
      { t: "Product search on invoices and bills", d: "Pick products as you type, with units of measurement and current quantity." },
      { t: "Cash sales", d: "Sell for cash directly, with partial payment and discount, without going through receivables." },
      { t: "Sales and purchase returns", d: "Returns reverse the stock and the accounts together." },
      { t: "Product ledger", d: "Every movement of every product, in order, on screen and in PDF." },
    ],
    faq: [
      { q: "Is OneAccounts a trading ERP?", a: "Yes. It combines accounting with inventory for trading businesses: stock is checked on every sale, valued on average cost, and every movement is recorded in the product ledger." },
      { q: "Which costing method does OneAccounts use for stock?", a: "Average costing. Each purchase updates the average cost, and sales are costed at that average." },
      { q: "Does it stop me selling stock I do not have?", a: "Yes. The system checks available stock when you enter a sale." },
      { q: "Can I import my products?", a: "Yes. CSV import and export is available, and we help you bring over opening balances." },
    ],
    sections: [
      { h: "Why traders need accounting and stock in one place", p: [
        "A trading business lives on two numbers that must agree: what the books say you own and what is physically on the shelf. When stock is kept in one sheet and accounts in another, the two drift apart. The shop sells something it does not have, or the balance sheet shows stock that left weeks ago.",
        "OneAccounts treats stock as part of the accounts. Every purchase, sale and return updates both at once, so the shelf and the ledger describe the same business."
      ] },
      { h: "A stock check on every sale", p: [
        "When you enter a sales invoice, the system checks the available quantity of each product. You do not sell what you do not have. You see the quantity on hand while you work, next to the unit of measurement, so there is no need to leave the invoice to look it up.",
        "Products are found by typing: start the name and pick from the list. The same search works on purchase bills."
      ] },
      { h: "Average costing, explained simply", p: [
        "OneAccounts values stock on the average costing method. Each purchase updates the average cost of the product, and each sale is costed at that average. If you buy 100 units at one price and another 100 at a higher price, the units you sell are costed at the blended figure, and cost of goods sold follows from it.",
        "The advantage for a trader is consistency: the value of stock on the balance sheet and the cost of goods sold in the profit and loss both come from the same rule."
      ] },
      { h: "Cash sales, returns and the product ledger", p: [
        "Counter sales can be made for cash directly, with partial payment and discount, without passing through receivables. Sales returns and purchase returns reverse the stock and the accounts together, so a returned item is back on the shelf and out of the sales figure in one step.",
        "The product ledger lists every movement of a product in order: purchase, sale, return. It is available on screen and as a PDF. When a quantity looks wrong, this is where you find out why."
      ], list: [
        "Stock checked before every sale",
        "Average cost updated on every purchase",
        "Cash sales with partial payment and discount",
        "Returns that reverse stock and accounts together",
        "Product ledger with every movement in order"
      ] },
      { h: "Getting your products in", p: [
        "You can import and export products as CSV, and we help you bring over opening balances so the first day's figures match your closing figures from the old system."
      ] },
      { h: "Who it suits", p: [
        "OneAccounts works as a trading ERP for distributors, wholesalers and shops in Pakistan that want accounting and inventory in one system, priced in rupees per user per month with a ten-day free trial. It also includes the full accounting core: invoices, bills, receipts, payments, ledgers, and the trial balance, profit and loss and balance sheet."
      ] },
    ],
  },
  {
    slug: "ngo-accounting-software",
    name: "NGO",
    h1: "NGO accounting software with project and donor budgets",
    metaTitle: "NGO Accounting Software with Donor Budgets | OneAccounts",
    metaDesc: "NGO accounting software for Pakistan: donor and project budgets, a budget check on every bill, approvals and Budget vs Actual reports. Free trial.",
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
      { q: "Can I import donors, projects and activities from Excel?", a: "Yes. You can import them from Excel, and if a row is wrong you get a clear error list." },
      { q: "Can I report to more than one donor?", a: "Yes. Each donor and project has its own budget, and Budget vs Actual can be viewed by activity and location." },
    ],
    sections: [
      { h: "Why NGO accounting is different from business accounting", p: [
        "A business asks one question: did we make a profit this year? An NGO asks several at once. How much of Donor A's grant is spent, how much is left, and was it spent on the activities the agreement allows? The auditor, the board and the donor each want the answer in a different shape, and none of them wants to wait until year end.",
        "That is why a general accounting package with a spreadsheet beside it tends to break down. The budget lives in one file, the ledger in another, and the check between them is done by a person, usually after the money has already gone out. OneAccounts puts the budget inside the accounting, so the check happens when the bill is entered, not when the report is written."
      ] },
      { h: "How a donor grant is set up", p: [
        "You begin with the structure that matches your donor agreement: the donor, the project, its activities and its locations. You can type these in or import them from Excel. If a row is wrong, the import returns a clear list of errors instead of loading half the data.",
        "Next comes the budget. Each line is keyed by activity, location and account, and the same key is used for entering transactions, for reports and for the check on every bill. Because one key does all three jobs, the budget you approved is the budget you are held to, with no second list to keep in step."
      ] },
      { h: "Budgets that follow the project, not the calendar", p: [
        "Donors fund a project for its whole life, which rarely lines up with a calendar year or a fiscal year. OneAccounts budgets follow the project period. You can split a budget across the project's months and later move amounts between months without changing the total, which is what you need when a purchase slips from March to May."
      ] },
      { h: "The check on every bill", p: [
        "When a bill is entered against a project, the system looks at the budget line for that activity, location and account. If the bill is within the available balance, it posts. If it is over, it is refused before it posts, and the screen shows the balance that is actually available.",
        "If the bill is then edited down, the budget is released again, so a corrected entry does not leave a hidden hole in the budget. The point is that overspending is caught by the person entering the bill, while it can still be fixed, instead of by the auditor months later."
      ] },
      { h: "Approvals with a history", p: [
        "Budgets and entries can go through a submit and approve flow. An approver can approve, or reject with a written reason, and every change is kept in a history. When a donor asks who changed a budget line and why, the answer is in the system, not in someone's memory."
      ] },
      { h: "Reports your donor and auditor will ask for", p: [
        "The main report is Budget vs Actual: the budget, the actual spending and the variance, by activity and location, on screen and as a PDF. Beside it you have the full set of core accounting reports: trial balance, profit and loss, balance sheet and general ledger.",
        "Every figure can be opened down to the ledger, then the journal entry, then the original document. That drill-down is what turns a report into evidence."
      ], list: [
        "Budget vs Actual by activity and location",
        "Donor balances on the NGO dashboard",
        "Trial balance, profit and loss and balance sheet",
        "General ledger and journal, with drill-down to the document"
      ] },
      { h: "Who it suits", p: [
        "OneAccounts suits NGOs and project-based organisations in Pakistan that manage several grants, report to more than one donor and want the budget control built into daily entry. It is priced in rupees per user per month, with a ten-day free trial and help bringing over your opening balances.",
        "If you run a single small grant and keep it in a spreadsheet that works for you, you may not need this yet. If you are juggling donors, locations and approvals, it is built for that."
      ] },
    ],
  },
  {
    slug: "construction-accounting-software",
    name: "Construction",
    h1: "Construction company accounting with site budgets and investor capital",
    metaTitle: "Construction Accounting with Site Budgets | OneAccounts",
    metaDesc: "Construction accounting software with a budget for each site, validation on every bill, and investor capital with profit share. Free trial.",
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
    sections: [
      { h: "Every site is its own small business", p: [
        "A construction company rarely has one project. It has several sites, each with its own budget, its own suppliers and often its own investors. When all of that goes through one general ledger, it is hard to say whether a particular site is on budget until the work is finished.",
        "OneAccounts sets up each site as a project with its activities and locations. Spending is recorded against the site as it happens, so you can see where each site stands at any time."
      ] },
      { h: "A budget for each site, checked on every bill", p: [
        "Each site has its own budget by activity, location and account. When a bill or invoice is entered, it is validated against that site's budget before it posts. A bill that would take an activity over its limit is stopped while it can still be discussed, rather than discovered in the month-end report.",
        "The same key (activity, location, account) is used for entry, for reports and for the check, so the budget you set is the budget you are held to."
      ] },
      { h: "Investors, capital and profit share", p: [
        "Many construction and development projects are funded by investors. OneAccounts lets you assign investors to a site by percentage, and the total is held at exactly 100 percent. Each site can carry a target contribution taken from its budget, and every contribution received is recorded and can be edited.",
        "Profit share and capital contributed are kept separate. Changing an investor's percentage never touches a journal entry. If a contribution is corrected, the old entry is reversed and a new one is posted, so nothing is deleted and the audit trail stays complete."
      ] },
      { h: "A dashboard for the whole portfolio", p: [
        "The construction dashboard shows sites, spending against budget and investors in one view. From any figure you can open the ledger, the journal entry and the original document behind it."
      ], list: [
        "Projects (sites) with activities and locations",
        "A budget for each site by activity, location and account",
        "Validation of bills and invoices against the site budget",
        "Investor profit share held at 100 percent",
        "Investor capital with every contribution recorded"
      ] },
      { h: "Who it suits", p: [
        "OneAccounts suits construction and development companies in Pakistan that run more than one site, answer to investors, and want the budget control built into daily entry. It is priced in rupees per user per month, with a ten-day free trial and help bringing over opening balances."
      ] },
    ],
  },
  {
    slug: "inventory-management-software",
    name: "Inventory",
    h1: "Inventory management software connected to your accounts",
    metaTitle: "Inventory Management Software for Traders | OneAccounts",
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
    metaTitle: "Accounting Software in Pakistan, Cloud ERP | OneAccounts",
    metaDesc: "Cloud accounting and ERP in rupees, with withholding tax, payroll, inventory, WhatsApp invoices and support on WhatsApp. Start a free trial.",
    intro: "Built in Pakistan, priced in rupees and supported on WhatsApp. Tax and withholding are handled inside the entry, so the journal comes out right the first time.",
    points: [
      { t: "Priced in rupees", d: "Simple pricing in rupees: Rs 3,000 per user per month for Service and Trading, and Rs 5,000 per user per month for NGO and Construction." },
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
    metaTitle: "Rental Property Accounting Software | OneAccounts",
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
  { q: "What happens when my trial ends?", a: "You choose a plan from your dashboard. Service and Trading plans are Rs 3,000 per user per month, NGO and Construction plans are Rs 5,000 per user per month, and Property Management is Rs 5,000 per month, plus optional add-ons. Nothing is charged without your say-so." },
  { q: "How much does OneAccounts cost?", a: "Service and Trading companies pay Rs 3,000 per user per month. NGO and Construction companies pay Rs 5,000 per user per month. Property Management is Rs 5,000 per month. Optional add-ons such as Payroll are extra. Every new company starts with a free trial and no credit card." },
  { q: "Do I need an accountant to use OneAccounts?", a: "OneAccounts is built so that anyone on your team can run day-to-day bookkeeping: invoices, bills, payments and reports. That saves the cost of a full-time accountant and the follow-ups that come with one. You may still want a professional for tax filing and audits." },
  { q: "Can I run my business from my phone?", a: "Yes. OneAccounts runs in your browser and the mobile layout is designed for phones, so you can create invoices, record payments and check balances from anywhere, at any time." },
  { q: "Can I import my existing data?", a: "Yes. Our team can help you bring over your chart of accounts, opening balances, and historical transactions when you get started." },
  { q: "Is OneAccounts built for NGOs specifically, or just adapted?", a: "It is purpose-built for each business type. Trading, service, NGO and construction companies each get their own dashboard and tools: donor balances and budget tracking for NGOs, inventory and margins for trading, project billing for service organisations, and site budgets and investor capital for construction." },
  { q: "Does OneAccounts support construction companies?", a: "Yes. Each site has its own projects, activities and budget, every bill and invoice is validated against it, and investor capital is tracked against each investor's profit share." },
  { q: "What is OneAccounts Property Management?", a: "A separate product for landlords, plazas and apartment buildings. It manages buildings, rooms, owners, tenants, leases, rent invoices, security deposits and owner statements, with real double-entry accounting underneath. It runs at properties.oneaccountsbysiqbal.com." },
  { q: "Is my data secure?", a: "Yes. Your data is encrypted in transit and at rest, and each company's records are fully isolated from every other company on OneAccounts." },
  { q: "How do I get help if I'm stuck?", a: "Reach us directly by email or WhatsApp. We usually reply within the day. You will find both in the footer." },
]
