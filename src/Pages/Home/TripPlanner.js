import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_Gemini_Api;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-002",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const tripPlanningChatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "I want to generate a trip plan from Dhaka to Sylhet for the dates October 27, 2024, to October 30, 2024. I am looking for a low-budget hotel. Please provide a full response in JSON format. The JSON should include the following objects:\n\n1. *Tour Plan*: A detailed daily to-do list as an array, where each entry contains:\n    - \"day\": The day of the trip (e.g., Day 1, Day 2)\n    - \"tasks\": An array of tasks for that day, where each task includes:\n        - \"activity\": The activity to be performed (e.g., \"Travel to Sylhet\")\n        - \"place\": The place for the activity (e.g., \"Dhaka Railway Station\")\n        - \"latitude\": The latitude of the place\n        - \"longitude\": The longitude of the place\n        - \"estimated_time\": The estimated duration for the activity (e.g., \"6 hours\")\n        - \"status\": Set to \"pending\" by default\n\n2. *Estimation Budget*: A breakdown of the estimated budget for the trip, including accommodation, transportation, food, and sightseeing.\n\n3. *Hotel Name*: The name and location (with latitude and longitude) of a low-budget hotel where I can stay.\n\nMake sure the response is in JSON format, and the tasks are presented in an array format for each day to facilitate a to-do list generation." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"Tour Plan\": [\n    {\n      \"day\": \"Day 1 (October 27, 2024)\",\n      \"tasks\": [\n        {\n          \"activity\": \"Travel to Sylhet\",\n          \"place\": \"Dhaka Railway Station to Sylhet Railway Station\",\n          \"latitude\": \"23.730769\",\n          \"longitude\": \"90.408998\",\n          \"estimated_time\": \"6-7 hours\",\n          \"status\": \"pending\"\n        },\n        {\n          \"activity\": \"Check in to Hotel\",\n          \"place\": \"Hotel Hill Town\",\n          \"latitude\": \"24.888582\",\n          \"longitude\": \"91.868932\",\n          \"estimated_time\": \"30 minutes\",\n          \"status\": \"pending\"\n        },\n        {\n          \"activity\": \"Dinner\",\n          \"place\": \"Local Restaurant (Near Hotel)\",\n          \"latitude\": \"24.889\", \n          \"longitude\": \"91.869\",\n          \"estimated_time\": \"1 hour\",\n          \"status\": \"pending\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 2 (October 28, 2024)\",\n      \"tasks\": [\n        {\n          \"activity\": \"Visit Ratargul Swamp Forest\",\n          \"place\": \"Ratargul Swamp Forest\",\n          \"latitude\": \"25.170215\",\n          \"longitude\": \"92.023674\",\n          \"estimated_time\": \"4-5 hours\",\n          \"status\": \"pending\"\n        },\n        {\n          \"activity\": \"Lunch\",\n          \"place\": \"Local Restaurant near Ratargul\",\n          \"latitude\": \"25.17\", \n          \"longitude\": \"92.02\",\n          \"estimated_time\": \"1 hour\",\n          \"status\": \"pending\"\n        },\n        {\n          \"activity\": \"Explore Sylhet City\",\n          \"place\": \"Sylhet City Center\",\n          \"latitude\": \"24.892777\",\n          \"longitude\": \"91.866768\",\n          \"estimated_time\": \"3-4 hours\",\n          \"status\": \"pending\"\n        },\n        {\n          \"activity\": \"Dinner\",\n          \"place\": \"Local Restaurant in Sylhet City\",\n          \"latitude\": \"24.893\",\n          \"longitude\": \"91.867\",\n          \"estimated_time\": \"1 hour\",\n          \"status\": \"pending\"\n        }\n      ]\n    },\n    {\n      \"day\": \"Day 3 (October 29, 2024)\",\n      \"tasks\": [\n        {\n          \"activity\": \"Visit Jaflong\",\n          \"place\": \"Jaflong\",\n          \"latitude\": \"25.170879\",\n          \"longitude\": \"92.172388\",\n          \"estimated_time\": \"6-7 hours\",\n          \"status\": \"pending\"\n        },\n        {\n          \"activity\": \"Lunch\",\n          \"place\": \"Local Restaurant near Jaflong\",\n          \"latitude\": \"25.17\",\n          \"longitude\": \"92.17\",\n          \"estimated_time\": \"1 hour\",\n          \"status\": \"pending\"\n        },\n        {\n          \"activity\": \"Return to Sylhet\",\n          \"place\": \"Sylhet City\",\n          \"latitude\": \"24.892777\",\n          \"longitude\": \"91.866768\",\n          \"estimated_time\": \"2-3 hours\",\n          \"status\": \"pending\"\n        },\n        {\n          \"activity\": \"Dinner\",\n          \"place\": \"Local Restaurant in Sylhet City\",\n          \"latitude\": \"24.893\", \n          \"longitude\": \"91.867\",\n          \"estimated_time\": \"1 hour\",\n          \"status\": \"pending\"\n        }\n\n      ]\n    },\n    {\n      \"day\": \"Day 4 (October 30, 2024)\",\n      \"tasks\": [\n        {\n          \"activity\": \"Return to Dhaka\",\n          \"place\": \"Sylhet Railway Station to Dhaka Railway Station\",\n          \"latitude\": \"24.896076\",\n          \"longitude\": \"91.871612\",\n          \"estimated_time\": \"6-7 hours\",\n          \"status\": \"pending\"\n        }\n      ]\n    }\n  ],\n  \"Estimation Budget\": {\n    \"accommodation\": \"1000 BDT per night (3000 BDT total)\",\n    \"transportation\": \"2000 BDT (round trip)\",\n    \"food\": \"3000 BDT\",\n    \"sightseeing\": \"2000 BDT\"\n  },\n  \"Hotel Name\": {\n    \"name\": \"Hotel Hill Town\",\n    \"latitude\": \"24.888582\",\n    \"longitude\": \"91.868932\"\n  }\n}\n```\n" },
            ],
        },
    ],
});
