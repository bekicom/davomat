const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

// Qurilmadan kelgan ma’lumotlarni qabul qilish
app.post("/attendance", (req, res) => {
  const eventData = req.body;
  console.log("Qurilmadan kelgan ma’lumot:", eventData);

  // Ma’lumotni faylga saqlash
  let attendance = [];
  if (fs.existsSync("./attendance.json")) {
    attendance = JSON.parse(fs.readFileSync("./attendance.json"));
  }
  attendance.push({ ...eventData, timestamp: new Date() });
  fs.writeFileSync("./attendance.json", JSON.stringify(attendance, null, 2));

  res.status(200).send("Ma’lumot qabul qilindi");
});

// Frontend uchun ma’lumotlarni qaytarish
app.get("/attendance", (req, res) => {
  const attendance = fs.existsSync("./attendance.json")
    ? JSON.parse(fs.readFileSync("./attendance.json"))
    : [];
  res.json(attendance);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlamoqda: http://192.168.100.9:${PORT}`);
});
