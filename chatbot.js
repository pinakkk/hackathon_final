import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Replace 'YOUR_API_KEY_HERE' with your actual Gemini API key
const API_KEY = "AIzaSyA6WWDJN8Q5eiZFW3ogR_3IFsl-_sBRPXU";
const genAI = new GoogleGenerativeAI(API_KEY);

// Generative Configuration Parameters
const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};

// Safety Settings Configuration
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

// Get generative model with both configurations
const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
    safetySettings
});

// Start multi-turn conversation
async function startConversation() {
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: "You are a legal chatbot, you are designed to provide legal advices and law related queries to users. you majorly focus in the laws of indian constitution"

            },

            {
                role: "model",
                parts: `
               
                The Constitution of India: A Foundation for Democracy
                
                The Constitution of India is the supreme law of the land, carefully crafted over a period of two years, eleven months, and eighteen days. It came into effect on January 26th, 1950, establishing India as  a sovereign, socialist, secular, and democratic republic.  Here's a breakdown of its significance and key components:
                
                Preamble:
                
                Outlines the core values of the nation: justice, liberty, equality, and fraternity.
                Fundamental Rights:
                
                Enshrines basic rights to life, freedom of speech and expression, religion, equality before the law, and protection against discrimination.
                Serves as a safeguard against potential abuse of power.
                Directive Principles of State Policy:
                
                Socio-economic guidelines for the government when making laws and policies.
                Aims to create a welfare state that promotes equitable distribution of resources.
                Fundamental Duties:
                
                Outlines citizens' responsibilities toward the nation, fostering patriotism and unity.
                Structure of Government:
                
                Parliamentary System: Provides for a federal structure with a bicameral legislature (Lok Sabha and Rajya Sabha) and a Prime Minister as thehead of government.
                Independent Judiciary: Upholds the rule of law and protects citizens' rights.
                Division of Powers: Distributes powers between the central and state governments.
                Key Articles of the Indian Constitution
                
                Here's a glimpse into some of the most significant articles:
                
                Article 14: Guarantees equality before the law.
                Article 15: Prohibits discrimination based on religion, race, caste, sex, or place of birth.
                Article 19: Ensures freedom of speech and expression, assembly, association, movement, residence, and practicing any profession.
                Article 21: Protects the right to life and personal liberty.
                Article 32: Provides for the right to constitutional remedies for the enforcement of Fundamental Rights, including the power to issue writs like habeas corpus.
                Amendments
                
                While considered the 'basic structure' that should not be altered, the Constitution incorporates flexibility for amendments through a defined procedure.
                Significance
                
                The Indian Constitution is a visionary document that:
                
                Safeguards Democracy: Ensures democratic principles and protects against authoritarian rule.
                Enshrines Fundamental Rights: Guarantees freedoms and protections for its citizens.
                Provides Social Justice: Promotes a more equitable society through affirmative action and welfare measures.
                Framework of Governance: Creates a robust governmental structure and a system of checks and balances.
                Challenges and Evolution
                
                The Indian Constitution continues to evolve and adapt to the changing needs of the nation. It faces contemporary challenges such as:
                
                Balancing individual rights and societal interests
                Implementing Directive Principles
                Addressing issues like corruption and inequality
                In Conclusion
                
                The Indian Constitution is a living document that embodies the aspirations and values of the Indian people. It serves as a beacon of hope, upholding democratic principles and guiding the nation towards a more just and equitable future.
                
                `
            },
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });

    const userQuestion = userInput.value;
    userInput.value = ""; // Clear input field

    // Display user question in chatbox
    chatbox.innerHTML += `<p><strong>You:</strong> ${userQuestion}</p>`;

    try {
        const result = await chat.sendMessage(userQuestion, { role: "user" });
        const response = await result.response;
        const chatbotResponse = response.text();

        // Display chatbot response


        if (chatbotResponse && chatbotResponse.trim() !== "") {
            chatbox.innerHTML += `<p><strong>Legal AI:</strong> ${chatbotResponse}</p>`;
        } else {
            chatbox.innerHTML += `<p><strong>Legal AI:</strong> I'm still thinking about that. Please wait a moment.</p>`;
            setTimeout(() => {
                chatbox.innerHTML += `<p><strong>Legal AI:</strong> And I think im fighting and getting problems with gemini model.</p>`
            }, 1000);

        }


    }

    catch (error) {
        console.error("Error from Gemini:", error);
        if (error.response && error.response.data) {
            // Check for additional error details provided by the API
            console.error("Gemini Error Details:", error.response.data);
        }
        chatbox.innerHTML += `<p><strong>Legal AI:</strong> I'm experiencing some technical difficulties. Please try again, or consult with a human lawyer.</p>`;
    }

}

// Add this line before the event listener declaration
const sendButton = document.getElementById("send-button");
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");

// Event listener for sending messages
sendButton.addEventListener("click", startConversation);




