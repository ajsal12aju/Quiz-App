$(document).ready(function() {
    $.ajax({
      url: 'https://5d76bf96515d1a0014085cf9.mockapi.io/quiz',
      type: 'GET',
      success: function(response) {
        processData(response);
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });
  });
  
  function processData(data) {
    var gParent = document.getElementById("perantcontainer");
    var heading = document.createElement("h1");
    heading.className = "title";
    heading.innerText = "The Quiz App";
    gParent.appendChild(heading);
  
    var perantDiv = document.getElementById("container");
    gParent.appendChild(perantDiv);
  
    var questionContainer = document.createElement("div");
    questionContainer.className = "question-container";
  
    for (var i = 0; i < data.length; i++) {
      var question = document.createElement("p");
      question.className = "question";
      num = i + 1;
      question.innerText = "Q" + num + ". " + data[i].question;
  
      questionContainer.appendChild(question);
  
      for (let j = 0; j < data[i].options.length; j++) {
        var optionsContainer = document.createElement("div");
        optionsContainer.className = "options";
  
        var radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'question_' + i;
        radio.value = j + 1; 
        radio.id = 'option_' + i + '_' + j;
  
        var label = document.createElement("label");
        label.className = "label";
        label.innerText = data[i].options[j];
  
        optionsContainer.appendChild(radio);
        optionsContainer.appendChild(label);
  
        questionContainer.appendChild(optionsContainer);
  
        radio.addEventListener('click', function() {
          console.log('Selected value:', this.value);
        });
      }
      var hr = document.createElement("hr");
      hr.style.border = "2px solid #fad744";
      questionContainer.appendChild(hr);
  
      perantDiv.appendChild(questionContainer);
    }
  
    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Submit";
    submit.className = "submit-button";
    questionContainer.appendChild(submit);
  
    var score = document.createElement("div");
    score.className = "score";
    score.innerText = "Score: 0";
    perantDiv.appendChild(score);
  
    submit.addEventListener('click', function(event) {
      event.preventDefault(); 
      var correctAnswers = 0;
      for (var i = 0; i < data.length; i++) {
        var selectedOption = document.querySelector('input[name="question_' + i + '"]:checked');
        if (selectedOption) {
          if (selectedOption.value === data[i].answer.toString()) {
            correctAnswers++;
          }
        }
      }
      score.innerText = `Score: ${correctAnswers}/${data.length}`;
    });
  }
  