export type Module = {
  name: string;
  /** file name (without .webp) inside /public/screens/{dir}/ */
  shot: string;
  lines: [string, string, string];
};

export type Product = {
  slug: string;
  dir: string;
  name: string;
  num: string;
  /** home / overview row */
  problem: string;
  outcomes: [string, string, string];
  /** product page */
  promise: string;
  seoDescription: string;
  whoFor: string;
  tags: string[];
  before: string[];
  after: string[];
  modules: Module[];
  day: { time: string; text: string }[];
  integrations: string[];
  faqs: { q: string; a: string }[];
  /** form value for "Interested in" */
  interest: string;
  /** "I run a ..." for the chooser */
  iRun: string;
  /** an example of the WhatsApp message this product sends */
  sample: { label: string; text: string };
  /** stage colour on the overview rows */
  stage: "olive" | "wheat" | "paper";
};

const commonIntegrations = [
  "WhatsApp messages",
  "JazzCash · Easypaisa · Bank transfer",
  "PDF + Excel reports",
  "Daily backups",
];

export const products: Product[] = [
  {
    slug: "printing-erp",
    dir: "printing-erp",
    name: "Printing ERP",
    num: "01",
    interest: "Printing ERP",
    iRun: "I run a printing press",
    stage: "olive",
    sample: { label: "Job ready", text: "Your job is ready. Balance due: PKR 4,500. Please collect it today." },
    problem: "Job cards on paper, rates in someone's head, advances in a notebook.",
    outcomes: [
      "Every job, rate and advance on one screen.",
      "Customers get WhatsApp updates automatically.",
      "Know each customer's balance in seconds.",
    ],
    promise: "Run the whole press from one screen: job cards, rates, advances and customer balances.",
    seoDescription:
      "Printing ERP by Al-Kausar: job cards, rate estimates, customer ledger, advances, stock and WhatsApp updates for printing presses in Pakistan.",
    whoFor:
      "Offset and digital printing presses, from a two-machine shop to a press with a night shift. If your job cards are carbon slips, your rates live in the owner's head and customers keep calling to ask \"mera kaam ho gaya?\", this is built for you.",
    tags: ["Offset presses", "Digital printers", "Flex and signage", "Packaging units"],
    before: [
      "Job cards on carbon slips that go missing between the counter and the machine.",
      "Rates quoted from memory, so the same customer pays a different price on different days.",
      "Advance written in a notebook, balance worked out on a calculator.",
      "Someone calls every customer to say the job is ready.",
    ],
    after: [
      "One job card per order: size, paper, colour, quantity, deadline, machine.",
      "Saved rate per customer and per item. The estimate takes seconds.",
      "Advance and payments post to the ledger the moment they are received.",
    ],
    modules: [
      {
        name: "Job cards",
        shot: "02-job-cards",
        lines: [
          "Size, paper, colour, quantity and deadline on one card.",
          "Status moves from Design to Printing to Ready.",
          "Reorder a past job without retyping it.",
        ],
      },
      {
        name: "Rate and estimate",
        shot: "03-estimate",
        lines: [
          "Saved rates per customer and per item.",
          "An estimate turns into a job card in one click.",
          "Print the quote or send it as a PDF.",
        ],
      },
      {
        name: "Customer ledger",
        shot: "04-ledger",
        lines: [
          "Every job, payment and balance under the customer's name.",
          "Running balance after each entry.",
          "Statement as a PDF or on WhatsApp.",
        ],
      },
      {
        name: "Advance and payments",
        shot: "05-payments",
        lines: [
          "Take an advance against a job card.",
          "Cash, bank, JazzCash and Easypaisa recorded by type.",
          "Receipt printed or shared on the spot.",
        ],
      },
      {
        name: "Stock",
        shot: "06-stock",
        lines: [
          "Paper and ink stock by size and type.",
          "Stock reduces as jobs are completed.",
          "A low-stock list before you run out.",
        ],
      },
      {
        name: "Machines and staff",
        shot: "07-machines",
        lines: [
          "Assign each job to a machine and an operator.",
          "See what is queued on every machine.",
          "Staff see only the screens their role needs.",
        ],
      },
      {
        name: "WhatsApp updates",
        shot: "08-whatsapp",
        lines: [
          "Job received, job ready and balance-due messages.",
          "Message text you can edit.",
          "Every message logged against the job.",
        ],
      },
      {
        name: "Reports",
        shot: "09-reports",
        lines: [
          "Daily collection and outstanding balances.",
          "Customer-wise and item-wise sales.",
          "Export to Excel or PDF.",
        ],
      },
    ],
    day: [
      { time: "9:00", text: "A customer walks in for visiting cards. You pick the saved rate and the estimate is ready." },
      { time: "9:15", text: "Advance taken, job card created, job assigned to Machine 2." },
      { time: "11:30", text: "Art paper drops below its limit and appears on the low-stock list." },
      { time: "1:00", text: "The job is marked Ready. The customer gets a WhatsApp message." },
      { time: "4:00", text: "The customer collects and pays the balance by Easypaisa. Ledger shows zero." },
      { time: "6:00", text: "Daily collection report printed. Books closed." },
    ],
    integrations: commonIntegrations,
    faqs: [
      {
        q: "How much does Printing ERP cost?",
        a: "It depends on the number of users, machines and modules you need. Send the quote form with a few lines about your press and we will reply on WhatsApp with a figure.",
      },
      {
        q: "Does it work on a phone?",
        a: "Yes. It runs in the browser, so the counter can use a computer while you check balances from your phone.",
      },
      {
        q: "Can I bring in my existing customer list?",
        a: "If your customers and balances are in Excel, we import them. If they are in a register, we enter the first batch with you so the ledger starts correct.",
      },
      {
        q: "Will customers really get WhatsApp messages?",
        a: "Yes. When a job moves to Ready, or a balance is due, a message goes out. You decide the wording and which events send a message.",
      },
      {
        q: "Who owns the data?",
        a: "You do. Export every customer, job and payment to Excel at any time. There is no lock-in.",
      },
      {
        q: "What if something breaks during a rush?",
        a: "Call or message us. We fix things over a remote session, and we can visit on site when needed.",
      },
    ],
  },
  {
    slug: "installment-manager",
    dir: "installment",
    name: "Installment Manager",
    num: "02",
    interest: "Installment Manager",
    iRun: "I sell on installments",
    stage: "wheat",
    sample: { label: "Due reminder", text: "Reminder: your installment is due tomorrow. Thank you for paying on time." },
    problem: "Udhaar written in registers, recovery chased by memory.",
    outcomes: [
      "Every customer, guarantor and due date in one place.",
      "Reminders go out before the due date, not after.",
      "See who pays on time before you give credit.",
    ],
    promise: "Every customer, guarantor and due date in one place, so recovery stops depending on memory.",
    seoDescription:
      "Installment Manager by Al-Kausar: customer and guarantor records, installment plans, recovery lists, WhatsApp reminders and credit history for shops in Pakistan.",
    whoFor:
      "Shops that sell on installments: electronics, furniture, motorcycles, mobile phones, appliances. If your plans are in a register, your recovery staff work from a torn page and you only learn a customer is late when the month is over, this is for you.",
    tags: ["Electronics", "Furniture", "Mobile shops", "Motorcycle dealers"],
    before: [
      "Plans written in a register, one page per customer.",
      "Guarantor's phone number on a separate slip, if it exists at all.",
      "Recovery staff go out with a list copied by hand last week.",
      "A customer turns up for new credit and nobody remembers how they paid last time.",
    ],
    after: [
      "A plan per customer with the full schedule of due dates.",
      "Guarantor details linked to the plan, one tap away.",
      "Before approving new credit, the customer's payment history is on screen.",
    ],
    modules: [
      {
        name: "Customer and guarantor records",
        shot: "02-customers",
        lines: [
          "CNIC, phone, address and photo for each customer.",
          "Guarantor details linked to every plan.",
          "Documents saved with the customer file.",
        ],
      },
      {
        name: "Installment plans",
        shot: "03-plans",
        lines: [
          "Set price, advance, number of months and markup.",
          "The schedule of due dates is generated for you.",
          "Print the plan for the customer's signature.",
        ],
      },
      {
        name: "Recovery and dues",
        shot: "04-recovery",
        lines: [
          "Today's, overdue and upcoming dues in one list.",
          "Record a payment against the right installment.",
          "Notes for every recovery call or visit.",
        ],
      },
      {
        name: "Reminders",
        shot: "05-reminders",
        lines: [
          "A WhatsApp reminder before the due date.",
          "A second message when a payment is missed.",
          "A call list for recovery staff.",
        ],
      },
      {
        name: "Credit history",
        shot: "06-credit-history",
        lines: [
          "Every past plan and how it was paid.",
          "Late-payment count for each customer.",
          "Check it before you approve a new plan.",
        ],
      },
      {
        name: "Shop-wise dashboard",
        shot: "07-dashboard-shops",
        lines: [
          "Each branch's recovery and outstanding on one screen.",
          "Collection compared by branch and by staff member.",
          "Owner sees every shop. Staff see their own.",
        ],
      },
      {
        name: "Reports",
        shot: "08-reports",
        lines: [
          "Outstanding by customer, area or item.",
          "Collection report by day and by month.",
          "Export to Excel or PDF.",
        ],
      },
    ],
    day: [
      { time: "10:00", text: "The shop opens. Today's due list is already on screen." },
      { time: "11:00", text: "A customer buys a fridge. Plan created, guarantor added, schedule printed." },
      { time: "1:00", text: "Reminders for tomorrow's dues go out on WhatsApp." },
      { time: "3:00", text: "A customer pays an installment at the counter. Receipt printed." },
      { time: "5:00", text: "Recovery staff receive the overdue list for their area." },
      { time: "6:30", text: "The day's collection report matches the cash in the drawer." },
    ],
    integrations: commonIntegrations,
    faqs: [
      {
        q: "How much does Installment Manager cost?",
        a: "It depends on the number of shops, users and modules. Send the quote form with a short description of how you sell and we will reply on WhatsApp.",
      },
      {
        q: "Can it handle more than one shop?",
        a: "Yes. The shop-wise dashboard shows each branch separately. The owner sees all of them and staff see only their own.",
      },
      {
        q: "We already have years of records in registers. What happens to them?",
        a: "We help you enter the open plans, the ones still being paid, so recovery starts from the right balance. Closed plans can be added later.",
      },
      {
        q: "Do customers receive reminders automatically?",
        a: "Yes, on WhatsApp, before the due date and again if a payment is missed. You control the wording.",
      },
      {
        q: "Can staff change a plan after it is made?",
        a: "Only if you give them that permission. Roles decide who can edit plans, record payments or only view.",
      },
      {
        q: "Who owns the data?",
        a: "You do. Export all customers, plans and payments to Excel whenever you want.",
      },
    ],
  },
  {
    slug: "doctor-erp",
    dir: "doctor-erp",
    name: "Doctor ERP",
    num: "03",
    interest: "Doctor ERP",
    iRun: "I run a clinic",
    stage: "paper",
    sample: { label: "Appointment", text: "Reminder: your appointment is tomorrow at 10:30 am. See you then." },
    problem: "Patient files in drawers, billing on a calculator.",
    outcomes: [
      "Patient history ready when the patient walks in.",
      "Appointments, prescriptions and bills in one flow.",
      "Daily collection report without counting slips.",
    ],
    promise: "Patient history, prescription and bill in one flow, from the moment the patient walks in.",
    seoDescription:
      "Doctor ERP by Al-Kausar: patient records, appointments, prescriptions, billing and daily collection reports for clinics in Pakistan.",
    whoFor:
      "Single-doctor clinics and small multi-doctor practices. If patient files sit in a drawer, the prescription pad is the only record and the day's collection is counted from slips at night, this is for you.",
    tags: ["Single-doctor clinics", "Multi-doctor practices", "Dental clinics", "Small labs"],
    before: [
      "Patient files in a drawer, found by the receptionist's memory.",
      "A new prescription written without the last one in front of you.",
      "Bill added up on a calculator, collection counted from slips at night.",
      "Appointments in a diary, double-booked when two people call.",
    ],
    after: [
      "Search a patient by name or phone and the full history opens.",
      "Prescription, bill and receipt come out of the same visit.",
      "Daily collection per doctor, ready when you close.",
    ],
    modules: [
      {
        name: "Patients",
        shot: "02-patients",
        lines: [
          "One file per patient: history, allergies, past visits.",
          "Find by name, phone or file number.",
          "History on screen when the patient arrives.",
        ],
      },
      {
        name: "Appointments",
        shot: "03-appointments",
        lines: [
          "A daily schedule for each doctor.",
          "Walk-ins and booked slots in one queue.",
          "A WhatsApp reminder the day before.",
        ],
      },
      {
        name: "Prescriptions",
        shot: "04-prescriptions",
        lines: [
          "Write from saved medicine and dose templates.",
          "Printed on your own letterhead.",
          "Every prescription saved to the patient file.",
        ],
      },
      {
        name: "Billing",
        shot: "05-billing",
        lines: [
          "Consultation, procedure and medicine charges on one bill.",
          "Discounts and part-payments recorded.",
          "Receipt printed or shared as a PDF.",
        ],
      },
      {
        name: "Lab and pharmacy",
        shot: "06-lab-pharmacy",
        lines: [
          "Order lab tests from the visit screen.",
          "Results attached to the patient file.",
          "Stock and sales for the clinic's own pharmacy counter.",
        ],
      },
      {
        name: "Reports",
        shot: "07-reports",
        lines: [
          "Daily collection by doctor.",
          "Patients seen per day and per month.",
          "Export to Excel or PDF.",
        ],
      },
    ],
    day: [
      { time: "9:00", text: "Reception opens the day's appointment list." },
      { time: "9:20", text: "A patient arrives. History and the last prescription are already on screen." },
      { time: "9:40", text: "The doctor writes a prescription from saved templates. It prints on the letterhead." },
      { time: "10:00", text: "Bill created, part-payment recorded, receipt handed over." },
      { time: "1:00", text: "A lab report arrives and is attached to the patient's file." },
      { time: "4:00", text: "Tomorrow's patients get appointment reminders on WhatsApp." },
      { time: "6:00", text: "Daily collection report printed. No slips to count." },
    ],
    integrations: commonIntegrations,
    faqs: [
      {
        q: "How much does Doctor ERP cost?",
        a: "It depends on the number of doctors, users and modules. Send the quote form with a few lines about your clinic and we will reply on WhatsApp.",
      },
      {
        q: "Is patient data safe?",
        a: "Access is by login and role, so reception, doctor and owner each see what they should. Backups run daily.",
      },
      {
        q: "Can I use my own prescription letterhead?",
        a: "Yes. Prescriptions and receipts print with your clinic's name, details and layout.",
      },
      {
        q: "We have old patient files on paper. Do we have to type them all in?",
        a: "No. Patients are added as they come in, and the history builds from the next visit. We can also enter your most frequent patients with you at the start.",
      },
      {
        q: "Does it work for more than one doctor?",
        a: "Yes. Each doctor has their own schedule, prescriptions and collection report.",
      },
      {
        q: "Who owns the data?",
        a: "You do. Export patients, visits and bills to Excel whenever you want.",
      },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const moduleCount = products.reduce((n, p) => n + p.modules.length, 0);

export const shotPath = (p: Product, shot = "01-dashboard") => `${p.dir}/${shot}`;
