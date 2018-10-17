const fs = require('fs');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

// The text to synthesize
//const text = "No you can't spend the night at jennys. you have a big project due two weeks frmo now and you haven't even started";
const text = "I'm not a tiger mom! You'll understand when you're older and have kids.";
const fh = process.argv[2]

// Construct the request
const request = {
  input: {text: text},
  // Select the language and SSML Voice Gender (optional)
  //voice: {languageCode: 'en-US-Standard-E', ssmlGender: 'FEMALE', voiceName: 'en-US-Wavenet-C'},
  voice: {languageCode: 'en-US-Standard-E', ssmlGender: 'FEMALE'},
  // Select the type of audio encoding
  audioConfig: {audioEncoding: 'MP3'},
};

// Performs the Text-to-Speech request
client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('ERROR:', err);
    return;
  }

  // Write the binary audio content to a local file
  fs.writeFile(`${fh}.mp3`, response.audioContent, 'binary', err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log(`Audio content written to file: ${fh}.mp3`);
  });
});
