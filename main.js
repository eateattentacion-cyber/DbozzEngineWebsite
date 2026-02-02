document.addEventListener('DOMContentLoaded', function () {

    // === Scroll-triggered fade-in ===
    var fadeElements = document.querySelectorAll('.fade-in');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });
    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    // === Nav background on scroll ===
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            nav.style.background = 'rgba(10, 10, 11, 0.8)';
        }
    });

    // === Hero parallax on mouse move ===
    var hero = document.querySelector('.hero');
    if (hero) {
        var heroH1 = hero.querySelector('h1');
        var heroBadge = hero.querySelector('.hero-badge');
        var heroP = hero.querySelector('p');
        var heroButtons = hero.querySelector('.hero-buttons');

        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;

            if (heroH1) heroH1.style.transform = 'translate(' + (x * 25) + 'px, ' + (y * 15) + 'px)';
            if (heroBadge) heroBadge.style.transform = 'translate(' + (x * 12) + 'px, ' + (y * 8) + 'px)';
            if (heroP) heroP.style.transform = 'translate(' + (x * 10) + 'px, ' + (y * 6) + 'px)';
            if (heroButtons) heroButtons.style.transform = 'translate(' + (x * 8) + 'px, ' + (y * 4) + 'px)';
        });

        hero.addEventListener('mouseleave', function () {
            [heroH1, heroBadge, heroP, heroButtons].forEach(function (el) {
                if (el) el.style.transform = '';
            });
        });
    }

    // === Cursor glow that follows mouse ===
    var glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);
    var glowX = 0, glowY = 0, targetX = 0, targetY = 0;
    document.addEventListener('mousemove', function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
    });
    function animateGlow() {
        glowX += (targetX - glowX) * 0.12;
        glowY += (targetY - glowY) * 0.12;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // === 3D tilt on feature cards with shine ===
    var cards = document.querySelectorAll('.feature-card');
    cards.forEach(function (card) {
        var shine = document.createElement('div');
        shine.classList.add('card-shine');
        card.appendChild(shine);
        card.style.position = 'relative';
        card.style.overflow = 'hidden';

        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = 'perspective(600px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) scale(1.02)';
            shine.style.background = 'radial-gradient(circle at ' + ((x + 0.5) * 100) + '% ' + ((y + 0.5) * 100) + '%, rgba(255,255,255,0.08), transparent 60%)';
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
            shine.style.background = 'none';
        });
    });

    // === Scroll progress bar ===
    var progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // === Typing effect on "Your Way." ===
    var gradientSpan = document.querySelector('.hero h1 .gradient');
    if (gradientSpan) {
        var text = gradientSpan.textContent;
        gradientSpan.textContent = '';
        gradientSpan.style.borderRight = '2px solid #2563eb';
        var charIndex = 0;
        setTimeout(function () {
            var typeInterval = setInterval(function () {
                gradientSpan.textContent += text.charAt(charIndex);
                charIndex++;
                if (charIndex >= text.length) {
                    clearInterval(typeInterval);
                    // Blink cursor then remove
                    var blinks = 0;
                    var blinkInterval = setInterval(function () {
                        gradientSpan.style.borderRight = blinks % 2 === 0 ? 'none' : '2px solid #2563eb';
                        blinks++;
                        if (blinks > 5) {
                            clearInterval(blinkInterval);
                            gradientSpan.style.borderRight = 'none';
                        }
                    }, 400);
                }
            }, 90);
        }, 600);
    }

    // === Particle field in hero background ===
    var canvas = document.createElement('canvas');
    canvas.classList.add('hero-particles');
    if (hero) hero.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;
    var mouseParticle = { x: 0, y: 0 };

    function resizeCanvas() {
        if (!hero) return;
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (hero) {
        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            mouseParticle.x = e.clientX - rect.left;
            mouseParticle.y = e.clientY - rect.top;
        });
    }

    for (var p = 0; p < particleCount; p++) {
        particles.push({
            x: Math.random() * (canvas.width || 1200),
            y: Math.random() * (canvas.height || 800),
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < particles.length; i++) {
            var pa = particles[i];
            pa.x += pa.vx;
            pa.y += pa.vy;

            if (pa.x < 0) pa.x = canvas.width;
            if (pa.x > canvas.width) pa.x = 0;
            if (pa.y < 0) pa.y = canvas.height;
            if (pa.y > canvas.height) pa.y = 0;

            ctx.beginPath();
            ctx.arc(pa.x, pa.y, pa.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(37, 99, 235, ' + pa.opacity + ')';
            ctx.fill();

            // Draw connections between nearby particles
            for (var j = i + 1; j < particles.length; j++) {
                var pb = particles[j];
                var dx = pa.x - pb.x;
                var dy = pa.y - pb.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(pa.x, pa.y);
                    ctx.lineTo(pb.x, pb.y);
                    ctx.strokeStyle = 'rgba(37, 99, 235, ' + (0.08 * (1 - dist / 120)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Mouse attraction
            var mdx = mouseParticle.x - pa.x;
            var mdy = mouseParticle.y - pa.y;
            var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 200 && mDist > 0) {
                pa.vx += (mdx / mDist) * 0.02;
                pa.vy += (mdy / mDist) * 0.02;
            }

            // Dampen velocity
            pa.vx *= 0.99;
            pa.vy *= 0.99;
        }

        requestAnimationFrame(drawParticles);
    }
    drawParticles();

    // === Magnetic buttons ===
    var buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
            var rect = btn.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
        });
        btn.addEventListener('mouseleave', function () {
            btn.style.transform = '';
        });
    });

    // === Section reveal with counter-slide ===
    var sectionLabels = document.querySelectorAll('.section-label');
    var labelObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('label-reveal');
            }
        });
    }, { threshold: 0.5 });
    sectionLabels.forEach(function (label) {
        labelObserver.observe(label);
    });

    // === Video cards hover lift ===
    var videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(function (vc) {
        vc.addEventListener('mouseenter', function () {
            vc.style.transform = 'translateY(-8px) scale(1.01)';
            vc.style.boxShadow = '0 20px 60px rgba(37, 99, 235, 0.1)';
        });
        vc.addEventListener('mouseleave', function () {
            vc.style.transform = '';
            vc.style.boxShadow = '';
        });
    });

    // === Smooth anchor scrolling ===
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // === Matrix-style code rain background ===
    var codeCanvas = document.createElement('canvas');
    codeCanvas.classList.add('code-rain');
    document.body.appendChild(codeCanvas);
    var codeCtx = codeCanvas.getContext('2d');

    function resizeCodeCanvas() {
        codeCanvas.width = window.innerWidth;
        codeCanvas.height = document.documentElement.scrollHeight;
    }
    resizeCodeCanvas();
    window.addEventListener('resize', resizeCodeCanvas);

    var codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]();:=<>+-*/&|!~#'.split('');
    var fontSize = 14;
    var columns = Math.floor(window.innerWidth / fontSize);
    var drops = [];
    for (var c = 0; c < columns; c++) {
        drops[c] = Math.random() * -100;
    }

    function drawCodeRain() {
        codeCtx.fillStyle = 'rgba(10, 10, 11, 0.08)';
        codeCtx.fillRect(0, 0, codeCanvas.width, codeCanvas.height);
        codeCtx.font = fontSize + 'px JetBrains Mono, monospace';

        for (var ci = 0; ci < drops.length; ci++) {
            var char = codeChars[Math.floor(Math.random() * codeChars.length)];
            var alpha = 0.03 + Math.random() * 0.04;
            codeCtx.fillStyle = 'rgba(37, 99, 235, ' + alpha + ')';
            codeCtx.fillText(char, ci * fontSize, drops[ci] * fontSize);

            if (drops[ci] * fontSize > codeCanvas.height && Math.random() > 0.98) {
                drops[ci] = 0;
            }
            drops[ci] += 0.5 + Math.random() * 0.5;
        }
        requestAnimationFrame(drawCodeRain);
    }
    drawCodeRain();

    // === Scrolling C++ code snippets behind sections ===
    var cppSnippets = [
        'class Entity {',
        '    EntityID id;',
        '    World* world;',
        'public:',
        '    template<typename T>',
        '    T& addComponent() {',
        '        return world->addComponent<T>(id);',
        '    }',
        '};',
        '',
        'void Renderer::drawMesh(const Mesh& mesh) {',
        '    glBindVertexArray(mesh.vao);',
        '    shader.setMat4("model", mesh.transform);',
        '    shader.setVec3("albedo", material.color);',
        '    shader.setFloat("metallic", material.metallic);',
        '    shader.setFloat("roughness", material.roughness);',
        '    glDrawElements(GL_TRIANGLES, mesh.indexCount, GL_UNSIGNED_INT, 0);',
        '}',
        '',
        'void PhysicsWorld::step(float dt) {',
        '    for (auto& body : m_bodies) {',
        '        body.velocity += gravity * dt;',
        '        body.position += body.velocity * dt;',
        '        resolveCollisions(body);',
        '    }',
        '}',
        '',
        'void AnimationSystem::update(float dt) {',
        '    for (auto& [id, anim] : m_animations) {',
        '        anim.time += dt;',
        '        float t = anim.time / anim.duration;',
        '        Quat rotation = slerp(anim.from, anim.to, t);',
        '        skeleton.setBoneRotation(anim.boneId, rotation);',
        '    }',
        '}',
        '',
        'Scene* SceneManager::loadScene(const std::string& path) {',
        '    std::ifstream file(path);',
        '    json data = json::parse(file);',
        '    Scene* scene = new Scene();',
        '    for (auto& entity : data["entities"]) {',
        '        EntityID id = scene->createEntity(entity["name"]);',
        '        deserializeComponents(id, entity["components"]);',
        '    }',
        '    return scene;',
        '}',
        '',
        'void ScriptEngine::execute(const std::string& code) {',
        '    MonoDomain* domain = mono_jit_init("DabozzEngine");',
        '    MonoAssembly* assembly = mono_domain_assembly_open(domain, code.c_str());',
        '    MonoImage* image = mono_assembly_get_image(assembly);',
        '    mono_runtime_invoke(method, obj, args, &exc);',
        '}',
        '',
        'int main(int argc, char** argv) {',
        '    DabozzEngine engine;',
        '    engine.init(1920, 1080, "DabozzEngine");',
        '    while (engine.isRunning()) {',
        '        engine.update();',
        '        engine.render();',
        '    }',
        '    return 0;',
        '}'
    ];

    var featureSection = document.getElementById('features');
    if (featureSection) {
        var codeScroll = document.createElement('div');
        codeScroll.classList.add('code-scroll-bg');

        var codeContent = document.createElement('div');
        codeContent.classList.add('code-scroll-content');

        // Duplicate snippets to fill space
        var allLines = [];
        for (var rep = 0; rep < 4; rep++) {
            allLines = allLines.concat(cppSnippets);
        }

        allLines.forEach(function (line) {
            var lineEl = document.createElement('div');
            lineEl.classList.add('code-scroll-line');
            // Syntax highlight
            line = line
                .replace(/\b(class|public|template|typename|void|float|int|auto|const|for|while|return|new|if)\b/g, '<span class="kw">$1</span>')
                .replace(/(".*?")/g, '<span class="str">$1</span>')
                .replace(/(\/\/.*)/g, '<span class="cmt">$1</span>')
                .replace(/\b(Entity|World|Renderer|Mesh|Shader|PhysicsWorld|AnimationSystem|Scene|SceneManager|ScriptEngine|DabozzEngine|EntityID|Quat|MonoDomain|MonoAssembly|MonoImage|std::string|std::ifstream|json)\b/g, '<span class="typ">$1</span>');
            lineEl.innerHTML = line || '&nbsp;';
            codeContent.appendChild(lineEl);
        });

        codeScroll.appendChild(codeContent);
        featureSection.style.position = 'relative';
        featureSection.insertBefore(codeScroll, featureSection.firstChild);

        // Scroll the code
        var scrollPos = 0;
        function animateCodeScroll() {
            scrollPos += 0.3;
            if (scrollPos > codeContent.scrollHeight / 2) scrollPos = 0;
            codeContent.style.transform = 'translateY(-' + scrollPos + 'px)';
            requestAnimationFrame(animateCodeScroll);
        }
        animateCodeScroll();
    }

    // === Easter egg: Konami code ===
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var konamiIndex = 0;
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.transition = 'filter 0.5s';
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(function () { document.body.style.filter = ''; }, 3000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

});
