// Define the web manifest object with meaningful values and additional fields
let webManifest = {
    "name": "Dobywatel",
    "short_name": "Dobywatel",
    "theme_color": "#f5f6fb",
    "background_color": "#f5f6fb",
    "display": "standalone",
    "start_url": "/",
    "description": "A brief description of your app",
    "icons": [
        {
            "src": "path/to/icon.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ]
};

// Create a link element for the manifest
try {
    let manifestElem = document.createElement('link');
    manifestElem.setAttribute('rel', 'manifest');
    // Convert the webManifest object to a base64 encoded JSON string
    manifestElem.setAttribute('href', 'data:application/manifest+json;base64,' + btoa(JSON.stringify(webManifest)));
    document.head.prepend(manifestElem);
} catch (error) {
    console.error('Error creating or setting attributes for manifest element:', error);
}
