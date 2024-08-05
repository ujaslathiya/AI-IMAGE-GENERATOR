import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

// Setup open ai api key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Controller to generate Image

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    console.log("generating image");
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const generatedImage = response.data.data[0].b64_json;
    console.log('image generated succesfully');
    return res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        console.log('error in generating image'),
        error.status,
        error?.response?.data?.error?.message || error?.message
      )
    );
  }
};
