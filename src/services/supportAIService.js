import apiClient from "@src/utils/apiClient"

export const getAIChats = async ( params = {} ) => {
    try {
        const response = await apiClient.get( "/support/ai-chat", { params } )
        return response.data
    } catch ( error ) {
        console.error( "Error with AI chat:", error )
        throw error
    }
}

export const createAIChat = async ( data ) => {
    try {
        // // Simulate AI response delay with timeout
        // await new Promise(resolve => setTimeout(resolve, 2000));

        // return {
        //     "success": true,
        //     "data": {
        //         "id": "be72fa70-6668-4fdd-956a-bb4fea573662",
        //         "user": "ef112827-2aea-48b5-bd9b-dbbb7b1d8d38",
        //         "question": data.question,
        //         "reply": "Certainly! Paracetamol tablets, also known as acetaminophen, offer several benefits, including:\n\n1. **Pain relief**: Paracetamol is commonly used to reduce mild to moderate pain, such as headaches, toothaches, muscle aches, and menstrual cramps.\n\n2. **Fever reduction**: It is effective in lowering fevers in conditions such as the flu, colds, or other infections.\n\n3. **Safe for most people**: When taken at the recommended dosage, paracetamol is usually safe for most individuals, including children and pregnant women (under medical guidance).\n\n4. **Ease of access**: Paracetamol tablets are widely available over-the-counter in pharmacies, making them convenient for managing pain and fever at home.\n\n5. **Non-inflammatory**: Unlike some other pain relievers, paracetamol does not have significant anti-inflammatory properties, which can be beneficial for individuals who need pain relief without exacerbating inflammation.\n\nRemember, while paracetamol is generally safe, it's important to follow the recommended dosage instructions and consult a healthcare professional if you have any concerns or questions.",
        //         "created_at": "2025-08-27T14:48:19.693298Z",
        //         "modified_at": "2025-08-27T14:48:19.693319Z"
        //     },
        //     "message": "ok",
        //     "detail": null
        // }
        const response = await apiClient.post( "/support/ai-chat/", data )
        return response.data

    } catch ( error ) {
        console.error( "Error with AI chat:", error )
        throw error
    }
}