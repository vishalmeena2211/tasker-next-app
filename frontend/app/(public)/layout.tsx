import { SiteFooter } from "@/components/comman/site-footer";
import Navbar from "@/components/comman/Navbar";

export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<main className='mt-[3.5rem] min-h-screen'>{children}</main>
			<SiteFooter />
		</>
	);
}
