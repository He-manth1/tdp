export type Language = "en" | "te";

export const translations = {
  en: {
    // Common
    previous: "Previous",
    next: "Next",
    submit: "Submit Application",
    submitting: "Submitting...",
    
    // Title
    title: "Cadre Empowerment Application",
    
    // Success
    successTitle: "Application Submitted Successfully!",
    successMessage: "Thank you for submitting your Cadre Empowerment Application. We will review your application and get back to you soon.",
    submitAnother: "Submit Another Application",
    
    // Steps
    steps: {
      personal: "Personal",
      shg: "SHG",
      disability: "Disability",
      business: "Business",
      financial: "Financial",
      project: "Project",
      land: "Land",
      support: "Support",
      documents: "Documents",
    },
    
    // Personal Information
    personal: {
      title: "Personal Information",
      subtitle: "Please provide your personal details",
      fullName: "Full Name",
      age: "Age",
      gender: "Gender",
      casteCategory: "Caste Category",
      education: "Education",
      address: "Address",
      phone: "Phone Number",
      membershipId: "Membership ID",
      village: "Village",
      boothNo: "Booth No",
      mandal: "Mandal",
      selectGender: "Select gender",
      selectCaste: "Select caste category",
      enterFullName: "Enter your full name",
      enterAge: "Enter your age",
      enterEducation: "Enter your education level",
      enterPhone: "Enter your phone number",
      enterAddress: "Enter your complete address",
      enterVillage: "Enter village name",
      enterMandal: "Enter mandal name",
      enterMembershipId: "Enter membership ID (optional)",
      enterBoothNo: "Enter booth number (optional)",
    },
    
    // SHG Information
    shg: {
      title: "SHG Information",
      subtitle: "Self Help Group membership details",
      isShgMember: "Are you an SHG Member?",
      organizationType: "Organization Type",
      groupName: "Group Name",
      selectOrgType: "Select organization type",
      enterGroupName: "Enter group name",
      onlyForFemale: "SHG information is only required for Female applicants.",
    },
    
    // Disability Information
    disability: {
      title: "Disability Information",
      subtitle: "Please provide disability details if applicable",
      isHandicapped: "Do you have a physical disability?",
      handicapType: "Handicap Type",
      enterHandicapType: "Enter type of handicap",
    },
    
    // Business Information
    business: {
      title: "Business Information",
      subtitle: "Tell us about your business experience",
      currentBusiness: "Do you currently have a business?",
      businessNature: "Business Nature",
      experience: "Years of Experience",
      enterBusinessNature: "Describe your business",
      enterExperience: "Enter years of experience",
    },
    
    // Financial Information
    financial: {
      title: "Financial Information",
      subtitle: "Please provide your financial details",
      hasBankAccount: "Do you have a bank account?",
      existingLoans: "Do you have existing loans?",
      familySupport: "Do you have family support?",
      bankName: "Bank Name",
      branchName: "Branch Name",
      annualIncome: "Annual Income (₹)",
      investmentAmount: "Investment Amount (₹)",
      loanAmount: "Loan Amount (₹)",
      enterBankName: "Enter bank name",
      enterBranchName: "Enter branch name",
      enterAnnualIncome: "Enter annual income",
      enterInvestmentAmount: "Enter investment amount",
      enterLoanAmount: "Enter loan amount",
    },
    
    // Project Information
    project: {
      title: "Project Information",
      subtitle: "Tell us about your project interest",
      projectInterest: "Project Interest",
      reasonForInterest: "Reason for Interest",
      enterProjectInterest: "Enter your project interest",
      enterReason: "Explain why you are interested in this project",
    },
    
    // Land Information
    land: {
      title: "Land Information",
      subtitle: "Please provide land details if applicable",
      landStatus: "Land Status",
      landLocation: "Land Location",
      surveyDetails: "Survey Details",
      selectLandStatus: "Select land status",
      enterLandLocation: "Enter land location details",
      enterSurveyDetails: "Enter survey number or details",
    },
    
    // Support Required
    support: {
      title: "Support Required",
      subtitle: "Select the types of support you need",
      loan: "Loan",
      subsidy: "Subsidy",
      training: "Training",
      marketLinkage: "Market Linkage",
      rawMaterial: "Raw Material",
      machinery: "Machinery",
      mentoring: "Mentoring",
    },
    
    // Documents
    documents: {
      title: "Documents",
      subtitle: "Please confirm which documents you have available",
      aadhaar: "Aadhaar Card",
      bankPassbook: "Bank Passbook",
      photo: "Photo",
      incomeProof: "Income Proof",
      pan: "PAN Card",
    },
    
    // Options
    options: {
      male: "Male",
      female: "Female",
      other: "Other",
      sc: "SC",
      st: "ST",
      obc: "OBC",
      general: "General",
      otherCaste: "Other",
      serp: "SERP",
      mepma: "MEPMA",
      otherOrg: "Other",
      own: "Own",
      lease: "Lease",
      none: "None",
      noLandYet: "No Land Yet",
    },
  },
  
  te: {
    // Common
    previous: "మునుపటి",
    next: "తర్వాత",
    submit: "దరఖాస్తు సమర్పించండి",
    submitting: "సమర్పిస్తోంది...",
    
    // Title
    title: "కేడర్ ఎంపవర్మెంట్ దరఖాస్తు",
    
    // Success
    successTitle: "దరఖాస్తు విజయవంతంగా సమర్పించబడింది!",
    successMessage: "మీ కేడర్ ఎంపవర్మెంట్ దరఖాస్తును సమర్పించినందుకు ధన్యవాదాలు. మేము మీ దరఖాస్తును సమీక్షిస్తాము మరియు త్వరలో మీకు తిరిగి సంప్రదిస్తాము.",
    submitAnother: "మరొక దరఖాస్తు సమర్పించండి",
    
    // Steps
    steps: {
      personal: "వ్యక్తిగత",
      shg: "SHG",
      disability: "వైకల్యం",
      business: "వ్యాపారం",
      financial: "ఆర్థిక",
      project: "ప్రాజెక్ట్",
      land: "భూమి",
      support: "మద్దతు",
      documents: "పత్రాలు",
    },
    
    // Personal Information
    personal: {
      title: "వ్యక్తిగత సమాచారం",
      subtitle: "దయచేసి మీ వ్యక్తిగత వివరాలను అందించండి",
      fullName: "పూర్తి పేరు",
      age: "వయస్సు",
      gender: "లింగం",
      casteCategory: "కుల వర్గం",
      education: "విద్య",
      address: "చిరునామా",
      phone: "ఫోన్ నంబర్",
      membershipId: "సభ్యత్వ ID",
      village: "గ్రామం",
      boothNo: "బూత్ నంబర్",
      mandal: "మండలం",
      selectGender: "లింగాన్ని ఎంచుకోండి",
      selectCaste: "కుల వర్గాన్ని ఎంచుకోండి",
      enterFullName: "మీ పూర్తి పేరును నమోదు చేయండి",
      enterAge: "మీ వయస్సును నమోదు చేయండి",
      enterEducation: "మీ విద్య స్థాయిని నమోదు చేయండి",
      enterPhone: "మీ ఫోన్ నంబర్ను నమోదు చేయండి",
      enterAddress: "మీ పూర్తి చిరునామాను నమోదు చేయండి",
      enterVillage: "గ్రామం పేరును నమోదు చేయండి",
      enterMandal: "మండలం పేరును నమోదు చేయండి",
      enterMembershipId: "సభ్యత్వ ID నమోదు చేయండి (ఐచ్ఛికం)",
      enterBoothNo: "బూత్ నంబర్ను నమోదు చేయండి (ఐచ్ఛికం)",
    },
    
    // SHG Information
    shg: {
      title: "SHG సమాచారం",
      subtitle: "స్వయం సహాయక సమూహ సభ్యత్వ వివరాలు",
      isShgMember: "మీరు SHG సభ్యుడు కారా?",
      organizationType: "సంస్థ రకం",
      groupName: "సమూహం పేరు",
      selectOrgType: "సంస్థ రకాన్ని ఎంచుకోండి",
      enterGroupName: "సమూహం పేరును నమోదు చేయండి",
      onlyForFemale: "SHG సమాచారం స్త్రీ అభ్యర్థులకు మాత్రమే అవసరం.",
    },
    
    // Disability Information
    disability: {
      title: "వైకల్యం సమాచారం",
      subtitle: "దయచేసి వైకల్యం వివరాలను అందించండి",
      isHandicapped: "మీకు శారీరక వైకల్యం ఉందా?",
      handicapType: "వైకల్యం రకం",
      enterHandicapType: "వైకల్యం రకాన్ని నమోదు చేయండి",
    },
    
    // Business Information
    business: {
      title: "వ్యాపార సమాచారం",
      subtitle: "మీ వ్యాపార అనుభవం గురించి మాకు తెలియజేయండి",
      currentBusiness: "మీకు ప్రస్తుతం వ్యాపారం ఉందా?",
      businessNature: "వ్యాపార స్వభావం",
      experience: "అనుభవ సంవత్సరాలు",
      enterBusinessNature: "మీ వ్యాపారాన్ని వివరించండి",
      enterExperience: "అనుభవ సంవత్సరాలను నమోదు చేయండి",
    },
    
    // Financial Information
    financial: {
      title: "ఆర్థిక సమాచారం",
      subtitle: "దయచేసి మీ ఆర్థిక వివరాలను అందించండి",
      hasBankAccount: "మీకు బ్యాంకు ఖాతా ఉందా?",
      existingLoans: "మీకు ఇప్పటికే రుణాలు ఉన్నాయా?",
      familySupport: "మీకు కుటుంబ మద్దతు ఉందా?",
      bankName: "బ్యాంకు పేరు",
      branchName: "శాఖ పేరు",
      annualIncome: "సంవత్సరాంతం ఆదాయం (₹)",
      investmentAmount: "పెట్టుబడి మొత్తం (₹)",
      loanAmount: "రుణ మొత్తం (₹)",
      enterBankName: "బ్యాంకు పేరును నమోదు చేయండి",
      enterBranchName: "శాఖ పేరును నమోదు చేయండి",
      enterAnnualIncome: "సంవత్సరాంతం ఆదాయాన్ని నమోదు చేయండి",
      enterInvestmentAmount: "పెట్టుబడి మొత్తాన్ని నమోదు చేయండి",
      enterLoanAmount: "రుణ మొత్తాన్ని నమోదు చేయండి",
    },
    
    // Project Information
    project: {
      title: "ప్రాజెక్ట్ సమాచారం",
      subtitle: "మీ ప్రాజెక్ట్ ఆసక్తి గురించి మాకు తెలియజేయండి",
      projectInterest: "ప్రాజెక్ట్ ఆసక్తి",
      reasonForInterest: "ఆసక్తికి కారణం",
      enterProjectInterest: "మీ ప్రాజెక్ట్ ఆసక్తిని నమోదు చేయండి",
      enterReason: "మీరు ఈ ప్రాజెక్ట్లో ఎందుకు ఆసక్తి కలిగి ఉన్నారో వివరించండి",
    },
    
    // Land Information
    land: {
      title: "భూమి సమాచారం",
      subtitle: "దయచేసి భూమి వివరాలను అందించండి",
      landStatus: "భూమి స్థితి",
      landLocation: "భూమి స్థానం",
      surveyDetails: "సర్వే వివరాలు",
      selectLandStatus: "భూమి స్థితిని ఎంచుకోండి",
      enterLandLocation: "భూమి స్థానం వివరాలను నమోదు చేయండి",
      enterSurveyDetails: "సర్వే నంబర్ లేదా వివరాలను నమోదు చేయండి",
    },
    
    // Support Required
    support: {
      title: "అవసరమైన మద్దతు",
      subtitle: "మీకు అవసరమైన మద్దతు రకాలను ఎంచుకోండి",
      loan: "రుణం",
      subsidy: "సబ్సిడీ",
      training: "శిక్షణ",
      marketLinkage: "మార్కెట్ లింకేజ్",
      rawMaterial: "ముడి పదార్థం",
      machinery: "యంత్రాలు",
      mentoring: "మెంటరింగ్",
    },
    
    // Documents
    documents: {
      title: "పత్రాలు",
      subtitle: "దయచేసి మీ వద్ద ఉన్న పత్రాలను నిర్ధారించండి",
      aadhaar: "ఆధార్ కార్డ్",
      bankPassbook: "బ్యాంకు పాస్ బుక్",
      photo: "ఫోటో",
      incomeProof: "ఆదాయ రుజువు",
      pan: "PAN కార్డ్",
    },
    
    // Options
    options: {
      male: "పురుషుడు",
      female: "స్త్రీ",
      other: "ఇతర",
      sc: "SC",
      st: "ST",
      obc: "OBC",
      general: "జనరల్",
      otherCaste: "ఇతర",
      serp: "SERP",
      mepma: "MEPMA",
      otherOrg: "ఇతర",
      own: "సొంత",
      lease: "లీజ్",
      none: "లేదు",
      noLandYet: "ఇంకా భూమి లేదు",
    },
  },
};

export const useTranslation = (lang: Language) => {
  return translations[lang];
};

