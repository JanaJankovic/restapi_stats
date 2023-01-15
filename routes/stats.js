const express = require("express");
const router = express.Router();
require("dotenv/config");

const Stat = require("./stats.model");

// GET last called
router.get("/last", async (req, res) => {
  try {
    const earliest = await Stat.findOne().sort({ last_called: -1 });
    res.json(earliest);
  } catch (err) {
    res.json({ message: err, error: true });
  }
});

// GET top called
router.get("/top", async (req, res) => {
  try {
    const top = await Stat.findOne().sort({ calls: -1 });
    res.json(top);
  } catch (err) {
    res.json({ message: err, error: true });
  }
});

// GET all
router.get("/all", async (req, res) => {
  try {
    const all = await Stat.find();
    res.json(all);
  } catch (err) {
    res.json({ message: err, error: true });
  }
});

// UPDATE
router.post("/update", async (req, res) => {
  try {
    const url = req.body.url;
    const stat = await Stat.findOne({ url: url });
    if (stat == undefined) res.json({ message: "Url not found", error: false });
    stat.calls = stat.calls + 1;
    await Stat.updateOne(
      { url: url },
      {
        $set: {
          calls: stat.calls,
          last_called: new Date(),
        },
      }
    );
    res.json({ message: "Updated", error: false });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
