# YouTube to Obsidian Grabber

A lightweight Chrome/Edge extension that extracts YouTube video metadata (Title, Channel, URL, Thumbnail) via right-click without opening the video. It automatically formats the data as YAML frontmatter and copies it to your clipboard, ready to be pasted into Obsidian or any other Markdown-based PKM system.

## ✨ Features

- **No Video Opening Required**: Extract data directly from the YouTube homepage, search results, or suggested videos sidebar.
- **Bulletproof Extraction**: Bypasses YouTube's dynamic Shadow DOM by fetching the video's raw HTML in the background and parsing static meta tags. This ensures 100% reliability regardless of UI updates.
- **YAML Ready**: Formats the extracted data into clean YAML frontmatter.
- **One-Click Copy**: Automatically copies the formatted data to your clipboard and alerts you upon success.

## 📥 Installation

Since this is a local extension, you need to load it in Developer Mode:

1. Clone this repository or download the ZIP file and extract it to a folder.
2. Open your Chromium-based browser (Chrome, Edge, Brave, etc.).
3. Navigate to the extensions page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
4. Toggle **"Developer mode"** in the top right corner.
5. Click the **"Load unpacked"** button.
6. Select the folder containing the extension files (`manifest.json` and `background.js`).

## 🚀 Usage

1. Go to [YouTube](https://www.youtube.com).
2. Right-click on any video link or video thumbnail.
3. Select **"نسخ بيانات الفيديو لـ Obsidian"** (Copy Video Info for Obsidian) from the context menu.
4. A browser alert will confirm successful extraction.
5. Paste the clipboard contents directly into your Obsidian note.

## 📋 Output Format

The extension copies the data to your clipboard in the following YAML format:

```yaml
---
title: "Video Title Here"
channel: "Channel Name"
url: [https://www.youtube.com/watch?v=XXXXXXX](https://www.youtube.com/watch?v=XXXXXXX)
thumbnail: "[https://img.youtube.com/vi/XXXXXXX/maxresdefault.jpg](https://img.youtube.com/vi/XXXXXXX/maxresdefault.jpg)"
---

📂 File Structure
manifest.json: Defines the extension's permissions (clipboard, background scripting, context menus) and targets.

background.js: The core logic that handles the context menu click, fetches the video URL in the background, parses the HTML for meta tags, formats the YAML, and injects the copy command into the active tab.

🛠️ Customization
If you want to change the context menu text to English, open background.js and edit line 4:

JavaScript
title: "Copy Video Info for Obsidian", // Change this line
📄 License
MIT License. Feel free to modify and improve the extension for your own workflow.