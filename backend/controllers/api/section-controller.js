const Section=require('../../app/db/models/section')

class SectionController {
    async getAllSections(req,res,next){
        try {
            const sections = await Section.find();
            res.json(sections);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new SectionController();