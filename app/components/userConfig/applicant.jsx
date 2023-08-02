"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useGetInfoUserQuery } from "@/app/globalstore/services/user-info/useInfoUser";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { usePostNewFilesMutation } from "@/app/globalstore/services/user-files/useNewFiles";
import { usePostResumeMutation } from "@/app/globalstore/services/user-profile/useResume";
import { useGetFilesQuery } from "@/app/globalstore/services/user-files/useFiles";
import Genres from "../formApplicant/genres";
import Country from "../formApplicant/country";
import OptionsCity from "../formApplicant/optionsCity";
import Phone from "../formApplicant/phone";
import Birthdate from "../formApplicant/birthdate";
import Academic from "../formApplicant/academic";
import Studies from "../formApplicant/studies";
import Career from "../formApplicant/career";
import Languages from "../formApplicant/language";
import Hobbies from "../formApplicant/hobbies";
import Reubication from "../formApplicant/reubication";
import Profession from "../formApplicant/professions";
import Experience from "../formApplicant/yearsOfExperience";
import Income from "../formApplicant/income";
import FormOfWork from "../formApplicant/formOfWork";
import Availability from "../formApplicant/availability";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const ApplicantConfig = () => {
	const [postResume] = usePostResumeMutation();
	const [postNewFiles] = usePostNewFilesMutation();
	const [cvFile, setCvFile] = useState(null);
	const [profilePictureFile, setProfilePictureFile] = useState(null);
	const { data: userInfo, isLoading } = useGetInfoUserQuery();
	const firstName = userInfo?.first_name.split(" ")[0];
	const lastName = userInfo?.last_name.split(" ")[0];
	const { data: filesInfo, refetch } = useGetFilesQuery(userInfo?.id);
	const handleCvChange = (event) => {
		setCvFile(event.target.files[0]);
	};
	const handleProfilePictureChange = (event) => {
		setProfilePictureFile(event.target.files[0]);
	};
	const handleUpload = async () => {
		const formData = new FormData();
		formData.append("cv", cvFile);
		formData.append("profile_picture", profilePictureFile);
		try {
			const response = await postNewFiles({ user_id: userInfo?.id, data: formData }).unwrap();
			console.log("Files uploaded successfully!");
			refetch();
		} catch (error) {
			console.error("Error uploading files:", error);
		}
	};

	const [userData, setUserData] = useState({
		mail: userInfo?.email,

		phone: "",
		birthdate: "",
		genre: "",
		country: "",

		studies: "",
		university: "",
		degree: "",

		city: "",
		languages: [],
		hobbies: [],

		reubication: "",
		profession: [],
		years_xp: "",

		income: "",
		availability: "",
		form_of_work: "",
	});

	const handleChange = (event) => {
		event.preventDefault();
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await postResume(userData).unwrap();
		} catch (error) {
			//ERROR
		}
	};

	const [currentQuestion, setCurrentQuestion] = useState("Q1");

	const nextQ = () => {
		if (currentQuestion === "Q1") {
			setCurrentQuestion("Q2");
		}
		if (currentQuestion === "Q2") {
			setCurrentQuestion("Q3");
		}
		if (currentQuestion === "Q3") {
			setCurrentQuestion("Q4");
		}
		if (currentQuestion === "Q4") {
			setCurrentQuestion("Q5");
		}
		if (currentQuestion === "Q5") {
			setCurrentQuestion("Q6");
		}
	};

	const prevQ = () => {
		if (currentQuestion === "Q6") {
			setCurrentQuestion("Q5");
		}
		if (currentQuestion === "Q5") {
			setCurrentQuestion("Q4");
		}
		if (currentQuestion === "Q4") {
			setCurrentQuestion("Q3");
		}
		if (currentQuestion === "Q3") {
			setCurrentQuestion("Q2");
		}
		if (currentQuestion === "Q2") {
			setCurrentQuestion("Q1");
		}
	};

	if (isLoading) {
		return (
			<div className="container">
				<div className="loader"></div>
			</div>
		);
	}

	return (
		<section className="w-full h-screen text-sec text-center flex flex-col md:flex-row justify-between items-center">
			<article className="w-full h-[30%] md:h-[70%] flex flex-col justify-evenly items-center">
				<div className="w-full h-full bg-HKlogo bg-contain bg-center bg-no-repeat"></div>
				<div>
					<h1 className="text-xl sm:text-2xl">
						Bienvenido <span className="font-bold">{`${firstName} ${lastName}`}</span>
					</h1>
					<h2 className="text-lg sm:text-xl text-pri-500">Gracias por unirte a Huntek!</h2>
				</div>
			</article>
			<article className="w-11/12 h-[65%] md:h-[90%] flex flex-col justify-evenly items-center">
				<h2 className="w-full h-[5%] text-base sm:text-lg">Completa tu perfil para comenzar</h2>
				<main className="w-full max-w-md h-[80%] carousel rounded-box text-pri bg-sec border-2 hidd">
					<section
						id="Q1"
						style={{ display: currentQuestion === "Q1" ? "inherit" : "none" }}
						className="carousel-item w-full h-full rounded-box flex flex-col justify-evenly items-center ">
						<p className="text-xl font-medium">Información Importante</p>
						<div className="w-full flex flex-col justify-around items-center">
							<div className="w-32 h-32 border-4 border-pri rounded-full relative">
								<Image
									src={
										filesInfo === undefined || filesInfo[1]?.url === undefined
											? "/images/defaultPhoto.png"
											: `${filesInfo[1].url}`
									}
									alt="profileImg"
									fill={true}
									className="rounded-full object-cover absolute"
								/>
								<label className="w-8 h-8 bg-pri text-sec rounded-full shadow-lg grid place-content-center absolute left-[87px] top-[87px] cursor-pointer hover:bg-sec hover:text-pri">
									<CloudUploadOutlinedIcon />
									<input type="file" className="hidden" onChange={handleProfilePictureChange} />
								</label>
							</div>
							<label className="text-lg font-medium" htmlFor="file_input">
								Foto de Perfil
							</label>
						</div>
						<div className="h-1/4 flex flex-col justify-evenly items-center">
							<label className="w-fit h-16 px-4 flex flex-col justify-center items-center bg-pri text-sec rounded-lg shadow-lg cursor-pointer hover:bg-sec hover:text-pri">
								<DriveFolderUploadOutlinedIcon />
								<span>Seleccionar Archivo</span>
								<input type="file" className="hidden" onChange={handleCvChange} />
							</label>
							<label className="text-lg font-medium" htmlFor="file_input">
								Curriculum
							</label>
						</div>
						<button
							onClick={handleUpload}
							className="w-fit px-2 py-1 bg-pri text-sec rounded-lg shadow-lg hover:bg-pri-100 hover:text-pri">
							Upload
						</button>
					</section>
					<section
						id="Q2"
						style={{ display: currentQuestion === "Q2" ? "inherit" : "none" }}
						className="carousel-item w-full h-full bg-pri-400 flex flex-col justify-evenly items-center">
						<p className="text-xl font-medium">Información Personal</p>
						<article className="w-11/12">
							<Phone userData={userData} handleChange={handleChange} inputPhone={true} />
						</article>
						<article className="w-11/12">
							<Birthdate userData={userData} handleChange={handleChange} inputBirthdate={true} />
						</article>
						<article className="w-11/12">
							<Genres userData={userData} handleChange={handleChange} inputGenre={true} />
						</article>
						<article className="w-11/12">
							<Country userData={userData} handleChange={handleChange} inputCountry={true} />
						</article>
					</section>
					<section
						id="Q3"
						style={{ display: currentQuestion === "Q3" ? "inherit" : "none" }}
						className="carousel-item w-full h-full text-sec bg-pri-800 flex flex-col justify-evenly items-center">
						<p className="text-xl font-medium">Información Académica</p>
						<article className="w-11/12">
							<Academic userData={userData} handleChange={handleChange} inputAcademic={true} />
						</article>
						<article className="w-11/12">
							<Studies userData={userData} handleChange={handleChange} inputStudies={true} />
						</article>
						<article className="w-11/12">
							<Career userData={userData} handleChange={handleChange} inputCareer={true} />
						</article>
					</section>
					<section
						id="Q4"
						style={{ display: currentQuestion === "Q4" ? "inherit" : "none" }}
						className="carousel-item w-full h-full bg-pri-400 flex flex-col justify-evenly items-center">
						<p className="text-xl font-medium">Información Adicional</p>
						<article className="w-11/12">
							<OptionsCity userData={userData} handleChange={handleChange} inputCity={true} />
						</article>
						<article className="w-11/12">
							<Languages userData={userData} handleChange={handleChange} inputLanguages={true} />
						</article>
						<article className="w-11/12">
							<Hobbies userData={userData} handleChange={handleChange} inputHobbies={true} />
						</article>
					</section>
					<section
						id="Q5"
						style={{ display: currentQuestion === "Q5" ? "inherit" : "none" }}
						className="carousel-item w-full h-full text-sec bg-pri-800 flex flex-col justify-evenly items-center">
						<p className="text-xl font-medium">Información Adicional</p>
						<article className="w-11/12">
							<Reubication userData={userData} handleChange={handleChange} inputReubication={true} />
						</article>
						<article className="w-11/12">
							<Profession userData={userData} handleChange={handleChange} inputProf={true} />
						</article>
						<article className="w-11/12">
							<Experience userData={userData} handleChange={handleChange} inputExperience={true} />
						</article>
					</section>
					<section
						id="Q6"
						style={{ display: currentQuestion === "Q6" ? "inherit" : "none" }}
						className="carousel-item w-full h-full bg-pri-400 flex flex-col justify-evenly items-center">
						<p className="text-xl font-medium">Información Adicional</p>
						<article className="w-11/12">
							<Income userData={userData} handleChange={handleChange} inputIncome={true} />
						</article>
						<article className="w-11/12">
							<Availability userData={userData} handleChange={handleChange} inputAvailability={true} />
						</article>
						<article className="w-11/12">
							<FormOfWork userData={userData} handleChange={handleChange} inputFormOfWork={true} />
						</article>
					</section>
				</main>
				<div className="h-[5%] gap-2 flex flex-row justify-between items-center">
					{currentQuestion !== "Q1" && (
						<button className="w-6 h-6 bg-pri-100 text-pri rounded-full hover:bg-pri-400" onClick={prevQ}>
							{"<"}
						</button>
					)}
					<a
						href="#Q1"
						onClick={() => setCurrentQuestion("Q1")}
						className={`w-6 h-6 ${
							currentQuestion === "Q1" ? "bg-pri text-pri-100" : "bg-pri-100 text-pri hover:bg-pri-400"
						} rounded-full`}>
						1
					</a>
					<a
						href="#Q2"
						onClick={() => setCurrentQuestion("Q2")}
						className={`w-6 h-6 ${
							currentQuestion === "Q2" ? "bg-pri text-pri-100" : "bg-pri-100 text-pri hover:bg-pri-400"
						} rounded-full`}>
						2
					</a>
					<a
						href="#Q3"
						onClick={() => setCurrentQuestion("Q3")}
						className={`w-6 h-6 ${
							currentQuestion === "Q3" ? "bg-pri text-pri-100" : "bg-pri-100 text-pri hover:bg-pri-400"
						} rounded-full`}>
						3
					</a>
					<a
						href="#Q4"
						onClick={() => setCurrentQuestion("Q4")}
						className={`w-6 h-6 ${
							currentQuestion === "Q4" ? "bg-pri text-pri-100" : "bg-pri-100 text-pri hover:bg-pri-400"
						} rounded-full`}>
						4
					</a>
					<a
						href="#Q5"
						onClick={() => setCurrentQuestion("Q5")}
						className={`w-6 h-6 ${
							currentQuestion === "Q5" ? "bg-pri text-pri-100" : "bg-pri-100 text-pri hover:bg-pri-400"
						} rounded-full`}>
						5
					</a>
					<a
						href="#Q6"
						onClick={() => setCurrentQuestion("Q6")}
						className={`w-6 h-6 ${
							currentQuestion === "Q6" ? "bg-pri text-pri-100" : "bg-pri-100 text-pri hover:bg-pri-400"
						} rounded-full`}>
						6
					</a>
					{currentQuestion !== "Q6" ? (
						<div className="gap-2 flex flex-row">
							<button className="w-6 h-6 bg-pri-100 text-pri rounded-full hover:bg-pri-400" onClick={nextQ}>
								{">"}
							</button>
							<Link href="/home" className="w-6 h-6 bg-pri-100 text-pri rounded-full hover:bg-pri-400">
								<HomeOutlinedIcon className="w-6 h-6" />
							</Link>
						</div>
					) : (
						<Link href="/home" className="w-6 h-6 bg-pri-100 text-pri rounded-full hover:bg-pri-400">
							<HomeOutlinedIcon className="w-6 h-6" />
						</Link>
					)}
				</div>
			</article>
		</section>
	);
};

export default ApplicantConfig;