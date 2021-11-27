const Work = require('../models/work');

exports.createWork = async (req, res) => {
    const newWork = new Work(req.body);
    const workSaved = await newWork.save();
    res.status(201).json(userSaved);
}

exports.getWorks = async (req, res) => {
    const works = await Work.find();
    res.status(200).json(works);
}

exports.getWork = async (req, res) => {
    const work = await Work.findById(req.params.workId);
    res.status(200).json(work);

}

exports.updateWork = async (req, res) => {
    await Work.findByIdAndUpdate(req.params.workId, req.body, {
        new: true
    })
    res.status(204).json();
}

exports.deleteWork = async (req, res) => {
    await Work.findByIdAndDelete(req.params.workId);
    res.status(204).json();
}