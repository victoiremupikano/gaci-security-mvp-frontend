import jsPDF from "jspdf";
export default function makePDF(id: string, filename: string) {
  const report = new jsPDF("portrait", "pt", 'a4');
     let doc = document.querySelector("#"+id);
     report.setFontSize(9)
  if (doc) {
    doc.setAttribute("style", 'padding:15px;width:595px;height:842px;')
    report.html(doc as HTMLElement).then(() => {
             let name = ""
             if (filename.includes(".pdf")) {
               name = filename
             } else {
                 name = filename+".pdf"
           }
            report.save(name);
       });
     } else {
         throw new Error("JsPDF provided id is undefined")
     }
}