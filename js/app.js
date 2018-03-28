    /*  Create a list that holds all of your cards  */
    let cardsArray = [
        'diamond', 'diamond', 'paper-plane-o', 'paper-plane-o', 'anchor', 'anchor', 'bolt', 'bolt', 'cube', 'cube', 'leaf', 'leaf', 'bicycle', 'bicycle', 'bomb', 'bomb'
    ];

    const deck = $('.deck'),
        move = $('.moves'),
        timer = $('.timer'),
        rating = $('.fa-star');

    let goTime,
        openedCards = [],
        moves = 0,
        second = 0,
        match = 0,
        cardsType = cardsArray.length / 2,

        thirdStar = 10,
        secondStar = 14,
        firstStar = 18;




    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    // Start The Game
    function begin() {
        // Shuffle Cards
        let newCards = shuffle(cardsArray);
        deck.empty();

        // All Zero
        match = 0;
        moves = 0;
        move.text('0');

        // Build Cards List By Loop
        for (let i = 0; i < newCards.length; i++) {
            deck.prepend('<li class="card"> <i class="fa fa-' + newCards[i] + '"></i> </li>');
        }
        // Make The Cards Listen For Events
        cardListener();

        // Reset When Restart
        resetTimer(goTime);
        second = 0;
        timer.text(second);
        startTimer();
    }

    // Cards Activities
    function cardListener() {
        // Flip on Click
        deck.find('.card').on('click', function () {
            let $this = $(this);
            if ($this.hasClass('show') || $this.hasClass('match')) {
                return true;
            }
            // Show & Open The Card
            let card = $this.html();
            $this.addClass('open show');
            openedCards.push(card);

            // Compares Cards If They Matched
            if (openedCards.length > 1) {
                if (card === openedCards[0]) {
                    deck.find('.open').addClass('match');
                    setTimeout(function () {
                        deck.find('open').removeClass('open show');
                    }, 400);
                    match++;

                    // Cards Are Not Matched
                } else {
                    deck.find('.open').addClass('unmatch');
                    setTimeout(function () {
                        deck.find('.open').removeClass('open show unmatch');
                    }, 400);
                }

                // Opened Cards Array
                openedCards = [];

                moves++;

                // Counting Moves For Rating
                rate(moves);

                // Print The Number Of Moves
                move.html(moves);
            }

            // Game Finished 'Win'
            if (cardsType === match) {
                rate(moves);
                let score = rate(moves).score;
                setTimeout(function () {
                    gameWin(moves, score);
                }, 1000);
            }
        });
    }



    // Timer Start When The Game Start ** from MDN: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
    function startTimer() {
        goTime = setInterval(function () {
            timer.text(second);
            second = second + 1;
        }, 1000);
    }

    // Reset The Timer
    function resetTimer(timer) {
        if (timer) {
            clearInterval(timer);
        }
    }

    // Rating
    function rate(moves) {
        let rate = 3;
        
        if (moves > thirdStar && moves < secondStar) {
            rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
            
        } else if (moves > secondStar && moves < firstStar) {
            rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
            
        } else if (moves > firstStar) {
            rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
            
            rate = 1;
        }
        return {
            score: rate
        };
    }
    
    
    // Restart The Game
    $('.restart').on('click', function (clicked) {
        if (clicked) {
            rating.removeClass('fa-star-o').addClass('fa-star');
            begin();
        }
    });


    begin();
