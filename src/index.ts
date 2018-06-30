import { config } from "./config";
import * as fileHelper from "./helper.file";
import * as request from "request";
import * as fs from "fs";
import * as queryString from "querystring"

//textToSpeech("Your passion is for yours, your purpose is for others");
//speechToText("amy.wav");
//translate("Your passion is for yours, your purpose is for others","en-US", "de");
function textToSpeech(text: string) {
    const requestOptions: request.CoreOptions = {
        headers: {
            "Ocp-Apim-Subscription-Key": config.speech.bingSpeech.key1,
        }
    };
    request.post(
        `${config.speech.bingSpeech.authEndPoint}/issueToken`,
        requestOptions,
        (err, response, body) => {
            const accessToken = response.body;
            const payLoad = `
            <speak version="1.0" xml:lang="en-US">
            <voice xml:lang="en-US" xml:gender="Female" name="Microsoft Server Speech Text to Speech Voice (en-US, ZiraRus)">
            ${text}
            </voice>
            </speak>
            `;
            const requestOptions: request.CoreOptions = {
                headers: {
                    "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
                    "Content-Type": "application/ssml+xml",
                    "Host": "speech.platform.bing.com",
                    "Content-Length": payLoad.length,
                    "Authorization": "Bearer " + accessToken,
                    "User-Agent": "NodeJS"
                },
                body: payLoad
            };

            request.post(
                config.speech.bingSpeech.synthesizeUrl,
                requestOptions
            ).pipe(fs.createWriteStream(__dirname + "/output.wav"));
        }
    )
}

function speechToText(fileName: string) {
    const requestOptions: request.CoreOptions = {
        headers: {
            "Content-Type": "audio/wav; codec=audio/pcm; samplerate=16000",
            "Transfer-Encoding": "chunked",
            "Ocp-Apim-Subscription-Key": config.speech.bingSpeech.key1
        },
        body: fileHelper.readFile(`${__dirname}/${fileName}`)
    };
    request.post(
        config.speech.bingSpeech.endPoind,
        requestOptions,
        (error, response, body) => {
            console.log(response.body);
        }
    );
}

function translate(text: string, from: string, to: string) {
    const requestOptions = getRequestOptions();
    const params = {
        "from": from,
        "to": to,
        "text": text
    };

    request.get(
        config.speech.translateApi.endPoind + "/Translate?" + queryString.stringify(params),
        requestOptions,
        (error, response, body)=>{
            console.log(body);
        }
    );
}

function getRequestOptions() {
    const requestOptions: request.CoreOptions = {
        headers: {
            "ocp-Apim-Subscription-Key": config.speech.translateApi.key1
        }
    };
    return requestOptions;
}

