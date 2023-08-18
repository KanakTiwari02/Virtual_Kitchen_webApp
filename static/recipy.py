import pyttsx3
import os
import speech_recognition as sr
import openai
from gtts import gTTS
def chatBotRecipy(taking_input):
    def textToSpeech(x):
        # Initializing speech synthesizer
        engine = pyttsx3.init()
        # Reading the text from the speechToText() function
        voices = engine.getProperty("voices")
        engine.setProperty("voice", voices[1].id)
        rate = engine.getProperty("rate")
        engine.setProperty("rate", 150)
        engine.say(x)
        engine.runAndWait()

    def speechToText():
        # Initializing speech recognizer
        recognizer = sr.Recognizer()

        # Reading the audio from the microphone
        with sr.Microphone() as source:
            print("Use English Prompt...")
            recognizer.adjust_for_ambient_noise(source)

            # Waits for the speech to be recognized
            audio = recognizer.listen(source)

            # Converting the speech to text
            try:
                # Converting the speech to text
                print("Recognizing ...")
                text = recognizer.recognize_google(audio, language="en-in")
                return text
            except Exception as e:
                print("Sorry, I didn't understand")
                return "Sorry, I didn't understand"
        # speechToText()
        

    # Set up OpenAI API credentials
    def generated_text():
        openai.api_key = "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"
        
        global query
        query =  taking_input
        que = query.split()
        s = ""
        for i in que:
            s = s + i + ","
    # Set the prompt for the presentation
        prompt = '''generate a recipe with the ingreditent {} in simple language'''.format(query)
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

    # Generate the presentation text using GPT-3

    # print(r)

    # if __name__ == "__main__":
    # print("What are the ingredients you have in your kitchen ?")
    # what_variable = textToSpeech("What are the ingredients you have in your kitchen ?")
    r = generated_text()
    print(r)
    
    # ingredients_user = speechToText().lower()
    # textToSpeech(r)
    speech_GTTS = gTTS(r, lang='en', slow=False)
    final_recipy = speech_GTTS.save(taking_input+'.mp3')
    return r, taking_input
