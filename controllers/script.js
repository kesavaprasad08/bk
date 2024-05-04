const GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
const script = require("../models/script");
const Script = require("../models/script");
const { ObjectId } = require("mongodb");

exports.createScript = async (req, res, next) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `write a script for ${req.body.format} format, the title is ${req.body.title}, the synopsis is ${req.body.synopsis} and the genre is ${req.body.genre}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res
      .status(200)
      .json({
        script: text,
        title: req.body.title,
        synopsis: req.body.synopsis,
        genre: req.body.genre,
      });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.postScript = async (req, res, next) => {
  try {
    const scriptData = req.body.script;
    const title = req.body.title;
    const genre = req.body.genre;
    const synopsis = req.body.synopsis;
    const script = new Script({
      script: scriptData,
      title,
      genre,
      synopsis,
      userId: req.user._id,
    });
    await script.save();
    res.status(200).json({ message: "success" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getScripts = async (req, res, next) => {
  try {
    console.log(req.user);
    const script = await Script.find({ userId: req.user._id.toString() });
    if (script.length > 0) {
      return res.status(200).json({ data: script });
    } else {
      return res.status(200).json({ message: "No Scripts found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.editScript = async (req, res, next) => {
  try {
   await Script.findByIdAndUpdate(req.body.id,{script:req.body.script});
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
