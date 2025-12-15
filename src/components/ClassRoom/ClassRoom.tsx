type ClassRoomPropTypes = {
    number: string | null;
    pair?: string;
    group?: string;
    status?: boolean;
}

export const ClassRoom: React.FC<ClassRoomPropTypes> = ({ number, pair, group, status = false }) => {
    return (
        <div className="relative my-4">
            <div className={`
                ${status
                    ? "bg-[linear-gradient(96.9deg,rgba(173,255,173,0.12)_0%,rgba(173,255,173,0.042)_100%)]"
                    : "bg-linear-to-r from-[#ADC6FF33] to-[#ADC6FF1A]"
                } 
                rounded-xl  p-3 
                h-32
                flex flex-col justify-start
            `}>
                <div className={status ? "text-free text-lg font-bold mb-5" : "text-font text-lg  font-bold mb-5"}>
                    {number}
                </div>
                <div className={status ? "flex justify-center" : "text-sm  opacity-90"}>
                    {status ? <img width={56} src="/keys.svg" alt="keys" /> : pair}
                </div>
                <div className={status ? "absolute top-0 right-0 bg-white/10 rounded-bl-xl rounded-tr-xl px-4 py-1 text-xs  text-free-p" : "absolute top-0 right-0 bg-white/10 rounded-bl-xl rounded-tr-xl px-4 py-1 text-xs "}>
                    {status ? "Свободна" : group}
                </div>
            </div>
        </div >
    );
}