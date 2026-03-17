// 等待DOM加载完成后执行
        document.addEventListener('DOMContentLoaded', function() {
            // ========== 0. 下载区域折叠/展开功能 ==========
            const downloadTitle = document.getElementById('downloadTitle');
            const downloadContent = document.getElementById('downloadContent');
            const downloadIcon = downloadTitle.querySelector('.toggle-icon ');

            downloadTitle.addEventListener('click', function() {
                // 切换下载内容显示/隐藏(条件判断)
                if (downloadContent.style.display === 'none') {
                    downloadContent.style.display = 'block';
                    downloadIcon.classList.add('rotated');
                } else {
                    downloadContent.style.display = 'none';
                    downloadIcon.classList.remove('rotated');
                }
            });

            // ========== 1. 初始化Bootstrap标签页切换 ==========
            const tabTriggerList = Array.from(document.querySelectorAll('#quizTabs button'));
            tabTriggerList.forEach(function(tabTriggerEl) {
                const tab = new bootstrap.Tab(tabTriggerEl);
                tabTriggerEl.addEventListener('click', function(event) {
                    event.preventDefault();
                    tab.show();
                });
            });

            // ========== 2. 测验1：题目折叠/展开功能 ==========
            document.querySelectorAll('.q1-title').forEach(title => {
                title.addEventListener('click', function() {
                    // 获取目标内容ID
                    const targetId = this.getAttribute('data-target');
                    const content = document.getElementById(targetId);
                    const icon = this.querySelector('.toggle-icon');
                    
                    // 切换显示/隐藏(条件判断)
                    if (content.style.display === 'none') {
                        content.style.display = 'block';
                        icon.classList.add('rotated');
                    } else {
                        content.style.display = 'none';
                        icon.classList.remove('rotated');
                    }
                });
            });

            // ========== 3. 测验2：版本切换功能（简化版/原版） ==========
            document.querySelectorAll('.version-switch-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation(); // 阻止事件冒泡
                    
                    const qId = this.getAttribute('data-target');
                    const contentContainer = document.getElementById(`${qId}-content`);
                    const simpleContent = contentContainer.querySelector('.simple-content');
                    const originalContent = contentContainer.querySelector('.original-content');

                    // 切换版本显示(条件判断)
                    if (simpleContent.style.display !== 'none') {
                        simpleContent.style.display = 'none';
                        originalContent.style.display = 'block';
                        this.textContent = '切换简化版';
                    } else {
                        simpleContent.style.display = 'block';
                        originalContent.style.display = 'none';
                        this.textContent = '切换原版';
                    }
                });
            });

            // ========== 4. 测验2：题目折叠/展开功能 ==========
            document.querySelectorAll('.q2-title .toggle-icon').forEach(icon => {
                icon.addEventListener('click', function(e) {
                    e.stopPropagation(); // 阻止事件冒泡
                    
                    const targetId = this.getAttribute('data-target');
                    const content = document.getElementById(targetId);
                    
                    // 切换显示/隐藏(条件判断)
                    if (content.style.display === 'none') {
                        content.style.display = 'block';
                        this.classList.add('rotated');
                    } else {
                        content.style.display = 'none';
                        this.classList.remove('rotated');
                    }
                });
            });
        
            // 获取元素
            const toggleBtn = document.querySelector('.bg-toggle-btn');
            const whiteOverlay = document.querySelector('.white-bg-overlay');
            let isWhiteBg = false; // 标记当前是否是白色背景

                // 绑定点击事件
                toggleBtn.addEventListener('click', function() {
                if (isWhiteBg) {
                // 切换回图片背景：隐藏白色覆盖层
                whiteOverlay.style.display = 'none';
                isWhiteBg = false;
                } else {
                // 切换为白色背景：显示白色覆盖层
                whiteOverlay.style.display = 'block';
                isWhiteBg = true;
                }
            });
        });