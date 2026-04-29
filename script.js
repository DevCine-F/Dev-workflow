document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('h1[id], h2[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    const tocLinks = document.querySelectorAll('.toc-links a');

    // Smooth scrolling for sidebar and toc links
    const handleLinkClick = (e) => {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        }
    };

    sidebarLinks.forEach(link => link.addEventListener('click', handleLinkClick));
    tocLinks.forEach(link => link.addEventListener('click', handleLinkClick));

    // Update active state on scroll
    const updateActiveState = () => {
        let currentId = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                currentId = section.getAttribute('id');
            }
        });

        if (currentId) {
            const activeHref = `#${currentId}`;
            
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === activeHref) {
                    link.classList.add('active');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === activeHref) {
                    link.classList.add('active');
                }
            });
        }
    };

    window.addEventListener('scroll', updateActiveState);
    
    // Initial check
    updateActiveState();
});
