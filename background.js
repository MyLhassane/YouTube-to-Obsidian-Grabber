chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "grabVideoInfo",
    title: "نسخ بيانات الفيديو لـ Obsidian",
    contexts: ["link"],
    // ضمان ظهور الخيار فقط عند النقر على روابط فيديوهات حقيقية
    targetUrlPatterns: ["*://*.youtube.com/watch*"] 
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "grabVideoInfo") {
    const videoUrl = info.linkUrl;
    
    try {
      // 1. جلب الكود المصدري لصفحة الفيديو في الخلفية
      const response = await fetch(videoUrl);
      const html = await response.text();
      
      // 2. استخراج العنوان من وسوم الميتا الثابتة
      const titleMatch = html.match(/<meta name="title" content="([^"]*)"/i) || 
                         html.match(/<meta property="og:title" content="([^"]*)"/i);
      const videoTitle = titleMatch ? titleMatch[1] : "Unknown Title";
      
      // 3. استخراج اسم القناة
      const channelMatch = html.match(/<link itemprop="name" content="([^"]*)"/i);
      const channelName = channelMatch ? channelMatch[1] : "Unknown Channel";
      
      // 4. بناء رابط الصورة المصغرة
      const videoId = new URL(videoUrl).searchParams.get('v');
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      
      // 5. تنسيق البيانات كـ YAML
      const formattedData = `---
title: "${videoTitle.replace(/"/g, '\\"')}"
channel: "${channelName.replace(/"/g, '\\"')}"
url: ${videoUrl}
thumbnail: "${thumbnail}"
---`;

      // 6. حقن دالة النسخ في الصفحة الحالية
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: copyToClipboard,
        args: [formattedData, videoTitle]
      });
      
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  }
});

// دالة النسخ التي تعمل داخل المتصفح لإظهار التنبيه
function copyToClipboard(text, title) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  alert("✅ تم جلب البيانات بنجاح!\n\n" + title);
}