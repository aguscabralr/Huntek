"use client";
import { useState } from "react";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PostulationDetail = ({ postulationInfo }) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <main
      className={`h-fit w-full relative flex flex-col sm:items-center rounded-md mt-5 bg-pri ${
        expanded ? "z-50" : ""
      } shadow-xl`}>
      {expanded && <div className="fixed inset-0 bg-black opacity-30 z-10"></div>}
      <section className="w-full flex z-30 rounded-lg rounded-b-none flex-row p-2 px-4 bg-pri shadow-[0px_-1px_8px_1px_#1a202c]">
        <Image
          loading={"eager"}
          alt="logo"
          src={postulationInfo.enterpriseLogo}
          width={85}
          height={85}
          className="rounded-full z-30 shadow-[0px_0px_6px_0px_#1a202c]"
        />
        <div className="flex flex-col z-30 justify-between px-4">
          <a
            href={postulationInfo.enterpriseWebSite}
            target="_blank"
            className={`text-sec z-30 flex items-center text-xl`}>
            {postulationInfo.enterpriseName}
            <div className="group flex relative">
            </div>
          </a>
          <p className={`text-base mb-2 z-30 text-pri-100 `}>{postulationInfo.vacant}</p>
          <p className={`text-xs mb-2 z-30 text-pri-300 `}>{postulationInfo.ubication}</p>
        </div>
      </section>
      <section className={`w-full flex flex-col md:absolute md:top-[5.9rem] md:left-0 bg-gray-50 rounded-b-md ${expanded ? "z-20 " : ""}`}>
        <Accordion className="bg-gray-50" expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon className="mt-2"/>} aria-controls="panel1bh-content" id="panel1bh-header">
            <Typography className="flex-shrink-0 text-pri font-medium mt-2 opacity-95 text-lg">Información</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="text-pri font-light text-sm">
              {postulationInfo.vacantInfo.map((item) => (
                <li className="list-disc list-inside" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion className="bg-gray-50" expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon className=""/>} aria-controls="panel2bh-content" id="panel2bh-header">
            <Typography className="flex-shrink-0 text-pri font-medium opacity-95 text-lg">Requerimientos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="text-pri font-light text-sm">
              {postulationInfo.vacantRequire.map((item) => (
                <li className="list-disc list-inside" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion className="bg-gray-50" expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon className=""/>} aria-controls="panel3bh-content" id="panel3bh-header">
            <Typography className="flex-shrink-0 text-pri font-medium opacity-95 text-lg">¿Por qué nosotros?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="text-pri font-light text-sm">
              {postulationInfo.whyUs.map((item) => (
                <li className="list-disc list-inside" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      </section>
    </main>
  );
};
export default PostulationDetail;
