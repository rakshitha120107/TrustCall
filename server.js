const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const suspiciousNumbers = [
    "9876543210",
    "9123456780",
    "9000011111"
];

app.post("/check-number", (req, res) => {
    const number = (req.body.number || "").trim();

    if (!/^\d{10}$/.test(number)) {
        return res.status(400).json({
            message: "Please enter a valid 10-digit number."
        });
    }

    const suspicious = suspiciousNumbers.includes(number);

    res.json({
        number,
        status: suspicious
            ? "Suspicious (Demo)"
            : "Not listed as suspicious",
        warning: suspicious
            ? "This sample number is marked suspicious in our demo database."
            : "No match found in our sample database."
    });
});

app.listen(3000, () => {
    console.log("TrustCall running at http://localhost:3000");
});