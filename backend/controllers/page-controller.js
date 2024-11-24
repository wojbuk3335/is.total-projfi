const Section = require('../app/db/models/section')

class basicController {
  showHome(req, res, next) {
    try {
      res.render('pages/home',{
        user:req.session.user
      });
    } catch (err) {
      next(err);
    }
  }

  showAdd(req, res, next) {
    try {
      res.render('pages/add');
    } catch (err) {
      next(err);
    }
  }

  ShowFilm(req, res, next) {
    try {
      res.render('pages/video');
    } catch (err) {
      next(err);
    }
  }


  async AddData(req, res, next) {
    console.log('Received request to add sections');
    try {
      const sectionsData = JSON.parse(req.body.sections);
  
      // Save each section to the database
      const savedSections = [];
      for (let i = 0; i < sectionsData.length; i++) {
        const sectionData = sectionsData[i];
  
        // Iterate over the lessons array
        for (let j = 0; j < sectionData.lessons.length; j++) {
          const lesson = sectionData.lessons[j];
  
          // Iterate over the tasks array
          for (let k = 0; k < lesson.tasks.length; k++) {
            const task = lesson.tasks[k];
  
            // Iterate over the introductions array
            for (let l = 0; l < task.introductions.length; l++) {
              const introduction = task.introductions[l];
  
              // Check if the fileNames array has a file at the current index
              for(let n = 0; n < task.introductions.length; n++){
                const path_file = task.introductions[n].path_file;
              }
  
              // If questions array exists, iterate over it
              if (introduction.questions) {
                for (let m = 0; m < introduction.questions.length; m++) {
                  const question = introduction.questions[m];
  
                  // Perform any necessary operations on the question here
                }
              }
            }
          }
        }
        console.log(JSON.stringify(sectionsData, null, 2));
        const section = new Section(sectionData);
        await section.save();
        savedSections.push(section);
      }
  
      // Send a response back to the client
      res.status(201).json({
        message: 'Sections added successfully',
        sections: savedSections,
      });
    } catch (err) {
      // If there's an error, send a response with the error message
      res.status(500).json({
        message: 'An error occurred while adding sections',
        error: err.message,
      });
    }
  }

  async ShowEdit(req, res, next) {
    try {
      const sections = await Section.find();
      res.render('pages/edit', { sections });
    } catch (err) {
      next(err);
    }
  }

  async UpdateSection(req, res, next) {
    try {
        const { id } = req.params;
        console.log(`Received request to update section with id: ${id}`);
        
        const section = await Section.findById(id);
        if (!section) {
            console.log('Section not found');
            return res.status(404).json({
                message: 'Section not found',
            });
        }

        const sectionsData = JSON.parse(req.body.sections);
        console.log('Parsed sections data:', JSON.stringify(sectionsData, null, 2));

        // Update each section in the database
        const savedSections = [];
        for (let i = 0; i < sectionsData.length; i++) {
            const sectionData = sectionsData[i];

            // Iterate over the lessons array
            for (let j = 0; j < sectionData.lessons.length; j++) {
                const lesson = sectionData.lessons[j];

                // Iterate over the tasks array
                for (let k = 0; k < lesson.tasks.length; k++) {
                    const task = lesson.tasks[k];

                    // Iterate over the introductions array
                    for (let l = 0; l < task.introductions.length; l++) {
                        const introduction = task.introductions[l];

                        // Check if the fileNames array has a file at the current index
                        for (let n = 0; n < task.introductions.length; n++) {
                            const path_file = task.introductions[n].path_file;
                        }

                        // If questions array exists, iterate over it
                        if (introduction.questions) {
                            for (let m = 0; m < introduction.questions.length; m++) {
                                const question = introduction.questions[m];

                                // Perform any necessary operations on the question here
                            }
                        }
                    }
                }
            }

            // Assign the new fields to the section
            section.status_of_section = sectionData.status_of_section;
            section.title_of_section = sectionData.title_of_section;
            section.author_of_section = sectionData.author_of_section;

            // Update lessons with the new fields
            section.lessons = sectionData.lessons.map(lessonData => ({
                status_of_lesson: lessonData.status_of_lesson,
                title_of_lesson: lessonData.title_of_lesson,
                tasks: lessonData.tasks
            }));

            await section.save();
            savedSections.push(section);
        }

        // Send a response back to the client
        res.status(200).json({
            message: 'Sections updated successfully',
            sections: savedSections,
        });
    } catch (err) {
        console.error('Error occurred while updating sections:', err);
        // If there's an error, send a response with the error message
        res.status(500).json({
            message: 'An error occurred while updating sections',
            error: err.message,
        });
    }
}

  async EditSection(req, res, next) {
    try {
      const { id } = req.params;
      const section = await Section.findById(id);
      res.render('pages/editSection', { section });
    } catch (err) {
      next(err);
    }
  }

  async DeleteData(req, res, next) {
    try {
      const { id } = req.params;
      await Section.findByIdAndDelete(id);
      res.redirect('/admin/edit');
    } catch (err) {
      next(err);
    }
  }

  showNotFound(req, res) {
    res.status(404).render('pages/notFound', {
      title: 'Page Not Found',
              layout: 'layouts/404'
    });
  }
}

module.exports = new basicController();