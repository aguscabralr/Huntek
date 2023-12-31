"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePostVerifMutation } from "../globalstore/services/both/log-reg-val/useVerifCode";
import { usePutResendCodeMutation } from "../globalstore/services/both/log-reg-val/useResendCode";
import { AlertSuccess, AlertError } from "./alertsforrequest";

const EmailCode = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");

	useEffect(() => {
		setEmail(localStorage.getItem("email"));
		setUserCode({ ...userCode, email });
		setResendCode({ ...resendCode, email });
	}, [email]);

	const [successReq, setSuccessReq] = useState(null);
	const [errorCatched, setErrorCatched] = useState(null);
	const [enableButton, setEnableButton] = useState(0);
	const [postVerif, { isLoading }] = usePostVerifMutation();
	const [putResendCode] = usePutResendCodeMutation();
	const inputRefs = useRef([]);
	const [userCode, setUserCode] = useState({
		code: { 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" },
		email: `${email}`,
	});
	const [resendCode, setResendCode] = useState({
		email: `${email}`,
		order: "account_activation",
	});

	const handleUserCode = (event, index) => {
		if (/^[0-9]+$/.test(event.target.value) || event.keyCode == 8) {
			if (event.keyCode != 8) {
				setUserCode({
					...userCode,
					code: {
						...userCode.code,
						[index]: event.target.value,
					},
				});
				enableButton === 6 ? "" : setEnableButton(enableButton + 1);
			} else if (event.keyCode === 8 && event.target.value === "") {
				setUserCode({
					...userCode,
					code: {
						...userCode.code,
						[index]: "",
					},
				});
				enableButton === 0 ? "" : setEnableButton(enableButton - 1);
			}
		} else {
			event.target.value = "";
		}
	};

	const handleKeyUp = (event, index) => {
		const input = inputRefs.current[index];
		if (event.keyCode === 8 && input.value === "") {
			if (index > 0) {
				inputRefs.current[index - 1].focus();
			}
		} else if (input.value.length === input.maxLength) {
			if (index < inputRefs.current.length - 1) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleSubmitVerify = async (event) => {
		event.preventDefault();
		setErrorCatched(null);
		setSuccessReq(null);
		try {
			let userNumber = Object.values(userCode.code).join("");
			const response = await postVerif({ email: userCode.email, code: userNumber }).unwrap();
			const { access_token } = response;
			const token = access_token.split("'")[1];
			const date = new Date();
			date.setDate(date.getDate() + 7);
			document.cookie = `kTnKETkt=${token}; expires=${date.toUTCString()}`;
			setSuccessReq("Cuenta activada! \nRedireccionando...");
			setTimeout(() => {
				router.push("/applicant/userconfig");
			}, 2000);
		} catch (error) {
			if (error.status === "FETCH_ERROR")
				return setErrorCatched("No se ha podido establecer conexión con el servidor.");
			if (error.data?.detail[0].msg) return setErrorCatched(error.data.detail[0].msg);
			setErrorCatched(error.data?.detail);
		}
	};

	const handleSubmitResend = async (event) => {
		event.preventDefault();
		try {
			const response = await putResendCode(resendCode).unwrap();
			setSuccessReq(response.message);
		} catch (error) {
			setErrorCatched(error.data?.detail);
		}
	};

	return (
		<main className="w-full h-full flex flex-col justify-evenly items-center">
			<Link href="/">
				<Image
					src={"/utils/back.svg"}
					height={1}
					width={1}
					alt="backArrow"
					loading={"eager"}
					className="btn btn-ghost btn-circle w-[50px] h-[50px] p-2 absolute left-2 top-2 z-40"
				/>
			</Link>
			<section className="w-full max-w-md h-screen font-medium text-sec items-center relative">
				<article className="w-full flex flex-col items-center">
					<div className="w-40 h-40 bg-HKlogo bg-cover mt-10"></div>
					<p className="text-3xl">Revisa tu email</p>
					<p className="text-gray-400 text-center mt-2 mx-1">
						Hemos enviado un código de verificación de seis dígitos a<b className="text-gray-200">{` ${email}`}</b>.
						<br />
						Asegúrate de ingresar correctamente el código.
					</p>
				</article>
				<form className="w-full h-72 flex flex-col justify-evenly items-center">
					<article className="w-full flex flex-col justify-between items-center">
						<div className="w-11/12 flex flex-row justify-evenly items-center">
							{[0, 1, 2, 3, 4, 5].map((index) => (
								<input
									autoFocus={index === 0 ? true : false}
									key={index}
									type="text"
									inputMode="numeric"
									maxLength="1"
									className="w-11 h-14 px-3 py-2 text-sec bg-lig outline-none border focus:border-hk focus:border-1 shadow-sm rounded-md text-center text-lg"
									ref={(ref) => (inputRefs.current[index] = ref)}
									onKeyUp={(event) => {
										handleKeyUp(event, index), handleUserCode(event, index);
									}}
									required
								/>
							))}
						</div>
					</article>
					<button
						onClick={handleSubmitVerify}
						disabled={enableButton !== 6}
						className="w-11/12 py-2 text-pri bg-sec hover:bg-gray-300 active:bg-lig rounded-lg duration-150 disabled:opacity-40 disabled:hover:bg-sec">
						Verificar
					</button>
				</form>
				<p className="text-center text-sm">
					No has recibido el código?{" "}
					<button onClick={handleSubmitResend} className="hover:underline">
						Enviar de nuevo
					</button>
				</p>
			</section>
			{errorCatched && <AlertError alertTitle={"Error!"} alertBody={errorCatched} setErrorCatched={setErrorCatched} />}
			{successReq && <AlertSuccess alertTitle={"Success!"} alertBody={successReq} setSuccessReq={setSuccessReq} />}
		</main>
	);
};

export default EmailCode;
