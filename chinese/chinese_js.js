document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 背景切換 ---
    const toggleBtn = document.querySelector('.bg-toggle-btn');
    const overlay = document.querySelector('.white-bg-overlay');
    let isWhite = false;
    toggleBtn.addEventListener('click', () => {
        isWhite = !isWhite;
        overlay.style.display = isWhite ? 'none' : 'block';
    });

    // --- 2. 主頁 Logo 跳轉 ---
    const homeLogo = document.getElementById('homeLogo');
    homeLogo.addEventListener('click', () => {
        window.location.href = 'https://www.thetring.link'; // 此處更換為你的主頁連結
    });

    // --- 3. 介面面板切換 (Quiz 2/3) ---
    const navPills = document.querySelectorAll('.nav-pill');
    const panels = document.querySelectorAll('.content-panel');
    const pageTitle = document.getElementById('pageTitle');

    navPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // 1. 切換按鈕狀態
            navPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            // 2. 切換標題
            pageTitle.innerText = this.getAttribute('data-title');

            // 3. 切換面板
            const target = this.getAttribute('data-target');
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${target}-panel`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // --- 4. 下載中心摺疊 (預設已摺疊) ---
    const downloadTrigger = document.querySelector('.dropdown-trigger');
    const downloadContent = document.getElementById('downloadContent');
    downloadTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadContent.classList.toggle('show');
    });

    // --- 5. 題目摺疊與切換版本 ---
    document.addEventListener('click', (e) => {
        // 題目摺疊
        const header = e.target.closest('.q-header');
        if (header && !e.target.classList.contains('btn-switch')) {
            const id = header.getAttribute('data-collapse');
            const content = document.getElementById(`${id}-content`);
            const icon = header.querySelector('.toggle-icon');
            content.classList.toggle('show');
            icon.classList.toggle('rotated');
        }

        // 版本切換
        if (e.target.classList.contains('btn-switch')) {
            const id = e.target.getAttribute('data-switch');
            const container = document.getElementById(`${id}-content`);
            const simple = container.querySelector('.simple-content');
            const original = container.querySelector('.original-content');
            
            if (simple.style.display !== 'none') {
                simple.style.display = 'none';
                original.style.display = 'block';
                e.target.textContent = '切換簡化版';
            } else {
                simple.style.display = 'block';
                original.style.display = 'none';
                e.target.textContent = '切換原版';
            }
        }

        // 點擊外部關閉下載選單
        if (!e.target.closest('#downloadDropdown')) {
            downloadContent.classList.remove('show');
        }
    });
});
