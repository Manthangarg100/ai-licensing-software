// app/lib/i18n.ts

export const languages = ["en", "hi", "te"] as const;
export type Language = (typeof languages)[number];

type Translations = Record<string, string>;

export const translations: Record<Language, Translations> = {
  /* ======================= ENGLISH ======================= */
  en: {
    /* -------- Language Settings -------- */
    languageSettings: "Language Settings",
    selectLanguage: "Choose your preferred language",

    /* -------- Navbar -------- */
    home: "Home",
    about: "About",
    howItWorks: "How It Works",
    dashboard: "Dashboard",
    login: "Login",
    logout: "Logout",

    /* -------- Sidebar -------- */
    overview: "Overview",
    licenses: "Licenses",
    monitoring: "Monitoring",
    alerts: "Alerts",
    humanReview: "Human Review",
    enforcement: "Enforcement",
    settings: "Settings",

    /* -------- Dashboard Overview -------- */
    dashboardOverview: "Dashboard Overview",
    dashboardDescription:
      "Monitor content usage, AI enforcement, and human reviews in one place.",

    activeLicenses: "Active Licenses",
    regionsCovered: "Regions Covered",
    activeAlerts: "Active Alerts",
    violations: "Violations",

    aiStatus: "Sanrakshak AI Status",
    lastEvaluationRun: "Last Evaluation Run",
    rulesApplied: "Rules Applied",
    aiConfidence: "AI Confidence",

    humanFeedback: "Human Feedback Loop",
    pendingReviews: "Pending Reviews",
    escalations: "Escalations",

    /* -------- Licenses Page -------- */
    licensesDescription:
      "Manage and monitor all active, expired, and violated content licenses.",

    contractId: "Contract ID",
    content: "Content",
    platform: "Platform",
    region: "Region",
    status: "Status",
    expires: "Expires",
    action: "Action",
    view: "View",

    active: "Active",
    expired: "Expired",
    violation: "Violation",

    /* -------- Monitoring Page -------- */
    monitoringDescription:
      "Live tracking of content usage, AI detection, and enforcement alerts.",

    liveMonitoring: "Live Content Monitoring",
    withinLicense: "Within License",
    violationDetected: "Violation Detected",
    underReview: "Under Review",

    enforcementStatus: "Enforcement Status",
    aiRulesActive: "AI Rules Engine: Active",
    continuousScanning: "Continuous Platform Scanning",
    humanReviewPending: "Human Review Queue: Pending",
    autoEnforcementEnabled: "Auto Enforcement Enabled",

    /* -------- Human Review -------- */
    humanReviewDescription:
      "AI-detected issues that require human verification before enforcement.",

    approveEnforcement: "Approve Enforcement",
    escalate: "Escalate",
    dismiss: "Dismiss",

    humanReviewFootnote:
      "Human decisions override automated actions and are logged for compliance and audit purposes.",

    /* -------- Alerts -------- */
    alertsDescription:
      "Review detected violations, AI confidence levels, and enforcement status.",

    severity: "Severity",
    aiConfidenceLabel: "AI Confidence",

    high: "High",
    medium: "Medium",
    low: "Low",

    actionRequired: "Action Required",
    logged: "Logged",

    alertsFootnote:
      "Violations are detected automatically using Sanrakshak AI’s monitoring engine. High severity alerts may trigger automated enforcement or require human review.",

    /* -------- Enforcement -------- */
    enforcementActions: "Enforcement Actions",
    enforcementDescription:
      "Confirmed violations that required legal, platform, or compliance actions. These actions are initiated after AI detection and human review.",

    actionId: "Action ID",
    actionTaken: "Action Taken",
    date: "Date",

    usageBeyondRegion: "Usage beyond licensed region",
    expiredLicenseUsage: "Expired license usage",
    unauthorizedCommercialUse: "Unauthorized commercial use",

    takedownNoticeSent: "Takedown Notice Sent",
    platformRestriction: "Platform Restriction",
    legalEscalation: "Legal Escalation",

    completed: "Completed",
    inProgress: "In Progress",
    pendingReview: "Pending Review",

    enforcementFootnote:
      "Enforcement actions may include platform takedowns, region blocking, partner notifications, or legal escalation depending on severity.",
  },

  /* ======================= HINDI ======================= */
  hi: {
    languageSettings: "भाषा सेटिंग्स",
    selectLanguage: "अपनी पसंदीदा भाषा चुनें",

    home: "होम",
    about: "परिचय",
    howItWorks: "यह कैसे काम करता है",
    dashboard: "डैशबोर्ड",
    login: "लॉगिन",
    logout: "लॉग आउट",

    overview: "अवलोकन",
    licenses: "लाइसेंस",
    monitoring: "निगरानी",
    alerts: "अलर्ट",
    humanReview: "मानव समीक्षा",
    enforcement: "प्रवर्तन",
    settings: "सेटिंग्स",

    dashboardOverview: "डैशबोर्ड अवलोकन",
    dashboardDescription:
      "एक ही स्थान पर सामग्री उपयोग, एआई प्रवर्तन और मानव समीक्षा की निगरानी करें।",

    activeLicenses: "सक्रिय लाइसेंस",
    regionsCovered: "कवर्ड क्षेत्र",
    activeAlerts: "सक्रिय अलर्ट",
    violations: "उल्लंघन",

    aiStatus: "संरक्षक एआई स्थिति",
    lastEvaluationRun: "अंतिम मूल्यांकन रन",
    rulesApplied: "लागू किए गए नियम",
    aiConfidence: "एआई विश्वास स्तर",

    humanFeedback: "मानव प्रतिक्रिया चक्र",
    pendingReviews: "लंबित समीक्षाएं",
    escalations: "एस्केलेशन",

    licensesDescription:
      "सभी सक्रिय, समाप्त और उल्लंघन किए गए लाइसेंस प्रबंधित करें।",

    contractId: "अनुबंध आईडी",
    content: "सामग्री",
    platform: "प्लेटफ़ॉर्म",
    region: "क्षेत्र",
    status: "स्थिति",
    expires: "समाप्ति",
    action: "कार्रवाई",
    view: "देखें",

    active: "सक्रिय",
    expired: "समाप्त",
    violation: "उल्लंघन",

    monitoringDescription:
      "सामग्री उपयोग, एआई पहचान और प्रवर्तन अलर्ट की लाइव निगरानी।",

    liveMonitoring: "लाइव सामग्री निगरानी",
    withinLicense: "लाइसेंस के भीतर",
    violationDetected: "उल्लंघन पाया गया",
    underReview: "समीक्षा में",

    enforcementStatus: "प्रवर्तन स्थिति",
    aiRulesActive: "एआई नियम इंजन: सक्रिय",
    continuousScanning: "निरंतर प्लेटफ़ॉर्म स्कैनिंग",
    humanReviewPending: "मानव समीक्षा कतार: लंबित",
    autoEnforcementEnabled: "स्वचालित प्रवर्तन सक्षम",

    humanReviewDescription:
      "एआई द्वारा पहचानी गई समस्याएँ जिन्हें मानव सत्यापन की आवश्यकता है।",

    approveEnforcement: "प्रवर्तन स्वीकृत करें",
    escalate: "एस्केलेट करें",
    dismiss: "खारिज करें",

    humanReviewFootnote:
      "मानव निर्णय स्वचालित कार्रवाइयों को ओवरराइड करते हैं और ऑडिट के लिए लॉग किए जाते हैं।",

    alertsDescription:
      "पाए गए उल्लंघनों, एआई विश्वास स्तर और प्रवर्तन स्थिति की समीक्षा करें।",

    severity: "गंभीरता",
    aiConfidenceLabel: "एआई विश्वास",

    high: "उच्च",
    medium: "मध्यम",
    low: "कम",

    actionRequired: "कार्रवाई आवश्यक",
    logged: "लॉग किया गया",

    alertsFootnote:
      "उल्लंघन स्वचालित रूप से संरक्षक एआई द्वारा पहचाने जाते हैं।",

    enforcementActions: "प्रवर्तन कार्रवाइयाँ",
    enforcementDescription:
      "कानूनी या प्लेटफ़ॉर्म कार्रवाई की आवश्यकता वाले पुष्टि किए गए उल्लंघन।",

    actionId: "कार्रवाई आईडी",
    actionTaken: "की गई कार्रवाई",
    date: "तारीख",

    usageBeyondRegion: "लाइसेंस क्षेत्र से बाहर उपयोग",
    expiredLicenseUsage: "समाप्त लाइसेंस उपयोग",
    unauthorizedCommercialUse: "अनधिकृत व्यावसायिक उपयोग",

    takedownNoticeSent: "टेकडाउन नोटिस भेजा गया",
    platformRestriction: "प्लेटफ़ॉर्म प्रतिबंध",
    legalEscalation: "कानूनी वृद्धि",

    completed: "पूर्ण",
    inProgress: "प्रगति में",
    pendingReview: "समीक्षा लंबित",

    enforcementFootnote:
      "गंभीरता के आधार पर प्लेटफ़ॉर्म टेकडाउन या कानूनी कार्रवाई की जा सकती है।",
  },

  /* ======================= TELUGU ======================= */
  te: {
    languageSettings: "భాషా సెట్టింగ్స్",
    selectLanguage: "మీకు ఇష్టమైన భాషను ఎంచుకోండి",

    home: "హోమ్",
    about: "గురించి",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    dashboard: "డాష్‌బోర్డ్",
    login: "లాగిన్",
    logout: "లాగ్ అవుట్",

    overview: "అవలోకనం",
    licenses: "లైసెన్సులు",
    monitoring: "మానిటరింగ్",
    alerts: "అలర్ట్స్",
    humanReview: "మానవ సమీక్ష",
    enforcement: "అమలు",
    settings: "సెట్టింగ్స్",

    dashboardOverview: "డాష్‌బోర్డ్ అవలోకనం",
    dashboardDescription:
      "కంటెంట్ వినియోగం, AI అమలు మరియు మానవ సమీక్షలను ఒకేచోట పర్యవేక్షించండి.",

    activeLicenses: "సక్రియ లైసెన్సులు",
    regionsCovered: "కవర్ చేసిన ప్రాంతాలు",
    activeAlerts: "సక్రియ అలర్ట్లు",
    violations: "ఉల్లంఘనలు",

    aiStatus: "సంరక్షక్ AI స్థితి",
    lastEvaluationRun: "చివరి మూల్యాంకన రన్",
    rulesApplied: "అమలైన నియమాలు",
    aiConfidence: "AI విశ్వసనీయత",

    humanFeedback: "మానవ అభిప్రాయ వ్యవస్థ",
    pendingReviews: "పెండింగ్ సమీక్షలు",
    escalations: "ఎస్కలేషన్లు",

    licensesDescription:
      "సక్రియ, గడువు ముగిసిన మరియు ఉల్లంఘించిన లైసెన్సులను నిర్వహించండి.",

    contractId: "ఒప్పంద ఐడి",
    content: "కంటెంట్",
    platform: "ప్లాట్‌ఫారం",
    region: "ప్రాంతం",
    status: "స్థితి",
    expires: "గడువు",
    action: "చర్య",
    view: "చూడండి",

    active: "సక్రియం",
    expired: "గడువు ముగిసింది",
    violation: "ఉల్లంఘన",

    monitoringDescription:
      "కంటెంట్ వినియోగం, AI గుర్తింపు మరియు అమలు అలర్ట్లను లైవ్‌గా పర్యవేక్షించండి.",

    liveMonitoring: "లైవ్ కంటెంట్ మానిటరింగ్",
    withinLicense: "లైసెన్సు లోపల",
    violationDetected: "ఉల్లంఘన గుర్తించబడింది",
    underReview: "సమీక్షలో",

    enforcementStatus: "అమలు స్థితి",
    aiRulesActive: "AI నియమాలు: సక్రియం",
    continuousScanning: "నిరంతర ప్లాట్‌ఫామ్ స్కానింగ్",
    humanReviewPending: "మానవ సమీక్ష: పెండింగ్",
    autoEnforcementEnabled: "ఆటో అమలు ప్రారంభించబడింది",

    humanReviewDescription:
      "AI గుర్తించిన సమస్యలు మానవ ధృవీకరణ అవసరం.",

    approveEnforcement: "అమలు ఆమోదించండి",
    escalate: "ఎస్కలేట్ చేయండి",
    dismiss: "రద్దు చేయండి",

    humanReviewFootnote:
      "మానవ నిర్ణయాలు ఆటోమేటెడ్ చర్యలను మించినవిగా పరిగణించబడతాయి.",

    alertsDescription:
      "గుర్తించిన ఉల్లంఘనలు, AI విశ్వసనీయత మరియు అమలు స్థితిని సమీక్షించండి.",

    severity: "తీవ్రత",
    aiConfidenceLabel: "AI విశ్వసనీయత",

    high: "అత్యధిక",
    medium: "మధ్యస్థ",
    low: "తక్కువ",

    actionRequired: "చర్య అవసరం",
    logged: "లాగ్ చేయబడింది",

    alertsFootnote:
      "ఉల్లంఘనలు Sanrakshak AI ద్వారా ఆటోమేటిక్‌గా గుర్తించబడతాయి.",

    enforcementActions: "అమలు చర్యలు",
    enforcementDescription:
      "AI గుర్తింపు మరియు మానవ సమీక్ష తర్వాత ప్రారంభించిన చర్యలు.",

    actionId: "చర్య ఐడి",
    actionTaken: "తీసుకున్న చర్య",
    date: "తేదీ",

    usageBeyondRegion: "లైసెన్సు ప్రాంతం మించి వినియోగం",
    expiredLicenseUsage: "గడువు ముగిసిన లైసెన్సు వినియోగం",
    unauthorizedCommercialUse: "అనధికార వాణిజ్య వినియోగం",

    takedownNoticeSent: "టేక్‌డౌన్ నోటీసు పంపబడింది",
    platformRestriction: "ప్లాట్‌ఫామ్ పరిమితి",
    legalEscalation: "చట్టపరమైన చర్య",

    completed: "పూర్తి",
    inProgress: "ప్రగతిలో",
    pendingReview: "సమీక్ష పెండింగ్",

    enforcementFootnote:
      "తీవ్రత ఆధారంగా ప్లాట్‌ఫామ్ టేక్‌డౌన్ లేదా చట్టపరమైన చర్యలు తీసుకోవచ్చు.",
  },
};
