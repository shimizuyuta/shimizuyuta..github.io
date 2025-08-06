// アニメーションとインタラクション
document.addEventListener('DOMContentLoaded', function() {
    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象要素
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .section-title, .pricing-card, .staff-card, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ギャラリーホバーエフェクト
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // 料金表タブ機能
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // すべてのタブボタンとコンテンツから active クラスを削除
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // クリックされたタブボタンとそのコンテンツに active クラスを追加
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // FAQ アコーディオン機能
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // すべてのFAQアイテムから active クラスを削除
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // クリックされたアイテムに active クラスを追加（閉じる場合は除く）
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // 波のアニメーション
    const wave = document.querySelector('.wave');
    if (wave) {
        wave.style.animation = 'wave 3s ease-in-out infinite';
    }

    // スムーススクロール
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// CSS keyframes をJavaScriptで追加
const style = document.createElement('style');
style.textContent = `
    @keyframes wave {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-25px); }
    }
`;
document.head.appendChild(style);