var game = {
		correctAnswers:0,
		incorrectAnswers:0,
		unanswered:0,
		timeAllowed:15,
		intervalId:0,
		i:0, //index of question in questions array
		questions:[],
		q1:{
			question: "Colorado was the only state to turn down the opportunity to host what?",
			answer1: "Soccer World Cup",
			answer2: "Rugby World Cup",
			answer3: "World Fair",
			answer4: "Olympics",
			correctAnswer: "answer4",
			answer: "Olympics"	
		},
		q2:{
			question: "What is the highest mountain in Colorado?",
			answer1: "Vail Mountain",
			answer2: "Pike's Peak",
			answer3: "Mt. Elbert",
			answer4: "Mt. Evans",
			correctAnswer: "answer3",	
			answer: "Mt. Elbert"	
		},
		q3:{
			question: "What is the state tree of Colorado?",
			answer1: "The Evergreen",
			answer2: "The Elm",
			answer3: "The Blue Spruce",
			answer4: "The Aspen",
			correctAnswer: "answer3",
			answer: "The Blue Spruce"	
		},	
		q4:{
			question: "What is the closest state capital to the Colorado border?",
			answer1: "Cheyenne, WY",
			answer2: "Omaha, NE",
			answer3: "Salt Lake City, UT",
			answer4: "Topeka, KS",
			correctAnswer: "answer1",
			answer: "Cheyenne, WY"
		},	
		q5:{
			question: "In what year did Colorado become a state?",
			answer1: "1866",
			answer2: "1876",
			answer3: "1875",
			answer4: "1888",
			correctAnswer: "answer2",
			answer: "1876"	
		},	
		q6:{
			question: "What Western Slope town is known for its peaches?",
			answer1: "Aspen",
			answer2: "Fruita",
			answer3: "Grand Junction",
			answer4: "Palisade",
			correctAnswer: "answer4",
			answer: "Palisade"	
		},	
		q7:{
			question: "Eighty percent of Colorado's water comes from what source?",
			answer1: "Colorado River",
			answer2: "Snow",
			answer3: "Arkansas River",
			answer4: "Kansas",
			correctAnswer: "answer2",	
			answer: "Snow"	
		},	
		q8:{
			question: "From what language did Colorado get its name?",
			answer1: "French",
			answer2: "Cheyenne",
			answer3: "Spanish",
			answer4: "Dutch",
			correctAnswer: "answer3",
			answer: "Spanish"	
		},	
		q9:{
			question: "What is the state nickname?",
			answer1: "The Show Me State",
			answer2: "Centennial State",
			answer3: "West Kansas",
			answer4: "Mile High City",
			correctAnswer: "answer2",
			answer: "Centennial State"	
		},	
		q10:{
			question: "What brewery can you tour in Golden?",
			answer1: "Budweiser",
			answer2: "New Belgium",
			answer3: "Coors",
			answer4: "Stranahan's",
			correctAnswer: "answer3",
			answer: "Coors"	
		},		
		startGame: function(){
			$("#result").hide();
        	$("#questionArea").show();
        	$("#gameInstructions").hide();
        	$("#start").hide();
        	$("#startOver").hide();
        	game.correctAnswers=0;
			game.incorrectAnswers=0;
			game.unanswered=0;
			game.i=0; 
	   	},
    	newQuestion: function(){ 
    		$("#result").hide();   		
    		questions= [game.q1,game.q2,game.q3,game.q4,game.q5,game.q6,game.q7,game.q8,game.q9,game.q10];
    		if(game.i < questions.length){
    			game.timer();
    			$("#result").hide();
    			$("#questionArea").show();
	        	$("#question").html(questions[game.i].question);
				$("#answer1").html(questions[game.i].answer1);
				$("#answer2").html(questions[game.i].answer2);
				$("#answer3").html(questions[game.i].answer3);
				$("#answer4").html(questions[game.i].answer4);
			}
			else{    
			clearInterval(game.intervalId);			
				$("#questionArea").hide();
				$("#result").show();
				$("#startOver").show();
				$("#resultMsg").html("Game Over! <br> Here's how you did:  <br>Correct Answers: " + game.correctAnswers + "<br> Incorrect Answer: " + game.incorrectAnswers + "<br> Unanswered Questions: " + game.unanswered);
			}
    	},
    	correctAnswer: function(){
        	clearInterval(game.intervalId);
        	$("#result").show();
        	$("#resultMsg").html("That is the correct answer!  You must be a native.");
        	game.correctAnswers ++;
        	game.i++;     
        	setTimeout(function() { game.newQuestion(); }, 5000);  	
        	        	
    	},
    	inCorrectAnswer: function(){
        	clearInterval(game.intervalId);
        	$("#result").show();
        	$("#resultMsg").html("Sorry, Charlie. <br>That is the incorrect Answer. <br>The correct answer is " + questions[game.i].answer);
        	game.incorrectAnswers ++;
        	game.i++;
        	setTimeout(function() { game.newQuestion(); }, 5000);  	
    	},
    	timer: function(){
    		game.timeAllowed =15;
			game.intervalId = setInterval(game.count, 1000);
	 		$("#timerRow").text("Time Remaining: " + game.timeAllowed + " seconds"); 
		 	
    	},
		count: function() {
		    game.timeAllowed--;
		    $("#timerRow").text("Time Remaining: " + game.timeAllowed + " seconds");
		    if (game.timeAllowed === 0) {
		    	clearInterval(game.intervalId); 	 		
		 		$("#questionArea").hide();
		 		$("#result").show();
		 		$("#resultMsg").html("Time's up!!!. You must be on Mountain time. <br>The correct answer is " + questions[game.i].answer);
		 		game.unanswered++; 
		 		game.i++;
        		setTimeout(function() { game.newQuestion(); }, 5000);  	
		 	} 
		 	else if (game.timeAllowed <= 3) { 
				$("#timerRow").append("<div style='color:red;'>Hurry Up!</div>");
			}; 
		}
	};

$( document ).ready(function() {
	$("#welcome").show();
	
	$("#start").on("click",function(){	

		game.startGame();
		game.newQuestion();
	})

	$(".answer").on("click",function(){
		if($(this).attr('id') === questions[game.i].correctAnswer)
		{
			$("#questionArea").hide();
			game.correctAnswer();
		}
		else{
			$("#questionArea").hide();
			game.inCorrectAnswer();
		}
	})	
	$("#startOver").on("click",function(){		
		game.startGame();
		game.newQuestion();
	});
})