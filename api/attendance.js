const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  if (req.method === "POST") {
    const eventData = req.body;
    console.log("Qurilmadan kelgan ma’lumot:", eventData);

    // Ma’lumotni faylga saqlash (Vercel’da local fayl vaqtinchalik ishlaydi, keyinroq database qo‘shilishi mumkin)
    let attendance = [];
    const filePath = path.join(__dirname, "../attendance.json");
    if (fs.existsSync(filePath)) {
      attendance = JSON.parse(fs.readFileSync(filePath));
    }
    attendance.push({ ...eventData, timestamp: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(attendance, null, 2));

    res.status(200).send("Ma’lumot qabul qilindi");
  } else if (req.method === "GET") {
    const filePath = path.join(__dirname, "../attendance.json");
    const attendance = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath))
      : [];
    res.status(200).json(attendance);
  } else {
    res.status(405).send("Method not allowed");
  }
};
