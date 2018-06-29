export let config = {
    speech: {
        bingSpeech: {
            endPoind: "https://speech.platform.bing.com/speech/recognition/interactive/cognitiveservices/V1?language=en-us&format=detailed",
            authEndPoint: "https://api.cognitive.microsoft.com/sts/v1.0",
            key1: "7b94d218b1294a189768531d29773a2a",
            key2: "780809ba691041d5807e2f082ca1b643",
            synthesizeUrl: "https://speech.platform.bing.com/synthesize"
        },
        translateApi: {
            endPoind: "https://api.microsofttranslator.com/V2/Http.Svc",
            authEndPoint: "https://api.cognitive.microsoft.com/sts/v1.0",
            key1: "0de2ccfef84e45909bb8e0a15fa9f92f",
            key2: "82a5a4aa29d742a89f39c2d5f7d9fc87"
        }
    }
};