document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const slingshot = document.getElementById('slingshot');
    const bird = document.getElementById('bird');
    const structuresContainer = document.getElementById('structures');
    const scoreElement = document.getElementById('score');
    const birdsLeftElement = document.getElementById('birds-left');
    const gameOverElement = document.getElementById('game-over');
    const levelCompleteElement = document.getElementById('level-complete');
    const startButton = document.getElementById('start-btn');
    
    // Game state
    let score = 0;
    let birdsLeft = 5;
    let isDragging = false;
    let isBirdFlying = false;
    let gameRunning = false;
    let pigs = [];
    let blocks = [];
    let animationId;
    
    // Physics constants
    const gravity = 0.2;
    const friction = 0.99;
    
    // Bird properties
    const birdRadius = 20;
    let birdX = 140;
    let birdY = 380;
    let birdVelocityX = 0;
    let birdVelocityY = 0;
    
    // Initialize game
    function initGame() {
        score = 0;
        birdsLeft = 5;
        scoreElement.textContent = `Score: ${score}`;
        birdsLeftElement.textContent = `Birds: ${birdsLeft}`;
        
        // Reset bird
        birdX = 140;
        birdY = 380;
        birdVelocityX = 0;
        birdVelocityY = 0;
        updateBirdPosition();
        bird.style.display = 'block';
        
        // Clear structures
        structuresContainer.innerHTML = '';
        pigs = [];
        blocks = [];
        
        // Create level
        createLevel();
        
        gameOverElement.style.display = 'none';
        levelCompleteElement.style.display = 'none';
        startButton.style.display = 'none';
        gameRunning = true;
    }
    
    // Create level with pigs and blocks
    function createLevel() {
        // Create pigs
        for (let i = 0; i < 3; i++) {
            createPig(600 + i * 120, 350);
        }
        
        // Create blocks
        createTower(550, 300, 3);
        createTower(700, 300, 4);
        createTower(850, 300, 3);
    }
    
    function createPig(x, y) {
        const pig = document.createElement('div');
        pig.className = 'pig';
        pig.style.left = x + 'px';
        pig.style.top = y + 'px';
        structuresContainer.appendChild(pig);
        
        pigs.push({
            element: pig,
            x,
            y,
            width: 40,
            height: 40,
            health: 2
        });
    }
    
    function createTower(x, y, height) {
        for (let i = 0; i < height; i++) {
            const block = document.createElement('div');
            block.className = 'block';
            block.style.width = '80px';
            block.style.height = '30px';
            block.style.left = x + 'px';
            block.style.top = (y - i * 30) + 'px';
            structuresContainer.appendChild(block);
            
            blocks.push({
                element: block,
                x,
                y: y - i * 30,
                width: 80,
                height: 30,
                health: 1
            });
        }
    }
    
    // Update bird position on screen
    function updateBirdPosition() {
        bird.style.left = (birdX - birdRadius) + 'px';
        bird.style.top = (birdY - birdRadius) + 'px';
    }
    
    // Start dragging the bird
    bird.addEventListener('mousedown', startDrag);
    bird.addEventListener('touchstart', startDrag, { passive: false });
    
    function startDrag(e) {
        if (!gameRunning || isBirdFlying) return;
        e.preventDefault();
        isDragging = true;
        document.addEventListener('mousemove', dragBird);
        document.addEventListener('touchmove', dragBird, { passive: false });
        document.addEventListener('mouseup', launchBird);
        document.addEventListener('touchend', launchBird);
    }
    
    // Drag the bird
    function dragBird(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const rect = gameContainer.getBoundingClientRect();
        let clientX, clientY;
        
        if (e.type.includes('touch')) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        // Calculate bird position relative to slingshot
        const slingshotX = 140;
        const slingshotY = 400;
        
        // Calculate distance from slingshot
        const dx = clientX - rect.left - slingshotX;
        const dy = clientY - rect.top - slingshotY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Limit how far back the bird can be pulled
        const maxDistance = 100;
        if (distance > maxDistance) {
            const angle = Math.atan2(dy, dx);
            birdX = slingshotX + Math.cos(angle) * maxDistance;
            birdY = slingshotY + Math.sin(angle) * maxDistance;
        } else {
            birdX = clientX - rect.left;
            birdY = clientY - rect.top;
        }
        
        updateBirdPosition();
        
        // Show trajectory
        showTrajectory(slingshotX, slingshotY, birdX, birdY);
    }
    
    // Show trajectory dots
    function showTrajectory(startX, startY, endX, endY) {
        // Clear previous dots
        document.querySelectorAll('.trajectory-dot').forEach(dot => dot.remove());
        
        // Calculate launch velocity
        const power = 0.2;
        const velocityX = (startX - endX) * power;
        const velocityY = (startY - endY) * power;
        
        // Create trajectory dots
        let posX = startX;
        let posY = startY;
        let velX = velocityX;
        let velY = velocityY;
        
        for (let i = 0; i < 20; i++) {
            velY += gravity;
            velX *= friction;
            velY *= friction;
            
            posX += velX;
            posY += velY;
            
            // Don't show dots below ground
            if (posY > 460) break;
            
            const dot = document.createElement('div');
            dot.className = 'trajectory-dot';
            dot.style.left = (posX - 3) + 'px';
            dot.style.top = (posY - 3) + 'px';
            gameContainer.appendChild(dot);
        }
    }
    
    // Launch the bird
    function launchBird() {
        if (!isDragging) return;
        
        isDragging = false;
        isBirdFlying = true;
        document.removeEventListener('mousemove', dragBird);
        document.removeEventListener('touchmove', dragBird);
        document.removeEventListener('mouseup', launchBird);
        document.removeEventListener('touchend', launchBird);
        
        // Clear trajectory dots
        document.querySelectorAll('.trajectory-dot').forEach(dot => dot.remove());
        
        // Calculate launch velocity
        const slingshotX = 140;
        const slingshotY = 400;
        const power = 0.2;
        
        birdVelocityX = (slingshotX - birdX) * power;
        birdVelocityY = (slingshotY - birdY) * power;
        
        // Start animation
        animationId = requestAnimationFrame(updateGame);
    }
    
    // Main game update loop
    function updateGame() {
        if (!isBirdFlying) return;
        
        // Apply physics
        birdVelocityY += gravity;
        birdVelocityX *= friction;
        birdVelocityY *= friction;
        
        birdX += birdVelocityX;
        birdY += birdVelocityY;
        
        // Check collisions
        checkCollisions();
        
        // Check boundaries
        if (birdY > 500 + birdRadius) {
            // Bird went out of bounds
            birdLanded();
            return;
        }
        
        if (birdX < -birdRadius || birdX > 800 + birdRadius) {
            // Bird went out of bounds
            birdLanded();
            return;
        }
        
        updateBirdPosition();
        animationId = requestAnimationFrame(updateGame);
    }
    
    // Check collisions with pigs and blocks
    function checkCollisions() {
        // Check pig collisions
        for (let i = pigs.length - 1; i >= 0; i--) {
            const pig = pigs[i];
            
            if (checkCollision(birdX, birdY, birdRadius, pig.x + pig.width/2, pig.y + pig.height/2, pig.width/2)) {
                // Hit a pig
                pig.health--;
                
                if (pig.health <= 0) {
                    // Pig destroyed
                    pig.element.remove();
                    pigs.splice(i, 1);
                    score += 100;
                    scoreElement.textContent = `Score: ${score}`;
                } else {
                    // Pig damaged
                    pig.element.style.backgroundColor = '#FF6347';
                }
                
                // Bounce effect
                birdVelocityX *= -0.5;
                birdVelocityY *= -0.5;
                
                // Check level complete
                if (pigs.length === 0) {
                    levelComplete();
                    return;
                }
            }
        }
        
        // Check block collisions
        for (let i = blocks.length - 1; i >= 0; i--) {
            const block = blocks[i];
            
            if (checkCollision(birdX, birdY, birdRadius, 
                              block.x + block.width/2, block.y + block.height/2, 
                              Math.max(block.width, block.height)/2)) {
                // Hit a block
                block.health--;
                
                if (block.health <= 0) {
                    // Block destroyed
                    block.element.remove();
                    blocks.splice(i, 1);
                    score += 50;
                    scoreElement.textContent = `Score: ${score}`;
                }
                
                // Bounce effect
                birdVelocityX *= -0.3;
                birdVelocityY *= -0.3;
            }
        }
    }
    
    // Check collision between circle and rectangle
    function checkCollision(circleX, circleY, circleR, rectX, rectY, rectR) {
        // Simple distance check (circle to center of rectangle)
        const dx = circleX - rectX;
        const dy = circleY - rectY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < circleR + rectR;
    }
    
    // Bird landed or went out of bounds
    function birdLanded() {
        isBirdFlying = false;
        cancelAnimationFrame(animationId);
        
        birdsLeft--;
        birdsLeftElement.textContent = `Birds: ${birdsLeft}`;
        
        if (birdsLeft <= 0) {
            gameOver();
        } else {
            // Reset bird for next shot
            setTimeout(() => {
                birdX = 140;
                birdY = 380;
                birdVelocityX = 0;
                birdVelocityY = 0;
                updateBirdPosition();
            }, 1000);
        }
    }
    
    // Game over
    function gameOver() {
        gameRunning = false;
        gameOverElement.style.display = 'block';
        startButton.style.display = 'block';
        startButton.textContent = 'Try Again';
    }
    
    // Level complete
    function levelComplete() {
        gameRunning = false;
        isBirdFlying = false;
        cancelAnimationFrame(animationId);
        levelCompleteElement.style.display = 'block';
        startButton.style.display = 'block';
        startButton.textContent = 'Next Level';
    }
    
    // Start game
    startButton.addEventListener('click', initGame);
});
