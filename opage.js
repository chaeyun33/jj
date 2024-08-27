document.addEventListener('DOMContentLoaded', function () {
    let sections = document.querySelectorAll('.section');
    let currentSection = 0;
    let isScrolling = false;
    let isNormalScroll = false;

    // 처음 로드 시 첫 번째 섹션으로 스크롤 이동
    window.scrollTo(0, 0);
    document.body.style.overflowY = 'hidden';

    function scrollToSection(index, smoothScroll = true) {
        if (index >= 0 && index < sections.length) {
            isScrolling = true;
            if (smoothScroll) {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            } else {
                sections[index].scrollIntoView();
            }
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }

    function handleWheelEvent(e) {
        if (isScrolling) return;

        if (e.deltaY > 0) {
            // Scroll down
            if (currentSection < sections.length - 1) {
                currentSection++;
                let smoothScroll = currentSection < 2; // top3 (index 2) 이후로는 천천히 스크롤
                scrollToSection(currentSection, smoothScroll);
            } else if (!isNormalScroll) {
                // 일반 스크롤로 전환
                document.body.style.overflowY = 'auto';
                isNormalScroll = true;
            }
        } else {
            // Scroll up
            if (!isNormalScroll && currentSection > 0) {
                currentSection--;
                let smoothScroll = currentSection < 2; // top3 (index 2) 이후로는 천천히 스크롤
                scrollToSection(currentSection, smoothScroll);
            }
        }
    }

    document.addEventListener('wheel', handleWheelEvent);
});

const menu = document.getElementById('menu-items');
const dropdown = document.getElementById('dropdown-menu');
let timeout;  // 메뉴 사라짐을 지연시키기 위한 타이머

menu.addEventListener('mouseover', () => {
    clearTimeout(timeout);  // 타이머를 초기화하여 메뉴가 사라지지 않도록 함
    dropdown.style.maxHeight = '300px';  // 드롭다운 메뉴를 표시
    changeMenuTextColor(true);  // 드롭다운이 내려가면 텍스트 색상을 검정으로 변경
});

menu.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
        dropdown.style.maxHeight = '0';  // 마우스를 떼면 드롭다운 메뉴를 부드럽게 숨김
        changeMenuTextColor(false);  // 드롭다운이 올라가면 텍스트 색상을 원래대로 변경
    }, 200);  // 사라지기 전 200ms 지연
});

dropdown.addEventListener('mouseover', () => {
    clearTimeout(timeout);  // 드롭다운 메뉴에 마우스를 올리면 사라지지 않도록 함
    dropdown.style.maxHeight = '300px';
    changeMenuTextColor(true);  // 드롭다운이 내려가면 텍스트 색상을 검정으로 변경
});

dropdown.addEventListener('mouseleave', () => {
    timeout = setTimeout(() => {
        dropdown.style.maxHeight = '0';
        changeMenuTextColor(false);  // 드롭다운이 올라가면 텍스트 색상을 원래대로 변경
    }, 100);
});

function changeMenuTextColor(isActive) {
    const menuLinks = document.querySelectorAll('#menu-items li a');
    menuLinks.forEach(link => {
        if (isActive) {
            link.classList.add('active');  // 활성화되면 'active' 클래스 추가
        } else {
            link.classList.remove('active');  // 비활성화되면 'active' 클래스 제거
        }
    });
}
