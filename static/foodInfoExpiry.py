import openai
#import os

# Set up OpenAI API credentials
def generated_text():
    openai.api_key = "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"
    
    #global query
    query =  input("enter the name of food: ")
# Set the prompt for the presentation
    prompt = '''approx in how many days a {}'''.format(query)
# Generate the presentation text using GPT-3
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.6,
        #frequency_penalty = 0,
        presence_penalty = 1,
    )

    presentation_text = response.choices[0].text

    return presentation_text.lower()

function_call = generated_text()