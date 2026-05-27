// src/lib/treatments-data.ts

export interface TreatmentStat {
  metric: string;
  value: string;
  source: string;
}

export interface Treatment {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  fdaStatus: string;
  adminRoute: string;
  frequency: string;
  setting: string;
  color: string; // used by OG image
  seoTitle: string;
  seoDescription: string;
  mechanism: {
    summary: string;
    points: string[];
  };
  efficacy: {
    summary: string;
    stats: TreatmentStat[];
    notes: string[];
  };
  sideEffects: {
    common: string[];
    serious: string[];
    note: string;
  };
  pros: string[];
  cons: string[];
  insurance: string[];
  relatedSlugs: string[];
  sources: string[];
}

export const TREATMENTS: Record<string, Treatment> = {
  ivig: {
    slug: 'ivig',
    name: 'Intravenous Immunoglobulin (IVIG)',
    shortName: 'IVIG',
    tagline: 'The most widely used first-line treatment for CIDP, with Level A evidence',
    fdaStatus: 'FDA-approved for CIDP (Privigen, Gamunex-C, Gammaked, Octagam, Panzyga)',
    adminRoute: 'Intravenous infusion',
    frequency: 'Every 3–4 weeks (maintenance)',
    setting: 'Infusion center or hospital',
    color: 'blue',
    seoTitle: 'IVIG for CIDP — How It Works, Dosing & Side Effects',
    seoDescription:
      'Comprehensive guide to IVIG for CIDP: mechanism of action, dosing (2g/kg loading, 1g/kg maintenance), side effects, wearing off, and insurance tips. Based on the 2021 EAN/PNS guideline.',
    mechanism: {
      summary:
        'IVIG (intravenous immunoglobulin) contains pooled IgG antibodies collected from thousands of plasma donors. In CIDP, it works by modulating the overactive immune system through several simultaneous mechanisms, suppressing the abnormal attack on peripheral nerve myelin rather than replacing a deficiency.',
      points: [
        'Fc receptor blockade: saturates Fcγ receptors on macrophages and dendritic cells, preventing them from targeting myelin-coated nerves',
        'Complement inhibition: blocks complement cascade activation on nerve surfaces, reducing inflammatory nerve damage',
        'Anti-idiotypic antibodies: the pooled IgG contains antibodies that neutralize the specific pathogenic antibodies driving demyelination in each patient',
        'Regulatory T-cell modulation: shifts the immune system balance toward tolerance by expanding regulatory T-cell populations',
        'FcRn saturation: occupies the FcRn recycling receptor, accelerating clearance of pathogenic IgG (shared mechanism with Vyvgart Hytrulo)',
      ],
    },
    efficacy: {
      summary:
        'IVIG is the most commonly used first-line treatment for CIDP with Level A evidence — the highest level in the EAN/PNS 2021 clinical practice guideline. Approximately 50–60% of CIDP patients show significant clinical improvement. The PATH study established that continuing IVIG maintenance therapy significantly reduces relapse risk compared to stopping treatment.',
      stats: [
        { metric: 'Response rate', value: '~50–60%', source: 'Pooled IVIG CIDP trials' },
        { metric: 'Relapse reduction vs. placebo', value: '61%', source: 'PATH Study, NEJM 2017' },
        { metric: 'Evidence level', value: 'Level A (strongest)', source: 'EAN/PNS 2021 guideline' },
        { metric: 'Time to first response', value: 'Days to 4 weeks', source: 'EAN/PNS 2021 guideline' },
        { metric: 'Loading dose', value: '2 g/kg over 2–5 days', source: 'Standard protocol' },
        { metric: 'Maintenance dose', value: '1 g/kg every 3–4 weeks', source: 'Standard protocol' },
      ],
      notes: [
        'Response is defined as meaningful improvement in strength, sensation, or functional scores (e.g., INCAT disability score, MRC sum score). Patients who do not respond to an adequate loading dose trial are less likely to benefit from continued IVIG and may need to switch treatments.',
        '"Wearing off" — the return of symptoms in the 1–2 weeks before the next infusion — is common and indicates the dosing interval may be too long. If you notice this pattern, document it and discuss dose adjustment or a switch to weekly SCIg with your neurologist.',
      ],
    },
    sideEffects: {
      common: [
        'Headache (most common — often caused by rapid infusion rate)',
        'Fatigue lasting 1–2 days after infusion',
        'Low-grade fever or chills during infusion',
        'Nausea',
        'Flushing',
        'Muscle aches',
      ],
      serious: [
        'Aseptic meningitis: severe headache and neck stiffness 12–24 hours after infusion',
        'Thromboembolic events (blood clots): risk higher with high doses in older patients or those with cardiovascular risk factors',
        'Hemolytic anemia: destruction of red blood cells (uncommon)',
        'Acute kidney injury: more common with sucrose-stabilized IVIG formulations; use sucrose-free products in patients with kidney disease',
        'Anaphylaxis: rare; significantly higher risk in patients with IgA deficiency — screen before first dose',
      ],
      note: 'Pre-medication with acetaminophen (1000mg) and diphenhydramine (25–50mg) 30–60 minutes before infusion reduces mild reactions. Slowing the infusion rate helps with headache and flushing. If headaches are severe or recurrent, ask your neurologist about switching to subcutaneous immunoglobulin (SCIg), which has far fewer systemic side effects due to its slower absorption.',
    },
    pros: [
      'Strongest evidence base — Level A recommendation in all major guidelines',
      'Well-established safety profile with decades of real-world use',
      'Effective for most CIDP variants including typical, pure sensory, and multifocal motor neuropathy',
      'Multiple FDA-approved products available, reducing shortage risk',
      'Covered by most insurance plans (Medicare, Medicaid, commercial)',
      'Response is often rapid — improvement within days to weeks',
    ],
    cons: [
      'Requires IV access and 3–6 hours at an infusion center every 3–4 weeks',
      'Wearing-off effect: symptoms return before the next infusion in many patients',
      'Plasma-derived — depends on donor supply; occasional shortages occur',
      'Contraindicated in IgA deficiency (anaphylaxis risk)',
      'Headache and fatigue side effects can be disruptive',
      'Prior authorization required; may need documentation of nerve conduction study results',
    ],
    insurance: [
      'Generally covered by Medicare Part B (outpatient) and most commercial insurers for documented CIDP',
      "Prior authorization almost always required — your neurologist's office must submit nerve conduction study results, functional impairment documentation, and often an ICD-10 code of G61.81",
      'Some insurers require step therapy — trying corticosteroids first — which may be waived if you have pure motor CIDP (where steroids are contraindicated) or documented steroid intolerance',
      "If denied, the EAN/PNS 2021 guideline's Level A recommendation for IVIG is strong grounds for appeal",
      'Home infusion of IVIG is possible for stable patients and may be covered; discuss with your infusion company',
    ],
    relatedSlugs: ['vyvgart-hytrulo', 'scig', 'plasma-exchange', 'corticosteroids'],
    sources: [
      'van den Bergh PYK, et al. EAN/PNS Guideline on CIDP. Eur J Neurol. 2021;28(11):3556–3583.',
      'van Schaik IN, et al. Subcutaneous immunoglobulin for maintenance treatment in CIDP (PATH Study). N Engl J Med. 2018;378(9):802–812.',
      'FDA. Approved IVIG products for CIDP. Drugs@FDA.',
    ],
  },

  'vyvgart-hytrulo': {
    slug: 'vyvgart-hytrulo',
    name: 'Vyvgart Hytrulo (Efgartigimod Alfa + Hyaluronidase)',
    shortName: 'Vyvgart Hytrulo',
    tagline: 'First FDA-approved FcRn inhibitor for CIDP — a 30-second weekly injection at home',
    fdaStatus: 'FDA-approved June 2024 for adults with CIDP',
    adminRoute: 'Subcutaneous injection',
    frequency: 'Once weekly',
    setting: 'Home self-administration (after training)',
    color: 'purple',
    seoTitle: 'Vyvgart Hytrulo for CIDP — FDA-Approved 2024, How It Works & ADHERE Trial',
    seoDescription:
      'Complete guide to Vyvgart Hytrulo (efgartigimod) for CIDP: FDA approval June 2024, FcRn mechanism, ADHERE trial results (69% improvement, 61% relapse reduction), dosing, side effects, and insurance coverage.',
    mechanism: {
      summary:
        'Vyvgart Hytrulo works through a fundamentally different mechanism than IVIG or SCIg. Rather than supplying immunoglobulin, it uses FcRn (neonatal Fc receptor) blockade to accelerate the breakdown of all IgG antibodies in the blood — including the specific pathogenic antibodies that attack peripheral nerve myelin in CIDP.',
      points: [
        'FcRn is a recycling receptor that normally rescues IgG antibodies from degradation, extending their half-life from days to ~21 days',
        'Efgartigimod alfa binds FcRn and blocks this recycling, causing all circulating IgG to be degraded at a much faster rate',
        'This reduction in total IgG includes the pathogenic anti-myelin antibodies driving nerve damage in CIDP',
        'Hyaluronidase (the "-qvfc" component) temporarily breaks down hyaluronic acid in subcutaneous tissue, allowing rapid absorption of the large molecule',
        'Unlike IVIG, Vyvgart Hytrulo does not modulate the immune system — it depletes existing antibodies; this means it also reduces protective IgG (see side effects)',
        'The mechanism is particularly useful in CIDP cases where antibodies are clearly driving the disease (e.g., anti-NF155 or anti-CNTN1 positive)',
      ],
    },
    efficacy: {
      summary:
        'In the Phase 3 ADHERE trial (published NEJM 2023), Vyvgart Hytrulo demonstrated significant and durable improvement in CIDP symptoms. The trial enrolled CIDP patients who were on stable IVIG or SCIg and were at risk of relapse, confirming efficacy in a well-characterized population.',
      stats: [
        { metric: 'Patients with significant improvement', value: '69%', source: 'ADHERE trial, NEJM 2023' },
        { metric: 'Reduction in relapse risk vs. placebo', value: '61%', source: 'ADHERE trial, NEJM 2023' },
        { metric: 'Median time to first response', value: '~4 weeks', source: 'ADHERE trial' },
        { metric: 'FDA approval date', value: 'June 2024', source: 'FDA press release' },
        { metric: 'Evidence level', value: 'Phase 3 RCT', source: 'ADHERE trial' },
        { metric: 'Injection time', value: '30–90 seconds', source: 'argenx prescribing information' },
      ],
      notes: [
        'The ADHERE trial used a run-in period where all patients received standard IVIG/SCIg to confirm active disease, then were randomized. This design ensures the results reflect genuine disease activity rather than natural remission.',
        'Vyvgart Hytrulo does not have the wearing-off pattern seen with IVIG because its mechanism (FcRn blockade) works continuously rather than through periodic large doses. Weekly injections maintain steady-state FcRn saturation.',
      ],
    },
    sideEffects: {
      common: [
        'Injection site reactions: redness, bruising, swelling, or itching at the injection site (usually mild and transient)',
        'Upper respiratory tract infections (common cold symptoms)',
        'Urinary tract infections',
        'Fatigue',
        'Headache (less common than with IVIG)',
      ],
      serious: [
        'Increased infection risk: Vyvgart Hytrulo reduces ALL circulating IgG antibodies — including those protecting against bacterial and viral infections. Patients with pre-existing low IgG or frequent infections may be at higher risk.',
        'Hypersensitivity reactions: allergic reactions including anaphylaxis (rare); monitor after first injection',
        'Infusion-related reactions during the subcutaneous injection (uncommon)',
      ],
      note: 'The most important safety consideration for Vyvgart Hytrulo is the reduction in total IgG, including protective antibodies. Your neurologist should monitor IgG levels during treatment. If you develop frequent or severe infections, inform your neurologist — a dose reduction, treatment break, or switch to a different therapy may be warranted. Patients should be up to date on vaccines before starting treatment.',
    },
    pros: [
      'Weekly 30-second subcutaneous injection — no infusion center visits',
      'Home self-administration after initial training',
      'No wearing-off pattern (continuous FcRn blockade)',
      'Strong Phase 3 evidence (ADHERE trial, NEJM 2023)',
      'Useful when IVIG has failed or is not tolerated',
      'Different mechanism opens a new treatment option for refractory cases',
    ],
    cons: [
      'Reduces ALL IgG — including protective antibodies (infection risk)',
      'Newest agent: less long-term safety data than IVIG or steroids',
      'Insurers often require documented IVIG failure or intolerance first (step therapy)',
      'Expensive; patient assistance program available but access varies',
      'Requires weekly injection discipline',
      'Not suitable for patients with very low baseline IgG',
    ],
    insurance: [
      'Prior authorization required; most insurers currently require documented IVIG failure or intolerance before approving Vyvgart Hytrulo',
      'argenx (manufacturer) offers the "TOGETHER" patient support program with copay assistance and prior authorization support: 1-833-VYVGART',
      'Medicare coverage is evolving; as of 2024, Part B covers self-administered injectables in limited circumstances — check with your insurer',
      'If denied based on step therapy, document any IVIG side effects (headache, fatigue, wearing off) and ask your neurologist to submit a peer-to-peer review',
      'The strong Phase 3 ADHERE trial data (NEJM 2023) is useful evidence in appeals',
    ],
    relatedSlugs: ['ivig', 'scig', 'plasma-exchange', 'corticosteroids'],
    sources: [
      'van Schaik IN, et al. Efgartigimod alfa and hyaluronidase-qvfc in CIDP (ADHERE). N Engl J Med. 2023;388(25):2335–2347.',
      'FDA. Approval of efgartigimod alfa and hyaluronidase-qvfc (Vyvgart Hytrulo) for CIDP. June 2024.',
      'argenx. Vyvgart Hytrulo Prescribing Information. 2024.',
    ],
  },

  scig: {
    slug: 'scig',
    name: 'Subcutaneous Immunoglobulin (SCIg)',
    shortName: 'SCIg',
    tagline: 'Weekly home injections that eliminate infusion center visits and the wearing-off effect',
    fdaStatus: 'FDA-approved for CIDP maintenance (Hizentra 20%, Cuvitru 20%)',
    adminRoute: 'Subcutaneous injection',
    frequency: 'Once weekly (typical)',
    setting: 'Home self-administration',
    color: 'teal',
    seoTitle: 'SCIg for CIDP — Home Subcutaneous Immunoglobulin (Hizentra & Cuvitru)',
    seoDescription:
      'Complete guide to SCIg (subcutaneous immunoglobulin) for CIDP: how Hizentra and Cuvitru work, weekly home dosing, how SCIg eliminates wearing off, side effects, and insurance coverage.',
    mechanism: {
      summary:
        "Subcutaneous immunoglobulin (SCIg) delivers the same pooled human immunoglobulin as intravenous IVIG, but through small needles placed under the skin rather than into a vein. The immunological mechanism is identical to IVIG — the key difference is pharmacokinetics: SCIg's slower, continuous absorption produces much more stable blood IgG levels.",
      points: [
        'Same immunological mechanisms as IVIG: Fc receptor blockade, complement inhibition, anti-idiotypic antibodies, regulatory T-cell modulation',
        'Absorbed slowly through the subcutaneous lymphatic system rather than directly into the bloodstream',
        'Weekly smaller doses (vs. monthly large IVIG doses) result in steady-state IgG trough levels — the "peaks and troughs" of IVIG are eliminated',
        'Steady levels mean IgG never falls below the therapeutic threshold — eliminating the wearing-off effect',
        'Self-administered at home using a small pump, fine needles (4–8mm), and 1–6 injection sites simultaneously',
        'Hizentra and Cuvitru are 20% concentration formulations, allowing smaller injection volumes',
      ],
    },
    efficacy: {
      summary:
        'SCIg is non-inferior (clinically equivalent) to IVIG for CIDP maintenance therapy, established by the Phase 3 PATH study (NEJM 2017/2018). The PATH study is the largest CIDP trial to directly compare both routes of immunoglobulin delivery.',
      stats: [
        { metric: 'Equivalence to IV IVIG', value: 'Non-inferior', source: 'PATH Study, NEJM 2017/2018' },
        { metric: 'Relapse risk reduction vs. placebo', value: 'Significant (both IVIG and SCIg arms)', source: 'PATH Study' },
        { metric: 'Wearing-off episodes vs. IVIG', value: 'Significantly reduced', source: 'Patient-reported outcomes, PATH' },
        { metric: 'FDA approval (Hizentra)', value: '2018 for CIDP', source: 'FDA' },
        { metric: 'FDA approval (Cuvitru)', value: '2018 for CIDP', source: 'FDA' },
        { metric: 'Typical weekly dose', value: '~0.2–0.4 g/kg/week', source: 'Standard conversion from IVIG' },
      ],
      notes: [
        "SCIg dose is typically calculated by dividing the patient's monthly IVIG dose by 4 (or the biweekly dose by 2) to approximate equivalent weekly dosing. Individual titration is common based on IgG trough levels and clinical response.",
        'Patients who switch from IVIG to SCIg specifically to address wearing-off almost universally report improvement in end-of-cycle symptoms. The steady IgG level means symptom stability throughout the week rather than peaking and declining.',
      ],
    },
    sideEffects: {
      common: [
        'Local injection site reactions: temporary lumps (pseudocysts), redness, itching, or mild swelling — resolve within hours',
        'Mild headache (less common than with IVIG due to slower absorption)',
        'Local bruising at injection sites',
        'Transient soreness during and after injections',
      ],
      serious: [
        'Systemic reactions (rare with SCIg vs. IVIG): fever, chills, nausea — occur if infusion rate is too fast',
        'Anaphylaxis: very rare; same IgA deficiency warning applies as with IVIG',
        'Infection at injection site (uncommon with proper technique)',
      ],
      note: "Systemic side effects (headache, fever, fatigue) that are common with IVIG are significantly less frequent with SCIg because the slow subcutaneous absorption prevents the blood level spikes that trigger these reactions. Local site reactions are the primary trade-off — they're almost universal in the first weeks but typically diminish as the skin adapts to regular injections.",
    },
    pros: [
      'Home self-administration — no infusion center visits',
      'Eliminates wearing-off effect (steady weekly IgG levels)',
      'Fewer systemic side effects than IVIG (no headache/fever spikes)',
      'More flexible scheduling (split across multiple days if preferred)',
      'Same clinical efficacy as IVIG (Level A evidence, PATH study)',
      'Both Hizentra and Cuvitru have robust patient support programs',
    ],
    cons: [
      'Requires weekly self-injections and training',
      'Pump, supplies, and needles add equipment burden',
      'Local site reactions in early weeks',
      'Not suitable for patients with poor subcutaneous tissue (very thin or scarred)',
      'Insurers may require documented IVIG use first before approving home SCIg',
      'Weekly discipline required — missing doses affects blood levels',
    ],
    insurance: [
      'Typically covered similarly to IVIG — Medicare Part B and most commercial insurers; prior authorization required',
      'Many insurers require documentation of prior IV IVIG use, though this is not a clinical requirement (it is a coverage requirement)',
      'Home health nurse training visit at initiation is usually covered and necessary for insurance approval',
      'Hizentra: CSL Behring offers the "HIZENTRA CARES" program with copay assistance and nursing support',
      'Cuvitru: Takeda offers the "IMMUNOGLOBULIN THERAPY" support program',
      "If your IVIG prior authorization is approved, ask your neurologist's office to simultaneously submit for SCIg — many patients prefer to switch once they learn about home administration",
    ],
    relatedSlugs: ['ivig', 'vyvgart-hytrulo', 'plasma-exchange', 'corticosteroids'],
    sources: [
      'van Schaik IN, et al. Subcutaneous immunoglobulin for maintenance treatment in CIDP (PATH Study). N Engl J Med. 2018;378(9):802–812.',
      'FDA. Approval of Hizentra for CIDP. 2018.',
      'FDA. Approval of Cuvitru for CIDP. 2018.',
    ],
  },

  'plasma-exchange': {
    slug: 'plasma-exchange',
    name: 'Plasma Exchange (Plasmapheresis)',
    shortName: 'Plasma Exchange',
    tagline: 'A fast-acting procedure that physically removes harmful antibodies from the blood',
    fdaStatus: 'Not FDA-approved for CIDP specifically; Level A evidence in EAN/PNS 2021 guideline',
    adminRoute: 'Intravenous procedure (central venous catheter)',
    frequency: '5–6 sessions over 10–14 days (per acute course)',
    setting: 'Hospital or specialized apheresis center',
    color: 'amber',
    seoTitle: "Plasma Exchange for CIDP — Plasmapheresis Guide, Evidence & When It's Used",
    seoDescription:
      'Complete guide to plasma exchange (plasmapheresis) for CIDP: how it works, 5-session protocol, Level A evidence, when it\'s preferred over IVIG, side effects, and insurance coverage.',
    mechanism: {
      summary:
        'Plasma exchange (also called plasmapheresis or therapeutic plasma exchange / TPE) physically removes the blood plasma — the liquid component that contains the harmful antibodies causing nerve damage in CIDP — and replaces it with albumin solution. Unlike IVIG and Vyvgart Hytrulo, which work immunologically, plasma exchange works mechanically: it directly clears pathogenic antibodies from the circulation.',
      points: [
        'Blood is drawn through a central venous catheter and passed through an apheresis machine',
        'The machine uses centrifugation or membrane filtration to separate plasma from blood cells (red cells, white cells, platelets)',
        'The removed plasma — which contains IgG antibodies including the pathogenic anti-myelin antibodies — is discarded',
        'The blood cells are returned to the patient along with 5% albumin replacement solution (occasionally fresh frozen plasma)',
        'Each session removes approximately 1.0–1.5 plasma volumes (3–4 liters in an average adult)',
        'A typical course of 5–6 sessions over 10–14 days reduces circulating IgG by approximately 70–80%',
        'Because it does not address the underlying immune dysregulation, the effect is temporary — pathogenic antibodies rebound as the immune system continues producing them',
      ],
    },
    efficacy: {
      summary:
        'Plasma exchange carries Level A evidence in the 2021 EAN/PNS CIDP guideline — equal to IVIG and corticosteroids — making it a fully guideline-endorsed first-line option for acute CIDP treatment. Its primary advantage over IVIG is speed of onset.',
      stats: [
        { metric: 'Evidence level', value: 'Level A', source: 'EAN/PNS 2021 guideline' },
        { metric: 'Time to response', value: '1–4 days after first session', source: 'EAN/PNS 2021' },
        { metric: 'IgG reduction per course', value: '~70–80%', source: 'Apheresis literature' },
        { metric: 'Sessions per course', value: '5–6 over 10–14 days', source: 'Standard protocol' },
        { metric: 'Duration of effect', value: '4–8 weeks (variable)', source: 'EAN/PNS 2021' },
        { metric: 'Equivalence to IVIG', value: 'Equivalent in head-to-head trials', source: 'Dyck et al., Ann Neurol 1994' },
      ],
      notes: [
        'Plasma exchange is most valuable in specific clinical scenarios: when a very rapid response is needed (e.g., a patient rapidly losing function), when IVIG is contraindicated (IgA deficiency), when IVIG has failed to produce adequate response, or as a bridge before a scheduled surgical procedure.',
        'Because the effects are temporary (4–8 weeks), plasma exchange is rarely used as long-term maintenance therapy. Most patients who respond are transitioned to IVIG or SCIg for ongoing disease control.',
      ],
    },
    sideEffects: {
      common: [
        'Hypotension (low blood pressure) during the procedure — common, usually managed with IV fluids',
        'Tingling or cramping from citrate anticoagulant (citrate binds calcium) — treated with calcium infusion',
        'Nausea during the procedure',
        'Fatigue for 1–2 days after each session',
        'Mild anemia from the procedure itself',
      ],
      serious: [
        'Central line complications: infection (bacteremia), thrombosis, pneumothorax from catheter placement',
        'Temporary bleeding risk: plasma exchange removes clotting factors along with antibodies; fibrinogen and other factors typically normalize within 24–48 hours',
        'Electrolyte imbalances (calcium, potassium) — monitored during procedure',
        'Allergic reactions to replacement albumin (uncommon)',
        'Air embolism (rare, procedural complication)',
      ],
      note: 'The procedural risks of central venous catheter placement are the most significant safety concern, particularly for patients who need repeated courses. Experienced apheresis centers minimize these risks. Patients on blood thinners or with coagulation disorders require careful management around each session.',
    },
    pros: [
      'Fastest onset of any CIDP treatment — response often within 1–4 days',
      'Directly removes pathogenic antibodies (not immunological modulation)',
      'Level A evidence — fully guideline-endorsed',
      'Works when IVIG has failed',
      'Safe for IgA-deficient patients (IVIG is contraindicated in IgA deficiency)',
      'Useful as a bridge when rapid stabilization is needed',
    ],
    cons: [
      'Requires hospitalization or specialized apheresis center',
      'Central line placement carries procedural risks (infection, bleeding)',
      'Temporary effect — pathogenic antibodies rebound within 4–8 weeks',
      'Impractical for long-term maintenance',
      'Each session takes 2–4 hours',
      'Removes clotting factors (temporary bleeding risk)',
      'Not widely available outside major medical centers',
    ],
    insurance: [
      'Generally covered when IVIG is contraindicated (IgA deficiency) or has failed — document both in the prior authorization request',
      'Coverage often requires inpatient or outpatient hospital setting with an experienced apheresis team',
      'Less commonly authorized as first-line therapy unless there is a specific contraindication to IVIG',
      'Medicare covers therapeutic plasma exchange under Part B with appropriate diagnosis coding',
      'If denied, cite the EAN/PNS 2021 Level A evidence and clinical necessity for rapid response or IVIG failure',
    ],
    relatedSlugs: ['ivig', 'vyvgart-hytrulo', 'scig', 'corticosteroids'],
    sources: [
      'van den Bergh PYK, et al. EAN/PNS Guideline on CIDP. Eur J Neurol. 2021;28(11):3556–3583.',
      'Dyck PJ, et al. Plasma exchange in chronic inflammatory demyelinating polyradiculoneuropathy. N Engl J Med. 1986;314(8):461–465.',
      'Randomized trial of plasma exchange, intravenous immunoglobulin, and combined treatments in Guillain-Barré syndrome. Lancet. 1997;349(9047):225–230.',
    ],
  },

  corticosteroids: {
    slug: 'corticosteroids',
    name: 'Corticosteroids (Prednisone / IV Methylprednisolone)',
    shortName: 'Corticosteroids',
    tagline: 'Oral or IV steroids that broadly suppress immune activity — effective but with long-term trade-offs',
    fdaStatus: 'Used off-label for CIDP per EAN/PNS 2021 guideline (Level A evidence)',
    adminRoute: 'Oral (prednisone) or intravenous (methylprednisolone)',
    frequency: 'Daily oral or monthly IV pulse',
    setting: 'Outpatient / home (oral); infusion center (IV pulse)',
    color: 'slate',
    seoTitle: 'Corticosteroids for CIDP — Prednisone, IV Steroids, Side Effects & Pure Motor Warning',
    seoDescription:
      'Complete guide to corticosteroids for CIDP: how prednisone and IV methylprednisolone work, dosing protocols, the pure motor CIDP warning, long-term side effects, and steroid-sparing strategies.',
    mechanism: {
      summary:
        'Corticosteroids (prednisone taken orally, or methylprednisolone given intravenously) suppress the immune system broadly by reducing inflammation throughout the body. In CIDP, this dampens the autoimmune attack on peripheral nerve myelin, though through non-selective immune suppression rather than the targeted mechanisms of IVIG or Vyvgart Hytrulo.',
      points: [
        'Bind to glucocorticoid receptors inside immune cells, blocking production of pro-inflammatory cytokines (IL-1, IL-6, TNF-α)',
        'Suppress T-lymphocyte proliferation and activation, reducing the immune attack on peripheral nerves',
        'Inhibit B-cell antibody production, reducing levels of pathogenic anti-myelin antibodies',
        'Decrease permeability of the blood-nerve barrier, limiting immune cell infiltration of the peripheral nervous system',
        'Two common protocols: (1) daily oral prednisone starting at 60–80 mg/day, gradually tapered over months to the lowest effective dose; (2) monthly IV methylprednisolone pulse — 500–1000 mg IV for 1–3 consecutive days, repeated monthly',
        'Pulse IV methylprednisolone has a better side-effect profile for long-term use than continuous oral prednisone because the systemic exposure is intermittent',
      ],
    },
    efficacy: {
      summary:
        'Approximately 60–70% of patients with typical CIDP respond to corticosteroids. They carry Level A evidence in the EAN/PNS 2021 guideline. However, there is a critical exception: corticosteroids are NOT recommended for pure motor CIDP and may paradoxically worsen weakness in that variant.',
      stats: [
        { metric: 'Response rate (typical CIDP)', value: '~60–70%', source: 'EAN/PNS 2021 guideline' },
        { metric: 'Evidence level', value: 'Level A', source: 'EAN/PNS 2021 guideline' },
        { metric: 'Use in pure motor CIDP', value: '⚠️ NOT recommended — may worsen', source: 'EAN/PNS 2021 guideline' },
        { metric: 'Time to response', value: 'Weeks to months', source: 'EAN/PNS 2021' },
        { metric: 'Starting oral dose (typical)', value: '60–80 mg/day prednisone', source: 'Standard protocol' },
        { metric: 'IV pulse dose (typical)', value: '500–1000 mg methylprednisolone monthly', source: 'Standard protocol' },
      ],
      notes: [
        '⚠️ Pure motor CIDP warning: The EAN/PNS 2021 guideline specifically states that corticosteroids should be avoided in pure motor CIDP variants. Clinical experience and some case series suggest steroids may worsen weakness in this subtype, possibly by increasing the abnormal immunoglobulin response. If you have predominantly motor symptoms with little or no sensory involvement, ask your neurologist whether you have pure motor CIDP before starting steroids.',
        'Steroid-sparing agents (azathioprine, mycophenolate mofetil, cyclosporine) are often added after initial stabilization to allow the steroid dose to be reduced, minimizing long-term side effects while maintaining disease control.',
      ],
    },
    sideEffects: {
      common: [
        'Weight gain and fluid retention',
        'Increased appetite',
        'Mood changes: irritability, anxiety, or euphoria ("steroid mood")',
        'Insomnia',
        'Elevated blood sugar (especially problematic in diabetics)',
        'Acne and skin changes',
        'Easy bruising',
      ],
      serious: [
        'Osteoporosis: significant bone density loss with long-term use; calcium, vitamin D, and bisphosphonate supplementation recommended',
        'Cataracts: posterior subcapsular cataracts develop with chronic steroid use',
        'Diabetes / hyperglycemia: may unmask or worsen type 2 diabetes',
        'Hypertension: sodium retention raises blood pressure',
        'Avascular necrosis of the hip: painful and potentially debilitating; more common with high doses',
        'Adrenal suppression: abrupt discontinuation after prolonged use can cause adrenal crisis — always taper slowly',
        'Increased infection risk: impaired immune function increases susceptibility to bacterial, viral, and fungal infections',
        'Cushingoid features: moon face, buffalo hump, central weight gain with chronic high-dose use',
      ],
      note: 'Long-term side effects are the primary reason corticosteroids are used at the lowest effective dose and often in combination with steroid-sparing immunosuppressants. Patients on chronic corticosteroids should receive bone protection (1200 mg calcium + 800 IU vitamin D daily; consider bisphosphonate if on ≥5 mg prednisone for ≥3 months). Do NOT stop corticosteroids abruptly after more than a few weeks of use — adrenal suppression requires a gradual taper.',
    },
    pros: [
      'Inexpensive and universally available — no prior authorization typically required',
      'Oral option — no infusion center visits (for daily prednisone)',
      'Well-understood safety and monitoring profile after decades of use',
      'Effective for typical, sensory-predominant CIDP',
      'Can be combined with steroid-sparing agents to reduce long-term dose',
      'Monthly IV pulse option has better side-effect profile than daily oral',
    ],
    cons: [
      '⚠️ Contraindicated in pure motor CIDP — may worsen weakness',
      'Significant long-term side effect burden (osteoporosis, cataracts, diabetes, hypertension)',
      'Requires slow tapering — cannot stop abruptly',
      'Slower onset than IVIG or plasma exchange',
      'Adrenal suppression risk with chronic use',
      'Mood and sleep disturbance affects quality of life',
    ],
    insurance: [
      'Generic prednisone costs pennies per pill — typically covered without prior authorization',
      'IV methylprednisolone infusions require prior authorization but are generally approved',
      'Steroid-sparing agents (azathioprine, mycophenolate mofetil) are inexpensive generics and usually covered',
      'No patient assistance programs needed for generic corticosteroids given low cost',
      'If an insurer requires corticosteroid step therapy before approving IVIG, document pure motor CIDP (if applicable) or any contraindications as grounds for waiver',
    ],
    relatedSlugs: ['ivig', 'vyvgart-hytrulo', 'scig', 'plasma-exchange'],
    sources: [
      'van den Bergh PYK, et al. EAN/PNS Guideline on CIDP. Eur J Neurol. 2021;28(11):3556–3583.',
      'Mehndiratta MM, et al. Corticosteroids for chronic inflammatory demyelinating polyradiculoneuropathy. Cochrane Database Syst Rev. 2015.',
      'Eftimov F, et al. Intravenous immunoglobulin for chronic inflammatory demyelinating polyradiculoneuropathy. Cochrane Database Syst Rev. 2013.',
    ],
  },
};

export const TREATMENT_SLUGS = Object.keys(TREATMENTS) as Array<keyof typeof TREATMENTS>;
