"use client"
import { cn } from "@/lib/utils";
import {
	IconCheck,
	IconCalendar,
	IconBell,
	IconUsers,
	IconFileText,
	IconChartPie,
	IconSettings,
	IconArchive,
} from "@tabler/icons-react";

export function FeaturesSection() {
	const features = [
		{
			title: "Task Creation",
			description:
				"Easily create tasks with detailed descriptions, due dates, and priority levels.",
			icon: <IconCheck />,
		},
		{
			title: "Calendar Integration",
			description:
				"Sync tasks with your calendar to keep track of deadlines and important dates.",
			icon: <IconCalendar />,
		},
		{
			title: "Notifications & Reminders",
			description:
				"Receive timely notifications and reminders to ensure you never miss a task.",
			icon: <IconBell />,
		},
		{
			title: "Team Collaboration",
			description:
				"Collaborate with team members by assigning tasks and tracking progress.",
			icon: <IconUsers />,
		},
		{
			title: "File Attachments",
			description:
				"Attach files and documents to tasks for easy access and reference.",
			icon: <IconFileText />,
		},
		{
			title: "Progress Tracking",
			description:
				"Monitor task progress with visual charts and reports to stay on top of your workload.",
			icon: <IconChartPie />,
		},
		{
			title: "Customizable Settings",
			description:
				"Personalize your task management experience with customizable settings and preferences.",
			icon: <IconSettings />,
		},
		{
			title: "Task Archiving",
			description:
				"Archive completed tasks to keep your workspace organized and clutter-free.",
			icon: <IconArchive />,
		},
	];
	return (
		<section className='my-20 py-14'>
			<div className='flex flex-col items-center gap-2 space-y-4 mx-auto my-14 md:px-8r max-w-[63rem] text-center'>
				<h1 className='font-bold text-6xl'>Tasker Features</h1>
				<span className='text-gray-500 text-xl'>
					Enhance productivity, streamline task management, and collaborate effectively.
					Tasker provides a comprehensive platform to manage your tasks and projects effortlessly.
				</span>
			</div>
			<div className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto py-10 max-w-7xl'>
				{features.map((feature, index) => (
					<Feature key={feature.title} {...feature} index={index} />
				))}
			</div>
		</section >
	);
}

const Feature = ({
	title,
	description,
	icon,
	index,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}) => {
	return (
		<div
			className={cn(
				"flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
				(index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
				index < 4 && "lg:border-b dark:border-neutral-800"
			)}
		>
			{index < 4 && (
				<div className='absolute inset-0 bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100 w-full h-full transition duration-200 pointer-events-none' />
			)}
			{index >= 4 && (
				<div className='absolute inset-0 bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100 w-full h-full transition duration-200 pointer-events-none' />
			)}
			<div className='relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400'>
				{icon}
			</div>
			<div className='relative z-10 mb-2 px-10 font-bold text-lg'>
				<div className='group-hover/feature:h-8 group-hover/feature:bg-purple-500 left-0 absolute inset-y-0 bg-neutral-300 dark:bg-neutral-700 rounded-tr-full rounded-br-full w-1 h-6 origin-center transition-all duration-200' />
				<span className='inline-block text-neutral-800 dark:text-neutral-100 transition group-hover/feature:translate-x-2 duration-200'>
					{title}
				</span>
			</div>
			<p className='relative z-10 px-10 max-w-xs text-neutral-600 text-sm dark:text-neutral-300'>
				{description}
			</p>
		</div>
	);
};
