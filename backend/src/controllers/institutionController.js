const Institution = require('../models/Institution');
const { fetchWebsiteMetadata } = require('../utils/websiteScraper');

/**
 * GET /api/institutions
 * Returns all institutions with coordinates from MongoDB
 */
exports.getAllInstitutions = async (req, res) => {
  try {
    // Set headers to prevent caching (especially important for development)
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    // Fetch all institutions, but only include those with valid coordinates
    const institutions = await Institution.find({
      latitude: { $ne: null, $type: 'number' },
      longitude: { $ne: null, $type: 'number' }
    }).select('name state district website latitude longitude aishe_code year_of_establishment location_type');

    // Transform data to match frontend expectations
    const formattedInstitutions = institutions.map(inst => ({
      _id: inst._id.toString(),
      name: inst.name,
      lat: inst.latitude,
      lng: inst.longitude,
      city: inst.district || '',
      state: inst.state || '',
      address: `${inst.district || ''}, ${inst.state || ''}`.trim(),
      website: inst.website || '',
      aishe_code: inst.aishe_code || '',
      year_of_establishment: inst.year_of_establishment || null,
      location_type: inst.location_type || ''
    }));

    res.json(formattedInstitutions);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    res.status(500).json({ 
      error: 'Failed to fetch institutions',
      message: error.message 
    });
  }
};

/**
 * GET /api/institutions/with-metadata
 * Returns all institutions with website metadata fetched in real-time
 */
exports.getInstitutionsWithMetadata = async (req, res) => {
  try {
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    // Fetch institutions from MongoDB
    const institutions = await Institution.find({
      latitude: { $ne: null, $type: 'number' },
      longitude: { $ne: null, $type: 'number' }
    }).select('name state district website latitude longitude aishe_code year_of_establishment location_type').limit(50); // Limit to 50 for performance

    // Transform and enrich with website metadata (process in parallel with timeout protection)
    const enrichedInstitutions = await Promise.allSettled(
      institutions.map(async (inst) => {
        const baseData = {
          _id: inst._id.toString(),
          name: inst.name,
          lat: inst.latitude,
          lng: inst.longitude,
          city: inst.district || '',
          state: inst.state || '',
          address: `${inst.district || ''}, ${inst.state || ''}`.trim(),
          website: inst.website || '',
          aishe_code: inst.aishe_code || '',
          year_of_establishment: inst.year_of_establishment || null,
          location_type: inst.location_type || '',
          // Default values
          description: '',
          image: '',
          type: inst.location_type || 'Educational Institution'
        };

        // Fetch website metadata if website exists (with timeout)
        if (inst.website) {
          try {
            // Add timeout wrapper
            const metadataPromise = fetchWebsiteMetadata(inst.website);
            const timeoutPromise = new Promise((resolve) => 
              setTimeout(() => resolve(null), 5000) // 5 second timeout per website
            );
            
            const metadata = await Promise.race([metadataPromise, timeoutPromise]);
            
            if (metadata) {
              // Merge metadata, prioritizing website data but keeping MongoDB data
              baseData.description = metadata.description || baseData.description;
              baseData.image = metadata.image || baseData.image;
              if (metadata.type && metadata.type !== 'website') {
                baseData.type = metadata.type;
              }
            }
          } catch (error) {
            // Silently fail and continue with MongoDB data only
            console.error(`Failed to fetch metadata for ${inst.website}:`, error.message);
          }
        }

        return baseData;
      })
    );

    // Filter out failed promises and extract values
    const successfulInstitutions = enrichedInstitutions
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);

    res.json(successfulInstitutions);
  } catch (error) {
    console.error('Error fetching institutions with metadata:', error);
    res.status(500).json({ 
      error: 'Failed to fetch institutions',
      message: error.message 
    });
  }
};

/**
 * GET /api/institutions/:id
 * Returns a single institution by ID
 */
exports.getInstitutionById = async (req, res) => {
  try {
    // Set headers to prevent caching
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const institution = await Institution.findById(req.params.id);
    
    if (!institution) {
      return res.status(404).json({ error: 'Institution not found' });
    }

    res.json({
      _id: institution._id.toString(),
      name: institution.name,
      lat: institution.latitude,
      lng: institution.longitude,
      city: institution.district || '',
      state: institution.state || '',
      address: `${institution.district || ''}, ${institution.state || ''}`.trim(),
      website: institution.website || '',
      aishe_code: institution.aishe_code || '',
      year_of_establishment: institution.year_of_establishment || null,
      location_type: institution.location_type || ''
    });
  } catch (error) {
    console.error('Error fetching institution:', error);
    res.status(500).json({ 
      error: 'Failed to fetch institution',
      message: error.message 
    });
  }
};

