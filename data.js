// Environmental data for all 6 locations
// This replaces the ENVIRONMENTAL_DATA dictionary from Flask
const ENVIRONMENTAL_DATA = {
    forest: {
        id: "forest",
        name: "Emerald Valley Forest",
        surfaceImage: "images/forest_surface.jpg",
        beneathImage: "images/forest_beneath.jpg",
        toxicity: "CRITICAL",
        hiddenFacts: [
            "Soil heavy metal levels 400% above safe limit",
            "Acid rain erosion invisible to naked eye",
            "Biodiversity dropped 85% in last decade"
        ]
    },
    beach: {
        id: "beach",
        name: "Crystal Bay Beach",
        surfaceImage: "images/beach_surface.jpg",
        beneathImage: "images/beach_beneath.jpg",
        toxicity: "SEVERE",
        hiddenFacts: [
            "8.5 tons of plastic waste per kilometer",
            "Microplastics in 95% of marine life",
            "Coral reef destruction from sunscreen chemicals"
        ]
    },
    city: {
        id: "city",
        name: "Metropolitan Skyline",
        surfaceImage: "images/city_surface.jpg",
        beneathImage: "images/city_beneath.jpg",
        toxicity: "EXTREME",
        hiddenFacts: [
            "Air quality index 300+ (Hazardous)",
            "PM2.5 particles 12x WHO safe limits",
            "Underground water contamination"
        ]
    },
    glacier: {
        id: "glacier",
        name: "Arctic Ice Fields",
        surfaceImage: "images/glacier_surface.jpg",
        beneathImage: "images/glacier_beneath.jpg",
        toxicity: "HIGH",
        hiddenFacts: [
            "Black carbon accelerating melt by 300%",
            "Industrial soot embedded in ice cores",
            "Oil exploration waste in pristine areas"
        ]
    },
    farmland: {
        id: "farmland",
        name: "Golden Valley Farms",
        surfaceImage: "images/farmland_surface.jpg",
        beneathImage: "images/farmland_beneath.jpg",
        toxicity: "CRITICAL",
        hiddenFacts: [
            "Pesticide runoff contaminating groundwater",
            "Soil degradation - 60 years of fertility left",
            "Chemical fertilizer dead zones in rivers"
        ]
    },
    lake: {
        id: "lake",
        name: "Mountain Lake Reserve",
        surfaceImage: "images/lake_surface.jpg",
        beneathImage: "images/lake_beneath.jpg",
        toxicity: "SEVERE",
        hiddenFacts: [
            "Industrial dumping upstream",
            "Heavy metals in fish populations",
            "Algal blooms from nutrient pollution"
        ]
    }
};

// Ordered list of location IDs for navigation
const LOCATION_ORDER = ["forest", "beach", "city", "glacier", "farmland", "lake"];