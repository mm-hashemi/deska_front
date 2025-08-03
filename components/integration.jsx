import { FaSlack, FaGithub, FaGoogleDrive, FaTrello, FaMicrosoft, FaBox, FaGmail } from "react-icons/fa";
import { SiHubspot, SiZoom, SiQuickbooks, SiIntercom, SiOutlook, SiZapier } from "react-icons/si";

const icons = [
  { Icon: FaGoogleDrive, color: "#fbbc04" },
  { Icon: SiHubspot, color: "#ff7a59" },
  { Icon: SiIntercom, color: "#006fff" },
  { Icon: FaTrello, color: "#0079bf" },
  { Icon: SiQuickbooks, color: "#21a366" },
  { Icon: SiZoom, color: "#2d8cff" },
  { Icon: FaSlack, color: "#611f69" },
  { Icon: FaMicrosoft, color: "#6264a7" },
  { Icon: SiZapier, color: "#ff4f1f" },
  { Icon: FaBox, color: "#0062ff" },
  { Icon: FaGithub, color: "#24292f" },

];

export default function IntegrationsSection() {
  return (
    <section className="bg-white text-zinc-800 dark:bg-zinc-900  rounded-3xl shadow-lg max-w-5xl mx-auto mb-40 px-6 py-10">
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-10">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
            <span className="text-blue-300">Integrates</span> with all <br /> your other tools
          </h2>
        </div>
        <div className="flex-1 mb-2 md:mb-0">
          <p className="text-sm opacity-80 mb-4 max-w-md">
            Say goodbye to toggling between six different tools, just bring all of your important data into Hive.
          </p>
          <button className="px-5 py-2 rounded-lg font-semibold bg-gray-200 dark:bg-neutral-900 border border-orange-200 text-zinc-800 hover:bg-blue-200 hover:text-neutral-900 transition">
            View All Integrations <span aria-hidden>→</span>
          </button>
        </div>
      </div>
      <div className="my-8 border-t border-b border-neutral-700 py-6 flex justify-center">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
          {icons.map(({ Icon, color }, idx) => (
            <Icon key={idx} size={36} style={{ color }} />
          ))}
        </div>
      </div>
    </section>
  );
}
