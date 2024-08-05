import { controllers } from "chart.js"

export default async function fetchData(controller, action, method = "GET", body = {}) {
  let apiUrl = `${process.env.REACT_APP_PROJECT_PATH}/php/index.php?controller=${controller}&action=${action}`;
  try {
    // Fetch data from the apiUrl
    let response;
    if (method === "POST"){
      response = await fetch(apiUrl, {
        method: method,
        body: body
      });
    }
    else {
      response = await fetch(apiUrl, {
        method: method
      });
    }
    
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