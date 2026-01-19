import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

const ProfessionalTemplate = ({ data, accentColor }) => {
	const formatDate = (dateStr) => {
		if (!dateStr) return "";
		const [year, month] = dateStr.split("-");
		const monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"];
		return `${monthNames[parseInt(month) - 1]} ${year}`;
	};

	return (
		<div className="max-w-4xl mx-auto bg-white text-gray-800 p-8" style={{ fontFamily: 'Arial, sans-serif' }}>
			{/* Header */}
			<header className="mb-6 pb-4 flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold mb-3 text-gray-900 text-center" style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>
					{data.personal_info?.full_name || "Your Name"}
				</h1>

				<div className="flex flex-wrap gap-4 text-sm text-gray-700 justify-center items-center" style={{ fontSize: '12px', lineHeight: '1.4' }}>
					{data.personal_info?.location && (
						<div className="flex items-center gap-1.5">
							<MapPin className="size-4" style={{ width: '14px', height: '14px' }} />
							<span>{data.personal_info.location}</span>
						</div>
					)}
					{data.personal_info?.email && (
						<div className="flex items-center gap-1.5">
							<Mail className="size-4" style={{ width: '14px', height: '14px' }} />
							<span>{data.personal_info.email}</span>
						</div>
					)}
					{data.personal_info?.phone && (
						<div className="flex items-center gap-1.5">
							<Phone className="size-4" style={{ width: '14px', height: '14px' }} />
							<span>{data.personal_info.phone}</span>
						</div>
					)}
					{data.personal_info?.linkedin && (
						<div className="flex items-center gap-1.5">
							<Linkedin className="size-4" style={{ width: '14px', height: '14px' }} />
							<span>
								{
									data.personal_info.linkedin.includes("linkedin.com") 
										? data.personal_info.linkedin.split("linkedin.com")[1] || data.personal_info.linkedin
										: data.personal_info.linkedin.startsWith("www.") || data.personal_info.linkedin.startsWith("linkedin.com")
										? data.personal_info.linkedin
										: `www.linkedin/${data.personal_info.linkedin}`
								}
							</span>
						</div>
					)}
				</div>
				{/* Double line separator */}
				<div className="w-full mt-4" style={{ marginTop: '16px' }}>
					<div className="border-t border-black" style={{ borderTop: '1px solid black' }}></div>
					<div className="border-t border-black mt-1" style={{ borderTop: '1px solid black', marginTop: '4px' }}></div>
				</div>
			</header>

			{/* Professional Summary */}
			{data.professional_summary && (
				<section className="mb-6 pt-4" style={{ paddingTop: '16px' }}>
					<h2 className="text-lg font-bold mb-2 text-gray-900 uppercase" style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '8px' }}>
						SUMMARY
					</h2>
					<p className="text-gray-700 leading-relaxed text-sm" style={{ fontSize: '12px', lineHeight: '1.5' }}>
						{data.professional_summary}
					</p>
				</section>
			)}

			{/* Experience */}
			{data.experience && data.experience.length > 0 && (
				<section className="mb-6 border-t border-black pt-4" style={{ borderTop: '1px solid black', paddingTop: '16px' }}>
					<h2 className="text-lg font-bold mb-3 text-gray-900 uppercase" style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '12px' }}>
						EXPERIENCE
					</h2>

					<div className="space-y-4">
						{data.experience.map((exp, index) => (
							<div key={index} className="mb-4">
								<div className="mb-2">
									<h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
										{exp.position}
									</h3>
									<div className="text-sm text-gray-700 mb-0.5" style={{ fontSize: '12px' }}>
										<span className="font-bold">Company:</span> {exp.company}
									</div>
									<div className="text-sm text-gray-600 mb-1" style={{ fontSize: '12px' }}>
										<span className="font-bold">Dates:</span> {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
									</div>
								</div>
								{exp.description && (
									<div className="text-gray-700 text-sm leading-relaxed ml-4" style={{ fontSize: '12px', lineHeight: '1.5', marginLeft: '16px' }}>
										{exp.description.split('\n').map((line, i) => (
											<div key={i} className="mb-0.5" style={{ marginBottom: '2px' }}>
												{line.trim() && (
													<div className="flex items-start gap-1.5">
														<span className="text-gray-900" style={{ fontSize: '12px' }}>•</span>
														<span className="flex-1">{line.trim()}</span>
													</div>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</section>
			)}

			{/* Projects */}
			{data.project && data.project.length > 0 && (
				<section className="mb-6 border-t border-black pt-4" style={{ borderTop: '1px solid black', paddingTop: '16px' }}>
					<h2 className="text-lg font-bold mb-3 text-gray-900 uppercase" style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '12px' }}>
						PROJECT
					</h2>

					<div className="space-y-4">
						{data.project.map((proj, index) => (
							<div key={index} className="mb-4">
								<div className="mb-2">
									<h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
										{index + 1}. {proj.name}
									</h3>
									{proj.type && (
										<div className="text-sm text-gray-700 mb-1" style={{ fontSize: '12px' }}>
											<span className="font-bold">Company/Client:</span> {proj.type}
										</div>
									)}
								</div>
								{proj.description && (
									<div className="text-gray-700 text-sm leading-relaxed ml-4" style={{ fontSize: '12px', lineHeight: '1.5', marginLeft: '16px' }}>
										{proj.description.split('\n').map((line, i) => (
											<div key={i} className="mb-0.5" style={{ marginBottom: '2px' }}>
												{line.trim() && (
													<div className="flex items-start gap-1.5">
														<span className="text-gray-900" style={{ fontSize: '12px' }}>•</span>
														<span className="flex-1">{line.trim()}</span>
													</div>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</section>
			)}

			{/* Education */}
			{data.education && data.education.length > 0 && (
				<section className="mb-6 border-t border-black pt-4" style={{ borderTop: '1px solid black', paddingTop: '16px' }}>
					<h2 className="text-lg font-bold mb-3 text-gray-900 uppercase" style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '12px' }}>
						EDUCATION
					</h2>

					<div className="space-y-3">
						{data.education.map((edu, index) => (
							<div key={index}>
								<h3 className="font-bold text-gray-900 text-sm mb-0.5" style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '2px' }}>
									{edu.degree} {edu.field && `in ${edu.field}`}
								</h3>
								<p className="text-gray-700 text-sm" style={{ fontSize: '12px' }}>{edu.institution}</p>
							</div>
						))}
					</div>
				</section>
			)}

			{/* Skills */}
			{data.skills && data.skills.length > 0 && (
				<section className="mb-6 border-t border-black pt-4" style={{ borderTop: '1px solid black', paddingTop: '16px' }}>
					<h2 className="text-lg font-bold mb-3 text-gray-900 uppercase" style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '12px' }}>
						SKILLS
					</h2>

					<div className="flex flex-wrap gap-2">
						{data.skills.map((skill, index) => (
							<span
								key={index}
								className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded"
								style={{ fontSize: '11px' }}
							>
								{skill}
							</span>
						))}
					</div>
				</section>
			)}
		</div>
	);
};

export default ProfessionalTemplate;
