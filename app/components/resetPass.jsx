"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetRecoveryMutation } from "../globalstore/services/both/reco-pw/useRecoverPw";
import { AlertSuccess, AlertError } from "./alertsforrequest";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const ResetPass = () => {
	const [input, setInput] = useState({ email: "" });
	const [errorCatched, setErrorCatched] = useState(null);
	const [successReq, setSuccessReq] = useState(null);

	const [success, setSuccess] = useState(null);
	const [url, setUrl] = useState(null);
	const logArr = ["yahoo.com", "aol.com"];
	useEffect(() => {
		success && logArr.includes(success.split("@")[1]) ? setUrl("login") : setUrl("www");
	}, [success]);

	const [getRecovery, { isLoading }] = useGetRecoveryMutation();

	const handleSubmit = async (event) => {
		setSuccessReq(null);
		setErrorCatched(null);
		event.preventDefault();
		try {
			const result = await getRecovery(input.email.toLowerCase()).unwrap();
			setSuccessReq(result.msg);
			setSuccess(input.email.toLowerCase());
			defineUrl();
		} catch (error) {
			if (error.status === "FETCH_ERROR")
				return setErrorCatched("No se ha podido establecer conexión con el servidor.");
			setErrorCatched(error.data?.detail);
		}
		setInput({
			email: "",
		});
	};

	const handleChange = (event) => {
		event.preventDefault();
		setInput({
			...input,
			[event.target.name]: event.target.value,
		});
	};

	const validateMail = (email) => {
		const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		return regex.test(email);
	};
	let emailValid = validateMail(input.email);

	return (
		<section className="w-full h-full text-pri flex flex-col items-center justify-center">
			<Link
				href="/"
				className="m-4 p-1 grid place-content-center rounded-full text-sec hover:text-pri hover:bg-pri-200 hover:scale-110 duration-150 absolute top-0 left-0">
				<ArrowBackOutlinedIcon className="w-6 h-6" />
			</Link>
			<article className="w-11/12 max-w-md h-3/4 max-h-[450px] bg-sec rounded-lg shadow-2xl flex flex-col justify-center items-center">
				<div className="w-20 h-20 p-4 border-4 rounded-full shadow-lg grid place-content-center">
					<Image loading={"eager"} src={"/huntek/logo/G.svg"} alt="logo" width={35} height={35} />
				</div>
				{!success ? (
					<form onSubmit={handleSubmit} className="w-full h-3/5 flex flex-col justify-evenly items-center">
						<p className="text-xl opacity-100">¿Ovidaste tu contraseña?</p>
						<div className="text-center">
							<p className="text-sm opacity-100">No hay de que preocuparse,</p>
							<p className="text-sm opacity-100">escribe tu email debajo</p>
							<p className="text-sm opacity-100 ">y te enviaremos las instrucciones</p>
							<p className="text-sm opacity-100">para recuperarla.</p>
						</div>
						<div className="w-full max-w-xs flex flex-col items-center justify-center">
							<input
								type="email"
								name="email"
								value={input.email}
								onChange={handleChange}
								autoFocus
								autoComplete="off"
								className="w-full px-3 pb-2 bg-transparent outline-none border-b border-pri text-center text-black"
							/>
							<button
								disabled={!emailValid}
								className="w-fit px-2 py-1 mt-2 text-pri bg-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-gray-300 duration-150">
								Enviar
							</button>
						</div>
						{errorCatched && (
							<AlertError alertTitle={"Error!"} alertBody={errorCatched} setErrorCatched={setErrorCatched} />
						)}
					</form>
				) : (
					<div className="w-full h-3/5 flex flex-col justify-evenly items-center">
						<p className="text-xl opacity-100">Te hemos enviado un mail!</p>
						<div className="text-center">
							<p className="text-sm opacity-100">
								Verifica{" "}
								<a href={`https://${url}.${success.split("@")[1]}`} target="_blank" className="font-bold">
									{success}
								</a>
							</p>
							<p className="text-sm opacity-100">para poder recuperar tu contraseña</p>
						</div>
						<a
							href={`https://${url}.${success.split("@")[1]}`}
							target="_blank"
							className="m-4 p-1 grid place-content-center rounded-lg bg-pri text-sec hover:bg-pri-200 hover:text-pri hover:scale-110 duration-150">
							<EmailOutlinedIcon className="w-6 h-6" />
						</a>
						{successReq && (
							<AlertSuccess alertTitle={"Success!"} alertBody={successReq} setSuccessReq={setSuccessReq} />
						)}
					</div>
				)}
			</article>
		</section>
	);
};
export default ResetPass;
