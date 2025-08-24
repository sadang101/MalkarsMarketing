document.addEventListener('DOMContentLoaded', function() {
    // Sample course data - in a real app, this would come from an API
    const courses = [
        {
            id: 1,
            title: 'Digital Marketing Fundamentals',
            category: 'marketing',
            level: 'beginner',
            instructor: 'John Doe',
            instructorImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            rating: 4.7,
            students: 1245,
            price: 999,
            duration: '6 weeks',
            description: 'Learn the basics of digital marketing including SEO, social media, and email marketing.'
        },
        {
            id: 2,
            title: 'Advanced Sales Techniques',
            category: 'sales',
            level: 'intermediate',
            instructor: 'Jane Smith',
            instructorImage: 'https://randomuser.me/api/portraits/women/2.jpg',
            image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            rating: 4.8,
            students: 987,
            price: 1499,
            duration: '8 weeks',
            description: 'Master advanced sales strategies and techniques to boost your performance.'
        },
        {
            id: 3,
            title: 'Business Development Masterclass',
            category: 'business',
            level: 'advanced',
            instructor: 'Robert Johnson',
            instructorImage: 'https://randomuser.me/api/portraits/men/3.jpg',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            rating: 4.9,
            students: 754,
            price: 1999,
            duration: '10 weeks',
            description: 'Learn how to grow your business and develop effective strategies.'
        },
        // Add more sample courses as needed
    ];

    // DOM Elements
    const coursesGrid = document.getElementById('coursesGrid');
    const searchInput = document.getElementById('searchInput');
    const loadMoreBtn = document.getElementById('loadMore');
    const becomeCreatorBtn = document.getElementById('becomeCreatorBtn');
    const creatorModal = document.getElementById('creatorModal');
    const closeModal = document.querySelector('.close-modal');
    const creatorForm = document.getElementById('creatorForm');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');

    // State
    let visibleCourses = 6;
    let filteredCourses = [...courses];
    let activeFilters = {
        category: [],
        level: []
    };

    // Initialize the page
    function init() {
        renderCourses();
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Search functionality
        searchInput.addEventListener('input', handleSearch);

        // Load more courses
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', loadMoreCourses);
        }

        // Become a Creator modal
        if (becomeCreatorBtn) {
            becomeCreatorBtn.addEventListener('click', () => {
                creatorModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                creatorModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === creatorModal) {
                creatorModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Form submission
        if (creatorForm) {
            creatorForm.addEventListener('submit', handleCreatorSubmit);
        }

        // Apply filters
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', applyFilters);
        }

        // Reset filters
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', resetFilters);
        }
    }

    // Handle search
    function handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.instructor.toLowerCase().includes(searchTerm)
        );
        
        visibleCourses = 6; // Reset visible courses counter
        renderCourses();
    }

    // Apply selected filters
    function applyFilters() {
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);
        const selectedLevels = Array.from(document.querySelectorAll('input[name="level"]:checked')).map(cb => cb.value);
        
        activeFilters = {
            category: selectedCategories,
            level: selectedLevels
        };
        
        filterCourses();
    }

    // Reset all filters
    function resetFilters() {
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Reset search
        searchInput.value = '';
        
        // Reset active filters
        activeFilters = {
            category: [],
            level: []
        };
        
        // Reset and show all courses
        filteredCourses = [...courses];
        visibleCourses = 6;
        renderCourses();
    }

    // Filter courses based on active filters
    function filterCourses() {
        filteredCourses = courses.filter(course => {
            // Filter by category
            if (activeFilters.category.length > 0 && !activeFilters.category.includes(course.category)) {
                return false;
            }
            
            // Filter by level
            if (activeFilters.level.length > 0 && !activeFilters.level.includes(course.level)) {
                return false;
            }
            
            return true;
        });
        
        visibleCourses = 6; // Reset visible courses counter
        renderCourses();
    }

    // Load more courses
    function loadMoreCourses() {
        visibleCourses += 6;
        renderCourses();
        
        // Hide load more button if all courses are visible
        if (visibleCourses >= filteredCourses.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    // Handle creator form submission
    function handleCreatorSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            expertise: document.getElementById('expertise').value,
            experience: document.getElementById('experience').value
        };
        
        // In a real app, you would send this data to your backend
        console.log('Creator application submitted:', formData);
        
        // Show success message
        alert('Thank you for your application! We will review your information and get back to you soon.');
        
        // Reset form and close modal
        creatorForm.reset();
        creatorModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Render courses to the DOM
    function renderCourses() {
        const coursesToShow = filteredCourses.slice(0, visibleCourses);
        
        if (coursesToShow.length === 0) {
            coursesGrid.innerHTML = '<div class="no-results">No courses found matching your criteria. Try adjusting your filters.</div>';
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        coursesGrid.innerHTML = coursesToShow.map(course => `
            <div class="course-card">
                <img src="${course.image}" alt="${course.title}" class="course-image">
                <div class="course-content">
                    <span class="course-category">${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</span>
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-instructor">
                        <img src="${course.instructorImage}" alt="${course.instructor}">
                        <span>${course.instructor}</span>
                    </div>
                    <div class="course-meta">
                        <div class="course-rating">
                            <i class="fas fa-star"></i>
                            <span>${course.rating}</span>
                            <span>(${course.students})</span>
                        </div>
                        <div class="course-price">₹${course.price}</div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Show/hide load more button
        if (loadMoreBtn) {
            loadMoreBtn.style.display = visibleCourses >= filteredCourses.length ? 'none' : 'inline-block';
        }
    }

    // Initialize the page
    init();
});
