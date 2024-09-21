import { GraduationCap } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
	return (
		<footer className='w-full'>
			<div className='mx-auto xl:pb-2 w-full max-w-screen-xl'>
				<div className='flex justify-between items-center gap-4 px-8 py-16'>
					<div className='flex items-center gap-4'>
						<Link className='flex items-center text-md' href='/'>
							<GraduationCap className='w-6 h-6 text-purple-600/70 dark:text-purple-400/70' />
							<span className='ml-2'>Tasker</span>
						</Link>
					</div>
					<div className='flex items-center gap-4'>
						<p className='max-w-xs'>
							Made by Vishal Meena. Follow me on
							<a href='https://github.com/vishalmeena2211' className='text-purple-500'> GitHub</a> and
							<a href='https://twitter.com/vishalmeena111' className='text-purple-500'> Twitter</a>.
						</p>
					</div>
				</div>

				<div className='flex justify-between items-center gap-2 border-t border-neutral-700/20 px-8 py-4'>
					<span className='text-gray-500 text-sm dark:text-gray-400'>
						Copyright © {new Date().getFullYear()}{" "}
						<Link href='/' className='cursor-pointer'>
							Tasker
						</Link>
						. All Rights Reserved.
					</span>
				</div>
			</div>
		</footer>
	);
}
