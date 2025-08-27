# API Monitoring Dashboard

A simple **React-based dashboard** to monitor APIs.  
It pings your APIs, shows their latest responses, and maintains a log of all responses for easy debugging.

---

## Features
- **API Monitoring** – Add and monitor multiple APIs.  
- **Live Response Viewer** – Displays API responses in a formatted, scrollable JSON view.  
- **Response Logs** – Keeps a history of all API responses.  
- **Theme Switcher** – Toggle between **Light** and **Dark** mode.  
- **Copy to Clipboard** – Copy API responses easily.  
- **Auto-Refresh (Optional)** – APIs can be pinged periodically in the background.

---

## Installation & Setup

### 1. Clone the repo
```bash
git clone https://github.com/KartikLakhotiya/Ping-APIs.git
cd Ping-APIs
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm start
```

### 4. Build for production
```bash
npm run build
```

---

## Usage
1. Open the dashboard in your browser.   
2. Click **Ping API** – the response will be displayed in a **formatted JSON box**.  
3. Logs will store all previous responses for that API.  
4. Use the **Theme Switcher** (top-right) to toggle between Light/Dark mode.  

---

## Future Enhancements
- Store logs in **localStorage / database** for persistence.  
- Auto-ping APIs at configurable intervals.  
- Email/Slack alerts for API failures.  
- Export logs as JSON/CSV.  

---

## 📜 License
This project is licensed under the **MIT License** – feel free to use and modify it.

---