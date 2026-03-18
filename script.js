document.addEventListener('DOMContentLoaded', function() {
    
    // 儲存目前選擇的值
    let selections = {
        subject: 'all',
        content: 'all'
    };

    // 初始化自訂下拉選單
    function setupCustomDropdown(dropdownId, selectionKey) {
        const dropdown = document.getElementById(dropdownId);
        const selectedDisplay = dropdown.querySelector('.select-selected');
        const itemsContainer = dropdown.querySelector('.select-items');
        const items = dropdown.querySelectorAll('.select-items div');

        // 點擊框框展開/收合選單
        selectedDisplay.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            closeAllSelect(selectedDisplay); // 關閉其他展開的選單
            itemsContainer.classList.toggle('select-hide');
        });

        // 點擊選項
        items.forEach(item => {
            item.addEventListener('click', function(e) {
                // 更新顯示的文字
                selectedDisplay.innerHTML = this.innerHTML;
                // 更新儲存的值
                selections[selectionKey] = this.getAttribute('data-value');
                // 隱藏選單
                itemsContainer.classList.add('select-hide');
            });
        });
    }

    // 點擊畫面其他地方時，關閉所有選單
    function closeAllSelect(exceptThis) {
        const allSelected = document.querySelectorAll('.select-selected');
        const allItems = document.querySelectorAll('.select-items');
        
        for (let i = 0; i < allSelected.length; i++) {
            if (exceptThis !== allSelected[i]) {
                allItems[i].classList.add('select-hide');
            }
        }
    }

    // --- 原有的下拉選單與跳轉邏輯 (保留) ---

    // --- 背景影片控制邏輯 ---
    const video = document.getElementById('bgVideo'); // 確保這裡對應 HTML 的 ID
    const toggleBtn = document.getElementById('video-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    const body = document.body;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            // 1. 處理影片暫停/播放 (如果存在影片)
            if (video) {
                if (video.paused) {
                    video.play();
                    toggleIcon.innerText = '∷';
                } else {
                    video.pause();
                    toggleIcon.innerText = '◇';
                }
            }

            // 2. 處理 CSS 背景動畫暫停 (透過切換 class)
            // 這會觸發我們在 CSS 寫的 animation-play-state: paused
            body.classList.toggle('stop-anim');
            
            console.log("動畫狀態已切換");
        });
    }

    // 點擊網頁任意處關閉選單
    document.addEventListener('click', closeAllSelect);

    // 執行初始化
    setupCustomDropdown('subject-dropdown', 'subject');
    setupCustomDropdown('content-dropdown', 'content');


    // --- 底部按鈕跳轉邏輯 (根據選項內容導向不同頁面) ---
    const startBtn = document.getElementById('start-btn');

    startBtn.addEventListener('click', function() {
    const sub = selections.subject;   // 取得科目代碼 (e.g., 'chinese', 'math')
    const cont = selections.content; // 取得內容代碼 (e.g., 'ch1', 'exam')

    // 定義跳轉目標變數
    let targetUrl = '';

    /*// 方法 A：使用條件判斷 (適合邏輯較簡單時)
    if (sub === 'history' && cont === 'Q&A') {
        targetUrl = './study/index.html';
    } else {
        // 預設跳轉頁面 (當找不到對應條件時)
        targetUrl = './black_page/no_page.html';
    }

    // 方法 A：使用條件判斷 (適合邏輯較簡單時)
    if (sub === 'math' && cont === 'more') {
        targetUrl = '1';
    } else {
        // 預設跳轉頁面 (當找不到對應條件時)
        targetUrl = './black_page/no_page.html';
    } */

    /* 方法 B：使用對照表 (適合選項非常多時，比較好維護)*/
    const routeMap = {
        'history_Q&A': './study/history.html',
        'chinese_ch2': 'page2.html',
    };
    const key = `${sub}_${cont}`;
    targetUrl = routeMap[key] || './black_page/no_page.html'; 
    

    console.log(`準備跳轉到: ${targetUrl} (科目: ${sub}, 內容: ${cont})`);
    
    // 執行跳轉
    if (targetUrl) {
        window.location.href = targetUrl;
    } else {
        alert("請選擇正確的科目與內容");
    }
    });
});
