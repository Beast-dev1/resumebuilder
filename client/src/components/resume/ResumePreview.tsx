// @ts-ignore - JSX template files
import ClassicTemplate from '../../assets/templates/ClassicTemplate'
// @ts-ignore - JSX template files
import MinimalTemplate from '../../assets/templates/MinimalTemplate'
// @ts-ignore - JSX template files
import ModernTemplate from '../../assets/templates/ModernTemplate'
// @ts-ignore - JSX template files
import MinimalImageTemplate from '../../assets/templates/MinimalImageTemplate'

interface ResumePreviewProps {
  data: any
  templateId: string
  accentColor: string
}

const templateMap: Record<string, React.ComponentType<any>> = {
  classic: ClassicTemplate as React.ComponentType<any>,
  minimal: MinimalTemplate as React.ComponentType<any>,
  modern: ModernTemplate as React.ComponentType<any>,
  'minimal-image': MinimalImageTemplate as React.ComponentType<any>,
}

function ResumePreview({ data, templateId, accentColor }: ResumePreviewProps) {
  const TemplateComponent = templateMap[templateId] || ClassicTemplate

  if (!TemplateComponent) {
    return (
      <div className="p-8 text-center text-gray-500">
        Template not found: {templateId}
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <TemplateComponent data={data} accentColor={accentColor} />
    </div>
  )
}

export default ResumePreview

