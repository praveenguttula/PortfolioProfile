/* ===================== DOCUMENT READY ===================== */
$(document).ready(function () {

    /* MENU TOGGLE */
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    /* SCROLL + LOAD EVENTS */
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll top button
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`a[href="#${id}"]`).addClass('active');
            }
        });
    });

    /* SMOOTH SCROLL */
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500);
    });

    /* EMAILJS CONTACT FORM */
    $("#contact-form").submit(function (event) {
        event.preventDefault();

        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm(
            'contact_service',
            'template_contact',
            '#contact-form'
        ).then(
            function () {
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            },
            function () {
                alert("Form Submission Failed! Try Again");
            }
        );
    });

});

/* ===================== TAWK.TO LIVE CHAT ===================== */
if (window.Tawk_API) {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/69748c671e0083197b2562be/1jfnk8tbo";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
    })();
}
/* ===================== END TAWK ===================== */


/* ===================== TAB VISIBILITY ===================== */
document.addEventListener("visibilitychange", function () {
    document.title = "Portfolio | Praveen Guttula";
    $("#favicon").attr("href", "assets/images/favicon.jpg");
});


/* ===================== TYPED JS ===================== */
var typed = new Typed(".typing-text", {
    strings: [
        "frontend development",
        "backend development",
        "web designing",
        "Full Stack Web Development"
    ],
    loop: true,
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 500,
});


/* ===================== FETCH DATA ===================== */
async function fetchData(type = "skills") {
    const response = type === "skills"
        ? await fetch("skills.json")
        : await fetch("./projects/projects.json");
    return response.json();
}


/* ===================== SHOW SKILLS ===================== */
function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    skillsContainer.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>
    `).join("");
}


/* ===================== SHOW PROJECTS ===================== */
function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");

    projectsContainer.innerHTML = projects
        .slice(0, 10)
        .filter(p => p.category !== "android")
        .map(project => `
            <div class="box tilt">
                <img draggable="false"
                     src="/assets/images/projects/${project.image}.png"
                     alt="project" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View
                            </a>
                            <a href="${project.links.code}" class="btn" target="_blank">
                                Code <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");

    VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

    ScrollReveal().reveal('.work .box', { interval: 200 });
}


/* ===================== LOAD DATA ===================== */
fetchData().then(showSkills);
fetchData("projects").then(showProjects);


/* ===================== DISABLE DEV TOOLS ===================== */
document.onkeydown = function (e) {
    if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) ||
        (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
    ) {
        return false;
    }
};


/* ===================== SCROLL REVEAL ===================== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.skills .container .bar', { interval: 200 });
srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.experience .timeline .container', { interval: 400 });
srtop.reveal('.contact .container .form-group', { interval: 200 });
