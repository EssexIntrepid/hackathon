// script.js - Main JavaScript for LearnJavaScript platform

// Theme Toggle 
const themeToggle = document.getElementById('themeToggle');

function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    setTheme(!isDark);
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Check saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    setTheme(true);
} else if (savedTheme === 'light') {
    setTheme(false);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme(true);
}

// Mobile Sidebar Toggle 
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.querySelector('.sidebar');

if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking on a link (mobile)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });
}

// Code Runner Functionality 
function runCode(editorId, outputId) {
    const editor = document.getElementById(editorId);
    const output = document.getElementById(outputId);
    
    if (!editor || !output) return;
    
    const code = editor.value;
    
    // Capture console.log output
    let consoleOutput = [];
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        consoleOutput.push(args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
            }
            return String(arg);
        }).join(' '));
        originalConsoleLog.apply(console, args);
    };
    
    try {
        // Clear previous output
        consoleOutput = [];
        output.innerHTML = '';
        
        // Execute the code
        const result = eval(code);
        
        // Display console output
        if (consoleOutput.length > 0) {
            output.innerHTML = consoleOutput.join('\\n');
        }
        
        if (result !== undefined && consoleOutput.length === 0) {
            output.innerHTML = String(result);
        }
        
        if (output.innerHTML === '') {
            output.innerHTML = '✓ Code executed successfully (no output)';
        }
    } catch (error) {
        output.innerHTML = 'Error: ' + error.message;
    } finally {
        console.log = originalConsoleLog;
    }
}

// Set Active Navigation Link 
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
});

// Smooth Scroll for Anchor Links 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});