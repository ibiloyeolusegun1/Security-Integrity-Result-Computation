const PDFDocument = require("pdfkit");

const generateTranscriptPDF = (student, transcript, cgpa) => {
  const doc = new PDFDocument();

  const buffers = [];

  doc.on("data", buffers.push.bind(buffers));

  return new Promise((resolve) => {
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);

      resolve(pdfData);
    });

    doc.fontSize(18).text("OFFICIAL TRANSCRIPT");

    doc.moveDown();

    doc.text(`Name: ${student.fullname}`);

    doc.text(`Matric No: ${student.matric_no}`);

    doc.text(`Level: ${student.level}`);

    doc.moveDown();

    transcript.forEach((course) => {
      doc.text(
        `${course.course_code}
             ${course.course_title}
             Grade:${course.grade}
             Unit:${course.unit}`,
      );
    });

    doc.moveDown();

    doc.text(`CGPA: ${cgpa}`);

    doc.text(`Integrity Status: VERIFIED`);

    doc.end();
  });
};

module.exports = generateTranscriptPDF;
