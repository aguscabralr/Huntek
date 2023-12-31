import CompanyForm from "@/app/components/company";
import Image from "next/image";
import Link from "next/link";

const CompanySignup = () => {
	return (
		<section className="h-screen text-sec darkrightgrad flex flex-col lg:flex-row justify-evenly items-center">
			<Link href="/signup">
				<Image
					src={"/utils/back.svg"}
					height={1}
					width={1}
					alt="backArrow"
					loading={"eager"}
					className="btn btn-ghost btn-circle absolute left-2 top-2 w-[50px] h-[50px] p-2"
				/>
			</Link>
			<article className="w-1/2 h-1/4 lg:w-[500px] lg:h-[500px] flex flex-col justify-center items-center mt-6 lg:mt-0">
				<div className="w-11/12 h-2/3 bg-HKlogo bg-contain bg-center bg-no-repeat"></div>
				<h1 className="text-3xl lg:text-5xl">Registrarme</h1>
			</article>
			<CompanyForm />
		</section>
	);
};

export default CompanySignup;
