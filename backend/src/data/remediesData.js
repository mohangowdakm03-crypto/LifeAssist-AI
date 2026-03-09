export const remediesData = [
  {
    condition: "fever",
    aliases: ["temperature", "high fever", "body heat"],
    possibleCauses: ["Viral infection", "Flu", "Bacterial infection", "Dehydration"],
    homeRemedies: [
      "Rest and avoid physical exertion",
      "Drink warm fluids and water every 30-60 minutes",
      "Use a lukewarm sponge bath",
      "Wear lightweight clothing"
    ],
    medicines: [
      {
        name: "Paracetamol",
        usage: "Reduces fever and body pain",
        safeDosage: "Adults: 500-650 mg every 4-6 hours (max 3000 mg/day)",
        warnings: ["Do not combine with other acetaminophen products", "Avoid alcohol"],
        avoidWhen: ["Severe liver disease"]
      },
      {
        name: "Ibuprofen",
        usage: "Fever and inflammation relief",
        safeDosage: "Adults: 200-400 mg every 6-8 hours (max 1200 mg/day OTC)",
        warnings: ["Take with food", "Can irritate stomach"],
        avoidWhen: ["Kidney disease", "Stomach ulcers", "Third trimester pregnancy"]
      }
    ],
    whenToSeeDoctor: [
      "Fever lasts more than 3 days",
      "Temperature exceeds 103 F (39.4 C)",
      "Severe dehydration signs"
    ],
    emergencyWarningSigns: ["Confusion", "Trouble breathing", "Seizure", "Persistent chest pain"]
  },
  {
    condition: "cold",
    aliases: ["runny nose", "blocked nose", "sneezing"],
    possibleCauses: ["Common viral infection", "Seasonal exposure"],
    homeRemedies: [
      "Warm soups and fluids",
      "Steam inhalation 1-2 times daily",
      "Salt water gargles",
      "Sleep 7-9 hours"
    ],
    medicines: [
      {
        name: "Cetirizine",
        usage: "Relieves runny nose and sneezing",
        safeDosage: "Adults: 10 mg once daily",
        warnings: ["May cause drowsiness"],
        avoidWhen: ["Severe kidney disease without physician guidance"]
      },
      {
        name: "Nasal saline spray",
        usage: "Helps clear nasal congestion",
        safeDosage: "1-2 sprays per nostril, up to 3-4 times/day",
        warnings: ["Use sterile products"],
        avoidWhen: []
      }
    ],
    whenToSeeDoctor: [
      "Symptoms longer than 10 days",
      "Severe sinus pain",
      "High fever above 102 F"
    ],
    emergencyWarningSigns: ["Shortness of breath", "Chest pain", "Blue lips"]
  },
  {
    condition: "headache",
    aliases: ["migraine", "head pain"],
    possibleCauses: ["Stress", "Dehydration", "Migraine", "Lack of sleep", "Eye strain"],
    homeRemedies: [
      "Hydrate well",
      "Rest in a dark quiet room",
      "Cold or warm compress on head/neck",
      "Limit screen time"
    ],
    medicines: [
      {
        name: "Paracetamol",
        usage: "Mild-to-moderate headache relief",
        safeDosage: "Adults: 500-650 mg every 4-6 hours (max 3000 mg/day)",
        warnings: ["Avoid overdose"],
        avoidWhen: ["Severe liver disease"]
      },
      {
        name: "Ibuprofen",
        usage: "Pain and inflammation relief",
        safeDosage: "Adults: 200-400 mg every 6-8 hours",
        warnings: ["Take with food"],
        avoidWhen: ["Ulcers", "Kidney disease"]
      }
    ],
    whenToSeeDoctor: [
      "Headache after head injury",
      "Frequent severe headaches",
      "Headache with fever and stiff neck"
    ],
    emergencyWarningSigns: ["Sudden worst headache", "Weakness on one side", "Trouble speaking"]
  },
  {
    condition: "burn",
    aliases: ["burn injury", "scald"],
    possibleCauses: ["Heat exposure", "Hot liquid", "Chemical contact"],
    homeRemedies: [
      "Cool burn under running cool water for 20 minutes",
      "Remove tight items near burn",
      "Cover with clean non-stick dressing",
      "Do not apply ice or toothpaste"
    ],
    medicines: [
      {
        name: "Aloe vera gel",
        usage: "Soothes minor superficial burns",
        safeDosage: "Apply a thin layer 2-3 times daily",
        warnings: ["Use on minor burns only"],
        avoidWhen: ["Deep or charred burns"]
      },
      {
        name: "Ibuprofen",
        usage: "Pain relief",
        safeDosage: "Adults: 200-400 mg every 6-8 hours",
        warnings: ["Take with food"],
        avoidWhen: ["Kidney disease", "Ulcer history"]
      }
    ],
    whenToSeeDoctor: [
      "Burn larger than palm size",
      "Burn on face, hands, feet, genitals",
      "Blistering or deep burns"
    ],
    emergencyWarningSigns: ["Difficulty breathing", "Electrical burn", "Chemical burn to eyes"]
  },
  {
    condition: "minor injury",
    aliases: ["small cut", "abrasion", "sprain"],
    possibleCauses: ["Fall", "Sports injury", "Sharp object cut"],
    homeRemedies: [
      "Clean wound with running water",
      "Apply gentle pressure to stop bleeding",
      "Use RICE for sprain: rest, ice, compression, elevation",
      "Use sterile dressing"
    ],
    medicines: [
      {
        name: "Topical antiseptic",
        usage: "Reduce infection risk in minor cuts",
        safeDosage: "Apply a small amount after cleaning",
        warnings: ["Do not use on deep wounds"],
        avoidWhen: ["Known allergy to ingredients"]
      },
      {
        name: "Paracetamol",
        usage: "Pain relief",
        safeDosage: "Adults: 500-650 mg every 4-6 hours",
        warnings: ["Respect max daily dose"],
        avoidWhen: ["Liver disease"]
      }
    ],
    whenToSeeDoctor: [
      "Wound edges are wide apart",
      "Bleeding does not stop after 10 minutes pressure",
      "Signs of infection"
    ],
    emergencyWarningSigns: ["Heavy bleeding", "Visible bone", "Loss of consciousness"]
  },
  {
    condition: "food poisoning",
    aliases: ["vomiting and diarrhea", "stomach infection"],
    possibleCauses: ["Contaminated food", "Viral gastroenteritis", "Bacterial toxins"],
    homeRemedies: [
      "Small frequent sips of ORS",
      "Eat bland food like rice and toast",
      "Avoid milk, alcohol, and oily foods",
      "Rest"
    ],
    medicines: [
      {
        name: "ORS",
        usage: "Prevents dehydration",
        safeDosage: "Frequent small sips after each loose stool",
        warnings: ["Prepare exactly as instructed"],
        avoidWhen: []
      },
      {
        name: "Bismuth subsalicylate",
        usage: "Temporary diarrhea relief",
        safeDosage: "Follow label directions",
        warnings: ["Avoid in children with viral illness"],
        avoidWhen: ["Aspirin allergy", "Pregnancy without medical guidance"]
      }
    ],
    whenToSeeDoctor: [
      "Symptoms > 24 hours with no improvement",
      "Unable to keep fluids down",
      "Blood in stool"
    ],
    emergencyWarningSigns: ["Severe dehydration", "Confusion", "Very low urine output"]
  },
  {
    condition: "acidity",
    aliases: ["acid reflux", "heartburn"],
    possibleCauses: ["Spicy/oily meals", "Late-night eating", "Stress"],
    homeRemedies: [
      "Eat smaller meals",
      "Avoid lying down for 2-3 hours after eating",
      "Limit spicy, acidic, and caffeinated drinks",
      "Elevate head while sleeping"
    ],
    medicines: [
      {
        name: "Antacid",
        usage: "Quick relief of heartburn symptoms",
        safeDosage: "Follow product label after meals and before bedtime",
        warnings: ["Not for prolonged daily use without doctor advice"],
        avoidWhen: ["Severe kidney disease"]
      },
      {
        name: "Famotidine",
        usage: "Reduces stomach acid",
        safeDosage: "Adults: 10-20 mg once or twice daily",
        warnings: ["Use short term"],
        avoidWhen: ["Severe kidney impairment unless advised"]
      }
    ],
    whenToSeeDoctor: [
      "Symptoms more than twice per week",
      "Unintended weight loss",
      "Persistent vomiting"
    ],
    emergencyWarningSigns: ["Severe chest pain", "Black stool", "Difficulty swallowing"]
  },
  {
    condition: "cough",
    aliases: ["dry cough", "wet cough", "throat irritation"],
    possibleCauses: ["Viral respiratory infection", "Allergy", "Postnasal drip"],
    homeRemedies: [
      "Warm fluids and honey (if age > 1 year)",
      "Use humidifier",
      "Avoid smoke exposure",
      "Gargle warm salt water"
    ],
    medicines: [
      {
        name: "Dextromethorphan syrup",
        usage: "Temporary relief of dry cough",
        safeDosage: "Use dose per product label",
        warnings: ["Can interact with some antidepressants"],
        avoidWhen: ["Children below label age"]
      },
      {
        name: "Guaifenesin",
        usage: "Helps loosen mucus",
        safeDosage: "Follow label dosing with water",
        warnings: ["Hydrate well"],
        avoidWhen: []
      }
    ],
    whenToSeeDoctor: [
      "Cough longer than 3 weeks",
      "High fever or chest pain",
      "Wheezing"
    ],
    emergencyWarningSigns: ["Coughing blood", "Severe shortness of breath", "Blue lips"]
  }
];
