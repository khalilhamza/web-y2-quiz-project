import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase, ref, onValue, set} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyCMzsaMcHeif15-jY2TpPDMNPZzpZrr2EI",
  authDomain: "web-ds-quiz.firebaseapp.com",
  projectId: "web-ds-quiz",
  storageBucket: "web-ds-quiz.appspot.com",
  messagingSenderId: "308890781909",
  databaseURL: "https://quiz-ds-default-rtdb.europe-west1.firebasedatabase.app/",
  appId: "1:308890781909:web:a934576b468b3c9c7afa5c"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

var username = ''
var userscore = 0

function enteringthegame(){
    document.body.innerHTML += `
        <div id="bodyDiv">
            <form id="gameCodeForm">
                <input type="text" name="gameCode" id="gamecode" placeholder="Enter the game code" >
                <input type="submit" id="subbut" value="Enter Game">
            </form>
        </div>
        `
        document.getElementById("subbut").addEventListener("click", function(e){
            e.preventDefault();
            if(document.getElementById("gamecode").value == '123456'){
                correctAnswer();
            } else {
                incorrectAnswer();
            }
        });
        
        document.getElementById("gamecode").addEventListener("input", function() {
            document.getElementById("gamecode").style.border = "";
            document.getElementById("subbut").classList.remove("shake");
        });
        
        function incorrectAnswer() {
            document.getElementById("gamecode").style.border = "5px solid rgba(250, 0, 0, 0.7)"; 
            document.getElementById("subbut").classList.add("shake"); 
        }
        
        function correctAnswer() {
            document.getElementById("gamecode").setAttribute("placeholder", "Enter a name");
            document.getElementById("gamecode").value = ''
            document.getElementById("subbut").removeEventListener("click", handleFirstClick);
            document.getElementById("subbut").addEventListener("click", handleSecondClick); 
        }
        
        function handleFirstClick(e) {
            e.preventDefault();
            if(document.getElementById("gamecode").value == '123456'){
                correctAnswer();
            } else {
                incorrectAnswer();
            }
        }
        
        function handleSecondClick(e) {
            e.preventDefault();
            if(document.getElementById("gamecode").value !== '') {
                username = document.getElementById("gamecode").value
                document.body.innerHTML = `
                <svg class="svg-example" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 600 100">
                <path class="svg-example-path moveLeft" d="M 0 50 Q 50 0, 100 50 Q 150 100, 200 50 Q 250 0, 300 50 Q 350 100, 400 50 Q 450 0, 500 50 Q 550 100, 600 50" fill="transparent"></path>
            </svg>
            <svg class="svg-example" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 600 100">
                <path class="svg-example-path moveRight" d="M 0 50 Q 50 0, 100 50 Q 150 100, 200 50 Q 250 0, 300 50 Q 350 100, 400 50 Q 450 0, 500 50 Q 550 100, 600 50" fill="transparent"></path>
            </svg>
            <svg class="svg-example" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 600 100">
                <path class="svg-example-path moveLeft" d="M 0 50 Q 50 0, 100 50 Q 150 100, 200 50 Q 250 0, 300 50 Q 350 100, 400 50 Q 450 0, 500 50 Q 550 100, 600 50" fill="transparent"></path>
            </svg>
            <svg class="svg-example" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 600 100">
                <path class="svg-example-path moveRight" d="M 0 50 Q 50 0, 100 50 Q 150 100, 200 50 Q 250 0, 300 50 Q 350 100, 400 50 Q 450 0, 500 50 Q 550 100, 600 50" fill="transparent"></path>
            </svg>
        `
                thegame()
            } else {
                console.log("fail")
                incorrectAnswer();
            }
        }
        
    
}

function thegame(){
    
    var questionsArray = ["this is the Question 1 ???", "this is the Question 2 ???", "this is the Question 3 ???", "this is the Question 4 ???","next"]
    var but1ans = ["ans 1-1 correct", "ans 1-2", "ans 1-3", "ans 1-4"]
    var but2ans = ["ans 2-1", "ans 2-2", "ans 2-3", "ans 2-4 correct"]
    var but3ans = ["ans 3-1", "ans 3-2", "ans 3-3 correct", "ans 3-4"]
    var but4ans = ["ans 4-1", "ans 4-2 correct", "ans 4-3", "ans 4-4"]

    var correctCount = 0
    var questionAnswred = false

    document.body.innerHTML += `
            <div id="gameBodyDiv">
                <div id="questions"></div>
                    <div class="buttonsContainer">
                        <div class="right">
                            <input type="button" value="Answer 1" id="but1" class="gamebut">
                            <input type="button" value="Answer 2" id="but2" class="gamebut">
                        </div>
                        <div class="left">
                            <input type="button" value="Answer 3" id="but3" class="gamebut">
                            <input type="button" value="Answer 4" id="but4" class="gamebut">
                        </div>
                    </div>
                </div>
            </div>
        `

    function printQuestionsWithDelay() {
        var questionsDiv = document.getElementById("questions");
        var ansBut1 = document.getElementById("but1");
        var ansBut2 = document.getElementById("but2");
        var ansBut3 = document.getElementById("but3");
        var ansBut4 = document.getElementById("but4");
        var i = 0;

        function printQuestion() {
            if (i < questionsArray.length - 1 && questionsArray !== "next") {
                questionAnswred = false
                questionsDiv.innerHTML = questionsArray[i];
                ansBut1.value = but1ans[i];
                ansBut2.value = but2ans[i];
                ansBut3.value = but3ans[i];
                ansBut4.value = but4ans[i];
                i++;
                if (i < questionsArray.length) {
                    setTimeout(printQuestion, 5000);
                }
            }else{
                document.body.innerHTML = `
                <svg class="svg-example" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 600 100">
                <path class="svg-example-path moveLeft" d="M 0 50 Q 50 0, 100 50 Q 150 100, 200 50 Q 250 0, 300 50 Q 350 100, 400 50 Q 450 0, 500 50 Q 550 100, 600 50" fill="transparent"></path>
            </svg>
            <svg class="svg-example" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 600 100">
                <path class="svg-example-path moveRight" d="M 0 50 Q 50 0, 100 50 Q 150 100, 200 50 Q 250 0, 300 50 Q 350 100, 400 50 Q 450 0, 500 50 Q 550 100, 600 50" fill="transparent"></path>
            </svg>
            <svg class="svg-example" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 600 100">
                <path class="svg-example-path moveLeft" d="M 0 50 Q 50 0, 100 50 Q 150 100, 200 50 Q 250 0, 300 50 Q 350 100, 400 50 Q 450 0, 500 50 Q 550 100, 600 50" fill="transparent"></path>
            </svg>
            <svg class="svg-example" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0 0 600 100">
                <path class="svg-example-path moveRight" d="M 0 50 Q 50 0, 100 50 Q 150 100, 200 50 Q 250 0, 300 50 Q 350 100, 400 50 Q 450 0, 500 50 Q 550 100, 600 50" fill="transparent"></path>
            </svg>
        `
                showscores()
            }
        }
        printQuestion();

        document.getElementById("but1").addEventListener("click", function() {
            checkAnswer(i - 1, 0);
        });

        document.getElementById("but2").addEventListener("click", function() {
            checkAnswer(i - 1, 1);
        });

        document.getElementById("but3").addEventListener("click", function() {
            checkAnswer(i - 1, 2);
        });

        document.getElementById("but4").addEventListener("click", function() {
            checkAnswer(i - 1, 3);
        });
    }
    function checkAnswer(questionIndex, answerIndex) {
        if (questionIndex >= 0 && questionIndex < questionsArray.length && questionAnswred == false) {
            var ansArray;
            switch (questionIndex) {
                case 0:
                    ansArray = but1ans;
                    break;
                case 1:
                    ansArray = but2ans;
                    break;
                case 2:
                    ansArray = but3ans;
                    break;
                case 3:
                    ansArray = but4ans;
                    break;
            }
            if (ansArray[answerIndex].includes("correct")) {
                correctCount++;
                questionAnswred = true
            }
            userscore = correctCount;
        }
    }
    printQuestionsWithDelay()
}

function showscores(){
    document.body.innerHTML += `
        <div id="bodyDiv" style="width:75%">
            <div id="list">
            </div>
        </div>
        `
    
    function writeUserData(name, score) {
        set(ref(db, 'players/' + name), {
        scores: score
        });
    }
    writeUserData(username, userscore)
    function fetchUserData() {
        const dbRef = ref(db, 'players');
      
        onValue(dbRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            document.getElementById('list').innerHTML += "<p> <span> "+childKey+" </span> and your score is <span> "+childData.scores+" </span> <p>"
          });
        }, {
          onlyOnce: true
        });
      }
      fetchUserData()

}

enteringthegame()