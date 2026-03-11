/**
 * Monpyra Theme Core Logic - Pygments Version
 */

function monpyraApp() {
    return {
        isDark: document.documentElement.classList.contains("dark"),
        mobileSidebarOpen: false,
        desktopSidebarOpen: true,
        modalOpen: false,

        toggleTheme() {
            this.isDark = !this.isDark;
            if (this.isDark) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("color-theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("color-theme", "light");
            }
        },

        init() {
            document.body.addEventListener("htmx:afterOnLoad", params => {
                this.mobileSidebarOpen = false;
                initCodeBlocks();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });

            this.$watch("mobileSidebarOpen", value => {
                if (value) document.body.classList.add("overflow-hidden");
                else document.body.classList.remove("overflow-hidden");
            });
        }
    };
}

function initCodeBlocks() {
    // Cari elemen .codehilite yang dihasilkan oleh Python-Markdown (Pygments)
    document.querySelectorAll(".codehilite").forEach(block => {
        // Mencegah double header saat navigasi HTMX
        if (block.querySelector(".code-header")) return;

        // Deteksi bahasa dari class yang diberikan Pygments
        let langName = "MonPyra";
        block.classList.forEach(cls => {
            if (cls !== "codehilite" && cls !== "not-prose") {
                langName = cls.startsWith("language-")
                    ? cls.replace("language-", "").toUpperCase()
                    : cls.toUpperCase();
            }
        });

        // Tambahkan styling kontainer
        block.classList.add("code-container", "not-prose");

        // Buat Header Custom
        const header = document.createElement("div");
        header.className = "code-header";
        header.innerHTML = `
            <div class="header-left">
                <div class="window-controls">
                    <span class="dot dot-red"></span>
                    <span class="dot dot-yellow"></span>
                    <span class="dot dot-green"></span>
                </div>
                <span class="code-lang">${langName}</span>
            </div>
            <button class="copy-btn">
                <i class='bx bx-copy'></i> <span>Copy</span>
            </button>
        `;

        // Masukkan header sebelum konten kode
        block.insertBefore(header, block.firstChild);

        // Logic Copy Button
        const btn = header.querySelector(".copy-btn");
        const span = btn.querySelector("span");
        const pre = block.querySelector("pre");

        btn.addEventListener("click", () => {
            navigator.clipboard.writeText(pre.innerText).then(() => {
                span.innerText = "Copied!";
                btn.classList.add("text-green-500");
                setTimeout(() => {
                    span.innerText = "Copy";
                    btn.classList.remove("text-green-500");
                }, 2000);
            });
        });
    });
}

// Initial Dark Mode Check
if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

// DOM Loaded Initialization
document.addEventListener("DOMContentLoaded", () => {
    initCodeBlocks();
});

// HTMX Lifecycle Hook
document.body.addEventListener("htmx:afterSettle", function (evt) {
    initCodeBlocks();
    if (window.Alpine) {
        window.Alpine.discover();
    }
});

// Sync History Active State
window.addEventListener("popstate", () => {
    if (window.Alpine) {
        const navElements = document.querySelectorAll("[x-data]");
        navElements.forEach(el => {
            if (el.__x && el.__x.getUnwatchedData) {
                const data = el.__x.getUnwatchedData();
                if (data.isActive) {
                    el.dispatchEvent(
                        new CustomEvent("url-change", {
                            detail: { url: window.location.pathname }
                        })
                    );
                }
            }
        });
    }
});
