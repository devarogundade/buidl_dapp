import { PDFDocument, rgb, degrees } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'

const Certificate = {
    generateDocument: async function(name) {
        const existingPdfBytes = await fetch("/documents/certificate.pdf").then((res) => res.arrayBuffer())

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        pdfDoc.registerFontkit(fontkit)

        //get font
        const fontBytes = await fetch("/fonts/clash.ttf").then((res) => res.arrayBuffer())

        // Embed our custom font in the document
        const fontFamily = await pdfDoc.embedFont(fontBytes)

        // Get the first page of the document
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]

        // Draw a string of text diagonally across the first page
        firstPage.drawText(name, {
            x: 300,
            y: 270,
            size: 58,
            font: fontFamily,
            color: rgb(0.2, 0.84, 0.67),
        })

        // Serialize the PDFDocument to bytes (a Uint8Array)
        return await pdfDoc.saveAsBase64({ dataUri: true })
    }
}

export default Certificate
