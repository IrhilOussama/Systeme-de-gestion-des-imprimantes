
export default async function fetchData(apiUrl) {
  try {
    // Fetch data from the apiUrl
    let response = await fetch(apiUrl);
    
    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
    // Parse the JSON from the response
      let data = await response.json();
      // Return the parsed data
      return data;
    }
    else {
      return "the content type isn't json";
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}