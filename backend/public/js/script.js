 // Global counter variable
 let divCounter = 0;

 document.getElementById('createNewSection').addEventListener('click', function() {
     function addSection() {
         // Increment the counter
         divCounter++;

         // Create a new div element
         var section_div = document.createElement('div');
         section_div.className = 'section';

         // Create a caption for the counter
         var caption = document.createElement('div');
         caption.className = 'caption';
         caption.textContent = 'Dział: ' + divCounter;

         // Create the delete button
         var deleteButton = document.createElement('button');
         deleteButton.className = 'delete-button btn btn-danger btn-sm';
         deleteButton.textContent = 'Usuń dział';
         deleteButton.addEventListener('click', function() {
             section_div.remove();
             reCounterDivs();
         });

         // Append the caption and delete button to the new div
         section_div.appendChild(caption);
         section_div.appendChild(deleteButton);

         // Create the Bootstrap form group with inline form
         var formInline = document.createElement('div');
         formInline.className = 'form-inline';

         // Create the label
         var label = document.createElement('label');
         label.textContent = 'Tytuł działu: ';
         label.className = 'label';
         label.htmlFor = 'input-' + divCounter;

         // Create the input
         var input = document.createElement('input');
         input.type = 'text';
         input.className = `section_${divCounter} ` + 'form-control mr-2 TitleSectionInput'; // margin right for spacing
         input.id = 'input-' + divCounter;
         input.placeholder = 'Wpisz tytuł działu';

         // Append label and input to the form inline
         formInline.appendChild(label);
         formInline.appendChild(input);

         // Append the form inline to the new div
         section_div.appendChild(formInline);

         // Create the Bootstrap form group with inline form
         var formInlineAutor = document.createElement('div');
         formInlineAutor.className = 'form-inline';

         // Create the label
         var labelAutor = document.createElement('label');
         labelAutor.textContent = 'Autor: ';
         labelAutor.className = 'label';
         labelAutor.htmlFor = 'input-autor-' + divCounter;

         // Create the input
         var inputAutor = document.createElement('input');
         inputAutor.type = 'text';
         inputAutor.className = `section_${divCounter} ` + 'form-control mr-2 AutorInput'; // margin right for spacing
         inputAutor.id = 'input-autor-' + divCounter;
         inputAutor.placeholder = 'Wpisz autora';

         // Append label and input to the form inline
         formInlineAutor.appendChild(labelAutor);
         formInlineAutor.appendChild(inputAutor);

         // Append the form inline to the new div
         section_div.appendChild(formInlineAutor);

         // Create the bottom button
         var bottomButton = document.createElement('button');
         bottomButton.className = 'btn btn-secondary bottom-button createLessonButton';
         bottomButton.textContent = 'Utwórz lekcję';

         // Append the bottom button to the new div
         section_div.appendChild(bottomButton);

         // Get the container and the button
         var container = document.getElementById('container');
         var button = document.getElementById('createNewSection');

         // Insert the new div before the button
         container.insertBefore(section_div, button);

         // Re-counter the divs to maintain correct order
         reCounterDivs();




         //create a new counter for lessons
         var lessonCounter = 0;

         function createLessons() {
             lessonCounter++;
             var lesson_div = document.createElement('div');
             lesson_div.className = `section_${divCounter} ` + 'lesson';

             // Create a span for the lesson text
             var lesson_caption = document.createElement('span');
             lesson_caption.className = 'lesson-text'; // Add a class to the lesson text
             lesson_caption.textContent = 'Lekcja: ' + lessonCounter;
             // add font weight
             lesson_caption.style.fontWeight = 'bold';
             lesson_div.appendChild(lesson_caption);

             // Create the Bootstrap form group with inline form
             var LessonformInline = document.createElement('div');
             LessonformInline.className = 'form-inline';

             // Create the Bootstrap form group with inline form
             var LessonformInline = document.createElement('div');
             LessonformInline.className = 'form-inline';

             // Create the label
             var label = document.createElement('label');
             label.textContent = 'Tytuł lekcji: ';
             label.className = 'label';

             // Create the input
             var input = document.createElement('input');
             input.type = 'text';
             input.className = `section_${divCounter} ` + `lesson_${lessonCounter} ` + 'form-control mr-2 TitleLessonInput '; // margin right for spacing
             input.placeholder = 'Wpisz tytuł lekcji';

             // Append label and input to the form inline
             LessonformInline.appendChild(label);
             LessonformInline.appendChild(input);

             // Append the form inline to the new div
             lesson_div.appendChild(LessonformInline);

             // Create the bottom button
             var bottomButtonTask = document.createElement('button');
             bottomButtonTask.className = 'btn btn-secondary bottom-button createTaskButton';
             bottomButtonTask.textContent = 'Utwórz zadanie';

             // Append the bottom button to the new div
             lesson_div.appendChild(bottomButtonTask);


             // Add background color
             lesson_div.style.backgroundColor = 'darkgray';
             //add margin
             lesson_div.style.margin = '10px';
             //add padding
             lesson_div.style.padding = '10px';

             // Add delete button except for the first lesson
             if (lessonCounter > 1) {
                 var deleteButton = document.createElement('button');
                 deleteButton.textContent = 'Usuń lekcję';
                 // Add a class to the delete button
                 deleteButton.className = 'delete-button btn btn-danger btn-sm';
                 deleteButton.addEventListener('click', function() {
                     // Get the parent of the lesson div (should be the section)
                     var parentSection = lesson_div.parentNode;

                     // Remove the entire lesson div
                     parentSection.removeChild(lesson_div);
                     lessonCounter--;

                     // Renumerate the lessons within the parent section
                     renumerateLessons(parentSection);
                 });
                 lesson_div.appendChild(deleteButton);
             }

             // Insert the new div before the button in the section
             section_div.insertBefore(lesson_div, bottomButton);

             //create a new counter for tasks starting from A
             var taskCounter = 64; // ASCII code for 'A'
             var taskCounterInt = 0;



             function createTasks() {
                 taskCounter++;
                 taskCounterInt++;
                 var task_div = document.createElement('div');
                 task_div.className = `section_${divCounter} + lesson_${lessonCounter}` + ' task';

                 // Create a span for the task text  
                 var task_caption = document.createElement('span');
                 task_caption.className = 'task-text'; // Add a class to the task
                 task_caption.textContent = "Zadanie " + String.fromCharCode(taskCounter);
                 // Add font weight
                 task_caption.style.fontWeight = 'bold';
                 task_div.appendChild(task_caption);
                 task_div.style.backgroundColor = "#808080"; // This is a darker grey color
                 task_div.style.margin = '10px';
                 task_div.style.padding = '10px';

                 // Create the Bootstrap form group with inline form
                 var TaskformInline = document.createElement('div');
                 TaskformInline.className = 'form-inline';

                 // Create the label
                 var label = document.createElement('label');
                 label.textContent = 'Treść zadania: ';
                 label.className = 'label form-control-label';

                 // Create the input
                 var input = document.createElement('input');
                 input.type = 'text';
                 input.className = `section_${divCounter} ` + `lesson_${lessonCounter} ` + `task_${taskCounterInt} ` + 'form-control mr-2 TaskInput'; // margin right for spacing

                 // Add placeholder
                    input.placeholder = 'Wpisz treść zadania np. co widzisz? co usłyszałeś? co opiszesz? itp';

                 // Append label and input to the form inline
                 TaskformInline.appendChild(label);
                 TaskformInline.appendChild(input);

                 // Append the form inline to the new div
                 task_div.appendChild(TaskformInline);

                 //Create the bottom button
                 var bottomButtonIntroduction = document.createElement('button');
                 bottomButtonIntroduction.className = `btn btn-secondary bottom-button section_${divCounter} ` + `lesson_${lessonCounter} ` + `task_${taskCounterInt} createTaskButton`;
                 bottomButtonIntroduction.textContent = 'Utwórz';

                 // Append the bottom button to the new div
                 task_div.appendChild(bottomButtonIntroduction);

                 // Add delete button except for the first task

                 // Add delete button except for the first task
                 if (taskCounterInt > 1) {

                     var deleteButton = document.createElement('button');
                     deleteButton.textContent = 'Usuń zadanie';
                     deleteButton.style.marginLeft = '5px';
                     deleteButton.style.marginTop = '5px';
                     // Add a class to the delete button
                     deleteButton.className = 'delete-button btn btn-danger btn-sm';
                     deleteButton.addEventListener('click', function() {
                         // Get the parent of the task div (should be the lesson_div)
                         var parentLesson = task_div.parentNode;

                         // Remove the entire task div
                         parentLesson.removeChild(task_div);
                         taskCounter--;
                         taskCounterInt--;

                         // Renumerate the tasks within the parent lesson
                         renumerateTasks(parentLesson);


                     });
                     task_div.appendChild(deleteButton);


                 }

                 // Insert the task_div before the bottomButtonTask in the lesson_div
                 lesson_div.insertBefore(task_div, bottomButtonTask);

                 var Intoduction_couter = 0;

                 function createIntroduction() {
                     Intoduction_couter++;
                     var introduction_div = document.createElement('div');
                     introduction_div.className = `section_${divCounter} + lesson_${lessonCounter} + task_${taskCounterInt}` + ' introduction';
                     introduction_div.style.backgroundColor = "#505050"; // This is a silver color
                     introduction_div.style.margin = '10px';
                     introduction_div.style.fontWeight = 'bold';
                     introduction_div.style.padding = '10px';
                     introduction_div.style.paddingRight = '20px';



                     //padding top
                     introduction_div.style.paddingTop = '15px';
                     //create a Bootstrap form group with inline form
                     var IntroductionformInline = document.createElement('div');

                     var createdDiv = document.createElement('div');
                     createdDiv.className = 'createdDiv';

                     //add label input to the IntroductionformInline
                     var label = document.createElement('label');
                     label.textContent = Intoduction_couter
                     label.className = 'introduction-text';





                     // Create the label
                     var label = document.createElement('label');
                     label.textContent = 'Tytuł';
                     label.className = 'label';

                     // Create the input
                     var input = document.createElement('input');
                     input.type = 'text';

                     input.className = `section_${divCounter} ` + `lesson_${lessonCounter} ` + `task_${taskCounterInt} ` + `introduction_${Intoduction_couter} ` + 'form-control mr-2 IntroductionInput Introd'; // margin right for spacing
                     input.placeholder = 'Wpisz np. wprowadzenie, zaznacz wszystkie prawiłowe odpowiedzi itp.';
                     //add margin
                     input.style.margin = '10px';

                     // Add delete button except for the first time
                     if (Intoduction_couter > 1) {
                         var deleteButton = document.createElement('button');
                         deleteButton.textContent = 'Usuń';
                         deleteButton.style.marginLeft = '5px';
                         deleteButton.style.marginTop = '5px';
                         // Add a class to the delete button
                         deleteButton.className = 'delete-button btn btn-danger btn-sm';

                         deleteButton.addEventListener('click', function() {
                             // Get the parent of the task div (should be the lesson_div)
                             var parentLesson = introduction_div.parentNode;

                             // Remove the entire task div
                             parentLesson.removeChild(introduction_div);
                             Intoduction_couter--;

                             // Renumerate the tasks within the parent lesson
                             renumerateIntroduction(parentLesson);
                         });

                         introduction_div.appendChild(deleteButton);
                     }

                     createdDiv.appendChild(label);
                     createdDiv.appendChild(input);
                     //display block 
                     createdDiv.style.display = 'block';

                     //do the label2 and instead of input2 create a textarea

                     createdDiv2 = document.createElement('div');
                     createdDiv2.className = 'createdDiv2';

                     var label2 = document.createElement('label');
                     label2.textContent = 'Opis: ';
                     label2.className = 'label';

                     // Create the input
                     var textarea = document.createElement('textarea');
                     textarea.className = `section_${divCounter} lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} form-control mr-2 DescriptionInput Introd`; // margin right for spacing
                     textarea.placeholder = 'Opis do filmu';
                     textarea.style.margin = '10px';

                     createdDiv2.appendChild(label2);
                     createdDiv2.appendChild(textarea);
                     createdDiv2.style.display = 'block';

                     var createdDiv3 = document.createElement('div');
                     createdDiv3.className = 'createdDiv';

                     //add label input to the IntroductionformInline
                     var label3 = document.createElement('label');
                     label3.textContent = "Wstaw film:"
                     label3.className = 'label';
                     // Create the input
                     var input3 = document.createElement('input');
                     input3.type = 'file';
                     //add id
                     input3.id = 'file';
                     input3.className = `section_${divCounter} lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} form-control mr-2 IntroductionInputFile Introd`; // margin right for spacing
                     input3.accept = 'video/*, image/*'; // accept both video and image files
                     input3.placeholder = 'Upload a film or image here';
                     //add margin
                     input3.style.margin = '10px';

                     createdDiv3.appendChild(label3);
                     createdDiv3.appendChild(input3);
                     //display block 
                     createdDiv3.style.display = 'block';


                     // Append label and input to the form inline
                     IntroductionformInline.appendChild(label);
                     IntroductionformInline.appendChild(input);
                     IntroductionformInline.appendChild(label2);
                     IntroductionformInline.appendChild(textarea);
                     IntroductionformInline.appendChild(label3);
                     IntroductionformInline.appendChild(input3);


                     //create a button Add Question  
                     var addQuestionButton = document.createElement('button');
                     addQuestionButton.className = 'btn btn-secondary bottom-button createQuestionButton';
                     addQuestionButton.textContent = 'Dodaj pytanie';
                     addQuestionButton.style.marginTop = '5px';
                     addQuestionButton.style.marginLeft = '5px';



                     //appemd the form inline to the introduction div
                     introduction_div.appendChild(IntroductionformInline);

                     // Append the bottom button to the new div
                     introduction_div.appendChild(addQuestionButton);


                     task_div.appendChild(introduction_div);

                     

                     task_div.insertBefore(introduction_div, bottomButtonIntroduction);


                     task_div.appendChild(introduction_div);

                     task_div.insertBefore(introduction_div, bottomButtonIntroduction);

                     var questionsCounter = 0;

                     function createQuestions() {
                         questionsCounter++;

                         var questions_div = document.createElement('div');
                         questions_div.className = `section_${divCounter}  lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} question_${questionsCounter} question`;
                         questions_div.style.backgroundColor = "#202020"; // This is an even darker shade of gray
                         questions_div.style.margin = '10px';
                         questions_div.style.paddingTop = '30px';
                         questions_div.style.paddingBottom = '30px';
                         questions_div.style.paddingLeft = '10px';
                         questions_div.style.paddingRight = '10px';
                         questions_div.style.color = 'white';

                         // After creating the questions_div, add these lines
                         questions_div.style.position = 'relative'; // Make the div relative

                         if (questionsCounter > 1) {
                             // Create the button
                             var button = document.createElement('button');
                             button.textContent = 'Usuń pytanie'; // Set the button text
                             button.className = 'btn btn-danger btn-sm'; // Add Bootstrap's button classes
                             button.style.position = 'absolute'; // Make the button absolute
                             button.style.top = '5px'; // Set the top position to 5px
                             button.style.right = '5px'; // Set the right position to 5px

                             // Add event listener to the button
                             button.addEventListener('click', function() {
                                 questions_div.remove(); // Remove the questions_div when the button is clicked
                                 questionsCounter--; // Decrement the questionsCounter
                                 renumerateQuestions(introduction_div);
                             });

                             // Append the button to the questions_div
                             questions_div.appendChild(button);
                         }

                         // Create the button
                         var button = document.createElement('button');
                         button.textContent = 'Usuń pytanie'; // Set the button text
                         button.className = 'btn btn-danger btn-sm'; // Add Bootstrap's button classes
                         button.style.position = 'absolute'; // Make the button absolute
                         button.style.top = '5px'; // Set the top position to 5px
                         button.style.right = '5px'; // Set the right position to 5px


                         //create a Bootstrap form group with inline form
                         var QuestionsformInline = document.createElement('div');

                         //create a label input to the QuestionsformInline
                         var label = document.createElement('label');
                         label.textContent = `Pytanie: ${questionsCounter}`
                         label.className = 'label form-control-label mr-2 question-number'; // Add margin to the right and the question-numbe

                         QuestionsformInline.className = 'form-inline'; // Add Bootstrap's form-inline class

                         //create the input
                         var input = document.createElement('input');
                         input.type = 'text';
                         input.className = `form-control mr-2 section_${divCounter}  lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} question_${questionsCounter} questionInput Introd`; // Add Bootstrap's form-control class and margin to the right

                         //create a select
                         var select = document.createElement('select');
                         select.className = `form-control custom-select section_${divCounter}  lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter}  question_${questionsCounter} questionCorrectSelect`; // Add Bootstrap's custom-select class
                         select.style.width = '200px';
                         select.style.marginLeft = '10px'; // Add margin to the left

                         //create options
                         var option1 = document.createElement('option');
                         option1.value = 'Poprawne';
                         option1.text = 'Poprawne';

                         var option2 = document.createElement('option');
                         option2.value = 'Niepoprawne';
                         option2.text = 'Niepoprawne';

                         //create a select
                         var select2 = document.createElement('select');
                         select2.className = `form-control custom-select section_${divCounter}  lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter}  question_${questionsCounter} questionActiveSelect`; // Add Bootstrap's custom-select class
                         select2.style.width = '200px';
                         select2.style.marginLeft = '10px'; // Add margin to the left

                         //create options
                         var select2option1 = document.createElement('option');
                         select2option1.value = 'Aktywne';
                         select2option1.text = 'Aktywne';

                         var select2option2 = document.createElement('option');
                         select2option2.value = 'Nieaktywne';
                         select2option2.text = 'Nieaktywne';

                         //add options to the select
                         select.appendChild(option1);
                         select.appendChild(option2);
                         select2.appendChild(select2option1);
                         select2.appendChild(select2option2);

                         //add label, input, and select to the QuestionsformInline
                         QuestionsformInline.appendChild(label);
                         QuestionsformInline.appendChild(input);
                         QuestionsformInline.appendChild(select);
                         QuestionsformInline.appendChild(select2);

                         //append the form inline to the new div
                         questions_div.appendChild(QuestionsformInline);

                         introduction_div.insertBefore(questions_div, addQuestionButton);
                     }

                     //create the first question
                     createQuestions();

                     addQuestionButton.addEventListener('click', function() {
                         createQuestions();
                     });

                     //I want to create here a checkbox here
                     // Create the checkbox
                     var checkbox = document.createElement('input');
                     checkbox.type = 'checkbox';
                     checkbox.className = 'checkbox';
                     checkbox.style.width = '20px';
                     checkbox.style.height = '20px';
                     checkbox.style.marginLeft = '10px';
                     checkbox.style.marginBottom = '5px';
                     checkbox.style.marginRight = '5px';
                     //background color
                     checkbox.style.backgroundColor = 'black';

                     //add label to the checkbox
                     var label = document.createElement('label');
                     label.textContent = 'Dodaj omówienie';
                     label.style.color = 'white';
                     label.style.marginLeft = '5px';

                     // Create a container div
                     var container = document.createElement('div');

                     // Apply flexbox to the container
                     container.style.display = 'flex';
                     container.style.alignItems = 'center'; // This will vertically center the checkbox and label
                     //margin top
                     container.style.marginTop = '10px';

                     // Append the checkbox and label to the container
                     container.appendChild(checkbox);
                     container.appendChild(label);

                     var StingClass = `btn btn-secondary bottom-button section_${divCounter} ` + `lesson_${lessonCounter} ` + `task_${taskCounterInt} createTaskButton`;

                     //get reference to the bottom button
                     var dqwdwq = document.querySelector(`.${StingClass}`);

                     // Declare newIntroductionDiv outside of the event listener
                     var newIntroductionDiv;

// Add event listener to the checkbox
checkbox.addEventListener('change', function() {
    // Reference to the new introduction div
    var newIntroductionDiv;

    if (this.checked) {
        // Create a new introduction div
        newIntroductionDiv = document.createElement('div');
        newIntroductionDiv.className = `section_${divCounter} lesson_${lessonCounter} task_${taskCounterInt} introduction description`;
        newIntroductionDiv.style.display = 'none'; // Initially hide the div
        newIntroductionDiv.style.padding = '10px';
        newIntroductionDiv.style.paddingRight = '20px';

        // Create a label for the input
        var label = document.createElement('label');
        label.textContent = 'Tytuł:';
        label.className = 'label';
        label.style.fontWeight = 'bold';
        label.style.display = 'none';

        // Create the input
        var input = document.createElement('input');
        input.type = 'text';
        input.className = `section_${divCounter} lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} form-control mr-2 IntroductionInput Intr`;
        input.placeholder = 'Wpisz np. wprowadzenie, zaznacz wszystkie prawiłowe odpowiedzi,omówienie itp';
        input.style.margin = '10px';
        input.disabled = true;
        input.style.display = 'none';

        // Create a label for the textarea
        var textareaLabel = document.createElement('label');
        textareaLabel.textContent = 'Opis:';
        textareaLabel.className = 'label';
        textareaLabel.style.fontWeight = 'bold';

        // Create the textarea
        var textarea = document.createElement('textarea');
        textarea.className = `section_${divCounter} lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} form-control mr-2 DescriptionInput Treat`;
        textarea.placeholder = 'Opis do filmu';
        textarea.style.margin = '10px';
        textarea.style.marginRight = '10px';

        // Create a label for the file input
        var fileInputLabel = document.createElement('label');
        fileInputLabel.textContent = 'Wstaw film:';
        fileInputLabel.className = 'label';
        fileInputLabel.style.fontWeight = 'bold';

        // Create the file input
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'file';
        fileInput.className = `section_${divCounter} lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} form-control mr-2 IntroductionInputFile Treat`;
        fileInput.accept = 'video/*, image/*';
        fileInput.placeholder = 'Upload a film or image here';
        fileInput.style.margin = '10px';

        // Append the label and input to the newIntroductionDiv
        newIntroductionDiv.appendChild(label);
        newIntroductionDiv.appendChild(input);

        // Append the label and textarea to the newIntroductionDiv
        newIntroductionDiv.appendChild(textareaLabel);
        newIntroductionDiv.appendChild(textarea);

        // Attach input event listener for description
        textarea.addEventListener('input', function() {
            if (this.value !== '') {
                this.style.border = '';
                this.classList.remove('empty-input'); // Remove class
            }
        });

        // Attach input event listener for inputfile
        fileInput.addEventListener('input', function() {
            if (this.value !== '') {
                this.style.border = '';
                this.classList.remove('empty-input'); // Remove class
            }
        });

        // Append the label and file input to the newIntroductionDiv
        newIntroductionDiv.appendChild(fileInputLabel);
        newIntroductionDiv.appendChild(fileInput);

        // Create the button
        var button = document.createElement('button');
        button.textContent = 'Usuń pytanie';
        button.className = 'btn btn-danger btn-sm';
        button.style.position = 'absolute';
        button.style.top = '5px';
        button.style.right = '5px';

        // Create the Bootstrap form group with inline form
        var QuestionsformInline2 = document.createElement('div');
        QuestionsformInline2.className = 'form-inline';

        // Create the label
        var questionLabel = document.createElement('label');
        questionLabel.textContent = 'Pytanie: ';
        questionLabel.className = 'label form-control-label mr-2 question-number';

        // Create the input
        var questionInput = document.createElement('input');
        questionInput.type = 'text';
        questionInput.className = `form-control mr-2 section_${divCounter} lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} question_${questionsCounter} questionInput`;
        questionInput.disabled = true;

        // Create the select
        var select = document.createElement('select');
        select.className = `form-control custom-select section_${divCounter} lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} question_${questionsCounter} questionCorrectSelect`;
        select.style.width = '200px';
        select.style.marginLeft = '10px';
        select.disabled = true;

        // Create the options
        var option1 = document.createElement('option');
        option1.value = 'Poprawne';
        option1.text = 'Poprawne';

        var option2 = document.createElement('option');
        option2.value = 'Niepoprawne';
        option2.text = 'Niepoprawne';

        // Create the select2
        var select2 = document.createElement('select');
        select2.className = `form-control custom-select section_${divCounter} lesson_${lessonCounter} task_${taskCounterInt} introduction_${Intoduction_couter} question_${questionsCounter} questionActiveSelect`;
        select2.style.width = '200px';
        select2.style.marginLeft = '10px';
        select2.disabled = true;

        // Create the options for select2
        var select2option1 = document.createElement('option');
        select2option1.value = 'Aktywne';
        select2option1.text = 'Aktywne';

        var select2option2 = document.createElement('option');
        select2option2.value = 'Nieaktywne';
        select2option2.text = 'Nieaktywne';

        // Add the options to the selects
        select.appendChild(option1);
        select.appendChild(option2);
        select2.appendChild(select2option1);
        select2.appendChild(select2option2);

        // Add the label, input, and selects to the QuestionsformInline2
        QuestionsformInline2.appendChild(questionLabel);
        QuestionsformInline2.appendChild(questionInput);
        QuestionsformInline2.appendChild(select);
        QuestionsformInline2.appendChild(select2);

        // Append the form inline to the new div
        newIntroductionDiv.appendChild(QuestionsformInline2);

        // Make the QuestionsformInline2 not active
        QuestionsformInline2.style.display = 'none';

        // Insert the newIntroductionDiv just after the parent of the checkbox
        this.parentNode.parentNode.insertAdjacentElement('afterend', newIntroductionDiv);
        newIntroductionDiv.style.display = 'block';

        // Store the reference to the newIntroductionDiv in the checkbox element
        this.newIntroductionDiv = newIntroductionDiv;
    } else {
        // Hide and remove the new introduction div
        if (this.newIntroductionDiv) {
            this.newIntroductionDiv.style.display = 'none';
            if (this.newIntroductionDiv.parentNode) {
                this.newIntroductionDiv.parentNode.removeChild(this.newIntroductionDiv);
            }
            this.newIntroductionDiv = null; // Clear the reference
        }
    }
});

                     // Append the container to the introduction_div
                     introduction_div.appendChild(container);




                 }
                 createIntroduction();

                 bottomButtonIntroduction.addEventListener('click', function() {
                     createIntroduction();
                 });

             }
             createTasks();

             bottomButtonTask.addEventListener('click', function() {
                 createTasks();
             });
         }

         // Create the first lesson
         createLessons();

         // Attach click event listener to the bottom button
         bottomButton.addEventListener('click', function() {
             createLessons();
         });
     }
     addSection();


     // Attach input event listener when page loads for section title
     document.querySelectorAll('.TitleSectionInput').forEach(input => {
         input.addEventListener('input', function() {
             if (this.value !== '') {
                 this.style.border = '';
                 this.classList.remove('empty-input'); // Remove class
             }
         });
     });

     // Attach input event listener when page loads for lesson title
     document.querySelectorAll('.TitleLessonInput').forEach(input => {
         input.addEventListener('input', function() {
             if (this.value !== '') {
                 this.style.border = '';
                 this.classList.remove('empty-input'); // Remove class
             }
         });
     });

     // Attach input event listener when page loads for author
     document.querySelectorAll('.AutorInput').forEach(input => {
         input.addEventListener('input', function() {
             if (this.value !== '') {
                 this.style.border = '';
                 this.classList.remove('empty-input'); // Remove class
             }
         });
     });

     // Attach input event listener when page loads for task
     document.querySelectorAll('.TaskInput').forEach(input => {
         input.addEventListener('input', function() {
             if (this.value !== '') {
                 this.style.border = '';
                 this.classList.remove('empty-input'); // Remove class
             }
         });
     });

     // Attach input event listener when page loads for Introduction
     document.querySelectorAll('.IntroductionInput.Introd').forEach(input => {
         input.addEventListener('input', function() {
             if (this.value !== '') {
                 this.style.border = '';
                 this.classList.remove('empty-input'); // Remove class
             }
         });
     });

     // Attach input event listener when page loads for description
     document.querySelectorAll('.DescriptionInput.Introd').forEach(textarea => {
         textarea.addEventListener('input', function() {
             if (this.value !== '') {
                 this.style.border = '';
                 this.classList.remove('empty-input'); // Remove class
             }
         });
     });

     // Attach input event listener when page loads for input file
     document.querySelectorAll('.IntroductionInputFile.Introd').forEach(input => {
         input.addEventListener('input', function() {
             if (this.value !== '') {
                 this.style.border = '';
                 this.classList.remove('empty-input'); // Remove class
             }
         });
     });

     // Attach input event listener when page loads for question
     document.querySelectorAll('.questionInput.Introd').forEach(input => {
         input.addEventListener('input', function() {
             if (this.value !== '') {
                 this.style.border = '';
                 this.classList.remove('empty-input'); // Remove class
             }
         });
     });


     // Attach input event listener when page loads for Introduction
     document.querySelectorAll('.IntroductionInputFile.Treat').forEach(input => {
         input.addEventListener('input', function() {
             if (this.value !== '') {
                 this.style.border = '';
                 this.classList.remove('empty-input'); // Remove class
             }
         });
     });

 });


 function reCounterDivs() {
     // Get all new divs
     var section_divs = document.querySelectorAll('.section');
     // Reset the global counter
     divCounter = 0;
     // Re-count each div
     section_divs.forEach(function(div, index) {
         divCounter++;
         var caption = div.querySelector('.caption');
         caption.textContent = 'Dział: ' + divCounter;
     });

     // Show or hide the new button based on the counter
     var SendButton = document.getElementById('SendButton');
     if (divCounter >= 1) {
         SendButton.style.display = 'block';
     } else {
         SendButton.style.display = 'none';
     }
 }


 function renumerateLessons(section) {
     var lessons = section.getElementsByClassName('lesson');
     for (var i = 0; i < lessons.length; i++) {
         var lesson_caption = lessons[i].getElementsByClassName('lesson-text')[0]; // Select the lesson text
         lesson_caption.textContent = 'Lekcja: ' + (i + 1);
     }
 }

 function renumerateTasks(lesson) {

     var tasks = lesson.getElementsByClassName('task');
     for (var i = 0; i < tasks.length; i++) {
         var task_text = tasks[i].getElementsByClassName('task-text')[0]; // Select the task text
         var task_number = task_text.textContent.charAt(0); // Get the current task number
         var new_task_number = String.fromCharCode(65 + i); // Convert the task number to a letter using the ASCII code
         task_text.textContent = task_text.textContent.replace(task_number, new_task_number); // Replace the current task number with the new one
     }
 }

 function renumerateIntroduction(task) {
     var introductions = task.getElementsByClassName('introduction-text');
     for (var i = 0; i < introductions.length; i++) {
         introductions[i].textContent = (i + 1);
     }
 }

 function renumerateQuestions(introduction) {
     var questions = introduction.getElementsByClassName('question');
     for (var i = 0; i < questions.length; i++) {
         var questionNumber = questions[i].getElementsByClassName('question-number')[0]; // Get the specific element that contains the question number
         questionNumber.textContent = 'Pytanie: ' + (i + 1);
     }
 }


 var SendButton = document.getElementById('SendButton');

 SendButton.addEventListener('click', function() {
     var inputs = document.querySelectorAll('.TitleSectionInput');
     var allFilled = true;

     inputs.forEach(function(input, index) {
         if (input.value === '') {
             input.style.border = '1px solid red';
             input.placeholder = 'Proszę uzupełnić tytuł działu przed wysłaniem danych';
             input.classList.add('empty-input'); // Add class
             allFilled = false;
         }
     });

     //Do the same for lessons
     var lessons = document.querySelectorAll('.TitleLessonInput');
     lessons.forEach(function(input, index) {
         if (input.value === '') {
             input.style.border = '1px solid red';
             input.placeholder = 'Proszę uzupełnić tytuł lekcji przed wysłaniem danych';
             input.classList.add('empty-input'); // Add class
             allFilled = false;
         }
     });

     //Do the same for authors
     var authors = document.querySelectorAll('.AutorInput');
     authors.forEach(function(input, index) {
         if (input.value === '') {
             input.style.border = '1px solid red';
             input.placeholder = 'Proszę uzupełnić autora przed wysłaniem danych';
             input.classList.add('empty-input'); // Add class
             allFilled = false;
         }
     });


     //Do the same for tasks
     var authors = document.querySelectorAll('.TaskInput');
     authors.forEach(function(input, index) {
         if (input.value === '') {
             input.style.border = '1px solid red';
             input.placeholder = 'Proszę uzupełnić treść zadania przed wysłaniem danych, np. co widzisz? co usłyszałeś? co opiszesz? itp';
             input.classList.add('empty-input'); // Add class
             allFilled = false;
         }
     });

     //Do the same for introduction title
     var authors = document.querySelectorAll('.IntroductionInput.Introd');
     authors.forEach(function(input, index) {
         if (input.value === '') {
             input.style.border = '1px solid red';
             input.placeholder = 'Proszę uzupełnić tytuł wprowadzenia przed wysłaniem danych np. wprowadzenie, zaznacz wszystkie prawiłowe odpowiedzi itp.';
             input.classList.add('empty-input'); // Add class
             allFilled = false;
         }
     });


     //Do the same for File
     var authors = document.querySelectorAll('.IntroductionInputFile.Introd');
     authors.forEach(function(input, index) {
         if (input.value === '') {
             input.style.border = '1px solid red';
             input.placeholder = 'Proszę wstawić film przed wysłaniem danych';
             input.classList.add('empty-input'); // Add class
             allFilled = false;
         }
     });

     //Do the same for question
     var authors = document.querySelectorAll('.questionInput.Introd');
     authors.forEach(function(input, index) {
         if (input.value === '') {
             input.style.border = '1px solid red';
             input.placeholder = 'Proszę uzupełnić treść pytań przed wysłaniem danych';
             input.classList.add('empty-input'); // Add class
             allFilled = false;
         }
     });

     //Do the same for description
     var authors = document.querySelectorAll('.DescriptionInput.Treat');
     authors.forEach(function(input, index) {
         if (input.value === '') {
             input.style.border = '1px solid red';
             input.placeholder = 'Proszę uzupełnić opis do filmu w omówieniu przed wysłaniem danych';
             input.classList.add('empty-input'); // Add class
             allFilled = false;
         }
     });

     //Do the same for introduction title
     var authors = document.querySelectorAll('.IntroductionInputFile.Treat');
     authors.forEach(function(input, index) {
         if (input.value === '') {
             input.style.border = '1px solid red';
             input.placeholder = 'Proszę wstaw film do omówienia przed wysłaniem danych';
             input.classList.add('empty-input'); // Add class
             allFilled = false;
         }
     });



     if (!allFilled) {
         return;
     }


     let formData = new FormData();

     const sectionsData = [];
     // Get all sections
     var sections = document.querySelectorAll('.section');
     for (let i = 0; i < sections.length; i++) {
         let title_of_section = sections[i].querySelector('.TitleSectionInput')?.value;
         let author_of_section = sections[i].querySelector('.AutorInput')?.value;
         var lessonElements = sections[i].querySelectorAll(`.lesson`);
         const lessons = [];
         for (let j = 0; j < lessonElements.length; j++) {
             let title_of_lesson = lessonElements[j].querySelector('.TitleLessonInput')?.value;
             var taskElements = lessonElements[j].querySelectorAll(`.task`);
             const tasks = [];
             for (let k = 0; k < taskElements.length; k++) {
                 let title_of_task = taskElements[k].querySelector('.TaskInput')?.value;
                 var introductionElements = taskElements[k].querySelectorAll(`.introduction`);
                 const introductions = [];
                 let questions = [];

                 for (let l = 0; l < introductionElements.length; l++) {
                     let title_of_introduction;
                     let title_of_description;
                     let description;
                     let file;
                     let path_file;
                     var questionElements;

                     //check if the current div element not include the class description
                     if (!introductionElements[l].classList.contains('description')) {
                         title_of_introduction = introductionElements[l].querySelector('.IntroductionInput')?.value;
                         description = introductionElements[l].querySelector('.DescriptionInput')?.value;
                         file = introductionElements[l].querySelector('.IntroductionInputFile')?.files[0];
                         if (file) {
                             // Append the file to formData with a unique key
                             formData.append(`video_film_${i}_${j}_${k}_${l}`, file);
                         }
                         path_file = file ? file.name : ''; // Get the file name
                         questionElements = introductionElements[l].querySelectorAll(`.question`);

                         questions = [];
                         for (let m = 0; m < questionElements.length; m++) {
                             let question = questionElements[m].querySelector('.questionInput')?.value;
                             let correct = questionElements[m].querySelector('.questionCorrectSelect')?.value;
                             let active = questionElements[m].querySelector('.questionActiveSelect')?.value;
                             questions.push({
                                 question,
                                 correct,
                                 active
                             });
                         }
                         introductions.push({
                             title_of_introduction,
                             description,
                             path_file,
                             questions
                         });
                     }

                     if (introductionElements[l].classList.contains('description')) {
                         title_of_description = "omówienie";
                         description = introductionElements[l].querySelector('.DescriptionInput')?.value;
                         file = introductionElements[l].querySelector('.IntroductionInputFile')?.files[0];
                         if (file) {
                             // Append the file to formData with a unique key
                             formData.append(`video_film_${i}_${j}_${k}_${l}`, file);
                         }
                         path_file = file ? file.name : ''; // Get the file name
                         introductions.push({
                             title_of_description,
                             description,
                             path_file,
                             questions
                         });
                     }
                 }
                 tasks.push({
                     title_of_task,
                     introductions
                 }); // Include introductions array here
             }
             lessons.push({
                 title_of_lesson,
                 tasks
             });
         }
         sectionsData.push({
             title_of_section,
             author_of_section,
             lessons
         });
     }
     formData.append('sections', JSON.stringify(sectionsData));

     fetch('/admin/add', {
             method: 'POST',
             body: formData
         })
         .then(response => {
             if (response.headers.get('content-type').includes('application/json')) {
                 return response.json();
             } else {
                 return response.text().then(text => {
                     throw new Error(`Expected JSON, got ${text}`);
                 });
             }
         })
         .then(data => {
             //redirect to the edit page
             window.location.href = '/admin/edit';
         })
         .catch((error) => {
             console.error(error);
             alert('An error occurred while saving the data. Please try again. If the problem persists, please contact the administrator.')
         });
 });