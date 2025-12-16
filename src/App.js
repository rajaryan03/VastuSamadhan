import React, { useState, useEffect, useRef } from "react";

export default function App() {
  // --- Mobile Detection ---
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [activeStep, setActiveStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dobData, setDobData] = useState({ date: "", time: "", place: "" });
  const [floorPlan, setFloorPlan] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [harmonyScore, setHarmonyScore] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHindi, setIsHindi] = useState(false);

  // Refs for High Performance Animation
  const marsRef = useRef(null);
  const inputSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const howItWorksSectionRef = useRef(null);

  // --- Listeners ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    setIsLoaded(true);

    // 1. Mouse Tracking (Desktop Only)
    const handleMouseMove = (e) => {
      if (!isMobile) setCursorPos({ x: e.clientX, y: e.clientY });
    };
    if (!isMobile) window.addEventListener("mousemove", handleMouseMove);

    // 2. High-Performance Scroll Animation (Parallax)
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Directly animate the Mars element using the GPU
      if (marsRef.current) {
        // Moves down at 20% speed of scroll, rotates slightly
        const yOffset = currentScrollY * 0.2;
        const rotation = currentScrollY * 0.15;
        marsRef.current.style.transform = `translate3d(0, ${yOffset}px, 0) rotate(${rotation}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  useEffect(() => {
    if (showResults && harmonyScore < 72) {
      const timer = setTimeout(
        () => setHarmonyScore((prev) => Math.min(prev + 1, 72)),
        30
      );
      return () => clearTimeout(timer);
    }
  }, [showResults, harmonyScore]);

  const scrollToSection = (ref) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  const handleFileUpload = (e) => {
    if (e.target.files[0]) setFloorPlan(e.target.files[0]);
  };

  const handleAnalyze = () => {
    if (dobData.date && floorPlan) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 3000);
    }
  };

  const mockProblems = [
    {
      zone: "North-East (ईशान)",
      issue: "Toilet Placement",
      severity: "critical",
      personalImpact:
        "Blocks Jupiter energy in your chart, affecting career growth",
      remedy: "Apply Yellow Tape (Earth Element) around the commode base",
    },
    {
      zone: "South-East (आग्नेय)",
      issue: "Kitchen Misalignment",
      severity: "moderate",
      personalImpact:
        "Your Mars is weak - this placement creates family discord",
      remedy: "Place a red copper pyramid at the South corner of kitchen",
    },
    {
      zone: "West (पश्चिम)",
      issue: "Entrance Energy Block",
      severity: "minor",
      personalImpact:
        "Saturn transit suggests delayed gains from current entrance",
      remedy: "Hang a brass wind chime at 7ft height near entrance",
    },
  ];

  // Translations
  const t = {
    heroTitle1: isHindi ? "वास्तु समस्या?" : "Vastu problems?",
    heroTitle2: isHindi ? "समाधान।" : "Solved.",
    heroCredibility: isHindi
      ? "IIT वास्तुकार  •  वास्तु विशेषज्ञ  •  20+ वर्ष अनुभव"
      : "IIT Architects  •  Vastu Experts  •  20+ Years Experience",
    heroSubtitle: isHindi
      ? "IIT वास्तुकारों और अनुभवी वास्तु विशेषज्ञों द्वारा\nआपके घर का व्यक्तिगत एस्ट्रो-वास्तु विश्लेषण"
      : "Personalized Astro-Vastu analysis of your home by\nIIT architects and experienced Vastu experts",
    getStarted: isHindi ? "शुरू करें" : "Get Started",
    analyzeNow: isHindi ? "अभी अपना घर जांचें →" : "Check Your Home Now →",
    howItWorks: isHindi ? "यह कैसे काम करता है" : "How It Works",
    about: isHindi ? "हमारे बारे में" : "About",
    howItWorksTitle: isHindi ? "यह कैसे काम करता है" : "How It Works",
    howItWorksSub: isHindi
      ? "अपने रहने की जगह को सामंजस्यपूर्ण बनाने के चार सरल चरण"
      : "Four simple steps to harmonize your living space",
    startAnalysis: isHindi ? "अपना विश्लेषण शुरू करें" : "Start Your Analysis",
    startAnalysisSub: isHindi
      ? "व्यक्तिगत वास्तु अंतर्दृष्टि प्राप्त करने के लिए अपना विवरण दर्ज करें"
      : "Enter your details to receive personalized Vastu insights",
    birthDetails: isHindi ? "जन्म विवरण" : "Birth Details",
    birthDetailsSub: isHindi
      ? "आपके व्यक्तिगत कुंडली ओवरले के लिए"
      : "For your personalized Kundli overlay",
    dob: isHindi ? "जन्म तिथि" : "Date of Birth",
    tob: isHindi ? "जन्म समय" : "Time of Birth",
    pob: isHindi ? "जन्म स्थान" : "Place of Birth",
    optional: isHindi ? "(वैकल्पिक)" : "(Optional)",
    continue: isHindi ? "जारी रखें →" : "Continue →",
    floorPlan: isHindi ? "फ्लोर प्लान" : "Floor Plan",
    floorPlanSub: isHindi
      ? "अपने घर का वास्तुशिल्प लेआउट अपलोड करें"
      : "Upload your home's architectural layout",
    dropFloorPlan: isHindi
      ? "अपना फ्लोर प्लान यहां डालें"
      : "Drop your floor plan here",
    orBrowse: isHindi
      ? "या ब्राउज़ करने के लिए क्लिक करें (PNG, JPG, PDF)"
      : "or click to browse (PNG, JPG, PDF)",
    readyAnalysis: isHindi ? "विश्लेषण के लिए तैयार" : "Ready for Analysis",
    readyAnalysisSub: isHindi
      ? "आपकी व्यक्तिगत एस्ट्रो-वास्तु रिपोर्ट"
      : "Your personalized Astro-Vastu report",
    generateReport: isHindi
      ? "⚡ मेरी वास्तु रिपोर्ट बनाएं"
      : "⚡ Generate My Vastu Report",
    analyzing: isHindi
      ? "ब्रह्मांडीय ऊर्जाओं का विश्लेषण..."
      : "Analyzing Cosmic Energies...",
    aboutTitle: isHindi ? "हमारे बारे में" : "About Us",
    aboutSub: isHindi
      ? "IIT वास्तुकारों और वास्तु विशेषज्ञों की विश्वसनीय टीम"
      : "Trusted team of IIT architects & Vastu experts",
    iitBacked: isHindi
      ? "IIT विशेषज्ञता द्वारा समर्थित"
      : "Backed by IIT Expertise",
    yearsExp: isHindi
      ? "20+ वर्षों की वास्तुशिल्प उत्कृष्टता"
      : "20+ Years of Architectural Excellence",
    aboutDesc: isHindi
      ? "VastuSamadhan में हमारे IIT-प्रशिक्षित वास्तुकारों और अनुभवी वास्तु विशेषज्ञों की टीम आपके घर का व्यक्तिगत विश्लेषण प्रदान करती है। 20+ वर्षों के अनुभव के साथ, हम प्राचीन वास्तु शास्त्र के सिद्धांतों को आपकी जन्म कुंडली के साथ जोड़कर सटीक और प्रभावी उपाय देते हैं।"
      : "Our team of IIT-trained architects and experienced Vastu experts at VastuSamadhan provides personalized analysis of your home. With 20+ years of experience, we combine authentic Vastu Shastra principles with your birth chart to deliver accurate and effective remedies.",
    meetFounders: isHindi
      ? "हमारे सह-संस्थापकों से मिलें"
      : "Meet Our Co-Founders",
    researchTitle: isHindi
      ? "अनुसंधान-संचालित नवाचार"
      : "Research-Driven Innovation",
    researchDesc: isHindi
      ? "हमारे संस्थापकों ने AI और स्थानिक विश्लेषण पर कई शोध पत्र प्रकाशित किए हैं।"
      : "Our founders have contributed multiple research papers on AI and spatial analysis.",
    vastuZones: isHindi ? "वास्तु क्षेत्र" : "Vastu Zones",
    planetaryForces: isHindi ? "ग्रह बल" : "Planetary Forces",
    personalization: isHindi ? "वैयक्तिकरण" : "Personalization",
    newScan: isHindi ? "नया स्कैन" : "New Scan",
    yourAnalysis: isHindi ? "आपका वास्तु विश्लेषण" : "Your Vastu Analysis",
    personalizedInsights: isHindi
      ? "आपके जन्म चार्ट और घर के आधार पर व्यक्तिगत अंतर्दृष्टि"
      : "Personalized insights based on your birth chart & home",
    harmonyScore: isHindi ? "सामंजस्य स्कोर" : "Harmony Score",
    needsAttention: isHindi ? "ध्यान देने की जरूरत" : "Needs Attention",
    issuesFound: isHindi ? "समस्याएं मिलीं" : "Issues Found",
    remedies: isHindi ? "उपाय" : "Remedies",
    potential: isHindi ? "संभावित" : "Potential",
    detectedIssues: isHindi
      ? "❈ पाई गई समस्याएं और उपाय ❈"
      : "❈ Detected Issues & Remedies ❈",
    personalImpact: isHindi ? "☿ व्यक्तिगत प्रभाव" : "☿ Personal Impact",
    nonDemoRemedy: isHindi
      ? "⚡ बिना तोड़-फोड़ उपाय"
      : "⚡ Non-Demolition Remedy",
    getComplete: isHindi
      ? "अपनी पूर्ण उपचार योजना प्राप्त करें"
      : "Get Your Complete Remedial Plan",
    unlockDetails: isHindi
      ? "विस्तृत गाइड, खरीदारी सूची और व्यक्तिगत पावर-अप अनलॉक करें"
      : "Unlock detailed guides, shopping lists, and personalized power-ups",
    upgradeReport: isHindi
      ? "पूर्ण रिपोर्ट में अपग्रेड करें →"
      : "Upgrade to Full Report →",
    footerTagline: isHindi
      ? "वास्तु समस्या? समाधान। IIT वास्तुकारों और वास्तु विशेषज्ञों द्वारा।"
      : "Vastu problems? Solved. By IIT architects & Vastu experts.",
    quickLinks: isHindi ? "त्वरित लिंक" : "Quick Links",
    home: isHindi ? "होम" : "Home",
    services: isHindi ? "सेवाएं" : "Services",
    vastuAnalysis: isHindi ? "वास्तु विश्लेषण" : "Vastu Analysis",
    remedialPlans: isHindi ? "उपचार योजनाएं" : "Remedial Plans",
    expertConsult: isHindi ? "विशेषज्ञ परामर्श" : "Expert Consultation",
    contactUs: isHindi ? "संपर्क करें" : "Contact Us",
    whatsappUs: isHindi ? "💬 व्हाट्सएप करें" : "💬 WhatsApp Us",
    privacyPolicy: isHindi ? "गोपनीयता नीति" : "Privacy Policy",
    termsService: isHindi ? "सेवा की शर्तें" : "Terms of Service",
    footerMantra: isHindi
      ? "प्रामाणिक वास्तु। विशेषज्ञ समाधान। सुखी घर।"
      : "Authentic Vastu. Expert solutions. Happy home.",
    step1: isHindi ? "फ्लोर प्लान अपलोड करें" : "Upload Floor Plan",
    step1Desc: isHindi
      ? "अपने घर का लेआउट साझा करें।"
      : "Share your home's architectural layout.",
    step2: isHindi ? "जन्म विवरण दर्ज करें" : "Enter Birth Details",
    step2Desc: isHindi
      ? "व्यक्तिगत कुंडली विश्लेषण के लिए अपनी जन्म तिथि दें।"
      : "Provide your date of birth for personalized Kundli analysis.",
    step3: isHindi ? "विशेषज्ञ विश्लेषण" : "Expert Analysis",
    step3Desc: isHindi
      ? "हमारे वास्तु विशेषज्ञ आपके स्थान का विश्लेषण करते हैं।"
      : "Our Vastu experts analyze your space.",
    step4: isHindi ? "उपाय प्राप्त करें" : "Get Remedies",
    step4Desc: isHindi
      ? "अपना हार्मनी स्कोर और उपाय प्राप्त करें।"
      : "Receive your Harmony Score and remedies.",
  };

  const styles = {
    container: {
      minHeight: "100vh",
      position: "relative",
      background:
        "linear-gradient(180deg, #0A0A0F 0%, #151520 50%, #0A0A0F 100%)",
      overflowX: "hidden",
    },

    // --- CURSOR: Hidden on Mobile ---
    cursor: {
      display: isMobile ? "none" : "block",
      position: "fixed",
      width: 40,
      height: 40,
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)",
      pointerEvents: "none",
      zIndex: 9999,
      transition: "transform 0.15s ease",
      transform: "translate(-50%, -50%)",
    },
    cursorDot: {
      display: isMobile ? "none" : "block",
      position: "fixed",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#F59E0B",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none",
      zIndex: 10000,
      boxShadow: "0 0 10px rgba(245,158,11,0.8)",
    },

    // Background
    cosmicBg: {
      position: "fixed",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none",
      zIndex: 0,
    },
    mandala: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "150vmax",
      height: "150vmax",
      transform: "translate(-50%, -50%)",
      background:
        "radial-gradient(circle at center, transparent 30%, rgba(10,10,15,0.8) 70%), repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(245,158,11,0.02) 10deg 20deg)",
      animation: "spin 120s linear infinite",
      opacity: 0.5,
    },

    // --- MARS (Mobile Optimized) ---
    marsPlanet: {
      position: "fixed",
      width: 120,
      height: 120,
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 30% 30%, #E8A87C 0%, #C73E1D 40%, #8B1E0E 70%, #4A0F08 100%)",
      boxShadow:
        "0 0 60px rgba(199, 62, 29, 0.4), inset -10px -10px 30px rgba(0,0,0,0.5), inset 5px 5px 20px rgba(255,200,150,0.3)",
      top: "20%",
      right: "15%",
      opacity: 0.7,
      zIndex: 1,
      pointerEvents: "none",
      willChange: "transform",
    },

    // Header
    header: {
      position: "relative",
      zIndex: 10,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "20px" : "24px 48px",
      // Glassmorphism effect for mobile header
      backdropFilter: isMobile ? "blur(10px)" : "none",
      background: isMobile ? "rgba(10,10,15,0.6)" : "transparent",
      borderBottom: isMobile ? "1px solid rgba(255,255,255,0.05)" : "none",
    },
    logo: { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
    logoIcon: {
      fontSize: 32,
      color: "#F59E0B",
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 700,
    },
    logoText: {
      fontSize: 28,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
    },
    accent: { color: "#F59E0B" },
    nav: { display: "flex", alignItems: "center", gap: 32 },

    // --- NAVIGATION: Hide Links on Mobile ---
    navLink: {
      display: isMobile ? "none" : "block",
      color: "rgba(255,255,255,0.7)",
      textDecoration: "none",
      fontSize: 15,
      fontWeight: 500,
      transition: "color 0.3s",
    },
    langToggle: {
      border: "1px solid rgba(245,158,11,0.5)",
      padding: "8px 14px",
      borderRadius: 8,
      color: "#F59E0B",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      transition: "all 0.3s",
      fontFamily: '"DM Sans", sans-serif',
    },

    // Buttons
    primaryBtn: {
      background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      border: "none",
      padding: "12px 28px",
      borderRadius: 8,
      color: "#0A0A0F",
      fontWeight: 600,
      fontSize: 15,
      cursor: "pointer",
      transition: "all 0.3s",
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: '"DM Sans", sans-serif',
    },
    outlineBtn: {
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.2)",
      padding: "12px 24px",
      borderRadius: 8,
      color: "#FAFAFA",
      fontWeight: 500,
      fontSize: 14,
      cursor: "pointer",
      transition: "all 0.3s",
      fontFamily: '"DM Sans", sans-serif',
    },

    // Hero
    hero: {
      position: "relative",
      zIndex: 10,
      textAlign: "center",
      padding: isMobile ? "80px 20px 60px" : "100px 24px 60px",
      maxWidth: 1000,
      margin: "0 auto",
    },
    shlokaBackground: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: 18,
      fontFamily: '"Cormorant Garamond", serif',
      color: "rgba(245, 158, 11, 0.04)",
      whiteSpace: "nowrap",
      letterSpacing: "0.3em",
      pointerEvents: "none",
    },
    heroMandala: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      height: 500,
      pointerEvents: "none",
      zIndex: 0,
    },
    cornerOrnament: {
      position: "absolute",
      fontSize: 28,
      color: "rgba(245, 158, 11, 0.2)",
      fontFamily: "serif",
    },
    floatingDiya: {
      position: "absolute",
      fontSize: 24,
      opacity: 0.6,
      animation: "floatDiya 4s ease-in-out infinite",
      pointerEvents: "none",
      filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))",
    },
    heroTopDecor: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      marginBottom: 40,
      position: "relative",
      zIndex: 1,
    },
    decorPaisley: { fontSize: 24, color: "rgba(245, 158, 11, 0.5)" },
    decorDiamond: { fontSize: 12, color: "rgba(245, 158, 11, 0.7)" },
    decorLotus: {
      fontSize: 32,
      color: "#F59E0B",
      filter: "drop-shadow(0 0 10px rgba(245, 158, 11, 0.5))",
    },
    taglineContainer: { position: "relative", zIndex: 1, padding: "20px 0" },
    heroDecor: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      marginBottom: 32,
    },
    decorLine: {
      width: 60,
      height: 1,
      background:
        "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)",
    },
    heroTitle: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      marginBottom: 24,
    },
    titleQuestion: {
      fontSize: 44,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 400,
      letterSpacing: "0.02em",
      color: "rgba(255,255,255,0.9)",
      marginBottom: 0,
    },

    // Font Sizing logic
    titleAnswer: {
      fontSize: isMobile ? 56 : 86,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 700,
      background:
        "linear-gradient(135deg, #F59E0B 0%, #FBBF24 40%, #F59E0B 100%)",
      backgroundSize: "200% auto",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animation: "shimmer 3s linear infinite",
      lineHeight: 1.0,
      filter: "drop-shadow(0 4px 30px rgba(245, 158, 11, 0.3))",
      marginTop: 8,
    },

    ornateDivider: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      margin: "24px 0 28px",
      position: "relative",
      zIndex: 1,
    },
    dividerLine: {
      width: 60,
      height: 1,
      background:
        "linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.4), transparent)",
    },
    dividerIcon: { fontSize: 10, color: "rgba(245, 158, 11, 0.6)" },
    dividerCenter: {
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "1px solid rgba(245, 158, 11, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(245, 158, 11, 0.05)",
    },
    dividerLotus: { fontSize: 20, color: "#F59E0B" },
    credibilityBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 28px",
      background:
        "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)",
      border: "1px solid rgba(245, 158, 11, 0.25)",
      borderRadius: 50,
      position: "relative",
      zIndex: 1,
    },
    credibilityIcon: { fontSize: 22 },
    credibilityText: {
      fontSize: 14,
      color: "rgba(255,255,255,0.9)",
      fontWeight: 500,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
    },
    heroSubtitle: {
      fontSize: 18,
      color: "rgba(255,255,255,0.6)",
      lineHeight: 1.7,
      marginBottom: 32,
    },
    heroStatsContainer: { marginTop: 48, position: "relative", zIndex: 1 },
    statsTopBorder: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      marginBottom: 16,
      color: "rgba(245, 158, 11, 0.4)",
      fontSize: 12,
    },
    statsBorderLine: {
      width: 80,
      height: 1,
      background:
        "linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent)",
    },
    heroStats: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 40,
      padding: "24px 48px",
      background: "rgba(255,255,255,0.02)",
      borderRadius: 16,
      border: "1px solid rgba(245, 158, 11, 0.1)",
    },
    statBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
    },
    statNum: {
      fontSize: 36,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      color: "#F59E0B",
    },
    statText: {
      fontSize: 12,
      color: "rgba(255,255,255,0.5)",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
    statDivider: {
      fontSize: 20,
      color: "rgba(245, 158, 11, 0.3)",
      fontFamily: '"Cormorant Garamond", serif',
    },

    section: {
      position: "relative",
      zIndex: 10,
      padding: isMobile ? "60px 24px" : "80px 48px",
      maxWidth: 1200,
      margin: "0 auto",
    },
    sectionHeader: { textAlign: "center", marginBottom: 48 },
    sectionHeading: {
      fontSize: 42,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      marginBottom: 12,
    },
    subtitle: { fontSize: 16, color: "rgba(255,255,255,0.6)" },
    sectionTitle: {
      fontSize: 24,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      textAlign: "center",
      marginBottom: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
    },

    // --- GRIDS: Stack on Mobile, Grid on Desktop ---
    howGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
      gap: 24,
    },
    // Adding glassmorphism to cards on mobile for that premium feel
    howCard: {
      background: isMobile
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.03)",
      backdropFilter: isMobile ? "blur(10px)" : "none",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: "32px 24px",
      textAlign: "center",
      transition: "all 0.3s",
      position: "relative",
    },
    howNum: {
      position: "absolute",
      top: -12,
      left: 24,
      fontSize: 14,
      fontWeight: 700,
      color: "#F59E0B",
      background: "#0A0A0F",
      padding: "4px 12px",
      borderRadius: 20,
      border: "1px solid rgba(245,158,11,0.3)",
    },
    howTitle: {
      fontSize: 18,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      marginBottom: 12,
    },
    howDesc: { fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 },

    stepsRow: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 48,
      gap: isMobile ? 24 : 0,
    },
    step: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      cursor: "pointer",
      transition: "all 0.3s",
    },
    stepIcon: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      transition: "all 0.3s",
    },
    stepTitle: {
      fontSize: 16,
      fontWeight: 600,
      fontFamily: '"Cormorant Garamond", serif',
    },
    stepSub: { fontSize: 12, color: "rgba(255,255,255,0.5)" },
    connector: {
      display: isMobile ? "none" : "block",
      width: 80,
      height: 2,
      margin: "0 20px",
      borderRadius: 2,
      transition: "all 0.3s",
    },

    // --- CARDS: Stack on Mobile ---
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: 24,
    },
    card: {
      background: isMobile
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.03)",
      backdropFilter: isMobile ? "blur(10px)" : "none",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: 32,
      transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    },
    analysisCard: {
      background:
        "linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(217,119,6,0.05) 100%)",
      border: "1px solid rgba(245,158,11,0.2)",
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 28,
    },
    cardIcon: {
      width: 48,
      height: 48,
      background:
        "linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.1) 100%)",
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      color: "#F59E0B",
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 600,
      fontFamily: '"Cormorant Garamond", serif',
      marginBottom: 4,
    },
    cardSub: { fontSize: 13, color: "rgba(255,255,255,0.5)" },

    inputGroup: { marginBottom: 20 },
    label: {
      display: "block",
      fontSize: 13,
      color: "rgba(255,255,255,0.6)",
      marginBottom: 8,
      fontWeight: 500,
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 10,
      color: "#FAFAFA",
      fontSize: 15,
      transition: "all 0.3s",
      fontFamily: '"DM Sans", sans-serif',
    },
    uploadZone: {
      border: "2px dashed rgba(255,255,255,0.2)",
      borderRadius: 16,
      padding: "40px 24px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.3s",
      marginBottom: 20,
      position: "relative",
    },
    fileInput: {
      position: "absolute",
      inset: 0,
      opacity: 0,
      cursor: "pointer",
    },
    uploadLabel: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
    },
    uploadHint: { fontSize: 13, color: "rgba(255,255,255,0.4)" },
    uploadSuccess: {
      width: 48,
      height: 48,
      background: "linear-gradient(135deg, #10B981, #059669)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      color: "white",
      marginBottom: 8,
    },
    summaryBox: {
      background: "rgba(0,0,0,0.2)",
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
    },
    summaryLabel: { fontSize: 13, color: "rgba(255,255,255,0.5)" },
    summaryVal: {
      fontSize: 14,
      fontWeight: 500,
      color: "rgba(255,255,255,0.9)",
    },
    spinner: {
      width: 20,
      height: 20,
      border: "2px solid rgba(10,10,15,0.3)",
      borderTopColor: "#0A0A0F",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite",
      marginRight: 8,
    },
    aboutContent: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 24,
      padding: 48,
    },
    credBadge: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      background:
        "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 100%)",
      border: "1px solid rgba(245,158,11,0.3)",
      borderRadius: 16,
      padding: "20px 24px",
      marginBottom: 32,
    },
    foundersGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 24,
      marginBottom: 32,
    },
    founderCard: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: 24,
      display: "flex",
      gap: 20,
    },
    avatar: {
      width: 64,
      height: 64,
      background: "linear-gradient(135deg, #F59E0B, #D97706)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      fontWeight: 700,
      color: "#0A0A0F",
      flexShrink: 0,
    },
    researchBox: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: 20,
    },
    trustGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: 20,
    },
    trustItem: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: 24,
      textAlign: "center",
    },
    whatsappFloat: {
      position: "fixed",
      bottom: 24,
      right: 24,
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "#25D366",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
      zIndex: 1000,
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    whatsappTooltip: {
      position: "absolute",
      right: 70,
      background: "#1a1a24",
      color: "white",
      padding: "8px 16px",
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: "nowrap",
      opacity: 0,
      pointerEvents: "none",
      transition: "opacity 0.3s",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },

    // Results
    resultsMain: {
      position: "relative",
      zIndex: 10,
      maxWidth: 1000,
      margin: "0 auto",
      padding: "40px 24px 80px",
    },
    resultsHero: { textAlign: "center", marginBottom: 48 },
    resultsTitle: {
      fontSize: 42,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      marginBottom: 12,
    },
    scoreSection: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: 32,
      marginBottom: 48,
      alignItems: "center",
    },
    scoreCard: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 24,
      padding: 40,
      textAlign: "center",
      flex: isMobile ? "auto" : "0 0 280px",
      width: isMobile ? "100%" : "auto",
    },
    scoreRing: {
      position: "relative",
      width: 180,
      height: 180,
      margin: "0 auto 20px",
    },
    scoreValue: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
    scoreNum: {
      fontSize: 48,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 700,
    },
    scoreMax: { fontSize: 18, color: "rgba(255,255,255,0.4)" },
    scoreLabel: {
      fontSize: 14,
      color: "rgba(255,255,255,0.5)",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      marginBottom: 8,
    },
    scoreStatus: { fontSize: 16, fontWeight: 600, color: "#F59E0B" },
    statsGrid: {
      flex: 1,
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: 16,
      width: "100%",
    },
    statCard: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: 24,
      textAlign: "center",
    },
    statVal: {
      fontSize: 32,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 700,
      margin: "12px 0 4px",
    },
    statLabel: {
      fontSize: 12,
      color: "rgba(255,255,255,0.5)",
      textTransform: "uppercase",
    },
    problemsList: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      marginBottom: 48,
    },
    problemCard: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20,
      padding: 28,
    },
    problemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    zoneTag: {
      fontSize: 13,
      color: "#F59E0B",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    badge: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      padding: "6px 14px",
      borderRadius: 20,
      color: "white",
    },
    problemTitle: {
      fontSize: 22,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      marginBottom: 20,
    },
    impactBox: {
      background: "rgba(245,158,11,0.08)",
      borderRadius: 12,
      padding: "16px 20px",
      marginBottom: 16,
    },
    remedyBox: {
      background: "rgba(16,185,129,0.08)",
      borderRadius: 12,
      padding: "16px 20px",
    },
    boxLabel: {
      fontSize: 12,
      color: "#F59E0B",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      fontWeight: 600,
      marginBottom: 8,
    },
    boxText: { fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 },
    ctaCard: {
      background:
        "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.08) 100%)",
      border: "1px solid rgba(245,158,11,0.3)",
      borderRadius: 24,
      padding: 48,
      textAlign: "center",
    },
    ctaTitle: {
      fontSize: 28,
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      marginBottom: 12,
    },
    ctaText: { fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 28 },

    // Footer
    footer: {
      position: "relative",
      zIndex: 10,
      background: "rgba(0,0,0,0.3)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      marginTop: 40,
    },
    footerContent: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "60px 48px 40px",
    },
    footerMain: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1.5fr 2fr",
      gap: 60,
      marginBottom: 40,
    },
    footerBrand: {},
    footerLinks: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: 40,
    },
    footerCol: { display: "flex", flexDirection: "column", gap: 12 },
    footerColTitle: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    footerLink: {
      fontSize: 14,
      color: "rgba(255,255,255,0.5)",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    contactItem: {
      fontSize: 14,
      color: "rgba(255,255,255,0.5)",
      marginBottom: 8,
    },
    socialBtn: {
      width: 40,
      height: 40,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(255,255,255,0.6)",
      textDecoration: "none",
      transition: "all 0.3s",
    },
    footerDivider: {
      height: 1,
      background: "rgba(255,255,255,0.08)",
      marginBottom: 24,
    },
    footerBottom: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    legalLink: {
      fontSize: 13,
      color: "rgba(255,255,255,0.4)",
      textDecoration: "none",
      transition: "color 0.3s",
    },
  };

  // Results Page
  if (showResults) {
    return (
      <div style={styles.container}>
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
            * { margin: 0; padding: 0; box-sizing: border-box; cursor: none !important; }
            body { font-family: 'DM Sans', sans-serif; background: #0A0A0F; color: #FAFAFA; overflow-x: hidden; }
            html { scroll-behavior: smooth; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            /* Simple fallback animation if JS ref fails */
            @keyframes orbitMars { 
              0% { transform: translate(0, 0) rotate(0deg); } 
              50% { transform: translate(-30px, 40px) rotate(180deg); } 
              100% { transform: translate(0, 0) rotate(360deg); } 
            }
            @keyframes floatDiya { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; } 50% { transform: translateY(-15px) scale(1.1); opacity: 0.8; } }
            @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
            @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
            @keyframes twinkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
            input:focus { outline: none; border-color: #F59E0B !important; box-shadow: 0 0 0 3px rgba(245,158,11,0.2); }
            button:hover { transform: translateY(-2px); }
            button:active { transform: scale(0.98); } /* Mobile tap effect */
            a:hover { color: #F59E0B !important; }
        `}</style>
        <div
          style={{
            ...styles.cursor,
            left: cursorPos.x,
            top: cursorPos.y,
            transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          }}
        />
        <div
          style={{ ...styles.cursorDot, left: cursorPos.x, top: cursorPos.y }}
        />
        <div style={styles.cosmicBg}>
          <div style={styles.mandala} />
          {/* Mars ref attached here for scroll effect */}
          <div ref={marsRef} style={styles.marsPlanet} />
        </div>

        <header style={styles.header}>
          <div
            style={styles.logo}
            onClick={() => {
              setShowResults(false);
              setHarmonyScore(0);
            }}
          >
            <span style={styles.logoIcon}>॥</span>
            <span style={styles.logoText}>
              Vastu<span style={styles.accent}>Samadhan</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button
              onClick={() => setIsHindi(!isHindi)}
              style={{
                ...styles.langToggle,
                background: isHindi
                  ? "rgba(245,158,11,0.2)"
                  : "rgba(255,255,255,0.05)",
              }}
            >
              {isHindi ? "English" : "हिंदी"}
            </button>
            <button
              onClick={() => {
                setShowResults(false);
                setActiveStep(0);
                setHarmonyScore(0);
              }}
              style={styles.outlineBtn}
            >
              {t.newScan}
            </button>
          </div>
        </header>

        <main style={styles.resultsMain}>
          <div style={styles.resultsHero}>
            <h1 style={styles.resultsTitle}>{t.yourAnalysis}</h1>
            <p style={styles.subtitle}>{t.personalizedInsights}</p>
          </div>

          <div style={styles.scoreSection}>
            <div style={styles.scoreCard}>
              <div style={styles.scoreRing}>
                <svg
                  viewBox="0 0 100 100"
                  style={{ width: "100%", height: "100%" }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${harmonyScore * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                    style={{ transition: "stroke-dasharray 0.3s" }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={styles.scoreValue}>
                  <span style={styles.scoreNum}>{harmonyScore}</span>
                  <span style={styles.scoreMax}>/100</span>
                </div>
              </div>
              <div style={styles.scoreLabel}>{t.harmonyScore}</div>
              <div style={styles.scoreStatus}>{t.needsAttention}</div>
            </div>

            <div style={styles.statsGrid}>
              {[
                { icon: "⚠️", val: "3", label: t.issuesFound },
                { icon: "🔧", val: "3", label: t.remedies },
                { icon: "✨", val: "92", label: t.potential },
              ].map((s, i) => (
                <div key={i} style={styles.statCard}>
                  <div style={{ fontSize: 28 }}>{s.icon}</div>
                  <div style={styles.statVal}>{s.val}</div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <h2 style={styles.sectionTitle}>{t.detectedIssues}</h2>

          <div style={styles.problemsList}>
            {mockProblems.map((p, i) => (
              <div key={i} style={styles.problemCard}>
                <div style={styles.problemHeader}>
                  <span style={styles.zoneTag}>{p.zone}</span>
                  <span
                    style={{
                      ...styles.badge,
                      background:
                        p.severity === "critical"
                          ? "#EF4444"
                          : p.severity === "moderate"
                          ? "#F59E0B"
                          : "#10B981",
                    }}
                  >
                    {p.severity}
                  </span>
                </div>
                <h3 style={styles.problemTitle}>{p.issue}</h3>
                <div style={styles.impactBox}>
                  <div style={styles.boxLabel}>{t.personalImpact}</div>
                  <p style={styles.boxText}>{p.personalImpact}</p>
                </div>
                <div style={styles.remedyBox}>
                  <div style={{ ...styles.boxLabel, color: "#10B981" }}>
                    {t.nonDemoRemedy}
                  </div>
                  <p style={styles.boxText}>{p.remedy}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.ctaCard}>
            <h3 style={styles.ctaTitle}>{t.getComplete}</h3>
            <p style={styles.ctaText}>{t.unlockDetails}</p>
            <button style={styles.primaryBtn}>{t.upgradeReport}</button>
          </div>
        </main>
      </div>
    );
  }

  // Main Landing Page
  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; cursor: none !important; }
        body { font-family: 'DM Sans', sans-serif; background: #0A0A0F; color: #FAFAFA; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        /* Simple fallback animation if JS ref fails */
        @keyframes orbitMars { 
          0% { transform: translate(0, 0) rotate(0deg); } 
          50% { transform: translate(-30px, 40px) rotate(180deg); } 
          100% { transform: translate(0, 0) rotate(360deg); } 
        }
        @keyframes floatDiya { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; } 50% { transform: translateY(-15px) scale(1.1); opacity: 0.8; } }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes twinkle { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
        input:focus { outline: none; border-color: #F59E0B !important; box-shadow: 0 0 0 3px rgba(245,158,11,0.2); }
        button:hover { transform: translateY(-2px); }
        button:active { transform: scale(0.98); } /* Mobile tap effect */
        a:hover { color: #F59E0B !important; }
      `}</style>

      {/* Custom Cursor - Hidden on Mobile */}
      <div
        style={{
          ...styles.cursor,
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
      <div
        style={{ ...styles.cursorDot, left: cursorPos.x, top: cursorPos.y }}
      />

      {/* Background */}
      <div style={styles.cosmicBg}>
        <div style={styles.mandala} />
        {/* Rotating Mars Planet - NOW MOVES SMOOTHLY WITH SCROLL USING REF */}
        <div ref={marsRef} style={styles.marsPlanet}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "30%",
              width: "15%",
              height: "10%",
              borderRadius: "50%",
              background: "rgba(139, 30, 14, 0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "20%",
              height: "12%",
              borderRadius: "50%",
              background: "rgba(139, 30, 14, 0.5)",
            }}
          />
        </div>
        {/* Small orbiting moon */}
        <div
          style={{
            position: "fixed",
            width: 20,
            height: 20,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #D4A574 0%, #8B7355 100%)",
            top: "25%",
            right: "10%",
            opacity: 0.8,
            zIndex: 1,
            pointerEvents: "none",
            boxShadow: "0 0 10px rgba(212, 165, 116, 0.5)",
            animation: "orbitMars 18s reverse linear infinite",
          }}
        />
        {/* Floating Om symbol */}
        <div
          style={{
            position: "fixed",
            bottom: "15%",
            left: "8%",
            fontSize: 60,
            color: "rgba(245, 158, 11, 0.08)",
            pointerEvents: "none",
            animation: "floatDiya 6s ease-in-out infinite",
          }}
        >
          ॐ
        </div>
        {/* Floating Swastik */}
        <div
          style={{
            position: "fixed",
            top: "40%",
            left: "5%",
            fontSize: 40,
            color: "rgba(245, 158, 11, 0.06)",
            pointerEvents: "none",
            animation: "orbitMars 40s linear infinite",
          }}
        >
          卐
        </div>
        {/* Kalash symbol */}
        <div
          style={{
            position: "fixed",
            bottom: "30%",
            right: "5%",
            fontSize: 50,
            color: "rgba(245, 158, 11, 0.07)",
            pointerEvents: "none",
            animation: "floatDiya 8s ease-in-out infinite",
          }}
        >
          🪷
        </div>
      </div>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>॥</span>
          <span style={styles.logoText}>
            Vastu<span style={styles.accent}>Samadhan</span>
          </span>
        </div>
        <nav style={styles.nav}>
          <button
            onClick={() => setIsHindi(!isHindi)}
            style={{
              ...styles.langToggle,
              background: isHindi
                ? "rgba(245,158,11,0.2)"
                : "rgba(255,255,255,0.05)",
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isHindi ? "English" : "हिंदी"}
          </button>

          {/* Navigation Links - Hidden on Mobile */}
          <a
            href="#how"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(howItWorksSectionRef);
            }}
            style={styles.navLink}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {t.howItWorks}
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(aboutSectionRef);
            }}
            style={styles.navLink}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {t.about}
          </a>

          <button
            onClick={() => scrollToSection(inputSectionRef)}
            style={styles.primaryBtn}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {t.getStarted}
          </button>
        </nav>
      </header>

      {/* Hero */}
      <section
        style={{
          ...styles.hero,
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s ease 0.2s",
        }}
      >
        {/* Sanskrit Shloka Background */}
        <div style={styles.shlokaBackground}>
          वास्तु शास्त्रं गृहं रक्षति । गृहं रक्षति कुटुम्बम् ।
        </div>

        {/* Mandala Frame */}
        <div style={styles.heroMandala}>
          <svg
            viewBox="0 0 400 400"
            style={{ width: "100%", height: "100%", opacity: 0.15 }}
          >
            <defs>
              <linearGradient
                id="mandalaGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            <circle
              cx="200"
              cy="200"
              r="195"
              fill="none"
              stroke="url(#mandalaGrad)"
              strokeWidth="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="url(#mandalaGrad)"
              strokeWidth="0.5"
            />
            <circle
              cx="200"
              cy="200"
              r="145"
              fill="none"
              stroke="url(#mandalaGrad)"
              strokeWidth="0.5"
            />
            {[...Array(16)].map((_, i) => (
              <ellipse
                key={i}
                cx="200"
                cy="60"
                rx="20"
                ry="50"
                fill="none"
                stroke="url(#mandalaGrad)"
                strokeWidth="0.5"
                transform={`rotate(${i * 22.5} 200 200)`}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="200"
                y1="100"
                x2="200"
                y2="300"
                stroke="url(#mandalaGrad)"
                strokeWidth="0.3"
                transform={`rotate(${i * 22.5} 200 200)`}
              />
            ))}
          </svg>
        </div>

        {/* Corner Ornaments */}
        <div
          style={{
            ...styles.cornerOrnament,
            top: 0,
            left: 0,
            transform: "rotate(0deg)",
          }}
        >
          ❋
        </div>
        <div
          style={{
            ...styles.cornerOrnament,
            top: 0,
            right: 0,
            transform: "rotate(90deg)",
          }}
        >
          ❋
        </div>
        <div
          style={{
            ...styles.cornerOrnament,
            bottom: 0,
            left: 0,
            transform: "rotate(-90deg)",
          }}
        >
          ❋
        </div>
        <div
          style={{
            ...styles.cornerOrnament,
            bottom: 0,
            right: 0,
            transform: "rotate(180deg)",
          }}
        >
          ❋
        </div>

        {/* Floating Diyas */}
        <div
          style={{
            ...styles.floatingDiya,
            top: "45%",
            left: "3%",
            animationDelay: "0s",
          }}
        >
          🪔
        </div>
        <div
          style={{
            ...styles.floatingDiya,
            top: "40%",
            left: "12%",
            animationDelay: "1.5s",
            fontSize: 18,
          }}
        >
          🪔
        </div>
        <div
          style={{
            ...styles.floatingDiya,
            top: "42%",
            right: "10%",
            animationDelay: "0.8s",
          }}
        >
          🪔
        </div>
        <div
          style={{
            ...styles.floatingDiya,
            top: "48%",
            right: "3%",
            animationDelay: "2s",
            fontSize: 18,
          }}
        >
          🪔
        </div>

        {/* Gold Dust Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#F59E0B",
              top: `${15 + ((i * 7) % 70)}%`,
              left: `${5 + ((i * 13) % 90)}%`,
              opacity: 0.3,
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              pointerEvents: "none",
              boxShadow: "0 0 6px rgba(245, 158, 11, 0.8)",
            }}
          />
        ))}

        {/* Top Decorative Element */}
        <div style={styles.heroTopDecor}>
          <span style={styles.decorPaisley}>☙</span>
          <div style={styles.decorDiamond}>◈</div>
          <span style={styles.decorLotus}>✾</span>
          <div style={styles.decorDiamond}>◈</div>
          <span style={{ ...styles.decorPaisley, transform: "scaleX(-1)" }}>
            ☙
          </span>
        </div>

        {/* Main Bilingual Tagline */}
        <div style={styles.taglineContainer}>
          <h1 style={styles.heroTitle}>
            <span style={styles.titleQuestion}>
              {isHindi ? "वास्तु समस्या?" : "Vastu problems?"}
            </span>
            <span style={styles.titleAnswer}>
              {isHindi ? "Solved." : "समाधान।"}
            </span>
          </h1>
        </div>

        {/* Ornate Divider */}
        <div style={styles.ornateDivider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerIcon}>✦</span>
          <div style={styles.dividerCenter}>
            <span style={styles.dividerLotus}>❁</span>
          </div>
          <span style={styles.dividerIcon}>✦</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Credibility Line */}
        <div style={styles.credibilityBadge}>
          <span style={styles.credibilityIcon}>🏛️</span>
          <span style={styles.credibilityText}>{t.heroCredibility}</span>
        </div>

        <button
          onClick={() => scrollToSection(inputSectionRef)}
          style={{
            ...styles.primaryBtn,
            padding: "18px 40px",
            fontSize: 17,
            marginTop: 32,
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {t.analyzeNow}
        </button>

        {/* Bottom Stats with Indian Border */}
        <div style={styles.heroStatsContainer}>
          <div style={styles.statsTopBorder}>
            <span>✦</span>
            <div style={styles.statsBorderLine} />
            <span>❁</span>
            <div style={styles.statsBorderLine} />
            <span>✦</span>
          </div>
          <div style={styles.heroStats}>
            {[
              { num: "16", text: t.vastuZones },
              { num: "9", text: t.planetaryForces },
              { num: "∞", text: t.personalization },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={styles.statDivider}>॥</div>}
                <div style={styles.statBox}>
                  <span style={styles.statNum}>{s.num}</span>
                  <span style={styles.statText}>{s.text}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={howItWorksSectionRef} style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.heroDecor}>
            <div style={styles.decorLine} />
            <span style={styles.accent}>✦</span>
            <div style={styles.decorLine} />
          </div>
          <h2 style={styles.sectionHeading}>{t.howItWorksTitle}</h2>
          <p style={styles.subtitle}>{t.howItWorksSub}</p>
        </div>
        <div style={styles.howGrid}>
          {[
            { num: "01", title: t.step1, desc: t.step1Desc, icon: "⌂" },
            { num: "02", title: t.step2, desc: t.step2Desc, icon: "☉" },
            { num: "03", title: t.step3, desc: t.step3Desc, icon: "🔍" },
            { num: "04", title: t.step4, desc: t.step4Desc, icon: "✦" },
          ].map((step, i) => (
            <div
              key={i}
              style={styles.howCard}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div style={styles.howNum}>{step.num}</div>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{step.icon}</div>
              <h3 style={styles.howTitle}>{step.title}</h3>
              <p style={styles.howDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Input Section */}
      <section ref={inputSectionRef} style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.heroDecor}>
            <div style={styles.decorLine} />
            <span style={styles.accent}>☸</span>
            <div style={styles.decorLine} />
          </div>
          <h2 style={styles.sectionHeading}>{t.startAnalysis}</h2>
          <p style={styles.subtitle}>{t.startAnalysisSub}</p>
        </div>

        {/* Steps */}
        <div style={styles.stepsRow}>
          {[
            { title: "गृह योजना", sub: t.floorPlan, icon: "⌂" },
            { title: "जन्म विवरण", sub: t.birthDetails, icon: "☉" },
            {
              title: "विश्लेषण",
              sub: isHindi ? "विश्लेषण" : "Analysis",
              icon: "✦",
            },
          ].map((s, i) => (
            <React.Fragment key={i}>
              <div
                style={{ ...styles.step, opacity: activeStep >= i ? 1 : 0.4 }}
                onClick={() => i <= activeStep && setActiveStep(i)}
              >
                <div
                  style={{
                    ...styles.stepIcon,
                    background:
                      activeStep >= i
                        ? "linear-gradient(135deg, #F59E0B, #D97706)"
                        : "rgba(255,255,255,0.1)",
                    boxShadow:
                      activeStep === i
                        ? "0 0 30px rgba(245,158,11,0.5)"
                        : "none",
                  }}
                >
                  {s.icon}
                </div>
                <div>
                  <div style={styles.stepTitle}>{s.title}</div>
                  <div style={styles.stepSub}>{s.sub}</div>
                </div>
              </div>
              {i < 2 && (
                <div
                  style={{
                    ...styles.connector,
                    background:
                      activeStep > i
                        ? "linear-gradient(90deg, #F59E0B, #D97706)"
                        : "rgba(255,255,255,0.1)",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Cards */}
        <div style={styles.cardsGrid}>
          {/* Floor Plan */}
          <div
            style={{
              ...styles.card,
              transform: activeStep === 0 ? "scale(1)" : "scale(0.95)",
              opacity: activeStep === 0 ? 1 : 0.5,
              display: !isMobile || activeStep === 0 ? "block" : "none",
            }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>⌂</div>
              <div>
                <h3 style={styles.cardTitle}>{t.floorPlan}</h3>
                <p style={styles.cardSub}>{t.floorPlanSub}</p>
              </div>
            </div>
            <div
              style={{
                ...styles.uploadZone,
                borderColor: floorPlan ? "#10B981" : "rgba(255,255,255,0.2)",
              }}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                style={styles.fileInput}
                onChange={handleFileUpload}
                id="floorPlan"
              />
              <label htmlFor="floorPlan" style={styles.uploadLabel}>
                {floorPlan ? (
                  <>
                    <div style={styles.uploadSuccess}>✓</div>
                    <span style={{ color: "#10B981", fontWeight: 500 }}>
                      {floorPlan.name}
                    </span>
                    <span style={styles.uploadHint}>
                      {isHindi ? "बदलने के लिए क्लिक करें" : "Click to change"}
                    </span>
                  </>
                ) : (
                  <>
                    <div
                      style={{ fontSize: 48, marginBottom: 16, opacity: 0.4 }}
                    >
                      📁
                    </div>
                    <span style={{ fontWeight: 500 }}>{t.dropFloorPlan}</span>
                    <span style={styles.uploadHint}>{t.orBrowse}</span>
                  </>
                )}
              </label>
            </div>
            <button
              style={{
                ...styles.outlineBtn,
                width: "100%",
                opacity: floorPlan ? 1 : 0.5,
              }}
              onClick={() => floorPlan && setActiveStep(1)}
              disabled={!floorPlan}
            >
              {t.continue}
            </button>
          </div>

          {/* Birth Details */}
          <div
            style={{
              ...styles.card,
              transform: activeStep === 1 ? "scale(1)" : "scale(0.95)",
              opacity: activeStep === 1 ? 1 : 0.5,
              display: !isMobile || activeStep === 1 ? "block" : "none",
            }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>☉</div>
              <div>
                <h3 style={styles.cardTitle}>{t.birthDetails}</h3>
                <p style={styles.cardSub}>{t.birthDetailsSub}</p>
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                {t.dob} <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <input
                type="date"
                style={styles.input}
                value={dobData.date}
                onChange={(e) =>
                  setDobData({ ...dobData, date: e.target.value })
                }
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                {t.tob}{" "}
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
                  {t.optional}
                </span>
              </label>
              <input
                type="time"
                style={styles.input}
                value={dobData.time}
                onChange={(e) =>
                  setDobData({ ...dobData, time: e.target.value })
                }
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                {t.pob}{" "}
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
                  {t.optional}
                </span>
              </label>
              <input
                type="text"
                placeholder={
                  isHindi
                    ? "उदा., मुंबई, महाराष्ट्र"
                    : "e.g., Mumbai, Maharashtra"
                }
                style={styles.input}
                value={dobData.place}
                onChange={(e) =>
                  setDobData({ ...dobData, place: e.target.value })
                }
              />
            </div>
            <button
              style={{
                ...styles.outlineBtn,
                width: "100%",
                opacity: dobData.date ? 1 : 0.5,
              }}
              onClick={() => dobData.date && setActiveStep(2)}
              disabled={!dobData.date}
            >
              {t.continue}
            </button>
          </div>

          {/* Analysis */}
          <div
            style={{
              ...styles.card,
              ...styles.analysisCard,
              transform: activeStep === 2 ? "scale(1)" : "scale(0.95)",
              opacity: activeStep === 2 ? 1 : 0.5,
              display: !isMobile || activeStep === 2 ? "block" : "none",
            }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardIcon}>✦</div>
              <div>
                <h3 style={styles.cardTitle}>{t.readyAnalysis}</h3>
                <p style={styles.cardSub}>{t.readyAnalysisSub}</p>
              </div>
            </div>
            <div style={styles.summaryBox}>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>{t.dob}:</span>
                <span style={styles.summaryVal}>{dobData.date || "—"}</span>
              </div>
              {dobData.time && (
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>{t.tob}:</span>
                  <span style={styles.summaryVal}>{dobData.time}</span>
                </div>
              )}
              {dobData.place && (
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>{t.pob}:</span>
                  <span style={styles.summaryVal}>{dobData.place}</span>
                </div>
              )}
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>{t.floorPlan}:</span>
                <span style={styles.summaryVal}>{floorPlan?.name || "—"}</span>
              </div>
            </div>
            <button
              style={{
                ...styles.primaryBtn,
                width: "100%",
                padding: 18,
                opacity: dobData.date && floorPlan ? 1 : 0.5,
              }}
              onClick={handleAnalyze}
              disabled={!dobData.date || !floorPlan || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <div style={styles.spinner} /> {t.analyzing}
                </>
              ) : (
                t.generateReport
              )}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.heroDecor}>
            <div style={styles.decorLine} />
            <span style={styles.accent}>॥</span>
            <div style={styles.decorLine} />
          </div>
          <h2 style={styles.sectionHeading}>{t.aboutTitle}</h2>
          <p style={styles.subtitle}>{t.aboutSub}</p>
        </div>

        <div style={styles.aboutContent}>
          <div style={styles.credBadge}>
            <span style={{ fontSize: 40 }}>🏛️</span>
            <div>
              <div style={{ color: "#F59E0B", fontWeight: 600, fontSize: 18 }}>
                {t.iitBacked}
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
                {t.yearsExp}
              </div>
            </div>
          </div>

          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            {t.aboutDesc}
          </p>

          {/* Trust indicators */}
          <div style={styles.trustGrid}>
            <div style={styles.trustItem}>
              <span style={{ fontSize: 32 }}>🕉️</span>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {isHindi
                    ? "प्रामाणिक वास्तु शास्त्र"
                    : "Authentic Vastu Shastra"}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                  {isHindi
                    ? "प्राचीन ग्रंथों पर आधारित"
                    : "Based on ancient scriptures"}
                </div>
              </div>
            </div>
            <div style={styles.trustItem}>
              <span style={{ fontSize: 32 }}>🎓</span>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {isHindi ? "IIT वास्तुकार" : "IIT Architects"}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                  {isHindi ? "20+ वर्षों का अनुभव" : "20+ years experience"}
                </div>
              </div>
            </div>
            <div style={styles.trustItem}>
              <span style={{ fontSize: 32 }}>🏠</span>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {isHindi ? "बिना तोड़-फोड़ उपाय" : "Non-Demolition Remedies"}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                  {isHindi
                    ? "सरल और प्रभावी समाधान"
                    : "Simple & effective solutions"}
                </div>
              </div>
            </div>
            <div style={styles.trustItem}>
              <span style={{ fontSize: 32 }}>📿</span>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {isHindi
                    ? "व्यक्तिगत कुंडली विश्लेषण"
                    : "Personalized Kundli Analysis"}
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                  {isHindi
                    ? "आपकी जन्म पत्रिका के अनुसार"
                    : "Based on your birth chart"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerMain}>
            <div style={styles.footerBrand}>
              <div style={styles.logo}>
                <span style={styles.logoIcon}>॥</span>
                <span style={styles.logoText}>
                  Vastu<span style={styles.accent}>Samadhan</span>
                </span>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  margin: "16px 0 20px",
                }}
              >
                {t.footerTagline}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                {["𝕏", "in", "📷"].map((s, i) => (
                  <a key={i} href="#" style={styles.socialBtn}>
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div style={styles.footerLinks}>
              <div style={styles.footerCol}>
                <h4 style={styles.footerColTitle}>{t.quickLinks}</h4>
                <a href="#" style={styles.footerLink}>
                  {t.home}
                </a>
                <a href="#how" style={styles.footerLink}>
                  {t.howItWorks}
                </a>
                <a href="#about" style={styles.footerLink}>
                  {t.aboutTitle}
                </a>
              </div>
              <div style={styles.footerCol}>
                <h4 style={styles.footerColTitle}>{t.services}</h4>
                <a href="#" style={styles.footerLink}>
                  {t.vastuAnalysis}
                </a>
                <a href="#" style={styles.footerLink}>
                  {t.remedialPlans}
                </a>
                <a href="#" style={styles.footerLink}>
                  {t.expertConsult}
                </a>
              </div>
              <div style={styles.footerCol}>
                <h4 style={styles.footerColTitle}>{t.contactUs}</h4>
                <div style={styles.contactItem}>📧 hello@vastusamadhan.in</div>
                <a
                  href="https://wa.me/919XXXXXXXXX?text=Hi%20VastuSamadhan%2C%20I%20need%20help%20with%20my%20home%20Vastu"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...styles.contactItem, color: "#25D366" }}
                >
                  {t.whatsappUs}
                </a>
                <div style={styles.contactItem}>📍 India</div>
              </div>
            </div>
          </div>

          <div style={styles.footerDivider} />
          <div style={styles.footerBottom}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
              © 2024 VastuSamadhan. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              <a href="#" style={styles.legalLink}>
                {t.privacyPolicy}
              </a>
              <a href="#" style={styles.legalLink}>
                {t.termsService}
              </a>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "32px 24px 48px" }}>
          <span style={{ fontSize: 36, color: "#F59E0B", opacity: 0.6 }}>
            ॐ
          </span>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontStyle: "italic",
              marginTop: 12,
            }}
          >
            {t.footerMantra}
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919XXXXXXXXX?text=Hi%20VastuSamadhan%2C%20I%20need%20help%20with%20my%20home%20Vastu"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.whatsappFloat}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <svg
          viewBox="0 0 24 24"
          style={{ width: 28, height: 28, fill: "white" }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
