import OpenAI from "openai";
const openai = new OpenAI();
openai.apiKey = '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'
export async function main() {
    const completion = await openai.chat.completions.create({
        messages:[{role:"system",content:"You are a helpful assistant."}],
        model:"gpt-3.5-turbo",
    });
    // console.log(completion.choices[0]);
}