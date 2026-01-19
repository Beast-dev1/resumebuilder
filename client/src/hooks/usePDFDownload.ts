import { useState, RefObject } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { ResumeData } from '../types/resume'

export const usePDFDownload = (previewRef: RefObject<HTMLDivElement>, resumeData: ResumeData) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    if (!previewRef.current) {
      alert('Preview not available. Please wait for the resume to load.')
      return
    }

    try {
      setIsDownloading(true)
      const container = previewRef.current
      
      // A4 dimensions in pixels at 96 DPI
      // A4 = 210mm × 297mm = 793.7px × 1122.5px (at 96 DPI)
      const A4_WIDTH_PX = 794 // A4 width in pixels
      
      // Find the actual content element (the div inside ResumePreview with template)
      const contentElement = (container?.querySelector('div > div') || container) as HTMLElement
      
      // Store original styles for container and content
      const originalContainerWidth = container!.style.width
      const originalContainerMinWidth = container!.style.minWidth
      const originalContainerMaxWidth = container!.style.maxWidth
      const originalContainerOverflow = container!.style.overflow
      const originalContainerPosition = container!.style.position
      const originalContainerLeft = container!.style.left
      const originalContainerZIndex = container!.style.zIndex
      
      const originalContentWidth = contentElement.style.width
      const originalContentMinWidth = contentElement.style.minWidth
      const originalContentMaxWidth = contentElement.style.maxWidth
      
      // Temporarily set both container and content to A4 width for capture
      container!.style.width = `${A4_WIDTH_PX}px`
      container!.style.minWidth = `${A4_WIDTH_PX}px`
      container!.style.maxWidth = `${A4_WIDTH_PX}px`
      container!.style.overflow = 'visible'
      container!.style.position = 'fixed'
      container!.style.left = '-9999px'
      container!.style.zIndex = '-9999'
      
      // Set content element width as well
      contentElement.style.width = `${A4_WIDTH_PX}px`
      contentElement.style.minWidth = `${A4_WIDTH_PX}px`
      contentElement.style.maxWidth = `${A4_WIDTH_PX}px`
      
      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 200))

      // Create canvas from the preview element at A4 width
      const canvas = await html2canvas(contentElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: A4_WIDTH_PX,
      })

      // Restore original styles
      container!.style.width = originalContainerWidth
      container!.style.minWidth = originalContainerMinWidth
      container!.style.maxWidth = originalContainerMaxWidth
      container!.style.overflow = originalContainerOverflow
      container!.style.position = originalContainerPosition
      container!.style.left = originalContainerLeft
      container!.style.zIndex = originalContainerZIndex
      
      contentElement.style.width = originalContentWidth
      contentElement.style.minWidth = originalContentMinWidth
      contentElement.style.maxWidth = originalContentMaxWidth

      // Calculate dimensions for PDF
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      let position = 0

      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png')

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if content exceeds one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Generate filename
      const name = resumeData.personal_info.full_name || 'Resume'
      const filename = `${name.replace(/\s+/g, '_')}_Resume.pdf`

      // Download PDF
      pdf.save(filename)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return { isDownloading, handleDownloadPDF }
}

