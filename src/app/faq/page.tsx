import type { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/AdUnit';

export const metadata: Metadata = {
  title: 'CIDP FAQ — Symptoms, Treatments, Insurance & Trials',
  description:
    'Answers to common CIDP questions: diagnosis criteria, IVIG vs Vyvgart Hytrulo vs SCIg, plasma exchange, insurance appeal steps, clinical trials in 2025, and questions to ask your neurologist.',
  alternates: { canonical: '/faq' },
};

const FAQ_ITEMS = [
  {
    q: 'What is CIDP (Chronic Inflammatory Demyelinating Polyneuropathy)?',
    a: 'CIDP is an autoimmune disorder in which the immune system attacks the myelin sheath — the protective coating around peripheral nerves. This damage slows or blocks nerve signals, causing progressive weakness and sensory loss in the arms and legs. CIDP is defined by symptoms that develop over at least 8 weeks, which distinguishes it from Guillain-Barré syndrome (GBS). It affects an estimated 1 to 9 people per 100,000 and is treatable, though not curable.',
  },
  {
    q: 'What are the early signs and symptoms of CIDP?',
    a: 'Early CIDP symptoms typically include: weakness in the legs (often noticed as difficulty climbing stairs or rising from a chair), numbness or tingling in the feet and hands, reduced or absent reflexes (especially at the ankles and knees), unsteady walking or balance problems, and fatigue. Symptoms usually affect both sides of the body symmetrically and worsen gradually over months. Some patients notice their grip strength declining before leg weakness becomes obvious.',
  },
  {
    q: 'How is CIDP diagnosed?',
    a: 'CIDP diagnosis requires three components: (1) clinical symptoms — progressive weakness and sensory loss in at least two limbs for 8 weeks or more; (2) electrodiagnostic testing — nerve conduction studies (NCS) and EMG showing demyelination in at least two nerves, meeting specific criteria from the 2021 EAN/PNS guidelines; and (3) exclusion of other causes such as diabetes, hereditary neuropathy, POEMS syndrome, or anti-MAG neuropathy. Supporting evidence may include elevated protein in cerebrospinal fluid (CSF), MRI showing nerve root enhancement, or improvement with IVIG or steroids. Diagnosis can be challenging and a second opinion at a neuromuscular specialty center is often worthwhile.',
  },
  {
    q: 'What is the difference between CIDP and Guillain-Barré syndrome (GBS)?',
    a: 'GBS and CIDP are both autoimmune disorders affecting peripheral nerves, but they differ in timeline and course. GBS is acute — symptoms peak within 4 weeks, then most patients gradually improve without long-term treatment. CIDP is chronic — symptoms progress over 8 or more weeks and most patients require ongoing treatment to maintain function. GBS often follows an infection; CIDP usually does not have a clear trigger. Both are treated with IVIG and plasma exchange acutely, but CIDP also requires long-term maintenance therapy.',
  },
  {
    q: 'What are the treatment options for CIDP?',
    a: 'The 2021 EAN/PNS guideline recommends three first-line treatments for CIDP: (1) IVIG (intravenous immunoglobulin) — infused every 3–6 weeks, FDA-approved, most commonly used; (2) Corticosteroids — oral prednisone or monthly IV methylprednisolone, less preferred for pure motor CIDP; (3) Plasma exchange (plasmapheresis) — removes harmful antibodies from the blood, used when IVIG and steroids are ineffective or contraindicated. Vyvgart Hytrulo (efgartigimod alfa + hyaluronidase), approved by the FDA in June 2024, is a newer option — a weekly subcutaneous injection that reduces pathogenic IgG antibodies. Second-line immunosuppressants (azathioprine, mycophenolate mofetil) may be added as steroid-sparing agents.',
  },
  {
    q: 'How does IVIG treat CIDP and how often is it given?',
    a: 'IVIG (intravenous immunoglobulin) contains pooled IgG antibodies from thousands of donors. In CIDP, it works by modulating the immune system — suppressing the abnormal immune attack on myelin through several mechanisms including Fc receptor blockade and complement inhibition. The typical CIDP dosing protocol is: loading dose of 2 g/kg given over 2–5 days, followed by maintenance doses of 1 g/kg every 3–4 weeks. Infusions take 3–6 hours. Some patients experience "wearing off" — returning symptoms in the week or two before the next infusion — which may indicate a need for shorter intervals or higher doses.',
  },
  {
    q: 'What is Vyvgart Hytrulo and how is it different from IVIG?',
    a: 'Vyvgart Hytrulo (efgartigimod alfa and hyaluronidase-qvfc) is a biologic drug approved by the FDA in June 2024 for adult CIDP. It works by blocking the FcRn receptor, which normally recycles IgG antibodies. By blocking FcRn, the drug accelerates the breakdown of all IgG — including the pathogenic antibodies causing nerve damage in CIDP. Key differences from IVIG: it is a subcutaneous injection (not an IV infusion), given once weekly, takes about 30–90 seconds, and eliminates the time burden of monthly infusions. In the ADHERE trial, 69% of patients showed significant improvement and relapse risk was reduced by 61% vs. placebo.',
  },
  {
    q: 'What is SCIg (subcutaneous immunoglobulin) and is it better than IVIG for CIDP?',
    a: 'SCIg (subcutaneous immunoglobulin) delivers immunoglobulin through a small needle under the skin at home, typically weekly. Hizentra and Cuvitru are both FDA-approved for CIDP maintenance. SCIg has several advantages over IV IVIG: patients self-administer at home (no infusion center visits), smaller and more frequent doses mean steadier drug levels (less "wearing off"), and fewer systemic side effects like headache and flushing. The main disadvantage is that it requires training, purchasing a pump, and weekly self-injections. Effectiveness is equivalent to IVIG for maintenance therapy.',
  },
  {
    q: 'Is CIDP curable?',
    a: 'CIDP is not currently curable, but it is treatable. Most patients achieve significant improvement or stabilization with treatment. A subset of patients — estimates range from 10–30% — achieve long-term remission and can eventually stop treatment under careful medical supervision. The majority require ongoing maintenance therapy (IVIG, SCIg, or Vyvgart Hytrulo) indefinitely to prevent relapse. The key goal of treatment is preventing axonal damage — irreversible nerve fiber loss that causes permanent weakness — by controlling inflammation early and consistently.',
  },
  {
    q: 'How often do CIDP flare-ups occur and what triggers them?',
    a: 'CIDP follows different courses in different patients. Some experience a steadily progressive course without clear remissions. Others have a relapsing-remitting pattern with distinct flares. Common flare triggers include: infections (especially respiratory illnesses), stress, tapering or skipping treatment, and surgery. The most common sign of a flare is returning symptoms that had previously improved — increased leg weakness, numbness, balance problems, or fatigue. If you notice these in the days before your scheduled IVIG infusion, this "wearing off" pattern is important to report to your neurologist as it may indicate a need for dose or interval adjustment.',
  },
  {
    q: 'What are the current CIDP clinical trials in 2025?',
    a: 'Multiple Phase 2 and Phase 3 trials are actively enrolling CIDP patients in 2025: Riliprubart (Sanofi) — a complement C1s inhibitor; Phase 3 trials VITALIZE (NCT06290141) and MOBILIZE (NCT06290128). Empasiprubart (UCB) — a BTK inhibitor; Phase 3 trials EMNERGIZE and EMVIGORATE expected to open in 2025. IMVT-1402 (Immunovant) — an FcRn blocker; Phase 2b trial AMPLIFI (NCT07032662). TAK-411 (Takeda) — Phase 2 trial CASCA. DNTH103 — Phase trial CAPTIVATE. Search ClinicalTrials.gov for "CIDP" with status "Recruiting," or contact the GBS/CIDP Foundation at 1-866-224-3301 for trial matching help.',
  },
  {
    q: 'How do I appeal an insurance denial for IVIG or Vyvgart Hytrulo?',
    a: 'If your insurer denies IVIG, SCIg, or Vyvgart Hytrulo for CIDP, you have the right to appeal. Key steps: (1) Request the denial reason in writing (the EOB or denial letter). (2) Ask your neurologist to submit a written appeal citing the EAN/PNS 2021 guideline (Level A evidence for IVIG) and the FDA-approved indication. (3) Include your nerve conduction study results, INCAT or MRC functional scores, and documentation of clinical need. (4) If the denial is based on step therapy (requiring steroids first), document any contraindications — especially pure motor CIDP, where steroids may worsen the condition. (5) Request a peer-to-peer review call between your neurologist and the insurance medical director. (6) If internal appeals fail, file for external independent review through your state insurance commissioner — this is a right under the Affordable Care Act.',
  },
  {
    q: 'What questions should I ask my neurologist at my next CIDP appointment?',
    a: 'Prepare these questions before your appointment: About diagnosis — Do I have typical CIDP or a variant? Should I be tested for paranodal antibodies (anti-NF155, anti-CNTN1)? About treatment — Is my current treatment working based on my nerve conduction studies and functional scores? Am I noticing wearing off? Could I switch to SCIg or Vyvgart Hytrulo? About prognosis — Is my CIDP stable, improving, or progressing? Is there any chance of remission? About alternatives — Are there clinical trials I might qualify for? About insurance — Is my prior authorization due for renewal? Can your office help me appeal if my insurer denies treatment? Write your most important question at the top — appointments are short.',
  },
  {
    q: 'What is the difference between IVIG and plasma exchange for CIDP?',
    a: 'Both IVIG and plasma exchange (plasmapheresis) are effective for acute CIDP treatment, but work differently. IVIG supplies external antibodies that modulate the immune system — it builds up and works gradually over days. Plasma exchange physically removes blood plasma (which contains the harmful antibodies) and replaces it with albumin solution — it works faster, sometimes showing improvement within days. Plasma exchange requires central line access, is done in a hospital or specialized center over 3–5 sessions across 1–2 weeks, and has higher risk of procedural complications. IVIG is more practical for long-term maintenance. Plasma exchange is preferred when IVIG is contraindicated (e.g., IgA deficiency), when rapid response is needed, or when IVIG has failed.',
  },
  {
    q: 'What are the side effects of IVIG for CIDP?',
    a: 'IVIG is generally well-tolerated, but side effects occur in a significant minority of patients. Common mild-to-moderate side effects (during or shortly after infusion): headache (most common — often from rapid infusion), fatigue, low-grade fever or chills, nausea, flushing, and muscle aches. These can usually be reduced by slowing the infusion rate or pre-medicating with acetaminophen and diphenhydramine (Benadryl). Serious but rare side effects include: aseptic meningitis (severe headache, neck stiffness 12–24 hours after infusion), thromboembolic events (blood clots — risk is higher with high-dose IVIG, especially in older patients or those with cardiovascular risk factors), hemolytic anemia (destruction of red blood cells), and acute kidney injury (more common with sucrose-stabilized IVIG formulations — your infusion center should use sucrose-free products if you have kidney disease). Anaphylaxis is rare but possible — patients with IgA deficiency must be identified before IVIG because they can have severe reactions to trace IgA in the product. If headaches after IVIG are severe or persistent, tell your neurologist — this is the most common reason patients switch to SCIg or Vyvgart Hytrulo.',
  },
  {
    q: 'What is the difference between CIDP and MS (multiple sclerosis)?',
    a: 'CIDP and MS are both autoimmune demyelinating diseases — meaning the immune system attacks myelin — but they affect completely different parts of the nervous system, which is why symptoms, diagnosis, and treatment differ. CIDP attacks the peripheral nervous system (nerves outside the brain and spinal cord): symptoms are primarily limb weakness, loss of reflexes, and numbness/tingling in the hands and feet. MS attacks the central nervous system (brain and spinal cord): symptoms can include vision loss (optic neuritis), coordination problems, bladder dysfunction, cognitive changes, Lhermitte\'s sign (electric shock sensation on neck flexion), and fatigue. Diagnosis also differs: CIDP is confirmed with nerve conduction studies (NCS/EMG) showing peripheral nerve demyelination; MS is diagnosed primarily by MRI showing white matter lesions in the brain and spinal cord. Treatments are distinct: CIDP uses IVIG, SCIg, Vyvgart Hytrulo, corticosteroids, and plasma exchange; MS uses disease-modifying therapies (DMTs) such as interferons, glatiramer acetate, natalizumab, or ocrelizumab. In rare cases, patients have been diagnosed with both conditions simultaneously. If your neurologist is uncertain whether your symptoms are peripheral (CIDP) or central (MS), an MRI of the brain and spine can help distinguish them.',
  },
  {
    q: 'What does IVIG "wearing off" mean in CIDP, and what can I do about it?',
    a: '"Wearing off" describes the return of CIDP symptoms in the days or weeks before your next scheduled IVIG infusion. It happens because IVIG\'s effects are temporary — as the infused immunoglobulin is cleared from the body, the disease activity rebounds. Typical wearing-off symptoms: increased leg weakness, more pronounced numbness or tingling, fatigue, and balance problems — often beginning 1–2 weeks before the infusion is due. Wearing off is clinically significant because it means the current dosing interval is too long for your disease activity, and repeated sub-therapeutic periods may allow ongoing nerve damage. What to do: (1) Document your symptoms on a calendar — note which day of your cycle symptoms return and how severe they are. This data is essential for your neurologist to justify a dosing change to your insurer. (2) Tell your neurologist — they can shorten the infusion interval (e.g., from every 4 weeks to every 3 weeks) or increase the dose. (3) Consider switching to subcutaneous immunoglobulin (SCIg) — because SCIg is given weekly in smaller doses, it maintains more consistent blood levels and largely eliminates the wearing-off pattern. (4) Ask about Vyvgart Hytrulo — weekly subcutaneous injections with a different mechanism of action (FcRn blockade) that does not have the same wearing-off dynamic as IgG replacement.',
  },
];

// FAQPage structured data — this generates rich snippet FAQ entries in Google search
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
};

// BreadcrumbList for FAQ page
const breadcrumbData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cidpnavigator.com' },
    { '@type': 'ListItem', position: 2, name: 'CIDP FAQ', item: 'https://cidpnavigator.com/faq' },
  ],
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      {/* Nav */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              CN
            </div>
            <span className="font-semibold text-slate-900">CIDP Treatment Navigator</span>
          </Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link href="/faq" className="hover:text-blue-600 font-medium text-blue-600">FAQ</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-400 mb-4">
          <Link href="/" className="hover:text-slate-600">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-600">CIDP FAQ</span>
        </nav>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          CIDP Frequently Asked Questions
        </h1>
        <p className="text-slate-500 text-sm mb-2">
          Common questions about CIDP symptoms, diagnosis, treatments, insurance, and clinical trials — answered based on the 2021 EAN/PNS clinical practice guideline.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-8">
          <p className="text-xs text-amber-800">
            <strong>Educational use only.</strong> These answers cannot replace your neurologist. Use them to prepare for your appointments.
          </p>
        </div>

        {/* Ask the AI CTA */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
          <div className="text-2xl">🧠</div>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Have a question not listed here?</p>
            <p className="text-xs text-blue-700 mb-2">
              Ask the AI assistant — it answers detailed questions about your specific situation, treatment options, and more.
            </p>
            <Link
              href="/"
              className="inline-block text-xs bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ask the AI →
            </Link>
          </div>
        </div>

        {/* Ad above FAQ content */}
        <AdUnit adSlot="2233445566" adFormat="horizontal" className="mb-8" />

        {/* FAQ list */}
        <div className="space-y-6">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <h2 className="text-sm font-semibold text-slate-900 px-5 py-4 bg-slate-50 border-b border-slate-100">
                {q}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed px-5 py-4">
                {a}
              </p>
            </div>
          ))}
        </div>

        {/* Mid-content ad */}
        <AdUnit adSlot="3344556677" adFormat="rectangle" className="my-10" />

        {/* Sources */}
        <div className="mt-8 p-4 bg-slate-100 rounded-xl text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-2">Sources</p>
          <ul className="space-y-1">
            <li>van den Bergh PYK, et al. EAN/PNS Guideline on CIDP. <em>Eur J Neurol.</em> 2021;28(11):3556–3583.</li>
            <li>FDA. Approval of efgartigimod alfa and hyaluronidase-qvfc (Vyvgart Hytrulo) for CIDP. June 2024.</li>
            <li>GBS|CIDP Foundation International. Patient resources. gbs-cidp.org</li>
            <li>ClinicalTrials.gov. Active recruiting CIDP studies. 2025.</li>
          </ul>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CIDP Treatment Navigator. Educational use only — not medical advice.</p>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-slate-600">Home</Link>
            <Link href="/faq" className="hover:text-slate-600">FAQ</Link>
            <Link href="/about" className="hover:text-slate-600">About</Link>
            <Link href="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
