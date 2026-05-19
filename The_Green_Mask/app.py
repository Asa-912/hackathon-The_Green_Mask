from flask import Flask, render_template, jsonify

app = Flask(__name__)

ENVIRONMENTAL_DATA = {
    "forest": {
        "id": "forest",
        "name": "Emerald Valley Forest",
        "surface_image": "forest_surface.jpg",
        "beneath_image": "forest_beneath.jpg",
        "toxicity": "CRITICAL",
        "hidden_facts": [
            "Soil heavy metal levels 400% above safe limit",
            "Acid rain erosion invisible to naked eye",
            "Biodiversity dropped 85% in last decade"
        ]
    },
    "beach": {
        "id": "beach",
        "name": "Crystal Bay Beach",
        "surface_image": "beach_surface.jpg",
        "beneath_image": "beach_beneath.jpg",
        "toxicity": "SEVERE",
        "hidden_facts": [
            "8.5 tons of plastic waste per kilometer",
            "Microplastics in 95% of marine life",
            "Coral reef destruction from sunscreen chemicals"
        ]
    },
    "city": {
        "id": "city",
        "name": "Metropolitan Skyline",
        "surface_image": "city_surface.jpg",
        "beneath_image": "city_beneath.jpg",
        "toxicity": "EXTREME",
        "hidden_facts": [
            "Air quality index 300+ (Hazardous)",
            "PM2.5 particles 12x WHO safe limits",
            "Underground water contamination"
        ]
    },
    "glacier": {
        "id": "glacier",
        "name": "Arctic Ice Fields",
        "surface_image": "glacier_surface.jpg",
        "beneath_image": "glacier_beneath.jpg",
        "toxicity": "HIGH",
        "hidden_facts": [
            "Black carbon accelerating melt by 300%",
            "Industrial soot embedded in ice cores",
            "Oil exploration waste in pristine areas"
        ]
    },
    "farmland": {
        "id": "farmland",
        "name": "Golden Valley Farms",
        "surface_image": "farmland_surface.jpg",
        "beneath_image": "farmland_beneath.jpg",
        "toxicity": "CRITICAL",
        "hidden_facts": [
            "Pesticide runoff contaminating groundwater",
            "Soil degradation - 60 years of fertility left",
            "Chemical fertilizer dead zones in rivers"
        ]
    },
    "lake": {
        "id": "lake",
        "name": "Mountain Lake Reserve",
        "surface_image": "lake_surface.jpg",
        "beneath_image": "lake_beneath.jpg",
        "toxicity": "SEVERE",
        "hidden_facts": [
            "Industrial dumping upstream",
            "Heavy metals in fish populations",
            "Algal blooms from nutrient pollution"
        ]
    }
}

@app.route('/')
def home():
    locations = list(ENVIRONMENTAL_DATA.values())
    return render_template('index.html', locations=locations)

@app.route('/scan/<location_id>')
def scan_page(location_id):
    print(f"🔍 DEBUG: Requested location_id = '{location_id}'")
    
    if location_id not in ENVIRONMENTAL_DATA:
        print(f"❌ ERROR: '{location_id}' not found. Available: {list(ENVIRONMENTAL_DATA.keys())}")
        return f"Location not found. Available: {list(ENVIRONMENTAL_DATA.keys())}", 404
    
    location = ENVIRONMENTAL_DATA[location_id]
    all_keys = list(ENVIRONMENTAL_DATA.keys())
    current_index = all_keys.index(location_id)
    
    # PRE-COMPUTE URLs
    prev_url = f"/scan/{all_keys[current_index - 1]}" if current_index > 0 else ""
    next_url = f"/scan/{all_keys[current_index + 1]}" if current_index < len(all_keys) - 1 else ""
    
    print(f"✅ Rendering scan.html for '{location['name']}'")
    
    return render_template('scan.html', 
                          location=location,
                          prev_url=prev_url,
                          next_url=next_url,
                          current_index=current_index + 1,
                          total_count=len(all_keys))

@app.route('/api/scan/<location_id>')
def scan_api(location_id):
    if location_id in ENVIRONMENTAL_DATA:
        return jsonify(ENVIRONMENTAL_DATA[location_id])
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    print("🚀 Flask server starting...")
    print(f"📍 Available locations: {list(ENVIRONMENTAL_DATA.keys())}")
    app.run(debug=True, port=5000)