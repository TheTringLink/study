document.addEventListener('DOMContentLoaded', () => {
    const notification = document.getElementById('notification');

    const showToast = (zh, en) => {
        notification.querySelector('p').textContent = zh;
        notification.querySelector('.en-sub').textContent = en;
        notification.classList.add('show');
        setTimeout(() => notification.classList.remove('show'), 2500);
    };

    // 背景切換
    document.getElementById('toggleBg').addEventListener('click', function() {
        const isActive = document.body.classList.toggle('bg-active');
        this.textContent = isActive ? "隱藏背景" : "顯示背景";
    });

    // 複製監聽
    document.addEventListener('copy', () => {
        showToast("本網站僅提供資訊展示，不對文本內容的完整性、準確性及後續使用後果負責，請自行核對與使用", "This website displays information only and is not responsible for content accuracy or usage.");
    });

    // 下載彈窗
    document.querySelectorAll('.download-trigger').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            showToast("本網站僅提供資訊展示，不對文件內容的完整性、準確性及後續使用後果負責，請自行核對與使用", "This website provides information only and assumes no responsibility for accuracy or use.");
        });
    });

    // 左側導航滾動邏輯
    const sections = document.querySelectorAll('main section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(s => {
            if (pageYOffset >= (s.offsetTop - 150)) current = s.getAttribute('id');
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === current) item.classList.add('active');
        });
    });

    // 隱藏答案切換
    document.querySelectorAll('.toggle-answer').forEach(btn => {
        btn.addEventListener('click', function() {
            const box = this.parentElement.nextElementSibling;
            const isNone = box.style.display === "none";
            box.style.display = isNone ? "block" : "none";
            this.textContent = isNone ? "隱藏答案" : "顯示答案";
        });
    });
});

function switchContent(id) {
    // 預留內容切換接口
    console.log("Switching to: " + id);
}

