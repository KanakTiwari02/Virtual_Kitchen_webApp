import pyttsx3
import os
import speech_recognition as sr
import openai
from gtts import gTTS

# Set up OpenAI API credentials
openai.api_key = "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"

def chatbotFoodRequired(inputNoOfMembers,input_dishes):
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

    def generated_text(taking_input_dishes, input_ingredient):
        global query
        query = taking_input_dishes
        ingredient = input_ingredient
        prompt = '''there are {} guests coming to my house, and I want to make {}.
        I want you to suggest how much quantity I should make so that the food doesn't go to waste.'''.format(
            query, ingredient)
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=0.6,
            presence_penalty=1,
        )

        presentation_text = response.choices[0].text

        return presentation_text.lower()

    required_food = generated_text(input_dishes,inputNoOfMembers)
    print(required_food)
    # textToSpeech(required_food)

    speech_GTTS = gTTS(required_food, lang='en', slow=False)
    final_recipe = speech_GTTS.save(input_dishes + '.mp3')
    return required_food, input_dishes


# chatbotFoodRequired(4,"rice and pasta")
