$(function () {
    var $container = $('#container');
    var $bird = $('#bird');
    var $upper = $('#pole_1');
    var $lower = $('#pole_2');
    var $score = $('#score');
    var $level = $('#level');
    var $best = $('#best_score');
    var $overlay = $('#game_overlay');
    var $overlayIcon = $('#overlay_icon');
    var $overlayTitle = $('#overlay_title');
    var $overlayMessage = $('#overlay_message');
    var $overlayResult = $('#overlay_result');
    var $playButton = $('#play_btn');
    var $pauseButton = $('#pause_btn');
    var $soundButton = $('#sound_btn');
    var $helpButton = $('#help_btn');
    var $helpPanel = $('#help_panel');
    var $progressFill = $('#progress_fill');
    var $progressLabel = $('#progress_label');
    var $progressCount = $('#progress_count');
    var $levelToast = $('#level_toast');
    var $screenReader = $('#screen_reader_status');

    var width = $container.innerWidth();
    var height = $container.innerHeight();
    var birdWidth = $bird.outerWidth();
    var birdHeight = $bird.outerHeight();
    var birdLeft = Math.round(width * 0.15);
    var pipeWidth = $upper.outerWidth();

    // Moi cap ong duoc tinh diem rieng, sinh cach nhau de khong co khoang trong qua dai.
    $upper.addClass('pole-upper');
    $lower.addClass('pole-lower');
    var $upperNext = $upper.clone().removeAttr('id').attr('aria-hidden', 'true');
    var $lowerNext = $lower.clone().removeAttr('id').attr('aria-hidden', 'true');
    $container.append($upperNext, $lowerNext);
    var pipeSpacing = 255; // Khoang cach ngang giua hai cap ong (pixel).
    var pipes = [
        {upper: $upper, lower: $lower, right: -76, top: 120, bottom: 160, counted: false},
        {upper: $upperNext, lower: $lowerNext, right: -76 - pipeSpacing, top: 120, bottom: 160, counted: false}
    ];

    // Interval cua giang vien duoc giu nguyen. Vat ly tinh theo thoi gian thuc.
    var intervals = [40, 30, 25, 20];
    var pipeSpeeds = [112, 145, 180, 210];
    var gapSizes = [198, 194, 190, 186];
    var gravity = 760;
    var flapVelocity = -230;
    var maxFallVelocity = 235;
    var flapCooldownMs = 85;

    var state = 'ready';
    var score = 0;
    var level = 1;
    var gameInterval = 40;
    var bestScore = readBestScore();
    var loopId = null;
    var lastTick = 0;
    var lastFlap = -1000;
    var birdY = 220;
    var birdVelocity = 0;
    var toastTimer = null;
    var audioOn = false;
    var audioContext = null;

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function readBestScore() {
        try {
            var value = parseInt(localStorage.getItem('flappyNoelBestScore_v1'), 10);
            return isFinite(value) && value >= 0 ? value : 0;
        } catch (e) {
            return 0;
        }
    }

    function saveBestScore() {
        if (score <= bestScore) return;
        bestScore = score;
        $best.text(bestScore);
        try {
            localStorage.setItem('flappyNoelBestScore_v1', String(bestScore));
        } catch (e) {
            // Van choi duoc neu trinh duyet chan localStorage.
        }
    }

    function getLevel(points) {
        if (points >= 40) return 4;
        if (points >= 20) return 3;
        if (points >= 5) return 2;
        return 1;
    }

    function getInterval(newLevel) {
        return intervals[newLevel - 1];
    }

    function getNextTarget() {
        return [5, 20, 40, 50][level - 1];
    }

    function getPreviousTarget() {
        return [0, 5, 20, 40][level - 1];
    }

    function renderProgress() {
        var next = getNextTarget();
        var previous = getPreviousTarget();
        var percent = clamp((score - previous) / (next - previous) * 100, 0, 100);
        $progressFill.css('width', percent + '%');
        $progressLabel.text(level === 4 ? 'Tiến tới chiến thắng' : 'Tiến tới Level ' + (level + 1));
        $progressCount.text(score + '/' + next);
    }

    function announce(message) {
        $screenReader.text(message);
    }

    function sound(frequency, duration, delay) {
        if (!audioOn) return;
        try {
            var AudioClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioClass) return;
            audioContext = audioContext || new AudioClass();
            if (audioContext.state === 'suspended') audioContext.resume();
            var osc = audioContext.createOscillator();
            var gain = audioContext.createGain();
            var start = audioContext.currentTime + (delay || 0);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(frequency, start);
            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(0.085, start + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start(start);
            osc.stop(start + duration + 0.015);
        } catch (e) {
            // Am thanh la tinh nang tuy chon.
        }
    }

    function showToast(message) {
        clearTimeout(toastTimer);
        $levelToast.text(message).addClass('visible');
        toastTimer = setTimeout(function () {
            $levelToast.removeClass('visible');
        }, 1450);
    }

    function choosePipeHeights(pipe) {
        var gap = gapSizes[level - 1];
        var minEdge = 86;
        var maxTop = height - gap - minEdge;
        pipe.top = Math.round(minEdge + Math.random() * (maxTop - minEdge));
        pipe.bottom = height - gap - pipe.top;
    }

    function renderPipe(pipe) {
        pipe.upper.css({right: pipe.right + 'px', height: pipe.top + 'px'});
        pipe.lower.css({right: pipe.right + 'px', height: pipe.bottom + 'px'});
    }

    function renderAllPipes() {
        pipes.forEach(renderPipe);
    }

    function renderBird() {
        var angle = clamp(birdVelocity * 0.14, -25, 36);
        $bird.css({top: birdY + 'px', transform: 'rotate(' + angle.toFixed(1) + 'deg)'});
    }

    function showOverlay(icon, title, message, detail, action) {
        $overlayIcon.text(icon);
        $overlayTitle.text(title);
        $overlayMessage.text(message);
        $overlayResult.text(detail || '').prop('hidden', !detail);
        $playButton.text(action);
        $overlay.prop('hidden', false);
    }

    function hideOverlay() {
        $overlay.prop('hidden', true);
    }

    function stopLoop() {
        if (loopId !== null) clearInterval(loopId);
        loopId = null;
    }

    function startLoop() {
        stopLoop();
        lastTick = performance.now();
        loopId = setInterval(gameTick, gameInterval);
    }

    function resetGame() {
        stopLoop();
        clearTimeout(toastTimer);
        $levelToast.removeClass('visible');
        state = 'ready';
        score = 0;
        level = 1;
        gameInterval = 40;
        birdY = height * 0.46;
        birdVelocity = 0;
        lastFlap = -1000;
        pipes.forEach(function (pipe, index) {
            pipe.right = -76 - index * pipeSpacing;
            pipe.counted = false;
            choosePipeHeights(pipe);
        });
        $score.text('0');
        $level.text('Level 1');
        $best.text(bestScore);
        $pauseButton.prop('disabled', true).text('⏸ Tạm dừng (P)');
        renderBird();
        renderAllPipes();
        renderProgress();
        showOverlay('❄', 'Sẵn sàng bay!', 'Nhấn ↓ để bắt đầu, sau đó nhấn từng lần để vỗ cánh.', '', 'Bắt đầu với ↓');
    }

    function startGame() {
        if (state !== 'ready' && state !== 'gameover' && state !== 'victory') return;
        if (state !== 'ready') resetGame();
        state = 'playing';
        hideOverlay();
        $pauseButton.prop('disabled', false).text('⏸ Tạm dừng (P)');
        birdVelocity = -175;
        lastFlap = performance.now();
        startLoop();
        announce('Trò chơi bắt đầu. Level 1.');
        $container.trigger('focus');
    }

    function flap() {
        if (state !== 'playing') return;
        var now = performance.now();
        if (now - lastFlap < flapCooldownMs) return;
        lastFlap = now;
        birdVelocity = flapVelocity;
        renderBird();
        sound(540, .055);
    }

    function pauseGame() {
        if (state === 'playing') {
            state = 'paused';
            stopLoop();
            $pauseButton.text('▶ Tiếp tục (P)');
            showOverlay('⏸', 'Đã tạm dừng', 'Nhấn P để tiếp tục trò chơi.', 'Điểm hiện tại: ' + score, 'Tiếp tục (P)');
            announce('Đã tạm dừng.');
        } else if (state === 'paused') {
            state = 'playing';
            hideOverlay();
            $pauseButton.text('⏸ Tạm dừng (P)');
            startLoop();
            announce('Tiếp tục trò chơi.');
        }
    }

    function updateLevel() {
        var newLevel = getLevel(score);
        if (newLevel === level) return;
        level = newLevel;
        gameInterval = getInterval(level);
        $level.text('Level ' + level);
        showToast('🎄 Level ' + level + '!');
        sound(660, .14);
        sound(880, .18, .15);
        announce('Đã lên Level ' + level + '. Interval ' + gameInterval + ' mili giây.');
        if (state === 'playing') startLoop();
    }

    function setScore(value) {
        if (state !== 'playing') return;
        score = clamp(Math.floor(value), 0, 50);
        $score.text(score);
        saveBestScore();
        if (score >= 50) {
            renderProgress();
            finishGame(true);
            return;
        }
        updateLevel();
        renderProgress();
    }

    function finishGame(won) {
        if (state !== 'playing') return;
        state = won ? 'victory' : 'gameover';
        stopLoop();
        clearTimeout(toastTimer);
        $levelToast.removeClass('visible');
        $pauseButton.prop('disabled', true).text('⏸ Tạm dừng (P)');
        saveBestScore();
        if (won) {
            showOverlay('🏆', 'Chiến thắng!', 'Bạn đã vượt qua đủ 4 Level và đạt 50 điểm!',
                'Kỷ lục: ' + bestScore + ' điểm', 'Chơi lại bằng ↓');
            sound(523, .17);
            sound(659, .17, .19);
            sound(784, .26, .38);
            announce('Chiến thắng! Đạt 50 điểm, game đã dừng.');
        } else {
            showOverlay('💝', 'Game Over', 'Không sao, hãy thử thêm lần nữa!',
                'Điểm: ' + score + ' · Level ' + level + ' · Kỷ lục: ' + bestScore, 'Chơi lại bằng ↓');
            sound(320, .21);
            announce('Game Over. Điểm: ' + score + '. Nhấn mũi tên xuống để chơi lại.');
        }
    }

    // Hitbox nam trong phan hinh nhin thay, khong tinh vien PNG trong suot.
    function hasCollision() {
        var left = birdLeft + 12;
        var right = birdLeft + birdWidth - 11;
        var top = birdY + 8;
        var bottom = birdY + birdHeight - 8;
        if (top < 0 || bottom > height) return true;

        return pipes.some(function (pipe) {
            var pipeLeft = width - pipe.right - pipeWidth + 6;
            var pipeEnd = width - pipe.right - 6;
            var horizontal = right > pipeLeft && left < pipeEnd;
            return horizontal && (top < pipe.top - 9 || bottom > height - pipe.bottom + 9);
        });
    }

    function gameTick() {
        if (state !== 'playing') return;
        var now = performance.now();
        var dt = clamp((now - lastTick) / 1000, .001, .055);
        lastTick = now;

        birdVelocity = Math.min(maxFallVelocity, birdVelocity + gravity * dt);
        birdY += birdVelocity * dt;
        pipes.forEach(function (pipe) {
            pipe.right += pipeSpeeds[level - 1] * dt;
        });
        renderBird();
        renderAllPipes();

        if (hasCollision()) {
            finishGame(false);
            return;
        }

        // Cong mot diem cho moi cap ong khi no da di qua vi tri chim.
        // Vong lap moi lan chi cong toi da mot diem cho moi cap.
        for (var i = 0; i < pipes.length; i++) {
            var pipe = pipes[i];
            if (!pipe.counted && pipe.right > width - birdLeft) {
                pipe.counted = true;
                setScore(score + 1);
                if (state !== 'playing') return;
            }
        }

        // Tai su dung cap ong cu sau cap ong con lai, khong dich chuyen dot ngot
        // cap ong van dang hien tren man hinh.
        pipes.forEach(function (pipe, index) {
            if (pipe.right > width + pipeWidth + 5) {
                var other = pipes[1 - index];
                pipe.right = other.right - pipeSpacing;
                pipe.counted = false;
                choosePipeHeights(pipe);
                renderPipe(pipe);
            }
        });
    }

    function toggleAudio() {
        audioOn = !audioOn;
        $soundButton.text(audioOn ? '🔊 Âm thanh (M)' : '🔇 Âm thanh (M)');
        announce(audioOn ? 'Đã bật âm thanh.' : 'Đã tắt âm thanh.');
        if (audioOn) sound(620, .09);
    }

    function toggleHelp() {
        var opening = $helpPanel.prop('hidden');
        if (opening && state === 'playing') pauseGame();
        $helpPanel.prop('hidden', !opening);
        $helpButton.attr('aria-expanded', String(opening));
    }

    function onArrowDown() {
        if (state === 'ready' || state === 'gameover' || state === 'victory') {
            startGame();
        } else if (state === 'playing') {
            flap();
        }
    }

    // Dieu khien duoc thong nhat bang keydown ArrowDown; khong dung mousedown.
    $(document).on('keydown.flappy', function (event) {
        // jQuery 1.11 may omit KeyboardEvent.repeat on its wrapped event.
        var nativeEvent = event.originalEvent || event;
        var repeated = event.repeat === true || nativeEvent.repeat === true;
        var key = event.key || nativeEvent.key || '';
        if (key === 'ArrowDown' || event.which === 40) {
            event.preventDefault();
            if (!repeated) onArrowDown();
        } else if (key.toLowerCase() === 'p' && !repeated) {
            event.preventDefault();
            pauseGame();
        } else if (key.toLowerCase() === 'm' && !repeated) {
            event.preventDefault();
            toggleAudio();
        } else if (key.toLowerCase() === 'h' && !repeated) {
            event.preventDefault();
            toggleHelp();
        }
    });

    $playButton.on('click', function () {
        if (state === 'paused') pauseGame();
        else startGame();
    });
    $pauseButton.on('click', pauseGame);
    $soundButton.on('click', toggleAudio);
    $helpButton.on('click', toggleHelp);

    // Khi chuyen tab, tu dong dung de tranh game chay ngầm.
    $(document).on('visibilitychange', function () {
        if (document.hidden && state === 'playing') pauseGame();
    });
    $(window).on('blur', function () {
        if (state === 'playing') pauseGame();
    });

    resetGame();

    // Ho tro kiem thu tai localhost, chi khi bat ?test=1.
    var testMode = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) &&
        new URLSearchParams(location.search).get('test') === '1';
    if (testMode) {
        $('#test_badge').prop('hidden', false);
        window.FlappyTest = {
            getState: function () {
                return {state: state, score: score, level: level, interval: gameInterval,
                    loopCount: loopId === null ? 0 : 1, birdY: birdY,
                    pipeRight: pipes[0].right, pipePositions: pipes.map(function (pipe) { return pipe.right; }),
                    pipeSpacing: pipeSpacing, pipeSpeed: pipeSpeeds[level - 1], bestScore: bestScore};
            },
            setScore: setScore,
            setBirdY: function (value) { birdY = clamp(value, 0, height - birdHeight); birdVelocity = 0; renderBird(); },
            start: startGame,
            pause: pauseGame
        };
    }
});
