const express = require("express");
const router = express.Router();
require("dotenv/config");

const Stat = require("./stats.model");

// GET last called
router.get("/last", async (req, res) => {
  try {
    const earliest = await Stat.findOne().sort({ last_called: -1 });
    return res.json(earliest);
  } catch (err) {
    return res.json({ message: err, error: true });
  }
});

// GET top called
router.get("/top", async (req, res) => {
  try {
    const top = await Stat.findOne().sort({ calls: -1 });
    return res.json(top);
  } catch (err) {
    return res.json({ message: err, error: true });
  }
});

// GET all
router.get("/all", async (req, res) => {
  try {
    const all = await Stat.find();
    return res.json(all);
  } catch (err) {
    return res.json({ message: err, error: true });
  }
});

// UPDATE specific
router.post("/update", async (req, res) => {
  try {
    const url = req.body.url;
    const stat = await Stat.findOne({ url: url });
    if (stat == undefined) {
      return res.json({ message: "Url not found", error: false });
    }

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
    return res.json({ message: "Updated", error: false });
  } catch (err) {
    return res.json({ message: err });
  }
});

module.exports = router;
