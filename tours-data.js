const WHATSAPP_NUMBER = "923039465839";
const PAGE_SIZE = 6;
const RAW_TOURS = [

  {
    title: "07 DAYS TOUR TO SWAT & NARAN VALLEY",
    duration: {
      days: 7,
      nights: 6
    },
    departure: "Every Sunday Morning From Islamabad",
    cost: {
      perHeadIslamabad: 34000,
      couplePackage: 78000
    },
    servicesIncluded: [
      "Air conditioned, luxury Transportation (Saloon Coaster/Grand Cabin)",
      "06 night hotel stay with 4/5 persons sharing in a room",
      "Twin sharing/couple Separate room",
      "Quality meals (07 Breakfasts + 06 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding or any other reason",
      "Emergency rescue",
      "Jeep Charges",
      "Anything not mentioned explicitly in the package",
      "Any sort of Tickets and Heater Charges"
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          "Pick up from Hotel, Islamabad",
          "Departure from Islamabad",
          "Breakfast at Hotel",
          "Departure for Swat, kalam",
          "Short stay at Fizzaghat",
          "Reach kalam",
          "Visit Mall Road kalam",
          "Dinner & Night Stay at kalam"
        ]
      },
      {
        day: 2,
        activities: [
          "Breakfast at Hotel",
          "Shift to Jeep",
          "Departure for Mohdand Lake",
          "Visit Ushu Forest",
          "Visit Palogha Village",
          "Dinner & Night stay at Kalam"
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at Hotel",
          "Start traveling towards Mallam Jabba",
          "Reach Malam Jabba",
          "Visit PC Hotel Malam Jabba",
          "All Excurions Zipline & Chairlift (charges not included)",
          "Dinner & Night stay at Malam Jabba"
        ]
      },
      {
        day: 4,
        activities: [
          "Breakfast",
          "Arrival at Balakot",
          "Short stay at kawai waterfall",
          "Shift in jeeps",
          "Reach Shogran",
          "Explore Shogran",
          "Reach Siri paye",
          "Traveling back to Naran",
          "Reach Naran",
          "Check-in",
          "Dinner and night stay at Hotel in Naran/Mahandri"
        ]
      },
      {
        day: 5,
        activities: [
          "Breakfast at Punjab Tikka",
          "Start traveling to Babusrtop",
          "Short stay at batakundi",
          "Short stay at besal",
          "Short stay at lulusir lake",
          "Reach babusrtop",
          "Explore surroundings",
          "Back to burawai in evening",
          "Check-in Hotel",
          "Dinner & Night stay at hotel Naran / Burawai"
        ]
      },
      {
        day: 6,
        activities: [
          "Breakfast",
          "Departure for Naran",
          "Reach Naran",
          "Shift in Jeeps",
          "Start traveling towards Saif ul malook",
          "Explore Saifulmalook lake",
          "Spend quality time",
          "Back to Naran",
          "Dinner & Night Stay in Naran"
        ]
      },
      {
        day: 7,
        activities: [
          "Breakfast",
          "River Rafting in Naran",
          "Shopping at Naran bazar",
          "Start traveling to Islamabad",
          "Short stay at balakot for lunch etc",
          "Reach Islamabad",
          "Drop at Islamabad",
          "Reach Back Home at with memorable Journey In Sha Allah 🙂"
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "ALFALAH BANK",
          accountName: "Muhammed Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "8 DAYS TOUR TO NARAN VALLEY, FAIRY MEADOWS & HUNZA VALLEY, NALTAR VALLEY AND SHANGRILA RESORT (VIA NARAN)",
    duration: {
      days: 8,
      nights: 7
    },
    departure: {
      lahore: "Every Friday Night From Lahore",
      islamabad: "Every Saturday Early Morning From Islamabad"
    },
    cost: {
      lahore: 37000,
      islamabad: 37000,
      couplePackage: 88000
    },
    placesVisited: [
      "Hazara Expressway",
      "Balakot",
      "Kawai Waterfall",
      "Kaghan Valley",
      "Naran Valley",
      "River Kunhar",
      "Saif al Malok Lake",
      "Batakundi",
      "Burawai",
      "Jalkhad",
      "Babusar Top",
      "Chillas",
      "Junction Point (Pahari sililay)",
      "Nanga Parbat view point",
      "Gilgit",
      "Naltar Valley",
      "Satrangi Lake",
      "Blue Lake",
      "Rakaposhi view point",
      "Altit fort",
      "Baltit fort",
      "Kareemabad Bazar",
      "Attabad Tunnels",
      "Attabad Lake",
      "Hussaini Bridge",
      "Passu Glacier",
      "Passu Cones",
      "Magistic Karakoram Highway",
      "Royal Garden",
      "Khunjerab pass",
      "Khunjerab national park",
      "China border",
      "Indus River",
      "Tattu village",
      "Fairy Lake",
      "Base Camp",
      "Fairy Meadows",
      "Byal Camp"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "7 night hotel stay on basis 4/5 person per room sharing (beds + mattresses)",
      "Quality meals (8 Breakfasts + 7 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "Photography",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Entry Tickets",
      "Tea, Mineral water and Cold drinks expense",
      "Extra expenses due to the acts of nature and political reasons",
      "Tickets of forts, boating, Rafting and parks etc not included",
      "Jeep charges",
      "Vehicle use incase of road blockage/ any extra expense"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure From Lahore at 10:00 PM on booked Luxury Transport."
        ]
      },
      {
        day: 1,
        activities: [
          "20 minutes stay at Bhera Interchange/Mian Gee Restaurant Gt Road",
          "Reach Islamabad",
          "Pick up Islamabad/Rawalpindi participants from Daewoo Terminal",
          "Breakfast at Balakot",
          "Reach kiwai",
          "Short stay at Kiwai waterfall",
          "Arrival at Naran",
          "Visit River Kunhar & Naran Bazar",
          "Move towards Upper kaghan Valley",
          "Rafting at River Kunhar",
          "Reach Batakundi",
          "Borawai",
          "Dinner at 8:00 pm",
          "Night Stay in Borawai/Chillas"
        ]
      },
      {
        day: 2,
        activities: [
          "Breakfast at 9:00 am",
          "Reach Lulusar Lake",
          "Spend some time at Lulusar lake",
          "Reach Babusar Top",
          "Reach Raikot Bridge",
          "Shifted in Jeep travelling towards Tattu village",
          "Hiking Towards Fairy Meadows 3 Hours",
          "Reached at Fairy Meadows",
          "Dinner & Night stay Hotel"
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at 9:00 am",
          "Start Hiking Towards Byal Camp",
          "Explore Byal Camp & View point",
          "Dinner & night at Fairy Meadows/ Byal Camp"
        ]
      },
      {
        day: 4,
        activities: [
          "Breakfast at Hotel",
          "Start Hiking Towards Fairy Meadows",
          "Reached at Fairy Meadows",
          "Dinner & Night stay at Fairy Meadows"
        ]
      },
      {
        day: 5,
        activities: [
          "Breakfast at 9:00 pm",
          "Back to Tattu village Shifted in Jeep Towards Raikot Bridge",
          "Travaling towards Hunza on the way",
          "Sightseeing",
          "Nangaparbat view point",
          "Three Mountain Junction",
          "Rakaposhi view point",
          "Till night Reach Hunza",
          "Stay night in Hunza"
        ]
      },
      {
        day: 6,
        activities: [
          "Breakfast at Hotel",
          "Traveling towards China border",
          "Visit Attabad lake",
          "Hussaini bridge Passu cones",
          "Passu glacier",
          "Via Sost bazar reach china border",
          "Explore khunjrab pass",
          "Back to Hunza",
          "Stay night in Hunza"
        ]
      },
      {
        day: 7,
        activities: [
          "Breakfast at hotel",
          "Visit Altit Fort",
          "Visit Baltit Fort",
          "Kareemabad Bazar",
          "Visit Rakaposhi view point",
          "Traveling back to Chillas",
          "Reach Chillas",
          "Dinner and Night stay in Chillas/Borawai"
        ]
      },
      {
        day: 8,
        activities: [
          "Breakfast at Hotel",
          "Reach Naran",
          "Reach Saif Al Malok Lake by Jeep",
          "Spend Some time at Saif Al Malok Lake",
          "Traveling back to Lahore & Islamabad",
          "Sightseeing on the way back",
          "Short stay for Lunch (By yourself)",
          "Reach Islamabad",
          "Drop Participant of Islamabad at Daewoo terminal",
          "Traveling to Lahore",
          "Reach Lahore with memorable Journey InshAllah."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charged"
    },
    paymentProcedure: {
      policy: "Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "ALFALAH BANK",
          accountName: "Muhammed Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "8 DAYS TOUR TO NARAN VALLEY, SKARDU VALLEY, FAIRY MEADOWS & SHANGRILA RESORT (VIA NARAN)",
    duration: {
      days: 8,
      nights: 7
    },
    departure: {
      lahore: "Every Friday Night from Lahore",
      islamabad: "Every Saturday Early Morning From Islamabad"
    },
    departurePoints: {
      lahore: "Thokar Niaz Baig, Lahore",
      islamabad: "Daewoo Terminal near Nust Eme"
    },
    cost: {
      lahore: 38000,
      islamabad: 38000,
      couplePackage: 90000
    },
    placesVisited: [
      "Hazara Expressway",
      "Balakot",
      "Kiwai Waterfall",
      "Kaghan Valley",
      "Naran Valley",
      "River Kunhar",
      "Saif al Malok Lake",
      "Batakundi",
      "Borawai",
      "Jhalkand",
      "Babusar Top",
      "Chillas",
      "Junction Point (Pahari sililay)",
      "Nanga Parbat view point",
      "Raikot Bridge",
      "Tattu Village",
      "Fairy Meadows",
      "Nangaparbat Base Camp",
      "Magistic Karakoram Highway",
      "Skardu Road",
      "Dambu Das",
      "Astaknala",
      "Indus River",
      "Skardu valley",
      "Shangrila Resort",
      "Lower Kachura Lake",
      "Upper Kachura Lake",
      "Sadpara Lake",
      "Mantoka Waterfall",
      "Shigar Valley",
      "Shigar Fort",
      "Sarfranga Cold Desert",
      "Katpana lake",
      "Katpana cold desert",
      "Skardu city",
      "Deosai",
      "Kala pani/Bara pani",
      "Sheosar Lake"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "7 night hotel stay on basis 4/5 person per room sharing (beds + mattresses)",
      "Twin sharing/couple separate room",
      "Quality meals (8 Breakfasts + 7 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "Photography",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Entry Tickets",
      "Tea, Mineral water and Cold drinks expense",
      "Extra expenses due to the acts of nature and political reasons",
      "Tickets of forts, boating, Rafting and parks etc not included",
      "Jeep charges",
      "Vehicle use incase of road blockage/ any extra expense"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure From Lahore at 10:00 PM on booked Luxury Transport."
        ]
      },
      {
        day: 1,
        activities: [
          "20 minutes stay at Bhera Interchange/Mian Gee Restaurant Gt Road",
          "Reach Islamabad",
          "Pick up Islamabad/Rawalpindi participants from Daewoo Terminal",
          "Breakfast at Balakot",
          "Reach kiwai",
          "Short stay at Kiwai waterfall",
          "Arrival at Naran",
          "Visit River Kunhar & Naran Bazar",
          "Move towards Upper kaghan Valley",
          "Rafting at River Kunhar",
          "Reach Batakundi",
          "Borawai",
          "Dinner at 8:00 pm",
          "Night Stay in Borawai/Chillas"
        ]
      },
      {
        day: 2,
        activities: [
          "Breakfast at 9:00 am",
          "Reach Lulusar Lake",
          "Spend some time at Lulusar lake",
          "Reach Babusar Top",
          "Reach Chillas",
          "Traveling to Skardu valley",
          "Visit Nanga Parbat view Point",
          "Visit junction of mountain Ranges",
          "Traveling via Adventures Skardu Road",
          "Visit Shangrila Resort",
          "Upper Kachura Lake",
          "Night Reached Skardu",
          "Stay night in Skardu Hotel"
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at 9:00 am",
          "Traveling to Manthokha Water Fall",
          "Visit Mighty beautifull waterfall",
          "Back to Shigar valley",
          "Visit cold desert",
          "Visit Sarfarhanga Desert",
          "Travelling back to Skardu",
          "Stay night in Skardu"
        ]
      },
      {
        day: 4,
        activities: [
          "Breakfast at Hotel",
          "Transfer Into jeeps",
          "Move Towards Deosai",
          "Visit sadpara Lake",
          "Visit Deosai",
          "Visit Kala Pani and Bara Pani",
          "Visit sheosar Lake",
          "Night stay in Skardu"
        ]
      },
      {
        day: 5,
        activities: [
          "Breakfast at 9:00 pm",
          "If any point left visit it",
          "Travaling towards Hunza on the way",
          "Sightseeing",
          "Astaknala",
          "Move to Raikot",
          "Shifted in jeep for Fairy Meadows",
          "Reach at Tattu village",
          "Start trekking Towards Fm",
          "Dinner & Night Stay At Fairy Meadows"
        ]
      },
      {
        day: 6,
        activities: [
          "Breakfast at Hotel",
          "Start Trekking towards Nangaparbat Base Camp",
          "Explore Naangaparbat whole day",
          "Back to Fm",
          "Dinner & Night stay at Fm"
        ]
      },
      {
        day: 7,
        activities: [
          "Breakfast at hotel",
          "Start Trekking towards Tattu Village",
          "Shifted in Jeep For Raikot Bridge",
          "Reach at Raikot",
          "Traveling back to Chillas",
          "Reach Chillas",
          "Dinner and Night stay in Chillas/Borawai"
        ]
      },
      {
        day: 8,
        activities: [
          "Breakfast at Hotel",
          "Reach Naran",
          "Reach Saif Al Malok Lake by Jeep",
          "Spend Some time at Saif Al Malok Lake",
          "Traveling back to Iahore & Islamabad",
          "Sight seeing on the way back",
          "Short stay for Lunch (By yourself)",
          "Reach Islamabad",
          "Drop Participant of Islamabad at Daewoo terminal",
          "Traveling to Lahore",
          "Reach Lahore with memorable Journey InshAllah."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charged"
    },
    paymentProcedure: {
      policy: "Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "ALFALAH BANK",
          accountName: "Muhammed Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "07 DAYS TOUR TO KASHMIR & NARAN VALLEY ( ARRANGKEL, TAOBAT, SAIF UL MALOOK LAKE, BABUSRTOP, SHOGRAN & SIRI PAYE )",
    duration: {
      days: 7,
      nights: 6
    },
    departure: "Every Sunday Morning From Islamabad",
    cost: {
      perHeadIslamabad: 35000,
      couplePackage: 85000
    },
    placesVisited: [
      "Muzzafrabad",
      "Dhani Waterfall",
      "Kutton Waterfall",
      "Neelam Jehlum Dam",
      "Keran",
      "Upper Neelam",
      "Sharda",
      "Halmat",
      "Taobat",
      "Janawai",
      "Kel",
      "Arang Kel",
      "Kashmir Waterfall",
      "Balakot",
      "kawai waterfall",
      "Naran",
      "Saifulmalook lake",
      "Batakundi",
      "Burawai",
      "Shogran",
      "Siri Paye",
      "lulusar lake",
      "pyala lake",
      "Babusartop"
    ],
    servicesIncluded: [
      "Air conditioned, luxury Transportation (Saloon Coaster/Grand Cabin)",
      "06 night hotel stay with 4/5 persons sharing in a room",
      "Twin sharing/couple Separate room",
      "Quality meals (07 Breakfasts +06 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding or any other reason",
      "Emergency rescue",
      "Jeep Charges",
      "Anything not mentioned explicitly in the package",
      "Any sort of Tickets and Heater Charges"
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          "Pick up from Hotel, Islamabad",
          "Departure from Islamabad",
          "Arrival at Murree Express Highway",
          "Reach Kashmir Waterfall",
          "Spend some time at Kashmir Waterfall",
          "Arrival at Muzaffarabad",
          "Reach Dhani Waterfall",
          "Short stay at Dhani Waterfall",
          "Neelam Jhelum dam on the way",
          "Reach Kutton Waterfall",
          "Spend some time at Kutton Waterfall",
          "Departure for Keran",
          "Reached Keran",
          "Visit upper neelam",
          "Check-in Hotel",
          "Dinner and Night stay in Keran/Sharda"
        ]
      },
      {
        day: 2,
        activities: [
          "Early wakeup call",
          "Breakfast at hotel",
          "Reach Sharda",
          "Transfer to jeep for kel",
          "Arrival at Kel",
          "Explore Kel",
          "Start Travelling towards Taobat A Place with Beautiful Scenery",
          "Reach Halmat",
          "Reach Taobat",
          "Spend Quality at Taobat",
          "Dinner and night stay at Halmat/Taobat"
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at Hotel",
          "Reach back Kel",
          "Hike towards Arang kel (45 mins)",
          "Spend Quality time at Arang kel",
          "Reach Back Kel",
          "Visit kel Surroundings",
          "Reach back Sharda",
          "Check-in Hotel",
          "Night stay at Sharda"
        ]
      },
      {
        day: 4,
        activities: [
          "Early Morning Wakeup call 7:00 am",
          "Explore the Surroundings of Sharda",
          "Sight View & Photography",
          "Departure for Muzzafrabad",
          "Arrival at Balakot",
          "Short stay at kawai waterfall",
          "Shift in jeeps",
          "Reach Shogran",
          "Explore Shogran",
          "Reach Siri paye",
          "Traveling back to Naran",
          "Reach Naran",
          "Check-in",
          "Dinner and night stay at Hotel in Naran/ Mahandri"
        ]
      },
      {
        day: 5,
        activities: [
          "Breakfast at Punjab Tikka",
          "start traveling to Babusrtop",
          "Short stay at batakundi",
          "Short stay at besal",
          "Short stay at lulusir lake",
          "Reach babusrtop",
          "Explore surroundings",
          "back to burawai in evening",
          "check-in Hotel",
          "Dinner & Night stay at hotel Naran / Burawai"
        ]
      },
      {
        day: 6,
        activities: [
          "Breakfast",
          "Departure for Naran",
          "Reach Naran",
          "Shift in Jeeps",
          "Start traveling towards Saif ul malook",
          "Explore Saifulmalook lake",
          "Spend quality time",
          "Back to Naran",
          "Dinner & Night Stay in Naran"
        ]
      },
      {
        day: 7,
        activities: [
          "Breakfast",
          "River Rafting in Naran",
          "shopping at Naran bazar",
          "start traveling to Islamabad",
          "Short stay at balakot for lunch etc",
          "Reach Islamabad",
          "Drop at Islamabad",
          "Reach Back Home at with memorable Journey In Sha Allah 🙂"
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "ALFALAH BANK",
          accountName: "Muhammed Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },


  {
    title: "8 DAYS TOUR TO NARAN VALLEY, SKARDU VALLEY, HUNZA VALLEY, NALTAR VALLEY AND SHANGRILA RESORT (VIA NARAN)",
    duration: {
      days: 8,
      nights: 7
    },
    departure: {
      schedule: "Every Friday Night from Lhr & Every Saturday early Morning from isb"
    },
    departurePoints: {
      lahore: "Thokar Niaz Baig, Lahore",
      islamabad: "Daewoo Terminal near Nust Eme"
    },
    cost: {
      lahore: 40000,
      islamabad: 40000,
      couplePackage: 94000
    },
    placesVisited: [
      "Hazara Expressway", "Balakot", "Kiwai Waterfall", "Kaghan Valley", "Naran Valley",
      "River Kunhar", "Saif al Malok Lake", "Batakundi", "Borawai", "Jhalkand",
      "Babusar Top", "Chillas", "Junction Point (Pahari sililay)", "Nanga Parbat view point",
      "Gilgit", "Naltar Valley", "Satrangi Lake", "Blue Lake", "Rakaposhi view point",
      "Altit fort", "Baltit fort", "Kareemabad Bazar", "Attabad Tunnels", "Attabad Lake",
      "Hussaini Bridge", "Passu Glacier", "Passu Cones", "Magistic Karakoram Highway",
      "Royal Garden", "Khunjerab pass", "Khunjerab national park", "China border",
      "Skardu Road", "Dambu Das", "Astaknala", "Indus River", "Skardu valley",
      "Shangrila Resort", "Lower Kachura Lake", "Upper Kachura Lake", "Sadpara lake",
      "Mantoka Waterfall", "Shigar Valley", "Shigar Fort", "Sarfranga Cold Desert",
      "Katpana lake", "Katpana cold desert", "Skardu city", "Deosai", "Kala pani/Bara pani",
      "Sheosar Lake"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "7 night hotel stay on basis 4/5 person per room sharing (beds + mattresses)",
      "Quality meals (8 Breakfasts + 7 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "Photography",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Entry Tickets",
      "Tea, Mineral water and Cold drinks expense",
      "Extra expenses due to the acts of nature and political reasons",
      "Tickets of forts, boating, Rafting and parks etc not included",
      "Jeep charges",
      "Vehicle use incase of road blockage/ any extra expense"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure From Lahore at 10:00 PM on booked Luxury Transport."
        ]
      },
      {
        day: 1,
        activities: [
          "20 minutes stay at Bhera Interchange/Mian Gee Restaurant Gt Road",
          "Reach Islamabad",
          "Pick up Islamabad/Rawalpindi participants from Daewoo Terminal",
          "Breakfast at Balakot",
          "Reach kiwai",
          "Short stay at Kiwai waterfall",
          "Arrival at Naran",
          "Visit River Kunhar & Naran Bazar",
          "Move towards Upper kaghan Valley",
          "Rafting at River Kunhar",
          "Reach Batakundi",
          "Borawai",
          "Dinner at 8:00 pm",
          "Night Stay in Borawai/Chillas"
        ]
      },
      {
        day: 2,
        activities: [
          "Breakfast at 9:00 am",
          "Reach Lulusar Lake",
          "Spend some time at Lulusar lake",
          "Reach Babusar Top",
          "Reach Chillas",
          "Traveling to Skardu valley",
          "Visit Nanga Parbat view Point",
          "Visit junction of mountain Ranges",
          "Traveling via Adventures Skardu Road",
          "Visit Shangrila Resort",
          "Upper Kachura Lake",
          "Night Reached Skardu",
          "Stay night in Skardu Hotel"
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at 9:00 am",
          "Traveling to Manthokha Water Fall",
          "Visit Mighty beautifull waterfall",
          "Back to Shigar valley",
          "Visit cold desert",
          "Visit Sarfarhanga Desert",
          "Katpana lake",
          "Travelling back to Skardu",
          "Stay night in Skardu"
        ]
      },
      {
        day: 4,
        activities: [
          "Breakfast at Hotel",
          "Transfer Into jeeps",
          "Move Towards Deosai",
          "Visit sadpara Lake",
          "Visit Deosai",
          "Visit Kala Pani and Bara Pani",
          "Visit sheosar Lake",
          "Night stay in Skardu"
        ]
      },
      {
        day: 5,
        activities: [
          "Breakfast at 9:00 pm",
          "If any point left visit it",
          "Travaling towards Hunza on the way",
          "Sightseeing",
          "Astaknala",
          "Haramosh",
          "Reach Gilgit",
          "Reach Nomal and Transfer to Jeeps for Naltar Valley",
          "Reach Naltar Valley Zero Point",
          "Reach Satrangi Lake",
          "Explore Satrangi Lake",
          "Explore Blue Lake",
          "Till night Reach Hunza",
          "Stay night in Hunza"
        ]
      },
      {
        day: 6,
        activities: [
          "Breakfast at Hotel",
          "Traveling towards China border",
          "Visit Attabad lake",
          "Hussaini bridge Passu cones",
          "Passu glacier",
          "Via Sost bazar reach china border",
          "Explore khunjrab pass",
          "Back to Hunza",
          "Stay night in Hunza"
        ]
      },
      {
        day: 7,
        activities: [
          "Breakfast at hotel",
          "Visit Altit Fort",
          "Visit Baltit Fort",
          "Kareemabad Bazar",
          "Visit Rakaposhi view point",
          "Traveling back to Chillas",
          "Reach Chillas",
          "Dinner and Night stay in Chillas/Borawai"
        ]
      },
      {
        day: 8,
        activities: [
          "Breakfast at Hotel",
          "Reach Naran",
          "Reach Saif Al Malok Lake by Jeep",
          "Spend Some time at Saif Al Malok Lake",
          "Traveling back to Lahore & Islamabad",
          "Sightseeing on the way back",
          "Short stay for Lunch (By yourself)",
          "Reach Islamabad",
          "Drop Participant of Islamabad at Daewoo terminal",
          "Traveling to Lahore",
          "Reach Lahore with memorable Journey InshAllah."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charged"
    },
    paymentProcedure: {
      policy: "Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      verificationContact: "0344-5556311",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "8 DAYS SPECIAL TOUR ASTORE , MINIMERGE & FAIRY MEADOWS",
    duration: {
      days: 8,
      nights: 7
    },
    eligibility: "Couples, Families, Students & Individuals are highly encouraged to join us. Customize Packages for Friends, Families and Multinationals are also available on Demand.",
    departure: {
      schedule: "Every week monday and friday night from lahore | Every week tuesday and saturday morning from islamabad"
    },
    cost: {
      perHead: 44000,
      perCouple: 96000
    },
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "7 night hotel stay or camps on basis 4/5 persons per roomsharing (beds + mattresses)",
      "Quality meals (8 Breakfasts +7 Dinners)",
      "Complete Guided Tour with Professional Guides",
      "Bonfire",
      "BBQ",
      "Driver Expense",
      "All tolls and taxes"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding, road blockage or any other reason",
      "Chairlift and Heater Charges",
      "Jeeps charges",
      "Anything not mentioned explicitly in the package"
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          "Departure from Islamabad.",
          "Breakfast will be served in Balakot.",
          "Visit Lulusar Lake & Babosar Pass, where we will enjoy Zipline, Sky Cycling etc till evening.",
          "Dinner and stay in hotel in Naran."
        ]
      },
      {
        day: 2,
        activities: [
          "Breakfast at Naran.",
          "Departure for Raikot Bridge.",
          "Transfer to jeeps for 2 hours of adventurous jeep drive, then 3 hours of hiking to reach the majestic Fairy Meadows (Horse riding available).",
          "Bonfire, music, dinner, & camping at Fairy Meadows."
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at Fairy Meadows.",
          "Explore Reflection Lake, Fairy Meadows, Bayal Camp, Nanga Parbat Viewpoints, & Glaciers by hiking (Horse riding available).",
          "Dinner, camping or hotel stay at Fairy Meadows."
        ]
      },
      {
        day: 4,
        activities: [
          "Breakfast at Fairy Meadows.",
          "Departure from Fairy Meadows.",
          "After reaching Astore, shift to jeeps for Rama Meadows.",
          "Dinner, camping or hotel stay at Rama Meadows."
        ]
      },
      {
        day: 5,
        activities: [
          "Breakfast at Rama Meadows.",
          "Explore Rama Meadows and Rama Lake via hiking or horse riding.",
          "Departure for Deosai.",
          "Dinner & camping or hotel stay at Sheosar Lake."
        ]
      },
      {
        day: 6,
        activities: [
          "Breakfast at Sheosar.",
          "Visit Deosai, Sheosar Lake, and then departure for Minimarg.",
          "Dinner & stay in hotel at Chillam Choki."
        ]
      },
      {
        day: 7,
        activities: [
          "Breakfast at Chillam Choki.",
          "Visit Minimarg, Domail, & Rainbow Lake via jeeps till evening.",
          "Bonfire, music, dinner, & stay in hotel at Jaglot."
        ]
      },
      {
        day: 8,
        activities: [
          "Breakfast at Jaglot.",
          "Departure from Jaglot.",
          "Visit River Kunhar & Kewai Waterfall on the way.",
          "Visit all missed attractions on the way, reach Islamabad."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "50% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 5 days before the trip.",
      "100% deduction if informed for cancellation 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "6 DAYS TOUR TO TRAISHING VALLEY - RUPAL VALLEY - NANGA PARBET RUPAL FACE VIEW POINT- ASTORE MINIMERG DOMAIL - BURZIL TOP - DEOSAI & RAMA MEDOWS",
    duration: {
      days: 6,
      nights: 5
    },
    cost: {
      perHead: 49999,
      perCouple: 99999
    },
    mainAttractions: [
      "Naran",
      "Babusar Top",
      "Lulusar Lake",
      "Hazara",
      "Astore",
      "Minimerg",
      "Deosai",
      "Rama Meadows",
      "Rama Lake",
      "Domail",
      "Rainbow Lake",
      "Burzil Pass",
      "Traishing Valley",
      "Rupal valley view point",
      "Nanga parbet Base & surroundings"
    ],
    servicesIncluded: [
      "Luxury transport (Private Coaster/Grand Cabin)",
      "All the toll and taxes",
      "6 Breakfasts + 5 Dinners",
      "Bonfire Night",
      "Accommodations (4-5 per room - Bed + Mattrax sharing basis)",
      "Travel Guide",
      "Jeeps expenses as per mentioned",
      "Camping Night"
    ],
    servicesNotIncluded: [
      "Personal Clothing and activities",
      "Entrance tickets of any historical place",
      "Medication, evacuation and rescue in case of emergencies",
      "Personal insurance of clients",
      "Laundry, beverages and phone calls or other expenses of personal nature",
      "Extra expenses due to natural or political reasons etc.",
      "Tea, Snacks, Lunch or mineral water during travel",
      "Anything not mentioned in the Services Include area"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure from Lahore 09:00 - 10:00 PM from mentioned location."
        ]
      },
      {
        day: 1,
        activities: [
          "20-30 Mints Stay at service area.",
          "Pick up of participants from Islamabad 03:30 - 04:00 AM (Daewoo Terminal Near Nust University Rawalpindi Main 26 No).",
          "Fajar Prayer break enroute, Breakfast enroute.",
          "Travel towards Chillas.",
          "Dinner & Night stay at Chillas / Bonar Das."
        ]
      },
      {
        day: 2,
        activities: [
          "Breakfast Call by 07:30 AM, exit from hotel by 08:30 AM.",
          "Head Towards Astore (4-5 Hours Drive).",
          "Shift Into Jeeps, travel towards Rama Meadows, Rama Lake & stay at Rama.",
          "Dinner, Bonfire Night & Camp Stay."
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at Rama.",
          "Head towards Chillam check post (3 hours drive), Departure for Minimarg (2 Hours Drive).",
          "Visit Burzil Pass, Rainbow Lake, Domail, Minimarg.",
          "Dinner and Night stay at Domail (Camping)."
        ]
      },
      {
        day: 4,
        activities: [
          "Early Breakfast call by 07:30 AM.",
          "Departure for Deosai Plains, Visit Sheosar Lake.",
          "Travel back to Traishing Valley.",
          "Dinner & Night Stay at Traishing (NPTC Guest House or equivalent)."
        ]
      },
      {
        day: 5,
        activities: [
          "Early wake up call by 06:00 AM for Rupal valley & Nanga Parbat base members (optional, time till 12:00 Noon).",
          "Explore Rupal Valley, Nanga Parbat base camp hike (Hiking from Traishing), or jeep till Rupal from Traishing (Self-Paid). Other members can rest or do a 20 mints view point hike from Traishing.",
          "Head towards Astore from Traishing.",
          "Departure for Chillas.",
          "Dinner & Night stay at Bonar Das / Chillas."
        ]
      },
      {
        day: 6,
        activities: [
          "Wake Up Call by 04:00 AM.",
          "Breakfast enroute & travel towards Islamabad via Naran side (if Babusar Top open).",
          "Short stop at Service Area, sightseeing on way.",
          "Back to Lahore till midnight."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "50% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 5 days before the trip.",
      "100% deduction if informed for cancellation 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "06 DAYS TOUR FROM LAHORE & ISLAMABAD TO SKARDU VALLEY, SHANGRILLA RESORT, MANTHOKA WATERFALL AND NARAN VALLEY (VIA NARAN)",
    organizer: "THE WANDERLUST VIBE.PK",
    duration: {
      days: 6,
      nights: 5
    },
    departure: {
      schedule: "Every Monday & Friday night from Lahore | Every Tuesday & Saturday early morning from Islamabad"
    },
    cost: {
      lahore: 30000,
      islamabad: 30000,
      couplePackage: 70000
    },
    placesVisited: [
      "Hazara Expressway",
      "Balakot",
      "Kawai Waterfall",
      "Kaghan Valley",
      "Naran Valley",
      "River Kunhar",
      "Saif al Malok Lake",
      "Batakundi",
      "Borawai",
      "Jhalkand",
      "Babusar Top",
      "Chillas",
      "Junction Point (Pahari sililay)",
      "Nanga Parbat view point",
      "Skardu Road",
      "Dambu Das",
      "Astaknala",
      "Indus River",
      "Magistic Karakoram Highway",
      "Skardu valley",
      "Shangrila Resort",
      "Lower Kachura Lake",
      "Upper Kachura Lake",
      "Sadpara Lake",
      "Mantoka Waterfall",
      "Shigar Valley",
      "Shigar Fort",
      "Sarfranga Cold Desert",
      "Skardu city",
      "Deosai",
      "Kala pani/Bara pani",
      "Sheosar Lake"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "5 night hotel stay on basis 4/5 person per room sharing (beds + mattresses)",
      "Quality meals (6 Breakfasts + 5 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "Photography",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Tea, Mineral water and Cold drinks expense",
      "Extra expenses due to the acts of nature and political reasons etc.",
      "All Sort of Tickets",
      "Heater charges/Jeep Charges",
      "Anything not mentioned in Services Included Portion"
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          "Pick up from Islamabad",
          "Breakfast in the Hotel",
          "Arrival at Balakot",
          "Reach Kiwai",
          "Arrival at Naran",
          "Visit River Kunhar & Naran Bazar",
          "Move towards Upper Kaghan Valley",
          "Reach Borawai",
          "Dinner and Night Stay in Borawai"
        ]
      },
      {
        day: 2,
        activities: [
          "Breakfast at 8:00 AM",
          "Traveling towards Skardu",
          "Reach Lulusar Lake",
          "Spend some time at Lulusar Lake",
          "Reach Babusar Top",
          "Reach Chillas",
          "Traveling to Skardu valley",
          "Visit Nanga Parbat view Point",
          "Visit junction of mountain Ranges",
          "Traveling via Adventurous Skardu Road",
          "Visit Shangrila Resort",
          "Visit Upper Kachura Lake",
          "Night Reached Skardu",
          "Stay night in Skardu Hotel"
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at 9:00 AM",
          "Traveling to Manthokha Water Fall",
          "Visit Mighty beautiful waterfall",
          "Back to Shigar Valley",
          "Visit Cold Desert",
          "Visit Sarfaranga Desert",
          "Travelling back to Skardu",
          "Stay night in Skardu"
        ]
      },
      {
        day: 4,
        activities: [
          "Breakfast at Hotel",
          "Transfer into jeeps",
          "Move towards Deosai",
          "Visit Sadpara Lake",
          "Visit Deosai",
          "Visit Kala Pani and Bara Pani",
          "Visit Sheosar Lake",
          "Night stay in Skardu"
        ]
      },
      {
        day: 5,
        activities: [
          "Breakfast at 9:00 AM",
          "If any point left, visit it",
          "Travelling towards Chillas on the way sightseeing",
          "Astaknala",
          "Haramosh",
          "Drive back towards Babusar Top",
          "Short stay at Jaglot",
          "Short stay at Mountain junction point",
          "Reach Chillas",
          "Reach Babusar Top",
          "Reached back to Hotel at night",
          "Dinner and night stay at Borawai/Naran Hotel"
        ]
      },
      {
        day: 6,
        activities: [
          "Early morning Breakfast at Hotel",
          "Rafting at River Kunhar",
          "Reach Saif Al Malok Lake by Jeep",
          "Spend some time at Saif Al Malok Lake",
          "Traveling back to Islamabad",
          "Reached back to Rawalpindi/Islamabad till night",
          "End of services for Rawalpindi/Islamabad participants"
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charged"
    },
    paymentProcedure: {
      policy: "Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      verificationContact: "0344-5556311",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "5 DAYS SPECIAL TOUR TO MURREE, KASHMIR, ARRANGKEL & SHOGRAN VALLEY",
    organizer: "WANDERLUST.PK",
    duration: {
      days: 5,
      nights: 4
    },
    departure: {
      schedule: "Every Saturday From Islamabad",
      validity: "Till end Of April 2026"
    },
    cost: {
      islamabad: 23000,
      couplePackage: 50000
    },
    placesVisited: [
      "Patriata Chairlift",
      "Murree Expressway",
      "Murree Mall Road",
      "Neelum Valley",
      "Muzaffarabad",
      "Dhani Waterfall",
      "Kutton Waterfall",
      "Neelum Jhelum Dam",
      "Keran & LOC",
      "Upper Neelum",
      "Sharda",
      "Kel",
      "Arrangkel",
      "Kashmir Waterfall",
      "Balakot Valley",
      "Shogran Valley",
      "Siri Paye Meadows",
      "Khanpur Dam"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "4 night hotel stay on basis 4/5 persons per roomsharing (beds + mattresses)",
      "Quality meals (5 Breakfasts + 4 Dinners)",
      "Complete Guided Tour with Professional Guides",
      "Bonfire",
      "BBQ",
      "Driver Expense",
      "All tolls and taxes"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding, road blockage or any other reason",
      "Chairlift and Heater Charges",
      "Jeeps charges",
      "Anything not mentioned explicitly in the package"
    ],
    itinerary: [
      {
        day: 1,
        dayName: "Saturday",
        activities: [
          "Pickup from Islamabad",
          "Breakfast at Hotel",
          "Departure for Murree",
          "Reach Patriata Chairlift",
          "Spend quality time at Patriata Chairlift",
          "Reach Murree",
          "Explore Murree",
          "Explore Murree Mall Road",
          "Dinner & overnight stay at Murree"
        ]
      },
      {
        day: 2,
        dayName: "Sunday",
        activities: [
          "Breakfast at Hotel",
          "Departure for Neelum Valley",
          "Reach Muzaffarabad",
          "Short stay at Dhani Waterfall",
          "Short stay at Neelum Jhelum Dam",
          "Reach Keran",
          "Check-in hotel",
          "Dinner and night stay at Hotel in Sharda/Keran"
        ]
      },
      {
        day: 3,
        dayName: "Monday",
        activities: [
          "Breakfast at Hotel",
          "Shift in Jeeps",
          "Start traveling towards Kel",
          "Reach Kel",
          "Start traveling towards Arangkel (30 to 35 minutes hiking)",
          "Reach Arrangkel",
          "Explore Arrangkel",
          "Back to Sharda/Keran",
          "Night stay at Hotel in Sharda/Keran"
        ]
      },
      {
        day: 4,
        dayName: "Tuesday",
        activities: [
          "Breakfast at Hotel",
          "Start traveling Keran to Balakot",
          "Visit LOC",
          "Reach Kutton Waterfall",
          "Visit Kutton Waterfall",
          "Reach Muzaffarabad",
          "Move towards Balakot",
          "Reach Kiwai",
          "Short stay at Kiwai Waterfall",
          "Shift in Jeeps",
          "Start traveling towards Shogran",
          "Reach Shogran",
          "Explore Shogran",
          "Travel towards Siri Paye Meadows",
          "Spend quality time at Siri Paye Meadows",
          "Traveling back to Balakot",
          "Dinner & Night stay at Balakot"
        ]
      },
      {
        day: 5,
        dayName: "Wednesday",
        activities: [
          "After Breakfast Departure for Islamabad",
          "Move towards Islamabad",
          "Reach Islamabad",
          "Drop at Islamabad",
          "Reach Back Home with memorable Journey In Sha Allah"
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "50% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 5 days before the trip.",
      "100% deduction if informed for cancellation 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "5 DAYS SPECIAL TOUR TO NARAN, FAIRY MEADOWS, BEYAL CAMP AND NANGA PARBAT BASE CAMP VIA NARAN VALLEY",
    organizer: "WANDERLUST.PK",
    duration: {
      days: 5,
      nights: 4
    },
    departure: {
      schedule: "Every Tuesday & Friday Night"
    },
    cost: {
      lahore: 20000,
      islamabad: 20000,
      couplePackage: 45000
    },
    placesVisited: [
      "Hazara Expressway",
      "Balakot",
      "Kiwai Waterfall",
      "Kaghan Valley",
      "Naran Valley",
      "River Kunhar",
      "Saif al Malok Lake",
      "Batakundi",
      "Borawai",
      "Jhalkand",
      "Babusar Top",
      "Chillas",
      "Junction Point (Pahari sililay)",
      "Nanga Parbat view point",
      "Raikot bridge",
      "River Indus",
      "Tatu village",
      "Fairy meadows",
      "Bayal Camp",
      "Nanga Parbat Basecamp"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "4 night hotel stay on basis 4/5 person per roomsharing (beds + mattresses)",
      "Quality meals (5 breakfasts + 4 dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "Photography",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Tea, Mineral water and Cold drinks expense",
      "Extra expenses due to the acts of nature and political reasons etc.",
      "AC or heater charges",
      "Tickets of forts, boating, Rafting and parks etc not included.",
      "Jeep charges",
      "Vehicle use incase of road blockage/ any extra expense"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure from Lahore & Faisalabad at 10:00 PM on booked Luxury Transport."
        ]
      },
      {
        day: 1,
        activities: [
          "20 minutes stay at Bhera Interchange/Mian Gee Restaurant GT Road.",
          "Reach Islamabad and pick up Islamabad/Rawalpindi participants from Daewoo Terminal.",
          "Arrival and Breakfast at Balakot.",
          "Reach Kiwai with a short stay at Kiwai waterfall.",
          "Arrival at Naran with free time for Lake Saiful Malook & River Rafting.",
          "Visit River Kunhar & Naran Bazar.",
          "Move towards Upper Kaghan Valley and reach Batakundi & Burwai.",
          "Dinner at 8:00 PM and night stay in Burwai."
        ]
      },
      {
        day: 2,
        activities: [
          "Breakfast at 8:00 AM.",
          "Traveling towards Fairy Meadows.",
          "Reach Moon Besal, spend time at Lake Lulusar & Pyala Lake.",
          "Explore Babusar Top and reach Chillas.",
          "Departure for Raikot at 9:00 AM.",
          "Arrival at Raikot, transfer to jeeps, and travel to Tatu village.",
          "Start hike towards Fairy Meadows in the afternoon.",
          "Arrival in Fairy Meadows and transfer to camps/huts.",
          "Dinner and Bonfire at 8:00 PM.",
          "Overnight stay in Hotel/Camps."
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at 7:00 AM.",
          "Start hike towards Beyal camp.",
          "Reach and explore Beyal camp.",
          "Reach Nanga Parbat Base Camp.",
          "Trace steps back to Fairy Meadows by 6:00 PM.",
          "Dinner and Bonfire at 8:00 PM.",
          "Overnight stay in camps/hotel."
        ]
      },
      {
        day: 4,
        activities: [
          "Breakfast at 8:00 AM.",
          "Trek down to Tatu and transfer to jeeps at 11:00 AM.",
          "Departure for Raikot at 12:00 PM.",
          "Arrival at Raikot and departure for Chillas.",
          "Arrival at Chillas.",
          "Dinner at 8:00 PM.",
          "Overnight stay in Burwai/Naran."
        ]
      },
      {
        day: 5,
        activities: [
          "Breakfast at Hotel.",
          "Departure for Lahore at 7:00 AM.",
          "Lunch Cum Dinner at Mansehra / Islamabad (By Yourself).",
          "Arrival in Islamabad by 8:00 PM.",
          "Arrival in Lahore by 12:00 AM (+/- 2 hours)."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "50% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "5 DAYS TOUR TO NEELAM VALLEY, RATTI GALI LAKE, ARANG KEL AND TAOBAT",
    organizer: "WANDERLUST",
    duration: {
      days: 5,
      nights: 4
    },
    departure: {
      schedule: "Every Friday Night From Lahore | Every Saturday early Morning from Islamabad",
      points: {
        lahore: "Thokar Niaz Baig, Lahore",
        islamabad: "Daewoo Terminal near Nust Eme"
      }
    },
    cost: {
      lahore: 22000,
      islamabad: 22000,
      couplePackage: 48000
    },
    placesVisited: [
      "Muzaffarabad",
      "Dhani Waterfall",
      "Kutton Waterfall",
      "Neelum Jhelum Dam",
      "Keran",
      "Upper Neelum",
      "Dowarian",
      "Ratti Gali Lake",
      "Sharda",
      "Halmat",
      "Taobat",
      "Janawai",
      "Kel",
      "Arang Kel",
      "Kashmir Waterfall"
    ],
    servicesIncluded: [
      "Air conditioned, luxury Transportation (Saloon Coaster/Grand Cabin)",
      "4 night hotel stay with 4/5 persons sharing in a room",
      "Quality meals (5 Breakfasts + 4 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding or any other reason",
      "Emergency rescue",
      "Jeep Charges",
      "Anything not mentioned explicitly in the package",
      "Any sort of Tickets and Heater Charges"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure from Lahore at 10:00 PM."
        ]
      },
      {
        day: 1,
        activities: [
          "Short stay at Mian Gee or Bhera Interchange.",
          "Reach Islamabad and Pick up Islamabad Participants.",
          "Departure from Islamabad at 3:00 AM.",
          "Arrival at Murree Express Highway and Muzaffarabad.",
          "Reach and short stay at Dhani Waterfall.",
          "Sightseeing of Neelum Jhelum dam on the way.",
          "Reach and spend time at Kutton Waterfall.",
          "Departure for Keran, visit Upper Neelum, and hotel check-in.",
          "Dinner and Night stay in Keran/Sharda."
        ]
      },
      {
        day: 2,
        activities: [
          "Early wakeup call and Breakfast at hotel.",
          "Reach Sharda and transfer to jeep for Kel.",
          "Arrival at Kel and explore Kel.",
          "Start travelling towards Taobat, passing through Halmat.",
          "Reach Taobat and spend quality time.",
          "Dinner and night stay at Halmat/Taobat."
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at Hotel.",
          "Reach back Kel and hike towards Arang Kel (45 mins).",
          "Spend quality time at Arang Kel.",
          "Reach back Kel and visit Kel surroundings.",
          "Reach back Sharda and hotel check-in.",
          "Night stay at Sharda."
        ]
      },
      {
        day: 4,
        activities: [
          "Breakfast at Hotel.",
          "Departure for Dowarian and transfer to Jeeps for Ratti Gali Lake.",
          "Reach Ratti Gali Base Camp and track to Ratti Gali Lake (2 km).",
          "Enjoy time at Ratti Gali Lake and move back towards Dowarian.",
          "Reach Keran and hotel check-in.",
          "Dinner & Night Stay in Keran."
        ]
      },
      {
        day: 5,
        activities: [
          "Early Morning Wakeup call at 7:00 AM.",
          "Sight view & photography, then departure for Muzaffarabad.",
          "Reach Kashmir Waterfall and spend some time.",
          "Arrival at Islamabad and Lahore."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "50% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "5 DAYS TOUR TO BEAUTIFUL HUNZA VALLEY, ATTABAD LAKE AND KHUNJERAB PASS AND NARAN VALLEY (VIA NARAN VALLEY)",
    organizer: "WANDERLUST",
    duration: {
      days: 5,
      nights: 4
    },
    cost: {
      lahore: 23000,
      islamabad: 23000,
      couplePackage: 50000
    },
    placesVisited: [
      "Hazara Expressway",
      "Balakot",
      "Kiwai Waterfall",
      "Kaghan Valley",
      "Naran Valley",
      "River Kunhar",
      "Saif al Malok Lake",
      "Batakundi",
      "Borawai",
      "Jhalkand",
      "Babusar Top",
      "Chillas",
      "Junction Point (Pahari sililay)",
      "Nanga Parbat view point",
      "Gilgit",
      "Naltar valley",
      "Naltar Valley zero Point",
      "Satrangi Lake",
      "Blue Lake",
      "Rakaposhi view point",
      "Altit fort",
      "Baltit fort",
      "Kareemabad Bazar",
      "Attabad Tunnels",
      "Attabad Lake",
      "Hussaini Bridge",
      "Passu Glacier",
      "Passu Cones",
      "Magistic Karakoram Highway",
      "Royal Garden",
      "Khunjerab pass",
      "Khunjerab national park",
      "China border"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "4 night hotel stay on basis 4/5 person per room sharing (beds + mattresses)",
      "Quality meals (5 Breakfasts + 4 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "Photography",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding, road blockage or any other reason",
      "Heater Charges and Entry Tickets of Boating, Fort etc",
      "Jeeps charges",
      "Anything not mentioned explicitly in the package"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure from Lahore & Faisalabad at 10:00 PM on booked Luxury Transport."
        ]
      },
      {
        day: 1,
        activities: [
          "20 minutes stay at Bhera Interchange/Mian Gee Restaurant GT Road.",
          "Reach Islamabad and pick up Islamabad/Rawalpindi participants from Daewoo Terminal.",
          "Arrival and Breakfast at Balakot.",
          "Reach Kiwai with a short stay at Kiwai waterfall.",
          "Arrival at Naran, visit River Kunhar & Naran Bazar.",
          "Rafting at River Kunhar.",
          "Move towards Upper Kaghan Valley, reaching Batakundi & Borawai.",
          "Dinner at 8:00 PM and Night Stay in Chillas."
        ]
      },
      {
        day: 2,
        activities: [
          "Early Morning Wake up Call and Breakfast in Hotel.",
          "Traveling towards Hunza.",
          "Reach and spend time at Lulusar Lake.",
          "Reach Babusar Top, Chillas, and Gilgit.",
          "Reach Nomal and transfer to Jeeps for Naltar Valley.",
          "Reach Naltar Valley Zero Point, explore Satrangi Lake and Blue Lake.",
          "Reach Hunza for Dinner and Night stay."
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at Hotel.",
          "Traveling towards Attabad Tunnels and visit Attabad Lake.",
          "Reach Hussaini suspension bridge, visit Passu Glacier and Passu Cones point.",
          "Reach China Border / Khunjerab Pass.",
          "Reach back to Hotel for BBQ, Bonfire, and Night stay in Hunza."
        ]
      },
      {
        day: 4,
        activities: [
          "Breakfast at Hotel.",
          "Reach Altit Fort and visit Altit Fort / Baltit Fort.",
          "Traveling towards Chillas, visiting Rakaposhi View Point, Mountain Ranges Junction, and Nanga Parbat View Point.",
          "Reach Babusar Top, explore, and photography.",
          "Dinner and Night stay in Borawai / Naran."
        ]
      },
      {
        day: 5,
        activities: [
          "Breakfast at Hotel.",
          "Reach Saif Al Malok Lake by Jeep and spend some time.",
          "Traveling back to Islamabad, Lahore & Faisalabad with sightseeing on the way.",
          "Short stay for Lunch (by yourself).",
          "Drop Islamabad participants at Daewoo Terminal.",
          "Reach Lahore & Faisalabad."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "50% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "4 DAYS SPECIAL TOUR TO SWAT, KALAM & MALAM JABBA",
    organizer: "THE WANDERLUST VIBE.PK",
    duration: {
      days: 4,
      nights: 3
    },
    departure: {
      schedule: "Every Wednesday From Islamabad",
      validity: "Till end Of April 2026"
    },
    cost: {
      islamabad: 21000,
      couplePackage: 46000
    },
    placesVisited: [
      "Swat",
      "Fizzaghat",
      "Malam Jabba",
      "Chairlift Zipline",
      "Bahrain",
      "Kalam",
      "Ushu Forest",
      "Palogha Village",
      "Mohdand Lake"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "3 night hotel stay on basis 4/5 persons per roomsharing (beds + mattresses)",
      "Quality meals (4 Breakfasts + 3 Dinners)",
      "Complete Guided Tour with Professional Guides",
      "Bonfire",
      "BBQ",
      "Driver Expense",
      "All tolls and taxes"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding, road blockage or any other reason",
      "Chairlift and Heater Charges",
      "Jeeps charges",
      "Anything not mentioned explicitly in the package"
    ],
    itinerary: [
      {
        day: 1,
        dayName: "Wednesday",
        activities: [
          "Departure for Swat, Kalam",
          "Breakfast at Fizzaghat",
          "Short stay at Fizzaghat",
          "Reach Kalam",
          "Visit Mall Road Kalam",
          "Dinner & Night Stay at Kalam"
        ]
      },
      {
        day: 2,
        dayName: "Thursday",
        activities: [
          "Breakfast at Hotel",
          "Shift to Jeep",
          "Departure for Mohdand Lake",
          "Visit Ushu Forest",
          "Visit Palogha Village",
          "Dinner & Night stay at Kalam"
        ]
      },
      {
        day: 3,
        dayName: "Friday",
        activities: [
          "Breakfast at Hotel",
          "Start traveling towards Malam Jabba",
          "Reach Malam Jabba",
          "Visit PC Hotel Malam Jabba",
          "All Excursions Zipline & Chairlift (charges not included)",
          "Dinner & Night stay at Malam Jabba"
        ]
      },
      {
        day: 4,
        dayName: "Saturday",
        activities: [
          "After Breakfast Departure for Islamabad",
          "Move towards Islamabad",
          "Reach Islamabad",
          "Drop at Islamabad",
          "Reach Back Home with memorable Journey In Sha Allah"
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "50% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 5 days before the trip.",
      "100% deduction if informed for cancellation 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "4 DAYS TOUR TO NEELAM VALLEY, SHARDA, KEL, ARANG KEL AND TAOBAT",
    organizer: "THE WANDERLUSTVIBE.PK",
    duration: {
      days: 4,
      nights: 3
    },
    departure: {
      schedule: "Every Wednesday Night from Lahore",
      eidDeparture: "2nd & 3rd Day of Eid from Lahore"
    },
    cost: {
      lahore: 20000,
      islamabad: 20000,
      couplePackage: 45000
    },
    bookingDetails: {
      contactPerson: "Muhammad Azam",
      phone: "0344-5556311"
    },
    placesVisited: [
      "Muzaffarabad",
      "Dhani Waterfall",
      "Kutton Waterfall",
      "Neelum Jhelum Dam",
      "Keran",
      "Upper Neelum",
      "Sharda",
      "Halmat",
      "Taobat",
      "Janawai",
      "Kel",
      "Arang Kel",
      "Kashmir Waterfall"
    ],
    servicesIncluded: [
      "Air conditioned, luxury Transportation (Saloon Coaster/Grand Cabin)",
      "3 night hotel stay with 4/5 persons sharing in a room",
      "Quality meals (4 Breakfasts + 3 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding or any other reason",
      "Emergency rescue",
      "Jeep Charges",
      "Anything not mentioned explicitly in the package",
      "Any sort of Tickets and Heater Charges"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure from Lahore at 10:00 PM."
        ]
      },
      {
        day: 1,
        activities: [
          "Short stay at Mian Gee or Bhera Interchange.",
          "Reach Islamabad and pick up Islamabad participants.",
          "Departure from Islamabad at 3:00 AM.",
          "Arrival at Murree Express Highway and Muzaffarabad.",
          "Reach and short stay at Dhani Waterfall.",
          "Sightseeing of Neelum Jhelum dam on the way.",
          "Reach and spend time at Kutton Waterfall.",
          "Departure for Keran, visit Upper Neelum, and hotel check-in.",
          "Dinner and Night stay in Keran/Sharda."
        ]
      },
      {
        day: 2,
        activities: [
          "Early wakeup call and Breakfast at hotel.",
          "Reach Sharda and transfer to jeep for Kel.",
          "Arrival at Kel and explore Kel.",
          "Start travelling towards Taobat, passing through Halmat.",
          "Reach Taobat and spend quality time.",
          "Dinner and night stay at Halmat/Taobat."
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at Hotel.",
          "Reach back Kel and hike towards Arang Kel (45 mins).",
          "Spend quality time at Arang Kel.",
          "Reach back Kel and visit Kel surroundings.",
          "Reach back Sharda and hotel check-in.",
          "Night stay at Sharda."
        ]
      },
      {
        day: 4,
        activities: [
          "Early Morning Wakeup call at 7:00 AM.",
          "Explore the surroundings of Sharda.",
          "Sight view & photography, then departure for Muzaffarabad.",
          "Reach Kashmir Waterfall and spend time.",
          "Arrival at Islamabad and return to Lahore."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "50% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "4 DAYS AMAZING TRIP TO KUMRAT VALLEY, JAHAZ BANDA & KATORA LAKE",
    organizer: "THE WANDERLUST VIBE.PK",
    duration: {
      days: 4,
      nights: 3
    },
    departure: {
      schedule: "Departure every Wednesday night from LHR & Every Thursday early Morning from ISB"
    },
    cost: {
      lahore: 20000,
      islamabad: 20000,
      couplePackage: 45000
    },
    placesVisited: [
      "Swat Valley",
      "SWAT Tunnels",
      "Chakdara",
      "Swat Motorway",
      "Fizagat",
      "Upper Dir",
      "PanJkora River",
      "Kumrat Valley",
      "Kumrat Jungle",
      "Thall Village",
      "Kala Chashma",
      "Thall Old Masjid",
      "Black Waterfall",
      "Jahaz Banda",
      "Katora Lake"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "All types of Fuel, toll taxes and challans",
      "Professional Driver",
      "Professional Guide for trip",
      "3 night Hotel and Camping stay (4/5 persons sharing)",
      "Quality meals (4-Breakfasts & 3-Dinner)",
      "Complete guided tour with professional guides",
      "Bonfire",
      "Photography",
      "Driver Expenses",
      "BBQ",
      "Musical night"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding or any other reason",
      "Emergency rescue",
      "Personal Porter",
      "Anything not mentioned explicitly in the package"
    ],
    itinerary: [
      {
        day: 0,
        dayName: "Wednesday",
        activities: [
          "Departure from Lahore at 9.30 - 10.30 pm.",
          "Short stay at any Services area or alternate."
        ]
      },
      {
        day: 1,
        dayName: "Thursday",
        activities: [
          "Pickup of ISLAMABAD clients at early morning.",
          "Leave for SWAT Valley.",
          "Breakfast on way at Timergara or Thal Village.",
          "Arrival in Thal.",
          "Transfer to 4x4 for Kumrat Valley.",
          "Install Camps and take rest.",
          "Musical Night + Bonfire at Kumrat Valley beside River.",
          "Dinner and Night stay in Camps in Kumrat Valley."
        ]
      },
      {
        day: 2,
        dayName: "Friday",
        activities: [
          "Breakfast call early morning.",
          "Explore Kumrat Valley (2 Abshar, Kumrat Jungle).",
          "Departure for Thal.",
          "Departure for Jahazbanda.",
          "Start hike from Gaamsher (About 3-4 hrs).",
          "Reach Jahazbanda in evening.",
          "Distribution of camps.",
          "Dinner and Night stay at Jahazbanda."
        ]
      },
      {
        day: 3,
        dayName: "Saturday",
        activities: [
          "Breakfast call early morning.",
          "Start trekking towards Katora Lake (3-4 hrs).",
          "Explore Jahaz Banda and Katora Lake.",
          "Back to Jahazbanda in Evening.",
          "Dinner and Night stay at Jahazbanda."
        ]
      },
      {
        day: 4,
        dayName: "Sunday",
        activities: [
          "Early morning wakeup call at 5:30 am.",
          "Departure for Thal.",
          "Breakfast in Thal.",
          "Departure for Islamabad.",
          "Short stay for lunch in Chakdara.",
          "Arrival in Islamabad at 9pm.",
          "Arrival in Lahore at 1-2 am.",
          "End of Services."
        ]
      }
    ],
    paymentProcedure: {
      policy: "50% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Bank Alfalah",
          accountName: "Muhammad Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "3 DAYS TOUR TO SWAT VALLEY, MALAM JABBA AND MAHODAND LAKE",
    organizer: "THE WANDERLUSTVIBE.PK",
    duration: {
      days: 3,
      nights: 2
    },
    departure: {
      schedule: "Every Monday & Thursday Night from Lahore & Every Tuesday & Friday Early Morning from ISB"
    },
    cost: {
      lahore: 15999,
      faisalabad: 15999,
      islamabad: 15999,
      couplePackage: 35999
    },
    placesVisited: [
      "Mingora",
      "Swat",
      "Malam Jabba",
      "Madyan",
      "Behrain",
      "Kalam",
      "Ushu Forest",
      "Mataltan",
      "Glacier",
      "Mahodand Lake (If accessible)"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "2 night hotel stay on basis 4/5 persons per room sharing (beds + mattresses)",
      "Quality meals (3 Breakfasts + 2 Dinners)",
      "Complete Guided Tour with Professional Guides",
      "Bonfire",
      "BBQ",
      "Driver Expense",
      "All tolls and taxes"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding, road blockage or any other reason",
      "Chairlift and Heater Charges",
      "Jeeps charges",
      "Anything not mentioned explicitly in the package"
    ],
    itinerary: [
      {
        day: 0,
        dayName: "Thursday",
        activities: [
          "Departure from Lahore at 10:00 PM on booked Luxury Transport."
        ]
      },
      {
        day: 1,
        dayName: "Friday",
        activities: [
          "20 minutes stay at Bhera Interchange.",
          "Reach Islamabad and pick up Islamabad/Rawalpindi participants from Daewoo Terminal.",
          "Breakfast in Mingora.",
          "Start traveling to Malam Jabba and explore all day.",
          "Chairlift and zip line at Malam Jabba.",
          "Back to Mingora in evening for dinner at hotel.",
          "Overnight stay in Fizza Ghat/Behrain."
        ]
      },
      {
        day: 2,
        dayName: "Saturday",
        activities: [
          "Breakfast at 8:00 AM.",
          "Start travelling to Kalam and explore Kalam.",
          "Transfer to jeeps.",
          "Explore Ushu Forest, Mataltan, Glacier, and reach Mahodand Lake (If accessible).",
          "Spend time at Mahodand Lake and return back to Kalam.",
          "Dinner, BBQ, and Bonfire.",
          "Overnight stay in Behrain/Kalam."
        ]
      },
      {
        day: 3,
        dayName: "Sunday",
        activities: [
          "Breakfast at hotel at 08:00 AM.",
          "Departure for Lahore & Islamabad.",
          "Reach Fizza Ghat and visit Fizza Ghat.",
          "Sightseeing on the way back.",
          "Reach Islamabad at 8:00 PM.",
          "Reach Lahore at approximately 12:00 AM."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "30% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "MUHAMMAD AZAM",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "MUHAMMAD AZAM",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "BANK ALFALAH",
          accountName: "MUHAMMAD AZAM",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "3 DAYS TOUR TO NARAN, SHOGRAN VALLEY, SAIF AL MALOK LAKE & BABUSAR TOP",
    organizer: "THE WANDERLUST VIBE.PK",
    duration: {
      days: 3,
      nights: 2
    },
    departure: {
      schedule: "Every Monday & Thursday Night from Lhr",
      points: {
        lahore: "Thokar Niaz Baig, Lahore",
        faisalabad: "Millat Chok Opposite Nadra Office, Faisalabad",
        islamabad: "Daewoo Terminal near Nust Eme"
      }
    },
    cost: {
      lahore: 16000,
      islamabad: 16000,
      faisalabad: 16000,
      couplePackage: 38000
    },
    placesVisited: [
      "Balakot",
      "Kholian Waterfall",
      "Kawai waterfall",
      "Naran Valley",
      "River Kunhar",
      "Saif al Malok Lake",
      "Batakundi",
      "Borawai",
      "Jhalkand",
      "Babusar Top",
      "Shogran Valley",
      "Siri/Paye Meadows"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ Grand Cabin)",
      "2 night hotel stay on basis 4/5 persons per room sharing (beds + mattresses)",
      "Quality meals (3 Breakfasts + 2 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding or any other reason",
      "All sort of Tickets/Heater Charges",
      "Emergency rescue",
      "Jeeps charges"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure from Lahore and Faisalabad at 10:00 PM on booked Luxury Transport."
        ]
      },
      {
        day: 1,
        activities: [
          "20 minutes stay at Bhera Interchange/Mian Gee Restaurant GT Road.",
          "Reach Islamabad and pick up Islamabad/Rawalpindi participants from Daewoo Terminal.",
          "Arrival and Breakfast at Balakot.",
          "Reach Kiwai, shift in jeeps and start traveling towards Shogran.",
          "Arrival at Shogran and explore Shogran.",
          "Travel towards and explore Paye Meadows.",
          "Departure for Naran, check-in at hotel.",
          "Dinner and Night Stay at Naran."
        ]
      },
      {
        day: 2,
        activities: [
          "Early Morning wakeup call and Breakfast at Hotel.",
          "Move towards Upper Kaghan Valley, reaching Batakundi and Borawai.",
          "Reach Lulusar Lake and spend time.",
          "Reach Babusar Top, explore, and photography at Babusar Top.",
          "Move back towards Naran.",
          "Rafting at River Kunhar, visit River Kunhar & Naran Bazar.",
          "Dinner at 8:00 PM.",
          "Night Stay in Naran/Borawai."
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast at Naran.",
          "Early morning departure for Saif al Malok Lake.",
          "Spend quality time at Saif al Malok Lake, then reach back to Naran.",
          "Departure for Islamabad with a short stay at Kewai waterfall.",
          "Reach Islamabad and drop Islamabad participants.",
          "Arrival at Lahore and Faisalabad."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "30% Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "MUHAMMAD AZAM",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "MUHAMMAD AZAM",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "BANK ALFALAH",
          accountName: "MUHAMMAD AZAM",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },

  {
    title: "3 DAYS TOUR TO NEELAM VALLEY, ARANG KEL AND KASHMIR",
    organizer: "THE WANDERLUSTVIBE.PK",
    duration: {
      days: 3,
      nights: 2
    },
    departure: {
      schedule: "Every Thursday Night from Lahore & Every Friday early Morning from ISB"
    },
    cost: {
      lahore: 15000,
      faisalabad: 15000,
      islamabad: 15000,
      couplePackage: 35000
    },
    placesVisited: [
      "Muzaffarabad",
      "Dhani Waterfall",
      "Kutton Waterfall",
      "Neelum Jhelum Dam",
      "Keran",
      "Upper Neelum",
      "Sharda",
      "Kel",
      "Arang Kel",
      "Kashmir Waterfall"
    ],
    servicesIncluded: [
      "Air conditioned, luxury transportation (4c saloon coaster/ grand cabin)",
      "2 night hotel stay on basis 4/5 person per room sharing (beds + mattresses)",
      "Quality meals (3 Breakfasts + 2 Dinners)",
      "Complete guided tour with professional guides",
      "All tolls and taxes",
      "Bonfire",
      "Photography",
      "BBQ"
    ],
    servicesNotIncluded: [
      "Any personal expenses/refreshments (beverages/snacks/drinks)",
      "Extra expenses caused due to road sliding or any other reason",
      "Jeeps charges and Heater Charges are not included",
      "Anything not mentioned explicitly in the package"
    ],
    itinerary: [
      {
        day: 0,
        activities: [
          "Departure from Lahore and Faisalabad at 10:00 PM on booked Luxury Transport."
        ]
      },
      {
        day: 1,
        activities: [
          "20 minutes stay at Bhera Interchange/Mian Gee Restaurant GT Road.",
          "Reach Islamabad and pick up Islamabad/Rawalpindi participants from Daewoo Terminal.",
          "Arrival at Muzaffarabad at 7:30 AM and Breakfast.",
          "Leave for Keran, visiting Dhani Waterfall, Neelum Jhelum Dam, and Kutton Waterfall on the way.",
          "Reach Keran and hike up to Upper Neelum.",
          "Night stay at Keran/Sharda."
        ]
      },
      {
        day: 2,
        activities: [
          "Breakfast at 7:30 AM.",
          "Departure for Sharda and transfer to jeeps for Kel.",
          "Reach Kel, visit Kel surroundings, and hike towards Arang Kel.",
          "Visit Arang Kel and reach back to Sharda.",
          "Bonfire Night & night stay at Keran/Sharda."
        ]
      },
      {
        day: 3,
        activities: [
          "Breakfast.",
          "Departure for Muzaffarabad and visit Muzaffarabad.",
          "Visit Kashmir Waterfall and spend quality time.",
          "Sightseeing on the way back.",
          "Reach Islamabad at 8:00 PM.",
          "Reach Lahore and Faisalabad at approximately 12:00 AM."
        ]
      }
    ],
    kidsPolicy: {
      under3Years: "Free without seat",
      from3To8Years: "50% Charge with jumper seat",
      above8Years: "Consider Adults Fully Charge"
    },
    paymentProcedure: {
      policy: "Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
      onlinePaymentDetails: {
        jazzCash: {
          accountName: "Muhammad Azam",
          accountNumber: "0303-9465839"
        },
        easyPaisa: {
          accountName: "Muhammad Azam",
          accountNumber: "0344-5556311"
        },
        bankTransfer: {
          bankName: "Alfalah Bank",
          accountName: "Muhammed Azam",
          accountNumber: "01431008684581"
        }
      }
    },
    cancellationPolicy: [
      "50% deduction if informed for cancellation 7 days before the trip.",
      "75% deduction if informed for cancellation 3 days before the trip.",
      "100% deduction if informed for cancellation in less than 3 days before the trip.",
      "No amount will be refund if any person leaves the trip at any stage due to any reason."
    ]
  },
];

// --------------------------------------------------------------------------
// 2. NORMALIZATION — converts the loosely-shaped RAW_TOURS entries into a
//    single consistent shape used everywhere else on the site:
//    { id, title, days, nights, route, priceHead, priceCouple,
//      lengthGroup, transport, departure, itinerary, includes, excludes }
// --------------------------------------------------------------------------

const DEST_KEYWORDS = [
  ["swat", "swat"], ["kalam", "swat"],
  ["kashmir", "kashmir"], ["arang", "kashmir"], ["taobat", "kashmir"],
  ["neelam", "neelam"], ["neelum", "neelam"],
  ["naran", "naran"], ["babusar", "babusar"],
  ["skardu", "skardu"], ["shangri", "skardu"],
  ["hunza", "hunza"], ["naltar", "hunza"],
  ["kumrat", "kumrat"],
  ["astore", "astore"], ["rupal", "astore"], ["traishing", "astore"], ["deosai", "astore"],
  ["murree", "murree"],
  ["fairy meadows", "fairy-meadows"]
];

function slugify(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function destSlugFromTitle(title) {
  const lower = title.toLowerCase();
  const found = [];
  for (const [kw, tag] of DEST_KEYWORDS) {
    if (lower.includes(kw) && !found.includes(tag)) found.push(tag);
    if (found.length === 2) break;
  }
  return found.join('-');
}

function stringifyDeparture(dep) {
  if (!dep) return "Islamabad / Rawalpindi";
  if (typeof dep === 'string') return dep;
  if (dep.schedule) return dep.schedule;
  const parts = [];
  if (dep.lahore) parts.push(`Lahore: ${dep.lahore}`);
  if (dep.islamabad) parts.push(`Islamabad: ${dep.islamabad}`);
  return parts.length ? parts.join(' | ') : "Islamabad / Rawalpindi";
}

function getPriceHead(cost) {
  if (!cost) return 0;
  if (cost.fromIslamabad) {
    return cost.fromIslamabad.withoutStay?.perHead ?? cost.fromIslamabad.withStay?.perHead ?? 0;
  }
  if (cost.fromKarachi) {
    return cost.fromKarachi.economyTrain?.perHead ?? 0;
  }
  return cost.perHeadIslamabad ?? cost.perHead ?? cost.islamabad ?? cost.lahore ?? 0;
}

function getPriceCouple(cost) {
  if (!cost) return 0;
  if (cost.fromIslamabad) {
    return cost.fromIslamabad.withoutStay?.couplePackage ?? cost.fromIslamabad.withStay?.couplePackage ?? 0;
  }
  if (cost.fromKarachi) {
    return cost.fromKarachi.economyTrain?.couplePackage ?? 0;
  }
  return cost.couplePackage ?? cost.perCouple ?? 0;
}

function buildRoute(t) {
  const places = t.placesVisited || t.mainAttractions;
  if (places && places.length) return places.join(' · ');
  const cleaned = t.title
    .replace(/^\d+\s*days?\s*/i, '')
    .replace(/^special\s*/i, '')
    .replace(/^tour\s*(to|from)?\s*/i, '')
    .replace(/\(.*?\)/g, '')
    .trim();
  return cleaned.split(/,| & | via /i).map(s => s.trim()).filter(Boolean).join(' · ');
}

function lengthGroup(days) {
  if (days <= 3) return 'short';
  if (days <= 5) return 'medium';
  return 'long';
}

// Normalizes the raw paymentProcedure object (policy text + online payment
// methods) into a consistent shape, tolerating the small structural
// differences between tour entries (e.g. an optional verificationContact).
function buildPayment(raw) {
  const pp = raw.paymentProcedure;
  if (!pp) return null;

  const details = pp.onlinePaymentDetails || {};
  const methods = [];

  if (details.jazzCash) {
    methods.push({
      label: "JazzCash",
      accountName: details.jazzCash.accountName || "",
      accountNumber: details.jazzCash.accountNumber || ""
    });
  }
  if (details.easyPaisa) {
    methods.push({
      label: "EasyPaisa",
      accountName: details.easyPaisa.accountName || "",
      accountNumber: details.easyPaisa.accountNumber || ""
    });
  }
  if (details.bankTransfer) {
    methods.push({
      label: details.bankTransfer.bankName || "Bank Transfer",
      accountName: details.bankTransfer.accountName || "",
      accountNumber: details.bankTransfer.accountNumber || ""
    });
  }

  return {
    policy: pp.policy || "Advance payment is compulsory for reservation. Remaining payment at the time of departure.",
    verificationContact: pp.verificationContact || null,
    methods
  };
}

function normalizeTour(raw) {
  const days = (raw.duration && raw.duration.days) || raw.days || 1;
  const nights = (raw.duration && raw.duration.nights) ?? Math.max(days - 1, 0);
  const destSlug = destSlugFromTitle(raw.title) || slugify(raw.title).split('-').slice(0, 3).join('-');
  const id = `${destSlug}-${days}d`;

  const itinerary = (raw.itinerary || []).map(d => ({
    day: d.day,
    text: (d.activities || []).join(', ')
  }));

  return {
    id,
    title: raw.title,
    days,
    nights,
    route: buildRoute(raw),
    priceHead: getPriceHead(raw.cost),
    priceCouple: getPriceCouple(raw.cost),
    lengthGroup: lengthGroup(days),
    transport: "AC Coaster / Grand Cabin",
    departure: stringifyDeparture(raw.departure),
    itinerary,
    includes: raw.servicesIncluded || [],
    excludes: raw.servicesNotIncluded || [],
    payment: buildPayment(raw)
  };
}

function buildTours() {
  const seen = new Map();
  return RAW_TOURS.map(raw => {
    const t = normalizeTour(raw);
    if (seen.has(t.id)) {
      const n = seen.get(t.id) + 1;
      seen.set(t.id, n);
      t.id = `${t.id}-${n}`;
    } else {
      seen.set(t.id, 1);
    }
    return t;
  });
}

// The normalized array every other script on the site reads from.
const TOURS = buildTours();

// --------------------------------------------------------------------------
// 3. IMAGES — keyword-matched cover photo per tour, shared by the listing
//    page and the detail page so there's a single source of truth.
// --------------------------------------------------------------------------
const TOUR_IMAGES = {
  swat: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1170",
  kashmir: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1170",
  neelam: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1170",
  naran: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1170",
  babusar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1170",
  skardu: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170",
  hunza: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170",
  kumrat: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1170",
  astore: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170",
  murree: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1170",
  "fairy-meadows": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1170"
};

function tourImage(t) {
  const idKey = (t.id || "").split(/-\d+d/)[0];
  for (const key of idKey.split('-')) {
    if (TOUR_IMAGES[key]) return TOUR_IMAGES[key];
  }
  const text = ((t.title || "") + " " + (t.route || "")).toLowerCase();
  for (const kw in TOUR_IMAGES) {
    if (text.includes(kw)) return TOUR_IMAGES[kw];
  }
  return `https://picsum.photos/600/400?random=${encodeURIComponent(t.id || Math.random())}`;
}

// Back-compat alias used by older listing-page code.
function getImage(t) { return tourImage(t); }